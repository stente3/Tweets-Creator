//Variables
const form = document.querySelector(".form");
const formTweets = document.querySelector("#tweet");
const formButton = document.querySelector(".form__button");
const tweetsList = document.querySelector(".tweets__list");
const ErrorAlert = document.querySelector(".alert");
let tweets = [];

formTweets.focus();

//Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    addHtml(tweets);
    getTweets();
    removeContent();
})
formButton.addEventListener("click", validator);

//Funtions
function validator() {
    if(formTweets.value === ""){
        ErrorAlert.classList.remove("d-none");
        setTimeout(() => {
            ErrorAlert.classList.add("d-none");
        }, 5000);
    } else{
        getTweets();
    }
}
function getTweets() {
    if(formTweets.value !== ""){
        let tweetObj = {
            value: formTweets.value,
            id: Date.now()
        }
        tweets = [...tweets, tweetObj];
        form.reset();
        formTweets.focus();
        localStorage.setItem("tweets", JSON.stringify(tweets));
        addHtml(tweets);
        removeContent();
    }
}
/* Add an element to html */
function addHtml(tweet) {
    resetItems();
    if(tweetsList.children.length === 0){
        tweet.forEach((item) =>{
            let newTweet = document.createElement("li");
            newTweet.classList.add("new__item");
            newTweet.setAttribute("id", item.id);
            newTweet.innerHTML =  `${item.value}<span class="item__img"></span>`;
            tweetsList.appendChild(newTweet);
        })
    }
}
/* It remove items of client's side */
function resetItems(){
    document.querySelectorAll(".item__img").forEach((item) =>{
        item.parentElement.remove();
    })
}
/* Add event listeners on each item */
function removeContent(element) {
    document.querySelectorAll(".item__img").forEach((item) =>{
        item.addEventListener("click", (e) =>{
            let id = parseInt(e.target.parentElement.getAttribute("id"));
            e.target.parentElement.remove();
            tweets = tweets.filter(tweet => tweet.id !== id);
            localStorage.setItem("tweets", JSON.stringify(tweets));
            formTweets.focus();
        })
    })
}
