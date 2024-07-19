import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

export default function Carousel() {
  const [conferences, setConferences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await fetch("http://localhost:4555/conferences");
        if (!response.ok) {
          throw new Error(`Erreur ${response.statusText}`);
        }
        const data = await response.json();
        setConferences(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des conférences", error);
      }
    };

    fetchConferences();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(conferences.length - 1, 0) : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === Math.max(conferences.length - 1, 0) ? 0 : prevIndex + 1));
  };

  const itemWidth = 100 / Math.min(conferences.length, 3);

  return (
    <div className="relative w-full">
      <div className="flex overflow-hidden">
        {conferences.length > 0 ? (
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * itemWidth}%)`,
              width: `${Math.max(conferences.length, 3) * itemWidth}%`, // Assurer une largeur constante
            }}
          >
            {conferences.map((conference, index) => (
              <Link
                key={index}
                to={`details/${conference.id}`}
                className="w-1/3 flex-shrink-0 p-4 box-border duration-150 hover:scale-110"
                style={{ width: `${itemWidth}%` }}
              >
                <div>
                  <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 h-80">
                    <img src={conference.img} alt={conference.title} className="absolute inset-0 -z-10 h-full w-full object-cover" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                    <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

                    <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                      <time dateTime={conference.date} className="mr-8">
                        {formatDate(conference.date, "dd/MM/yyyy")}
                      </time>
                      <div className="-ml-4 flex items-center gap-x-4">
                        <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                          <circle cx="1" cy="1" r="1" />
                        </svg>
                        <div className="flex gap-x-2.5">{conference.osMap.city}</div>
                      </div>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                      <span className="absolute inset-0"></span>
                      {conference.title}
                    </h3>
                  </article>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>Aucune conférence n'est prévue pour le moment</p>
        )}
      </div>
      {conferences.length > 1 && (
        <>
          <button onClick={handlePrev} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2" aria-label="Previous">
            ❮
          </button>
          <button onClick={handleNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2" aria-label="Next">
            ❯
          </button>
        </>
      )}
    </div>
  );
}
