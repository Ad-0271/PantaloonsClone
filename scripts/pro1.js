let dataB = JSON.parse(localStorage.getItem("database"));

    function toHomepage() {
        window.location.href="homePage.html";
    }



    let womenTop = document.getElementById("womenTop");
    womenTop.addEventListener("click", toProductpage);

    if(localStorage.getItem("categoryPage") == null) {
        localStorage.setItem("categoryPage", JSON.stringify([]));
    }

    function toProductpage() {
        let productPage = JSON.parse(localStorage.getItem("categoryPage"));
        productPage = [];

        dataB.forEach(function(el) {
            if(el.gender == "women") {
                productPage.push(el);
            }
        });
        localStorage.setItem("categoryPage", JSON.stringify(productPage));
        window.location = 'pro1.html';
    }



    let menTop = document.getElementById("menTop");
    menTop.addEventListener("click", toPP);

    if(localStorage.getItem("categoryPage") == null) {
        localStorage.setItem("categoryPage", JSON.stringify([]));
    }

    function toPP() {
        let productPage = JSON.parse(localStorage.getItem("categoryPage"));
        productPage = [];

        dataB.forEach(function(el) {
            if(el.gender == "men") {
                productPage.push(el);
            }
        });
        localStorage.setItem("categoryPage", JSON.stringify(productPage));
        window.location = 'pro1.html';
    }



    let kidTop = document.getElementById("kidsTop");
    kidTop.addEventListener("click", toproPage);

    if(localStorage.getItem("categoryPage") == null) {
        localStorage.setItem("categoryPage", JSON.stringify([]));
    }

    function toproPage() {
        let productPage = JSON.parse(localStorage.getItem("categoryPage"));
        productPage = [];

        dataB.forEach(function(el) {
            if(el.gender == "kids") {
                productPage.push(el);
            }
        });
        localStorage.setItem("categoryPage", JSON.stringify(productPage));
        window.location = 'pro1.html';
    }



    let saleRed = document.getElementById("red");
    saleRed.addEventListener("click", toprPage);

    if(localStorage.getItem("categoryPage") == null) {
        localStorage.setItem("categoryPage", JSON.stringify([]));
    }

    function toprPage() {
        let productPage = JSON.parse(localStorage.getItem("categoryPage"));
        productPage = [];

        dataB.forEach(function(el) {
            if(el.discount == "45%" || el.discount == "50%") {
                productPage.push(el);
            }
        });
        localStorage.setItem("categoryPage", JSON.stringify(productPage));
        window.location = 'pro1.html';
    }

    
        let searchable = ["men", "women", "kids", "boys", "girls", "shirt", "jeans", "chinos", "t-shirt", "sandals", "shoes", "boots", "crocs", "skirt", "top", "suit", "blazer", "trackpant", "trousers", "kurti", "saree", "boxers", "kurta", "checkers", "plain", "print", "stripes", "solid", "slim-fit", "narrow-bottom", "ankle-length", "turtle-neck", "skinny-fit", "regular-fit", "cotton", "polyester", "knit-wear", "Viscose Polyester", "linen", "georgette", "Mid-rise", "high-rise", "low-rise", "machine-wash", "hand-wash", "Levis", "Peter England", "Roadster", "Biba", "Zara", "Richard Parker", "Maanywar", "Wrogn", "One", "Fcuk", "H&M", "Mast & Harbor", "Denim", "Raymond", "Allen Solly", "Van Heusen"];


        const searchInput = document.getElementById("search");
        const searchWrapper = document.querySelector(".wrapper");
        const resultsWrapper = document.querySelector(".results");

        searchInput.addEventListener("keyup", searchInp);

        function searchInp() {
            let results = [];
            let input = searchInput.value;

            if(input.length) {
                results = searchable.filter((item) => {
                    return item.toLowerCase().includes(input.toLowerCase());
                });
            }
            renderResults(results.slice(0, 5));
        }


        function renderResults(results) {
            if(!results.length) {
                return searchWrapper.classList.remove('show');
            }

            const content = results.map((item) => {
                return `<li>${item}</li>`
            }).join("");

            searchWrapper.classList.add('show');
            resultsWrapper.innerHTML = `<ul>${content}</ul>`;
            var list1 = (document.getElementsByTagName("li"));

            for(var i = 0; i < list1.length; i++) {
                let element = list1[i].innerText;
                list1[i].onclick = function() {
                    inputVal(element);
                }
            }

        }

        function inputVal(el) {
            searchInput.value = el;
            return searchWrapper.classList.remove('show');
        }

        var submitSearch = document.getElementById("searchImg");
        submitSearch.addEventListener("click", submitVal);

        function submitVal() {
            let value = searchInput.value;
            let productPage = JSON.parse(localStorage.getItem("categoryPage"));
            productPage = [];
            let flag = true;

            dataB.forEach(function(el) {
                if(el.type == value || el.brand == value || el.features.pattern == value || el.features.fit == value || el.features.material == value || el.features.waist_rise == value || el.features.wash_instruction == value || el.gender == value) {
                    flag = false;
                    productPage.push(el);
                }
            });
            if(flag) {
                productPage = dataB;
            }
            localStorage.setItem("categoryPage", JSON.stringify(productPage));
            window.location = 'pro1.html';
        }


    let database = JSON.parse(localStorage.getItem("categoryPage"));
    document.getElementById("total_items").textContent = database.length;
    let parent = document.getElementById("products");

    function showProducts(data) {
        parent.innerHTML = null;
        
        data.forEach(function(el) {
            let div = document.createElement("div");
            div.setAttribute('id', el.price + ' ' + el.discount);
            div.onclick = () => {
                productdescription(el.brand, el.gender, el.price, el.discount, el.type);
            };

            let img = document.createElement("img");
            img.src = el.image1;
            img.setAttribute('id', el.brand + el.gender + el.price + el.discount + el.type);
            img.onmouseenter = () => {
                imgslide(el.image1, el.image2, el.image3, el.image4, el.brand, el.gender, el.price, el.discount, el.type);
            };
            img.onmouseleave = () => {
                clearInterval(interval);
            };

            let brand_name = document.createElement("h3");

            brand_name.textContent = el.brand;

            let product_type = document.createElement("p");

            product_type.textContent = el.type + " " + el.gender;

            let mrp = document.createElement("div");
            mrp.style.display = "flex";
            mrp.style.gap = "10px";

            let ele_price = document.createElement("div");

            let discVal = Number(el.discount.split("").splice(0, 2).join(""));

            discVal = Math.round((el.price) * ((100 - discVal) / 100));

            ele_price.textContent = "₹" + discVal;

            let price_div = document.createElement("div");

            price_div.textContent = "₹" + el.price;
            price_div.style.textDecoration= "line-through";
            price_div.style.color= "grey";

            let disc_div = document.createElement("div");

            disc_div.textContent = el.discount + " OFF";
            disc_div.style.color= "red";

            mrp.append(ele_price, price_div, disc_div);


            div.append(img, brand_name, product_type, mrp);

            parent.append(div);
        });

        document.getElementById("total_items").textContent = data.length;
    };
    showProducts(database);

    function sortFunction(value) {

        if(value == "low") {
            let arr = database.sort(function(a, b) {
                return a.price - b.price;
            });
            showProducts(arr);
        } else if(value == "high") {
            let arr = database.sort(function(a, b) {
                return b.price - a.price;
            });
            showProducts(arr);
        } else if(value == "discount") {
            let arr = database.sort(function(a, b) {
                val1 = Number(a.discount.slice(0, 2));
                val2 = Number(b.discount.slice(0, 2));
                return val2 - val1;
            });
            showProducts(arr);
        }
    }
    
    let data = JSON.parse(localStorage.getItem('categoryPage'));
    let anotherdata = [];

    let filter = {


        GENDER : {
            icon : 'https://cdn0.iconfinder.com/data/icons/gender-outline-set/144/GenderSymbol001-512.png',
                   },
        check_genders : function(){
            data.forEach(el => {
                this.GENDER[el.gender] = 'yo whatsup';
            });
        },

        BRAND : {
            icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAYAAADskT9PAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF3WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wMi0xOVQxNTozNjoxNSswNTozMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDItMjJUMTM6MDA6MDIrMDU6MzAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDItMjJUMTM6MDA6MDIrMDU6MzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YTRkN2NhNmEtZDgwYi1mOTRiLWIxNjgtZTZiZGU3OWY0MTA5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZjNzY1MmE0LWNiYTYtZDI0Mi05ZDViLTAyMjY0YTQzYTkyNiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjZjNzY1MmE0LWNiYTYtZDI0Mi05ZDViLTAyMjY0YTQzYTkyNiI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NmM3NjUyYTQtY2JhNi1kMjQyLTlkNWItMDIyNjRhNDNhOTI2IiBzdEV2dDp3aGVuPSIyMDE4LTAyLTE5VDE1OjM2OjE1KzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphNGQ3Y2E2YS1kODBiLWY5NGItYjE2OC1lNmJkZTc5ZjQxMDkiIHN0RXZ0OndoZW49IjIwMTgtMDItMjJUMTM6MDA6MDIrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+MfNemQAAAcFJREFUSInt1s+LjVEYB/DPnfvOzL1+3VA0N1KMYiW9kf+A8lewkKZsJmulLBRmIVnIH2C2mrAaWVjJwgohYqEuya8G497L4jzXvPN2iXRlcb+bc57n+XbO95z39HzfSp7nsAITqPo36OAlFrLYeBp7otgd8OYjMd7BTIbD2I9LaOELxpGhHeQxLPapZVFvl3Ltn3B7623AEbzNMImbuIAt2IT7+IhVWIsn0k1txSs8w2a8iIUngrMtcuv7cJ9iYwh7g+2YrDabzYOhbB7ncBIfUMM+TOEujuEM9uIBTsQGO3AcD3EK73AIp7Ebj3A2BB7FTtzGAYz0vkcPa+LEtbj2eqiuohG1dRiNU45hZcwFdxSrg9uLG4V8LbgVlh7Er9CWXm2nlO8W6l8L8yI+x7hY4CzD7wgYKIYChgKGAv5bAb1uNS5ZdbWQI/X/Mam7ZVLHFFyFuFbi1kvr/HAzUhe7hve4hedYkMzjNa4H77FkLFck06rHvIVZyXzm8KnAnZVMak4yoi6+QSXP8/OSPU5Zap2DRg0X0cpwFTO4ITkZy/+MOoW4U6iX89XSqA+3l2+EiMuZZMPT2PX3B/sj3MP8d6bTamv/WI7/AAAAAElFTkSuQmCC',
        },
        check_brands : function(){
            data.forEach(el => {
                this.BRAND[el.brand] = 'yo whatsup';
            })
        },

        TYPE : {
            icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAAAAXNSR0IArs4c6QAAAUJJREFUOBFjNDY2/s+AB5w9e5YRjzSDoaGhKCMjY9q5c+dakdUxIXPIYTMxMXUD9dUCHSiHrJ8ig4GGmQMNiwe6mP3///9dVDMYaNBEmGFAw8MNDAxcYXyyXQwM2wigISAXwwEwWCYAOcwgAbIMVlFRYQca0gk3EcoAuloLaGEq2Qbz8fFVAjWjRBbMEqDhTerq6rwsMAFSaKDmn8DIasSlh4uLSx2X3Kg49UIAXg4YGRk1ACPFH2i0ARBfAEbOBmD+xxlBhJwANhho6AWgofpYFF8AFkKGWMQJCjFDXRqOQ6WEpKQk4/Pnzw/gkMcpDMp5AThlgRLQ4MGnBKscE44gQFYMCnOSARMwki7i00VIHpdeUFBswCUJFSckj1U73lQBci0wyZEVFOCyExjrM0CxD7RaEBjmElDvzwQaCipzyQIAp5pLCCcokqYAAAAASUVORK5CYII=',
        },
        check_types : function(){
            data.forEach(el => {
                this.TYPE[el.type] = 'yo whatsup';
            })
        },

        FIT : {
            icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAkCAYAAACXOioTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF3WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wMi0xOVQxNTozNzowNyswNTozMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDItMjJUMTM6MDA6MjkrMDU6MzAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDItMjJUMTM6MDA6MjkrMDU6MzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODQ3NzExYTQtMWQ4Yy0zNDQyLTgyNGQtNjc3Y2QyNGNmM2YzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY0Y2NiNjdiLTM1NzctYjY0MC04OWQ4LTMyNWE5ZThkY2QyOSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY0Y2NiNjdiLTM1NzctYjY0MC04OWQ4LTMyNWE5ZThkY2QyOSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjRjY2I2N2ItMzU3Ny1iNjQwLTg5ZDgtMzI1YTllOGRjZDI5IiBzdEV2dDp3aGVuPSIyMDE4LTAyLTE5VDE1OjM3OjA3KzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NDc3MTFhNC0xZDhjLTM0NDItODI0ZC02NzdjZDI0Y2YzZjMiIHN0RXZ0OndoZW49IjIwMTgtMDItMjJUMTM6MDA6MjkrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+qnESpgAAAvBJREFUSInN10+I1VUUB/DPhKCBuLA/IzLVNLWItwiap4JOEdVEOC1KTRAGyYhIN7pwoRtREGrrn80URRC6EJRRkFQIQsw/VGoJtZAxYqihhzmBvgxpIBfnPvzNe+/33u+Xmw78OPfdc+7ve8/vnvM99/VUq1UlpA9L8Qj+wnn8XGThnBIgA/gB85vmX8cX3RY/UAJoeQJZjSV4Ps0/W2Rx0YgW4DXUxe7vpPlJvIyPMd3pBZ0i6sUGjOMG1mN/BgT24lXU0gY2i3NskZ6cZNiO3SLiSRzDIZxt41vFGozi8TS3P4F2BfoH3+A9/NTOIUcq2IW1eAy/Ngx5n24K10qCSP4T4iyvZw15QKdF2v4XGcUZs88yF2gcCzFUEqQizulosyEP6FzSL5QEei7pr4sC1TAj6qeMPJT070WBiKwbFZ+wiMzF2yIhWoq3E9BOLMZYQaC9go62tDN2AvoSO0RNdKP4XryLT9O6UkAbBIfVReF2kncEi+xLz0BRoHF8hhdxUJxVp8TYhBMiCdbhQrN/O6AhDGOrIMrDoj0sywEZELVzUiTBM/ger3QDelBU9ieiuv8WxDqVA/SHKIWn0+/ptLmuzHAGT+A38Qn78ZJ83ruJbeIsCeb/UBTtQqzCvnaN745ghDGRcW+m+Tqu4kfcTuN6xlYXbWRFGp8XlIT8NtGQPoxgJQbd6zdFpI4rgqCP9FSr1XHcwilclv+JKqKA3xIRVzK2aZGdX4nzrMn0IiL3a3hftOrswl/S+OGcSGZwHJ+7d48YEbX3RrPzHGwUdDOcHJ5KtsGkJ3Epjb9NG/hOm54j+G5QMEVLRFJUB9NzP3Ir6d5mQx4zDOFfEWUZadTao0WBGo5/lgS6kfSiokBPJl0rCdTwb+HFvJvqTNIfmN2Wr4tzaGHnJP1pbfP9PBfogKCd9WanfRG5hD1FgaYFRzWkIsiWaIIfiU6avble7IRe9JKfZYt5SU90e3lWyvxtuS/5XwNNCG68UmbRXYpbpFMIi4paAAAAAElFTkSuQmCC',
        },
        check_fit : function(){
            data.forEach(el => {
                this.FIT[el.features.fit] = 'yo whatsup';
            })
        },

        WASH_INSTRUCTION : {
            icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAANCAYAAADISGwcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFEmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wMi0yMlQxNjozMDo0OSswNTozMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDItMjJUMTY6NDI6MDMrMDU6MzAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDItMjJUMTY6NDI6MDMrMDU6MzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MmExNjIxMjMtY2FmYS1kODRkLWJjYmEtNDU4MjRlYzMyNjdiIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJhMTYyMTIzLWNhZmEtZDg0ZC1iY2JhLTQ1ODI0ZWMzMjY3YiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjJhMTYyMTIzLWNhZmEtZDg0ZC1iY2JhLTQ1ODI0ZWMzMjY3YiI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MmExNjIxMjMtY2FmYS1kODRkLWJjYmEtNDU4MjRlYzMyNjdiIiBzdEV2dDp3aGVuPSIyMDE4LTAyLTIyVDE2OjMwOjQ5KzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpA8ElwAAAFGSURBVDiNrdS9SgNBFMXxnx+dYKVN2iBoYxUwqKRRQbAQbXwFaysLK23EOi8hiCBYKqiIn6ugIBb6CFaCdiEWuZElZo2SPc3snJn537Psne2p1+taVSqVjvCO5R+L+Wgfg0mSzPZmbLjAdMbaRhtvDYUWrxB+O01HDb8FGEYR4yl/HlsxNlXEJqotjGr4xZQ3HvPhZoD+jAC3MU5hCKt4xXr4e9jGp8ZbDmAJhzjAIhZi7yl2MBqMt3SNnowegGecYRfHGUH/qxmsoIKxJEkyPwHcxMYEtRyK14JVCTayewDOMRLPLzkEaDJGgt0xwDX6MCmVuAvdBKsv2B0DPOEjDt3lEOAuWB/B7highqs4dJ9DgPtgXUn11G8BaNzVMh5114i1YJSD+a2s/0BTDxp3fA4TXQQQjIFg/jnASYx7XRZP6zI9+QL3jkqt4/VcWAAAAABJRU5ErkJggg==',
        },
        check_wash_instructions : function(){
            data.forEach(el => {
                this.WASH_INSTRUCTION[el.features.wash_instruction] = 'yo whatsup';
            })
        },

        MATERIAL : {
            icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAiCAYAAACqVHINAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF3WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wMi0xOVQxNTozNzoxNCswNTozMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDItMjJUMTM6MDA6MzcrMDU6MzAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDItMjJUMTM6MDA6MzcrMDU6MzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZmRhOTAwZDktNmFiMi1jMjQ3LTk0YzgtYzczZmE2NzI4MWU4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmM4ZjJlYzZkLTllMDEtYTI0Ni04ZTE3LWVjMjc4NjdmNjVjZCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmM4ZjJlYzZkLTllMDEtYTI0Ni04ZTE3LWVjMjc4NjdmNjVjZCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzhmMmVjNmQtOWUwMS1hMjQ2LThlMTctZWMyNzg2N2Y2NWNkIiBzdEV2dDp3aGVuPSIyMDE4LTAyLTE5VDE1OjM3OjE0KzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmZGE5MDBkOS02YWIyLWMyNDctOTRjOC1jNzNmYTY3MjgxZTgiIHN0RXZ0OndoZW49IjIwMTgtMDItMjJUMTM6MDA6MzcrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+U9Ka0gAAAXtJREFUSInt1jFLHEEYxvHf6RWSgJUBrS7FlSccrIHgZ7BRjhAsJUW+gKbQWAUMgRSJjfgFFBQrUVJEA7EJBFKkNIVXpRCs5ALHiSlmNcfF1fN276p7YNl3Z2bn/84w+7ybi6JIk57jFZ6gISMNxPc8PmIDZVQwkhUkjwK2MdHUPonFON7HAY5w3ilkGI+a2t4KqynFzyXMo46v+Ixd/GwXkoui6BgLeIc1vESxjXdP8QV7+ITft0EuUcMbLOFBuxm26BdeYzMJkpWqeNzaOPD/uFQqYLzbEJjtBWSqF5CSli3rBoSW1XQL8qwXkLJw0jqGXAjWcpcqaSCDgvXUbhlTw580EIKFLCdMvips1RnG0kDgA77HcT2evIjD+NrAdFpIA3NYF/zqUHDkHf/KxAydG2SuKS4KWU/cMO4Co1kc4RMMJfT9wMMsIA28ELK+0haeCj8k1XwGEPgmFKwxvBfqyrWygsBKUke3bKUP6UP6kHt+xJ1CkgzxRv0Fwf5CDoaGY64AAAAASUVORK5CYII=',
        },
        check_material : function(){
            data.forEach(el => {
                this.MATERIAL[el.features.material] = 'yo whatsup';
            })
        },

        PATTERN : {
            icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF3WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wMi0xOVQxNTozNzoyMiswNTozMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDItMjJUMTM6MDA6NDMrMDU6MzAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDItMjJUMTM6MDA6NDMrMDU6MzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OWFmMzhhYWMtM2QzZi0xODRj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',
        },
        check_pattern : function(){
            data.forEach(el => {
                this.PATTERN[el.features.pattern] = 'yo whatsup';
            })
        },

        WAIST_RISE : {
            icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAZpJREFUOBGtlTFrwkAUx19CRLuo30CxWboJgrO6lH4Av4CCSL5D6ZqtQ8ClSwaHfIVIcG9BXdSl6GCxJFToUlBEkr732pNULKXkDpL37r3L7/7cXe4plUrlAb5bFEUX+GxVVeVIGIZ3k8nkVeSFxW8i4f9mNUw8xpL3iqLcYv+DYofDYRvL/ekKQSgOlPhoVPKG/avRaLSJx0/9c4objQaYpslD+/0+kGIpbTgcQrVaPbKkgfP5PJRKJQYHQSBPMUG73S6DB4OBPPB4PIZOpyN/KYrFItAGUptOp/IU01HLZDIM1jRNHni5XEKv12MwvRKfinq9Ds1m8wgkx/O85OD5fA62bf8A+76fHExnlp5cLge0gdTwKkgOZhK+dF0HwzC467quPDDeL9But8U88sCFQgFqtRqDZ7OZPDCd3Ww2y+B0Oi0PvFgswLIs+UtRLpeh1WoxmK7QxD+IkLharcBxHO6u12tQsBpciiTaJ6xz1/jfv1Nst9u94EbsY3l2z1WQ0zGk2BVBrFV7rHlf02IwlUrdoHkW+f/YTzrnf0eyZPGpAAAAAElFTkSuQmCC',
        },
        check_waist_rise : function(){
            data.forEach(el => {
                this.WAIST_RISE[el.features.waist_rise] = 'yo whatsup';
            })
        },

    };

    filter.check_genders();
    filter.check_brands();
    filter.check_types();
    filter.check_fit();
    filter.check_wash_instructions();
    filter.check_material();
    filter.check_pattern();
    filter.check_waist_rise();

    let menu = document.getElementById('menu_Bar');
    menu.innerHTML = null;


    let arr = [];
    for(let key in filter){

        if (Object.keys(filter[key]).length > 2){

            let filter_div = document.createElement('div');
            filter_div.style.height = 'fit-content'
            filter_div.style.border = '1px solid rgb(214, 214, 214)';
            filter_div.setAttribute('id', key);
            

            let div1 = document.createElement('div');
            div1.style.display = 'flex';
            div1.onclick = () => {
                addcategories(key);
            };

            let div2 = document.createElement('div');
            div2.setAttribute('id', key + 'chcklst');

            let img_div = document.createElement('div');
            img_div.style.flexBasis = '25%';
            img_div.style.height = '90%';
            // img_div.style.margin = '1% 3%';
            // img_div.style.border = '1px solid black';

            let img = document.createElement('img');
            img.src = filter[key].icon;
            // img.style.width = '100%';
            // img.style.height = '100%';
            img_div.appendChild(img);

            let text_div = document.createElement('div');
            text_div.innerHTML = key;
            text_div.style.margin = '0 0 5% 0';
            text_div.style.padding= " 0 0 5% 0"

            div1.append(img_div, text_div);
            filter_div.append(div1, div2);
            menu.appendChild(filter_div);

        }
    }


    let checklist_div = document.createElement('div');


    function addcategories(category){




        let checklist_div = document.getElementById(category + 'chcklst');
        

       

        if (checklist_div.textContent != ''){
            checklist_div.textContent = '';
        } else {
            let checklist = document.createElement('ul');
        
            for (let key in filter[category]){

                if(key != 'icon'){

                    let list = document.createElement('li');
                    list.setAttribute('id',key);
                    list.innerHTML = key;
                    list.onclick = () => {
                        if(document.getElementById(key).style.fontWeight < 700){
                            document.getElementById(key).style.fontWeight = '700';
                        } else {
                            document.getElementById(key).style.fontWeight = '200';
                        }
                        showfiltereddata(key);
                        
                    }
                    checklist.appendChild(list);
                }
            } 
            checklist_div.appendChild(checklist);
        }

        
    };
    
    let mySet = new Set();
    let setarr = []
    
    function showfiltereddata(input) {
        if(mySet.has(input)) {
            mySet.delete(input);
        } else {
            mySet.add(input);
        }

        setarr = Array.from(mySet.values());

        let anotheruselesvar = [];
        for (let i = 0; i < setarr.length; i++){
            filterdata(setarr[i]);
            for(let j = 0; j < arr5.length; j++) {
                anotheruselesvar.push(arr5[j]);
            }
        };

        let anotherset = new Set();
        for (let i = 0; i < anotheruselesvar.length; i++){
            anotherset.add(anotheruselesvar[i]);
        }
        
        let arr6 = Array.from(anotherset.values());

        //jugaad for sort + filter : ----->;
        if(setarr.length > 0) {
            database = arr6;
            showProducts(arr6);
        } else {
            database = data;
            showProducts(data);
        }
        
    }

    let new_var;

    let arr5 = [];
    function filterdata(parameter){
        new_var = parameter;
        arr5 = data.filter(checker);
    };
        
    function checker(el) {
        if(el.type == new_var || el.gender == new_var || el.brand == new_var || el.features.pattern == new_var || el.features.fit == new_var || el.features.wash_instruction == new_var || el.features.material == new_var || el.features.waist_rise == new_var){

            return true;
            } else {
                return false;
            }
    };

    let interval;
    function imgslide(img1, img2, img3, img4, brand, gender, price, discount, type){

        let images = [img1, img2, img3, img4];

        let imgdiv = document.getElementById(brand + gender + price + discount + type)

        let count = 0;

        interval = setInterval(function() {
            // console.log(images[count]);
            imgdiv.src = null;
            imgdiv.src = images[count];
            count++;
            if (count == images.length){
                count = 0;
            }          
        }, 1000);
    };
    
    function productdescription(brand, gender, price, discount, type){
        
        let productdetails = data.filter(el => {
            return el.brand == brand && el.gender == gender && el.price == price && el.discount == discount && el.type == type;
        });

        if (localStorage.getItem('productDescription') == null){
            localStorage.setItem('productDescription', JSON.stringify());
        };

        localStorage.setItem('productDescription', JSON.stringify(productdetails));

        window.location = 'productDescription.html';
    };


    let toCart = document.getElementById("toCart");
        toCart.addEventListener("click", toCartPage);

        function toCartPage() {
            window.location.href = "Cart.html";
        }

    let brandsTop = document.getElementById("brandsTop");
        brandsTop.addEventListener("click", toBrands);

        function toBrands() {
            window.location.href = "brands.html";
        }

        let toLogin = document.getElementById("toLogin");
        toLogin.addEventListener("click", toLoginPage);

        function toLoginPage() {
            window.location.href= "signin.html";
        }

        let email_btn3 = document.getElementById("email_btn3");
        email_btn3.addEventListener("click", mailChecker);

        function mailChecker() {
            let email_enter = document.getElementById("email_enter").value;
            if(email_enter.length > 0) {
                alert("Confirmation Mail Sent");
            } else {
                alert("Please Enter Valid Email Address");
            }
        }