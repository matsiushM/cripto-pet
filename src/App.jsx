import {Layout} from 'antd';
import AppHeader from "./cpmponents/layout/AppHeader.jsx";
import AppSider from "./cpmponents/layout/AppSider.jsx";
import AppContent from "./cpmponents/layout/AppContent.jsx";

export default function App() {
    return (
        <Layout>
            <AppHeader/>
            <Layout>
                <AppSider/>
                <AppContent/>
            </Layout>
        </Layout>
    )
}
