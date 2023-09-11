import CONFIG_FILE_NAME from "./utils/constants";

const getConfigFilePath = () => {
    const homeDir = os.homedir();
    const configDir = os.platform() === 'win32' ? 'C:\\' : path.join(homeDir, '.config');
    return path.join(configDir, CONFIG_FILE_NAME);
}

export default getConfigFilePath;