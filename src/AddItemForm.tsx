import {IconButton, TextField} from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {ControlPoint} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (newTaskTitle: string) => void
}

export function AddItemForm(props: AddItemFormType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        }
    }
    const addItem = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return <div>
        <TextField
            onBlur={() => {
                setError(null)
            }}
            error={!!error}
            helperText={error}
            label='Type value'
            variant={"outlined"}
            className={error ? "error" : ''}
            onKeyPress={onKeyPressHandler}
            value={newTaskTitle} onChange={onChangeHandler}/>
        <IconButton onClick={addItem} color={'primary'}><ControlPoint/>
        </IconButton>
    </div>
}
