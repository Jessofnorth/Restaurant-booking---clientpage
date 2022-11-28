# Webbplats för Johans Kök
av Jessica Ejelöv, jeej2100@student.miun.se
Projekt för kursen Webbutveckling III på Mittuniversitetet. 

## Om webbplatsen
Denna webbplats är slutprojektet i kursen Webbutveckling III på Mittuniversitetet. 
Projektet handlar om att skapa en webbplats för en restaurang där man kan boka bord, se menyn samt kontakta restaurangen. En admin sida där man ska kunna lägga till maträtter på menyn samt hantera menyn och bokningar med ändringar och radera. Dessa två sidor ska konsumera en webbtjänst som är kopplad till en databas där menyer och bokningar sparas.
Det är en del av tre : Klient webbplats, Admin webbplats och webbtjänst som webbplatserna skickar och hämtar data från. 

Demo på klient webbplatsen hittas [här](https://studenter.miun.se/~jeej2100/writeable/johanskok/).

## Konsumerar REST-webbtjänst 
Detta projekt konsumerar data från denna [webbtjänst](https://studenter.miun.se/~jeej2100/writeable/johansAPI/).
Github [länk](https://github.com/Webbutvecklings-programmet/projekt_webservice_vt22-Jessofnorth).
Denna webbplats är skapad med hjälp av GULP/NPM och använder sig av HTML, SCSS samt Typescript kod.

## För att installera 
Ladda hem repot från: [Github](https://github.com/Webbutvecklings-programmet/projekt_publikwebbplats_vt22-Jessofnorth.git)
```bash
git clone https://github.com/Webbutvecklings-programmet/projekt_publikwebbplats_vt22-Jessofnorth.git
```
Installera sedan samtliga paket som behövs för denna webbplats med:
```bash
npm install
```

### Verktyg och paket
I detta projekt används NodeJs tillsammans med GULP och ett antal paket som du hittar i listan nedan. Dessa kommer installeras när du instalerar enligt instruktionerna ovan.

 - [NodeJS](https://nodejs.org/en/)
 - [GULP](https://gulpjs.com/)
 - [BrowserSync](https://browsersync.io/)
 - [Gulp-sass](https://www.npmjs.com/package/gulp-sass)
 - [Gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
 - [Gulp-typescript](https://www.npmjs.com/package/gulp-typescript)
 - [Gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
 - [Gulp-webp](https://www.npmjs.com/package/gulp-webp)
 - [Gulp-terser](https://www.npmjs.com/package/gulp-terser)


### Funktioner
I mappen `src`finns källkodsfilerna till detta projekt. Dessa behandlas och flyttas till en mapp `pub`redo för att publiceras.

De funktioner som finns i gulpfile.js är: 
1. **[BrowserSync](https://browsersync.io/)** - används för att lyssna efter förändringar i källfilerna och starta en lokal webbserver som updateras när en förändring sker så vi får en live-reload av hur webbplatsen ser ut utan att ladda om manuellt. BrowserSync finns i samtliga funktioner som hanterar filer.

2. **copyHTML** - letar efter samtliga HTML filer i källkods mappen och flyttar dessa till pub mappen för publicering. 

3. **sassTask** - letar efter samtliga SCSS filer i källkodsmappen och slår ihop dessa till en fil med namnet 'main.css' och komprimerar filen. Denna fil minimeras samt indexeras med sourcemaps för att lättare kunna felsöka och placeras i pub mappen. 

4. **typescriptTask** - transpilerar Typescriptfiler och placerar dem i pub mappen som Javascript filer. I `tsconfig.json`filen finns denna rad, `"module": "es2015"`, som aktiverar möjligheten att använda moduler i typescript vilket görs i detta projekt.

5. **imgTask** - letar efter alla bild filer i källkods mappen och komprimerar dessa med hjälp av imagemin till kavalitet 75. Filerna placeras sedan i pub mappen. 

6. **watchTask** - Lyssnar efter förändringar i källkodsfilerna och kör samtliga ovan funktioner vid upptäckt förändring. Här startas BrowserSync. 

7. **webpTask** - tar alla JPG filer i `img`mappen och konverterar dem till WebP format och sparar dem i `pub/img`.

8. **[Gulp-terser](https://www.npmjs.com/package/gulp-terser)** - komprimerar Typescript filerna.


## SASS filer
`main.scss` importerar samtliga filer från SASS strukturen. Denna är uppdelad i tre mappar och innehåller filer med nedan funktioner: 
- **avstracts** : knappar, mixins och variabler.
- **base** : baselement så som `body, container`osv, länkar, reset, text.
- **layout** : css bakgrunder, footer, formulär, header, generell layout.

## Typescript filer
Typescript koden är uppdelad i moduler där varje modul har ett "tema". 

 - **main** : importerar samtliga moduler och variabler. Eventlyssnare på de två submit knapparna på formulären. 
    - **init** : körs när sidan laddat in. Hämtar menyn efter kategori med funktionerna getStarters, getMains, getDesserts. 
- **api_url** : variabler med samtliga URLs till webbtjänsten. 
    - **Endpoints som används**
        - booking.php : för att lagra bokningar från formulär. 
        - menu.php?category= : för att hämta menyn efter kategori.
        - mail.php : för att skicka mail genom kontaktformuläret till restaurangen. 
        - guests.php : inann en bokning skickas till webbtjänsten kontrolleras att det finns tillräckligt många platser lediga. 
        - confirmation.php : när en bokning gått igneom skickas ett bekräftelse mail till kunden genom denna endpoint. 
- **booking** : funktioner för att hantera att skapa nya bokningar mot webbtjänsten från webbplatsens formulär.
    - **countGuests** : tar antalet platser som kunden vill boka samt datum, skickar detta till webbtjänsten för kontroll om det finns tilläcligt många lediga platser detta detum. 
    -**saveBooking** : Finns tillräckligt många lediga platser så skickas informationen från formuläret vidare för att registrera bokning i webbtjänsten. 
    -**clearForm** : rensar bokningsformuläret efter lyckad bokning.
- **get_print_menu** : hämtar och skriver ut menyn efter kategori. 
    - **getStarters, getMains, getDesserts** : hämtar de poster på menyn som ligger inom deras kategori med FETCH GET mot webbtjänsten. 
    - **printMenuStarters, printMenuMains, printMenuDesserts** : skriver ut hämtade rätter med foreach till webbplatsen. 
- **hamburgernav** : eventlyssnare på menyknapp i mobiltläge som visar/döljer mobilmenyn med länkar. 
- **send_email** : funktioner för att skicka mail från kontaktformuläret till restaurangen samt för att skicka bekräftelsemail till kunden efter lyckad bokning. 
    - **sendMail** : hämtar in från kontaktformulär och skickar vidare till webbtjänsten som skickar ett mail till restaurangen.
    - **sendConfirmation** : när en bokning är lyckad skickas ett bekräftelse mail till kundens email med datum och antal platser bokade.
    -**clearEmailForm** : tömmer kontaktformuläret efter lyckad FETCH.
