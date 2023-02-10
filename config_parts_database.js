import Realm from "realm";

// Define the schema for the Configuration database
const ConfigurationSchema = {
  name: 'Configuration',
  properties: {
    shipName: 'string',
    shipManufacturer: 'string',
    weapons: 'list',
    missiles: 'list',
    components: 'list'
  }
};



// Open the databases
Realm.open({ schema: [ConfigurationSchema] })
  .then(realm => {
    // Get the selected ship, weapons, missiles, and components
    const selectedShip = ...;
    const selectedWeapons = ...;
    const selectedMissiles = ...;
    const selectedComponents = ...;

    // Create a new configuration object
    const newConfiguration = {
      shipName: selectedShip.name,
      shipManufacturer: selectedShip.manufacturer,
      weapons: selectedWeapons,
      missiles: selectedMissiles,
      components: selectedComponents
    };

    // Write the new configuration to the Configuration database
    realm.write(() => {
      realm.create('Configuration', newConfiguration);
    });
  })
  .catch(error => {
    console.error(error);
  });
