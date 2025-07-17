import { CheckCheck } from "lucide-react"
import type { AuthLayoutProps } from "./interfaces"

export const AuthLayout = ({ children }: AuthLayoutProps) => (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
        <div className="w-full max-w-sm">
            <div className="flex justify-start items-center gap-2 mb-4">
                <div className="size-10 flex items-center justify-center ring-2 ring-border rounded-md">
                    <CheckCheck className="size-5 text-primary" />
                </div>
                <div className="text-4xl font-bold tracking-tight">Tickr</div>
            </div>
            {children}
        </div>
    </div>
)