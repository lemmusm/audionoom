import React, { Component } from 'react'
import Link from 'next/link';
import Layout from '../components/Layout'
import css from './styles.scss'

export default class _error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : 
                       err ? err.statusCode : null;
    return { statusCode }
  }__
  render() {
    const {statusCode} = this.props
    return (
      <Layout title='oh no'>
        {
          statusCode === 404 ?
          <div className={css.message}>
            <h2>Esta pagina  no existe</h2>
            <p><Link href="/"><a>Volver a la home</a></Link></p>
          </div>
          :
          <div className={css.message}>
            <h2>Hubo un porblema</h2>
          </div>
        }
      </Layout>
   )
  }
}
