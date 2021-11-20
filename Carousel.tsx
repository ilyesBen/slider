import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, View, Dimensions } from "react-native";
import { labels } from "./utils";

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  circle: {
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    opacity: 0.6,
  },
});

interface Props {
  scrollX: Animated.Value;
}

const getInputRange = () => labels.map((_, index) => deviceWidth * index);

const getColorOutputRange = (index: number) =>
  labels.map((_, i) => (index === i ? "blue" : "grey"));

const getScaleOutputRange = (index: number) =>
  labels.map((_, i) => (index === i ? 1.5 : 1));

export const Carousel = ({ scrollX }: Props) => {
  const colorsInterpolations: Array<Animated.AnimatedInterpolation> = useRef(
    []
  ).current;

  const scaleInterpolations: Array<Animated.AnimatedInterpolation> = useRef(
    []
  ).current;

  if (colorsInterpolations.length === 0) {
    labels.forEach((_, index) => {
      colorsInterpolations.push(
        scrollX.interpolate({
          inputRange: getInputRange(),
          outputRange: getColorOutputRange(index),
        })
      );

      scaleInterpolations.push(
        scrollX.interpolate({
          inputRange: getInputRange(),
          outputRange: getScaleOutputRange(index),
          extrapolate: "clamp",
        })
      );
    });
  }

  return (
    <View style={styles.container}>
      {labels.map((_, index) => (
        <Animated.View
          style={[
            styles.circle,
            { backgroundColor: colorsInterpolations[index] },
            { transform: [{ scale: scaleInterpolations[index] }] },
          ]}
          key={`carousel-${index}`}
        />
      ))}
    </View>
  );
};
