var oReq = new XMLHttpRequest();
//onload请求成功之后响应
// oReq.addEventListener("load", reqListener);
oReq.onload =function () {
    console.log(oReq.responseText);
}
oReq.open("GET", "http://www.example.org/example.txt");
oReq.send();