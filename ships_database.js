import Realm from 'realm';



const ShipSchema = {
  name: 'Ship',
  properties: {
    name: 'string',
    manufacturer: 'string',
    shipDescription: 'string',
    availableWeapons: 'WeaponSlots[]'
    //weapons: 'Weapon[]',
    //missileRacks: 'MissileRack[]',
    //missiles: 'Missiles[]',
    //powerPlants: 'PowerPlant[]',
    //coolers: 'Cooler[]',
    //shieldGenerators: 'ShieldGenerator[]'
    // availableComponents: {
    //   weapons: [4, 4, 4, 4],
    //   missileRacks
    // }
  }
};

const WeaponSlotsSchema = {
  name: "WeaponSlots",
  properties: {
    size: 'int',
    amount: 'int'
  }
};


const databaseOptions = {
  path: 'ships.realm',
  schema: [ShipSchema, WeaponSlotsSchema],
  schemaVersion: 2
};

export const addShip = newShip => new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      console.log("Realm database opened successfully")
      try {
        realm.write(() => {
          realm.create('Ship', newShip);
          console.log("New ship successfully added:", newShip)
          resolve(newShip);
        });
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
    .catch(error => {
      console.log("Error adding new ship", error);
      reject(error);
    })
});

export const getShips = () => {
    return new Promise((resolve, reject) => {
      Realm.open(databaseOptions)
        .then(realm => {
          const ships = Array.from(realm.objects("Ship").sorted([
            "manufacturer", 
            "name"
          ]));
          console.log(ships)
          resolve(ships);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
};

export const getShip = (name) => {
  return new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        const loadout = realm.objects("Ship").find(s => s.name === name);
        console.log(loadout)
        resolve(loadout);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const clearShips = () => {
  return new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.deleteAll();
        })
      })
      .catch(error => {
        console.log(error);
        reject(error)
      });
  });
};

//clearShips();


// addShip({ name: "Avenger Titan", manufacturer: "Aegis Dynamics", weapons: ["placeholder"], missileRacks: ["placeholder"], missiles: ["placeholder"], powerPlants: ["placeholder"], coolers: ["placeholder"], shieldGenerators: ["placeholder"]});

// Add some ships to the database
//addShip({ name: "Avenger Titan", manufacturer: "Aegis Dynamics", shipDescription: "The Aegis Avenger Titan is the base variant of the Avenger. With the extra cargo space and the Avenger's tried and true combat abilities, the Titan is a light cargo hauler that's more than capable of handling itself in a fight.", availableWeapons: [{ size: 3, amount: 2}, { size: 4, amount: 1}] });
//addShip({ name: "Constellation Aquila", manufacturer: "Roberts Space Industries", shipDescription: "Evan Gill", availableWeapons: [{ size: 2, amount: 2}, { size: 5, amount: 4}] });
