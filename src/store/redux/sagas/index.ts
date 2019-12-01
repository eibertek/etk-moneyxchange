import { takeLatest } from 'redux-saga/effects'
import { getLatest, navigate, getHistorical, getCredentials } from './services';
import { SERVICE_LOAD, NAVIGATION_GO_TO, CREDENTIALS } from '../actions';

function* rootSaga() {
    yield takeLatest(SERVICE_LOAD.REQUESTED, getLatest);
    yield takeLatest(SERVICE_LOAD.REQUESTED, getHistorical);
    yield takeLatest(NAVIGATION_GO_TO, navigate);
    yield takeLatest(CREDENTIALS.REQUESTED, getCredentials);
};

export default rootSaga;