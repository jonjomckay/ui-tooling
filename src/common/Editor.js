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

        const requireConfig = {
            url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
            paths: {
                'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.10.1/min/vs'
            }
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
                    requireConfig={ requireConfig }
                />
            </div>
        )
    }
}