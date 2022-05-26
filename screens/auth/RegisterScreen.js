import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/uberReducer";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isWrongCred, setIsWrongCred] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
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

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(setUser(user.providerData[0]));
        console.log(user.providerData[0]);

        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        setIsWrongCred(true);
        setErrorMessage(errorMessage);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        dispatch(setUser(user.providerData[0]));

        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        setIsWrongCred(true);
        setErrorMessage(errorMessage);
      });
  };

  return (
    <View>
      <View
        style={{
          marginTop: 55,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", marginLeft: 10 }}>
          Regista a tua conta
        </Text>
        <View style={styles.textInputContainerView}>
          <View style={styles.imageView}>
            <Image
              style={styles.imageInput}
              source={require("../../assets/mail.png")}
            />
          </View>
          <TextInput
            onChange={() => {
              setIsWrongCred(false);
              setErrorMessage(null);
            }}
            style={{
              backgroundColor: "#E0E0E0",
              width: "85%",
              alignSelf: "center",
              fontSize: 15,
              padding: 8,
              borderColor: isWrongCred ? "red" : "gray",
              borderWidth: 2,
            }}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.textInputContainerView}>
          <View style={styles.imageView}>
            <Image
              style={styles.imageInput}
              source={require("../../assets/padlock.png")}
            />
          </View>
          <TextInput
            onChange={() => {
              setIsWrongCred(false);
              setErrorMessage(null);
            }}
            style={{
              backgroundColor: "#E0E0E0",
              width: "85%",
              alignSelf: "center",
              fontSize: 15,
              padding: 8,
              borderColor: isWrongCred ? "red" : "gray",
              borderWidth: 2,
            }}
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        {isWrongCred && (
          <Text
            style={{
              alignSelf: "center",
              color: "red",
              fontSize: 17,
              fontWeight: "500",
              marginVertical: 3,
            }}
          ></Text>
        )}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={handleSignUp}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
                fontSize: 19,
              }}
            >
              Register
            </Text>
            <Image
              style={{
                width: 25,
                height: 25,
                position: "absolute",
                right: 12,
                top: 10,
              }}
              source={require("../../assets/seta-direita.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={handleSignIn}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
                fontSize: 19,
              }}
            >
              Login
            </Text>
            <Image
              style={{
                width: 25,
                height: 25,
                position: "absolute",
                right: 12,
                top: 10,
              }}
              source={require("../../assets/seta-direita.png")}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ color: "gray" }}>
            Ao continuar, autoriza o Uber a as suas afiliadas a entrarem em
            contacto consigo através de chamada telefónica,Whatsapp ou SMS,
            incluindo por meios automatizados, utilizando o email que forneceu.
          </Text>
        </View>
        <View style={styles.externalLoginView}>
          <TouchableOpacity style={styles.externalFacebook}>
            <Image
              style={styles.iconExternal}
              source={require("../../assets/facebook.png")}
            />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Continuar com Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.externalGoogle}>
            <Image
              style={styles.iconExternal}
              source={require("../../assets/google.png")}
            />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Continuar com Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  textInputContainerView: {
    flexDirection: "row",
    width: "91%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    alignSelf: "center",
  },
  imageView: {
    backgroundColor: "#E0E0E0",
    marginHorizontal: 5,
    padding: 7,
    paddingHorizontal: 10,
  },
  imageInput: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  textInput: {
    backgroundColor: "#E0E0E0",
    width: "85%",
    alignSelf: "center",
    fontSize: 15,
    padding: 8,
    borderBottomColor: "gray",
    borderWidth: 2,
  },
  buttonRegister: {
    marginHorizontal: 10,
    width: "42%",
    backgroundColor: "black",
    alignSelf: "center",
    paddingVertical: 10,
  },
  externalLoginView: {
    alignItems: "center",
  },

  externalFacebook: {
    width: "90%",
    backgroundColor: "#4267B2",
    padding: 10,
    marginVertical: 5,
    borderRadius: 50,
  },
  externalGoogle: {
    width: "90%",
    backgroundColor: "#DB4437",
    padding: 10,
    marginVertical: 5,
    borderRadius: 50,
    position: "relative",
  },
  iconExternal: {
    position: "absolute",
    width: 30,
    height: 30,
    top: 3,
    left: 10,
  },
});
