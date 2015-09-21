'use strict';

import React from 'react';

export default class MusicTable extends React.Component {
    render() {
        return (
            <div className="MusicTable">
                <div className="MusicTable__row">
                    <div className="MusicTable__cell t-th is-button"></div>
                    <div className="MusicTable__cell t-th is-cover">
                        Cover
                    </div>
                    <div className="MusicTable__cell t-th is-track">
                        Track
                    </div>
                    <div className="MusicTable__cell t-th is-artist">
                        Artist
                    </div>
                    <div className="MusicTable__cell t-th is-collection">
                        Collection
                    </div>
                    <div className="MusicTable__cell t-th is-collePrice">
                        Collection Price
                    </div>
                    <div className="MusicTable__cell t-th is-trackPrice">
                        Track Price
                    </div>
                </div>
                { this.props.children }
            </div>
        );
    }
}