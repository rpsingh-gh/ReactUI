import * as actionTypes from "../actions/actionTypes.jsx";

export const setIsUserLoggedIn = (IsUserLoggedIn) => {
  return {
    type: actionTypes.setIsUserLoggedIn,
    payload: IsUserLoggedIn
  };
};

export const setUserEmailId = (userEmailId) => {
    return {
      type: actionTypes.setUserEmailId,
      payload: userEmailId
    };
  };

  export const setUserId = (userId) => {
    return {
      type: actionTypes.setUserId,
      payload: userId
    };
  };

  export const setUserName = (userName) => {
    return {
      type: actionTypes.setUserName,
      payload: userName
    };
  };

  export const setUserRole = (userRole) => {
    return {
      type: actionTypes.setUserRole,
      payload: userRole
    };
  };

 