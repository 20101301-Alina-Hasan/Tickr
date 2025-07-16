import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { AddTaskFormProps } from "./interfaces"

export const AddTaskForm = ({
    newTitle,
    setNewTitle,
    newDesc,
    setNewDesc,
    newDueDate,
    setNewDueDate,
    showCreateForm,
    onSubmit,
}: AddTaskFormProps) => {
    if (!showCreateForm) return null

    const isDisabled = !newTitle.trim() || !newDueDate

    return (
        <Card className="mb-6 animate-fade-in">
            <CardContent className="p-4 space-y-3">
                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                        placeholder="Description"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                        type="date"
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                    />
                </div>
                <Button onClick={onSubmit} disabled={isDisabled} className="w-full">
                    Add Task
                </Button>
            </CardContent>
        </Card>
    )
}
