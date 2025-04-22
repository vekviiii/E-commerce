import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";

const productCard = ({ product }) => {
  const checkoutHandler = async (price) => {
    const { data:keyData } = await axios.get(`/api/getKey`)
    const { data:orderData } = await axios.post(`/api/payment`, { price });

    const { key } = keyData
    const { order } = orderData

    // Open Razorpay Checkout
    const options = {
      key,
      amount: price,
      currency: 'INR',
      name: 'E-Commerce',
      description: 'Test Transaction',
      order_id: order.id,
      callback_url: '/api/paymentVerification',
      prefill: {
        name: 'Vekvi Kumar',
        email: 'vekvi.kumar@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#F37254'
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <Card sx={{ width: 220, height: "100%" }}>
      <CardMedia
        component={"img"}
        height="160"
        image={"https://picsum.photos/400"}
        alt={product.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          noWrap
          textOverflow={"ellipsis"}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" gutterBottom color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          ₹ {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          sx={{ flexGrow: 1, bgcolor: "green" }}
          onClick={() => checkoutHandler(product.price)}
        >
          Buy
        </Button>
      </CardActions>
    </Card>
  );
};

export default productCard;
