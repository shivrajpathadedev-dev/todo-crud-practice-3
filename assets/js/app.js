const cl=console.log;

const todocontainer=document.getElementById('todocontainer');
const todoitem=document.getElementById('todoitem');
const todoform=document.getElementById('todoform');
const submitbtn=document.getElementById('submitbtn');
const updatebtn=document.getElementById('updatebtn');





let arr=[
    {
        todoItem:"front end",
        todoId:"123456"
    },
    {
        todoItem:"Back end",
        todoId:"654321"
    }
]

function createList(arr){
    let result=`<ul class="list-group">`

    arr.forEach(c=>{
        result+=` <li id="${c.todoId}"class="list-group-item d-flex justify-content-between align-items-center">
                                <strong>${c.todoItem}</strong>
                                <div>
                                    <i onClick="onEditbtn(this)" class="fa-regular fa-pen-to-square text-primary fa-2x "></i>
                                    <i onClick="onRemovebtn(this)" class="fa-regular fa-trash-can fa-2x text-danger"></i>
                                </div>
                            </li>`
    });
    result+=`</ul>`
    todocontainer.innerHTML=result;

}

//add
function onaddbtn(eve){
    eve.preventDefault()

    let obj={
        todoItem:todoitem.value,
        todoId:Date.now().toString()

    }
    let li=document.createElement('li');
    li.id=obj.todoId
    li.className=`list-group-item d-flex justify-content-between align-items-center`
    li.innerHTML=`<strong>${obj.todoItem}</strong>
                                <div>
                                    <i onClick="onEditbtn(this)" class="fa-regular fa-pen-to-square text-primary fa-2x "></i>
                                    <i onClick="onRemovebtn(this)" class="fa-regular fa-trash-can fa-2x text-danger"></i>
                                </div>`

    let ul=document.querySelector('#todocontainer',li)
    ul.prepend(li)
}

//remove

function onRemovebtn(eve){
      let REMOVE_ID=eve.closest('li').id

      let getIndex=arr.findIndex(c=>c.todoId===REMOVE_ID);
      arr.splice(getIndex,1);
      eve.closest('li').remove()
}

//edit
let EDIT_ID;
function onEditbtn(eve){
    EDIT_ID=eve.closest('li').id

    let EDIT_OBJ=arr.find(c=>c.todoId===EDIT_ID);
    todoitem.value=EDIT_OBJ.todoItem;
    submitbtn.classList.add('d-none');
    updatebtn.classList.remove('d-none');
}

//update
function onupdatebtn(eve){
    let UPDATE_OBJ={
        todoItem:todoitem.value,
        todoId:EDIT_ID
    }
         todoform.reset()
      let getIndex=arr.find(c=>c.todoId===EDIT_ID);
     arr[getIndex]=UPDATE_OBJ;
    updatebtn.classList.add('d-none');
     submitbtn.classList.remove('d-none');

      let li=document.getElementById(EDIT_ID).firstElementChild
     li.innerText=UPDATE_OBJ.todoItem;

}



createList(arr);
todoform.addEventListener('submit',onaddbtn);
updatebtn.addEventListener('click',onupdatebtn);
