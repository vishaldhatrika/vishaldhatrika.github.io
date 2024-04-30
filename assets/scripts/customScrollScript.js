function scrollLeftProj() {
    let scrollSize = document.querySelector('.my-carousel-item').clientWidth + 20;
    document.querySelector('.cards-carousel').scrollBy(-scrollSize, 0);
}
function scrollRightProj() {
    let scrollSize = document.querySelector('.my-carousel-item').clientWidth + 20;
    document.querySelector('.cards-carousel').scrollBy(scrollSize, 0);
}