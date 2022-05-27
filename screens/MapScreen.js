import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Map from "../components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigate from "../components/Navigate";
import SelectCar from "../components/SelectCar";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Map />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor:"white"
        }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Navigate" component={Navigate} />
          <Stack.Screen name="SelectCar" component={SelectCar} />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
