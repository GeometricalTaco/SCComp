import componentDatabase from "./components"
import shipDatabase from "./ship_database"
import Realm from "realm";

const ShipConfigScreen = (props) => {
    // Initialize state variables to store the selected ship, weapons, missiles, power plant, cooler, and shield generator.
    const [selectedShip, setSelectedShip] = useState(null);
    const [selectedWeapons, setSelectedWeapons] = useState([]);
    const [selectedMissiles, setSelectedMissiles] = useState([]);
    const [selectedPowerPlant, setSelectedPowerPlant] = useState(null);
    const [selectedCooler, setSelectedCooler] = useState(null);
    const [selectedShieldGenerator, setSelectedShieldGenerator] = useState(null);

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


    // A function to render the weapon selector component
    const renderWeaponSelector = () => {
      // If a ship hasn't been selected yet, display a message telling the user to select a ship first
      if (!selectedShip) {
        return <Text>Please select a ship first.</Text>;
      }

      // If a ship has been selected, display a picker for each weapon that the ship comes with
      return (
        <View>
          {selectedShip.factoryWeapons.map((weapon, index) => (
            <Picker key={index} selectedValue={selectedWeapons[index]} 
            // When the user selects a value from the picker, update the corresponding weapon in the selectedWeapons array
            onValueChange={(newValue) => setSelectedWeapons(prevState => {
              const newSelectedWeapons = [...prevState];
              newSelectedWeapons[index] = newValue;
              return newSelectedWeapons;
            })}>
              // Display the factory default option for the weapon
              <Picker.Item label={`${weapon} (factory default)`} value={weapon} />
              // Display the alternative option for the weapon, which is one size smaller than the factory default
              <Picker.Item label={`${weapon} -1 size`} value={`${weapon} -1 size`} />
            </Picker>
          ))}
        </View>
      );
    };

  
    // A function to render the missile selector component
    const renderMissileSelector = () => {
      // If a ship hasn't been selected yet, display a message telling the user to select a ship first
      if (!selectedShip) {
        return <Text>Please select a ship first.</Text>;
      }

      // If a ship has been selected, display a picker for each missile that the ship comes with
      return (
        <View>
          {selectedShip.factoryMissiles.map((missile, index) => (
            <Picker key={index} selectedValue={selectedMissiles[index]} 
            onValueChange={(newValue) => setSelectedMissiles(prevState => {
            // When the user selects a value from the picker, update the corresponding weapon in the selectedWeapons array    
              const newSelectedMissiles = [...prevState];
              newSelectedMissiles[index] = newValue;
              return newSelectedMissiles;
            })}>
              <Picker.Item label={`${missile} (factory default)`} value={missile} />
            </Picker>
          ))}
        </View>
      );
    };
  
    return (
        <View style={styles.container}>
          {/* Display a text prompt to select a ship */}
          <Text>Select a ship:</Text>
          {/* Render a picker for selecting a ship */}
          <Picker
            selectedValue={selectedShip}
            onValueChange={(newValue) => {
              // Find the selected ship object in the ship database
              const selectedShip = shipDatabase.ships.find(ship => ship.name === newValue);
              // Set the state with the selected ship
              setSelectedShip(selectedShip);
              // Initialize the selected weapons and missiles arrays to null values
              setSelectedWeapons(Array(selectedShip.factoryWeapons.length).fill(null));
              setSelectedMissiles(Array(selectedShip.factoryMissiles.length).fill(null));
            }}
          >
            {/* Render picker items for each ship in the ship database */}
            {shipDatabase.ships.map(ship => (
              <Picker.Item key={ship.name} label={ship.name} value={ship.name} />
              ))}
            </Picker>
            {/* Only render the weapons and missiles selectors if a ship is selected */}
            {selectedShip && (
              <View>
                {/* Display a text prompt to select weapons */}
                <Text>Select weapons:</Text>
                {/* Render a picker for each factory weapon of the selected ship */}
                {selectedShip.factoryWeapons.map((factoryWeapon, index) => (
                  <View key={factoryWeapon.name}>
                    {/* Display the name of the factory weapon */}
                    <Text>{factoryWeapon.name}</Text>
                    {/* Render a picker for selecting the size of the weapon */}
                    <Picker
                      selectedValue={selectedWeapons[index]}
                      onValueChange={(newValue) => {
                        // Update the selected weapons state with the new size selection
                        setSelectedWeapons(prev => {
                          const newSelectedWeapons = [...prev];
                          newSelectedWeapons[index] = newValue;
                          return newSelectedWeapons;
                        });
                      }}
                    >
                      {/* Render picker items for the factory configuration and one size down options */}
                      <Picker.Item label="Factory Configuration" value={factoryWeapon.name} />
                      <Picker.Item label="One size down" value={factoryWeapon.name + "-1"} />
                    </Picker>
                  </View>
              ))}
              <Text>Select missiles:</Text>
              {selectedShip.factoryMissiles.map((factoryMissile, index) => (
                <View key={factoryMissile.name}>
                  <Text>{factoryMissile.name}</Text>
                  <Picker
                    selectedValue={selectedMissiles[index]}
                    onValueChange={(newValue) => {
                      setSelectedMissiles(prev => {
                        const newSelectedMissiles = [...prev];
                        newSelectedMissiles[index] = newValue;
                        return newSelectedMissiles;
                      });
                    }}
                  >
                    <Picker.Item label="Factory Configuration" value={factoryMissile.name} />
                    <Picker.Item label="One size down" value={factoryMissile.name + "-1"} />
                  </Picker>
                </View>
              ))}
              <Text>Select components:</Text>
              {selectedShip.factoryComponents.map((factoryComponent, index) => (
                <View key={factoryComponent.name}>
                  <Text>{factoryComponent.name}</Text>
                  <Picker
                    selectedValue={selectedComponents[index]}
                    onValueChange={(newValue) => {
                      setSelectedComponents(prev => {
                        const newSelectedComponents = [...prev];
                        newSelectedComponents[index] = newValue;
                        return newSelectedComponents;
                      });
                    }}
                  >
                    {componentDatabase.components
                      .filter(component => component.size === factoryComponent.size)
                      .map(component => (
                        <Picker.Item key={component.name} label={component.name} value={component.name} />
                      ))}
                  </Picker>
                </View>
              ))}
            </View>
          )}
          {selectedShip && (
            <Button
              title="Save Configuration"
              onPress={() => {
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

              }}
            />
          )}
        </View>
    );
};