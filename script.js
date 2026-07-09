/* ==========================================
   Restaurant WJ
   script.js
========================================== */


/* =========================
   Elements
========================= */

// Pages

const pages = document.querySelectorAll(".page");


// Progress dots

const dots = document.querySelectorAll(".dot");


// Buttons

const startBtn = document.querySelector(".start-btn");

const courseBtns = document.querySelectorAll(".course-btn");

const bellBtns = document.querySelectorAll(".bell-btn");


// Audio

const bellSound = document.getElementById("bellSound");

const bgm = document.getElementById("bgm");


// Popup

const popup = document.getElementById("popup");


// Chef Mode

const chefMode = document.getElementById("chefMode");

const chefPassword = document.getElementById("chefPassword");

const chefLogin = document.getElementById("chefLogin");

const chefClose = document.getElementById("chefClose");



/* =========================
   State
========================= */


let currentPage = 0;


// 코스 이동 중인지 확인

let isPreparing = false;



/* =========================
   Show Page
========================= */


function showPage(index){


    pages.forEach(page=>{

        page.classList.remove("active");

    });


    if(pages[index]){

        pages[index].classList.add("active");

    }


    currentPage = index;


    updateDots(index);


}



/* =========================
   Update Progress
========================= */


function updateDots(index){


    dots.forEach(dot=>{

        dot.classList.remove("active");

    });



    // Course I

    if(index >= 1){

        dots[0].classList.add("active");

    }



    // Course II

    if(index >= 2){

        dots[1].classList.add("active");

    }



    // Course III

    if(index >= 3){

        dots[2].classList.add("active");

    }


}
/* =========================
   Start Course
========================= */


if(startBtn){

    startBtn.addEventListener("click",()=>{


        // BGM 시작

        if(bgm){

            bgm.volume = 0.25;

            bgm.play().catch(()=>{});

        }



        showPage(1);


    });

}



/* =========================
   Next Course System
========================= */

courseBtns.forEach(button => {

    button.addEventListener("click", () => {


        if(isPreparing){
            return;
        }


        isPreparing = true;


        // 현재 코스 저장
        let targetPage = currentPage + 1;


        // Preparing 페이지 제외
        if(targetPage === 4){

            targetPage = 5;

        }



        button.classList.add("loading");

        button.innerHTML = "Preparing...";



        playBell();



        // Preparing 화면 표시
        showPage(4);



        setTimeout(() => {


            // 다음 페이지 이동

            showPage(targetPage);



            isPreparing = false;


            button.classList.remove("loading");



            // 버튼 문구 변경

            if(targetPage === 5){

                button.innerHTML =
                "오늘의 코스를 마쳤습니다";

            }
            else{

                button.innerHTML =
                "🍽 다음 코스를 준비해주세요 →";

            }



        },3000);


    });


});



/* =========================
   Next Course Logic
========================= */


function getNextCourse(){


    // 현재 코스 기준

    if(currentPage === 4){

        return 2;

    }


    if(currentPage === 3){

        return 5;

    }


    return currentPage + 1;


}
/* =========================
   Bell Sound
========================= */


function playBell(){


    if(bellSound){


        bellSound.currentTime = 0;


        bellSound.volume = 0.6;


        bellSound.play().catch(()=>{});


    }


}



/* =========================
   Staff Call
========================= */


bellBtns.forEach(button=>{


    button.addEventListener("click",()=>{


        // 벨 재생

        playBell();



        // 버튼 변경

        const originalText = button.innerHTML;


        button.innerHTML = "✅ 호출 완료";


        button.style.color = "#B08D57";



        // 팝업 표시

        showPopup();



        // 3초 후 복귀

        setTimeout(()=>{


            button.innerHTML = originalText;


            button.style.color = "";


        },3000);



    });


});



/* =========================
   Popup
========================= */


function showPopup(){


    if(!popup){

        return;

    }



    popup.classList.add("show");


    document.body.classList.add("popup-open");



    setTimeout(()=>{


        popup.classList.remove("show");


        document.body.classList.remove("popup-open");


    },2500);



}



/* =========================
   Popup Close By Touch
========================= */


if(popup){


    popup.addEventListener("click",()=>{


        popup.classList.remove("show");


        document.body.classList.remove("popup-open");


    });


}
/* =========================
   Chef Mode
========================= */


/*
    관리자 모드 진입 방법

    화면 왼쪽 위 로고(WJ)를
    5번 터치

    비밀번호 : 0415

*/


let logoCount = 0;

const logo = document.querySelector(".logo");



if(logo){


    logo.addEventListener("click",()=>{


        logoCount++;



        setTimeout(()=>{


            logoCount = 0;


        },1500);



        if(logoCount >= 5){


            openChefMode();


            logoCount = 0;


        }



    });


}



/* =========================
   Open Chef Mode
========================= */


function openChefMode(){


    if(chefMode){


        chefMode.classList.add("show");


    }


}



/* =========================
   Close Chef Mode
========================= */


if(chefClose){


    chefClose.addEventListener("click",()=>{


        chefMode.classList.remove("show");


        chefPassword.value="";


    });


}



/* =========================
   Login
========================= */


if(chefLogin){


    chefLogin.addEventListener("click",()=>{


        const password =
        chefPassword.value;



        if(password === "0413"){



            alert(
                "Chef Mode 활성화"
            );



            chefMode.classList.remove("show");



            chefPassword.value="";



            // 관리자 기능 추가 가능

            console.log(
                "Chef Mode Access"
            );



        }

        else{


            alert(
                "비밀번호가 틀렸습니다."
            );


            chefPassword.value="";


        }



    });


}



/* =========================
   Enter Key Login
========================= */


if(chefPassword){


    chefPassword.addEventListener(
        "keydown",
        (e)=>{


            if(e.key === "Enter"){


                chefLogin.click();


            }


        }

    );


}
/* =========================
   Initial Setup
========================= */


// 처음 화면

showPage(0);



// 페이지 로딩 완료

window.addEventListener(
    "load",
    ()=>{


        document.body.classList.add(
            "loaded"
        );


    }

);



/* =========================
   BGM Control
========================= */


if(bgm){


    bgm.volume = 0.25;



    // 사용자가 첫 화면 터치하면 재생

    document.body.addEventListener(
        "click",
        ()=>{


            bgm.play()
            .catch(()=>{});


        },

        {
            once:true
        }

    );


}



/* =========================
   Prevent Audio Error
========================= */


window.addEventListener(
    "error",
    (e)=>{


        console.log(
            "Restaurant WJ Error:",
            e.message
        );


    }

);



/* =========================
   PWA Support
========================= */


if(
    "serviceWorker" in navigator
){


    window.addEventListener(
        "load",
        ()=>{


            navigator.serviceWorker
            .register(
                "service-worker.js"
            )
            .then(()=>{


                console.log(
                    "PWA Ready"
                );


            })
            .catch(()=>{


                console.log(
                    "Service Worker unavailable"
                );


            });


        }

    );


}



/* =========================
   Touch Optimization
========================= */


document.addEventListener(
    "touchstart",
    ()=>{},
    {
        passive:true
    }

);



/* =========================
   End
========================= */


console.log(
    "🍽 Restaurant WJ Ready"
);