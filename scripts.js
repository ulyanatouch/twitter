const root = document.querySelector('#root')
const form = document.querySelector('#postForm')
const header = document.querySelector('header')
const textInput = document.querySelector('#text')
const userAvatarElement = document.querySelector('#userAvatar1');
const userNameElement = document.querySelector('#userName1');
const id = 27


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
            likeCount = null;
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

const addNewPost = async (post) => {
    try {
        const response = await fetch('https://dummyjson.com/posts/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(post)
        })

        const postData = await response.json()

        const userResponse = await fetch(`https://dummyjson.com/user/${id}`)
        const userData = await userResponse.json()

        console.log(userData);
        renderNewPost(postData, userData)
    } catch (error) {
        console.error('Error:', error)
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const newPost = {
        body: textInput.value,
        userId: id
    }
    console.log(newPost)
    addNewPost(newPost)
    textInput.value = ''
})


const getPost = async () => {
    try {
        const postResponse = await fetch('https://dummyjson.com/posts')
        const postData = await postResponse.json()
        console.log(postData.posts)

        const userResponse = await fetch(`https://dummyjson.com/users`)
        const userData = await userResponse.json()
        console.log(userData.users)

        renderUserPost(postData.posts, userData.users)

        const userWithId = userData.users.find(user => user.id === id);

        if (userWithId) {
            userAvatarElement.src = userWithId.image
        }

    } catch (error) {
        console.error(`Произошла ошибка: ${error} `);
    }
}

const renderUserPost = (posts, users) => {

    posts.slice(0, 5).forEach(post => {
        const user = users.find(user => user.id === post.id)
        if (user) {
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
            userAvatarElement.src = user.image
            divLike.append(reaction, likeCounter)
            divAvatar.append(userName, postText)
            divPost.append(userAvatar, divAvatar)
            postCard.append(divPost, divLike)
            root.append(postCard)
        }
    })
}

getPost()
