import axios from "axios"
import type { Task } from "./interfaces"
import { API_BASE } from "./config"

export const getTasks = async (accessToken: string): Promise<Task[]> => {
    const res = await axios.get(`${API_BASE}/tasks/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    })
    return res.data
}

export const toggleTaskStatus = async (task: Task, accessToken: string): Promise<void> => {
    const updatedStatus = task.status === "COMPLETE" ? "PENDING" : "COMPLETE"
    await axios.patch(
        `${API_BASE}/task/${task.id}/`,
        { status: updatedStatus },
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    )
}

export const deleteTask = async (taskId: number, accessToken: string): Promise<void> => {
    await axios.delete(`${API_BASE}/task/${taskId}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    })
}

export const createTask = async (
    title: string,
    description: string,
    dueDate: string,
    accessToken: string
): Promise<void> => {
    await axios.post(
        `${API_BASE}/task/`,
        { title, description, due_date: dueDate },
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    )
}

export const updateTask = async (task: Task, accessToken: string): Promise<void> => {
    await axios.put(`${API_BASE}/task/${task.id}/`, task, {
        headers: { Authorization: `Bearer ${accessToken}` },
    })
}
