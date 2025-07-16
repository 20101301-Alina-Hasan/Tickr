import type { TaskListProps } from "@/lib/interfaces"
import { TaskCard } from "./task-card"
import { EditTaskForm } from "./edit-task-form"


export const TaskList = ({
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
        <div className="space-y-3">
            {tasks
                .filter((task) => filter === "ALL" || task.status === filter)
                .map((task) => (
                    <div key={task.id}>
                        <TaskCard
                            task={task}
                            isSelected={selectedTaskId === task.id}
                            toggle={toggle}
                            onSelect={() =>
                                setSelectedTaskId(selectedTaskId === task.id ? null : task.id)
                            }
                        />
                        {selectedTask && (
                            <EditTaskForm
                                task={selectedTask}
                                setTasks={setTasks}
                                onDelete={() => destroy(task.id)}
                                onSave={() => update(selectedTask)} />
                        )}
                    </div>
                ))}
        </div>
    )
}
