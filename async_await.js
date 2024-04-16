

async function simuliereVerzoegerung(ms) {
    return new Promise( resolve => {
        setTimeout(resolve, ms)
    })
}

async function addiereNachVerzoegerung(a, b, ms) {
    await simuliereVerzoegerung(ms)
    console.log('Ergebnis ' + (a+b))
}

addiereNachVerzoegerung(3, 7, 2000);