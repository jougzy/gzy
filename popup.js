document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("detectButton").addEventListener("click", function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "detectInfoBox" }, function(response) {
              // 在插件弹出窗口中显示元素内容
              const infoContainer = document.getElementById("infoContainer");
              infoContainer.innerHTML = "";
              response.forEach(item => {
                  const infoRow = document.createElement("div");
                  infoRow.classList.add("infoRow");

                  const infoLabel = document.createElement("div");
                  infoLabel.classList.add("infoLabel");
                  infoLabel.textContent = `${item.label}:`; // 添加冒号
                  infoRow.appendChild(infoLabel);

                  const infoData = document.createElement("div");
                  infoData.textContent = item.data;
                  infoRow.appendChild(infoData);

                  infoContainer.appendChild(infoRow);
              });
          });
      });
  });
});
