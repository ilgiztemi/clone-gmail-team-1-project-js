import { primary } from './primary.js';
import { promotions } from './promotions.js';
import { social } from './social.js';
// main hamburger menu
const mainNav = document.querySelector("#main-nav");
const leftNav = document.querySelector(".left-nav");
// tabs for primary, promotions, social
const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');
// ul for imported lists
const mailList = document.querySelector("#mail-list");
const promoList = document.querySelector("#promo-list");
const socialList = document.querySelector("#social-list");
// search input
const searchInput = document.querySelector("#search-global");
// nex, prev buttons
const pageInfoSpan = document.querySelector('#page-info');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const supportBtn = document.querySelector('.support-nav-right');
const spinnerDiv = document.querySelector('#spinner');
// starred folder
const starred = document.querySelector('#starred');
const select = document.querySelector('.select');
const mailItem = document.querySelectorAll(".mail-item");

// main hamburger menu 
mainNav.addEventListener("click", function () {
  console.log("i'm working")
  leftNav.style.maxWidth = "50px"
})

//global search
// searchInput.addEventListener("click", function(e){
//   let result = [];
// })

supportBtn.addEventListener('click', function (e) {
  e = document.createElement('p');
  e.innerText = 'Help, Training, Updates';
  e.style.display = 'block';
  e.style.height = '100px';
  e.style.width = '100px';
  e.innerHTML
  console.log(e);
})

// prevBtn & nextBtn function
let pageNumber = 0;
let limit = 25;

function createMails(mails) {
  const lastPage = Math.floor(mails.length / limit);
  const start = pageNumber * limit;
  const end = (pageNumber + 1) * limit;
  const partialMails = mails.slice(start, end);

  spinnerDiv.style.display = 'block';

  if (pageNumber === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (pageNumber === lastPage) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  pageInfoSpan.innerText = `${start + 1}-${end} of ${mails.length}`;

  setTimeout(() => {
    for (let mail of partialMails) {
      const mailTime = mail.date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      // each primary email
      const eachMail = `<li id="${mail.id}" class="mail-item">
          <div class="mail-icons-left">
            <input type="checkbox" name="check-${mail.id}" id="${mail.id}">
            <i class="far fa-star"></i>
            <i class="far fa-bookmark"></i>
            <h4 class="title">${mail.senderName}</h4>
        </div>
        <div class="mail-content">
            <p class="subject">${mail.messageTitle}
                <span class="sub-text"></span><span id="tags" style="visibility: hidden">${mail.tags.isStarred}</span>
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

      // select checked/unchecked event
      select.addEventListener("click", function (el) {
        let mailCheckbox = document.querySelectorAll(`input[name="check-${mail.id}"]`);
        mailCheckbox.forEach((checkbox) => {
          if (el.target.checked) {
            checkbox.checked = "checked";
            mailItem.style.backgroundColor = "rgb(194,219,255)";
          } else {
            checkbox.checked = "";
            mailItem.style.backgroundColor = "white";
          }
        })
      })

      // filter starred messages event

      // starred.addEventListener("click", function () {
      //   console.log(mail.tags.isStarred)
      //   let starredList = document.querySelectorAll(`#tags${mail.tags.isStarred}`);

      //   function starred() {
      //     for (let el of starredList) {
      //       if (el === true) {
      //         eachMail.innerHTML += eachMail;
      //       } else {
      //         eachMail.innerHTML = eachMail;
      //       }
      //     }
      //     eachMail.innerHTML += eachMail
      //   }
      // })
    }

    spinnerDiv.style.display = 'none';
  }, 1000)
}
createMails(primary);

// next & prev buttons
prevBtn.addEventListener('click', function () {
  mailList.innerHTML = '';
  pageNumber--;
  createMails(primary);
});

nextBtn.addEventListener('click', function () {
  mailList.innerHTML = '';
  pageNumber++;
  createMails(primary);
});


// primary, promotions, social buttons
tabs.forEach(tab => {
  tab.addEventListener('click', function () {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(content => {
      content.classList.remove("active");
    })
    tabs.forEach(tab => {
      tab.classList.remove("active");
    })
    target.classList.add("active");
    tab.classList.add("active");
  })
})

// promo mails
function importPromotions(promos) {
  for (let promo of promos) {
    const promoMail = `<li id="${promo.id}" class="mail-item">
        <div class="mail-icons-left">
            <input type="checkbox" name="check-${promo.id}" id="${promo.id}">
            <i class="far fa-star"></i>
            <i class="far fa-bookmark"></i>
            <h4 class="title">${promo.senderName}</h4>
        </div>
        <div class="mail-content">
            <p class="subject">${promo.messageTitle}
                <span class="sub-text"></span><span id="tags" style="visibility: hidden">${promo.tags.isStarred}</span>
            </p>
            
        </div>
        <div class="mail-icons-right">
            <i class="fas fa-archive"></i>
            <i class="fas fa-trash"></i>
            <i class="fas fa-envelope-open"></i>
            <i class="fas fa-clock"></i>
        </div>
        <div class="time-date">2:20 PM</div>  
        </li>`;
    promoList.innerHTML += promoMail;

  }
}

importPromotions(promotions);

// social mails
function importSocial(socials) {
  for (let sMail of socials) {
    const socialMail = `<li id="${sMail.id}" class="mail-item">
        <div class="mail-icons-left">
            <input type="checkbox" name="check-${sMail.id}" id="${sMail.id}">
            <i class="far fa-star"></i>
            <i class="far fa-bookmark"></i>
            <h4 class="title">${sMail.senderName}</h4>
        </div>
        <div class="mail-content">
            <p class="subject">${sMail.messageTitle}
                <span class="sub-text"></span><span id="tags" style="visibility: hidden">${sMail.tags.isStarred}</span>
            </p>
            
        </div>
        <div class="mail-icons-right">
            <i class="fas fa-archive"></i>
            <i class="fas fa-trash"></i>
            <i class="fas fa-envelope-open"></i>
            <i class="fas fa-clock"></i>
        </div>
        <div class="time-date">2:20 PM</div>  
        </li>`;
    socialList.innerHTML += socialMail;
  }
}

importSocial(social);

