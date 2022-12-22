'use strict';

const storageList = document.querySelector('.save-list'),
      button = document.querySelector('.note-form__btn'),
      form = document.querySelector('.note-form__input');

let counter;

if(localStorage.length < 1) {
    counter = 0;
} else {
    counter = localStorage.length;
}


function saveMessage() {
    button.addEventListener('click', () => {
        const message = form.value;
        counter++;
        localStorage.setItem(counter, message);
        addMessage(message);
        location.reload()
    });
}

function addMessage(elem) {
    const element = document.createElement('div');
        element.classList.add('save-list__item');
    
        element.innerHTML = `
            <span>${elem}</span>
        `;

        storageList.append(element);
        
}

function deleteMessage() {
    const elements = document.querySelectorAll('.save-list__item');
   const valuesOfStorage = Object.values(localStorage);
   
    elements.forEach(item1 => {
        item1.addEventListener('dblclick', () => {
            valuesOfStorage.forEach((item2, ind ) => {
                if(item1.innerText == item2) {
                   const u = Object.keys(localStorage)
                    localStorage.removeItem(u[ind])
                    location.reload()
                }
            })
        })
       
    })
}



saveMessage();

function render() {
    if(localStorage.length > 0) {
    let keys = Object.keys(localStorage);
        
    keys.sort((a,b) => {
        return a - b;
    });

    for(let key of keys) {
        const message = localStorage.getItem(key);
        addMessage(message);
        }
    }
}

render();
deleteMessage();