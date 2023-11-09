import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";
import Error from "../../shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    console.log("registering")
    if (email === "" || firstname === "" || lastname === "" || password === "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      notification: false
    };
    
    axios
    .post(`${baseURL}users`, user)
    .then((res) => {
      console.log(res.data)
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
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
      style={{ marginTop: 40}}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"First Name"}
          name={"firstname"}
          id={"firstname"}
          onChangeText={(text) => setFirstName(text)}
        />
        <Input
          placeholder={"Last Name"}
          name={"lastname"}
          id={"lastname"}
          onChangeText={(text) => setLastName(text)}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <Button title="Register" large primary onPress={() => register()}>
            <Text style={{ color: "white" }}>Register</Text>
          </Button>
        </View>
        <View>
          <Button
            title="Login"
            large
            secondary
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Back to Login</Text>
          </Button>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default Register;
