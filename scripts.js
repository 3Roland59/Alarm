let timerRef = document.querySelector('.timer-display')
const hourInput = document.getElementById('hourInput')
const minuteInput = document.getElementById('minuteInput')
const activeAlarms = document.querySelector('.activeAlarms')
const setAlarm = document.getElementById('set')
let alarmsArray = []
let alarmSong = new Audio('alarm/Epidemic.mp3')

let initialHour = 0,
    initialMinute = 0,
    alarmIndex = 0

const addZero = (val) => (val < 10 ? "0" + val : val)

const searchObject = (param, val) =>{
    let alarmObject,
        objIndex,
        exists = false

    alarmsArray.forEach((alarm, index) => {
        if(alarm[param] == val){
            exists = true
            alarmObject = alarm
            objIndex = index
            return false
        }
    })
    return [exists, alarmObject, objIndex]
}

function displayTimer() {
    let date = new Date()
    let [hours, minutes, seconds, milli] = [
        addZero(date.getHours()),
        addZero(date.getMinutes()),
        addZero(date.getSeconds())
    ]
    timerRef.innerHTML = `${hours}:${minutes} <small>${seconds}</small>`
    
    alarmsArray.forEach((alarm, index)=>{
        if(alarm.isActive){
            if(`${alarm.alarmHour}:${alarm.alarmMinute}` == `${hours}:${minutes}`){
                alarmSong.play()
                alarmSong.loop = true
            }
        }
    })
}

const inputCheck = (inputVal) =>{
    inputVal = parseInt(inputVal)
    if(inputVal<10){
        inputVal = addZero(inputVal)
    }
    return inputVal
}

hourInput.addEventListener('input', ()=>{
    hourInput.value = inputCheck(hourInput.value)
    if(hourInput.value > 23){
        // hourInput.style.outline = '1px solid red'
        // hourInput.style.border = 'none'
        hourInput.value = ''
    }
})

minuteInput.addEventListener('input', ()=>{
    minuteInput.value = inputCheck(minuteInput.value)
    if(minuteInput.value > 59){
        // minuteInput.style.outline = '1px solid red'
        // minuteInput.style.border = 'none'
        minuteInput.value = ''
    }
})

const createAlarm = (alarmObj) =>{
    if(hourInput.value != '' && minuteInput.value != ''){
        const {id, alarmHour, alarmMinute} = alarmObj
        let alarmDiv = document.createElement('div')
        alarmDiv.classList.add('alarm')
        alarmDiv.setAttribute('data-id', id)
        alarmDiv.innerHTML = `<span>${alarmHour} : ${alarmMinute}</span>`

        let checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.addEventListener('click', (e)=>{
            if(e.target.checked){
                startAlarm(e)
            }else{
                stopAlarm(e)
            }
        })
        alarmDiv.appendChild(checkbox)
        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = `<i class="fa-solid fa-trash-can">D</i>`
        deleteButton.classList.add('deleteButton')
        deleteButton.addEventListener('click', (e)=>(deleteAlarm(e)))
        alarmDiv.appendChild(deleteButton)
        activeAlarms.appendChild(alarmDiv)
    }
}

setAlarm.addEventListener('click', (e)=>{
    alarmIndex += 1

    let alarmObj = {}
    alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`
    alarmObj.alarmHour = hourInput.value
    alarmObj.alarmMinute = minuteInput.value
    alarmObj.isActive = false
    // console.log(alarmObj)
    alarmsArray.push(alarmObj)
    createAlarm(alarmObj)
    hourInput.value = ''
    minuteInput.value = ''
})

const startAlarm = (e) =>{
    let searchId = e.target.parentElement.getAttribute('data-id')
    let [exists, obj, index] = searchObject('id', searchId)
    if(exists){
        alarmsArray[index].isActive = true
    }
}

const stopAlarm = (e) =>{
    let searchId = e.target.parentElement.getAttribute('data-id')
    let [exists, obj, index] = searchObject('id', searchId)
    if(exists){
        alarmsArray[index].isActive = false
        alarmSong.pause()
        alarmSong.currentTime = 0
    }
}

const deleteAlarm = (e)=>{
    // console.log(e)
    let searchId = e.target.parentElement.parentElement.getAttribute('data-id')
    let[exists, obj, index] = searchObject('id', searchId)
    if(exists){
        e.target.parentElement.parentElement.remove()
        alarmsArray.splice(index, 1)
        alarmSong.pause()
        alarmSong.currentTime = 0
    }
}

window.onload = () =>{
    setInterval(displayTimer)
    initialHour = 0
    initialMinute = 0
    alarmIndex = 0
    alarmsArray = []
    hourInput.value = ''
    minuteInput.value = ''
}

function random_bg_color(){
    let hex = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
    // let a 

    function populate (a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14)
            let y = hex[x]
            a+=y
        }
        return a
    }
    function ang(){
        let angs = ['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg']
        let z = Math.round(Math.random() * 7)
        let w = angs[z]
        return w
    } 

    let color1 = populate('#')
    let color2  = populate('#')
    let angle = ang()

    let gradient = 'linear-gradient('+ angle + ',' + color1 + ',' + color2 + ')'
    document.querySelector('body').style.background = gradient
    document.querySelector('#set').style.background = gradient
}

random_bg_color()