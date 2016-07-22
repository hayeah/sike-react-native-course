# Animated Modal

<video src="animate-cover-photo-rotation.mp4" autoplay loop controls/>

We are going to build the animation effects for the modal transition.

<Cn>

# 实现模型的动效

<video src="animate-cover-photo-rotation.mp4" autoplay loop controls/>

接下来我们会给模型转换添加动画效果。

</Cn>

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

<Cn>

# 实现模型透明度的动效

第一个效果比较简单。我们通过调整透明度来让整个模型部件淡入淡出。

### 练习：透明度的动效

让我们在 `App` 部件里实现 `opacity` 的动效：

```js
interface AnimatedProps {
  opacity: Animated.Base;
}

export class App extends React.Component<Props, State> {
  private animated: AnimatedProps;

  // ...
}
```

</Cn>

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

<Cn>

然后我们将 `opcatiy` 作为一个属性传递给 `PhotoModal`。 为了让我们的部件风格一致，将 `opacity` 从 `this.props` 传递给 `this.animated`：

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

</Cn>


+ Animate the `opacity` value.
+ Use `setState` to mount and unmount `PhotosModal`.

Your result:

<video src="fade-in-photos-modal.mp4" controls/>

<Cn>

+ 实现 `opcaity` 值的动效；
+ 使用 `setState` 来显示/隐藏 `PhotosModal`。

效果应该像是这样：

<video src="fade-in-photos-modal.mp4" controls/>

</Cn>

# Animate Cover Photo

Animating the cover photo from its initial position in the scroll view to its final position in the modal is somewhat tricky. We'll divide the work into multiple steps:

1. Measure the initial position of the cover photo.
2. Calculate the final position of the cover photo, and animate it.
3. Get rotation to work.

<Cn>

# 封面图的动效

要将封面图从 scrollview 里面的初始位置移动到模型里面的最终位置，会有点棘手。我们会将这个任务分成几步：

1. 测量封面图的初始位置；
2. 计算封面图的最终位置，然后完成它的动效；
3. 旋转。

</Cn>

### Exercise: Measuring Cover Photo

Let's modify `ShowPhotoModalFunction` so it gets the initial layout of the cover photo as the second argument:

```js
// types.ts
export type ShowPhotoModalFunction = (
  post: PhotoPost,
  initialCoverImageLayout: LayoutRectangle
) => void;
```

<Cn>

### 练习：测量封面图

让我们修改 `ShowPhotoModalFunction` 来得到封面图的初始布局作为第二参数：

```js
// types.ts
export type ShowPhotoModalFunction = (
  post: PhotoPost,
  initialCoverImageLayout: LayoutRectangle
) => void;
```


</Cn>

We want to ultimately pass the `initialCoverImageLayout` to `PhotosModal` as a prop:

```js
// PhotosModal.tsx
interface Props {
  // ...
  initialCoverImageLayout: LayoutRectangle;
}
```

<Cn>

我们最终是想将 `initialCoverImageLayout` 作为属性传递给 `PhotosModal`：

```js
// PhotosModal.tsx
interface Props {
  // ...
  initialCoverImageLayout: LayoutRectangle;
}
```

</Cn>

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

<Cn>

当一个封面图被点击时，打印 `initialCoverImageLayout`。

你应该能看到：

<video src="measure-cover-photo.mp4" controls/>

提示 1：使用 [measureInWindow](https://github.com/facebook/react/blob/8ea1cf4ee0f5315c4190a9e67e15f0f7404cb0cf/src/renderers/native/NativeMethodsMixin.js#L108) 来得到一个视图相对于视窗的布局。
  + 例子： [layout/measureView.js](https://github.com/hayeah/react-native-experiments/blob/master/layout/measureView.js#L23-L25)

提示 2: 尝试使用 Promise 和 async/await 会让异步代码更优雅。

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

</Cn>

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

<Cn>

### 练习：封面图的动效

`Animated` 没有特别的支持来实现 `LayoutRectangle` 的动效，所以我们会平行地完成 4 个属性的动效：

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




</Cn>

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

<Cn>

用初始的长方形布局的值，来初始化这四个 `Animated.Value` 实例。

从前一个练习我们已经得到了封面图的起始布局，现在我们会需要计算封面图的最终布局。这里是让封面图调整并且居中的代码：

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

效果应该像这样：

<video src="animated-cover-photo.mp4" controls/>


</Cn>

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

<Cn>

### 练习：封面图的旋转动效

当屏幕旋转时，你也应该让封面图旋转到它的新位置。

使用 `componentDidUpdate` 来检测视窗布局是否发生了改变：

```js
componentDidUpdate(oldProps: Props) {
  if (oldProps.windowLayout !== this.props.windowLayout) {
    console.log("window layout changed");
    this.animateCoverPhoto();
  }
}
```

效果应该像这样：

<video src="animate-cover-photo-rotation.mp4" controls/>


</Cn>


### Exercise: Test Android

Make sure your app works on Android.

Your result:

<video src="android-animated-cover-photo.mp4" controls/>

<Cn>

### 练习：测试 Android

保证你的应用在 Android 上正常运行。

效果应该像这样：

<video src="android-animated-cover-photo.mp4" controls/>

</Cn>
