import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/hooks"

export const ToggleMode = () => {
    const { theme, setTheme } = useTheme()
    const [spinning, setSpinning] = useState(false)

    const toggleTheme = () => {
        setSpinning(true)
        setTheme(theme === "dark" ? "light" : "dark")
        setTimeout(() => setSpinning(false), 600)
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme} className="hover:cursor-pointer">
            {theme === "dark" ? (
                <Sun className={`h-[1.2rem] w-[1.2rem] ${spinning ? "spin" : ""}`} />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
        </Button>
    )
}