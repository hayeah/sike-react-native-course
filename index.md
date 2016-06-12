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