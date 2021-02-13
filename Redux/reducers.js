import ActionTypes from './actionTypes';
import {combineReducers} from 'redux';

const userState = {};
let crntPrdtState = {};
let FavItems = [
  {
    id: '1',
    caregoryid: '1',
    name: 'Chocolate Frosted',
    subText: 'with sugar glaze',
    price: '3',
    kkal: '158',
    weight: '50g',
    images: require('../Assets/a1.png'),
    about:
      'Chocolate Frosted Donut based on the calories, fat, protein, carbs and other nutrition information submitted for Chocolate Frosted Donut.',
  },
];

const userReducer = (st = userState, action) => {
  switch (action.type) {
    case ActionTypes.USER_INFO:
      st = Object.assign({}, st, {...action.payload});
      return st;

    default:
      break;
  }
  return st;
};
const crntPrdt = (state = crntPrdtState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_PRODUCT:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

const toggleFav = (state = FavItems, action) => {
  switch (action.type) {
    case ActionTypes.SET_FAVOURITE:
      let isUnique = true;
      let arr = [...state];
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          isUnique = false;
          break;
        }
      }
      isUnique && arr.push({...action.payload});
      return arr;

    case ActionTypes.REMOVE_FAVOURITE:
      arr = state.filter((item) => item.id !== action.payload);
      return arr;

    default:
      break;
  }
  return state;
};

export default combineReducers({userReducer, crntPrdt, toggleFav});
