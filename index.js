const express = require("express")
const exphbs = require("express-handlebars")

const app = express()


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (requisicao, resposta) =>{
    resposta.send("oi")
})

app.listen(3000, () => {
    console.log("servidor rodando naporta 3000")
})