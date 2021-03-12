const input = document.querySelector('#input')
const search = document.querySelector('#search')
let ul = document.querySelector('ul.todos')
const addBtn = document.querySelector('#add')
let list = []

// Загружаем в ЛокалХранилище

window.addEventListener('beforeunload', () => {
  localStorage.setItem('todos', JSON.stringify(list))
})

// Загружаем с ЛокалХранилища

window.onload = () => {
  if (JSON.parse(localStorage.getItem('todos')).length !== 0)
    if (confirm('Загрузить прежнее состояние?')) {
      list = JSON.parse(localStorage.getItem('todos'))
      render()
    } else {
      localStorage.removeItem('todos')
    }
}

// Создаём

function render() {
  let result = ''

  list.forEach((el, index) => {
    result += `<li>
      <span>${el.text}</span>
      <button id='deleteBtn${index}' class="btn btn-danger" onclick='listenDeleteTodo(${index})'>Trash</button>
      <button class="btn btn-success" onclick='changingFunc(true, ${el.position})'>Up</button>
      <button class="btn btn-success" onclick='changingFunc(false, ${el.position})'>Down</button>
    </li>`
  })
  ul.innerHTML = result
}

// Добавляем

addBtn.addEventListener('click', () => {
  if (input.value === '') return
  let i = 0
  let obj = {
    text: input.value,
    position: ++i,
  }

  list.push(obj)
  input.value = ''
  render()
})

// Удаляем

function listenDeleteTodo(index) {
  list.splice(index, 1)
  render()
}

// Меняем позицию

function changingFunc(up, position) {
  if (!(up && position === 0) && !(!up && position === list.length - 1)) {
    const positionChange = up ? -1 : 1

    list[position].position += positionChange
    list[position + positionChange].position += positionChange * -1

    list.sort((a, b) => a.position - b.position)
    render()
  }
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
