import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Filtro } from '../screens';
import Ionicons from '@expo/vector-icons/Ionicons';

const { Screen, Navigator } = createBottomTabNavigator();

export const TabRouters = () => {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName:any;

          if (route.name === 'home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'filtro') {
            iconName = focused ? 'search' : 'search';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown:false,
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor:  "#a6abb3",
        headerTitleAlign: 'center',
          headerTintColor:"white",
          headerStyle:{
            backgroundColor:"#6b21a8"
          },
          tabBarLabelStyle:{
            fontSize:12,
            marginBottom:10
          },
          tabBarIconStyle:{
            fontSize:20,
            marginBottom:-10
          },
          tabBarStyle:{
            height:60,
            backgroundColor:"#6b21a8"
          }
      })}>
      <Screen
        name='home'
        component={Home}
        options={{
          title:'Home'
        }}
      />
      <Screen
        name='filtro'
        component={Filtro}
        options={{
          title:'filtro'
        }}
      />
    </Navigator>
  )
}