# DEVELOP

## package.json

```shell
npm init
```

## koa2

```
npm install --save koa@next
npm install --save koa-router@next
npm install --save koa-bodyparser@next
npm install --save koa-favicon@next
npm install --save koa-logger@next
npm install --save koa-static@next
```

## art-template

```
npm install --save art-template
```

## babel

```
npm install --save-dev babel-cli
npm install --save-dev babel-core
npm install --save-dev babel-register
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-preset-stage-0
npm install --save-dev babel-polyfill
```

## eslint

```
npm install --save-dev eslint
npm install --save-dev babel-eslint
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
npm install --save-dev babel-plugin-transform-async-to-module-method
```

.babelrc

```
{
"plugins": [
        ["transform-async-to-module-method", {
            "module": "bluebird",
            "method": "coroutine"
        }]
    ]
}    
```

## gulp

```
npm install --save-dev gulp gulp-babel gulp-watch gulp-sourcemaps gulp-uglify gulp-minify-css gulp-sass gulp-rename gulp-imagemin imagemin-pngquant gulp-livereload

```

## build

package.json

```
"scripts": {
    "build": "babel src -d lib -w -s"
}
```

## dev

```shell
npm install --save-dev nodemon
```

package.json

```
"scripts": {
    "develop": "./node_modules/.bin/nodemon lib/app.js",
}
```

## release

```
npm install -g pm2
```

package.json

```
"scripts": {
    "release": "pm2 lib/app.js",
}
```

## WebStorm

* `Preferences > Languages & Frameworks > Node.js and NPm > enable v5.11.1`
* `Preferences > Languages & Frameworks > JavaScript > JavaScript language version > ECMAScript 6`
* `Preferences > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint > Enable`
* `Preferences > Tools > File watchers > + > Babel`
