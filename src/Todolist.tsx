import React, {ChangeEvent} from "react";
import {FilterValueType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton,Checkbox} from '@material-ui/core';
import { Delete} from "@material-ui/icons";


type PropsType = {
    title: string
    tasks: TasksType
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, filter: FilterValueType) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, todolistId: string, newValue: string) => void
    filter: FilterValueType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    onChangeTodolistTitle: (todolistId: string, newTodolistTitle: string) => void
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
        props.onChangeTodolistTitle(props.todolistId, newTodolistTitle)
    }
    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={onChangeTodolistTitle}/>
            <IconButton aria-label={'delete'} onClick={() => {
                props.removeTodolist(props.todolistId)
            }}><Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {props.tasks.map(t => {
                const onRemoveHandler = () => {
                    props.removeTask(props.todolistId, t.id)
                }
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(props.todolistId, t.id, e.currentTarget.checked)
                }
                const onChangeTaskTitle = (newValue: string) => {
                    props.changeTaskTitle(t.id, props.todolistId, newValue)
                }
                return <div key={t.id}
                           className={t.isDone ? "is-done" : ''}>
                    <Checkbox onChange={onChangeStatusHandler}  checked={t.isDone}/>
                    <EditableSpan onChange={onChangeTaskTitle} title={t.title}/>
                    <IconButton aria-label={'delete'} onClick={onRemoveHandler}><Delete/>
                    </IconButton>
                </div>
            })
            }
        </div>
        <div>
            <Button
                variant={props.filter === "all" ? "contained" : "text"}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                variant={props.filter === "active" ? "contained" : "text"}
                color={'primary'}

                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                color={'secondary'}
                variant={props.filter === "completed" ? "contained" : "text"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


