/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [{ type: "autogenerated", dirName: "." }],
  getStartedSidebar: ["intro", "usage"],
  examplesSidebar: [
    {
      type: "category",
      collapsed: false,
      collapsible: true,
      label: "FabModal demos",
      link: {
        type: "generated-index",
        title: "Examples",
        description: "Example how we can use Selectize.js",
        slug: "/demos",
        keywords: ["demos"],
        image: "/img/docusaurus.png",
      },
      items: ["demos/basic", "demos/draggable", "demos/expandable"],
    },
  ],
  apiSidebar: [
    {
      type: "category",
      collapsed: false,
      collapsible: true,
      label: "FabModal API Documentation",
      link: {
        type: "generated-index",
        title: "Api documentation",
        description: "Example how we can use Selectize.js",
        slug: "/api",
        keywords: ["api"],
        image: "/img/docusaurus.png",
      },
      items: ["api/default", "api/events", "api/fabmodal", "api/fabmodalmanager"],
    },
  ],
  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
}

module.exports = sidebars