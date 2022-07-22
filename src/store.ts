import { configureStore, createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';
import { MonsterAPI } from './APIs/monsterAPI';
import { CharacterAPI } from './APIs/characterAPI';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { act } from 'react-dom/test-utils';


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
    speed: number;
}

export type activeCharacter = {
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
    initiative: number;
    location: string;
    speed: number;
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
    speed: number;
}

export type activeMonster = {
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
    initiative: number;   //can't seem to add later?
    location: string;
    speed: number;
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

type ActiveMonstersSliceState = {
    activeMonsters: activeMonster[];
}

type ActiveCharactersSliceState = {
    activeCharacters: activeCharacter[];
}

type ItemsSliceState = {
    items: item[];
}

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

const initialActiveMonsterState: ActiveMonstersSliceState = {
    activeMonsters: []
}

const initialActiveCharacterState: ActiveCharactersSliceState = {
    activeCharacters: []
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
                    abilities: action.payload.abilities,
                    speed: action.payload.speed
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
            state.characters = action.payload
            // state.status = 'success'
        })
        builder.addCase(fillCharacterThunk.rejected, (state, action) => {
            // state.status = 'loading'
        })
    },
})

export const fillMonsterThunk = createAsyncThunk(
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
                    creatureClass: 'Monster',
                    speed: action.payload.speed
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
    name: 'items',
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

const generateRandomNums = (length: number) => {
    const outputArr: number[] = []
    while (length > 0) {
        const randomNum = Math.floor(Math.random() * 100);
        if (!outputArr.includes(randomNum)) {
            outputArr.push(randomNum);
            length--;
        }
    }
    return outputArr;
}

const generateRandomCoords = (length: number, characterLocations: string[] | null) => {
    const outputArr: string[] = []
    while (length > 0) {
        const randomNumOne = Math.floor(Math.random() * 10);
        const randomNumTwo = Math.floor(Math.random() * 10);
        const coord = `${randomNumOne}-${randomNumTwo}`;

        // character locations added first, have to make sure monsters don't get placed in spot occupied by character
        if (characterLocations && characterLocations.includes(coord)) continue;

        if (!outputArr.includes(coord)) {
            outputArr.push(coord);
            length--;
        }
    }
    return outputArr;
}

export const activeMonstersSlice = createSlice({
    name: 'activeMonsters',
    initialState: initialActiveMonsterState,
    reducers: {
        addActiveMonster: (state, action: PayloadAction<activeMonster>) => {
            state.activeMonsters = [
                ...state.activeMonsters, {
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
                    creatureClass: 'Monster',
                    initiative: action.payload.initiative,
                    location: action.payload.location,
                    speed: action.payload.speed
                }
            ]
        },
        removeActiveMonster: (state, action: PayloadAction<number>) => {
            state.activeMonsters = state.activeMonsters.filter(monst => monst.id !== action.payload)
        },
        moveMonster: (state, action: PayloadAction<{ initiative: number, coord: string }>) => {
            state.activeMonsters = state.activeMonsters.map(m => {
                if (m.initiative === action.payload.initiative) m.location = action.payload.coord
                return m
            })
        },
        assignMonsterInitAndLoc: (state, action: PayloadAction<{ monsters: activeMonster[], activeChars: activeCharacter[] }>) => {
            console.log('assign monster init')
            const characterLocations = action.payload.activeChars.map(c => c.location)
            const locationArray = generateRandomCoords(action.payload.monsters.length, characterLocations);
            const initiativeArray = generateRandomNums(action.payload.monsters.length);

            let { monsters } = action.payload

            monsters = JSON.parse(JSON.stringify(monsters));

            const modifiedMonsters = monsters.map((m, idx) => {
                m.location = locationArray[idx];
                m.initiative = initiativeArray[idx];
                return m;
            })

            state.activeMonsters = modifiedMonsters;
        },
        // TODO: removeMonster if hp <= 0
        hitMonster: (state, action: PayloadAction<{ initiative: number, damage: number }>) => {
            state.activeMonsters.map(m => {
                if (m.initiative === action.payload.initiative) m.hp -= action.payload.damage;
                return m
            })
        }
    }
})

export const activeCharactersSlice = createSlice({
    name: 'activeCharacters',
    initialState: initialActiveCharacterState,
    reducers: {
        addActiveCharacter: (state, action: PayloadAction<activeCharacter>) => {
            state.activeCharacters = [
                ...state.activeCharacters, {
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
                    abilities: action.payload.abilities,
                    initiative: action.payload.initiative,
                    location: action.payload.location,
                    speed: action.payload.speed
                }
            ]
        },
        removeActiveCharacter: (state, action: PayloadAction<number>) => {
            state.activeCharacters = state.activeCharacters.filter(c => c.id !== action.payload)
        },
        moveCharacter: (state, action: PayloadAction<{ initiative: number, coord: string }>) => {
            state.activeCharacters = state.activeCharacters.map(c => {
                if (c.initiative === action.payload.initiative) c.location = action.payload.coord
                return c
            })
        },
        assignCharacterInitAndLoc: (state, action: PayloadAction<activeCharacter[]>) => {
            console.log('assign char init')
            const locationArray = generateRandomCoords(action.payload.length, null);
            const initiativeArray = generateRandomNums(action.payload.length);
            let { payload } = action

            payload = JSON.parse(JSON.stringify(payload));

            const modifiedCharacters = payload.map((c, idx) => {
                c.location = locationArray[idx];
                c.initiative = initiativeArray[idx];
                return c;
            })

            state.activeCharacters = modifiedCharacters;
        },
        hitCharacter: (state, action: PayloadAction<{ initiative: number, damage: number }>) => {
            let isDead = false;
            state.activeCharacters = state.activeCharacters.map(c => {
                if (c.initiative === action.payload.initiative) c.hp -= action.payload.damage;
                if (c.hp <= 0) isDead = true
                return c
            })

            if (isDead) {
                console.log('dead')
                state.activeCharacters = state.activeCharacters.filter(c => c.initiative !== action.payload.initiative);
            }
        }
    }
})

export const { addCharacter, removeCharacter, editCharacter } = charactersSlice.actions;
export const { addMonster, removeMonster, editMonster } = monstersSlice.actions;
export const { addItem, removeItem, editItem } = itemsSlice.actions;
export const { addActiveMonster, removeActiveMonster, moveMonster, assignMonsterInitAndLoc, hitMonster } = activeMonstersSlice.actions
export const { addActiveCharacter, removeActiveCharacter, moveCharacter, assignCharacterInitAndLoc, hitCharacter } = activeCharactersSlice.actions

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
export const selectActiveCharacters = (state: RootState) => state.activeCharacters.activeCharacters;
export const selectActiveMonsters = (state: RootState) => state.activeMonsters.activeMonsters;

export const store = configureStore({
    reducer: {
        characters: charactersSlice.reducer,
        monsters: monstersSlice.reducer,
        items: itemsSlice.reducer,
        activeMonsters: activeMonstersSlice.reducer,
        activeCharacters: activeCharactersSlice.reducer
    },
})