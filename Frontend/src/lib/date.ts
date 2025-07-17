export function formatDate(date: Date | undefined) {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

export function parseDate(dateStr: string) {
    const date = new Date(dateStr)
    return isNaN(date.getTime()) ? undefined : date
}