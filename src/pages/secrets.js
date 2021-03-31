import { Router } from "@reach/router"
import React from "react"
import Layout from "../components/layout"
import Secret from "../components/Secret"

const App = () => {
  return (
    <Layout>
      <Router basepath="/secrets">
        <Secret path="/:id" />
      </Router>
    </Layout>
  )
}

export default App
