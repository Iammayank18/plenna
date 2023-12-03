import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ColorTheme, FONT } from "../utils/Theme";
import CommonButton from "../components/CommonButton";
import { useDispatch, useSelector } from "react-redux";

import {
  activateItemByKeyForMultiple,
  activateItemByKeyForMultipleCart,
} from "../utils/helperFunction";
import { productAction } from "../redux/action";
const { width, height } = Dimensions.get("window");
const ProductDetails = ({ route, navigation }) => {
  const [isFavourited, setIsFavourited] = useState(false);
  const [isCarted, setIsCarted] = useState(false);
  const [scrolledIndex, setScrolledIndex] = useState(0);

  const dispatch = useDispatch();
  const productDetails = route?.params?.item;
  const cartProducts = useSelector(
    (state) => state?.productReducer?.cartProducts
  );
  const allProducts = useSelector(
    (state) => state?.productReducer?.allProducts
  );

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setScrolledIndex(index + 1);
  };

  const activateItemForFav = () => {
    setIsFavourited(!productDetails.isFav);
    const shallowCopy = [...allProducts];
    const updatedArr = activateItemByKeyForMultiple(
      shallowCopy,
      productDetails.id
    );
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
  const addToCart = () => {
    setIsCarted(!productDetails?.isAddedToCart);
    updateCartAndDispatch(
      { ...productDetails, quantity: 1 },
      productAction.addToCart
    );
  };

  useEffect(() => {
    if (productDetails?.isFav) {
      setIsFavourited(true);
    } else {
      setIsFavourited(false);
    }
    if (productDetails?.isAddedToCart) {
      setIsCarted(true);
    } else {
      setIsCarted(false);
    }
  }, [productDetails, route?.params]);

  const renderFavourite = () => (
    <TouchableOpacity onPress={activateItemForFav} style={styles.favBtn}>
      {isFavourited ? (
        <AntDesign name="heart" size={20} color={ColorTheme.fav} />
      ) : (
        <AntDesign name="hearto" size={20} color={"black"} />
      )}
    </TouchableOpacity>
  );

  const renderIndicator = () => (
    <View style={styles.indicator}>
      {productDetails?.images.map((item, i) => {
        return (
          <View
            key={i}
            style={[
              styles.imageIndicator,
              {
                borderBottomColor:
                  scrolledIndex === i
                    ? ColorTheme.darkyellow
                    : ColorTheme.gray4,
              },
            ]}
          ></View>
        );
      })}
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: ColorTheme.gray5,
            padding: 15,
            borderRadius: 100,
          }}
        >
          <AntDesign name="left" size={12} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <Image
            style={{
              height: 27,
              width: 27,
            }}
            resizeMode="contain"
            source={require("../assets/images/bagDark.png")}
          />
          <View style={styles.cartBox}>
            <Text style={styles.cartItem}>{cartProducts?.length ?? 0}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: width / 1.09,
          alignSelf: "center",
          gap: 10,
        }}
      >
        <View>
          <Text style={styles.prodcutTitle}>{productDetails?.title}</Text>
        </View>

        <View style={styles.reviews}>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
            }}
          >
            {Array.from({ length: 5 }, (_, i) => {
              const starColor =
                i < Math.floor(productDetails?.rating) // Full yellow stars for the integer part
                  ? ColorTheme.darkyellow
                  : i === Math.floor(productDetails?.rating) &&
                    productDetails?.rating % 1 !== 0 // Gray star for the decimal part
                  ? ColorTheme.gray3
                  : ColorTheme.gray3; // Default gray for empty stars
              return (
                <AntDesign key={i} name="star" size={17} color={starColor} />
              );
            })}
          </View>
          <Text
            style={{
              fontFamily: FONT.ManropeLight,
              fontSize: 15,
              color: ColorTheme.gray2,
            }}
          >
            {productDetails?.rating} Reviews
          </Text>
        </View>
      </View>

      <View>
        {renderFavourite()}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop: 20,
          }}
          onScroll={handleScroll}
          pagingEnabled
        >
          {productDetails?.images.map((item, i) => (
            <ImageBackground
              key={i}
              style={styles.imgGalery}
              resizeMode="cover"
              source={{
                uri: item,
              }}
            ></ImageBackground>
          ))}
        </ScrollView>
        {renderIndicator()}
      </View>

      <View style={styles.productPriceContainer}>
        <View>
          <Text style={styles.price}>${productDetails?.price}</Text>
        </View>
        <View style={styles.priceOfferContainer}>
          <Text style={styles.priceDiscount}>
            {productDetails?.discountPercentage}% OFF
          </Text>
        </View>
      </View>

      <View style={styles.actionBtn}>
        <CommonButton
          onPress={isCarted ? () => navigation.navigate("Cart") : addToCart}
          title={isCarted ? "Navigate To Cart" : "Add To Cart"}
          style={{
            flex: 1,
          }}
          filled={false}
        />
        <CommonButton
          style={{
            flex: 1,
          }}
          title={"Buy Now"}
          filled={true}
        />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.detail}>Details</Text>
        <Text style={styles.productDescription}>
          {productDetails?.description}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
  },
  reviews: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 5,
  },
  imageIndicator: {
    borderBottomWidth: 5,
    width: 20,
    bottom: 10,
    left: 10,
    borderRadius: 10,
  },
  imgGalery: {
    width: width, // Set the width to the device width
    height: 300, // Set a fixed height or adjust as needed
    backgroundColor: ColorTheme.white,
    justifyContent: "flex-end",
  },
  prodcutTitle: {
    fontFamily: FONT.ManropeExtraBold,
    fontSize: 50,
    marginTop: -20,
  },
  productPriceContainer: {
    width: width / 1.09,
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  price: {
    fontFamily: FONT.ManropeBold,
    fontSize: 18,
    color: ColorTheme.darkblue,
  },
  priceOfferContainer: {
    backgroundColor: ColorTheme.lightBlue,
    borderRadius: 100,
    padding: 4,
    paddingHorizontal: 13,
  },
  priceDiscount: {
    fontFamily: FONT.ManropeRegular,
    fontSize: 15,
    color: ColorTheme.white,
  },
  cartBox: {
    backgroundColor: ColorTheme.darkyellow,
    borderRadius: 100,
    position: "absolute",
    top: 0,
    right: 0,
    width: 18,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartItem: {
    fontFamily: FONT.ManropeBold,
    color: ColorTheme.white,
    fontSize: 13,
  },

  actionBtn: {
    width: width / 1.09,
    alignSelf: "center",
    marginTop: 40,
    flexDirection: "row",
    gap: 25,
  },
  productDescription: {
    fontFamily: FONT.ManropeRegular,
    fontSize: 15,
    color: ColorTheme.gray2,
    marginTop: 10,
  },
  detail: {
    fontFamily: FONT.ManropeMedium,
    fontSize: 18,
    color: ColorTheme.gray1,
  },
  descriptionContainer: {
    width: width / 1.09,
    alignSelf: "center",
    marginTop: 30,
  },

  favBtn: {
    position: "absolute",
    right: 20,
    top: 30,
    backgroundColor: ColorTheme.white,
    padding: 15,
    borderRadius: 20,
    zIndex: 999,
  },

  indicator: {
    flexDirection: "row",
    gap: 10,
    position: "absolute",
    bottom: 0,
  },
});
export default ProductDetails;
