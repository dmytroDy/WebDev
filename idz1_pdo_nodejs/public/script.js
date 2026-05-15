function renderTable(data, tableBodyId, tableId) {
    const tableBody = document.getElementById(tableBodyId);
    const table = document.getElementById(tableId);
    
    tableBody.innerHTML = ""; 

    data.forEach(lesson => {
        const row = `
            <tr>
                <td>${lesson.week_day}</td>
                <td>${lesson.lesson_number}</td>
                <td>${lesson.auditorium}</td>
                <td>${lesson.disciple}</td>
                <td>${lesson.name}</td>
                <td>${lesson.type}</td>
            </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    table.style.display = "table";
}

async function loadLessons(type, value, tableBodyId, tableId) {
    try {
        const response = await fetch(`/api/lessons?type=${type}&value=${encodeURIComponent(value)}`);
        if (!response.ok) throw new Error('Помилка мережі');
        
        const data = await response.json();
        renderTable(data, tableBodyId, tableId);
    } catch (error) {
        console.error("Не вдалося завантажити розклад:", error);
    }
}

async function init() {
    try {
        const response = await fetch('/api/start'); 
        const { groups, teachers, auditoriums } = await response.json();

        const fillSelect = (id, items, key) => {
            const select = document.getElementById(id);
            items.forEach(item => {
                const val = item[key];
                select.innerHTML += `<option value="${val}">${val}</option>`;
            });
        };

        fillSelect('group_sel', groups, 'title');
        fillSelect('teacher_sel', teachers, 'name');
        fillSelect('auditorium_sel', auditoriums, 'auditorium');

    } catch (error) {
        console.error("Помилка ініціалізації списків:", error);
    }
}

document.getElementById("group_btn").addEventListener("click", () => {
    const val = document.getElementById("group_sel").value;
    loadLessons('group', val, 'table_body_group', 'table_group');
});

document.getElementById("teacher_btn").addEventListener("click", () => {
    const val = document.getElementById("teacher_sel").value;
    loadLessons('teacher', val, 'table_body_teacher', 'table_teacher');
});

document.getElementById("auditorium_btn").addEventListener("click", () => {
    const val = document.getElementById("auditorium_sel").value;
    loadLessons('auditorium', val, 'table_body_auditorium', 'table_auditorium');
});

init();