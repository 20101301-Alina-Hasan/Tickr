import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Trash2, Save } from "lucide-react"
import type { EditTaskFormProps } from "./interfaces"

export const EditTaskForm = ({
    task,
    setTasks,
    onDelete,
    onSave,
}: EditTaskFormProps) => {
    return (
        <Card className="z-0 -mt-6 -mx-[0.15rem] rounded-t-none border-t-0">
            <CardContent className="p-6 pb-0 space-y-6">
                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                        value={task.title}
                        onChange={(e) =>
                            setTasks((prev) =>
                                prev.map((t) =>
                                    t.id === task.id ? { ...t, title: e.target.value } : t
                                )
                            )
                        }
                    />
                </div>
                <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                        value={task.description}
                        onChange={(e) =>
                            setTasks((prev) =>
                                prev.map((t) =>
                                    t.id === task.id ? { ...t, description: e.target.value } : t
                                )
                            )
                        }
                    />
                </div>
                <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                        type="date"
                        value={task.due_date}
                        onChange={(e) =>
                            setTasks((prev) =>
                                prev.map((t) =>
                                    t.id === task.id ? { ...t, due_date: e.target.value } : t
                                )
                            )
                        }
                    />
                </div>
                <div className="flex justify-end gap-3">
                    <Button
                        size="lg"
                        onClick={onSave}
                        className="hover:cursor-pointer"
                    >
                        <Save className="size-5" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="lg"
                        onClick={onDelete}
                        className="hover:cursor-pointer"
                    >
                        <Trash2 className="size-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
