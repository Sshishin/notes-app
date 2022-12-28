
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
    
    form.onkeydown = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault();
            updateNotes();
        }
    };
    const rt = document.querySelector('.note-form__btn.edit')
    console.log(rt)
    if(!rt) {
        button.addEventListener('click', firstListener)
    } else {
        button.removeEventListener('click', firstListener)
    }
    

}

function firstListener(){
    const rt = document.querySelector('.note-form__btn.edit')
    if(!rt) {
        console.log('Первый обработчик')
        updateNotes();
    } 
    
}; 

function updateNotes() {
    submitMessage();
    deleteMessage();
    form.value = '';
}

function submitMessage() {
    const message = form.value;
        localStorage.setItem(counter, message);
        addMessage(message);
}

function addMessage(elem) {
    const element = document.createElement('div');
        element.classList.add('save-list__item');
        element.id = counter++;
        element.innerHTML = `
            <span>${elem}</span>
        `;

        storageList.append(element);
        
        editMessage(); 
}

function deleteMessage() {
    const elements = document.querySelectorAll('.save-list__item');
    const keys = Object.keys(localStorage);
    elements.forEach(listItem => {
        
        listItem.addEventListener('dblclick', () => {
            keys.forEach((key, i) => {
                if(listItem.id == key) {
                   const keys = Object.keys(localStorage);
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
    console.log(keys)

    keys.sort((a,b) => {
        return a - b;
    });

    for(let key of keys) {
        console.log(key)
        const message = localStorage.getItem(key);
        const element = document.createElement('div');
        element.classList.add('save-list__item');
        element.id = key
        element.innerHTML = `
            <span>${message}</span>
        `;

        storageList.append(element);
        }
    }
}

function editMessage() {
    const elements = document.querySelectorAll('.save-list__item');

    elements.forEach((item) => {
        item.addEventListener('click', (e) => {
            form.value = item.innerText;
            button.classList.add('edit');
            button.innerHTML = 'Сохранить';

            const rt = document.querySelector('.note-form__btn.edit')
            if(rt) {
                
                form.addEventListener('input',(e) => {
                    localStorage.setItem(item.id, form.value)
                });
                button.addEventListener('click', secondListener)
            } 
        });
    });
}

function secondListener() {


        console.log('Второй обработчик')
        form.value = '';
        button.classList.remove('edit')
        button.innerHTML = 'Отправить';
        location.reload()
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
editMessage();
