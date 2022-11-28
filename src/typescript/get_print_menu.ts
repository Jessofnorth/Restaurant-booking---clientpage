// GET AND PRINT MENU
import {url_menu_category} from "./api_url.js"
// properties
export const dessertEl = document.getElementById("dessert") as HTMLElement;
export const mainEl = document.getElementById("main") as HTMLElement;
export const starterEl = document.getElementById("starter") as HTMLElement;
import {errorEl} from "./booking.js";

//  get menu dishes by category from API
export function getStarters() {

    fetch(url_menu_category + "starter")
        .then(response => {
            if (response.status != 200) {
                errorEl.innerHTML = "Det finns inga rätter på menyn."
                return
            }
            return response.json()
        })
        .then(data => {
            printMenuStarters(data);
        })
        .catch(err => {
            console.log(err);
        })

}
export function getMains() {
    fetch(url_menu_category + "main")
        .then(response => {
            if (response.status != 200) {
                errorEl.innerHTML = "Det finns inga rätter på menyn."
                return
            }
            return response.json()
        })
        .then(data => {
            printMenuMains(data);
        })
        .catch(err => {
            console.log(err);
        })

}
export function getDesserts() {

    fetch(url_menu_category + "dessert")
        .then(response => {
            if (response.status != 200) {
                errorEl.innerHTML = "Det finns inga rätter på menyn."
                return
            }
            return response.json()
        })
        .then(data => {
            printMenuDesserts(data);
        })
        .catch(err => {
            console.log(err);
        })
}

// print menu by category to DOM with foreach 
export function printMenuStarters(menu: any) {

    if (starterEl != null) {
        menu.forEach((m: any) => {
            starterEl.innerHTML += `
            <div>
            <h3>${m.name}</h3>
            <p>${m.info}</p>
            <p><strong>${m.price} kr</strong></p>
            </div>
            `
        })
    }
}
export function printMenuMains(menu: any) {

    if (mainEl != null) {
        menu.forEach((m: any) => {
            mainEl.innerHTML += `
            <div>
            <h3>${m.name}</h3>
            <p>${m.info}</p>
            <p><strong>${m.price} kr</strong></p>
            </div>
            `
        })
    }
}
function printMenuDesserts(menu: any) {

    if (dessertEl != null) {
        menu.forEach((m: any) => {
            dessertEl.innerHTML += `
            <div>
            <h3>${m.name}</h3>
            <p>${m.info}</p>
            <p><strong>${m.price} kr</strong></p>
            </div>
            `
        })
    }
}