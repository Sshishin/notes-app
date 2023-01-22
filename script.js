// Разделить функцию edit

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
        storageList.prepend(element);
        
        form.value = ''; 
        deleteMessage(); 
}


storageList.onclick = editMessage;

function editMessage(e) {
  const remove = e.target.closest("[data-message]"),
    listItem = e.target.closest(".save-list__item");

  if (!remove && listItem) {
    form.focus({
      preventScroll: true,
    });

    form.value = listItem.querySelector(":scope > .message-block > span").textContent.trim();
    const currentValue = form.value;
    const currentKey = listItem.id;
    const acceptBlock = document.querySelector(".note-form__accept");

    if(!acceptBlock) {
        appendAcceptBlock();
    }
    
    const acceptBtn = document.querySelector('.note-form__submit-btn');
    const cancelBtn = document.querySelector('.note-form__cancel-btn');

    acceptBtn.onclick = () => {
            localStorage.setItem(currentKey, currentValue);
            resetAcceptBlock();
    };

    cancelBtn.onclick = () => {
        resetAcceptBlock();
    };

    form.onkeydown = (e) => {
        
        if(e.keyCode === 13) {
            e.preventDefault();
            localStorage.setItem(currentKey, form.value);
            resetAcceptBlock();
            
        }
    };

    // checkSelectOfAcceptBlock(listItem.id, currentValue);
  }
}


function appendAcceptBlock() {
    button.classList.add('edit');
    const element = document.createElement('div');
    element.classList.add('note-form__accept');
    element.innerHTML = `
        <button type="submit" class="note-form__submit-btn">Сохранить</button>
        <button class="note-form__cancel-btn">Отменить</button>
        `;
    noteForm.insertBefore(element, resetBtn);  
}


// function checkSelectOfAcceptBlock(key, value) {
//     const acceptBtn = document.querySelector('.note-form__submit-btn');
//     const cancelBtn = document.querySelector('.note-form__cancel-btn');

//     // form.onkeydown = (e) => {
        
//     //     if(e.keyCode === 13) {
//     //         e.preventDefault();
//     //         form.blur();
//     //         resetAcceptBlock();
            
//     //     }
//     // };
    
//     // acceptBtn.addEventListener('click', resetAcceptBlock); 
//     // cancelBtn.addEventListener('click', () => {
//     //     localStorage.setItem(key, value);
//     //     resetAcceptBlock();
//     // }); 
// }


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
        return b - a;
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
deleteMessage();
clearStorage();

