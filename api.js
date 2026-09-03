import express from 'express'

const app = express()
const PORT = 3000

const usuarios = [
    {id: 1, nome: 'Alice'},
    {id: 2, nome: 'Aurora'},
    {id: 3, nome: 'Amanda'}

]

app.get('/', (req, res) => {
    res.send('Bem-vindo ao Express!')
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/usuario', () => {
    const novoUsuario = {
        id: usuarios.length +1, 
        nome: 'Alana'
    }

    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
})

app.get('/usuario/:id', (req, res) => {
    const id = req.params.id;
    const usuario = usuarios.find(u => u.id === parseInt (id));
    if(!usuario) {
        return res.status(404).json({error: "Usuário não encontrado!"});
    }
    res.json(usuario);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});