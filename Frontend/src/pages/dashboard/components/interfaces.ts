export type FilterType = "ALL" | "PENDING" | "COMPLETE"

export interface HeaderProps {
    filter: FilterType
    setFilter: (val: FilterType) => void
    showCreateForm: boolean
    setShowCreateForm: (val: boolean) => void
}

export interface AddTaskFormProps {
    newTitle: string
    setNewTitle: (val: string) => void
    newDesc: string
    setNewDesc: (val: string) => void
    newDueDate: string
    setNewDueDate: (val: string) => void
    showCreateForm: boolean
    onSubmit: () => void
}