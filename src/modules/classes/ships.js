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
