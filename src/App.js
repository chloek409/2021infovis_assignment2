import React from "react";
import movies from "./data/movie.json";
import MainPlot from "./components/MainPlot";
import "./App.css";


function App() {

  const name = "Sohyun Kim"
  const studentNum = "2021-25515"

  const nominal = ["genre", "creative_type", "source"];
  const ordinal = ["release", "rating"];
  const quantitative = ["budget", "us_gross", "worldwide_gross", "rotten_rating", "imdb_rating", "imdb_votes"];
  
  const width = 500;
  const height = 350;
  const margin = 35;
  const pointSize = 3;
  const maxPointSize = 10;

  return (
    <div className="App">
      <div style={{display: "flex"}}>
        <h1 style={{marginRight: 10}}>
        {"Assignment #2 /"}
        </h1>
        <h2 style={{marginTop: 25}}>
          {name + " (" + studentNum + ")"}
        </h2>
      </div>
      <div>
        <MainPlot
          data={movies}
          width={width}
          height={height}
          margin={margin}
          nominal={nominal}
          ordinal={ordinal}
          quantitative={quantitative}
          pointSize={pointSize}
          maxPointSize={maxPointSize}
        />
      </div>
    </div>
  );
}

export default App;
