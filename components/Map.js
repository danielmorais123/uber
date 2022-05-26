import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { selectUser, setDestination } from "../redux/uberReducer";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
  const origin = useSelector((state) => state["uberReducer"].origin);
  const destination = useSelector((state) => state["uberReducer"].destination);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <MapView
        mapType="mutedStandard"
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={styles.map}
      >
        {origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey="AIzaSyDbbSwY2NtcjJrJ3wFNIo5psp1Yvoz7fnM"
            strokeWidth={3}
            strokeColor="black"
          />
        )}
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title={"Origin"}
          description={origin.description}
        />
        {destination && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title={"Destination"}
            description={destination.description}
          />
        )}
      </MapView>
      <Text style={{alignSelf:"center",fontSize:18,marginVertical:9,fontWeight:"500"}}>Hello, {user.email}</Text>
      <GooglePlacesAutocomplete
        placeholder="Where to?"
        onPress={(data, details = null) => {
          dispatch(
            setDestination({
              location: details.geometry.location,
              description: data.description,
            })
          );

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
    </KeyboardAvoidingView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    flex: 1,
  },
});
