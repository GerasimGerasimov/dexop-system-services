import fs = require('fs');

export function getConfiguration (): any {
    let settings = getArguments();
    //если передано имя файла, то параметры читать из него
    if (("port" in settings) && (settings.port)) {
        console.log(`port: ${settings.port}`);
        return settings;
    }
    throw new Error('port is not defined!')
}

function getArguments():any {
    let nodePath = process.argv[0];
    let appPath  = process.argv[1];
    let port: string     = process.argv[2];//адрес хоста
    return {port};
}
