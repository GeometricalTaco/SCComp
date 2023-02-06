import Realm from 'realm';

const ShipSchema = {
  name: 'Ship',
  properties: {
    name: 'string',
    manufacturer: 'string',
    weapons: { 
      type: 'list',
      objectType: 'Weapon' 
    },
    shields: {
      type: 'list',
      objectType: 'Shield' 
    },
    powerPlants: {
      type: 'list',
      objectType: 'PowerPlant' 
    },
    coolers: {
      type: 'list',
      objectType: 'Cooler' 
    },
    quantumDrives: {
      type: 'list',
      objectType: 'QuantumDrive' 
    }
  }
};

const WeaponSchema = {
  name: 'Weapon',
  properties: {
    size: 'int',
    default: 'string',
    count: { type: 'int', default: 0 }
  }
};

const ShieldSchema = {
  name: 'Shield',
  properties: {
    size: 'int',
    default: 'string',
    count: { type: 'int', default: 0 }
  }
};

const PowerPlantSchema = {
  name: 'PowerPlant',
  properties: {
    size: 'int',
    default: 'string',
    count: { type: 'int', default: 0 }
  }
};

const CoolerSchema = {
  name: 'Cooler',
  properties: {
    size: 'int',
    default: 'string',
    count: { type: 'int', default: 0 }
  }
};

const QuantumDriveSchema = {
  name: 'QuantumDrive',
  properties: {
    size: 'int',
    default: 'string',
    count: { type: 'int', default: 0 }
  }
};

const createComponents = (realm) => {
  realm.write(() => {
    const weapons = realm.create('Weapon', [
      { size: 1, default: 'Laser Cannon', count: 0 },
      { size: 2, default: 'Plasma Cannon', count: 0 },
      { size: 3, default: 'Particle Cannon', count: 0 }
    ]);
    const shields = realm.create('Shield', [
      { size: 1, default: 'Light Shield', count: 0 },
      { size: 2, default: 'Medium Shield', count: 0 },
      { size: 3, default: 'Heavy Shield', count: 0 }
    ]);
    const powerPlants = realm.create('PowerPlant', [
      { size: 1, default: 'Nuclear Reactor', count: 0 },
      { size: 2, default: 'Antimatter Reactor', count: 0 },
      { size: 3, default: 'Singularity Reactor', count: 0 }
    ]);
    const coolers = realm.create('Cooler', [
      { size: 1, default: 'Radiation Cooler', count: 0 },
      { size: 2, default: 'Heat Dissipator', count: 0 },
      { size: 3, default: 'Quantum Cooler', count: 0 }
    ]);
    const quantumDrives = realm.create('QuantumDrive', [
      { size: 1, default: 'Warp Drive', count: 0 },
      { size: 2, default: 'Hyperspace Drive', count: 0 },
      { size: 3, default: 'Quantum Leap Drive', count: 0 }
    ]);
  });
};

export const database = new Realm({
  schema: [ShipSchema, WeaponSchema, ShieldSchema, PowerPlantSchema, CoolerSchema, QuantumDriveSchema],
  schemaVersion: 1,
  migration: (oldRealm, newRealm) => {
    // Copy all objects from the old realm to the new realm
    const oldObjects = oldRealm.objects('Ship');
    const newObjects = newRealm.objects('Ship');

    for (let i = 0; i < oldObjects.length; i++) {
      newObjects[i].name = oldObjects[i].name;
      newObjects[i].manufacturer = oldObjects[i].manufacturer;
      newObjects[i].weapons = oldObjects[i].weapons;
      newObjects[i].shields = oldObjects[i].shields;
      newObjects[i].powerPlants = oldObjects[i].powerPlants;
      newObjects[i].coolers = oldObjects[i].coolers;
      newObjects[i].quantumDrives = oldObjects[i].quantumDrives;
    }
  }
});

createComponents(database);




export const getShips = () => {
  const ships = database.objects("Ship");
  return ships.sorted("manufacturer").sorted("name");
}



//deleteAllShips()

// Add some ships to the database
// addShip({ name: 'Cutlass Black', manufacturer: 'Drake Interplanetary' });
// addShip({ name: 'Avenger Titan', manufacturer: 'Aegis Dynamics' });
// addShip({ name: 'Gladius', manufacturer: 'Aegis Dynamics' });
// addShip({ name: '300i', manufacturer: 'Origin Jumpworks' });
