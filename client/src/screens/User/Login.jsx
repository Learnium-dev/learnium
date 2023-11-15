import React, { useEffect, useContext, useState, useCallback } from "react";
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

// Context
import AuthGlobal from "../../context/store/AuthGlobal";
import { loginUser } from "../../context/actions/Auth.actions";

// safe area view
import { SafeAreaView } from "react-native-safe-area-context";

// SVGs
import Lumi from "../../../assets/images/characters/login_lumi.svg";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("Navigation");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 10,
      }}
    >
      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : Platform.OS === "android"
            ? "padding"
            : null
        }
        style={styles.keyboardContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Lumi */}
        <View
          style={{
            borderRadius: 10,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 150,
            height: 150,
            marginBottom: 10,
          }}
        >
          <Lumi width={160} height={200} />
        </View>

        <FormContainer title={"Login"}>
          <View style={{ width: "100%", marginBottom: 20 }}>
            <Text style={styles.inputLabel}>Email</Text>
            <Input
              placeholder={"Enter Email"}
              name={"email"}
              id={"email"}
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
          </View>
          <View style={{ width: "100%", marginBottom: 6 }}>
            <Text style={styles.inputLabel}>Password</Text>
            <Input
              placeholder={"Enter Password"}
              name={"password"}
              id={"password"}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <Text
            style={{
              fontFamily: "Nunito-Bold",
              fontSize: 16,
              color: "#262626",
              alignSelf: "flex-end",
              marginBottom: 16,
            }}
          >
            Forgot Password?
          </Text>

          <View style={styles.buttonGroup}>
            {error ? <Error message={error} /> : null}
            <Pressable style={styles.loginBtn} onPress={() => handleSubmit()}>
              <Text style={styles.loginTxt}>Login</Text>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
              gap: 8,
            }}
          >
            <Text style={styles.middleText}>Don't have an account?</Text>
            <Pressable onPress={() => props.navigation.navigate("Register")}>
              <Text
                style={{
                  fontFamily: "Nunito-Bold",
                  color: "#7000FF",
                  fontSize: 14,
                  alignSelf: "center",
                }}
              >
                Sign up
              </Text>
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
  middleText: {
    fontFamily: "Nunito-Bold",
    color: "#262626",
    fontSize: 14,
    alignSelf: "center",
  },
  inputLabel: {
    fontFamily: "Gabarito-Bold",
    marginBottom: 8,
    marginTop: -10,
    color: "#262626",
    fontSize: 19,
  },
  loginBtn: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
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

export default Login;
