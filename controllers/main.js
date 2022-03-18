$(document).ready(function () {
  var callData = new CallData();
  var listchooseitem = new ListChooseItem();
  renderHTML();
  function renderHTML() {
    callData.getListData()
      .done(function (result) {
        var contentnapill = "";
        var contentnavPanes = "";
        //tạo danh mục sản phẩm
        result.navPills.forEach((item) => {
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
  //render từng sản phẩm
  function getElement(temArr) {
    var elmItem = ""
    temArr.forEach((item) => {
      elmItem += `
        <div class="col-md-3">
        <div class="card text-center">
        <img src="${item.imgSrc_jpg}"/>
        <h4><b>${item.name}</b></h4>
        <button data-id="${item.id}" data-type="${item.type}" data-name="${item.name}" data-desc="${item.desc}" data-imgsrcjpg="${item.imgSrc_jpg}" data-imgsrcpng="${item.imgSrc_png}" class="changeStyle">Chọn</button>
        </div>
     </div>`
    })
    return elmItem;
  }
  //render ra danh mục theo thể loại
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
  //Tìm loại sản phẩm 
  function findType(type) {
    var index = -1;
    if (listchooseitem.arr && listchooseitem.arr.length > 0) {
      listchooseitem.arr.forEach(function (item, i) {
        if (item.type === type) {
          index = i;
        }
      })
    }
    return index;
  }
  $("body").delegate(".changeStyle", "click", function () {
    var id = $(this).data("id");
    var type = $(this).data("type");
    var name = $(this).data("name");
    var desc = $(this).data("desc");
    var jpg = $(this).data("imgsrcjpg");
    var png = $(this).data("imgsrcpng");

    var chooseItem = new ChooseItem(id, type, name, desc, jpg, png)
    //xét trường hợp trùng bộ phận mảng để push, cập nhật 
    var index = findType(chooseItem.type);
    if (index !== -1) {
      listchooseitem.arr[index] = chooseItem
    }
    else {
      listchooseitem.addItem(chooseItem)
    }
    renderPicture(listchooseitem.arr);
  })
  //render tổng thể
  function renderPicture(chooseItem) {
    if (chooseItem && chooseItem.length > 0) {
      chooseItem.forEach(function (item) {
        if (item.type === "topclothes") {
          renderBikiniTop(item.imgSrc_png)
        }
        if (item.type === "botclothes") {
          renderBikiniBottom(item.imgSrc_png)
        }
        if (item.type === "shoes") {
          renderFeet(item.imgSrc_png)
        }
        if (item.type === "handbags") {
          renderHandbags(item.imgSrc_png)
        }
        if (item.type === "necklaces") {
          renderNecklace(item.imgSrc_png)
        }
        if (item.type === "hairstyle") {
          renderHairstyle(item.imgSrc_png)
        }
        if (item.type === "background") {
          renderBackground(item.imgSrc_png)
        }
      })
    }
    //render ra giao diện từng bộ phận
    function renderBikiniTop(img) {
      $(".bikinitop").css({
        width: "500px",
        height: "500px",
        background: `url(${img})`,
        position: "absolute",
        top: "-9%",
        left: "-5%",
        zIndex: "3",
        transform: "scale(0.5)"
      })
    }
    function renderBikiniBottom(img) {
      $(".bikinibottom").css({
        width: "500px",
        height: "1000px",
        background: `url(${img})`,
        position: "absolute",
        top: "-30%",
        left: "-5%",
        zIndex: "2",
        transform: "scale(0.5)"
      })
    }
    function renderFeet(img) {
      $(".feet").css({
        width: "500px",
        height: "1000px",
        background: `url(${img})`,
        position: "absolute",
        bottom: "-37%",
        right: "-3.5%",
        transform: "scale(0.5)",
        zIndex: "1"
      })
    }
    function renderHandbags(img) {
      $(".handbag").css({
        width: "500px",
        height: "1000px",
        background: `url(${img})`,
        position: "absolute",
        bottom: "-40%",
        right: "-3.5%",
        transform: "scale(0.5)",
        zIndex: "4"
      })
    }
    function renderNecklace(img) {
      $(".necklace").css({
        width: "500px",
        height: "1000px",
        background: `url(${img})`,
        position: "absolute",
        bottom: "-40%",
        right: "-3.5%",
        transform: "scale(0.5)",
        zIndex: "4"
      })
    }
    function renderHairstyle(img) {
      $(".hairstyle").css({
        width: "1000px",
        height: "1000px",
        background: `url(${img})`,
        position: "absolute",
        top: "-75%",
        right: "-57%",
        transform: "scale(0.15)",
        zIndex: "4"
      })
    }
    function renderBackground(img) {
      $(".background").css({
        backgroundImage: `url(${img})`
      })
    }
  }
})