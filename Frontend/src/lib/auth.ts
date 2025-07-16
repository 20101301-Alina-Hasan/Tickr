import axios from "axios"

export const login = async (username: string, password: string) => {
    const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
    })

    const { access, refresh } = response.data

    localStorage.setItem("access", access)
    localStorage.setItem("refresh", refresh)

    return { access, refresh }
}

export const signup = async (
    username: string,
    email: string,
    password: string
): Promise<void> => {
    await axios.post("http://localhost:8000/api/register/", {
        username,
        email,
        password,
    })
}