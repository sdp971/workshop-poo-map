import Player from "./Player";
import InputConsole from "./InputConsole";
import Monster from "./Monster";
import Perso from "./Perso";
import Battle from "./Battle";
import {randomCoord} from './utils'
import Boss from "./Boss";
import Fighter from "./Fighter";
import { Direction } from './Direction';


export interface Coord {
    y: number;
    x: number;
}



export default class Map {

    private _map: string[];
    // @ts-ignore
    private player: Player
    private monsters: Monster[]
    private boss: Monster | null
    private input: InputConsole

    constructor(map: string) {
        this._map = map.trim().split('\n').map(line => line.trim());
        this.input = new InputConsole()
        this.monsters = []
        this.player = new Player(6,2)
        this.boss = null
    }

    public play(): void {
        this.initMonsters()
        this.startLoop().then(() => {
            console.log('GAME OVER')
            this.input.close()
        })
    }

    private initMonsters(): void {
        while (this.monsters.length < 1)
        {
            const [randomY, randomX] = randomCoord(this._map)
            const alreadyMonster = this.getMonsterAt(randomX, randomY)
            if (alreadyMonster === undefined && this._map[randomY][randomX] === ' ')
                this.monsters.push(new Monster(randomX, randomY))
        }
    }

    private convertInput(input: string): Direction {
        switch (input.toUpperCase()) {
            case 'N':
                return Direction.NORD;
            case 'S':
                return Direction.SUD;
            case 'E':
                return Direction.EST;
            case 'O':
                return Direction.OUEST;
            default:
                throw Error(`Unknown direction: ${input}`);
        }
    }

    private async startLoop(): Promise<void> {
        while (true)
        {
            this.display()
            const input = await this.input.read('Tape direction (N, S, E, W), q (quit) : ')
            if (input === 'q')
                return
            try {
                const direction = this.convertInput(input)
                if (this.dirIsFree(this.player, direction)) {
                    this.player.move(direction)
                    if (await this.battleHandler())
                        return
                } else {
                    console.log('You can\'t go there')
                }
            } catch (error) {
                console.log(`Invalid direction '${input}'`)
            }
            this.updateMonsters()
        }
    }

    private getMonsterAt(x:number, y: number): Monster | undefined {
        return this.monsters.find(m => m.y === y && m.x === x)
    }

    private display() {
        for (let y = 0; y < this._map.length; y++) {
            for (let x = 0; x < this._map[y].length; x++) {
                if (x === this.player.x && y === this.player.y) {
                    process.stdout.write('P')
                } else if (this.getMonsterAt(x, y)) {
                    process.stdout.write('M')
                } else if (this.boss !== null && this.boss.x === x && this.boss.y === y) {
                    process.stdout.write('B')
                } else {
                    process.stdout.write(this._map[y][x]);
                }
            }
            process.stdout.write('\n')
        }
    }

    get map() {
        return this._map;
    }

    private dirIsFree(perso: Perso, direction: Direction) {
        let x = perso.x
        let y = perso.y
        if (direction === Direction.NORD)
            y -= 1
        else if (direction === Direction.SUD)
            y += 1
        else if (direction === Direction.OUEST)
            x -= 1
        else if (direction === Direction.EST)
            x += 1
        return this._map[y][x] === ' ' || this._map[y][x] === 'S'
    }

    private updateMonsters() {
        const updateMonster = (monster: Monster) => {
            const random = Math.floor(Math.random() * 4)
            if (this.dirIsFree(monster, random)) {
                monster.move(random)
            } else {
                updateMonster(monster)
            }
        }
        this.monsters.forEach(updateMonster)
    }

    private async startBattle(enemy: Fighter) : Promise<boolean> {
        const battle = new Battle(this.player, enemy, this.input)
        await battle.start()
        if (!this.player.isAlive()) {
            console.log("YOU LOOSE !!!! NOOB ...")
            return false
        }
        this.monsters = this.monsters.filter(m => m.isAlive())
        return true
    }

    private spawnBoss() {
        const [randomY, randomX] = randomCoord(this._map)
        if (this._map[randomY][randomX] === ' ') {
            this.boss = new Boss(randomX, randomY)
            console.log('THE BOSS IS HERE !!!!')
        } else {
            this.spawnBoss()
        }
    }

    private async battleHandler(): Promise<boolean> {
        if (this.boss !== null && this.player.x === this.boss.x && this.player.y === this.boss.y) {
            const isWin = await this.startBattle(this.boss)
            if (isWin) console.log('YOU WIN !!!')
            return true
        }
        const monster = this.getMonsterAt(this.player.x, this.player.y)
        if (monster !== undefined) {
            await this.startBattle(monster)
            if (this.monsters.length === 0) {
                this.spawnBoss()
            }
        }
        return false
    }
}
