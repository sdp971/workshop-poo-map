import Fighter from "./Fighter";

export default class Monster extends Fighter {

    constructor(x: number, y: number) {
        super('Monster', x, y, [
            {
                name: 'Boouh',
                damage: 1,
                description: "J'ai peur !!! :'("
            }, {
                name: 'grrr',
                damage: 10,
                description: 'aie .....'
            }
        ]);
    }

}
