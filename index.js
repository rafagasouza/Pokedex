const containerCard = document.getElementById('containerCardsPokemon')
const quantidadePokemons = 300

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}
const mainTypes = Object.keys(colors)

const urlbsghs= 'https://pokeapi.co/api/v2'

const fetchPokemons = async () => {
  for(let i = 1; i <= quantidadePokemons; i ++){
    await getPokemons(i)
  }
}

const getPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const resposta = await fetch(url)
  const data = await resposta.json()

  const div = document.createElement('div')
  div.classList = 'cardpokemon'

  const pokeTypes = data.types.map(type=> type.type.name)
  const type = mainTypes.find(type => pokeTypes.indexOf(type)>-1)
  const color = colors[type]
  div.style.backgroundColor = color
  div.setAttribute('data-name', data.name.toLowerCase())

  const img = document.createElement('img')
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
  img.alt = data.name
  const nome = document.createElement('h3')

  nome.innerText = data.name[0].toUpperCase() + data.name.slice(1)
  const ide = document.createElement('span')
  ide.innerText = "#"+data.id
  div.append(img,ide, nome)
  containerCard.appendChild(div)
}


fetchPokemons()


const inputPesquisa = document.getElementById('searchPokemon');

inputPesquisa.addEventListener('input', (e) => {
  const filtro = e.target.value.toLowerCase();
  const cards = document.querySelectorAll('.cardpokemon');
  
  cards.forEach(card => {
    const nomePokemon = card.getAttribute('data-name');
    if (nomePokemon.includes(filtro)) {
      card.style.display = 'flex'; // Mostra o card
    } else {
      card.style.display = 'none'; // Esconde o card
    }
  });
});