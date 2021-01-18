import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'
export type TasksType = Array<TaskType>
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}


function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: "active"},
        {id: todolistId2, title: 'What to Buy', filter: "completed"}])

    let [tasks, setTasks] = useState({
        [todolistId1]: [{id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'js', isDone: true},
            {id: v1(), title: 'react', isDone: false}],
        [todolistId2]: [{id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'vine', isDone: false}]
    })

    const addTask = (todolistId:string,newTaskTitle: string) => {
        let newTasks = tasks[todolistId]
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        let currentTasks = [newTask, ...newTasks]
        tasks[todolistId] = currentTasks
        setTasks({...tasks})
    }
    const removeTask = (todolistId: string, id: string) => {
        let newTasks = tasks[todolistId]
        let filteredTasks = newTasks.filter(t => t.id !== id
        )
        tasks[todolistId] = filteredTasks
        setTasks({...tasks})
    }
    const changeFilter = (todolistId: string, filter: FilterType) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        let currentTasks = tasks[todolistId]
        let task = currentTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }


    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasks[tl.id]

                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }

                    return <Todolist
                        key={tl.id}
                        filter={tl.filter}
                        changeStatus={changeStatus}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        removeTask={removeTask} title={tl.title}
                        tasks={tasksForTodolist}
                        todolistId={tl.id}/>
                })
            }

        </div>
    );
}


export default App;
