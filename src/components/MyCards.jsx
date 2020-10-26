import React from 'react';
import chip from '../images/files_1050346_1023544_chip-8feb50fbaf1103ec7e20e39eb13c98fa-3dcbaa.png';
import visa from '../images/files_1050346_1023544_visa_01-0a31cd6ab1ed6e52a0f65646ae4b0070-eeb4f4.png';
import master from '../images/files_1050346_1023544_mastercard-eb9215199829ef5e3ad671b7b3289480-ce80c8.png';
import discover from '../images/files_1050346_1023544_discovercard-166021f728ac0d4cc1bdf8a5d7def67e-3ea92c.png';
import plus from '../images/plus3.jpg';
import { Link } from 'react-router-dom';

class MyCards extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            arrayOfCards : []
        }
    }
    componentDidMount()
    {
        let numberOfCards = localStorage.getItem('numberOfCards');
        let array = [];
        if(numberOfCards === null)
        {
            localStorage.setItem('numberOfCards','0');
        }
        else
        {
            for(var i =0; i< parseInt(numberOfCards) ; i++)
            {
                let card = localStorage.getItem(i.toString());
                array.push(JSON.parse(card));
            }
            this.setState({arrayOfCards : array});
        }
    }

    render()
    {
        return(
            <div>
                <div style={{textAlign: 'center'}}>
                <h1>My Cards</h1>
                </div>
            {this.state.arrayOfCards.map(item => {
                let card = "";
                let firstNum = item.first[0];
                if(firstNum === '6')
                    card=discover;
                else if(firstNum === '5')
                    card=master;
                else if(firstNum === '4')
                    card=visa;
                let link = `/cards/${item.id}/edit`;
                return(
                    <Link to={link}>
                    <div className="cardAdd">
                    <img alt='card' src={card} style={{ width:'70px', float: 'right', marginRight:'5%', marginTop:'5%' }} /> 
                    <img src={chip} style={{ width:'30px', marginTop: '10%', marginLeft: '7%'}} alt='Chip'/> 
                    <br />
                    <div style={{marginLeft: '5%'}}>
                        <input className='CardNumbers' type='text' disabled value={item.first} />
                        <input className='CardNumbers' type='text' disabled value={item.second} />
                        <input className='CardNumbers' type='text' disabled value={item.third} />
                        <input className='CardNumbers' type='text' disabled value={item.last} />
                    </div>
                    <div>
                        <input className='CardName' type='text' disabled value={item.name} />
                        <input className='ExpiresOn' type='text' disabled value={item.expiresOn} />
                    </div>
                    </div>
                    </Link>
                )
            })
            }
                <Link to='/cards/add'>
                    <div className="cardAdd" style={{borderStyle: 'dashed', borderColor:'black'}}>
                        <img alt='card' src = {plus}  style={{width: '30%', marginTop: '10%', marginLeft: '35%'}}/>
                    </div>
                </Link>
            </div>
            
        )
    }
}

export default MyCards;