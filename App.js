import { StatusBar, useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import {
  Home,
  Favourite,
  Cart,
  Categories,
  ProductDetails,
} from "./src/screens";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configStore from "./src/store";
import BottomTabs from "./src/components/bottomTab/BottomTabs";
const AuthStack = createNativeStackNavigator();
export default function App() {
  const colorScheme = useColorScheme();
  const { store, persistor } = configStore();
  const [fontsLoaded] = useFonts({
    ManropeBold: require("./src/assets/fonts/Manrope/Manrope-Bold.ttf"),
    ManropeExtraBold: require("./src/assets/fonts/Manrope/Manrope-ExtraBold.ttf"),
    ManropeExtraLight: require("./src/assets/fonts/Manrope/Manrope-ExtraLight.ttf"),
    ManropeLight: require("./src/assets/fonts/Manrope/Manrope-Light.ttf"),
    ManropeMedium: require("./src/assets/fonts/Manrope/Manrope-Medium.ttf"),
    ManropeRegular: require("./src/assets/fonts/Manrope/Manrope-Regular.ttf"),
    ManropeSemiBold: require("./src/assets/fonts/Manrope/Manrope-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar
        barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
      />
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AuthStack.Navigator
            initialRouteName="BottomTab"
            screenOptions={{
              headerShown: false,
            }}
          >
            <AuthStack.Screen name="BottomTab" component={BottomTabs} />
            <AuthStack.Screen name="Home" component={Home} />
            <AuthStack.Screen name="Categories" component={Categories} />
            <AuthStack.Screen name="Favourite" component={Favourite} />
            <AuthStack.Screen name="Cart" component={Cart} />
            <AuthStack.Screen
              name="ProductDetails"
              component={ProductDetails}
            />
          </AuthStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
