import * as actionTypes from "../actions/actionTypes.jsx";
const inititalState = { IsUserLoggedIn:false, userEmailId:"", userId:"", userName:"", userRole:"admin" };

const LoginReducer = (state = inititalState, action) => {
  switch (action.type) {


    case actionTypes.setIsUserLoggedIn: {
      return { ...state, IsUserLoggedIn: action.payload };
      
    }

    case actionTypes.setUserEmailId: {
      return { ...state, userEmailId: action.payload };
      
    }
    case actionTypes.setUserId: {
      return { ...state, userId: action.payload };
      
    }
    case actionTypes.setUserName: {
      return { ...state, userName: action.payload};
    }

    case actionTypes.setUserRole: {
      return { ...state, userRole: action.payload};
    }
  }
  return state;
};
export default LoginReducer;