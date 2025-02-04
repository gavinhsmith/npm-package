# Template NPM Package

Template for a new NPM package powered by TypeScript and ESLint with docs generated using TypeDoc.

## Pre-Flight

Look at the following before begining development.

### Repo Environment

In your repo's environment settings, create a new environment called `Deploy`. This is the environment that contains your **NPM Key** and **Node Target Version** during deployment of your packages. Make a new secret called `NPM_TOKEN` with an NPM Token (see [NPM Docs](https://docs.npmjs.com/creating-and-viewing-access-tokens) for help). In your repo's full environment settings, create a new variable called `NODE_VERSION` and set it to be whatever version of node your deployment build should target.

### Pages

If you would like to deploy your docs to GutHub Pages, initiate pages in your repo settings to use GitHub Actions. This should be all the config you need.

### README and hard references.

Make sure you update the README and references. If your editor supports find and replace, some `--tags--` are standardized for an easier time updating things like workflows and other important references. Tags are as follows, and should be replaced in order:

|            Tag            |          What For           |
| :-----------------------: | :-------------------------: |
|    `--package-repo--`     |    Repo of the package.     |
|    `--package-name--`     |    Name of the package.     |
|   `--package-author--`    |    Name of the package.     |
| `--package-description--` | Description of the package. |

### Badges

Use [shields.io](https://shields.io) to generate some badges.

These are the badges shipped with this template:

![NPM Version](https://img.shields.io/badge/null-%3Cpackage%20version%20here%3E-null?style=flat-square&label=NPM%20Version&labelColor=cc3838&color=f0f0f0)
![NPM Downloads](https://img.shields.io/badge/null-%3C18%20month%20package%20downloads%3E-null?style=flat-square&label=NPM%20Downloads&labelColor=cc3838&color=f0f0f0)
![License](https://img.shields.io/badge/null-%3Cpackage%20licence%3E-null?style=flat-square&label=Licence&color=f0f0f0)

### Release Tags

By default, this module starts at version **0.1.0-beta.1** with the **beta** tag. When you wish to move to release, remove the `--tag=beta` paramaters from [ci.yml](https://github.com/--package-author--/--package-repo--/blob/main/.github/workflows/ci.yml) and update your version accordingly.

### What Now?

Remove everything above the line from your README, and your good to go.

---

# --package-name--

--package-description--

[![NPM Version](https://img.shields.io/npm/v/--package-name--?style=flat-square&label=NPM%20Version&labelColor=cc3838&color=f0f0f0)](https://www.npmjs.com/package/--package-name--)
[![NPM Downloads](https://img.shields.io/npm/d18m/--package-name--?style=flat-square&label=NPM%20Downloads&labelColor=cc3838&color=f0f0f0)](https://www.npmjs.com/package/--package-name--)
[![License](https://img.shields.io/github/license/--package-author--/--package-repo--?style=flat-square&label=Licence&color=f0f0f0)](https://github.com/--package-author--/--package-repo--?tab=MIT-1-ov-file)

## Install

Install `--package-name--` via your favorite package manager, I would assume.

### [NPM](https://www.npmjs.com/package/--package-name--)

```shell
npm install --package-name--
```

### [Yarn](https://yarnpkg.com/package?name=--package-name--)

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

// Configure your package.
package.configure({
  foo: "bar",
  fiz: ["baz", "some_other_option"],
});

// Show your examples.
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

Clone the repository, and run `npm i` or `yarn` to install the dependancies. Lint the module with the `lint` script in package.json, build the module with `build`, and run module tests with `test`.

Workflow tests require [act](https://github.com/nektos/act). You **do not need** this for module development, as workflow tests are not run during CI.
