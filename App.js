import "react-native-gesture-handler";
import Realm from 'realm';
import React, {useState, useEffect} from "react";
import { Button, Text, TextInput, View, Image, Pressable, ScrollView, FlatList, SectionList, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Picker } from '@react-native-picker/picker'
import { getShips, database } from './database';

const Stack = createNativeStackNavigator();

import Icons from './assets/icons';

const ships = getShips();
console.log(ships)

//1A1B1E

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Home Screen</Text> */}

      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Ships')}>
        <Text style={styles.text}>Ships</Text>
      </Pressable>

      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Items')}>
        <Text style={styles.text}>Items</Text>
      </Pressable>

      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Star Map')}>
        <Text style={styles.text}>Star Map</Text>
      </Pressable>

      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Mining')}>
        <Text style={styles.text}>Mining</Text>
      </Pressable>

      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Guides')}>
        <Text style={styles.text}>Guides</Text>
      </Pressable>

      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Trading')}>
        <Text style={styles.text}>Trading</Text>
      </Pressable>

      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Loadout')}>
        <Text style={styles.text}>Loadout</Text>
      </Pressable>
    </View>
  );
}


function ShipScreen({ navigation }) {
  const [ships, setShips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredShips, setFilteredShips] = useState([]);

  useEffect(() => {
    const ships = getShips();
    setShips(ships);
    setFilteredShips(ships);
  }, []);

  useEffect(() => {
    setFilteredShips(ships.filter(ship => ship.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, ships]);

  return (
    <View style={styles.container}>
      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          placeholder="Search for a ship..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <ScrollView>
        {filteredShips.map((item) => {
          const manufacturerKey = item.manufacturer.toLowerCase().split(' ').join('_');
          const nameKey = item.name.toLowerCase().split(' ').join('_');
          try {
            return (
              <View style={styles.shipContainer} key={item.name}>
                <Image
                  source={Icons[manufacturerKey]?.[nameKey]}
                  style={styles.icon}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.manufacturer}>{item.manufacturer}</Text>
                </View>
              </View>
            );
          } catch (e) {
            console.log(e);
            console.warn(`Could not find image for ship ${item.name} from ${item.manufacturer}`);
            return null;
          }
        })}
      </ScrollView>
    </View>
  );
}






function ItemScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Items screen</Text>
    </View>
  );
}

function StarMapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Star Map screen</Text>
    </View>
  );
}

function MiningScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Text>Mining screen</Text> */}
      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Mining Calculator')}>
        <Text style={styles.text}>Calculator</Text>
      </Pressable>
      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Mining Guides')}>
        <Text style={styles.text}>Guides</Text>
      </Pressable>
    </View>
  );
}



// Mining Calculator variables
const miningCommodities = ["Agricium", "Aluminium", "Beryl", "Bexalite", "Borase", "Copper", "Corundum", "Diamond", "Gold", "Hephaestanite", "Laranite", "Quantanium", "Quartz", "Taranite", "Titanium", "Tungsten"]
const commodityPrices = [["Agricium", 13.75, 27.50],
                         ["Aluminium", 0.67, 1.30],
                         ["Beryl", 2.21, 4.35],
                         ["Bexalite", 20.33, 44.00],
                         ["Borase", 16.29, 26.39],
                         ["Copper", 2.87, 6.15],
                         ["Corundum", 1.35, 2.71],
                         ["Diamond", 3.68, 7.35],
                         ["Gold", 3.20, 5.76],
                         ["Hephaestanite", 7.38, 15.83],
                         ["Laranite", 15.51, 31.00],
                         ["Quantanium", 44.00, 88.00],
                         ["Quartz", 0.78, 1.55],
                         ["Taranite", 16.29, 35.19],
                         ["Titanium", 4.47, 8.90],
                         ["Tungsten", 2.05, 4.06]]
let commodityIndex = 0
let rockVolumecSCU = 0
let mineralVolumecSCU = 0


