export interface CookieOptions {
    expires?: Date,
    maxAge?: number,
    domain?: string,
    path?: string,
    secure?: boolean,
    httpOnly?: boolean,
    sameSite?: 'Lax' | 'Strict' | 'None'
}

export class CookieManager {
    static setCookie(name: string, value: string | object, options?: CookieOptions) {
        if (!CookieManager.isValidCookieName(name)) {
            throw new Error('Invalid cookie name')
        }

        options = {
            path: '/',
            sameSite: "None",
            ...options
        }

        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }

        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

        if (options.expires instanceof Date) {
            cookieString += `;expires=${options.expires.toUTCString()}`
        }

        if (options.maxAge) {
            cookieString += `;max-age=${options.maxAge}`
        }

        if (options.domain) {
            cookieString += `;domain=${options.domain}`
        }

        if (options.path) {
            cookieString += `;path=${options.path}`
        }

        if (options.secure === true) {
            cookieString += ';secure'
        }

        if (options.httpOnly === true) {
            cookieString += ';httpOnly'
        }

        if (options.sameSite && ['Lax', 'Strict', 'None'].includes(options.sameSite)) {
            cookieString += `;SameSite=${options.sameSite}`
        }

        document.cookie = cookieString
    }

    static getCookie(name: string, decode=false) {
        if (!CookieManager.isValidCookieName(name)) {
            throw new Error('Invalid cookie name')
        }

        const nameEQ = name + "="
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) === 0) {
                return decode ? decodeURIComponent(c.substring(nameEQ.length, c.length)) : c.substring(nameEQ.length, c.length)
            }
        }
        return null
    }

    static getAllCookies() {
        return document.cookie
            .split('; ')
            .map(cookie => {
                const [name, value] = cookie.split('=')
                return {[name]: decodeURIComponent(value)}
            })
            .reduce((acc, cookie) => Object.assign(acc, cookie), {})
    }

    static deleteCookie(name: string) {
        if (!CookieManager.isValidCookieName(name)) {
            throw new Error('Invalid cookie name')
        }

        this.setCookie(name, '', {expires: new Date(0)})
    }

    static includeCookie(name: string, matchCase: boolean = true) {
        if (!CookieManager.isValidCookieName(name)) {
            throw new Error('Invalid cookie name')
        }

        let cookie = document.cookie

        if (!matchCase) {
            cookie = cookie.toLowerCase()
            name = name.toLowerCase()
        }

        return cookie.includes(name)
    }

    static lengthCookie() {
        if (document.cookie === "") return 0
        return document.cookie.split('; ').length
    }

    static clearAllCookies() {
        const cookies = document.cookie.split(' ')

        cookies.forEach(cookie => {
            const [name] = cookie.split('=')
            this.deleteCookie(name.trim())
        })
    }

    static isValidCookieName(name: string) {
        return /^[a-zA-Z0-9_-]+$/.test(name)
    }
}