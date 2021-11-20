import React, { useRef } from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";
import { Slider } from "./Slide";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const bgColorsTop = ["#62B16E", "#273225", "#A79360", "#E4BCFE"];
const bgColorBottom = "white";

const labels = ["Funny", "Funky", "Balolo", "Pliya"];

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
    borderBottomRightRadius: 50,
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
    borderTopLeftRadius: 50,
  },
});

const Background = ({
  backgroundColorsTop,
}: {
  backgroundColorsTop: Animated.AnimatedInterpolation;
}) => {
  return (
    <View style={styles.background}>
      <Animated.View
        style={[styles.top, { backgroundColor: backgroundColorsTop }]}
      />
      <Animated.View
        style={[styles.bottom, { backgroundColor: backgroundColorsTop }]}
      />
      <View style={styles.bottomBackground}></View>
    </View>
  );
};

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef({
    scrollTo: (_: { x: number; animated: boolean }): void => undefined,
  });

  const interpolationColors = useRef(
    scrollX.interpolate({
      inputRange: [0, deviceWidth, deviceWidth * 2, deviceWidth * 3],
      outputRange: bgColorsTop,
    })
  );

  const scrollTo = (index: number): void =>
    scrollRef.current?.scrollTo({
      x: deviceWidth * index,
      animated: true,
    });

  return (
    <>
      <Background backgroundColorsTop={interpolationColors.current} />
      <Animated.ScrollView
        ref={scrollRef}
        style={styles.container}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
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
                isLast ? alert("Let's get started") : scrollTo(index + 1)
              }
            />
          );
        })}
      </Animated.ScrollView>
    </>
  );
};

export default App;
