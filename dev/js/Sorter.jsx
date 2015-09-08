import React from 'react';

export default class Sorter extends React.Component {
    handleChange( e ) {
        this.props.onSortBy( e.target.value );
    }

    render() {
        return (
            <div className="Sorter">
                <span className="Sorter__label" >Sort by </span>
                <select className="Sorter__select" value={ this.props.sortItem } onChange={ this.handleChange.bind(this) } >
                    <option value="trackName">Track</option>
                    <option value="artistName">Artis</option>
                    <option value="collectionName">Collection</option>
                    <option value="collectionPrice">Collection Price</option>
                    <option value="trackPrice">Track Price</option>
                </select>
            </div>
        );
    }
}