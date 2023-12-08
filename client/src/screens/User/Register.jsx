import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";
import Error from "../../shared/Error";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    console.log("registering");
    if (
      email === "" ||
      firstname === "" ||
      lastname === "" ||
      password === ""
    ) {
      setError("Please fill in the form correctly");
    }

    let user = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      notification: false,
    };

    axios
      .post(`${baseURL}users`, user)
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 20,
        }}
      >
        <KeyboardAvoidingView
          behavior={
            Platform.OS === "ios"
              ? null
              : Platform.OS === "android"
              ? null
              : null
          }
          style={styles.keyboardContainer}
          keyboardShouldPersistTaps="handled"
        >
          <FormContainer title={"Register"}>
            <View style={{ width: "100%", marginBottom: 15, marginTop: -10 }}>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subtitle}>Please sign up to continue</Text>
              <TextInput
                placeholder={"Email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
                style={styles.textInput}
              />
            </View>

            <View style={{ width: "100%", marginBottom: 15 }}>
              <TextInput
                placeholder={"First Name"}
                name={"firstname"}
                id={"firstname"}
                onChangeText={(text) => setFirstName(text)}
                style={styles.textInput}
              />
            </View>

            <View style={{ width: "100%", marginBottom: 15 }}>
              <TextInput
                placeholder={"Last Name"}
                name={"lastname"}
                id={"lastname"}
                onChangeText={(text) => setLastName(text)}
                style={styles.textInput}
              />
            </View>

            <View style={{ width: "100%", marginBottom: 6 }}>
              <TextInput
                placeholder={"Password"}
                name={"password"}
                id={"password"}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.textInput}
              />
            </View>

            <View style={styles.buttonGroup}>
              {error ? <Error message={error} /> : null}

              <Pressable style={styles.button} onPress={() => register()}>
                <Text style={styles.loginTxt}>Register</Text>
              </Pressable>

              <Pressable
                style={{ ...styles.button, marginBottom: -20 }}
                onPress={() => props.navigation.navigate("Login")}
              >
                <Text style={styles.loginTxt}>Back to Login</Text>
              </Pressable>
            </View>
          </FormContainer>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: "100%",
  },
  keyboardContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "top",
  },
  buttonGroup: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },

  button: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#7000FF",
    justifyContent: "center",
    alignItems: "center",
  },
  loginTxt: {
    fontFamily: "Gabarito-Bold",
    fontSize: 19,
    color: "#fff",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    // borderColor: "#262626",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontFamily: "Gabarito-Bold",
    color: "#262626",
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Nunito-Bold",
    color: "#262626",
    alignSelf: "flex-start",
    marginTop: 5,
    marginBottom: 30,
  },
});

export default Register;
