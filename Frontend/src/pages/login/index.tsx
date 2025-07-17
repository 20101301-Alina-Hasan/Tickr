import { AuthLayout } from "@/components/common/auth-layout"
import { LoginForm } from "./components"

export const Login = () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    )
}