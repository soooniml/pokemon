const base_url = 'https://pokeapi.co/api/v2/pokemon'
const container = document.querySelector('.container')
var offset = 0
var state = 1118 / 20;

function getData(url , query , cb){
    fetch(`${url}?${query}`)
    .then(res => res.json())
    .then(r => cb(r))
}

getData(base_url , `offset=${offset}&limit=20` , res=>{
    console.log(res.results);

    const card = res.results.map(item => Card(item)).join("")
    container.innerHTML = card
})






function Card(item){
    return `
    <div class="card">
        <div class="card_content">
            <h2>${item.name}</h2>
            <button class="more" onclick="More('${item.url}')">More</button>
        </div>
</div>
    `
}


function More(url){
    console.log(url);

    getData(url , '' , res =>{
        console.log(res)

        container.innerHTML = `
            <div class="cardM">
                <div class="card_content">
                    <h2>${res.name}</h2>
                    <div class="image">
                        <img src="${res.sprites.front_default}">
                    </div>

                    <p>Height:${res.height}</p>
                    <p>Base experience: ${res.base_experience}</p>
                    <p>Weight: ${res.weight}</p>

                </div>
            </div>
        `
    })
    
}


const prev = document.querySelector('.prev')
const count = document.querySelector('.count')
const next = document.querySelector('.next')

var pagination = 1;


prev.addEventListener('click' , e=>{
    e.preventDefault()

    offset-= 20
    pagination--
    count.innerHTML = pagination

    getData(base_url , `offset=${offset}&limit=20` , res =>{
        const card = res.results.map(item => Card(item)).join("")
        container.innerHTML = card
    })

    if(pagination < 0){
        prev.classList.add('disabled')
    }

    if(pagination < state){
        next.classList.remove('disabled')
    }
    
})

next.addEventListener('click' , e =>{
    e.preventDefault()
    
    offset+= 20
    pagination++
    count.innerHTML = pagination

    getData(base_url , `offset=${offset}&limit=20` , res =>{
        const card = res.results.map(item => Card(item)).join("")
        container.innerHTML = card
    })

    if(pagination > state){
        next.classList.add('disabled')
    }

    if(pagination > 0){
        prev.classList.remove('disabled')
    }
})