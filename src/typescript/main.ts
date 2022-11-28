'use strict';
/* @author Jessica Ejelöv - jeej2100@student.miun.se */

// import properties from modules
import {submitbtn} from "./booking.js";
import {mailSubmit} from "./send_email.js";
import {starterEl} from "./get_print_menu.js";
// eventlisteners 
document.addEventListener('DOMContentLoaded', function () {
    if (submitbtn != null) {
        submitbtn.addEventListener("click", saveBooking);
    }
    if (mailSubmit != null) {
        mailSubmit.addEventListener("click", sendMail);
    }
})
// init
window.onload = init;
function init() {
    if (starterEl != null) {
        getStarters();
        getMains();
        getDesserts();
    }
}
// import booking funktions from bookings.js
import {saveBooking} from "./booking.js";
// import sendMail from sen_email.js
import {sendMail} from "./send_email.js"
// import get/print menus from get_print_menus.js
import {getStarters, getMains, getDesserts} from "./get_print_menu.js"
// import hamburgernav from hamburgernav.js
import {Hamburger} from "./hamburgernav.js";
let hamburger = new Hamburger();

