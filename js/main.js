let nav = 0;
let clicked = null
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
let goals = localStorage.getItem('goals') ? JSON.parse(localStorage.getItem('goals')) : [];
let userName = localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')) : [];

document.getElementById('eventTitleInput2').readOnly = true
const numInputLimit = document.getElementById('eventTitleInput4')
numInputLimit.setAttribute('max',100)

const calendar = document.getElementById('calendar')
const newEventModal = document.getElementById('newEventModal')
const backDrop = document.getElementById('modalBackDrop')
const eventTitleInput = document.getElementById('eventTitleInput')
const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

let matchingEvents = []
let newFoodMatchingEvents = []
let matchingGoals = []

const openModal = (date) => {
    backDrop.style.display = 'grid';
    clicked = date;
    const eventsForDay = events.filter(e => e.date === date && e.email === document.getElementById('name').innerText)
    const goalsForDay = goals.filter(g => g.date === date && g.email === document.getElementById('name').innerText)

    matchingEvents.push(eventsForDay)
    matchingGoals.push(goalsForDay)
    //console.log(matchingGoals)

    foodList.style.display = 'block'
    document.getElementById('date').innerHTML = date
    document.getElementById('addFood').style.display = 'flex';

    if (goalsForDay.length) {
        newEventModal.style.display = 'grid'
        document.getElementById('eventTitleInput').value =  goalsForDay[0].goal//   goalsForDay.goal
        console.log(goalsForDay)
    } else {
        newEventModal.style.display = 'grid';
        backDrop.style.display = 'grid';
        document.getElementById('eventTitleInput').value = ''
    }
    //console.log(goals)
    //backDrop.style.display = 'grid'
    console.log(matchingEvents)

    
    if (matchingEvents.length >= 1 && matchingEvents[0].length >= 1) {
        let total = 0;
        matchingEvents[0].forEach(event => {
            total += parseInt(event.calories)
        });
        document.getElementById('eventTitleInput2').value = parseInt(total);

        matchingEvents[0].forEach(event => {
            let eventDivFood = document.createElement('li')
            let eventDivCalories = document.createElement('li')
            eventDivFood.innerText = event.food 
            eventDivCalories.innerText = event.calories
            eventDivFood.classList.add('li1')
            eventDivCalories.classList.add('li1')
            document.getElementById('foodList').style.display = 'inline-block'
            document.getElementById('foodList').style.fontSize = '14px'
            document.getElementById('foodList').style.fontWeight = '550'
            document.getElementById('foodList').appendChild(eventDivFood)
            document.getElementById('foodList').appendChild(eventDivCalories)
        });

    } else {
        let eventDivNoFood = document.createElement('li')
        document.getElementById('foodList').style.display = 'inline-block'
        document.getElementById('foodList').style.fontSize = '14px'
        document.getElementById('foodList').style.fontWeight = '550';
        eventDivNoFood.innerText = 'Click "add item" to add some food!'
        eventDivNoFood.classList.add('li1')
        document.getElementById('foodList').appendChild(eventDivNoFood);
        document.getElementById('eventTitleInput2').value = '';
        //console.log(matchingEvents)
    }
//}
}

const closeModal = () => {
    newEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null
    document.getElementById('date').innerHTML = ''
    eventTitleInput.classList.remove('error');
    document.getElementById('newItemContainer').style.display = 'none';
    document.getElementById('cancelFood').style.display = 'none';
    document.getElementById('submitFood').style.display = 'none';
    total = 0;
    document.getElementById('foodList').innerHTML = '';
    matchingEvents.length = 0;
    newFoodMatchingEvents.length = 0;
    //newFoodMatchingEvents =[]
    load()
}

const saveGoal = () => {

    if (document.getElementById('eventTitleInput').value === '') {
        alert('Please enter a goal before setting it!')
    }

    else if (document.getElementById('eventTitleInput').value > 20000) {
        alert('Goal calories has a max limit of 20,0000! Please enter a value at or below this number!')
    }
    else {

    const existGoals = goals.find(g => g.date === document.getElementById('date').innerHTML && g.email === document.getElementById('name').innerText)
    
    if (existGoals) {
        const realGoals = goals.indexOf(existGoals)
        goals.splice(realGoals,1 );
        goals.push({
            date: clicked,
            goal: eventTitleInput.value,
            email: document.getElementById('name').innerText
       });
        localStorage.setItem('goals', JSON.stringify(goals))
        alert('Your new goal has been set!')
        console.log(goals)

    }  else {
        goals.push({
            date: clicked,
            goal: eventTitleInput.value,
            email: document.getElementById('name').innerText
        });
        localStorage.setItem('goals', JSON.stringify(goals))
        alert('Your new goal has been set!')
    }}}



