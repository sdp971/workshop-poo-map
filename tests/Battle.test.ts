import Fighter from '../src/Fighter';
import InputConsole from '../src/InputConsole';
import Player from '../src/Player';
import Battle from '../src/Battle';
import Monster from '../src/Monster';

jest.mock('../src/InputConsole');

describe('InputConsole', () => {
  let player: Player;
  let enemy: Fighter;
  let battle: Battle;
  let mockInput: jest.Mocked<InputConsole>;

  beforeEach(() => {
    player = new Player(3, 3);
    enemy = new Monster(3, 3);
    mockInput = new InputConsole() as jest.Mocked<InputConsole>;
  });

  it('attack 1', async () => {
    mockInput.read.mockResolvedValue('1');
    battle = new Battle(player, enemy, mockInput);
   await  battle.selectAttack();
    expect(enemy.hp).toBe(80);
   
  });

  it('attack 2', async () => {
    mockInput.read.mockResolvedValue('2');
    battle = new Battle(player, enemy, mockInput);
    await battle.selectAttack();
    expect(enemy.hp).toBe(60);
    
  });
});
