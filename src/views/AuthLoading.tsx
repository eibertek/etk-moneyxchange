import React, { Props } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import Login from '../components/Login';

declare interface IAuthProps  {
    navigation: {
        navigate: (view:string)=>void;
    }
}
export default class AuthLoadingScreen extends React.Component<IAuthProps> {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let credential = {}; 
    try{
      await Login.googleSignIn(()=>{});  
      const userToken = await AsyncStorage.getItem('credentials');
      const userTokenJSON = JSON.parse(userToken);    
      credential = await firebase.auth.GoogleAuthProvider.credential(userTokenJSON.token);  
      this.props.navigation.navigate(credential.token ? 'App' : 'Auth');
    }catch(e) {
      this.props.navigation.navigate('Auth');
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
};