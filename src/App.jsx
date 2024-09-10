import {CryptoContextProvider} from "./context/cryptoContext.jsx";
import AppLayout from "./cpmponents/layout/AppLayout.jsx";

export default function App() {
    return (
        <CryptoContextProvider>
            <AppLayout/>
        </CryptoContextProvider>
    )
}
