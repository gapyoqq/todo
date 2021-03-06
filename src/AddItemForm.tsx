import {IconButton, TextField} from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {ControlPoint} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {

    const [newItemTitle, setNewItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addItem(newItemTitle.trim())
            setNewItemTitle('')
        }
    }
    const addItem = () => {
        debugger
        if (newItemTitle.trim() !== '') {
            props.addItem(newItemTitle.trim())
            setNewItemTitle('')
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
            value={newItemTitle} onChange={onChangeHandler}/>
        <IconButton onClick={addItem} color={'primary'}><ControlPoint/>
        </IconButton>
    </div>
}
