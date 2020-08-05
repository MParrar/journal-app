import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NotesAppBar } from './NotesAppBar'
import { useForm } from '../../hooks/useForm'
import { useEffect } from 'react'
import { useRef } from 'react'
import { activeNote, startDeleting } from '../actions/notes'

export const NoteScreen = () => {


    const dispatch = useDispatch()

    const { active: note } = useSelector(state => state.notes)
    const [formValues, handleInputChange, reset] = useForm(note);
    const { body, title, id } = formValues;
    const activeId = useRef(note.id)



    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note)
            activeId.current = note.id
        }

    }, [note, reset])


    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }));
    }, [formValues, dispatch])


    const handleDelete = () => {
        dispatch(startDeleting(id))

    }

    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    name='title'
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    name='body'
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}

                ></textarea>

                {
                    (note.url) &&
                    <div className="notes__image">
                        <img
                            src={note.url}
                            alt="imagen"
                        />
                    </div>}


            </div>
            <button
                onClick={handleDelete}
                className="btn btn-danger"
            >
                Delete
                    </button>
        </div>
    )
}
