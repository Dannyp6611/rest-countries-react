import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <Link
      to={`/countries/${country.name.official}`}
      className="rounded-div overflow-hidden bg-secondary w-[300px] md:w-full flex flex-col transform hover:scale-105 duration-100"
    >
      <div className="w-full overflow-hidden">
        <img
          src={country?.flags.svg}
          className="h-[200px] w-full object-cover"
          alt={country.name.common}
        />
      </div>
      <div className="text-primary bg-secondary p-8 flex-1">
        <h2 className="font-bold mb-4 text-lg">{country.name.official}</h2>
        <ul className="flex flex-col gap-y-2">
          <li className="flex gap-x-2">
            <span className="font-semibold">Population:</span>
            <p>{country.population.toLocaleString()}</p>
          </li>
          <li className="flex gap-x-2">
            <span className="font-semibold">Region:</span>
            <p>{country.region}</p>
          </li>
          <li className="flex gap-x-2">
            <span className="font-semibold">Capital:</span>
            <p>{country.capital}</p>
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default CountryCard;
