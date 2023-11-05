import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";



export function Home() {
  const navigation = useNavigation();
  const [name, setName] = React.useState("");
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/Image 95.png")}
        style={{ width: 271, height: 271 }}
      ></Image>
      <Text
        style={{
          width: 390,
          textAlign: "center",
          color: "#8353E2",
          fontSize: 24,
          fontFamily: "Epilogue",
          fontWeight: "700",
          lineHeight: 36,
          wordWrap: "break-word",
        }}
      >
        MANAGE YOUR <br></br> TASK
      </Text>
      {/* truyen du lieu tu text input sang screen Information */}
      <TextInput
        style={{
          width: 334,
          height: 43,
          position: "relative",
          background: "rgba(0, 0, 0, 0)",
          borderRadius: 12,
          border: "1px #9095A0 solid",
        }}
        placeholder="Enter your name"
        onChangeText={(text) => setName(text)}
      ></TextInput>

      <Pressable
        style={{
          width: 190,
          height: 44,
          position: "relative",
          background: "blue",
          borderRadius: 12,
          overflow: "hidden",
          marginTop: 20,
          alignContent: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("Information", { name: name })}
      >
        <Text style={{ color: "white", textAlign: "center" }}>GET STARTED</Text>
      </Pressable>
    </View>
  );
}
export function Information() {
  const route = useRoute();
  const { name } = route.params;
  const { newJob } = route.params;
  const { newName } = route.params;
  console.log(newJob);
  const navigation = useNavigation();
  // fetch data https://6546eee4902874dff3abe120.mockapi.io/todo
  // get data theo name 
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch("https://6546eee4902874dff3abe120.mockapi.io/todo")
      .then((response) => response.json())
      .then((data) => setData(data));
    
  }, []);
   const data1=data.filter((item) => item.name === name);
  // const [nameFilter ,setnameFilter] = React.useState('');
  // setnameFilter(name);
  // const [data1, setData1] = React.useState(data.filter((item) => item.name == nameFilter ));
     

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "400px",
        }}
      >
        <View style={{ justifyContent: "flex-start" }}>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Image
              source={require("./assets/favicon.png")}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>

        </View>
        <View style={{ flexDirection:'row' }}>
        <Image
          source={require("./assets/avatar.png")}
          style={{ width: 50, height: 50 }}
        ></Image>
        <Text>
          Hi {name} <br></br> have agrate day a head
        </Text>
        </View>
      </View>
      <TextInput
        style={{
          width: 300,
          height: 43,
          position: "relative",
          background: "rgba(0, 0, 0, 0)",
          borderRadius: 12,
          border: "1px #9095A0 solid",
          marginTop: 50,
        }}
        placeholder="Search"
      ></TextInput>

      {/* data map todo */}
      <ScrollView >
        {data1.map((item) => (
          <View
            style={{
              flex: 1,
              marginTop: 50,
              flexDirection: "row",
              height: 200,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "pink",
              alignItems: "center",
      
            }}
          >
            <Image
              source={require("./assets/favicon.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ fontSize: 20, height: 20, width: 200 }}>
              {item.job}
            </Text>
            {/* truyen item  va name sang Crud */}
            <Pressable onPress={() => navigation.navigate('CRUD',[{name:name},{item:item.job}])}>
              <Image
                source={require("./assets/favicon.png")}
                style={{ width: 30, height: 30 }}
              />
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <Pressable
        style={{
          backgroundColor: "blue",
          borderRadius: 20,
          marginTop: 20,
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", alignItems: "center" }}>+</Text>
      </Pressable>
    </View>
  );
}
export function CRUD() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params[1];
  const { name } = route.params[0];
  const [newJob, setnewJob] = React.useState(item);
  console.log(name);
   console.log(item);
    
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "400px",
        }}
      >
        <View style={{ justifyContent: "flex-start" }}>
          <Pressable onPress={() => navigation.navigate("Information",{name:name})}>
            <Image
              source={require("./assets/favicon.png")}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>

        </View>
        <View style={{ flexDirection:'row' }}>
        <Image
          source={require("./assets/avatar.png")}
          style={{ width: 50, height: 50 }}
        ></Image>
        <Text>
          Hi {name} <br></br> have agrate day a head
        </Text>
        </View>
      </View>
      {/* truyen lai information va edit job  */}
      <TextInput
        style={{
          width: 300,
          height: 43,
          position: "relative",
          background: "rgba(0, 0, 0, 0)",
          borderRadius: 12,
          border: "1px #9095A0 solid",
          marginTop: 50,
        }}
        placeholder="input job"
        onChangeText={(text) => setnewJob(text)}
      ></TextInput>
      <Pressable
        style={{
          backgroundColor: "blue",
          borderRadius: 20,
          marginTop: 20,
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        }} 
        onPress={() => navigation.navigate("Information",[{newJob:newJob},{newName:name}])}
      >
        <Text style={{ color: "white", alignItems: "center" }}>finish</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Information" component={Information} />
          <Stack.Screen name="CRUD" component={CRUD} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
