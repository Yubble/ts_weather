/*
 * @Author: your name
 * @Date: 2020-01-19 19:56:12
 * @LastEditTime : 2020-01-19 20:05:17
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tsWeatherForecast/ts_weather/index.ts
 */

import colors from "colors";
import commander from "commander";

commander
  .version("0.1.0")
  // .option("-d, --debug", "output extra debugging")
  .option("-c, --city [name]", "Add city name")
  // .option("-p, --pizza-type <type>", "flavour of pizza")
  .parse(process.argv);

if (process.argv.slice(2).length === 0) {
  commander.outputHelp(colors.red);
  // 杀掉Node进程，相当于return
  process.exit();
}

// console.log('opts is ', commander.opts())
console.log("city is ", commander.city);
// console.log('pizza is ', commander.pizzaType)
// console.log("hello ts-weather");
