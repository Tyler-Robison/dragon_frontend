import React, { useState, useEffect, SyntheticEvent } from "react";
import Cell from "./Cell";
import {
    selectActiveMonsters, selectActiveCharacters,
    assignCharacterInitAndLoc, assignMonsterInitAndLoc, activeCharacter, activeMonster, moveCharacter, moveMonster, hitMonster, hitCharacter
} from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BattleChoices from "./BattleChoices";
import useTimedMessage from "../../customHooks/useTimedMessage";
import TurnOrder from "./TurnOrder";
import { NavItem } from "react-bootstrap";


// for now, assign random grid positions based on initiative
// TODO: implement drag and drop via react-dnd
const BattleGrid: React.FC = () => {

    const activeMonsters = useSelector(selectActiveMonsters)
    const activeCharacters = useSelector(selectActiveCharacters)
    const mergedArray = [...activeCharacters, ...activeMonsters]
    const [turnOrder, setTurnOrder] = useState<number[]>([])
    const [turn, setTurn] = useState<number>(0)
    const dispatch = useDispatch()
    const [chosenAction, setChosenAction] = useState<string | null>(null)
    const initialAP = 2;
    const [AP, setAP] = useState<number>(initialAP); // action points determine how many actions you can take
    const [isVictory, setIsVictory] = useState<boolean>(false);
    const currentCreature = mergedArray.find(c => c.initiative === turnOrder[turn])
    const [invalidMoveMsg, setinvalidMoveMsg] = useTimedMessage(1500)
    const [missMsg, setMissMsg] = useTimedMessage(1500)
    const [hitMsg, setHitMsg] = useTimedMessage(1500)

    const navigate = useNavigate();
    const nrows = 10;
    const ncols = 10;

    const setInitialColors = () => {
        const outerArray: string[][] = []
        for (let i = 0; i < nrows; i++) {
            const innerArray: string[] = [];
            innerArray.length = ncols;
            innerArray.fill('blue')
            outerArray.push(innerArray)
        }
        return outerArray
    }
    const [colors, setColors] = useState(setInitialColors())

    // Assign all active monsters/characters random + unique locations and initiative
    useEffect(() => {
        dispatch(assignCharacterInitAndLoc(activeCharacters))
        dispatch(assignMonsterInitAndLoc({ monsters: activeMonsters, activeChars: activeCharacters }))
    }, [])

    useEffect(() => {
        if (turnOrder.length > 0) {
            showMoveOptions(currentCreature!.location)
        }

    }, [currentCreature, AP])

    useEffect(() => {
        if (AP <= 0) advanceTurn();
    }, [AP])

    // skip turns of dead creatures
    const advanceTurn = () => {
        turn < mergedArray.length - 1 ? setTurn(prev => prev + 1) : setTurn(() => 0);
        setAP(() => initialAP)
        setChosenAction('move')
    }

    useEffect(() => {
        // if creatures whose turn it is is dead, advance turn again
        // beware infinite loop -> handle all dead!

        if (currentCreature && !currentCreature!.isAlive) advanceTurn()
        if (chosenAction === 'pass') advanceTurn()
    }, [turn, chosenAction])

    // gets stale state without this
    useEffect(() => {
        checkVictory();
    }, [activeCharacters, activeMonsters])


    // re-factor to be cleaner.
    const checkVictory = () => {
        let anyAlive = false;

        for (let char of activeCharacters) {
            if (char.isAlive) anyAlive = true;
        }

        // if no characters alive, nav to victory screen for monsters
        if (!anyAlive) navigate(`/victory/monsters`)
        anyAlive = false;
        for (let monster of activeMonsters) {
            if (monster.isAlive) anyAlive = true;
        }

        if (!anyAlive) navigate(`/victory/characters`)
    }

    const handleClick = (coord: string, color: string) => {

        if (chosenAction === 'move') handleMove(coord, color)

        if (chosenAction === 'attack') handleAttack(coord, color)

        if (chosenAction === 'kill') handleAttack(coord, color, true)

        if (chosenAction === 'pass') advanceTurn()
    }

    const isEmpty = (coord: string) => {
        if (mergedArray.find(creature => creature.location === coord)) return false
        return true
    }

    const isAlive = (coord: string) => {
        const attackedCreature = mergedArray.find(creature => creature.location === coord);
        if (attackedCreature && attackedCreature.isAlive === false) return false;
        return true;
    }

    // handle crit miss
    const handleAttack = (coord: string, color: string, kill: boolean = false) => {
        if (color === 'red' && !isEmpty(coord) && isAlive(coord)) {
            const attackedCreature = mergedArray.find(creature => creature.location === coord);
            const { initiative } = attackedCreature!
            const damage = calculateAttackDamage(currentCreature!)
            const hit = calculateHit(currentCreature!, attackedCreature!)

            // kill cmd exists for de-bugging purposes, kills creature, always hits
            if (kill) {
                if ('level' in attackedCreature!) dispatch(hitCharacter({ initiative, damage: attackedCreature!.hp }))
                else dispatch(hitMonster({ initiative, damage: attackedCreature!.hp }))
            }

            if (hit === 'miss') {
                setMissMsg(true);
            }

            else if (hit === 'hit') {
                setHitMsg(true)
                if ('level' in attackedCreature!) dispatch(hitCharacter({ initiative, damage }))
                else dispatch(hitMonster({ initiative, damage }))
            }

            else if (hit === 'crit hit') {
                setHitMsg(true)
                if ('level' in attackedCreature!) dispatch(hitCharacter({ initiative, damage: damage * 2 }))
                else dispatch(hitMonster({ initiative, damage: damage * 2 }))
            }

            else if (hit === 'crit miss') {
                setMissMsg(true)
            }

            setAP(currentVal => currentVal - 1);
        }
        else {
            console.log("can't attack there!")
        }
    }

    const calculateHit = (attackingCreature: activeCharacter | activeMonster, attackedCreature: activeCharacter | activeMonster) => {
        const roll = Math.floor(Math.random() * 20) + 1;
        if (roll === 20) return 'crit hit'
        if (roll === 1) return 'crit miss'

        const baseAim = 'level' in attackingCreature ? attackingCreature.level : attackingCreature.challengeRating;
        const higherMod = Math.max(attackingCreature.dexMod, attackingCreature.strMod);

        const attackRoll = higherMod + baseAim + roll;
        return attackRoll >= attackedCreature!.ac ? 'hit' : 'miss';
    }

    const calculateAttackDamage = (attackingCreature: activeCharacter | activeMonster) => {
        const baseDamage = 'level' in attackingCreature ? attackingCreature.level : attackingCreature.challengeRating
        const higherMod = Math.max(attackingCreature.dexMod, attackingCreature.strMod)
        return higherMod + (Math.floor(Math.random() * baseDamage))
    }

    const handleMove = (coord: string, color: string) => {
        // check valid move location, green = valid
        const { initiative } = currentCreature!
        if ((color === 'green' || color === 'red') && isEmpty(coord)) {
            if (currentCreature!.creatureClass === 'Monster') {
                dispatch(moveMonster({ initiative, coord }))
            }
            else {
                dispatch(moveCharacter({ initiative, coord }))
            }
            setAP(currentVal => currentVal - 1);
        }
        else setinvalidMoveMsg(true);
    }

    const showMoveOptions = (initLocation: string) => {
        const locArr = initLocation.split('-');
        const xCoord = +locArr[0];
        const yCoord = +locArr[1];

        const newColors: string[][] = []
        for (let x = 0; x < nrows; x++) {
            const innerArray: string[] = [];
            for (let y = 0; y < ncols; y++) {

                // determine if cell is within creature's speed (how many cells it can move)
                const xdiff = Math.abs(xCoord - x);
                const ydiff = Math.abs(yCoord - y);
                const speed = currentCreature!.speed;

                // blue -> can't move there
                // green -> can move there
                // red -> can move OR attack there
                if (xdiff + ydiff > speed) innerArray[y] = 'blue';
                else if (xdiff + ydiff > 1 && xdiff + ydiff <= speed) innerArray[y] = 'green';
                else if (xdiff + ydiff === 1) innerArray[y] = 'red';
            }
            newColors.push(innerArray)
        }
        setColors(newColors)
    }


    const generateGrid = () => {
        const initialGrid = [];
        const locations = [];

        for (const ele of mergedArray) {
            locations.push(ele.location)
        }

        for (let y = 0; y < nrows; y++) {
            const row = [];
            for (let x = 0; x < ncols; x++) {
                let creature = null;
                const coord = `${x}-${y}`
                if (locations.includes(coord)) {
                    creature = mergedArray.find(ele => ele.location === coord);
                }

                row.push(<Cell
                    key={coord}
                    coord={coord}
                    creature={creature}
                    handleClick={handleClick}
                    turnOrder={turnOrder}
                    turn={turn}
                    color={colors[x][y]}
                    AP={AP}
                />
                )
            }
            initialGrid.push(<tr key={y}>{row}</tr>);
        }
        return initialGrid
    }

    useEffect(() => {
        const initialAccum: number[] = []

        const turnArray = mergedArray.reduce((accum, nextEle) => {
            accum.push(nextEle.initiative);
            return accum;
        }, initialAccum)

        setTurnOrder(() => turnArray.sort((a, b) => b - a));
    }, [activeCharacters, activeMonsters])

    if (turnOrder.length === 0) return <p>Loading...</p>

    return (
        <div>
            <h1>Eliminate Monsters to Win!</h1>
            <h3>Action Points Remaining: {AP}</h3>
            {invalidMoveMsg && <h3>Can only move to empty green or red squares</h3>}
            {missMsg && <h3>Missed!</h3>}
            {hitMsg && <h3>Hit!</h3>}
            <button onClick={() => navigate(-1)}>Go Back</button>
            <table>
                <tbody>{generateGrid()}</tbody>
            </table>

            <TurnOrder turn={turn} mergedArray={mergedArray} turnOrder={turnOrder} />
            <BattleChoices chosenAction={chosenAction!} setChosenAction={setChosenAction} />
        </div>
    )
}

export default BattleGrid;