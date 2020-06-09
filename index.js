// ЗАДАНИЯ ДЛЯ РАЗМИНКИ!!!!!!)))

// EXERCISE-1:
// Есть код ! с помощью async await реализуем правильную последовательность!!

setTimeout(()=> console.log('1'), 1300);
console.log('2')
console.log('3')
setTimeout(()=> console.log('4'), 300);
console.log('5')

// ANSWER:

function getPromise(value, delay) {
  return new Promise ((res, rej) => {
    setTimeout(() => {
      console.log(value);
      res();
    }, delay)
  })
}

async function getValue() {
  const firstValue = await getPromise('1', 1300);
  console.log('2');
  console.log('3');
  const fourthValue = await getPromise('4', 300);
  console.log('5');
}

getValue();

// EXERCISE-2:
// Есть роуты!! Делаем через async await то что в предыдущей!только с небольшим усложнением
// Добавился третий роут. Результат второго запроса даст обьект в котором будет поле orderList.
// В поле orderList будет массив с обьектов, и в каждом обьекте будет поле productId.
// Использя  эти productId и 3-й роут, сделать Promise.all и получить массив с продуктов.
// https://playwithpromise.herokuapp.com/api/order-review/last - вернет обьект с id такой( 5d4762e02481a600174fb1ae )
// после чего используя id делаем другой запрос
// https://playwithpromise.herokuapp.com/api/order-review/getid/{id} 
// https://playwithpromise.herokuapp.com/api/order-system/product/{productId}
// ANSWER:

// fetch:
async function getHttp(url) {
  let data = await fetch(url);
  data = await data.json();
  return data;
}

async function getArrOfProducts() {
  const data = await getHttp('https://playwithpromise.herokuapp.com/api/order-review/last');
  const id = data._id;

  const arr = await getHttp(`https://playwithpromise.herokuapp.com/api/order-review/getid/${id}`);
  const orderList = arr.orderList;

  const firstProductId = await getHttp(`https://playwithpromise.herokuapp.com/api/order-system/product/${orderList[0].productId}`);
  const secondProductId  = await getHttp(`https://playwithpromise.herokuapp.com/api/order-system/product/${orderList[1].productId}`);

  let res = await Promise.all([firstProductId, secondProductId])
  
  console.log(res);
}

getArrOfProducts();

// XMLHttpRequest:
function getHttp(url) {
  return new Promise((res, rej) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onload = function () {
      if (this.status === 200) { // this.statusText === 'OK' или this.responseText
        res(JSON.parse(this.responseText));
      } else {
        rej('OMG Error');
      }
    }
  });
}

async function getArrOfProducts() {
  const data = await getHttp('https://playwithpromise.herokuapp.com/api/order-review/last');
  const id = data._id;

  const arr = await getHttp(`https://playwithpromise.herokuapp.com/api/order-review/getid/${id}`);
  const orderList = arr.orderList;

  const firstProductId = await getHttp(`https://playwithpromise.herokuapp.com/api/order-system/product/${orderList[0].productId}`);
  const secondProductId  = await getHttp(`https://playwithpromise.herokuapp.com/api/order-system/product/${orderList[1].productId}`);

  let res = await Promise.all([firstProductId, secondProductId])
  
  console.log(res);
}

getArrOfProducts();

// Ну и под конец меня осенило, и решил сделать так!
async function getArrOfProducts() {
  let data = await fetch('https://playwithpromise.herokuapp.com/api/order-review/last');
  data = await data.json();
  let id = data._id;

  let arr = await fetch(`https://playwithpromise.herokuapp.com/api/order-review/getid/${id}`);
  arr = await arr.json();
  let orderList = arr.orderList;

  let firstProductId = await fetch(`https://playwithpromise.herokuapp.com/api/order-system/product/${orderList[0].productId}`);
  let secondProductId  = await fetch(`https://playwithpromise.herokuapp.com/api/order-system/product/${orderList[1].productId}`);
  firstProductId = await firstProductId.json();
  secondProductId = await secondProductId.json();

  let res = await Promise.all([firstProductId, secondProductId]);
  
  console.log(res);
}

getArrOfProducts();