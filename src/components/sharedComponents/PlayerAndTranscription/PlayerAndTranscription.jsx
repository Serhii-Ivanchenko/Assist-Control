export default function PlayerAndTranscription() {
  return (
    <div className={css.secondAcordionList}>
      <div className={css.secondAcordionWrapper}>
        <Accordion
          disableGutters={true}
          sx={{
            background: "none",
            color: "inherit",
            WebkitBoxShadow: "none",
          }}
        >
          <div className={css.secondAcordion}>
            <div className={css.callRecordWrapper}>
              <img src={userAvatar} alt="user avatar" />
              <AudioPlayer audio={audio} size="big" />
            </div>
            <AccordionSummary
              sx={{
                padding: "0",
              }}
            >
              <button
                className={css.transcriptionToggleBtn}
                onClick={() => toogleTranscription()}
              >
                <p>Aa</p>
                <BsChevronDown
                  className={clsx(
                    css.transcriptionIcon,
                    transcription ? css.activeTranscriptionIcon : null
                  )}
                  strokeWidth={3}
                  size={14}
                />
              </button>
            </AccordionSummary>
          </div>
          <AccordionDetails
            sx={{
              padding: "0",
            }}
          >
            <div className={css.scrollBarWrapper}>
              <div className={css.secondAcordionBody}>
                {/* <button className={css.transcriptionImportantBtn}>
                  <BsFilter />
                  <p>Головне</p>
                </button> */}
                              <MainInfo
                <ul className={css.messages}>
                  {messages.map(({ orClientMsg, time, message }) => (
                    <TranscriptionMessage
                      key={Math.random()}
                      orClientMsg={orClientMsg}
                      time={time}
                      message={message}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
