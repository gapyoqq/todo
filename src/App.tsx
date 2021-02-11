import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'
export type TasksType = Array<TaskType>
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: 'What to Buy', filter: "all"}])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [{id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'js', isDone: true},
            {id: v1(), title: 'react', isDone: false}],
        [todolistId2]: [{id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'vine', isDone: false}]
    })

    const addTask = (todolistId: string, newTaskTitle: string) => {
        let newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }
    const removeTask = (todolistId: string, id: string) => {
        let newTasks = tasks[todolistId]
        tasks[todolistId] = newTasks.filter(t => t.id !== id
        )
        setTasks({...tasks})
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        let currentTasks = tasks[todolistId]
        let task = currentTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    const changeTaskTitle = (taskId: string, todolistId: string, newTaskTitle: string) => {
        let task = tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            task.title = newTaskTitle
        }
        setTasks({...tasks})
    }


    const changeFilter = (todolistId: string, filter: FilterValueType) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }
    const removeTodolist = (todolistId: string) => {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolists)
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist = (title: string) => {
        let todolist: TodolistType = {id: v1(), title, filter: 'all'}
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }
    const onChangeTodolistTitle = (todolistId: string, newTodolistTitle: string) => {
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.title = newTodolistTitle
        }
        setTodolists([...todolists])
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasks[tl.id]

                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                            }

                            return <Grid item>
                                <Paper style={{paddingBlock: "10px"}}>
                                    <Todolist
                                        onChangeTodolistTitle={onChangeTodolistTitle}
                                        changeTaskTitle={changeTaskTitle}
                                        key={tl.id}
                                        filter={tl.filter}
                                        changeStatus={changeStatus}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        removeTask={removeTask}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        todolistId={tl.id}
                                        removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
