import Player from "./Player";
import Monster from "./Monster";
import InputConsole from "./InputConsole";

export default class Battle {

    private player: Player;
    private monster: Monster
    private input: InputConsole

    constructor(player: Player, monster: Monster, input: InputConsole) {
        this.player = player
        this.monster = monster
        this.input = input
    }

    async start() {
        let turn = true
        while (this.player.isAlive() && this.monster.isAlive())
        {
            if (turn) {
                //PLAYER 1
            } else {
                // MONSTER
            }
            turn = !turn
        }
    }

    private selectAttack() {
        console.log()
    }
}
