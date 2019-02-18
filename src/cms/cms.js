import CMS from 'netlify-cms'

import NewsPostPreview from './preview-templates/NewsPostPreview'

CMS.registerPreviewTemplate('news', NewsPostPreview)
