
import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import {
    NavLink
   } from 'reactstrap';

class Payments extends Component {

    render () {
        return (
            // 500 is in cents
            <StripeCheckout
                name="SurveyFeed"
                description="$5 for five surveys"
                amount={500}
                // token takes a callback function, that receacive the token sent by stripe.
                token={token => this.props.handleStripeToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            >
                <NavLink>Add Credits</NavLink>
            </StripeCheckout>  
        );
    }
}



export default connect(
    null,
    actions // selectSong is the actionCreater we imported
  )(Payments);