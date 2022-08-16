const STATUSES = {
	friends: "group-friends",
	work: "group-work",
	family: "group-family",
	empty: "group-empty"
  };
  
  // Заранее заготовленный массив контактов
  let arrayContacts = [
	{
	  userId: guidGenerator(),
	  firstName: "Анна",
	  lastName: "Хохлова",
	  phoneNumber: "+79184404176",
	  emailAddress: "Anna-Khokhlova@yandex.ru",
	  group: "family",
	  blacklist: false
	},
	{
	  userId: guidGenerator(),
	  firstName: "Алексей",
	  lastName: "Сливень",
	  phoneNumber: "+79895689921",
	  emailAddress: "Sliva@gmail.com",
	  group: "friends",
	  blacklist: false
	},
	{
	  userId: guidGenerator(),
	  firstName: "Даниил",
	  lastName: "Забродов",
	  phoneNumber: "+79118792213",
	  emailAddress: "deniil@learningcontainer.com",
	  group: "work",
	  blacklist: false
	},
	{
	  userId: guidGenerator(),
	  firstName: "Давид",
	  lastName: "Нео",
	  phoneNumber: "+79136244487",
	  emailAddress: "devid.neo@learningcontainer.com",
	  group: "work",
	  blacklist: true
	},
	{
	  userId: guidGenerator(),
	  firstName: "Евгений",
	  lastName: "Хохлов",
	  phoneNumber: "+79296556767",
	  emailAddress: "ehohlov1001@mail.ru",
	  group: "family",
	  blacklist: false
	}
  ];
  
  //функция генератор случайного числа для id контакта
  function guidGenerator() {
	let S4 = function () {
	  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (
	  S4() +
	  S4() +
	  "-" +
	  S4() +
	  "-" +
	  S4() +
	  "-" +
	  S4() +
	  "-" +
	  S4() +
	  S4() +
	  S4()
	);
  }
  
  //Функция, которая отвечает за отображение списка контактов
  function renderPhonebook(array) {
	//Находим элемент в котором будет отображаться список контактов
	let contactList = document.querySelector(".contact-List");
  
	//Обнуляем список контактов, чтобы избежать наслоения
	contactList.innerHTML = "";
  
	//Методом forEach проходимся по массиву контактов
	array.forEach((item) => {
	  let block = document.createElement("div");
	  block.className = `contact ${item.blacklist ? "contact-blacklist" : ""}`;
	  block.innerHTML = `
		 <div class="contact-name">
		  <h3 class="fistName-lastName"> ${item.firstName} ${item.lastName} </h3>
		  <p class='group ${STATUSES[item.group]}'> ${item.group} </p>
		</div>
		<div class=contact-data>
		  <p class="phoneNumber"> <span>&#9742</span> ${item.phoneNumber} </p>
		  <p class="emailAdress"> <span>&#9993</span> ${item.emailAddress} </p>
		</div>
		<div class="control-buttons">
		  <button data-id=${
			item.userId
		  } class="delete-contact"> Удалить контакт </button>
		  <button data-id=${
			item.userId
		  } class="change-contact"> Изменить </button>
		</div>
	  `;
  
	  // На кнопки "Удалить контакт" и "изменить" навешиваем обрабодчики событий
	  block
		.querySelector(".delete-contact")
		.addEventListener("click", (event) => removeContact(event));
	  block
		.querySelector(".change-contact")
		.addEventListener("click", (event) => changeContact(event));
  
	  document
		.getElementById("filter_family")
		.addEventListener("change", () => filterContact("family"));
	  document
		.getElementById("filter_friend")
		.addEventListener("change", () => filterContact("friends"));
	  document
		.getElementById("filter_work")
		.addEventListener("change", () => filterContact("work"));
	  document
		.getElementById("filter_blacklist")
		.addEventListener("change", () => filterBlacklistContact("true"));
	  document
		.getElementById("button_reset")
		.addEventListener("click", () => renderPhonebook(arrayContacts));
  
	  contactList.append(block);
	});
  }
  
  renderPhonebook(arrayContacts);
  
  function addContact(event) {
	// функция получает event в аргумент для того, чтобы с помощью метода prevenDefault отменить перезагрузку страницы при отправке формs
	event.preventDefault();
  
	// Объявляем переменные и присваем им значения .value и .checked input-ов, в которые пользователь
	// ввел значения. Input определяем через querySelector
	let firstName = document.querySelector("#user_fistName").value;
	let lastName = document.querySelector("#user_LastName").value;
	let phoneNumber = document.querySelector("#user_phoneNumber").value;
	let emailAdress = document.querySelector("#user_emailAdress").value;
	// let group = document.querySelector("#user_group").value;
	let blacklist = document.querySelector("#blacklist").checked;
  
	let group = selectionGroup.options[selectionGroup.selectedIndex].value;
  
	// Из полученных данных объявляем объект нового контакта
	let newContact = {
	  userId: guidGenerator(),
	  firstName,
	  lastName,
	  phoneNumber,
	  emailAdress,
	  blacklist,
	  group
	};
	arrayContacts.push(newContact);
  
	renderPhonebook(arrayContacts);
	document.getElementById("formContacts").reset();
  }
  
  function removeContact(event) {
	arrayContacts = arrayContacts.filter(
	  (item) => item.userId != event.target.dataset.id
	);
  
	renderPhonebook(arrayContacts);
  }
  
  function filterContact(group) {
	if (group) {
	  // фильтруем задачи по статусу который получаем в аргументы под именем status
	  let filteredContact = arrayContacts.filter((item) => item.group === group);
	  // отфильтрованный массив передаем в функции отрисовки и вызываем ее
	  renderPhonebook(filteredContact);
	} else {
	  renderPhonebook(arrayContacts);
	}
  }
  
  function filterBlacklistContact(blacklist) {
	if (blacklist) {
	  let filteredContactBlacklist = arrayContacts.filter(
		(item) => item.blacklist === true
	  );
	  renderPhonebook(filteredContactBlacklist);
	} else {
	  renderPhonebook(arrayContacts);
	}
  }
  
  function newContactEventListeners() {
	document
	  .querySelector(".form")
	  .addEventListener("submit", (event) => addContact(event));
  }
  
  renderPhonebook(arrayContacts);
  newContactEventListeners();
  
  var input,search,pr,result,result_arr, locale_HTML, result_store;

function func() {
 	locale_HTML = document.body.innerHTML;   // сохраняем в переменную весь body (Первоначальный)
}
setTimeout(func, 1000);  //ждем подгрузки Jsona и выполняем

function FindOnPage(name, status) {

	input = document.getElementById(name).value; //получаем значение из поля в html
	
	if(input.length<3&&status==true)
	{
		alert('Для поиска вы должны ввести три или более символов');
		function FindOnPageBack() { document.body.innerHTML = locale_HTML; }
	}
	
	if(input.length>=3)
	{
		function FindOnPageGo() {

			search = '/'+input+'/g';  //делаем из строки регуярное выражение
			pr = document.body.innerHTML;   // сохраняем в переменную весь body
			result = pr.match(/>(.*?)</g);  //отсекаем все теги и получаем только текст
			result_arr = [];   //в этом массиве будем хранить результат работы (подсветку)

			var warning = true;
			for(var i=0;i<result.length;i++) {
				if(result[i].match(eval(search))!=null) {
					warning = false;
				}
			}
			if(warning == true) {
				alert('Не найдено ни одного совпадения');
			}

			for(var i=0; i<result.length;i++) {
				result_arr[i] = result[i].replace(eval(search), '<span style="background-color:red;">'+input+'</span>'); //находим нужные элементы, задаем стиль и сохраняем в новый массив
			}
			for(var i=0; i<result.length;i++) {
				pr=pr.replace(result[i],result_arr[i])  //заменяем в переменной с html текст на новый из нового массива
			}
			document.body.innerHTML = pr;  //заменяем html код
		}
	}
	function FindOnPageBack() { document.body.innerHTML = locale_HTML; }
	if(status) { FindOnPageBack(); FindOnPageGo(); } //чистим прошлое и Выделяем найденное
	if(!status) { FindOnPageBack(); } //Снимаем выделение
}