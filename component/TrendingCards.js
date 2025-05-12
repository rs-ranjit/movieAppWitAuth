import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

const TrendingCards = ({url, name, onPress}) => {
  return (
    <View
      style={{
        width: width / 3 - 20,
        marginRight: 20,
      }}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500${url}`}}
          style={styles.image}
        />
        <Text
          style={{color: 'white', fontSize: 16, fontWeight: 500}}
          numberOfLines={1}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrendingCards;

const styles = StyleSheet.create({
  image: {
    width: width / 3 - 20,
    height: height * 0.2,
    borderRadius: 10,
    resizeMode: 'contain',
  },
});
