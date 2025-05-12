import React from 'react';
import {useMovieTrailer, useMovieDetails} from '../services/api';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {WebView} from 'react-native-webview';
import LottieView from 'lottie-react-native';
import {useRoute} from '@react-navigation/native';
import GenreCard from '../component/genreCard';

const DetailScreen = () => {
  const route = useRoute();
  const {items} = route.params;

  const {trailerKey, loading} = useMovieTrailer(items?.id);
  const {movieDetail, Loading} = useMovieDetails(items?.id);

  // console.log(movieDetail);

  return (
    <View style={styles.container}>
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
        <View
          style={{
            height: 300,
            width: '100%',
            justifyContent: 'center',
          }}>
          <WebView
            style={{
              flex: 1,
              borderRadius: 12,
              overflow: 'hidden',
            }}
            source={{uri: `https://www.youtube.com/embed/${trailerKey}`}}
            javaScriptEnabled={true}
          />
        </View>
      )}
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
        <View style={styles.secContainer}>
          <View style={{gap: 12}}>
            <Text style={styles.text}>Overview</Text>
            <Text style={styles.txt}>{movieDetail.overview}</Text>
          </View>
          <View style={styles.budgetContainer}>
            <View
              style={{gap: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[styles.text, {fontSize: 20}]}>Budget</Text>
              <Text style={styles.bud}>{movieDetail.budget}</Text>
            </View>
            <View style={{gap: 10}}>
              <Text style={[styles.text, {fontSize: 20}]}>Duration</Text>
              <Text style={styles.bud}>{movieDetail.runtime} mins</Text>
            </View>
            <View style={{gap: 10}}>
              <Text style={[styles.text, {fontSize: 20}]}>Release-Date</Text>
              <Text style={styles.bud}>{movieDetail.release_date}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.text}>Genres</Text>
            <FlatList
              data={movieDetail?.genres}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap: 10, paddingVertical: 10}}
              renderItem={({item}) => <GenreCard genre={item} />}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loaderContainer: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  budgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  lottie: {
    width: 150,
    height: 150,
  },
  secContainer: {
    flex: 1,
    margin: 10,
  },
  text: {
    color: 'white',
    fontWeight: 700,
    fontSize: 30,
  },
  txt: {
    color: 'white',
    fontSize: 18,
  },
  bud: {
    color: 'gold',
    fontSize: 16,
  },
});
