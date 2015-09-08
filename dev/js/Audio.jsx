import React from 'react';

export default class Audio extends React.Component {
    render() {
        return (
            <audio src={ this.props.previewUrl } autoPlay></audio>
        );
    }
}