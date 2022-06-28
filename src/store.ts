import { configureStore, createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';
import { MonsterAPI } from './APIs/monsterAPI';
import React, { useEffect } from 'react';


export type character = {
    first_name: string;
    last_name: string;
    id: string;
    abilities: string[];
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

let starterMonsters: any;




export const getStarterDataThunk = async () => {

    starterMonsters = await MonsterAPI.findAll()

}

// const fillMonsterThunk = createAsyncThunk(
//     'monsters/fillMonsters2',
//     async () => {
//         return MonsterAPI.findAll();
//     }
// )


const starterItems: item[] = [
    { name: 'Long Sword', type: 'Weapon', attack: '1d8', value: '50', id: uuid() },
    { name: 'Buckler', type: 'Armor', armor: '2', value: '30', id: uuid() },

]

const initialCharacterState: CharactersSliceState = {
    characters: starterChars
}

const initialMonsterState: MonstersSliceState = {
    monsters: []
}
console.log('init mon', initialMonsterState)

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

export const fillMonsterThunk = createAsyncThunk(
    'monsters/fillMonsterThunk',
    async () => {
        return await MonsterAPI.findAll();
    }
)

export const monstersSlice = createSlice({
    name: 'monsters',
    initialState: initialMonsterState,
    reducers: {
        fillMonsters: (state, action: PayloadAction<monster[]>) => {
            state.monsters = [...action.payload];
        },
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
                    hp: action.payload.hp
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
interface myData {

}

// const getPosts = createAsyncThunk(
//     'posts/getPosts',
//     async (thunkAPI) => {
//         const res = await fetch('https://jsonplaceholder.typicode.com/posts').then(
//             (data) => data.json()
//         )
//         return res
//     })

// const initialPostState = {
//     entities: [],
//     loading: false,
// }

// export const postSlice = createSlice({
//     name: 'posts',
//     initialPostState,
//     reducers: {},
//     extraReducers: {
//       [getPosts.pending]: (state) => {
//         state.loading = true
//       },
//       [getPosts.fulfilled]: (state, { payload }) => {
//         state.loading = false
//         state.entities = payload
//       },
//       [getPosts.rejected]: (state) => {
//         state.loading = false
//       },
//     },
//   })



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
export const { addMonster, removeMonster, editMonster, fillMonsters } = monstersSlice.actions;
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