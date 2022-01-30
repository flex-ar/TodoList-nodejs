require('colors');

const Tarea = require('../models/tarea');
const { leerInput, completarTareas, borrarTarea } = require('./inquirer');
const { guardarDB } = require('./interaccionDB');

const OPTIONS = {

    '1': async() => {
        const desc = await leerInput('Descripción');
        new Tarea( desc );
        guardarDB( JSON.stringify( Tarea.getData() ) );
    },

    '2': () => {
        const list = Tarea.getListaDeTareas();
        
        if ( !list.length ) return console.log('>> No hay tareas');
    
        list.forEach(({ desc, completadoEn }, index ) => {
            const i = ''+( index + 1 );
            console.log(
                `${ i.green } ${ desc } :: ${ completadoEn ? 'Completada'.green : 'Pendiente'.red }`
            );
        });
    },

    '3': () => {
        const list = Tarea.getListaDeTareasCompletadas();

        if ( !list.length ) return console.log('>> No hay tareas completadas'.red);
    
        list.forEach(({ desc, completadoEn }, index ) => {
            const i = ''+( index + 1 );
            console.log(`${ i.green } ${ desc } :: ${ (''+completadoEn).green }`);
        });
    },

    '4': () => {
        const list = Tarea.getListaDeTareasPendientes();

        if ( !list.length ) return console.log('>> No hay tareas pendientes'.green);
    
        list.forEach(({ desc }, index ) => {
            const i = ''+( index + 1 );
            console.log(`${ i.green } ${ desc } :: ${ 'Pendiente'.red }`);
        });
    },

    '5': async() => {
        const data = Object.values( Tarea.getData() );

        if ( data.length ) {
            const tareasIds = await completarTareas( data );
            Tarea.completarTarea( tareasIds );
            guardarDB( JSON.stringify( Tarea.getData() ) );
            return;
        };

        console.log('>> No hay tareas');
    },

    '6': async() => {
        const data = Object.values( Tarea.getData() );

        if ( data.length ) {
            const tareaId = await borrarTarea( data );
            Tarea.borrarTarea( tareaId );
            guardarDB( JSON.stringify( Tarea.getData() ) );
            return;
        };

        console.log('>> No hay tareas');
    },

    '0': () => console.log('Salir')

};

module.exports = OPTIONS;