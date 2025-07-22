import { DatePicker } from "@/components/common"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { AddTaskFormProps } from "./interfaces"

export const AddTaskForm = ({
    isMobile,
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
        <>
            <Card>
                <CardContent className="px-6  space-y-6">
                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                            placeholder="What do you wanna do?"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Add some details..."
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                        />
                    </div>
                    <DatePicker
                        value={newDueDate}
                        onChange={setNewDueDate}
                        label="Due Date"
                    />
                    <Button onClick={onSubmit} disabled={isDisabled} className="w-full text-md hover: cursor-pointer" size="lg">
                        Create
                    </Button>
                </CardContent>
            </Card>
            <Separator className="my-4" />
        </>
    )
}
