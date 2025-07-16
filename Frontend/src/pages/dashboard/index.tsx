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

export const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [newDesc, setNewDesc] = useState("")
    const [newDueDate, setNewDueDate] = useState("")
    const [filter, setFilter] = useState<"ALL" | "PENDING" | "COMPLETE">("ALL")

    const accessToken = localStorage.getItem("access")

    const fetchAll = useCallback(async () => {
        try {
            const data = await getTasks(accessToken!)
            setTasks(data)
        } catch (err) {
            console.error("Failed to load tasks", err)
        }
    }, [accessToken])

    const toggle = async (task: Task) => {
        try {
            await toggleTaskStatus(task, accessToken!)
            fetchAll()
        } catch (err) {
            console.error("Failed to toggle status", err)
        }
    }

    const destroy = async (id: number) => {
        try {
            await deleteTask(id, accessToken!)
            setSelectedTaskId(null)
            fetchAll()
        } catch (err) {
            console.error("Failed to delete task", err)
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
        } catch (err) {
            console.error("Failed to create task", err)
        }
    }

    const update = async (task: Task) => {
        try {
            await updateTask(task, accessToken!)
            setSelectedTaskId(null)
            fetchAll()
        } catch (err) {
            console.error("Failed to update task", err)
        }
    }

    useEffect(() => {
        fetchAll()
    }, [fetchAll])

    const selectedTask = tasks.find((t) => t.id === selectedTaskId)

    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto p-6">
                <Header
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
            </div>
        </>
    )
}
