import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { ColorTheme, FONT } from "../utils/Theme";
import ProductCard from "../components/ProductCard";
import {
  activateItemByKeyForMultiple,
  activateItemByKeyForMultipleCart,
} from "../utils/helperFunction";
import { productAction } from "../redux/action";

const { width, height } = Dimensions.get("window");

const Favourite = ({ navigation }) => {
  const dispatch = useDispatch();
  const allProducts = useSelector(
    (state) => state?.productReducer?.allProducts
  );
  const filteredProducts = allProducts.filter((item) => item?.isFav === true);

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

  const renderEmptyFavourites = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyTextContainer}>
        <Text style={styles.emptyText}>No Item</Text>
        <Text style={styles.emptySubtext}>Found</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  if (filteredProducts?.length <= 0) {
    return renderEmptyFavourites();
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="left" size={12} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>
            Favourited ({filteredProducts?.length ?? 0})
          </Text>
        </View>
      </View>

      <View style={styles.scrollViewContainer}>
        {filteredProducts?.map((item, i) => (
          <ProductCard
            item={item}
            key={i}
            onPress={() => navigation.navigate("ProductDetails", { item })}
            addToFav={() => activateItemForFav(item)}
            addToCart={() => addToCart(item)}
            removeToCart={() => removeToCart(item)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = {
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height,
  },
  emptyTextContainer: {
    alignItems: "center",
  },
  emptyText: {
    fontFamily: FONT.ManropeLight,
    fontSize: 50,
  },
  emptySubtext: {
    fontFamily: FONT.ManropeExtraBold,
    fontSize: 50,
    marginTop: -20,
  },
  shopNowText: {
    fontFamily: FONT.ManropeRegular,
    fontSize: 18,
    color: ColorTheme.darkyellow,
    textDecorationLine: "underline",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 50,
    alignItems: "center",
    gap: 30,
  },
  backButton: {
    backgroundColor: ColorTheme.gray5,
    padding: 15,
    borderRadius: 100,
  },
  headerText: {
    fontSize: 18,
    fontFamily: FONT.ManropeRegular,
  },
  scrollViewContainer: {
    width: width / 1.09,
    alignSelf: "center",
    marginTop: 20,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 15,
    justifyContent: "space-between",
    paddingBottom: 100,
  },
};

export default Favourite;
