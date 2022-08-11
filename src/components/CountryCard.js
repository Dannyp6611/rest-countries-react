import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

const fade = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { ease: 'easeOut', duration: 0.5 },
  },
};

const CountryCard = ({ country }) => {
  const controls = useAnimation();
  const [element, view] = useInView({ threshold: 0.2 });

  if (view) {
    controls.start('show');
  } else {
    controls.start('hidden');
  }

  return (
    <motion.div
      variants={fade}
      animate={controls}
      initial="hidden"
      ref={element}
    >
      <Link
        to={`/countries/${country.name.official}`}
        className="rounded-div overflow-hidden bg-secondary w-[300px] md:w-full h-[350px] flex flex-col transform hover:scale-105 duration-100"
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
    </motion.div>
  );
};

export default CountryCard;
