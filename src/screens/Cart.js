import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import CartProductCard from "../components/CartProductCard";
import CommonButton from "../components/CommonButton";
import { productAction } from "../redux/action";
import { ColorTheme, FONT } from "../utils/Theme";

const { width, height } = Dimensions.get("window");

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(
    (state) => state?.productReducer?.cartProducts
  );

  const increaseQuantity = (prod, quantity) =>
    dispatch(productAction.updateCart({ prod, quantity }));

  const decreaseQuantity = (prod, quantity) =>
    dispatch(productAction.updateCart({ prod, quantity }));

  const totalPrice =
    cartProducts?.reduce((acc, item) => acc + item.price * item.quantity, 0) ||
    0;

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <View style={styles.emptyCartTextContainer}>
        <Text style={styles.emptyCartText}>No Item</Text>
        <Text style={styles.emptyCartSubtext}>Found</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("BottomTab")}>
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  if (!cartProducts || cartProducts.length === 0) {
    return renderEmptyCart();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="left" size={12} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>
            Shopping Cart ({cartProducts.length})
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.cartScrollView}>
        {cartProducts.map((item, i) => (
          <CartProductCard
            item={item}
            key={i}
            increaseQuantity={() => increaseQuantity(item, item.quantity + 1)}
            decreaseQuantity={() => decreaseQuantity(item, item.quantity - 1)}
          />
        ))}
        <View style={styles.editTextContainer}>
          <Text style={styles.editText}>Edit</Text>
        </View>
      </ScrollView>

      <View style={styles.totalContainer}>
        <View style={styles.totalInnerContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.subtotalText}>Subtotal</Text>
            <Text style={styles.subtotalValue}>${totalPrice}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.deliveryText}>Delivery</Text>
            <Text style={styles.deliveryValue}>$2.00</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalValue}>${totalPrice + 2}</Text>
          </View>
        </View>
        <CommonButton filled={true} title={"Proceed To Checkout"} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
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
  cartScrollView: {
    paddingBottom: 20,
  },
  emptyCartContainer: {
    justifyContent: "center",
    alignItems: "center",
    height,
  },
  emptyCartTextContainer: {
    alignItems: "center",
  },
  emptyCartText: {
    fontFamily: FONT.ManropeLight,
    fontSize: 50,
  },
  emptyCartSubtext: {
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
  editTextContainer: {
    alignItems: "flex-end",
    width: width / 1.09,
    marginTop: 10,
  },
  editText: {
    fontFamily: FONT.ManropeMedium,
    color: ColorTheme.darkblue,
  },
  totalContainer: {
    width: width / 1.09,
    alignSelf: "center",
    gap: 10,
    backgroundColor: ColorTheme.gray5,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 220,
  },
  totalInnerContainer: {
    flex: 1,
    gap: 8,
    paddingHorizontal: 15,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtotalText: {
    fontFamily: FONT.ManropeRegular,
    color: ColorTheme.gray2,
    fontSize: 16,
  },
  subtotalValue: {
    fontFamily: FONT.ManropeSemiBold,
    color: ColorTheme.gray1,
    fontSize: 16,
  },
  deliveryText: {
    fontFamily: FONT.ManropeRegular,
    color: ColorTheme.gray2,
    fontSize: 16,
  },
  deliveryValue: {
    fontFamily: FONT.ManropeSemiBold,
    color: ColorTheme.gray1,
    fontSize: 16,
  },
  totalText: {
    fontFamily: FONT.ManropeRegular,
    color: ColorTheme.gray2,
    fontSize: 16,
  },
  totalValue: {
    fontFamily: FONT.ManropeSemiBold,
    color: ColorTheme.gray1,
    fontSize: 16,
  },
};

export default Cart;
