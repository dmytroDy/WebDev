
(function () {

    const table = document.getElementsByTagName('table')[0];
    if (!table) {
        alert("Немає таблиці!");
    }
    let rows = table.rows;
    const len = rows.length;
    const colIdx = 3; // колонка з макс температурою
    let maxTemp = parseFloat(rows[1].cells[colIdx].textContent);
    let maxTempDate = rows[1].cells[colIdx-1].textContent;

    for (let rowIdx = 2; rowIdx < len; ++rowIdx) {

        const value = parseFloat(rows[rowIdx].cells[colIdx].textContent);
        if (maxTemp < value) {
            maxTemp = value;
            maxTempDate = rows[rowIdx].cells[colIdx-1].textContent;
        }
    }

    alert("Максимальне значення температури: " + maxTemp +
          "\nДата: " + maxTempDate);
}) ();