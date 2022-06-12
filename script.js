let acorn = document.getElementById('acorn-wrapper')
let title = document.getElementById('title')
let scrollbar = document.getElementById("scroll-bar")
let downArr = document.getElementById("down-arr")
let upArr = document.getElementById("up-arr")
title.innerHTML = ""
let visible = [true, false, false]
let pages = [document.getElementById('first-page'), document.getElementById('second-page'), document.getElementById('third-page')]
let currentPage = 0

for (let i = 0; i < "College Board".length; i++) {
    title.innerHTML += "<span style = \"opacity: 0; transition: opacity 900ms 800ms;\">" + "College Board"[i] + "</span>"
}
setTimeout(() => {
    acorn.style.left = "0"
    let count = 0
    let titleLetters = title.querySelectorAll('span')
    let titleAniamtion = setInterval(() => {
        if (count == titleLetters.length - 1) clearInterval(titleAniamtion)
        titleLetters[count].style.opacity = '1'
        count++

    }, 60)
    document.getElementById('subtitle').style.opacity = "1"
}, 500)


let gridlings = document.querySelectorAll('.gridling')
let scrollbarHeight = 0
let scrollingDown
let capturedHeight = -1

//scroll bar stuff {

window.onwheel = (event) => {
    scrollingDown = event.deltaY > 0
}

if (scrollbarHeight < .8 * window.innerHeight) {
    scrollbarHeight = (window.scrollY) / (document.body.scrollHeight) * ((.8 * window.innerHeight) - 80) * (document.body.scrollHeight / (document.body.scrollHeight - window.innerHeight)) + 80
    scrollbar.style.setProperty('--height', scrollbarHeight + 'px')
}
else {
    scrollbar.style.setProperty('--height', '80vh')
}

window.onscroll = (event) => {
    for (let i = 0; i < gridlings.length; i++) {
        if (gridlings[i].getBoundingClientRect().top >= 0 && gridlings[i].getBoundingClientRect().bottom <= window.innerHeight) {
            gridlings[i].style.setProperty('--scaleVal', '1')
        }
    }
    if (scrollbarHeight < .8 * window.innerHeight) {
        scrollbarHeight = (window.scrollY) / (document.body.scrollHeight) * ((.8 * window.innerHeight) - 80) * (document.body.scrollHeight / (document.body.scrollHeight - window.innerHeight)) + 80
        if (scrollingDown && scrollbarHeight >= capturedHeight) {
            scrollbar.style.setProperty('--height', scrollbarHeight + 'px')
            capturedHeight = scrollbarHeight
        }
    }
    else {
        scrollbar.style.setProperty('--height', '80vh')
    }

}

scrollbar.onmousemove = (event) => {
    if (event.target != downArr && event.target != upArr) {
        scrollbar.style.setProperty('--shadow', "0 0 10px rgb(153, 75, 67)")
        scrollbar.style.setProperty('--top', event.clientY - event.target.getBoundingClientRect().top - (.04 * window.innerHeight) + "px")
    }
    else {
        scrollbar.style.setProperty('--shadow', "0 0 0px rgb(153, 75, 67)")

    }
}
scrollbar.onmouseleave = () => {
    scrollbar.style.setProperty('--shadow', "0 0 0px rgb(153, 75, 67)")
}

scrollbar.onclick = (event) => {
    scrollingDown = true
    let lastPage
    let nextPage
    for (let i = 0; i < 3; i++) {
        if (pages[i].getBoundingClientRect().bottom < window.innerHeight && pages[i].getBoundingClientRect().bottom >= 0) {
            lastPage = i
        }
        if (pages[i].getBoundingClientRect().top <= (i == 0 ? window.innerHeight : pages[i - 1].getBoundingClientRect().height) && pages[i].getBoundingClientRect().top >= 0) {
            nextPage = i
        }
    }
    if (event.target == downArr) {
        pages[nextPage].scrollIntoView({ behavior: "smooth", block: "start" })
    }
    else if (event.target == upArr) {
        pages[lastPage].scrollIntoView({ behavior: "smooth", block: "start" })
    }
    else {
        let place = (event.clientY - event.target.getBoundingClientRect().top - parseInt(getComputedStyle(downArr).height)) / (.8 * window.innerHeight - 2 * parseInt(getComputedStyle(downArr).height)) * (document.body.scrollHeight - window.innerHeight + 100) - 50
        window.scroll({
            top: place,
            left: 0,
            behavior: 'smooth'
        })
    }
}

// }


let options = document.querySelectorAll('.option')
let donationBar = document.getElementById('donation-bar')
let barHeight = 20
for (let i = 0; i < options.length; i++) {
    options[i].onclick = () => {
        barHeight += i * 2
        if (barHeight > 90) {
            barHeight = 90
        }
        donationBar.style.setProperty('--bar-height', barHeight + '%')
        donationBar.style.setProperty('--bar-color', typeof returnBarColor(barHeight) === "undefined" ? 'linear-gradient(135deg, rgb(245, 52, 52) 0%, rgba(203,21,21,1) 26%, rgba(79,3,3,1) 100%)' : returnBarColor(barHeight))

    }
}
function returnBarColor(barHeight) {
    let arr = ['linear-gradient(135deg, rgba(255,186,8,1) 0%, rgba(203,112,21,1) 32%, rgba(170,51,0,1) 100%)',
        'linear-gradient(135deg, rgba(249,255,8,1) 0%, rgba(203,112,21,1) 77%, rgba(170,51,0,1) 100%)',
        'linear-gradient(135deg, rgba(1,255,133,1) 50%, rgba(0,190,175,1) 74%, rgba(33,104,255,1) 96%)',
        'linear-gradient(135deg, rgba(0,255,106,1) 0%, rgba(0,227,228,1) 46%, rgba(8,150,255,1) 100%)',
        'linear-gradient(135deg, rgba(25,231,229,1) 16%, rgba(9,121,120,1) 50%, rgba(3,25,64,1) 92%)',
        'linear-gradient(135deg, rgba(40,171,255,1) 15%, rgba(89,0,255,1) 72%, rgba(83,8,163,1) 98%)',
        'linear-gradient(135deg, rgba(0,52,255,1) 8%, rgba(195,0,228,1) 62%, rgba(255,8,46,1) 100%)']
    return arr[Math.round((barHeight - 20) / 10) - 1]
}