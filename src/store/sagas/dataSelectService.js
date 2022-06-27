import { call, put, takeEvery } from 'redux-saga/effects';
import { getSelectTable, setSelectTable } from '../selectReducer';

async function fSelects(){
    let url = `https://mocki.io/v1/f9c26d15-eb9f-4ddb-9a3a-bc3f5627923a`;
    return await fetch(url).then( res => res.json());
}

function* workerSelects(a){
    const res = yield call(fSelects);
    const newData = res.map(el=> {
        return {
            latLng: [el.lat, el.lng],
            value: el.name,
        };
    });
    yield put(setSelectTable([...newData]));
}

export function* watcherSelects(){
    yield takeEvery(getSelectTable.type , workerSelects )
}