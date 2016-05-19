# ScrollView Basic

If your content is longer than the device screen, use a [ScrollView](https://facebook.github.io/react-native/docs/scrollview.html#content) to make the content scrollable.

On mobile, users use their fingers to interact with scrollable content as though it is a physical thing.

The ScrollView's content is like a sled sliding on ice, a finger flick gives it momentum to keep moving, and friction in the system decelerates it. If the finger is moving faster, the ScrollView should speeed up faster (because more mementum is added to it).

While the scrollable content is moving, it should still respond to touches like a physical thing.

+ The finger can push the content in the same direction, to make it go faster.
+ The finger can push the content in the opposite direction, to reverse its direction.
+ The finger can pin the content, to stop the content abruptly.

The nuanced physical interaction with touches is what makes the ScrollView complicated.

Android and iOS have different physics for their versions of the ScrollView component. It'd be an immense effort to emulate the behaviour in HTML5 such that ScrollView **feels natural** to users on either platform. ReactNative simply uses the native ScrollView components, so you get exactly the right behaviour for each platform.

+ On iOS the underlying native component is the [UIScrollView](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIScrollView_Class/).
+ On Android the underlying native component is [ScrollView](http://developer.android.com/reference/android/widget/ScrollView.html)

# Running Examples

```sh
git clone https://github.com/hayeah/react-native-scrollview-experiments.git
```

+ run on rnplay
+ diff files

# Default Layout of ScrollView

If you don't specify the layout of a ScrollView, then it defaults to:

```js
{
  flex: 1,
  alignSelf: 'stretch',
}
```

In other words, by default a `ScrollView` is as big as its container (if it is the only child view). In contrast, the standard `View` is only as big as necessary to wrap its content.

### Exercise: First ScrollView

Let's put four 300x300 boxes inside the ScrollView:

```js
// view
<ScrollView style={jss.scrollView}>
  <View style={jss.box}/>
  <View style={jss.box}/>
  <View style={jss.box}/>
  <View style={jss.box}/>
</ScrollView>

// style
const jss = StyleSheet.create({
  scrollView: {
    backgroundColor: 'lightgray'
  },
});
```

Notice that we don't need to tell the ScrollView to be as large as the screen.

See: [first-scrollview.js](https://github.com/hayeah/react-native-scrollview-experiments/blob/master/first-scrollview.js).

It looks like:

<video src="first-scrollview.mp4" controls/>

### Exercise: Size of ScrollView

Unless specified, the default size of the ScrollView is the size of its container. In our example, we expect ScrollView to be the same size as the screen.

We can use ReactNative's inspector to see the size of the ScrollView:

<video src="inspect-scrollview.mp4" controls/>

As expected the ScrollView is 414x736, the size of the iPhone6 Plus screen.

### Exercise: Centered ScrollView Content

Notice that the immediate child of the `ScrollView` is not a 300x300 box, but a 414x1240 container. The content of the ScrollView is wrapped in this `View` component.

![](content-container-view.jpg)

We can style this content container using the `contentContainerStyle` property, like so:

```js
<ScrollView style={jss.scrollView}
  contentContainerStyle={jss.contentContainerStyle}>
```

Let's make these changes:

1. Add border color so we can see it better.
2. Center the boxes using flex layout.
3. Add a top padding.

See: [centered-boxes-with-top-padding.js](https://github.com/hayeah/react-native-scrollview-experiments/blob/master/centered-boxes-with-top-padding.js)

The result:

<video src="styling-content-container.mp4" controls/>

It should also work in landscape mode:

![](styling-content-container-landscape.jpg)

### Exercise: Two ScrollViews

The default layout of a ScrollView is:

```js
{
  flex: 1,
  alignSelf: 'stretch',
}
```

Please divide the screen into two ScrollViews.

Your result:

<video src="two-scrollviews-ios.mp4" controls/>

Also test on Android:

<video src="two-scrollviews-android.mp4" controls/>

### Exercise: Nesting ScrollViews

Create rows of horizontal scrollviews. The layout should look like:

<video src="nested-scrollviews.mp4" controls/>

Use the `horizontal` property to make a ScrollView scroll horizontally:

```js
<ScrollView horizontal={true}>
```

+ Change flex direction to 'row'.
+ The boxes are 80x80.

Check if Android works.

<video src="nested-scrollview-android.mp4" controls/>

# GPU Accelerated Scrolling

The ScrollView is the centerpiece of the mobile experience. It must be smooth!

Once rendered, the container view is essentially single [layer](https://developer.apple.com/library/mac/documentation/GraphicsImaging/Reference/CALayer_class/). The layer is sent to the GPU as a texture, so that when scrolling, it's very efficient for the GPU to move the layer up and down.

A major performance killer is when the GPU needs to blend two layers together.

![](compositing-illustration.jpg)

+ For solid colors, the top layer covers the bottom layer. Easy for GPU to do.
+ For transparent colors, GPU needs to blend two layers together.

See [Getting Pixels onto the Screen](https://www.objc.io/issues/3-views/moving-pixels-onto-the-screen/) for an overview of the iOS rendering pipeline.

### Exercise: Layer Blending

Let's see an example of blending. Make the 400x400 boxes half tranparent:

```js
box: {
  ...
  opacity: 0.5,
  ...
}
```

See: [compositing-scrollview.js](https://github.com/hayeah/react-native-scrollview-experiments/blob/master/compositing-scrollview.js).

The iOS simulator can show you which areas on the screen are blended:

<Cover>
<img src="enable-blended-layer.jpg"/>
</Cover>

Everything is red, telling us that eveything on screen requires blending:

![](show-blended-layer.jpg)

On your own, fix blending problem by removing transparent layers. You should turn almost everything to green:

<video src="scrollview-no-blended-area.mp4" controls/>

A few areas still require blending:

+ Status bar.
+ Scroll indicator.

# A Very Long ScrollView

> If a tree falls in a forest and no one is around to hear it, does it make a sound?

> If a view scrolls away and no one is around to see it, does it consume memory?

A ScrollView can contain hundreds of views, but only a handful of them are actually displayed on screen at one time.

The ScrollView component can optimize memory usage by removing views if they are far away from being seen. As views are scrolled into the screen, they are dynamically added back to the native UI tree.

However, the whole shadow view hierarchy is always kept in memory. It is needed to:

1. Calculate CSS layout.
2. Track which native views to add, remove, or modify.
3. Record all the property values of the views.

So for a large view hierarchy's layout will take longer to calculate, although memory usage is optimized.

### Exercise: Optimize Long ScrollView

Let's put 1000 boxes inside the ScrollView.

```js
const NUM_ITEMS = 1000;
const numbers = Array.from({length: NUM_ITEMS}, (_, i) => i);

const views = numbers.map(i => {
  return (
    <View key={i} style={jss.box}>
      <Text>{i}</Text>
    </View>
  );
});

<ScrollView style={jss.scrollView}>
  {views}
</ScrollView>
```

See: [very-long-scrollview-not-clipped.js
](https://github.com/hayeah/react-native-scrollview-experiments/blob/master/very-long-scrollview-not-clipped.js)

Enable the performance monitor:

![](enable-performance-monitor.jpg)

You should see a few numbers:

![](scrollview-not-clipped.jpg)

+ RAM: 322.78MB
+ JSC: 14.93
  + Memory used by JavaScriptCore (the JS engine).
+ Views: 2006
  + This is the number of native views rendered.
+ Views: 3006
  + This is the number of shadow views.
  + 1000 View + 2000 Text (2 per Text)

Now let's optimize memory usage. The `removeClippedSubviews` property tells the ScrollView to remove native views if they are not seen. (It defaults to true already, but let's add it anyway):

```js
<ScrollView style={jss.scrollView}
  removeClippedSubviews={true}>
```

Next, you need to tell the ScrollView that it can clip the boxes. The documentation says:

> When removeClippedSubviews is true, offscreen **child views (whose overflow value is hidden)** are removed from their native backing superview when offscreen.
>
> [removeclippedsubviews](https://facebook.github.io/react-native/docs/scrollview.html#removeclippedsubviews)

So...

```js
box: {
  ...
  overflow: 'hidden',
}
```

And you should see that native views count and RAM usage decreases:

![](scrollview-clipped.jpg)

+ RAM: 147.13MB
  + Reduced from 322.78MB.
+ Views: 12
  + Reduced from 2006.
+ Views: 3006
  + Same as before. This is the ShadowView hierarchy.

Try to scroll the content, and you shouldn't see any difference from before.


