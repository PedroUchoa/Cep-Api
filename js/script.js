const cep = document.getElementById('cep');
const searchButton = document.getElementById('search-button');
const deleteButton = document.getElementById('deleteButton');
const table = document.getElementById('table');
const alertShow = document.querySelector('.add-alert')
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
    }
}


function atualizarTela() {
    cep.value = ''
    const banco = JSON.parse(localStorage.getItem('banco'))
    table.removeChild(table.lastChild)
    const itemTable = document.createElement('tbody')
    if (banco !== null) {
        banco.forEach(element => {
            let tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${element.cep}</td>
                <td>${element.localidade}</td>
                <td>${element.uf}</td>
        `
            itemTable.appendChild(tr)
            table.appendChild(itemTable)
          
        });
    }
}

const showAlert = () =>{
    alertShow.classList.remove('add-none')
    setTimeout(function(){
        alertShow.classList.add('add-none')
    }, 1500)
}

async function adicionarCep() {
    cep.value.replace('-', '').trim()
    let url = `https://viacep.com.br/ws/${cep.value}/json/`
    await fetch(url)
        .then((resp) => resp.json())
        .then((json) => {
            adicionarStorage(json)
            showAlert()
        })
        .catch((err) => alert('Cep invalido'))
    atualizarTela()
   
}

searchButton.addEventListener('click', adicionarCep)
deleteButton.addEventListener('click', removerStorage)

atualizarTela()