"use strict";

const path = require("path");
const fs = require("fs-extra");
const os = require("os");
const spawn = require("child_process").spawn;

const inquirer = require("@inquirer/prompts");
const chalk = require("chalk");
const commander = require("commander");

const packageJson = require("../package.json");

const { getAvailableTemplates, printErrorMsg, printIntro, PackageManagers } = require("./utils");

let projectName;
const packageManager = PackageManagers.getManager()
const [availableTemplates, templateDetails ] = getAvailableTemplates()

async function init() {

    const program = new commander.Command(packageJson.name)
        .version(packageJson.version)
        .description(packageJson.description)
        .arguments("<project-directory>")
        .usage(`${chalk.green("<project-directory>")} [options]`)
        .action((name) => {
            projectName = name;
        })
        .addOption(new commander.Option("-t --template <template>", 'template to be used').choices(availableTemplates))
        .parse(process.argv);

    printIntro()
    const currentDir = process.cwd()
    let root = path.resolve(projectName);
    let appName = path.basename(root);

    try {
        await createHtmlSassProject(projectName, program.opts().template);
    } catch(e) {
        process.chdir(currentDir)
        fs.rmSync(`./${appName}`, { recursive: true, force: true });
        printErrorMsg(e)
    }

    process.exit(0); //no errors occurred
}

async function createHtmlSassProject(projectPath, template) {
    let root = path.resolve(projectPath);
    let appName = path.basename(root);

    if (fs.existsSync(root)) {
        printErrorMsg(`A project with the name ${chalk.bgRed.cyanBright(appName)} already exists.`)

        appName = await inquirer.input({
            message: "\tEnter a new project name",
            default: "my-html-sass-project",
        });
        root = path.join(root, "..", appName);

        if (fs.existsSync(root)) {
            printErrorMsg(`A project with the name ${chalk.bgRed.cyanBright(appName)} also already exists, exiting!`)
            process.exit(1);
        }
    }
    fs.ensureDirSync(root);

    process.chdir(root);

    /* Add vite option */
    templateDetails.push({
        name: "\t\tVite",
        value: "vite",
        description: "\tCreate a project using Vite"

    })
    if(template === undefined){
        console.log()
        template = await inquirer.select({
            message: "\tSelect a template for your project:",
            choices: templateDetails,
        });
    }
    
    try{
        await createProject(root, appName, template);
    }
    catch(e){
        throw e;
    }
    
    console.log();
    console.log(`🆕\t${chalk.green("Created project successfully, ")}`);
    console.log(
        `\n\tRun\n\t\t${chalk.cyan(`cd `)}${appName}\n\t\t${chalk.cyan(
            `${packageManager} `
        )} start`
    );
    console.log(`\tto run and serve the project!`);
    console.log();
}

async function createProject(root, appName, template) {
    console.log();
    console.log(
        `➡️\tCreating new project ${chalk.cyanBright(
            appName
        )} in ${chalk.green(root)}.`
    );
    console.log();

    /* Add Vite option */
    if( template === 'vite'){
        try{
            await createViteProject('.')
        }
        catch(e){
            throw e
        }
    }
    else {
        const templatesDir = path.join(__dirname, "..","template");
        const selectedTemplateDir = path.join(templatesDir, template);
        fs.copySync(selectedTemplateDir, root);
    }

    console.log();
    console.log(
        `✅\t${chalk.green("Created file/folder structure successfully")}`
    );
    console.log();

    return install()
        .then(() => {
            console.log();
            console.log(
                `✅\t${chalk.green("Installed dependencies successfully")}`
            );
            console.log();
        })
        .catch((e) => {
            process.chdir("..");
            fs.rmSync(`./${appName}`, { recursive: true, force: true });
            printErrorMsg(`Error executing command: ${e.command}`)
            process.exit(1);
        });
}

function install() {
    console.log();
    console.log(`⌛\tInstalling dependencies...`);
    console.log();
    return new Promise((resolve, reject) => {
        let command = packageManager
        if(packageManager === PackageManagers.NPM){
            command = /^win/.test(process.platform) ? "npm.cmd" : "npm";
        }

        const args = ["install", "--save"];
        const child = spawn(command, args, { stdio: "inherit" });
        child.on("error", (error) => {
            reject(error)
        });

        child.on("close", (code) => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(" ")}`,
                });
                return;
            }
            resolve();
        });
    });
}


const createViteProject = (name) => {
    return new Promise((resolve, reject) => {
        let command = packageManager
        if(packageManager === PackageManagers.NPM){
            command = /^win/.test(process.platform) ? "npm.cmd" : "npm";
        }

        const args = ["create", "vite@latest", name];
        const child = spawn(command, args, { stdio: "inherit" });
        child.on("error", (error) => {
            reject(error)
        });

        child.on("close", (code) => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(" ")}`,
                });
                return;
            }
            resolve();
        });
    });
}

module.exports = {
    init,
};
