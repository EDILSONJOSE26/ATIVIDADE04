const baseURL = 'http://127.0.0.1:8000/tarefa';

let tarefas = [];
let editing = false;
let tarefa_id;

// limpar ou enviar o formulário
function resetar_formulario() {
  const form_task = document.querySelector('#form_tarefas');
  form_task.reset();

  const btn_confirmar = document.querySelector('#btn-confirmar');
  btn_confirmar.value = 'Adicionar Tarefa';

  editing = false;
}

// atualizar a tela e enviar os dados
async function atualizar_tela() {
  // Manipulação de DOM
  const ul_tarefas = document.getElementById('list-task');
  ul_tarefas.innerHTML = '';

  for (let tarefa of tarefas) {
    const item = document.createElement('li');
    const label = `#${tarefa.id} - ${tarefa.descricao} - ${tarefa.responsavel} - ${tarefa.nivel} - ${tarefa.prioridade} - ${tarefa.situacao}`;

    const btn_editar = document.createElement('a');
    btn_editar.innerText = 'Editar';
    btn_editar.href = '#';

    btn_editar.onclick = (event) => {
      event.preventDefault();

      // 1. Preencher o Formulário
      preencher_formulario(tarefa);

      // 2. Mudar o Label do Botão para Atualizar
      const btn_confirmar = document.querySelector('#btn-confirmar');
      btn_confirmar.value = 'Editar Tarefa';

      // 3. Salvar um Estado Global se está editando
      editing = true;
      tarefa_id = tarefa.id;
    };

    const btn_remover = document.createElement('a');
    btn_remover.innerText = 'Remover';
    btn_remover.href = '#';
    const espaco = document.createElement('span');
    espaco.innerText = ' ';
    btn_remover.onclick = async (event) => {
      event.preventDefault();
      const confirmou = confirm(`Deseja mesmo remover a tarefa: ${tarefa.descricao}`);

      if (!confirmou) {
        return;
      }
      const response = await fetch(baseURL + '/' + tarefa.id, { method: 'DELETE' });

      // se deu certo..
      if (response.ok) {
        alert('Tarefa removida com sucesso!');
        carregar_tarefas();
      }
    };

    item.innerText = label;
    item.appendChild(btn_editar);
    item.appendChild(espaco);
    item.appendChild(btn_remover);

    ul_tarefas.appendChild(item);
  }
}

function preencher_formulario(tarefa) {
  const form_task = document.getElementById('form_tarefas');

  const inputs = form_task.children;
  inputs[0].value = tarefa.responsavel;
  inputs[1].value = tarefa.descricao;
  inputs[2].value = tarefa.nivel;
  inputs[3].value = tarefa.prioridade;
  inputs[4].value = tarefa.situacao;
}

async function carregar_tarefas() {
  console.log('API - Todas tarefas');
  const response = await fetch(baseURL);

  const status = response.status;
  tarefas = await response.json();

  atualizar_tela();

  // console.log('Status', status)
  // console.log('Dados', dados)
}
function configurar_formulario(){
    const form_task = document.getElementById('form_tarefas')
    const input_responsavel = document.querySelector('responsavel2')
    const textarea_descri = document.getElementById('descricao')
    const select_nivel = document.getElementById('nivel3')
    const select_prioridade = document.getElementById('prioridade4')
    const select_situacao = document.getElementById('situacao5')

    const btn_cancelar = document.getElementById('btn-cancelar')

    btn_cancelar.onclick = () => {
        const btn_confirmar = document.getElementById('btn-confirmar')
        btn_confirmar.value = 'Adicionar Tarefa'
    }

    form_task.onsubmit = async function(event){

        event.preventDefault()

        const dados = form_task.children
        const responsavel = input_responsavel.value
        const descricao = textarea_descri.value
        const nivel = select_nivel.value
        const prioridade = select_prioridade.value
        const situacao = select_situacao.value

        const tarefa = {responsavel, descricao, nivel, prioridade, situacao}

        console.log('Submeteu!!!')
    }