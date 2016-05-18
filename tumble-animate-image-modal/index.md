# Animated Modal

<video src="animate-cover-photo-rotation.mp4" autoplay loop controls/>

We are going to build the animation effects for the modal transition.

# Animating Modal Opacity

The first effect is simple. We adjust opacity to fade in and fade out the entire modal component.

### Exercise: Animated Opacity

Let's animate `opacity` in the root `App` component:

```js
interface AnimatedProps {
  opacity: Animated.Base;
}

export class App extends React.Component<Props, State> {
  private animated: AnimatedProps;

  // ...
}
```

Then we pass `opacity` down into `PhotoModal` as a prop. To keep our componenets stylistically consistent, transfer `opacity` from `this.props` to `this.animated`:

```js
interface Props {
  opacity: Animated.Base;
}

interface AnimatedProps {
  opacity: Animated.Base;
}

export class PhotosModal extends Component<Props, State> {
  private animated: AnimatedProps;

  constructor(props: Props) {
    super(props);

    this.animated = {
      opacity: this.props.opacity,
    };
  }

  // ...
}
```

+ Animate the `opacity` value.
+ Use `setState` to mount and unmount `PhotosModal`.

Your result:

<video src="fade-in-photos-modal.mp4" controls/>

# Animate Cover Photo

Animating the cover photo from its initial position in the scroll view to its final position in the modal is somewhat tricky. We'll divide the work into multiple steps:

1. Measure the initial position of the cover photo.
2. Calculate the final position of the cover photo, and animate it.
3. Get rotation to work.

### Exercise: Measuring Cover Photo

Let's modify `ShowPhotoModalFunction` so it gets the initial layout of the cover photo as the second argument:

```js
// types.ts
export type ShowPhotoModalFunction = (
  post: PhotoPost,
  initialCoverImageLayout: LayoutRectangle
) => void;
```

We want to ultimately pass the `initialCoverImageLayout` to `PhotosModal` as a prop:

```js
// PhotosModal.tsx
interface Props {
  // ...
  initialCoverImageLayout: LayoutRectangle;
}
```

Print `initialCoverImageLayout` when a cover photo is clicked.

You should see:

<video src="measure-cover-photo.mp4" controls/>

Hint 1: Use [measureInWindow](https://github.com/facebook/react/blob/8ea1cf4ee0f5315c4190a9e67e15f0f7404cb0cf/src/renderers/native/NativeMethodsMixin.js#L108) to get the layout of a view relative to the window.
  + Example: [layout/measureView.js](https://github.com/hayeah/react-native-experiments/blob/master/layout/measureView.js#L23-L25)

Hint 2: Try to use Promise and async/await could to asynchronous code nicer.

```js
measureCoverPhoto = async (): Promise<LayoutRectangle> => {
  // ...
}

showModal = async () => {
  const { showImageModal, post } = this.props;

  const layout = await this.measureCoverPhoto();

  showImageModal(post, layout);
}
```

### Exercise: Animate Cover Photo

`Animated` does not have special support to animate the `LayoutRectangle`, so we'll animate 4 properties in parallel:

```js
interface AnimatedProps {
  opacity: Animated.Base;

  coverPhotoLayout: {
    top: Animated.Base,
    left: Animated.Base,
    width: Animated.Base,
    height: Animated.Base,
  };
}
```

Initialize these four `Animated.Value` instances with the values of the initial layout rectangle.

From the previous exercise we have the starting layout of the cover image, now we'll need to calculate the final layout of the cover image. Here's the tedious code to fit and center the cover image:

```js
animateCoverPhoto() {
  const { post, windowLayout } = this.props;
  const coverPhotoSize = post.photos[0].original_size;

  // Fit and center
  const { width, height } = fitInRect(windowLayout, coverPhotoSize);
  const top = windowLayout.height / 2 - height / 2;
  const left = windowLayout.width / 2 - width / 2;

  // ...
}

```

Your result:

<video src="animated-cover-photo.mp4" controls/>

### Exercise: Animate Cover Photo Rotation

When the screen is rotated, you should animate the cover photo to its new position.

Use `componentDidUpdate` to detect if the window layout had changed:

```js
componentDidUpdate(oldProps: Props) {
  if (oldProps.windowLayout !== this.props.windowLayout) {
    console.log("window layout changed");
    this.animateCoverPhoto();
  }
}
```

Your result:

<video src="animate-cover-photo-rotation.mp4" controls/>


### Exercise: Test Android

Make sure your app works on Android.

Your result:

<video src="android-animated-cover-photo.mp4" controls/>

