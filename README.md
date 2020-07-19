# react-native-animated-view-slider
A library that allow user to slide through views 

![npm](https://img.shields.io/npm/v/react-native-animated-view-slider)

![example](https://i.imgur.com/pzk9xFZ.gif)

## Install

```
$ npm install react-native-animated-view-slider
```

## Usage

```js
import ViewSlider from 'react-native-elastic-image-slider';

const view = <Text style={{ flex: 1, fontSize: 32, backgroundColor: 'red' }}>Hello</Text>
const view2 = <Text style={{ flex: 1, fontSize: 32, backgroundColor: 'gray' }}>world</Text>


const image1 = <Image style={{ width: 200, height: 140 }} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
const image2 = <Image style={{ width: 200, height: 140 }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/800px-React-icon.svg.png' }} />

return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Two text elements with custom duration - 3000ms</Text>
      <ViewSlider
        snapAnimationDuration={3000}
        views={[view, view2]}
      />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>Two {'<Image>'} element with autoPlay</Text>
        <ViewSlider
          itemWidth={200}
          autoPlay={true}
          views={[image1, image2]}
        />
      </View>
    </SafeAreaView>
);
```

### Doc

| prop                  | type   | description                                                       |
|-----------------------|--------|-------------------------------------------------------------------|
| views                 | array  | views to show in the slider - can be images/text - any View       |
| itemWidth             | number | pass to set size of ViewSlider otherwise uses screenWidth         |
| autoPlay              | bool   | should the slider auto play the slides - defaults to false        |
| autoPlayDuration      | number | time between each slide autoplay - defaults to 4000ms             |
| initialPosition       | number | initial slide to show                                             |
| snapAnimationDuration | number | Duration in which slider snaps to next element - default to 400ms |

## Background

Most of the components out there uses Scrollview to implement the slider which does not allow custom duration to be passed while snapping to next element.

##    Thanks

Inspired by [react-native-elastic-image-slider](https://github.com/xiewang/react-native-elastic-image-slider)
