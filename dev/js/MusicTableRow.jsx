import React from 'react';

export default class MusicTableRow extends React.Component {
    
    handlePlayButton(e) {
        e.preventDefault();
        let previewUrl = this.props.music.previewUrl;
        let trackId = this.props.music.trackId;

        this.props.onPlayButton({
            previewUrl : previewUrl,
            trackId : trackId
        });
    }
    
    render() {
        return (
            <div className={ this.props.style }>
                <div className="MusicTable__cell t-td is-button">
                    <button className="MusicTable__button" ref="previewUrl" onClick = { this.handlePlayButton.bind(this) } > { this.props.signage } </button>
                </div>
                <div className="MusicTable__cell t-td is-cover">
                    <img src={ this.props.music.artworkUrl60 } width="60" height="60" alt="" />
                </div>
                <div className="MusicTable__cell t-td is-track"> { this.props.music.trackName } </div>
                <div className="MusicTable__cell t-td is-artist"> { this.props.music.artistName } </div>
                <div className="MusicTable__cell t-td is-collection"> { this.props.music.collectionName } </div>
                <div className="MusicTable__cell t-td is-collePrice"> { this.props.music.collectionPrice } </div>
                <div className="MusicTable__cell t-td is-trackPrice"> { this.props.music.trackPrice } </div>
            </div>
        );
    }
}