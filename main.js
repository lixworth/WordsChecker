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
const fs = require("fs");

let pinyin = new Pinyin();
let translate = new Translate();
let search = new WordsSearch();
const s = fs.readFileSync('./ToolGood.Words/csharp/ToolGood.Words.Contrast/BadWord.txt','utf-8')
search.SetKeywords(s.split(/[(\r\n)\r\n]+/));

function response(success = false,message = "拉取成功",data = []) {
    return {
        success: success,
        message: message,
        // data: data
    };
}
app.get('/pinyin/get',(req,res) => {
    let query_data = req.query.data;
    let yin_jie = Boolean(req.query.yin_jie);
    if(query_data){
        res.send(response(true,pinyin.GetPinyin(req.query.data,yin_jie)));
    }else{
        res.send(response(false,"缺少参数"));
    }
});
app.get('/pinyin/first',(req,res) => {
    let query_data = req.query.data;
    if(query_data){
        res.send(response(true,pinyin.GetFirstPinyin(req.query.data)));
    }else{
        res.send(response(false,"缺少参数"));
    }
});
app.get('/pinyin/all',(req,res) => {
    let query_data = req.query.data;
    if(query_data){
        res.send(response(true,pinyin.GetAllPinyin(req.query.data)));
    }else{
        res.send(response(false,"缺少参数"));
    }
});
app.get('/pinyin/name',(req,res) => {
    let query_data = req.query.data;
    let yin_jie = Boolean(req.query.yin_jie);
    if(query_data){
        res.send(response(true,pinyin.GetPinyinForName(req.query.data,yin_jie)));
    }else{
        res.send(response(false,"缺少参数"));
    }
});

app.get('/translate/to_simplified',(req,res) => {
    let query_data = req.query.data;
    let type = req.query.type;
    if(!type){
        type = 0;
    }
    if(query_data){
        res.send(response(true,translate.ToSimplifiedChinese(req.query.data,type)));
    }else{
        res.send(response(false,"缺少参数"));
    }
});
app.get('/translate/to_traditional',(req,res) => {
    let query_data = req.query.data;
    let type = req.query.type;
    if(!type){
        type = 0;
    }
    if(query_data){
        res.send(response(true,translate.ToTraditionalChinese(req.query.data,type)));
    }else{
        res.send(response(false,"缺少参数"));
    }
});

app.get('/search/replace',(req,res) => {
    let query_data = req.query.data;
    if(query_data){
        res.send(response(true,search.Replace(req.query.data,'*')));
    }else{
        res.send(response(false,"缺少参数"));
    }
});
app.get('/search/all',(req,res) => {
    let query_data = req.query.data;
    if(query_data){
        res.send(response(true,search.ContainsAny(req.query.data)));
    }else{
        res.send(response(false,"缺少参数"));
    }
});
app.get('/search/check',(req,res) => {
    let query_data = req.query.data;
    if(query_data){
        res.send(response(true,search.ContainsAny(req.query.data)));
    }else{
        res.send(response(false,"缺少参数"));
    }
});

app.listen(port,()=>{
    console.log(`WordsChecker app listening at http://localhost:${port}`)
});