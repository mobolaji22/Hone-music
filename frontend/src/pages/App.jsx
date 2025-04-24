// import { useState } from 'react'
import "../App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
          <p>i am home - Main Content Area</p>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
