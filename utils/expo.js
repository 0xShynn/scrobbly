/* eslint-disable global-require */
import { Asset } from "expo-asset";

export const imageBlank640 = Asset.fromModule(
  require("../assets/images/image-blank-640.png")
).uri;

export const imageBlank300 = Asset.fromModule(
  require("../assets/images/image-blank-300.png")
).uri;
