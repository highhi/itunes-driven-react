'use strict';

import request  from 'superagent';
import reqJsonp from 'superagent-jsonp';

reqJsonp(request);

export default {
    /**
     * dataを並び替えて新しい配列を生成する
     * @param  {Object} data
     * @param  {String} order
     * @return {Array}
     */
    sortBydata( data, order, key ) {
        return Array.prototype.slice.call( data ).sort( ( a, b ) => {
            switch ( order ) {
                case 'asc'  : return ( a[ key ] < b[ key ] ) ? -1 : 1;
                case 'desc' : return ( a[ key ] > b[ key ] ) ? -1 : 1;
            }
        });
    },

    fetch( url ) {
        let defer = Promise.defer();
        request.get( url ).jsonp().end( ( err, res ) => {
            if ( res ) {
                defer.resolve( res.body );
            } else {
                defer.reject( err );
            }
        });
        return defer.promise;
    }
}