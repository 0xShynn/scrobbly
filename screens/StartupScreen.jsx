import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoadingContainer from "../components/UI/LoadingContainer";
import * as authActions from "../store/authActions";

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(authActions.setDidTryAutoLogin());
        return;
      }
      const { token, username } = JSON.parse(userData);
      dispatch(authActions.authenticate(username, token));
    };
    tryLogin();
  }, [dispatch]);

  return <LoadingContainer />;
};

export default StartupScreen;
