'use strict';

import React from 'react';

export default class SearchForm extends React.Component {
    handleKeywordSubmit(e) {
        e.preventDefault();
        let keyword = React.findDOMNode( this.refs.keyword ).value.trim();
        
        if( !keyword ) return;

        this.props.onKeywordSubmit( keyword );
        React.findDOMNode( this.refs.keyword ).value = '';

    }
    render() {
        return (
            <form classNmae="SearchForm" onSubmit={ this.handleKeywordSubmit.bind(this) }>
                <div className="SearchForm__inner">
                    <input className="SearchForm__text" type="text" placeholder="type text" ref="keyword" />
                    <button className="SearchForm__button" type="submit">Search</button>
                </div>
            </form>
        );
    }
}