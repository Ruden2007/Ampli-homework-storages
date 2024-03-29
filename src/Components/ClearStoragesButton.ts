type ClearStoragesButtonParams = { title?: string, reloadPage?: boolean }

const ELEMENT_NAME = "clear-storages-button"

export class ClearStoragesButton extends HTMLButtonElement {
    private readonly _reload: boolean

    constructor(params?: ClearStoragesButtonParams) {
        super()

        const _params = {
            title: "clear storages",
            reload: true,
            ...params
        }

        this.setAttribute("is", ELEMENT_NAME)

        this._reload = _params.reload
        this.innerHTML = _params.title

        this.setEventListeners()
    }

    private clearLocalStorage() {
        localStorage.clear()
    }

    private clearSessionStorage() {
        sessionStorage.clear()
    }

    private setEventListeners() {
        this.addEventListener('click', () => {
            this.clearLocalStorage()
            this.clearSessionStorage()

            if (this._reload) location.reload()
        })
    }

}

customElements.define(ELEMENT_NAME, ClearStoragesButton, {extends: 'button'})
