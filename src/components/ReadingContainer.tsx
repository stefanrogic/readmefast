"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ReadingContainer({ paragraph }: { paragraph: string[] }) {
  const [pause, setPause] = useState<boolean>(true);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [word, setWord] = useState<string>("");
  const [defaultSpeed, setDefaultSpeed] = useState<number>(300);
  const [currentSpeed, setCurrentSpeed] = useState<number>(300);

  const variants = {
    hide: { opacity: 0 },
    show: { opacity: 1, transition: { opacity: { duration: 1 } } },
  };

  const buttonDefaultStyle =
    "bg-[#ffffff] p-5 text-[#000000] font-bold transition duration-100 ease-in-out hover:bg-[#adadad] hover:text-[#ffffff]";

  useEffect(() => {
    const handleSpeed = (speed: number, condition: boolean) => {
      if (condition) {
        setCurrentSpeed(defaultSpeed + speed);
        setTimeout(
          () =>
            word.endsWith(".")
              ? setCurrentSpeed(defaultSpeed)
              : setCurrentSpeed(defaultSpeed + speed),
          defaultSpeed + speed,
        );
      }
    };

    //? Uspori na duzim recima
    handleSpeed(200, word.length > 10);
    //? Uspori na pocetku i kad je kraj recenice
    handleSpeed(500, wordIndex === 0 || word.endsWith("."));
    //? Uspori kad je zarez
    handleSpeed(200, word.endsWith(","));
    //? Pauziraj kad se zavrsi citanje paragrafa
    if (wordIndex === paragraph?.length) setPause(true);
    //////////////////////////////////////////////////////////
  }, [paragraph, word, wordIndex, defaultSpeed]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pause && wordIndex < paragraph?.length) {
        setWordIndex(
          wordIndex < paragraph?.length ? wordIndex + 1 : paragraph?.length,
        );
        setWord(paragraph[wordIndex]!);
      } else clearTimeout(timer);
    }, currentSpeed);

    return () => {
      clearInterval(timer);
    };
  }, [paragraph, pause, wordIndex, currentSpeed]);

  return (
    <>
      <nav className="fixed bottom-0 z-50 flex w-full flex-row justify-between p-[50px] opacity-50 transition duration-150 ease-in-out hover:opacity-100">
        <div className="flex flex-row gap-2">
          <AnimatePresence>
            <motion.span
              className="me-[25px] mt-auto text-wrap text-center"
              variants={variants}
              initial="hide"
              animate="show"
              exit="hide"
            >
              {pause
                ? `Default WPS: ${defaultSpeed}ms`
                : `Current WPS: ${currentSpeed}ms`}
            </motion.span>
          </AnimatePresence>

          <AnimatePresence>
            {pause ? (
              <>
                <motion.button
                  key={1}
                  className={buttonDefaultStyle}
                  variants={variants}
                  initial="hide"
                  animate="show"
                  exit="hide"
                  onClick={() =>
                    setDefaultSpeed(defaultSpeed > 0 ? defaultSpeed - 100 : 0)
                  }
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </motion.button>

                <motion.button
                  key={0}
                  className={buttonDefaultStyle}
                  variants={variants}
                  initial="hide"
                  animate="show"
                  exit="hide"
                  onClick={() => setDefaultSpeed(defaultSpeed + 100)}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </motion.button>
              </>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="mt-auto flex flex-row gap-2">
          <AnimatePresence>
            {wordIndex !== 0 ? (
              <motion.button
                key={0}
                className={buttonDefaultStyle}
                variants={variants}
                initial="hide"
                animate="show"
                exit="hide"
                onClick={() => {
                  setPause(true);
                  setWordIndex(0);
                  setWord("");
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </motion.button>
            ) : null}

            <motion.button
              key={1}
              className={buttonDefaultStyle}
              variants={variants}
              initial="hide"
              animate="show"
              exit="hide"
              onClick={() => setPause(!pause)}
            >
              <AnimatePresence>
                {pause ? (
                  <motion.svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    variants={variants}
                    initial="hide"
                    animate="show"
                    exit="hide"
                  >
                    <path
                      d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </motion.svg>
                ) : (
                  <motion.svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    variants={variants}
                    initial="hide"
                    animate="show"
                    exit="hide"
                  >
                    <path
                      d="M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </AnimatePresence>
        </div>
      </nav>

      <div className="flex h-[100vh] flex-row items-center justify-center gap-20 p-[50px]">
        <AnimatePresence>
          {pause ? (
            <motion.div
              className="flex max-h-[80%] w-1/3 items-start justify-start bg-white text-black"
              initial={{ width: 0 }}
              animate={{ width: "33%" }}
              exit={{ width: 0 }}
            >
              <motion.p
                key={0}
                className="mx-10 my-36 hidden xl:block"
                variants={variants}
                initial="hide"
                animate="show"
                exit="hide"
              >
                <h2 className="mb-5 text-center text-2xl font-bold">
                  Mali Princ - Odlomak
                </h2>
                {paragraph.map((p, i) => (
                  <>
                    <span
                      key={i}
                      className={i === wordIndex - 1 ? "bg-slate-500" : ""}
                    >
                      {p + " "}
                    </span>
                  </>
                ))}
              </motion.p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="flex w-2/3 flex-col items-center justify-center gap-2">
          <AnimatePresence>
            <motion.h1 className="text-center text-7xl font-bold">
              {word}
            </motion.h1>

            {pause ? (
              <motion.span
                key={0}
                className="text-center text-xl font-light text-[#bdbdbd]"
                variants={variants}
                initial="hide"
                animate="show"
                exit="hide"
              >
                Mali Princ - Odlomak
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
