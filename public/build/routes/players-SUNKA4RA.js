import {
  useNavigate
} from "/build/_shared/chunk-VKBH4ZJP.js";
import {
  Button_default,
  TableBody_default,
  TableCell_default,
  TableContainer_default,
  TableHead_default,
  TableRow_default,
  Table_default,
  TextField_default
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

// app/routes/players.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/players.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/players.tsx"
  );
  import.meta.hot.lastModified = "1693093840866.8015";
}
var PlayerForm = () => {
  _s();
  const [players, setPlayers] = (0, import_react.useState)([]), [newPlayerName, setNewPlayerName] = (0, import_react.useState)(""), [editingPlayer, setEditingPlayer] = (0, import_react.useState)(null), navigate = useNavigate();
  (0, import_react.useEffect)(() => {
    const savedPlayers = localStorage.getItem("players");
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }
  }, []);
  (0, import_react.useEffect)(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);
  const handlePlayerNameChange = (event) => {
    setNewPlayerName(event.target.value);
  };
  const addPlayer = () => {
    if (players.length < 8 && newPlayerName.trim() !== "") {
      const isNameTaken = players.some((player) => player.name === newPlayerName);
      if (!isNameTaken) {
        const newPlayer = {
          id: Date.now(),
          // Assign a unique ID
          name: newPlayerName,
          wins: 0,
          skinz: 0,
          points: 0
        };
        setPlayers([...players, newPlayer]);
        setNewPlayerName("");
        if (players.length + 1 === 8) {
          setNewPlayerName("");
        }
      } else {
        alert("Player name already exists.");
      }
    }
  };
  const editPlayerName = (player) => {
    setEditingPlayer(player);
  };
  const saveEditedName = (player, newName) => {
    const updatedPlayers = players.map((p) => p.id === player.id ? {
      ...p,
      name: newName
    } : p);
    setPlayers(updatedPlayers);
    setEditingPlayer(null);
  };
  const incrementSkinz = (id) => {
    const updatedPlayers = players.map((player) => player.id === id ? {
      ...player,
      skinz: player.skinz + 1
    } : player);
    setPlayers(updatedPlayers);
  };
  const handleClearTable = () => {
    setPlayers([]);
    setNewPlayerName("");
    setEditingPlayer(null);
  };
  const handleDeleteRow = (id) => {
    const updatedPlayers = players.filter((player) => player.id !== id);
    setPlayers(updatedPlayers);
    setEditingPlayer(null);
  };
  const isTextFieldDisabled = players.length >= 8 || !!editingPlayer;
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addPlayer();
    }
  };
  const generateMatchups = () => {
    if (players.length === 8) {
      const matchups = [];
      const rounds = 7;
      for (let round = 0; round < rounds; round++) {
        const roundMatchups = [];
        const shuffledPlayers = shuffleArray(players);
        for (let i = 0; i < shuffledPlayers.length; i += 4) {
          const matchup = {
            team1: [shuffledPlayers[i], shuffledPlayers[i + 1]],
            team2: [shuffledPlayers[i + 2], shuffledPlayers[i + 3]]
          };
          roundMatchups.push(matchup);
        }
        matchups.push(roundMatchups);
      }
      localStorage.setItem("matchups", JSON.stringify(matchups));
      navigate("/matchups");
    } else {
      alert("You need exactly 8 players to generate matchups.");
    }
  };
  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField_default, { label: "Player Name", value: newPlayerName, onChange: handlePlayerNameChange, onKeyDown: handleKeyDown, disabled: isTextFieldDisabled }, void 0, false, {
      fileName: "app/routes/players.tsx",
      lineNumber: 139,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button_default, { variant: "contained", color: "primary", onClick: addPlayer, children: "Add Player" }, void 0, false, {
      fileName: "app/routes/players.tsx",
      lineNumber: 140,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button_default, { variant: "contained", color: "secondary", onClick: handleClearTable, children: "Clear Table" }, void 0, false, {
      fileName: "app/routes/players.tsx",
      lineNumber: 143,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button_default, { variant: "contained", color: "primary", onClick: generateMatchups, disabled: players.length !== 8, children: "Generate Matchups" }, void 0, false, {
      fileName: "app/routes/players.tsx",
      lineNumber: 146,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableContainer_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table_default, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow_default, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: "Name" }, void 0, false, {
          fileName: "app/routes/players.tsx",
          lineNumber: 153,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: "Wins" }, void 0, false, {
          fileName: "app/routes/players.tsx",
          lineNumber: 154,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: "Skinz" }, void 0, false, {
          fileName: "app/routes/players.tsx",
          lineNumber: 155,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: "Actions" }, void 0, false, {
          fileName: "app/routes/players.tsx",
          lineNumber: 156,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/players.tsx",
        lineNumber: 152,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/players.tsx",
        lineNumber: 151,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableBody_default, { children: players.map((player) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow_default, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: (editingPlayer == null ? void 0 : editingPlayer.id) === player.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField_default, { value: editingPlayer.name, onChange: (e) => setEditingPlayer({
          ...editingPlayer,
          name: e.target.value
        }) }, void 0, false, {
          fileName: "app/routes/players.tsx",
          lineNumber: 162,
          columnNumber: 54
        }, this) : player.name }, void 0, false, {
          fileName: "app/routes/players.tsx",
          lineNumber: 161,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: player.wins }, void 0, false, {
          fileName: "app/routes/players.tsx",
          lineNumber: 167,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: [
          player.skinz,
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button_default, { variant: "contained", color: "primary", onClick: () => incrementSkinz(player.id), children: "+" }, void 0, false, {
            fileName: "app/routes/players.tsx",
            lineNumber: 170,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/players.tsx",
          lineNumber: 168,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell_default, { children: (editingPlayer == null ? void 0 : editingPlayer.id) === player.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button_default, { variant: "contained", color: "primary", onClick: () => saveEditedName(editingPlayer, editingPlayer.name), children: "Save" }, void 0, false, {
          fileName: "app/routes/players.tsx",
          lineNumber: 175,
          columnNumber: 54
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button_default, { variant: "contained", color: "primary", onClick: () => editPlayerName(player), children: "Edit" }, void 0, false, {
            fileName: "app/routes/players.tsx",
            lineNumber: 178,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button_default, { variant: "contained", color: "secondary", onClick: () => handleDeleteRow(player.id), children: "Delete" }, void 0, false, {
            fileName: "app/routes/players.tsx",
            lineNumber: 181,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/players.tsx",
          lineNumber: 177,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "app/routes/players.tsx",
          lineNumber: 174,
          columnNumber: 17
        }, this)
      ] }, player.id, true, {
        fileName: "app/routes/players.tsx",
        lineNumber: 160,
        columnNumber: 36
      }, this)) }, void 0, false, {
        fileName: "app/routes/players.tsx",
        lineNumber: 159,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/players.tsx",
      lineNumber: 150,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/players.tsx",
      lineNumber: 149,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/players.tsx",
    lineNumber: 138,
    columnNumber: 10
  }, this);
};
_s(PlayerForm, "4v1+DWxk+ABw2TtcLvc6pZkCU0Q=", false, function() {
  return [useNavigate];
});
_c = PlayerForm;
var players_default = PlayerForm;
var _c;
$RefreshReg$(_c, "PlayerForm");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  players_default as default
};
//# sourceMappingURL=/build/routes/players-SUNKA4RA.js.map
