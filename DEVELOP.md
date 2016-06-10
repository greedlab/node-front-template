# DEVELOP

## package.json

```shell
npm init
```

## koa2

```
npm install --save koa@next
```

## babel

```
npm install --save-dev babel-core
npm install --save-dev babel-cli
npm install --save-dev babel-register
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-preset-stage-0
npm install --save-dev babel-polyfill
```

## eslint

```
npm install --save-dev eslint
npm install --save-dev babel-eslint
npm install --save-dev eslint-plugin-jsx-a11y
npm install --save-dev eslint-plugin-import
npm install --save-dev eslint-config-airbnb-base
npm install --save-dev eslint-config-airbnb
npm install --save-dev eslint-plugin-react
```

package.json

```
"scripts": {
    "lint": "./node_modules/.bin/eslint src/**/*.js",
}
```

## node.js 支持 async

```
npm install --save-dev babel-plugin-transform-async-to-generator
```

.babelrc

```
{ "plugins": ["transform-async-to-generator"]}
```

## dev

```shell
npm install --save-dev nodemon
```

package.json

```
"scripts": {
    "dev": "./node_modules/.bin/nodemon index.js",
}
```

## gulp

```
npm install --save-dev gulp
npm install --save-dev gulp-babel
```

## WebStorm

* `Preferences > Languages & Frameworks > Node.js and NPm > enable v5.11.1`
* `Preferences > Languages & Frameworks > JavaScript > JavaScript language version > ECMAScript 6`
* `Preferences > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint > Enable`
* `Preferences > Tools > File watchers > + > Babel`
