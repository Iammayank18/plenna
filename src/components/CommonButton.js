import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ColorTheme, FONT } from "../utils/Theme";

const CommonButton = ({ title, filled, style, textStyle, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style, filled ? btnStyle.filled : btnStyle.outlined]}
    >
      <Text
        style={[
          textStyle,
          filled ? btnStyle.textfilled : btnStyle.textoutlined,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const btnStyle = StyleSheet.create({
  filled: {
    backgroundColor: ColorTheme.darkblue,
    borderWidth: 1,
    borderColor: ColorTheme.darkblue,
    padding: 20,
    borderWidth: 1,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  outlined: {
    backgroundColor: ColorTheme.white,
    borderWidth: 1,
    borderColor: ColorTheme.darkblue,
    padding: 20,
    borderWidth: 1,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  textfilled: {
    color: ColorTheme.white,
    fontFamily: FONT.ManropeMedium,
  },
  textoutlined: {
    color: ColorTheme.darkblue,
    fontFamily: FONT.ManropeMedium,
  },
});
export default CommonButton;
