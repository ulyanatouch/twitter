document.addEventListener("DOMContentLoaded", (event) => {
  // Получаем элементы только один раз, при загрузке документа
  const postButton = document.querySelector(".tweet-button .tweet");
  const postInput = document.getElementById("postTitle");
  const heartButton = document.querySelector(".heart-button");
  const reactionCount = document.querySelector(".reaction-count");

  // Обработчик для кнопки "сердечко"
  heartButton.addEventListener("click", () => {
    const postId = 1; // ID поста должно быть определено или получено откуда-то
    const userId = 1; // ID пользователя должно быть определено или получено откуда-то
    saveReaction(postId, userId, "like");

    const currentCount = parseInt(reactionCount.textContent, 10);
    reactionCount.textContent = currentCount + 1;
  });

  // Функция для сохранения реакции
  function saveReaction(postId, userId, reactionType) {
    // Здесь должна быть логика для сохранения реакции, например, API запрос
    console.log(
      `Реакция ${reactionType} сохранена для поста ${postId} пользователя ${userId}`
    );
  }

  // Обработчик для кнопки "Tweet"
  postButton.addEventListener("click", async () => {
    const postContent = postInput.value;
    const userId = 1; // ID пользователя должно быть определено или получено откуда-то

    try {
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
    } catch (error) {
      console.error("Ошибка:", error);
    }
  });
});
