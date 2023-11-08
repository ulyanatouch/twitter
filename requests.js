export const getPosts = async () => {
  try {
    const postResponse = await fetch('https://dummyjson.com/posts')
    const { posts } = await postResponse.json()
    return posts
  } catch (error) {
    console.error(`Произошла ошибка: ${error} `)
  }
}

export const getUser = async (userId) => {
  const userResponse = await fetch(`https://dummyjson.com/users/${userId}`)
  const userData = await userResponse.json()
  return userData
}

export const addNewPost = async (post, callback) => {
  try {
    const response = await fetch('https://dummyjson.com/posts/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(post),
    })

    const postData = await response.json()

    const userResponse = await fetch(`https://dummyjson.com/user/${postData.userId}`)
    const userData = await userResponse.json()

    callback(postData, userData)
  } catch (error) {
    console.error('Error:', error)
  }
}
