import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

type TaskType = {
    id:number
    title: string
    isDone: boolean
}
export type TasksType = Array<TaskType>


function App() {

    let tasks1:Array<TaskType> = [
        {id: 1,title:'css', isDone: true},
        {id: 2,title:'js', isDone: true},
        {id: 3,title:'react', isDone: false},
    ]
    let tasks2:Array<TaskType> = [
        {id: 1,title:'terminator', isDone: true},
        {id: 2,title:'bkb', isDone: false},
        {id: 3,title:'fortune', isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks ={tasks1}/>
            <Todolist title ={'Films'} tasks = {tasks2}/>

        </div>
    );
}


export default App;
