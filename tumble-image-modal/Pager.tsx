import React from "react";

// This seems to be an internal module, imported using the node-haste `@provideModule` convention.
const ReactElement = require('ReactElement');

import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  // Platform,

  ScrollView,
  ViewPagerAndroid,
  View,
  Text,
} from "react-native";

// TODO: Add type info
const { Platform } = require("react-native");

interface Size {
  width: number;
  height: number;
}

interface Props {
  // Size of the pager.
  size: Size;
  children?: any;
}

export function Pager(props: Props) {
  const PagerClass = Platform.OS === "ios" ? PagerIOS : PagerAndroid;

  return <PagerClass {...props}/>
}

function PagerAndroid(props: Props) {
  const { size } = props;
  return (
    <ViewPagerAndroid
      style={{ width: size.width, height: size.height }}>
      {props.children}
    </ViewPagerAndroid>
  );
}

function PagerIOS(props: Props) {
  const { size } = props;

  const stretchedChildren = (React.Children as any).map(props.children, function (child) {
    if (!child) {
      return null;
    }

    const newProps = Object.assign({}, child.props, {
      style: [child.props.style, {
        width: size.width,
        height: size.height,
      }],

      // Disable Android Optimization
      // https://facebook.github.io/react-native/docs/view.html#collapsable
      collapsable: false,
    });

    if (child.type &&
      child.type.displayName &&
      (child.type.displayName !== 'RCTView') &&
      (child.type.displayName !== 'View')) {
      console.warn('Each ViewPager child must be a <View>. Was ' + child.type.displayName);
    }

    return ReactElement.createElement(child.type, newProps);
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
