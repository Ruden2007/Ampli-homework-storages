import {CookieManager} from "../utils";

type ClearCookieButtonParams = { title?: string, reloadPage?: boolean }

const ELEMENT_NAME = "clear-cookie-button"

export class ClearCookieButton extends HTMLButtonElement {
    private readonly _reload: boolean

    constructor(params?: ClearCookieButtonParams) {
        super()

        const _params = {
            title: "clear cookie",
            reload: true,
            ...params
        }

        this.setAttribute("is", ELEMENT_NAME)

        this._reload = _params.reload
        this.innerHTML = _params.title

        this.setEventListeners()
    }

    private setEventListeners() {
        this.addEventListener('click', () => {
            CookieManager.clearAllCookies()

            if (this._reload) location.reload()
        })
    }

}

customElements.define(ELEMENT_NAME, ClearCookieButton, {extends: 'button'})
