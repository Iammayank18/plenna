import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { ColorTheme, FONT } from "../utils/Theme";
const { width, height } = Dimensions.get("window");
const OfferScroller = ({ item }) => {
  return (
    <View
      style={{
        backgroundColor:
          item % 2 !== 0 ? ColorTheme.darkyellow : ColorTheme.gray4,
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        justifyContent: "space-between",
        width: width / 1.4,
        borderRadius: 20,
      }}
    >
      <Image
        style={{
          height: 75,
          width: 75,
        }}
        source={require("../assets/images/img-icon.png")}
      />
      <View>
        <Text
          style={{
            fontFamily: FONT.ManropeLight,
            color: ColorTheme.white,
            fontSize: 24,
          }}
        >
          Get
        </Text>
        <Text
          style={{
            fontFamily: FONT.ManropeExtraBold,
            color: ColorTheme.white,
            fontSize: 30,
            marginTop: -5,
          }}
        >
          50% OFF
        </Text>
        <Text
          style={{
            fontFamily: FONT.ManropeLight,
            color: ColorTheme.white,
            fontSize: 18,
          }}
        >
          On first{" "}
          <Text
            style={{
              fontFamily: FONT.ManropeBold,
              color: ColorTheme.white,
              fontSize: 18,
            }}
          >
            03
          </Text>{" "}
          order
        </Text>
      </View>
    </View>
  );
};

export default OfferScroller;
