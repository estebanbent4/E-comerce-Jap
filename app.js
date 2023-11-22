const express = require('express');
const app = express();
const puerto = 3000;
const jwt = require("jsonwebtoken");
const key = "lucrecia123";
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "planning",
    connectionLimit: 5,
  });

app.use(express.json());

app.use("/todo", (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers["acces-token"], key); 
        console.log(decoded)
        next();   
    } catch (error) {
        res.status(401).json({message:"No pode entrar gato"})
    }
})

app.get("/todo", async (req, res) =>{
    let conn;
    try {
 
   conn = await pool.getConnection();
   const rows = await conn.query(
     "SELECT id, name, description, created_at,updated_at FROM todo",[req.params.id]
   );
 
   res.json(rows);
 
   }catch(error) {
    console.log(error)
     res.status(500).json({messahe: "Se rompió el servidor" });
   } finally {
   if (conn) conn.release(); //release to pool
   }
 });

app.post("/login", (req, res) => {
const  {username, password} = req.body;
if (username==="admin" && password==="admin"){
    const token = jwt.sign({username}, key)
    res.status(200).json({token});
}else if (username==="" && password===""){
    res.status(404).json({message:"Complete los campos o te pegamo un tiro"})
   }
else{
    res.status(401).json({message:"Usuario y/o contraseña incorrectos"})
}
})

app.listen(puerto, () => {
    console.log("servidor funcionando:http://localhost:3000")
});
