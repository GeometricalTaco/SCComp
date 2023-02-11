import Realm from 'realm';

const ShipSchema = {
  name: 'Ship',
  properties: {
    name: 'string',
    manufacturer: 'string',
    weapons: 'Weapon[]',
    missileRacks: 'MissileRack[]',
    missiles: 'Missiles[]',
    powerPlants: 'PowerPlant[]',
    coolers: 'Cooler[]',
    shieldGenerators: 'ShieldGenerator[]'
  }
};

const databaseOptions = {
  path: 'ships.realm',
  schema: [ShipSchema],
  schemaVersion: 0
};

const addShip = newShip => new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {
        realm.create('Ship', newShip);
        resolve(newShip);
      });
    })
    .catch(error => reject(error));
});

const getShips = () => {
    return databaseOptions.objects("Ship").sorted("manufacturer, name");
};

export default { addShip, getShips };

// Add some ships to the database
addShip({ name: "Avenger Titan", manufacturer: "Aegis Dynamics", weapons: ["placeholder"], missileRacks: ["placeholder"], missiles: ["placeholder"], powerPlants: ["placeholder"], coolers: ["placeholder"], shieldGenerators: ["placeholder"]});