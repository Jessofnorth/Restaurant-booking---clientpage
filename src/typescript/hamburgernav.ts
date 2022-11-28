
/* @author Jessica Ejelöv - jeej2100@student.miun.se */
// HAMBURGER MENU
export class Hamburger {
    //hamburger menu
    constructor() {
        const hamburger = document.querySelector(".hamburger");
        const mobilenav = document.querySelector(".mobile-nav");
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("is-active");
            mobilenav.classList.toggle("is-active");
        });
    }
}