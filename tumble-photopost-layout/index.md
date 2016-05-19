# Tumblr App Layout

<Note>
# Type Annotations

The application we are working on will get complex enough that it's worth considering using a JavaScript dialect with static typing. There are two choices:

+ [FlowType](http://flowtype.org/)
  + Facebook project, adopted by ReactNative.
+ [TypeScript](https://www.typescriptlang.org/)
  + MicroSoft project, adopted by Angular. Created by the Father of C# Anders Hejlsberg.

Although ReactNative has builtin support for [FlowType](http://flowtype.org/), I've had bad experience with it. Our sample code will use the [TypeScript](https://www.typescriptlang.org/docs/handbook/basic-types.html) syntax. The two are very similar, so it's not hard switch between them.

Another advantage of using TypeScript is excellent editor support in the form of [Visual Studio Code](https://code.visualstudio.com/). You get:

+ Type checking. Red underlines for type errors.
+ Auto complete with IntelliSense.
+ Type hinting when hovering over a variable.

TypeScript's type system is lightweight, easy to understand. It doesn't force you to do type acrobatics to get a program to compile. When static typing is inconvenient or convoluted, you can easily escape the type system.

In short, TypeScript feels exactly like JavaScript, but with the best tooling support, unmatched by any other dynamic language.
</Note>

## Setup TypeScript Project

Clone `rnplay-typescript-starter` to jump start our project:

```sh
git clone https://github.com/hayeah/rnplay-typescript-starter.git Tumblr
```

Follow the instructions at [rnplay-typescript-starter](https://github.com/hayeah/rnplay-typescript-starter) to get the app running.

## Download Assets

Replace the starter project's `assets` directory with this repo:

```sh
rm -r ./assets
git clone https://github.com/hayeah/tumblr-exercise-assets.git assets
```

# Using Test Data

Instead of interacting with the actual Tumblr API, we'll read data directly from JSON files. We can load the JSON data as a CommonJS module using `require`:


```js
import { ListJSON } from "./types";
const jsonPosts: ListJSON = require("path/to/data/puppies.json");
```

The type `ListJSON` is an array of Tumblr posts, exported from the `types.ts` module:

```js
// types.ts
export interface ListJSON {
  response: Post[],
}

export interface Post {
  id: number,
  timestamp: number,
  type: string,
  tags: string[],
  note_count: number,
  blog_name: string,
}

export interface PhotoPost extends Post {
  photos: Photo[],
  caption: string,
  type: "photo",
}

export interface Photo {
  original_size: PhotoSize,
  alt_sizes: PhotoSize[],
  caption: string,
}

export interface PhotoSize {
  url: string,
  height: number,
  width: number,
}
```

### Exercise: Displaying Test Data

Create `data.ts` to export the list of Tumblr posts as `posts`.

There are many different kinds of Tumblr posts. We'll only support photo posts, so let's filter out other kinds of posts:

```js
// Filter out posts that aren't photos
export const posts = jsonPosts.response.filter((post: any) => {
  return post.photos !== undefined
}) as PhotoPost[];```

Display the formatted JSON data for the first post:

```js
import { posts } from "./data";

<Text>{JSON.stringify(posts[0], null, 2)}</Text>
```

Your result:

![](display-json-first-photo.jpg)

# ReactNative Component Boilerplate

Use this boilerplate to kickstart new components:

```js
import React from "react";

import {
  StyleSheet,
  Component,

  View,
  Text,
} from "react-native";

interface Props {
}

interface State {
}

export class Foo extends Component<Props, State> {
  render() {
    return (
      <View style={jss.container}>
      </View>
    );
  }
}

const jss = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
  }
});
```

# The Root MeasureContainer

In this app we'll have to go beyond flexbox, and manually calculate layout and coordinates. Let's add a single MeasureContainer at the very top of the app to get the window size. We'll pass the window size down to child components as property values.

When the device rotate, MeasureContainer will invoke `renderWithLayout` to rebuild the UI.

Edit `App.tsx` to incorporate the `MeasureContainer`:

```js
import {
  LayoutRectangle,
} from "react-native";

export class App extends React.Component<Props, State> {
  renderWithLayout = (layout: LayoutRectangle) => {
    // <ChildView1 windowLayout={layout}>
    // <ChildView2 windowLayout={layout}>
  }

  render() {
    return <MeasureContainer>{this.renderPosts}</MeasureContainer>
  }
}
```

+ Download `MeasureContainer.tsx`.

### Exercise: Display A Square Image

As the first step, we'll display square images in the `PhotoPostView` component.

+ Use a ScrollView even though we are displaying only the first photo post.
+ Create the `PhotoPostView` component

```js
interface Props {
  maxWidth: number;
  post: PhotoPost;
}

interface State {
}

export class PhotoPostView extends Component<Props, State> {
  render() {
    const { maxWidth, post } = this.props;

    const photoSize = post.photos[0].original_size;

    return (
      ???
    );
  }
}
```

+ The `Image` component requires an explicit size when loading a remote image from url:

```js
<Image style={[
    { width: maxWidth, height: maxWidth },
  ]}
    source={{ uri: photoSize.url }}/>
```

+ The dark blue background color is `#36465D`.

Your result should be:

<video src="display-single-square-image.mp4" controls/>

### Exercise: Limit Width in Landscape

When rotated, the PhotoPost occupies the whole horizontal width, which is too wide:

![](rotated-photopost-view-no-maxwidth.jpg)

+ Limit the width of `PhotoPostView` to 420 points.

You result:

![](rotated-photopost-view-with-maxwidth.jpg)

### Exercise: Display All Posts

Your result:

<video src="show-list-of-photoposts.mp4" controls/>

Check result in Android.

### Exercise: Scaling Image

Instead of displaying square images, let's scale the images proportionally to preserve their original aspect ratio.

+ Use the `fitInRect` function for rescaling.

```js
interface Size {
  width: number;
  height: number;
}

/**
 * Scale a rectangle so it fits within the bound of a maximum rectangle.
 *
 * @param maxRect The limiting boundary.
 * @param inputRect The rectangle to fit.
 * @return The fitted rectangle.
 */
export function fitInRect(maxRect: Size, inputRect: Size): Size {
  // ...
}
```

Download [fitInRect.ts](fitInRect.ts).

+ Test image scaling using [kittens.json](https://github.com/hayeah/tumblr-exercise-assets/blob/master/data/kittens.json).

In portrait:

<video src="scaled-images.mp4" controls/>

In landscape:

<video src="scaled-images-landscape.mp4" controls/>

In Android:

<video src="scaled-images-android.mp4" controls/>

# Finishing Touches

The hard stuff is already done. The rest of it is straightforward flexbox layout.

![](photopost-view-all-implemented.jpg)

The measurements:

![](photopost-view-all-implemented-spec.jpg)

Colors for text:

```js
// theme.ts
export const colors = {
  text: {
    lightGray: "#7A7A7A",
    darkGray: "#676767",
    black: "#000000",
  }
};
```

Icons:

```js
// theme.ts
export const icons = {
  files: require("../assets/fa-files-o.png"),
};
```

### Exercise: Post Header

The avatar image should be 30x30 points. For different devices 1 point could be 1, 2, or 3 pixels, so the actual avatar image we should fetch is 30x30, 60x90, or 90x90 depending on the actual device.

The following chunk of code builds the correct avatar image url for you:


```js
const AVATAR_IMAGE_SIZE = 30;

const pixelDensity = PixelRatio.get();
let avatarImageURL = `http://api.tumblr.com/v2/blog/${post.blog_name}.tumblr.com/avatar/${AVATAR_IMAGE_SIZE * pixelDensity}`;

// ReactNative's iOS ImageLoader doesn't handle 301/302 caching correctly.
// See: https://github.com/facebook/react-native/pull/7262
if (isIOS) {
  // Add a random query parameter to cause caching to fail.
  avatarImageURL += `?rand=${Math.random()}`;
}
```

<Warning>
# ReactNative Bug

`Math.random()` is a workaround for the caching bug. We'll remove this when the fix is released.
</Warning>

+ Create the stateless component `PostHeader`:

```js
function PostHeader(props: { post: PhotoPost }) {
  return (
    <View>
    </View>
  );
}
```

Your result:

<video src="photopost-header.mp4" controls/>

### Exercise: Post Tags

Create the `PostTags` component:

```js
function PostTags(props: { post: Post }) {
  // ...
}
```

Tweak ScrollView behaviour so it's horizontal and without bounces:

```js
<ScrollView
  horizontal={true}
  showsHorizontalScrollIndicator={false}
  bounces={false}
  >
```

Your result:

<video src="scrollable-tags.mp4" controls/>

### Exercise: Number of Photos

+ Show the `fa-files-o.png` icon if number of photos is more than 1.
+ Don't show the icon if there is just one photo.

Your result:

![](show-number-of-photos-count.jpg)


### Exercise: Post Notes Count

Show number of notes:

![](show-notes-count.jpg)


### Exercise: Final Android Result

Check your app in Android:

<video src="final-result-android.mp4" controls/>

# Summary

Developing for ReactNative is more difficult than developing for modern web browsers. Native components like 'Image' and 'ScrollView' have quirks that takes time to get used to. And because ReactNative is still a young project, it's almost certain that you'll run into bugs and strange inconsistencies between Android and iOS.

But it's still amazing how little work it takes to build a sophisticated app. The app now has:

+ Native scrolling, with variable sized items.
+ Sophisticated adaptive layout that supports landscape mode.
+ Off-thread Image download and resizing.
+ "Native experience" in both iOS and Android.

