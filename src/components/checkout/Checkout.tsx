import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useState } from 'react';
import axiosClient from '../../apiService/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { emptyCart } from '../../redux/slices/cartSlice';
import jwt_decode from 'jwt-decode';
import Loader from '../Loader';
import {NavLink} from "react-router-dom"
import { toast } from 'react-toastify';
 
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review order'];

function getStepContent(step: number,setAddressDetails:any,addressDetails:any,setPaymentDetails:any,paymentDetails:any) {
  switch (step) {
    case 0:
      return <AddressForm setAddressDetails={setAddressDetails} addressDetails={addressDetails} />;
    case 1:
      return <PaymentForm setPaymentDetails={setPaymentDetails} paymentDetails={paymentDetails} />;
    case 2:
      return <Review paymentDetails={paymentDetails} addressDetails={addressDetails} />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [addressDetails , setAddressDetails] = useState({})
  const [paymentDetails , setPaymentDetails] = useState({})
  const [loader,setLoader] = useState(false)

  const dispatch = useDispatch()

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const reduxState:any = useSelector((state: RootState) => state);
  let Items = Object.values(reduxState.cart.orders);

  let user:any =  localStorage.getItem("token") && jwt_decode(localStorage.getItem("token") as string);


  let totalPrice: any = Items.reduce(
    (acc: any, current: any) => acc + current.price * current.quantity,
    0
  );

  const handleOrder = () => {
    setLoader(true)
    axiosClient.post("/shop/add-order", {
      products: Items.map((item:any)=>({...item, orderStatus: "pending"})),
      totalPrice: totalPrice,
      user:{name:user?.name,addressDetails:addressDetails,userId:user?._id,paymentDetails:paymentDetails}
      
    }).then(response => {
      if(response.status !== 200){
        throw new Error()
      }
        handleNext()
      console.log(response)
      setLoader(false)
      dispatch(emptyCart({}))
      toast.success("Order Placed Successfully")
    }).catch((err)=>{
      setLoader(false)
      console.log(err)
      toast.error("something went wrong! Make sure you added all the details")
    })
   
  };
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
     
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel style={{marginLeft:-6}}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
              <NavLink to="/home">Go to Home</NavLink>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep,setAddressDetails,addressDetails,setPaymentDetails,paymentDetails)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                {activeStep === steps.length - 1 ? 
            <Button
            variant="contained"
            onClick={handleOrder}
            sx={{ mt: 3, ml: 1 }}
          >
            {/* {activeStep === steps.length - 1 ? 'Place order' : 'Next'} */}
            Place order
          </Button>    
            :
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {/* {activeStep === steps.length - 1 ? 'Place order' : 'Next'} */}
                  Next
                </Button>
}
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
        {loader && <Loader/>}
      </Container>
    </ThemeProvider>
  );
}