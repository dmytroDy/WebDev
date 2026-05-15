const express = require('express');
const path = require('path');
const dbPromise = require('./db');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/api/lessons', async (req, res) => {
    const { type, value } = req.query;
    let sql = "";

    switch (type) {
        case 'group':
            sql = `
                select distinct l.week_day, l.lesson_number,
                l.auditorium, l.disciple, t.name, l.type
                from \`groups\` as g join \`lesson_groups\` as lg
                on g.id_groups = lg.fid_groups join \`lesson\` as l
                on lg.fid_lesson2 = l.id_lesson join \`lesson_teacher\` as lt
                on lt.fid_lesson1 = l.id_lesson join \`teacher\` as t
                on lt.fid_teacher = t.id_teacher
                where g.title = ?`;
            break;
        
        case 'teacher':
            sql = `
                select distinct l.week_day, l.lesson_number,
                l.auditorium, l.disciple, t.name, l.type
                from \`teacher\` as t join \`lesson_teacher\` as lt
                on t.id_teacher = lt.fid_teacher join \`lesson\` as l
                on lt.fid_lesson1 = l.id_lesson
                where t.name = ?`;
            break;

        case 'auditorium':
            sql = `
                select distinct l.week_day, l.lesson_number,
                l.auditorium, l.disciple, t.name, l.type
                from \`lesson\` as l join \`lesson_teacher\` as lt
                on lt.fid_lesson1 = l.id_lesson join \`teacher\` as t
                on lt.fid_teacher = t.id_teacher
                where auditorium = ?`;
            break;

        default:
            return res.status(400).json({ error: "Unknown type" });
    }

    try {
        const db = await dbPromise;
        const [rows] = await db.execute(sql, [value]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/start', async (req, res) => {
    try {
        const db = await dbPromise;
        const [groups] = await db.execute("select title from `groups` order by title");
        const [teachers] = await db.execute("select name from `teacher` order by name");
        const [auditoriums] = await db.execute("select distinct auditorium from `lesson` order by auditorium");
        
        res.json({ groups, teachers, auditoriums });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено: http://localhost:${PORT}`);
});