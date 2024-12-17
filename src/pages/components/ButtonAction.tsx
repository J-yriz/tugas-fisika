const ButtonAction = ({ pausePlay, handlePausePlay }: { pausePlay: boolean; handlePausePlay: () => void }) => {
  return (
    <button type="button" className="" onClick={handlePausePlay}>
      { pausePlay ? <img src="/pause.png" alt="Pause" width={24} /> : <img src="/play.svg" alt="Play" width={24} /> }
    </button>
  );
};

export default ButtonAction;
