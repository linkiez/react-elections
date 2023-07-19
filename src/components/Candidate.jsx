export default function Candidate({ election }) {
  return (
    <div className="flex flex-row m-4 p-4 border ">
      <div className="">
        <p>Candidato: {election.candidate.name}</p>
        <p>Votos: {election.votes}</p>
        <p>Porcentagem: {(election.percentage()*100).toFixed(2)}%</p>
        <p>Status: {election.status()}</p>
      </div>
    </div>
  );
}
