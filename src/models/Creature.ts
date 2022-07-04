

type creature = {
    id: number,
    hp: number,
    ac: number,
    str: number,
    strMod: number,
    dex: number,
    dexMod: number,
    con: number,
    conMod: number,
    int: number,
    intMod: number,
    wis: number,
    wisMod: number,
    cha: number,
    chaMod: number,
    creatureClass: string,
    name: string,
    initiative: number, 
    abilities: string[]
}

export default class Creature {
    id: number;
    hp: number;
    ac: number;
    str: number;
    strMod: number;
    dex: number;
    dexMod: number;
    con: number;
    conMod: number;
    int: number;
    intMod: number;
    wis: number;
    wisMod: number;
    cha: number;
    chaMod: number;
    isAlive: boolean;
    creatureClass: string;
    name: string;
    initiative: number
    abilities: string[]

    constructor(creature: creature) {
        this.id = creature.id
        this.hp = creature.hp
        this.ac = creature.ac
        this.str = creature.str
        this.strMod = creature.strMod
        this.dex = creature.dex
        this.dexMod = creature.dexMod
        this.con = creature.con
        this.conMod = creature.conMod
        this.int = creature.int
        this.intMod = creature.intMod
        this.wis = creature.wis
        this.wisMod = creature.wisMod
        this.cha = creature.cha
        this.chaMod = creature.chaMod
        this.isAlive = true
        this.creatureClass = creature.creatureClass
        this.name = creature.name
        this.initiative = creature.initiative
        this.abilities = creature.abilities
    }


    adjustHitpoints(hpChange: number) {
        if (this.hp <= 0) {
            console.log('already dead');
            return;
        }

        this.hp = this.hp + hpChange;
        this.updateStatus();
    }

    updateStatus() {
        if (this.hp <= 0) this.isAlive = false;
        else this.isAlive = true;
    }

    reportHP() {
        this.reportHP = this.reportHP.bind(this);
        // binds name AND hp?
        console.log(`${this.name} has ${this.hp} hitpoints left`)
    }

    // hard-coded damage value of 7 for now
    attack() {
        return 7
    }

}