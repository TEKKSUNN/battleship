import { ClassError, MethodError } from './Error';
import {
  Battleship,
  Cruiser,
  Destroyer,
  PatrolBoat,
  RescueShip,
} from './Ships';

// The board object that the Player and the Computer will use.
class Gameboard {
  constructor(size = 10) {
    if (!Number.isSafeInteger(size)) {
      throw new ClassError('Gameboard size must be a safe integer.');
    }

    if (size <= 0) {
      throw new ClassError('Gameboard size must be greater than 0.');
    }

    // This creates 10 arrays each on 10 arrays inside an array.
    // One-liner that saves memory.
    this.gameboard = Array.from({ length: size }, () =>
      new Array(size).fill(null)
    );
    this.misses = 0;
    this.ships = []; // Tracks all ships placed on the board.
  }

  // Places a ship somewhere on the board.
  placeShip(ShipObject, yPos, xPos, orientation) {
    if (
      (ShipObject === undefined) |
      (xPos === undefined) |
      (yPos === undefined) |
      (orientation === undefined)
    ) {
      throw new MethodError(
        "Gameboard.placeShip() doesn't have enough arguments."
      );
    }

    if (!Number.isSafeInteger(xPos) | !Number.isSafeInteger(yPos)) {
      throw new MethodError(
        'Gameboard.placeShip() xPos, yPos must be safe integers.'
      );
    }

    if (
      (xPos < 0) |
      (xPos > this.indiceLength) |
      (yPos < 0) |
      (yPos > this.indiceLength)
    ) {
      throw new MethodError(
        "Gameboard.placeShip() xPos, yPos must be within board's indice length."
      );
    }

    if (orientation !== 'horizontal' && orientation !== 'vertical') {
      throw new MethodError(
        'Gameboard.placeShip() orientation must be "horizontal" or "vertical".'
      );
    }

    // Ensure placement is valid and does not overlap
    const isPlacementValid = (x, y, length, orientation) => {
      if (orientation === 'horizontal') {
        return (
          x + length - 1 <= this.indiceLength &&
          this.gameboard[y].slice(x, x + length).every((cell) => cell === null)
        );
      } else {
        return (
          y + length - 1 <= this.indiceLength &&
          this.gameboard.slice(y, y + length).every((row) => row[x] === null)
        );
      }
    };

    if (!isPlacementValid(xPos, yPos, ShipObject.length, orientation)) {
      throw new MethodError('Gameboard.placeShip() placement is invalid.');
    }

    // Set orientation property of ShipObject.
    ShipObject.orientation = orientation;

    // Place the ship
    if (orientation === 'horizontal') {
      for (let i = 0; i < ShipObject.length; i++) {
        this.gameboard[yPos][xPos + i] = ShipObject;
      }
    } else {
      for (let i = 0; i < ShipObject.length; i++) {
        this.gameboard[yPos + i][xPos] = ShipObject;
      }
    }

    this.ships.push(ShipObject); // Track the ship
  }

  receiveAttack(yPos, xPos) {
    // If there is a ship on the coords.
    if (this.gameboard[yPos][xPos] !== null) {
      this.gameboard[yPos][xPos].hit();
      return 'hit';
    }
    // Else, increment miss and return "miss"
    this.misses++;
    return 'miss';
  }

  isAllShipSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  get size() {
    return this.gameboard[0].length;
  }

  get indiceLength() {
    return this.size - 1;
  }

  // Checks if the maximum number of ships (5) has been placed
  isMaxShips() {
    return this.ships.length >= 5;
  }

  // Places a ship at a random valid position with random orientation
  randomPlaceShip(ShipObject) {
    if (this.isMaxShips()) {
      throw new MethodError(
        'Gameboard.randomPlaceShip() maximum ships placed.'
      );
    }

    const orientations = ['horizontal', 'vertical'];
    let placed = false;

    while (!placed) {
      const xPos = Math.floor(Math.random() * this.size);
      const yPos = Math.floor(Math.random() * this.size);
      const orientation =
        orientations[Math.floor(Math.random() * orientations.length)];

      try {
        this.placeShip(ShipObject, yPos, xPos, orientation);
        placed = true;
      } catch {
        // If placement fails, try again
      }
    }
  }

  // Random places all 5 templates of ship.
  randomPlaceAllShips() {
    this.resetBoard();
    const ships = [
      new Battleship(),
      new Cruiser(),
      new PatrolBoat(),
      new RescueShip(),
      new Destroyer(),
    ];
    ships.forEach((ship) => {
      this.randomPlaceShip(ship);
    });
  }

  // Resets gameboard map.
  resetBoard() {
    this.gameboard = Array.from({ length: 10 }, () => new Array(10).fill(null));
    this.ships = [];
    this.misses = 0;
  }
}

export default Gameboard;
