const cep = document.getElementById('cep');
const searchButton = document.getElementById('search-button');
const deleteButton = document.getElementById('deleteButton');
const table = document.getElementById('table');
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

async function adicionarCep() {
    let url = `https://viacep.com.br/ws/${cep.value}/json/`
    await fetch(url)
        .then((resp) => resp.json())
        .then((json) => adicionarStorage(json))

    atualizarTela()
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


searchButton.addEventListener('click', adicionarCep)
deleteButton.addEventListener('click', removerStorage)

atualizarTela()