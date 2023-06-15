
const buttonAdicionar = document.getElementById('adicionar')
const modalCriterioAdc = document.getElementById('modal__adicionar__criterio')

buttonAdicionar.addEventListener('click', (event) => {
    event.preventDefault()
    modalCriterioAdc.classList.add('d-flex2')
    modalCriterioAdc.classList.remove('d-none')


    const sairModalAdc = document.getElementById('sair')
    sairModalAdc.classList.add('d-none')
    sairModalAdc.classList.remove('d-flex2')


})

const createDesejado = async () => {
    const desejado = document.getElementById('desejado')
    const margemMais = document.getElementById('margemMais')
    const margemMenos = document.getElementById('margemMenos')

    console.log(desejado.value);
    console.log(margemMais.value);
    console.log(margemMenos.value);
}

const sendTarefa = document.getElementById('sendTarefa')

sendTarefa.addEventListener('click', (event) => {
    event.preventDefault()
    createDesejado()
})