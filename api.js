import { error } from 'node:console';
import http from 'node:http';
import { URL } from 'node:url';

const porta = 3000

const tarefas = [
    { id: 1, titulo: 'Lavar louça' },
    { id: 2, titulo: 'Comprar uma RTX 5090' }
]

const server = http.createServer((requisicao, resposta) => {
    resposta.setHeader('Content-Type', 'application/json; charset=utf-8')

    const urlobj = new URL(requisicao.url, `http://${requisicao.headers.host}`);

    if (requisicao.method == 'GET' && requisicao.url == '/tarefas') {
        resposta.statusCode = 200
        resposta.end(JSON.stringify(tarefas))
    } else if (requisicao.method == 'GET' && urlobj.pathname == '/tarefas/busca') {

        const titulo = urlobj.searchParams.get('titulo');

        const resultadoFiltrado = tarefas.filter((tarefa) => {
            return tarefa.titulo.toLowerCase().includes(titulo || '');
        })
        resposta.statusCode == 200;
        resposta.end(JSON.stringify(resultadoFiltrado))
    } else if ( requisicao.method == "DELETE" && urlobj.pathname == '/tarefas'){
        const id = urlobj.searchParams.get('id');
        const tarefa = tarefas.find((t) => {
            t.id == id
        });
        const index = tarefas.indexOf(tarefa);
        const elementoDeletado = {}

        if (index > -1){
            elementoDeletado = tarefas.splice(index, 1)
        }
        resposta.end(JSON.stringify(elementoDeletado));
    } 
    else if (requisicao.method == 'POST' && requisicao.url == '/tarefas') {
        let body = ''

        requisicao.on('data', (chunk) => {
            body += chunk.toString()
        })

        requisicao.on('end', () => {
            try {
                const movaTarefa = JSON.parse(body)

                if (!novaTarefa.titulo) {
                    resposta.statusCode = 400
                    resposta.end(JSON.stringify({ error: 'o campo "título" é obrigatório.' }));
                }

                const tarefaCriada = {
                    id: tarefas.length + 1,
                    titulo: novaTarefa.titulo
                }

                tarefa.push(tarefaCriada)

                respostas.statusCode = 201
                resposta.end(JSON.stringify(tarefaCriada))

            } catch (error) {
                resposta.statusCode = 400
                resposta.end(JSON.stringify({ error: 'Formato JSON inválido!' }))
            }
        })
    } else {
        resposta.statusCode = 404
        resposta.end(JSON.stringify({ error: 'Pagina não encontrada.' }))
    }
});

server.listen(porta, () => {
    console.log(`Servidor funcionando na porta ${porta}`);
});