const addFood = () => {
    document.getElementById('newItemContainer').style.display = 'flex';
    document.getElementById('addFood').style.display = 'none';
    document.getElementById('cancelFood').style.display = 'block';
    document.getElementById('submitFood').style.display = 'block';
}

const submitFood = () => {

    if(!document.getElementById('eventTitleInput3').value || !document.getElementById('eventTitleInput4').value) {
        alert('please enter a food name and a calorie count in order to submit a new item!')
    }

    else if (document.getElementById('eventTitleInput4').value > 8000) {
        alert('new foods have a max limit of 8000! Please reduce the calorie count to at or below this number in order to submit a new item!')
    }


    else if(document.getElementById('eventTitleInput3').value && document.getElementById('eventTitleInput4').value <= 8000) {
        events.push({
            date: clicked,
            food: document.getElementById('eventTitleInput3').value,
            calories: document.getElementById('eventTitleInput4').value,
            email: document.getElementById('name').innerText
        });

        localStorage.setItem('events', JSON.stringify(events))


    let newClicked = document.getElementById('date').innerHTML

    let matchingEvents = [];

    foodList.innerText = '';

    const newFoodEvents = events.filter(e => e.date === newClicked && e.email === document.getElementById('name').innerText);

    matchingEvents.push(newFoodEvents);

    if (matchingEvents.length) {
        let total = 0;
        matchingEvents[0].forEach(event => {
            total += parseInt(event.calories)
        });
        document.getElementById('eventTitleInput2').value = parseInt(total)

        matchingEvents[0].forEach(event => {
            let eventDivFood = document.createElement('li')
            let eventDivCalories = document.createElement('li')
            eventDivFood.innerText = event.food 
            eventDivCalories.innerText = event.calories
            eventDivFood.classList.add('li1')
            eventDivCalories.classList.add('li1')
            document.getElementById('foodList').style.display = 'inline-block'
            document.getElementById('foodList').style.fontSize = '14px'
            document.getElementById('foodList').style.fontWeight = '550'
            document.getElementById('foodList').appendChild(eventDivFood)
            document.getElementById('foodList').appendChild(eventDivCalories)
        });

        /*let eventDivFood = document.createElement('li')
        let eventDivCalories = document.createElement('li')
        eventDivFood.innerText = matchingEvents[0][matchingEvents[0].length -1].food;
        eventDivCalories.innerText = matchingEvents[0][matchingEvents[0].length -1].calories;
        eventDivFood.classList.add('li1')
        eventDivCalories.classList.add('li1')
        document.getElementById('foodList').style.display = 'inline-block';
        document.getElementById('foodList').style.fontSize = '14px'
        document.getElementById('foodList').style.fontWeight = '550'
        document.getElementById('foodList').appendChild(eventDivFood)
        document.getElementById('foodList').appendChild(eventDivCalories)
        
    }*/} else {
        let eventDivNoFood = document.createElement('li')
        document.getElementById('foodList').style.display = 'inline-block'
        document.getElementById('foodList').style.fontSize = '14px'
        document.getElementById('foodList').style.fontWeight = '550';
        eventDivNoFood.innerText = 'Click "add item" to add some food!'
        eventDivNoFood.classList.add('li1')
        document.getElementById('foodList').appendChild(eventDivNoFood)
        console.log(matchingEvents)
    }

    document.getElementById('newItemContainer').style.display = 'none';
    document.getElementById('addFood').style.display = 'flex';
    document.getElementById('cancelFood').style.display = 'none';
    document.getElementById('submitFood').style.display = 'none';
    document.getElementById('eventTitleInput3').value = '';
    document.getElementById('eventTitleInput4').value = ''
};
}





