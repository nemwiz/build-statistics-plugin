## Rollup build statistics plugin

Plugin that keeps a continuous log of your build time.

### Use cases

- Can be used as an evidence to show the business (PO's etc.) how slow build times impact the team and hinder
  productivity
- By monitoring build time you can see if the optimizations in your Rollup config have really improved productivity
- This plugin can help you to point out the differences between different machines e.g. if one of the developers has really slower builds than other it can be a sign of misconfiguration, poor hardware etc. 

## Installation and setup

To install the plugin run:

`npm install --save-dev rollup-plugin-build-statistics`

Add the plugin to your `rollup.config.js` and specify a project name.

```js
import buildStatistics from 'rollup-plugin-build-statistics';

export default {
    input: `./src/index.js`,
    output: {
        file: `dist/index.js`,
    },
    plugins: [
        buildStatistics({
            projectName: 'dummy-project',
        }),
    ],
};
```

You are all set! 🚀

Now every time you make some changes the build time will be logged.

All logs will be summarized on daily basis and you can find the data under `stats/build-summary.json` file.

NOTE: You should probably `gitignore` the `stats` folder and all json files inside.

### Logs analysis 📊

After a while you have collected some data and you are probably wondering how to process it and extract insights.

We've got you covered! 
Head over to our [logs analyzer](https://nemwiz.github.io/build-statistics-plugin/) page and upload your `build-summary.json` file.

You can use this tool to visualize your build time and see the progress.

### Did you find this plugin useful?

Show your support. Buy me a coffee. 😎

<a href="https://www.buymeacoffee.com/nemwiz" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


## Plugin options

This plugin is configurable and supports a few options.


| Option name        | Required           | Default value  |   Description        |
|:-------------:|:-------------:|:-----:|:-------------|
| `projectName`      | Yes | N/A | Name of your project. It will be saved in the log file. Useful when you have multiple projects. |
| `logsDirectoryName`      | No |   `stats` | Name of the directory where log files will be stored. |
| `summaryLogFilename` | No | `build-stats-summary` | Name of the json log file. |
