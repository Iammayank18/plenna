import { View, Text, Dimensions } from "react-native";
import React from "react";
import { FONT } from "../utils/Theme";
const { width, height } = Dimensions.get("window");

const ProfileMenu = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height,
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: FONT.ManropeLight,
            fontSize: 50,
          }}
        >
          Coming
        </Text>
        <Text
          style={{
            fontFamily: FONT.ManropeExtraBold,
            fontSize: 50,
            marginTop: -20,
          }}
        >
          Soon
        </Text>
      </View>
    </View>
  );
};

export default ProfileMenu;
