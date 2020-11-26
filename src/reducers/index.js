import userDataReducer from './userdata'
import { combineReducers } from 'redux'

const Reducers = combineReducers({
    userData: userDataReducer
})

export default Reducers