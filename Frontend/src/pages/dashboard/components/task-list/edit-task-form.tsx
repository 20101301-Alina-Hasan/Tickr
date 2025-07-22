import { DatePicker } from "@/components/common"
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
                        placeholder="What do you wanna do?"
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
                        placeholder="Add some details..."
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
                    <DatePicker
                        value={task.due_date}
                        onChange={(newDate) =>
                            setTasks((prev) =>
                                prev.map((t) =>
                                    t.id === task.id ? { ...t, due_date: newDate } : t
                                )
                            )
                        }
                    />
                </div>
                <div className="flex justify-end gap-3">
                    <Button
                        variant="default"
                        size="lg"
                        onClick={onSave}
                        className="hover:cursor-pointer"
                    >
                        <Save className="size-4" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="lg"
                        onClick={onDelete}
                        className="hover:cursor-pointer"
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
