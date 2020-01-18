import React, { Component } from 'react';
import { Link } from '../../routes';
import Head from 'next/head';
import css from './styles.scss';
import img from '../../public/cuadro_verde.png';
import { image } from '../../public/image';

export default class Header extends Component {
  render() {
    console.log(this.props);
    const { title } = this.props;
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta name='viewport' content='width=device-width' />
        </Head>
        <header className={css.header}>
          <div className={css.logo}>
            <img src={img} alt='logo' />
          </div>
          <ul className={css.items}>
            <li className={css.item}>Hola</li>
            <li className={css.item}>Hola 2</li>
            <li className={css.item}>
              <Link route='prueba'>
                <a>Prueba</a>
              </Link>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}
