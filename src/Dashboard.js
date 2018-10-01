import React, { Component } from 'react';

import './App.css';
import firebase from 'firebase'


 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyA0POj_eHfNdpBqsEgRIslA5VR8_H4D9Jc",
    authDomain: "my-website-2f3a3.firebaseapp.com",
    databaseURL: "https://my-website-2f3a3.firebaseio.com",
    projectId: "my-website-2f3a3",
    storageBucket: "my-website-2f3a3.appspot.com",
    messagingSenderId: "755497710901"
  };
  firebase.initializeApp(config);

      
class Dashboard extends Component {
    constructor(props){
        super(props)
            this.state={
                PreviousDoners: { name: "",
                CNumber :"",
                city: "",
                BloodGroup: "",
                NumbOfBot : 0,
                id: 0,
                hospitalName : "",
                Status : "Click Here To Donate"},
                Doners:[],
            }
    }

componentWillMount(){
    let arr=[]
    let firebaseRef = firebase.database().ref('Blood-Bank/Donations')
    firebaseRef.on('value',snap=>{
    snap.forEach((Key)=>{
      let dataRef = firebaseRef.child(Key.ref.key).key
      let data = snap.child(dataRef).val()
      console.log(data)
      arr.push(data)
       this.setState({
        Doners :arr
      })
      console.log(this.state.Doners)
    })
  })

    }
    
handleDonation(){
    this.props.history.push("/donation")
}
handleStatus(index){
  
  console.log(this.state.Doners[index].Status)
  let updation = this.state.Doners[index].Status.set("thanks")
  console.log(this.state.Doners[index].Status)
  
    // console.log( newStatus)
    // firebase.database("Blood-Bank/Donations/"+index/"Status").set(newStatus).then(()=>{
    //   console.log("Submit Status")
    // })
    
}





render() 


     {
return (
    <div>
<div>
<nav className="navbar navbar-default">
<div className="container-fluid">
<div className="navbar-header">
 <a className="navbar-brand">Blood Bank Application</a>
</div>
<div>
<button className="btn btn-danger" onClick={this.handleDonation.bind(this)}>Donate your blood </button>
<div className="form-group">
<label  className="text-muted">Serach Blood Group: </label>
<select name="bloodGroup" placeholder="Blood Group" id="bloodGroup" className="form-control">
    <option id="select">Select</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
</select>
</div>

<button type="button" className="btn btn-danger">Search</button>
</div>
</div>
</nav>
</div>


{this.state.Doners.map((doner ,index)=>{
  return(
    <div key={index} className="doners">
<div className="fotter">
<div className="card text-center">
  <div className="card-header">
   <h2> {doner.name} </h2>
  </div>
  <div className="card-body">
    <h5 className="card-title">Group : <b> {doner.BloodGroup}</b></h5>
    <p className="card-text">Contect: <b> {doner.CNumber} </b></p>
    <p className="card-text"> City : <b>{doner.city} </b></p>
    <p className="card-text">Number of Bottles:<b> {doner.NumOfBot} </b></p>
    <button onClick={this.handleStatus.bind(this ,index )} className="btn btn-danger">{doner.Status} </button> <br/>
  </div>
  <div  className="button">
  <p className="card-text">  Hospital Name:  <b> {doner.hospitalName} </b> </p>
  </div>
</div>
</div>
</div>
  )
})}



</div>
 );
  }
}

export default Dashboard;
