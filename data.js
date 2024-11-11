let data = []; // Массив для хранения данных из JSON
// Функция для загрузки данных
async function loadData() {
    try {
        const response = await fetch('data.json'); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        data = await response.json(); // Чтение JSON из ответа
        console.log(data); // Просмотр загруженных данных в консоли
        updateData('weekly'); // Обновляем данные для первоначального отображения
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Вызов функции для загрузки данных
loadData();

// Функция для обновления данных в зависимости от выбранного периода
function updateData(period) {
    if (data.length === 0) return; // Проверка, загружены ли данные

    // Обновляем данные для каждой карточки
    const cards = document.querySelectorAll('.card-container');

    cards.forEach((card) => {
        // Получаем заголовок карточки из data-title
        const title = card.getAttribute('data-title');
        const itemData = data.find(item => item.title === title);

        if (itemData) {
            const currentTime = card.querySelector('.current-time');
            const previousLabel = card.querySelector('.previous-label');
            const previousValue = card.querySelector('.previous-value');

            if (period === 'daily') {
                currentTime.textContent = itemData.timeframes.daily.current;
                previousLabel.textContent = 'Yesterday';
                previousValue.textContent = itemData.timeframes.daily.previous;
            } else if (period === 'weekly') {
                currentTime.textContent = itemData.timeframes.weekly.current;
                previousLabel.textContent = 'Last Week';
                previousValue.textContent = itemData.timeframes.weekly.previous;
            } else if (period === 'monthly') {
                currentTime.textContent = itemData.timeframes.monthly.current;
                previousLabel.textContent = 'Last Month';
                previousValue.textContent = itemData.timeframes.monthly.previous;
            }
        }
    });

        // Убираем класс 'active' у всех кнопок
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => button.classList.remove('active'));
    
        // Добавляем класс 'active' к нажатой кнопке
        const activeButton = document.querySelector(`.btn[onclick="updateData('${period}')"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
}

   



