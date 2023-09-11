import fs from 'fs';

const saveConfig = (config) => { 
    const configFilePath = getConfigFilePath();
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
    console.log(`Pusher configuration saved to ${configFilePath}`);
}

export default saveConfig;