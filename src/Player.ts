import Fighter from "./Fighter";

export default class Player extends Fighter {

    constructor(x: number, y: number) {
        super('Player', x, y, [
            {
                name: 'Coup de tête',
                damage: 20,
                description : "ça fais mal ..."
            },
            {
                name: 'Boule de feu',
                damage: 40,
                description: 'ça brule !!!! **run**'
            }
        ]);
    }
}
