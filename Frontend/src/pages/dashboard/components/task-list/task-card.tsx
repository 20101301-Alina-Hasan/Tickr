import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { TaskCardProps } from "./interfaces"

export const TaskCard = ({ task, isSelected, toggle, onSelect }: TaskCardProps) => {
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
                            className={`w-5 h-5 hover:cursor-pointer ${isSelected ? "ring-1 ring-accent" : ""}`}
                        />
                        <div
                            className={`font-medium truncate ${task.status === "COMPLETE" ? "line-through text-muted-foreground" : ""
                                }`}
                        >
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
