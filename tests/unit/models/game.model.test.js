const faker = require('faker');
const { Game } = require('../../../src/models');

describe('Game model', () => {
  describe('Game validation', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        player1: {},
        player2: {},
        player3: {},
        dealer: {},
      };
    });

    test('should correctly validate a valid user if Deck is not Array', async () => {
      newUser.Deck = 'invalid';
      await expect(new Game(newUser).validate()).resolves.toBeUndefined();
    });
  });
});
