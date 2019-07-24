import React from 'react';
import Axios from 'axios';




class DayMealsRecomm extends React.Component {
  constructor(props){
    super(props); 
    this.state={
      label:"",
      url: "",
      image: ""

    } 

  }
componentDidMount(){
  Axios.post('/api/recipesearch').then(result=>{
    let label = result.data.hits[0].recipe.label
    let image = result.data.hits[0].recipe.image
    let url = result.data.hits[0].recipe.url
    console.log()

    this.setState({
      label,
      image,
      url
    })
    console.log(result)
  })
}
  


  render(){
    var content =[<div>hello</div>,<div>mike</div>]
    return( 
      <>
      <h2>{this.state.label}</h2>
      <img src={this.state.image} alt=""/>
      <a href={this.state.url}></a>
      {content}
      </>

    )
  }
}




export default DayMealsRecomm;