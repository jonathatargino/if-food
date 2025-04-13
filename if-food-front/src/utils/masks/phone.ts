export function applyPhoneMask(phoneNumber: string): string {
    return phoneNumber
        .replace(/\D/g, "")
        .substring(0, 11)
        .replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
        .replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3")
        .replace(/^(\d{2})(\d{0,5})$/, "($1) $2")
        .replace(/^(\d{0,2})$/, "($1");
}
