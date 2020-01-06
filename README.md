
<h1 align="center">Tersa TypeScript SDK </h1>
<h4 align="center">Version V1.1.0 </h4>

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Installation](#installation)
  - [Download Through npm/Yarn](#download-through-npmyarn)
  - [Build from Source Code](#build-from-source-code)
    - [Downloading](#downloading)
    - [Compiling](#compiling)
    - [Testing](#testing)
  - [Use in Project](#use-in-project)
    - [Import](#import)
    - [Require](#require)
    - [In the Browser](#in-the-browser)
- [Contributing](#contributing)
- [License](#license)

## Overview

This is the official Tersa TypeScript SDK - a comprehensive library for developing with the [Tersa blockchain](https://www.tesra.me) in both TypeScript and JavaScript. It currently supports management of twallets, digital identities and digital assets - as well as the deployment and invocation of smart contracts.

## Getting Started

* 进入 [中文版](https://TesraSupernet.github.io/documentation/tesra_ts_sdk_zh.html).
* Enter [English Version](https://TesraSupernet.github.io/documentation/tesra_ts_sdk_en.html).

## Installation

### Download Through npm/Yarn

````
npm install 'tesrasdk-ts' --save
````

or

```
yarn add 'tesrasdk-ts'
```

### Build from Source Code

#### Downloading

```
git clone 'https://github.com/TesraSupernet/tesrasdk-ts.git'
```

Then install the dependencies with:

```
npm install
```

or

```
yarn
```

#### Compiling

Compile the project with the:

````
npm run build:dev // or npm run build:prod
````

or

```
yarn run build:dev // or yarn run build:prod
```

This will create a compiled version of the SDK in the `lib` directory.

#### Testing

To run the tests in the `test` directory, use:

```
npm run test
```

or

```
yarn run test
```

### Use in Project

#### Import

Using `import` to include the modules from `'tesrasdk-ts'`:

```
import {TWallet} from 'tesrasdk-ts';
var twallet = TWallet.create('test');
```

#### Require

Using `require` to include the modules from `'tesrasdk-ts'`:

````
var Tst = require('tesrasdk-ts');
var twallet = Tst.TWallet.create('test');
````

#### In the Browser

To use in the browser you must use the compiled version (as listed above).
The `browser.js` file is located in the `lib` directory.
Include it into the project with a `<script>` tag:

````
<script src="./lib/browser.js"></script>
````

Everything will be available under the `Tst` variable, just like in the `require` example above.

```
var twallet = Tst.TWallet.create('test');
```

## Contributing

Contributors are welcome to the `tesrasdk-ts`. Before beginning, please take a look at our [contributing guidelines](CONTRIBUTING.md). You can open an issue by [clicking here](https://github.com/TesraSupernet/tesrasdk-ts/issues/new).

If you have any issues getting setup, open an issue or reach out in the [Tersa Discord](https://discordapp.com/invite/4TQujHj).

## License

The Tersa TypeScript SDK is availabl under the [LGPL-3.0 License](LICENSE).
