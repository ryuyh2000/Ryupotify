import React from "react";
import axios from "axios";

function App() {
  const [token, setToken] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [preview, setPreview] = React.useState("");

  const clientId = "587c21b835d544f9b957c58c7616f73e";
  const clientSecret = "5d15fe5efd2441e88a6a675b9913faeb";

  React.useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
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
