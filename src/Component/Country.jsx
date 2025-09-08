import React, { useEffect, useState } from "react";
import "./Country.css";

const App = () => {
  const [allData, setAllData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setAllData(data.data);
          setCountries(data.data.map((item) => item.name));
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filteredData =
    selectedCountry === "All" || selectedCountry === ""
      ? allData
      : allData.filter((item) =>
          item.name.toLowerCase().includes(selectedCountry.toLowerCase())
        );

  return (
    <div className="container">
      <h2>Select Country</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search country"
          onChange={(e) => setSelectedCountry(e.target.value)}
        />

        <select
          onChange={(e) => setSelectedCountry(e.target.value)}
          defaultValue=""
        >
          <option value="">All</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
        {filteredData.length === 0 ? (
          <p>No matching country found.</p>
        ) : (
          filteredData.map((countryItem, index) => (
            <div key={index} className="country-box">
              <h3>{countryItem.name}</h3>
              <ul>
                {countryItem.states.map((state, idx) => (
                  <li key={idx}>{state.name}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
