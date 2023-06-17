import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../UserContext";

import axios from "../util/axiosInstance";

const Details = () => {
  const { user } = useContext(UserContext);

  const userId = user["user"].userId;
  
  const [category, setCategory] = useState(null);

  let { genrename } = useParams();

  useEffect(() => {
    fetchCategory(genrename);
  }, [genrename]);

  const [artist, setArtist] = useState([]);

  const fetchCategory = async (categoryId) => {
    try {
      const response = await axios.get(`/api/song/byGener/${categoryId}`);
      setCategory(response.data);
      const resArrayArtist = response.data
        .map((element) => element.artists)
        .filter((element) => element !== null)
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t._id === value._id)
        );
      setArtist(resArrayArtist);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSongToFavorites = async (songId) => {
    try {
      //const res = await axios.post("/api/users/signin", data);
      const response = await axios.post(`/api/users/${userId}/favorites/songs/${songId}`
      );
      console.log("added Song to Favorites", response);
      // updateUser state after adding song to favorites
    } catch (error) {
      console.error("Failed to add song to favorites", error);
    }
  };

  const handleAddArtistToFavorites = async (artistId) => {
    try {
      const response = await axios.post(
        `/users/${userId}/favorites/artists/${artistId}`
      );
      // updateUser state after adding artist to favorites
    } catch (error) {
      console.error("Failed to add artist to favorites", error);
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Artists:</h2>
      <ul>
        {artist?.map((artist) => (
          <li key={artist._id}>
            --{artist.firstName}--{artist.artistImage}
            <button onClick={() => handleAddArtistToFavorites(artist._id)}>
              Add to Favorites
            </button>
          </li>
        ))}
      </ul>
      <h2>Songs:</h2>
      <ul>
        {category?.map((song) => (
          <li key={song._id}>
            {song.title}-{song.artist}
            <button onClick={() => handleAddSongToFavorites(song._id)}>
              Add to Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
