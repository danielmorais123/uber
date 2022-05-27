import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setDestination } from "../redux/uberReducer";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Navigate = ({ navigation }) => {
  const origin = useSelector((state) => state["uberReducer"].origin);
  const destination = useSelector((state) => state["uberReducer"].destination);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <View>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 18,
          marginVertical: 9,
          fontWeight: "500",
        }}
      >
        Hello, {user.email}
      </Text>
      <GooglePlacesAutocomplete
        placeholder="Where to?"
        onPress={(data, details = null) => {
          dispatch(
            setDestination({
              location: details.geometry.location,
              description: data.description,
            })
          );

          navigation.navigate("SelectCar");

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
    </View>
  );
};

export default Navigate;

const styles = StyleSheet.create({});