const cancelNewFood = () => {
    document.getElementById('newItemContainer').style.display = 'none'
    document.getElementById('addFood').style.display = 'flex'
    document.getElementById('cancelFood').style.display = 'none'
    document.getElementById('submitFood').style.display = 'none'
    document.getElementById('eventTitleInput3').value = '';
    document.getElementById('eventTitleInput4').value = '';
}

const saveEvent = () => {
    if(eventTitleInput.value) {
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal()
    } else {
        eventTitleInput.classList.add('error')
    }
}


const load = () => {
    /*const nameFind = userName.find(name => name.name = document.getElementById('name').innerText)

    if (nameFind) {
        const name = userName.indexOf(nameFind)
        userName.splice(name,1 );
        userName.push({
            name: document.getElementById('name').innerText
       });
    
    } else {
        userName.push({
            name: document.getElementById('name').innerText
       });
    }
    localStorage.setItem('userName', JSON.stringify(userName));*/

    const dt = new Date();
    dt.setDate(1);

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav)
        //console.log('month:' + dt.getMonth())
        //console.log('nav' + nav)
    }

    const day = dt.getDate()
    const month = dt.getMonth()
    const year = dt.getFullYear()


    const firstDayOfMonth = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    })

    const paddingDays = weekdays.indexOf(dateString.split(',')[0]);

    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`;
    document.getElementById('monthDisplay').style.color = 'black'
    document.getElementById('monthDisplay').style.fontWeight = 'bolder'

    calendar.innerHTML = '';
    let counterUp = 0;
    let counterDown =0;
    //document.getElementById('passValue').innerHTML = counter;

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div')
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays

            const calEventsForDay = events.filter(e => e.date === dayString && e.email === document.getElementById('name').innerText)
            const calGoalsForDay = goals.find(g => g.date === dayString && g.email === document.getElementById('name').innerText)
            

            if (calEventsForDay && calGoalsForDay) {
                let calTotal = 0;
                calEventsForDay.forEach(event => {
                    calTotal += parseInt(event.calories)
                 });
                let actCals = parseInt(calTotal);
                let goalCals = parseInt(calGoalsForDay.goal)

                console.log(actCals)

                const eventDiv = document.createElement('div');
                const goalDiv = document.createElement('div');
                eventDiv.innerText = 'Calories Eaten: ' + actCals
                eventDiv.style.fontSize = '12px'
                eventDiv.style.fontWeight = 'bold'
                goalDiv.innerText = 'Goal Calories: ' + goalCals
                goalDiv.style.fontSize = '12px'
                goalDiv.style.fontWeight = 'bold'
                daySquare.appendChild(goalDiv)
                daySquare.appendChild(eventDiv);

                if(actCals <= goalCals) {
                    daySquare.style.backgroundColor = '#26c998'
                    //document.getElementById('passValue').innerHTML += 1;
                    counterUp++

                } else {
                    
                    daySquare.style.backgroundColor = '#f0a2a1';
                    document.getElementById('passValue').innerText--;
                    counterDown++
                }
                document.getElementById('passValue').innerHTML = counterUp;
                document.getElementById('failedValue').innerHTML = counterDown;

                }

            daySquare.addEventListener('click', () => openModal(dayString))
        } else {
            daySquare.classList.add('padding')
        }

        calendar.appendChild(daySquare)
    }

}


const initButtons = () => {
    document.getElementById('nextButton').addEventListener('click', () => {
       let counterUp = 0;
       document.getElementById('passValue').innerHTML = counterUp;
       let counterDown = 0;
       document.getElementById('failedValue').innerHTML = counterDown;
        nav++;
        load()
    });

    document.getElementById('backButton').addEventListener('click', () => {
       let counterUp = 0;
       document.getElementById('passValue').innerHTML = counterUp;
       let counterDown = 0;
       document.getElementById('failedValue').innerHTML = counterDown;
        nav--;
        load()
    });

    document.getElementById('cancelButton').addEventListener('click', closeModal)

    document.getElementById('confirmButton').addEventListener('click', saveGoal)

    document.getElementById('addFood').addEventListener('click', addFood)

    document.getElementById('submitFood').addEventListener('click', submitFood)

    document.getElementById('cancelFood').addEventListener('click', cancelNewFood)

}

initButtons()
load()