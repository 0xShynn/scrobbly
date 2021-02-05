import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import CenteredContainer from '../components/UI/CenteredContainer';
import CustomText from '../components/UI/CustomText';
import myColors from '../constants/myColors';

const AboutThisApp = () => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false;

  return (
    <ScrollView
      style={{
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
        flex: 1,
      }}
    >
      <CenteredContainer style={{ marginTop: 30 }}>
        <CustomText size="H3" bold>
          Scrobbly
        </CustomText>
      </CenteredContainer>
    </ScrollView>
  );
};

export default AboutThisApp;
