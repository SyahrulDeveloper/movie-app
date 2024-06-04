import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movieData, setMovieData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTrendingMovieData("movie");
  }, []);

  async function getTrendingMovieData(type) {
    try {
      const apiKey = 'bdba75e9fe7aa2bd0e348f30840e5276';
      let resp = await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=${apiKey}&media_type=movie`);
      console.log(21, resp.data.results);
      setMovieData(resp.data.results);
    } catch (e) {
      console.error(e);
    }
  }

  async function searchMovies(query) {
    try {
      const apiKey = 'bdba75e9fe7aa2bd0e348f30840e5276';
      let resp = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
      console.log(21, resp.data.results);
      setMovieData(resp.data.results);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div className="background_container">
        <div className="button_container">
          <button onClick={() => getTrendingMovieData("movie")}>
            Trending Movies
          </button>
          <button onClick={() => getTrendingMovieData("tv")}>
            Trending TV
          </button>
        </div>
        <div className="search_container">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a movie..."
          />
          <button onClick={() => searchMovies(searchQuery)}>
            Search
          </button>
        </div>
        <div className='flex-container'>
          {movieData.map((item) => (
            <div key={item.id} className="movie_item">
              <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={item.original_title || item.original_name} />
              <div className="movie_name">
                {item.original_title ? item.original_title : item.original_name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
