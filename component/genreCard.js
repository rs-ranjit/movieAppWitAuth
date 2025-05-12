import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const GenreCard = ({genre}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text
        style={{
          color: 'gold',
          fontSize: 18,
          textAlign: 'center',
        }}>
        {genre?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default GenreCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'gold',
    margin: 10,
    width: 100,
    borderRadius: 10,
  },
});
