var fs = require('fs');
var winston = require('winston');
var Site = require('../../module/site/index');
var Account = require('../../module/account/index');
var Guestbook = require('../../module/guestbook/index');

var siteMiddleware = Site.middleware;
var accountMiddleware = Account.middleware;
var guestbookMiddleware = Guestbook.middleware;

var misc = require('../../core/lib/misc');
var routeTable = BLITITOR.route;

function testMiddleware1(req, res, next) {
    console.log('Route Middleware Test Method 1');
    next();
}

function testMiddleware2(req, res, next) {
    console.log('Route Middleware Test Method 2');
    next();
}

var Menu = [
    {
        name: '홈',
        page: 'index', type: 'get', url: '/',
        middleware: [testMiddleware1, testMiddleware2],
        route: true,
    },
    {
        name: '팀 블로그',
        page: 'blog', type: 'get', url: '/blog',
        middleware: [],
        route: true,
    },
    {
        name: '방명록',
        url: routeTable.guestbook_root,
        route: false,
    },
    {
        name: '소개',
        page: 'about', type: 'get', url: '/about',
        middleware: [],
        route: true,
    },
    {
        name: '새글쓰기',
        page: 'write', type: 'get', url: '/blog/write',
        middleware: [accountMiddleware.checkSignedIn],
        route: true,
        logged: 1,
        level: 2, grant: 'AMC'
    },
    {
        name: '로그인',
        page: 'sign_in', type: 'get', url: routeTable.account_root + routeTable.account.signIn,
        middleware: [],
        route: true,
        logged: -1
    },
    {
        name: '가입하기',
        page: 'sign_up', type: 'get', url: routeTable.account_root + routeTable.account.signUp,
        middleware: [accountMiddleware.checkLoggedSession],
        route: true,
        logged: -1
    },
    {
        name: '로그아웃',
        page: 'sign_out', type: 'get', url: routeTable.account_root + routeTable.account.signOut,
        middleware: [],
        route: true,
        logged: 1
    },
];

function menuExpose(req, res, next) {

    // var pages = BLITITOR.route.pages;
    // console.log('pages:', pages);

    //todo: retrieve from database site menu record which should match with `pages` items
    // read from database
    res.locals.menu = Menu;

    next();
}

function menuData() {
    return Menu;
}

module.exports = {
    expose: menuExpose,
    data: menuData
};