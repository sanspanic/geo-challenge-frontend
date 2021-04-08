import React, { useState, useEffect } from "react";
import GameContext from "./GameContext";
import GeoApi from "../API/geoAPI";
import axios from "axios";
import geoApi from "../API/geoAPI";

const GameContextProvider = ({ children }) => {
  const [level, setLevel] = useState({ num: 1, title: "Guess The Flag" });
  const [score, setScore] = useState(0);
  const [countries, setCountries] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const getCountryData = async () => {
      try {
        const res = await geoApi.getData();
        setCountries(res);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    console.log("getting country data from API");
    getCountryData();
  }, []);

  return (
    <GameContext.Provider
      value={{
        level,
        setLevel,
        score,
        setScore,
        countries,
        setCountries,
        hasLoaded,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
