import { getPosts, getUser, addNewPost } from './requests.js'

const root = document.querySelector('#root')
const form = document.querySelector('#postForm')
const header = document.querySelector('header')
const textInput = document.querySelector('#text')
const userAvatarElement = document.querySelector('#userAvatar1')
const userNameElement = document.querySelector('#userName1')

const showUserAvatar = async () => {
  // чтобы при загрузке страницы получилаись данные пользователя, который будет писать посты
  const user = await getUser(27)
  userAvatarElement.src = user.image
}
showUserAvatar()

// NEW POST
const renderNewPost = (post, user) => {
  const postCard = document.createElement('div')
  const postText = document.createElement('p')
  const reaction = document.createElement('img')
  const likeCounter = document.createElement('span')
  const userName = document.createElement('h3')
  const userAvatar = document.createElement('img')
  const divAvatar = document.createElement('div')
  const divPost = document.createElement('div')
  const divLike = document.createElement('div')

  postCard.classList.add('postCard')
  reaction.classList.add('reaction')
  userAvatar.classList.add('userAvatar')
  divAvatar.classList.add('divAvatar')
  divPost.classList.add('divPost')
  divLike.classList.add('divLike')

  let likeCount = null

  reaction.addEventListener('click', () => {
    if (likeCount === null) {
      likeCount = 1
      likeCounter.innerText = likeCount
      reaction.src = 'media/liked.png'
    } else {
      likeCount = null
      likeCounter.innerText = ''
      reaction.src = 'media/React.svg'
    }
  })

  postText.innerText = post.body
  reaction.src = 'media/React.svg'
  likeCounter.innerText = likeCount
  userName.innerText = `@${user.username}`
  userAvatar.src = user.image

  divLike.append(reaction, likeCounter)
  divAvatar.append(userName, postText)
  divPost.append(userAvatar, divAvatar)
  postCard.append(divPost, divLike)
  root.prepend(header, form, postCard)
}

// ОТПРАВКА ФОРМЫ
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const user = await getUser(27)
  userAvatarElement.src = user.image
  const newPost = {
    body: textInput.value,
    userId: user.id,
  }

  addNewPost(newPost, (postData, userData) => renderNewPost(postData, userData))
  textInput.value = ''
})

const renderUserPost = async () => {
  const posts = await getPosts()
  // forEach с асинхронной функцией работать не будет
  for (const post of posts.slice(0, 5)) {
    const user = await getUser(post.userId)
    const postCard = document.createElement('div')
    const postText = document.createElement('p')
    const likeCounter = document.createElement('p')
    const reaction = document.createElement('img')
    const userName = document.createElement('h3')
    const userAvatar = document.createElement('img')
    const divAvatar = document.createElement('div')
    const divPost = document.createElement('div')
    const divLike = document.createElement('div')

    postCard.classList.add('postCard')
    reaction.classList.add('reaction')
    userAvatar.classList.add('userAvatar')
    divAvatar.classList.add('divAvatar')
    divPost.classList.add('divPost')
    divLike.classList.add('divLike')

    let likeCount = post.reactions
    let isLiked = false

    reaction.addEventListener('click', () => {
      if (isLiked) {
        likeCount--
        reaction.src = 'media/React.svg'
      } else {
        likeCount++
        reaction.src = 'media/liked.png'
      }

      likeCounter.innerText = likeCount
      isLiked = !isLiked
    })

    postText.innerText = post.body
    likeCounter.innerText = post.reactions
    reaction.src = 'media/React.svg'
    userName.innerText = `@${user.username}`
    userAvatar.src = user.image
    divLike.append(reaction, likeCounter)
    divAvatar.append(userName, postText)
    divPost.append(userAvatar, divAvatar)
    postCard.append(divPost, divLike)
    root.append(postCard)
  }
}
renderUserPost()
