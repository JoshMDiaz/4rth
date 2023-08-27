var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// css-bundle-update-plugin-ns:/Users/joshmdiaz/Development/public_html/skinz/node_modules/@remix-run/css-bundle/dist/index.js
var require_dist = __commonJS({
  "css-bundle-update-plugin-ns:/Users/joshmdiaz/Development/public_html/skinz/node_modules/@remix-run/css-bundle/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var cssBundleHref2;
    exports.cssBundleHref = cssBundleHref2;
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_node_stream = require("node:stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 48,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 97,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
var import_css_bundle = __toESM(require_dist()), import_react2 = require("@remix-run/react"), import_material2 = require("@mui/material");

// app/components/LinkTab.tsx
var import_material = require("@mui/material"), import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), LinkTab = (props) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
  import_material.Tab,
  {
    component: "a",
    onClick: (event) => {
      event.preventDefault();
    },
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/LinkTab.tsx",
    lineNumber: 12,
    columnNumber: 5
  },
  this
), LinkTab_default = LinkTab;

// app/root.tsx
var import_react3 = require("react"), import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), links = () => [
  ...import_css_bundle.cssBundleHref ? [{ rel: "stylesheet", href: import_css_bundle.cssBundleHref }] : []
];
function App() {
  let [value, setValue] = (0, import_react3.useState)(0);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react2.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react2.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { children: "Skinz" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        import_material2.Tabs,
        {
          value,
          onChange: (_, newValue) => {
            setValue(newValue);
          },
          textColor: "secondary",
          indicatorColor: "secondary",
          "aria-label": "secondary tabs example",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(LinkTab_default, { label: "Players", href: "/players" }, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 43,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(LinkTab_default, { label: "Matchups", href: "/matchups" }, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 44,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(LinkTab_default, { label: "Results", href: "/results" }, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 45,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/root.tsx",
          lineNumber: 36,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react2.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 47,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react2.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react2.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react2.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}

// app/routes/matchups.tsx
var matchups_exports = {};
__export(matchups_exports, {
  default: () => matchups_default
});
var import_react4 = require("react"), import_material3 = require("@mui/material"), import_jsx_dev_runtime4 = require("react/jsx-dev-runtime"), Matchups = () => {
  let [matchups, setMatchups] = (0, import_react4.useState)([]), [teamPoints, setTeamPoints] = (0, import_react4.useState)({}), [submittedResults, setSubmittedResults] = (0, import_react4.useState)({});
  (0, import_react4.useEffect)(() => {
    let savedMatchups = localStorage.getItem("matchups");
    savedMatchups && setMatchups(JSON.parse(savedMatchups));
  }, []);
  let handleScoreChange = ({
    roundIndex,
    matchupIndex,
    team,
    score
  }) => {
    let players = matchups[roundIndex][matchupIndex][team];
    setTeamPoints((prevState) => {
      var _a, _b, _c;
      return {
        ...prevState,
        [`round${roundIndex + 1}`]: {
          ...prevState[`round${roundIndex + 1}`],
          [`matchup${matchupIndex + 1}`]: {
            ...(_a = prevState[`round${roundIndex + 1}`]) == null ? void 0 : _a[`matchup${matchupIndex + 1}`],
            [((_b = players[0]) == null ? void 0 : _b.name) ?? ""]: score,
            [((_c = players[1]) == null ? void 0 : _c.name) ?? ""]: score
          }
        }
      };
    });
  }, handleScoreSubmit = ({
    roundIndex,
    matchupIndex
  }) => {
    function findWinners(matchupData2) {
      let maxScore = Math.max(...Object.values(matchupData2));
      return Object.keys(matchupData2).filter(
        (player) => matchupData2[player] === maxScore
      );
    }
    let roundNumber = `round${roundIndex + 1}`, matchupNumber = `matchup${matchupIndex + 1}`, matchupData = teamPoints[roundNumber][matchupNumber], matchupWinners = findWinners(matchupData);
    function updateWins(playerNames) {
      let playersData = JSON.parse(localStorage.getItem("players") ?? "") || [];
      for (let player of playersData)
        playerNames.includes(player.name) && (player.wins += 1);
      localStorage.setItem("players", JSON.stringify(playersData));
    }
    updateWins(matchupWinners), setSubmittedResults((prevState) => ({
      ...prevState,
      [roundNumber]: {
        ...prevState[roundNumber],
        [matchupNumber]: !0
      }
    }));
  }, handleEditScores = ({
    roundIndex,
    matchupIndex
  }) => {
    setSubmittedResults((prevState) => ({
      ...prevState,
      [`round${roundIndex + 1}`]: {
        ...prevState[`round${roundIndex + 1}`],
        [`matchup${matchupIndex + 1}`]: !1
      }
    }));
    function findWinners(matchupData2) {
      let maxScore = Math.max(...Object.values(matchupData2));
      return Object.keys(matchupData2).filter(
        (player) => matchupData2[player] === maxScore
      );
    }
    let roundNumber = `round${roundIndex + 1}`, matchupNumber = `matchup${matchupIndex + 1}`, matchupData = teamPoints[roundNumber][matchupNumber], matchupWinners = findWinners(matchupData);
    function updateWins(playerNames) {
      let playersData = JSON.parse(localStorage.getItem("players") ?? "") || [];
      for (let player of playersData)
        playerNames.includes(player.name) && (player.wins -= 1);
      localStorage.setItem("players", JSON.stringify(playersData));
    }
    updateWins(matchupWinners);
  }, renderMatchup = (matchup, roundIndex, matchupIndex) => {
    var _a, _b, _c, _d;
    let team1Players = matchup.team1.map((player) => player ? player.name : "TBD").join(" / "), team2Players = matchup.team2.map((player) => player ? player.name : "TBD").join(" / "), roundMatchup = (_a = teamPoints == null ? void 0 : teamPoints[`round${roundIndex + 1}`]) == null ? void 0 : _a[`matchup${matchupIndex + 1}`];
    function areAllValuesNumbers(obj) {
      return typeof obj != "object" || obj === null ? !1 : Object.values(obj).every(
        (value) => typeof value == "number" && !isNaN(value)
      );
    }
    return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h3", { children: [
        "Matchup ",
        matchupIndex + 1
      ] }, void 0, !0, {
        fileName: "app/routes/matchups.tsx",
        lineNumber: 177,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: [
        "Team 1: ",
        team1Players,
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
          "input",
          {
            type: "number",
            min: 0,
            onChange: (e) => {
              handleScoreChange({
                roundIndex,
                matchupIndex,
                team: "team1",
                score: parseInt(e.target.value)
              });
            }
          },
          void 0,
          !1,
          {
            fileName: "app/routes/matchups.tsx",
            lineNumber: 180,
            columnNumber: 6
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/matchups.tsx",
        lineNumber: 178,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: [
        "Team 2: ",
        team2Players,
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
          "input",
          {
            type: "number",
            min: 0,
            onChange: (e) => {
              handleScoreChange({
                roundIndex,
                matchupIndex,
                team: "team2",
                score: parseInt(e.target.value)
              });
            }
          },
          void 0,
          !1,
          {
            fileName: "app/routes/matchups.tsx",
            lineNumber: 195,
            columnNumber: 6
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/matchups.tsx",
        lineNumber: 193,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
        import_material3.Button,
        {
          variant: "contained",
          color: "primary",
          disabled: !roundMatchup || roundMatchup && Object.keys(roundMatchup).length < 4 || !areAllValuesNumbers(roundMatchup) || !!((_b = submittedResults == null ? void 0 : submittedResults[`round${roundIndex + 1}`]) != null && _b[`matchup${matchupIndex + 1}`]),
          onClick: (e) => handleScoreSubmit({
            roundIndex,
            matchupIndex
          }),
          children: (_c = submittedResults == null ? void 0 : submittedResults[`round${roundIndex + 1}`]) != null && _c[`matchup${matchupIndex + 1}`] ? "Submitted" : "Submit Scores"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/matchups.tsx",
          lineNumber: 208,
          columnNumber: 5
        },
        this
      ),
      (_d = submittedResults == null ? void 0 : submittedResults[`round${roundIndex + 1}`]) != null && _d[`matchup${matchupIndex + 1}`] ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
        import_material3.Button,
        {
          variant: "text",
          color: "primary",
          onClick: (e) => handleEditScores({
            roundIndex,
            matchupIndex
          }),
          children: "Edit Scores"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/matchups.tsx",
          lineNumber: 235,
          columnNumber: 6
        },
        this
      ) : null
    ] }, matchupIndex, !0, {
      fileName: "app/routes/matchups.tsx",
      lineNumber: 176,
      columnNumber: 4
    }, this);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h1", { children: "Matchups" }, void 0, !1, {
      fileName: "app/routes/matchups.tsx",
      lineNumber: 254,
      columnNumber: 4
    }, this),
    matchups.map((round, roundIndex) => /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h2", { children: [
        "Round ",
        roundIndex + 1
      ] }, void 0, !0, {
        fileName: "app/routes/matchups.tsx",
        lineNumber: 257,
        columnNumber: 6
      }, this),
      round.map(
        (matchup, matchupIndex) => renderMatchup(matchup, roundIndex, matchupIndex)
      )
    ] }, roundIndex, !0, {
      fileName: "app/routes/matchups.tsx",
      lineNumber: 256,
      columnNumber: 5
    }, this))
  ] }, void 0, !0, {
    fileName: "app/routes/matchups.tsx",
    lineNumber: 253,
    columnNumber: 3
  }, this);
}, matchups_default = Matchups;

