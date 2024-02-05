//FUNCTION TO VALIDATE DATA TO UPDATE PRODUCTS 
export async function validate(newData, original) {
        if (newData === "") {
            return original
        }
        return newData
    }

export  function randomCode(){
    let letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    let randomNumForLetters = Math.floor(Math.random()*letters.length)
    let randomLetter = letters[randomNumForLetters]

    let randomNumCode = Math.floor(Math.random() * (89999) + 10000)

    return randomLetter+randomNumCode
}

export function getTime() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let hours = date.getHours()
    let minutes = date.getMinutes()


    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${day}/${month}/${year}-${hours}/${minutes}`
}