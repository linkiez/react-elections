import { useState, useEffect } from "react";

import Header from "../components/Header";
import Main from "../components/Main";
import Select from "../components/Select";

import {
  getCities,
  getElections,
  getCandidates,
} from "../services/httpService";

export default function ElectionsPage() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [elections, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    async function getAllCities() {
      const allCities = await getCities();
      setCities(allCities);
    }
    getAllCities();

    async function getAllElections() {
      const allElections = await getElections();
      setElections(allElections);
    }
    getAllElections();

    async function getAllCandidates() {
      const allCandidates = await getCandidates();
      setCandidates(allCandidates);
    }
    getAllCandidates();
  }, []);

  function handleSelectCity (event){
    setSelectedCity(event);
    console.log(event);
    
  }

  return (
    <div>
      <Header />

      <Main>
        <Select
          cities={cities}
          selectedCity={selectedCity}
          setSelectedCity={handleSelectCity}
        />

        <div className="text-center border-2 rounded">
          <h1 className="font-semibold">
            Eleições em {selectedCity?.name ?? "Cidade"}
          </h1>

        </div>
      </Main>
    </div>
  );
}
