import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all'| 'active'| 'completed'

export type TasksType = Array<TaskType>


function App() {

    let [filter,setFilter] = useState('all')

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'css', isDone: true},
        {id: v1(), title: 'js', isDone: true},
        {id: v1(), title: 'react', isDone: false},
    ])

    const addTask = (newTaskTitle:string) => {
        let newTask = {id:v1(),title:newTaskTitle, isDone: false}
        let newTasks = [newTask,...tasks]
        setTasks(newTasks)

    }
    const removeTask = (id: string) => {
        let newTasks = tasks.filter(t => t.id !== id
        )
        setTasks(newTasks)
    }
    const changeFilter = (filter:FilterType) => {
        setFilter(filter)
    }

    let tasksForTodolist = tasks;

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone )}
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone )}



    return (
        <div className="App">
            <Todolist addTask = {addTask} changeFilter={changeFilter} removeTask={removeTask} title={'What to learn'} tasks={tasksForTodolist}/>
        </div>
    );
}


export default App;
