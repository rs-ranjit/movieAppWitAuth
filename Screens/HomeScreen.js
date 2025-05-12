import {View, StyleSheet, Text, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrendingCards from '../component/TrendingCards';
import SearchBar from '../component/SearchBar';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import MovieCard from '../component/MovieCard';
import {useLatestMovies} from '../services/api';
import {useAuth} from '../context/authContext';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {getusersearch} = useAuth();
  const [hist, setHist] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [newTrend, setNewTrend] = useState([]);

  const uid = auth().currentUser?.uid;

  const handlePress = () => {
    navigation.navigate('Search');
  };
  const handleTrendingPress = items => {
    navigation.navigate('Detail', {items});
  };

  const {movies, loading, fetchLatestMovies} = useLatestMovies();

  useEffect(() => {
    fetchLatestMovies();
    setNewTrend(movies);
  }, []);

  useEffect(() => {
    if (uid) {
      setLoading(true);
      const fetchSearchHist = async () => {
        const history = await getusersearch(uid);
        setHist(history);
        setLoading(false);
      };
      fetchSearchHist();
    }
  }, []);

  const handleTrending = () => {
    if (hist.length > 3) {
      return (
        <View>
          <FlatList
            data={hist}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TrendingCards
                url={item.url}
                name={item.movieTitle}
                onPress={() => handleTrendingPress(item)}
              />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 10}}
            style={{height: 200}}
          />
        </View>
      );
    } else {
      return (
        <View style={{borderRadius: 80}}>
          <FlatList
            data={newTrend}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TrendingCards url={item.poster_path} name={item.title} />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 10}}
            style={{height: 200}}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Image source={require('../assets/icon.webp')} style={styles.image} />
        <SearchBar onPress={handlePress} placeholder="Search for movies." />
        <View style={styles.TrendingContainer}>
          <Text style={[styles.text]}>Trending Movies</Text>
          <View>
            {Loading ? (
              <View style={styles.loaderContainer}>
                <LottieView
                  source={require('../assets/loading.json')}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ) : (
              handleTrending()
            )}
          </View>
        </View>
        <View style={styles.latestContainer}>
          <Text style={[styles.text]}>Latest Movies</Text>
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
                  onPress={() => handleTrendingPress(item)}
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
  secondContainer: {
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },

  TrendingContainer: {
    width: '90%',
    marginLeft: 10,
    marginBottom: 20,
    padding: 5,
    gap: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  latestContainer: {
    width: '90%',
    marginLeft: 10,
    marginBottom: 20,
    borderTopColor: 'white',
    borderTopWidth: 1,
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
