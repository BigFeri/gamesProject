require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const app = express();
const sanitizeHtml = require("sanitize-html");
const cors = require("cors");

const pool = require("./config/database.js");
const {
  sendingGet,
  sendingGetError,
  sendingGetById,
  sendingPost,
  sendingPut,
  sendingDelete,
  sendingInfo,
} = require("./config/sending.js");

//#region middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*", //http://localhost:8080
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
//#endregion middlewares

app.get("/games", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = `
    SELECT games.id, games.Name, types.Name Type, categories.Name Category, games.Title FROM games
    INNER JOIN types on games.typeID = types.id
    INNER JOIN categories on games.CategoryID = categories.id
    ORDER by games.id;
    `;
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/games/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = `
    SELECT games.id, games.Name, types.Name Type, types.id typeID, categories.Name Category, categories.id categoryID, games.Title FROM games
    INNER JOIN types on games.typeID = types.id
    INNER JOIN categories on games.CategoryID = categories.id
    WHERE games.id = ?;
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingGetById(res, error, results, id)
    });
    connection.release();
  });
});

app.post("/games", (req, res) => {
  const newR = {
    Name: mySanitizeHtml(req.body.Name),
    typeID: +mySanitizeHtml(req.body.typeID),
    CategoryID: +mySanitizeHtml(req.body.CategoryID),
    Title: mySanitizeHtml(req.body.Title),
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }
    const sql = `
    INSERT INTO games
      (Name, typeID, CategoryID, Title)
      VALUES
      (?, ?, ?, ?)
    `;
    connection.query(
      sql,
      [newR.Name, newR.typeID, newR.CategoryID, newR.Title],
      (error, results, fields) => {
        sendingPost(res, error, results, newR);
      }
    );
    connection.release();
  });
});

app.put("/games/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    Name: mySanitizeHtml(req.body.Name),
    typeID: +mySanitizeHtml(req.body.typeID),
    CategoryID: +mySanitizeHtml(req.body.CategoryID),
    Title: mySanitizeHtml(req.body.Title),
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    UPDATE games SET
    Name = ?,
    typeID = ?,
    CategoryID = ?,
    Title = ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.Name, newR.typeID, newR.CategoryID, newR.Title, id],
      (error, results, fields) => {
        sendingPut(res, error, results, id, newR)
      }
    );
    connection.release();
  });
});

app.delete("/games/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
      DELETE from games
      WHERE id = ?
     `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingDelete(res, error, results, id)
    });
    connection.release();
  });
});

app.get("/types", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = `
    SELECT * FROM types;
    `;
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/categories", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = `
    SELECT * FROM categories;
    `;
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

function mySanitizeHtml(data) {
  return sanitizeHtml(data, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

app.listen(process.env.APP_PORT, () => {
  console.log(`Data server, listen port: ${process.env.APP_PORT}`);
});
