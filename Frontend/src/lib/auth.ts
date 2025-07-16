import axios from "axios"
import type { LoginCredentials, SignupCredentials, LoginResponse } from "./interfaces"

export const login = async ({ username, password }: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
    })

    const { access, refresh } = response.data

    localStorage.setItem("access", access)
    localStorage.setItem("refresh", refresh)

    return { access, refresh }
}

export const signup = async ({ username, email, password }: SignupCredentials): Promise<void> => {
    await axios.post("http://localhost:8000/api/register/", {
        username,
        email,
        password,
    })
}