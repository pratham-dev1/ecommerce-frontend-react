import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm({setPaymentDetails,paymentDetails}:any) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            value={paymentDetails.cardHolderName}
            autoComplete="cc-name"
            variant="standard"
            onChange={(e)=>setPaymentDetails({...paymentDetails,cardHolderName:e.target.value})}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            value={paymentDetails.cardNo}

            autoComplete="cc-number"
            variant="standard"
            onChange={(e)=>setPaymentDetails({...paymentDetails,cardNo:e.target.value})}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            value={paymentDetails.expiryDate}
            
            autoComplete="cc-exp"
            variant="standard"
            onChange={(e)=>setPaymentDetails({...paymentDetails,expiry:e.target.value})}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            value={paymentDetails.cvv}

            autoComplete="cc-csc"
            variant="standard"
            onChange={(e)=>setPaymentDetails({...paymentDetails,cvv:e.target.value})}

          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}