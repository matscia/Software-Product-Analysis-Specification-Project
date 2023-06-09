const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#nomeFunc')
const sFuncao = document.querySelector('#funcaoFunc')
const sSalario = document.querySelector('#salarioFunc')
const sTelefone = document.querySelector('#telFunc')
const sEmail = document.querySelector('#emailFunc')
const sEndereco = document.querySelector('#enderecoFunc')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

// Função relacionada ao envio das informações do cadastro de funcionários
function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    sTelefone.value = itens[index].telefone
    sEmail.value = itens[index].email
    sEndereco.value = itens[index].endereco
    id = index
  } else {
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
    sTelefone.value = ''
    sEmail.value = ''
    sEndereco.value = ''
  }
  

  // Funções relacionadas as funções individuais de cada item
}

function editarItem(index) {

  openModal(true, index)
}

function deletarItem(index) {
  itens.splice(index, 1)
  setItensBD()
  carregarItens()
}

function adicionarItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td>${item.telefone}</td>
    <td>${item.email}</td>
    <td>${item.endereco}</td>
    <td class="acao">
      <button onclick="editarItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deletarItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '' || sTelefone.value == '' || sEmail.value == '' || sEndereco.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
    itens[id].telefone = sTelefone.value
    itens[id].email = sEmail.value
    itens[id].endereco = sEndereco.value
  } else {
    itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value, 'telefone': sTelefone.value, 'email': sEmail.value, 'endereco': sEndereco.value})
  }

  setItensBD()

  modal.classList.remove('active')
  carregarItens()
  id = undefined
}

function carregarItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    adicionarItem(item, index)
  })

}



const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

carregarItens()
