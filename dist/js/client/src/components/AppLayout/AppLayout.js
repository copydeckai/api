"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import logo from "@assets/images/logo.svg";
const useAppState_1 = __importDefault(require("@copydeck/hooks/useAppState"));
const react_query_1 = require("@tanstack/react-query");
const react_1 = __importDefault(require("react"));
// import { Toaster } from 'react-hot-toast';
// import SVG from "react-inlinesvg";
const react_router_dom_1 = require("react-router-dom");
const ErrorPage_1 = __importDefault(require("../ErrorPage"));
const PlanType_1 = __importDefault(require("../PlanType"));
const Sidebar_1 = __importDefault(require("../Sidebar"));
const Topbar_1 = __importDefault(require("../Topbar"));
// import WriterSidebar from '../WriterSidebar';
require("./content.css");
const AppLayout = ({ toggleShowPlanType, currentUrl, showPlanType, fetchSearch }) => {
    const queryClient = new react_query_1.QueryClient();
    const [appState] = (0, useAppState_1.default)();
    react_1.default.useEffect(() => {
        document.body.classList.remove('collapsed-active');
    }, []);
    return (<react_query_1.QueryClientProvider client={queryClient}>
      {/* <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            className: 'toast-toast'
          }}
        /> */}
      <Sidebar_1.default />
      <main className="hp-bg-color-dark-90 d-flex min-vh-100">
        <div className="hp-main-layout">
          {showPlanType ? (<PlanType_1.default toggleShowPlanType={toggleShowPlanType}/>) : (<>
              {currentUrl !== '/write' && (<Topbar_1.default currentUrl={currentUrl} fetchSearch={fetchSearch}/>)}
              {appState.error ? (appState.error.type === 'unhandled' && (<ErrorPage_1.default id={appState.error.id}/>)) : (<react_router_dom_1.Outlet />)}
            </>)}
          {/* <div className="my-16 px-24 col-12">
            <p className="hp-p1-body text-center hp-text-color-black-60 mb-8">© 2023 Copydeck Inc.</p>
        </div> */}
        </div>
      </main>
    </react_query_1.QueryClientProvider>);
};
AppLayout.displayName = 'AppLayout';
exports.default = AppLayout;
