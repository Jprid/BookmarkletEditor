import { javascript, javascriptLanguage } from "@codemirror/lang-javascript";
import { EditorView, basicSetup } from "codemirror";
import { createEventDispatcher } from "svelte";
import { writable } from "svelte/store";
import { oneDark } from "./one-dark";

const DEFAULT_NAME = "Untitled *";
const DEFAULT_EDITOR_TEXT = "function () {\n \\\\...\n}";

export const fileName = writable(DEFAULT_NAME);

// export const docStore = writable("");

// export const d = (dom) => {
//   let _docCached = null;
//   let verbose = false;
//   let view = null;
//   let inited = false;
//   const subscribers = new Set();
//   function _editorTxHandler(tr) {
//     set([tr]);

//     if (verbose) {
//       dispatch("update", tr);
//     }

//     if (tr.docChanged) {
//       _docCached = null;
//       if (subscribers.size) {
//         dispatchDocStore((_docCached = tr.newDoc.toString()));
//       }
//       dispatch("change", { view: this, tr });
//     }
//   }

//   function dispatchDocStore(s) {
//     for (const cb of subscribers) {
//       cb(s);
//     }
//   }

//   // the view will be inited with the either doc (as long as that it is not `undefined`)
//   // or the value in docStore once set
//   function _initEditorView(initialDoc) {
//     if (view !== null) {
//       return false;
//     }
//     view = new EditorView({
//       doc: initialDoc,
//       extensions: [basicSetup, oneDark, javascriptLanguage],
//       parent: dom,
//       languages: [javascript({ typescript: true })],
//       // dispatch: _editorTxHandler,
//     });
//     return true;
//   }
//   function _setText(text) {
//     view.dispatch({
//       changes: { from: 0, to: view.state.doc.length, insert: text },
//     });
//   }
//   const ready = () => view !== null;
//   const subscribe = (cb) => {
//     subscribers.add(cb);

//     if (!ready()) {
//       cb(null);
//     } else {
//       if (_docCached == null) {
//         _docCached = view.state.doc.toString();
//       }
//       cb(_docCached);
//     }

//     return () => void subscribers.delete(cb);
//   };
//   const set = (newValue) => {
//     if (view !== null) {
//         view.doc = newValue;
//     } else {
//         view = _initEditorView(newValue);
//     }
//   };
//   return { subscribe, set, ready };
// }
