const input = document.querySelector('#input')
const search = document.querySelector('#search')
let ul = document.querySelector('ul.todos')
const addBtn = document.querySelector('#add')

// Загружаем в ЛокалХранилище

window.addEventListener('beforeunload', () => {
  localStorage.setItem('todos', ul.innerHTML)
})

// Загружаем с ЛокалХранилища

window.onload = () => {
  if (
    localStorage.getItem('todos') !== null &&
    localStorage.getItem('todos') !== ''
  )
    if (confirm('Загрузить прежнее состояние?')) {
      ul.innerHTML = localStorage.getItem('todos')
    } else {
      localStorage.removeItem('todos')
    }
}

// Создаём

function createTodo() {
  const li = document.createElement('li')
  const textSpan = document.createElement('span')
  textSpan.classList.add('todo-text')
  textSpan.append(input.value)

  const deleteBtn = document.createElement('span')
  deleteBtn.classList.add('todo-trash')
  const icon = document.createElement('i')
  icon.classList.add('fas', 'fa-trash-alt')
  deleteBtn.appendChild(icon)

  const buttonUp = document.createElement('button')
  const buttonDown = document.createElement('button')
  buttonUp.append('Вверх')
  buttonDown.append('Вниз')

  buttonUp.addEventListener('click', () => {
    let ul = document.getElementsByTagName('ul')[0]
    console.log(ul.children)
  })

  input.value === ''
    ? null
    : ul.appendChild(li).append(textSpan, deleteBtn, buttonUp, buttonDown)
  input.value = ''
  deleteBtn.addEventListener('click', listenDeleteTodo(deleteBtn))
}

// Добавляем

addBtn.addEventListener('click', () => {
  createTodo()
})

// Удаляем

function listenDeleteTodo(element) {
  element.addEventListener('click', (event) => {
    element.parentElement.remove()
    event.stopPropagation()
  })
}

// Поиск, работает при снятии блюра с инпута

search.onchange = () => {
  let li = ul.getElementsByTagName('li')
  filter = search.value.toUpperCase()
  for (let i = 0; i < li.length; i++) {
    let span = li[i].getElementsByTagName('span')[0]
    if (span.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = ''
    } else {
      li[i].style.display = 'none'
    }
  }
}
