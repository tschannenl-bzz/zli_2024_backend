function zahlVerdoppel(num, callback) {
    result = num * 2
    callback(result)
}
zahlVerdoppel(5, function (ergebnis) {
    console.log('Das Ergebnis ist ', ergebnis)
})