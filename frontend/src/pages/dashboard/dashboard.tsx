import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import type { Task } from "./interfaces"


export const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [newTitle, setNewTitle] = useState("")
    const [newDesc, setNewDesc] = useState("")
    const [newDueDate, setNewDueDate] = useState("")


    const accessToken = localStorage.getItem("access")

    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/tasks/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            setTasks(res.data)
        } catch (err) {
            console.error("Failed to load tasks", err)
        }
    }

    const toggleStatus = async (task: Task) => {
        const updatedStatus = task.status === "COMPLETE" ? "PENDING" : "COMPLETE"
        try {
            await axios.patch(
                `http://localhost:8000/api/task/${task.id}/`,
                { status: updatedStatus },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            fetchTasks()
        } catch (err: unknown) {
            const error = err as AxiosError
            console.error("Failed to toggle status:", error.response?.data || error.message)
        }
    }

    const deleteTask = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/api/task/${id}/`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            setSelectedTask(null)
            fetchTasks()
        } catch (err) {
            console.error("Failed to delete task", err)
        }
    }

    const createTask = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/task/",
                { title: newTitle, description: newDesc, due_date: newDueDate },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            setTasks((prev) => [...prev, response.data])
            setNewTitle("")
            setNewDesc("")
            setNewDueDate("")
        } catch (err) {
            console.error("Failed to create task", err)
        }
    }

    const updateTask = async () => {
        if (!selectedTask) return
        try {
            await axios.put(
                `http://localhost:8000/api/task/${selectedTask.id}/`,
                selectedTask,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            fetchTasks()
            setSelectedTask(null)
        } catch (err) {
            console.error("Failed to update task", err)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">My To-Do List</h1>

            {/* Create Task */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Create Task</CardTitle>
                    <CardDescription>Add a new task to your list.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Input
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="Description"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                    />
                    <Input
                        type="date"
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                    />
                    <Button onClick={createTask} disabled={!newTitle.trim() || !newDueDate}>
                        Add Task
                    </Button>
                </CardContent>
            </Card>

            {/* List of Tasks */}
            <div className="space-y-4">
                {tasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3">
                        <Checkbox
                            className="mt-4"
                            checked={task.status === "COMPLETE"}
                            onCheckedChange={() => toggleStatus(task)}
                        />
                        <Card
                            className="w-full cursor-pointer hover:border-primary"
                            onClick={() => setSelectedTask(task)}
                        >
                            <CardContent className="py-4">
                                <div className="flex flex-col">
                                    <span className={task.status === "COMPLETE" ? "line-through font-medium" : "font-medium"}>
                                        {task.title}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Due: {new Date(task.due_date).toLocaleDateString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Task Detail Dialog */}
            {selectedTask && (
                <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
                    <DialogContent className="max-w-md">
                        <Card>
                            <CardHeader>
                                <CardTitle>Edit Task</CardTitle>
                                <CardDescription>View or edit this task</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label>Title</Label>
                                    <Input
                                        value={selectedTask.title}
                                        onChange={(e) =>
                                            setSelectedTask({ ...selectedTask, title: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        value={selectedTask.description}
                                        onChange={(e) =>
                                            setSelectedTask({ ...selectedTask, description: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Due Date</Label>
                                    <Input
                                        type="date"
                                        value={selectedTask.due_date}
                                        onChange={(e) =>
                                            setSelectedTask({ ...selectedTask, due_date: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <Button variant="destructive" onClick={() => deleteTask(selectedTask.id)}>
                                        Delete
                                    </Button>
                                    <Button onClick={updateTask}>Save</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}
