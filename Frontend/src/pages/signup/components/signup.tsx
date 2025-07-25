import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signup } from "@/lib/auth"
import { toast } from "sonner"

export const SignupForm: React.FC<React.ComponentProps<"div">> = ({
    className,
    ...props
}) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            await signup({ username, email, password })
            navigate("/login")
            toast.success("Account created successfully!")
        } catch (error: unknown) {
            console.error("Signup error:", error)
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                const detail = error.response.data?.email?.[0] || error.response.data?.username?.[0];
                if (detail?.includes("already exists")) {
                    setError("User already registered.");
                } else {
                    setError("Invalid input. Please try again.");
                }
            } else {
                setError("Something went wrong.");
            }
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create your own Tickr account</CardTitle>
                    <CardDescription>
                        Enter your credentials and start managing today
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="john.doe"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && (
                                <p className="text-destructive text-sm -mt-2">{error}</p>
                            )}
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="hover:cursor-pointer w-full">
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="underline underline-offset-4 text-primary hover:underline"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
