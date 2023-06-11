import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "../util/axiosInstance";

const Details = () => {
  const [category, setCategory] = useState(null);

  let { genrename } = useParams();

  useEffect(() => {
    console.log("musicalGenre", genrename);
    fetchCategory(genrename);
    // setCategory(musicalGenre[genrename]);
  }, [genrename]);

  const [artist, setArtist] = useState([]);
  const fetchCategory = async (categoryId) => {
    try {
      const response = await axios.get(`/api/song/byGener/${categoryId}`);
      setCategory(response.data);
      const resArrayArtist = response.data
        .map((element) => element.artists)
        .filter((element) => element !== null).filter((value, index, self) =>
        index === self.findIndex((t) => (
          t._id === value._id 
        )));
      setArtist(resArrayArtist);
      console.log(resArrayArtist);
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
          </li>
        ))}
      </ul>
      <h2>Songs:</h2>
      <ul>
        {category?.map((song) => (
          <li key={song._id}>
            {song.title}-{song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
