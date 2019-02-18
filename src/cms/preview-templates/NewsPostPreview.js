import React from 'react'
import PropTypes from 'prop-types'
import { NewsPostTemplate } from '../../templates/news-post'

const NewsPostPreview = ({ entry, getAsset, widgetFor }) => (
  <NewsPostTemplate
    content={widgetFor('body')}
    thumbnail={{
      thumbnail: {
        image: getAsset(entry.getIn(['data', 'thumbnail', 'image'])),
        alt: entry.getIn(['data', 'thumbnail', 'alt'])
      }
    }}
    tags={entry.getIn(['data', 'tags'])}
    postTitle={entry.getIn(['data', 'postTitle'])}
  />
)

NewsPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
}

export default NewsPostPreview
