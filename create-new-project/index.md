# Create React Native Project Quickly

Creating a new ReactNative project can take a long time, because each time the latest ReactNative is re-installed from npm.

We can speed up the process by not downloading ReactNative each time we want to create a new project.

<Cn>

# 快速创建 React Native 项目

创建一个新的 React Native 项目会花很长时间，因为每一次最新版的 React Native 都会从 npm 重新安装。

我们可以加速这个过程。方法就是不要每一次创建一个新项目都重新下载 React Native。

</Cn>

# Install ReactNative Dependencies

Run the following commands to see if your software are up to date.

NodeJS should be higher than 4.0.

```
$ node -v
v4.2.1
```

<Cn>

# 安装 React Native 依赖

运行下面的命令来确定你的软件都是在最新版本。

NodeJS 的版本应该要高于 4.0。

```
$ node -v
v4.2.1
```

</Cn>

> `nvm install v4.2`. See: https://github.com/creationix/nvm#usage

```
$ watchman version
{
    "version": "4.1.0"
}
```
> `brew install watchman`

```
$ react-native -v
0.1.7
```

> `npm install -g react-native-cli`

For details see:

http://facebook.github.io/react-native/docs/getting-started.html#requirements

<Cn>

> `nvm install v4.2`。 详看 https://github.com/creationix/nvm#usage

```
$ watchman version
{
    "version": "4.1.0"
}
```
> `brew install watchman`

```
$ react-native -v
0.1.7
```

> `npm install -g react-native-cli`

详看：

http://facebook.github.io/react-native/docs/getting-started.html#requirements


</Cn>

# Create ReactNative Project (Normal)

```
react-native init MyApp
```

It will install the latest ReactNative version.

<Cn>

# 创建 React Native 项目（正常方法）

```
react-native init MyApp
```

这会安装 React Native 的最新版本。

</Cn>

# Create ReactNative Project (Fast)

Download the ReactNative package (中国镜像):

```
APP_NAME=MyApp
mkdir $APP_NAME && cd $APP_NAME
wget http://7fvhy7.com1.z0.glb.clouddn.com/rn-0.17.0.tgz
mkdir -p node_modules/react-native
tar -zxf rn-0.17.0.tgz -C node_modules/react-native
```

<Cn>

# 创建 React Native 项目（快速方法）

下载 React Native 包（中国镜像）：

```
APP_NAME=MyApp
mkdir $APP_NAME && cd $APP_NAME
wget http://7fvhy7.com1.z0.glb.clouddn.com/rn-0.17.0.tgz
mkdir -p node_modules/react-native
tar -zxf rn-0.17.0.tgz -C node_modules/react-native
```


</Cn>

Generate the ReactNative project:

```
$ node -e "require('react-native/cli').init('./','$APP_NAME')"
Setting up new React Native app in ./
To run your app on iOS:
   Open /Users/howard/tmp/MyApp/ios/MyApp.xcodeproj in Xcode
   Hit the Run button
To run your app on Android:
   Have an Android emulator running (quickest way to get started), or a device connected
   cd /Users/howard/tmp/MyApp
   react-native run-android
```

<Cn>

生成 React Native 项目：

```
$ node -e "require('react-native/cli').init('./','$APP_NAME')"
Setting up new React Native app in ./
To run your app on iOS:
   Open /Users/howard/tmp/MyApp/ios/MyApp.xcodeproj in Xcode
   Hit the Run button
To run your app on Android:
   Have an Android emulator running (quickest way to get started), or a device connected
   cd /Users/howard/tmp/MyApp
   react-native run-android
```


</Cn>

You should have these files in your project:

```
$ ls -a
.                .gitignore       index.android.js node_modules
..               .watchmanconfig  index.ios.js     package.json
.flowconfig      android          ios              rn-0.17.0.tgz
```

<Cn>

你应该能在项目里看到这些文件：

```
$ ls -a
.                .gitignore       index.android.js node_modules
..               .watchmanconfig  index.ios.js     package.json
.flowconfig      android          ios              rn-0.17.0.tgz
```

</Cn>


Initialize NPM project:

```
$ npm init --yes
{
  "name": "MyApp",
  "version": "1.0.0",
  "main": "index.android.js",
  "dependencies": {
    "react-native": "^0.17.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

<Cn>


初始化 NPM 项目：

```
$ npm init --yes
{
  "name": "MyApp",
  "version": "1.0.0",
  "main": "index.android.js",
  "dependencies": {
    "react-native": "^0.17.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

</Cn>

You should now be able to run the packager:

```
$ react-native start
 ┌────────────────────────────────────────────────────────────────────────────┐
 │  Running packager on port 8081.                                            │
 │                                                                            │
 │  Keep this packager running while developing on any JS projects. Feel      │
 │  free to close this tab and run your own packager instance if you          │
 │  prefer.                                                                   │
 │                                                                            │
 │  https://github.com/facebook/react-native                                  │
 │                                                                            │
 └────────────────────────────────────────────────────────────────────────────┘
Looking for JS files in
   /Users/howard/tmp/MyApp

[2:46:29 PM] <START> Building Dependency Graph
[2:46:29 PM] <START> Crawling File System
[2:46:29 PM] <START> Loading bundles layout
[2:46:29 PM] <END>   Loading bundles layout (1ms)
```

<Cn>

你现在应该能够运行 packager：

```
$ react-native start
 ┌────────────────────────────────────────────────────────────────────────────┐
 │  Running packager on port 8081.                                            │
 │                                                                            │
 │  Keep this packager running while developing on any JS projects. Feel      │
 │  free to close this tab and run your own packager instance if you          │
 │  prefer.                                                                   │
 │                                                                            │
 │  https://github.com/facebook/react-native                                  │
 │                                                                            │
 └────────────────────────────────────────────────────────────────────────────┘
Looking for JS files in
   /Users/howard/tmp/MyApp

[2:46:29 PM] <START> Building Dependency Graph
[2:46:29 PM] <START> Crawling File System
[2:46:29 PM] <START> Loading bundles layout
[2:46:29 PM] <END>   Loading bundles layout (1ms)
```


</Cn>
