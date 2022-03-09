document.addEventListener('DOMContentLoaded', function(){
    /*
находим нужные нам элементы из HTML для изменения их контента
*/
const input=document.querySelector('#name');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting=document.querySelector('.greeting');
const changeBtn=document.querySelector('.change-quote');
const author=document.querySelector('.author');
const htmlQuote=document.querySelector('.quote');
const body=document.querySelector('body');
const slidePrev=document.querySelector('.slide-prev');
const slideNext=document.querySelector('.slide-next');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city=document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
let randomNum;

function getName(){
input.addEventListener('input', function(){
    localStorage.setItem('#name', input.value);
    let storedValue = localStorage.getItem("#name");
    input.textContent=storedValue;
})
}
getName();
/*
Получаем дату и время и обновляем время дня
*/
function showTime(){  
    let newDate=new Date();
    let currentTime=newDate.toLocaleTimeString();
    time.textContent=currentTime;
    const options = {month: 'long', day: 'numeric'};
    const currentDate = newDate.toLocaleDateString('en-ru', options);
    date.textContent=currentDate;
    setTimeout(showTime,1000);
    let hours=newDate.getHours();
    let GreetingTranslation={
    "en":"Good "+getTimeOfDay(hours)+ ", ",
    "ru": "Добрый "+getTimeOfDay(hours)+ ", ",
    }
    let key="en";
    let greetingString=GreetingTranslation[key];
    greeting.textContent=greetingString;
}
showTime();


function getRandomInt(){
    randomNum= Math.floor(Math.random() * (20 - 1) + 1);
}
getRandomInt();
function setBackground(){
    let newDate=new Date();
    let time=newDate.getHours();
    let timeOfDay=getTimeOfDay(time);
    let bgNum=String(randomNum).padStart(2,'0');
    let img=new Image();
    img.src=`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {      
        body.setAttribute("background", `${img.src}`);
        body.setAttribute("background-size", "cover");
    };
    
}
setBackground();
slidePrev.addEventListener('click', function(){
    if(randomNum>1){
        randomNum--;
        
    }
    else{
        randomNum=20;
        
    }
    setBackground();
});
slideNext.addEventListener('click', function(){
    if(randomNum<20){
        randomNum++;     
    }
    else{
        randomNum=1;
        
    }
    setBackground();
});

/*
Получаем строку, означаущую время дня
*/
function getTimeOfDay(hours){
   if(hours<3&&hours<6){
       return "night";
   }
   else if(hours>=6&&hours<12){
       return "morning";
   }
   else if(hours>=12&&hours<18){
       return "afternoon";
   }
   else{
       return "evening";
   }
}


/*
пишем функцию для генерирования цитаты дня
*/ 
async function getQuotes(){
    const quotes='data.json';
    const res=await fetch(quotes);
    const data=await res.json();
    let random=Math.ceil(Math.random()*6);   
    htmlQuote.textContent=data[random]["text"].toString();
    author.textContent=data[random]["author"].toString();
    changeBtn.addEventListener('click', function(){
    random=Math.ceil(Math.random()*6);
    htmlQuote.textContent=data[random]["text"].toString();
    author.textContent=data[random]["author"].toString();
    })
}
getQuotes();
async function getWeather(){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=160c43174116e183865354996c62c787&units=metric`;
    const result=await fetch(url);
    const data=await result.json();
    weatherIcon.className = 'weather-icon owf';
    try{
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        weatherError.textContent = "";
        wind.textContent = Math.round(data.wind.speed);
        humidity.textContent =`Humidity: ${data.main.humidity}%`;
    }
    catch(err){
        weatherError.textContent = "Can't define city";
        temperature.textContent = ``;
        weatherDescription.textContent = ``;
        wind.textContent = ``;
        humidity.textContent =``;
    }
}
function setCity() {
      getWeather();
      city.blur();
}


city.addEventListener('change', setCity);
getWeather();
});


