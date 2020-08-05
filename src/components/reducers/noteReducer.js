import { types } from "../types/types";

/*
    {
        note: [],
        active:null,
        active: {
            id: 'ASDFDSA221',
            title: '',
            body:'',
            imageUrl:'',
            date:
        }
    }

*/
const initialState = {
    notes: [],
    active: null
}


export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.notesAddNew:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }
        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }

        case types.notesUpdate:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }

        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }


        case types.noteLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }
}