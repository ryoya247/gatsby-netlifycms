import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
            </div>
            {posts
              .map(({ node: post }) => (
                <div
                  className="content"
                  key={post.id}
                >
                  <p>
                    <Link className="has-text-primary" to={post.fields.slug}>
                      {post.frontmatter.postTitle}
                    </Link>
                    <span> &bull; </span>
                    <small>{post.frontmatter.date}</small>
                  </p>
                  <p>{post.excerpt}</p>
                  <PreviewCompatibleImage imageInfo={post.frontmatter.thumbnail} imageStyle={{width: `200px`}}/>
                  <p>
                    <Link className="button is-small" to={post.fields.slug}>
                      記事を見る →
                    </Link>
                  </p>
                </div>
              ))}
          </div>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "news-post" } }}
      limit: 5
    ) {
      edges {
        node {
          excerpt(pruneLength: 30)
          id
          fields {
            slug
          }
          frontmatter {
            postTitle
            templateKey
            thumbnail {
              image {
                childImageSharp  {
                  fluid(maxWidth: 200, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              alt
            }
            date(formatString: "YYYY / MM / DD")
          }
        }
      }
    }
  }
`
