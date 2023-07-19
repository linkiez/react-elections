import { useState, useEffect } from "react";

import Header from "../components/Header";
import Main from "../components/Main";
import Select from "../components/Select";

import {
  getCities,
  getElections,
  getCandidates,
} from "../services/httpService";
import Candidate from "../components/Candidate";

export default function ElectionsPage() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [elections, setElections] = useState([]);
  const [filteredElections, setFilteredElections] = useState([]);
  const [electionsCandidatesAndCity, setElectionsCandidatesAndCity] = useState(
    []
  );
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

  useEffect(() => {
    if (selectedCity) {
      const filteredElections = elections.filter(
        (election) => election.cityId === selectedCity
      );
      setFilteredElections(filteredElections);
    }
  }, [selectedCity, elections]);

  useEffect(() => {
    if (filteredElections.length > 0) {
      let addElectionsCandidatesAndCity = filteredElections.map((election) => {
        return {
          id: election.id,
          votes: election.votes,
          candidate: candidates.find(
            (candidate) => candidate.id === election.candidateId
          ),
          city: cities.find((city) => city.id === election.cityId),
          percentage: function () {
            return this.votes / this.city.presence;
          },
          status: function () {
            const maisVotado = filteredElections.reduce((acc, cur) => {
              if (acc.votes > cur.votes) {
                return acc;
              } else {
                return cur;
              }
            });
            return maisVotado.votes === this.votes ? "Eleito" : "Não eleito";
          },
        };
      });

      setElectionsCandidatesAndCity(addElectionsCandidatesAndCity);
    }
  }, [filteredElections, candidates, cities]);

  function handleSelectCity(eventValue) {
    setSelectedCity(eventValue);
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
            Eleições em {selectedCity?.name || "Cidade"}
          </h1>
        </div>
        <div className="flex flex-row flex-wrap">
          {electionsCandidatesAndCity.map((election) => (
            <Candidate key={election.id} election={election}/>
          ))}
        </div>
      </Main>
    </div>
  );
}
