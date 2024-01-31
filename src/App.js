import { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setCountries(data))
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError(err);
      });
  }, []);

  const cardStyle = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div style={containerStyle}>
      {countries.map((country) => (
        <div key={country.cca3} style={cardStyle}>
          {country.flags && country.flags.png && (
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={imageStyle}
            />
          )}
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </div>
  );
};

export default App;
