import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from 'react-navigation-stack';
Icon.loadFont();


import Login from './pages/Login';
import Main from './pages/Main';
import Subscribe from './pages/Subscribe'
import ListProduct from './pages/ListProduct'
import ProductUp from './pages/ProductUp'
import ShowImage from './pages/ShowImage'


/*
const AuthenticationNavigator = createBottomTabNavigator({
  //Auth: AuthenticationNavigator,
  ListProduct: ListProduct,
  ProductUp: ProductUp,
  ShowImage: ShowImage,
  /*Main: {
    screen: Main,
    navigationOptions: () => ({
      tabBarIcon: <Icon name="rocket" size={20} color="#7159c1" />,
    }),*/
  //});
//const  = createStackNavigator({
/*const AppNavigator = createStackNavigator({
  Login: Login,
  Subscribe: Subscribe,
  Auth: AuthenticationNavigator,
});

function handlepage({navigation}){
  const id = navigation.getParam('user');
  console.log(id);
}*/


 
  //export default createAppContainer(AppNavigator);
  
/*
const AppContainer = createAppContainer(AppNavigator);

const mainNavigation = createDrawerNavigator({
    Login: {
      screen: Login,
      navigationOptions: () => ({
        drawerIcon: <Icon name="lock" size={20} color="#7159c1" />,
        drawerLockMode: 'locked-closed',
      }),
    },
    Main: {
      screen: Main,
      navigationOptions: () => ({
        drawerIcon: <Icon name="rocket" size={20} color="#7159c1" />,
      }),
    },
    Subscribe,
  });
  */

  
 export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}



const AppNavigator =createBottomTabNavigator({
  /*
   * Rather than being rendered by a screen component, the
   * AuthenticationNavigator is a screen component
   */
 
  ListProduct: {
    screen:ListProduct,
    navigationOptions: () => ({
      title: "",
      tabBarIcon: <Icon name="th-list" size={30} color="#DF4723" />,
    }),
  },
  ProductUp: {
    screen:ProductUp,
    navigationOptions: () => ({
      title: "",
      tabBarIcon: <Icon name="plus-circle" size={30} color="#DF4723" />,
    }),
  },
  
});

const AuthenticationNavigator = createStackNavigator({
  Login: Login,
  Subscribe: Subscribe,
  Auth: AppNavigator,
  ShowImage: ShowImage,
});



const AppContainer = createAppContainer(AuthenticationNavigator);