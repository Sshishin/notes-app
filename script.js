
'use strict';

const storageList = document.querySelector('.save-list'),
      button = document.querySelector('.note-form__btn'),
      form = document.querySelector('.note-form__input'),
      resetBtn = document.querySelector('.note-form__btn-reset'),
      noteForm = document.querySelector('.note-form');

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


function editMessage() {
    const elements = document.querySelectorAll('.save-list__item');
   
    elements.forEach(item => {
        
        item.addEventListener('click', () => {
            const top = document.querySelector('body');

            window.scrollTo({
                top: top.offsetTop,
                behavior: 'smooth' 
            });

            form.value = item.innerText;
            button.classList.add('edit');
            button.innerHTML = 'Сохранить';

            const editStatus = document.querySelector('.note-form__btn.edit');
            if(editStatus) {
                const acceptStatus = document.querySelector('.note-form__accept')
                const currentValue = form.value;
                if(!acceptStatus) {
                    const element = document.createElement('div');
                    element.classList.add('note-form__accept');
                    element.innerHTML = `
                    <button class="note-form__submit-btn">Сохранить</button>
                    <button class="note-form__cancel-btn">Отменить</button>
                    `;
                    noteForm.insertBefore(element, resetBtn);   
                    form.addEventListener('input', () => {
                        localStorage.setItem(item.id, form.value);
                    });
                    const acceptBtn = document.querySelector('.note-form__submit-btn');
                    acceptBtn.addEventListener('click', editSubmitButtonListener); 
                } 
                    const cancelBtn = document.querySelector('.note-form__cancel-btn');
                    const submitBtn = document.querySelector('.note-form__submit-btn');
                    cancelBtn.addEventListener('click', () => {
                        localStorage.setItem(item.id, currentValue);
                        editSubmitButtonListener();
                    });
                   
                
    
                 
            } 
             
        });
    });
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


function editSubmitButtonListener() {
    const acceptStatus = document.querySelector('.note-form__accept')
    acceptStatus.remove();
        form.value = '';
        button.classList.remove('edit');
        button.innerHTML = 'Отправить';
        location.reload();
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
editMessage();
deleteMessage();
clearStorage();

