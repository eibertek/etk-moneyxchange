import { put, select, call } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { SERVICE_LOAD } from '../actions';
import { NavigatorInstance } from '../types';
import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import config from '../../../../config';
import moment from 'moment';
import Login from '../../../components/Login';

export const getDataFromFireStore = async (date=undefined) => {
    try{
        const items = await AsyncStorage.getItem('credentials');
        const itemsJSON = JSON.parse(items);
        const credentials = await firebase.auth.GoogleAuthProvider.credential(itemsJSON.token);
        if(credentials) {
            const today = !date ? moment().format('YYYY-MM-DD').toString() : date;
            const { docs } = await firebase.firestore().collection('xchange').where('date','==', today).get();
            const returnData = docs.map(doc => doc.data());
            return returnData.length>0 ? returnData[0] : {};
        }    
    }catch(e) {
        console.log(e); 
        Login.googleSignOut();  
    }
};

export const addDataToFireStore = async (data) => {
    const items = await AsyncStorage.getItem('credentials');
    const itemsJSON = JSON.parse(items);
    await firebase.auth.GoogleAuthProvider.credential(itemsJSON.token);
    return await firebase.firestore().collection('xchange').add(data);
};

const callApi = (day) => {
    const queryDay= !day ? 'latest' : day;
    const url = `${config.dataUrl}${queryDay}?access_key=${config.accessKey}&${config.extraParams.join('&')}`;
    console.log('calling API', url);
    return() => fetch(url);
}

export function* getHistorical(action: any) {
    try {
        let returnData = []
        for(let c=0; c < 3; c++) {
            const day = moment().subtract(c, "days").format('YYYY-MM-DD').toString();
            let fireStoreData = yield getDataFromFireStore(day);
            if(!fireStoreData.base) {            
                const serviceData = yield call(callApi(day));
                fireStoreData = yield serviceData.json();
                addDataToFireStore(fireStoreData);
            }
            returnData.push(fireStoreData);
        }
        return yield put({ type: SERVICE_LOAD.COMPLETED, historical: returnData });
    } catch (e) {
        console.log(e);
        yield put({ type: SERVICE_LOAD.FAILED, message: e.message });
    }
}


export function* getLatest(action: any) {
    try {
        let fireStoreData = yield getDataFromFireStore();
        if(!fireStoreData.base) {            
            const serviceData = yield call(callApi);
            fireStoreData = yield serviceData.json();
            addDataToFireStore(fireStoreData);
        }
        return yield put({ type: SERVICE_LOAD.COMPLETED, moneyxchange: fireStoreData });
    } catch (e) {
        console.log(e);
        yield put({ type: SERVICE_LOAD.FAILED, message: e.message });
    }
}

export function* navigate(action: any) {
    const {routeName } = action.params;
    yield NavigatorInstance.dispatch(NavigationActions.navigate({routeName}));
}
