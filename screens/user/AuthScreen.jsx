import React, { useRef } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  useWindowDimensions,
  Alert,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as WebBrowser from "expo-web-browser";
import * as Yup from "yup";
import * as authActions from "../../store/authActions";

import CenteredContainer from "../../components/UI/CenteredContainer";
import CustomButton from "../../components/UI/CustomButton";
import CustomText from "../../components/UI/CustomText";

import useColorScheme from "../../hooks/useColorSchemeFix";
import myColors from "../../constants/myColors";
import spacing from "../../constants/spacing";
import MyTextInput from "../../components/UI/MyTextInput";

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#FFF",
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: spacing.xs,
  },
  inputContainer: {
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
});

const authValidationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const AuthScreen = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useColorScheme() === "dark";
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(authValidationSchema),
  });
  const usernameRef = useRef();
  const passwordRef = useRef();

  const authHandler = async (values) => {
    try {
      await dispatch(authActions.logIn(values.username, values.password));
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  };

  const handlePressButtonAsync = async () => {
    await WebBrowser.openBrowserAsync("https://www.last.fm/join");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <CenteredContainer
        style={{
          backgroundColor: isDarkTheme ? myColors.gray_1000 : myColors.gray_100,
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView
            style={{
              width: "100%",
              height: useWindowDimensions().height,
              justifyContent: "center",
              paddingVertical: spacing.xl,
            }}
          >
            <StatusBar
              barStyle={isDarkTheme ? "light-content" : "dark-content"}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/icon-rounded.png")}
                style={{
                  width: 80,
                  height: 80,
                  marginBottom: spacing.sm,
                }}
              />
              <CustomText
                size="H2"
                bold
                color={isDarkTheme ? "white" : myColors.gray_900}
                complementaryStyle={{ marginBottom: 40 }}
              >
                Scrobbly
              </CustomText>
              <CustomText
                size="H4"
                bold
                color={isDarkTheme ? "white" : myColors.gray_900}
                complementaryStyle={{ marginBottom: spacing.xl }}
              >
                Log in with your Last.fm account
              </CustomText>
            </View>

            <View style={styles.inputContainer}>
              <Controller
                name="username"
                defaultValue=""
                control={control}
                rules={{ value: true, required: "Username is required" }}
                onFocus={() => {
                  usernameRef.current?.focus();
                }}
                render={({ onChange, onBlur, value }, { isTouched }) => (
                  <MyTextInput
                    icon="ios-person"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    autoCapitalize="none"
                    autoCompleteType="username"
                    placeholder="Enter your username"
                    ref={usernameRef}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      passwordRef.current?.focus();
                    }}
                    error={errors.username}
                    errorText={errors?.username?.message}
                    touched={isTouched}
                  />
                )}
              />
            </View>
            <View style={styles.inputContainer}>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                rules={{ value: true, required: "Password is required" }}
                onFocus={() => {
                  passwordRef.current?.focus();
                }}
                render={({ onChange, onBlur, value }, { isTouched }) => (
                  <MyTextInput
                    icon="ios-lock-closed-sharp"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCompleteType="password"
                    placeholder="Enter your password"
                    ref={passwordRef}
                    returnKeyType="go"
                    onSubmitEditing={() => {
                      handleSubmit(authHandler);
                    }}
                    error={errors.password}
                    errorText={errors?.password?.message}
                    touched={isTouched}
                  />
                )}
              />
            </View>

            <View
              style={{ paddingHorizontal: spacing.lg, marginTop: spacing.sm }}
            >
              <CustomButton
                label="Login"
                onPress={handleSubmit(authHandler)}
                themeColor="primary"
              />
            </View>

            <View
              style={{
                paddingHorizontal: spacing.xl,
                marginTop: 15,
              }}
            >
              <CustomButton
                label="Create a Last.fm account"
                onPress={handlePressButtonAsync}
                themeColor="secondary"
              />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </CenteredContainer>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
