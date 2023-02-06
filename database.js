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

const database = new Realm({
  schema: [ShipSchema, WeaponSchema, ShieldSchema, PowerPlantSchema, CoolerSchema, QuantumDriveSchema]
});


//deleteAllShips()

// Add some ships to the database
// addShip({ name: 'Cutlass Black', manufacturer: 'Drake Interplanetary' });
// addShip({ name: 'Avenger Titan', manufacturer: 'Aegis Dynamics' });
// addShip({ name: 'Gladius', manufacturer: 'Aegis Dynamics' });
// addShip({ name: '300i', manufacturer: 'Origin Jumpworks' });
