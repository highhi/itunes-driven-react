import React from 'react';
import SearchForm from './SearchForm.jsx';
import Sorter from './Sorter.jsx';
import MusicTable from './MusicTable.jsx';
import MusicTableCell from './MusicTableCell.jsx';
import Audio from './Audio.jsx';

export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data : [],
            previewUrl : null,
            trackId : null,
            sortItem : 'artistName'
        };
    }

    keywordSubmit( keyword ) {
        let kw = encodeURIComponent( keyword );
        let url = 'https://itunes.apple.com/search?term='+ kw +'&media=music&country=jp&lang=ja_jp&callback=JSON_CALLBACK';

        $.ajax({
            type : 'GET',
            url : url,
            dataType : 'jsonp',
            cache : false
        }).done( data => {
            this.setState({ data : data.results });
        }).fail( status, err => {
            console.error( status, err.toString() );
        });
    }

    playMusic( data ) {
        let url = this.state.previewUrl === data.previewUrl ? null : data.previewUrl;
        let trackId = this.state.trackId === data.trackId ? null : data.trackId;

        this.setState({
            previewUrl : url,
            trackId : trackId
        });
    }

    sortBy( item ) {
        let sortData = [].slice.call( this.state.data ).sort(function( a, b ) {
            return ( a[ item ] < b[ item ] ) ? -1 : 1;
        });

        this.setState({
            data : sortData,
            sortItem : item
        });
    }

    renderMusicTableCell() {
        let musicData = this.state.data;

        return musicData.map( ( music, index ) => {
            let style = index % 2 === 0 ? 'MusicTable__row is-odd' : 'MusicTable__row is-even';
            let signage = music.trackId === this.state.trackId ? '■' : '▶︎';
            return (
                <MusicTableCell key={ music.trackId } music = { music } style = {style} signage = { signage } onPlayButton = { this.playMusic.bind(this) } />
            )
        });
    }

    render() {
        return (
            <div className = "Wrapper">
                <header className="Header">
                    <h1>itunes driven for React</h1>
                    <SearchForm onKeywordSubmit = { this.keywordSubmit.bind(this) } />
                    <Sorter sortItem = { this.state.sortItem } onSortBy = { this.sortBy.bind(this) } />
                </header>
                <MusicTable data = { this.state.data } >
                    { this.renderMusicTableCell() }
                </MusicTable>
                <Audio previewUrl = { this.state.previewUrl } />
            </div>
        );
    }
}