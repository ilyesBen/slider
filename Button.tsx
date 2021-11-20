import React from "react";
import { Text, StyleSheet, Pressable, Platform, View } from "react-native";

const isIos = Platform.OS === "ios";

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 30,
    width: 200,
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
  color: string;
  onPress: () => void;
}

export const Button = ({ text, color, onPress }: Props) => {
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
