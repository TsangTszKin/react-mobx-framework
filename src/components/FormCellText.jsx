import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class FormCellText extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span style={style}> {this.props.children}</span>
        )
    }
}
FormCellText.propTypes = {

}
FormCellText.defaultProps = {

}
export default FormCellText

const style = {
    width: 'fit-content', height: '32px', lineHeight: '32px', display: 'inline-block'
}
