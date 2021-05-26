const app = document.getElementById('app')

const listContainer = document.createElement('div')
const title = document.createElement('h1')
const body = document.createElement('h2')
const list = document.createElement('ul')

const listCommentCreate = (list, payload) => {
  const listItem = document.createElement('li')

  const email = document.createElement('div')
  email.className = 'email'
  email.innerText = payload.email

  const name = document.createElement('div')
  name.className = 'name'
  name.innerText = payload.name

  const body = document.createElement('div')
  body.className = 'body'
  body.innerText = payload.body

  listItem.appendChild(email)
  listItem.appendChild(name)
  listItem.appendChild(body)
  list.appendChild(listItem)
}
const pageNotFoundBuild = () => {
  title.innerText = `Page Not Found (404)`
  app.appendChild(title)
}

const pageBuild = (post) => {
  title.innerText = `Title: ${post.title}`
  body.innerText = `Body: ${post.body}`

  list.id = 'list-comments'
  listContainer.appendChild(list)

  if(post.comments) {
    post.comments.forEach(comment => {
      listCommentCreate(list, comment)
    })
  }
  else
  {
    listCommentCreate(list, {
      email: '',
      name: 'No Comments :(',
      body: ''
    })
  }

  app.appendChild(title)
  app.appendChild(body)
  app.appendChild(listContainer)
}