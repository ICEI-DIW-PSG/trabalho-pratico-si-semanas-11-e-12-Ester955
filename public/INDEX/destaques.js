const itensCards = [
  {
    "id": 1,
    "image": "/public/CARDS/imagens1/historia.jpeg",
    "title": "História e Patrimônio",
    "subtitle": "Arte, revoluções e memória"
  },
  {
    "id": 2,
    "image": "../public/imagens/mapa.jpeg",
    "title": "Geografia de Minas",
    "subtitle": "Montanhas, rios e biomas"
  },
  {
    "id": 3,
    "image": "../public/imagens/PicodaBandeira.jpeg",
    "title": "Paisagens Naturais",
    "subtitle": "Montanhas, cachoeiras e cânions"
  },
  {
    "id": 4,
    "image": "../public/imagens/januária.jpeg",
    "title": "Parques Naturais",
    "subtitle": "Preservação e biodiversidade"
  },
  {
    "id": 5,
    "image": "../public/imagens\\agricultura.webp",
    "title": "Agricultura Mineira",
    "subtitle": "Do campo à mesa"
  },
  {
    "id": 6,
    "image": "../public/imagens/paodequeijo.jpeg",
    "title": "Culinária Mineira",
    "subtitle": "Sabores que acolhem"
  },
  {
    "id": 7,
    "image": "../public/imagens/queijo.jpeg",
    "title": "Queijos",
    "subtitle": "Sabor que atravessa gerações"
  },
  {
    "id": 8,
    "image": "../public/imagens/Mg2.jpeg",
    "title": "Cidades Históricas",
    "subtitle": "Barroco, fé e resistência"
  },
  {
    "id": 9,
    "image": "../public/imagens/cultura.jpeg",
    "title": "Festas e Tradições",
    "subtitle": "Fé, música e identidade"
  },
  {
    "id": 10,
    "image": "./public/imagens/juscelino.webp",
    "title": "Personalidades Mineiras",
    "subtitle": "Gênios que nasceram em Minas"
  },
  {
    "id": 11,
    "image": "/public/imagens/bh.jpg",
    "title": "Belo Horizonte",
    "subtitle": "Tradição e modernidade"
  },
  {
    "id": 12,
    "image": "/public/imagens/ciencia.webp",
    "title": "Ciência e Educação",
    "subtitle": "Conhecimento que transforma"
  }
];

//JS
const URL_DESTAQUES = 'http://localhost:3000/destaques';

function abrirDetalhes(id) {
    window.location.href = `../CARDS/detalhes.html?id=${id}`; 
}

function renderizarCards(itensDaAPI) {
    const container = document.getElementById('cardsDestaqueContainer');
    if (!container) return; 

    let htmlContent = '';
    itensDaAPI.forEach((item) => {
        htmlContent += `
            <div class="col">
                <div class="card card-personalizado">
                    <img src="${item.image}" class="card-img-top" style="height: 150px; object-fit: cover;" alt="${item.title}">
                    <div class="card-body text-center">
                        <h6 class="fw-bold">${item.title}</h6>
                        <p class="text-muted small">${item.subtitle}</p>
                        
                        <div class="d-flex justify-content-center gap-2 mt-3">
                            <a href="#" onclick="abrirDetalhes('${item.id}')" class="btn btn-outline-dark btn-sm">Ver mais</a>
                            <button onclick="preencherFormularioParaEdicao('${item.id}')" class="btn btn-secondary btn-sm">Editar</button>
                            <button onclick="deletarDestaque('${item.id}')" class="btn btn-danger btn-sm">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = htmlContent;
}

async function carregarDestaques() {
    try {
        const response = await fetch(URL_DESTAQUES);
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.status}`);
        }
        
        const destaques = await response.json();
        renderizarCards(destaques);
        
    } catch (error) {
        console.error('Falha na requisição GET de Destaques:', error);
    }
}

async function deletarDestaque(id) {
    if (!confirm(`Tem certeza que deseja deletar o destaque ID ${id}?`)) return;

    try {
        const response = await fetch(`${URL_DESTAQUES}/${id}`, { method: 'DELETE' });
        
        if (response.ok || response.status === 204) { 
            alert(`Registro ID ${id} excluído com sucesso!`);
            carregarDestaques(); 
        } else {
             throw new Error(`Erro ao deletar: ${response.status}`);
        }
    } catch (error) {
        console.error('Falha na requisição DELETE:', error);
        alert('Erro ao deletar registro. Verifique o console.');
    }
}

async function criarDestaque(novoDestaque) {
    try {
        const response = await fetch(URL_DESTAQUES, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoDestaque),
        });

        if (!response.ok) throw new Error(`Erro ao criar: ${response.status}`);

        alert('Registro criado com sucesso! (POST)');
        carregarDestaques(); 
    } catch (error) {
        console.error('Falha na requisição POST:', error);
        alert('Erro ao criar registro. Verifique o console.');
    }
}

async function atualizarDestaque(id, dadosAtualizados) {
    try {
        const response = await fetch(`${URL_DESTAQUES}/${id}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados),
        });

        if (!response.ok) throw new Error(`Erro ao atualizar: ${response.status}`);

        alert(`Registro ID ${id} atualizado com sucesso! (PUT)`);
        carregarDestaques(); 
    } catch (error) {
        console.error('Falha na requisição PUT:', error);
        alert('Erro ao atualizar registro. Verifique o console.');
    }
}

async function preencherFormularioParaEdicao(id) {
    try {
        const response = await fetch(`${URL_DESTAQUES}/${id}`);
        const item = await response.json();
        
        const form = document.getElementById('formNovoDestaque');
        
        document.getElementById('titulo').value = item.title;
        document.getElementById('subtitulo').value = item.subtitle;
        document.getElementById('imagemUrl').value = item.image; // Assume que o campo 'image' existe no JSON e no HTML
        
        form.setAttribute('data-id', id);
        form.querySelector('button[type="submit"]').textContent = 'Salvar Alterações (PUT)';
        window.scrollTo(0, 0); 
    } catch (error) {
        console.error('Erro ao carregar dados para edição:', error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarDestaques();
    
    const form = document.getElementById('formNovoDestaque');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const idParaEditar = form.getAttribute('data-id');
            
            const dados = {
                title: document.getElementById('titulo').value,
                subtitle: document.getElementById('subtitulo').value,
                image: document.getElementById('imagemUrl').value 
            };
            
            if (idParaEditar) {
                atualizarDestaque(idParaEditar, dados);
            } else {
                criarDestaque(dados); 
            }
            
            form.reset();
            form.removeAttribute('data-id');
            form.querySelector('button[type="submit"]').textContent = 'Criar Destaque (POST)';
        });
    }
});