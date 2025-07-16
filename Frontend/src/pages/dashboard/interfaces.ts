export interface Task {
    id: number
    title: string
    description: string
    status: "PENDING" | "COMPLETE"
    due_date: string
    user: number
}