import axios from 'axios';
import {useEffect, useState} from 'react';

const api =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTA5ODFiYjkxNmNmOWJhODc5OTgzZGIwYjVhMjI1MiIsIm5iZiI6MTc0MjUzMjQzMi44MzcsInN1YiI6IjY3ZGNlZjUwMzM4ZTc3NzgzZmY1M2U2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ADhYIxsOeB9KtfGlmmx82RAv2E3SQRzXTUd1aS83jrg';
const base_url = 'https://api.themoviedb.org/3/';

const useFetch = (query = '') => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchFetchMovies = async () => {
      setLoading(true);
      setError(null);

      const endpoint = query
        ? `search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        : `movie/top_rated?language=en-US&page=1`;

      const options = {
        method: 'GET',
        url: `${base_url}${endpoint}`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${api}`,
        },
      };
      try {
        const reponse = await axios.request(options);
        setMovies(reponse.data.results || []);
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    searchFetchMovies();
  }, [query]);
  return {movies, loading, error};
};

export default useFetch;