function MiningCalculatorScreen() {
  const [rockMass, setMass] = useState('');
  const [percentage, setPercentage] = useState('');

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Mining Calculator screen</Text> */}
      <SelectDropdown
        data = {miningCommodities}
        defaultButtonText = "Select Commodity"
        onSelect={(selectedItem, index) => {
          commodityIndex = index
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
      />

      <TextInput
        value={rockMass}
        style={styles.input}
        placeholder="Enter Rock Mass:"
        onChangeText={(rockMass) => {
          setMass(rockMass)
        }}
        keyboardType="numeric"
      />

      <TextInput
        value={percentage}
        style={styles.input}
        placeholder="Enter Mineral Percentage:"
        onChangeText={(percentage) => {
          setPercentage(percentage)
        }}
        keyboardType="numeric"
      />

      <Text style={styles.text}>Rock mass = {rockMass}</Text>
      <Text style={styles.text}>Rock volume cSCU = {rockVolumecSCU = rockMass * 2}</Text>
      <Text style={styles.text}>Percentage = {percentage}</Text>
      <Text style={styles.text}>Mineral Volume cSCU = {mineralVolumecSCU = rockVolumecSCU * (percentage/100)}</Text>
      <Text style={styles.text}>Mineral Volume SCU = {mineralVolumecSCU / 100}</Text>
      <Text style={styles.text}>Raw Income (estimated) = {mineralVolumecSCU * commodityPrices[commodityIndex][1]}</Text>
      <Text style={styles.text}>Refined Income (estimated) = {mineralVolumecSCU * commodityPrices[commodityIndex][2]}</Text>
      <Text style={styles.text}>Junk SCU = {rockVolumecSCU * (1 - percentage/100) / 100}</Text>
    </View>
  );
}



function GuidesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Mining Guides')}>
        <Text style={styles.text}>Mining Guides</Text>
      </Pressable>
      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Location Guides')}>
        <Text style={styles.text}>Location Guides</Text>
      </Pressable>
      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Bounty Guides')}>
        <Text style={styles.text}>Bounty Guides</Text>
      </Pressable>
      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Misc Guides')}>
        <Text style={styles.text}>Misc Guides</Text>
      </Pressable>
    </View>
  );
}

function MiningGuidesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Guides screen</Text>
    </View>
  );
}

function LocationGuidesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Guides screen</Text>
    </View>
  );
}

function BountyGuidesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Guides screen</Text>
    </View>
  );
}

function MiscGuidesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Guides screen</Text>
    </View>
  );
}

function TradingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Popular Routes')}>
        <Text style={styles.text}>Popular Trading Routes</Text>
      </Pressable>
      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Trading Calculator')}>
        <Text style={styles.text}>Trading Calculator</Text>
      </Pressable>
    </View>
  );
}

function PopularRoutesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Popular Routes Screen</Text>
    </View>
  );
}

function TradingCalculatorScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Trading Calculator Screen</Text>
    </View>
  );
}

function LoadoutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.buttons} onPress={() => navigation.navigate('View Loadouts')}>
        <Text style={styles.text}>View Loadouts</Text>
      </Pressable>
      <Pressable style={styles.buttons} onPress={() => navigation.navigate('Create Loadout')}>
        <Text style={styles.text}>Create Loadout</Text>
      </Pressable>
    </View>
  );
}

function ViewLoadoutsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>View Loadouts screen</Text>
    </View>
  );
}



