import fs = require('fs');

export function getConfiguration (): any {
    let settings = getArguments();
    //если передано имя файла, то параметры читать из него
    if (settings.filename !== "") {
            settings = JSON.parse(fs.readFileSync(settings.filename, 'utf8'));
        }
    console.log(`port: ${settings.port}`);
    return settings;
}

function getArguments():any {
    let nodePath = process.argv[0];
    let appPath  = process.argv[1];
    let filename: string = process.argv[2];
    let port: string     = process.argv[3];//адрес хоста
    return {filename, port};
}
