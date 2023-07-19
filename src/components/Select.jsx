export default function Select({ cities =[], selectedCity= '', setSelectedCity = null}) {
    return (
        <div className="text-center">
        <h1>Escolha o municipio</h1>
        <select
            className="shadow-lg border-2 border-gray-200 rounded-md"
            value={selectedCity}
            onChange={(event) => setSelectedCity(event)}
        >
            {cities.map((city) => (
            <option key={city.id} value={city}>
                {city.name}
            </option>
            ))}
        </select>
        </div>
    );
    }
