let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => { // window.onload,funcao chamada para recarregar a pag
    try{     
        await loadCharacters(currentPageUrl);
    } catch (error){
        console.log(error);
        alert('Erro ao carregar cards')

    }   

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-botton')


    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)




}

    async function loadCharacters(url) {
        const mainContent = document.getElementById('main-content')
        mainContent.innerHTML = ''; // limpar os resutados anteriores
        try {
            const response = await fetch(url)
            const responseJson = await response.json();

            responseJson.results.forEach((character) =>{


                const card = document.createElement("div") // vai criar uma nova tag html(qualquer uma)
                card.style.backgroundImage =
                 `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')` // regex
                card.className = "cards"



                const characterNameBG = document.createElement("div")
                characterNameBG.className = "character-name-bg" // adicionando classes usando .classname




                const characterName = document.createElement("span") // cria qualquer elemento js
                characterName.className = "character-name"
                characterName.innerText = `${character.name}`




                characterNameBG.appendChild(characterName) // insere um elemento dentro do outro (elemento filho)
                card.appendChild(characterNameBG)

                card.onclick = () => {
                    const modal = document.getElementById('modal')
                    modal.style.visibility = 'visible'

                    const modalContent = document.getElementById("modal-content")
                    modalContent.innerHTML = '';


                    const characterImage = document.createElement('div')

                    characterImage.style.backgroundImage = 
                    `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg`
                    characterImage.className = 'character-image'
            
                    const name = document.createElement('span')
                    name.className = 'character-details'
                    name.innerText = `nome: ${character.name}`
            
                    const characterheight = document.createElement('span')
                    characterheight.className = 'character-details'
                    characterheight.innerText = `altura: ${convertHeight(character.height)}`
            
                    const mass = document.createElement('span')
                    mass.className = 'character-details'
                    mass.innerText = `peso: ${convertMass(character.mass)}`
            
            
                    const eyeColor = document.createElement('span')
                    eyeColor.className = 'character-details'
                    eyeColor.innerText = `cor dos olhos: ${convertyEyeColor(character.eye_color)}`
            
            
                    const birthYear = document.createElement('span')
                    birthYear.className = 'character-details'
                    birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`
            
                    modalContent.appendChild(characterImage)
                    modalContent.appendChild(name)
                    modalContent.appendChild(characterheight)
                    modalContent.appendChild(mass)
                    modalContent.appendChild(eyeColor)
                    modalContent.appendChild(birthYear)
                }


                mainContent.appendChild(card)  // insere um elemento dentro do outro (elemento filho)



            } )



    const nextButton = document.getElementById('next-button') // puxando o id 
    const backButton = document.getElementById('back-botton') // puxando o id



    nextButton.disabled = !responseJson.next
    backButton.disabled = !responseJson.previous


    backButton.style.visibility = responseJson.previous? "visible" : "hidden"      // operador ternario responsalvel por verificar se ja esta em uma proxima aba para adicionar o backButton



            currentPageUrl = url


        } catch(error){
            alert('erro ao carregar os personagens')
            console.log(error) 
        }
    }


    async function loadNextPage(){
        if(!currentPageUrl) return;

        try{
            const response = await fetch(currentPageUrl)
            const responseJson = await response.json()

            await loadCharacters(responseJson.next)


        } catch(error){
            console.log(error)
            alert('erro ao carregar a prox pagina') 

        }
    }


    async function loadPreviousPage(){
        if(!currentPageUrl) return;

        try{
            const response = await fetch(currentPageUrl)
            const responseJson = await response.json()

            await loadCharacters(responseJson.previous)


        } catch(error){
            console.log(error)
            alert('erro ao carregar a pagina anterior') 

        }
    }


    function hideModal() {
        const modal = document.getElementById("modal")
        modal.style.visibility = "hidden"
    } 


    function convertyEyeColor(eyeColor) {
        const cores = {
           blue: 'azul',
           brown: 'marrom',
           green: 'verde',
           yellow: 'amarelo',
           black: 'preto',
           pink: 'rosa',
           red: 'vermelho',
           orange: 'laranja', 
           hazel: 'avela',
           unknown: 'desconhecida',
        }

        return cores[eyeColor.toLowerCase()] || eyeColor;
    }

    function convertHeight(height){
        if(height === 'unknown') {
            return 'desconhecida'
        }

        return (height / 100).toFixed(2)
    }


    function convertMass(mass) {
        if(mass === 'unknown') {
            return 'desconhecido'
        }

        return `${mass} kg`

    }

    function convertBirthYear(birthyear){
        if(birthyear === 'unknown') {
            return 'desconhecido'
        }

        return birthyear

    }