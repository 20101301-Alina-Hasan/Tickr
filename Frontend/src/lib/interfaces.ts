export interface LoginCredentials {
    username: string
    password: string
}

export interface SignupCredentials {
    username: string
    email: string
    password: string
}

export interface LoginResponse {
    access: string
    refresh: string
}

export interface Task {
    id: number
    title: string
    description: string
    status: "PENDING" | "COMPLETE"
    due_date: string
    user: number
}