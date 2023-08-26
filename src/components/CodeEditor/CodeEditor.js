import React from 'react'
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/addon/display/autorefresh";
import "codemirror/keymap/sublime";
import "codemirror/theme/neo.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/mode/sql/sql";
import "codemirror/keymap/sublime";
import "codemirror/addon/hint/sql-hint.js";
import './CodeEditor.css';

/**
 * Display code editor to type SQL query.
 * @param {string} query - Stores text from code editor.
 * @param {function} setQuery - Sets query data.
 * @return {JSX.Element} JSX code mirror editor.
*/
const CodeEditor = ({ query, setQuery }) => {

    return (
        <CodeMirror
            value={query}
            name='Editor'
            onBeforeChange={(editor, data, value) => setQuery(value)}
            className='code-mirror-wrapper'
            options={{
                lint: true,
                mode: "sql",
                lineNumbers: true,
                keyMap: "sublime",
                matchBrackets: true,
                addModeClass: true,
                showHint: true,
            }}
            aria-label='code-editor'
        />
    )
}

export { CodeEditor };