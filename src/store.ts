import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Action } from 'history'



export type character = {
    first_name: string
    last_name: string
    id: string
}

type CharactersSliceState = {
    characters: character[];
}

const starterChars: character[] = [
    { first_name: 'Tyler', last_name: 'Robison', id: '1234' },
    { first_name: 'Will', last_name: 'Green', id: '5678' },
]

const initialState: CharactersSliceState = {
    characters: starterChars
}

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        addCharacter: (state, action: PayloadAction<character>) => {
            state.characters = [
                ...state.characters, {
                    first_name: action.payload.first_name,
                    last_name: action.payload.last_name,
                    id: action.payload.id
                }
            ]
        },
        removeCharacter: (state, action: PayloadAction<String>) => {
            state.characters = state.characters.filter(char => {
                return char.id !== action.payload
            })
        },
        editCharacter: (state, action: PayloadAction<character>) => {
            state.characters = state.characters.map(char => {
  
                return (char.id === action.payload.id ? 
                    action.payload : char);
            })
        }, 
    }
})

export const { addCharacter, removeCharacter, editCharacter } = charactersSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const selectCharacters = (state: RootState) => state.characters.characters;

export const store = configureStore({
    reducer: {
        characters: charactersSlice.reducer
    },
})