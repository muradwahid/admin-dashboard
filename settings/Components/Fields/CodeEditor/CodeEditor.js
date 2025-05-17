import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/ext-language_tools";
// languages
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-diff";
import "ace-builds/src-noconflict/mode-django";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-scss";
import "ace-builds/src-noconflict/mode-typescript";

//themes
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-twilight";

import "./style.scss";

const CodeEditor = ({
  default: defaultValue,
  value,
  onChange,
  width = "100%",
  height = "350px",
  settings = {}
}) => {
  const { theme = "github", mode = "html" } = settings;
  const id = Math.floor(Math.random() * 999);
  const def = value || defaultValue;
  return (
    <div style={{ border: '1px solid #eee' }}>
    
      <AceEditor
        // placeholder="Placeholder Text"
        mode={mode}
        theme={theme}
        name={`blah-${id}`}
        height={height}
        onChange={(val) => onChange(val)}
        width={width}
        fontSize={14}
        lineHeight={19}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={def}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
