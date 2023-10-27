const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const validateProjectName = require("validate-npm-package-name");

class PackageManagers {
    static NPM = "npm";
    static BUN = "bun";
    static YARN = "yarn";

    static getManager() {
        switch (process.env.npm_config_user_agent?.split('/')[0]) {
            case PackageManagers.BUN:
                return PackageManagers.BUN;
            case PackageManagers.YARN:
                return PackageManagers.YARN;
            case PackageManagers.NPM:
            default:
                return PackageManagers.NPM;
        }
    }
}


const getAvailableTemplates = () => {
    const folders = fs.readdirSync(path.join(__dirname, "..", "template"));

    const details = folders.map((templateName) => {
        const tPath = path.join(__dirname,"..","template", templateName, "package.json")
        const packageJson = require(tPath);
        return {
            name: `\t\t${packageJson.templateName ?? templateName}`,
            value: templateName,
            description: `\t${packageJson?.description}`,
        };
    });

    return [folders, details];
};

const printIntro = () => {
    const proj = `
_ \\              _)              |         ___|                                 |                 
|   |   __|  _ \\   |   _ \\   __|  __|      |       _ \\  __ \\    _ \\   __|  _' |  __|   _ \\    __| 
___/   |    (   |  |   __/  (     |        |   |   __/  |   |   __/  |    (   |  |    (   |  |    
_|     _|   \\___/   | \\___| \\___| \\__|     \\____| \\___| _|  _| \\___| _|   \\__,_| \\__| \\___/  _|    
                ___/                                                                               `

    
    
    const string = `  
 _  __               _              _   _                 
| |/ /___  _ __  ___| |_ __ _ _ __ | |_(_)_ __   ___  ___ 
| ' // _ \\| '_ \\/ __| __/ _' | '_ \\| __| | '_ \\ / _ \\/ __|
| . | (_) | | | \\__ | || (_| | | | | |_| | | | | (_) \\__ \\
|_|\\_\\___/|_| |_|___/\\__\\__,_|_| |_|\\__|_|_| |_|\\___/|___/
                                                            `
console.log(chalk.bgBlack.white.bold(proj))
console.log(chalk.yellowBright.bold(string))
console.log()

}



const printErrorMsg = (message="") => {
    if( message === ""){
        console.log()
        console.error(`❌\t${chalk.red(`An error occured`)}`)
        console.log()
    }
    else {
        console.log()
        console.error(`❌\t${chalk.red(message)}`)
        console.log()
    }
}


function checkAppName(appName) {
    const validationResult = validateProjectName(appName);
    if (!validationResult.validForNewPackages) {
        console.error(
            chalk.red(
                `❌\tCannot create a project named ${chalk.green(
                    `"${appName}"`
                )} because of npm naming restrictions:\n`
            )
        );
        [
            ...(validationResult.errors || []),
            ...(validationResult.warnings || []),
        ].forEach((error) => {
            console.error(chalk.red(`  * ${error}`));
        });
        console.error(chalk.red("\nPlease choose a different project name."));
        process.exit(1);
    }
}


module.exports = {
    PackageManagers,
    getAvailableTemplates,
    printIntro,
    printErrorMsg,
    checkAppName
}