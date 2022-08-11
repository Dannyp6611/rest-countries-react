import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="bg-secondary shadow-custom">
      <div className="flex justify-between items-center max-w-[1400px] px-4 py-6 lg:py-8 mx-auto">
        <Link to="/" reloadDocument>
          <h1 className="text-xl sm:text-2xl md:text-3xl text-primary font-bold">
            Where in the world?
          </h1>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
