import React, { ComponentProps } from "react"
import CodeBlock from "@theme/CodeBlock"

type B = {
  title: string
}

export default function Basic({ title }: B, props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <>
      <button
        id={props.id}
        className={`px-3 py-1 font-semibold text-white transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-700 hover:no-underline${
          props.className ? " " + props.className : ""
        }`}
        onClick={props.onClick}
      >
        {title}
      </button>
    </>
  )
}
