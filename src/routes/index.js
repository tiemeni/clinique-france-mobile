import { createStackNavigator } from "@react-navigation/stack";
import * as SCREENS from "../constants/screens";
import ContainerStack from "./ContainerStack";
import HomeStack from "./HomeStack";
import { SafeAreaView } from "react-native";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={SCREENS.HOME_ROUTE} component={HomeStack} />
        <Stack.Screen
          name={SCREENS.HOME_CONTAINER_ROUTE}
          component={ContainerStack}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default Navigator;