function CreateLoadoutScreen({ navigation, route }) {
  const [selectedShip, setSelectedShip] = useState(route.params?.ship || null);
  const [selectedLoadout, setSelectedLoadout] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState({});
  const [loadouts, setLoadouts] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [missiles, setMissiles] = useState([]);
  const [shields, setShields] = useState([]);
  const [powerPlants, setPowerPlants] = useState([]);
  const [coolers, setCoolers] = useState([]);
  const [quantumDrives, setQuantumDrives] = useState([]);
  const [selectedPowerPlant, setSelectedPowerPlant] = useState(null);
  const [selectedCooler, setSelectedCooler] = useState(null);
  const [selectedQuantumDrive, setSelectedQuantumDrive] = useState(null);
  
  useEffect(() => {
     // Fetch all available components from the database
     fetchComponents().then(components => {
      setWeapons(components.filter(component => component.type === 'weapon'));
      setMissiles(components.filter(component => component.type === 'missile'));
      setShields(components.filter(component => component.type === 'shield'));
      setPowerPlants(components.filter(component => component.type === 'powerPlant'));
      setCoolers(components.filter(component => component.type === 'cooler'));
      setQuantumDrives(components.filter(component => component.type === 'quantumDrive'));
    });
  }, []);
  
  // Function to fetch all available components from the database
  const fetchComponents = async () => {
    try {
      const ships = database.objects('Ship');
      let weapons = [];
      let shields = [];
      let powerPlants = [];
      let coolers = [];
      let quantumDrives = [];
      ships.forEach(ship => {
        weapons = [...weapons, ...ship.weapons];
        shields = [...shields, ...ship.shields];
        powerPlants = [...powerPlants, ...ship.powerPlants];
        coolers = [...coolers, ...ship.coolers];
        quantumDrives = [...quantumDrives, ...ship.quantumDrives];
      });
      weapons = [...new Set(weapons.map(item => item.default))];
      shields = [...new Set(shields.map(item => item.default))];
      powerPlants = [...new Set(powerPlants.map(item => item.default))];
      coolers = [...new Set(coolers.map(item => item.default))];
      quantumDrives = [...new Set(quantumDrives.map(item => item.default))];
      fetchComponents({ weapons, shields, powerPlants, coolers, quantumDrives });
    } catch (error) {
      console.error(error);
    }
  };
  

  // Function to handle changes in the selected components
  const handleComponentChange = (type, size, value) => {
    setSelectedComponents({
      ...selectedComponents,
      [type]: {
        ...selectedComponents[type],
        [size]: value
      }
    });
  };

  // Function to handle the saving of the loadout
  const handleSaveLoadout = () => {
    const { selectedShip, weapons, shields, powerPlants, coolers, quantumDrives } = state;
    database.write(() => {
      const ship = database.create('Ship', {
        name: selectedShip.name,
        manufacturer: selectedShip.manufacturer,
        weapons: weapons.map(weapon => ({
          size: weapon.size,
          default: weapon.default,
          count: weapon.count
        })),
        shields: shields.map(shield => ({
          size: shield.size,
          default: shield.default,
          count: shield.count
        })),
        powerPlants: powerPlants.map(powerPlant => ({
          size: powerPlant.size,
          default: powerPlant.default,
          count: powerPlant.count
        })),
        coolers: coolers.map(cooler => ({
          size: cooler.size,
          default: cooler.default,
          count: cooler.count
        })),
        quantumDrives: quantumDrives.map(quantumDrive => ({
          size: quantumDrive.size,
          default: quantumDrive.default,
          count: quantumDrive.count
        }))
      });
      console.log(`Saved loadout for ${ship.name}`);
    });
  };
  

  // Render the LoadoutScreen component

  return (
    <View>
      <Text>Selected Ship: {selectedShip ? selectedShip.name : 'No ship selected'}</Text>
      {selectedShip && Object.entries(selectedShip.weaponSlots).map(([size, count]) => (
        <View key={size}>
          <Text>Size {size} Weapons:</Text>
          <Picker
            selectedValue={selectedLoadout?.[`weapons${size}`]}
            onValueChange={value => setSelectedLoadout({ ...selectedLoadout, [`weapons${size}`]: value })}
          >
            <Picker.Item label="Select Weapon" value={null} />
            {weapons
              .filter(weapon => weapon.size === size)
              .map(weapon => (
                <Picker.Item key={weapon.name} label={weapon.name} value={weapon.name} />
              ))}
          </Picker>
        </View>
      ))}
      <View>
        <Text>Missiles:</Text>
        <Picker
          selectedValue={selectedLoadout?.missiles}
          onValueChange={value => setSelectedLoadout({ ...selectedLoadout, missiles: value })}
        >
          <Picker.Item label="Select Missile" value={null} />
          {missiles.map(missile => (
            <Picker.Item key={missile.name} label={missile.name} value={missile.name} />
          ))}
        </Picker>
      </View>
      <View>
        <Text>Shields:</Text>
        <Picker
          selectedValue={selectedLoadout?.shields}
          onValueChange={value => setSelectedLoadout({ ...selectedLoadout, shields: value })}
        >
          <Picker.Item label="Select Shield" value={null} />
          {shields.map(shield => (
            <Picker.Item key={shield.name} label={shield.name} value={shield.name} />
          ))}
        </Picker>
      </View>
      <View style={styles.componentSelector}>
        <Text style={styles.componentText}>Power Plant</Text>
        <Picker
          selectedValue={selectedPowerPlant}
          style={styles.componentPicker}
          onValueChange={itemValue => setSelectedPowerPlant(itemValue)}
        >
          <Picker.Item label="Select Power Plant" value={null} />
          {powerPlants.map(powerPlant => (
            <Picker.Item key={powerPlant.name} label={powerPlant.name} value={powerPlant.name} />
          ))}
        </Picker>
      </View>
      <View style={styles.componentSelector}>
        <Text style={styles.componentText}>Cooler</Text>
        <Picker
          selectedValue={selectedCooler}
          style={styles.componentPicker}
          onValueChange={itemValue => setSelectedCooler(itemValue)}
        >
          <Picker.Item label="Select Cooler" value={null} />
          {coolers.map(cooler => (
            <Picker.Item key={cooler.name} label={cooler.name} value={cooler.name} />
          ))}
        </Picker>
      </View>
      <View style={styles.componentSelector}>
        <Text style={styles.componentText}>Quantum Drive</Text>
        <Picker
          selectedValue={selectedQuantumDrive}
          style={styles.componentPicker}
          onValueChange={itemValue => setSelectedQuantumDrive(itemValue)}
        >
          <Picker.Item label="Select Quantum Drive" value={null} />
          {quantumDrives.map(quantumDrive => (
            <Picker.Item key={quantumDrive.name} label={quantumDrive.name} value={quantumDrive.name} />
          ))}
        </Picker>
      </View>
      <Button title="Save Loadout" onPress={handleSaveLoadout} />
    </View>
  );
};





