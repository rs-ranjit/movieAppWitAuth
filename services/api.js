import axios from 'axios';
import React, {useState, useEffect} from 'react';

const api =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTA5ODFiYjkxNmNmOWJhODc5OTgzZGIwYjVhMjI1MiIsIm5iZiI6MTc0MjUzMjQzMi44MzcsInN1YiI6IjY3ZGNlZjUwMzM4ZTc3NzgzZmY1M2U2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ADhYIxsOeB9KtfGlmmx82RAv2E3SQRzXTUd1aS83jrg';
const base_url = 'https://api.themoviedb.org/3/';

export const useLatestMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLatestMovies = async () => {
    const endpoint = `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
    const options = {
      method: 'GET',
      url: `${base_url}${endpoint}`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${api}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setMovies(response?.data?.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error.message);
      throw new Error('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  return {movies, loading, fetchLatestMovies};
};

export const useSearchMovies = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const searchMovies = async query => {
    if (!query || query.trim() === '') {
      setMovies([]);
      return;
    }

    const options = {
      method: 'GET',
      url: `${base_url}/search/movie`,
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${api}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setMovies(response?.data?.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return {movies, loading, searchMovies};
};

export const useMovieTrailer = movieId => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        headers: {
          Authorization: `Bearer ${api}`,
          accept: 'application/json',
        },
      };

      try {
        const res = await axios.request(options);
        const trailer = res.data.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube',
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);
  // if (loading) return <ActivityIndicator size="large" />;
  // if (!trailerKey) return <Text>No trailer available</Text>;
  return {trailerKey, loading};
};

export const useMovieDetails = movieId => {
  const [movieDetail, setMovieDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const movieDetails = async () => {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${api}`,
        },
      };
      try {
        setLoading(true);
        const req = await axios.request(options);
        setMovieDetail(req?.data);
      } catch (e) {
        console.log('Error fetching movies Details:', e.message);
        throw new Error('Failed to fetch details');
      } finally {
        setLoading(false);
      }
    };
    if (movieId) {
      movieDetails();
    }
  }, [movieId]);

  return {movieDetail, loading};
};
