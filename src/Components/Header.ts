export class Header {
    static add() {
        const header = document.createElement('header')
        header.innerHTML = `
            <nav>
                <ul>
                    <li><a href="/public">First page</a></li>
                    <li><a href="/second-page.html">Second page</a></li>
                </ul>
            </nav>
        `

        document.body.insertBefore(header, document.body.firstChild)
    }
}
