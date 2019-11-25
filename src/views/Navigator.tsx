import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from './Dashboard';
import LoginView from './LoginView';
import AuthLoadingScreen from './AuthLoading';


const AppStack = createStackNavigator({ Home: Dashboard });
const AuthStack = createStackNavigator({ SignIn: LoginView });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

