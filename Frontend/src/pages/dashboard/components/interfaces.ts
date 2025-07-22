export type FilterType = "ALL" | "PENDING" | "COMPLETE"

export interface HeaderProps {
    username: string
    filter: FilterType
    setFilter: (val: FilterType) => void
    showCreateForm: boolean
    setShowCreateForm: (val: boolean) => void
}

export interface AddTaskFormProps {
    isMobile: boolean
    newTitle: string
    setNewTitle: (val: string) => void
    newDesc: string
    setNewDesc: (val: string) => void
    newDueDate: string
    setNewDueDate: (val: string) => void
    showCreateForm: boolean
    setShowCreateForm: (open: boolean) => void
    onSubmit: () => void
}

export interface NavbarProps {
    isMobile: boolean
}