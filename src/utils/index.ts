export * from "./CookieManager.ts"

export function getNoun(n: number, forms: [string, string, string]): string {
    return forms[
        n % 10 == 1 && n % 100 != 11 ? 0 :
            n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 :
                2
        ]
}

export function getNounWithNumber(n: number, forms: [string, string, string]): string{
    return `${n} ${getNoun(n, forms)}`
}
