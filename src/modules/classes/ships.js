export default class Ship {
  constructor(length) {
    if (typeof length === "number") this.length = length;
    else this.length = 0;
    this.hits = 0;
    this.sunk = false;
  }
  isSunk() {
    return this.hits >= this.length;
  }
  updateSunk() {
    this.sunk = this.isSunk();
    return this.sunk;
  }
  hit() {
    this.hits++;
  }
}

export class Cruiser extends Ship {
  constructor() {
    return super(5);
  }
}

export class BattleShip extends Ship {
  constructor() {
    return super(4);
  }
}

export class PatrolBoat extends Ship {
  constructor() {
    return super(3);
  }
}

export class Destroyer extends Ship {
  constructor() {
    return super(3);
  }
}

export class RescueShip extends Ship {
  constructor() {
    return super(2);
  }
}