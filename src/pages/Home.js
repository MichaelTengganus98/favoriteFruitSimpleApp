import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom"
import { users } from "../API/User"
import axios from "axios";

const Home = () => {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const onSubmit = async () => {
    const selectedUser = users.filter(e => { return e.username === user });
    if (selectedUser.length > 0 && selectedUser[0].password === pass) {
      history.push({ pathname: "/about", state: { user } })
      return;
    }

    alert("incorrect user or password")
  }

  return (
    <Grid container width={"50vw"} style={{ textAlign: "Center" }} spacing={1}>
      <Grid item xs={12}>
        <Typography>
          Favorite Fruit App
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="outlined-name"
          label="User"
          placeholder="username"
          value={user}
          onChange={e => setUser(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} >
        <TextField
          id="outlined-name"
          label="Pass"
          placeholder="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={onSubmit} color={"primary"} variant="contained">Submit</Button>
      </Grid>
    </Grid >
  );
};

export default Home;
