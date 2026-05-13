import {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {Button} from "./Button.tsx";

type PropsType = {
    id: number
    title: string
    tasks: Array<TasksType>
    students: Array<string>
    removeTask: (taskId: string, todolistId: number) => void
    changeFilter: (value: FilterValuesType, todolistId: number) => void
    addTask: (title: string, todolistId: number) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void
    removeTodolist: (id: number) => void
    filter: FilterValuesType
    removeAllTasksInOneTodo: (todolistId: number) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            props.addTask(title, props.id)
            setTitle("")
        }
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const addTaskHandler = () => {
        props.addTask(title, props.id)
    }

    const changeFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter, props.id)
    }

    return <div>
        <h3> {props.title}
            <Button onClick={removeTodolistHandler}>x
            </Button>

        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button onClick={addTaskHandler}>+
            </Button>
            {error && <div className="error-message">{error}</div>}

        </div>

        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
                    }
                    const removeTaskHandler = () => {
                        props.removeTask(t.taskId, props.id)
                    }

                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button onClick={removeTaskHandler}>x
                        </Button>
                    </li>
                })
            }
        </ul>
        <div>
            <Button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={() => {changeFilterHandler("all")
                    }}>All
            </Button>
            <Button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={() => {changeFilterHandler("active")
                    }}>Active
            </Button>
            <Button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={() => {changeFilterHandler("completed")
                    }}>Completed
            </Button>
        </div>
        <div>
            <Button onClick={() => props.removeAllTasksInOneTodo(props.id)}>REMOVE ALL TASKS</Button>
        </div>
        <p></p>
        {
            props.students.map((el) => {
                return (
                    <div>{el}</div>
                )
            })
        }
    </div>
}
