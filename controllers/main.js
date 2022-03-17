$(document).ready(function () {
  var callData = new CallData();
  renderHTML();
  function renderHTML() {
    callData.getListData()
      .done(function (result) {
        console.log(result.navPills)
        var contentnapill = "";
        var contentnavPanes = "";
        result.navPills.forEach((item, index) => {
          var active = item.tabName === "tabTopClothes" ? "active" : "";
          var fade = item.tabName !== "tabTopClothes" ? "fade" : "";
          contentnapill += `
                <li class="nav-item">
              <a
                class="nav-link ${active} btn-default"
                data-toggle="pill"
                href="#${item.tabName}"
                >${item.showName}</a
              >
            </li>`
          contentnavPanes += `<div class="tab-pane container ${fade} ${active}" id="${item.tabName}">
            <div class="container">
            <div class="row">
            ${renderTabPane(item.tabName, result.tabPanes)}
            </div>
            </div>
            </div>`
        });
        $(".nav-pills").html(contentnapill);
        $(".tab-content").html(contentnavPanes);
      })
      .fail(function (error) {
        console.log(error)
      });
  }
  //Lọc sản phẩm từ backend 
  function getTypeArr(tabType, data) {
    var temArr = [];
    data.forEach(function (item) {
      if (item.type === tabType) {
        temArr.push(item)
      }
    })
    return temArr
  }
  //Cấu tạo trong sản phẩm
  function getElement(temArr) {
    var elmItem = ""
    temArr.forEach((item) => {
      elmItem += `
        <div class="col-md-3">
        <div class="card text-center">
        <img src="${item.imgSrc_jpg}"/>
        <h4><b>${item.name}</b></h4>
        <button>Chọn</button>
        </div>
     </div>`
    })
    return elmItem;
  }
  function renderTabPane(tabName, arrtabPane) {
    var temArr = null;
    var elementItem = null;
    switch (tabName) {
      case "tabTopClothes":
        temArr = getTypeArr("topclothes", arrtabPane)
        elementItem = getElement(temArr);
        break;
      case "tabBotClothes":
        temArr = getTypeArr("botclothes", arrtabPane)
        elementItem = getElement(temArr);
        break;
      case "tabShoes":
        temArr = getTypeArr("shoes", arrtabPane)
        elementItem = getElement(temArr);
        break;
      case "tabHandBags":
        temArr = getTypeArr("handbags", arrtabPane)
        elementItem = getElement(temArr);
        break;
      case "tabNecklaces":
        temArr = getTypeArr("necklaces", arrtabPane)
        elementItem = getElement(temArr);
        break;
      case "tabHairStyle":
        temArr = getTypeArr("hairstyle", arrtabPane)
        elementItem = getElement(temArr);
        break;
      case "tabBackground":
        temArr = getTypeArr("background", arrtabPane)
        elementItem = getElement(temArr);
        break;
      default:
        break;
    }
    return elementItem;
  }
})