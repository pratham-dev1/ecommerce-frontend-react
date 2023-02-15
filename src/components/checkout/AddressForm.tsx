import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AddressForm({setAddressDetails,addressDetails}:any) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            value={addressDetails.firstName}
            autoComplete="given-name"
            variant="standard"
            onChange={(e)=>setAddressDetails({...addressDetails,name :e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line"
            fullWidth
            value={addressDetails.address}
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={(e)=>setAddressDetails({...addressDetails,address :e.target.value})}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            value={addressDetails.city}
            variant="standard"
            onChange={(e)=>setAddressDetails({...addressDetails,city :e.target.value})}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={addressDetails.state}
            onChange={(e)=>setAddressDetails({...addressDetails,state :e.target.value})}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="mobile"
            name="mobile"
            label="Mobile number"
            fullWidth
            value={addressDetails.mobile}
            variant="standard"
            onChange={(e)=>setAddressDetails({...addressDetails,mobile :e.target.value})}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            value={addressDetails.pincode}
            variant="standard"
            onChange={(e)=>setAddressDetails({...addressDetails,pincode :e.target.value})}

          />
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}