import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class FormCell extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="clearfix" style={style.searchShell}>
                <span style={Object.assign(this.props.titleStyle, style.searchTitle)}>
                <span style={{ display: this.props.isNotNull ? 'initial' : 'none', marginRight: '5px', color: '#E44B4E' }}>*</span>{this.props.name}：</span>
                {this.props.children}
            </div>
        )
    }
}
FormCell.propTypes = {
    isNotNull: PropTypes.bool,
    name: PropTypes.string,
    titleStyle: PropTypes.object
}
FormCell.defaultProps = {
    isNotNull: false,
    name: '',
    titleStyle: {}
}
export default FormCell

const style = {
    searchPanel: {
        marginBottom: '20px', width: '600px'
    },
    searchShell: {
        margin: '0px 30px 10px 0px',
        width: 'fit-content',
        float: 'left',
    },
    searchTitle: {
        height: '21px',
        lineHeight: '21px',
        display: 'inline-block',
        marginRight: '5px',
        width: '115px',
        textAlign: 'right'
    }
}
