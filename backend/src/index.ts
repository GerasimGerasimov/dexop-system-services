/**TODO получение IP адреса
 * hostname -I
 */
 const exec = require('child_process').exec;

 async function execShellCommand(cmd): Promise<string> {
  return new Promise((resolve, reject) => {
   exec(cmd, (error, stdout, stderr) => {
    if (error) {
     console.warn(error);
    }
    resolve(stdout? stdout : stderr);
   });
  });
 }

(async()=>{
  const IP: string = await execShellCommand('hostname -I');
  console.log(`IP: ${IP}`);
})()
