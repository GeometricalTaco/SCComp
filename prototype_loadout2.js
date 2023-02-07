const ShipConfigScreen = (props) => {
    const [selectedShip, setSelectedShip] = useState(null);
    const [selectedWeapons, setSelectedWeapons] = useState([]);
    const [selectedMissiles, setSelectedMissiles] = useState([]);
    const [selectedPowerPlant, setSelectedPowerPlant] = useState(null);
    const [selectedCooler, setSelectedCooler] = useState(null);
    const [selectedShieldGenerator, setSelectedShieldGenerator] = useState(null);
  
    const renderWeaponSelector = () => {
      if (!selectedShip) {
        return <Text>Please select a ship first.</Text>;
      }
  
      return (
        <View>
          {selectedShip.factoryWeapons.map((weapon, index) => (
            <Picker key={index} selectedValue={selectedWeapons[index]} onValueChange={(newValue) => setSelectedWeapons(prevState => {
              const newSelectedWeapons = [...prevState];
              newSelectedWeapons[index] = newValue;
              return newSelectedWeapons;
            })}>
              <Picker.Item label={`${weapon} (factory default)`} value={weapon} />
              <Picker.Item label={`${weapon} -1 size`} value={`${weapon} -1 size`} />
            </Picker>
          ))}
        </View>
      );
    };
  
    const renderMissileSelector = () => {
      if (!selectedShip) {
        return <Text>Please select a ship first.</Text>;
      }
  
      return (
        <View>
          {selectedShip.factoryMissiles.map((missile, index) => (
            <Picker key={index} selectedValue={selectedMissiles[index]} onValueChange={(newValue) => setSelectedMissiles(prevState => {
              const newSelectedMissiles = [...prevState];
              newSelectedMissiles[index] = newValue;
              return newSelectedMissiles;
            })}>
              <Picker.Item label={`${missile} (factory default)`} value={missile} />
              <Picker.Item label={`${missile} -1 size`} value={`${missile} -1 size`} />
            </Picker>
          ))}
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <Text>Select a ship:</Text>
        <Picker
          selectedValue={selectedShip}
          onValueChange={(newValue) => {
            const selectedShip = shipDatabase.ships.find(ship => ship.name === newValue);
            setSelectedShip(selectedShip);
            setSelectedWeapons(Array(selectedShip.factoryWeapons.length).fill(null));
            setSelectedMissiles(Array(selectedShip.factoryMissiles.length).fill(null));
          }}
        >
          {shipDatabase.ships.map(ship => (
            <Picker.Item key={ship.name} label={ship.name} value={ship.name} />
            ))}
          </Picker>
          {selectedShip && (
            <View>
              <Text>Select weapons:</Text>
              {selectedShip.factoryWeapons.map((factoryWeapon, index) => (
                <View key={factoryWeapon.name}>
                  <Text>{factoryWeapon.name}</Text>
                  <Picker
                    selectedValue={selectedWeapons[index]}
                    onValueChange={(newValue) => {
                      setSelectedWeapons(prev => {
                        const newSelectedWeapons = [...prev];
                        newSelectedWeapons[index] = newValue;
                        return newSelectedWeapons;
                      });
                    }}
                  >
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
                Realm.open(databaseConfig)
                  .then(realm => {
                    realm.write(() => {
                      const newConfig = {
                        shipName: selectedShip.name,
                        weapons: selectedWeapons,
                        missiles: selectedMissiles,
                        components: selectedComponents
                      };
                      realm.create('Configuration', newConfig);
                    });
                    navigation.pop();
                })
                .catch(error => {
                    console.log("Error opening realm", error);
                });
            }}
            />
          )}
        </View>
    );
};
    
  