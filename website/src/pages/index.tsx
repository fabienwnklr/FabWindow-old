import React from "react"
// import clsx from "clsx"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import HomepageFeatures from "@site/src/components/HomepageFeatures"

// import styles from "./index.module.css"

function HomepageHeader() {
  const availableBG = ["Web-Header-Background-1", "Black-Animation-Background", "Bubble-Background"]
  const randomIndex = Math.round(Math.random() * (availableBG.length - 1) + 0)
  const randomBG = availableBG[randomIndex]

  return (
    <header className="hero bg-gray-900" style={{ backgroundImage: `url('/img/${randomBG}.svg')`, backgroundSize: "cover", backgroundPosition: "0% 36%" }}>
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center py-6 lg:h-[36rem] lg:flex-row">
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-semibold text-gray-100 lg:text-4xl">FabModal</h1>

            <p className="mt-4 text-gray-100 text-lg">
              FabModal is a <code className="text--primary">Javascript</code> library to setup quicly and easily a window (as modal)
            </p>
            <p className="mt-4 text-gray-100 text-lg font-bold">OR</p>
            <p className="mt-4 text-gray-100 text-lg">
              Multiple windows using <code className="text--primary">FabModalManager</code>
            </p>
          </div>

          <div className="flex mt-8 lg:w-1/2 lg:justify-end lg:mt-0">
            <div className="w-full max-w-md">
              <div className="px-6 py-8 text-center">
                <div className="flex items-center mt-2 -mx-2 sm:mt-0">
                  <Link
                    to="/docs/demos"
                    className="px-3 py-2 text-lg font-semibold text-white transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-700 hover:no-underline"
                  >
                    Demos
                  </Link>
                  <Link
                    to="/docs/intro"
                    className="px-3 py-2 mx-2 text-lg font-semibold text-white transition-colors duration-300 transform border-solid rounded-md hover:bg-gray-800 hover:no-underline"
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
