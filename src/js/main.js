"use strict";

const img = Array.from(document.querySelectorAll(".lazy"));

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
