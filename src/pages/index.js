import * as React from "react"
import CreateSecret from "../components/CreateSecret"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Share a Secret" />
    <CreateSecret />
  </Layout>
)

export default IndexPage
