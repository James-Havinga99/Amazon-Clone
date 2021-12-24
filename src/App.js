import "./App.css";
import Header from "./header/Header";
import Home from "./home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./checkout/Checkout";
import Login from "./login/Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./data/StateProvider";
import Payment from "./payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./orders/Orders";

const promise = loadStripe(
	"pk_test_51In46RJaLsVCuViTlTlwc7mo5UGLLKrxrJlS3sGhvPIikBCmekakBCJUIMp2zC4zIIbqSh9q37qrSsEl0YQtpK2p00wRV5ysgC"
);

function App() {
	const [{}, dispatch] = useStateValue();
	useEffect(() => {
		//will only run once when the app component loads
		auth.onAuthStateChanged((authUser) => {
			console.log("The user is >>>", authUser);
			if (authUser) {
				// the user just logged in or user was logged in
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				// the user is logged out
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);
	return (
		<Router>
			<div className='app'>
				<Switch>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/orders'>
						<Header />
						<Orders />
					</Route>
					<Route path='/checkout'>
						<Header />
						<Checkout />
					</Route>
					<Route path='/payment'>
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					<Route path='/'>
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
