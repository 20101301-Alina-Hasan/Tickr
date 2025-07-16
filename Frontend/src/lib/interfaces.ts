export interface LoginCredentials {
    username: string
    password: string
}

export interface SignupCredentials {
    username: string
    email: string
    password: string
}

export interface LoginResponse {
    access: string
    refresh: string
}

export interface Task {
    id: number
    title: string
    description: string
    status: "PENDING" | "COMPLETE"
    due_date: string
    user: number
}

export interface TaskListProps {
    tasks: Task[]
    filter: "ALL" | "PENDING" | "COMPLETE"
    selectedTaskId: number | null
    selectedTask: Task | undefined
    setSelectedTaskId: (id: number | null) => void
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    toggle: (task: Task) => void
    destroy: (id: number) => void
    update: (task: Task) => void
}
