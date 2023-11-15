import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Platform,
  KeyboardAvoidingView,
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
            <Input
              placeholder={"Email"}
              name={"email"}
              id={"email"}
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
          </View>

          <View style={{ width: "100%", marginBottom: 15 }}>
            <Input
              placeholder={"First Name"}
              name={"firstname"}
              id={"firstname"}
              onChangeText={(text) => setFirstName(text)}
            />
          </View>

          <View style={{ width: "100%", marginBottom: 15 }}>
            <Input
              placeholder={"Last Name"}
              name={"lastname"}
              id={"lastname"}
              onChangeText={(text) => setLastName(text)}
            />
          </View>

          <View style={{ width: "100%", marginBottom: 6 }}>
            <Input
              placeholder={"Password"}
              name={"password"}
              id={"password"}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
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
  );
};

const styles = StyleSheet.create({
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
});

export default Register;
