// 创建容器元素
const container = document.createElement("div");
container.style.position = "fixed";
container.style.top = "10px";
container.style.right = "10px";
container.style.width = "40%";
container.style.height = "100%";
container.style.background = "steelblue";
//container.style.border = "1px solid #fff";
container.style.zIndex = "9999";
container.style.display = "none"; // 初始时隐藏

// 关闭按钮
const closeButton = document.createElement("button");
closeButton.textContent = "关闭";
closeButton.addEventListener("click", () => {
  container.style.display = "none";
});
container.appendChild(closeButton);

// 创建空白的 div 元素，用于在表格上方创建空间
// 创建空白的 div 元素，用于在表格上方创建空间
// 创建空白的 div 元素，用于在表格上方创建空间
const header = document.createElement("div");
header.style.height = "90px"; // 设置空间的高度
header.style.display = "flex"; // 使用 flex 布局
header.style.flexDirection = "row"; // 主轴方向为水平方向
header.style.justifyContent = "space-between"; // 子元素之间的间距分配在主轴上
header.style.borderLeft = "10px solid transparent"; // 添加左边框，宽度为10像素，颜色为透明


// 创建三个子元素作为三块
const block1 = document.createElement("div");
block1.textContent = ""; // 给子元素添加内容
block1.style.flex = "1"; // 子元素自动填充剩余空间

const block2 = document.createElement("div");
block2.textContent = ""; // 给子元素添加内容
block2.style.flex = "1"; // 子元素自动填充剩余空间

const block3 = document.createElement("div");
block3.textContent = ""; // 给子元素添加内容
block3.style.flex = "1"; // 子元素自动填充剩余空间

// 将三个子元素添加到 header 元素中
header.appendChild(block1);
header.appendChild(block2);
header.appendChild(block3);

// 将 header 元素添加到容器中，放在容器的第一个子元素位置
container.insertBefore(header, container.firstChild);


// 将空间添加到容器中，放在容器的第一个子元素位置

// 将容器添加到页面中
document.body.appendChild(container);

// 创建显示按钮
const button = document.createElement("button");
button.textContent = "显示";
button.style.position = "fixed";
button.style.top = "10px";
button.style.right = "10px";
document.body.appendChild(button);

// 添加按钮 左
const detectButton = document.createElement("button");
detectButton.textContent = "添加到左侧";
container.appendChild(detectButton);

// 添加按钮 右
const detectButtonRight = document.createElement("button");
detectButtonRight.textContent = "添加到右侧";
container.appendChild(detectButtonRight);

// 创建 MutationObserver 实例
const observer = new MutationObserver(mutationsList => {
  mutationsList.forEach(mutation => {
    // 当发生变化时，检查容器元素的显示状态并进行相应的操作
    if (container.style.display === "none") {
      container.style.display = "block";
    }

    // 更新 block 中的内容
    chrome.storage.sync.get(['leftValue'], function(result) {
      if(result.leftValue){
        lastLeftValue = result.leftValue;
        // 更新 block1 中的内容
        block1.textContent = result.leftValue[0][0];
      }
    });
    chrome.storage.sync.get(['rightValue'], function(result) {
      if(result.rightValue){
        lastRightValue = result.rightValue;
        // 更新 block3 中的内容
        block3.textContent = result.rightValue[0][0];
      }
    });
  });
});

// 监听 DOM 树的变化
observer.observe(document.body, { subtree: true, childList: true });

