const url = 'https://pokeapi.co/api/v2/pokemon/';

const selectPokemonInput = document.querySelector('.selectMyPokemon input');
const buttonSelectPokemon = document.querySelector('.selectMyPokemon button');

let POKEMONID = '1';
let setMyPokemonName;
let inimigoNome = '';
let HPMYPokemon = 100;

buttonSelectPokemon.addEventListener('click', () => {
    POKEMONID = selectPokemonInput.value;
    myPokemonInit(POKEMONID);
    const pokemonVida = document.querySelector('.pokemonVida');
    pokemonVida.style.width = `100%`;
    pokemonVida.classList.remove('dano');
});

let hpPlayerAtual = 100;
let hpInimigoAtual = 0;

let atkInimigoMove1 = '';
let atkInimigoMove2 = '';
let atkInimigoMove3 = '';
let atkInimigoMove4 = '';

let ATKmove1 = '';
let ATKmove2 = '';
let ATKmove3 = '';
let ATKmove4 = '';

function myPokemonInit(POKEMONID) {
    fetch(url + POKEMONID)
        .then(response => response.json())
        .then(data => {
            const NOME = data.name;
            const HP = 100;
            const ataques1 = data.moves[18].move.name;
            const ataques2 = data.moves[24].move.name;
            const ataques3 = data.moves[57].move.name;
            const ataques4 = data.moves[7].move.name;

            const nomePokemon = document.querySelector('h2.nomePokemon');
            nomePokemon.textContent = NOME.toUpperCase();

            setMyPokemonName = nomePokemon.textContent;

            const hpPlayer = document.querySelector('.hpPlayer');
            hpPlayer.textContent = `${HP} / ${HP}`;
            hpPlayerAtual = HP;

            HPMYPokemon = hpPlayerAtual

            const image = document.querySelector('img.MyPokemon');
            image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${POKEMONID}.gif`;

            const move1 = document.querySelector('#move1Player');
            const move2 = document.querySelector('#move2Player');
            const move3 = document.querySelector('#move3Player');
            const move4 = document.querySelector('#move4Player');

            move1.textContent = ataques1;
            move2.textContent = ataques2;
            move3.textContent = ataques3;
            move4.textContent = ataques4;

            ATKmove1 = ataques1;
            ATKmove2 = ataques2;
            ATKmove3 = ataques3;
            ATKmove4 = ataques4;

            atualizarMensagemBatalha(NOME, inimigoNome);
        })
        .catch(error => {
            console.log('Ocorreu um erro:', error);
        });
}

myPokemonInit(25);

function aplicarDanoPlayer(dano) {
    hpPlayerAtual -= dano / 2;

    const hpPlayer = document.querySelector('.hpPlayer');
    hpPlayer.textContent = `${hpPlayerAtual} / 100`;

    const pokemonVida = document.querySelector('.pokemonVida');
    pokemonVida.style.width = `${(hpPlayerAtual / 100) * 100}%`;

    if (hpPlayerAtual <= 40) {
        pokemonVida.classList.add('dano');
    }

    if (hpPlayerAtual <= 0) {
        hpPlayerAtual = 0;
        pokemonVida.style.width = '0%';
        hpPlayer.textContent = `${hpPlayerAtual} / ${hpPlayerAtual}`;

        disablePlayerMoves();

        const vs = document.querySelector('.messagem .Text');
        vs.style.color = '#f00';
        vs.textContent = 'VOCÊ FOI DERROTADO!!';
        setTimeout(() => {
            location.reload();
        }, 3000);
    }
}

function disablePlayerMoves() {
    const buttons = document.querySelectorAll('.atkButton');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function gerarInimigo() {
    const inimigoAleatorio = Math.floor(Math.random() * 350);
    let inimigoVida = document.querySelector('.inimigoVida');
    inimigoVida.classList.remove("dano");

    fetch(url + inimigoAleatorio)
        .then(response => response.json())
        .then(data => {
            // console.log(data); // Inspecione a resposta da API
            const NOME = data.name;
            const HP = 100;
            hpInimigoAtual = HP;
            inimigoNome = NOME.toUpperCase();

            const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${inimigoAleatorio}.gif`;

            // Verificações para os movimentos
            const ataques1 = data.moves[4] ? data.moves[4].move.name : 'Ataque Indisponível';
            const ataques2 = data.moves[6] ? data.moves[6].move.name : 'Ataque Indisponível';
            const ataques3 = data.moves[5] ? data.moves[5].move.name : 'Ataque Indisponível';
            const ataques4 = data.moves[10] ? data.moves[10].move.name : 'Ataque Indisponível';

            atkInimigoMove1 = ataques1;
            atkInimigoMove2 = ataques2;
            atkInimigoMove3 = ataques3;
            atkInimigoMove4 = ataques4;

            const nomeInimigoPokemon = document.querySelector('h2.nomeInimigoPokemon');
            nomeInimigoPokemon.textContent = NOME.toUpperCase();

            const hpInimigo = document.querySelector('.hpInimigo');
            hpInimigo.textContent = `${HP} / ${HP}`;

            const image = document.querySelector('img.inimigoPokemon');
            image.src = pokemonImage;

            const move1 = document.querySelector('#move1');
            const move2 = document.querySelector('#move2');
            const move3 = document.querySelector('#move3');
            const move4 = document.querySelector('#move4');
            move1.textContent = ataques1;
            move2.textContent = ataques2;
            move3.textContent = ataques3;
            move4.textContent = ataques4;

            document.querySelector('.init').style.display = 'none';

            inimigoVida.style.width = '100%';

            atualizarMensagemBatalha(setMyPokemonName, inimigoNome);
        })
        .catch(error => {
            console.log('Ocorreu um erro:', error);
        });
}

