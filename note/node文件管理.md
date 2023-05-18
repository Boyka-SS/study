```js
const fs = require("fs");
//创建文件
fs.writeFile(file_path_name, "", (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
});

fs.stat  检测是文件还是目录(目录 文件是否存在) 
fs.mkdir  创建目录 （创建之前先判断是否存在） 
fs.writeFile  写入文件(文件不存在就创建,但不能创建目录) 
fs.appendFile 写入追加文件 
fs.readFile 读取文件 
fs.readdir 读取目录 
fs.rename 重命名 
fs.rmdir  删除目录 
fs.unlink 删除文件
```


```js
const fs = require("fs");

const files = fs.readdirSync("./");

let file_header = [
  "interface",
  "let",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "yield",
];
let newFileName = "";
files.forEach((item) => {
  for (let i = 0; i < file_header.length; i++) {
    const element = file_header[i];
    if (item.includes(element)) {
      newFileName = item.replace(/_variablename/, "");
      newFileName = newFileName.replace(/_functionname/, "");
      newFileName = newFileName.replace(/_classname/, "");
      newFileName = newFileName.replace(/_constructorparams/, "");
      newFileName = newFileName.replace(/_interfacename/, "");

      //文件重命名，文件内容不变
      fs.rename(`./${item}`, `./${newFileName}`, (err) => {
        if (!err) {
          console.log(`${newFileName} has renamed`);
        }
      });
    }
  }
});
```