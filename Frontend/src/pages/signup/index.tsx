import { SignupForm } from "./components"
import { CheckCheck } from "lucide-react"

export const Signup = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex justify-center items-center gap-3 mb-8 px-4">
                    <CheckCheck className="w-8 h-8 text-primary" />
                    <span className="text-4xl font-bold tracking-tight">Tickr</span>
                </div>
                <SignupForm />
            </div>
        </div>
    )
}