import Perso from "./Perso";

export interface Attack {
    name: string;
    damage: number;
    description: string;
}

export default abstract class Fighter extends Perso {

    private _hp: number
    private _attacks: Attack[]

    constructor(name: string,x:number, y:number, attacks: Attack[] = []) {
        super(name, x, y);
        this._hp = 100
        this._attacks = attacks
    }

    attack(choice: number, enemy: Fighter): void {
        console.log(`${this.name} attack '${this._attacks[choice]}'`)
        enemy.getDamage(this._attacks[choice].damage)
    }

    isAlive() {
        return this._hp > 0
    }

    getDamage(damage: number) {
        console.log(`${this.name} getDamage ${damage}`);
        this._hp -= damage;
    }

    get attacks() {
        return this._attacks
    }

    get hp() {
        return this._hp;
    }
}
