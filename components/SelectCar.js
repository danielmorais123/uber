import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const cars = [
  {
    id: 1,
    title: "UberX",
    priceMultiplier: 1,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png",
  },
  {
    id: 2,
    title: "Uber XL",
    priceMultiplier: 1.2,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberXL.png",
  },
  {
    id: 3,
    title: "Uber LUX",
    priceMultiplier: 1.7,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png",
  },
];

const SelectCar = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedItem(item)}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: selectedItem?.id === item.id ? "#E0E0E0" : "white",
        }}
      >
        <Image
          style={{ width: 100, height: 85 }}
          source={{ uri: item.image }}
        />
        <View>
          <Text>{item.title}</Text>
          <Text>Travel Time</Text>
        </View>
        <Text>99$</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ backgroundColor: "white" }}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Navigate")}>
          <Image
            style={{
              width: 15,
              height: 15,
              position: "absolute",
              top: 13,
              left: 10,
            }}
            source={require("../assets/left-arrow.png")}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            alignSelf: "center",
            marginVertical: 10,
          }}
        >
          Select Car
        </Text>
      </View>

      <View>
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: "black",
            width: "90%",
            padding: 12,
            marginVertical: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontWeight: "600",
              fontSize: 17,
            }}
          >
            Choose {selectedItem?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectCar;

const styles = StyleSheet.create({});
