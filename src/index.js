const BASE_URL = 'http://localhost:3000'
const PICTURES_URL = 'http://localhost:3000/pictures'
const USERS_URL = 'http://localhost:3000/users'
const COMMENTS_URL = 'http://localhost:3000/comments'

document.addEventListener('DOMContentLoaded', () => {

    let main = document.querySelector('main')


    function getAllPictures(){
        fetch(PICTURES_URL)
        .then(resp => resp.json())
        .then(pictures => {
            pictures.forEach(picture => {
                displayAllPicture(picture)
            });
        })
    }
    
    function displayAllPicture(picture) {
    //    div 
    // art title √
    // image url √
    // artist name
    //    date√
    // description √
    
    let div = document.createElement('div')
    let h1 = document.createElement('h1')
    let h2 = document.createElement('h2')
    let h3 = document.createElement('h3')
    let img = document.createElement('img')
    let p = document.createElement('p')
    let ul = document.createElement('ul')
     
    let main = document.querySelector('main')

    div.className = 'picture card'
    div.id = picture.id
    h1.textContent=`${picture.title}`
    img.src=picture.image_url
    h2.textContent= (`Artist: ${picture.artist}`)    
    h3.textContent= `Date: ${picture.date}`
    p.textContent = `${picture.description}`
    ul.content = picture.comments

    div.append(h1, img, h2, h3, p)
    main.appendChild(div)
    console.log(picture)
   

    }

    
    
    getAllPictures()

});