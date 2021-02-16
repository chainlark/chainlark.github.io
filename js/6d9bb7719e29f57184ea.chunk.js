(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common~._src_c"],{

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js!../../node_modules/stylus-loader/dist/cjs.js!./src/css/stylus/style.styl":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-1!./node_modules/css-loader/dist/cjs.js!/Users/chenquan/Workspace/website/chainlark.com/node_modules/stylus-loader/dist/cjs.js!./src/css/stylus/style.styl ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/css/stylus/style.styl":
/*!***********************************!*\
  !*** ./src/css/stylus/style.styl ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_1_node_modules_css_loader_dist_cjs_js_node_modules_stylus_loader_dist_cjs_js_style_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-1!../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/stylus-loader/dist/cjs.js!./style.styl */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js!../../node_modules/stylus-loader/dist/cjs.js!./src/css/stylus/style.styl");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_1_node_modules_css_loader_dist_cjs_js_node_modules_stylus_loader_dist_cjs_js_style_styl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_1_node_modules_css_loader_dist_cjs_js_node_modules_stylus_loader_dist_cjs_js_style_styl__WEBPACK_IMPORTED_MODULE_1__);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_1_node_modules_css_loader_dist_cjs_js_node_modules_stylus_loader_dist_cjs_js_style_styl__WEBPACK_IMPORTED_MODULE_1___default.a, options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_1_node_modules_css_loader_dist_cjs_js_node_modules_stylus_loader_dist_cjs_js_style_styl__WEBPACK_IMPORTED_MODULE_1___default.a.locals || {});

/***/ }),

/***/ "./src/js/index.ts":
/*!*************************!*\
  !*** ./src/js/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var swiper_1 = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");
// import Swiper styles
__webpack_require__(/*! swiper/swiper-bundle.css */ "./node_modules/swiper/swiper-bundle.css");
console.log("index.ts");
swiper_1["default"].use([swiper_1.Navigation, swiper_1.Pagination]);
var swiper = new swiper_1["default"]('.swiper-container', {
    spaceBetween: 10,
    loop: true,
    speed: 400,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
    },
});


/***/ }),

/***/ "./src/js/main.ts":
/*!************************!*\
  !*** ./src/js/main.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(/*! ./util/jquery_polyfill.ts */ "./src/js/util/jquery_polyfill.ts");
__webpack_require__(/*! ../css/stylus/style.styl */ "./src/css/stylus/style.styl");
__webpack_require__(/*! highlight.js */ "../../node_modules/highlight.js/lib/index.js");
var $ = window.$;
window.$('.al_header_setting').click(function (event) {
    $('.al_sidebar').addClass('al_sidebar_Active');
    $('body').addClass('al_no_scroll');
});
$('.al_sidebar_close,.al_sidebar_overlay').click(function (event) {
    $('.al_sidebar').removeClass('al_sidebar_Active');
    $('body').removeClass('al_no_scroll');
    event.stopPropagation();
});
$('.al_social_icon_cnt').click(function (event) {
    window.open($(event.target).attr('data_link'));
});
$('.al_lightbox_cnt').click(function (event) {
    $('.al_lightbox_cnt').removeClass('al_lightbox_cnt_Active');
    $('body').removeClass('al_no_scroll');
    event.stopPropagation();
});
$('#post-body img').click((function (event) {
    var imageDOM = event.target;
    if (!imageDOM) {
        return;
    }
    $('.al_lightbox_cnt').addClass('al_lightbox_cnt_Active');
    $('body').addClass('al_no_scroll');
    $('.al_lightbox_img').attr('src', imageDOM.getAttribute('src'));
}));


/***/ }),

/***/ "./src/js/util/jquery_polyfill.ts":
/*!****************************************!*\
  !*** ./src/js/util/jquery_polyfill.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var JQueryObject = /** @class */ (function () {
    function JQueryObject(nodes) {
        var _this = this;
        this.click = function (callback) {
            for (var index = 0; index < _this.nodes.length; index++) {
                _this.nodes[index].addEventListener('click', callback);
            }
            return _this;
        };
        this.addClass = function () {
            var classNames = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                classNames[_i] = arguments[_i];
            }
            var _loop_1 = function (className) {
                _this.nodes.forEach(function (node) {
                    node.classList.add(className);
                });
            };
            for (var _a = 0, classNames_1 = classNames; _a < classNames_1.length; _a++) {
                var className = classNames_1[_a];
                _loop_1(className);
            }
            return _this;
        };
        this.removeClass = function (className) {
            for (var index = 0; index < _this.nodes.length; index++) {
                _this.nodes[index].classList.remove(className);
            }
            return _this;
        };
        this.attr = function (attributeName, newValue) {
            if (!newValue) {
                return _this.nodes[0].getAttribute(attributeName);
            }
            else {
                _this.nodes[0].setAttribute(attributeName, newValue);
                return newValue;
            }
        };
        this.nodes = nodes;
    }
    return JQueryObject;
}());
window.$ = function (queryObject) {
    if (typeof queryObject === 'string') {
        var nodes_1 = [];
        document.querySelectorAll(queryObject).forEach(function (element) {
            nodes_1.push(element);
        });
        var object = new JQueryObject(nodes_1);
        return object;
    }
    else {
        var object = new JQueryObject([queryObject]);
        return object;
    }
};


/***/ })

}]);
//# sourceMappingURL=6d9bb7719e29f57184ea.chunk.js.map