window.onscroll = function () {
    var nav = document.querySelector(".header__inner")

    if (window.pageYOffset > 208) {
        nav.classList.add("onscroll")
    } else {
        nav.classList.remove("onscroll")
    }
}
