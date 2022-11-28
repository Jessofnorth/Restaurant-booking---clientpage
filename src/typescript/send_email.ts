/* @author Jessica Ejelöv - jeej2100@student.miun.se */
// properties
import { url_mail, url_confirmation } from "./api_url.js";
export const mailName = document.getElementById("mail-name") as HTMLInputElement;
export const mailEmail = document.getElementById("mail-email") as HTMLInputElement;
export const mailMessage = document.getElementById("mail-message") as HTMLInputElement;
export const mailSubmit = document.getElementById("mail-submit") as HTMLInputElement;
export const mailSent = document.getElementById("emailsent") as HTMLElement;
import { gdprInput, errorEl } from "./booking.js";

// send email from contact form 
export function sendMail(e: any) {
    e.preventDefault();
    // get the values of input fields
    let name = mailName.value;
    let message = mailMessage.value;
    let email = mailEmail.value;
    if (gdprInput.checked == true) {
        //  check if all, except msg, has value
        if (name != "" && message != "" && email != "") {
            // save to JSON
            let jsnStr = JSON.stringify({
                name: name,
                email: email,
                message: message
            })
            // fetch with POST
            fetch(url_mail, {
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
                    mailSent.innerHTML = "<strong>Tack för ditt meddelande!</strong>";
                    clearEmailForm();
                })
                .catch(err => {
                    console.log(err);
                    errorEl.innerHTML = "Epost gick ej att skicka.";
                })
        } else {
            errorEl.innerHTML = "Alla obligatoriska fält måste fyllas i.";
        }
    } else {
        errorEl.innerHTML = "Alla obligatoriska fält måste fyllas i.";
    }

}
function clearEmailForm() {
    mailName.value = "";
    mailMessage.value = "";
    mailEmail.value = "";
    errorEl.innerHTML = "";

}
// send confimation email at booking
export function sendConfirmation($name: string, $email: string, $count: string, $date: string) {
    // get the values of input fields
    let name = $name;
    let email = $email;
    let date = $date;
    let count = $count;

    //  check if all, except msg, has value
    if (name != "" && email != "" && date != "" && count != "") {
        // save to JSON
        let jsnStr = JSON.stringify({
            name: name,
            email: email,
            count: count,
            date: date
        })
        // fetch with POST
        fetch(url_confirmation, {
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
                
                return  response.json()
            })
            // if ok print thank you msg and clear form
            .then(data => {
                mailSent.innerHTML = "<strong>Bekräftelse skickad till din epost!</strong>";
                clearForm();
            })
            .catch(err => {
                console.log(err);
                errorEl.innerHTML = "Epost bekräftelse gick ej att skicka.";
            })

    } else {
        errorEl.innerHTML = "Alla obligatoriska fält måste fyllas i.";
        console.log("send mail error näst längst ner, sendmail.ts");
    }

}
import { clearForm } from "./booking.js";