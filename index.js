const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")



const app = express()


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))





const conexao =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2006",
    database: "todoapp",
    port:3306
})

 app.post('/descompletar', (requisicao, resposta) =>{
    const id = requisicao.body.id

    const sql = `
      UPDATE tarefas
      SET completa = '0'
      WHERE id = ${id}
    `
 })
app.get('/', (requisicao, resposta) =>{
    const sql = 'SELECT * FROM tarefas'
    
    conexao.query(sql, (erro,dados)=>{
        if (erro) {
            return console.log(erro)
        }
        

        const tarefas = dados.map((dado) => {
            return{
                id: dado.id,
                descricao: dado.descricao,
                completa: dado.completa === 0 ? false:true
            }
            
        })
        resposta.render('home', {tarefas})
    })
})

app.post('/completar', (requisicao, resposta)=>{
    const id = requisicao.body.id

    const sql = `
    UPDATE tarefas
    SET completo = '1'
    WHERE id = ${id}
    `

    conexao.query(sql, (erro) =>{
        if (erro) {
            return console.log(erro)
        }
    })
})

app.post('/criar', (requisicao, resposta) =>{
    const descricao = requisicao.body.descricao
    const completa = 0

    const sql =`
      INSERT INTO tarefas(descricao, completa)
      VALUES ('${descricao}', '${completa}')
     `


     conexao.query(sql, (erro) =>{
        if (erro) {
            return console.log(erro)
        }

        resposta.redirect('/')
     })
})

conexao.connect((erro) =>{
    if (erro) {
        return console.log(erro)
    }

    console.log("Estou conectado ao mysql")

    app.listen(3000, () => {
        console.log("servidor rodando na porta 3000")
    })

})