import Swal from 'sweetalert2'
import { db } from "../firebase/firebase-config"
import { types } from "../types/types"
import { loadNotes } from "../../helpers/loadNotes"
import { fileUpload } from '../../helpers/fileUpload'


export const startNewNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth
        // console.log(uid)

        const newNote = {
            title: '',
            body: '',
            url: '',
            date: new Date().getTime(),

        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
        console.log(doc)

        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote))
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})


export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
}


export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});


export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const noteToFirestore = { ...note };

        if (!note.url) {

            delete note.url;
        }
        delete noteToFirestore.id;
        try {
            await db.doc(`/${uid}/journal/notes/${note.id}`).update(noteToFirestore);
            dispatch(refreshNote(note.id, noteToFirestore));
            Swal.fire('Saved', note.title, 'success');

        } catch (error) {
            console.log(error)
            Swal.fire('Error', error, 'error')
        }

    }
}


export const refreshNote = (id, note) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }

})

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        // console.log(file, activeNote)
        const fileUrl = await fileUpload(file);

        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote))
        // console.log(fileUrl)

        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id))
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => (
    {
        type: types.noteLogoutCleaning
    }
)