import Fighter from "./Fighter";

export default class Monster extends Fighter {

    constructor(x: number, y: number) {
        super('Monster', x, y);
    }

}
