import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Onboarding } from "./screens/Onboarding";
import { Login } from "./screens/Login";

const AppNavigator = createStackNavigator({
  Home: {
    screen: Onboarding,
    navigationOptions: {
      header: () => null,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: () => null,
    },
  },
});

export default createAppContainer(AppNavigator);
