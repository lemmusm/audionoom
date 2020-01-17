import React,{Component} from 'react';
import { Link } from '../routes';
import slug from '../utils/slug';
import css from './styles.scss';

 class ChannelGrid extends Component {
  render() {
    const { channels } = this.props

    return <div className={css.channels}>
      { channels.map((channel) => (
        <Link
        route='channel'
        params={
          {
            slug:slug(channel.title),
            id:channel.id
          }
        }
        key={channel.id}
        >
          <a className={css.channel}>
            <img src={ channel.urls.logo_image.original } alt=""/>
            <h2>{ channel.title }</h2>
          </a>
        </Link>
      )) }
    </div>
    
  }
}
export default ChannelGrid