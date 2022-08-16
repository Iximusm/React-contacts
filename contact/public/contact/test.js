let users = [
    {email:'Vasiy@ivanov.ru',
     password: 'qwerty',
  },
  
     {email: 'vika@petrova.ru',
     password: '1234',
  },
  
     {email: 'max@hohlov.ru',
     password: '234561',
  },
  
     {email: 'Anna@khokhlova.ru',
     password: '1234567890',
  },
  {email: 'iximusmmaxim@yandex.ru',
password: '80hh80mm'
},
  ];
  
  document.getElementById('btn').addEventListener('click', () => {
     const email = document.getElementById('email').value;
     const passwd = document.getElementById('passwd').value;
  
     let counter = 0;
     users.forEach(el =>{
         if (el.email === email && el.password === passwd){
            document.getElementById ('email').value = '';
            document.getElementById ('passwd').value = '';
            counter++;
  }
  });
  if (counter === 0){
     alert ('Неуспешная авторизация');
  } 
  else {
     alert ('Авторизация успешная');
  }
  });
  document.getElementById('btn-register').addEventListener('click', () =>{
    const email = document.getElementById('email-register').value;
    const passwd = document.getElementById('passwd-register').value;
  
    let newUser = {email: email, password: passwd}
    users.push(newUser);
    alert('Вы успешно зарегестрировали нового пользователя!');
    document.getElementById('email-register').value = '';
    document.getElementById('passwd-register').value = '';
  });
  document.getElementById('register').addEventListener('click',() => {
     document.getElementById('registration').style.display = 'inline';
     document.getElementById('entrance').style.display = 'none';
    
  });
  document.getElementById('enter').addEventListener('click',() => {
     document.getElementById('entrance').style.display = 'inline';
     document.getElementById('registration').style.display = 'none';
  });