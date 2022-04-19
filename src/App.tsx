import React from "react";
import axios from "axios";
import { API_KEYS } from "./apiKeys";

function App() {
  const [token, setToken] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [preview, setPreview] = React.useState("");

  React.useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(API_KEYS.clientId + ":" + API_KEYS.clientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);
    });
  }, []);

  const submitSearch = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log("123");
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: search,
          type: "track",
        },
      });
      console.log(data.tracks.items);
      setPreview(data.tracks.items[0].preview_url);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <form onSubmit={submitSearch}>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <button onClick={submitSearch}>submit</button>
      </form>

      <div>asd</div>
      <audio src={preview} autoPlay loop controls id="myAudio"></audio>
    </>
  );
}

export default App;
