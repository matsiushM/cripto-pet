import {Layout, Spin} from "antd";
import AppHeader from "./AppHeader.jsx";
import AppSider from "./AppSider.jsx";
import AppContent from "./AppContent.jsx";
import {useContext} from "react";
import CryptoContext from "../../context/cryptoContext.jsx";

const AppLayout = () => {
    const {loading} = useContext(CryptoContext)

    if (loading) {
        return <Spin fullscreen/>;
    }

    return (
    <Layout>
        <AppHeader/>
        <Layout>
            <AppSider/>
            <AppContent/>
        </Layout>
    </Layout>
    );
}

export default AppLayout;