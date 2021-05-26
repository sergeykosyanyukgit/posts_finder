const app = document.getElementById('app')
const listContainer = document.createElement('div')
const paginatedTextContainer = document.createElement('div')
const buttonContainer = document.createElement('div')
const searchInput = document.createElement('input')

searchInput.className = 'search-input'
searchInput.placeholder = 'Search Post'
searchInput.type = 'text'

listContainer.className = 'list-container'
buttonContainer.className = 'button-container'


const form = document.createElement('form')
const inputFormUserId = document.createElement('input')
const inputFormTitle = document.createElement('input')
const inputFormBody = document.createElement('input')
const inputFormSubmit = document.createElement('button')

inputFormUserId.type='number'
inputFormTitle.type='text'
inputFormBody.type='text'
inputFormSubmit.type='button'

inputFormUserId.placeholder = 'Enter user id'
inputFormTitle.placeholder = 'Post Title'
inputFormBody.placeholder = 'Post Body'
inputFormSubmit.innerText = 'Create Post!'

form.appendChild(inputFormUserId)
form.appendChild(inputFormTitle)
form.appendChild(inputFormBody)
form.appendChild(inputFormSubmit)

inputFormSubmit.onclick = () => formSubmit(inputFormUserId, inputFormTitle, inputFormBody)

app.appendChild(form)

const buttonLeft = document.createElement('button')
buttonLeft.innerText = '<'
buttonLeft.disabled = true  
const buttonRight = document.createElement('button')
buttonRight.innerText = '>'
searchInput.oninput = () => search(searchInput.value)
app.appendChild(searchInput)
app.appendChild(listContainer)
app.appendChild(buttonContainer)

buttonLeft.onclick = () => buttonLeftCLick(buttonLeft, buttonRight)

buttonRight.onclick = () => buttonRightCLick(buttonLeft, buttonRight)

buttonContainer.appendChild(buttonLeft)
buttonContainer.appendChild(paginatedTextContainer)
buttonContainer.appendChild(buttonRight)


const listItemCreate = (list, payload) => {
  if(payload){
    const listItem = document.createElement('li')
  
    const num = document.createElement('div')
    num.className = 'num'
    num.innerText = payload.id
  
    const title = document.createElement('div')
    title.className = 'title'
    title.innerText = payload.title
  
    const body = document.createElement('div')
    body.className = 'body'
    body.innerText = payload.body
  
    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete-button'
    deleteButton.innerText = 'Remove Post'
    deleteButton.onclick = () => deleteButtonCLick(payload, deleteButton)
    
    const openPostButton = document.createElement('button')
    openPostButton.className = 'open-button'
    openPostButton.innerText = 'Open Post'
    openPostButton.onclick = () => openPostButtonClick(payload)
  
    listItem.appendChild(num)
    listItem.appendChild(title)
    listItem.appendChild(body)
    listItem.appendChild(deleteButton)
    listItem.appendChild(openPostButton)
    list.appendChild(listItem)
  }
}

const listReCreate = () => {
  const list = document.createElement('ul')
  const oldList = document.getElementById('list')
  if(oldList) {
    listContainer.removeChild(oldList)
  }
  list.id = 'list'
  listContainer.appendChild(list)
}