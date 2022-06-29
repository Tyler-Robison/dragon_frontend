

export class Creature {
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

    constructor(
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
        chaMod: number
    ) {
        this.id = id
        this.hp = hp
        this.ac = ac
        this.str = str
        this.strMod = strMod
        this.dex = dex
        this.dexMod = dexMod
        this.con = con
        this.conMod = conMod
        this.int = int
        this.intMod = intMod
        this.wis = wis
        this.wisMod = wisMod
        this.cha = cha
        this.chaMod = chaMod
        this.isAlive = true;
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

}