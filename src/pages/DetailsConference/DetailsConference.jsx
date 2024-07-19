import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LayoutPage from "../../shared/LayoutPage";
import TitlePage from "../../shared/TitlePage";
import { formatDate } from "../../utils/formatDate";

export default function DetailsConference() {
  const { id } = useParams();
  const [conference, setConference] = useState(null);

  useEffect(() => {
    const fetchConference = async () => {
      try {
        const response = await fetch(`http://localhost:4555/conference/${id}`);
        if (!response.ok) {
          throw new Error(`Erreur ${response.statusText}`);
        }
        const data = await response.json();
        setConference(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la conférence", error);
      }
    };

    fetchConference();
  }, [id]);

  if (!conference) {
    return (
      <LayoutPage>
        <TitlePage title="Détails de la conférence" />
        <p>Chargement...</p>
      </LayoutPage>
    );
  }

  const { img, title, description, date, content, osMap, speakers, stakeholders, design } = conference;

  const position = osMap?.coordinates && osMap.coordinates.length === 2 ? osMap.coordinates : [51.505, -0.09];

  return (
    <LayoutPage>
      <div className="flex">
        <div className="mr-3 flex">
          <div className={`w-3 h-full`} style={{ backgroundColor: design.mainColor || "#000" }}></div>
          <div className={`w-3 h-full`} style={{ backgroundColor: design.secondColor || "#000" }}></div>
        </div>
        <TitlePage title={title} />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-x-3 items-center">
          <div className="h-52 rounded w-2 bg-gray-300"></div>
          <div>
            <div className="mt-10 mb-5">
              <h4 className="text-lg font-bold">Date</h4>
              <p className="text-gray-600 mt-2">{formatDate(date, "dd/MM")}</p>
            </div>

            <div className="mt-5 mb-5">
              <h4 className="text-lg font-bold">Objectif</h4>
              <p className="text-gray-600">{content}</p>
            </div>

            <div className="mt-5 mb-10">
              <h4 className="text-lg font-bold">Description</h4>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <p>Cette conférence est proposée par les intervenants suivants :</p>
          <ul>
            {speakers.map((speaker, index) => (
              <li key={index}>
                {speaker.firstname} {speaker.lastname}
              </li>
            ))}
          </ul>
          <p className="mt-5">Et les parties prenantes suivantes :</p>
          <ul>
            {stakeholders.map((stakeholder, index) => (
              <li key={index}>
                {stakeholder.firstname} {stakeholder.lastname}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 flex flex-wrap">
        <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-4">
          <MapContainer center={position} zoom={20} style={{ height: "300px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                {osMap.addressl1} {osMap.addressl2}, {osMap.city}, {osMap.postalCode}
              </Popup>
            </Marker>
          </MapContainer>
          <div className="mt-4 h-auto bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-bold mb-2">Lieu de la Conférence</h4>
            <p className="text-gray-600">
              <strong>Adresse 1:</strong> {osMap.addressl1 || "Non spécifié"}
            </p>
            <p className="text-gray-600">
              <strong>Adresse 2:</strong> {osMap.addressl2 || "Non spécifié"}
            </p>
            <p className="text-gray-600">
              <strong>Ville:</strong> {osMap.city || "Non spécifié"}
            </p>
            <p className="text-gray-600">
              <strong>Code Postal:</strong> {osMap.postalCode || "Non spécifié"}
            </p>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
}
