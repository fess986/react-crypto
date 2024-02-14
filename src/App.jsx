
import CryptoContextProvider from "./context/context";
import AppLayout from "./Components/Layout/appLayout";

export default function App() {
	return (
		<CryptoContextProvider>
				<AppLayout />
		</CryptoContextProvider>
	);
}
