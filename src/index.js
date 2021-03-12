const BASE_URL = 'http://localhost:3000';
const PICTURES_URL = 'http://localhost:3000/pictures';
const USERS_URL = 'http://localhost:3000/users';
const COMMENTS_URL = 'http://localhost:3000/comments';

let currentUser = {id: 1, name: "bill"}
// let selectedPic = {}


document.addEventListener('DOMContentLoaded', () => {

    let main = document.querySelector('main')
   
    // function fontFamily() {
    //     document.querySelector('main').style.fontFamily = "Verdana, sans-serif";
    //   }

    function getUser(id){
        return fetch(`${USERS_URL}/${id}`)
            .then(res => res.json())
    }



    function getAllPictures(){
        fetch(PICTURES_URL)
        .then(resp => resp.json())
        .then(pictures => {
            pictures.forEach(picture => {
                displayAllPicture(picture)
            });
        })
    }
    

    function hideComment(comment){
        fetch(`${COMMENTS_URL}/${comment.id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(()=> {
            let commentLi = document.querySelector(`[data-comment-id='${comment.id}']`)
            commentLi.parentElement.remove()
        })
    }

    function postComment(e){
        // console.log(e.target.dataset.pictureId) grabs the picture id
        fetch(COMMENTS_URL,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                picture_id: e.target.dataset.pictureId
            })
        })
        .then(res => res.json())
        // .then(console.log) shows created comment in the console
        .then( () => {
            let card = document.querySelector(`[data-id='${e.target.dataset.pictureId}']`)
            buildCommentLi()
        })
    }


    
    function displayAllPicture(picture) {
    
        let div = document.createElement('div')
        let h1 = document.createElement('h1')
        let h2 = document.createElement('h2')
        let h3 = document.createElement('h3')
        let img = document.createElement('img')
        let p = document.createElement('p')
        let h4 = document.createElement('h4')
    
        let btn = document.createElement('button')
        let ul = document.createElement('ul')
        // let commentForm = document.createElement('form')
        let commentInput = document.createElement('input')
        // let commentSubmit = document.createElement('button')
        
        let main = document.querySelector('main')
        

        div.className = 'picture card'
        div.id = picture.id
        h1.textContent=`${picture.title}`
        img.src=picture.image_url
        h2.textContent= (`Artist: ${picture.artist}`)    
        h3.textContent= `Date: ${picture.date}`
        p.textContent = `${picture.description}`
        h4.textContent = 'What others are thinking'

        btn.textContent = 'Add a Comment'
        btn.setAttribute('data-picture-id', picture.id)
        btn.addEventListener('click', postComment)

        // commentForm.form.setAttribute("method", "post"); 
        // commentForm.setAttribute("action", "submit");
        // style.display.hidden = true
        // btn.addEventListener('click', () => {
        //     selectedPic = picture.id
        //     console.log(selectedPic)
        // })
        
    
        picture.comments.forEach(comment => buildCommentLi(comment, ul))

        // adding all the elements to the picture cards
        div.append(h1, img, h2, h3, p, h4, ul, commentInput, btn,  )
        main.appendChild(div)
    
   
    }
    
        


    function buildCommentLi(comment, ul){
        let li = document.createElement('li')
        li.textContent = `${comment.comment}`
        let btn = document.createElement('button')
        btn.textContent = 'Hide Comment'
        btn.className = 'hide'
        btn.setAttribute('data-comment-id', comment.id)

        btn.addEventListener('click', () => hideComment(comment))
       
        li.appendChild(btn)
        ul.appendChild(li)

    }

   



    getAllPictures()
});