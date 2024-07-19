import React, { useState } from "react";
import LayoutPage from "../../../shared/LayoutPage";
import TitlePage from "../../../shared/TitlePage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export default function ConferenceManagerCreate() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    img: "",
    content: "",
    addressl1: "",
    addressl2: "",
    city: "",
    postalCode: "",
    coordinates: [],
    mainColor: "#000000",
    secondColor: "#000000",
    speakers: [],
    stakeholders: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, date }));
  };

  const handleSpeakerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSpeakers = [...formData.speakers];
    updatedSpeakers[index] = { ...updatedSpeakers[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, speakers: updatedSpeakers }));
  };

  const addSpeaker = () => {
    setFormData((prevData) => ({
      ...prevData,
      speakers: [...prevData.speakers, { firstname: "", lastname: "" }],
    }));
  };

  const removeSpeaker = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      speakers: prevData.speakers.filter((_, i) => i !== index),
    }));
  };

  const handleStakeholderChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStakeholders = [...formData.stakeholders];
    updatedStakeholders[index] = { ...updatedStakeholders[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, stakeholders: updatedStakeholders }));
  };

  const addStakeholder = () => {
    setFormData((prevData) => ({
      ...prevData,
      stakeholders: [...prevData.stakeholders, { firstname: "", lastname: "", job: "", img: "" }],
    }));
  };

  const removeStakeholder = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      stakeholders: prevData.stakeholders.filter((_, i) => i !== index),
    }));
  };

  const createConference = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:4555/conference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          date: formData.date.toISOString(),
          img: formData.img,
          content: formData.content,
          osMap: {
            addressl1: formData.addressl1,
            addressl2: formData.addressl2,
            city: formData.city,
            postalCode: formData.postalCode,
            coordinates: formData.coordinates,
          },
          design: {
            mainColor: formData.mainColor,
            secondColor: formData.secondColor,
          },
          speakers: formData.speakers,
          stakeholders: formData.stakeholders,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.statusText}`);
      }

      const data = await response.json();
      navigate("/conference-manager");
    } catch (error) {
      console.error("Erreur lors de la création de la conférence:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createConference();
  };

  return (
    <LayoutPage>
      <TitlePage title="Création d'une conférence" />
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Titre</label>
            <input
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              required
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              dateFormat="Pp"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
            <input
              name="img"
              type="text"
              value={formData.img}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Contenu</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Adresse 1</label>
            <input
              name="addressl1"
              type="text"
              required
              value={formData.addressl1}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Adresse 2</label>
            <input
              name="addressl2"
              type="text"
              value={formData.addressl2}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Ville</label>
            <input
              name="city"
              type="text"
              required
              value={formData.city}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Code Postal</label>
            <input
              name="postalCode"
              type="text"
              value={formData.postalCode}
              required
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Coordonnées</label>
            <input
              name="coordinates"
              type="text"
              value={formData.coordinates.join(", ")}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  coordinates: e.target.value.split(", ").map(Number),
                }))
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Couleur Principale</label>
            <input
              name="mainColor"
              type="color"
              value={formData.mainColor}
              required
              onChange={handleChange}
              className="shadow appearance-none border rounded w-[50px] h-[50px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Deuxième Couleur</label>
            <input
              name="secondColor"
              type="color"
              value={formData.secondColor}
              required
              onChange={handleChange}
              className="shadow appearance-none border rounded w-[50px] h-[50px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-x-5">
              <h2 className="text-xl font-bold mb-2">Intervenants</h2>
              <button type="button" onClick={addSpeaker} className="bg-blue-500 text-sm text-white p-2 rounded">
                +
              </button>
            </div>
            {formData.speakers.map((speaker, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Intervenant n°{index + 1}</label>
                <div className="flex gap-x-5">
                  <input
                    name="firstname"
                    type="text"
                    value={speaker.firstname}
                    onChange={(e) => handleSpeakerChange(index, e)}
                    placeholder="Prénom"
                    className="shadow appearance-none border rounded w-1/6 h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <input
                    name="lastname"
                    type="text"
                    value={speaker.lastname}
                    onChange={(e) => handleSpeakerChange(index, e)}
                    placeholder="Nom"
                    className="shadow appearance-none border rounded w-1/6 h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />

                  <button type="button" onClick={() => removeSpeaker(index)} className="h-full bg-red-500 text-white py-1 px-3 rounded">
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-x-5">
              <h2 className="text-xl font-bold mb-2">Parties Prenantes</h2>
              <button type="button" onClick={addStakeholder} className="bg-blue-500 text-sm text-white p-2 rounded">
                +
              </button>
            </div>
            {formData.stakeholders.map((stakeholder, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Partie Prenante n°{index + 1}</label>
                <div className="flex gap-x-5">
                  <input
                    name="firstname"
                    type="text"
                    value={stakeholder.firstname}
                    onChange={(e) => handleStakeholderChange(index, e)}
                    placeholder="Prénom"
                    className=" h-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <input
                    name="lastname"
                    type="text"
                    value={stakeholder.lastname}
                    onChange={(e) => handleStakeholderChange(index, e)}
                    placeholder="Nom"
                    className=" h-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <input
                    name="job"
                    type="text"
                    value={stakeholder.job}
                    onChange={(e) => handleStakeholderChange(index, e)}
                    placeholder="Fonction"
                    className=" h-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <input
                    name="img"
                    type="text"
                    value={stakeholder.img}
                    onChange={(e) => handleStakeholderChange(index, e)}
                    placeholder="Image URL"
                    className=" h-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button type="button" onClick={() => removeStakeholder(index)} className="mt-2 bg-red-500 text-white py-1 px-3 rounded">
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded" disabled={isLoading}>
              {isLoading ? "Création..." : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </LayoutPage>
  );
}
