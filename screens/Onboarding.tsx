import React, { useRef } from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Background } from "../Background";
import { Carousel } from "../Carousel";
import { Slider } from "../Slide";
import { labels } from "../utils";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const bgColorsTop = ["#62B16E", "#273225", "#A79360", "#E4BCFE"];
const borderRadius = 100;
const bgColorBottom = "white";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: bgColorBottom,
  },
  top: {
    height: deviceHeight * 0.7,
    borderBottomRightRadius: borderRadius,
  },
  bottom: {
    height: deviceHeight * 0.3,
  },
  bottomBackground: {
    backgroundColor: bgColorBottom,
    position: "absolute",
    height: deviceHeight * 0.3,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: borderRadius,
  },
  carouselContainer: {
    position: "absolute",
    bottom: deviceHeight * 0.3 - 30,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface Props {
  navigation: NavigationScreenProp<{}>;
}

const Onboarding = ({ navigation }: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const scrollRef = useRef({
    scrollTo: (_: { x: number; animated: boolean }): void => undefined,
  });

  const interpolationColors = useRef(
    scrollX.interpolate({
      inputRange: [0, deviceWidth, deviceWidth * 2, deviceWidth * 3],
      outputRange: bgColorsTop,
    })
  ).current;

  const scrollTo = (index: number): void =>
    scrollRef.current?.scrollTo({
      x: deviceWidth * index,
      animated: true,
    });

  return (
    <>
      <Background backgroundColorsTop={interpolationColors} />
      <View style={styles.carouselContainer}>
        <Carousel scrollX={scrollX} />
      </View>
      <Animated.ScrollView
        ref={scrollRef}
        style={styles.container}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={0.7}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
      >
        {labels.map((label, index) => {
          const isLast = index === labels.length - 1;
          return (
            <Slider
              label={label}
              right={!(index % 2)}
              index={index}
              key={`${label}-${index}`}
              isLast={index === labels.length - 1}
              onButtonPress={() =>
                isLast ? navigation.navigate("Login") : scrollTo(index + 1)
              }
            />
          );
        })}
      </Animated.ScrollView>
    </>
  );
};

export { Onboarding };
