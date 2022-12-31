// DOM elements
var currentDayEl = $('#currentDay');
var scheduleListEl = $('#schedule');
var scheduleEl;

var dayStart = 9;
var dayEnd = 17;

// object for local storage
var savedSchedule = JSON.parse(window.localStorage.getItem('schedule')) || {};

// display the current day in the header
function displayCurrentDate() {
    let currentDay = moment().format('dddd, MMMM Do');
    currentDayEl.text(currentDay);
}
// display the work day schedule
function displayWorkSchedule() {
    for (i = dayStart; i <= dayEnd; i++) {
        
        let scheduleHourEl = $('<div>').addClass('input-group row time-block');
        let scheduleTimeEl = $('<div>').addClass('input-group-prepend');
        let timeEl = $('<span>').addClass('input-group-text hour').attr('time', i);
        timeEl.text(moment(i, 'hh').format('hA'));
        let scheduleNameInputEl = $('<input>').attr({
            type: 'text',
            class: 'form-control description h-auto',
            time: i
        });
        let scheduleSaveEl = $('<div>').addClass('input-group-apend h-auto');
        let saveEl = $('<button>').attr({
            type: 'button',
            class: 'btn save-button position-relative px-4 h-100'
        });
        let saveIconEl = $('<i>').addClass('bi bi-save stretched-link align-middle');


        decorateTimeBlock(i, scheduleNameInputEl);
        displayLocalStorage(i, scheduleNameInputEl);
        
        scheduleTimeEl.append(timeEl);
        scheduleHourEl.append(scheduleTimeEl);
        scheduleHourEl.append(scheduleNameInputEl);
        saveEl.append(saveIconEl);
        scheduleSaveEl.append(saveEl);
        scheduleHourEl.append(scheduleSaveEl);
        scheduleListEl.append(scheduleHourEl);
    }

    scheduleEl = $('#schedule .time-block');
    // listener for event save button
    scheduleEl.on('click', '.save-button', saveLocalStorage);
}
// decorate time blocks to represent past/present/future times
function decorateTimeBlock(time, timeBlockEl) {
    let currentTime = moment().format('H');
    let timeBlockTime = moment(time, 'H').format('H');

    if ((currentTime - timeBlockTime) > 0 ) {
        timeBlockEl.addClass('past');
    } else if ((currentTime - timeBlockTime) == 0) {
        timeBlockEl.addClass('present');
    } else {
        timeBlockEl.addClass('future');
    };
};

// saveLocalStorage
function saveLocalStorage(event) {
    let timeBlockSaved = $(event.target);

    let time = timeBlockSaved.parent().parent().parent().children('.input-group-prepend').children('span').attr('time');
    time = parseInt(time);
    let name = timeBlockSaved.parent().parent().parent().children('input').val().trim();

    savedSchedule[time] = name;
    localStorage.setItem('schedule', JSON.stringify(savedSchedule));

};
// displayLocalStorage
function displayLocalStorage(time, timeBlockEl) {
    console.log(typeof(time));
    if (savedSchedule[time]) {
        console.log(savedSchedule[time]);
        timeBlockEl.val(savedSchedule[time]);
    }
}



displayCurrentDate();
displayWorkSchedule();