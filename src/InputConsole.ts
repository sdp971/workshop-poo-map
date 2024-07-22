import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export default class InputConsole {

    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({input, output});
    }

    async read(query: string): Promise<string> {
        return await this.rl.question(query);
    }

    close(): void {
        this.rl.close();
    }
}