function atualizarMensagemBatalha(nomePokemon, nomeInimigo) {
    const vs = document.querySelector('.messagem .Text');
    vs.textContent = `${nomePokemon.toUpperCase()} Vs ${nomeInimigo.toUpperCase()}`;
}

function aplicarDano(dano) {
    hpInimigoAtual -= dano;

    let inimigoVida = document.querySelector('.inimigoVida');
    inimigoVida.style.width = `${(hpInimigoAtual / 100) * 100}%`;

    const hpInimigo = document.querySelector('.hpInimigo');
    hpInimigo.textContent = `${hpInimigoAtual} / 100`;
    if (hpInimigoAtual <= 40) {
        inimigoVida.classList.add("dano");
    }

    if (hpInimigoAtual <= 0) {
        hpInimigoAtual = 0;
        inimigoVida.style.width = '0%';
        hpInimigo.textContent = `${hpInimigoAtual} / 100`;

        disablePlayerMoves();

        const vs = document.querySelector('.messagem .Text');
        vs.style.color = '#0F0';
        vs.textContent = 'VOCÊ VENCEU!!';

        setTimeout(() => {
            gerarInimigo();
            vs.style.color = '#0F0';
        }, 2500);
    }
}

function recoverhp(HPup) {

    HP = hpPlayerAtual + HPup;

    const pokemonVida = document.querySelector('.pokemonVida');
    pokemonVida.style.width = `${HP}%`;

    const hpPlayer = document.querySelector('.hpPlayer');
    hpPlayer.textContent = `${HP} / 100`;

    let inimigoVida = document.querySelector('.pokemonVida');
    inimigoVida.classList.remove("dano");
}

function ataqueInimigo() {
    const ataqueAleatorioInimigo = Math.floor(Math.random() * 4);
    let move = '';

    if (ataqueAleatorioInimigo === 0) {
        move = atkInimigoMove1;
    } else if (ataqueAleatorioInimigo === 1) {
        move = atkInimigoMove2;
    } else if (ataqueAleatorioInimigo === 2) {
        move = atkInimigoMove3;
    } else {
        move = atkInimigoMove4;
    }

    fetch('https://pokeapi.co/api/v2/move/' + move)
        .then(response => response.json())
        .then(data => {
            let dano = data.power || 10;
            // console.log(move + ' : ' + dano);

            const vs = document.querySelector('.Text');
            vs.style.color = '#f00';
            vs.textContent = `INIMIGO ACERTOU! ${move} : -${dano}`;
            aplicarDanoPlayer(dano);
        });
}

function ataque(ATK) {
    let move = '';

    if (ATK === 'atk1') {
        move = ATKmove1;
    } else if (ATK === 'atk2') {
        move = ATKmove2;
    } else if (ATK === 'atk3') {
        move = ATKmove3;
    } else {
        move = ATKmove4;
    }

    fetch('https://pokeapi.co/api/v2/move/' + move)
        .then(response => response.json())
        .then(data => {
            const ataqueAleatorio = Math.floor(Math.random() * 21);

            console.log(ataqueAleatorio)

            if (ataqueAleatorio < 10) {
                ataqueInimigo();
            } else {
                console.log("MOVE: " + move)
                const vs = document.querySelector('.Text');

                if (move == "rest") {
                    vs.textContent = `VOCÊ ACERTOU! ${move}`;
                    recoverhp(100)
                } else if (move == "absorb") {
                    let dano = data.power || 45;
                    vs.style.color = '#00f';
                    vs.textContent = `VOCÊ ACERTOU! ${move} DANO -${dano}`;
                    recoverhp(45)
                    aplicarDano(dano);
                } else {
                    let dano = data.power || 45;
                    vs.style.color = '#00f';
                    vs.textContent = `VOCÊ ACERTOU! ${move} DANO -${dano}`;
                    aplicarDano(dano);
                }
            }
        });
}

gerarInimigo();