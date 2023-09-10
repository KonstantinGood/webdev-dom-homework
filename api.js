export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v1/Good-Konstantin/comments", {
  method: "GET"
})

// подписываемся на успешное завершение запроса с помощью then
.then((response) => {
  // Запускаем преобразовываем "сырые" данные от API в json формат
  return response.json();
});
}

export function postTodo ({name, text}) {
     return fetch("https://wedev-api.sky.pro/api/v1/Good-Konstantin/comments", {
    method: "POST",
    body: JSON.stringify({
      name: name
      .replaceAll("&", "&amp;")
     .replaceAll("<", "&lt;")
     .replaceAll(">", "&gt;")
       .replaceAll('"', "&quot;"),
      text: text
      .replaceAll("&", "&amp;")
     .replaceAll("<", "&lt;")
     .replaceAll(">", "&gt;")
     .replaceAll('"', "&quot;"),
      forceError: true,
    }),
    // JSON.stringifylikes:
  })
  .then((response) => {
    if (response.status === 201) {
      return response.json();
    }
    else if (response.status === 400) {
      alert('мало символов');
      return Promise.reject(new Error("Не верный пользовательский ввод"));
    }
    else{
      alert('что-то пошло не так');
      return Promise.reject(new Error('Ошибка сервера!'));
    }
  })
  
}