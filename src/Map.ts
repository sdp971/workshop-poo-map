import Player from "./Player";
import InputConsole from "./InputConsole";

export interface Coord {
    y: number;
    x: number;
}

export default class Map {

    private _map: string[];
    // @ts-ignore
    private player: Player
    private input: InputConsole

    constructor(map: string) {
        this._map = map.trim().split('\n').map(line => line.trim());
        this.input = new InputConsole()
    }

    public play(): void {
        const {y, x} = this.findPlayerCoord()
        this.player = new Player(x, y)

        this.startLoop().then(() => {
            console.log('GAME OVER')
            this.input.close()
        })
    }

    private async startLoop() {
        let isExit = true
        while (isExit)
        {
            this.display()
            const dir = await this.input.read('Tape direction (N, S, E, W), q (quit) : ')
            if (dir === 'q') {
                isExit = false
                continue
            }
            try {
                if (this.dirIsFree(dir)) {
                    this.player.move(dir)
                    if (this._map[this.player.y][this.player.x] === 'S') {
                        console.log('YOU WIN !!!')
                        isExit = false
                    }
                } else {
                    console.log('You can\'t go there')
                }
            } catch (error) {
                console.log(`Invalid direction '${dir}'`)
            }
        }
    }

    private findPlayerCoord(): Coord {
        for (let y = 0; y < this._map.length; y++) {
            for (let x = 0; x < this._map[y].length; x++) {
                if (this._map[y][x] === 'P') {
                    return {y, x}
                }
            }
        }
        throw new Error("Player not found");
    }


    private display() {
        for (let y = 0; y < this._map.length; y++) {
            for (let x = 0; x < this._map[y].length; x++) {
                if (x === this.player.x && y === this.player.y) {
                    process.stdout.write('P')
                } else {
                    process.stdout.write(this._map[y][x] === 'P' ? ' ' : this._map[y][x]);
                }
            }
            process.stdout.write('\n')
        }
    }

    get map() {
        return this._map;
    }

    private dirIsFree(direction: string) {
        let x = this.player.x
        let y = this.player.y
        if (direction === 'N')
            y -= 1
        else if (direction === 'S')
            y += 1
        else if (direction === 'W')
            x -= 1
        else if (direction === 'E')
            x += 1
        else
            throw Error(`Invalid direction: ${direction}`)
        return this._map[y][x] === ' ' || this._map[y][x] === 'S'
    }
}
