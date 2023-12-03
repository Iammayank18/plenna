import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ColorTheme, FONT } from "../utils/Theme";

const { width } = Dimensions.get("window");

const ProductCard = ({ onPress, item, addToFav, addToCart, removeToCart }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: width / 2.3,
        padding: 15,
        backgroundColor: ColorTheme.gray5,
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      <TouchableOpacity onPress={addToFav} style={{ alignItems: "flex-start" }}>
        {item?.isFav ? (
          <AntDesign name="heart" size={20} color={ColorTheme.fav} />
        ) : (
          <AntDesign name="hearto" size={20} color={"black"} />
        )}
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Image
          style={{
            width: 140,
            height: 140,
            borderRadius: 8,
          }}
          resizeMode="center"
          source={{
            uri: item?.thumbnail,
          }}
          accessibilityLabel="Product Image"
        />
      </View>
      <View style={{ marginTop: 40 }}>
        <View>
          <Text style={{ fontFamily: FONT.ManropeBold, fontSize: 15 }}>
            ${item?.price}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontFamily: FONT.ManropeMedium, color: ColorTheme.gray2 }}
          >
            {item?.title}
          </Text>
        </View>
        {!item?.isAddedToCart ? (
          <TouchableOpacity
            onPress={addToCart}
            style={{
              position: "absolute",
              right: 0,
              bottom: 20,
              backgroundColor: ColorTheme.darkblue,
              padding: 5,
              borderRadius: 100,
            }}
          >
            <AntDesign name="plus" size={15} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={removeToCart}
            style={{
              position: "absolute",
              right: 0,
              bottom: 20,
              backgroundColor: ColorTheme.darkblue,
              padding: 5,
              borderRadius: 100,
            }}
          >
            <AntDesign name="check" size={15} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
