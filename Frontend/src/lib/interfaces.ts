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
