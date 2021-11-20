import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
});

interface Props {
  text: string;
  color: string;
  onPress: () => void;
}

export const Button = ({ text, color, onPress }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: pressed ? "#D3D3D3" : color },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};
