const clearEl = document.querySelector('.fa-trash-restore-alt')
const listContainer = document.querySelector('.list')
const addEl = document.querySelector('.fa-plus-circle')
const inputEl = document.querySelector('input')

let initialData = localStorage.getItem('todo_list')
let listItems = []
console.log(listItems)
const checkBtn = "fa-check-circle"
const uncheckBtn = "fa-circle-thin";

function addTodo(todo, id, done, trash) {
    let checkIcon = done ? checkBtn : uncheckBtn
    let linethrough = done ? 'line-through' : ''
    let listItem = `
        <li>
            <i class=" fa ${checkIcon}" status="complete" id=${id}></i>
            <p class="${linethrough}">${todo}</p>
            <i class="fa fa-trash-o delete" id=${id} status="trash"></i>
        </li>
    `
    listContainer.insertAdjacentHTML('beforeend', listItem)


}

if (initialData) {
    listItems = JSON.parse(initialData)
    listItems.forEach(function(element) {
        if (element.trash) return
        addTodo(element.name, element.id, element.done, element.trash)
    })
}

function displayTodo(event) {
    if (event.key === 'Enter' || event.target === addEl) {
        let todo = inputEl.value
        let id = listItems.length
        if (todo) {
            addTodo(todo, id, false, false)
        }
        listItems.push({ name: todo, id: id, done: false, trash: false })
        inputEl.value = ''
        id++
        localStorage.setItem('todo_list', JSON.stringify(listItems))
    }
}

function toggleDone(event) {

    if (event.target.attributes.status.value == 'complete') {
        event.target.classList.toggle('fa-check-circle')
        event.target.classList.toggle('fa-circle-thin')
        event.target.nextElementSibling.classList.toggle('line-through')
        listItems[event.target.getAttribute('id')].done = listItems[event.target.id].done ? false : true
    } else if (event.target.attributes.status.value == 'trash') {
        listItems[event.target.getAttribute('id')].trash = true
        event.target.parentNode.style.display = 'none'
    }
}

document.addEventListener('keyup', displayTodo)
addEl.addEventListener('click', displayTodo)

listContainer.addEventListener('click', function(event) {
    toggleDone(event)
    localStorage.setItem('todo_list', JSON.stringify(listItems))
})

clearEl.addEventListener('click', function() {
    localStorage.clear()
    listItems = []
    location.reload()
})