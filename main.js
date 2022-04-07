import { primary } from './primary.js';
// console.log(primary[0]);
// const newEmails = primary.map((item, index) => ({id: index + 1, ...item}));
// console.log(newEmails)

const mailList = document.querySelector(".mail-list");
const pageInfoSpan = document.querySelector('#page-info');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const supportBtn = document.querySelector('.support-nav-right');
const spinnerDiv = document.querySelector('#spinner');

// supportBtn.addEventListener('click', function (e) {
//   e = document.createElement('p');
//   e.innerText = 'settings';
//   e.style.display = 'block';
//   console.log(e);
// })

let pageNumber = 0;
let limit = 15;

function createMails(mails) {
  // for (let mail of mails) { 
  // console.log(Math.floor(mails.length / limit)); 5
  // console.log(pageNumber);

  if (pageNumber === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  const lastPage = Math.floor(mails.length / limit);
  if (pageNumber === lastPage) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  const start = pageNumber * limit; // 0, 15, 30
  const end = (pageNumber + 1) * limit; // 15, 30, 45

  const partialMails = mails.slice(start, end); //[]
    console.log(partialMails);
  pageInfoSpan.innerText = `${start+1}-${end} of ${mails.length}`;

  setTimeout(() => {
    for (let mail of mails) {
      const mailTime = mail.date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    })
        const eachMail = `<li class="mail-item">
          <div class="mail-icons-left">
            <input type="checkbox" name="mail" id="mail">
            <i class="far fa-star"></i>
            <i class="far fa-bookmark"></i>
            <h4 class="title">${mail.senderName}</h4>
        </div>
        <div class="mail-content">
            <p class="subject">${mail.messageTitle}
                <span class="sub-text"> - ${mail.messages[0].message}</span>
            </p>
        </div>
        <div class="mail-icons-right">
            <i class="fas fa-archive"></i>
            <i class="fas fa-trash"></i>
            <i class="fas fa-envelope-open"></i>
            <i class="fas fa-clock"></i>
        </div>
        <div class="time-date">${mailTime}</div>  
        </li>`;
      mailList.innerHTML += eachMail;
    }
    spinnerDiv.style.display = 'none';
  },1000)
  }
  createMails(primary);
  prevBtn.addEventListener('click', function () {
    mailList.style.display = "";
    pageNumber--;
    createMails(primary);
  });

nextBtn.addEventListener('click', function () {
  mailList.style.display = "";
  pageNumber++;
  createMails(primary);
});
