require('colors');
const inquirer = require('inquirer');

const inquirerMenu = async() => {

    console.log(`${'============================='.green}`);
    console.log(`${'   Seleccione una opción'.white}`);
    console.log(`${'============================='.green}`);
    
    const questions = [{
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: 'Crear tarea'
            },
            {
                value: '2',
                name: 'Listar tareas'
            },
            {
                value: '3',
                name: 'Listar tareas completadas'
            },
            {
                value: '4',
                name: 'Listar tareas pendientes'
            },
            {
                value: '5',
                name: 'Completar tarea/s'
            },
            {
                value: '6',
                name: 'Borrar tarea'
            },
            {
                value: '0',
                name: 'Salir'
            },
        ],
        loop: false
    }];

    try {
        const { option } = await inquirer.prompt( questions );
        return option;
    } catch ( error ) {
        console.log( error );
    };

};

const pausa = async() => {
    try {
        await inquirer.prompt([{
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`            
        }]);
    } catch ( error ) {
        console.log( error );
    };
};

const leerInput = async( message = '' ) => {
    try {
        const { desc } = await inquirer.prompt([{
            name: 'desc',
            message,
            validate( value ) {
                if ( value ) return true;
                return 'Por favor ingrese un valor';
            }
        }]);
        return desc;
    } catch ( error ) {
        console.log( error );
    };
};

const completarTareas = async( tareas = [] ) => {

    const choices = tareas.map(
        ({ id, desc, completadoEn }) => ({
            checked: completadoEn ? true : false,
            name: desc,
            value: id
        })
    );

    try {
        const { tareasIds } = await inquirer.prompt([{
            type: 'checkbox',
            name: 'tareasIds',
            message: 'Selecciones',
            choices,
            loop: false,
        }]);
        return tareasIds;
    } catch ( error ) {
        console.log( error );
    };

};

const borrarTarea = async( tareas = [] ) => {

    const choices = tareas.map(
        ({ id, desc }, index ) => {
            const i = (''+( index + 1 )).green;
            return {
                name: `${i}. ${desc}`,
                value: id
            };
        }
    );

    try {
        const { tareaId } = await inquirer.prompt([{
            type: 'list',
            name: 'tareaId',
            message: 'Borrar',
            choices,
        }]);

        const { confirmacion } = await inquirer.prompt([{
            type: 'confirm',
            name: 'confirmacion',
            message: '¿Está seguro?'
        }]);

        if ( confirmacion ) return tareaId;
        
    } catch ( error ) {
        console.log( error );
    };
};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    completarTareas,
    borrarTarea
};