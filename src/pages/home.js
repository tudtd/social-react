import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Scream from "../components/Scream";

const Home = () => {
  const [screams, setScreams] = useState(null);

  useEffect(() => {
    axios.get("/screams").then((res) => {
      setScreams(res.data);
    }, console.error);
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        Profile
      </Grid>
      <Grid item xs={12} sm={8}>
        {screams ? (
          screams.map((scream) => {
            return <Scream key={scream.screamId} {...scream} />;
          })
        ) : (
          <p>Loading...</p>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
