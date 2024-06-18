const videosContainer = document.querySelector(".videos__container");

async function buscarElementosVideos() {
    try {
        const buscar = await fetch("http://localhost:3000/videos");
        const videos = await buscar.json();
        videos.forEach((video) => {
            if (video.categoria == "") {
                throw new Error("Categoria não pode ser vazia");
            }
            videosContainer.innerHTML += `
                <li class="videos__item">
                    <iframe src=${video.url} title=${video.titulo} frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src=${video.imagem} alt=${video.titulo}/>
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden> ${video.categoria}</p>
                    </div>
                </li>
            `;
        });
    } catch (error) {
        videosContainer.innerHTML = `
        <p> Houve um erro ao carregar os vídeos ${error} </p>
    `;
    }
}
buscarElementosVideos();

// Busca pelo input de pesquisa
const searchBar = document.querySelector(".pesquisar__input");

function buscarElementos() {
    const videos = document.querySelectorAll(".videos__item");

    videos.forEach((video) => {
        const titulo = video
            .querySelector(".titulo-video")
            .textContent.toLowerCase();
        const valorBarraDePesquisa = searchBar.value.toLowerCase();

        if (titulo.includes(valorBarraDePesquisa)) {
            video.style.display = "";
        } else {
            video.style.display = "none";
        }
    });
}
searchBar.addEventListener("input", buscarElementos);

// Busca pela barra de categorias
const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
    const nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => buscaPorCategoria(nomeCategoria));
});

function buscaPorCategoria(filtro) {
    const videos = document.querySelectorAll(".videos__item");
    for (let video of videos) {
        let categoria = video
            .querySelector(".categoria")
            .textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if (!categoria.includes(valorFiltro) && valorFiltro != "tudo") {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }
}
