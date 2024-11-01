import Ship from "../../modules/classes/ships";

function testIsSunk(ship) {
  expect(ship.s.isSunk()).toBe(ship.t);
}

it("Ship method: isSunk works", () => {
  const ships = [
    {
      s: new Ship(5),
      t: false,
    },
    {
      s: new Ship(3),
      t: false,
    },
    {
      s: new Ship(0),
      t: true,
    },
  ];
  ships.forEach(testIsSunk);
});

function testHit(ship) {
  for (let i = 0; i < ship.t; i++) {
    ship.s.hit();
  }
  expect(ship.s.hits).toBe(ship.t);
}

it("Ship method: hit works", () => {
  const ships = [
    {
      s: new Ship(5),
      t: 3,
    },
    {
      s: new Ship(2),
      t: 0,
    },
    {
      s: new Ship(0),
      t: 2,
    },
  ];
  ships.forEach(testHit);
});
