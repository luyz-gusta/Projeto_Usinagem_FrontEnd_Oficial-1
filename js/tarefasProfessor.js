'use strict'

import { createTarefa, deleteTarefa, updateTarefa } from './apiTarefas.js'
import { pesquisarTarefas } from './apiTarefas.js';

var idMateria = localStorage.getItem('idMateria')
console.log(idMateria);


//import "./router.js"

const criarDadosTarefa = async () => {
    const tarefasDados = await pesquisarTarefas();

    const containerTarefa = document.querySelector('.cards_turma')

    tarefasDados.forEach((tarefa) => {

        const buttonCard = document.createElement('button')
        buttonCard.classList.add('buttonCard')
        buttonCard.title = "Clique para mais informações da tarefa."

        const card = document.createElement('div')
        card.classList.add('card')

        const spanTipoTarefa = document.createElement('span')
        spanTipoTarefa.textContent = 'Tipo: ' + tarefa.nome_tipo_tarefa

        const imgPeca = document.createElement('img')
        imgPeca.src = tarefa.foto_peca

        const nomeTarefa = document.createElement('p')
        nomeTarefa.classList.add('nomeTarefa')
        nomeTarefa.textContent = tarefa.nome_tarefa


        const button_editar = document.createElement('button')
        button_editar.classList.add('far')
        button_editar.classList.add('fa-edit')
        button_editar.id = 'editar2'
        button_editar.title = "Editar tarefa"

        const nomeTarefa2 = document.getElementById('nomeTarefa2')
        const urlTarefa2 = document.getElementById('urlTarefa2')
        const tempoPrevisto2 = document.getElementById('tempoPrevisto2')
        const tipo_atividade2 = document.getElementById('tipo-atividade2')

        const tarefaEditada = document.getElementById('sendTarefaEditada')
        const descricaoTarefa2 = document.getElementById('descricaoTarefa2')


        card.append(imgPeca, spanTipoTarefa, nomeTarefa)

        buttonCard.append(card)
        containerTarefa.append(buttonCard)


        // Evento que aparece o modal em que se tem links para editar, excluir e ver critérios

        buttonCard.addEventListener('click', async (event) => {
            event.preventDefault();

            localStorage.setItem('tarefaNome', tarefa.nome_tarefa)
            localStorage.setItem('tarefaId', tarefa.id)
            console.log('clique', tarefa.nome_tarefa);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            const modalMensgaem = document.querySelector('.modal_mensagem')
            modalMensgaem.classList.add('d-flex2')
            modalMensgaem.classList.remove('d-none')
            const nomeTarefaMensagem = document.getElementById('nomeTarefaMensagem')
            nomeTarefaMensagem.textContent = 'Área de configurações da tarefa ' + tarefa.nome_tarefa

            const sairModalMensagem = document.getElementById('sairModalMensagem')
            sairModalMensagem.addEventListener('click', (event) => {
                event.preventDefault();
                const modalMensgaem = document.querySelector('.modal_mensagem')
                modalMensgaem.classList.add('d-none')
                modalMensgaem.classList.remove('d-flex2')
            })


            const excluirTarefaButton = document.getElementById('excluirTarefaButton')
            
            const excluirTarefaButton2 = document.getElementById('excluirTarefaButton2')

            const modal_excluir = document.querySelector('.modal_excluir')

            const naoExcluir = document.querySelector('.naoExcluir')

            const  button_editar= document.getElementById('editarTarefaButton')

            button_editar.addEventListener('click', async (event) => {

                //console.log(descricaoTarefa2.value, nomeTarefa2.value);
                event.preventDefault();
                const modalMensgaem = document.querySelector('.modal_mensagem')
                modalMensgaem.classList.add('d-none')
                modalMensgaem.classList.remove('d-flex2')
                const editarTarefaModal = document.getElementById('modal__editar__tarefa')
                editarTarefaModal.classList.remove('d-none')
                editarTarefaModal.classList.add('d-flex')
                console.log(tarefa);
                nomeTarefa2.value = tarefa.nome_tarefa
                urlTarefa2.value = tarefa.foto_peca
                tempoPrevisto2.value = tarefa.tempo_previsto_tarefa
                descricaoTarefa2.value = tarefa.descricao_tarefa
                tipo_atividade2.value = tarefa.id_tipo_tarefa
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
    
                tarefaEditada.addEventListener('click', (event) => {
                    event.preventDefault();
                    const tarefaUpdate = {
                        "nome": `${nomeTarefa2.value}`,
                        "tempo_previsto": `${tempoPrevisto2.value.substring(0, 2) + ':' + tempoPrevisto2.value.substring(3, 5) + ':00'}`,
                        "numero": 12,
                        "foto_peca": `${urlTarefa2.value}`,
                        "descricao": descricaoTarefa2.value,
                        "id_tipo_tarefa": parseInt(tipo_atividade2.value)
                    }
                    console.log(tarefaUpdate);
                    
                    updateTarefa(tarefa.id, tarefaUpdate)
    
    
    
                    editarTarefaModal.classList.remove('d-flex')
                    editarTarefaModal.classList.add('d-none')
    
                    const modalMensgaem = document.querySelector('.modal_mensagem')
                    modalMensgaem.classList.add('d-none')
                    modalMensgaem.classList.remove('d-flex')
    
    
    
                })
            });
            
            excluirTarefaButton.addEventListener('click', (event) => {
                event.preventDefault();
                modal_excluir.classList.add('d-grid-center')
                modal_excluir.classList.remove('d-none')

            });
            naoExcluir.addEventListener('click', (event) => {
                event.preventDefault();
                modal_excluir.classList.remove('d-grid-center')
                modal_excluir.classList.add('d-none')

            });


            const idTarefa = tarefa.id;

            //const modal__deletar = document.querySelector('.modal__deletar')

            excluirTarefaButton2.addEventListener('click', (event) => {
                event.preventDefault();
            
                console.log(idTarefa);
                deleteTarefa(idTarefa)

            });
        });









    })


}


