import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { textContent } from "./utils";
import { Button } from "./Button";

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 2,
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  label: {
    fontSize: 80,
    lineHeight: 80,
    color: "white",
  },
  bottomContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

interface Props {
  label: string;
  right?: boolean;
  index: number;
  isLast: boolean;
  onButtonPress: () => void;
}

export const Slider = ({
  label,
  right,
  index,
  isLast,
  onButtonPress,
}: Props) => {
  const [textWidth, setTextWidth] = useState(0);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.topContainer,
          { alignItems: right ? "flex-end" : "flex-start" },
        ]}
      >
        <Text
          style={[
            styles.label,
            {
              transform: [
                { rotate: right ? "90deg" : "-90deg" },
                { translateY: -textWidth / 6 },
              ],
            },
          ]}
          onLayout={({ nativeEvent: { layout } }) => setTextWidth(layout.width)}
        >
          {label}
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.text}>{textContent[index]}</Text>
        <Button
          text={isLast ? "Get Started" : "Next"}
          color={isLast ? "#32CD32" : "#8FBC8F"}
          onPress={onButtonPress}
        />
      </View>
    </View>
  );
};
