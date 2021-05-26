const baseUrl = 'https://jsonplaceholder.typicode.com/'

const getAllPosts = async () => {
  let deletedPosts = JSON.parse(localStorage.getItem('deletedPosts')) || []
  let result = null
  let deletedPostsFilter = ``
  deletedPosts.forEach(post => {
    deletedPostsFilter += `&id_ne=${post}`
  })
  await fetch(`${baseUrl}posts?${deletedPostsFilter}`)
  .then(response => {
    return response
  })
  .then(response => response.json())
  .then(json => result = json)
  .catch((error) => {
    console.log(error)
  })
  return result
}

const deletePost = async (id) => {
  let deletedPosts = JSON.parse(localStorage.getItem('deletedPosts')) || []
  deletedPosts.push(id)
  localStorage.setItem('deletedPosts', JSON.stringify(deletedPosts))
  return await fetch(`${baseUrl}posts/${id}`, { //fake
    method: 'DELETE'
  })
}

const createPost = async (userId, title, body) => {
  return await fetch(`${baseUrl}posts`, { //fake
    method: 'POST',
    body: JSON.stringify({
      title: title,
      body: body,
      userId: userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => {
    return json
  })
}

const getPostFullData = async (postId) => {
  return await fetch(`${baseUrl}posts/${postId}?_embed=comments`)
  .then(response => {
    if(response.status != 200) {
      return null
    }
    else 
    return response
  })
  .then(response => response.json())
  .then((json) => {
    return json
  })
  .catch((error) => {
    return null
  })
}