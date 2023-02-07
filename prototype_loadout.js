import React, { useState, useEffect } from 'react';
import { View, Text, Picker, Button } from 'react-native';
import Realm from 'realm';

const ShipConfigScreen = ({ navigation, route }) => {
  const [selectedShip, setSelectedShip] = useState('');
  const [factoryConfig, setFactoryConfig] = useState(null);
  const [userConfig, setUserConfig] = useState(null);

  useEffect(() => {
    Realm.open({
      schema: [ShipSchema, WeaponSchema, MissileSchema, ComponentSchema],
    }).then((realm) => {
      const ship = realm.objects('Ship').filtered(`name = "${selectedShip}"`)[0];
      setFactoryConfig(ship);
    });
  }, [selectedShip]);

  const onValueChange = (itemValue) => {
    setSelectedShip(itemValue);
  };

  const saveConfig = () => {
    Realm.open({
      schema: [ShipConfigSchema],
    }).then((realm) => {
      realm.write(() => {
        realm.create('ShipConfig', {
          shipName: selectedShip,
          weapons: userConfig.weapons,
          missiles: userConfig.missiles,
          components: userConfig.components,
        });
      });
    });
    navigation.navigate('Home');
  };

  return (
    <View>
      <Text>Select a ship:</Text>
      <Picker
        selectedValue={selectedShip}
        onValueChange={onValueChange}
      >
        {/* Loop through all the ships in the database and add them as options */}
        {realm.objects('Ship').map((ship) => (
          <Picker.Item
            key={ship.name}
            label={ship.name}
            value={ship.name}
          />
        ))}
      </Picker>
      {factoryConfig && (
        <View>
          <Text>Factory Configuration:</Text>
          {/* Display the factory configuration */}
          <Text>{factoryConfig.weapons}</Text>
          <Text>{factoryConfig.missiles}</Text>
          <Text>{factoryConfig.components}</Text>
          <Text>User Configuration:</Text>
          {/* Allow the user to select their own configuration */}
          <Picker
            selectedValue={userConfig.weapons}
            onValueChange={(itemValue) => setUserConfig({ ...userConfig, weapons: itemValue })}
          >
            {/* Loop through all the weapons in the database and add them as options */}
            {realm.objects('Weapon').map((weapon) => (
              <Picker.Item
                key={weapon.name}
                label={weapon.name}
                value={weapon.name}
              />
            ))}
          </Picker>
          <Picker
            selectedValue={userConfig.missiles}
            onValueChange={(itemValue) => setUserConfig({ ...userConfig, missiles: itemValue })}
          >
                {/* Loop through all the missiles in the database and add them as options */}
                {realm.objects('Missile').map((missile) => (
              <Picker.Item
                key={missile.name}
                label={missile.name}
                value={missile.name}
              />
            ))}
          </Picker>
          <Picker
            selectedValue={userConfig.components}
            onValueChange={(itemValue) => setUserConfig({ ...userConfig, components: itemValue })}
          >
            {/* Loop through all the components in the database and add them as options */}
            {realm.objects('Component').map((component) => (
              <Picker.Item
                key={component.name}
                label={component.name}
                value={component.name}
              />
            ))}
          </Picker>
        </View>
      )}
      <Button title="Save Configuration" onPress={saveConfig} />
    </View>
  );
};

export default ShipConfigScreen;

