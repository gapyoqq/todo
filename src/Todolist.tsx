import React, {ChangeEvent} from "react";
import {FilterType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    title: string
    tasks: TasksType
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string,todolistId: string, newValue: string) => void
    filter: FilterType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    onChangeTodolistTitle:(todolistId: string, newTodolistTitle: string)=> void
}

export function Todolist(props: PropsType) {


    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }
    const addTask = (title: string) => {
        props.addTask(props.todolistId, title)
    }
    const onChangeTodolistTitle = (newTodolistTitle: string) => {
        props.onChangeTodolistTitle(props.todolistId,newTodolistTitle)
    }
    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={onChangeTodolistTitle}/>
            <button onClick={() => {
                props.removeTodolist(props.todolistId)
            }}>x
            </button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {props.tasks.map(t => {
                const onRemoveHandler = () => {
                    props.removeTask(props.todolistId, t.id)
                }
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(props.todolistId, t.id, e.currentTarget.checked)
                }
                const onChangeTaskTitle = (newValue: string)=> {
                   props.changeTaskTitle(t.id, props.todolistId, newValue)
                }
                return <li key={t.id}
                           className={t.isDone ? "is-done" : ''}>
                    <input onChange={onChangeStatusHandler} type='checkbox' checked={t.isDone}/>
                    <EditableSpan onChange={onChangeTaskTitle} title={t.title}/>
                    <button onClick={onRemoveHandler}>x
                    </button>
                </li>
            })
            }
        </ul>
        <div>
            <button
                className={props.filter === "all" ? "active-filter" : ""}
                onClick={onAllClickHandler}>All
            </button>
            <button
                className={props.filter === "active" ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active
            </button>
            <button
                className={props.filter === "completed" ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


