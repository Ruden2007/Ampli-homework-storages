import '../styles/style.sass'
import {Header} from "../Components/Header.ts"
import {CookieManager, getNounWithNumber} from "../utils"
import {ClearCookieButton} from "../Components/ClearCookieButton.ts";

Header.add()

function calculateAge(birthday: Date) {
    const ageDifMs = Date.now() - birthday.getTime()
    const ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
}


function renderPage(app: HTMLElement, birthday: string) {
    app.innerHTML = `
        <h1>Ваш вік: ${getNounWithNumber(calculateAge(new Date(birthday)), ['рік', 'роки', 'років'])}</h1>
        <div class="buttons">
        
        </div>
    `
    const clearCookie = new ClearCookieButton()

    app.querySelector('.buttons')?.append(clearCookie)
}


function main() {
    const app = document.querySelector('#app')

    if (!(app instanceof HTMLElement)) return false

    const cookie = CookieManager

    let birthday = cookie.getCookie("birthday", true)

    if (!birthday) {
        let isValidDate = false

        while (!isValidDate) {
            const userBirthdayInput = prompt("Введіть дату народження в форматі (дд-мм-рррр):")

            if (userBirthdayInput) {
                const parts = userBirthdayInput.split("-")
                const day = parseInt(parts[0])
                const month = parseInt(parts[1])
                const year = parseInt(parts[2])
                const date = new Date(year, month - 1, day)

                if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
                    isValidDate = true
                    birthday = date.toISOString()

                    cookie.setCookie("birthday", birthday)
                } else {
                    alert("Будь ласка, введіть корректну дату в форматі дд-мм-рррр.")
                }
            } else {
                alert("Ви не ввели дату народження.")
            }
        }
    }

    if (birthday) renderPage(app, birthday)
}

main()
