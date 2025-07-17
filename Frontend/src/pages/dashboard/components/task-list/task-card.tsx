import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { TaskCardProps } from "./interfaces"

export const TaskCard = ({ task, isSelected, toggle, onSelect }: TaskCardProps) => {
    return (
        <div className="flex items-center gap-3">
            <Checkbox
                checked={task.status === "COMPLETE"}
                onCheckedChange={() => toggle(task)}
            />
            <Card
                className={`flex-1 cursor-pointer hover:border-primary z-10 ${isSelected ? "border-primary bg-accent-foreground text-accent shadow-md scale-[1.01] rounded-b-none" : ""
                    }`}
                onClick={onSelect}
            >
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <h3
                                className={`font-medium truncate ${task.status === "COMPLETE"
                                    ? "line-through text-muted-foreground"
                                    : ""
                                    }`}
                            >
                                {task.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Due: {new Date(task.due_date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
