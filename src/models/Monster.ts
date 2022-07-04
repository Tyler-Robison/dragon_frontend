import Creature from './Creature'

export default class Monster extends Creature {

    challengeRating: number
    constructor(
        challengeRating: number,
        creature: Creature
    ) {
        super(creature)
        this.challengeRating = challengeRating
    }
}