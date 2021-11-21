import React from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { Background } from "../Background";
import { Button } from "../Button";

const deviceHeight = Dimensions.get("window").height;
const topHeightPercentage = 0.6;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 40,
    height: deviceHeight * (1 - topHeightPercentage),
  },
  h1: {
    fontSize: 28,
    fontWeight: "700",
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
});

interface Props {
  text: string;
  color: string;
  onPress: () => void;
}

export const Login = ({}: Props) => {
  return (
    <>
      <Background
        backgroundColor="#E8E8E8"
        topHeightPercentage={topHeightPercentage}
      />
      <View
        style={{
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <Text style={styles.h1}>Let's get started</Text>
          <Text style={styles.text}>
            Login to your account or sign-up for an amazing experience
          </Text>
          <Button text="Login" onPress={() => {}} />
          <Button
            text="Join us it is free"
            type="secondary"
            onPress={() => {}}
          />
          <Text style={styles.text}>Forgot password</Text>
        </View>
      </View>
    </>
  );
};
