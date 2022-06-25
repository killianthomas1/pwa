const form = document.getElementById('searchForm');
const searchAuteur = document.getElementById('searchAuteur');
const searchLivre = document.getElementById('searchLivre');
const result = document.getElementById('result');

let _searchAuteur = "";
let _searchLivre = "";
let typederecherche = "";
let books = [];

const fetchLivres = async () => {
    books = await fetch(
        `https://api.nytimes.com/svc/books/v3/reviews.json?
        title=${_searchLivre}&api-key=tfCzVGGGNFz8FsTYieNf1QgZ3P3oqDht`
    ).then((res)=> res.json());
    console.log(books);
};

const fetchAuteurs = async () => {
    books = await fetch(
        `https://api.nytimes.com/svc/books/v3/reviews.json?author=${_searchAuteur}&api-key=tfCzVGGGNFz8FsTYieNf1QgZ3P3oqDht`
    ).then((res)=> res.json());
    console.log(books);
};

const affichage = async () => {
    //_searchAuteur = searchAuteur.value;

    await fetchAuteurs();
    
    result.innerHTML = books.results
    .map(
      (book) =>
    `
    <li>
        <h2>${book.book_title}</h2>
        <h3>${book.book_author}</h3>
        <div class="card-content">
            <div class="infos">
                <p>${book.publication_dt}</p>
                <p>${book.summary}</p>
                <a href=${book.url}>Lien critique NY Times</a>
            </div>
        </div>
    </li>
    `
    )
    .join("");
};





form.addEventListener("submit", (e) => {
    e.preventDefault();
    _searchAuteur = searchAuteur.value;
    console.log(searchAuteur.value);
    typederecherche = "byAuteur";
    affichage();
});


