import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { ColorTheme } from "../../utils/Theme";

const circleContainerSize = 50;

const AnimatedCircle = ({ circleX }) => {
  const circleContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: circleX.value - circleContainerSize / 2 }],
    };
  }, []);

  return <Animated.View style={[circleContainerStyle, styles.container]} />;
};

export default AnimatedCircle;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -circleContainerSize / 2,
    width: circleContainerSize,
    borderRadius: circleContainerSize,
    height: circleContainerSize,
    backgroundColor: ColorTheme.gray,
    justifyContent: "center",
    alignItems: "center",
  },
});
