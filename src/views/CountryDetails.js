import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { tabTitle } from '../utils/tabTitle';

const CountryDetails = () => {
  const [country, setCountry] = useState(null);
  const [countryBorders, setCountryBorders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { countryName } = useParams();

  tabTitle('Countries | Country Details');

  const fetchingSingleCountry = async () => {
    setCountryBorders([]);
    let newBorders;

    setCountryBorders((prevBorders) => {
      newBorders = [...prevBorders];
      return [];
    });

    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await response.json();
    const borders = data[0].borders;

    borders?.map(async (border) => {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${border}`
      );
      const data = await response.json();

      newBorders.push(data[0].name.common);

      setTimeout(() => {
        setCountryBorders(newBorders);
      }, 100);
    });

    setCountry(data[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchingSingleCountry();
  }, [countryName]);

  const getNativeName = () => {
    const name =
      country?.name.nativeName[
        Object.keys(country.name.nativeName)[
          Object.keys(country.name.nativeName).length - 1
        ]
      ];
    return name.common;
  };

  return (
    <>
      {!isLoading ? (
        <div className="max-w-[1400px] px-6 mx-auto mt-10 lg:mt-20">
          <div className="flex items-center py-4 justify-start mb-10">
            <button
              onClick={() => navigate(-1)}
              className="rounded-md shadow-custom py-2 px-6 text-primary bg-secondary flex items-center gap-x-4"
            >
              <BsArrowLeft className="text-primary" size={20} />
              Back
            </button>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex-1 max-w-[700px]">
              <img
                className="w-full object-contain"
                src={country?.flags.svg}
                alt={country?.name.common}
              />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-primary text-2xl font-bold mb-4">
                {country?.name.common}
              </h2>
              <div className="flex flex-col xl:flex-row gap-x-10">
                <ul className="flex flex-col">
                  <li className="flex">
                    <span className="font-semibold mr-2">Native Name:</span>
                    <p>{getNativeName()}</p>
                    {/* <p>{country?.name.nativeName.tuk.official}</p> */}
                  </li>
                  <li className="flex">
                    <span className="font-semibold mr-2">Population:</span>
                    <p>{country?.population.toLocaleString()}</p>
                  </li>
                  <li className="flex">
                    <span className="font-semibold mr-2">Region:</span>
                    <p>{country?.region}</p>
                  </li>
                  <li className="flex">
                    <span className="font-semibold mr-2">Sub Region:</span>
                    <p>{country?.subregion}</p>
                  </li>
                  <li className="flex">
                    <span className="font-semibold mr-2">Capital:</span>
                    <p>{country?.capital}</p>
                  </li>
                </ul>
                <ul className="flex flex-col gap-y-2">
                  <li className="flex">
                    <span className="font-semibold mr-2">
                      Top Level Domain:
                    </span>
                    <p>{country?.tld[0]}</p>
                  </li>
                  <li className="flex">
                    <span className="font-semibold mr-2">Currencies:</span>
                    <div className="flex gap-x-1">
                      {Object.keys(country?.currencies)
                        .map((key) => country.currencies[key].name)
                        .join(', ')}
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-semibold mr-2">Languages:</span>
                    <div className="flex gap-x-1">
                      {Object.keys(country?.languages)
                        .map((key) => country.languages[key])
                        .join(', ')}
                    </div>
                  </li>
                </ul>
              </div>
              {countryBorders.length > 0 ? (
                <div className="mt-6">
                  <h2 className="font-bold mb-2">Border Countries:</h2>
                  <div className="flex gap-4 flex-wrap">
                    {countryBorders?.map((border, idx) => (
                      <Link
                        to={`/countries/${border}`}
                        key={idx}
                        className="shadow-custom bg-secondary text-primary px-4 py-1 rounded-sm"
                      >
                        {border}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <p className="max-w-[1400px] px-6 mx-auto mt-10 lg:mt-20 text-center text-3xl">
          Loading...
        </p>
      )}
    </>
  );
};

export default CountryDetails;
