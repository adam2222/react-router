import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import Promise from 'bluebird';

class Artist extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      artist: {},
      albums: [],
      songs: []
      }
  }
  componentDidMount(){
    let artist = axios.get(`/api/artists/${this.props.params.artistId}`)
    let albums = axios.get(`/api/artists/${this.props.params.artistId}/albums`)
    let songs = axios.get(`/api/artists/${this.props.params.artistId}/songs`)

    Promise.all([artist, albums, songs])
      .spread(function(artist, albums, songs){
        this.setState({
          artist: artist.data,
          albums: albums.data,
          songs: songs.data
        })
      });
  }

  render() {
    let artist = this.state.artist;
    let albums = this.state.albums;
    let songs = this.state.songs;

    return (
      <div>
        <h3>{artist.name}</h3>
        <h4>{artist.albums}</h4>
        <h4>{artist.songs}</h4>
      </div>
    )
  }
}

export default Artist;
