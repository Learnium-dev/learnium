// react imports
import { useState, useEffect } from "react";
// react native imports
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";

// react navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens testing
// 1. HomeScreen
function HomeScreen({ navigation, route }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
      ),
    });

    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post, navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile", { name: "Johnny" })}
      />
      <Button
        title="Create question"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <Text>Count: {count}</Text>
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: "Home",
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}

// 2. DetailsScreen
function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

// 3. ProfileScreen
function ProfileScreen({ navigation, route }) {
  return (
    <View>
      <Text>This is {route.params.name}'s profile</Text>
    </View>
  );
}

export default function Navigation() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation, route }) => ({
            // Add a placeholder button without the `onPress` to avoid flicker
            headerRight: () => <Button title="Update count" />,
          })}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ itemId: 42 }}
        />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
