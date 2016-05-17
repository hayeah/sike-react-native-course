# React-Native Animated

part 2

+ animated.event with slider
+ interpolation,
+ gesture + animated.event

Animation represents a couple of challenges.

+ Performance. 60fps.
  + There is a lot going on, and mobile platform is comparatively weak.
+ React specific. What is a "declarative" library that integrates well with the React philosophy?
+ Coordinate multiple effects in a "timeline".
  + interpolation.
+ Gesture driven timeline and transition.
  + Animated.event
  + Use scroll as an example.
  + Sense of "physics". Resume animation with current gesture velocity.

+ Native animation vs JavaScript animation.
  + LayoutAnimation is native, but very limited.

+ Animated is JavaScript. versatile and verbose.
  + triggering layout can be CPU expensive. CPU on simulator is much faster than physical device.
  + transform properties are efficient. No GPU for simulator, but can use GPU on physical device. Expect device to be faster.

+ Debugging tips.
  + tracing animation values.

+ Can I use react-art to visualize animation?

# Demos

+ tracing animated value with callback.
  + manipulating with setValue.
  + can't * or + with normal numbers.

  + different easing functions
    + time based (easeIneasOut).
    + physics based (spring & decay).
    + visualizing easing path with ART

  + actually just three ways to drive a value... decay, spring, and timing

+ high CPU may slow down animation

+ Animated.View
  + The same value can be passed to different views to synchronize their animated state.

+ Animated.Image
  + keep an eye out for for resizing events.

+ Animating properties in parallel.

+ Animating properties in sequence.

+ Animated.ValueXY
  + observe triggering onLayout.
  + vs. transform

# Advanced Demo

drives animation for a transition

+ interpolation
  + 0->1 is a good idea. 1->0 for backward animation.
  + useful for mapping multiple effects onto a timeline.
  + pattern to clamp to final value. to [0, 100, 100]

+ building animation graph
  + sub (say, from a fixed distance)
  + mult (probably only useful for -1)

+ animated.event
+ track

+ tossing a rectangle left out of the screen with gesture.
  + simultaneously fade out.


