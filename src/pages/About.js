import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom"

const fruitList = ["Pineapple", "Peach", "Apple", "Watermelon", "Melon", "Guava", "Banana", "Orange", "Grape", "Kiwi", "Blueberry", "Blackberry", "Pear", "Tangerine", "Plum", "Mango", "Date", "Cantaloupe", "Strawberry", "Coconut"]

const About = () => {
  const location = useLocation();
  const history = useHistory();
  const [arrFav, setArrFav] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!location.state) {
      history.push({ pathname: "/home" })
      alert("need to login")
      return;
    }
    const items = JSON.parse(localStorage.getItem(location.state.user));
    setUser(location.state.user);
    if (items) {
      setArrFav(items);
      return;
    }
    setArrFav([]);
  }, []);

  const addFavorite = (fruit) => {
    var temp = arrFav.slice();
    temp.push(fruit)
    setArrFav(temp);

    localStorage.setItem(user, JSON.stringify(temp));
  }

  const reset = () => {
    setArrFav([]);
    localStorage.setItem(user, JSON.stringify([]));
  }

  const removeFavorite = (fruit) => {
    var index = arrFav.indexOf(fruit);
    if (index !== -1) {
      arrFav.splice(index, 1);
    }
    // set new array reference to rerender 
    var temp = arrFav.slice();
    setArrFav(temp);
    localStorage.setItem(user, JSON.stringify(temp));
  }

  function FruitCard(props) {
    return (
      <Grid container item xs={3}>
        <Grid item xs={9}>
          {props.fruit}
        </Grid>
        <Grid item xs={3}>
          <button onClick={e => props.onClick(props.fruit)}>
            {props.type === "remove" ? "X" : "+"}
          </button>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container direction="column">
      <Typography variant="h1" component="h2">
        {user}'s Favorite Fruit
      </Typography>

      <Grid container item spacing={2}>
        <Grid container item xs={12}>
          {fruitList.sort().map((fruit) =>
            arrFav.includes(fruit) ?
              null
              :
              <FruitCard fruit={fruit} onClick={addFavorite} key={"fruitCard" + fruit + "add"} />
          )}
        </Grid>

        <Grid item >
          <Button onClick={e => reset()} color={"primary"} variant="contained">Reset pallate</Button>
        </Grid>

        <Grid container item xs={12} >
          {arrFav.sort().map((fruit) =>
            <FruitCard fruit={fruit} onClick={removeFavorite} type={"remove"} key={"fruitCard" + fruit + "remove"} />
          )}
        </Grid>

        <Grid item >
          <Button onClick={e => history.push({ pathname: "/home" })} color={"primary"} variant="contained">Logout</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default About;
