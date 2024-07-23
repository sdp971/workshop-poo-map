import {Direction} from "./Map";

export default abstract class Perso {

    private _name: string

    private _x: number
    private _y: number

    constructor(name: string,x: number, y: number) {
        this._name = name
        this._x = x
        this._y = y
    }

    public move(direction: Direction): void {
        if (direction === Direction.NORD)
            this._y -= 1
        else if (direction === Direction.SUD)
            this._y += 1
        else if (direction === Direction.OUEST)
            this._x -= 1
        else if (direction === Direction.EST)
            this._x += 1
        else
            throw Error(`Unknown direction: ${direction}`)
    }

    get name(): string {
        return this._name
    }

    get x() {
        return this._x
    }

    get y() {
        return this._y
    }
}
