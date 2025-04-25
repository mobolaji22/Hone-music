import { Routes, Route } from "react-router-dom";
import "../App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeScreen from "./HomeScreen";
import PlaylistView from "./PlaylistView"; // Assuming this exists
import SearchPage from "./SearchPage"; // Assuming this exists
import LibraryPage from "./LibraryPage"; // Assuming this exists
import SettingsPage from "./SettingsPage"; // Assuming this exists

function App() {
  return (
    <>
      <div className="motion-bubbles">
        {/* Generate multiple bubble divs */}
        {[...Array(7)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/playlist/:id" element={<PlaylistView />} /> {/* Example route */} 
            <Route path="/search" element={<SearchPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* Add other routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
