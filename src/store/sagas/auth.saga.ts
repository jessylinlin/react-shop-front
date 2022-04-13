import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'
import { API } from '../../config'
import { SIGNIN, SigninAction, signinFail, signinSuccess, SIGNUP, SignupAction, signupFail, signupSuccess } from '../actions/auth.action'

function* handleSignup (action: SignupAction) {
    try {
        yield axios.post(`${API}/signup`, action.payload)
        yield put(signupSuccess())
    } catch(error:any) {
        yield put(signupFail(error.response.data.error))
    }
}

function* handleSignin (action: SigninAction) {
    try {
        const { data } = yield axios.post(`${API}/signin`, action.payload)
        localStorage.setItem('jwt', JSON.stringify(data))
        yield put(signinSuccess())
    } catch(error:any) {
        yield put(signinFail(error.response.data.error))
    }
}

export default function* authSaga () {
    yield takeEvery(SIGNUP, handleSignup)
    yield takeEvery(SIGNIN, handleSignin)
}