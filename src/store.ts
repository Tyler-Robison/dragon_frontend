import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';


export type character = {
    first_name: string;
    last_name: string;
    id: string;
    abilities: string[];
}

export type monster = {
    species: string;
    hp: string;
    attack: string;
    ac: string;
    level: string;
    size: string;
    id: string;
}

type itemTypes = 'Weapon' | 'Armor';

// enforce attack OR armor?????????????????
// if attack not present, armor MUST be
export type item = {
    name: string;
    type: itemTypes;
    attack?: string;
    armor?: string;
    value: string;
    id: string;
}

type CharactersSliceState = {
    characters: character[];
}

type MonstersSliceState = {
    monsters: monster[];
}

type ItemsSliceState = {
    items: item[];
}

// move starters into a diff file
const starterChars: character[] = [
    { first_name: 'Tyler', last_name: 'Robison', abilities: ['Heal', 'Protect'], id: uuid() },
    { first_name: 'Will', last_name: 'Green', abilities: ['Berserk'], id: uuid() },
]

const starterMonsters: monster[] = [
    { species: 'Red Dragon', hp: '400', attack: '4d6', ac: '19', level: '21', size: 'lg', id: uuid() },
    { species: 'Yeti', hp: '80', attack: '1d10', ac: '15', level: '8', size: 'med', id: uuid() },
    { species: 'Goblin', hp: '15', attack: '1d4', ac: '13', level: '1', size: 'sm', id: uuid() },
]

const starterItems: item[] = [
    { name: 'Long Sword', type: 'Weapon', attack: '1d8', value: '50', id: uuid() },
    { name: 'Buckler', type: 'Armor', armor: '2', value: '30', id: uuid() },

]

const initialCharacterState: CharactersSliceState = {
    characters: starterChars
}

const initialMonsterState: MonstersSliceState = {
    monsters: starterMonsters
}

const initialItemState: ItemsSliceState = {
    items: starterItems
}

export const charactersSlice = createSlice({
    name: 'characters',
    initialState: initialCharacterState,
    reducers: {
        addCharacter: (state, action: PayloadAction<character>) => {
            state.characters = [
                ...state.characters, {
                    first_name: action.payload.first_name,
                    last_name: action.payload.last_name,
                    abilities: action.payload.abilities,
                    id: action.payload.id
                }
            ]
        },
        removeCharacter: (state, action: PayloadAction<string>) => {
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

export const monstersSlice = createSlice({
    name: 'monsters',
    initialState: initialMonsterState,
    reducers: {
        addMonster: (state, action: PayloadAction<monster>) => {
            state.monsters = [
                ...state.monsters, {
                    species: action.payload.species,
                    hp: action.payload.hp,
                    attack: action.payload.attack,
                    ac: action.payload.ac,
                    level: action.payload.level,
                    size: action.payload.size,
                    id: action.payload.id
                }
            ]
        },
        removeMonster: (state, action: PayloadAction<string>) => {
            state.monsters = state.monsters.filter(monst => monst.id !== action.payload)
        },
        editMonster: (state, action: PayloadAction<monster>) => {
            state.monsters = state.monsters.map(mon => {

                return (mon.id === action.payload.id ?
                    action.payload : mon);
            })
        },
    }
})

// how to make properties optional?????????????????????
export const itemsSlice = createSlice({
    name: 'item',
    initialState: initialItemState,
    reducers: {
        addItem: (state, action: PayloadAction<item>) => {
            state.items = [
                ...state.items, {
                    name: action.payload.name,
                    type: action.payload.type,
                    attack: action.payload.attack,
                    armor: action.payload.armor,
                    value: action.payload.value,
                    id: action.payload.id
                }
            ]
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        editItem: (state, action: PayloadAction<item>) => {
            state.items = state.items.map(item => {

                return (item.id === action.payload.id ?
                    action.payload : item);
            })
        },
    }
})

export const { addCharacter, removeCharacter, editCharacter } = charactersSlice.actions;
export const { addMonster, removeMonster, editMonster } = monstersSlice.actions;
export const { addItem, removeItem, editItem } = itemsSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const selectCharacters = (state: RootState) => state.characters.characters;
export const selectMonsters = (state: RootState) => state.monsters.monsters;
export const selectItems = (state: RootState) => state.items.items;

export const store = configureStore({
    reducer: {
        characters: charactersSlice.reducer,
        monsters: monstersSlice.reducer,
        items: itemsSlice.reducer
    },
})