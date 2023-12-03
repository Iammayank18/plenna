import CustomBottomTab from "./CustomBottomTab";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Cart, Favourite, ProfileMenu, Categories } from "../../screens";
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomBottomTab {...props} />}>
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          options={{ tabBarLabel: "Home" }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{ tabBarLabel: "Category" }}
          name="Category"
          component={Categories}
        />

        <Tab.Screen
          options={{ tabBarLabel: "Favourites" }}
          name="Favourites"
          component={Favourite}
        />
        <Tab.Screen
          options={{ tabBarLabel: "Profile" }}
          name="Profile"
          component={ProfileMenu}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
export default BottomTabs;
