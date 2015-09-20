'use strict';

export default {

    /**
     * dataを並び替えて新しい配列を生成する
     * @param  {Object} data
     * @param  {String} order
     * @return {Array}
     */
    sortBydata( data, order, key ) {
        return Array.prototype.slice.call( data ).sort(function( a, b ) {
            switch ( order ) {
                case 'asc'  : return ( a[ key ] < b[ key ] ) ? -1 : 1;
                case 'desc' : return ( a[ key ] > b[ key ] ) ? -1 : 1;
            }
        });
    }
}