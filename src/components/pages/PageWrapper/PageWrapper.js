import React from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'

import {Header} from '../../Header'

const PageWrapper = (props) => (
  <div>
    <Helmet>
      <title>{props.title}</title>
    </Helmet>
    <Header/>
    <div className='container'>
      {props.children}
    </div>
  </div>
);

PageWrapper.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageWrapper;