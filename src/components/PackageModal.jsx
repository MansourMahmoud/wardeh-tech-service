import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const PackageModal = ({ packageItem, open, setOpen }) => {
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Dialog
        className="dark:bg-darkMode-dark800"
        open={open}
        handler={handleOpen}
      >
        <DialogHeader
          style={{ backgroundColor: `${packageItem?.color}` }}
          className="flex justify-center mt-5 mb-8 tracking-wider text-4xl shadow-md dark:shadow-white"
        >
          {packageItem?.packageName}
        </DialogHeader>
        <DialogBody className="min-h-[18rem] flex flex-col gap-5 text-darkMode-dark800 dark:text-darkMode-dark50 text-xl font-bold">
          <p>
            الباقة تحتوي علي :{" "}
            <span className="text-green-600 tracking-wide">
              {packageItem?.packageContent}
            </span>
          </p>
          <div className="flex items-center">
            <p className="w-1/2">
              مزودة بعدد :{" "}
              <span className="text-green-600 tracking-wide">
                {packageItem?.numOfEntrances}
              </span>{" "}
              مداخل جهاز{" "}
              <span className="text-green-600 tracking-wide">
                {packageItem?.typeOfEntrances}
              </span>
            </p>
            <p className="w-1/2">
              بمساحة :{" "}
              <span className="text-green-600 tracking-wide">
                {packageItem?.hardDriveSpace}
              </span>
            </p>
          </div>

          {/* start */}
          <div className="flex items-center">
            <p className="w-1/2">
              مزودة بعدد :{" "}
              <span className="text-green-600 tracking-wide">
                {packageItem?.numOfConnectors}
              </span>{" "}
              كونكتور
            </p>
            <p className="w-1/2">
              مزودة بعدد :{" "}
              <span className="text-green-600 tracking-wide">
                {packageItem?.numOfBNC}
              </span>{" "}
              BNC
            </p>
          </div>
          {/* end */}
          <p>
            تأتي مع :{" "}
            <span className="text-green-600 tracking-wide">
              {packageItem?.comeWith}
            </span>
          </p>
          <div className="flex justify-center grow items-end flex-wrap">
            <p
              style={{ backgroundColor: `${packageItem?.color}` }}
              className="p-2 px-8 rounded-md text-black font-extrabold shadow-md dark:shadow-white"
            >
              كـل هـذا وحصـريـا{" "}
              <span className="underline underline-offset-8">
                ب{packageItem?.price}
              </span>{" "}
              ريــال فــقط
            </p>
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-2 items-center justify-start">
          <Link to={`/packages-deals-form`}>
            <Button
              variant="gradient"
              color="green"
              className="text-lg px-5 py-2"
              onClick={handleOpen}
            >
              اطلب الآن!
            </Button>
          </Link>
          <Button
            variant="text"
            className="text-lg px-4 py-2 dark:text-darkMode-dark50"
            color="blue-gray"
            onClick={handleOpen}
          >
            خروج
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default PackageModal;
