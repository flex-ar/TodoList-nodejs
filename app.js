require('colors');

const Tarea = require('./models/tarea');
const OPTIONS = require('./helpers/options');
const { leerDB } = require('./helpers/interaccionDB');
const { inquirerMenu, pausa } = require('./helpers/inquirer');

(async() => {
    
    let opcion = '';
    Tarea.cargarData( leerDB() );
    
    do {
        console.clear();
        opcion = await inquirerMenu(); 
        
        await OPTIONS[opcion]();

        if ( opcion !== '0' ) {
            console.log('\n');
            await pausa();
        };
    } while ( opcion !== '0' );

})();