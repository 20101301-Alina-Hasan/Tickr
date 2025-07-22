import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CheckCheck, LogOut } from "lucide-react"
import { toast } from "sonner"
import { ToggleMode } from "@/components/common"

export const Navbar = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("access")
        navigate("/login")
        toast.success("You've been logged out successfully!")
    }

    return (
        <nav className="sticky bg-secondary top-0 z-50 border-b px-6 py-3 shadow-sm flex justify-between items-center">
            <div className="flex-1" />
            <div className="flex-1 flex justify-center items-center gap-2">
                <div className="size-7 flex items-center justify-center rounded-full bg-primary">
                    <CheckCheck className="size-4 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold">Tickr</span>
            </div>
            <div className="flex-1 flex justify-end items-center gap-2">
                <ToggleMode />
                <Button variant="outline" size="icon" className="hover:cursor-pointer" onClick={logout}>
                    <LogOut />
                </Button>
            </div>
        </nav>
    )
}