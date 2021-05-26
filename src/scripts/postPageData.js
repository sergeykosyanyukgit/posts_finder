let postId = document.location.search.replace('?id=','')
let post = null
const loadPostComments = async () => {
  post = await getPostFullData(postId)
  if(post == null) {
    let userPosts = JSON.parse(localStorage.getItem('userPosts')) || []
    let userPost = userPosts.filter(post => post.id == postId)[0]
    if(userPost == null) {
      pageNotFoundBuild()
      return 
    }
    else
    {
      post = userPost
    }
  }
  pageBuild(post)
}
loadPostComments()