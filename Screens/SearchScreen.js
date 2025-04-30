import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from '../component/SearchBar';
import useFetch from '../services/api';
import MovieCard from '../component/MovieCard';
import LottieView from 'lottie-react-native';

const SearchScreen = () => {
  const [movie, setMovie] = useState('');
  const [debouncedMovie, setDebouncedMovie] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedMovie(movie); // update debounced value
    }, 1000);

    return () => clearTimeout(timeout); // clear timeout on each keystroke
  }, [movie]);

  useEffect(() => {
    if (debouncedMovie) {
      console.log('Searching for:', debouncedMovie);
      // Call TMDb API here
    }
  }, [debouncedMovie]);
  const {movies, loading, error} = useFetch(debouncedMovie);

  const handleLoading = () => {
    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <LottieView
            source={require('../assets/loading.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      );
    }

    return (
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
      />
    );
  };

  console.log(loading);
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.webp')} style={styles.image} />
      <SearchBar
        placeholder="Search for a movie"
        onChangeText={setMovie}
        value={movie}
      />
      {movie ? (
        handleLoading()
      ) : (
        <View>
          <Text style={{color: 'grey', fontSize: 30}}>
            Search for movies...
          </Text>
        </View>
      )}
      {/* {loading ? (
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
        />
      )} */}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 800,
  },
  image: {
    width: 50,
    height: 50,
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
