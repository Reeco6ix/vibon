/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 85);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var user = {
    vibesIDs: [],

    routes: {
        'vibes': '/user/vibes',
        'attributes': 'user/attributes'
    },

    getVibesIDs: function getVibesIDs() {
        var _this = this;

        return axios.get(this.routes.vibes).then(function (response) {
            _this.vibesIDs = response.data;
        }).catch(function (errors) {
            return console.log(errors);
        });
    },
    getAccessToken: function getAccessToken() {
        var _this2 = this;

        var now = new Date();
        now.setHours(now.getHours() - 1);
        var oneHourAgo = now.getTime();

        return new Promise(function (resolve, reject) {
            if (localStorage['token_set_at'] >= oneHourAgo) {
                resolve(localStorage['access_token']);
            } else {
                return axios.get(_this2.routes.attributes).then(function (response) {
                    localStorage['token_set_at'] = new Date(response.data.token_set_at).getTime();
                    localStorage['access_token'] = response.data.access_token;
                    resolve(localStorage['access_token']);
                }).catch(function (error) {
                    reject(error.response.data.errors);
                });
            }
        });
    },
    updateVibesIDs: function updateVibesIDs(vibe) {
        if (!parseInt(vibe.auto_dj)) {
            this.vibesIDs.push(vibe.id);
        } else {
            this.vibesIDs = this.vibesIDs.filter(function (id) {
                return id !== vibe.id;
            });
        }
    },
    allVibesIDsExcept: function allVibesIDsExcept(id) {
        return this.vibesIDs.filter(function (vibeID) {
            return vibeID !== id;
        });
    }
};

window.user = user;
/* harmony default export */ __webpack_exports__["default"] = (user);

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })

/******/ });