import { call, put, takeEvery } from 'redux-saga/effects';
import { getDatatable, setDatatable } from '../tableReducer';

async function fLeads(){
    let url = `https://mocki.io/v1/f9c26d15-eb9f-4ddb-9a3a-bc3f5627923a`;
    return await fetch(url).then( res => res.json());
}

function* workerLeads(a){
    const res = yield call(fLeads);

    const res1 = res.filter((_,i) => {
        return i%2;
    });
    const res2 = res.filter((_,i) => {
        return !(i%2);
    });
    
    const newRes = res1.map((el,i)=> {
        return {
                    key: `${el.name}-${i}`,
                    whence: el.name,
                    where: res2[i].name
                }
    })
    
    yield put(setDatatable([...newRes]));
}

export function* watcherLeads(){
    yield takeEvery(getDatatable.type , workerLeads )
}