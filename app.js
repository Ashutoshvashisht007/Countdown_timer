const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2022,11,19,11,30,00);

const futureDate = new Date(tempYear,tempMonth,tempDay + 10,11,30,0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
const date = futureDate.getDate();
const weekday = futureDate.getDay();

giveaway.textContent = `give away ends on ${weekdays[weekday]}, ${date} ${months[month]} ${year} at ${hours}:${minutes}am `;

// future times in ms

const futureTime = futureDate.getTime();

function getRemainingTime()
{
  const currDate = new Date();
  const currTime = currDate.getTime();
  // diff is in mili seconds
  const diff = (futureTime - currTime);
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60min
  // 1day = 24hr

  // values in ms
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;
  let days = Math.floor(diff / oneDay);
  let hours = Math.floor((diff % oneDay) / oneHour);
  let min = Math.floor((diff % oneHour )/ oneMinute);
  let seconds = Math.floor((diff % oneMinute )/ 1000);

  // set values array
  const values = [days,hours,min,seconds];

  function format(item)
  {
    if(item < 10){
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach((item,index)=>{
    item.innerHTML = format(values[index]);
  });

  if(diff < 0)
  {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">
                            sorry this give away has expired
                          </h4>`;
  }

}
// countdown

let countdown = setInterval(getRemainingTime,1000);
getRemainingTime();

