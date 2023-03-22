import Realm from 'realm';

const ItemSchema = {
  name: 'Item',
  properties: {
    name: 'string',
    manufacturer: 'string',
    type: 'string',
  }
};


const databaseOptions = {
  path: 'items.realm',
  schema: [ItemSchema],
  schemaVersion: 1
};

export const addItem = newItem => new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      console.log("Realm database opened successfully")
      try {
        realm.write(() => {
          realm.create('Item', newItem);
          console.log("New item successfully added:", newItem)
          resolve(newItem);
        });
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
    .catch(error => {
      console.log("Error adding new item", error);
      reject(error);
    })
});

export const getItems = () => {
    return new Promise((resolve, reject) => {
      Realm.open(databaseOptions)
        .then(realm => {
          const items = Array.from(realm.objects("Item"));
          console.log(items)
          resolve(items);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
};

export const clearItems = () => {
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


//clearItems()
//addItem({name: "C54 SMG", manufacturer:"Gemini", type:"SMG"})