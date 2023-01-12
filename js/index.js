// varables
const coursesList = document.querySelector("#course-list")
const shoppingCartContent = document.querySelector("#cart-content tbody")
const shoppingCard = document.querySelector("#shopping-cart")
const clearAllBtn = document.querySelector("#clear-cart")
const numberBasckt = document.getElementById("numbers-produc")
const bag = document.querySelector(".bag")
const shoppingCart = document.querySelector("#shopping-cart")
let numberBascktProduc = 0

// event listeners
eventListeners()
function eventListeners() {
     // add the prodac
     coursesList.addEventListener("click", byeCourse)

     // show item on reload
     document.addEventListener("DOMContentLoaded", domLoad)

     //remove one prodoc
     shoppingCard.addEventListener("click", removeChoose)

     // remove all prodocs
     clearAllBtn.addEventListener("click", removeAll)

     // open or close basket
     bag.addEventListener("click", openOrClose)
}

//funstions
// add to to the bastet
function byeCourse(e) {
     e.preventDefault()
     if (e.target.classList.contains("bye")) {
          const course = e.target.parentElement.parentElement

          // get course info
          getCourseInfo(course)
     }
}

// info course
function getCourseInfo(cInfo) {
     let courseInfo = {
          img: cInfo.querySelector("a img").src,
          titel: cInfo.querySelector(".info-card").children[0].textContent,
          price: cInfo.querySelector(".info-card p").children[0].textContent,
          id: cInfo.querySelector(".bye").getAttribute("id")
     }

     addtobascet(courseInfo);
}

// Add to bascet
function addtobascet(cInfo) {
     // create row
     let row = document.createElement("tr")

     // creat child
     row.innerHTML = `
          <td>
               <img src="${cInfo.img}">
          </td>
          <td>
               ${cInfo.titel}
          </td>
          <td>
               ${cInfo.price}
          </td>
          <td>
               <a href="#" id="${cInfo.id}" class="remove">X</a>
          </td>
     `

     // add to bastec
     shoppingCartContent.appendChild(row)

     // add to storage
     addToStorage(cInfo)

     // numbers basket
     AddOrNuberBaskProdc("add")
}

// add to stoage
function addToStorage(e) {
     let localS = getFromLocalStorage()

     // add to storage
     localS.push(e)

     // set new item
     localStorage.setItem("prodocs", JSON.stringify(localS))
}

// get from local storage
function getFromLocalStorage() {
     let prodoc;
     let fromLS = localStorage.getItem("prodocs")
     if (fromLS == null) {
          prodoc = []
     } else {
          prodoc = JSON.parse(fromLS)
     }

     return prodoc

}

// show itemon load
function domLoad() {
     let fromLS = getFromLocalStorage()

     fromLS.forEach(cInfo => {
          // create row
          let row = document.createElement("tr")

          // creat child
          row.innerHTML = `
               <td>
                    <img src="${cInfo.img}">
               </td>
               <td>
                    ${cInfo.titel}
               </td>
               <td>
                    ${cInfo.price}
               </td>
               <td>
                    <a href="#" id="${cInfo.id}" class="remove">X</a>
               </td>
          `

          // add to bastec
          shoppingCartContent.appendChild(row)
     });

     const numbersItem = localStorage.getItem("producNumbersInTheBascket")
     numberBascktProduc =  JSON.parse(numbersItem)
     numberBasckt.innerHTML = `${numberBascktProduc}`
}

// remove one
function removeChoose(e) {
     e.preventDefault()
     if (e.target.classList.contains("remove")) {
          e.target.parentElement.parentElement.remove()

          let courses = e.target
          let courseId = courses.getAttribute("id")

          removeOneLS(courseId)

          AddOrNuberBaskProdc("remove")
     }
}

//remove one in the ls
function removeOneLS(id) {
     let fromLS = getFromLocalStorage()

     fromLS.forEach((course, index) => {
          if (course.id === id) {
               fromLS.splice(index, 1)
          }
     });

     localStorage.setItem("prodocs", JSON.stringify(fromLS))
}

//removeAll prodac
function removeAll(e) {
     while (shoppingCartContent.firstChild) {
          shoppingCartContent.firstChild.remove()
     }

     localStorage.clear()

     numberBasckt.innerHTML = `0`
     numberBascktProduc = 0
}

// add to number
function AddOrNuberBaskProdc(data){
     if (data === "add") {
          ++numberBascktProduc
          LSNumbersproduc(numberBascktProduc)
     } else if (data === "remove" && numberBasckt.textContent != "0"){
          --numberBascktProduc
          LSNumbersproduc(numberBascktProduc)
     }

     numberBasckt.innerHTML = `${numberBascktProduc}`
     
}

function openOrClose(){
     shoppingCart.classList.toggle("block")
}

function LSNumbersproduc(data){
     localStorage.setItem("producNumbersInTheBascket" , data)
}