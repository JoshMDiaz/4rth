import {
  Button_default
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

// app/routes/matchups.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/matchups.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/matchups.tsx"
  );
  import.meta.hot.lastModified = "1693093840866.7637";
}
var Matchups = () => {
  _s();
  const [matchups, setMatchups] = (0, import_react.useState)([]);
  const [teamPoints, setTeamPoints] = (0, import_react.useState)({});
  (0, import_react.useEffect)(() => {
    const savedMatchups = localStorage.getItem("matchups");
    if (savedMatchups) {
      setMatchups(JSON.parse(savedMatchups));
    }
  }, []);
  const handleScoreChange = ({
    roundIndex,
    matchupIndex,
    team,
    score
  }) => {
    const players = matchups[roundIndex][matchupIndex][team];
    setTeamPoints((prevState) => {
      var _a, _b, _c2, _d, _e;
      return {
        ...prevState,
        [`round${roundIndex + 1}`]: {
          ...prevState[`round${roundIndex + 1}`],
          [`matchup${matchupIndex + 1}`]: {
            ...(_a = prevState[`round${roundIndex + 1}`]) == null ? void 0 : _a[`matchup${matchupIndex + 1}`],
            [(_c2 = (_b = players[0]) == null ? void 0 : _b.name) != null ? _c2 : ""]: score,
            [(_e = (_d = players[1]) == null ? void 0 : _d.name) != null ? _e : ""]: score
          }
        }
      };
    });
  };
  const handleScoreSubmit = ({
    roundIndex,
    matchupIndex
  }) => {
    function findWinners(matchupData2) {
      const maxScore = Math.max(...Object.values(matchupData2));
      return Object.keys(matchupData2).filter((player) => matchupData2[player] === maxScore);
    }
    const matchupData = teamPoints[`round${roundIndex + 1}`][`matchup${matchupIndex + 1}`];
    const matchupWinners = findWinners(matchupData);
    function updateWins(playerNames) {
      var _a;
      const playersData = JSON.parse((_a = localStorage.getItem("players")) != null ? _a : "") || [];
      for (const player of playersData) {
        if (playerNames.includes(player.name)) {
          player.wins += 1;
        }
      }
      localStorage.setItem("players", JSON.stringify(playersData));
    }
    updateWins(matchupWinners);
  };
  const renderMatchup = (matchup, roundIndex, matchupIndex) => {
    var _a;
    const team1Players = matchup.team1.map((player) => player ? player.name : "TBD").join(" / "), team2Players = matchup.team2.map((player) => player ? player.name : "TBD").join(" / "), roundMatchup = (_a = teamPoints == null ? void 0 : teamPoints[`round${roundIndex + 1}`]) == null ? void 0 : _a[`matchup${matchupIndex + 1}`];
    function areAllValuesNumbers(obj) {
      if (typeof obj !== "object" || obj === null) {
        return false;
      }
      return Object.values(obj).every((value) => typeof value === "number" && !isNaN(value));
    }
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { children: [
        "Matchup ",
        matchupIndex + 1
      ] }, void 0, true, {
        fileName: "app/routes/matchups.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        "Team 1: ",
        team1Players,
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", min: 0, onChange: (e) => {
          handleScoreChange({
            roundIndex,
            matchupIndex,
            team: "team1",
            score: parseInt(e.target.value)
          });
        } }, void 0, false, {
          fileName: "app/routes/matchups.tsx",
          lineNumber: 88,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/matchups.tsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        "Team 2: ",
        team2Players,
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", min: 0, onChange: (e) => {
          handleScoreChange({
            roundIndex,
            matchupIndex,
            team: "team2",
            score: parseInt(e.target.value)
          });
        } }, void 0, false, {
          fileName: "app/routes/matchups.tsx",
          lineNumber: 99,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/matchups.tsx",
        lineNumber: 97,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button_default, { variant: "contained", color: "primary", disabled: !roundMatchup || roundMatchup && Object.keys(roundMatchup).length < 4 || !areAllValuesNumbers(roundMatchup), onClick: (e) => handleScoreSubmit({
        roundIndex,
        matchupIndex
      }), children: "Submit Scores" }, void 0, false, {
        fileName: "app/routes/matchups.tsx",
        lineNumber: 108,
        columnNumber: 9
      }, this)
    ] }, matchupIndex, true, {
      fileName: "app/routes/matchups.tsx",
      lineNumber: 84,
      columnNumber: 12
    }, this);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: "Matchups" }, void 0, false, {
      fileName: "app/routes/matchups.tsx",
      lineNumber: 117,
      columnNumber: 7
    }, this),
    matchups.map((round, roundIndex) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { children: [
        "Round ",
        roundIndex + 1
      ] }, void 0, true, {
        fileName: "app/routes/matchups.tsx",
        lineNumber: 119,
        columnNumber: 11
      }, this),
      round.map((matchup, matchupIndex) => renderMatchup(matchup, roundIndex, matchupIndex))
    ] }, roundIndex, true, {
      fileName: "app/routes/matchups.tsx",
      lineNumber: 118,
      columnNumber: 44
    }, this))
  ] }, void 0, true, {
    fileName: "app/routes/matchups.tsx",
    lineNumber: 116,
    columnNumber: 10
  }, this);
};
_s(Matchups, "uEWzX1/IqqBVnUgQh/FmfeT97DI=");
_c = Matchups;
var matchups_default = Matchups;
var _c;
$RefreshReg$(_c, "Matchups");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  matchups_default as default
};
//# sourceMappingURL=/build/routes/matchups-DSHOT7NY.js.map
