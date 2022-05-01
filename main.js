import { primary } from "./primary.js";
import { promotions } from "./promotions.js";
import { social } from "./social.js";
// main hamburger menu
const mainNav = document.querySelector("#main-nav");
const leftNav = document.querySelector(".left-nav");
const leftNavBottom = document.querySelector(".nav-left-bottom");
const meet = document.getElementById("meet");
const hangouts = document.getElementById("hangouts");
// tabs for primary, promotions, social
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");
// ul for imported lists
const mailList = document.querySelector("#mail-list");
const promoList = document.querySelector("#promo-list");
const socialList = document.querySelector("#social-list");
// search input
const searchInput = document.querySelector("#search-global");
const searchMenu = document.querySelector(".search-menu");
//right icons
const globalNavRight = document.querySelector(".global-nav-right-part");

const settingsIcon = document.querySelector(".settings-nav-right");
const quickSettings = document.querySelector(".quick-settings");
const supportIcon = document.querySelector(".support-nav-right");
const supportDiv = document.getElementById("support"); //done
const bars = document.querySelector(".fa-buromobelexperte");
const extensions = document.getElementById("extensions"); //done
const accountIcon = document.querySelector(".account-icon");
const account = document.getElementById("account"); //done

const rightBar = document.querySelector(".right-nav");
const rightBarBtn = document.querySelector(".fa-chevron-right");
let clicked = false;
// nex, prev buttons
const pageInfoSpan = document.querySelector("#page-info");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const spinnerDiv = document.querySelector("#spinner");
// starred folder
const starred = document.querySelector("#starred");
const select = document.querySelector(".select");
const mailItem = document.querySelectorAll(".mail-item");
//compose
const compose = document.querySelector(".compose");
const newMessage = document.getElementById("new-message");
const closeMessage = document.querySelector(".fa-xmark");

// main hamburger menu
mainNav.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("i'm working");
  if (clicked === true) {
    leftNav.style.maxWidth = "57px";
    leftNavBottom.style.maxWidth = "57px";
    meet.innerText = "";
    hangouts.innerText = "";
    clicked = false;
  } else {
    leftNav.style.maxWidth = "250px";
    leftNavBottom.style.maxWidth = "250px";
    meet.innerText = "Meet";
    hangouts.innerText = "Hangouts";
    clicked = true;
  }
});

// compose a message
compose.addEventListener("click", () => {
  if (clicked === true) {
    newMessage.style.display = "block";
    clicked = false;
  } else {
    newMessage.style.display = "none";
    clicked = true;
  }
  iconA.addEventListener("click", () => {
    if (clicked === true) {
      fontEditor.style.display = "block";
      console.log("debug");
      //   clicked = false;
    } else {
      fontEditor.style.display = "none";
      //   clicked = true;
    }
  });
  closeMessage.addEventListener("click", function() {
      newMessage.style.display = "none";
  });
});

//right nav function
// globalNavRight.addEventListener("click", function () {
//   if (childNode.className === "support-nav-right" && clicked === true) {
//     supportDiv.style.display = "block";
//     clicked = false;
//   } else {
//     supportDiv.style.display = "none";
//     clicked = true;
//   }
// });
supportIcon.addEventListener("click", function () {
  if (clicked === true) {
    supportDiv.style.display = "block";
    clicked = false;
  } else {
    supportDiv.style.display = "none";
    clicked = true;
  }
});

settingsIcon.addEventListener("click", function () {
  if (clicked === true) {
    quickSettings.style.display = "block";
    clicked = false;
  } else {
    quickSettings.style.display = "none";
    clicked = true;
  }
});

bars.addEventListener("click", function () {
  if (clicked === true) {
    extensions.style.display = "block";
    clicked = false;
  } else {
    extensions.style.display = "none";
    clicked = true;
  }
});

accountIcon.addEventListener("click", function () {
  if (clicked === true) {
    account.style.display = "block";
    clicked = false;
  } else {
    account.style.display = "none";
    clicked = true;
  }
});

rightBarBtn.addEventListener("click", function () {
  if (clicked === true) {
    rightBar.style.display = "none";
    clicked = false;
  } else {
    rightBar.style.display = "block";
    clicked = true;
  }
});

// prevBtn & nextBtn function
let pageNumber = 0;
let limit = 25;

function createMails(mails) {
  mailList.innerHTML = "";
  const lastPage = Math.floor(mails.length / limit);
  const start = pageNumber * limit;
  const end = (pageNumber + 1) * limit;
  const partialMails = mails.slice(start, end);

  spinnerDiv.style.display = "block";

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
    renderEmails(partialMails)
  }, 1000);
}
createMails(primary);

function renderEmails(partialMails) {
  for (let mail of partialMails) {
    const mailTime = mail.date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
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
    const premadeList = `<p><i class="fa-solid fa-clock"></i>${mail.senderName}</p>`
    mailList.innerHTML += eachMail;
    searchMenu.innerHTML += premadeList;
    // console.log(mailList, "mailList") 
    // select checked/unchecked event
    select.addEventListener("click", function (el) {
      let mailCheckbox = document.querySelectorAll(
        `input[name="check-${mail.id}"]`
      );
      mailCheckbox.forEach((checkbox) => {
        if (el.target.checked) {
          checkbox.checked = "checked";
          mailItem.style.backgroundColor = "rgb(194,219,255)";
        } else {
          checkbox.checked = "";
          mailItem.style.backgroundColor = "white";
        }
      });
    });

    //global search
    // searchInput.addEventListener("click", function (e) {       
    //   searchMenu.forEach(searchMail => {
    //     if(e.target.value === searchMenu[searchMail]) {
    //       console.log("yay")
    //     }
    //   })              
    // });

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

  spinnerDiv.style.display = "none";
}
// next & prev buttons
prevBtn.addEventListener("click", function (event) {
  event.preventDefault();
  mailList.innerHTML = "";
  pageNumber--;
  createMails(primary);
});

nextBtn.addEventListener("click", function (event) {
  event.preventDefault();
  mailList.innerHTML = "";
  pageNumber++;
  createMails(primary);
});

// primary, promotions, social buttons
tabs.forEach((tab) => {
  tab.addEventListener("click", function (event) {
    event.preventDefault();
    const email = event.currentTarget.dataset.tabTarget;
    if (email === "#mail-list") {
      createMails(primary)
    }
    if (email === "#promo-list") {
      createMails(promotions)
    }
    if (email === "#social-list") {
      createMails(social)
    }
    console.log(event.currentTarget.dataset.tabTarget)
  });
});
