import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <footer className="bg-gray-200 text-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
        <p>
          <Link to="/">ConfApp</Link> - Développé par <Link to="https://romain-gilot.fr/">Romain GILOT</Link> - Metz Numeric School
        </p>
      </div>
    </footer>
  );
}
