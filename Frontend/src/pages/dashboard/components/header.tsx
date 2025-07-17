import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, X } from "lucide-react"
import type { HeaderProps, FilterType } from "./interfaces"

export const Header = ({ filter, setFilter, showCreateForm, setShowCreateForm }: HeaderProps) => {
    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <h1 className="text-3xl font-bold">Tasks</h1>
                <div className="flex items-center gap-2">
                    <Select
                        value={filter}
                        onValueChange={(val) => setFilter(val as FilterType)}
                    >
                        <SelectTrigger className="w-[130px]">
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
                        {showCreateForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
            <Separator className="my-4" />
        </>

    )
}
