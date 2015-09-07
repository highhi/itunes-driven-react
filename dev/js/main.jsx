import React from 'react';

class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data : [],
            previewUrl : ''
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

    playMusic( previewUrl ) {
        let url = this.state.previewUrl === previewUrl ? '' : previewUrl;
        this.setState( { previewUrl : url } );
    }

    render() {
        return (
            <div className = "Wrapper">
                <header className="Header">
                    <h1>itunes driven for React</h1>
                    <SearchForm onKeywordSubmit = { this.keywordSubmit.bind(this) } />
                </header>
                <TrackTable data = { this.state.data } onPlayButton = { this.playMusic.bind(this) } />
                <Audio previewUrl = { this.state.previewUrl } />
            </div>
        );
    }
}

class SearchForm extends React.Component {
    handleKeywordSubmit(e) {
        e.preventDefault();
        let keyword = React.findDOMNode( this.refs.keyword ).value.trim();
        
        if( !keyword ) return;

        this.props.onKeywordSubmit( keyword );
        React.findDOMNode( this.refs.keyword ).value = '';

    }
    render() {
        return (
            <form onSubmit={ this.handleKeywordSubmit.bind(this) }>
                <div className="Search">
                    <input className="Search__area" type="text" placeholder="Search" ref="keyword" />
                    <button className="Search__button" type="submit">Search</button>
                </div>
                
            </form>
        );
    }
}

class TrackTable extends React.Component {
    render() {
        let musicNodes = this.props.data.map( ( music, index )=> {
            let style = index % 2 === 0 ? 'TrackTable__row is-odd' : 'TrackTable__row is-even';
            return (
                <TrackTableCell music = { music } style = {style} onPlayButton = { this.props.onPlayButton } />
            )
        });
        return (
            <div className="TrackTable">
                <div className="TrackTable__row">
                    <div className="TrackTable__cell t-th is-button"></div>
                    <div className="TrackTable__cell t-th is-cover">
                        Cover
                    </div>
                    <div className="TrackTable__cell t-th is-track">
                        Track
                    </div>
                    <div className="TrackTable__cell t-th is-artist">
                        Artist
                    </div>
                    <div className="TrackTable__cell t-th is-collection">
                        Collection
                    </div>
                    <div className="TrackTable__cell t-th is-collePrice">
                        Collection Price
                    </div>
                    <div className="TrackTable__cell t-th is-trackPrice">
                        Track Price
                    </div>
                </div>
                { musicNodes }
            </div>
        );
    }
}

class TrackTableCell extends React.Component {
    
    handlePlayButton(e) {
        e.preventDefault();
        let previewUrl = React.findDOMNode( this.refs.previewUrl ).dataset.previewUrl;
        this.props.onPlayButton( previewUrl );
    }
    
    render() {
        return (
            <div className={ this.props.style }>
                <div className="TrackTable__cell t-td is-button">
                    <button className="TrackTable__button" ref="previewUrl" data-preview-url={ this.props.music.previewUrl } onClick = { this.handlePlayButton.bind(this) } >▶︎</button>
                </div>
                <div className="TrackTable__cell t-td is-cover">
                    <img src={ this.props.music.artworkUrl60 } width="60" height="60" alt="" />
                </div>
                <div className="TrackTable__cell t-td is-track"> { this.props.music.trackName } </div>
                <div className="TrackTable__cell t-td is-artist"> { this.props.music.artistName } </div>
                <div className="TrackTable__cell t-td is-collection"> { this.props.music.collectionName } </div>
                <div className="TrackTable__cell t-td is-collePrice"> { this.props.music.collePrice } </div>
                <div className="TrackTable__cell t-td is-trackPrice"> { this.props.music.trackPrice } </div>
            </div>
        );
    }
}

class Audio extends React.Component {
    render() {
        return (
            <audio src={ this.props.previewUrl } autoPlay></audio>
        );
    }
}

React.render(
    <Wrapper />,
    document.getElementById('content')
);