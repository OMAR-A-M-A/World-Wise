import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner></Spinner>;
  if (cities.length === 0)
    return (
      <Message message="Add your city by clicking on a city on the map"></Message>
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem countryObj={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
