import React from 'react';
import chip from '../images/files_1050346_1023544_chip-8feb50fbaf1103ec7e20e39eb13c98fa-3dcbaa.png';
import visa from '../images/files_1050346_1023544_visa_01-0a31cd6ab1ed6e52a0f65646ae4b0070-eeb4f4.png';
import master from '../images/files_1050346_1023544_mastercard-eb9215199829ef5e3ad671b7b3289480-ce80c8.png';
import discover from '../images/files_1050346_1023544_discovercard-166021f728ac0d4cc1bdf8a5d7def67e-3ea92c.png';



class AddEditCard extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            id: "",
            errorEX: "",            
            errorCN: "",
            name: "",
            firstNum: "",
            firstFour: "",
            secondFour: "",
            thirdFour: "",
            lastFour: "",
            expiresOn: "",
            edit: 0
        }
        this.handleInput=this.handleInput.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        let numberOfCards = localStorage.getItem('numberOfCards');
        if(numberOfCards === null)
        {
            localStorage.setItem('numberOfCards','0');
        }
        // const id = this.props.match.params.id
        // console.log(id); ne radi :(
        let path = window.location.pathname;
        let pom= "";
        let id = "";
        if(path !== '/cards/add')
        {
            pom = path.substring(7);
            id = pom.substring(0,pom.length-5);
        }
        if(id !== "")
        {
            let card = JSON.parse(localStorage.getItem(id));
            this.setState({
                id: card.id,
                name: card.name,
                firstFour : card.first,
                secondFour: card.second,
                thirdFour: card.third,
                lastFour: card.last,
                expiresOn: card.expiresOn,
                firstNum: card.first[0],
                edit : 1
            })
        }
    }
    //dodavanje u state
    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        if(name === 'firstFour')
        {
            let digit = parseInt(value[0]);
            this.setState({firstNum: digit.toString()})
            if(digit < 4 || digit > 6)
            {
                let error = "Wrong card number!";
                this.setState({errorCN: error});
                return;
            }
            else
            {
                this.setState({errorCN: ""});
            }
        }

        if(name === 'expiresOn' && value.length === 5)
        {
            let dateMonth = new Date().getMonth() + 1;
            let dateYear = new Date().getFullYear();
            let userMonth = parseInt(value.substring(0,2));
            let userYear = parseInt(value.substring(3,5));
            if( userMonth > 12 || dateYear > (userYear + 2000) 
                || (dateYear === (userYear + 2000) && dateMonth >= userMonth))
            {
                let error = "Wrong date!";
                this.setState({errorEX: error, expiresOn: ""});
            }
            else
            {
                this.setState({errorEX: ""});
            }
        }

        this.setState(
          prevState => {
            return {
              ...prevState,
              [name]: value
            };
          }
        );
    }

    //provere i submit
    handleSubmit()
    {
        let firstLength = this.state.firstFour.length;
        let secondLength =this.state.secondFour.length;
        let thirdLength = this.state.thirdFour.length;
        let lastLength =this.state.lastFour.length;
        if(firstLength !== 4 
            || secondLength !== 4 
            || thirdLength !== 4 
            || lastLength !== 4 
            || this.state.errorCN !== "")
        {
            this.setState({errorCN: "Wrong card number!"});
        }
        else
        {
            this.setState({errorCN: ""});
            if(this.state.expiresOn.length !== 5 || this.state.errorEX!=="" )
            {
                this.setState({errorEX: "Wrong date!"});
            }
            else
            {
                this.setState({errorEX: ""});
                if(this.state.name !==""){
                    let id = "";
                    if(this.state.edit === 1)
                    {
                        localStorage.removeItem(this.state.id);
                        id = this.state.id;
                    }
                    else
                    {
                        id = parseInt(localStorage.getItem('numberOfCards'));
                        localStorage.setItem('numberOfCards',id+1);
                    }
                    let data = {id: id,name : this.state.name, first: this.state.firstFour, second: this.state.secondFour,third:this.state.thirdFour , last: this.state.lastFour, expiresOn: this.state.expiresOn}
                    localStorage.setItem(id.toString(),JSON.stringify(data));
                    window.location.href='/cards';
                }
            }
        }
    }

    render(){
        let card = "";
        let firstNum = this.state.firstNum;
        console.log(firstNum);
        if(firstNum === '6')
            card=discover;
        else if(firstNum === '5')
            card=master;
        else if(firstNum === '4')
            card=visa;
        return(
            <div >
                <div style={{textAlign: 'center'}}>
                    <h1>{this.state.edit ? 'Edit' : 'Add'}</h1>
                </div>
                <div className="card">
                    {card ? <img src={card} style={{ width:'70px', float: 'right', marginRight:'5%', marginTop:'5%' }} alt='Visa'/> : null}
                    <img src={chip} style={{ width:'30px', marginTop: '10%', marginLeft: '7%'}} alt='Chip'/> 
                    <br />
                    <div style={{marginLeft: '5%'}}  >
                        <span onClick={() => document.getElementById('first').focus()}><input  className='CardNumbers' type='text' disabled value={this.state.firstFour} /></span>
                        <span onClick={() => document.getElementById('second').focus()}><input className='CardNumbers' type='text' disabled value={this.state.secondFour} /></span>
                        <span onClick={() => document.getElementById('third').focus()}><input className='CardNumbers' type='text' disabled value={this.state.thirdFour}/></span>
                        <span onClick={() => document.getElementById('last').focus()}><input className='CardNumbers' type='text' disabled value={this.state.lastFour} /></span>
                    </div>
                    <div>
                        <span onClick={() => document.getElementById('name').focus()}><input className='CardName' type='text' disabled value={this.state.name} /></span>
                        <span onClick={() => document.getElementById('expiresOn').focus()}><input className='ExpiresOn' type='text' disabled value={this.state.expiresOn} /></span>
                    </div>
                </div>
                <div className="content">
                <form>
                        <label>Name</label>
                        <br />
                        <input id='name' className='specialInput' type='text' name='name' value={this.state.name} onChange={this.handleInput}/>
                        <br />
                        <br />
                        <label>Card Number</label>
                        <br />
                        <div>
                            <input id='first' className='CNumber' type='number' name='firstFour' value={this.state.firstFour} onChange={this.handleInput} />
                            <input id='second' className='CNumber' type='number' name='secondFour'  value={this.state.secondFour} onChange={this.handleInput}/>
                            <input id='third' className='CNumber' type='number' name='thirdFour'  value={this.state.thirdFour} onChange={this.handleInput}/>
                            <input id='last' className='CNumber' type='number' name='lastFour'  value={this.state.lastFour} onChange={this.handleInput}/>
                        </div>
                        <span>{this.state.errorCN}</span>
                        <br />
                        <label>Expires on</label>
                        <br />
                        <input id='expiresOn' className='specialInput' type='text' name='expiresOn' value={this.state.expiresOn} onChange={this.handleInput}/>
                        <br />
                        <span>{this.state.errorEX}</span>
                        <br />
                        <input className='button' type='button' value='Save' onClick={this.handleSubmit}  />
                    </form>
                </div>
            </div>
        )
    }
}

export default AddEditCard;