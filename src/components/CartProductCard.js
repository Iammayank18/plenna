import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { ColorTheme, FONT } from "../utils/Theme";
const { width, height } = Dimensions.get("window");

const CartProductCard = ({ item, increaseQuantity, decreaseQuantity }) => {
  return (
    <View
      style={{
        width: width / 1.2,
        alignSelf: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: ColorTheme.gray3,
        paddingBottom: 20,
        marginTop: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 30,
          }}
        >
          <View>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
              }}
              source={{
                uri: item?.thumbnail,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: FONT.ManropeSemiBold,
                fontSize: 16,
                width: 100,
              }}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontFamily: FONT.ManropeRegular,
                fontSize: 17,
              }}
            >
              ${item.price}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 15,
          }}
        >
          <TouchableOpacity
            onPress={decreaseQuantity}
            style={{
              backgroundColor: ColorTheme.gray5,
              padding: 14,
              borderRadius: 100,
            }}
          >
            <AntDesign name="minus" size={17} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: FONT.ManropeMedium,
              fontSize: 18,
            }}
          >
            {item.quantity}
          </Text>
          <TouchableOpacity
            onPress={increaseQuantity}
            style={{
              backgroundColor: ColorTheme.gray5,
              padding: 14,
              borderRadius: 100,
            }}
          >
            <AntDesign name="plus" size={17} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartProductCard;
