# View Pager

The view pager is a common UI pattern that allows the user to flip left and right through pages of data.

<video src="ios-pager.mp4" controls/>

Unfortunately iOS and Android have different native components for view pager. ReactNative (v0.24) does not have a builtin cross-platform component for paging. We'll have to build our own.

+ In iOS, we can use [ScrollView](https://facebook.github.io/react-native/docs/scrollview.html#content) as the view pager.
+ In Android, we can use [ViewPagerAndroid](https://facebook.github.io/react-native/docs/viewpagerandroid.html#content).

You'd often need to plaster over small annoying differences between iOS and Android. This tutorial will show you how by building a simple cross-platform View Pager component.

# iOS View Pager

In iOS, The `ScrollView` component is based on the ridiculously over-featured [UIScrollView](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIScrollView_Class/#//apple_ref/occ/instp/UIScrollView/pagingEnabled) native view. Setting the [pagingEnabled](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIScrollView_Class/#//apple_ref/occ/instp/UIScrollView/pagingEnabled) property to true turns `UIScrollView` into a pager.

The ScrollView component uses the iOS specific `pagingEnabled` property:

```js
<ScrollView
  horizontal={true}
  pagingEnabled={true}
  >

  <View/>
  <View/>
  <View/>

</ScrollView>
```

> [ios] [pagingEnabled](https://facebook.github.io/react-native/docs/scrollview.html#pagingenabled) bool
>
> When true, the scroll view stops on multiples of the scroll view's size when scrolling. This can be used for horizontal pagination. The default value is false.

Lastly, each of the page need to have explicit layout to cover the whole screen, and laid side-by-side:

![](scrollview-paging-children.jpg)

We can use the `Dimensions` to get the screen size:

```js
const windowSize = Dimensions.get("window");

const fullScreenSize = {
  width: windowSize.width,
  height: windowSize.height,
};

<ScrollView
  horizontal={true}
  pagingEnabled={true}
  >

  <View style={[
    jss.page,
    fullScreenSize,
    { backgroundColor: 'rgba(255,0,0,0.3)' },
  ]}>
    <Text>Page 1</Text>
  </View>

  ...
</ScrollView>

```

See: [pager-ios.js](https://github.com/hayeah/react-native-scrollview-experiments/blob/master/pager-ios.js).

The result:

<video src="ios-pager.mp4" controls/>

### Exercise: Remove Children Layout

Try removing `fullScreenSize` from children's style.

You should see:

![](ios-pager-remove-children-layout.jpg)

# Android View Pager

ViewPagerAndroid is built on Android's native [ViewPager](http://developer.android.com/reference/android/support/v4/view/ViewPager.html).

Unlike ScrollView, ViewPagerAndroid doesn't automatically fill its container. So we'll need to give it the fullscreen layout:

```js
<ViewPagerAndroid
  style={fullScreenSize}
  >
```

Another difference is that the child views the pages are automatically stretched to fill the view pager. The doc says:

> ViewPagerAndroid  allows to flip left and right between child views. **Each child view** of the ViewPagerAndroid will be treated as a separate page and **will be stretched to fill the ViewPagerAndroid**.
>
> ReactNative [ViewPagerAndroid](https://facebook.github.io/react-native/docs/viewpagerandroid.html#content)

So we don't need to give the child views layout.

See: [pager-android.js](https://github.com/hayeah/react-native-scrollview-experiments/blob/master/pager-android.js).

The result:

<video src="android-pager.mp4" controls/>

### Exercise: Remove ViewPagerAndroid Layout

Try removing `fullScreenSize`.

You should see an empty screen:

![](view-pager-android-no-layout.jpg)

So it seems that ViewPagerAndroid defaults to 0x0.

Ya... ok... why not...

### Exercise: Diff The Pagers

Try diffing the two demos to see exactly how they are different.

```sh
diff -y  pager-ios.js pager-android.js | colordiff | less
```

<Cover>
<img src="diff-ios-and-android-pager.jpg"/>
</Cover>

# Unified Pager

With a little effort we can abstract away the difference between iOS and Android. Let's create a minimal cross-platform Pager component.

The Pager API is like this:

```js
const fullScreenSize = {
  width: windowSize.width,
  height: windowSize.height,
};

<Pager size={fullScreenSize}>
  <View>
    <Text>Page 1</Text>
  </View>

  <View>
    <Text>Page 2</Text>
  </View>

  <View>
    <Text>Page 3</Text>
  </View>
</Pager>
```

The cross-platform `Pager` is a simple shim that passes the props to a platform specific component:

```js
import { Platform } from "react-native";

function Pager(props) {
  const PagerClass = Platform.OS === "ios" ? PagerIOS : PagerAndroid;

  return <PagerClass {...props}/>
}

function PagerAndroid(props) {
  // ...
}

function PagerIOS(props) {
  // ...
}
```

The `PagerAndroid` component is straightforward:

```js
function PagerAndroid(props) {
  const { size } = props;
  return (
    <ViewPagerAndroid
        style={size}>
      {props.children}
    </ViewPagerAndroid>
  );
}
```

The `PagerIOS` is somewhat trickier. It needs to stretch each child to be as big as the container:

```js
function PagerIOS(props) {
  const stretchedChildren = React.Children.map(props.children, function(child) {
    // stretch the child view to fill the container
    // ...
  });

  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      >
      {stretchedChildren}
    </ScrollView>
  );
}

```

See: [pager-cross-platform.js](https://github.com/hayeah/react-native-scrollview-experiments/blob/master/pager-cross-platform.js).

# ReactNative Cross-Platform Development Tips

The most reliably cross-platform native components are `View` and `Text`. It's less likely (but hardly impossible) to run into inconsistencies.

Components implemented with pure JavaScript are also reliably cross-platform. These are components like `TouchableOpacity`, `Navigator` and the animation library `Animated`.

On the other hand, complex native components like `Image`, `ScrollView`, and `ViewPagerAndroid` are always full of surprises. The problem with these components is that they behave strangely in layout. For example:

+ ScrollView are automatically stretched to fill its container.
+ ViewPagerAndroid doesn't have special layout properties, but its children are automatically stretched to fill the pager.
+ Image doesn't need explicit size if the loaded image is local, but it needs explicit size if the loaded image is remote.

A good strategy to deal with native component quirks is to implement a small standalone demo for the effect you want to build. This way you can ignore the complexity of your own app (and your own bugs), and focus on finding the exact incantation to make a component dance the way you want.
