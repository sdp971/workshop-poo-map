export default class Player {
    private _x: number
    private _y: number

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    public move(direction: string): void {
        if (direction === 'N')
            this._y -= 1
        else if (direction === 'S')
            this._y += 1
        else if (direction === 'W')
            this._x -= 1
        else if (direction === 'E')
            this._x += 1
        else
            throw Error(`Unknown direction: ${direction}`)
    }

    get x() {
        return this._x
    }

    get y() {
        return this._y
    }
}
