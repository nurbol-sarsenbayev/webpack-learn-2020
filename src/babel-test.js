function setPromiseTimeout(time = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), time)
    })
}

async function checkAsync() {
    await setPromiseTimeout(2000)
    console.log('async is working')
}

checkAsync()
    .then(() => console.log('promise is working'))

class Util {
    static id = Date.now()
}

console.log('Util Id', Util.id)
