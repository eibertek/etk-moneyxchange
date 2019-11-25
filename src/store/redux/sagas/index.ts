import { takeLatest } from 'redux-saga/effects'
import { getLatest, navigate, getHistorical } from './services';
import { SERVICE_LOAD, NAVIGATION_GO_TO } from '../actions';

function* rootSaga() {
    yield takeLatest(SERVICE_LOAD.REQUESTED, getLatest);
    yield takeLatest(SERVICE_LOAD.REQUESTED, getHistorical);
    yield takeLatest(NAVIGATION_GO_TO, navigate);
};

export default rootSaga;