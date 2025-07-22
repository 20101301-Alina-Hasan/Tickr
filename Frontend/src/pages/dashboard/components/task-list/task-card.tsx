import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { TaskCardProps } from "./interfaces"
import { CalendarFold } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export const TaskCard = ({ isMobile, task, isSelected, toggle, onSelect }: TaskCardProps) => {
    if (isMobile) {
        return (
            <div className="flex items-center gap-2">
                <Card
                    className={`flex-1 cursor-pointer hover:border-primary z-10 ${isSelected ? "border-primary bg-accent text-accent-foreground scale-[1.01] rounded-b-none" : ""}`}
                    onClick={onSelect}
                >
                    <CardContent className="flex justify-between items-center">
                        <div className="flex items-center gap-4 max-w-[70%]">
                            <Checkbox
                                checked={task.status === "COMPLETE"}
                                onCheckedChange={() => toggle(task)}
                                onClick={(e) => e.stopPropagation()}
                                className={`size-5 hover:cursor-pointer ${isSelected ? "ring-1 ring-accent" : ""}`}
                            />
                            <div className={`font-medium truncate ${task.status === "COMPLETE" ? "line-through text-muted-foreground" : ""}`}>
                                {task.title}
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground whitespace-nowrap">
                            {new Date(task.due_date).toLocaleDateString()}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <Card
            className={`min-h-64 h-full w-full flex flex-col justify-between cursor-pointer hover:border-primary transition-all ${isSelected ? "border-primary bg-accent text-accent-foreground scale-[1.01]" : ""} w-full min-w-0`}
            onClick={onSelect}
        >
            <CardContent className="flex flex-col h-64 p-6">
                <div className="flex items-center justify-between mb-2">
                    <div className={`text-xl font-medium truncate ${task.status === "COMPLETE" ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                    </div>
                    <Checkbox
                        checked={task.status === "COMPLETE"}
                        onCheckedChange={() => toggle(task)}
                        onClick={(e) => e.stopPropagation()}
                        className={`size-5 hover:cursor-pointer ${isSelected ? "ring-1 ring-accent" : ""}`}
                    />
                </div>
                <Separator />
                <div className="flex-1 text-sm text-gray-600 pt-2 pb-4 overflow-hidden text-ellipsis">
                    {task.description}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground justify-start mt-auto pt-8">
                    <CalendarFold className="size-4" />
                    <span>{new Date(task.due_date).toLocaleDateString()}</span>
                </div>
            </CardContent>
        </Card>
    )
}