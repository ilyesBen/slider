import React, { useMemo, useRef } from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";

const deviceHeight = Dimensions.get("window").height;

const borderRadius = 100;
const bgColorBottom = "white";
const defaultTopHeightPercentage = 0.7;

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: bgColorBottom,
  },
  top: {
    borderBottomRightRadius: borderRadius,
  },

  bottomBackground: {
    backgroundColor: bgColorBottom,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: borderRadius,
  },
});

interface Props {
  backgroundColorsTop?: Animated.AnimatedInterpolation;
  backgroundColor?: string;
  topHeightPercentage?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8;
}

export const Background = ({
  backgroundColorsTop,
  backgroundColor: backgroundColorProp,
  topHeightPercentage = defaultTopHeightPercentage,
}: Props) => {
  const backgroundColor = backgroundColorsTop || backgroundColorProp;

  const topHeight = useMemo(
    () => topHeightPercentage * deviceHeight,
    [topHeightPercentage]
  );
  const bottomHeight = useMemo(() => deviceHeight - topHeight, [topHeight]);

  return (
    <View style={styles.background}>
      <Animated.View
        style={[styles.top, { backgroundColor, height: topHeight }]}
      />
      <Animated.View style={{ backgroundColor, height: bottomHeight }} />
      <View style={[styles.bottomBackground, { height: bottomHeight }]}></View>
    </View>
  );
};
