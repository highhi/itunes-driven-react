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
            <form onSubmit={ this.handleKeywordSubmit.bind(this) }>
                <div className="Search">
                    <input className="Search__area" type="text" placeholder="Search" ref="keyword" />
                    <button className="Search__button" type="submit">Search</button>
                </div>
            </form>
        );
    }
}