import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ColorTheme, FONT } from "../utils/Theme";
import OfferScroller from "../components/OfferScroller";
import ProductCard from "../components/ProductCard";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../redux/action";
import {
  activateItemByKeyForMultiple,
  activateItemByKeyForMultipleCart,
} from "../utils/helperFunction";
import Header from "../components/Header";
const { width, height } = Dimensions.get("window");
const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const allProductLoading = useSelector(
    (state) => state?.productReducer?.allProductLoading
  );
  const allProducts = useSelector(
    (state) => state?.productReducer?.allProducts
  );
  const cartProducts = useSelector(
    (state) => state?.productReducer?.cartProducts
  );

  const activateItemForFav = (item) => {
    const updatedArr = activateItemByKeyForMultiple([...allProducts], item.id);
    dispatch(productAction.setAllProducts(updatedArr));
  };

  const updateCartAndDispatch = (item, action) => {
    const updatedArr = activateItemByKeyForMultipleCart(
      [...allProducts],
      item.id
    );
    dispatch(productAction.setAllProducts(updatedArr));
    dispatch(action(item));
  };

  const addToCart = (item) => {
    updateCartAndDispatch(item, productAction.addToCart);
  };

  const removeToCart = (item) => {
    updateCartAndDispatch(item, productAction.removeFromCart);
  };

  useEffect(() => {
    dispatch(
      productAction.fetchAllProducts(
        Array.isArray(allProducts) ? allProducts : []
      )
    );
  }, []);

  if (allProductLoading) {
    return (
      <View
        style={{
          height: height,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={ColorTheme.darkyellow} />
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 50,
      }}
    >
      <Header navigation={navigation} cartProducts={cartProducts} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          gap: 30,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {[1, 2, 3, 4].map((item, i) => (
          <OfferScroller key={i} item={item} />
        ))}
      </ScrollView>

      <View
        style={{
          width: width / 1.09,
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: FONT.ManropeRegular,
            fontSize: 34,
          }}
        >
          Recommended
        </Text>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 15,
              justifyContent: "space-between",
            }}
          >
            {Array.isArray(allProducts) &&
              allProducts?.map((item, i) => (
                <ProductCard
                  item={item}
                  key={i}
                  onPress={() => {
                    navigation.navigate("ProductDetails", {
                      item,
                    });
                  }}
                  addToFav={() => {
                    activateItemForFav(item);
                  }}
                  addToCart={() => addToCart(item)}
                  removeToCart={() => removeToCart(item)}
                />
              ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
