import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from "../components/PreviewCompatibleImage"

export const NewsPostTemplate = ({
  content,
  contentComponent,
  tags,
  postTitle,
  thubmnail,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {postTitle}
            </h1>
            <PreviewCompatibleImage imageInfo={thubmnail} />
            {tags && tags.length ? (
              <ul className="taglist">
                {tags.map(tag => (
                  <li key={tag + `tag`}>
                    <Link to={`news/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

NewsPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  postTitle: PropTypes.string,
  thubmnail: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  helmet: PropTypes.object,
}

const NewsPost = ({ data }) => {
  const { markdownRemark: post } = data
  console.log(post)
  return (
    <Layout>
      <NewsPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet
            titleTemplate="%s | News"
          >
            <title>{`${post.frontmatter.postTitle}`}</title>
          </Helmet>
        }
        tags={post.frontmatter.tags}
        postTitle={post.frontmatter.postTitle}
        thubmnail={post.frontmatter.thubmnail}
      />
    </Layout>
  )
}

NewsPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default NewsPost

export const pageQuery = graphql`
  query NewsPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY/MM/DD")
        postTitle
        thubmnail {
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          alt
        }
        tags
      }
    }
  }
`
