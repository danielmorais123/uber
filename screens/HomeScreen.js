import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import boxImage from "../assets/box.png";
import trainImage from "../assets/train.png";
import foodImage from "../assets/food.png";
import carImage from "../assets/car.png";
import Map from "../components/Map";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setDestination,
  setOrigin,
  setUser,
} from "../redux/uberReducer";
import * as Location from "expo-location";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
const icons = [
  {
    id: 1,
    title: "Viajar",
    image: Image.resolveAssetSource(carImage).uri,
  },
  {
    id: 2,
    title: "Comida",
    image: Image.resolveAssetSource(foodImage).uri,
  },
  {
    id: 3,
    title: "Entrega",
    image: Image.resolveAssetSource(boxImage).uri,
  },
  {
    id: 4,
    title: "Transporte",
    image: Image.resolveAssetSource(trainImage).uri,
  },
];

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)





  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(
          setUser({
            email: null,
          })
        );
        console.log("Signed Out");
        navigation.navigate("Safety");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ marginTop: 35 }}></View>
      <TouchableOpacity onPress={handleSignOut} style={styles.logoContainer}>
        <Image
          style={{
            width: 40,
            height: 40,
            alignSelf: "flex-end",
            marginHorizontal: 5,
          }}
          source={require("../assets/useruber.png")}
        />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "black",
          marginBottom: 10,
          height: 110,
          marginHorizontal: 15,
          borderRadius: 10,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 3 }}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              padding: 8,
              marginHorizontal: 5,
              fontWeight: "700",
            }}
          >
            Desfrute de uma boa conversa
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 15,
            }}
          >
            <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>
              Viaje no Comfort
            </Text>
            <Image
              style={{
                width: 15,
                height: 15,
              }}
              source={require("../assets/seta-direita.png")}
            />
          </View>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: "#394144",
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <Image
            style={{
              height: 100,
              width: 100,
              marginTop: 8,
              alignSelf: "flex-end",
            }}
            source={require("../assets/desf.png")}
          />
        </View>
      </View>

      <View style={styles.itemsUberContainer}>
        {icons.map((icon, index) => (
          <View key={index} style={styles.itemUberContainer}>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "#ECECEC",
                borderRadius: 10,
              }}
            >
              <Image style={styles.iconsUber} source={{ uri: icon.image }} />
            </TouchableOpacity>
            <Text style={styles.titleItem}>{icon.title}</Text>
          </View>
        ))}
      </View>
      <GooglePlacesAutocomplete
        placeholder="Where from?"
        onPress={(data, details = null) => {
          dispatch(
            setOrigin({
              location: details.geometry.location,
              description: data.description,
            })
          );
          dispatch(setDestination(null));

          navigation.navigate("Map");

          // 'details' is provided when fetchDetails = true
          // console.log(details.geometry.location.lat);
        }}
        styles={{
          container: {
            flex: 0,
            marginHorizontal: 5,
            marginVertical: 5,
          },

          textInput: {
            fontSize: 18,
            color: "black",
            marginHorizontal: 10,
            backgroundColor: "#ECECEC",
          },
        }}
        textInputProps={{ placeholderTextColor: "black" }}
        fetchDetails={true}
        returnKeyType={"search"}
        minLength={2}
        debounce={400}
        query={{
          key: "AIzaSyDbbSwY2NtcjJrJ3wFNIo5psp1Yvoz7fnM",
          language: "en",
        }}
        enablePoweredByContainer={false}
      />
      <View
        style={{
          marginHorizontal: 10,
          flex: 1,
        }}
      ></View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logoContainer: {
    padding: 10,
  },
  iconsUber: {
    width: 65,
    height: 50,
  },
  itemsUberContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  itemUberContainer: {
    alignItems: "center",
  },
  titleItem: {
    fontWeight: "600",
  },
});