const defaultStyles = {
  headerTintColor: "#fff", 
  headerTitleAlign: "center", 
  headerTitleStyle: { 
    fontWeight: "bold",
    fontSize: 25
  }
};

function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#091160",
          }
        }}
      >

        <Stack.Screen name="Home" component={HomeScreen} options={{title: "Home", ...defaultStyles }} />
        <Stack.Screen name="Ships" component={ShipScreen} options={{title: "Ships", ...defaultStyles}} />
        <Stack.Screen name="Items" component={ItemScreen} options={{title: "Items", ...defaultStyles}} />
        <Stack.Screen name="Star Map" component={StarMapScreen} options={{title: "Star Map", ...defaultStyles}} />

        <Stack.Screen name="Mining" component={MiningScreen} options={{title: "Mining", ...defaultStyles}} />
        <Stack.Screen name="Mining Calculator" component={MiningCalculatorScreen} options={{title: "Mining Calculator", ...defaultStyles}} />

        <Stack.Screen name="Guides" component={GuidesScreen} options={{title: "Guides", ...defaultStyles}} />
        <Stack.Screen name="Mining Guides" component={MiningGuidesScreen} options={{title: "Guides", ...defaultStyles}} />
        <Stack.Screen name="Location Guides" component={LocationGuidesScreen} options={{title: "Guides", ...defaultStyles}} />
        <Stack.Screen name="Bounty Guides" component={BountyGuidesScreen} options={{title: "Guides", ...defaultStyles}} />
        <Stack.Screen name="Misc Guides" component={MiscGuidesScreen} options={{title: "Guides", ...defaultStyles}} />

        <Stack.Screen name="Trading" component={TradingScreen} options={{title: "Trading", ...defaultStyles}} />
        <Stack.Screen name="Popular Routes" component={PopularRoutesScreen} options={{title: "Popular Routes", ...defaultStyles}} />
        <Stack.Screen name="Trading Calculator" component={TradingCalculatorScreen} options={{title: "Trading Calculator", ...defaultStyles}} />

        <Stack.Screen name="Loadout" component={LoadoutScreen} options={{title: "Loadouts", ...defaultStyles}} />
        <Stack.Screen name="View Loadouts" component={ViewLoadoutsScreen} options={{title: "View Loadouts", ...defaultStyles}} />
        <Stack.Screen name="Create Loadout" component={CreateLoadoutScreen} options={{title: "Create Loadout", ...defaultStyles}} />


      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "space-between",
    backgroundColor: "#1B279E",
    padding: 20,
    //margin: 10,
  },
  text: {
    fontSize: 19,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttons: {
    flex: 0.12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#077EE5",
    marginBottom: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderColor: "black"
  },
  panel: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 20,
  },
  inputField: {
    backgroundColor: "#fff",
    height: 40,
    borderWidth: 1,
    borderColor: "#333",
    width: "100%",
    padding: 10,
    marginTop: 12,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    color: "#444",
  },
  shipContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16
  },
  icon: {
    width: 64,
    height: 64,
    marginRight: 16
  },
  textContainer: {
    marginLeft: 10
  },
  manufacturer: {
    fontWeight: "bold"
  },
  name: {
    fontSize: 16
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10
  }
});