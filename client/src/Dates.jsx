import React from 'react';
import axios from 'axios';
import ProfileBar from './ProfileBar';
import Header from './Header';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { deflateRawSync } from 'zlib';


class Dates extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        goal: null,
        meals: [],
       currentdate: '',
       enddate: ''
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value 
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get(`/api/users/${this.props.user._id}/meals?start=${this.state.currentdate}&end=${this.state.enddate}`).then(res => {
      let {meals, goals, currentdate, enddate} = res.data;
      this.setState({
        meals,
        goal: goals[goals.length-1],
        currentdate,
        enddate
      })
    })
  }


  render() {
    var name = this.props.user ? this.props.user.name : '';
    return (
      <div className='main'>

        <ProfileBar 
                  user={name}
                  handNewMealSubmit={this.handNewMealSubmit}
                  handleAddMealClick={this.handleAddMealClick}
                  />
        <div className="dates">
          <form onSubmit={this.handleSubmit}>
            <div className="current">
              <input onChange={this.handleInputChange} type="date" name="currentdate" placeholder="Enter today's date.."/>
            </div>
            <div className ="end">
              <input onChange={this.handleInputChange} type="date" name="enddate" placeholder="Enter end point date..."/>
            </div>
            <input type="submit" value="submit"/>

          </form>
          <div className="dateoutput">
              <p>{this.state.currentdate} {this.state.enddate}</p>
            </div>
          <div className="imgbox">
            "this will generate picture"
          </div>

          <div className="graph1">
            "This will generate one graph"
          </div>
          <div className="graph2">
            "This will generate another graph"
          </div>
          <nav>
          <Link to='/'>Home</Link>
          <Link to='/summary'>Profile</Link>
          </nav>
        </div>
      </div>
    )
  }
}



export default Dates;