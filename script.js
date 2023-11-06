document.addEventListener("DOMContentLoaded", (event) => {

  const postButton = document.querySelector(".tweet-button .tweet");
  const postInput = document.getElementById("postTitle");
  const heartButton = document.querySelector(".heart-button");
  const reactionCount = document.querySelector(".reaction-count");


  heartButton.addEventListener("click", () => {
    const postId = 1;
    const userId = 1;
    saveReaction(postId, userId, "like");

    const currentCount = parseInt(reactionCount.textContent, 10);
    reactionCount.textContent = currentCount + 1;
  });


  function saveReaction(postId, userId, reactionType) {

    console.log(
      `Реакция ${reactionType} для поста ${postId} пользователя ${userId}`
    );
  }


  postButton.addEventListener("click", async () => {
    const postContent = postInput.value;
    const userId = 1;

    const dataObject = {
      body: postContent,
      userId: userId,
    };

    const postResponse = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObject),
    });

    const postResult = await postResponse.json();
    console.log(postResult);

  });
});

console.log('Hello Dmitry!')
