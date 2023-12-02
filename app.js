const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");


todoInput.addEventListener("keydown",(e)=> {
      if(e.code==='Enter'){
            addBtn.click();
      } //ENTER'LADIGINDA LISTEYE EKLE.
})

window.onload = function(){
      todoInput.focus(); 
      //SAYFA ACILINCA INPUT.BOX'A ODAKLAN.
}

addBtn.addEventListener("click", ()=> {
      if(todoInput.value.trim()===''){ //BOSLUKLARI TRIMLEYIP INPUTU KONTROL ET.
            alert("Please enter to do");
      }else{
            // console.log(todoInput.value.trim());
            const newTodo = {
                  id: new Date().getTime(), //MILISANIYE CINSINDEN
                  text: todoInput.value, //KUTUCUGA GIRILEN MADDE
                  done: false //GOREV YAPILDI MI                
            }
            createListElement(newTodo);
            //YENI BIR 'LI' ELEMNTI OLUSTURUP BUNU DOM'A BAS.
            todoInput.value="";
      }

});

const createListElement = (newTodo) => {
      const li = document.createElement("li");
      // li.id = newTodo.id;
      li.setAttribute("id",newTodo.id); 
      // 'Lİ' İÇİNE İD DEGİSKENI OLUSTURUP, DEGERINI NEWTODO.ID'SINDEN AL.

      const okIcon = document.createElement("i");
      okIcon.setAttribute("class", "fa-solid fa-check fa-xl");
      okIcon.setAttribute("style", "color: #0dc200");
      li.appendChild(okIcon);
      //CHECK IKONUNU OLUSTUR, OZELLEŞTIR, 'LI' YE EKLE.
      
      const p=document.createElement("p");
      const pTextNode = document.createTextNode(newTodo.text);
      p.appendChild(pTextNode);
      li.appendChild(p);
      //P ELEMNTI OLUSTUR, ICINE TEXT EKLEYIP 'LI'YE EKLE.
      
      const delIcon = document.createElement("i");
      delIcon.setAttribute("class", "fa-solid fa-trash-can");
      delIcon.setAttribute("style","color:#e50606");
      li.appendChild(delIcon);
      //DELETE IKONUNU OLUSTUR, OZELLEŞTIR, 'LI' YE EKLE.
      
      todoUl.appendChild(li);
      console.log(li);
}