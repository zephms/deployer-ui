import { ElMessage } from "element-plus";
import axios from "axios";

// todo 针对xhr模式,500请求是否有效有待商榷

interface Config {
  type: string;
  url: string;
  data?: string;
  dataType: string;
}

const urlPrefix = "";

/**
 * INF,从服务器获得json数据
 * 入参为后端的路由,和回调函数
 * 回调函数的入参为any类型的object,已经json反序列化好了
 *
 * 接受返回值,200则序列化并调用回调函数,500则弹窗提醒
 */
function xhrInfo(url: string, recall: (resp: any) => void) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", urlPrefix + url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      recall(JSON.parse(xhr.responseText));
    } else if (xhr.readyState == 4 && xhr.status == 500) {
      ElMessage({
        showClose: true,
        message: xhr.responseText,
        type: "error",
      });
    }
  };
}
function axiosInfo(url: string, recall: (resp: any) => void) {
  axios({
    method: "GET",
    url: urlPrefix + url,
  }).then((res) => {
    if (res.status == 200) {
      recall(res.data);
    } else if (res.status == 500) {
      ElMessage({
        showClose: true,
        message: res.data,
        type: "error",
      });
    }
  });
}

/**
 * EXC, 完整交互
 * 入参payload是object, 回调函数resp也是object
 * 自动以json发送,json反序列化并调用resp
 */
function xhrExchange(
  url: string,
  payload: object,
  recall: (resp: any) => void
) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", urlPrefix + url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(payload));
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      recall(JSON.parse(xhr.responseText));
    } else if (xhr.readyState == 4 && xhr.status == 500) {
      ElMessage({
        showClose: true,
        message: xhr.responseText,
        type: "error",
      });
    }
  };
}

function axiosExchange(
  url: string,
  payload: object,
  recall: (resp: any) => void
) {
  axios({
    method: "POST",
    url: urlPrefix + url,
    data: payload,
  })
    .then((res) => {
      if (res.status == 200) {
        recall(res.data);
      } else if (res.status == 500) {
        ElMessage({
          showClose: true,
          message: res.data,
          type: "error",
        });
      }
    })
    .catch((err) => {
      console.log(err.data);
      console.log(err.dataType);
      console.log(err.response);
    });
}

//原生js封装的ajax
function ajax(config: Config) {
  const xhr = new XMLHttpRequest();

  xhr.open(config.type, config.url, true);

  xhr.send(config.data);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("chengong");

      if (config.dataType == "json") {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log(xhr.responseText);
      }
    }
  };
}
function testInfo(url: string, recall: (resp: any) => void) {
  recall(0);
}
const INF = xhrInfo;
const EXC = xhrExchange;

export type { Config };
export { ajax, INF, EXC };
