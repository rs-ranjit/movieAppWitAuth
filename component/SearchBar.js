import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({placeholder, value, onPress, onChangeText}) => {
  return (
    <View style={styles.upperContainer}>
      <Ionicons name="search" color="tomato" size={25} />
      <TextInput
        placeholder={placeholder}
        style={{width: '90%', color: 'white'}}
        value={value}
        onPress={onPress}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  upperContainer: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    width: '90%',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
});
