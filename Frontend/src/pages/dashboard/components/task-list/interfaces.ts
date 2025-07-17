import type { Task } from "@/lib/interfaces"

export interface TaskCardProps {
    task: Task
    isSelected: boolean
    toggle: (task: Task) => void
    onSelect: () => void
}

export interface EditTaskFormProps {
    task: Task
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    onDelete: () => void
    onSave: () => void
    onAnimate?: boolean
}

