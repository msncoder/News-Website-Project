const API_KEY = "98255302d7614387b8b2281cdbd57fd5";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Pakistan"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
}
