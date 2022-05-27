import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <MapView
        ref={mapRef}
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
          identifier="origin"
        />
        {destination && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title={"Destination"}
            description={destination.description}
            identifier="destination"
          />
        )}
      </MapView>
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
