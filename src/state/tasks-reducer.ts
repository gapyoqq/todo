import {FilterValueType, TasksStateType, TasksType, TaskType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type ActionType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType


export type RemoveTaskACType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type AddTaskACType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type ChangeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
type ChangeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            state[action.todolistId] = state[action.todolistId].filter(t => t.id !== action.taskId)
            return {...state}
        case "ADD-TASK":
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = [newTask, ...todolistTasks]
            return {...state}
        case "CHANGE-TASK-STATUS":
            state[action.todolistId].find((t) => {
                if (t.id === action.taskId) {
                    t.isDone = action.isDone
                }
            })
            return {...state}
        case "CHANGE-TASK-TITLE":
            state[action.todolistId].find((t) => {
                if (t.id === action.taskId) {
                    t.title = action.title
                }
            })
            return {...state}
        case    'ADD-TODOLIST':
            state[action.todolistId] = []
            return {...state}
        case "REMOVE-TODOLIST":
            delete state[action.id]
            return {...state}
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskACType => ({
    type: "REMOVE-TASK",
    taskId,
    todolistId
})

export const addTaskAC = (title: string, todolistId: string): AddTaskACType => ({
    type: "ADD-TASK",
    title,
    todolistId
})

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusACType => ({
    type: "CHANGE-TASK-STATUS",
    taskId,
    isDone,
    todolistId
})
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleACType => ({
    type: "CHANGE-TASK-TITLE",
    taskId,
    title,
    todolistId
})

