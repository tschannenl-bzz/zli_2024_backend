const fs = require('node:fs');
path = "C:\Users\leont\ÜK_Backend_2024\heyo";

function leseDateiInhalt(path) {
    return new Promise((resolve, reject) =>{
        fs.readFile(path, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    });
}

leseDateiInhalt('beispiel.txt')
    .then(inhalt => { console.log('Die Länge des Dateiinhalts beträgt:', inhalt.length);
    })
    .catch(err => { console.error('Fehler beim Lesen der Datei:', err);
    })
    .finally(()=>(
        console.log('lesen beendet')
    ));
