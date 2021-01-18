import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, TasksType} from "./App";
import {v1} from "uuid";

type PropsType = {
    title: string
    tasks: TasksType
    removeTask: (todolistId:string, id: string) => void
    changeFilter: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId:string,newTaskTitle: string) => void
    changeStatus: (todolistId:string,taskId: string, isDone: boolean) => void
    filter: FilterType
    todolistId: string
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addTask(props.todolistId,newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(props.todolistId,newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }

    return <div>
        <h3>
            {props.title}
        </h3>
        <div>
            <input
                className={error ? "error" : ''}
                onKeyPress={onKeyPressHandler}
                value={newTaskTitle} onChange={onChangeHandler}/>
            <button
                onClick={addTask}>+
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {props.tasks.map(t => {
                const onRemoveHandler = () => {
                    props.removeTask(props.todolistId,t.id)
                }
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(props.todolistId,t.id, e.currentTarget.checked)
                }
                return <li key={t.id}
                           className={t.isDone ? "is-done" : ''}>
                    <input onChange={onChangeStatusHandler} type='checkbox' checked={t.isDone}/>
                    <span>{t.title}</span>
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
