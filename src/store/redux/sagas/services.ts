import { put, select, call } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SERVICE_LOAD, CREDENTIALS, LOG_MESSAGE } from '../actions';
import { NavigatorInstance } from '../types';
import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import config from '../../../../config';
import moment from 'moment';
import Login from '../../../components/Login';
//firebase.crashlytics().enableCrashlyticsCollection();

export const getDataFromFireStore = async (date=undefined) => {
    try{
       const items = await AsyncStorage.getItem('google_credentials');
       const itemsJSON = JSON.parse(items);
    if(itemsJSON.idToken) {
        const credential = await firebase.auth.GoogleAuthProvider.credential(itemsJSON.idToken);
        // login with credential
        await firebase.auth().signInWithCredential(credential);
        const today = !date ? moment().format('YYYY-MM-DD').toString() : date;
        console.log(date, today);
        const { docs } = await firebase.firestore().collection('xchange').where('date','==', today).get();                            
        const returnData = docs.map(doc => doc.data());
        return returnData.length>0 ? returnData[0] : {};    
    }else{
        throw new Error('Get Latest error on signin');
    }
    }catch(e) {
        firebase.crashlytics().log('Test Message!' + JSON.stringify(e));
        firebase.crashlytics().recordError(37,"Test Error");          
        Login.googleSignOut();
        throw new Error(e);  
    }
};

export function* getCredentials() {
    const googleCredentials = yield AsyncStorage.getItem('google_credentials');
    // firebase.crashlytics().log('Test Message!' + JSON.stringify(googleCredentials));
    // firebase.crashlytics().recordError(37,"Test Error");  
    const credentials = JSON.parse(googleCredentials);
    return yield put({ type: CREDENTIALS.COMPLETED, credentials });
}

export const addDataToFireStore = async (data) => {
    // const items = await AsyncStorage.getItem('credentials');
    // const itemsJSON = JSON.parse(items);
    // await firebase.auth.GoogleAuthProvider.credential(itemsJSON.token);
    return await firebase.firestore().collection('xchange').add(data);
};

const callApi = (day) => {
    const queryDay= !day ? 'latest' : day;
    const url = `${config.dataUrl}${queryDay}?access_key=${config.accessKey}&${config.extraParams.join('&')}`;
    firebase.crashlytics().log('Calling API!' + url);
 //   yield put({ type: LOG_MESSAGE, message: 'Calling API! ' + url });
    return () => fetch(url);
}

export function* getHistorical(action: any) {
    try {
        let returnData = []
        for(let c=0; c < 3; c++) {
            const day = moment().subtract(c, "days").format('YYYY-MM-DD').toString();
            let fireStoreData = yield getDataFromFireStore(day);
            if(!fireStoreData.base) {            
                const serviceData = yield call(callApi(day));
                yield put({ type: LOG_MESSAGE, message: ' getHistorical Log ' + JSON.stringify(serviceData) });                
                if(serviceData) {
                    fireStoreData = yield serviceData.json();
                }
                addDataToFireStore(fireStoreData);
            }
            returnData.push(fireStoreData);
        }
        return yield put({ type: SERVICE_LOAD.COMPLETED, historical: returnData });
    } catch (e) {
        console.log(' Error ', e);
        yield put({ type: SERVICE_LOAD.FAILED, message: [e.message] });
        yield put({ type: LOG_MESSAGE, message: ' getHistorical Error ' + e.message });

    }
}


export function* getLatest(action: any) {
    try {
        let fireStoreData = yield getDataFromFireStore();
        if(!fireStoreData.base) {            
            const serviceData = yield call(callApi, '');
            fireStoreData = yield serviceData.json();
            addDataToFireStore(fireStoreData);
        }
        yield put({ type: LOG_MESSAGE, message: ' getLatest Log ' + JSON.stringify(fireStoreData) });                
        return yield put({ type: SERVICE_LOAD.COMPLETED, moneyxchange: fireStoreData });
    } catch (e) {
        console.log(e);
        yield put({ type: SERVICE_LOAD.FAILED, message: e.message });
        yield put({ type: LOG_MESSAGE, message: ' getLatest Error ' + e.message });
    }
}

export function* navigate(action: any) {
    const {routeName } = action.params;
    yield NavigatorInstance.dispatch(NavigationActions.navigate({routeName}));
}
