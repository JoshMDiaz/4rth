import {
  Paper_default,
  TableBody_default,
  TableCell_default,
  TableContainer_default,
  TableHead_default,
  TableRow_default,
  Table_default,
  Typography_default
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

// app/routes/results.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/results.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/results.tsx"
  );
  import.meta.hot.lastModified = "1692855253458.2986";
}
var ResultsPage = () => {
  _s();
  const [playerData, setPlayerData] = (0, import_react.useState)([]);
  (0, import_react.useEffect)(() => {
    const savedPlayers = localStorage.getItem("players");
    if (savedPlayers) {
      setPlayerData(JSON.parse(savedPlayers));
    }
  }, []);
  const mostSkinzPlayer = playerData.reduce((maxSkinzPlayer, player) => {
    if (player.skinz > maxSkinzPlayer.skinz) {
      return player;
    }
    return maxSkinzPlayer;
  }, playerData[0]);
  const customSort = (a, b) => {
    if (a.wins === b.wins) {
      return b.points - a.points;
    }
    return b.wins - a.wins;
  };
  const sortedPlayerData = [...playerData].sort(customSort);
  const mostSkinzPlayers = playerData.filter((player) => player.skinz === mostSkinzPlayer.skinz);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h4", gutterBottom: true, children: "Winners" }, void 0, false, {
      fileName: "app/routes/results.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { children: "1st Place:" }, void 0, false, {
        fileName: "app/routes/results.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      sortedPlayerData.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { children: sortedPlayerData[0].name }, void 0, false, {
        fileName: "app/routes/results.tsx",
        lineNumber: 60,
        columnNumber: 41
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/results.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { children: "2nd Place:" }, void 0, false, {
        fileName: "app/routes/results.tsx",
        lineNumber: 63,
        columnNumber: 9
      }, this),
      sortedPlayerData.length > 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { children: sortedPlayerData[1].name }, void 0, false, {
        fileName: "app/routes/results.tsx",
        lineNumber: 64,
        columnNumber: 41
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/results.tsx",
      lineNumber: 62,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { children: "3rd Place:" }, void 0, false, {
        fileName: "app/routes/results.tsx",
        lineNumber: 67,
        columnNumber: 9
      }, this),
      sortedPlayerData.length > 2 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { children: sortedPlayerData[2].name }, void 0, false, {
        fileName: "app/routes/results.tsx",
        lineNumber: 68,
        columnNumber: 41
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/results.tsx",
      lineNumber: 66,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { children: "Most Skinz:" }, void 0, false, {
        fileName: "app/routes/results.tsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      mostSkinzPlayers.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { children: mostSkinzPlayers.map((player) => player.name).join(", ") }, void 0, false, {
        fileName: "app/routes/results.tsx",
        lineNumber: 72,
        columnNumber: 41
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/results.tsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableContainer_default, { component: Paper_default, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table_default, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow_default, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: "Player Name" }, void 0, false, {
          fileName: "app/routes/results.tsx",
          lineNumber: 80,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: "Total Wins" }, void 0, false, {
          fileName: "app/routes/results.tsx",
          lineNumber: 81,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: "Total Points" }, void 0, false, {
          fileName: "app/routes/results.tsx",
          lineNumber: 82,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: "Total Skinz" }, void 0, false, {
          fileName: "app/routes/results.tsx",
          lineNumber: 83,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/results.tsx",
        lineNumber: 79,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/results.tsx",
        lineNumber: 78,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableBody_default, { children: sortedPlayerData.map((player) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow_default, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: player.name }, void 0, false, {
          fileName: "app/routes/results.tsx",
          lineNumber: 88,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: player.wins }, void 0, false, {
          fileName: "app/routes/results.tsx",
          lineNumber: 89,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: player.points }, void 0, false, {
          fileName: "app/routes/results.tsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: player.skinz }, void 0, false, {
          fileName: "app/routes/results.tsx",
          lineNumber: 91,
          columnNumber: 17
        }, this)
      ] }, player.id, true, {
        fileName: "app/routes/results.tsx",
        lineNumber: 87,
        columnNumber: 45
      }, this)) }, void 0, false, {
        fileName: "app/routes/results.tsx",
        lineNumber: 86,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/results.tsx",
      lineNumber: 77,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/results.tsx",
      lineNumber: 76,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/results.tsx",
    lineNumber: 54,
    columnNumber: 10
  }, this);
};
_s(ResultsPage, "yKJJ5ZQP+Dg5o2LP7bIX127p9No=");
_c = ResultsPage;
var results_default = ResultsPage;
var _c;
$RefreshReg$(_c, "ResultsPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  results_default as default
};
//# sourceMappingURL=/build/routes/results-U6HPQ6DJ.js.map
