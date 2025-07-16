import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { TaskListProps } from "@/lib/interfaces"


export const TaskList = ({
    tasks,
    filter,
    selectedTaskId,
    selectedTask,
    setSelectedTaskId,
    setTasks,
    toggle,
    destroy,
    update,
}: TaskListProps) => {
    return (
        <div className="space-y-3">
            {tasks
                .filter((task) => filter === "ALL" || task.status === filter)
                .map((task) => (
                    <div key={task.id}>
                        {/* Task Card */}
                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={task.status === "COMPLETE"}
                                onCheckedChange={() => toggle(task)}
                            />
                            <Card
                                className={`flex-1 cursor-pointer hover:border-primary ${selectedTaskId === task.id
                                    ? "border-primary bg-muted/50"
                                    : ""
                                    }`}
                                onClick={() =>
                                    setSelectedTaskId(
                                        selectedTaskId === task.id ? null : task.id
                                    )
                                }
                            >
                                <CardContent className="p-3">
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

                        {/* Inline Edit Form */}
                        {selectedTaskId === task.id && selectedTask && (
                            <Card className="ml-9 mt-2 animate-fade-in">
                                <CardContent className="p-4 space-y-4">
                                    <div className="space-y-2">
                                        <Label>Title</Label>
                                        <Input
                                            value={selectedTask.title}
                                            onChange={(e) =>
                                                setTasks((prev) =>
                                                    prev.map((t) =>
                                                        t.id === selectedTask.id
                                                            ? { ...t, title: e.target.value }
                                                            : t
                                                    )
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            value={selectedTask.description}
                                            onChange={(e) =>
                                                setTasks((prev) =>
                                                    prev.map((t) =>
                                                        t.id === selectedTask.id
                                                            ? { ...t, description: e.target.value }
                                                            : t
                                                    )
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Due Date</Label>
                                        <Input
                                            type="date"
                                            value={selectedTask.due_date}
                                            onChange={(e) =>
                                                setTasks((prev) =>
                                                    prev.map((t) =>
                                                        t.id === selectedTask.id
                                                            ? { ...t, due_date: e.target.value }
                                                            : t
                                                    )
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <Button
                                            variant="destructive"
                                            onClick={() => destroy(task.id)}
                                            size="sm"
                                        >
                                            Delete
                                        </Button>
                                        <Button onClick={() => update(selectedTask)} size="sm">
                                            Save
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                ))}
        </div>
    )
}
