/*
 * @Author: your name
 * @Date: 2020-01-19 19:56:12
 * @LastEditTime : 2020-01-22 21:04:38
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tsWeatherForecast/ts_weather/index.ts
 */

import axios from "axios";
import colors from "colors";
import commander from "commander";

commander
  .version("0.1.0")
  .option("-c, --city [name]", "Add city name")
  // 获取命令行参数用方括号和尖括号都行
  // .option("-p, --pizza-type <type>", "flavour of pizza")
  .parse(process.argv);

if (process.argv.slice(2).length === 0) {
  commander.outputHelp(colors.red);
  // 杀掉Node进程，相当于return
  process.exit();
}

interface IWeatherResponse {
  status: string;
  count: string;
  info: string;
  infocode: string;
  lives: ILive[];
}

interface ILive {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

const URL = "http://restapi.amap.com/v3/weather/weatherInfo";
const KEY = "71bb9f4d12bf747736cf2400ef0334eb";

const log = console.log;
async function getWeather(city: string) {
  try {
    const url = `${URL}?city=${encodeURI(city)}&key=${KEY}`;
    const response = await axios.get(url);
    return response.data.lives[0];
  } catch {
    log(colors.red("天气服务出现异常"));
  }
}

(async () => {
  const weatherRes = await getWeather(commander.city);
  log(colors.yellow(weatherRes.reporttime));
  log(colors.white(`${weatherRes.province} ${weatherRes.city}`));
  log(colors.green(`${weatherRes.weather} ${weatherRes.temperature} 度`));

  process.stdout.write("请继续输入城市名称：");
  process.stdin.on("data", async (input) => {
    const inpTxt = input.toString().trim();
    if (inpTxt === "") {
      process.exit();
    }
    const res = await getWeather(inpTxt);
    log(colors.yellow(res.reporttime));
    log(colors.white(`${res.province} ${res.city}`));
    log(colors.green(`${res.weather} ${res.temperature} 度`));
    process.stdout.write("请继续输入城市名称：");
  });
})();

// console.log('opts is ', commander.opts())
// console.log("city is ", commander.city);
// console.log('pizza is ', commander.pizzaType)
// console.log("hello ts-weather");
