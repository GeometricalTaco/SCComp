import Realm from "realm";

// Define the schema for the Component database
const ComponentSchema = {
  name: 'Component',
  properties: {
    name: 'string',
    size: 'int',
    manufacturer: 'string'
  }
};

// Open the Component database
const databaseConfig = {
  path: 'components.realm',
  schema: [ComponentSchema],
  schemaVersion: 0
};

const componentDatabase = {
  components: [],
  loadComponents: function() {
    Realm.open(databaseConfig)
      .then(realm => {
        this.components = realm.objects('Component');
      })
      .catch(error => {
        console.error(error);
      });
  }
};

// Load the components into the componentDatabase object
componentDatabase.loadComponents();
