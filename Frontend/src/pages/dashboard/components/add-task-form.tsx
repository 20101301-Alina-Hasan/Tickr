import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/common";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { AddTaskFormProps } from "./interfaces";

export const AddTaskForm = ({
    isMobile,
    newTitle,
    setNewTitle,
    newDesc,
    setNewDesc,
    newDueDate,
    setNewDueDate,
    showCreateForm,
    setShowCreateForm,
    onSubmit,
}: AddTaskFormProps) => {
    if (!showCreateForm) return null;

    const isDisabled = !newTitle.trim() || !newDueDate;

    const FormContent = (
        <div className="space-y-6">
            <div className="space-y-3">
                <Label>Title</Label>
                <Input
                    placeholder="What do you wanna do?"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
            </div>
            <div className="space-y-3">
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
            <Button
                onClick={onSubmit}
                disabled={isDisabled}
                className="w-full text-md"
                size="lg"
            >
                Create
            </Button>
        </div>
    );

    if (isMobile) {
        return (
            <>
                <Card>
                    <CardContent className="px-6 space-y-6 py-6">
                        {FormContent}
                    </CardContent>
                </Card>
                <Separator className="my-4" />
            </>
        );
    }

    return (
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
            <DialogContent className="sm:max-w-2xl p-14">
                <DialogHeader>
                    <DialogTitle className="text-3xl">Create New Task</DialogTitle>
                    <Separator className="my-4" />
                </DialogHeader>
                {FormContent}
            </DialogContent>
        </Dialog>
    );
};
