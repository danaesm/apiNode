import express from "express";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library'
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola mundo :)");
});

app.get("/books", async (req, res) => {
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM books');
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al leer los datos.");
    }
});

app.get("/books/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if (!isNaN(id)) {
        try {
            const [rows, fields] = await connection.execute('SELECT * FROM books WHERE id = ?', [id]);

            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({message: "Libro no encontrado"});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Error al buscar el libro.");
        }
    } else {
        res.status(400).json({message: "ID de libro no válido"});
    }
});


app.post("/books", async (req, res) => {
    const body = req.body;

    try {
       
        if (body.author && body.isbn && body.release_date && body.title && body.user_id) {
           
            const [result] = await connection.execute(
                'INSERT INTO books (author, isbn, release_date, title, user_id) VALUES (?, ?, ?, ?, ?)',
                [body.author, body.isbn, body.release_date, body.title, body.user_id]
            );

            const newBookId = result.insertId;

            res.json({ message: "Libro agregado", bookId: newBookId });
        } else {
            res.status(400).json({ message: "Faltan valores obligatorios para agregar el libro." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al agregar el libro." });
    }
});


app.put("/books/:id", async (req, res) => {
    const body = req.body;
    const id = parseInt(req.params.id);

    if (!isNaN(id)) {
        try {
            const [rows, fields] = await connection.execute('SELECT * FROM books WHERE id = ?', [id]);

            if (rows.length > 0) {
                const [result] = await connection.execute(
                    'UPDATE books SET author=?, isbn=?, release_date=?, title=?, user_id=? WHERE id=?',
                    [body.author, body.isbn, body.release_date, body.title, body.user_id, id]
                );

                res.json({ message: "Se editó el libro", bookId: id });
            } else {
                res.status(404).json({ message: "Libro no encontrado" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Error al buscar o editar el libro.");
        }
    } else {
        res.status(400).json({ message: "ID de libro no válido" });
    }
});


app.delete("/books/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if (!isNaN(id)) {
        try {
            const [result] = await connection.execute(
                'DELETE FROM books WHERE id=?',
                [id]
            );

            if (result.affectedRows > 0) {
                res.json({ message: "Se eliminó el libro", bookId: id });
            } else {
                res.status(404).json({ message: "Libro no encontrado" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Error al eliminar el libro.");
        }
    } else {
        res.status(400).json({ message: "ID de libro no válido" });
    }
});



app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000");
});