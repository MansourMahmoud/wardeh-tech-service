import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PackageModal from "../../components/PackageModal";

const PackagesDeals = ({ isDarkModeActive }) => {
  const [open, setOpen] = useState(false);
  const [packageItem, setPackageItem] = useState(null);

  const packagesList = [
    {
      id: 1,
      packageName: "الباقة الذهبية",
      packageContent: "كاميرات مراقبة هيكفيجن 5 ميجا بكسل 4 للعرض والتسجيل",
      numOfEntrances: "4",
      typeOfEntrances: "DVR",
      hardDriveSpace: "2 تيرا بايت",
      numOfConnectors: "8",
      numOfBNC: "8",
      numOfProtectionBoxes: "4",
      comeWith: "واحد محول كهربائي",
      price: 500,
      color: "#FFD700",
    },
    {
      id: 2,
      packageName: "الباقة الفضية",
      packageContent: " كاميرات مراقبة هيكفيجن 5 ميجا بكسل 4 للعرض والتسجيل",
      numOfEntrances: "8",
      typeOfEntrances: "DVR",
      hardDriveSpace: "4 تيرا بايت",
      numOfConnectors: "12",
      numOfBNC: "12",
      numOfProtectionBoxes: "6",
      comeWith: "واحد محول كهربائي",
      price: 300,
      color: "#C0C0C0",
    },
    {
      id: 3,
      packageName: "الباقة البرونزية",
      packageContent:
        "كاميرات مراقبة هيكفيجن 5 ميجا بكسل مزودة بتقنية ColorVu 4 للعرض والتسجيل",
      numOfEntrances: "4",
      typeOfEntrances: "DVR",
      hardDriveSpace: "2 تيرا بايت",
      numOfConnectors: "8",
      numOfBNC: "8",
      numOfProtectionBoxes: "4",
      comeWith: "واحد محول كهربائي",
      price: 200,
      color: "#CD7F32",
    },
    {
      id: 4,
      packageName: "الباقة الماسية",
      packageContent:
        "كاميرات مراقبة هيكفيجن 5 ميقا بكسل مزودة بتقنية ColorVu 6 للعرض والتسجيل ",
      numOfEntrances: "8",
      typeOfEntrances: "DVR",
      hardDriveSpace: "4 تيرا بايت",
      numOfConnectors: "12",
      numOfBNC: "12",
      numOfProtectionBoxes: "6",
      comeWith: "واحد محول كهربائي",
      price: 100,
      color: "#B9F2FF",
    },
  ];

  const handleOpen = (item) => {
    setPackageItem(item);
    setOpen(!open);
  };

  return (
    <>
      <div>
        <PackageModal
          setPackageItem={setPackageItem}
          packageItem={packageItem}
          open={open}
          setOpen={setOpen}
        />
      </div>
      <div className="flex flex-col gap-10">
        {/* header */}
        <div className="flex justify-center items-center   p-5">
          <p className="text-3xl dark:text-darkMode-dark50">
            عـــروض البــاقـات
          </p>
        </div>
        {/* end */}
        {/* packages body */}
        <div>
          <div className="pr-[2rem] md:pr-[4rem] text-xl md:text-2xl shadow dark:shadow-darkMode-dark500 py-5 mb-5 dark:text-darkMode-dark50">
            <p>عروض باقات نظام إنذار السرقة (Burglar Alarm System): BAS </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto justify-center gap-5 px-5">
            {packagesList?.map((item, index) => (
              <Card
                key={index}
                className="mt-6 dark:bg-darkMode-dark800 shadow dark:shadow-darkMode-dark400"
              >
                <CardBody className="flex flex-col gap-5 w-full px-0">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className={`text-2xl text-darkMode-dark800 tracking-wide py-2 text-center`}
                    style={{ backgroundColor: `${item?.color}` }}
                  >
                    {item?.packageName}
                  </Typography>

                  <Typography className="text-center text-xl dark:text-darkMode-dark50 text-darkMode-dark950 px-4 text-ellipsis overflow-hidden ...">
                    {item?.packageContent}{" "}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex items-end h-full justify-center">
                  <Button
                    onClick={() => handleOpen(item && item)}
                    fullWidth
                    className="dark:bg-darkMode-dark800 dark:border-[1px] dark:border-darkMode-dark300 dark:text-darkMode-dark50 shadow dark:shadow-darkMode-dark50 hover:shadow p-2"
                    variant="outlined"
                  >
                    شاهد المزيد
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        {/* end body */}
      </div>
    </>
  );
};

export default PackagesDeals;
