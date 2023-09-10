import { getTodos } from "./api.js";
import { postTodo } from "./api.js";

const commentsElement = document.getElementById("comments");
const addFormButtonElement = document.getElementById("add-form-button");
const nameInputElement = document.getElementById("add-form-name");
const textInputElement = document.getElementById("add-form-text");
const form = document.getElementById("add-form");
const deleteCommentButton = document.getElementById("delete-comment-button");
const Loading = document.getElementById("Loading");
const LoadingForm = document.getElementById("LoadingForm");
let quote = "";

let comments = [
  // {
  //   name: `Глеб Фокин`,
  //   date: `12.02.22 12:18`,
  //   quote: '',
  //   comment: `Это будет первый комментарий на этой странице`,
  //   like: 3,
  //   activeLike: false,
  //   changeButton: false,

  // },
  // {
  //   name: `Варвара Н.`,
  //   date: `13.02.22 19:22`,
  //   quote: '',
  //   comment: `Мне нравится как оформлена эта страница! ❤`,
  //   like: 75,
  //   activeLike: false,
  //   changeButton: false,
  // },
];

Loading.textContent = "Комментарий загружается...";                    
const fetchGet = () => {
getTodos().then((responseData) => {

    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date:  now (new Date (comment.date)),
        text: comment.text,
        likes: 0,
        activeLike: false,
      }
    })
    Loading.textContent = "";
    // получили данные и рендерим их в приложении
    console.log(responseData);
    // comment = responseData.comment;
    comments = appComments;
    renderComment();
  });
};
fetchGet();




const changeComment = () => {
const changeCommentBottons = document.querySelectorAll(".change-comment-button");
for (const changeCommentBotton of changeCommentBottons) {
changeCommentBotton.addEventListener('click', () => {
  console.log('f');
  const commentButton = comments[changeCommentBotton.dataset.index];
  commentButton.changeButton  = true ;
  renderComment();
  // document.querySelectorAll(".change-form-text").focus();
})
} 
};

const saveChangeComment = () => {
const saveChangeCommentBottons = document.querySelectorAll(".save-comment-button");
for (const saveChangeCommentBotton of saveChangeCommentBottons) {
saveChangeCommentBotton.addEventListener('click', () => {
  console.log('qqq');
  const comment = comments[saveChangeCommentBotton.dataset.index];
  comment.changeButton = false ;
  const saveFormText = saveChangeCommentBotton
  .closest(".comment")
  .querySelector(".change-form-text");
  comment.comment = saveFormText.value;
  let currentDate = new Date();
  comment.date = now(currentDate);
  renderComment();
})
}
};

const clickLike = () => {
const likeButtons = document.querySelectorAll(".like-button");
for (const likeButton of likeButtons) {
  likeButton.addEventListener('click', () => {
    likeButton.classList.add('-loading-like');

    function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};
delay(2000).then(() => {

  const newLike = comments[likeButton.dataset.index];

newLike.likes = newLike.isLiked
  ? newLike.likes - 1
  : newLike.likes + 1;
newLike.isLiked = !newLike.isLiked;
newLike.isLikeLoading = false; 
renderComment();
});

  //  console.log('d')
   // const newLike = comments[likeButton.dataset.index];
   // newLike.activeLike ? --newLike.likes : ++newLike.likes;
   // newLike.activeLike = !newLike.activeLike;
   // renderComment();
  })
}
};




// Пример использования:



const replyToComment = () => {
const commentBodys = document.querySelectorAll(".comment-body");
for (const commentBody of commentBodys) {
  commentBody.addEventListener ('click', () => {
    const oldComment =  commentBody.dataset.text;
    const oldName = commentBody.dataset.name;
    console.log (oldComment);
    console.log (oldName);
    quote = `${oldComment}\n${oldName}: `;
    // quote.value = ;
    textInputElement.value += `"${quote}"\n`;

  })
}
};



