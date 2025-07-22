import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, X } from "lucide-react"
import type { HeaderProps, FilterType } from "./interfaces"

export const Header = ({ username, filter, setFilter, showCreateForm, setShowCreateForm }: HeaderProps) => {
    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="max-w-[80%] break-words gap-2">
                    <div className="text-4xl font-bold leading-tight">
                        Hello, {username}
                    </div>
                    <div className="text-muted-foreground">Let’s tick off what’s next</div>
                </div>
                <div className="flex items-center gap-2">
                    <Select
                        value={filter}
                        onValueChange={(val) => setFilter(val as FilterType)}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="COMPLETE">Complete</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        size="icon"
                        className="size-8 hover:cursor-pointer"
                        variant={showCreateForm ? "secondary" : "default"}
                    >
                        {showCreateForm ? <X className="size-4" /> : <Plus className="size-4" />}
                    </Button>
                </div>
            </div>
            <Separator className="my-4" />
        </>
    )
}
