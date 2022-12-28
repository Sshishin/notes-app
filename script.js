
'use strict';

const storageList = document.querySelector('.save-list'),
      button = document.querySelector('.note-form__btn'),
      form = document.querySelector('.note-form__input'),
      resetBtn = document.querySelector('.note-form__btn-reset');

let counter;


if(localStorage.length < 1) {
    counter = 0;
} else {
    counter = currentCount();
}


function currentCount() {
    let keys = Object.keys(localStorage);
    keys.sort((a,b) => {
        return a - b;
    });
    keys = +keys.splice(-1)[0] + 1;
   return keys;
} 


function saveMessage() {
    const editStatus = document.querySelector('.note-form__btn.edit');

    form.onkeydown = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault();
            submitMessage();
        }
    };
    
    if(!editStatus) {
        button.addEventListener('click', submitButtonListener);
    } else {
        button.removeEventListener('click', submitButtonListener);
    }
}


function submitButtonListener(){
    const editStatus = document.querySelector('.note-form__btn.edit');
    if(!editStatus) {
        submitMessage();
    } 
}


function submitMessage() {
    const message = form.value;
        localStorage.setItem(counter, message);
        appendMessage(message);
        
}


function appendMessage(elem) {
    const element = document.createElement('div');
        element.classList.add('save-list__item');
        element.id = counter++;
        element.innerHTML = `
            <span>${elem}</span>
        `;
        storageList.append(element);
        
        form.value = ''; 
        editMessage();
        deleteMessage(); 
}


function deleteMessage() {
    const elements = document.querySelectorAll('.save-list__item');
    const keys = Object.keys(localStorage);

    elements.forEach(listItem => {
        listItem.addEventListener('dblclick', () => {
            keys.forEach(key => {
                if(listItem.id == key) {
                    localStorage.removeItem(key);
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
        const element = document.createElement('div');
        element.classList.add('save-list__item');
        element.id = key;
        element.innerHTML = `
            <span>${message}</span>
        `;

        storageList.append(element);
        }
    }
}


function editMessage() {
    const elements = document.querySelectorAll('.save-list__item');
   

    elements.forEach(item => {
        
        item.addEventListener('click', () => {
            
            form.value = item.innerText;
            button.classList.add('edit');
            button.innerHTML = 'Сохранить';

            const editStatus = document.querySelector('.note-form__btn.edit');
            if(editStatus) {
                form.addEventListener('input', () => {
                    localStorage.setItem(item.id, form.value);
                });
                button.addEventListener('click', editSubmitButtonListener);
            }
             
        });
    });
}


function editSubmitButtonListener() {
        form.value = '';
        button.classList.remove('edit');
        button.innerHTML = 'Отправить';
        location.reload();
} 


function clearStorage() {
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
clearStorage();
editMessage();
