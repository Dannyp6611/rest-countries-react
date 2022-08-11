import { ThemeProvider } from './context/ThemeContext';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import CountryDetails from './views/CountryDetails';
import Header from './components/Header';

function App() {
  return (
    <div className="w-full h-screen bg-primary font-nunito">
      <ThemeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries/:countryName" element={<CountryDetails />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
