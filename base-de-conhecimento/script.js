let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

async function iniciarBusca() { 
    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("falha ao buscar dados:", error);
            return; //Interrompe a execução se houver erro
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.lenda.toLowerCase().includes(termoBusca) ||
        dado.regiaodeorigem.toLowerCase().includes(termoBusca)
        );

        renderizarCards(dadosFiltrados);
}

 function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.regiaodeorigem}</p>
        <p>${dado.lenda}</p>
        <a href="${dado.mais}" target="_blank">MAIS</a>
        `
        cardContainer.appendChild(article)
 }


}


fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector(".card-container");

    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${item.imagem}" alt="${item.texto}">
        <h2>${item.nome}</h2>
        <p><strong>origem:</strong> ${item.regiaodeorigem}</p>
        <p><strong>lenda:</strong> ${item.lenda}</p>
        <p>${item.simbolismo}</p>
        <a href="${item.mais}" target="_blank">mais</a>
      `;

      container.appendChild(card);
    });
  });