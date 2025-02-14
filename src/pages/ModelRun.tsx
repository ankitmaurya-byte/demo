import React, { useContext, useEffect, useState } from "react";
// import { CloudUploadIcon } from "@heroicons/react/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faArrowLeft,
  faArrowRight,
  faCircleArrowLeft,
  faCircleArrowRight,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/ui/button";
import ModelConfiguration from "./ModelConfiguration";
import { StepperProgressContext } from "../App";
import { maincontainer } from "./Home";

interface MainContainerContext {
  current: HTMLDivElement | null;
  pages: React.FC[];
  setPages: React.Dispatch<React.SetStateAction<React.FC[]>>;
}
const ModelRun = () => {
  const { setActiveStep } = useContext(StepperProgressContext) as {
    setActiveStep: (value: React.SetStateAction<number>) => void;
  };
  const [fileType, setFileType] = useState("Xlxs");
  const [priceBasedOn, setPriceBasedOn] = useState("Ton");

  const handleFileTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileType(event.target.value);
  };

  const handlePriceBasedOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceBasedOn(event.target.value);
  };

  const handleUpload = () => {
    console.log("File uploaded");
  };
  const mainContent = useContext(maincontainer) as MainContainerContext;
  const [navigateBack, setNavigateBack] = useState(false);

  const handleNavigateBack = (component: React.FC) => {
    setNavigateBack((prev) => !prev);
    mainContent.setPages((prev) => [...prev, component]);

    mainContent.current?.scrollTo({
      left: mainContent.current.scrollWidth / mainContent.pages.length,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    console.log("navigateBack" + navigateBack);
    if (mainContent.current && navigateBack) {
      setNavigateBack((prev) => !prev);
      console.log(mainContent.pages);
      mainContent.current.scrollTo({
        left: mainContent.current.scrollWidth / mainContent.pages.length,
        behavior: "smooth",
      });
      // setTimeout(() => {
      //   mainContent.current.scrollTo({
      //     left: 0,
      //     behavior: "smooth",
      //   });
      // }, 100);
      setTimeout(() => {
        mainContent.setPages((prev) => prev.slice(1));
      }, 1000);
    }
  }, [navigateBack]);
  return (
    <div className="flex h-full items-center rounded-lg w-full  mx-auto">
      <div className="bg-gray-900 bg-opacity-75  p-8 rounded-lg h-[75%] grid grid-rows-3   text-white place-items-center w-[80%] mx-auto">
        <div className="flex justify-center  h-full items-center gap-4">
          <img
            className="h-[60%]"
            src="/vecteezy_green-check-mark-icon-png-on-transparent-background_16774415.png"
            alt=""
          />
          <h1 className="text-2xl">All configuration saved and sucessfully!</h1>
        </div>
        <div className="flex h-full justify-center items-center gap-4">
          <img className="h-[60%]" src="/gif/Post-unscreen.gif" alt="" />
          <Button className="bg-yellow-600 text-gray-800 text-2xl py-8 px-12 hover:bg-yellow-700 font-bold">
            {" "}
            RUN THE MODEL
          </Button>
          <FontAwesomeIcon
            className="text-yellow-600 text-6xl font-bold"
            icon={faAnglesRight}
          />
        </div>
        <div className=" gap-4 flex justify-self-center items-center flex-col">
          <div>
            <div
              onClick={() => {
                setActiveStep((prev: number) => prev - 1);
                handleNavigateBack(ModelConfiguration);
              }}
              className="text-yellow-600 hover:text-yellow-700 font-bold"
            >
              Back to model configuration
            </div>
          </div>
          <div>
            <div
              onClick={() => {
                setActiveStep((prev: number) => prev - 1);
                handleNavigateBack(ModelConfiguration);
              }}
              className="text-yellow-600  hover:text-yellow-700 font-bold"
            >
              <FontAwesomeIcon size="lg" icon={faCircleArrowLeft} />
              Back to main
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelRun;
