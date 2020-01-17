import React, { Component } from 'react'

 class PodcastPlayer extends Component {
  render() {
    return (
      <div className={css.modal}>
        <div className={clip}>
          <picture>
            <div style={{ backgroundImage: `url(${clip.urls.image || clip.channel.urls.logo_image.original})` }} />
          </picture>
        </div>
        <div className={css.player}>
          <h3>{ clip.title }</h3>
          <h6>{ clip.channel.title }</h6>
          <audio controls autoPlay={true}>
            <source src={clip.urls.high_mp3} type='audio/mpeg' />
          </audio>
        </div>
      </div>
    )
  }
}
export default PodcastPlayer
