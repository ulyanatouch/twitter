// function addPost() {
//   const title = document.getElementById("postTitle").value;

//   fetch("https://dummyjson.com/posts/add", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       title: "I am in love with someone.",
//       userId: 5,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       alert("Post added successfully!");
//     })
//     .catch((err) => {
//       console.error("Error:", err);
//       alert("Failed to add post.");
//     });
// }

// Функция для получения данных пользователя по ID
// async function getUserData(userId) {
//     const response = await fetch(`https://dummyjson.com/users/${userId}`);
//     const data = await response.json();
//     return data;
//   }

// Функция для отображения данных на странице
//   async function displayUserData(userId) {
//     const userData = await getUserData(userId);

// Пример того, как можно отобразить полученные данные в HTML
// const userDisplay = `
//   <img src="${userData.image}" alt="${userData.firstName}" />
//   <p>${userData.userName}</p>
//   <p>${userData.firstName}</p>
// `;

// Добавляем полученные данные на страницу
//     document.querySelector('.user-container').innerHTML = userDisplay;
//   }

// Допустим, вы хотите получить данные пользователя с ID 1
//   displayUserData(1);

// Для реакций поста (здесь просто пример, так как не уточнено, какие именно реакции и как их отображать)
//   const reactions = `
//     <span>❤️ 57</span>
//     <span>🔄 24</span>
//     <span>💬 13</span>
//   `;
//   document.querySelector('.reactions-container').innerHTML = reactions;
