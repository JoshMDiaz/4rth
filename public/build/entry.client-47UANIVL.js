import {
  require_client
} from "/build/_shared/chunk-ZWGWGGVF.js";
import {
  RemixBrowser
} from "/build/_shared/chunk-VKBH4ZJP.js";
import {
  CssBaseline_default,
  ThemeProvider,
  createTheme_default
} from "/build/_shared/chunk-JC6JYJ3W.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import "/build/_shared/chunk-NMZL6IDN.js";
import {
  createHotContext
} from "/build/_shared/chunk-U2ZXMFGW.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/entry.client.tsx
var import_react2 = __toESM(require_react());
var import_client = __toESM(require_client());

// app/theme.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/theme.ts"
  );
  import.meta.hot.lastModified = "1692555123301.3682";
}
var theme = createTheme_default({
  palette: {
    primary: {
      main: "#1976D2"
      // Customize this color
    },
    secondary: {
      main: "#FFC107"
      // Customize this color
    }
  }
});
var theme_default = theme;

// app/entry.client.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/entry.client.tsx"
  );
  import.meta.hot.lastModified = "1692555082365.9624";
}
(0, import_react2.startTransition)(() => {
  (0, import_client.hydrateRoot)(
    document,
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react2.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeProvider, { theme: theme_default, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CssBaseline_default, {}, void 0, false, {
        fileName: "app/entry.client.tsx",
        lineNumber: 29,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RemixBrowser, {}, void 0, false, {
        fileName: "app/entry.client.tsx",
        lineNumber: 30,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "app/entry.client.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this) }, void 0, false, {
      fileName: "app/entry.client.tsx",
      lineNumber: 27,
      columnNumber: 5
    }, this)
  );
});
//# sourceMappingURL=/build/entry.client-47UANIVL.js.map
