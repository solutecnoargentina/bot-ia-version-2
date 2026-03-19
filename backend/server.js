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
// ======================
// AGENTES (BASE)
// ======================
const fs = require("fs")
const path = require("path")

const AGENTS_FILE = path.join(__dirname, "agents.json")

// crear archivo si no existe
if(!fs.existsSync(AGENTS_FILE)){
  fs.writeFileSync(AGENTS_FILE,"[]")
}

// obtener agentes
app.get("/agents",(req,res)=>{
  const agents = JSON.parse(fs.readFileSync(AGENTS_FILE))
  res.json(agents)
})

// crear agente
app.post("/agents",(req,res)=>{
  const agents = JSON.parse(fs.readFileSync(AGENTS_FILE))

  const newAgent = {
    id: Date.now(),
    name: req.body.name,
    prompt: req.body.prompt
  }

  agents.push(newAgent)

  fs.writeFileSync(AGENTS_FILE, JSON.stringify(agents,null,2))

  res.json({success:true})
})

// eliminar agente
app.delete("/agents/:id",(req,res)=>{
  let agents = JSON.parse(fs.readFileSync(AGENTS_FILE))

  agents = agents.filter(a => a.id != req.params.id)

  fs.writeFileSync(AGENTS_FILE, JSON.stringify(agents,null,2))

  res.json({success:true})
})
// editar agente
app.put("/agents/:id",(req,res)=>{
  let agents = JSON.parse(fs.readFileSync(AGENTS_FILE))

  const index = agents.findIndex(a => a.id == req.params.id)

  if(index === -1){
    return res.status(404).json({success:false})
  }

  agents[index].name = req.body.name
  agents[index].prompt = req.body.prompt

  fs.writeFileSync(AGENTS_FILE, JSON.stringify(agents,null,2))

  res.json({success:true})
})
