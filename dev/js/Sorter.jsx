'use strict';

import React from 'react';
import { ORDERBY_ASC, ORDERBY_DESC } from './variables';

export default class Sorter extends React.Component {
    handleChange( e ) {
        this.props.onSortBy( e.target.value );
    }

    handlerOrderChange( e ) {
        this.props.onOrderBy( e.target.value );
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
                <div className="Sorter__oder">
                    <label className="Sorter__oder__item">
                        <input type="radio" name="order" value={ ORDERBY_DESC } onChange={ this.handlerOrderChange.bind(this) } checked={ this.props.currentOrder === ORDERBY_DESC } /> descending
                    </label>
                    <label className="Sorter__oder__item">
                        <input type="radio" name="order" value={ ORDERBY_ASC } onChange={ this.handlerOrderChange.bind(this) } checked={ this.props.currentOrder === ORDERBY_ASC } /> ascending
                    </label>
                </div>
            </div>
        );
    }
}