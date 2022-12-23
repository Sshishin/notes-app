
'use strict';

const storageList = document.querySelector('.save-list'),
      button = document.querySelector('.note-form__btn'),
      form = document.querySelector('.note-form__input'),
      resetBtn = document.querySelector('.note-form__btn-reset');

let counter;

if(localStorage.length < 1) {
    counter = 0;
} else {
    counter = currentCount ();
}

function currentCount () {
    let keys = Object.keys(localStorage);
    
    keys.sort((a,b) => {
        return a - b;
    });
   return keys[keys.length - 1];
} 

function saveMessage() {
    
    form.onkeydown = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault();
            updateNotes();
        }
    };

    button.addEventListener('click', () => {
        updateNotes();
    }); 

}

function updateNotes() {
    submitMessage();
    deleteMessage();
    form.value = '';
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
   
    elements.forEach(listItem => {
        
        listItem.addEventListener('dblclick', () => {
            const valuesOfStorage = Object.values(localStorage);
            
            valuesOfStorage.forEach((message, i) => {
                message = message.trim();
                
                if(listItem.innerText == message) {
                   const keys = Object.keys(localStorage);
                    localStorage.removeItem(keys[i]);
                    location.reload();
                }
            });
        });
    });
}





function sortOfMessage() {
    if(localStorage.length > 0) {
    const keys = Object.keys(localStorage);
        
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
        const answer = confirm('Вы действительно хотите удалить все заметки?');
        if(answer) {
            localStorage.clear();
            location.reload();
        }
    });
}

saveMessage();
sortOfMessage();
deleteMessage();
resetStorage();
