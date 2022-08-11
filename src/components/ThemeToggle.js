import { ThemeContext } from '../context/ThemeContext';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useContext } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      {theme === 'dark' ? (
        <div
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex gap-x-2 items-center cursor-pointer"
        >
          <BsFillSunFill />
          <span>Light Mode</span>
        </div>
      ) : (
        <div
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex gap-x-2 items-center cursor-pointer"
        >
          <BsFillMoonFill />
          <span>Dark Mode</span>
        </div>
      )}
    </>
  );
};

export default ThemeToggle;
