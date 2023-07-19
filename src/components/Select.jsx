
export default function Select({ cities =[], selectedCity= '', setSelectedCity = null}) {
    function handleChangeSelectCity(event) {
        if (setSelectedCity)
        setSelectedCity(event.target.value);
    }


    return (
        <div className="text-center">
        <h1>Escolha o municipio</h1>
        <select
            className="shadow-lg border-2 border-gray-200 rounded-md"
            value={selectedCity.id}
            onChange={handleChangeSelectCity}
        >
            {cities.map((city) => (
            <option key={city.id} value={city.id}>
                {city.name}
            </option>
            ))}
        </select>
        </div>
    );
    }