const renderComment = () => {
const newComments = comments.map ((comment, index) => {
return `<li class="comment">
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${comment.date}</div>
    </div>
      ${comment.quote ? `<div class=quote> ${comment.quote}</div>` : ""}
      ${
        comment.changeButton ? 
        `<textarea
        tipe = "textarea"
        class = "change-form-text"
        rows = 3
        autofocus> ${comment.text}</textarea>`
        : `<div class="comment-body"  data-text="${comment.text}" data-name="${comment.name}">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>`}
    <div class="comment-footer">
      ${comment.changeButton 
        ? `<button class="save-comment-button" data-index="${index}">Сохранить</button>` 
        : `<button class="change-comment-button" data-index="${index}">Изменить</button>`}
      <div class="likes">
        <span class="likes-counter">${comment.likes}</span>
        <button data-index="${index}" class='${comment.isLiked ? "like-button -active-like" : "like-button"}'></button>
      </div>
    </div>
  </li>`;
}).join('');
commentsElement.innerHTML = newComments;
clickLike();
changeComment();
saveChangeComment();
replyToComment();
}

renderComment();




const plusZero = (str) => {
  return str < 10 ? `0${str}` : str;
};

const now = (currentDate) => {
let date = plusZero(currentDate.getDate());
let month = plusZero(currentDate.getMonth() + 1);
let hours = plusZero(currentDate.getHours());
let mins = plusZero(currentDate.getMinutes());
return `${date}.${month}.${currentDate.getFullYear() % 100} ${hours}:${mins}`;
};

addFormButtonElement.classList.add("empty");
addFormButtonElement.disabled = true;

const check = (elem) => {
elem.addEventListener ('input', () => {
if (textInputElement.value === "" || nameInputElement.value === "") {
addFormButtonElement.classList.add("empty");
addFormButtonElement.disabled = true;
} else {
addFormButtonElement.classList.remove("empty");
addFormButtonElement.disabled = false;
}});
}

check(textInputElement)
check(nameInputElement)



nameInputElement.addEventListener ('input',() => {
if (nameInputElement.value !== ""){
nameInputElement.classList.remove("emptyTextName");
}
});

textInputElement.addEventListener ('input',() => {
if (textInputElement.value !== ""){
textInputElement.classList.remove("emptyTextName");
}
});



const addNewComment = () => {
textInputElement.classList.remove("emptyTextName");
nameInputElement.classList.remove("emptyTextName");


if (nameInputElement.value === "" && textInputElement.value === ""){
textInputElement.classList.add("emptyTextName");
nameInputElement.classList.add("emptyTextName");
return;
} else if (textInputElement.value === "") {
textInputElement.classList.add("emptyTextName");
return;
} else if (nameInputElement.value === "") {
nameInputElement.classList.add("emptyTextName");
return;
};

let currentDate = new Date();

// comments.push(
//   {
//     name: nameInputElement.value
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;"),
//     date: now(currentDate),
//     quote: quote,
//     comment: textInputElement.value
//     .replace(`"${quote}"\n`, "")
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;"),
//     // .replaceAll(`"`, "<div class=quote>")
//     // .replaceAll(`"`, "</div>"),
//     like: 0,
//     activeLike: false,
//     changeButton: false,
//   });

// buttonElement.addEventListener("click", () => {
//     if (textInputElement.value === "") {
//       return;
//     }
  
  
  form.classList.add('none');
  LoadingForm.textContent = 'Комментарий добавляется...';
  // подписываемся на успешное завершение запроса с помощью then
  //const post = (text) => {
    postTodo({
        name: nameInputElement.value,
        text: textInputElement.value
    })

    .then((responseData) => {
        return fetchGet();
      })
      .then(() => {
        LoadingForm.textContent = '';
        form.classList.remove('none'); 
        textInputElement.value = "";
        nameInputElement.value = "";
      })
      .catch((error) => {
        // if (error.massage === "Сервер упал") {
       //      post(text);
        // };
        // if (window.navigator.online === false) {
        //     alert("Проблемы с интернетом, проверьте подключение")
       //  };
    
       console.warn(error);
       LoadingForm.textContent = '';
       form.classList.remove('none');
     });
};
//post();

  renderComment();

  


renderComment();





addFormButtonElement.addEventListener("click", addNewComment);

form.addEventListener("keyup", (e) => {
if (e.code === "Enter") addNewComment();
});



deleteCommentButton.addEventListener('click', () => {
comments.pop();
renderComment();
});


