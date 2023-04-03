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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const openaiClient_1 = require("@copydeck/libs/openaiClient");
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const Editor = (_a) => {
    var { placeholder, value, 
    // setContent,
    className, onChange, checkPrompt } = _a, others = __rest(_a, ["placeholder", "value", "className", "onChange", "checkPrompt"]);
    const [loading, setLoading] = (0, react_1.useState)(new Set());
    const [selectedText, setSelectedText] = (0, react_1.useState)('');
    const [selectionStart, setSelectionStart] = (0, react_1.useState)(0);
    const [selectionEnd, setSelectionEnd] = (0, react_1.useState)(0);
    const editableRef = (0, react_1.useRef)(null);
    const commandRef = (0, react_1.useRef)(null);
    useOnClickOutside(commandRef, () => setSelectedText(null));
    const selection = window === null || window === void 0 ? void 0 : window.getSelection();
    function handleInput() {
        if (!editableRef.current) {
            return;
        }
        const editable = editableRef.current;
        // Escape input value to prevent XSS attacks
        const escapedValue = editable.innerText;
        // .replace(/<\/?[^>]+(>|$)/g, '')
        // .replace(/\r?\n/g, '<br>');
        onChange(escapedValue);
    }
    const handlePaste = e => {
        e.preventDefault();
        const plainText = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, plainText);
    };
    (0, react_1.useEffect)(() => {
        const editable = editableRef.current;
        // Set the placeholder as initial content if it's empty
        if (editable.innerText === '') {
            editable.innerText = placeholder;
        }
    }, [placeholder]);
    function useOnClickOutside(commandRef, handler) {
        (0, react_1.useEffect)(() => {
            const listener = event => {
                if (!commandRef.current || commandRef.current.contains(event.target)) {
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
        }, [commandRef, handler]);
    }
    (0, react_1.useEffect)(() => {
        const editable = editableRef.current;
        const handleFocus = event => {
            const value = event.target.innerHTML;
            if (value === placeholder) {
                event.target.innerHTML = '';
            }
        };
        const handleBlur = event => {
            const value = event.target.innerHTML;
            if (value === '') {
                event.target.innerHTML = placeholder;
            }
            // setSelectedText(null);
            setSelectionStart(0);
            setSelectionEnd(0);
        };
        function handleSelectionChange() {
            const selectedRange = selection.getRangeAt(0);
            const selectedText = selectedRange.toString();
            const selectionStart = selectedRange.startOffset;
            const selectionEnd = selectedRange.endOffset;
            setSelectedText(selectedText);
            setSelectionStart(selectionStart);
            setSelectionEnd(selectionEnd);
        }
        if (selectedText && selectionStart && selectionEnd) {
            const rect = selection.getRangeAt(0).getBoundingClientRect();
            commandRef.current.style.display = `block`;
            // commandRef.current.style.inset = `0px auto auto 0px`;
            commandRef.current.style.transform = `translate3d(25px, 70px, 0px)`;
            commandRef.current.style.top = `calc(${rect.top}px - 48px)`;
            commandRef.current.style.left = `calc(${rect.left}px + calc(${rect.width}px / 2) - 40px)`;
        }
        editable.addEventListener('mouseup', handleSelectionChange);
        editable.addEventListener('keyup', handleSelectionChange);
        // editable.addEventListener("input", handleInput);
        editable.addEventListener('focus', handleFocus);
        editable.addEventListener('blur', handleBlur);
        document.addEventListener('keydown', e => {
            if (e.keyCode === 13 && e.metaKey) {
                checkPrompt();
            }
        });
        return () => {
            editable.removeEventListener('mouseup', handleSelectionChange);
            editable.removeEventListener('keyup', handleSelectionChange);
            //   editable.removeEventListener("input", handleInput);
            editable.removeEventListener('focus', handleFocus);
            editable.removeEventListener('blur', handleBlur);
            //   editable.removeEventListener('keydown', handleRewriteClick);
        };
    }, [placeholder, selectedText, selection]);
    function shortenTextPrompt() {
        const instruction = `summarize and shorten this text`;
        return {
            model: 'text-davinci-edit-001',
            instruction,
            input: selectedText,
            temperature: 0.85
        };
    }
    function expandTextPrompt() {
        const instruction = `expantiate this text`;
        return {
            model: 'text-davinci-edit-001',
            instruction,
            input: selectedText,
            temperature: 0.5
        };
    }
    function rewritePrompt() {
        const instruction = `rewrite for clarity and fix any typo and grammatical errors: ${selectedText}`;
        return {
            model: 'text-davinci-003',
            prompt: instruction,
            temperature: 0.7,
            top_p: 1,
            max_tokens: 1200
        };
    }
    const handleRewriteClick = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setLoading(prev => new Set([prev, 'H2y02']));
        const request = rewritePrompt();
        try {
            yield (0, openaiClient_1.getCompletion)(request)
                .then(completion => {
                if (completion && completion.choices) {
                    const selectedRange = selection.getRangeAt(0);
                    selectedRange.deleteContents();
                    selectedRange.insertNode(document.createTextNode(completion.choices[0].text.trim()));
                    // setContent(completion.choices[0].text.trim());
                }
                else {
                    antd_1.message.error('No result, something went wrong somewhere.');
                }
            })
                .finally(() => {
                setLoading(() => {
                    const updated = new Set(null);
                    return updated;
                });
                setSelectedText(null);
            });
        }
        catch (err) {
            antd_1.message.error(err.message);
            //   console.log(err);
        }
    });
    const handleShortenTextClick = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setLoading(prev => new Set([prev, 'wP2h1']));
        const request = shortenTextPrompt();
        try {
            yield (0, openaiClient_1.getEdit)(request)
                .then(completion => {
                if (completion && completion.choices) {
                    const selectedRange = selection.getRangeAt(0);
                    selectedRange.deleteContents();
                    selectedRange.insertNode(document.createTextNode(completion.choices[0].text.trim()));
                }
                else {
                    antd_1.message.error('No result, something went wrong somewhere.');
                }
            })
                .finally(() => {
                setLoading(() => {
                    const updated = new Set(null);
                    return updated;
                });
                setSelectedText(null);
            });
        }
        catch (err) {
            antd_1.message.error(err.message);
        }
    });
    const handleExpandTextClick = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setLoading(prev => new Set([prev, 'p13Ry']));
        const request = expandTextPrompt();
        try {
            yield (0, openaiClient_1.getEdit)(request)
                .then(completion => {
                if (completion && completion.choices) {
                    const selectedRange = selection.getRangeAt(0);
                    // selection.removeAllRanges();
                    selectedRange.deleteContents();
                    selectedRange.insertNode(document.createTextNode(completion.choices[0].text.trim()));
                }
                else {
                    antd_1.message.error('No result, something went wrong somewhere.');
                }
            })
                .finally(() => {
                setLoading(() => {
                    const updated = new Set(null);
                    return updated;
                });
                setSelectedText(null);
            });
        }
        catch (err) {
            antd_1.message.error(err.message);
        }
    });
    const handleDeleteClick = e => {
        e.preventDefault();
        const selectedRange = selection.getRangeAt(0);
        selectedRange.deleteContents();
        setSelectedText(null);
    };
    return (<>
      <div ref={editableRef} onInput={handleInput} onPaste={handlePaste} contentEditable suppressContentEditableWarning role={'textbox'} className={className} 
    // onChange={onChange}
    dangerouslySetInnerHTML={{ __html: value }} {...others}/>
      {selectedText ? (<ul ref={commandRef} className="dropdown-menu">
          <li>
            <antd_1.Button loading={loading.has('H2y02')} className="h-unset dropdown-item" onClick={handleRewriteClick}>
              <span className="icon rounded-circle hp-bg-primary-4 hp-bg-dark-primary">
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
              </span>{' '}
              <span>Rewrite for clarity</span>
            </antd_1.Button>
          </li>
          <li>
            <antd_1.Button loading={loading.has('wP2h1')} className="h-unset dropdown-item" onClick={handleShortenTextClick}>
              <span className="icon rounded-circle hp-bg-warning-4 hp-bg-dark-warning">
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="6" cy="18" r="3"></circle>
                  <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
                  <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                  <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
                </svg>
              </span>{' '}
              <span>Shorten Text</span>
            </antd_1.Button>
          </li>
          <li>
            <antd_1.Button loading={loading.has('p13Ry')} className="h-unset dropdown-item" onClick={handleExpandTextClick}>
              <span className="icon rounded-circle hp-bg-danger-4 hp-bg-dark-danger">
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="17" y1="10" x2="3" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="17" y1="18" x2="3" y2="18"></line>
                </svg>
              </span>{' '}
              <span>Expand Text</span>
            </antd_1.Button>
          </li>
          <li>
            <hr className="dropdown-divider"/>
          </li>
          <li>
            <button className="dropdown-item" onClick={handleDeleteClick}>
              Clear
            </button>
          </li>
        </ul>) : ('')}
    </>);
};
Editor.displayName = 'Editor';
exports.default = Editor;