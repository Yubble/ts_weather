/*
 * @Author: your name
 * @Date: 2020-01-19 19:56:12
 * @LastEditTime : 2020-01-19 20:05:17
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tsWeatherForecast/ts_weather/index.ts
 */

import axios from "axios";
import colors from "colors";
import commander from "commander";

commander
  .version("0.1.0")
  .description("这是一个天气预报工具")
  .option("-c, --city [name]", "Add city name")
  // action方法何以获取到入参的所有信息
  // .action(cmd => {
  //   console.log('cmd is ', cmd)
  // })
  // 获取命令行参数用方括号和尖括号都行
  // .option("-p, --pizza-type <type>", "flavour of pizza")
  .parse(process.argv);

if (process.argv.slice(2).length === 0) {
  // 如果没有输入城市地址，提示用户输入
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
    const live = response.data.lives[0];
    log(colors.yellow(live.reporttime));
    log(colors.gray(`${live.province} ${live.city}`));
    log(colors.green(`${live.weather} ${live.temperature} 度`));
  } catch {
    log(colors.red("天气服务出现异常"));
  }
}
getWeather(commander.city);
// console.log('opts is ', commander.opts())
// console.log("city is ", commander.city);
// console.log('pizza is ', commander.pizzaType)
// console.log("hello ts-weather");
