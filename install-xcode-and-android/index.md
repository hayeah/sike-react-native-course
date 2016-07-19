# Installing Xcode and Android SDK

Before attempting to use ReactNative, let's first make sure that iOS and Android SDKs are working. We'll attempt to build and run a simple "hello world" app in both Xcode and Android Studio.

<Cn>

# 安装 Xcode 和 Android SDK

在使用 React Native 之前，我们先要确保 iOS 和 Android SDK 正常运行。在本课中我们会尝试在 Xcode 和 Android Studio 中编译和运行一个简单的“hello world”应用。

</Cn>

# iOS Hello World

Clone the `HelloWorld` Xcode project:

```sh
git clone https://github.com/hayeah/ios-HelloWorld.git
```

<Cn>

# iOS Hello World

把 `HelloWorld` 的 Xcode 项目克隆到本地：

```sh
git clone https://github.com/hayeah/ios-HelloWorld.git
```

</Cn>

## Install Xcode

[Download the latest Xcode](https://developer.apple.com/xcode/download/). You should use Xcode 7 or later.


Click `HelloWorld.xcodeproj` to open the project in Xcode. Then click the play button (or hot key `cmd-r`):

![](xcode-run-app.jpg)

You should see:

![](ios-hello-world.jpg)

<Cn>

## 安装 Xcode

[下载最新的 Xcode](https://developer.apple.com/xcode/download/)。你应该能够使用 Xcode 7 或者更新的版本。

点击 `HelloWorld.xcodeproj` 来在 Xcode 中打开项目。然后点击 play 按钮（或者热键 `cmd-r`）：

![](xcode-run-app.jpg)

你应该能够看到：

![](ios-hello-world.jpg)


</Cn>

# Android Hello World

Clone the Android HelloWorld Project:

```sh
git clone https://github.com/hayeah/android-HelloWorld.git
```

<Cn>

# Android Hello World

把 `HelloWorld` 的 Android 项目克隆到本地：

```sh
git clone https://github.com/hayeah/android-HelloWorld.git
```

</Cn>

### Exercise: Install Android SDK

The Android SDK is more complicated to install. Follow the [Getting Started](http://facebook.github.io/react-native/docs/getting-started.html) instructions for Android.

<Cn>

### 练习：安装 Android SDK

Android SDK 安装起来会更加复杂。请参照 [Getting Started](http://facebook.github.io/react-native/docs/getting-started.html) 安卓部分的指引。


</Cn>

### Exercise: Launch Android Emulator

First, install [GenyMotion](https://www.genymotion.com/), a fast Android emulator. Then add the Google Nexus 5 virtual device:

![](install-android-emulator.jpg)

Before you can run the app, you need to run launch the virtual device:

![](genymotion-launch-device.jpg)

The empty emulator looks like:

![](android-emulator.jpg)

<Cn>

### 练习：启动 Android 模拟器

第一步，安装 [GenyMotion](https://www.genymotion.com/)，这是一个性能很好的 Android 模拟器。然后添加 Google Nexus 5 作为虚拟设备：

![](install-android-emulator.jpg)

在你开始运行应用之前，你需要先启动一个虚拟设备：

![](genymotion-launch-device.jpg)

空的模拟器看起来会像这样：

![](android-emulator.jpg)

</Cn>

### Exercise: Launch HelloWorld App

Open the HelloWorld project with Android Sutdio. Run the app:

![](android-studio-run-app.jpg)

You should see:

![](android-hello-world.jpg)

<Cn>

### 练习：启动 HelloWolrd 应用

用 Android Studio 打开 HelloWorld 项目。运行应用：

![](android-studio-run-app.jpg)

你应该能看到：

![](android-hello-world.jpg)

</Cn>
