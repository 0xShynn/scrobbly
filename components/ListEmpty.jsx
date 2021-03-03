import React from "react";
import myColors from "../constants/myColors";
import useColorScheme from "../hooks/useColorSchemeFix";
import CenteredContainer from "./UI/CenteredContainer";
import CustomText from "./UI/CustomText";

const ListEmpty = () => {
  const isDarkTheme = useColorScheme() === "dark";
  return (
    <CenteredContainer>
      <CustomText
        size="H6"
        color={isDarkTheme ? myColors.gray_200 : myColors.gray_900}
        complementaryStyle={{
          textAlign: "center",
        }}
      >
        No data was found for the selected period.
      </CustomText>
      <CustomText size="H6">Start scrobbling.</CustomText>
    </CenteredContainer>
  );
};

export default ListEmpty;
