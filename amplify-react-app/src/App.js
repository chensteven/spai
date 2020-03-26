import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import { API } from 'aws-amplify';

function App() {

  // create coins variable and set to empty array
  const [listings, updateListings] = useState([])
  const [profile, updateProfile] = useState([])

  // define function to all API
  async function fetchListings() {
    const data = await API.get('spaiapi', '/listings')
    updateListings(data.listings)
  }
  async function fetchProfile() {
    const data = await API.get('spaiapi2', '/profile')
    updateProfile(data.profile)
  }

  // call fetchCoins function when component loads
  useEffect(() => {
    fetchListings()
    fetchProfile()
  }, [])
  return (
    <div className="App">
      {
        listings.map((coin, index) => (
          Object.entries(coin)
            .map( ([key, value]) => <p><span>{key}</span><span>{value}</span></p>
          )
        ))
      }
      {
        Object.entries(profile)
        .map( ([key, value]) => <p><span>{key}</span><span>{value}</span></p>
        )
      }
    </div>
  );
}
//          <div key={index}>
//            <h2>{coin.name} - {coin.smart_location}</h2>
//            <h5>${coin.price}</h5>
//          </div>
export default App;
