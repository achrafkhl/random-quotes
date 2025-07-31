import './App.css'
import React, { useState } from 'react';
import {marked} from 'marked';
function App() {
  const [markdownText, setMarkdownText] = useState(`# Welcome to my React Markdown Previewer!

## This is a sub-heading...

And here's some inline code: \`<div></div>\`.

\`\`\`
// This is a multi-line code block
function helloWorld() {
  console.log("Hello, world!");
}
\`\`\`

You can also make text **bold**... whoa!

Or _italic_.

Or... wait for it... **_both!_**

And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

- And of course there are lists.
- Some are bulleted.
- With different indentation levels:
  - That look like this.

1. And there are numbered lists too.
2. With different indentation levels as well.
3. That look like this.

And let's not forget about images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`);


  const handleChange = (e) => {
    setMarkdownText(e.target.value);
  }
  return (
    <div className="All">
      <div className="left">
        <textarea name="editor" id="editor" value={markdownText}
        onChange={handleChange}
        rows={10}
        cols={40}></textarea>
      </div>
      <div className="right">
        <div id="preview" dangerouslySetInnerHTML={{ __html: marked(markdownText) }}
          style={{ border: '1px solid #ccc', padding: '1rem', width: '40%' }} >
          
        </div>
        </div>
    </div>
  )
}

export default App
