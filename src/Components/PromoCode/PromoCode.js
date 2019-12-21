import React, { Component } from 'react';
import { Button, Collapse, Form, FormGroup, FormControl, Media, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {handleChange} from '../../actions/promoCodeActions'
  class PromoCode extends Component{
    constructor(props){
        super(props);
        this.state={
            open:false
            
        };
    }
    handleChange = e => {
        this.props.handleChange(e);
    };
    render() {
        return(
            <div>
                <Button
                    className="promo-code-button"
                    bsStyle="link"
                    
                    onClick={() => this.setState(  {open: !this.state.open})   }
                >
                {this.state.open === false? `Apply` : `Hide`} Promocode {this.state.open === false? `+` : `-`}
                </Button>
                <Collapse in={this.state.open}>
                    <div>
                        <div>
                            <Row className="show-grid">
                            <Col md={12}>
                                <Form>
                                    <Form.Group controlId="formInLineName">
                                        
                                        <Form.Control
                                        type="text"
                                        placeholder="Enter promocode"
                                        value={this.props.promoCode}
                                        onChange={this.handleChange}
                                        />
                                    </Form.Group>
                                    <Button
                                    blockbsStyle="success"
                                    className="btn-round"
                                    disabled={this.isDisabled}
                                    onClick={this.props.giveDiscount}
                                    >
                                     Apply       
                                    </Button>
                                </Form>
                            </Col>
                            </Row>
                        </div>
                    </div>
                </Collapse>
            </div>
        )
        
    }
}
const mapStateToProps = state => ({
    promoCode: state.promoCode.value

});
export default connect(mapStateToProps,{handleChange})(PromoCode);