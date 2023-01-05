import os from "os";
import path from "path";


export const getDirPath = () =>{

    const baseDir = os.homedir()
    const platform = os.platform();

    let pathDir = ""
    let configPath = ""

    switch(platform) {
        case 'linux':
            pathDir = path.join(baseDir,".pushert")
            break;
        case 'win32':
            pathDir = path.join(baseDir,"pushert")
            break;
        // case 'aix': console.log("IBM AIX platform");
        //     break;
        // case 'android': console.log("Android platform");
        //     break;
        // case 'darwin': console.log("Darwin platform(MacOS, IOS etc)");
        //     break;
        // case 'freebsd': console.log("FreeBSD Platform");
        //     break;
        // case 'openbsd': console.log("OpenBSD platform");
        //     break;
        // case 'sunos': console.log("SunOS platform");
        //     break;
        default: console.log("unknown platform");
    }

    return pathDir
}

export const getConfigPath = () =>{
    return path.join(getDirPath(),"config.json")
}
