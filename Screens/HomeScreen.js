import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrendingCards from '../component/TrendingCards';
import SearchBar from '../component/SearchBar';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import MovieCard from '../component/MovieCard';
import {useLatestMovies} from '../services/api';
import {useAuth} from '../context/authContext';
import auth from '@react-native-firebase/auth';
import Carousel from 'react-native-reanimated-carousel';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {getusersearch} = useAuth();
  const [hist, setHist] = useState([]);
  const [Loading, setLoading] = useState(false);

  const uid = auth().currentUser?.uid;
  console.log(uid);

  const handlePress = () => {
    navigation.navigate('Search');
  };

  const {movies, loading, fetchLatestMovies} = useLatestMovies();

  useEffect(() => {
    fetchLatestMovies();
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
  }, [uid]);
  console.log('This is hist name', hist[0]?.url);

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
              <View>
                <FlatList
                  data={hist}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => (
                    <TrendingCards url={item.url} name={item.movieTitle} />
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{paddingHorizontal: 10}}
                  style={{height: 200}}
                />
              </View>
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
    marginBottom: 10,
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
