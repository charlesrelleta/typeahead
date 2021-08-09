import React, { useState, useEffect } from "react";

const GITHUB_API = "https://api.github.com/users";

const Typeahead = ({ u }) => {
  let [text, setText] = useState("");
  let [searchText, setSearchText] = useState("");
  let [suggestions, setSuggestions] = useState([]);

  const SuggestionSelected = (name) => {
    console.log("asdasds");
    // setText(name);
    // setSuggestions([]);
  };

  const fetchData = async (word) => {
    try {
      const user = await fetch(`${GITHUB_API}/${word}`);
      const profile = await user.json();
      const result = [];
      if (profile.login) {
        result.push(profile);
      }
      setSuggestions(result);
    } catch (err) {
      document.querySelector(".suggestions").value = err;
    }
  };

  const RenderSuggestions = () => {
    if (suggestions.length > 0 && searchText.length > 0) {
      return (
        <div
          style={{
            alignItems: "center",
            border: "2px #000000 solid",
            padding: 10,
          }}
        >
          {suggestions.map((user) => (
            <div key={user.id} onClick={(e) => SuggestionSelected(user.login)}>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <div style={{ flex: 0.2, height: 100 }}>
                  <img
                    style={{ width: 100, height: 100 }}
                    src={user.avatar_url}
                    alt="Avatar"
                  />
                </div>
                <div style={{ flex: 1, height: 100 }}>
                  <p style={{ fontSize: 45 }}>{user.login}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else return null;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        style={{ flex: 1 }}
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          fetchData(e.target.value);
        }}
        placeholder="Search Github User"
      />
      {RenderSuggestions()}
    </div>
  );
};
export default Typeahead;
