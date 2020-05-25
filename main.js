
let inputNome = document.querySelector('input');
let buttonBuscar = document.querySelector('button.botao');
let campoLista = document.querySelector('.lista');
let campoDetalhe = document.querySelector('.detalhe');

//buscando dados 


function limpaTela() {
    campoLista.innerHTML = '';
    campoDetalhe.innerHTML = '';

}

function renderLista(response) {

    limpaTela();

    let descricaoDetalhe = document.createTextNode('Lista de Repositórios');
    campoDetalhe.appendChild(descricaoDetalhe);


    for (let i = 0; i < response.data.length; i++) {

        let elemento = document.createElement('li');
        let texto = document.createTextNode(response.data[i].name);

        elemento.appendChild(texto);
        campoLista.appendChild(elemento);
    }


}


function renderMensagem(mensagem) {

    limpaTela();

    let elemento = document.createElement('li');
    let texto = document.createTextNode(mensagem);

    elemento.appendChild(texto);
    campoLista.appendChild(elemento);

}



buttonBuscar.onclick = function buscaDados() {

    limpaTela();

    let nomeDigitado = inputNome.value.trim();

    link = `https://api.github.com/users/${nomeDigitado}/repos`;

    visualizacaoCarregamento(true);


    axios.get(link)

        .then(function (response) {

            visualizacaoCarregamento(false);

            console.log(response);

            renderLista(response);
        })

        .catch(function (error) {

            visualizacaoCarregamento(false);

            console.log(error);

            // retornar 404 pois não localizou nenhum repositorio
            if (error.response.status === 404) {

                mensagem = 'Nenhum repositorio foi encontrado, usuário inexistente!';

                renderMensagem(mensagem);

            }
            else {
                // se não erro 404 retorno o erro completo

                renderMensagem(error);
            }
        })

}




function visualizacaoCarregamento(status) {

    (status == true) ? document.getElementById('preCarregamento').style.display = 'block' : document.getElementById('preCarregamento').style.display = 'none';
}
















