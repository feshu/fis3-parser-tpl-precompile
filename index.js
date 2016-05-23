'use strict';

var _ = require('underscore');
var Handlebars = require('handlebars');

/**
 * 前端模板预编译（Compile 阶段插件接口）
 * @param  {string} content     文件内容
 * @param  {File}   file        fis 的 File 对象 [fis3/lib/file.js]
 * @param  {object} settings    插件配置属性
 * @return {string}             处理后的文件内容
 */
module.exports = function (content, file, settings) {
    var type = settings.type || 'underscore';
    var source;
    switch(type){
        case 'handlebars':
            source = Handlebars.precompile(content, settings);
            break;
        case 'underscore':
        default :
            source = _.template(content, settings).source;
    }

    if(file.isMod){
        source = 'module.exports = ' + source;
    }else{
        source = '(function(){ return '+source+'})()';
    }

    return source;
};