import Fighter from "./Fighter";

export default class Boss extends Fighter{
    constructor(x:number, y: number) {
        super('LE BOSS', x, y, [
            {
                name: 'SUPER ATTAQUE',
                damage: 20,
                description: "Dans ta face !!!"
            }, {
                name: 'MEGA Attaque',
                damage: 30,
                description: " OUTCH...."
            }
        ])
    }
}