// app/routes/players.tsx
var players_exports = {};
__export(players_exports, {
  default: () => players_default
});
var import_react5 = require("react"), import_material4 = require("@mui/material"), import_react6 = require("@remix-run/react"), import_jsx_dev_runtime5 = require("react/jsx-dev-runtime"), PlayerForm = () => {
  let [players, setPlayers] = (0, import_react5.useState)([]), [newPlayerName, setNewPlayerName] = (0, import_react5.useState)(""), [editingPlayer, setEditingPlayer] = (0, import_react5.useState)(null), navigate = (0, import_react6.useNavigate)();
  (0, import_react5.useEffect)(() => {
    let savedPlayers = localStorage.getItem("players");
    savedPlayers && setPlayers(JSON.parse(savedPlayers));
  }, []), (0, import_react5.useEffect)(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);
  let handlePlayerNameChange = (event) => {
    setNewPlayerName(event.target.value);
  }, addPlayer = () => {
    if (players.length < 8 && newPlayerName.trim() !== "")
      if (players.some(
        (player) => player.name === newPlayerName
      ))
        alert("Player name already exists.");
      else {
        let newPlayer = {
          id: Date.now(),
          // Assign a unique ID
          name: newPlayerName,
          wins: 0,
          skinz: 0,
          points: 0
        };
        setPlayers([...players, newPlayer]), setNewPlayerName(""), players.length + 1 === 8 && setNewPlayerName("");
      }
  }, editPlayerName = (player) => {
    setEditingPlayer(player);
  }, saveEditedName = (player, newName) => {
    let updatedPlayers = players.map(
      (p) => p.id === player.id ? { ...p, name: newName } : p
    );
    setPlayers(updatedPlayers), setEditingPlayer(null);
  }, incrementSkinz = (id) => {
    let updatedPlayers = players.map(
      (player) => player.id === id ? { ...player, skinz: player.skinz + 1 } : player
    );
    setPlayers(updatedPlayers);
  }, handleClearTable = () => {
    setPlayers([]), setNewPlayerName(""), setEditingPlayer(null);
  }, handleDeleteRow = (id) => {
    let updatedPlayers = players.filter((player) => player.id !== id);
    setPlayers(updatedPlayers), setEditingPlayer(null);
  }, isTextFieldDisabled = players.length >= 8 || !!editingPlayer, handleKeyDown = (event) => {
    event.key === "Enter" && addPlayer();
  }, generateMatchups = () => {
    if (players.length === 8) {
      let matchups = [];
      for (let round = 0; round < 7; round++) {
        let roundMatchups = [], shuffledPlayers = shuffleArray(players);
        for (let i = 0; i < shuffledPlayers.length; i += 4) {
          let matchup = {
            team1: [shuffledPlayers[i], shuffledPlayers[i + 1]],
            team2: [shuffledPlayers[i + 2], shuffledPlayers[i + 3]]
          };
          roundMatchups.push(matchup);
        }
        matchups.push(roundMatchups);
      }
      localStorage.setItem("matchups", JSON.stringify(matchups)), navigate("/matchups");
    } else
      alert("You need exactly 8 players to generate matchups.");
  }, shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i]
      ];
    }
    return shuffledArray;
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
      import_material4.TextField,
      {
        label: "Player Name",
        value: newPlayerName,
        onChange: handlePlayerNameChange,
        onKeyDown: handleKeyDown,
        disabled: isTextFieldDisabled
      },
      void 0,
      !1,
      {
        fileName: "app/routes/players.tsx",
        lineNumber: 157,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.Button, { variant: "contained", color: "primary", onClick: addPlayer, children: "Add Player" }, void 0, !1, {
      fileName: "app/routes/players.tsx",
      lineNumber: 164,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.Button, { variant: "contained", color: "secondary", onClick: handleClearTable, children: "Clear Table" }, void 0, !1, {
      fileName: "app/routes/players.tsx",
      lineNumber: 167,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
      import_material4.Button,
      {
        variant: "contained",
        color: "primary",
        onClick: generateMatchups,
        disabled: players.length !== 8,
        children: "Generate Matchups"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/players.tsx",
        lineNumber: 170,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.TableContainer, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.Table, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.TableHead, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.TableRow, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.TableCell, { children: "Name" }, void 0, !1, {
          fileName: "app/routes/players.tsx",
          lineNumber: 182,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.TableCell, { children: "Wins" }, void 0, !1, {
          fileName: "app/routes/players.tsx",
          lineNumber: 183,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.TableCell, { children: "Skinz" }, void 0, !1, {
          fileName: "app/routes/players.tsx",
          lineNumber: 184,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.TableCell, { children: "Actions" }, void 0, !1, {
          fileName: "app/routes/players.tsx",
          lineNumber: 185,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/players.tsx",
        lineNumber: 181,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/players.tsx",
        lineNumber: 180,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.TableBody, { children: players.map((player) => /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.TableRow, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.TableCell, { children: (editingPlayer == null ? void 0 : editingPlayer.id) === player.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
          import_material4.TextField,
          {
            value: editingPlayer.name,
            onChange: (e) => setEditingPlayer({
              ...editingPlayer,
              name: e.target.value
            })
          },
          void 0,
          !1,
          {
            fileName: "app/routes/players.tsx",
            lineNumber: 193,
            columnNumber: 21
          },
          this
        ) : player.name }, void 0, !1, {
          fileName: "app/routes/players.tsx",
          lineNumber: 191,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.TableCell, { children: player.wins }, void 0, !1, {
          fileName: "app/routes/players.tsx",
          lineNumber: 206,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.TableCell, { children: [
          player.skinz,
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            import_material4.Button,
            {
              variant: "contained",
              color: "primary",
              onClick: () => incrementSkinz(player.id),
              children: "+"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/players.tsx",
              lineNumber: 209,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/players.tsx",
          lineNumber: 207,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_material4.TableCell, { children: (editingPlayer == null ? void 0 : editingPlayer.id) === player.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
          import_material4.Button,
          {
            variant: "contained",
            color: "primary",
            onClick: () => saveEditedName(editingPlayer, editingPlayer.name),
            children: "Save"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/players.tsx",
            lineNumber: 219,
            columnNumber: 21
          },
          this
        ) : /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_jsx_dev_runtime5.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            import_material4.Button,
            {
              variant: "contained",
              color: "primary",
              onClick: () => editPlayerName(player),
              children: "Edit"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/players.tsx",
              lineNumber: 230,
              columnNumber: 23
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            import_material4.Button,
            {
              variant: "contained",
              color: "secondary",
              onClick: () => handleDeleteRow(player.id),
              children: "Delete"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/players.tsx",
              lineNumber: 237,
              columnNumber: 23
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/players.tsx",
          lineNumber: 229,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "app/routes/players.tsx",
          lineNumber: 217,
          columnNumber: 17
        }, this)
      ] }, player.id, !0, {
        fileName: "app/routes/players.tsx",
        lineNumber: 190,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "app/routes/players.tsx",
        lineNumber: 188,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/players.tsx",
      lineNumber: 179,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/players.tsx",
      lineNumber: 178,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/players.tsx",
    lineNumber: 156,
    columnNumber: 5
  }, this);
}, players_default = PlayerForm;

// app/routes/results.tsx
var results_exports = {};
__export(results_exports, {
  default: () => results_default
});
var import_react7 = require("react"), import_material5 = require("@mui/material"), import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), ResultsPage = () => {
  let [playerData, setPlayerData] = (0, import_react7.useState)([]);
  (0, import_react7.useEffect)(() => {
    let savedPlayers = localStorage.getItem("players");
    savedPlayers && setPlayerData(JSON.parse(savedPlayers));
  }, []);
  let mostSkinzPlayer = playerData.reduce((maxSkinzPlayer, player) => player.skinz > maxSkinzPlayer.skinz ? player : maxSkinzPlayer, playerData[0]), customSort = (a, b) => a.wins === b.wins ? b.points - a.points : b.wins - a.wins, sortedPlayerData = [...playerData].sort(customSort), mostSkinzPlayers = playerData.filter(
    (player) => player.skinz === mostSkinzPlayer.skinz
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_jsx_dev_runtime6.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.Typography, { variant: "h4", gutterBottom: !0, children: "Winners" }, void 0, !1, {
      fileName: "app/routes/results.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.Typography, { children: "1st Place:" }, void 0, !1, {
        fileName: "app/routes/results.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this),
      sortedPlayerData.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.Typography, { children: sortedPlayerData[0].name }, void 0, !1, {
        fileName: "app/routes/results.tsx",
        lineNumber: 55,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/results.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.Typography, { children: "2nd Place:" }, void 0, !1, {
        fileName: "app/routes/results.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      sortedPlayerData.length > 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.Typography, { children: sortedPlayerData[1].name }, void 0, !1, {
        fileName: "app/routes/results.tsx",
        lineNumber: 61,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/results.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.Typography, { children: "3rd Place:" }, void 0, !1, {
        fileName: "app/routes/results.tsx",
        lineNumber: 65,
        columnNumber: 9
      }, this),
      sortedPlayerData.length > 2 && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.Typography, { children: sortedPlayerData[2].name }, void 0, !1, {
        fileName: "app/routes/results.tsx",
        lineNumber: 67,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/results.tsx",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.Typography, { children: "Most Skinz:" }, void 0, !1, {
        fileName: "app/routes/results.tsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      mostSkinzPlayers.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.Typography, { children: mostSkinzPlayers.map((player) => player.name).join(", ") }, void 0, !1, {
        fileName: "app/routes/results.tsx",
        lineNumber: 73,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/results.tsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.TableContainer, { component: import_material5.Paper, children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.Table, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.TableHead, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.TableRow, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.TableCell, { children: "Player Name" }, void 0, !1, {
          fileName: "app/routes/results.tsx",
          lineNumber: 82,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.TableCell, { children: "Total Wins" }, void 0, !1, {
          fileName: "app/routes/results.tsx",
          lineNumber: 83,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.TableCell, { children: "Total Points" }, void 0, !1, {
          fileName: "app/routes/results.tsx",
          lineNumber: 84,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.TableCell, { children: "Total Skinz" }, void 0, !1, {
          fileName: "app/routes/results.tsx",
          lineNumber: 85,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/results.tsx",
        lineNumber: 81,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/results.tsx",
        lineNumber: 80,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.TableBody, { children: sortedPlayerData.map((player) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.TableRow, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.TableCell, { children: player.name }, void 0, !1, {
          fileName: "app/routes/results.tsx",
          lineNumber: 91,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.TableCell, { children: player.wins }, void 0, !1, {
          fileName: "app/routes/results.tsx",
          lineNumber: 92,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.TableCell, { children: player.points }, void 0, !1, {
          fileName: "app/routes/results.tsx",
          lineNumber: 93,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_material5.TableCell, { children: player.skinz }, void 0, !1, {
          fileName: "app/routes/results.tsx",
          lineNumber: 94,
          columnNumber: 17
        }, this)
      ] }, player.id, !0, {
        fileName: "app/routes/results.tsx",
        lineNumber: 90,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "app/routes/results.tsx",
        lineNumber: 88,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/results.tsx",
      lineNumber: 79,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/results.tsx",
      lineNumber: 78,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/results.tsx",
    lineNumber: 48,
    columnNumber: 5
  }, this);
}, results_default = ResultsPage;

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta
});
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), meta = () => [
  { title: "Skinz" },
  { name: "description", content: "Welcome to Remix!" }
];
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
    "div",
    {
      style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }
    },
    void 0,
    !1,
    {
      fileName: "app/routes/_index.tsx",
      lineNumber: 13,
      columnNumber: 5
    },
    this
  );
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-47UANIVL.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-VKBH4ZJP.js", "/build/_shared/chunk-JC6JYJ3W.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-U2ZXMFGW.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-ESXMMA75.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-WSDS2ZZT.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/matchups": { id: "routes/matchups", parentId: "root", path: "matchups", index: void 0, caseSensitive: void 0, module: "/build/routes/matchups-3SJANJKY.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/players": { id: "routes/players", parentId: "root", path: "players", index: void 0, caseSensitive: void 0, module: "/build/routes/players-SUNKA4RA.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/results": { id: "routes/results", parentId: "root", path: "results", index: void 0, caseSensitive: void 0, module: "/build/routes/results-U6HPQ6DJ.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "284fd26f", hmr: { runtime: "/build/_shared/chunk-U2ZXMFGW.js", timestamp: 1693107473699 }, url: "/build/manifest-284FD26F.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_dev: !0, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !0, v2_headers: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/matchups": {
    id: "routes/matchups",
    parentId: "root",
    path: "matchups",
    index: void 0,
    caseSensitive: void 0,
    module: matchups_exports
  },
  "routes/players": {
    id: "routes/players",
    parentId: "root",
    path: "players",
    index: void 0,
    caseSensitive: void 0,
    module: players_exports
  },
  "routes/results": {
    id: "routes/results",
    parentId: "root",
    path: "results",
    index: void 0,
    caseSensitive: void 0,
    module: results_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
/*! Bundled license information:

@remix-run/css-bundle/dist/index.js:
  (**
   * @remix-run/css-bundle v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
//# sourceMappingURL=index.js.map
