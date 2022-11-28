/* @author Jessica Ejelöv - jeej2100@student.miun.se */
import { url_booking, url_guests } from "./api_url.js";
// module for booking variables and functions
export const dateInput = document.getElementById('date') as HTMLInputElement;
export const nameInput = document.getElementById('name') as HTMLInputElement;
export const phoneInput = document.getElementById('phone') as HTMLInputElement;
export const emailInput = document.getElementById('email') as HTMLInputElement;
export const countInput = document.getElementById('count') as HTMLInputElement;
export const messageInput = document.getElementById('message') as HTMLInputElement;
export const submitbtn = document.getElementById('submit') as HTMLInputElement;
export const errorEl = document.getElementById("error") as HTMLElement;
export const postedEl = document.getElementById("posted") as HTMLElement;
export const gdprInput = document.getElementById("gdpr") as HTMLInputElement;
import { mailSent } from "./send_email";
// functions
export async function countGuests(date: string, count: string) {
    // fetch bookings on date
    let seats = await fetch(url_guests + "?date=" + date)
    let takenSeats = await seats.json();
    // parse response and count
    takenSeats = parseInt(takenSeats.seats);
    let booked = parseInt(count);
    // save number of already taken seats + number of seats that wants to book and return
    let available = (takenSeats + booked);
    return available;
}

//  save booking to API
export async function saveBooking(event: any) {
    event.preventDefault();
    // get the values of input fields
    let name = nameInput.value;
    let phone = phoneInput.value;
    let email = emailInput.value;
    let date = dateInput.value;
    let count = countInput.value;
    let message = messageInput.value;
    let available: number;

    if (gdprInput.checked == true) {
        //  check if all, except msg, has value
        if (name != "" && phone != "" && email != "" && date != "" && count != "") {
            // run countGuests funcition to check seat availability
            try {
                available = await countGuests(date, count);
            } catch (error) {
                errorEl.innerHTML = "Tyvärr finns inte tillräckligt många lediga platser på det valda datumet. Vänligen testa ett annat datum.";
                return;
            }
            // if the number of guests is 50 or above error that there is no mor seats, otherwise book
            if (available <= 50) {
                // save to JSON
                let jsnStr = JSON.stringify({
                    name: name,
                    phone: phone,
                    email: email,
                    date: date,
                    count: count,
                    message: message
                })
                // fetch with POST
                fetch(url_booking, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: jsnStr
                })
                    .then(response => {
                        // if something goes wrong, print error
                        if (response.status != 201) {
                            errorEl.innerHTML = "<strong>Alla obligatoriska fält måste vara ifyllda korrekt.</strong>";
                            return
                        }
                        return response.json()
                    })
                    // if ok print thank you msg and clear form
                    .then(data => {
                        postedEl.innerHTML = "<strong>Tack för din bokning!</strong>";
                        sendConfirmation(name, email, count, date)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                errorEl.innerHTML = "Tyvärr finns inte tillräckligt många lediga platser på det valda datumet. Vänligen testa ett annat datum.";
            }
        } else {
            errorEl.innerHTML = "Alla obligatoriska fält måste fyllas i.";
        }
    } else {
        errorEl.innerHTML = "Alla obligatoriska fält måste fyllas i.";
    }
}
// import sendConfirmatione from send_emails.js
import { sendConfirmation } from "./send_email.js"
// clear input forms
export function clearForm() {
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    dateInput.value = "";
    messageInput.value = "";
    countInput.value = "";
    errorEl.innerHTML = "";

}