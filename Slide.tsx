import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { textContent } from "./utils";
import { Button } from "./Button";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  topContainer: {
    flex: deviceHeight * 0.7,
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  label: {
    fontSize: 80,
    lineHeight: 80,
    color: "white",
  },
  bottomContainer: {
    height: deviceHeight * 0.3,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
  },
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
    <View>
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
