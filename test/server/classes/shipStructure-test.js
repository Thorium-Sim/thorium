var chai = require('chai');
var expect = chai.expect;

let deck,room,inventory
describe('Ship Structure', function() {
  before(function() {
    this.Deck = require('../../../server/classes/shipStructure').Deck;
    this.Room = require('../../../server/classes/shipStructure').Room;
    this.InventoryItem = require('../../../server/classes/shipStructure').InventoryItem;
  });

  describe('Deck', function(){
    it('should initialize', function(){
      deck = new this.Deck({});
      expect(deck.number).to.equal(1);
      expect(deck.doors).to.be.false;
      expect(deck.evac).to.be.false;
      expect(deck.class).to.equal('Deck');
    });
    it('should have a method setDoors', function(){
      deck.setDoors(true);
      expect(deck.doors).to.be.true;

    });
    it('should have a method setEvac', function(){
      deck.setEvac(true);
      expect(deck.evac).to.be.true;
    });
  });

  describe('Room', function(){
    it('should initialize', function(){
      room = new this.Room({deckId: 1});
      expect(room.class).to.equal('Room');
      expect(room.name).to.equal('Vic\'s Lounge');
      expect(room.gas).to.be.false;
    });
    it('should have a method setGas', function(){
      room.setGas(true);
      expect(room.gas).to.be.true;
    });
    it('should have a method rename', function(){
      room.rename('Test Room');
      expect(room.name).to.equal('Test Room');
    });
  });

  describe('InventoryItem', function() {
    it('should initialize', function() {
      inventory = new this.InventoryItem({});
      expect(inventory.class).to.equal('InventoryItem');
      expect(inventory.name).to.equal('Generic Cargo');
      expect(inventory.roomCount).to.be.instanceOf(Object);
      expect(Object.keys(inventory.roomCount).length).to.equal(0);
    })
    it('should have method updateCount', function(){
      inventory.updateCount('room 1', 15);
      expect(inventory.roomCount['room 1']).to.equal(15);
    });
    it('should have method move', function(){
      inventory.move('room 1', 'room 2', 12);
      expect(inventory.roomCount['room 1']).to.equal(3);
      expect(inventory.roomCount['room 2']).to.equal(12);
    });
    it('should have method updateMetadata', function(){
      inventory.updateMetadata({type: 'Test'});
      expect(inventory.metadata.type).to.equal('Test');
    });
    it('should initialize with a roomCount array', function() {
      inventory = new this.InventoryItem({
        roomCount: [{room: 'test room 1', count: 23}, {room: 'test room 2', count: 11}]
      });
      expect(inventory.roomCount['test room 1']).to.equal(23);
      expect(inventory.roomCount['test room 2']).to.equal(11);
    });
    it('should initialize with a roomCount object', function() {
      inventory = new this.InventoryItem({
        roomCount: {'test room 1': 13, 'test room 2': 19}
      });
      expect(inventory.roomCount['test room 1']).to.equal(13);
      expect(inventory.roomCount['test room 2']).to.equal(19);
    })
  });
});