import { Form } from "../shared/utilities/form/form";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Field } from "../shared/utilities/form/field";
import { Input } from "../shared/utilities/form/input";
import { ImageInput } from "../shared/utilities/form/image-input";
import { Label } from "../shared/utilities/form/label";
import { Button } from "../shared/utilities/form/button";
import { HiChevronLeft, HiX } from "react-icons/hi";
import * as XLSX from "xlsx";
import { useToast } from "../../lib/providers/toast-provider";
import Confetti from "react-confetti";
import format from "date-fns/format";
import { useAlert } from "../../lib/providers/alert-provider";

interface Prize {
  title: string;
  qty: number;
  contenders?: Contender[];
}
interface Contender {
  ID: string;
  NAME: string;
  INFO: string;
  checked?: boolean;
}
interface Info {
  title: string;
  shop: string;
  logo: string;
  background: string;
  color: string;
  textColor: string;
  delay: number;
}
export function HomePage() {
  const [mode, setMode] = useState<"setup" | "rolling">("setup");
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [contenders, setContenders] = useState<Contender[]>([]);
  const [infos, setInfos] = useState<Info>();
  const [currentPrize, setCurrentPrize] = useState<Prize>();
  let [currentContender, setCurrentContender] = useState<Contender>();
  const [showConfetti, setShowConfetti] = useState(false);
  const [complete, setComplete] = useState(false);
  const [time, setTime] = useState("");
  const toast = useToast();
  const alert = useAlert();

  useEffect(() => {
    setInterval(() => {
      setTime(format(new Date(), "dd-MM-yyy HH:mm:ss"));
    }, 1000);
  }, []);

  const defaultInfos = useMemo(() => {
    let info: any = localStorage.getItem("info");
    if (info) {
      info = JSON.parse(info);
      console.log(info);
      setPrizes(info.prizes);
      return info;
    }
  }, []);

  const readExcelFiles = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setContenders(data as any);
    };
  };

  const startDraw = async () => {
    const delay = infos.delay * 1000;
    let time = 0;
    const interval = 50;
    const availableContenders = contenders.filter((x) => !x.checked);
    do {
      currentContender =
        availableContenders[
          Math.floor(Math.random() * availableContenders.length)
        ];
      setCurrentContender(currentContender);
      await new Promise((resolve) => setTimeout(() => resolve(true), interval));
      time += interval;
    } while (time < delay);
    setShowConfetti(true);
    currentContender.checked = true;
    currentPrize.contenders.push(currentContender);
    setPrizes([...prizes]);
    setTimeout(() => {
      setCurrentContender(null);
      if (currentPrize.contenders.length >= currentPrize.qty) {
        const index = prizes.findIndex((x) => x.title == currentPrize.title);
        if (index < prizes.length - 1) {
          setCurrentPrize(prizes[index + 1]);
        } else {
          setComplete(true);
          alert.success("Quay số hoàn thành", "Đã quay tất cả các giải thưởng");
        }
      }
      setShowConfetti(false);
    }, 5000);
  };

  return (
    <>
      {mode == "setup" ? (
        <div className="flex justify-center">
          <Form
            grid
            className="max-w-screen-md p-6 mx-auto bg-white shadow"
            initialData={defaultInfos}
            onSubmit={(data) => {
              if (
                !data.title ||
                !data.shop ||
                !data.logo ||
                !data.background ||
                !data.color ||
                !data.textColor ||
                !data.delay ||
                !contenders.length ||
                !prizes.length ||
                prizes.filter((x) => !x.qty || !x.title).length ||
                contenders.filter((x) => !x.ID || !x.NAME).length
              ) {
                toast.error("Yêu cầu nhập đầy đủ thông tin");
                return;
              }

              localStorage.setItem(
                "info",
                JSON.stringify({
                  ...data,
                  prizes,
                })
              );

              setCurrentContender(null);
              contenders.forEach((contender) => (contender.checked = false));
              setContenders([...contenders]);
              prizes.forEach((prize) => (prize.contenders = []));
              setPrizes([...prizes]);
              setCurrentPrize(prizes[0]);
              setInfos(data);
              setComplete(false);
              setMode("rolling");
            }}
          >
            <Field name="shop" label="Tên cửa hàng" required cols={4}>
              <Input />
            </Field>
            <Field name="title" label="Tên chương trình" required cols={8}>
              <Input />
            </Field>
            <Field name="color" label="Màu sắc chính" required cols={4}>
              <Input />
            </Field>
            <Field name="textColor" label="Màu số quay" required cols={4}>
              <Input />
            </Field>
            <Field name="delay" label="Thời gian quay (giây)" required cols={4}>
              <Input number />
            </Field>
            <Field name="logo" label="Logo cửa hàng" required cols={4}>
              <ImageInput largeImage />
            </Field>
            <Field name="background" label="Ảnh nền" required cols={8}>
              <ImageInput largeImage ratio169 />
            </Field>
            <div className="col-span-full">
              <Label text="Danh sách giải thưởng" />
              <div className="flex flex-col gap-y-3">
                {prizes.map((prize, index) => (
                  <div
                    className="flex items-center rounded border-group"
                    key={index}
                  >
                    <div className="flex-shrink-0 w-10 h-10 font-bold border border-gray-400 flex-center">
                      {index + 1}
                    </div>
                    <Input
                      prefix="Tên giải thưởng"
                      prefixClassName="bg-gray-100 border-r border-gray-400"
                      value={prize.title}
                      onChange={(val) => {
                        prizes[index].title = val;
                        setPrizes([...prizes]);
                      }}
                    />
                    <Input
                      number
                      prefix="Số lượng"
                      prefixClassName="bg-gray-100 border-r border-gray-400"
                      value={prize.qty}
                      onChange={(val, extraVal) => {
                        prizes[index].qty = extraVal;
                        setPrizes([...prizes]);
                      }}
                    />
                    <Button
                      className="w-10 h-10"
                      outline
                      icon={<HiX />}
                      onClick={() => {
                        prizes.splice(index, 1);
                        setPrizes([...prizes]);
                      }}
                    />
                  </div>
                ))}
                <Button
                  outline
                  text="Thêm giải thưởng"
                  onClick={() => {
                    setPrizes([...prizes, { title: "", qty: 1 }]);
                  }}
                />
              </div>

              <Label
                className="mt-4 col-span-full"
                text={`Danh sách tham gia${
                  contenders?.length
                    ? `. Tổng: ${contenders?.length} người tham gia`
                    : ""
                }`}
              />
              <div className="flex items-center">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={(e) => {
                    if (e.target.files.length)
                      readExcelFiles(e.target.files[0]);
                  }}
                />
                <span className="text-gray-700">
                  File Excel gồm 3 cột: ID, NAME, INFO
                </span>
              </div>
              {!!contenders?.length && (
                <div className="overflow-y-scroll border border-gray-400 shadow-inner max-h-80">
                  <table className="w-full table-view">
                    <thead>
                      <tr>
                        <th>Mã số</th>
                        <th>Tên</th>
                        <th>Thông tin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contenders.map((contender) => (
                        <tr key={contender.ID}>
                          <td>{contender.ID}</td>
                          <td>{contender.NAME}</td>
                          <td>{contender.INFO}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="py-4 flex-center col-span-full">
              <Button submit primary large text="Bắt đầu quay thưởng" />
            </div>
          </Form>
        </div>
      ) : (
        <div
          className="relative flex w-screen h-screen overflow-hidden bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${infos.background})` }}
        >
          {showConfetti && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}
          <Button
            className="absolute top-3"
            iconClassName={"text-3xl"}
            icon={<HiChevronLeft />}
            onClick={() => {
              setMode("setup");
            }}
          />
          <div className="flex flex-col items-center w-1/2 h-full px-8 py-10 text-center">
            <img className="object-contain h-28" src={infos.logo} />
            <div
              className="pt-2 text-xl font-bold"
              style={{ color: infos.color }}
            >
              {infos.shop}
            </div>
            <div
              className="pt-2 text-2xl font-semibold"
              style={{ color: infos.textColor }}
            >
              {infos.title}
            </div>
            <div
              className="pt-2 font-bold text-8xl"
              style={{ color: infos.textColor }}
            >
              {currentContender?.ID || "000000"}
            </div>
            <div
              className="flex-col w-full px-6 pt-4 pb-6 mt-auto mb-4 text-center rounded flex-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
            >
              {currentPrize ? (
                <>
                  <div className="text-lg font-semibold uppercase text-gold">
                    {currentPrize.title}
                  </div>
                  <div className="w-full pb-3 mb-2 border-b border-gray-500 text-gold-light">
                    Số lượng còn lại:{" "}
                    {currentPrize.qty - (currentPrize.contenders?.length || 0)}
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {currentContender?.NAME || "Họ tên"}
                  </div>
                  <div className="text-xl font-semibold text-gray-100">
                    {currentContender?.INFO || "Thông tin thêm"}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <Button
              large
              className="shadow hover:shadow-xl"
              style={{
                backgroundColor: showConfetti ? "#ccc" : infos.color,
                color: "white",
              }}
              text="Bắt đầu quay"
              onClick={() => startDraw()}
              disabled={showConfetti}
            />
          </div>
          <div className="flex-col w-1/2 h-full flex-center">
            <div className="pb-2 font-semibold text-gray-500">{time}</div>
            <div
              className="relative flex flex-col items-center w-5/6 h-5/6"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
            >
              <div className="w-full h-12 px-6 text-lg font-extrabold text-center uppercase border-b flex-center text-gold-dark border-gold">
                Danh sách thắng giải
              </div>
              <div
                style={{ height: "calc(100% - 48px)" }}
                className="w-full p-4 overflow-y-scroll v-scrollbar "
              >
                <table className="w-full">
                  <tbody>
                    {prizes.map((prize, index) => (
                      <Fragment key={index}>
                        <tr className="font-bold uppercase text-gold-dark">
                          <td colSpan={4}>{prize.title}</td>
                        </tr>
                        {Array.from(Array(prize.qty).keys()).map(
                          (val, position) => (
                            <tr
                              className="font-semibold text-gray-700"
                              key={position}
                            >
                              <td className="align-top">{position + 1}.</td>
                              {prize.contenders && (
                                <>
                                  <td className="align-top whitespace-nowrap">
                                    {prize.contenders[position]?.ID}
                                  </td>
                                  <td className="px-4 align-top">
                                    {prize.contenders[position]?.NAME}
                                  </td>
                                  <td className="align-top">
                                    {prize.contenders[position]?.INFO}
                                  </td>
                                </>
                              )}
                            </tr>
                          )
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              {complete && (
                <Button
                  small
                  className="absolute bg-white shadow-2xl bottom-3 animate-emerge"
                  outline
                  text="Download kết quả"
                  onClick={() => {
                    let csv = arrayToCsv(
                      prizes.reduce(
                        (obj, prize) => [
                          ...obj,
                          ...prize.contenders.map((x) => [
                            prize.title,
                            x.ID,
                            x.NAME,
                            x.INFO,
                          ]),
                        ],
                        []
                      )
                    );
                    downloadBlob(
                      csv,
                      `Danh sách trúng thưởng ngày ${format(
                        new Date(),
                        "dd-MM-yyyy"
                      )}.csv`,
                      "text/csv;charset=utf-8;"
                    );
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function arrayToCsv(data) {
  return data
    .map(
      (row) =>
        row
          .map(String) // convert every value to String
          .map((v) => v.replaceAll('"', '""')) // escape double colons
          .map((v) => `"${v}"`) // quote it
          .join(",") // comma-separated
    )
    .join("\r\n"); // rows starting on new lines
}
function downloadBlob(content, filename, contentType) {
  // Create a blob
  var blob = new Blob(["\uFEFF", content], { type: contentType });
  var url = URL.createObjectURL(blob);

  // Create a link to download it
  var pom = document.createElement("a");
  pom.href = url;
  pom.setAttribute("download", filename);
  pom.click();
}
