import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from '../component/SearchBar';
import MovieCard from '../component/MovieCard';
import LottieView from 'lottie-react-native';
import {useAuth} from '../context/authContext';
import auth from '@react-native-firebase/auth';
import {useSearchMovies} from '../services/api';

const SearchScreen = () => {
  const {setUserSearch} = useAuth();
  const [movie, setMovie] = useState();
  const [debouncedMovie, setDebouncedMovie] = useState('');

  const {movies, loading, searchMovies} = useSearchMovies();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedMovie(movie);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [movie]);

  console.log(debouncedMovie);

  useEffect(() => {
    if (debouncedMovie) {
      searchMovies(debouncedMovie);
    }
  }, [debouncedMovie]);
  console.log(movies);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const topMovie = movies?.[0];
      const uid = auth().currentUser?.uid;

      if (topMovie && uid) {
        const {id, title, poster_path, vote_average} = topMovie;
        setUserSearch(id.toString(), title, poster_path, vote_average, uid);
      }
    }, 1000);
  }, [movies]);

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
    if (!movies || movies.length === 0) {
      return (
        <View>
          <Text style={{color: 'grey', fontSize: 20, fontWeight: '500'}}>
            No result
          </Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
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
          numColumns={4}
          key={`numColumns-${4}`}
        />
      </View>
    );
  };

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
          <Text style={{color: 'grey', fontSize: 20, fontWeight: '500'}}>
            Search for movies...
          </Text>
        </View>
      )}
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
    fontWeight: '800',
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
