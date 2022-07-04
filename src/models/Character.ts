import Creature from './Creature'

export default class Character extends Creature {

    race: string
    level: number
    constructor(
        race: string,
        level: number,
        creature: Creature
    ) {
        super(creature)
        this.race = race
        this.level = level
    }
}