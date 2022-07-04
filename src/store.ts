import { configureStore, createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';
import { MonsterAPI } from './APIs/monsterAPI';
import { CharacterAPI } from './APIs/characterAPI';
import React, { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


export type character = {
    id: number;
    name: string;
    ac: number;
    level: number;
    race: string;
    creatureClass: string;
    con: number;
    conMod: number;
    str: number;
    strMod: number;
    dex: number;
    dexMod: number;
    int: number;
    intMod: number;
    wis: number;
    wisMod: number;
    cha: number;
    chaMod: number;
    hp: number;
    abilities: string[];
    initiative?: number; //can't seem to add later?
}

export type monster = {
    id: number;
    name: string;
    ac: number;
    acType: string;
    challengeRating: number;
    challengeXP: number;
    con: number;
    conMod: number;
    str: number;
    strMod: number;
    dex: number;
    dexMod: number;
    int: number;
    intMod: number;
    wis: number;
    wisMod: number;
    cha: number;
    chaMod: number;
    hp: number;
    abilities: string[];
    creatureClass: 'Monster'
    initiative?: number;   //can't seem to add later?
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
// const starterChars: character[] = [
//     { first_name: 'Tyler', last_name: 'Robison', abilities: ['Heal', 'Protect'], id: uuid() },
//     { first_name: 'Will', last_name: 'Green', abilities: ['Berserk'], id: uuid() },
// ]

// let starterMonsters: any;

// export const getStarterDataThunk = async () => {
//     starterMonsters = await MonsterAPI.findAll()
// }

const starterItems: item[] = [
    { name: 'Long Sword', type: 'Weapon', attack: '1d8', value: '50', id: uuid() },
    { name: 'Buckler', type: 'Armor', armor: '2', value: '30', id: uuid() },
]

const initialCharacterState: CharactersSliceState = {
    characters: []
}

const initialMonsterState: MonstersSliceState = {
    monsters: []
}

const initialItemState: ItemsSliceState = {
    items: starterItems
}

export const fillCharacterThunk = createAsyncThunk(
    // what is the purpose of this string?
    'characters/fillCharacterThunk',
    async () => {
        return await CharacterAPI.findAll();
    }
)

export const charactersSlice = createSlice({
    name: 'characters',
    initialState: initialCharacterState,
    reducers: {
        addCharacter: (state, action: PayloadAction<character>) => {
            state.characters = [
                ...state.characters, {
                    id: action.payload.id,
                    name: action.payload.name,
                    ac: action.payload.ac,
                    level: action.payload.level,
                    creatureClass: action.payload.creatureClass,
                    race: action.payload.race,
                    con: action.payload.con,
                    conMod: action.payload.conMod,
                    str: action.payload.str,
                    strMod: action.payload.strMod,
                    dex: action.payload.dex,
                    dexMod: action.payload.dexMod,
                    int: action.payload.int,
                    intMod: action.payload.intMod,
                    wis: action.payload.wis,
                    wisMod: action.payload.wisMod,
                    cha: action.payload.cha,
                    chaMod: action.payload.chaMod,
                    hp: action.payload.hp,
                    abilities: action.payload.abilities
                }
            ]
        },
        removeCharacter: (state, action: PayloadAction<number>) => {
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
    },
    extraReducers: (builder) => {
        builder.addCase(fillCharacterThunk.pending, (state, action) => {
            // state.status = 'loading'
        })
        builder.addCase(fillCharacterThunk.fulfilled, (state, action) => {
            console.log('thunk', action.payload)
            state.characters = action.payload
            // state.status = 'success'
        })
        builder.addCase(fillCharacterThunk.rejected, (state, action) => {
            // state.status = 'loading'
        })
    },
})

export const fillMonsterThunk = createAsyncThunk(
    // what is the purpose of this string?
    'monsters/fillMonsterThunk',
    async () => {
        const monsters = await MonsterAPI.findAll();
        return monsters.map((m: monster) => {
            m.creatureClass = 'Monster';
            return m
        })
    }
)

export const monstersSlice = createSlice({
    name: 'monsters',
    initialState: initialMonsterState,
    reducers: {
        addMonster: (state, action: PayloadAction<monster>) => {
            state.monsters = [
                ...state.monsters, {
                    id: action.payload.id,
                    name: action.payload.name,
                    ac: action.payload.ac,
                    acType: action.payload.acType,
                    challengeRating: action.payload.challengeRating,
                    challengeXP: action.payload.challengeXP,
                    con: action.payload.con,
                    conMod: action.payload.conMod,
                    str: action.payload.str,
                    strMod: action.payload.strMod,
                    dex: action.payload.dex,
                    dexMod: action.payload.dexMod,
                    int: action.payload.int,
                    intMod: action.payload.intMod,
                    wis: action.payload.wis,
                    wisMod: action.payload.wisMod,
                    cha: action.payload.cha,
                    chaMod: action.payload.chaMod,
                    hp: action.payload.hp,
                    abilities: action.payload.abilities,
                    creatureClass: 'Monster'
                }
            ]
        },
        removeMonster: (state, action: PayloadAction<number>) => {
            state.monsters = state.monsters.filter(monst => monst.id !== action.payload)
        },
        editMonster: (state, action: PayloadAction<monster>) => {
            state.monsters = state.monsters.map(mon => {

                return (mon.id === action.payload.id ?
                    action.payload : mon);
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fillMonsterThunk.pending, (state, action) => {
            // state.status = 'loading'
        })
        builder.addCase(fillMonsterThunk.fulfilled, (state, action) => {
            state.monsters = action.payload
            // state.status = 'success'
        })
        builder.addCase(fillMonsterThunk.rejected, (state, action) => {
            // state.status = 'loading'
        })
    },
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
                    attack: action.payload.attack ?? undefined,
                    armor: action.payload.armor ?? undefined,
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

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

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