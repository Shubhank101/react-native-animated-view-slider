# react-native-animated-view-slider
A library that allow user to slide through views 

![npm](https://img.shields.io/npm/v/react-native-animated-view-slider)

## Install

```
$ npm install react-native-animated-view-slider
```

## Usage

```js
import ViewSlider from 'react-native-elastic-image-slider';

const view = <Text style={{ flex: 1}}>Hello</Text>
const view2 = <Text style={{ flex: 1 }}>world</Text>
return (
      <ViewSlider
        views={[view, view2]}
      />
);
```

##    Thanks

Inspired by [react-native-elastic-image-slider](https://github.com/xiewang/react-native-elastic-image-slider)
