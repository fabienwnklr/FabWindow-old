import React from "react"
import CodeBlock from "@theme/CodeBlock"

export default function Api() {
  return (
    <>
      <div
        style={{
          marginBottom: "1rem",
        }}
      >
        <h4>The most vanilla of examples.</h4>
        <select id="normalize">
          <option value=""></option>
          <option value="1">Awesome</option>
          <option value="2">Beast</option>
          <option value="3">Compatible</option>
          <option value="4">Thomas Edison</option>
          <option value="5">Nikola</option>
          <option value="6">Selectize</option>
          <option value="7">Javascript</option>
        </select>
      </div>

      <CodeBlock className="language-html" title="Html">
        {`<select id="normalize">
  <option value=""></option>
  <option value="1">Awesome</option>
  <option value="2">Beast</option>
  <option value="3">Compatible</option>
  <option value="4">Thomas Edison</option>
  <option value="5">Nikola</option>
  <option value="6">Selectize</option>
  <option value="7">Javascript</option>
</select>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {"$('#normalize').selectize();"}
      </CodeBlock>
    </>
  )
}
