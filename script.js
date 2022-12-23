// Баг
// При вводе примерно больше 5 заметок, последние не удаляются до тех пор, пока не удалить заметку номером до 5

'use strict';

const storageList = document.querySelector('.save-list'),
      button = document.querySelector('.note-form__btn'),
      form = document.querySelector('.note-form__input'),
      resetBtn = document.querySelector('.note-form__btn-reset');

let counter;
let r = Object.keys(localStorage)

if(localStorage.length < 1) {
    counter = 0;
} else {
    counter = currentCount ()
}

function currentCount () {
    let keys = Object.keys(localStorage);
    
    keys.sort((a,b) => {
        return a - b;
    });
   return keys[keys.length - 1]
} 

function saveMessage() {
    
    form.onkeydown = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault()
            submitMessage();
            deleteMessage()
            form.value = ''
        }
    }

    button.addEventListener('click', () => {
        submitMessage();
        deleteMessage()
    });
    
    
}

function submitMessage() {
    const message = form.value;
        counter++;
        localStorage.setItem(counter, message);
        addMessage(message);
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
   
    elements.forEach(item1 => {
        item1.addEventListener('dblclick', () => {
            const valuesOfStorage = Object.values(localStorage);
            valuesOfStorage.forEach((item2, ind ) => {
                item2 = item2.trim();
                if(item1.innerText == item2) {
                   const u = Object.keys(localStorage)
                    localStorage.removeItem(u[ind])
                    location.reload()
                }
            })
        })
       
    })
}





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

function resetStorage() {
    resetBtn.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    })
}

saveMessage();
render();
deleteMessage();
resetStorage();
