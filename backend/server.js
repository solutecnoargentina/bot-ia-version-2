const express = require("express")

const app = express()

app.use(express.json())
app.use(express.static("/opt/solutecno-saas/frontend"))

// ======================
// CONFIG ADMIN
// ======================
const ADMIN_USER = "admin"
const ADMIN_PASS = "1234"

// ======================
// LOGIN
// ======================
app.post("/login", (req, res) => {
  const { user, pass } = req.body

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    return res.json({ success: true })
  }

  res.status(401).json({ success: false, message: "Credenciales incorrectas" })
})

// ======================
// TEST
// ======================
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Solutecno SaaS funcionando"
  })
})

// ======================
// PUERTO
// ======================
const PORT = 3000

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT)
})
