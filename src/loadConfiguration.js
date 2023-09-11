import getConfigFilePath from "./getConfiguration.js";
import fs from "fs";

const loadConfiguration = () => {
  const configFilePath = getConfigFilePath();

  if (!fs.existsSync(configFilePath)) {
    return null;
  }

  const configData = fs.readFileSync(configFilePath, "utf-8");
  return JSON.parse(configData);
};

export default loadConfiguration;
