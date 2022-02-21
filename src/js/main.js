"use strict";

const header = document.querySelector("#header");
const img = Array.from(document.querySelectorAll(".lazy"));

const SCROLLED_CL = "scrolled";
const NAV_SHOW_CL = "nav-slider-show";
const SHOW_CL = "show";
const HIDE_CL = "hide";

// observer option
let options = {
    root: null, // viewport
    rootMargin: "0px 0px 500px 0px",
    threshold: 1,
};

// IntersectionObserver 객체 생성
const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        const { target } = entry;

        setTimeout(() => {
            target.src = target.dataset.src;
            target.classList.remove("laze");
        }, 300);

        // observer 해제
        observer.unobserve(target);
    });
});

img.forEach((item) => {
    io.observe(item);
});

// toggle nav
const body = document.querySelector("body");
const triggerBtn = document.querySelector(".btn-trigger");
const closeBtn = document.querySelector("#nav .btn-close");

function showItem(item, btn, classname) {
    item.classList.add(classname);
    btn.ariaExpanded = true;
}

function hideItem(item, btn, classname) {
    item.classList.remove(classname);
    btn.ariaExpanded = false;
}

triggerBtn.addEventListener("click", () => {
    showItem(body, triggerBtn, NAV_SHOW_CL);
});
closeBtn.addEventListener("click", () => {
    hideItem(body, triggerBtn, NAV_SHOW_CL);
});

// searc box
const searchBtn = document.querySelector(".btn-search");
const form = document.querySelector("form#search-box");
const searchCloseBtn = form.querySelector(".btn-close");

function getQueryString() {
    const search = window.location.search;
    const searchParams = new URLSearchParams(search);
    const term = searchParams.get("term");

    if (term === null) {
        return;
    }

    return filterItem(term);
}

getQueryString();

function filterItem(value) {
    const title = document.querySelectorAll("article .title");
    const article = document.querySelectorAll("article");
    const queryStr = value.toUpperCase();

    Array.from(title).filter((tit, idx) => {
        const titContent = tit.textContent || tit.innerText;

        if (titContent.toUpperCase().indexOf(queryStr) > -1) {
            article[idx].classList.remove(HIDE_CL);
        } else {
            article[idx].classList.add(HIDE_CL);
        }
    });

    const hideCounter = document.querySelectorAll("article.hide");

    if (hideCounter.length === 20) {
        searchNotFound(`The search term could not be found "${value}"`);
        return;
    }
}

function searchNotFound(message) {
    const searchResult = document.querySelector(".search-result");
    searchResult.innerText = message;
}

searchBtn.addEventListener("click", () => {
    showItem(form, searchBtn, SHOW_CL);
});

searchCloseBtn.addEventListener("click", () => {
    hideItem(form, searchBtn, SHOW_CL);
});

// Scroll Event
window.addEventListener("scroll", () => {
    const top = window.scrollY;

    if (top <= 30) {
        header.classList.remove(SCROLLED_CL);
    } else {
        header.classList.add(SCROLLED_CL);
    }
});
