import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Subtotal from './Components/Subtotal/Subtotal';
import PickupSavings from './Components/PickupSavings/PickupSavings';
import TaxesFees from './Components/TaxesFees/TaxesFees';
import EstimatedTotal from './Components/EstimatedTotal/EstimatedTotal';
import ItemDetails from './Components/ItemDetails/ItemDetails';
import PromoCode from './Components/PromoCode/PromoCode'
import {connect} from 'react-redux';
import {handleChange } from './actions/promoCodeActions';
import './App.css';
import { render } from '@testing-library/react';
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      total: 100,
      PickupSavings:-3.85,
      taxes: 0,
      EstimatedTotal:0,
      DisablePromoButton: false
    };
    console.log("First Print:",this.state.total,this.state.PickupSavings);
    
  }
  componentDidMount = () => {
    this.setState(
      { taxes: (this.state.total + this.state.PickupSavings) * 0.0875 },
      function() {
        this.setState({
          EstimatedTotal: this.state.total + this.state.PickupSavings + this.state.taxes

        });
      }
      
    );
  };

giveDiscountHandler=() => {

  if(this.props.PromoCode === 'DISCOUNT'){
    console.log("if");
    this.setState({
      EstimatedTotal: this.state.EstimatedTotal*0.9
    },
    function() {
      this.setState({
        disablePromoButton:true
      })
    }
    );
  }
}

  render(){
    return (
      <div className= "outer-container"> 
        <Container className="purshase-card"> 
        <Subtotal price={this.state.total.toFixed(2)} />
        <PickupSavings price= {this.state.PickupSavings} />
        <TaxesFees taxes={this.state.taxes.toFixed(2)}/>
        <hr/>
        <EstimatedTotal price={this.state.EstimatedTotal.toFixed(2)}/>
        <ItemDetails price={this.state.EstimatedTotal.toFixed(2)} /> 
        <hr/>
        <PromoCode
        giveDiscount={ () => this.giveDiscountHandler()}
        isDisabled={this.state.disablePromoButton}
        />
        </Container>
      </div>
    );
  }
  
}
const mapStateToProps = state =>({

  PromoCode: state.promoCode.value
})

export default connect(mapStateToProps, {handleChange})(App);
