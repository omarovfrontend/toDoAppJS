// 1. Находим форму на странице
const form = document.querySelector('#newTaskForm');
const tasksList = document.querySelector('#tasksList');
const alertWarning = document.querySelector('.alert-warning');
const alertDanger = document.querySelector('.alert-danger');
const alertSuccess = document.querySelector('.alert-success');
console.log(alertSuccess); // для выполненных задач

// Массив для хранения задач
let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((item) => {
    // Разметка для новой задачи
    const taskHtml = `
      <li class="list-group-item d-flex justify-content-between">
        <span class="task-title">${item}</span>
        <button type="button"
                data-action="delete-task"
                class="btn btn-light
                align-self-end"
        >Удалить
        </button>
      </li>
    `;

    // Вставляем новую задачу в общий список задач
    tasksList.insertAdjacentHTML('afterbegin', taskHtml);
  });
}

// 2. Отследить событие отправки формы
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskInput = document.querySelector('#addNewTask'); // Находим инпут
  const taskText = taskInput.value; // Берем значение из инпута

  // Добавляем задачу в массив tasks
  tasks.push(taskText);

  // Сохраняем в LocaLStorage JSON строку от массива tasks под ключом tasks
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Формируем разметку для новой задачи
  const taskHtml = `
    <li class="list-group-item d-flex justify-content-between">
      <span class="task-title">${taskText}</span>
      <button type="button"
              data-action="delete-task"
              class="btn btn-light
              align-self-end"
      >Удалить
      </button>
    </li>
  `;

  // Вставляем новую задачу в общий список задач
  tasksList.insertAdjacentHTML('beforeend', taskHtml); // этот метод позволяет добавлять разметку внутрь блока, принимает 2 аргумента, 1) куда будет добавлен, и 2) что мы добавляем
  taskInput.value = '';

  // показываем уведомления об успехе операции
  alertWarning.style.display = 'block';
  setTimeout(() => {
    alertWarning.style.display = 'none';
  }, 1500);
});

// Удаление задач, прослушка клика внутри списка с задачами
tasksList.addEventListener('click', (e) => {
  e.preventDefault();

  // Проверка клика по кнопке 'Удалить'
  if (e.target.getAttribute('data-action') === 'delete-task') {
    // 1. Получить текст задачи
    const taskText = e.target.closest('li').querySelector('.task-title').textContent;

    const taskIndex = tasks.indexOf(taskText); // index задачи
    tasks.splice(taskIndex, 1);

    // Сохраняем в LocaLStorage JSON строку от массива tasks под ключом tasks
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Обращаемся к родителю кнопки (к тегу <li>) и удаляем его
    e.target.parentElement.remove();

    alertDanger.style.display = 'block';
    setTimeout(() => {
      alertDanger.style.display = 'none';
    }, 1500);
  }
});

// alertSuccess.style.display = 'block';
// setTimeout(() => {
//   alertSuccess.style.display = 'none';
// }, 1500);
