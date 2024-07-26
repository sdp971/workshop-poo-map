
import { Direction } from '../src/Direction';
import Fighter from '../src/Fighter';
import Player from '../src/Player';
import Monster from '../src/Monster';




describe("TEST perso", () => {
  let player: Player;
  
  beforeEach(() => {
    player = new Player(3,3);
  })

  it("Move to North", () => {
    player.move(Direction.NORD);
    expect(player.y).toBe(2)
  })
  
    it('Move to South', () => {
      player.move(Direction.SUD);
      expect(player.y).toBe(4);
    });
  
    it('Move to East', () => {
      player.move(Direction.EST);
      expect(player.x).toBe(4);
    });

    it('Move to West', () => {
      player.move(Direction.OUEST);
      expect(player.x).toBe(2);
    });
})
 

describe('TEST Fighter', () => {
  let player: Player
  let enemy: Fighter

  /**On initialise nos valeurs avec beforeEach */
  beforeEach(() => {
    player = new Player(3, 3)
    enemy = new Monster(3,3)
  })

 it('check init', () => {
   expect(player.hp).toBe(100)
 });

  it('Get Damage', () => {
    player.getDamage(50)
  })
});