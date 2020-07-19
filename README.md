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

##    Thanks

Inspired by [react-native-elastic-image-slider](https://github.com/xiewang/react-native-elastic-image-slider)
