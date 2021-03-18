## Build statistics plugin

Plugin that keeps a continuous log of your build time.

### Use cases

- Can be used as an evidence to show the business (PO's etc.) how slow build times impact the team and hinder
  productivity
- By monitoring build time you can see if the optimizations in your Webpack config have really improved productivity

## Installation

This plugin supports both Webpack and Rollup.

For Webpack run:

`npm install --save-dev webpack-plugin-build-statistics`

More info on setup in [Webpack plugin documentation](https://www.npmjs.com/package/webpack-plugin-build-statistics)

For Rollup run:

`npm install --save-dev rollup-plugin-build-statistics`

More info on setup in [Rollup plugin documentation](https://www.npmjs.com/package/rollup-plugin-build-statistics)

#### Running in dev mode
`yarn install && yarn build`

To run unit and integration tests

`yarn test && yarn test:integration`

