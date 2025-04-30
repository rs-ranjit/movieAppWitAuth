import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const TrendingCard = ({url, name}) => {
  return (
    <View
      style={{
        flex: 1,
        maxWidth: 120,
        padding: 10,
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

export default TrendingCard;

const styles = StyleSheet.create({
  image: {
    width: '90%',
    height: 140,
    borderRadius: 10,
  },
});
