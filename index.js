import React, { Component } from 'react';
import {
    Text,
    View,
    Animated,
    PanResponder,
    TouchableOpacity,
    Dimensions,
    LayoutAnimation,
    UIManager,
    Platform
} from 'react-native';
const PropTypes = require('prop-types');
import styles from './style';

class ViewSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: this.props.initialPosition,
            left: new Animated.Value(0),
            scrolling: false,
            timeout: null,
        };
        // Enable LayoutAnimation under Android
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }

    _move(index) {
        const width = Dimensions.get('window').width;
        const to = index * -width;
        if (!this.state.scrolling) {
            return;
        }
        Animated.timing(this.state.left, { toValue: to, friction: 10, tension: 10, velocity: 1, duration: 700 }).start();

        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }
        this.setState({
            position: index,
            timeout: setTimeout(() => {
                this.setState({ scrolling: false, timeout: null });
                if (this.props.onPositionChanged) {
                    this.props.onPositionChanged(index);
                }
            }, 400)
        });
    }

    _getPosition() {
        return this.state.position;
    }

    componentWillReceiveProps(props) {
        if (props.position !== undefined) {
            this.setState({ scrolling: true });
            this._move(props.position);
        }
    }

    componentWillMount() {
        const width = Dimensions.get('window').width;
        this.state.left.setValue(-(width * this.state.position));

        let release = (e, gestureState) => {
            const width = Dimensions.get('window').width;
            const relativeDistance = gestureState.dx / width;
            const vx = gestureState.vx;
            let change = 0;
            if (relativeDistance < -0.5 || (relativeDistance < 0 && vx <= 0.5)) {
                change = 1;
            } else if (relativeDistance > 0.5 || (relativeDistance > 0 && vx >= 0.5)) {
                change = -1;
            }
            const position = this._getPosition();
            if (position === 0 && change === -1) {
                change = 0;
            } else if (position + change >= this.props.views.length) {
                change = (this.props.views.length) - (position + change);
            }
            this._move(position + change);
            this.moveToNextPage() // auto play setup
            return true;
        };
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => Math.abs(gestureState.dx) > 5,
            onPanResponderRelease: release,
            onPanResponderTerminate: release,
            onPanResponderMove: (e, gestureState) => {
                const dx = gestureState.dx;
                const width = Dimensions.get('window').width;
                const position = this._getPosition();
                let left = -(position * width) + Math.round(dx);
                if (left > 0) {
                    left = Math.sin(left / width) * (width / 2);
                } else if (left < -(width * (this.props.views.length - 1))) {
                    const diff = left + (width * (this.props.views.length - 1));
                    left = Math.sin(diff / width) * (width / 2) - (width * (this.props.views.length - 1));
                }
                this.state.left.setValue(left);
                if (!this.state.scrolling) {
                    this.setState({ scrolling: true });
                }
                this.clearAutoPlay()

            },
            onShouldBlockNativeResponder: () => true
        });
    }

    componentDidMount() {
        if (this.props.autoPlay) {
            this.moveToNextPage()
        }
    }

    componentWillUnmount() {
        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }
        this.clearAutoPlay()
    }

    clearAutoPlay() {
        if (this.state.autoPlayTimeOut) {
            clearTimeout(this.state.autoPlayTimeOut);
        }
    }

    // recursive - used in auto play
    moveToNextPage() {
        if (!(this.props.autoPlay && this.state.position < this.props.views.length - 1)) {
            // reached end or not autoplaying
            return
        }
        const autoPlayTimeOut = setTimeout(() => {
            this.setState({ scrolling: true });
            this._move(this.state.position + 1);
            if ((this.props.autoPlay && this.state.position < this.props.views.length - 1)) {
                this.moveToNextPage()
            }
        }, this.props.autoPlayDuration)
        this.setState({ autoPlayTimeOut })
    }

    componentWillUpdate() {
        const CustomLayoutAnimation = {
            duration: 100,
            //create: {
            //    type: LayoutAnimation.Types.linear,
            //    property: LayoutAnimation.Properties.opacity,
            //},
            update: {
                type: LayoutAnimation.Types.linear
            }
        };
        LayoutAnimation.configureNext(CustomLayoutAnimation);
        //LayoutAnimation.linear();
    }

    render() {
        const customStyles = this.props.style ? this.props.style : {};
        const width = Dimensions.get('window').width;
        return (<View>
            <Animated.View
                style={[styles.container, customStyles, { height: this.state.height, width: width * this.props.views.length, transform: [{ translateX: this.state.left }] }]}
                {...this._panResponder.panHandlers}>
                {this.props.views.map((view, index) => {
                    let component = view
                    return component;
                })}
            </Animated.View>
        </View>);
    }
}

ViewSlider.propTypes = {
    initialPosition: PropTypes.number,
    onPositionChanged: PropTypes.func,
    autoPlay: PropTypes.bool,
    autoPlayDuration: PropTypes.number,
    snapAnimationDuration: PropTypes.number,
    views: PropTypes.array.isRequired
}

ViewSlider.defaultProps = {
    position: 0,
    autoPlay: false,
    autoPlayDuration: 4000,
    initialPosition: 0,
    snapAnimationDuration: 400,
    views: []
}

export default ViewSlider;