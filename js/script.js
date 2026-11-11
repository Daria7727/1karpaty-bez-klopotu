const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

const tourSelect = document.querySelector('#tour');
const priceOutput = document.querySelector('[data-price]');
const peopleInput = document.querySelector('#people');
const totalOutput = document.querySelector('[data-total]');
function updateEstimate(){
  if(!tourSelect || !priceOutput || !peopleInput || !totalOutput) return;
  const price = Number(tourSelect.selectedOptions[0]?.dataset.price || 0);
  const people = Math.max(1, Number(peopleInput.value || 1));
  priceOutput.textContent = price ? price.toLocaleString('uk-UA') + ' грн / особа' : 'Уточнюється';
  totalOutput.textContent = price ? (price * people).toLocaleString('uk-UA') + ' грн' : 'Уточнюється';
}
if(tourSelect){tourSelect.addEventListener('change',updateEstimate);peopleInput?.addEventListener('input',updateEstimate);updateEstimate();}

const bookingForm = document.querySelector('#booking-form');
if(bookingForm){
  const date = bookingForm.querySelector('#date');
  if(date){
    const today = new Date();
    date.min = new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
  }
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    if(!bookingForm.reportValidity()) return;
    const data = new FormData(bookingForm);
    const subject = encodeURIComponent('Заявка на бронювання — Карпати без клопоту');
    const body = encodeURIComponent(
`Вітаю! Хочу залишити заявку на подорож.

Тур: ${data.get('tour')}
Бажана дата: ${data.get('date')}
Кількість учасників: ${data.get('people')}
Точка збору: ${data.get('departure')}
Ім'я: ${data.get('name')}
Телефон: ${data.get('phone')}
Email: ${data.get('email') || 'Не вказано'}
Коментар: ${data.get('message') || 'Немає'}

Прошу зв'язатися зі мною для підтвердження наявності місць, остаточної вартості та умов бронювання.`);
    window.location.href = `mailto:dasanavozenko@gmail.com?subject=${subject}&body=${body}`;
    const status = document.querySelector('#form-status');
    if(status) status.textContent = 'Відкриваємо поштову програму з підготовленою заявкою. Перевірте дані та натисніть «Надіслати».';
  });
}
