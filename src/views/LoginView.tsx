import React, { useState } from 'react'
import { View, Image } from 'react-native'
import { Text, Input, Button,Divider  } from 'react-native-elements';
//import { Icon } from 'react-native-vector-icons/Icon';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import LoginStyles from './LoginStyles';
import etkLogo from './playstore-icon.png';
import Login from '../components/Login';

declare interface IAuthProps  {
    navigation: {
        navigate: (view:string)=>void;
    }
}

const LoginView = (props: IAuthProps) => {
    const [state, setstate] = useState({});
    return (
        <View style={LoginStyles.container}>
            <Image source={etkLogo} style={LoginStyles.logo} />
            <Text h3 style={LoginStyles.h1}>Money Xchange Login</Text>
            <View style={LoginStyles.loginForm}>
                <Input placeholder="User or mail" containerStyle={LoginStyles.loginMailInput} />   
                <Input placeholder="Password" containerStyle={LoginStyles.loginPasswordInput} />   
                <Button 
                    containerStyle={LoginStyles.loginButtonContainer} 
                    buttonStyle={LoginStyles.loginButton} 
                    title={'Login'} 
                    onPress={()=> Login.login(state, () => props.navigation.navigate('App'))} 
                />
            </View>
            <Divider style={LoginStyles.loginDivider}>
                <Text style={LoginStyles.loginDividerText}> OR </Text>
            </Divider>
            <View style={LoginStyles.loginToolsContainer}>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => Login.googleSignIn(() => props.navigation.navigate('App'))}
                    disabled={false} />                
            </View>            
    </View>
    )
}

export default LoginView
