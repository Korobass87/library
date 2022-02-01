const books = [
	{
		id: '1',
		title: `Apple. Эволюция компьютера`,
		author: `Владимир Невзоров`,
		img: `https://bukva.ua/img/products/449/449532_200.jpg`,
		plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
	},
	{
		id: '2',
		title: `Как объяснить ребенку информатику`,
		author: `Кэрол Вордерман`,
		img: `https://bukva.ua/img/products/480/480030_200.jpg`,
		plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
	},
	{
		id: '3',
		title: `Путь скрам-мастера. #ScrumMasterWay`,
		author: `Зузана Шохова`,
		img: `https://bukva.ua/img/products/480/480090_200.jpg`,
		plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
	},
];
const leftBox = document.querySelector(".left-box")
const rightBox = document.querySelector(".right-box")
const addBtn = document.querySelector('.add-btn')
addBtn.addEventListener("click", onAddBtn)
console.log(rightBox)
pushToLocStor(books)


function pushToLocStor(booksForLS) {
    
    localStorage.setItem("books", JSON.stringify(booksForLS))
    markupBookList(JSON.parse(localStorage.getItem("books")))


}

function markupBookList(books) {
    let listOfBooks = document.createElement("ul")
    listOfBooks.className = "list-books"
    leftBox.prepend(listOfBooks)
    let forInner = books.map(book => {
        return (`<li id=${book.id} class="item-book"> <p class="text-link">${book.title}</p> <button data="edit" class ="btn-edit" >редактировать</button>
    <button data="delete" class = "btn-delete">удалить</button> </li>`)
    })
    listOfBooks.insertAdjacentHTML("afterbegin", forInner.join(""))

    let itemBook = document.querySelectorAll(".item-book")
    itemBook.forEach(book=>book.addEventListener("click", whatClick))
    
    console.log(itemBook);       
}

function whatClick(Event) {
    
    if (event.target.nodeName === "LI" || event.target.nodeName === "P") {
        event.target.nodeName === "LI" ? markupInfoBook(event.target.id) : markupInfoBook(event.target.parentElement.id)
    }
    else if (event.target.attributes.data.value === "edit") {
        console.log(event.currentTarget.id)
        console.log(event.target.attributes.data.value)

    }
    else if (event.target.attributes.data.value === "delete") {
        console.log(event.currentTarget.id)
        console.log(event.target.attributes.data.value)
        
    }


}

function markupInfoBook(idNum) {
    let targetBook = books.filter(book => book.id === idNum)[0]
    console.log(targetBook)
   const previewMarkup = `<h2>${targetBook.title}</h2> <p>${targetBook.author}</p><img width="150" src =${targetBook.img}>
         <p>${targetBook.plot}</p> `;
        rightBox.innerHTML = "";
        rightBox.insertAdjacentHTML("afterbegin", previewMarkup);     
}

function onAddBtn(e) {
    rightBox.innerHTML = "";
    const formAdd = `<form action="">
  <label for=""
    >title
    <input data="title" type="text" />
  </label>
  <label for=""
    >author
    <input data="author" type="text" />
  </label>
  <label for=""
    >img
    <input data="img" type="text" />
  </label>
  <label for=""
    >plot
    <input data="plot" type="text" />
  </label>
  <button class="addToLib" type="button"> добавить </button>
</form>`
    
    rightBox.innerHTML = formAdd
    const addToLib = document.querySelector(".addToLib") 
    const inputFormAdd = document.querySelectorAll("input")
    addToLib.addEventListener("click", checkToLib)
    


    function checkToLib() {
    console.log("Добавили")
    console.dir(inputFormAdd[0].attributes.data.value);
    const newBook = {
    id: `${Date.now()}` ,
		title: '',
		author: '',
		img: '',
		plot: ''
        }
    
    inputFormAdd.forEach(input=> newBook[input.attributes.data.value] = input.value)    
  
        books.push(newBook)
        leftBox.innerHTML= ""

        pushToLocStor(books)

 
}
}



