import React from "react";
import PropTypes from "prop-types";
import myColors from "../constants/myColors";
import useColorScheme from "../hooks/useColorSchemeFix";
import CustomText from "./UI/CustomText";

const CustomHeaderTitle = ({
  title,
  periodSelected,
  isLoading,
  isRefreshing,
}) => {
  const isDarkTheme = useColorScheme() === "dark";
  return (
    <>
      <CustomText
        size="H4"
        color={isDarkTheme ? "white" : myColors.gray_900}
        bold
        complementaryStyle={{ marginRight: 6, marginBottom: 0 }}
      >
        {title}
      </CustomText>
      {periodSelected && (
        <CustomText size="H4" color={isDarkTheme ? "white" : myColors.gray_900}>
          {" "}
          / {isLoading || isRefreshing ? "Loading..." : periodSelected}
        </CustomText>
      )}
    </>
  );
};

CustomHeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
  periodSelected: PropTypes.string,
  isLoading: PropTypes.bool,
  isRefreshing: PropTypes.bool,
};

CustomHeaderTitle.defaultProps = {
  periodSelected: "",
  isLoading: false,
  isRefreshing: false,
};

export default CustomHeaderTitle;
