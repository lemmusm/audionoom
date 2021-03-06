import React, { Component } from 'react'
import 'isomorphic-fetch'
import Link from 'next/link'
import Error from './_error'

import Layout from '../components/Layout';
import Podcasts from '../components/Podcasts'
import PodcastsPlayer from '../components/PodcastPlayer'

export default class channel extends Component {
  constructor(props) {
    super(props);
    this.state = {openPodcast:null};
  }
  static async getInitialProps({query, res}) {
    let idChannel = query.id
    try{
      let [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${idChannel}`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
      ])
      if( reqChannel.status >= 400 ) {
        res.statusCode = reqChannel.status
        return { channel: null, audioClips: null, series: null, statusCode: reqChannel.status }
      }
      let dataChannel = await reqChannel.json()
      let channel = dataChannel.body.channel;

      let dataAudios = await reqAudios.json()
      let audioClips = dataAudios.body.audio_clips

      let dataSeries = await reqSeries.json()
      let series = dataSeries.body.channels
      return { channel, audioClips, series, statusCode: 200 }
    }
    catch(e) {
      return { channel: null, audioClips: null, series: null, statusCode: 503 }
    }
 }
  
 openPodcast= (event, podcast)=>{
  event.preventDefault();
  this.setState({
    openPodcast: podcast
  })
 }
 onClosePodcast = (event) =>{
  event.preventDefault();
  this.setState({
    openPodcast: null
  })
 }
  render() {    
    const  {channel, audioClips, series, statusCode} = this.props
    const {openPodcast} = this.state;
    if( statusCode !== 200 ) {
      return <Error statusCode={ statusCode } />
    }

    return (
      <Layout  title={channel.title}>
        
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
       
        {openPodcast && <div  className="modal">
           <PodcastsPlayer 
            clip={openPodcast}
            onClose= {this.onClosePodcast}
           />
        </div>}
      <h1>{ channel.title }</h1>

      { series.length > 0 &&
        <div>
          <h2>Series</h2>
          <div className="channels">
            { series.map((serie) => (
              <Link href={`/channel?id=${ serie.id }`} key={serie.id}>
                <a className="channel">
                  <img src={ serie.urls.logo_image.original } alt=""/>
                  <h2>{ serie.title }</h2>
                </a>
              </Link>
            ))}
          </div>
        </div>
      }

      <h2>Ultimos Podcasts</h2>
      <Podcasts
        podcasts={audioClips}
        onClickPodcast={this.openPodcast}
      />
        <style jsx>
        {`
        .modal{
          position: fixed;
          top:0;
          left:0;
          right:0;
          bottom:0;
          z-index:9999;
        }
          .channels {
            display: grid;
            grid-gap: 15px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
          h1{
            font-weight:600px;
            padding:15px;
          }
          a.channel {
            display: block;
            margin-bottom: 0.5em;
            color: #333;
            text-decoration: none;
          }
          .channel img {
            border-radius: 3px;
            box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
            width: 100%;
          }
          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
        `}
      </style>
      </Layout>
    )
  }
}
