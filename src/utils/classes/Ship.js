import { ClassError } from './Error';

// The class to make all kinds of ships
class Ship {
  constructor(length) {
    // Check if length is an integer
    if (!Number.isSafeInteger(length)) {
      throw new ClassError('Ship must have an integer as length.');
    }
    // Check if length is greater than 0
    if (length <= 0) {
      throw new ClassError('Ship length cannot be less than or equal to 0.');
    }

    // Initialize the ship
    this.length = length;
    this.hits = 0;
  }

  // Increments the hits to the ship
  hit() {
    this.hits++;
  }

  // Checks if the ship is sunk
  isSunk() {
    return this.length <= this.hits;
  }
}

export default Ship;
