import Realm from 'realm';



const WeaponSchema = {
  name: 'Weapon',
  properties: {
    name: 'string',
    manufacturer: 'string',
    size: 'int',
    type: 'string'
  }
};



const databaseOptions = {
  path: 'weapons.realm',
  schema: [WeaponSchema],
  schemaVersion: 0
};

export const addWeapon = newWeapon => new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      console.log("Realm database opened successfully")
      try {
        realm.write(() => {
          realm.create('Weapon', newWeapon);
          console.log("New weapon successfully added:", newWeapon)
          resolve(newWeapon);
        });
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
    .catch(error => {
      console.log("Error adding new weapon", error);
      reject(error);
    })
});

export const getWeapons = () => {
    return new Promise((resolve, reject) => {
      Realm.open(databaseOptions)
        .then(realm => {
          const weapons = Array.from(realm.objects("Weapon").sorted([
            "manufacturer", 
            "name"
          ]));
          console.log(weapons)
          resolve(weapons);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
};

export const clearWeapons = () => {
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

//addWeapon({ name: "M6A Cannon", manufacturer: "Behring Applied Technology", size: 4, type: "Laser Cannon"})

//clearWeapons();

// addWeapon({ name: "Mantis GT-220", manufacturer: "Gallensob Tactical Systems", size: 3, type: "Ballistic Gattling"})
// addWeapon({ name: "CF-227 Badger Repeater", manufacturer: "Klaus & Werner", size: 2, type: "Laser Repeater"})

