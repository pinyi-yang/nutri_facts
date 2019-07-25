import React from 'react';
import axios from 'axios';
import ProfileBar from './ProfileBar';
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
       currentdate: Number,
       enddate: Number
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
    axios.post(`/user/${this.props.user._id}`, {
      currentdate: this.state.currentdate,
      enddate: this.state.enddate
    }).then(res => {
      if (res.data.type === 'error') {
        this.setState({
          currentdate: '',
          enddate: '',
        })
      } 
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
            <input type="submit"/>

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
          <Link to='/'>Home</Link>
        </div>
      </div>
    )
  }
}



export default Dates;