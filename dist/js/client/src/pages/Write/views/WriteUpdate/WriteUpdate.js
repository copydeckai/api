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
// import { API_URL } from "@copydeck/config";
// import axios from "axios";
const icons_1 = require("@ant-design/icons");
const Loader_1 = __importDefault(require("@components/Loader"));
const ThemeSwitch_1 = __importDefault(require("@copydeck/components/ThemeSwitch"));
const config_1 = require("@copydeck/config");
const authContext_1 = require("@copydeck/contexts/authContext");
const makeRequest_1 = require("@copydeck/hooks/makeRequest");
const openaiClient_1 = require("@copydeck/libs/openaiClient");
const useAutosizeTextArea_1 = __importDefault(require("@copydeck/utils/useAutosizeTextArea"));
// import { Button } from "@mantine/core";
// import GPTCompletion from "components/completion";
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
// import validator from 'validator';
const Editor_1 = __importDefault(require("../../components/Editor"));
const Sidebar_1 = __importDefault(require("../../components/Sidebar"));
const WriteUpdate = ({ toggleShowPlanType }) => {
    var _a, _b;
    const { user, updateUserAccount } = (0, authContext_1.useAuth)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { id } = (0, react_router_dom_1.useParams)();
    const { data } = (0, makeRequest_1.useFetch)(`/story/${id}`);
    const [errors, setErrors] = (0, react_1.useState)({});
    const [submitLoading, setSubmitLoading] = (0, react_1.useState)(false);
    const [, 
    // openaiRequest
    setOpenaiRequest] = (0, react_1.useState)(undefined);
    const [onChange, setOnChange] = (0, react_1.useState)(false);
    const [showShare, setShowShare] = (0, react_1.useState)(false);
    const dropRef = (0, react_1.useRef)(null);
    useOnClickOutside(dropRef, () => setShowShare(false));
    const [disabled, setDisabled] = (0, react_1.useState)(true);
    const [btnText, setBtnText] = (0, react_1.useState)('Saved');
    const [title, setTitle] = (0, react_1.useState)('');
    const [isPublic, setIsPublic] = (0, react_1.useState)(false);
    const [content, setContent] = (0, react_1.useState)('');
    const [credits, setCredits] = (0, react_1.useState)(0);
    const placeholder = 'Start writing here...';
    const [copySuccess, setCopySuccess] = react_1.default.useState(false);
    const [charCount, setCharCount] = (0, react_1.useState)(0);
    const [wordCount, setWordCount] = (0, react_1.useState)(0);
    const [maxTokens, setMaxTokens] = (0, react_1.useState)('150');
    const [prompt, setPrompt] = (0, react_1.useState)('');
    const titleTextAreaRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        setCredits(user.aiUsage.credits);
    }, [user]);
    (0, useAutosizeTextArea_1.default)(titleTextAreaRef.current, title);
    const [timer, setTimer] = (0, react_1.useState)(null);
    const saveOnChange = () => {
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            onSubmit();
        }, 2000);
        setTimer(newTimer);
    };
    (0, react_1.useEffect)(() => {
        var _a, _b, _c, _d, _e;
        setTitle((_a = data[0]) === null || _a === void 0 ? void 0 : _a.title);
        setContent((_b = data[0]) === null || _b === void 0 ? void 0 : _b.content);
        setIsPublic((_c = data[0]) === null || _c === void 0 ? void 0 : _c.isPublic);
        setWordCount((_d = data[0]) === null || _d === void 0 ? void 0 : _d.wordCount);
        setCharCount((_e = data[0]) === null || _e === void 0 ? void 0 : _e.charCount);
    }, [data]);
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setDisabled(false);
        setBtnText('Save');
    };
    const handleContentChange = plainText => {
        setContent(plainText);
        const words = plainText.split(' ');
        let wordCount = 0;
        words.forEach(word => {
            if (word.trim() !== '') {
                wordCount++;
            }
        });
        setDisabled(false);
        setBtnText('Save');
        setWordCount(wordCount);
        setCharCount(plainText.length);
        setOnChange(true);
    };
    (0, react_1.useEffect)(() => {
        if (onChange) {
            saveOnChange();
        }
    }, [content]);
    function generatePrompt() {
        const formTitlePrompt = `
      Take the title of the blog post below and generate a blog post. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.
  
      Title: ${title}
      `;
        const formContentPrompt = `${content}[insert]`;
        const promptPrefix = `Write me a detailed blog post on a random topic, but don't include the topic`;
        const inputPrompt = prompt !== '' ? prompt : promptPrefix;
        const titlePrompt = title !== '' ? formTitlePrompt : inputPrompt;
        const finalPrompt = content !== '' ? formContentPrompt : titlePrompt !== '' ? titlePrompt : inputPrompt;
        return {
            model: 'text-davinci-003',
            prompt: finalPrompt,
            max_tokens: parseInt(maxTokens, 10),
            top_p: 1,
            presence_penalty: 0,
            best_of: 1,
            // echo: true,
            // stream: true,
            frequency_penalty: 0,
            logprobs: 0,
            temperature: 0.7
        };
    }
    function updateAiCredit(count) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = {
                    aiUsage: {
                        credits: credits - 1,
                        tokensUsed: +count
                    }
                };
                yield updateUserAccount(payload);
                // console.log("Response", response);
                setCredits(credits - 1);
            }
            catch (err) {
                antd_1.message.error(err.message);
                return [];
            }
        });
    }
    const checkPrompt = () => __awaiter(void 0, void 0, void 0, function* () {
        // e.preventDefault();
        setLoading(true);
        if (credits > 0) {
            const request = generatePrompt();
            setOpenaiRequest(request);
            try {
                yield (0, openaiClient_1.getCompletion)(request)
                    .then(completion => {
                    if (completion && completion.choices) {
                        const result = completion.choices[0].text
                            // .replace(/^\n\n/, '')
                            .trim() + ' ';
                        handleContentChange(content + result);
                        const editable = document.getElementById('contentArea');
                        // let value = editable.innerHTML;
                        if (editable.innerText === placeholder) {
                            editable.innerText = '';
                        }
                        const speed = 15;
                        let count = 0;
                        //   const txt = "content";
                        const typeWriter = () => {
                            if (count < completion.choices[0].text.length) {
                                editable.innerHTML += result.charAt(count);
                                count++;
                                setTimeout(typeWriter, speed);
                            }
                        };
                        typeWriter();
                        if (completion.choices[0].text.length) {
                            updateAiCredit(completion.choices[0].text.length);
                        }
                        // else {
                        //   message.error('Supply the AI with additional information.');
                        // }
                    }
                    else {
                        antd_1.message.error('something went wrong somewhere.');
                    }
                })
                    .finally(() => {
                    setLoading(false);
                });
            }
            catch (err) {
                antd_1.message.error(err.message);
                //   console.log(err);
            }
        }
        else {
            setLoading(true);
            toggleShowPlanType();
        }
    });
    const formDisabled = () => {
        var _a;
        if ((charCount && content) || title) {
            if ((charCount !== 0 && charCount !== ((_a = data[0]) === null || _a === void 0 ? void 0 : _a.charCount)) || title.length > 0) {
                return true;
            }
        }
        return false;
    };
    // if (formDisabled() || disabled) {
    //   setBtnText("Save");
    // } else {
    //   setBtnText("Saved");
    // }
    const updateStoryData = () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const payload = {
            title,
            content,
            charCount,
            wordCount
        };
        try {
            const result = yield config_1.axiosInstance.put(`/story/${(_c = data[0]) === null || _c === void 0 ? void 0 : _c._id}/update`, payload, {
                withCredentials: true
            });
            return {
                status: 'success',
                data: result.data
            };
        }
        catch (error) {
            const errorMessage = error.message;
            const status = 'error';
            return {
                status,
                errorMessage
            };
        }
    });
    const onSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        // if (validator.isEmpty(content)) {
        //   message.error('Content cannot be empty');
        //   // setFormDisabled(false);
        //   setBtnText('Save');
        //   setSubmitLoading(false);
        //   return;
        // }
        if (formDisabled()) {
            setSubmitLoading(true);
            setErrors({});
            setBtnText('Saving...');
            setCharCount(charCount);
            yield updateStoryData().then(result => {
                if (result.status === 'error') {
                    // setFormDisabled(false);
                    setSubmitLoading(false);
                    setBtnText('Save');
                    antd_1.message.error(result.errorMessage);
                }
                else {
                    // setFormDisabled(true);
                    setBtnText('Saved');
                    // message.success("Document saved");
                    setDisabled(true);
                    setSubmitLoading(false);
                }
            });
        }
        return errors;
    });
    const toggleShare = () => {
        setShowShare(show => !show);
    };
    function useOnClickOutside(dropRef, handler) {
        (0, react_1.useEffect)(() => {
            const listener = event => {
                if (!dropRef.current || dropRef.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        }, [dropRef, handler]);
    }
    const copyLink = () => {
        var _a;
        navigator.clipboard.writeText(`http://localhost:3001/read/${(_a = data[0]) === null || _a === void 0 ? void 0 : _a.urlString}`);
        setCopySuccess(true);
        setTimeout(() => {
            setCopySuccess(false);
        }, 2000);
    };
    const updateVisibilty = (value) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        setSubmitLoading(true);
        setErrors({});
        setBtnText('Saving...');
        const payload = {
            title,
            content,
            charCount,
            wordCount,
            isPublic: value
        };
        yield config_1.axiosInstance.put(`/story/${(_d = data[0]) === null || _d === void 0 ? void 0 : _d._id}/update`, payload, {
            withCredentials: true
        });
        setSubmitLoading(false);
        // setFormDisabled(true);
        setBtnText('Saved');
    });
    const toggleVisibility = () => {
        setIsPublic(current => !current);
        updateVisibilty(!isPublic);
    };
    return (<div className="sc-jdhwqr cChEAZ">
      <Sidebar_1.default checkPrompt={checkPrompt} loading={loading} setMaxTokens={setMaxTokens} setPrompt={setPrompt} prompt={prompt} credits={credits}/>
      <div className="sc-fkJVfC fEWUPr">
        {data.length ? (<>
            <div className="sc-cZMNgc jPRwbG">
              <div className="sc-jUosCB klZYnl">
                <div className="sc-jQrDum hcyzbe">
                  <div className="sc-fvxzrP kqJoff">
                    <antd_1.Button 
        // htmlType="submit"
        disabled={!formDisabled() || disabled} className="btn btn-primary is-rounded" loading={submitLoading} onClick={onSubmit}>
                      {btnText}
                    </antd_1.Button>
                  </div>
                  <div className="me-24">
                    <a className="btn btn-link" onClick={toggleShare}>
                      Share
                    </a>
                  </div>
                  {showShare && (<div ref={dropRef} className="sc-hmjpVf cfzVEv">
                      <div className="sc-bTfYFJ eRRBiT">
                        <p className="sc-furwcr sc-kHOZwM hDIoeL gGGBsj">Make this public</p>
                        <antd_1.Switch size="small" loading={submitLoading} onChange={toggleVisibility} checked={isPublic}/>
                      </div>
                      {isPublic && (<div className="sc-eLwHnm">
                          <p className="sc-jrQzAO sc-hOGkXu isybwh hTXGA-d">
                            Share this link with your friends
                          </p>
                          <antd_1.Input className="sc-ksdxgE sc-dtMgUX dLcLVX fmewbM" value={`https://copydeck.ai/read/${(_a = data[0]) === null || _a === void 0 ? void 0 : _a.urlString}/`}/>
                        </div>)}
                      <antd_1.Button className="sc-hGPBjI btn btn-primary btn-sm" disabled={!isPublic} 
            // loading={submitLoading}
            onClick={copyLink}>
                        {copySuccess ? 'Link copied' : 'Copy link'}
                      </antd_1.Button>
                    </div>)}

                  <ThemeSwitch_1.default />
                </div>
              </div>
            </div>
            <div id="writing-container" className="sc-iuqRDJ cNKWom">
              <div className="sc-cCcXHH iNMoXE">
                <textarea placeholder="Your title here..." className="sc-bkkeKt sc-cidDSM zzEXs cznyrf" name="title" onChange={e => {
                handleTitleChange(e);
            }} ref={titleTextAreaRef} value={title}></textarea>
              </div>
              <div className="sc-ZOtfp bfLVSG">
                <Editor_1.default className="sc-eCImPb sc-ezbkAF ebKIPs A-dmbO mt-0" onChange={handleContentChange} checkPrompt={checkPrompt} id="contentArea" placeholder={placeholder} value={(_b = data[0]) === null || _b === void 0 ? void 0 : _b.content}/>
                <div></div>
              </div>
              <div className="writing-stats justify-content-start">
                <div className="sc-djWRfJ gpBwlP">
                  <p className="sc-iCfMLu sc-gIBqdA hXricx lhUpfH">{wordCount}</p>
                  <p className="sc-iCfMLu sc-fyrocj hXricx kWgNA">words</p>
                </div>
                <div className="sc-djWRfJ gpBwlP">
                  <p className="sc-iCfMLu sc-gIBqdA hXricx lhUpfH">{charCount}</p>
                  <p className="sc-iCfMLu sc-fyrocj hXricx kWgNA">characters</p>
                </div>
              </div>
              <antd_1.FloatButton icon={<icons_1.QuestionCircleOutlined />} type="default" style={{ right: 24 }}/>
            </div>
          </>) : (<Loader_1.default />)}
      </div>
    </div>);
};
WriteUpdate.displayName = 'WriteUpdate';
exports.default = WriteUpdate;
