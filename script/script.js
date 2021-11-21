const img_url = "https://image.tmdb.org/t/p/w500/";

let total_pages;

let i = 1;

let previous_page;

let next_page = i +1;

let parent = document.getElementById("card-wrapper");

//previous button initial false
document.getElementById("prev_btn").disabled=true;


// =========================================================================================================
// Fetching movie data from API
// =========================================================================================================

async function showMovie(p_no){

    // let res = await fetch(`https://api.themoviedb.org/3/movie/{movie_id}?api_key=62f9c457a57a9fcb72e64ad3850b51ef&language=en-US`)

    let res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=62f9c457a57a9fcb72e64ad3850b51ef&language=en-US&page=${p_no}`)

    let data = await res.json();

    // console.log(data);

    document.getElementById("current_page").innerText=p_no.toString();

    total_pages = data.total_pages

    current_page = data.page;

    next_page = current_page + 1;

    previous_page = current_page - 1;

    // console.log(data, total_pages, current_page);

    showCard(data.results);
}

showMovie(i);


// =========================================================================================================
// Showing movie poster on DOM
// =========================================================================================================


function showCard(movies){

    parent.innerHTML = null;

    movies.forEach(function (movie){
        
        let container = document.createElement("div");

        container.className = "movie-card";

        

        // let img_div = document.createElement("div");

        let poster = document.createElement("img");

        poster.src = img_url + movie.poster_path;

        container.onclick=function(){

            container.setAttribute("data-toggle", "modal")

            container.setAttribute("data-target","#exampleModalCenter");
            getDetail(movie.id);
        }

        // img_div.append(poster);
        container.append(poster);

        // let text_div = document.createElement("div");

        // let title = document.createElement("p");

        // title.innerText = movie.title;

        // let release_date = document.createElement("p");

        // release_date.innerText = movie.release_date;

        // let rating = document.createElement("p");

        // rating.innerText = movie.vote_average;

        // text_div.append(title, release_date, rating);

        // container.append(img_div);

        parent.append(container);
    });        
}


// =========================================================================================================
// Next page function
// =========================================================================================================


function nextPage(){

    i++;
    
    showMovie(i);

    window.scrollTo(0,0);

    // next_page = i + 1;
    document.getElementById("prev_btn").disabled=false;

    if(i === total_pages){
        document.getElementById("next_btn").disabled=true;
    }

}


// =========================================================================================================
// Previous page function
// =========================================================================================================

function previousPage(){  
    
    document.getElementById("next_btn").disabled=false;  
    i--;
    if(i==1){        
        document.getElementById("prev_btn").disabled=true;
    }
    

    showMovie(i);

    window.scrollTo(0,0);
}



// =========================================================================================================
// Movie detail showing function
// =========================================================================================================




async function getDetail(movie_id){


    if(localStorage.getItem("movieDetail") === null){
        localStorage.setItem("movieDetail", JSON.stringify([]));
    }

    let local_storage = JSON.parse(localStorage.getItem("movieDetail"));

    // console.log(movie_id);


    let res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=62f9c457a57a9fcb72e64ad3850b51ef&language=en-US`)

    let data = await res.json();

    // console.log(data);

    local_storage.push(data);

    localStorage.setItem("movieDetail", JSON.stringify(local_storage));

    window.open("detail.html", "_blank");

    // window.location.href = "./detail.html"
}