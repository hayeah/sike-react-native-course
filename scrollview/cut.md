




> Component that wraps platform ScrollView while providing integration with touch locking "responder" system.

> Keep in mind that ScrollViews must have a bounded height in order to work, since they contain unbounded-height children into a bounded container (via a scroll interaction).

+ basic usage is simple, but can get complicated and nuanced.
+ the most basic functionalities are similar between Android and iOS. More advanced stuff iOS only.
  + "iOS first"

+ [View]
+ [Image]
+ [Text]
+ [Scro]

+ no straightforward analogue. like the scrollbar, but far more complicated and nuanced.
  + physics. momentum. feel of "flicking"
  + paging
  + gesture
    + swipe left and right
    + gesture negotiation





```js
import { ScrollView } from "react-native";

<ScrollView>
  {views}
  {moreViews}
</ScrollView>
```

+ The ScrollView itself has a fixed size.
  + By default, ScrollView is as wide as its container.
+ The content inside the ScrollView can be any size.
