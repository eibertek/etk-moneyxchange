import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { GoogleSignin } from '@react-native-community/google-signin';



export default class Login {

    public static login = (data, cb) => {
        AsyncStorage.setItem('userToken', 'faketokennotdoenyetsorry');
        firebase.auth()
        .signInAnonymously()
        .then(credential => {
          if (credential) {
            console.log('default app user ->', credential.user.toJSON());
          }
        });      
        cb();
    }

    public static googleSignIn = async (cb) => {
        try{
            await GoogleSignin.configure({
                webClientId:'309713847044-4fobpblj90565s9d5murrc0qv77mplcb.apps.googleusercontent.com',
            });    
            const data = await GoogleSignin.signIn();
            const credential = await firebase.auth.GoogleAuthProvider.credential(data.idToken);
            await AsyncStorage.setItem('credentials', JSON.stringify(credential));
            await AsyncStorage.setItem('google_credentials', JSON.stringify(data));
       //     console.log('aaaa', data, credential);
            cb();
        }catch(e){
            console.log(e);
        }
    }

    public static googleSignOut = async () => {
        try{  
            await GoogleSignin.signOut();
            await AsyncStorage.clear();
        }catch(e){
            console.log(e);
        }
    }
    
}