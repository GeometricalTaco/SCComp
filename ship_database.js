const Realm = require('realm');

const ShipSchema = {
  name: 'Ship',
  properties: {
    name: 'string',
    manufacturer: 'string',
    weapons: 'Weapon[]',
    missileRacks: 'MissileRack[]',
    powerPlants: 'PowerPlant[]',
    coolers: 'Cooler[]',
    shieldGenerators: 'ShieldGenerator[]'
  }
};

const WeaponSchema = {
  name: 'Weapon',
  properties: {
    size: 'int',
    name: 'string'
  }
};

const MissileRackSchema = {
  name: 'MissileRack',
  properties: {
    size: 'int',
    missiles: 'Missile[]'
  }
};

const MissileSchema = {
  name: 'Missile',
  properties: {
    size: 'int',
    name: 'string'
  }
};

const PowerPlantSchema = {
  name: 'PowerPlant',
  properties: {
    size: 'int',
    name: 'string'
  }
};

const CoolerSchema = {
  name: 'Cooler',
  properties: {
    size: 'int',
    name: 'string'
  }
};

const ShieldGeneratorSchema = {
  name: 'ShieldGenerator',
  properties: {
    size: 'int',
    name: 'string'
  }
};

const database = new Realm({
  schema: [ShipSchema, WeaponSchema, MissileRackSchema, MissileSchema, PowerPlantSchema, CoolerSchema, ShieldGeneratorSchema]
});

database.write(() => {
  const gladius = database.create('Ship', {
    name: 'Gladius',
    manufacturer: 'Aegis Dynamics',
    weapons: [
      {
        size: 3,
        name: 'Mantis GT-200'
      },
      {
        size: 3,
        name: 'CF-337 Panther Repeater'
      },
      {
        size: 3,
        name: 'CF-337 Panther Repeater'
      }
    ],
    missileRacks: [
      {
        size: 3,
        missiles: [
          {
            size: 2,
            name: 'Ignite II'
          },
          {
            size: 2,
            name: 'Ignite II'
          }
        ]
      },
      {
        size: 3,
        missiles: [
          {
            size: 3,
            name: 'Arrester III'
          }
        ]
      },
      {
        size: 3,
        missiles: [
          {
            size: 3,
            name: 'Arrester III'
          }
        ]
      }
    ],
    powerPlants: [
      {
        size: 1,
        name: 'Regulus'
      }
    ],
    coolers: [
        {
          type: "Bracer",
          size: 1
        },
        {
          type: "Bracer",
          size: 1
        }
    ],
    shieldGenerators: [
        {
            type: "Allstop",
            size: 1
        },
        {
            type: "Allstop",
            size: 1
        }
    ],
})});
     
