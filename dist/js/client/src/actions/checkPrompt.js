"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePromptRequest = void 0;
const authContext_1 = require("@copydeck/contexts/authContext");
const openaiClient_1 = require("@copydeck/libs/openaiClient");
const antd_1 = require("antd");
const react_1 = require("react");
const makePromptRequest = (setLoading, title, content, maxTokens, prompt, placeholder, handleContentChange, toggleShowPlanType) => {
    const { user, updateUserAccount } = (0, authContext_1.useAuth)();
    const [, setOpenaiRequest] = (0, react_1.useState)(undefined);
    const [credits, setCredits] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        setCredits(user.aiUsage.credits);
    }, [user]);
    function generatePrompt() {
        const formTitlePrompt = `
        Take the title of the blog post below and generate a blog post. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.

        Title: ${title}
        `;
        const formContentPrompt = `${content}[insert]`;
        const promptPrefix = `Write me a detailed blog post on a random topic but don't include the title`;
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
    return {
        checkPrompt
    };
};
exports.makePromptRequest = makePromptRequest;
