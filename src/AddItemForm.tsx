import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return <div>
        <input
            className={error ? "error" : ''}
            onKeyPress={onKeyPressHandler}
            value={newTaskTitle} onChange={onChangeHandler}/>
        <button
            onClick={addTask}>+
        </button>
        {error && <div className="error-message">{error}</div>}
    </div>
}
