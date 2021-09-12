'use strict';

const express = require('express');
const app = express();
const port = 3000;
// ToolGood.Words.Pinyin.js        拼音转化
// ToolGood.Words.Translate.js     繁体简体转化
// ToolGood.Words.StringSearch.js  字符串检索
// ToolGood.Words.WordsSearch.js   字符串检索，包含位置信息、索引

const Pinyin = require('./ToolGood.Words.Pinyin.min');
const Translate = require('./ToolGood.Words.Translate.min');
const StringSearch = require('./ToolGood.Words.StringSearch.min');
const WordsSearch = require('./ToolGood.Words.WordsSearch.min');

let pinyin = new Pinyin();
let translate = new Translate();
let search = new StringSearch();

function response(success = false,message = "拉取成功",data = []) {
    return {
        success: success,
        message: message,
        data: data
    };
}
app.get('/',(req,res) => {
    res.send(response(true,pinyin.GetPinyin("我爱中国")))
});

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
});