const cep = document.getElementById('cep');
const searchButton = document.getElementById('search-button');
const deleteButton = document.getElementById('deleteButton');
const table = document.getElementById('table');
const alertAdd = document.querySelector('.add-alert')
const alertRemove = document.querySelector('.remove-alert')
let cidade = JSON.parse(localStorage.getItem('banco')) ?? []

function adicionarStorage(value) {
    cidade.push(value)
    localStorage.setItem('banco', JSON.stringify(cidade))
}

function removerStorage() {
    if(cidade.length > 0){
        cidade = []
        localStorage.removeItem('banco')
        atualizarTela()
        showAlert(alertRemove)
    }
}

function excluirElemento(event){
    let child = event.target.parentNode.parentNode
    cidade.splice(child.id, 1)
    localStorage.setItem('banco', JSON.stringify(cidade))
    atualizarTela()
}


function atualizarTela() {
    cep.value = ''
    const banco = JSON.parse(localStorage.getItem('banco'))
    const itemTable = document.createElement('tbody')
    itemTable.id = "tableBody"
    table.lastChild.id == "tableBody" ? table.removeChild(table.lastChild) : ""
    if (banco !== null) {
        banco.forEach((element, index) => {
            let tr = document.createElement('tr')
            tr.id = index
            tr.innerHTML = `
                <td>${element.cep}</td>
                <td>${element.logradouro == "" ? 'Indisponivel' : element.logradouro }</td>
                <td>${element.bairro == "" ? 'Indisponivel' : element.bairro }</td>
                <td>${element.localidade}</td>
                <td>${element.uf}</td>
                <td><button onclick="excluirElemento(event)">X</button></td>
        `
            itemTable.appendChild(tr)
            table.appendChild(itemTable)
          
        });
    }
}

const showAlert = (alerta) =>{
    alerta.classList.remove('add-none')
    setTimeout(function(){
        alerta.classList.add('add-none')
    }, 3000)
}

async function adicionarCep() {
    cep.value.replace('-', '').trim()
    let url = `https://viacep.com.br/ws/${cep.value}/json/`
    await fetch(url)
        .then((resp) => resp.json())
        .then((json) => {
            adicionarStorage(json)
            showAlert(alertAdd)
        })
        .catch((err) => alert('Cep invalido'))
    atualizarTela()
   
}

searchButton.addEventListener('click', adicionarCep)
deleteButton.addEventListener('click', removerStorage)

atualizarTela()