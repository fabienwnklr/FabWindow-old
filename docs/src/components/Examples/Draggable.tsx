import React from "react"
import CodeBlock from "@theme/CodeBlock"
// import Tabs from "@theme/Tabs"
// import TabItem from "@theme/TabItem"
import { FabWindow } from "../../../static/assets/FabWindow"

export default function Draggable() {
  const showModal = () => {
    new FabWindow({ title: "Drag me", draggable: true, content: "Yes please, drag me...", overlay: false })
  }

  return (
    <>
      <div
        style={{
          marginBottom: "1rem",
        }}
      >
        <h4>Create a simple modal and move it on page, where you want.</h4>
        <button
          id="draggable"
          className="button px-3 py-1 font-semibold text-white transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-700 hover:no-underline dark:bg-gray-400 dark:text-black dark:hover:bg-gray-500"
          onClick={showModal}
        >
          Click to show most draggable Modal
        </button>
      </div>

      <CodeBlock className="language-html" title="Html">
        {`<button id="draggable">Click to show most simple Window</button>`}
      </CodeBlock>

      <CodeBlock className="language-javascript" title="Javascript">
        {`const button = document.getElementById('draggable');
button.addEventListener('click', () => new FabWindow({
  title: 'Drag me',
  draggable: true,
  content: 'Yes please, drag me...'
}))`}
      </CodeBlock>
    </>
  )
}
