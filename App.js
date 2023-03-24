import "react-native-gesture-handler";
import Realm from 'realm';
import React, {useState, useEffect} from "react";
import { Button, Text, TextInput, View, Image, Pressable, ScrollView, FlatList, SectionList, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getShips, getShip } from './ships_database'
import { getWeapons } from "./weapons_database";
import { saveLoadout, getLoadouts, getLoadout } from "./loadout_database";
import { getItems } from "./items_database";
import Icons from './assets/icons';


const Stack = createNativeStackNavigator();

// Function for sorting data
function sortData(data, sortBy, reversed = false) { // reversed is a boolean
  if (!sortBy) return data;

  return [...data].sort((a, b) => {
    if (reversed) {
      if (typeof (b[sortBy]) === "number") {
        return Number(b[sortBy]) - Number(a[sortBy]);
      } else {
        return b[sortBy].toString().localeCompare(a[sortBy].toString());
      };
    };

    if (typeof (a[sortBy]) === "number") {
      return Number(a[sortBy]) - Number(b[sortBy]);
    } else {
      return a[sortBy].toString().localeCompare(b[sortBy].toString());
    };
  });
};


// Home Screen function containing buttons to the main function menus
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

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


// Ship screen main function. Displays a list of all the ships in the database, 
// with the appropriate icon, name of the ship, and manufacturer of the ship
function ShipsScreen({ navigation }) {
  const [ships, setShips] = useState([]);
  const [sortedShips, setSortedShips] = useState([]);
  const [sortType, setSortType] = useState("name")
  const sortTypes = ["name", "manufacturer"]

  useEffect(() => {
    const fetchShips = async () => {
      try{
        const result  = await getShips();
        const ships = Array.from(result)
        setShips(ships);
      } catch (error) {
        console.error(error)
      }
    }
    fetchShips();
  }, []);

  useEffect(() => {
    setSortedShips(sortData(ships, sortType));
  }, [ships, sortType]);


  if (!ships.length) {
    return (<Text>No ships found</Text>)
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <SelectDropdown
          data = {sortTypes}
          defaultButtonText = "Select Sort Type"
          
          onSelect={(selectedItem, index) => {
            setSortType(sortTypes[index])
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
        {sortedShips.map((item) => {
          const manufacturerKey = item.manufacturer.toLowerCase().split(' ').join('_');
          const nameKey = item.name.toLowerCase().split(' ').join('_');
          try {
            return (
              <View key={item.name}>
                <Pressable style={styles.shipListContainer} key={item.name} onPress={() => navigation.navigate('View Ship', { ship: item.name })}>
                  <Image
                    source={Icons[manufacturerKey]?.[nameKey]}
                    style={styles.icon}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.shipName}>{item.name}</Text>
                    <Text style={styles.shipManufacturer}>{item.manufacturer}</Text>
                  </View>
                </Pressable>
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


// Screen connected to ShipsScreen, shows data around specific ships
function ViewShipScreen({ navigation, route }) {
  const [ship, setShip] = useState(null);

  useEffect(() => {
    const fetchShip = async () => {
      try{
        const result  = await getShip(route.params.ship);
        console.log(result);
        //const loadouts = Array.from(result)
        setShip(result);
      } catch (error) {
        console.error(error)
      }
    }
    fetchShip(route.params.ship);
  }, [route.params]);

  console.log("Ship console log")
  console.log(ship)


  if (!ship) {
    return (
      <View>
        <Text>some text or somthing to say it isn't loaded</Text>
      </View>
    )
  } else {
    const shipNameKey = ship.name.toLowerCase().split(' ').join('_');
    const shipManufacturerKey = ship.manufacturer.toLowerCase().split(' ').join('_');
    return (
      <View style={styles.shipContainer} key={ship.name}>
        <Image
          source={Icons[shipManufacturerKey]?.[shipNameKey]}
          style={styles.topImage}
        />
          <Text style={styles.shipName}>{ship.name}</Text>
          <Text style={styles.shipManufacturer}>{ship.manufacturer}</Text>
          <Text style={styles.text}>{ship.shipDescription}</Text>
      </View>
    );
  }
}



// Item screen main function. Identical to Ship screen, except for items instead.
// Works in the same way.
function ItemsScreen({ navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try{
        const result  = await getItems();
        console.log(result);
        const items = Array.from(result)
        setItems(items);
      } catch (error) {
        console.error(error)
      }
    }
    fetchItems();
  }, []);

  if (!items.length) {
    return (<Text>No items found</Text>)
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {items.map((item) => {
          // const manufacturerKey = item.manufacturer.toLowerCase().split(' ').join('_');
          // const nameKey = item.name.toLowerCase().split(' ').join('_');
          try {
            return (
              <View style={styles.shipListContainer} key={item.name}>
                {/* <Image
                  source={Icons[manufacturerKey]?.[nameKey]}
                  style={styles.icon}
                /> */}
                <View style={styles.textContainer}>
                  <Text style={styles.shipName}>{item.name}</Text>
                  <Text style={styles.shipManufacturer}>{item.manufacturer}</Text>
                </View>
              </View>
            );
          } catch (e) {
            console.log(e);
            //console.warn(`Could not find image for item ${item.name}`);
            return null;
          }
        })}
      </ScrollView>
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

// Screen to direct users to either mining calculator screen, or mining guides screen.
// Creates two pressable buttons which navigate to their respective screens.
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
// These variables are used for calculations and displaying information in the mining calculator screen
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

// Mining calculator screen function. Takes user inputs for commodity, rock mass and mineral percentage,
// then performs relevant calculations on the inputted data to return a collection of relevant data for the user.
function MiningCalculatorScreen() {
  const [rockMass, setMass] = useState('');
  const [percentage, setPercentage] = useState('');

  return (
    <View style={styles.container}>
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

// Screen to direct users to either trading function. Contains simple pressables that navigate to the relevant screen
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

// Screen to direct users to View Loadout screen or Create Loadout screen.
// Contains pressables to navigate to relevant screen.
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

// View Loadout screen function. Fetches all loadouts stored in the database, sorts by manufacturer then ship name,
// both alphabetically. Displays all loadouts in a list with the Loadout name, ship name and an icon for the ship.
// Each loadout is an individual Pressable element, allowing users to click on loadouts to navigate to a new screen,
// which contains more data from the loadout.
function ViewLoadoutsScreen({ navigation }) {
  const [loadouts, setLoadouts] = useState([]);

  useEffect(() => {
    const fetchLoadouts = async () => {
      try{
        const result  = await getLoadouts();
        console.log(result);
        const loadouts = Array.from(result)
        setLoadouts(loadouts);
      } catch (error) {
        console.error(error)
      }
    }
    fetchLoadouts();
  }, []);

  if (!loadouts.length) {
    return (<Text>No loadouts found</Text>)
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {loadouts.map((item) => {
          const shipNameKey = item.shipName.toLowerCase().split(' ').join('_');
          const shipManufacturerKey = item.shipManufacturer.toLowerCase().split(' ').join('_');
          try {
            return (
              <Pressable style={styles.shipListContainer} key={item.name} onPress={() => navigation.navigate('View Loadout', { loadout: item.name })}>
                <Image
                  source={Icons[shipManufacturerKey]?.[shipNameKey]}
                  style={styles.icon}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.shipName}>{item.name}</Text>
                  <Text style={styles.shipManufacturer}>{item.shipName}</Text>
                </View>
              </Pressable>
            );
          } catch (e) {
            console.log(e);
            return null;
          }
        })}
      </ScrollView>
    </View>
  );
}

// Screen connected to View Loadouts screen. Displays more data of a selected loadout.
function ViewLoadoutScreen({ navigation, route }) {
  const [loadout, setLoadout] = useState(null);

  useEffect(() => {
    const fetchLoadout = async () => {
      try{
        const result  = await getLoadout(route.params.loadout);
        console.log(result);
        //const loadouts = Array.from(result)
        setLoadout(result);
      } catch (error) {
        console.error(error)
      }
    }
    fetchLoadout(route.params.loadout);
  }, [route.params]);

  console.log("Loadout console log")
  console.log(loadout)


  if (!loadout) {
    return (
      <View>
        <Text>some text or somthing to say it isn't loaded</Text>
      </View>
    )
  } else {
    console.log(loadout)
    const shipNameKey = loadout.shipName.toLowerCase().split(' ').join('_');
    const shipManufacturerKey = loadout.shipManufacturer.toLowerCase().split(' ').join('_');
    return (
      <View style={styles.shipContainer} key={loadout.name}>
        <Image
          source={Icons[shipManufacturerKey]?.[shipNameKey]}
          style={styles.topImage}
        />
        <View style={styles.container}>
          <Text style={styles.shipManufacturer}>{loadout.name}</Text>
          <Text style={styles.shipName}>{loadout.shipName}</Text>
          <Text style={styles.shipManufacturer}>{loadout.shipManufacturer}</Text>
          <Text style={styles.text}>Weapons</Text>
          {loadout.weapons.map((item) => {
          try {
            return (
              <View key={item.name}> 
                <Text style={styles.text}>Weapon slot: {item.slot + 1}</Text>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.size}</Text>
              </View>
            );
          } catch (e) {
            console.log(e);
            return null;
          }
        })}
        </View>
      </View>
    );
  }
}

// Create Loadout screen function. Fetches all ships, weapons, and loadouts from respective databases.
// Has some basic error handling for Loadouts having a unique name, and for making sure a name has been inputted by the user.
// Allows the user to select a ship for the loadout, then generates the correct number of dropdown selectors depending on
// the capacity of the selected ship. Allows user to save loadout to database, then navigates back to previous menu.
function CreateLoadoutScreen({ navigation }) {
  const [ships, setShips] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [loadouts, setLoadouts] = useState([]);

  // Initialize state variables to store the selected ship, weapons, missiles, power plant, cooler, and shield generator.
  const [selectedName, setSelectedName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [selectedShip, setSelectedShip] = useState(null);
  const [selectedWeapons, setSelectedWeapons] = useState([]);

  const [selectedMissileRack, setSelectedMissileRack] = useState([]);
  const [selectedMissiles, setSelectedMissiles] = useState([]);
  const [selectedPowerPlants, setSelectedPowerPlants] = useState(null);
  const [selectedCoolers, setSelectedCoolers] = useState(null);
  const [selectedShieldGenerators, setSelectedShieldGenerators] = useState(null);
  


  useEffect(() => {
    const fetchShips = async () => {
      try{
        const result  = await getShips();
        console.log(result);
        const ships = Array.from(result)
        setShips(ships);
      } catch (error) {
        console.error(error)
      }
    }
    fetchShips();
  }, []);

  useEffect(() => {
    const fetchWeapons = async () => {
      try{
        const result  = await getWeapons();
        console.log(result);
        const weapons = Array.from(result)
        setWeapons(weapons);
      } catch (error) {
        console.error(error)
      }
    }
    fetchWeapons();
  }, []);

  useEffect(() => {
    const fetchLoadouts = async () => {
      try{
        const result  = await getLoadouts();
        console.log(result);
        const loadouts = Array.from(result)
        setLoadouts(loadouts);
      } catch (error) {
        console.error(error)
      }
    }
    fetchLoadouts();
  }, []);

  const onSave = async () => {
    console.log(selectedName);

    if (selectedName.length < 1) {
      setNameError("Please Be the right length!!");
      return;
    } else {
      setNameError(false);
    };

    if (loadouts.find(loadout => loadout.name === selectedName)) {
      setNameError("Name taken!!");
      return;
    } else {
      setNameError(false);
    }
    
    const loadout = {
      name: selectedName,
      shipName: selectedShip.name,
      shipManufacturer: selectedShip.manufacturer,
      weapons: selectedWeapons,
    };

    await saveLoadout(loadout);
    navigation.goBack();
  };

  useEffect(() => {
    if (nameError && selectedName.length > 0) {
      setNameError(false);
    };
  }, [selectedName]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Loadout Screen</Text>
      {nameError && <Text style={{...styles.text, color: 'red' }}>{nameError}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={text => setSelectedName(text)}
        value={selectedName}
        placeholder="Loadout Name"
      />
      <SelectDropdown
        buttonStyle={styles.selectDropdownstyle}
        data={ships}
        defaultButtonText={selectedShip}
        onSelect={(selectedItem, index) => {
          setSelectedShip(selectedItem);
        }}
        buttonTextAfterSelection={(item, index) => {
          return item.name;
        }}
        rowTextForSelection={(item, index) => {
            return item.name;
        }}
      />
      {selectedShip && (
        <ScrollView>
          {selectedShip.availableWeapons.map((weaponSlot, index) => {
            try {
              return (
                <>
                  {[...Array(weaponSlot.amount)].map((_, slot) => {
                    return (
                      <View style={styles.container} key={`${index}-${slot}`}>
                        <Text style={styles.text}>Weapon Slot Size: {weaponSlot.size}</Text>
                        <SelectDropdown
                          data={weapons
                            .filter(weapon => weapon.size === weaponSlot.size || weapon.size === (weaponSlot.size - 1))
                            .map(weapon => weapon.name)}
                          onSelect={(selectedItem, index) => {
                            // Get rid of the weapon that is currently occupying this slot
                            const weapons = [...selectedWeapons].filter(w => !(w.size === weaponSlot.size && w.slot === slot));
                            // Add the weapon
                            weapons.push({
                              size: weaponSlot.size,
                              slot: slot,
                              name: selectedItem,
                            });
                            setSelectedWeapons(weapons);
                          }}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item;
                          }}
                        />
                      </View>
                    )

                  })}
                </>
              );
            } catch (e) {
              console.log(e);
              return null;
            }
          })}
          <Pressable style={styles.buttons} onPress={onSave}>
            <Text style={styles.text}>Create Loadout</Text>
          </Pressable>
        </ScrollView>
      )}
    </View>
  )
};




//Declaration for default style for every screen in the app for uniform appearance and ease of programming.
const defaultStyles = {
  headerTintColor: "#fff", 
  headerTitleAlign: "center", 
  headerTitleStyle: { 
    fontWeight: "bold",
    fontSize: 25
  }
};

// Base function for the app which is required for react native navigation import to work.
// Declares each stack screen present in the app and assigns the respective function as the component for each screen,
// as well as the "options" for each screen, mainly the title and style information for each screen.
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

        <Stack.Screen name="Ships" component={ShipsScreen} options={{title: "Ships", ...defaultStyles}} />
        <Stack.Screen name="View Ship" component={ViewShipScreen} options={{title: "View Ship", ...defaultStyles}} />

        <Stack.Screen name="Items" component={ItemsScreen} options={{title: "Items", ...defaultStyles}} />

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
        <Stack.Screen name="View Loadout" component={ViewLoadoutScreen} options={{title: "View Loadout", ...defaultStyles}} />
        <Stack.Screen name="Create Loadout" component={CreateLoadoutScreen} options={{title: "Create Loadout", ...defaultStyles}} />

        
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;


// Declaration of all stylesheet styles used throughout the app by components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1B1E",
    padding: 20,
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
  buttonText: {
    fontSize: 18,
    color: "#444",
  },
  shipContainer: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#1A1B1E",
    padding: 20,
  },
  shipListContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
  },
  loadoutContainer: {
    alignContent: "center",
    padding: 16,
  },
  icon: {
    width: 64,
    height: 64,
    marginRight: 16
  },
  topImage: {
    flex: 0.3,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 16
  },
  textContainer: {
    marginLeft: 10
  },
  shipManufacturer: {
    fontWeight: "bold",
    color: "white",
  },
  shipName: {
    fontSize: 16,
    color: "white",
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10
  },
  selectDropdownstyle: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderColor: "black"
  },
});