import ReactDOM from 'react-dom'
// eslint-disable-next-line node/no-unpublished-import
// import '../styles/tailwind.css'

import Content from './Content'

const container = document.createElement('div')
document.documentElement.prepend(container)

ReactDOM.render(<Content />, container)
