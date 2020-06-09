// 1. Находим форму на странице
const form = document.querySelector('#newTaskForm');
const tasksList = document.querySelector('#tasksList');
const alertWarning = document.querySelector('.alert-warning');
const alertSuccess = document.querySelector('.alert-success');
const alertDanger = document.querySelector('.alert-danger');


// Массив для хранения задач
let tasks = [];

if(localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(item){

        // Разметка для новой задачи
        const taskHtml = `
            <li class="list-group-item d-flex justify-content-between">
                <span class="task-title">${item}</span>
                <button type="button" data-action="delete-task" 
                class="btn btn-light align-self-end">Удалить</button>
            </li>
        `;

        // Вставляем новую задачу в общий список задач
        tasksList.insertAdjacentHTML('afterbegin', taskHtml);
    });
}


// 2. Отследить событие отправки формы
form.addEventListener('submit', function(event) {
    event.preventDefault();  // Отмена стандартного поведения


    const taskInput = document.querySelector('#addNewTask');  // Находим инпут
    const taskText = taskInput.value; // Берем значение из инпута

    // Добавляем задачу в массив tasks
    tasks.push(taskText);

    // Сохраняем в LocaLStorage JSON строку от массива tasks под ключом tasks
    localStorage.setItem('tasks', JSON.stringify(tasks));


    // Формируем разметку для новой задачи
    const taskHtml = `
        <li class="list-group-item d-flex justify-content-between">
            <span class="task-title">${taskText}</span>
            <button type="button" data-action="delete-task" 
            class="btn btn-light align-self-end">Удалить</button>
        </li>
    `;

    // Вставляем новую задачу в общий список задач
    tasksList.insertAdjacentHTML('beforeend', taskHtml);   //этот метод позволяет добавлять разметку внутрь блока, принимает 2 аргумента, 1) куда будет добавлен, и 2) что мы добавляем

    // Очищаем поле ввода
    taskInput.value = '';

    // показываем уведомления об успехе операции
    alertWarning.style.display = 'block';
    setTimeout(() => {
        alertWarning.style.display = 'none';
    }, 1000);

});

// Удаление задач
// Прослушка клика внутри списка с задачами
tasksList.addEventListener('click', function() {

    // Проверка клика по кнопке 'Удалить'
    if(event.target.getAttribute('data-action') === 'delete-task') {


        // Удаляем задачу из массива tasks

        // 1. Получить текст задачи
        const taskText = event.target.closest('li').querySelector('.task-title').textContent;

        // 2. Определить индекс задачи в массиве tasks
        /* .indexOf(value)
        * tasks = ['Первая', 'Вторая', 'Третья']
        * tasks.indexOf('Вторая') => 1
        * 
        * */
       const taskIndex = tasks.indexOf(taskText);

       // 3. Удалить задачу из массива
       /* .splice(index, count)
       * Удалить один элемент из массива, начиная (включая) с индекса 2
       * tasks.splice(2,1);
       * 
       * */
        tasks.splice(taskIndex, 1);

        // Сохраняем в LocaLStorage JSON строку от массива tasks под ключом tasks
        localStorage.setItem('tasks', JSON.stringify(tasks));


        // Обращаемся к родителю кнопки (к тегу <li>) и удаляем его
        event.target.parentElement.remove();
    }

    alertDanger.style.display = 'block';
    setTimeout(() => {
        alertDanger.style.display = 'none';
    }, 1000);

});

    // alertSuccess.style.display = 'block';   // задача выполнена
    // setTimeout(() => {
    //     alertSuccess.style.display = 'none';
    // }, 1500);