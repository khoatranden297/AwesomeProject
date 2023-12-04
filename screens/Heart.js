import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const ColorChangingView = () => {
  const [isViewActive, setViewActive] = useState(false);

  const viewOpacity = useSharedValue(1);
  const viewColor = useSharedValue('blue');

  const handleViewPress = () => {
    setViewActive(!isViewActive);
    viewOpacity.value = 0;
    viewColor.value = isViewActive ? 'red' : 'blue';
    viewOpacity.value = 1;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: viewOpacity.value,
      backgroundColor: withTiming(viewColor.value),
    };
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={handleViewPress}>
        <Animated.View style={[{ width: 200, height: 200 }, animatedStyle]} />
      </TouchableOpacity>
      <Text style={{ marginTop: 20 }}>
        {isViewActive ? 'View Active' : 'View Inactive'}
      </Text>
    </View>
  );
};

export default ColorChangingView;