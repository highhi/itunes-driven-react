'use strict';

import React         from 'react';
import SearchForm    from './SearchForm.jsx';
import Sorter        from './Sorter.jsx';
import MusicTable    from './MusicTable.jsx';
import MusicTableRow from './MusicTableRow.jsx';
import Audio         from './Audio.jsx';
import util          from './util';
import { ORDERBY_ASC, ORDERBY_DESC } from './variables';

export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data       : [],
            previewUrl : null,
            trackId    : null,
            sortItem   : 'trackName'
        };
        this.currentOrder = ORDERBY_DESC;
    }

    keywordSubmit( keyword ) {
        let kw  = encodeURIComponent( keyword );
        let url = 'https://itunes.apple.com/search?term='+ kw +'&media=music&country=jp&lang=ja_jp&callback=JSON_CALLBACK';

        $.ajax({
            type     : 'GET',
            url      : url,
            dataType : 'jsonp',
            cache    : false
        }).done( data => {
            let json     = typeof data.results === 'string' ? JSON.parse( data.results ) : data.results;
            let sortData = util.sortBydata( json, this.currentOrder, this.state.sortItem );
            this.setState({ data : sortData });
        }).fail( status, err => {
            console.error( status, err.toString() );
        });
    }

    playMusic( data ) {
        let url     = this.state.previewUrl === data.previewUrl ? null : data.previewUrl;
        let trackId = this.state.trackId === data.trackId ? null : data.trackId;
        this.setState({
            previewUrl : url,
            trackId    : trackId
        });
    }

    sortBy( item ) {
        let sortData = util.sortBydata( this.state.data, this.currentOrder, item );
        this.setState({
            data     : sortData,
            sortItem : item
        });
    }

    orderBy( order ) {
        let sortData      = util.sortBydata( this.state.data, order, this.state.sortItem );
        this.currentOrder = order;
        this.setState({ data : sortData });
    }

    renderMusicTableRow() {
        let musicData = this.state.data;

        return musicData.map( ( music, index ) => {
            let style   = index % 2 === 0 ? 'MusicTable__row is-odd' : 'MusicTable__row is-even';
            let signage = music.trackId === this.state.trackId ? '■' : '▶︎';
            return (
                <MusicTableRow
                    key          = { music.trackId }
                    music        = { music }
                    style        = { style }
                    signage      = { signage }
                    onPlayButton = { this.playMusic.bind(this) }
                />
            )
        });
    }

    render() {
        return (
            <div className = "Wrapper">
                <header className="Header">
                    <h1>itunes driven for React</h1>
                    <SearchForm onKeywordSubmit = { this.keywordSubmit.bind(this) } />
                    <Sorter
                        sortItem     = { this.state.sortItem }
                        currentOrder = { this.currentOrder }
                        onSortBy     = { this.sortBy.bind(this) }
                        onOrderBy    = { this.orderBy.bind(this) }
                    />
                </header>
                <MusicTable data = { this.state.data } >
                    { this.renderMusicTableRow() }
                </MusicTable>
                <Audio previewUrl = { this.state.previewUrl } />
            </div>
        );
    }
}