const express = require("express")

const app = express()

app.use(express.json())

// TEST
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Solutecno SaaS funcionando"
  })
})

// PUERTO
const PORT = 3000

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT)
})
