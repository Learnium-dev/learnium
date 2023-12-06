import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
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
  TouchableOpacity,
} from "react-native";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";
import Error from "../../shared/Error";

// Lottie files
import LottieView from "lottie-react-native";

// Context
import AuthGlobal from "../../context/store/AuthGlobal";
import { loginUser } from "../../context/actions/Auth.actions";

// safe area view
import { SafeAreaView } from "react-native-safe-area-context";

// SVGs
import Lumi from "../../../assets/images/characters/login_lumi.svg";

const Login = (props) => {
  const animation = useRef(null);
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSplash, setShowSplash] = useState(true);

  const onFinish = () => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  };

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
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      {/* Splash Screen */}
      <LottieView
        style={{
          position: "absolute",
          zIndex: 10,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: showSplash ? "flex" : "none",
        }}
        source={require("../../../assets/splash/data.json")}
        autoPlay={true}
        ref={animation}
        loop={false}
        onAnimationFinish={onFinish}
      />
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
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subtitle}>Please sign in to continue</Text>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                placeholder={"Enter Email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
                style={styles.textInput}
              />
            </View>
            <View style={{ width: "100%", marginBottom: 6 }}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                placeholder={"Enter Password"}
                name={"password"}
                id={"password"}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.textInput}
              />
              <Text
                style={{
                  fontFamily: "Nunito-Bold",
                  fontSize: 16,
                  color: "#262626",
                  alignSelf: "flex-end",
                  marginTop: 10,
                  marginBottom: 16,
                }}
              >
                Forgot Password?
              </Text>
            </View>

            <View style={styles.buttonGroup}>
              {error ? <Error message={error} /> : null}
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.loginTxt}>Login</Text>
              </TouchableOpacity>
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

export default Login;
