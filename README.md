# create-project-kotsios
A npx script to scaffold my projects.

At the moment, the tool can generate using three templates:
- Plain HTML with SASS precompiler
- HTML, SASS and JS bundling with Webpack
- React project with MaterialUI and SASS

![CLI screen](/screenshots/screen1.png?raw=true)

## Usage
1. Install the create-project-kotsios tool if you haven't already. You can do this by running the following command:
```bash
npm install -g kotsiossp97/create-project-kotsios
```

2. Next, create a new project using the following command and following the on-screen prompts:
```bash
npx create-project-kotsios my-project
```

3. The create-project-kotsios tool will then generate a new project with the specified name and automatically install all necessary dependencies.


4. After the project has been created, navigate to the project directory using the following command:
```bash
cd my-project
```
Replace `my-project` with the name of your project.

5. Now that you are inside the project directory, you can run your project using the following command:
```bash
npm start
```