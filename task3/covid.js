
document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    document.getElementById('affected-link').addEventListener('click', () => loadAffectedPage());
    document.getElementById('vaccinated-link').addEventListener('click', () => loadVaccinatedPage());
    document.getElementById('neighboring-link').addEventListener('click', () => loadNeighboringPage());

    function loadAffectedPage() {
        content.innerHTML = `
            <div>
                <select id="country-select" class="dropdown"></select>
                <canvas id="affected-chart"></canvas>
            </div>
        `;
        fetchCountries().then(() => {
            document.getElementById('country-select').addEventListener('change', (e) => {
                const country = e.target.value;
                fetchAffectedData(country);
            });
        });
    }

    function loadVaccinatedPage() {
        content.innerHTML = `
            <div>
                <select id="country-select" class="dropdown"></select>
                <canvas id="vaccinated-chart"></canvas>
            </div>
        `;
        fetchCountries().then(() => {
            document.getElementById('country-select').addEventListener('change', (e) => {
                const country = e.target.value;
                fetchVaccinatedData(country);
            });
        });
    }

    function loadNeighboringPage() {
        content.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Cases</th>
                        <th>Deaths</th>
                        <th>Recoveries</th>
                        <th>Vaccinations</th>
                    </tr>
                </thead>
                <tbody id="neighboring-data"></tbody>
            </table>
        `;
        fetchNeighboringData();
    }

    async function fetchCountries() {
        const response = await axios.get('https://disease.sh/v3/covid-19/countries');
        const countries = response.data;

        const countrySelect = document.getElementById('country-select');
        countrySelect.innerHTML = countries.map(country => `<option value="${country.countryInfo.iso2}">${country.country}</option>`).join('');``


    async function fetchAffectedData(country) {
        const response = await axios.get('https://disease.sh/v3/covid-19/historical/${country}?lastdays=30');
        const data = response.data.timeline;
        const labels = Object.keys(data.cases);
        const cases = Object.values(data.cases);
        const deaths = Object.values(data.deaths);
        const recoveries = Object.values(data.recovered);

        const ctx = document.getElementById('affected-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Cases',
                        data: cases,
                        borderColor: 'blue',
                        fill: false
                    },
                    {
                        label: 'Deaths',
                        data: deaths,
                        borderColor: 'red',
                        fill: false
                    },
                    {
                        label: 'Recoveries',
                        data: recoveries,
                        borderColor: 'green',
                        fill: false
                    }
                ]
            }
        });
    }

    async function fetchVaccinatedData(country) {
        const response = await axios.get('https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=30');
        const data = response.data.timeline;
        const labels = Object.keys(data);
        const vaccinated = Object.values(data);

        const ctx = document.getElementById('vaccinated-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Vaccinated',
                        data: vaccinated,
                        borderColor: 'orange',
                        fill: false
                    }
                ]
            }
        });
    }

    async function fetchNeighboringData() {
        const countries = ['India', 'Sri Lanka', 'Bangladesh', 'China', 'Nepal'];
        const neighboringData = document.getElementById('neighboring-data');

        for (const country of countries) {
            const response = await axios.get('https://disease.sh/v3/covid-19/countries/${country}');
            const data = response.data;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.country}</td>
                <td>${data.cases}</td>
                <td>${data.deaths}</td>
                <td>${data.recovered}</td>
                <td>${data.vaccinations}</td>
            `;

            neighboringData.appendChild(row);
        }
    }
    }
}
);
