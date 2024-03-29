import '../styles/style.sass'
import {CounterButton} from '../Components/CounterButton.ts'
import {ClearStoragesButton} from "../Components/ClearStoragesButton.ts";
import {Header} from "../Components/Header.ts";


Header.add()

function main() {
    const app = document.querySelector('#app')

    if (!app) return false
    app.innerHTML = `
        <h1>First page</h1>
        <div class="buttons">
            
        </div>
    `

    const counter = new CounterButton({
        title: "Ця кнопка була натиснута: ",
        saveState: true,
        id: "myCounterButton"
    })

    const clear = new ClearStoragesButton()

    const buttons = app.querySelector('.buttons')

    buttons?.append(counter)
    buttons?.append(clear)
}

main()
