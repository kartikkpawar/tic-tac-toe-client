import { Modal, InputBase } from "@material-ui/core";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import HomeBoard from "../../Assets/HomeBoard.svg";
import { ToastContainer, toast } from "react-toastify";
import "./HomePage.css";

const Homepage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");
  const history = useHistory();

  const handleStartGame = (event) => {
    event.stopPropagation();
    if (name === "") {
      return toast.error("Enter Your Name", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    history.push({ pathname: `/game/${nanoid(5)}`, state: { name: name } });
    setOpenModal(false);
  };
  const handleJoinGame = (event) => {
    event.stopPropagation();
    if (name === "" || gameId === "") {
      return toast.error("Enter all fields", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const regexString =
      "^(http://www.|https://www.|http://|https://)[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$";
    const regex = new RegExp(regexString);
    if (!gameId.match(regex)) {
      return toast.error("Enter valid game url", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const id = gameId.split("/").pop();
    history.push({ pathname: `/game/${id}`, state: { name: name } });
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="home">
      <div className="home__container">
        <div className="container__left">
          <div className="image__holder">
            {" "}
            <img src={HomeBoard} alt="" height="100%" width="100%" />
          </div>
        </div>
        <div className="container__right">
          <div className="button__container">
            <div
              className="home__button new__button"
              onClick={() => {
                setOpenModal(true);
                setModalType("new-game");
              }}
            >
              <span className="button__text">New Game</span>
            </div>
            <div
              className="home__button join__button"
              onClick={() => {
                setOpenModal(true);
                setModalType("join-game");
              }}
            >
              <span className="button__text">Join Game</span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalType === "new-game" ? (
          <div className="modal__body" onClick={handleClose}>
            <div className="body__conatiner">
              <div className="input__container">
                <InputBase
                  className="modal__input"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  onClick={(event) => event.stopPropagation()}
                />
              </div>
              <div className="modal__button__container">
                <div
                  className="new__button modal__button"
                  onClick={handleStartGame}
                >
                  <span className="button__text">Start Game</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal__body" onClick={handleClose}>
            <div className="body__conatiner">
              <div className="input__container">
                <InputBase
                  className="modal__input_2"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  onClick={(event) => event.stopPropagation()}
                />

                <InputBase
                  className="modal__input_2"
                  placeholder="Enter game id"
                  onChange={(e) => setGameId(e.target.value)}
                  value={gameId}
                  onClick={(event) => event.stopPropagation()}
                />
              </div>
              <div className="modal__button__container">
                <div
                  className="join__button__modal modal__button"
                  onClick={handleJoinGame}
                >
                  <span className="button__text">Join Game</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Homepage;
