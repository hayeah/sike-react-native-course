<Project name="rn-timer">
# Cross-Platform Timer

ReactNative transplants many ideas from the web-browser world to the native mobile-app world. You can use the knowledge you already know (e.g. JavaScript, React, CSS, flexbox) to build fully native apps.

When you first start to learn ReactNative, you'd find that buliding a native app is quite similar to how you would build a React web app, except for some surface differences.

Suppose we want to build a `HelloWorld` component:

![](hello-world.svg)

The web version would look like:

```js
function HelloWorld(props) {
  return (
    <div className="hello-world">
      <span>Hello World</span>
    </div>
  );
}
```

```css
.hello-world {
  border: 1px solid red;
  padding: 10px;

  font-size: 42px;
  color: red;
}
```

The native version would look like:

```js
function HelloWorld(props) {
  return (
    <View style={style.helloWorldContainer}>
      <Text style={style.helloWorldText}>
        Hello World
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  helloWorldContainer: {
    border: 1,
    borderWidth: 1,
    borderColor: 'red',

    padding: 10,
  },

  helloWorldText: {
    fontSize: 42,
    color: 'red',
  },
});
```

1. Instead of `div` and `span`, you'd use `View` and `Text`.
2. Instead of a CSS stylesheet, you'd use inline styles in JavaScript.
3. Typography related styles can only apply to the `Text` component.

As you can see, ReactNative is similar enough that you can read the code and understand roughly what's going on. But it's also different enough that you'll have to spend time to learn its conventions, limitations, performance characteristics, quirks, and pitfalls (and bugs!).

ReactNative isn't magic. It still takes a huge amount of work to craft fast and beautiful apps. Indeed, there are aspects of ReactNative that makes it HARDER than simply writing two apps in ObjectiveC/Swift and Java.

There are good reasons to choose ReactNative:

1. Virtual DOM gives you a more civilized way to program UI than manipulating the view hierarchy directly.
2. Flexbox is a better layout system than either iOS's AutoLayout or Android's Layout.
3. Relatively easy to create cross-platform native apps.
4. Code sharing is easier between Android and iOS.

Whether these are good enough reasons depends on how much expertise you have for iOS and Android, what kind of app you are buliding, how much you can tolerate a fast-changing platform, and of course, how much you (and your team) like programming in React.

If you like React, ReactNative is pretty awesome!

We'll build a cross-platform timer app for iOS and Android. You'll setup all the development tools, and get familiar with the workflow. We'll also use the debugger to trace the internals of ReactNative so you have a sense of how it is put together.

</Project>

<Cn>

<Project>
# 跨平台计时器

React Native 将很多网页浏览器领域的概念移植到了原生手机应用的领域。你可以应用你已经了解的网页端知识（比如 Javascript，React，CSS，flexbox）来构建原生应用。

当你刚刚开始学习 React Native 时，你会发现，除了一些表面上的区别以外，构建一个原生应用和构建一个 React 的 web 应用非常类似。

假设你希望构建一个 `HelloWorld` 组件：

![](hello-world.svg)

网页端的版本上会像这样：

```js
function HelloWorld(props) {
  return (
    <div className="hello-world">
      <span>Hello World</span>
    </div>
  );
}
```

```css
.hello-world {
  border: 1px solid red;
  padding: 10px;

  font-size: 42px;
  color: red;
}
```

原生的版本会像这样：

```js
function HelloWorld(props) {
  return (
    <View style={style.helloWorldContainer}>
      <Text style={style.helloWorldText}>
        Hello World
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  helloWorldContainer: {
    border: 1,
    borderWidth: 1,
    borderColor: 'red',

    padding: 10,
  },

  helloWorldText: {
    fontSize: 42,
    color: 'red',
  },
});
```

1. 你使用 `View` 和 `Text`，而不是 `div` 和 `span`；
2. 你使用 Javascript 的行内样式，而不是 CSS；
3. 字体相关的风格只能应用在 `TextT` 组件上。

正如你所见，React Native 跟网页端的 React 是如此相似，以至于你只要能阅读代码就会大概了解它们的意思和作用。但这两者又有足够的差异，你需要花时间去学习 React Native 的约定，限制，性能特点，坑（还有 bug！）。

React Native 不是万能药。你仍然需要做大量的工作来构建快速优美的应用。确实，React Native 的某些方面会让构建应用比分别用 ObjectiveC/Swfit 和 Java 构建两个应用要更难。

以下是选择使用 React Native 的一些很好的理由：

1. Virtual DOM 给你提供了一种更加文明的方式去编写 UI，而不是直接去操纵视图层级；
2. 无论是与 iOS 的 AutoLayout 或者 Android 的 Layout 相比，Flexbox 都是一种更好的排版系统；
3. 相对容易地构建跨平台移动应用；
4. Android 和 iOS 之间的代码共享会更加便捷。

这些理由是否足够好，取决于你对 iOS 和 Android 的了解，你构建的应用的类型，你能够多大程度去容忍一个还在快速迭代的平台，以及你（和你的团队）有多喜欢使用 React。

如果你喜欢 React，React Native 简直太棒了！

我们会构建一个 iOS 和 Android 的跨平台计时器应用。你需要配置好所有的开发工具，以及熟悉工作流程。我们还会使用调试器来追踪 React Native 的内部代码来搞清楚它的工作原理。


</Project>

</Cn>

<Project name="rn-tumblr">
# Tumblr Client

The biggest criticism of HTML5 apps is that they don't "feel native". The reason that HTML5 apps feel odd is because the browser is an UI driven by clicks. The mouse cursor has a ghostly presence that only exists on the screen, and moves by a sort of electronic telekinesis.

But the finger is an actual physical thing that moves. Accordingly, to feel "natural", the mobile UI needs to respond to the finger as though they are physical things.
In other words, the mobile UI is driven by touches (e.g. tap, flick, swipe/pan, pinch).

We'll now build a Tumblr client that exploits the characteristics of a touch-based UI so it *feels* like a native app.

+ Use native `ScrollView` for scrolling long content.
+ Use ReactNative's `Animated` library to animate UI.
+ Use the pan gesture to drive animations.

</Project>

<Cn>

<Project name="rn-tumblr">
# Tumblr 客户端

对于 HTML5 应用的最大批评就是他们用起来感觉不像原生应用。原因在于网页浏览器是一个通过点击驱动的用户界面。鼠标的光标会在屏幕上有一个 ，The biggest criticism of HTML5 apps is that they don't "feel native". The reason that HTML5 apps feel odd is because the browser is an UI driven by clicks. The mouse cursor has a ghostly presence that only exists on the screen, and moves by a sort of electronic telekinesis.

但是手指是一个移动的物理存在的东西。因此，要感觉自然，移动端的用户界面需要对手指的移动进行相应。

另一句话说，移动端的用户界面是由触摸来驱动的（例如点击，滑动，放大缩小）。

我们将会构建一个 Tumblr 客户端，这个客户端会运用到一个基于触摸的用户界面的特性，以此让用户感觉像在使用一个原生应用。

+ 使用原生的 `ScrollView` 来让长内容滚动；
+ 使用 ReactNative 的 `Animated` 库来制作动画效果；
+ 使用 pan 手势来驱动动画效果。

</Project>

</Cn>