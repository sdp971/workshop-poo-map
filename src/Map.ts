import Player from "./Player";
import InputConsole from "./InputConsole";
import Monster from "./Monster";
import Perso from "./Perso";

export interface Coord {
    y: number;
    x: number;
}

export enum Direction {
    NORD,
    SUD,
    EST,
    OUEST
}

export default class Map {

    private _map: string[];
    // @ts-ignore
    private player: Player
    private monsters: Monster[]
    private input: InputConsole

    constructor(map: string) {
        this._map = map.trim().split('\n').map(line => line.trim());
        this.input = new InputConsole()
        this.monsters = []
        this.player = new Player(6,2)
    }

    public play(): void {
        this.initMonsters()
        this.startLoop().then(() => {
            console.log('GAME OVER')
            this.input.close()
        })
    }

    private initMonsters(): void {
        const randomBetween = (max: number) => Math.floor(Math.random() * max ) + 1
        while (this.monsters.length < 3)
        {
            const randomY = randomBetween(this._map.length - 1)
            const randomX = randomBetween(this._map[0].length - 1)

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

    private async startLoop() {
        let isExit = true
        while (isExit)
        {
            this.display()
            const input = await this.input.read('Tape direction (N, S, E, W), q (quit) : ')
            if (input === 'q') {
                isExit = false
                continue
            }
            try {
                const direction = this.convertInput(input)
                if (this.dirIsFree(this.player, direction)) {
                    this.player.move(direction)
                    const monster = this.getMonsterAt(this.player.x, this.player.y)
                    if (monster !== undefined) {
                        //TODO FIGHT
                     /*   const battle = new Battle(this.player, monster, this.input)
                        await battle.start()*/
                    }
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
                }
                else {
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

        this.monsters.forEach(monster => updateMonster(monster))
    }
}