// 当按钮被点击时，显示或隐藏容器
button.addEventListener("click", () => {
  if (container.style.display === "none") {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
});



const leftTextI = document.createElement("div");
leftTextI.style.height = "600px";
leftTextI.style.width = "580px";
leftTextI.style.marginTop = "20px";
leftTextI.style.marginLeft = "10px";
leftTextI.style.overflowY = "auto";
leftTextI.style.border = "1px solid #ccc";
leftTextI.style.display = "flex";

const table = document.createElement('table');
table.style.width = "100%";
table.style.height = "100%";
table.style.borderCollapse = 'collapse';
leftTextI.appendChild(table);

container.appendChild(leftTextI);
function fillPageTitle() {
  // 查询页面中的 span.mw-page-title-main 元素
  const pageTitleElement = document.querySelector("span.mw-page-title");
  if (pageTitleElement) {
    const pageTitle = pageTitleElement.textContent;
    // 将页面标题填充到表格中
    const tbody = table.querySelector('tbody');
    if (tbody) {
      // 清空 tbody 中的所有子元素（即表格行）
      tbody.innerHTML = '';
      // 创建新行并添加页面标题
      const row = table.insertRow();
      const cell = row.insertCell();
      cell.textContent = "Page Title:";
      cell.style.fontWeight = "bold";
      const titleCell = row.insertCell();
      titleCell.textContent = pageTitle;
    }
  }
}
var lastLeftValue = " ";
var lastRightValue = " ";

// 从存储中获取数据
chrome.storage.sync.get(['leftValue'], function(result) {
  // 如果存储中有数据，将其应用于页面
  if(result.leftValue){
    lastLeftValue = result.leftValue;
    console.log(lastLeftValue);
    writeData(mergeArrays(result.leftValue,lastRightValue));

    // 将左侧第一行数据传递到 block1 中
    block1.textContent = result.leftValue[0][0];
  }
});
chrome.storage.sync.get(['rightValue'], function(result) {
  if(result.rightValue){
    lastRightValue = result.rightValue;
    console.log(lastRightValue);
    writeData(mergeArrays(lastLeftValue,result.rightValue));

    // 将右侧第一行数据传递到 block3 中
    block3.textContent = result.rightValue[0][0];
  }
});
// 按下添加按钮 左
detectButton.addEventListener("click",() => {
  const lbAnValues = getLabelAnValue();
  const nowValues = lbAnValues[1].map((name, index) => [name, lbAnValues[0][index]]);

  chrome.storage.sync.set({ 'leftValue': nowValues }, function() {
    lastLeftValue = nowValues;
    console.log('leftData is saved.');
    console.log(nowValues);
  });
  
  writeData(mergeArrays(nowValues,lastRightValue));
});
// 按下添加按钮 右
detectButtonRight.addEventListener("click",() => {
  const lbAnValues = getLabelAnValue();
  const nowValues = lbAnValues[1].map((name, index) => [name, lbAnValues[0][index]]);

  chrome.storage.sync.set({ 'rightValue': nowValues }, function() {
    lastRightValue = nowValues;
    console.log('rightData is saved.');
    console.log(nowValues);
  });
  
  writeData(mergeArrays(lastLeftValue,nowValues));
});
function RemakeValue(inputString) {
  //console.log(inputString);
  const withoutComments = inputString.replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutCSSRules = withoutComments.replace(/[^{]*\{[^}]+\}/g, '');
  
  return withoutCSSRules;
}
function getLabelAnValue() {
  // 获取当前页面的所有属性值和属性名
  const infoBoxes = document.querySelectorAll("th.infobox-label");
  const name_ = document.querySelector(".mw-page-title-main").textContent;
  const values = Array.from(infoBoxes).map(th => {
    const td = th.nextElementSibling;
    return RemakeValue(td ? td.textContent : "");
  });

  // 新增代码开始
  const labels = [];
  let header = "";
  infoBoxes.forEach((th, index, array) => {
    const label_text = RemakeValue(th.textContent);
    // 判断是不是子属性
    if (label_text[1] == '•' || label_text[0] == '•') {
      labels.push(header + label_text);
    } else {
      if (array[index + 1]) {
        if (RemakeValue(array[index + 1].textContent)[1] == '•' || RemakeValue(array[index + 1].textContent)[0] == '•') {
          header = label_text;
        } else {
          labels.push(label_text);
        }
      } else {
        labels.push(label_text);
      }
    }
  });
  // 新增代码结束

  values.unshift(name_);
  labels.unshift("KeyWord_");
  return [labels, values];
}

function writeData(infoBoxContent){
  // 将数据写入表格展示
  // 获取表格的 tbody 元素
  const tbody = table.querySelector('tbody');
  // 如果存在 tbody 元素
  if (tbody) {
    // 清空 tbody 中的所有子元素（即表格行）
    tbody.innerHTML = '';
  }
  
  infoBoxContent.forEach(item => {
      var row = table.insertRow();
      item.forEach(function(cellData) {
          var cell = row.insertCell();
          cell.textContent = cellData;
          cell.style.color = "#fff";
          cell.style.border = '1px solid #ddd'; // 设置单元格边框
          cell.style.padding = '8px'; // 设置单元格内边距
          cell.style.wordWrap = 'break-word';
          cell.style.minWidth = "80px";
          cell.style.maxWidth = "80px";
      });
  });
}
function mergeArrays(array1, array2) {
  // 创建一个映射表，将第二个数组的名称映射到其对应的值
  const nameToValueMap = {};
  array2.forEach(([value, name]) => {
    nameToValueMap[name] = value;
  });

  // 遍历第一个数组，合并数据
  const mergedArray = array1.map(([value, name]) => {
    // 如果第二个数组中存在当前名称
    if (nameToValueMap.hasOwnProperty(name)) {
      // 将第二个数组中的值加入到当前二级数组的末尾
      return [value, name, nameToValueMap[name]];
    } else {
      // 否则在当前二级数组的末尾填充空值
      return [value, name, '']; // 或者使用 null、undefined 等表示空值的标记
    }
  });

  // 如果第二个数组中存在但在第一个数组中不存在的名称
  array2.forEach(([value, name]) => {
    if (!mergedArray.some(item => item[1] === name)) {
      // 在第一个数组的末尾添加一个新的二级数组
      mergedArray.push(['', name, value]);
    }
  });

  return mergedArray;
}
function sortByNonEmptyValues(a, b) {
  const nonEmptyA = a.filter(item => item !== "").length;
  const nonEmptyB = b.filter(item => item !== "").length;
  return nonEmptyB - nonEmptyA; // 降序排列，将不包含空字符串的数组排在前面
}
// 字符串相似度比较
function getSimilarity(str1,str2) {
  let sameNum = 0
  //寻找相同字符
  for (let i = 0; i < str1.length; i++) {
      for(let j =0;j<str2.length;j++){
          if(str1[i]===str2[j]){
              sameNum ++ 
              break
          }
      }
  }
  // console.log(str1,str2);
  // console.log("相似度",(sameNum/str1.length) * 100);
  //判断2个字符串哪个长度比较长
  let length = str1.length > str2.length ? str1.length : str2.length
  return (sameNum/length) * 100 || 0
}



// 关闭按钮的点击事件处理程序
closeButton.addEventListener("click", () => {
  // 隐藏容器
  container.style.display = "none";
});

// 显示按钮的点击事件处理程序
button.addEventListener("click", () => {
  // 将容器的样式设置为显示
  container.style.display = "block";
});


