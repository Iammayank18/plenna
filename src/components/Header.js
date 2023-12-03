import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ColorTheme, FONT } from "../utils/Theme";

const Header = ({ navigation, cartProducts }) => {
  const renderDeliveryInfo = (label, value) => (
    <View style={styles.deliveryInfo}>
      <Text style={styles.deliveryLabel}>{label}</Text>
      <View style={styles.deliveryDetails}>
        <Text style={styles.deliveryValue}>{value}</Text>
        <AntDesign name="down" size={12} color={ColorTheme.gray4} />
      </View>
    </View>
  );

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hey, Rahul</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Image
            style={styles.cartIcon}
            resizeMode="contain"
            source={require("../assets/images/bag.png")}
          />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>
              {cartProducts?.length ?? 0}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Image
          style={styles.searchIcon}
          source={require("../assets/images/search.png")}
        />
        <TextInput
          style={styles.searchInput}
          placeholderTextColor={ColorTheme.gray3}
          placeholder="Search Products or store"
        />
      </View>
      <View style={[styles.deliveryInfoContainer]}>
        {renderDeliveryInfo("DELIVERY TO", "Green Way 3000, Sylhet")}
        {renderDeliveryInfo("WITHIN", "1 Hour")}
      </View>
    </View>
  );
};

const styles = {
  headerContainer: {
    height: 290,
    backgroundColor: ColorTheme.lightBlue,
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontFamily: FONT.ManropeBold,
    color: ColorTheme.white,
    fontSize: 22,
  },
  cartIcon: {
    height: 27,
    width: 27,
  },
  cartBadge: {
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
  cartBadgeText: {
    fontFamily: FONT.ManropeBold,
    color: ColorTheme.white,
    fontSize: 13,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: ColorTheme.darkblue,
    borderRadius: 100,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingLeft: 30,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    flex: 1,
  },
  deliveryInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deliveryInfo: {},
  deliveryLabel: {
    fontFamily: FONT.ManropeExtraBold,
    color: ColorTheme.gray3,
    fontSize: 12,
  },
  deliveryDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  deliveryValue: {
    fontFamily: FONT.ManropeMedium,
    color: ColorTheme.white,
    fontSize: 15,
  },
};

export default Header;
