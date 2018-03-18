import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

import './Editor.css';

export default class Editor extends Component {
    onEditorDidMount = (editor) => {
        editor.focus();
    };

    render() {
        const options = {
            selectOnLineNumbers: true
        };

        return (
            <div className="editor">
                <MonacoEditor
                    height="650"
                    language={ this.props.language }
                    theme="vs-dark"
                    value={ this.props.content }
                    options={ options }
                    onChange={ this.props.onChange }
                    editorDidMount={ this.editorDidMount }
                />
            </div>
        )
    }
}
