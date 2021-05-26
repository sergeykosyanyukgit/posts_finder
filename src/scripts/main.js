let page = 1
let MinPage = 1
let MaxPage = 1
let searchValue = ''

const loadData = async (searchValue) => {
  let userPosts = JSON.parse(localStorage.getItem('userPosts')) || []
  let apiPosts = await getAllPosts() || []
  paginatedTextContainer.innerText = page
  buildPosts(userPosts, apiPosts, page, searchValue)
}

const buildPosts = (userPosts, apiPosts, pageIndex, filter) => {
  listReCreate()
  const { allPosts, minPage, maxPage, page } = mathPages(userPosts, apiPosts, pageIndex, filter, 10) 
  MinPage = minPage
  MaxPage = maxPage
  page.forEach(post => {
    listItemCreate(list, post)
  })
}

const mathPages = (userPosts, apiPosts, pageIndex, filter, postsPerPage) => {
  let allPosts = []
  let generatedPage = []
  let maxPage = 0
  apiPosts
  .filter(post => post.title.includes(filter) || post.body.includes(filter))
  .forEach(post => {
    allPosts.push(post)
  })

  userPosts
  .filter(post => post.title.includes(filter) || post.body.includes(filter))
  .forEach(post => {
    allPosts.push(post)
  })
  
  for(let index = 0; index < postsPerPage; index++){
    if(allPosts.length > (pageIndex-1)*postsPerPage + index) {
      generatedPage.push(allPosts[(pageIndex-1)*postsPerPage + index])
    }
  }
  if(generatedPage.length == 0) {
    for(let index = 0; index < postsPerPage; index++){
      if(allPosts.length > (pageIndex-2)*postsPerPage + index) {
        generatedPage.push(allPosts[(pageIndex-2)*postsPerPage + index])
      }
    }
    page = pageIndex-1
    paginatedTextContainer.innerText = page
  }
  maxPage = Math.ceil(allPosts.length/postsPerPage)
  if(maxPage > page){
    buttonRight.disabled = false
  }
  if(maxPage == page) {
    buttonRight.disabled = true
  }
  if(MinPage == page){
    buttonLeft.disabled = true
  }
  return {
    allPosts: allPosts,
    minPage: 1,
    maxPage: maxPage,
    page: generatedPage
  }
}

loadData(searchValue)

//page control
const search = (value) => {
  page = MinPage
  searchValue = value
  loadData(searchValue)
}

const buttonLeftCLick = (buttonLeft, buttonRight) => {
  page--
  if(page <= MinPage) {
    page = MinPage
    buttonLeft.disabled = true
  }
  buttonRight.disabled = false
  loadData(searchValue)
}

const buttonRightCLick = (buttonLeft, buttonRight) => {
  page++
  if(page >= MaxPage) {
    page = MaxPage
    buttonRight.disabled = true
  }
  buttonLeft.disabled = false
  loadData(searchValue)
}

const deleteButtonCLick = async (payload, deleteButton) => {
  deleteButton.disabled = true
  deleteButton.innerText = 'Remove In Process..'
  let userPosts = JSON.parse(localStorage.getItem('userPosts')) || []
  let userDeletedPost = false
  userPosts.forEach((userPost, index) => {
    if(userPost.id == payload.id) {
      userPosts.splice(index, 1)
      userDeletedPost = true
    }
  })
  if(!userDeletedPost){
    await deletePost(payload.id)
  }
  localStorage.setItem('userPosts', JSON.stringify(userPosts))
  loadData(searchValue)
}

const openPostButtonClick = async (payload) => {
  openPost = payload
  searchInput.value = null
  document.location.href = `post.html?id=${payload.id}`
}

const clearForm = () => {
  inputFormUserId.value = null
  inputFormTitle.value = null
  inputFormBody.value = null
}

const formValidate = (inputFormUserId, inputFormTitle, inputFormBody) => {
  if(inputFormUserId.value <= 0){
    inputFormUserId.className = 'red-border'
    return false
  }
  else
  {
    inputFormUserId.className = ''
  }
  if(inputFormTitle.value.length <= 3){
    inputFormTitle.className = 'red-border'
    return false
  }
  else
  {
    inputFormTitle.className = ''
  }
  if(inputFormBody.value.length <= 3){
    inputFormBody.className = 'red-border'
    return false
  }
  else
  {
    inputFormBody.className = ''
  }
  return true
}

const formSubmit = async (inputFormUserId, inputFormTitle, inputFormBody) => {
  if(formValidate(inputFormUserId, inputFormTitle, inputFormBody)) {
    const newPost = await createPost(inputFormUserId.value, inputFormTitle.value, inputFormBody.value)
    userPosts = JSON.parse(localStorage.getItem('userPosts')) || []
    if(userPosts.length > 0 && userPosts[userPosts.length-1].id >= newPost.id) {
      newPost.id = userPosts[userPosts.length-1].id+1
    }
    userPosts.push(newPost)
    localStorage.setItem('userPosts', JSON.stringify(userPosts))
    clearForm()
    loadData(searchValue)
  }
}
