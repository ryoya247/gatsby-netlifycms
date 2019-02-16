import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>
  } else {
    return <span>{props.text}</span>
  }
}

const NewsPaginationPage = ({ pageContext }) => {
  console.log(pageContext)
  const { group, index, first, last, pageCount } = pageContext
  const previousUrl = index - 1 === 1 ? '/news' : '/news' + (index - 1).toString()
  const nextUrl = '/news/' + (index + 1).toString()

  return (
    <Layout>
      <div>
        {group.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug}>{node.frontmatter.postTitle}</Link>
            <div>{node.frontmatter.date}</div>
          </div>
        ))}
        <hr />
        <ul style={{ listStyleType: `none`, display: `flex`}}>
          <li style={{ padding: `0px 20px 0px 0px`}}><NavLink test={first} url={previousUrl} text="Go to Previous Page" /></li>
          <li style={{ padding: `0px 20px 0px 0px`}}>{pageCount} Pages</li>
          <li style={{ padding: `0px 20px 0px 0px`}}><NavLink test={last} url={nextUrl} text="Go to Next Page" /></li>
        </ul>
      </div>
    </Layout>
  )
}
export default NewsPaginationPage
