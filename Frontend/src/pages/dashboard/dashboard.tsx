import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, X, CheckCheck } from "lucide-react"
import type { Task } from "./interfaces"
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [newDesc, setNewDesc] = useState("")
    const [newDueDate, setNewDueDate] = useState("")
    const [filter, setFilter] = useState<"ALL" | "PENDING" | "COMPLETE">("ALL")
    const navigate = useNavigate()
    const accessToken = localStorage.getItem("access")

    const handleLogout = () => {
        localStorage.removeItem("access")
        navigate("/login")
    }

    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/tasks/", {
                headers: { Authorization: `Bearer ${accessToken}` },
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
                { headers: { Authorization: `Bearer ${accessToken}` } }
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
            setSelectedTaskId(null)
            fetchTasks()
        } catch (err) {
            console.error("Failed to delete task", err)
        }
    }

    const createTask = async () => {
        if (!newTitle.trim() || !newDueDate) return
        try {
            await axios.post(
                "http://localhost:8000/api/task/",
                { title: newTitle, description: newDesc, due_date: newDueDate },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            setNewTitle("")
            setNewDesc("")
            setNewDueDate("")
            setShowCreateForm(false)
            fetchTasks()
        } catch (err) {
            console.error("Failed to create task", err)
        }
    }

    const updateTask = async (task: Task) => {
        try {
            await axios.put(
                `http://localhost:8000/api/task/${task.id}/`,
                task,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            setSelectedTaskId(null)
            fetchTasks()
        } catch (err) {
            console.error("Failed to update task", err)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const selectedTask = tasks.find((t) => t.id === selectedTaskId)

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white border-b px-6 py-3 shadow-sm flex justify-between items-center">
                <div className="flex-1 flex justify-center items-center gap-2">
                    <CheckCheck className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold">Tickr</span>
                </div>
                <div className="absolute right-6">
                    <Button variant="outline" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </nav>
            <div className="max-w-2xl mx-auto p-6">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                    <h1 className="text-3xl font-bold">Tasks</h1>
                    <div className="flex items-center gap-2">
                        <Select
                            value={filter}
                            onValueChange={(val) => setFilter(val as "ALL" | "PENDING" | "COMPLETE")}
                        >
                            <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Filter" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All</SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="COMPLETE">Complete</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={() => setShowCreateForm(!showCreateForm)}
                            size="sm"
                            className="h-8 w-8"
                            variant={showCreateForm ? "secondary" : "default"}
                        >
                            {showCreateForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>


                {/* Create Task */}
                {showCreateForm && (
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
                            <Button
                                onClick={createTask}
                                disabled={!newTitle.trim() || !newDueDate}
                                className="w-full"
                            >
                                Add Task
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Task List */}
                <div className="space-y-3">
                    {tasks
                        .filter((task) => {
                            if (filter === "ALL") return true
                            return task.status === filter
                        })
                        .map((task) => (
                            <div key={task.id}>
                                {/* Task Card */}
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={task.status === "COMPLETE"}
                                        onCheckedChange={() => toggleStatus(task)}
                                    />
                                    <Card
                                        className={`flex-1 cursor-pointer hover:border-primary ${selectedTaskId === task.id ? "border-primary bg-muted/50" : ""
                                            }`}
                                        onClick={() => setSelectedTaskId(selectedTaskId === task.id ? null : task.id)}
                                    >
                                        <CardContent className="p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <h3
                                                        className={`font-medium truncate ${task.status === "COMPLETE" ? "line-through text-muted-foreground" : ""
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
                                                        setTasks(prev =>
                                                            prev.map(t =>
                                                                t.id === selectedTask.id ? { ...t, title: e.target.value } : t
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
                                                        setTasks(prev =>
                                                            prev.map(t =>
                                                                t.id === selectedTask.id ? { ...t, description: e.target.value } : t
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
                                                        setTasks(prev =>
                                                            prev.map(t =>
                                                                t.id === selectedTask.id ? { ...t, due_date: e.target.value } : t
                                                            )
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="flex justify-between">
                                                <Button variant="destructive" onClick={() => deleteTask(task.id)} size="sm">
                                                    Delete
                                                </Button>
                                                <Button onClick={() => updateTask(selectedTask)} size="sm">
                                                    Save
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}
