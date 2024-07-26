import Player from "./Player";
import Fighter from "./Monster";
import InputConsole from "./InputConsole";
import {randomNumber} from "./utils";

export default class Battle {

    private player: Player;
    private monster: Fighter
    private input: InputConsole

    constructor(player: Player, monster: Fighter, input: InputConsole) {
        this.player = player
        this.monster = monster
        this.input = input
    }

    async start(): Promise<void> {
        let turn = true
        while (this.player.isAlive() && this.monster.isAlive())
        {
            console.log('== Stats ==')
            console.log(`${this.player.name} : ${this.player.hp} HP`)
            console.log(`${this.monster.name} : ${this.monster.hp} HP\n`)
            if (turn) {
                await this.selectAttack()
            } else {
                this.monsterAttack()
            }
            turn = !turn
        }
        console.log('End of fight....')
    }

    public async selectAttack(): Promise<void> {
        console.log('== Selection your attack ===')
        this.player.attacks
            .forEach((attack, index) => console.log(`${index + 1} ) -> ${attack.name} (${attack.description})`))
        const choice = parseInt(await this.input.read(' > '))

        if (choice > 0 && choice <= this.player.attacks.length) {
            this.player.attack(choice - 1, this.monster)
        } else {
            console.log(`Invalid choice ${choice} ... retry`)
            await this.selectAttack()
        }
    }

    private monsterAttack() {
        const randomChoice = randomNumber(this.monster.attack.length)
        this.monster.attack(randomChoice, this.player)
    }
}
