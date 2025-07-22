import { useEffect, useState, useCallback } from "react"
import type { Task } from "@/lib/interfaces"
import {
    getTasks,
    toggleTaskStatus,
    deleteTask,
    createTask,
    updateTask,
} from "@/lib/tasks"
import { Header, AddTaskForm, TaskList } from "./components"
import { Navbar } from "./components/navbar"
import { toast } from "sonner"
import { useIsMobile } from "@/lib/hooks/use-mobile"


export const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [newDesc, setNewDesc] = useState("")
    const [newDueDate, setNewDueDate] = useState("")
    const [filter, setFilter] = useState<"ALL" | "PENDING" | "COMPLETE">("ALL")

    const isMobile = useIsMobile()

    const accessToken = localStorage.getItem("access")

    const fetchAll = useCallback(async () => {
        try {
            const data = await getTasks(accessToken!)
            setTasks(data)
        } catch (error) {
            console.error("Failed to load tasks", error)
            toast.error("Could not load tasks. Please try again later.")
        }
    }, [accessToken])

    const toggle = async (task: Task) => {
        try {
            await toggleTaskStatus(task, accessToken!)
            fetchAll()
            toast.success(`Marked "${task.title}" as ${task.status === "COMPLETE" ? "pending" : "complete"}.`)
        } catch (error) {
            console.error("Failed to toggle status", error)
            toast.error("Could not update task status. Please try again later.")
        }
    }

    const destroy = async (id: number) => {
        try {
            await deleteTask(id, accessToken!)
            setSelectedTaskId(null)
            fetchAll()
            toast.success("Task deleted successfully!")
        } catch (error) {
            console.error("Failed to delete task", error)
            toast.error("Could not delete task. Please try again later.")
        }
    }

    const add = async () => {
        if (!newTitle.trim() || !newDueDate) return
        try {
            await createTask(newTitle, newDesc, newDueDate, accessToken!)
            setNewTitle("")
            setNewDesc("")
            setNewDueDate("")
            setShowCreateForm(false)
            fetchAll()
            toast.success("New task added successfully!")
        } catch (error) {
            console.error("Failed to create task", error)
            toast.error("Could not create task. Please try again later.")
        }
    }

    const update = async (task: Task) => {
        try {
            await updateTask(task, accessToken!)
            setSelectedTaskId(null)
            fetchAll()
            toast.success("Task updated successfully!")
        } catch (error) {
            console.error("Failed to update task", error)
            toast.error("Could not update task. Please try again later.")
        }
    }

    useEffect(() => {
        fetchAll()
    }, [fetchAll])

    const selectedTask = tasks.find((t) => t.id === selectedTaskId)
    const username = localStorage.getItem('username')

    return (
        <>
            <Navbar />
            <div className={`mx-auto ${isMobile ? "max-w-2xl p-6" : "max-w-6xl py-6 px-12"}`}>
                <Header
                    username={username!}
                    filter={filter}
                    setFilter={setFilter}
                    showCreateForm={showCreateForm}
                    setShowCreateForm={setShowCreateForm}
                />
                <AddTaskForm newTitle={newTitle}
                    setNewTitle={setNewTitle}
                    newDesc={newDesc}
                    setNewDesc={setNewDesc}
                    newDueDate={newDueDate}
                    setNewDueDate={setNewDueDate}
                    showCreateForm={showCreateForm}
                    onSubmit={add}
                />
                <TaskList
                    isMobile={isMobile}
                    tasks={tasks}
                    filter={filter}
                    selectedTaskId={selectedTaskId}
                    selectedTask={selectedTask}
                    setSelectedTaskId={setSelectedTaskId}
                    setTasks={setTasks}
                    toggle={toggle}
                    destroy={destroy}
                    update={update}
                />
            </div >
        </>
    )
}