criarDadosTarefa()



const buttonAdcTarefa = document.getElementById('adicionarTarefa')
const modalTarefaAdc = document.getElementById('modal__adicionar__tarefa')
const buttonSairMNodal = document.getElementById('sair')

buttonAdcTarefa.addEventListener('click', () => {
    modalTarefaAdc.classList.remove('d-none')
    modalTarefaAdc.classList.add('d-flex')
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

buttonSairMNodal.addEventListener('click', () => {
    modalTarefaAdc.classList.add('d-none')
    modalTarefaAdc.classList.remove('d-flex')
})



const buttonSendTarefa = document.getElementById('sendTarefa')
const nomeTarefa = document.getElementById('nomeTarefa')
const urlTarefa = document.getElementById('urlTarefa')
const tempoPrevisto = document.getElementById('tempoPrevisto')
const descricaoTarefa = document.getElementById('descricaoTarefa')
const selectElement = document.getElementById("tipo-atividade");




buttonSendTarefa.addEventListener('click', (event) => {
    event.preventDefault();

    const selectedValue = selectElement.value;
    const valorNomeTarefa = nomeTarefa.value
    const valorUrl = urlTarefa.value
    const valorTempo = tempoPrevisto.value
    const valorValorDescricao = descricaoTarefa.value
    //let valorTipoTarefa = ''

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;


    if (selectedValue != "na") {
        if (urlRegex.test(valorUrl)) {
            console.log("A URL é válida.");
            const tarefa = {
                "nome": `${valorNomeTarefa}`,
                "tempo_previsto": `${valorTempo.substring(0, 2) + ':' + valorTempo.substring(3, 5) + ':00'}`,
                "numero": 12,
                "foto_peca": `${valorUrl}`,
                "descricao": `${valorValorDescricao}`,
                "id_tipo_tarefa": parseInt(selectedValue)
            }
            console.log(tarefa);
            createTarefa(tarefa)

            modalTarefaAdc.classList.add('d-none')
            modalTarefaAdc.classList.remove('d-flex')
        }
    }




})