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
