import Realm from 'realm';

const LoadoutSchema = {
  name: 'Loadout',
  properties: {
    ship: 'string',
    weapons: 'Weapons[]'
  }
};

const WeaponsSchema = {
    name: "Weapons",
    properties: {
      name: "string",
      slot: "int",
      size: "int",
    }
  };

const databaseOptions = {
  path: 'loadouts.realm',
  schema: [LoadoutSchema, WeaponsSchema],
  schemaVersion: 0
};

export const saveLoadout = loadout => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            console.log("Realm database opened successfully")
            try {
                realm.write(() => {
                    realm.create('Loadout', loadout);
                    console.log("New loadout successfully added:", loadout)
                    resolve(loadout);
                });
            } catch(error) {
                console.error(error);
                reject(error);
            }
        })
        .catch(error => {
            console.log("Error adding new loadout:", data);
            reject(error);
        })
});

export const getLoadouts = () => {
    return new Promise((resolve, reject) => {
      Realm.open(databaseOptions)
        .then(realm => {
          const loadouts = realm.objects("Loadout");
          console.log(loadouts)
          resolve(loadouts);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
};