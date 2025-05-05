import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';

const width = Dimensions.get('window').width;

const TrendingCards = ({url, name}) => {
  console.log('This is trending', url);
  return (
    <View
      style={{
        gap: 20,
        width: width / 3 - 20,
        padding: 20,
      }}>
      <TouchableOpacity>
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
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
});
