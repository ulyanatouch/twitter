document.addEventListener("DOMContentLoaded", (event) => {
  const heartButton = document.querySelector(".heart-button");
  const reactionCount = document.querySelector(".reaction-count");

  heartButton.addEventListener("click", () => {
    saveReaction();

    const currentCount = parseInt(reactionCount.textContent, 10);
    reactionCount.textContent = currentCount + 1;
  });

  function saveReaction() {
    const reactionData = {
        postId: postId,
        userId: userId,
        reactionType: 'like',
  }

  document.addEventListener('DOMContentLoaded', function() {
    const postButton = document.querySelector('.tweet-button .tweet'); 
    const postInput = document.getElementById('postTitle'); 
  
    postButton.addEventListener('click', function() {
      const postContent = postInput.value; 
      const userId = 1;
    })
    
)}

  async function createMainUserAddPostForm() {
    try {
      const response = await fetch("https://dummyjson.com/users/1");
      const data = await response.json();
      const { id, image, username } = data;

      const input = document.getElementById("postTitle");
      const dataObject = {
        body: input.value,
        userId: id,
      };
     

      const postResponse = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObject),
      });

      const postResult = await postResponse.json();
      console.log(postResult);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }
});
