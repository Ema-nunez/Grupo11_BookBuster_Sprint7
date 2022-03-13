window.addEventListener('load', function(){
    let burgerMenu = document.querySelector(".menu");
    burgerMenu.addEventListener("click", function(){
        let body = document.querySelector("body");
        let menuHide = document.querySelector(".burgerMenuHide");
        menuHide.style.display = "block";
        body.style.margin = 0;
        body.style.height = 100;
        body.style.overflow = "hidden";
        
        menuHide.addEventListener("mouseleave",function(){
            menuHide.style.display = "none";
            body.style.margin = 0;
            body.style.height = 100;
            body.style.overflow = "";
        })
        let closeMenu = document.querySelector("#closeBurgerMenu");
        closeMenu.addEventListener("click",function(){
            menuHide.style.display = "none";
            body.style.margin = 0;
            body.style.height = 100;
            body.style.overflow = "";
        })
       
        

        
    })
})