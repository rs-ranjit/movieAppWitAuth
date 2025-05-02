import axios from 'axios';
import {useState} from 'react';

const api =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTA5ODFiYjkxNmNmOWJhODc5OTgzZGIwYjVhMjI1MiIsIm5iZiI6MTc0MjUzMjQzMi44MzcsInN1YiI6IjY3ZGNlZjUwMzM4ZTc3NzgzZmY1M2U2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ADhYIxsOeB9KtfGlmmx82RAv2E3SQRzXTUd1aS83jrg';
const base_url = 'https://api.themoviedb.org/3/';

export const useLatestMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch the latest movies
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
