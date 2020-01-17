import React, { Component } from 'react'
import Header from './common/Header'
import Footer from './common/Footer'

export default class Layout extends Component {
  render() {
    const {children, title} = this.props
    return (
    <div>
      <Header title={title}/>
        {children}
      <Footer/>
    </div>
    )
  }
}
