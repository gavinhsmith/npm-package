# Template NPM Package

Template for a new NPM package powered by TypeScript and ESLint.

## Pre-Flight

Look at the following before begining development.

### Repo Environment

In your repo's environment settings, create a new environment called `Deploy`. This is the environment that contains your **NPM Key** and **Node Target Version** during deployment. Make a new secret called `NPM_TOKEN` with an NPM Token (see [NPM Docs](https://docs.npmjs.com/creating-and-viewing-access-tokens) for help), and a new variable called `NODE_VERSION` and set it to be whatever version of node your deployment build should target.

### README

Make sure you update the README. If your editor supports find and replace, some `{{tags}}` are standardized for an easier time updating. Tags are as follows:

|            Tag            |          What For          |
| :-----------------------: | :------------------------: |
|    `--package-name--`     |    Name of the package     |
| `--package-description--` | Description of the package |

### Badges

Use [shields.io](https://shields.io) to generate some badges.

Examples:

![Static Badge](https://img.shields.io/badge/null-%3Cpackage%20version%20here%3E-null?style=flat-square&label=NPM%20Version&labelColor=cc3838&color=f0f0f0)

`![NPM Version](https://img.shields.io/npm/v/--package-name--?style=flat-square&label=NPM%20Version&labelColor=cc3838&color=f0f0f0)`

![Static Badge](https://img.shields.io/badge/null-%3C18%20month%20package%20downloads%3E-null?style=flat-square&label=NPM%20Downloads&labelColor=cc3838&color=f0f0f0)

`![NPM Downloads](https://img.shields.io/npm/d18m/--package-name--?style=flat-square&label=NPM%20Downloads&labelColor=cc3838&color=f0f0f0)`

![Static Badge](https://img.shields.io/badge/null-%3Cpackage%20licence%3E-null?style=flat-square&label=Licence&color=f0f0f0)

`![License](https://img.shields.io/github/license/gavinhsmith/--package-name--?style=flat-square&label=Licence&color=f0f0f0)`

### What Now?

Remove everything above the line from your README, and your good to go.

---

# --package-name--

--package-description--

## Install

Install `--package-name--` via your favorite package manager, I would assume.

### NPM

```shell
npm install --package-name--
```

### Yarn

```shell
yarn add --package-name--
```

## Usage

Include in your project, probably.

```ts
// Import the package.
import package from "--package-name--";

// Show your examples
package.doSomething();
package.doSomethingElse();
```

## Config

Package can be configed, somehow.

```ts
// Import your package.
import package from "--package-name--";

//
package.doSomething();
package.doSomethingElse();
```

### Config Options

|      Name       |    Type    |       Default        |     Description      |
| :-------------: | :--------: | :------------------: | :------------------: |
| _configOption1_ |   `int`    |        `255`         | Option 1 Description |
| _configOption2_ | `string[]` | `string1`, `string2` | Option 2 Description |
| _configOption3_ | `boolean`  |       `false`        | Option 3 Description |

## Contributing

Clone the repository, and run `npm i` or `yarn` to install the dependancies and build the module. Run module tests via the `test` script in package.json.

Workflow tests require [act](https://github.com/nektos/act). You **do not need** this for module development, as workflow tests are not run during CI.
