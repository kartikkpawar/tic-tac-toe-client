import { useEffect, useState } from "react";
import OActive from "../../Assets/O.svg";
import ODisabled from "../../Assets/O-Disabled.svg";
import XActive from "../../Assets/X.svg";
import XDisabled from "../../Assets/X-Disabled.svg";
import "./GamePage.css";
import Header from "../../Components/Header/Header";
import io from "socket.io-client";
import XOIcon from "../../Components/XO Icon/XOIcon";
import { BiCopyAlt } from "react-icons/bi";
import { AiOutlineReload } from "react-icons/ai";
import { Redirect, useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const socket = io.connect("https://tic-tac-toe-server-5577.onrender.com");
// const socket = io.connect("http://localhost:5000");

const Gamepage = () => {
  const [oIsActive, setOIsActive] = useState(true);
  const [winMessage, setWinMessage] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const location = useLocation();
  const roomId = useParams().gameId;
  const [socketName, setSocketName] = useState("Waiting.....");

  useEffect(() => {
    if (location.state === undefined) {
      return setIsRedirect(true);
    }
    socket.emit("connect-room", {
      roomId: roomId,
      name: location.state.name,
    });
  }, [location.state, roomId]);
  useEffect(() => {
    socket.on("connection-success", (payload) => {
      setSocketName(payload.name);
    });
    socket.on("game-data", (payload) => {
      setItemArray(payload.board);
      setOIsActive(!oIsActive);
    });
    socket.on("game-progress", (payload) => {
      setWinMessage(payload.message);
    });
    socket.on("game-reload", () => {
      setItemArray(new Array(9).fill("empty"));
      setWinMessage("");
    });
  });

  const socketWinner = (winnerMsg) => {
    setWinMessage(winnerMsg);
    socket.emit("game-progress", {
      roomId: roomId,
      message: winnerMsg,
    });
  };

  const checkIsWinner = () => {
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      socketWinner(`${itemArray[0]} wins`);
    } else if (
      itemArray[0] === itemArray[3] &&
      itemArray[0] === itemArray[6] &&
      itemArray[0] !== "empty"
    ) {
      socketWinner(`${itemArray[0]} wins`);
    } else if (
      itemArray[0] === itemArray[4] &&
      itemArray[0] === itemArray[8] &&
      itemArray[0] !== "empty"
    ) {
      socketWinner(`${itemArray[0]} wins`);
    } else if (
      itemArray[1] === itemArray[4] &&
      itemArray[1] === itemArray[7] &&
      itemArray[1] !== "empty"
    ) {
      socketWinner(`${itemArray[1]} wins`);
    } else if (
      itemArray[2] === itemArray[5] &&
      itemArray[2] === itemArray[8] &&
      itemArray[2] !== "empty"
    ) {
      socketWinner(`${itemArray[2]} wins`);
    } else if (
      itemArray[2] === itemArray[4] &&
      itemArray[2] === itemArray[6] &&
      itemArray[2] !== "empty"
    ) {
      socketWinner(`${itemArray[2]} wins`);
    } else if (
      itemArray[3] === itemArray[4] &&
      itemArray[3] === itemArray[5] &&
      itemArray[3] !== "empty"
    ) {
      socketWinner(`${itemArray[3]} wins`);
    } else if (
      itemArray[6] === itemArray[7] &&
      itemArray[6] === itemArray[8] &&
      itemArray[6] !== "empty"
    ) {
      socketWinner(`${itemArray[6]} wins`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[1] !== "empty" &&
      itemArray[2] !== "empty" &&
      itemArray[3] !== "empty" &&
      itemArray[4] !== "empty" &&
      itemArray[5] !== "empty" &&
      itemArray[6] !== "empty" &&
      itemArray[7] !== "empty" &&
      itemArray[8] !== "empty"
    ) {
      setWinMessage("The game is draw");
      socket.emit("game-progress", {
        roomId: roomId,
        message: "The Game Is Draw",
      });
    }
  };
  const [itemArray, setItemArray] = useState(new Array(9).fill("empty"));

  const handelChange = (itemNumber) => {
    if (winMessage !== "") {
      return socketWinner(winMessage);
    }
    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = oIsActive ? "circle" : "cross";
      socket.emit("xo-board", {
        roomId: roomId,
        xoBoard: itemArray,
      });
      setOIsActive(!oIsActive);
    } else {
      return toast.warn("Already filled", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    checkIsWinner();
  };
  const handleCopy = () => {
    const input = document.getElementById("share__input");
    input.disabled = false;
    input.select();
    document.execCommand("copy");
    input.disabled = true;

    return toast.success("Copied 👍👍", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleGameReload = () => {
    setItemArray(new Array(9).fill("empty"));
    setWinMessage("");
    socket.emit("game-reload", {
      roomId: roomId,
      xoBoard: [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
    });
  };

  return (
    <div className="game__container">
      <Header />
      <div className="share__id">
        <div className="share__container">
          {" "}
          <div className="share__msg">
            {" "}
            <input
              type="text"
              id="share__input"
              value={`${process.env.REACT_APP_SERVER_URL}${location.pathname}`}
              disabled={true}
            />
            <BiCopyAlt className="share__copy" onClick={handleCopy} />
          </div>
          <span>Share with your friends and play</span>
        </div>
      </div>
      {isRedirect && <Redirect to="/" />}
      <div className="board__conatiner">
        <div className="game__left">
          <div className="side__container">
            <span className="player__name">{location?.state?.name}</span>
            <div className="player__states">
              <img src={oIsActive ? OActive : ODisabled} alt="" height="100%" />
              <img
                src={!oIsActive ? OActive : ODisabled}
                alt=""
                height="100%"
              />
            </div>
          </div>
        </div>
        <div className="game__center">
          <div className="win__message">
            <span>{winMessage}</span>
            <AiOutlineReload
              onClick={handleGameReload}
              className="reload__icon"
            />
          </div>
          <div className="grid__container">
            <div className="game__board">
              {itemArray?.map((item, index) => (
                <div
                  className="card"
                  onClick={() => {
                    handelChange(index);
                  }}
                >
                  <XOIcon name={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="game__right">
          <div className="side__container">
            <span className="player__name">{socketName}</span>
            <div className="player__states">
              <img src={oIsActive ? XActive : XDisabled} alt="" height="100%" />
              <img
                src={!oIsActive ? XActive : XDisabled}
                alt=""
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Gamepage;
