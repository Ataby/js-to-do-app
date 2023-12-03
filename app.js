const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");

let toDos= JSON.parse(localStorage.getItem("TODOS")) || [];
//ARRAY'DE TODOS ELEMENTI YOKSA BOŞ BIR ARRAY ATAMASI YAP.
console.log(toDos);




addBtn.addEventListener("click", ()=> {
      if(todoInput.value.trim()===''){ 
      //BOSLUKLARI TRIMLEYIP INPUTU KONTROL ET.
            alert("Please enter to do");

      }else{
            // console.log(todoInput.value.trim());
            const newTodo = {
                  id: new Date().getTime(), //MILISANIYE CINSINDEN
                  text: todoInput.value, //KUTUCUGA GIRILEN MADDE
                  completed: false //GOREV YAPILDI MI                
            }
            createListElement(newTodo);
            //YENI BIR 'LI' ELEMNTI OLUSTURUP BUNU DOM'A BAS.
            todoInput.value="";
            
            toDos.push(newTodo);
            localStorage.setItem("TODOS", JSON.stringify(toDos));
            //TUM OLUSTURULANLARI ARRAY'E AKTARIP SONRA LOCAL'E AKTARMAK DAHA KOLAY.
      }
   
});

const createListElement = (newTodo) => {
      const li = document.createElement("li");

      const {id,text,completed}=newTodo; //DESTRUCTURE

      // li.id = newTodo.id;
      li.setAttribute("id",id); 
      // 'Lİ' İÇİNE İD DEGİSKENI OLUSTURUP, DEGERINI NEWTODO.ID'SINDEN AL.
      

      // newTodo.completed ? li.classList.add("done") : '';
      completed && li.classList.add("done");
      //GOREV YAPILDIYSA YENI KLAS ADI EKLE VE CSS ILE OZELLESTIR.

      const okIcon = document.createElement("i");
      okIcon.setAttribute("class", "fa-solid fa-check fa-xl");
      okIcon.setAttribute("style", "color: #0dc200");
      li.appendChild(okIcon);
      //CHECK IKONUNU OLUSTUR, OZELLEŞTIR, 'LI' YE EKLE.
      
      const p=document.createElement("p");
      const pTextNode = document.createTextNode(text);
      p.appendChild(pTextNode);
      li.appendChild(p);
      //P ELEMNTI OLUSTUR, ICINE TEXT EKLEYIP 'LI'YE EKLE.
      
      const delIcon = document.createElement("i");
      delIcon.setAttribute("class", "fa-solid fa-trash-can");
      delIcon.setAttribute("style","color:#e50606");
      li.appendChild(delIcon);
      //DELETE IKONUNU OLUSTUR, OZELLEŞTIR, 'LI' YE EKLE.

      todoUl.appendChild(li);
      //LI'YI UL'YE EKLE.
      console.log(li);
};

todoInput.addEventListener("keydown",(e)=> {
      if(e.code==='Enter'){
            addBtn.click();
      } //ENTER'LADIGINDA LISTEYE EKLE.
});

const renderSavedTodos = ()=>{ toDos.forEach((todo)=>{
      createListElement(todo);
});
};


window.onload = function(){
      renderSavedTodos();
      todoInput.focus(); 
      //SAYFA ACILINCA INPUT.BOX'A ODAKLAN.

};

// document.querySelector("body").addEventListener("click",(e)=>{
//       console.log(e.target);
// }) //PARENT-CHILD ILISKISI ILE UST BOLUMLERDE TEK EVENT ILE ALT BOLUMLERDEN BILGI ALINABILIR.

todoUl.addEventListener("click",(e)=>{
      console.log(e.target);

      // const id = e.target.parentElement.getAttribute("id");
      if(e.target.classList.contains("fa-trash-can")){//CLICK, HANGI BUTONDAN GELDI?
            e.target.parentElement.remove();
            //TRASH ICERIYORSA ELEMNTI KALDIR

            toDos= toDos.filter((item)=>item.id!= e.target.parentElement.id) // DELETE TIKLANDIGINDA LİSTEDE GERİYE KALANLARI SAKLA
            console.log(toDos);
            
            localStorage.setItem("TODOS", JSON.stringify(toDos));
            //LOCAL'DE TODOS'UN ICINE STRING OLARAK BU ELEMANI YAZDIR.
            //TUM OLUSTURULANLARI ARRAY'E AKTARIP SONRA LOCAL'E AKTARMAK DAHA KOLAY.
      }
      else if(e.target.classList.contains("fa-check")){
            e.target.parentElement.classList.toggle("done");
            //TOGGLE FONK. ELEMNT VARSA SILER YOKSA EKLER.

            toDos= toDos.filter((item)=>item.id!= e.target.parentElement.id) //CHECK TIKLANDIGINDA LISTEDE GERIYE KALANLARI SAKLA.
            console.log(toDos);
            
            localStorage.setItem("TODOS", JSON.stringify(toDos));
            //YENI LISTEYI LOKAL'E SAKLA

      }
})