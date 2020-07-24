import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ResultScreen from "../screens/ResultScreen";
import HomeScreen from "../screens/HomeScreen";

const AuthStack = createStackNavigator(
  {
    버스정류장선택: { screen: HomeScreen },
    저상버스도착현황: { screen: ResultScreen },
  },
  {
    initialRouteName: "버스정류장선택",
  }
);

// 최상단 네비게이터
const AppNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
  },
  {
    initialRouteName: "Auth",
  }
);

export default createAppContainer(AppNavigator);
