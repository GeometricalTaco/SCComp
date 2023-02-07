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

const addComponents = () => {
  const weapons = database.objects('Weapon');
  const shields = database.objects('Shield');
  const powerPlants = database.objects('PowerPlant');
  const coolers = database.objects('Cooler');
  const quantumDrives = database.objects('QuantumDrive');

  database.write(() => {
    weapons.forEach(weapon => {
      database.create('Weapon', {
        size: weapon.size,
        default: weapon.default,
        count: weapon.count
      });
    });

    shields.forEach(shield => {
      database.create('Shield', {
        size: shield.size,
        default: shield.default,
        count: shield.count
      });
    });

    powerPlants.forEach(powerPlant => {
      database.create('PowerPlant', {
        size: powerPlant.size,
        default: powerPlant.default,
        count: powerPlant.count
      });
    });

    coolers.forEach(cooler => {
      database.create('Cooler', {
        size: cooler.size,
        default: cooler.default,
        count: cooler.count
      });
    });

    quantumDrives.forEach(quantumDrive => {
      database.create('QuantumDrive', {
        size: quantumDrive.size,
        default: quantumDrive.default,
        count: quantumDrive.count
      });
    });
  });
};

export const getShips = () => {
  addComponents();
  const ships = database.objects("Ship");
  return ships.sorted("manufacturer").sorted("name");
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






//deleteAllShips()

// Add some ships to the database
// addShip({ name: 'Cutlass Black', manufacturer: 'Drake Interplanetary' });
// addShip({ name: 'Avenger Titan', manufacturer: 'Aegis Dynamics' });
// addShip({ name: 'Gladius', manufacturer: 'Aegis Dynamics' });
// addShip({ name: '300i', manufacturer: 'Origin Jumpworks' });
