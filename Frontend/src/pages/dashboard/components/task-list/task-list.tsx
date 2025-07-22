import type { TaskListProps } from "@/lib/interfaces"
import { TaskCard } from "./task-card"
import { EditTaskForm } from "./edit-task-form"

export const TaskList = ({
    isMobile,
    tasks,
    filter,
    toggle,
    selectedTaskId,
    setSelectedTaskId,
    selectedTask,
    setTasks,
    destroy,
    update,
}: TaskListProps) => {
    return (
        <div className={isMobile ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}>
            {
                tasks
                    .filter((task) => filter === "ALL" || task.status === filter)
                    .map((task) => (
                        <div key={task.id} className={isMobile ? "space-y-0" : ""}>
                            <TaskCard
                                isMobile={isMobile}
                                task={task}
                                isSelected={selectedTaskId === task.id}
                                toggle={toggle}
                                onSelect={() =>
                                    setSelectedTaskId(selectedTaskId === task.id ? null : task.id)
                                }
                            />
                            {selectedTaskId === task.id && selectedTask && (
                                <EditTaskForm
                                    task={selectedTask}
                                    setTasks={setTasks}
                                    onDelete={() => destroy(task.id)}
                                    onSave={() => update(selectedTask)} />
                            )}
                        </div>
                    ))
            }
        </div >
    )
}
