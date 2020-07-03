import React from 'react';
import './NotFound.css'
import { Link } from 'react-router-dom';
import Images from '../Images/Images';

export default class NotFound extends React.Component{
  render(){
    return <div className="outer">
            <div className="inner">
              <div className="text-center">
                <img src={Images.path.eraswap} alt="eraswap"/><br /><br />
              </div>
              <h1>Oops! seems you have to arrived to wrong place</h1>
              <Link to="/">Let's go back to Home</Link>
            </div>
          </div>;
  }
}