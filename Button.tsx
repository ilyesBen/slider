import React from "react";
import { Text, StyleSheet, Pressable, Platform, View } from "react-native";

const isIos = Platform.OS === "ios";

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 30,
    width: 320,
    overflow: "hidden",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

interface Props {
  text: string;
  onPress: () => void;
  type?: "primary" | "secondary";
}

export const Button = ({ text, onPress, type = "primary" }: Props) => {
  const color = type === "secondary" ? "#E8E8E8" : "#8FBC8F";
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: isIos && pressed ? "#D3D3D3" : color },
        ]}
        onPress={onPress}
        android_ripple={{
          color: "#D3D3D3",
          borderless: true,
        }}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
};
