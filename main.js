import { primary } from './primary.js';
// console.log(primary[0]);
// const newEmails = primary.map((item, index) => ({id: index + 1, ...item}));
// console.log(newEmails)

const mailList = document.querySelector(".mail-list");
const pageInfoSpan = document.querySelector('#page-info');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const supportBtn = document.querySelector('.support-nav-right');

supportBtn.addEventListener('click', function (e) {
  e = document.createElement('p');
  e.innerText = 'settings';
  e.style.display = 'block';
  console.log(e);
})
// const spinnerDiv = document.querySelector('#spinner');

let pageNumber = 0;
let limit = 15;
let list = [];
function createMails(mails) {
  for (let mail of mails) { 
  // spinnerDiv.style.display = 'block';
  // console.log(Math.floor(emails.length / limit)); 5
  // console.log(pageNumber);

//   if (pageNumber === 0) {
//     prevBtn.disabled = true;
//   } else {
//     prevBtn.disabled = false;
//   }

//   const lastPage = Math.floor(mails.length / limit);
//   if (pageNumber === lastPage) {
//     nextBtn.disabled = true;
//   } else {
//     nextBtn.disabled = false;
//   }

//   const start = pageNumber * limit + 1; // 0, 15, 30
//   const end = (pageNumber + 1) * limit; // 15, 30, 45

  // const partialMails = mails.slice(start, end); //[]

  // pageInfoSpan.innerText = `${start}-${end} of ${mails.length}`;

//   setTimeout(() => {
//     for (let mail of partialMails) {
//       const mailTime = mail.date.toLocaleString('en-US', {
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true,
//       });
        const eachMail = `<li class="mail-item">
          <div class="mail-icons-left">
            <input type="checkbox" name="mail" id="mail">
            <i class="far fa-star"></i>
            <i class="far fa-bookmark"></i>
            <h4 class="title">Slack</h4>
        </div>
        <div class="mail-content">
            <p class="subject">Slack account sign-in form a new device
                <span class="sub-text"> - Slack account signed-in from a new android device</span>
            </p>
        </div>
        <div class="mail-icons-right">
            <i class="fas fa-archive"></i>
            <i class="fas fa-trash"></i>
            <i class="fas fa-envelope-open"></i>
            <i class="fas fa-clock"></i>
        </div>
        <div class="time-date">8:45PM</div>  
        </li>`;
      mailList.innerHTML += eachMail;
    }
  }
  function addList (mail) {
      for (let i of mail) {
          list += mail[i];
      }
  };
  addList(list);
createMails(primary);
console.log(list);
// prevBtn.addEventListener('click', function () {
//   mailList.innerHTML = '';
//   pageNumber--;
//   createMails(primary);
// });

// nextBtn.addEventListener('click', function () {
//   mailList.innerHTML = '';
//   pageNumber++;
//   createMails(primary);
// });