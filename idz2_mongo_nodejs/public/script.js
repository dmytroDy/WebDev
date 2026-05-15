document.addEventListener('DOMContentLoaded', () => {
    const cpuSel = document.getElementById('cpu_sel');
    const softSel = document.getElementById('soft_sel');
    const resultsContainer = document.getElementById('local_results');
    const expiredBtnCache = document.getElementById('btn_cache_expired');

    async function init() {
        try {
            const response = await fetch('/api/start');
            const { cpus, softs } = await response.json();

            cpus.forEach(cpu => {
                cpuSel.innerHTML += `<option value="${cpu}">${cpu}</option>`;
            });

            softs.forEach(soft => {
                softSel.innerHTML += `<option value="${soft}">${soft}</option>`;
            });
        } catch (err) {
            console.error("Помилка ініціалізації:", err);
        }
    }

    function renderResults(data, title) {
        resultsContainer.style.display = 'block';
        let html = `<h2>${title}</h2>`;

        if (!data || data.length === 0) {
            html += `<p>Нічого не знайдено.</p>`;
            resultsContainer.innerHTML = html;
            return;
        }

        data.forEach(pc => {
            html += `<div class="pc-item">
                        <h3>Inv. number: ${pc.inv_num}</h3>`;
            for (let key in pc) {
                if (key === 'inv_num') continue;
                html += `<div class="info-row">
                            <span class="label">${key}:</span>
                            <span>${pc[key]}</span>
                         </div>`;
            }
            html += `</div>`;
        });
        resultsContainer.innerHTML = html;
    }

    async function fetchData(type, value) {
        try {
            const response = await fetch(`/api/computers?type=${type}&value=${encodeURIComponent(value || '')}`);
            const data = await response.json();
            
            const storageKey = type === 'expired' ? 'expired_computers' : value;
            localStorage.setItem(storageKey, JSON.stringify(data));

            renderResults(data, `Результати запиту: ${value || 'Вичерпана гарантія'}`);
        } catch (err) {
            alert("Помилка завантаження даних");
        }
    }


    document.querySelector('#cpu-info_form').addEventListener('submit', (e) => {
        e.preventDefault();
        fetchData('cpu', cpuSel.value);
    });

    document.querySelector('#software-info_form').addEventListener('submit', (e) => {
        e.preventDefault();
        fetchData('software', softSel.value);
    });

    document.querySelector('#expired-info_form').addEventListener('submit', (e) => {
        e.preventDefault();
        fetchData('expired', '');
    });


    expiredBtnCache.addEventListener('click', () => {
        const cached = localStorage.getItem('expired_computers');
        const data = JSON.parse(cached);
        renderResults(data, "Дані з кешу: Вичерпана гарантія");
    });

    cpuSel.addEventListener('change', (e) => {
        const val = e.target.value;
        const cached = localStorage.getItem(val);
        renderResults(JSON.parse(cached), `Кеш: Процесор ${val}`);
    });

    softSel.addEventListener('change', (e) => {
        const val = e.target.value;
        const cached = localStorage.getItem(val);
        renderResults(JSON.parse(cached), `Кеш: ПЗ ${val}`);
    });

    init();
});