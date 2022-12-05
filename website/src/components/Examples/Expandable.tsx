import React from "react"
import CodeBlock from "@theme/CodeBlock"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import { FabModal } from "../../../../lib/FabModal"

export default function Expandable() {
  const showModal = () => {
    new FabModal({ title: 'Expand me' , expandable: true, content: 'Yes please, expand me...' })
  }

  return (
    <>
      <div
        style={{
          marginBottom: "1rem",
        }}
      >
        <h4>Create a simple modal and expand it, and return to previous state.</h4>
        {/* <p>By default Window opened with a loader</p> */}
        <button
          id="expandable"
          className="px-3 py-1 font-semibold text-white transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-700 hover:no-underline"
          onClick={showModal}
        >
          Click to show most expandable Modal
        </button>
      </div>

      <CodeBlock className="language-html" title="Html">
        {`<button id="expandable">Click to show most simple Window</button>`}
      </CodeBlock>

      <CodeBlock className="language-javascript" title="Javascript">
        {`const button = document.getElementById('expandable');
button.addEventListener('click', () => new FabModal({ title: 'Expand me' , expandable: true, content: 'Yes please, expand me...' }))`}
      </CodeBlock>
    </>
  )
}
