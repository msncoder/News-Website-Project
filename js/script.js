// const API_KEY = "4407b38b2bd2be25d5c148d087686a23";
// const category = "any";
// const url =
//   "https://gnews.io/api/v4/top-headlines?category=" +
//   category +
//   "&lang=en&country=pk&max=15&apikey=" +
//   API_KEY;

// const newsContainer = document.querySelector(".news-cards"); // News container
// const template = document.querySelector(".template-news-card"); // Template

// async function fetchNews() {
//   try {
//     const res = await fetch(url);
//     const data = await res.json();

//     if (!data.articles) {
//       console.error("No articles found!");
//       return;
//     }

//     newsContainer.innerHTML = ""; // Pehle se existing news remove karo

//     data.articles.forEach((article) => {
//       const card = template.content.cloneNode(true);

//       // Set Image
//       const img = card.querySelector("img");
//       img.src = article.image || "https://placehold.co/400x200";
//       img.alt = article.title;

//       // Set Title
//       const title = card.querySelector("#news-title");
//       title.textContent = article.title;

//       // Set Source + Date
//       const source = card.querySelector("#news-source");
//       const formattedDate = new Date(article.publishedAt).toLocaleDateString();
//       source.textContent = `${article.source.name} • ${formattedDate}`;

//       // Set Description
//       const desc = card.querySelector("#news-desc");
//       desc.textContent = article.description || "No description available.";

//       // Add news card to the container
//       newsContainer.appendChild(card);
//     });
//   } catch (error) {
//     console.error("Error fetching news:", error);
//   }
// }
const API_KEY = "98255302d7614387b8b2281cdbd57fd5";
const url = "https://newsapi.org/v2/everything?q=";
const proxy = "https://cors-anywhere.herokuapp.com/";

window.addEventListener("load", () => fetchNews("Pakistan"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${proxy}${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

// fetchNews("Pakistan");

function bindData(articles) {
  const cardContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  // console.log(cardContainer);
  // console.log(newsCardTemplate);

  cardContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const Image = cardClone.querySelector("#news-img");
  const title = cardClone.querySelector("#news-title");
  const source = cardClone.querySelector("#news-source");
  const desc = cardClone.querySelector("#news-desc");

  Image.src = article.urlToImage;
  title.innerHTML = article.title;
  desc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  source.innerHTML = `${article.source.name} - ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchbutton = document.getElementById("search-btn");
const searchText = document.getElementById("news-search");

searchbutton.addEventListener("click", () => {
  console.log("hello");

  const query = searchText.value;
  console.log(query);

  if (!query) return;
  fetchNews(query);

  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
