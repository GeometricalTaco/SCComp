import Realm from 'realm';

const ShipSchema = {
  name: 'Ship',
  properties: {
    name: 'string',
    manufacturer: 'string',
  }
};

const database = new Realm({
  schema: [ShipSchema]
})

const addShip = newShip => new Promise((resolve, reject) => {
  Realm.open(database)
    .then(realm => {
      realm.write(() => {
        realm.create('Ship', newShip);
        resolve(newShip);
      });
    })
    .catch(error => reject(error));S
});


export const getShips = () => {
  const ships = database.objects("Ship");
  return ships.sorted("manufacturer").sorted("name");
};

// Add some ships to the database
addShip({ name: 'Cutlass Black', manufacturer: 'Drake Interplanetary' });
addShip({ name: 'Avenger Titan', manufacturer: 'Aegis Dynamics' });
addShip({ name: 'Gladius', manufacturer: 'Aegis Dynamics' });
addShip({ name: '300i', manufacturer: 'Origin Jumpworks' });
