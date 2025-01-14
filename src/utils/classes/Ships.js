import Ship from './Ship';

export class Battleship extends Ship {
  constructor() {
    super(4);
    this.name = 'Battleship';
  }
}

export class Cruiser extends Ship {
  constructor() {
    super(5);
    this.name = 'Cruiser';
  }
}

export class PatrolBoat extends Ship {
  constructor() {
    super(3);
    this.name = 'PatrolBoat';
  }
}

export class RescueShip extends Ship {
  constructor() {
    super(2);
    this.name = 'RescueShip';
  }
}

export class Destroyer extends Ship {
  constructor() {
    super(3);
    this.name = 'Destroyer';
  }
}
