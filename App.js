import "react-native-gesture-handler"
import React, {useState, useEffect} from "react";
import { Button, Text, TextInput, View, Image, Pressable, ScrollView, FlatList, SectionList, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getShips } from './database.js';
const Stack = createNativeStackNavigator();




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


function ShipScreen ({ navigation }) {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const ships = getShips();
    setShips(ships);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {ships.map((item) => {
          const manufacturerKey = item.manufacturer.toLowerCase().split(" ").join("_");
          const nameKey = item.name.toLowerCase().split(" ").join("_");
          return (
            <View style={styles.shipContainer} key={item.name}>
              <Image
                source={require(`./assets/icons/${manufacturerKey}/${nameKey}.png`)}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.manufacturer}>{item.manufacturer}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};




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



function CreateLoadoutScreen({ navigation }) {
  
  return (
    <View style={styles.container}>
      <Text>uwu</Text>
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
  }
});