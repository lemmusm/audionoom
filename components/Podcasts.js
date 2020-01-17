import React, { Component } from 'react'
import {Link} from '../routes';
import css from './styles.scss'
import slug from '../utils/slug'
export default class Podcasts extends Component {
  render() {
    const {podcasts, onClickPodcast} = this.props
    return <div>
        {
          podcasts.map((podcast) =>(
            <Link route='podcast'
                  params={{
                    slug:slug(podcast.title),
                    id: podcast.title,
                    slugChannel: slug(podcast.channel.title), 
                    idChannel: podcast.channel.id                    
                  }}
                  className={css.podcast}
                  key={podcast.id}
                  onClick={event => onClickPodcast(event, podcast)}
            >
              <a>
                <h3>{ podcast.title }</h3>
                <div className={css.meta}>
                  { Math.ceil(podcast.duration / 60) } minutes
                </div>
              </a>
            </Link>
          ))
        }
      </div>
  }
}
