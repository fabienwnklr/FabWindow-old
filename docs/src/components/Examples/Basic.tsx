import React from "react"
import CodeBlock from "@theme/CodeBlock"
// import Tabs from "@theme/Tabs"
// import TabItem from "@theme/TabItem"
import {FabWindow} from "../../../static/assets/FabWindow"

export default function Basic() {
  const showModal = () => {
    new FabWindow({ title: "Basic title", content: "Basic content" })
  }

  return (
    <>
      <div
        style={{
          marginBottom: "1rem",
        }}
      >
        <h4>The most vanilla of examples.</h4>
        <p>By default Window opened with an empty content</p>
        <button
          id="basic"
          className="button px-3 py-1 font-semibold text-white transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-700 hover:no-underline dark:bg-gray-400 dark:text-black dark:hover:bg-gray-500"
          onClick={showModal}
        >
          Click to show most simple Window
        </button>
      </div>

      <CodeBlock className="language-html" title="Html">
        {`<button id="basic" onclick="new FabWindow()">Click to show most simple Window</button>`}
      </CodeBlock>

      <CodeBlock className="language-javascript" title="Javascript">
        // No JS needed here...
      </CodeBlock>
    </>
  )
}
