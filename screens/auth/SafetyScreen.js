import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/uberReducer";

const SafetyScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.providerData));
        navigation.navigate("Home");
      } else {
        dispatch(
          setUser({
            email: null,
          })
        );
      }
    });
    return () => unSubscribe();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#286EF0" }}>
      <View
        style={{
          flex: 5,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          source={require("../../assets/logowhite.png")}
        />
        <Image
          style={{
            width: 150,
            height: 150,
          }}
          source={require("../../assets/ubersaft.png")}
        />
        <Text
          style={{
            fontSize: 31,
            color: "white",
            fontWeight: "600",
          }}
        >
          Desloque-se com segurança
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            alignSelf: "flex-end",
            backgroundColor: "black",
            width: "85%",
            padding: 10,
            position: "relative",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              alignSelf: "center",
              fontSize: 22,
            }}
          >
            Começar
          </Text>
          <Image
            style={{
              width: 25,
              height: 25,
              position: "absolute",
              right: 12,
              top: 12,
            }}
            source={require("../../assets/seta-direita.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SafetyScreen;

const styles = StyleSheet.create({});
