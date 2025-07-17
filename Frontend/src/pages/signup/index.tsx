import { AuthLayout } from "@/components/common/auth-layout"
import { SignupForm } from "./components"

export const Signup = () => {
    return (
        <AuthLayout>
            <SignupForm />
        </AuthLayout>
    )
}