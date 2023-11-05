// Инициализация функции при загрузке документа
document.addEventListener("DOMContentLoaded", function() {
  // Обработчики для кнопки like
  const heartButton = document.querySelector(".heart-button");
  const reactionCount = document.querySelector(".reaction-count");

  heartButton.addEventListener("click", function() {
    saveReaction();
    incrementReactionCount(reactionCount);
  });

  // Обработчики для кнопки добавления поста
  const postButton = document.querySelector('.tweet-button .tweet'); 
  const postInput = document.getElementById('postTitle'); 

  postButton.addEventListener('click', function() {
    createMainUserAddPostForm(postInput.value);
  });
});

function saveReaction() {
  // Сохранение реакции пользователя
  // Здесь должен быть код для отправки информации о реакции на сервер
  console.log('Реакция сохранена');
}

function incrementReactionCount(reactionCountElement) {
  // Инкрементация счетчика реакций
  const currentCount = parseInt(reactionCountElement.textContent, 10);
  reactionCountElement.textContent = currentCount + 1;
}

async function createMainUserAddPostForm(postContent) {
  // Создание поста
  try {
    const userId = 1; // ID пользователя должен быть получен из другого источника или выбран здесь
    const response = await fetch("https://dummyjson.com/users/1");
    const userData = await response.json();

    const dataObject = {
      body: postContent,
      userId: userData.id,
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
