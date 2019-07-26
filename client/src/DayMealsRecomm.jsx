import React from 'react';
import axios from 'axios';


class DayMealsRecomm extends React.Component {

  constructor(props){
    super(props); 
    this.state={
      label:"",
      url: "",
      image: "",
      result: [],
      
    } 
  }
  componentDidMount(){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.post('/api/recipesearch').then(result=>{
      let label = result.data.hits[0].recipe.label
      let image = result.data.hits[0].recipe.image
      let url = result.data.hits[0].recipe.url
      console.log(result)
      
      this.setState({
        label,
        image,
        url,
        result: result.data.hits
      })
      console.log(result)
    })
  }
  

  render(){
  var arr =this.state.result;
  var display=[];
  for(var i=0; i<arr.length;i++){
      display.push(
        <div className ='meal'>
          <a href={arr[i].recipe.url} target= '_blank' className='recipe' rel="noopener noreferrer">{arr[i].recipe.label}<img src={arr[i].recipe.image} alt=" food image" className='recipe'/></a>
          
        </div>
      )
    }
    return( 
      <div className='mealRecomendations'>
        {display}
      </div>
    )
  }
}


export default DayMealsRecomm;