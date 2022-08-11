import { AiOutlineSearch } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectFilter, setSelectFilter] = useState('Filter by Region');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
      setFilteredCountries(response.data);
      setLoading(false);
    });
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.official.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  const handleDropdown = (dropdownValue) => {
    if (dropdownValue === 'NO_VALUE') {
      setSelectFilter('Filter by Region');
    } else {
      setSelectFilter(dropdownValue);
    }
    setShowDropdown(false);
  };

  if (loading) {
    return (
      <div className="max-w-[1400px] px-4 mx-auto flex items-center h-full justify-center text-primary text-3xl">
        <h1 className="text-primary">Loading countries...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] p-4 mx-auto">
      {/* Filter Header */}
      <div className="flex justify-between items-end py-10 flex-wrap gap-y-4">
        <div className="rounded-div flex px-4 pl-8 py-2 gap-x-4 md:max-w-[450px] w-full mr-4">
          <AiOutlineSearch className="text-input" size={30} />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            value={searchTerm}
            type="text"
            placeholder="Search for a country..."
            className="flex-1 text-input bg-transparent border-none outline-none text-xl"
          />
        </div>

        {/* Custom Dropdown */}
        <div className="relative flex justify-center items-center w-[200px]">
          <button className="relative w-full flex items-center justify-between bg-secondary rounded-lg shadow-custom focus:outline-none">
            <p className="px-4 py-3" onClick={() => handleDropdown('NO_VALUE')}>
              {selectFilter}
            </p>
            <span
              className="p-2"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <BsChevronDown />
            </span>
            {showDropdown && (
              <div className="absolute top-full min-w-full w-max  mt-1 transition z-20">
                <ul className="text-left shadow-custom rounded-lg overflow-hidden">
                  <li
                    className="px-4 py-1 bg-secondary hover:bg-primary"
                    onClick={() => handleDropdown('NO_VALUE')}
                  >
                    Filter By Region
                  </li>
                  <li
                    className="px-4 py-1 bg-secondary hover:bg-primary"
                    onClick={() => handleDropdown('Africa')}
                  >
                    Africa
                  </li>
                  <li
                    className="px-4 py-1 bg-secondary hover:bg-primary"
                    onClick={() => handleDropdown('Americas')}
                  >
                    America
                  </li>
                  <li
                    className="px-4 py-1 bg-secondary hover:bg-primary"
                    onClick={() => handleDropdown('Asia')}
                  >
                    Asia
                  </li>
                  <li
                    className="px-4 py-1 bg-secondary hover:bg-primary"
                    onClick={() => handleDropdown('Europe')}
                  >
                    Europe
                  </li>
                  <li
                    className="px-4 py-1 bg-secondary hover:bg-primary"
                    onClick={() => handleDropdown('Oceania')}
                  >
                    Oceania
                  </li>
                </ul>
              </div>
            )}
          </button>
        </div>
      </div>
      {/* End of Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center md:justify-items-stretch">
        {filteredCountries.filter((country) => {
          let hasRegion = false;
          if (
            country.region === selectFilter ||
            selectFilter === 'Filter by Region'
          )
            hasRegion = true;
          return hasRegion;
        }).length > 0 ? (
          filteredCountries
            .filter((country) => {
              let hasRegion = false;
              if (
                country.region === selectFilter ||
                selectFilter === 'Filter by Region'
              )
                hasRegion = true;
              return hasRegion;
            })
            .map((country) => (
              <CountryCard key={country.name.common} country={country} />
            ))
        ) : (
          <p className="text-primary text-xl md:text-3xl col-span-full text-center">
            No countries match that search, please refine your search options.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
