type CounterCommonParams = {
    title?: string,
    counter?: number,
}

type CounterButtonParamsWithSaveState = CounterCommonParams & {
    saveState: true,
    id: string
}

type CounterButtonParamsWithoutSaveState = CounterCommonParams & {
    saveState?: false,
    id?: string
}

export type CounterButtonParams = CounterButtonParamsWithSaveState | CounterButtonParamsWithoutSaveState


const ELEMENT_NAME = "counter-button"

export class CounterButton extends HTMLButtonElement {
    private _title: string
    private _counter = 0
    private readonly _saveState: boolean

    constructor(params: CounterButtonParams) {
        super()

        const _params = {
            counter: 0,
            title: "count is:",
            saveState: false,
            ...params
        }

        this.setAttribute("is",ELEMENT_NAME)

        this._title = _params.title
        this._counter = _params.counter
        this._saveState = _params.saveState

        if (_params.id) this.id = _params.id

        if (_params.saveState && _params.id) {
            const storedCounter = localStorage.getItem(_params.id)
            this.counter = storedCounter ? parseInt(storedCounter) : 0
        }

        this.setEventListeners()
        this.render()
    }

    get title(): string {
        return this._title
    }

    set title(value: string) {
        this._title = value
    }

    get counter(): number {
        return this._counter
    }

    set counter(value: number) {
        this._counter = value
        this.render()

        if (this._saveState) this.saveState()
    }

    private saveState() {
        localStorage.setItem(this.id, this._counter.toString())
    }

    private render() {
        this.innerHTML = `${this._title} ${this._counter}`
    }

    private setEventListeners() {
        this.addEventListener('click', () => this.counter++)
    }
}

customElements.define(ELEMENT_NAME, CounterButton, { extends: 'button' })
