var common = require('../../../core/lib/common');
var misc = require('../../../core/lib/misc');
var connection = require('../../../core/lib/connection');   // todo: can load from CLI modules

var routeTable = BLITITOR.route;

// var query = require('./query');

// var db = require('./database');



function indexPage(req, res) {
    var params = {
        title: "관리자화면"
    };


    res.send('hi this is admin home');
}

function loginForm(req, res) {
    var params = {
        title: "관리자화면"
    };

    res.render(BLITITOR.config.site.theme + '/admin/login', params);
}

function loginProcess(req, res) {
    res.redirect(routeTable.admin_root);
}

module.exports = {
    index: indexPage,
    loginForm: loginForm,
    loginProcess: loginProcess
    // list: listPost,
    // write: writeForm,
    // save: savePost,
    // view: viewPost,
    // recentPost: recentPost
};