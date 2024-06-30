import  { useCallback, useEffect, useState } from 'react'


import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import { CryptoElements, OnrampElement } from '@/components/StripeFiat';
import { loadStripeOnramp } from '@stripe/crypto';
import Navbar from '@/components/Navbar';
import SDFGeometry from '@/components/SDFGeometry';

// Make sure to call loadStripeOnramp outside of a component’s render to avoid
// recreating the StripeOnramp object on every render.
// This is your test publishable API key.
const stripeOnrampPromise = loadStripeOnramp(
  "pk_test_51Hjzj6H0FO59ioJ3X5qXYwDqGuRsSCWD8bMYJGthOw6Xi24DzlMBLIjFVZfLpeoPuk2SqB7uYZN0Lymci50P9P1400eUytv3lz"
);


function Home() {
    const [clientSecret, setClientSecret] = useState("");
    const [message, setMessage] = useState("");
  
    useEffect(() => {
      // Fetches an onramp session and captures the client secret
      fetch(
        "http://localhost:8080/create-onramp-session",
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transaction_details: {
            wallet_address: "0xf8b414eFD8CB72097edAb449CeAd5dB10Fc12d99",
            destination_currency: "usdc",
            destination_currencies: ["usdc", "eth"],
            destination_exchange_amount: "13.37",
            destination_network: "ethereum",
          },
          customer_information: {
            email: "john@doe.com",
            first_name: "John",
            last_name: "Doe",
            dob: {
              day: 4,
              month: 4,
              year: 1990,
            },
          }
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);
  
  
    const onChange = useCallback(({ session }: { session: { status: string } }) => {
      console.log("session", session);
      setMessage(`OnrampSession is now in ${session.status} state.`);
    }, []);
  
    console.log("clientSecret", clientSecret);


    return (
 
      <section className='grow flex flex-col justify-center items-center'>
      <SDFGeometry />
        <h1 className='text-xl font-orbitron font-semibold'>Tokenizing one event at a time</h1>
      </section>
  )
}

export default Home