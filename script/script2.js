const img_url = "https://image.tmdb.org/t/p/w500/";


// =================================================================================================================
// getting data from localstorage
// =================================================================================================================

let movie_detail = JSON.parse(localStorage.getItem("movieDetail"));

// console.log(movie_detail[0]);

let data = movie_detail[0];

let movie_type = data.genres;


// =================================================================================================================
// appending data to DOM
// =================================================================================================================

let parent = document.getElementById("movie_detail");


let poster_div = document.createElement("div");

poster_div.setAttribute("id", "poster_div");

let poster = document.createElement("img");

poster.src = img_url + data.poster_path;

poster_div.append(poster);



let mainAsideDiv = document.createElement("div");

mainAsideDiv.setAttribute("id","mainAsideDiv");

let mainTitle_div = document.createElement("div");

mainTitle_div.setAttribute("id", "mainTitle_div");



let title_divOne = document.createElement("div");

title_divOne.setAttribute("id", "title_divOne");

let title = document.createElement("h2");

title.innerText = data.original_title;

title_divOne.append(title);


let title_divTwo = document.createElement("div");

title_divTwo.setAttribute("id", "title_divTwo");


let release_date = document.createElement("p");

release_date.innerText = data.release_date;

let language = document.createElement("p");

language.setAttribute("id","language");

language.innerText = data.original_language;

let genres = document.createElement("ul");

// let li1 = document.createElement("li");

// let li2 = document.createElement("li");

movie_type.forEach((type)=>{
    let li = document.createElement("li");

    li.innerText = type.name;

    genres.append(li);
})

// li1.innerText = data.genres[0].name;

// li2.innerText = data.genres[1].name;

// genres.append(li1, li2);


title_divTwo.append(release_date, language, genres);


mainTitle_div.append(title_divOne, title_divTwo);


let mainOverview_div = document.createElement("div");
mainOverview_div.setAttribute("id","mainOverview_div");

let overview = document.createElement("p");
overview.setAttribute("id","overview")

overview.innerText = " " + data.overview;

let popularity = document.createElement("p")

let tagline = document.createElement("p");
tagline.setAttribute("id","tagline")

tagline.innerText = " " + data.tagline;

let vote = document.createElement("p");
vote.setAttribute("id", "rating");

vote.innerText = " " + data.vote_average;

let release = document.createElement("p");
release.setAttribute("id","release");

release.innerText = " " + data.status;

if(tagline.innerText != " "){
    mainOverview_div.append(overview,tagline,vote,release);
}
else{
    mainOverview_div.append(overview,vote,release);
}




mainAsideDiv.append(mainTitle_div, mainOverview_div)

parent.append(poster_div, mainAsideDiv);


window.onbeforeunload = function(){
    localStorage.removeItem("movieDetail");
}