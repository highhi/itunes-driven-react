'use strict';

<<<<<<< HEAD
import request  from 'superagent';
import reqJsonp from 'superagent-jsonp';

reqJsonp(request);

=======
'use strict';

import request  from 'superagent';
import reqJsonp from 'superagent-jsonp';
import { ORDERBY_ASC, ORDERBY_DESC } from './variables';

reqJsonp(request);

>>>>>>> gh-pages
export default {
    /**
     * dataを並び替えて新しい配列を生成する
     * @param  {Object} data
     * @param  {String} order
     * @param  {String} key
     * @return {Array}
     */
    sortBydata( data, order, key ) {
        return Array.prototype.slice.call( data ).sort( ( a, b ) => {
            switch ( order ) {
                case ORDERBY_ASC  : return ( a[ key ] < b[ key ] ) ? -1 : 1;
                case ORDERBY_DESC : return ( a[ key ] > b[ key ] ) ? -1 : 1;
            }
        });
    },

<<<<<<< HEAD
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
=======
    /**
     * ajaxでデータの取得
     * @param  {String} url
     * @return {Object} promise
     */
    fetch( url ) {
        // Promise.defer()はFirefoxでは未実装？
        return new Promise( ( resolve, reject ) => {
            request.get( url ).jsonp().end( ( err, res ) => {
                if ( res ) {
                    resolve( res.body );
                } else {
                    reject( err );
                }
            });
        });
>>>>>>> gh-pages
    }
}