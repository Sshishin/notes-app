
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

    form.onkeydown = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault();
            submitMessage();
        }
    };

    button.addEventListener('click', submitMessage);
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

            <div class="message-block">
                <span>${elem}</span>
                <button data="delete-message">Удалить</button>
            </div>
        `;
        storageList.append(element);
        
        form.value = ''; 
        editMessage();
        deleteMessage(); 
}


function editMessage() {
    const elements = document.querySelectorAll('.save-list__item');

    elements.forEach(item => {
        item.addEventListener('click', (e) => {
            if(e.target.innerText !== 'Удалить') {
                const top = document.querySelector('body');
                setTimeout (() => {
                    window.scrollTo({
                        top: top.offsetTop,
                        behavior: 'smooth' 
                    });
                }, 0);
        
            form.value = e.target.innerText.replace(/Удалить$/g, '');
            const currentValue = form.value;
            const acceptBlock = document.querySelector('.note-form__accept');
            !acceptBlock ? appendAcceptBlock() : alert('Вы переключились на другую заметку, не завершив редактирование предыдущей.\n\nВсе изменения были сохранены автоматически.');
            form.addEventListener('change', (e) => {
                localStorage.setItem(item.id, form.value);
            });
            checkSelectOfAcceptBlock(item.id, currentValue);
            }
        });
    });
}


function appendAcceptBlock() {
    button.classList.add('edit');
            const element = document.createElement('div');
            element.classList.add('note-form__accept');
            element.innerHTML = `
            <button class="note-form__submit-btn">Сохранить</button>
            <button class="note-form__cancel-btn">Отменить</button>
            `;
            noteForm.insertBefore(element, resetBtn);  
}


function checkSelectOfAcceptBlock(key, value) {
    const acceptBtn = document.querySelector('.note-form__submit-btn');
    acceptBtn.addEventListener('click', resetAcceptBlock); 
    const cancelBtn = document.querySelector('.note-form__cancel-btn');
    cancelBtn.addEventListener('click', () => {
        localStorage.setItem(key, value);
        resetAcceptBlock();
    }); 
}


function resetAcceptBlock() {
    const acceptStatus = document.querySelector('.note-form__accept');
    acceptStatus.remove();
    form.value = '';
    button.classList.remove('edit');
    button.innerHTML = 'Отправить';
    location.reload();
} 


function deleteMessage() {
    const elements = document.querySelectorAll('.save-list__item');
    const keys = Object.keys(localStorage);

    elements.forEach(listItem => {
        listItem.addEventListener('click', (e) => {
            if(e.target.textContent == 'Удалить') {
                keys.forEach(key => {
                    if(listItem.id == key) {
                        localStorage.removeItem(key);
                        location.reload();
                    }
                });
            } 
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
        <div class="message-block">
            <span>${message}</span>
            <button data="delete-message">Удалить</button>
        </div>
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

