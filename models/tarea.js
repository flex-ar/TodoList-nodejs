require('colors');
const { v4: uuidv4 } = require('uuid');

class Tarea {

    // Clase:
    static #listado = {};

    static cargarData( data ) {
        if ( data ) this.#listado = JSON.parse( data );
    };

    static getData() {
        return this.#listado;
    };

    static completarTarea( ids = [] ) {
        if ( ids.length )
            ids.forEach( id => {
                if ( !this.#listado[id].completadoEn )
                    this.#listado[id].completadoEn = new Date();
            });
    };

    static getListaDeTareas() {
        return Object.values( this.#listado );
    };

    static getListaDeTareasCompletadas() {
        return Object.values( this.#listado ).filter(
            ({ completadoEn }) => completadoEn ?? false
        );
    };

    static getListaDeTareasPendientes() {
        return Object.values( this.#listado ).filter(
            ({ completadoEn }) => completadoEn === null
        );
    };

    static borrarTarea( tareaIdParaBorrar ) {
        if ( tareaIdParaBorrar ) {
            const { 
                [tareaIdParaBorrar]: omitir,
                ...nuevoListado
            } = this.#listado;
    
            this.#listado = nuevoListado;
        }
    };

    // Istancia:
    id = '';
    desc = '';
    completadoEn = null;

    constructor( desc = '' ) {
        // Crear Tarea:
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;

        // Listar Tarea:
        Tarea.#listado[this.id] = this;
    };

};

module.exports = Tarea;