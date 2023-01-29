'use strict';

const storageList = document.querySelector('.save-list'),
      button = document.querySelector('.note-form__btn'),
      form = document.querySelector('.note-form__input'),
      resetBtn = document.querySelector('.note-form__btn-reset'),
      noteForm = document.querySelector('.note-form'),
      nightShiftBtn = document.querySelector('.night-shift');

let counter;

if(localStorage.length < 1) {
    counter = 0;
} else {
    counter = currentCount();
}


nightShiftBtn.onclick = changeTheme;

function changeTheme() {
    const body = document.querySelector('body');
    const headerTitle = document.querySelector('.header__title');
    const subtitle = document.querySelector('.save__title');
    body.classList.toggle('night-body');
    form.classList.toggle('night-elements');
    button.classList.toggle('night-elements');
    resetBtn.classList.toggle('night-elements');
    storageList.classList.toggle('night-elements');
    headerTitle.classList.toggle('grey-text');
    subtitle.classList.toggle('grey-text');
    nightShiftBtn.classList.toggle('night-elements');
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
            const acceptStatus = document.querySelector('.note-form__accept');
            if(e.keyCode === 13 && !acceptStatus) {
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
                <span class="message-block__text">${elem}</span>
                <button class="message-block__remove">Удалить</button>
            </div>
        `;
        storageList.prepend(element);
        
        form.value = ''; 
        deleteMessage(); 
}


storageList.onclick = editMessage;

function editMessage(e) {
  const remove = e.target.closest(".message-block__remove"),
        listItem = e.target.closest(".save-list__item"),
        top = document.body;

  if (!remove && listItem) {
    form.focus({
        preventScroll: true,
    });
    window.scrollTo({
        top: top.offsetTop,
        behavior: "smooth",
        });
    
    form.value = listItem.querySelector(":scope > .message-block > span").textContent.trim();
    const currentValue = form.value;
    const currentKey = listItem.id;
    const acceptBlock = document.querySelector(".note-form__accept");

    if(!acceptBlock) {
        appendAcceptBlock();
    }

    saveEditMessage(currentKey, currentValue, listItem);
  }
}


function saveEditMessage(key, value, item) {
    const acceptBtn = document.querySelector('.note-form__submit-btn');
    const cancelBtn = document.querySelector('.note-form__cancel-btn');

        acceptBtn.onclick = () => {
            if(value !== form.value) {
                    const mainKey = currentCount();
                    localStorage.setItem(mainKey, form.value);
                    prepandMessage(mainKey, item);
                    localStorage.removeItem(key);
                    item.remove();
                    counter++;
                    resetAcceptBlock();
                    deleteMessage();
            } else {
                resetAcceptBlock();
                saveMessage();
            }
        };
    
        cancelBtn.onclick = () => {
            resetAcceptBlock();
            saveMessage();
            form.focus({
                preventScroll: true,
            });
        };

        form.onkeydown = (e) => {
            const acceptStatus = document.querySelector('.note-form__accept');

            if(e.keyCode === 13 && acceptStatus) {
                e.preventDefault();
                if(value !== form.value) {
                    const mainKey = currentCount();
                    localStorage.setItem(mainKey, form.value);
                    prepandMessage(mainKey, item);
                    localStorage.removeItem(key);
                    item.remove();
                    counter++;
                    resetAcceptBlock();
                    deleteMessage();
                } else {
                    resetAcceptBlock();
                    saveMessage();
                }
            }
        }; 
}


function prepandMessage(key, item) {
    const message = localStorage.getItem(key);
    const element = document.createElement('div');
    element.classList.add('save-list__item');
    element.id = key;
    element.innerHTML = `
    <div class="message-block">
        <span class="message-block__text">${message}</span>
        <button class="message-block__remove">Удалить</button>
    </div>
    `;
    // if(item) {
    //     item.remove();
    // }
    storageList.prepend(element);
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


function resetAcceptBlock() {
    const acceptStatus = document.querySelector('.note-form__accept');
    if(acceptStatus) {
        acceptStatus.remove();
    }
    form.value = '';
    button.classList.remove('edit');
    button.innerHTML = 'Отправить';
} 


function deleteMessage() {
    const elements = document.querySelectorAll('.save-list__item');
    const keys = Object.keys(localStorage);

    elements.forEach(listItem => {
        listItem.addEventListener('click', (e) => {
            if(e.target.textContent == 'Удалить') {
                keys.forEach(key => {
                    if(listItem.id == key) {
                        console.log(listItem);
                        listItem.remove();
                        localStorage.removeItem(key);
                    }
                });
            } 
        });
    });
    saveMessage();   //Для того чтобы повесить обработчик снова на отправку
}


function sortOfMessage() {
    if(localStorage.length > 0) {
    const keys = Object.keys(localStorage);

    keys.sort((a,b) => {
        return a - b;
    });

    for(let key of keys) {
        prepandMessage(key);
        }
    }
}

resetBtn.onclick = clearStorage;

function clearStorage() {
    const answer = confirm('Вы действительно хотите удалить все заметки?');
    if(answer) {
        localStorage.clear();
        const elements = document.querySelectorAll('.save-list__item');
        elements.forEach(item => {
            item.remove();
        });
        form.focus({
            preventScroll: true,
        });
    }
}


saveMessage();
sortOfMessage();
deleteMessage();
