import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import CartItems from '../CartItems';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review({paymentDetails,addressDetails}:any) {

    const reduxState:any = useSelector((state: RootState) => state);
  let Items = Object.values(reduxState.cart.orders);

  let totalPrice: any = Items.reduce(
    (acc: any, current: any) => acc + current.price * current.quantity,
    0
  );
  

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
      {Items.map((item: any) => {
        return (
         <CartItems item={item}/>
        );
      })}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          ₹{totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>Name : <b>{addressDetails.name}</b> </Typography>
          <Typography gutterBottom>Address : <b>{addressDetails.address}</b> </Typography>
          <Typography gutterBottom>City : <b>{addressDetails.city} , {addressDetails.state}</b> </Typography>
          <Typography gutterBottom>Pincode: <b>{addressDetails.pincode}</b> </Typography>
          <Typography gutterBottom>Mobile : <b>{addressDetails.mobile}</b> </Typography>


        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            
                <Grid item xs={12}>
                  <Typography gutterBottom>Name on Card : <b>{paymentDetails.cardHolderName}</b> </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Card Number : <b>{paymentDetails.cardNo}</b> </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Expiry : <b>{paymentDetails.expiry}</b> </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>CVV : <b>{paymentDetails.cvv}</b> </Typography>
                </Grid>
         
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}