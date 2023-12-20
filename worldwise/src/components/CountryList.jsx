import CountryItem from './CountryItem';
import Spinner from './Spinner';
import Message from './Message';

import styles from './CountryList.module.css';

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );

  const countries = cities.reduce((acc, city) => {
    if (acc.map((el) => el.country).includes(city.country)) {
      return acc;
    }

    return [...acc, { country: city.country, emoji: city.emoji }];
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
