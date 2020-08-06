import React from 'react';

class Meme extends React.Component {
    constructor(){
        super();
        this.state = {
            topText : "",
            bottomText : "",
            memeImg : "https://i.imgflip.com/1bhk.jpg",
            dataApi : []
        }
    }

  componentDidMount() {
      fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then( datum => {
          const {memes} = datum.data
          console.log(memes[0]);
          this.setState({
            dataApi : memes  
          })
        }
      )
  }



 texts = (eve) => {
     const {name,type,value} = eve.target;
     this.setState({
        [name] : value
     })
 }

 formSubmittion = (e) => {
     e.preventDefault();
     const randoimg = Math.floor(Math.random() * this.state.dataApi.length);
     const randommeme = this.state.dataApi[randoimg].url
     this.setState({
        memeImg : randommeme
     })
 }
  
    render(){
        return(
            <div className="memeRoot">
               <form onSubmit={this.formSubmittion} className="formSection" >
                <div className="flex">
                 <div className="divSections">
                   <label>Top Text</label>
                   <input type="text" name="topText" onChange={this.texts} />
                 </div>
                   
                 <div className="divSections">
                   <label>Bottom Text</label>
                   <input type="text" name="bottomText" onChange={this.texts} />
                 </div>
                 </div>
                   <br />
                   <button className="btn btn-info">Change Image</button>
               </form>

               <div className="meme">
                   <h4 className="top">{this.state.topText}</h4>
                   <img src={this.state.memeImg} />
                   <h4 className="bottom">{this.state.bottomText}</h4>
               </div>
            </div>
        )
    }
}


export default Meme;