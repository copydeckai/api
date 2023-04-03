"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppLayout_1 = __importDefault(require("@components/AppLayout"));
const EditorLayout_1 = __importDefault(require("@components/EditorLayout"));
require("@copydeck/baseStyles/dark.css");
require("@copydeck/baseStyles/main.css");
require("@copydeck/baseStyles/style.css");
// import { useFetch } from "@copydeck/hooks/makeRequest";
const useAppState_1 = __importDefault(require("@copydeck/hooks/useAppState"));
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const client_1 = require("react-dom/client");
const react_error_boundary_1 = require("react-error-boundary");
const react_gtm_module_1 = __importDefault(require("react-gtm-module"));
const react_router_dom_1 = require("react-router-dom");
// import { SearchContextProvider } from "./context/searchContext";
const NotFound_1 = __importDefault(require("./NotFound"));
const auth_1 = __importDefault(require("./auth"));
const ErrorPage_1 = __importDefault(require("./components/ErrorPage"));
const ProtectedRoute_1 = __importDefault(require("./components/ProtectedRoute"));
// import SectionRoute from "./components/SectionRoute";
const WindowTitle_1 = require("./components/WindowTitle");
const config_1 = require("./config");
const AppState_1 = __importDefault(require("./containers/AppState"));
const authContext_1 = require("./contexts/authContext");
const searchContext_1 = require("./contexts/searchContext");
const Home_1 = __importDefault(require("./pages/Home"));
const Settings_1 = __importDefault(require("./pages/Settings"));
const Write_1 = __importDefault(require("./pages/Write"));
const WriteUpdate_1 = __importDefault(require("./pages/Write/views/WriteUpdate"));
const errorTracking_1 = __importDefault(require("./services/errorTracking"));
const urls_1 = require("./urls");
// import serviceWorker from "./sw";
if (config_1.GTM_ID) {
    react_gtm_module_1.default.initialize({ gtmId: config_1.GTM_ID });
}
errorTracking_1.default.init();
const App = () => (<react_router_dom_1.BrowserRouter basename={config_1.APP_MOUNT_URI}>
    <antd_1.ConfigProvider theme={{
        token: {
            colorPrimary: '#e95402'
        }
    }}>
      <AppState_1.default>
        <authContext_1.AuthContextProvider>
          <searchContext_1.SearchContextProvider>
            <AppRoutes />
          </searchContext_1.SearchContextProvider>
        </authContext_1.AuthContextProvider>
      </AppState_1.default>
    </antd_1.ConfigProvider>
  </react_router_dom_1.BrowserRouter>);
const AppRoutes = () => {
    const { fetchSearchResults, dispatch } = (0, searchContext_1.useSearch)();
    const { user } = (0, authContext_1.useAuth)();
    const [, dispatchAppState] = (0, useAppState_1.default)();
    const [showPlanType, setShowPlanType] = (0, react_1.useState)(false);
    const toggleShowPlanType = () => {
        setShowPlanType(!showPlanType);
    };
    const getCurrentURL = window.location.pathname;
    const myErrorHandler = (error, _info) => {
        // Do something with the error
        // E.g. log to an error logging client here
        const errorId = errorTracking_1.default.captureException(error);
        dispatchAppState({
            payload: {
                error: 'unhandled',
                errorId
            },
            type: 'displayError'
        });
    };
    const ErrorPageComponent = () => <ErrorPage_1.default />;
    const fetchSearch = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
        dispatch({ type: 'newSearch' });
        try {
            yield fetchSearchResults(searchQuery).then(response => {
                const { data: { results } } = response;
                // const filteredResults = results.filter(result => result.media_type !== 'person');
                // setSearchResult(results);
                dispatch({ type: 'searchSuccess', payload: results });
            });
        }
        catch (err) {
            // errorTracker.captureException(err);
            dispatch({ type: 'actionFailure', payload: err.message });
            return [];
        }
        return [];
    });
    return (<>
      <WindowTitle_1.WindowTitle title="Dashboard"/>
      <react_error_boundary_1.ErrorBoundary FallbackComponent={ErrorPageComponent} onError={myErrorHandler}>
        {user ? (<react_router_dom_1.Routes>
            <react_router_dom_1.Route element={<AppLayout_1.default showPlanType={showPlanType} toggleShowPlanType={toggleShowPlanType} fetchSearch={fetchSearch} currentUrl={getCurrentURL}/>}>
              <react_router_dom_1.Route path={urls_1.homePageUrl} element={<ProtectedRoute_1.default />}>
                <react_router_dom_1.Route index element={<Home_1.default />}/>
                <react_router_dom_1.Route path={urls_1.accountPageUrl} element={<Settings_1.default />}/>
              </react_router_dom_1.Route>
            </react_router_dom_1.Route>
            <react_router_dom_1.Route element={<EditorLayout_1.default showPlanType={showPlanType} toggleShowPlanType={toggleShowPlanType} currentUrl={getCurrentURL}/>}>
              <react_router_dom_1.Route path={urls_1.writingSection} element={<ProtectedRoute_1.default />}>
                <react_router_dom_1.Route index element={<Write_1.default toggleShowPlanType={toggleShowPlanType}/>}/>
                <react_router_dom_1.Route path={urls_1.updateWritingUrl} element={<WriteUpdate_1.default toggleShowPlanType={toggleShowPlanType}/>}/>
              </react_router_dom_1.Route>
            </react_router_dom_1.Route>
            <react_router_dom_1.Route path="*" element={<NotFound_1.default />}/>
          </react_router_dom_1.Routes>) : (<auth_1.default />)}
      </react_error_boundary_1.ErrorBoundary>
    </>);
};
const container = document.getElementById('root');
const root = (0, client_1.createRoot)(container);
root.render(<App />);
// serviceWorker();
