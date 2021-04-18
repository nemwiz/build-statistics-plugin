## Build statistics plugin

Plugin that keeps a continuous log of your build time.

Read more about the [inspiration](https://www.ninkovic.dev/blog/2021/how-to-acquire-more-time-for-technical-tasks) for this plugin.

### Use cases

- Can be used as an evidence to show the business (PO's etc.) how slow build times impact the team and hinder
  productivity
- By monitoring build time you can see if the optimizations in your Webpack/Rollup config have really improved productivity
- This plugin can help you to point out the differences between different machines e.g. if one of the developers has really slower builds than other it can be a sign of misconfiguration, poor hardware etc.

## Installation

This plugin supports both Webpack and Rollup.

For Webpack run:

`npm install --save-dev webpack-plugin-build-statistics`

More info on setup in [Webpack plugin documentation](https://www.npmjs.com/package/webpack-plugin-build-statistics)

For Rollup run:

`npm install --save-dev rollup-plugin-build-statistics`

More info on setup in [Rollup plugin documentation](https://www.npmjs.com/package/rollup-plugin-build-statistics)

### Did you find this plugin useful?

Show your support. Buy me a coffee. 😎

<a href="https://www.buymeacoffee.com/nemwiz" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Running in dev mode

`yarn install && yarn build`

To run unit and integration tests

`yarn test && yarn test:integration`

