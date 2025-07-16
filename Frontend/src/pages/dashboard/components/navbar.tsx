import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CheckCheck } from "lucide-react"

export const Navbar = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("access")
        navigate("/login")
    }

    return (<nav className="sticky top-0 z-50 bg-white border-b px-6 py-3 shadow-sm flex justify-between items-center">
        <div className="flex-1 flex justify-center items-center gap-2">
            <CheckCheck className="w-6 h-6 text-primary" />
            <span className="text-2xl font-bold">Tickr</span>
        </div>
        <div className="absolute right-6">
            <Button variant="outline" onClick={logout}>
                Logout
            </Button>
        </div>
    </nav>)
}