import React, { useEffect, useRef, useState } from "react";
import Container from "../../components/Container";
import { TERipple } from "tw-elements-react";
import {
  Input,
  Button,
  Menu,
  MenuHandler,
  Textarea,
  Select,
  Option,
  Badge,
  Spinner,
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Radio,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Quote = ({ isDarkModeActive }) => {
  const myFrom = useRef(null);
  const [message, setMessage] = useState({
    fullName: "",
    phone: "",
    email: "",
    logoName: "",
    whatIsLogoLanguages: "",
    whatIsShortcutInLogo: "",
    companyVision: "",
    advertisingPhrase: "",
    targetConsumerSegment: {
      kind: [
        {
          name: "الذكور",
          isChecked: false,
        },
        {
          name: "الإناث",
          isChecked: false,
        },
      ],
      age: {
        from: "",
        to: "",
      },
      geographicalArea: "",
    },
    natureOfWork: "",
    differenceFromCompetitors: "",
    attractiveLogos: "",
    additionalNotes: "",
    contentOldLogo: "",
    colorsContent: "",
  });

  const [formLoading, setFormLoading] = useState(false);

  const [logoLanguages, setLogoLanguages] = useState([
    {
      name: "لغة واحدة",
      isChecked: false,
    },
    {
      name: "لغتان",
      isChecked: false,
    },
    {
      name: "أكثر",
      isChecked: false,
    },
  ]);
  const [isLogoLanguagesChecked, setIsLogoLanguagesChecked] = useState(null);

  const [isShortcutInLogo, setIsShortcutInLogo] = useState(null);
  const [isAdvertisingPhrase, setIsAdvertisingPhrase] = useState(null);
  const [isAdditionalNotes, setIsAdditionalNotes] = useState(null);
  const [images, setImages] = useState(null);
  const [wantToAddImages, setWantToAddImages] = useState(null);
  const [isOldLogo, setIsOldLogo] = useState(null);
  const [oldLogoImage, setOldLogoImages] = useState(null);

  const checkCheckbox = (arr) => arr.every((item) => item.isChecked === false);

  const handleMessage = async (ev) => {
    ev.preventDefault();

    const {
      fullName,
      phone,
      email,
      logoName,
      whatIsLogoLanguages,
      whatIsShortcutInLogo,
      companyVision,
      advertisingPhrase,
      targetConsumerSegment,
      natureOfWork,
      differenceFromCompetitors,
      attractiveLogos,
      contentOldLogo,
      colorsContent,
      additionalNotes,
    } = message;

    let formData = new FormData();

    const isEmailValid = (email) => {
      // ريجيولر إكسبريشن للتحقق من صحة الإيميل
      const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9]){2,}@(gmail|yahoo)\.com$/;
      return emailRegex.test(email);
    };

    const emailIsValid = isEmailValid(email);
    const isSaudiPhoneNumberValid = (phoneNumber) => {
      // ريجيولر إكسبريشن للتحقق من صحة رقم الهاتف السعودي
      const saudiPhoneNumberRegex =
        /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
      return saudiPhoneNumberRegex.test(phoneNumber);
    };
    // في داخل دالة handleMessage
    const phoneNumberIsValid = isSaudiPhoneNumberValid(phone);

    // fullName
    if (fullName === "") {
      return toast.error("تأكد من كتابة اسمك.");
    } else {
      formData.append("fullName", fullName);
    }
    //

    // phone
    if (!phoneNumberIsValid) {
      return toast.error(
        "خطأ في رقم الهاتف: تأكد من كتابة رقم الهاتف بشكل صحيح وبدون مسافات، والتأكد من تضمين رمز البلد إذا لزم الأمر."
      );
    } else {
      formData.append("phone", phone);
    }
    //

    // email
    if (!emailIsValid) {
      return toast.error("رجاءً، اكتب البريد الإلكتروني بشكل صحيح.");
    } else {
      formData.append("email", email);
    }
    //

    // logoName
    if (!logoName) {
      return toast.error(
        "رجاءً، أدخل الاسم الذي ترغب في استخدامه في تصميم الشعار."
      );
    } else {
      formData.append("logoName", logoName);
    }
    //

    // logoLanguages
    if (checkCheckbox(logoLanguages)) {
      return toast.error("رجاءً، أخبرنا بأي لغة سيكون الشعار؟");
    } else {
      logoLanguages?.forEach((item) => {
        if (item.isChecked === true) {
          formData.append("logoLanguages", item.name);
        }
      });
    }
    //

    // whatIsLogoLanguages
    if (!whatIsLogoLanguages) {
      return toast.error("رجاءً، أخبرنا ما هي اللغات المستخدمة؟");
    } else {
      formData.append("whatIsLogoLanguages", whatIsLogoLanguages);
    }
    //

    // isShortcutInLogo
    if (isShortcutInLogo === null) {
      return toast.error(
        "رجاء اخبرنا هل ترغب في استخدام أي اختصارات أو أحرف أولية في الشعار؟"
      );
    } else if (isShortcutInLogo === true && !whatIsShortcutInLogo) {
      return toast.error(
        "رجاءً، أخبرنا ما هي الاختصارات أو الأحرف الأولية في الشعار التي ترغب في استخدامها؟"
      );
    } else if (isShortcutInLogo === false) {
      formData.append("whatIsShortcutInLogo", "لا");
    } else {
      formData.append("whatIsShortcutInLogo", whatIsShortcutInLogo);
    }
    //

    // companyVision
    // if (!companyVision) {
    //   return toast.error("رجاء أخبرنا ما هي رؤية الشركة الخاصة بك");
    // } else {
    //   formData.append("companyVision", companyVision);
    // }
    if (companyVision) {
      formData.append("companyVision", companyVision);
    }
    //

    // isAdvertisingPhrase
    if (isAdvertisingPhrase === null) {
      return toast.error("رجاءً، أخبرنا هل لدى الشركة عبارة إعلانية معينة؟");
    } else if (isAdvertisingPhrase === true && !advertisingPhrase) {
      return toast.error(
        "رجاءً، قم بكتابة العبارة الإعلانية التي تملكها لشركتك."
      );
    } else if (isAdvertisingPhrase === false) {
      formData.append("advertisingPhrase", "لا");
    } else {
      formData.append("advertisingPhrase", advertisingPhrase);
    }
    //

    // targetConsumerSegment
    if (checkCheckbox(targetConsumerSegment.kind)) {
      return toast.error("الرجاء التحقق من اختيار الجنس");
    } else if (
      !targetConsumerSegment.age.from ||
      !targetConsumerSegment.age.to ||
      isNaN(targetConsumerSegment.age.from) ||
      isNaN(targetConsumerSegment.age.to)
    ) {
      return toast.error("الرجاء التحقق من كتابة العمر");
    } else if (!targetConsumerSegment.geographicalArea) {
      return toast.error("الرجاء التأكد من كتابة المنطقة الجغرافية المستهدفة.");
    } else {
      targetConsumerSegment.kind.forEach((item) => {
        if (item.isChecked === true) {
          formData.append("kind", item.name);
        }
      });
      formData.append(
        "age",
        `من ${targetConsumerSegment.age.from} الي ${targetConsumerSegment.age.to}`
      );
      formData.append(
        "geographicalArea",
        targetConsumerSegment.geographicalArea
      );
    }
    //

    // natureOfWork
    if (!natureOfWork) {
      return toast.error("رجاء أخبرنا ما هي طبيعة عملك.");
    } else {
      formData.append("natureOfWork", natureOfWork);
    }
    //

    // differenceFromCompetitors
    // if (!differenceFromCompetitors) {
    //   return toast.error("رجاء اخبرنا ما الذي يجعلك مختلفاً عن منافسيك؟");
    // } else {
    //   formData.append("differenceFromCompetitors", differenceFromCompetitors);
    // }
    if (differenceFromCompetitors) {
      formData.append("differenceFromCompetitors", differenceFromCompetitors);
    }
    //

    // attractiveLogos
    // if (!attractiveLogos) {
    //   return toast.error(
    //     "رجاء اخبرنا عن بعض الشعارات التي تعجبك أو تلفت انتباهك"
    //   );
    // } else {
    //   formData.append("attractiveLogos", attractiveLogos);
    // }
    if (attractiveLogos) {
      formData.append("attractiveLogos", attractiveLogos);
    }
    //

    // wantToAddImages
    if (wantToAddImages === null) {
      return toast.error(
        "رجاء أخبرنا هل ترغب في إدراج عناصر معينة في تصميم الشعار؟"
      );
    } else if (wantToAddImages === true && !images) {
      return toast.error("رجاء ارفق بعض العناصر في تصميم الشعار");
    } else if (wantToAddImages === false) {
      formData.append("wantToAddImages", "لا");
    } else {
      Array.from(images).forEach((img) => {
        formData.append("images", img);
      });
      formData.append(
        "wantToAddImages",
        "لقد قام العميل بإرفاق الصور، يمكنك العثور عليها في المرفقات"
      );
    }
    //

    // isOldLogo
    if (isOldLogo === null) {
      return toast.error("رجاءً، هل لديك شعار قديم؟");
    }
    // else if (isOldLogo === true && !contentOldLogo) {
    //   return toast.error("رجاء اخبرنا ما الذي لا يعجبك بشعارك القديم؟");
    // }
    else if (isOldLogo === false) {
      formData.append("isOldLogo", "لا");
    }
    if (isOldLogo === true && !oldLogoImage) {
      formData.append(
        "isOldLogo",
        "نعم ' ولكن لم يقم المستخدم بإرفاق صورة لشعاره القديم'"
      );
    }
    if (isOldLogo === true && contentOldLogo) {
      formData.append("contentOldLogo", contentOldLogo);
    }
    //

    // oldLogoImage
    if (isOldLogo === true && oldLogoImage) {
      Array.from(oldLogoImage).forEach((img) => {
        formData.append("images", img);
      });
      formData.append(
        "oldLogoImageChecked",
        "لقد أدرج المستخدم صورة للشعار القديم الخاص به."
      );
    }
    //

    // colorsContent
    // if (!colorsContent) {
    //   return toast.error(
    //     "رجاء اخبرنا ما الألوان التي تعجبك وترغب بإستخدامها في الشعار؟"
    //   );
    // } else {
    //   formData.append("colorsContent", colorsContent);
    // }
    if (colorsContent) {
      formData.append("colorsContent", colorsContent);
    }
    //

    //
    if (isAdditionalNotes === null) {
      return toast.error("رجاءً، أخبرنا ما هي الملاحظات التي تود إضافتها؟");
    } else if (isAdditionalNotes === true && !additionalNotes) {
      return toast.error("رجاءً، أخبرنا ما هي الملاحظات التي تود إضافتها؟");
    } else if (isAdditionalNotes === false) {
      formData.append("additionalNotes", "لا");
    } else {
      formData.append("additionalNotes", `نعم ${additionalNotes}`);
    }
    //

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      setFormLoading(true);

      // استخدام toast.promise للإشعارات //
      await toast.promise(
        axios.post(
          "https://wardeh-tech-service.onrender.com/send",
          formData,
          config
        ),
        {
          loading: "برجاء الانتظار قليلاً، جارٍّ إرسال رسالتك...",
          success: (res) => {
            setMessage({
              fullName: "",
              phone: "",
              email: "",
              logoName: "",
              whatIsLogoLanguages: "",
              whatIsShortcutInLogo: "",
              companyVision: "",
              advertisingPhrase: "",
              targetConsumerSegment: {
                kind: [
                  {
                    name: "الذكور",
                    isChecked: false,
                  },
                  {
                    name: "الإناث",
                    isChecked: false,
                  },
                ],
                age: "",
                geographicalArea: "",
              },
              natureOfWork: "",
              differenceFromCompetitors: "",
              attractiveLogos: "",
              additionalNotes: "",
              contentOldLogo: "",
              colorsContent: "",
            });

            setLogoLanguages([
              {
                name: "لغة واحدة",
                isChecked: false,
              },
              {
                name: "لغتان",
                isChecked: false,
              },
              {
                name: "أكثر",
                isChecked: false,
              },
            ]);
            setIsLogoLanguagesChecked(null);
            setIsShortcutInLogo(null);
            setIsAdvertisingPhrase(null);
            setIsAdditionalNotes(null);
            setImages(null);
            setWantToAddImages(null);
            setIsOldLogo(null);
            setOldLogoImages(null);

            return `${res.data.message || "تم ارسال رسالتك بنجاح"}`;
          },

          error: (error) => {
            console.error(error);
            return (
              `${error.response?.data?.message}` ||
              "فشل ارسال الرسالة.. الرجاء المحاولة مرة أخري"
            );
          },
        }
      );
    } finally {
      setFormLoading(false);
    }
  };
  console.log(message);
  const typographyStyle = "-mb-3 dark-text text-darkMode-dark950";
  const inputStyle =
    "placeholder:text-gray-200 dark-text text-darkMode-dark950";
  const fieldStyle = "flex flex-col gap-5 text-darkMode-dark950";

  return (
    <Container className="min-h-screen flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <a target="_blank" href="https://wardeh-tech.com/en/home">
          <Button
            variant={isDarkModeActive ? "outlined" : ""}
            className="dark:text-darkMode-dark50 text-base dark:border-white bg-mainColors-main900 hover:bg-mainColors-main950 dark:bg-inherit dark:hover:bg-darkMode-dark50 dark:hover:text-darkMode-dark950 duration-300 transition-all"
          >
            قم بزيارة شركتنا
          </Button>
        </a>
      </div>
      {/* <!-- Right column container with form --> */}
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col gap-4 justify-center items-center">
          <p className="dark:text-darkMode-dark50 text-center text-darkMode-dark950 text-2xl font-bold tracking-wider">
            نموذج اللوجو
          </p>
          <p className="dark:text-darkMode-dark400 text-center text-darkMode-dark500 text-sm tracking-wide mb-5 w-[90%]">
            أهلاً وسهلاً بك، سيساعدنا هذا النموذج في معرفة كيف يمكننا مساعدتك.
          </p>
        </div>
        <form
          ref={myFrom}
          onSubmit={handleMessage}
          dir="rtl"
          className="flex flex-col gap-2 w-full md:w-[90%] lg:w-[80%] shadow dark:shadow-darkMode-dark50 shadow-darkMode-dark400 p-10"
        >
          {/* <!-- full name --> */}
          <div className={`${fieldStyle}`}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              الاسم الكامل <span className="text-red-500">*</span>
            </Typography>
            <Input
              color={isDarkModeActive ? "green" : "cyan"}
              label="الاسم الأول والأخير"
              className={`${inputStyle}`}
              value={message.fullName}
              onChange={(ev) =>
                setMessage({ ...message, fullName: ev.target.value })
              }
              name="name"
            />
          </div>

          {/* <!-- phone  --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              رقم الجوال <span className="text-red-500">*</span>
            </Typography>
            <div className="relative flex">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    className="dark-text cursor-default flex h-10 items-center gap-2 rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg"
                      alt="flag-for-egypt"
                      className="h-4 w-4 rounded-full object-cover"
                    />
                  </Button>
                </MenuHandler>
              </Menu>
              <Input
                type="tel"
                className={`rounded-r-none ${inputStyle} `}
                color={isDarkModeActive ? "green" : "cyan"}
                label="رقم الجوال"
                value={message.phone}
                onChange={(ev) =>
                  setMessage({ ...message, phone: ev.target.value })
                }
                name="phone"
              />
            </div>
          </div>

          {/* <!-- email --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              البريد الإلكتروني <span className="text-red-500">*</span>
            </Typography>
            <Input
              color={isDarkModeActive ? "green" : "cyan"}
              label="البريد الإلكتروني"
              className={`${inputStyle}`}
              value={message.email}
              onChange={(ev) =>
                setMessage({ ...message, email: ev.target.value })
              }
              name="email"
            />
          </div>

          {/* <!-- logoName --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              ما هو الاسم الذي ترغب في استخدامه في تصميم الشعار؟{" "}
              <span className="text-red-500">*</span>
            </Typography>
            <Input
              color={isDarkModeActive ? "green" : "cyan"}
              label="اسم اللوجو"
              className={`${inputStyle}`}
              value={message.logoName}
              onChange={(ev) =>
                setMessage({ ...message, logoName: ev.target.value })
              }
              name="logoName"
            />
          </div>
          {/* <!-- logoName --> */}

          {/* <!-- logoLanguages --> */}
          <div className={`${fieldStyle} mt-2`}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              سيكون الشعار بـ..؟ <span className="text-red-500">*</span>
            </Typography>
            <Card className="w-full bg-inherit">
              <List className="flex flex-col sm:justify-between sm:flex-row">
                {logoLanguages?.map((item, index) => (
                  <ListItem key={index} className="p-0">
                    <label
                      htmlFor={item?.name}
                      className={`${
                        index !== logoLanguages.length - 1 &&
                        "border-b sm:border-l sm:border-b-0 border-darkMode-dark400 dark:border-darkMode-dark200"
                      } ${
                        index === logoLanguages.length - 1 &&
                        "border-b sm:border-l-0 sm:border-b-0 border-darkMode-dark400 dark:border-darkMode-dark200"
                      } flex w-full group cursor-pointer items-center justify-start sm:items-center sm:justify-center px-3 pb-0 pt-1 sm:py-0 `}
                    >
                      <ListItemPrefix className="mr-0">
                        <Radio
                          id={item?.name}
                          color="cyan"
                          className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                          checked={item?.isChecked}
                          onChange={(ev) => {
                            const isChecked = ev.target.checked;
                            const updatedLogoLanguages = logoLanguages.map(
                              (lang) => ({
                                ...lang,
                                isChecked: lang.name === item.name && isChecked,
                              })
                            );
                            setLogoLanguages(updatedLogoLanguages);
                            if (!isLogoLanguagesChecked) {
                              setIsLogoLanguagesChecked(true);
                            }
                          }}
                        />
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                      >
                        {item?.name}
                      </Typography>
                    </label>
                  </ListItem>
                ))}
              </List>
            </Card>
          </div>
          {/* end logoLanguages */}

          {/* <!-- what is logo languages --> */}
          {isLogoLanguagesChecked && (
            <div className={fieldStyle}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                ما هي اللغات المستخدمة؟ <span className="text-red-500">*</span>
              </Typography>
              <Input
                color={isDarkModeActive ? "green" : "cyan"}
                label="ما هي اللغات المستخدمة؟"
                className={`${inputStyle}`}
                value={message.whatIsLogoLanguages}
                onChange={(ev) =>
                  setMessage({
                    ...message,
                    whatIsLogoLanguages: ev.target.value,
                  })
                }
                name="whatIsLogoLanguages"
              />
            </div>
          )}

          {/* <!-- is Shortcut In Logo --> */}
          <div className={`${fieldStyle} mt-2`}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              هل ترغب بإستخدام أية اختصارات أو أحرف أولية في الشعار؟{" "}
              <span className="text-red-500">*</span>
            </Typography>
            <Card className="w-full bg-inherit">
              <List className="flex flex-col sm:justify-between sm:flex-row">
                <ListItem className="p-0">
                  <label
                    className={`border-b sm:border-l sm:border-b-0 border-darkMode-dark400 dark:border-darkMode-dark200 flex w-full group cursor-pointer items-center justify-start sm:items-center sm:justify-center px-3 pb-0 pt-1 sm:py-0 `}
                  >
                    <ListItemPrefix className="mr-0">
                      <Radio
                        color="cyan"
                        className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                        checked={isShortcutInLogo === true}
                        onChange={() => setIsShortcutInLogo(true)}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                    >
                      نعم
                    </Typography>
                  </label>
                </ListItem>
                <ListItem className="p-0">
                  <label
                    className={`flex w-full group cursor-pointer items-center justify-start sm:items-center sm:justify-center px-3 pb-0 pt-1 sm:py-0 `}
                  >
                    <ListItemPrefix className="mr-0">
                      <Radio
                        color="cyan"
                        className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                        checked={isShortcutInLogo === false}
                        onChange={() => setIsShortcutInLogo(false)}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                    >
                      لا
                    </Typography>
                  </label>
                </ListItem>
              </List>
            </Card>
          </div>

          {isShortcutInLogo && (
            // what is shortcut logo languages
            <div className={fieldStyle}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                ما هي هذه الاختصارات أو الأحرف الأولية في الشعار؟{" "}
                <span className="text-red-500">*</span>
              </Typography>
              <Input
                color={isDarkModeActive ? "green" : "cyan"}
                label="اكتب الاختصارات التي تريد إضافتها ..."
                className={`${inputStyle}`}
                value={message.whatIsShortcutInLogo}
                onChange={(ev) =>
                  setMessage({
                    ...message,
                    whatIsShortcutInLogo: ev.target.value,
                  })
                }
                name="whatIsShortcutInLogo"
              />
            </div>
          )}

          {/* <!-- company vision --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              ما هي رؤية الشركة
            </Typography>
            <Textarea
              size="lg"
              color={isDarkModeActive ? "green" : "cyan"}
              label="اكتب هنا رؤية شركتك"
              className="mb-6 dark:text-darkMode-dark50"
              value={message.companyVision}
              onChange={(ev) =>
                setMessage({
                  ...message,
                  companyVision: ev.target.value,
                })
              }
              name="companyVision"
            ></Textarea>
          </div>
          {/* end */}

          {/* <!-- is Advertising phrase? --> */}
          <div className={`${fieldStyle} mt-2`}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              هل لدي الشركة عبارة إعلانية معينة ترغب بإدراجها مع الشعار؟{" "}
              <span className="text-red-500">*</span>
            </Typography>
            <Card className="w-full bg-inherit">
              <List className="flex flex-col sm:justify-between sm:flex-row">
                <ListItem className="p-0">
                  <label
                    className={`border-b sm:border-l sm:border-b-0 border-darkMode-dark400 dark:border-darkMode-dark200 flex w-full group cursor-pointer items-center justify-start sm:items-center sm:justify-center px-3 pb-0 pt-1 sm:py-0 `}
                  >
                    <ListItemPrefix className="mr-0">
                      <Radio
                        color="cyan"
                        className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                        checked={isAdvertisingPhrase === true}
                        onChange={() => setIsAdvertisingPhrase(true)}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                    >
                      نعم
                    </Typography>
                  </label>
                </ListItem>
                <ListItem className="p-0">
                  <label
                    className={`flex w-full group cursor-pointer items-center justify-start sm:items-center sm:justify-center px-3 pb-0 pt-1 sm:py-0 `}
                  >
                    <ListItemPrefix className="mr-0">
                      <Radio
                        color="cyan"
                        className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                        checked={isAdvertisingPhrase === false}
                        onChange={() => setIsAdvertisingPhrase(false)}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                    >
                      لا
                    </Typography>
                  </label>
                </ListItem>
              </List>
            </Card>
          </div>

          {/* // what is shortcut logo languages */}
          {isAdvertisingPhrase && (
            <div className={fieldStyle}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                ما هي العبارة الإعلانية؟ <span className="text-red-500">*</span>
              </Typography>
              <Input
                color={isDarkModeActive ? "green" : "cyan"}
                label="العبارة الإعلانية..."
                className={`${inputStyle}`}
                value={message.advertisingPhrase}
                onChange={(ev) =>
                  setMessage({
                    ...message,
                    advertisingPhrase: ev.target.value,
                  })
                }
                name="advertisingPhrase"
              />
            </div>
          )}

          {/* <!-- Target Consumer Segment --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              أخبرنا بالبيانات التالية عن الشريحة الاستهلاكية المستهدفة لمنشأتك:
            </Typography>
            {/* kind */}
            <div className="flex flex-col gap-4">
              <label
                color="blue-gray"
                className={`${typographyStyle} md:w-1/4`}
              >
                الجنس <span className="text-red-500">*</span>
              </label>
              <Card className="w-full bg-inherit">
                <List className="flex flex-col sm:justify-between sm:flex-row">
                  {message?.targetConsumerSegment?.kind?.map((item, index) => (
                    <ListItem key={index} className="p-0">
                      <label
                        htmlFor={item?.name}
                        className={`${
                          index !==
                            message?.targetConsumerSegment?.kind.length - 1 &&
                          "border-b sm:border-l sm:border-b-0 border-darkMode-dark400 dark:border-darkMode-dark200"
                        } ${
                          index ===
                            message?.targetConsumerSegment?.kind.length - 1 &&
                          "border-b sm:border-l-0 sm:border-b-0 border-darkMode-dark400 dark:border-darkMode-dark200"
                        } flex w-full group cursor-pointer items-center justify-start sm:items-center sm:justify-center px-3 pb-0 pt-1 sm:py-0 `}
                      >
                        <ListItemPrefix className="mr-0">
                          <Checkbox
                            id={item?.name}
                            ripple={false}
                            color="cyan"
                            className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                            containerProps={{
                              className: "",
                            }}
                            checked={item?.isChecked}
                            onChange={(ev) => {
                              const isChecked = ev.target.checked;
                              const existingIndex =
                                message?.targetConsumerSegment?.kind.findIndex(
                                  (p) => p.name === item?.name
                                );

                              if (existingIndex !== -1) {
                                // إذا وجد العنصر، نقوم بتحديث حالته
                                const updatedKind = [
                                  ...message?.targetConsumerSegment?.kind,
                                ];
                                updatedKind[existingIndex] = {
                                  ...item,
                                  isChecked,
                                };
                                setMessage({
                                  ...message,
                                  targetConsumerSegment: {
                                    ...message.targetConsumerSegment,
                                    kind: [...updatedKind],
                                  },
                                });
                              } else {
                                // إذا لم يجد العنصر، نقوم بإضافته
                                setMessage({
                                  ...message,
                                  targetConsumerSegment: {
                                    ...message.targetConsumerSegment,
                                    kind: [
                                      ...message.targetConsumerSegment.kind,
                                      {
                                        ...item,
                                        isChecked,
                                      },
                                    ],
                                  },
                                });
                              }
                            }}
                          />
                        </ListItemPrefix>
                        <Typography
                          color="blue-gray"
                          className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                        >
                          {item?.name}
                        </Typography>
                      </label>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </div>
            {/* end */}

            {/* age */}
            <div className="flex flex-col gap-4">
              <label
                color="blue-gray"
                className={`${typographyStyle} md:w-1/4`}
              >
                العمر <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center flex-col md:flex-row gap-2">
                {/* from */}
                <div className="flex items-center justify-center gap-2">
                  <label>من</label>
                  <Input
                    color={isDarkModeActive ? "green" : "cyan"}
                    className={`${inputStyle}`}
                    value={message.targetConsumerSegment.age.from}
                    onChange={(ev) =>
                      setMessage({
                        ...message,
                        targetConsumerSegment: {
                          ...message.targetConsumerSegment,
                          age: {
                            ...message.targetConsumerSegment.age,
                            from: ev.target.value,
                          },
                        },
                      })
                    }
                    type="number"
                  />
                </div>
                {/* to */}
                <div className="flex items-center justify-center gap-2">
                  <label>الى</label>
                  <Input
                    color={isDarkModeActive ? "green" : "cyan"}
                    className={`${inputStyle}`}
                    value={message.targetConsumerSegment.age.to}
                    onChange={(ev) =>
                      setMessage({
                        ...message,
                        targetConsumerSegment: {
                          ...message.targetConsumerSegment,
                          age: {
                            ...message.targetConsumerSegment.age,
                            to: ev.target.value,
                          },
                        },
                      })
                    }
                    type="number"
                  />
                </div>{" "}
              </div>
            </div>
            {/* end */}

            {/* Geographical Area */}
            <div className="flex flex-col gap-4">
              <label
                color="blue-gray"
                className={`${typographyStyle} md:w-1/4`}
              >
                المنطقة الجغرافية <span className="text-red-500">*</span>
              </label>
              <Input
                color={isDarkModeActive ? "green" : "cyan"}
                label="تفاصيل المنطقة الجغرافية"
                className={`${inputStyle}`}
                value={message.targetConsumerSegment.geographicalArea}
                onChange={(ev) =>
                  setMessage({
                    ...message,
                    targetConsumerSegment: {
                      ...message.targetConsumerSegment,
                      geographicalArea: ev.target.value,
                    },
                  })
                }
                name="whatIsLogoLanguages"
              />
            </div>
            {/* end */}
          </div>

          {/* <!-- natureOfWork --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              ما هي طبيعة عملك؟ <span className="text-red-500">*</span>
            </Typography>
            <Textarea
              size="lg"
              color={isDarkModeActive ? "green" : "cyan"}
              label=" طبيعة عملك..."
              className="mb-6 dark:text-darkMode-dark50"
              value={message.natureOfWork}
              onChange={(ev) =>
                setMessage({
                  ...message,
                  natureOfWork: ev.target.value,
                })
              }
              name="natureOfWork"
            ></Textarea>
          </div>
          {/* end */}

          {/* <!-- Difference from competitors --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              ما الذي يجعلك مميزاً عن منافسيك؟
            </Typography>
            <Textarea
              size="lg"
              color={isDarkModeActive ? "green" : "cyan"}
              label="ما الذي يجعلك مميزاً عن منافسيك؟..."
              className="mb-6 dark:text-darkMode-dark50"
              value={message.differenceFromCompetitors}
              onChange={(ev) =>
                setMessage({
                  ...message,
                  differenceFromCompetitors: ev.target.value,
                })
              }
              name="differenceFromCompetitors"
            ></Textarea>
          </div>
          {/* end */}

          {/* <!-- attractive Logos --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              أخبرنا عن بعض الشعارات التي تعجبك أو تلفت انتباهك.
            </Typography>
            <Textarea
              size="lg"
              color={isDarkModeActive ? "green" : "cyan"}
              label="الشعارات التي تلفت انتباهك..."
              className="mb-6 dark:text-darkMode-dark50"
              value={message.attractiveLogos}
              onChange={(ev) =>
                setMessage({
                  ...message,
                  attractiveLogos: ev.target.value,
                })
              }
              name="attractiveLogos"
            ></Textarea>
          </div>
          {/* end */}

          {/* <!-- want To Add Images? --> */}
          <div className={`${fieldStyle} mt-2`}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              هل ترغب في إدراج عناصر معينة في تصميم الشعار؟{" "}
              <span className="text-red-500">*</span>
            </Typography>
            <Card className="w-full bg-inherit">
              <List className="flex flex-col sm:justify-between sm:flex-row">
                <ListItem className="p-0">
                  <label
                    className={`border-b sm:border-l sm:border-b-0 border-darkMode-dark400 dark:border-darkMode-dark200 flex w-full group cursor-pointer items-center justify-start sm:items-center sm:justify-center px-3 pb-0 pt-1 sm:py-0 `}
                  >
                    <ListItemPrefix className="mr-0">
                      <Radio
                        color="cyan"
                        className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                        checked={wantToAddImages === true}
                        onChange={() => setWantToAddImages(true)}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                    >
                      نعم
                    </Typography>
                  </label>
                </ListItem>
                <ListItem className="p-0">
                  <label
                    className={`flex w-full group cursor-pointer items-center justify-start sm:items-center sm:justify-center px-3 pb-0 pt-1 sm:py-0 `}
                  >
                    <ListItemPrefix className="mr-0">
                      <Radio
                        color="cyan"
                        className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                        checked={wantToAddImages === false}
                        onChange={() => setWantToAddImages(false)}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                    >
                      لا
                    </Typography>
                  </label>
                </ListItem>
              </List>
            </Card>
          </div>

          {/*images */}
          {wantToAddImages && (
            <div className="flex flex-col gap-y-2  group">
              <span
                className={`pl-1 text-grbg-gray-700 font-bold dark:text-darkMode-dark50`}
              >
                يرجى إدراج العناصر التصميمية التي ترغب فيها في الشعار.{" "}
                <span className="text-red-500">*</span>
              </span>
              {images ? (
                <Badge
                  withBorder
                  className="cursor-pointer w-fit transition-all duration-200 bg-gradient-to-tr from-orange-500 to-orange-900 hover:from-orange-800 hover:to-orange-900 border-2 border-white shadow-lg shadow-black/20 "
                  content={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  }
                  onClick={() => setImages(null)}
                >
                  <label
                    className={`cursor-pointer  text-center w-full ${
                      images.length > 0
                        ? "h-fit rounded-md p-2"
                        : "h-10 rounded-full"
                    } h-fit text-sm bg-inherit border-[2px] dark:border-[1px] border-gray-300 text-grbg-gray-700 gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-grbg-gray-700 transition-all duration-200 dark:hover:bg-darkMode-dark800 dark:hover:text-darkMode-dark50 dark:bg-darkMode-dark950 `}
                  >
                    {images.length > 0 ? (
                      <span className="dark:text-darkMode-dark50 flex flex-col h-fit">
                        {Array.from(images).map((file, index) => (
                          <span
                            className="dark:text-darkMode-dark50"
                            key={index}
                          >
                            {file.name}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <div className="dark:text-darkMode-dark50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>

                        <span className="dark:text-darkMode-dark50 ">
                          يرجى النقر هنا لرفع صور العناصر
                        </span>
                      </div>
                    )}

                    <input
                      type="file"
                      name="images"
                      onChange={(ev) => {
                        // تحقق من أن عدد الملفات المحددة لا يتجاوز 8
                        if (ev.target.files.length <= 8) {
                          // قم بتحديد الصور في حالة عدم تجاوز الحد
                          setImages(ev.target.files);
                        } else {
                          // إذا تجاوز العدد المسموح، إظهار رسالة خطأ
                          toast.error(
                            "لقد تم تحديد أكثر من 8 صور. يرجى تحديد 8 صور أو أقل فقط."
                          );
                        }
                      }}
                      className="hidden"
                      multiple
                    />
                  </label>
                </Badge>
              ) : (
                <label className="dark:text-darkMode-dark50 cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-inherit border-[3px] dark:border-[1px] border-gray-300 text-grbg-gray-700 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-grbg-gray-700 transition-all duration-200 dark:hover:bg-darkMode-dark800 dark:hover:text-darkMode-dark50 dark:bg-darkMode-dark950">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>

                  <span className="dark:text-darkMode-whiteColor50 ">
                    يرجى النقر هنا لرفع صور العناصر
                  </span>

                  <input
                    type="file"
                    name="images"
                    onChange={(ev) => {
                      // تحقق من أن عدد الملفات المحددة لا يتجاوز 8
                      if (ev.target.files.length <= 8) {
                        // قم بتحديد الصور في حالة عدم تجاوز الحد
                        setImages(ev.target.files);
                      } else {
                        // إذا تجاوز العدد المسموح، يمكنك إضافة رسالة خطأ أو اتخاذ إجراء آخر
                        toast.error(
                          "لقد حددت اكثر من 8 صور. برجاء تحديد 8 صور فقط او اقل"
                        );
                      }
                    }}
                    className="hidden"
                    multiple
                  />
                </label>
              )}
            </div>
          )}
          {/* end images */}

          {/* <!-- is there Old Logo? --> */}
          <div className={`${fieldStyle} mt-2`}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              هل لديك شعارًا قديمًا؟ <span className="text-red-500">*</span>
            </Typography>
            <Card className="w-full bg-inherit">
              <List className="flex flex-col sm:justify-between sm:flex-row">
                <ListItem className="p-0">
                  <label
                    className={`border-b sm:border-l sm:border-b-0 border-darkMode-dark400 dark:border-darkMode-dark200 flex w-full group cursor-pointer items-center justify-start sm:items-center sm:justify-center px-3 pb-0 pt-1 sm:py-0 `}
                  >
                    <ListItemPrefix className="mr-0">
                      <Radio
                        color="cyan"
                        className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                        checked={isOldLogo === true}
                        onChange={() => setIsOldLogo(true)}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                    >
                      نعم
                    </Typography>
                  </label>
                </ListItem>
                <ListItem className="p-0">
                  <label
                    className={`flex w-full group cursor-pointer items-center justify-start sm:items-center sm:justify-center px-3 pb-0 pt-1 sm:py-0 `}
                  >
                    <ListItemPrefix className="mr-0">
                      <Radio
                        color="cyan"
                        className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                        checked={isOldLogo === false}
                        onChange={() => setIsOldLogo(false)}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                    >
                      لا
                    </Typography>
                  </label>
                </ListItem>
              </List>
            </Card>
          </div>

          {isOldLogo && (
            // old logo image
            <div className="flex flex-col gap-y-2  group">
              <span
                className={`pl-1 text-grbg-gray-700 font-bold dark:text-darkMode-dark50`}
              >
                يرجى إدخال صورة للشعار القديم.
              </span>
              {oldLogoImage ? (
                <Badge
                  withBorder
                  className="cursor-pointer w-fit transition-all duration-200 bg-gradient-to-tr from-orange-500 to-orange-900 hover:from-orange-800 hover:to-orange-900 border-2 border-white shadow-lg shadow-black/20 "
                  content={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  }
                  onClick={() => setOldLogoImages(null)}
                >
                  <label
                    className={`cursor-pointer  text-center w-full ${
                      oldLogoImage
                        ? "h-fit rounded-md p-2"
                        : "h-10 rounded-full"
                    } h-fit text-sm bg-inherit border-[2px] dark:border-[1px] border-gray-300 text-grbg-gray-700 gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-grbg-gray-700 transition-all duration-200 dark:hover:bg-darkMode-dark800 dark:hover:text-darkMode-dark50 dark:bg-darkMode-dark950 `}
                  >
                    {oldLogoImage ? (
                      <span className="dark:text-darkMode-dark50 flex flex-col h-fit">
                        {Array.from(oldLogoImage).map((file, index) => (
                          <span
                            className="dark:text-darkMode-dark50"
                            key={index}
                          >
                            {file.name}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <div className="dark:text-darkMode-dark50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>

                        <span className="dark:text-darkMode-dark50 ">
                          الرجاء النقر هنا لرفع صورة لشعارك القديم.
                        </span>
                      </div>
                    )}

                    <input
                      type="file"
                      name="images"
                      onChange={(ev) => {
                        setOldLogoImages(ev.target.files);
                      }}
                      className="hidden"
                    />
                  </label>
                </Badge>
              ) : (
                <label className="dark:text-darkMode-dark50 cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-inherit border-[3px] dark:border-[1px] border-gray-300 text-grbg-gray-700 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-grbg-gray-700 transition-all duration-200 dark:hover:bg-darkMode-dark800 dark:hover:text-darkMode-dark50 dark:bg-darkMode-dark950">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>

                  <span className="dark:text-darkMode-whiteColor50 ">
                    الرجاء النقر هنا لرفع صورة لشعارك القديم.
                  </span>

                  <input
                    type="file"
                    name="images"
                    onChange={(ev) => {
                      setOldLogoImages(ev.target.files);
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}

          {/* <!-- attractive Logos --> */}
          {isOldLogo && (
            <div className={fieldStyle}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                ما الذي لا يعجبك في شعارك القديم؟
              </Typography>
              <Textarea
                size="lg"
                color={isDarkModeActive ? "green" : "cyan"}
                label="ما الذي لا يعجبك في شعارك القديم؟"
                className="mb-6 dark:text-darkMode-dark50"
                value={message.contentOldLogo}
                onChange={(ev) =>
                  setMessage({
                    ...message,
                    contentOldLogo: ev.target.value,
                  })
                }
                name="contentOldLogo"
              ></Textarea>
            </div>
          )}
          {/* end */}

          {/* <!-- colorsContent --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              ما الألوان التي تعجبك وترغب في استخدامها في الشعار؟
            </Typography>
            <Textarea
              size="lg"
              color={isDarkModeActive ? "green" : "cyan"}
              label="الألوان"
              className="mb-6 dark:text-darkMode-dark50"
              value={message.colorsContent}
              onChange={(ev) =>
                setMessage({
                  ...message,
                  colorsContent: ev.target.value,
                })
              }
              name="colorsContent"
            ></Textarea>
          </div>
          {/* end */}

          {/* <!-- is Additional Notes? --> */}
          <div className={`${fieldStyle} mt-2`}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              هل هناك أي تفاصيل أخرى تود إضافتها؟{" "}
              <span className="text-red-500">*</span>
            </Typography>
            <Card className="w-full bg-inherit">
              <List className="flex flex-col sm:justify-between sm:flex-row">
                <ListItem className="p-0">
                  <label
                    className={`border-b sm:border-l sm:border-b-0 border-darkMode-dark400 dark:border-darkMode-dark200 flex w-full group cursor-pointer items-center justify-start sm:items-center sm:justify-center px-3 pb-0 pt-1 sm:py-0 `}
                  >
                    <ListItemPrefix className="mr-0">
                      <Radio
                        color="cyan"
                        className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                        checked={isAdditionalNotes === true}
                        onChange={() => setIsAdditionalNotes(true)}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                    >
                      نعم
                    </Typography>
                  </label>
                </ListItem>
                <ListItem className="p-0">
                  <label
                    className={`flex w-full group cursor-pointer items-center justify-start sm:items-center sm:justify-center px-3 pb-0 pt-1 sm:py-0 `}
                  >
                    <ListItemPrefix className="mr-0">
                      <Radio
                        color="cyan"
                        className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                        checked={isAdditionalNotes === false}
                        onChange={() => setIsAdditionalNotes(false)}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                    >
                      لا
                    </Typography>
                  </label>
                </ListItem>
              </List>
            </Card>
          </div>

          {isAdditionalNotes && (
            // <!-- additional notes -->
            <div className={fieldStyle}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                يرجى إخبارنا بأي ملاحظات تود إضافتها.{" "}
                <span className="text-red-500">*</span>
              </Typography>
              <Textarea
                size="lg"
                color={isDarkModeActive ? "green" : "cyan"}
                label="ما هي الملاحظات التي تود إضافتها؟"
                className="mb-6 dark:text-darkMode-dark50"
                value={message.additionalNotes}
                onChange={(ev) =>
                  setMessage({
                    ...message,
                    additionalNotes: ev.target.value,
                  })
                }
                name="additionalNotes"
              ></Textarea>
            </div>
            // end
          )}

          {/* <!-- Submit button --> */}
          <Button
            type="submit"
            variant={isDarkModeActive ? "outlined" : ""}
            className="dark:text-darkMode-dark50 dark:border-white text-xl bg-mainColors-main900 hover:bg-mainColors-main950 dark:bg-inherit dark:hover:bg-darkMode-dark50 dark:hover:text-darkMode-dark950 duration-200 transition-all"
          >
            {formLoading ? (
              <div className="flex justify-center ">
                <Spinner className="h-6 w-6" />
              </div>
            ) : (
              "إرسال"
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Quote;
