import {View, StyleSheet, Text, Image, TextInput, FlatList} from 'react-native';
import React, {useState} from 'react';
import TrendingCards from '../component/TrendingCards';
import SearchBar from '../component/SearchBar';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import useFetch from '../services/api';
import MovieCard from '../component/MovieCard';

const HomeScreen = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Search');
  };
  const {movies, loading, error} = useFetch('');
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Image source={require('../assets/icon.webp')} style={styles.image} />
        <SearchBar onPress={handlePress} placeholder="Search for movies." />
        <View style={styles.TrendingContainer}>
          <Text style={[styles.text]}>Trending Movies</Text>
        </View>
        <View style={styles.latestContainer}>
          <Text style={[styles.text]}>Latest Movies</Text>
          <View style={{flexDirection: 'row'}}>
            {loading ? (
              <View style={styles.loaderContainer}>
                <LottieView
                  source={require('../assets/loading.json')}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ) : (
              <FlatList
                data={movies}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <MovieCard
                    name={item.title}
                    url={item.poster_path}
                    rating={item.vote_average}
                  />
                )}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{justifyContent: 'flex-start', gap: 20}}
                numColumns={3}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 800,
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  secondContainer: {flex: 1, alignItems: 'center'},
  image: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },

  TrendingContainer: {
    width: '90%',
    marginLeft: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  latestContainer: {
    width: '90%',
    marginLeft: 10,
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  lottie: {
    width: 150,
    height: 150,
  },
});
