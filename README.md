### Принцип работы с заметками через local storage (Обновить)

Текущие задачи:
*** Разделить функцию edit, выделить обработчики событий в отедельную функцию, так чтобы в нее передавались уже измененные значения
*** Исправить режим удаления. Он не должен активировать from.value.

- Создаем общий итератор, который при каждой новой итерации с помощью функции начинает с последнего значения id
- Вешаем обработчик событий на кнопку отправить
- При клике на кнопку забираем значение из value у инпута и увеличиваем значение итератора на единицу
- Пушим в local storage итератор как ключ и value инпута как значение
- Аппендим DOM элемент со значением value в качестве текста и забраем значение итератора как id
- Удаляем элементы перебором подходящих DOM элементов и ключей из local storage, где ищем совпадение id и key
- Создаем функцию которая вызвана всегда, ее задача сортировать значения local storage, и на основе этих данных заранее рендерить контент на странице (функция сохранения)
- Фунцкия редактирования перебирает все подходящие элементы, вешает на них обработчики и при клике на любой из элементов, создается условное изолированное окружение. То есть вешается дополнительный класс и на основании наличия или отсутствия этого класса отличается поведение программы. Здесь имеется ввиду что если есть класс edit, тогда удаляется обработчик который отвечает за сохранения нового сообщения и добавляется обработчик который сохраняет изменения после редактирования.
- Для редактирования далее просто забираем значения у перебираемого айтема (они соответствуют значения local storage) и пушим новые
- Быстрое сохранения без перезагрузки за счет разделения в отдельные окружения функции редактирования и функции добавления так, что она сама обращается к переменной итератора и забирает новое значение для нового элемента при клике на обработчик добавления.

* Архитектура (если это так можно назвать) построена за счет использования двух окружений. Функция добавления и функция редактирования переключение между которыми реализовано за чет использования класса edit. При вызове одной из функций с помощью обработчика, автоматически вызыватся другие функции (дальнейшие шаги для пользователя), которые либо помогают получить свежие данные для корректной работы функции, либо строят "коридоры" для возможных действий пользователя которые могут исполнены после выполнения родительской функции. Так например при вызове функции appendMessage, автоматически вызывается и функция editMessage в которой вложен обработчик событий.