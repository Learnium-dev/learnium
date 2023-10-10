import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { Button } from 'react-native';

const HomeScreen= ({ navigation, route }) => {
    useEffect(() => {
      if (route.params?.post) {
        // Post updated, do something with `route.params.post`
        // For example, send the post to the server
      }
    }, [route.params?.post]);
  
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate("Details")}
        />
        <Button
          title="Go to UploadScreen"
          onPress={() => navigation.navigate("UploadScreen")}
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
      </View>
    );
  }

export default HomeScreen