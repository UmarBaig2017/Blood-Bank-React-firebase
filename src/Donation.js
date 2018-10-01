import React, { Component } from "react";
import firebase from 'firebase'
import './donation.css'
class Dashboard extends Component {
componentWillMount(){
    
    let firebaseRef = firebase.database().ref('Blood-Bank/id')
    firebaseRef.on('value',snap=>{
        
       let Id = snap.val()+1
       console.log(Id)
        this.setState({
            id :Id
        });
  })
}
    constructor(props) {
        super(props)
         this.state = {
            name: "",
            CNumber :"",
            city: "",
            BloodGroup: "",
            NumbOfBot : 0,
            id: 0,
            hospitalName : "",
            Status : "Click Here To Donate"
         }}
    handleName(e){
        this.setState({
            name : e.target.value
        })
    }
    HandleNum(e){
        
        this.setState({
            CNumber: e.target.value
        })
    }
    handlebloodGroup(e){
        this.setState({
           BloodGroup: e.target.value
        })
    }
    handleCity(e){
        this.setState({
            city: e.target.value
        })
    }
    handleBottles(e){
        this.setState({
           NumbOfBot: e.target.value
        })
    }
    handleHosptal(e){
        this.setState({
          hospitalName: e.target.value
        })
    }
    handleSubmit(){
       let ID = this.state.id
      console.log(this.state)
      let db =firebase.database()
      db.ref('Blood-Bank/Donations/'+ID).set(this.state).then((e)=>{
          firebase.database().ref('Blood-Bank/id').set(this.state.id)
          console.log("submitt")
          this.props.history.push("/thanks")
      })
    }
    render() {

        return (
            <div className="Container">
            <h1> Donation Form </h1>
              <div className="Donation-Form">
                <div className="Form-Header">
               <h1> Fill This Form </h1>
                </div>
                <div className="input-forms">
                <label>
                Name :  
                <input value={this.state.name} onChange={this.handleName.bind(this)} type="text"/>
                </label><br/>
                <label>
                Contect Number :  
                <input value={this.state.CNumber} placeholder="03001234567" onChange={this.HandleNum.bind(this)} type="text"/>
                </label><br/>
                <label>
                Hospital Name :  
                <input value={this.state.hospitalName}  onChange={this.handleHosptal.bind(this)} type="text"/>
                </label><br/>
                <select value={this.state.city}  onChange={this.handleCity.bind(this)} name="bloodGroup" placeholder="Blood Group" id="bloodGroup" className="form-control input-lg">
                <option id="select" >Select City Name</option>
                <option value="karachi">Karachi</option>
                <option value="Lahore"> Lahore </option>
                <option value="Peshawar"> Peshawar </option>
                <option value="Quetta"> Quetta </option>
                </select>
                <br/>
                 <div>

                 <select  value={this.state.BloodGroup}  onChange={this.handlebloodGroup.bind(this)} name="bloodGroup" placeholder="Blood Group" id="bloodGroup" className="form-control input-lg">
                 <option id="select" selected>Select Blood Group</option>
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
             <div className="form-group">
             Number of Bottles<br/>
             <input value={this.state.NumbOfBot}  onChange={this.handleBottles.bind(this)} type="number"/>
            </div>
             </div>
             <button className="btn btn-danger" onClick={this.handleSubmit.bind(this)}>Submit Information</button>
             </div>
            </div>
        )
    }
}

export default Dashboard;
