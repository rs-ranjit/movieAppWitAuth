import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MovieCard = ({url, name, rating, onPress}) => {
  return (
    <View
      style={{
        flex: 1,
        maxWidth: 100,
        padding: 10,
      }}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500${url}`}}
          style={styles.image}
        />
        <Text style={styles.text} numberOfLines={1}>
          {name}
        </Text>
        <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
          <FontAwesome name="star" size={13} color="yellow" />
          <Text style={styles.txt}>{rating.toFixed(1)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  image: {
    width: '90%',
    height: 140,
    borderRadius: 10,
  },
  text: {color: 'white', fontSize: 16, fontWeight: 500},
  txt: {
    color: 'orange',
    fontStyle: 12,
    fontWeight: 500,
  },
});
