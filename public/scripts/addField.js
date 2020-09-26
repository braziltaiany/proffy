document.querySelector('#add-time').addEventListener('click', cloneField);

const numberPattern = /\d+/g;

function cloneField() {
  //     1. Duplicar campos,que campos?
  const NewFieldContainer = document
    .querySelector('.schedule-item')
    .cloneNode(true);

  let divs = document.querySelectorAll('.schedule-item');
  let lastElement = divs[divs.length - 1];
  let id = lastElement.id.match(numberPattern);

  NewFieldContainer.id = 'schedule-item-' + (id + 1);

  //    2. pegar os campos
  const fields = NewFieldContainer.querySelectorAll('input');

  // para cada campo,limpar
  fields.forEach(function (field) {
    //pegar o field do momento e limpa ele
    field.value = '';
  });

  NewFieldContainer.appendChild(createDeleteButton(id));
  document.querySelector('#schedule-items').appendChild(NewFieldContainer);
}

function createDeleteButton(id) {
  let div = document.createElement('div');
  div.className = 'button-block';

  let buttonDelete = document.createElement('button');
  buttonDelete.textContent = 'Excluir';
  buttonDelete.className = 'delete-field';
  buttonDelete.onclick = function () {
    deleteField(event);
  };
  //seta id botão
  buttonDelete.id = 'delete-field-' + (id + 1);

  div.appendChild(buttonDelete);
  return div;
}

function deleteField(e) {
  let id = e.target.id.match(numberPattern).join('');
  let deleteField = document.getElementById(`schedule-item-${id}`);
  deleteField.remove();
}
