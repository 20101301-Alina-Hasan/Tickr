import axios from "axios"
import type { LoginCredentials, SignupCredentials, LoginResponse } from "./interfaces"
import { API_BASE } from "./config"
import { toast } from "sonner"

export const login = async ({ username, password }: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post(`${API_BASE}/token/`, {
        username,
        password,
    })

    const { access, refresh } = response.data

    localStorage.setItem("access", access)
    localStorage.setItem("refresh", refresh)
    localStorage.setItem("username", username)

    toast.success("Login successful!")
    return { access, refresh }
}

export const signup = async ({ username, email, password }: SignupCredentials): Promise<void> => {
    await axios.post(`${API_BASE}/register/`, {
        username,
        email,
        password,
    })

    toast.success("Account created successfully!")
}