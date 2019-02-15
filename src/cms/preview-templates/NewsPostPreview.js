import React from 'react'
import PropTypes from 'prop-types'
import { NewsPostTemplate } from '../../templates/news-post'

const NewsPostPreview = ({ entry, widgetFor }) => (
  <NewsPostTemplate
    content={widgetFor('body')}
    tags={entry.getIn(['data', 'tags'])}
    postTitle={entry.getIn(['data', 'postTitle'])}
  />
)

NewsPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default NewsPostPreview
