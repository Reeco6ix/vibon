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
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var user = {
    vibesIDs: [],

    routes: {
        'userVibes': '/user/vibes'
    },

    getVibesIDs: function getVibesIDs() {
        var _this = this;

        return axios.get(this.routes.userVibes).then(function (response) {
            _this.vibesIDs = response.data;
        }).catch(function (errors) {
            return console.log(errors);
        });
    },
    getAccessToken: function getAccessToken() {
        var now = new Date();
        now.setHours(now.getHours() - 1);
        var oneHourAgo = now.getTime();

        if (localStorage['token_set_at'] >= oneHourAgo) {
            return localStorage['access_token'];
        } else {
            var _user = $.ajax({
                type: 'GET',
                dataType: 'json',
                async: false,
                url: '/playback-user',
                success: function success(data) {
                    return data;
                }
            });

            var userAttributes = JSON.parse(_user.responseText);
            localStorage['token_set_at'] = new Date(userAttributes['token_set_at']).getTime();
            localStorage['access_token'] = userAttributes['access_token'];
            return localStorage['access_token'];
        }
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

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vibes__ = __webpack_require__(5);


var playback = {
    vibes: __WEBPACK_IMPORTED_MODULE_0__vibes__["a" /* default */],

    player: {},
    show: false,
    paused: false,

    playVibe: function playVibe(_ref) {
        var playlist_uri = _ref.playlist_uri,
            track_uri = _ref.track_uri,
            _ref$playerInstance$_ = _ref.playerInstance._options,
            getOAuthToken = _ref$playerInstance$_.getOAuthToken,
            id = _ref$playerInstance$_.id;

        getOAuthToken(function (access_token) {
            fetch('https://api.spotify.com/v1/me/player/play?device_id=' + id, {
                method: 'PUT',
                body: JSON.stringify({
                    context_uri: playlist_uri,
                    offset: {
                        uri: track_uri
                    }
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                }
            });
        });
    },

    playTracks: function playTracks(_ref2) {
        var tracks_uris = _ref2.tracks_uris,
            track_uri = _ref2.track_uri,
            _ref2$playerInstance$ = _ref2.playerInstance._options,
            getOAuthToken = _ref2$playerInstance$.getOAuthToken,
            id = _ref2$playerInstance$.id;

        getOAuthToken(function (access_token) {
            fetch('https://api.spotify.com/v1/me/player/play?device_id=' + id, {
                method: 'PUT',
                body: JSON.stringify({
                    uris: tracks_uris,
                    offset: {
                        uri: track_uri
                    }
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                }
            });
        });
    },

    updateData: function updateData(state) {
        if (state) {
            this.show = true;

            var trackID = state['track_window']['current_track']['linked_from']['id'] ? state['track_window']['current_track']['linked_from']['id'] : state['track_window']['current_track']['id'];

            if (Object.keys(this.vibes.show).length > 0) {
                this.vibes.show.api_tracks = this.vibes.show.api_tracks.map(function (track) {
                    if (track.id === trackID) {
                        track.active = true;
                        return track;
                    }
                    track.active = false;
                    return track;
                });
            }

            if (state['paused']) {
                this.paused = true;
            } else {
                this.paused = false;
            }
        }
    },
    playOrResume: function playOrResume() {
        this.player.resume().then(function () {});
    },
    pause: function pause() {
        this.player.pause().then(function () {});
    },
    previous: function previous() {
        this.player.previousTrack().then(function () {});
    },
    next: function next() {
        this.player.nextTrack().then(function () {});
    }
};

window.playback = playback;
/* harmony default export */ __webpack_exports__["default"] = (playback);

/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user__ = __webpack_require__(2);


var Vibes = {
    all: [],
    show: {},
    showID: '',
    message: '',
    deletedMessage: '',

    user: __WEBPACK_IMPORTED_MODULE_0__user__["default"],

    routes: {
        'index': '/vibe',
        'create': '/vibe',
        'update': function update(vibeID) {
            return '/vibe/' + vibeID;
        },
        'delete': function _delete(vibeID) {
            return '/vibe/' + vibeID;
        },

        'autoRefresh': function autoRefresh(vibeID) {
            return '/track-vibe-auto/vibe/' + vibeID;
        },
        'syncVibe': function syncVibe(vibeID) {
            return 'sync/vibe/' + vibeID;
        },
        'syncPlaylist': function syncPlaylist(vibeID) {
            return 'sync/playlist/' + vibeID;
        },

        'acceptJoinRequest': function acceptJoinRequest(requestID) {
            return '/join-request/accept/' + requestID;
        },
        'rejectJoinRequest': function rejectJoinRequest(requestID) {
            return '/join-request/reject/' + requestID;
        },

        'sendJoinRequest': function sendJoinRequest(vibeID) {
            return '/join-request/vibe/' + vibeID;
        },
        'cancelJoinRequest': function cancelJoinRequest(requestID) {
            return '/join-request/delete/' + requestID;
        },
        'leaveVibe': function leaveVibe(vibeID) {
            return '/user-vibe/vibe/' + vibeID;
        },
        'joinVibe': function joinVibe(vibeID) {
            return '/user-vibe/vibe/' + vibeID;
        },

        'removeUser': function removeUser(vibeID, userID) {
            return '/user-vibe/vibe/' + vibeID + '/user/' + userID;
        },

        'removeTrack': function removeTrack(vibeID, trackID) {
            return '/track-vibe/vibe/' + vibeID + '/track/' + trackID;
        },
        'addTrack': function addTrack(vibeID, trapApiId) {
            return '/track-vibe/vibe/' + vibeID + '/track-api/' + trapApiId;
        },

        'upvoteTrack': function upvoteTrack(vibeID, trackID) {
            return '/vote/vibe/' + vibeID + '/track/' + trackID;
        },
        'downvoteTrack': function downvoteTrack(vibeID, trackID) {
            return '/vote/vibe/' + vibeID + '/track/' + trackID;
        }
    },

    readyToShow: function readyToShow() {
        return Object.keys(this.show).length > 0;
    },
    updateShowData: function updateShowData() {
        var _this = this;

        if (this.showID !== '') {
            this.all.forEach(function (vibe) {
                if (vibe.id === _this.showID) {
                    _this.show = vibe;
                }
            });
        }
    },
    updateData: function updateData(response) {
        var _this2 = this;

        this.all = this.all.map(function (vibe) {
            if (vibe.id === response.vibe.id) {
                _this2.show = response.vibe;
                _this2.message = response.message;
                setTimeout(function () {
                    return _this2.message = '';
                }, 10000);
                return response.vibe;
            }
            return vibe;
        });
    },
    getVibeName: function getVibeName(vibeID) {
        return this.all.find(function (vibe) {
            return vibe.id === vibeID;
        }).name;
    },
    getAll: function getAll() {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
            return axios.get(_this3.routes.index).then(function (response) {
                var vibesData = response.data;
                for (var key in vibesData) {
                    if (vibesData.hasOwnProperty(key)) {
                        _this3.all.push(vibesData[key].vibe);
                    }
                }

                _this3.updateShowData();
                resolve(vibesData);
            }).catch(function (error) {
                reject(error.response.data.errors);
            });
        });
    },
    create: function create(form) {
        var _this4 = this;

        form.post(this.routes.create).then(function (response) {
            console.log(response.vibe);
            _this4.all.push(response.vibe);
            _this4.user.updateVibesIDs(response.vibe);
        }).catch(function (errors) {
            return console.log(errors);
        });
    },
    display: function display(vibeID) {
        var _this5 = this;

        this.showID = parseInt(vibeID);

        if (Object.keys(this.all).length > 0) {
            this.all.forEach(function (vibe) {
                if (vibe.id === _this5.showID) {
                    _this5.show = vibe;
                }
            });
        }
    },
    update: function update(form, vibeID) {
        var _this6 = this;

        return form.update(this.routes.update(vibeID)).then(function (response) {
            _this6.all = _this6.all.map(function (vibe) {
                if (vibe.id === response.vibe.id) {
                    _this6.show = response.vibe;
                    _this6.user.updateVibesIDs(response.vibe);
                    return response.vibe;
                }
                return vibe;
            });
        }).catch(function (errors) {
            return console.log(errors);
        });
    },
    delete: function _delete(form, vibeID) {
        var _this7 = this;

        form.delete(this.routes.delete(vibeID)).then(function (response) {
            _this7.all = _this7.all.filter(function (vibe) {
                return vibe.id !== vibeID;
            });
            _this7.user.vibesIDs = _this7.user.vibesIDs.filter(function (id) {
                return id !== vibeID;
            });
            _this7.show = {};
            _this7.deletedMessage = response.message;
        }).catch(function (errors) {
            return console.log(errors);
        });
    },
    autoRefresh: function autoRefresh(form, vibeID) {
        var _this8 = this;

        form.post(this.routes.autoRefresh(vibeID)).then(function (response) {
            _this8.updateData(response);
        }).catch(function (errors) {
            return console.log(errors);
        });
    },
    syncVibe: function syncVibe(form, vibeID) {
        var _this9 = this;

        form.post(this.routes.syncVibe(vibeID)).then(function (response) {
            _this9.updateData(response);
        }).catch(function (errors) {
            return console.log(errors);
        });
    },
    syncPlaylist: function syncPlaylist(form, vibeID) {
        var _this10 = this;

        form.post(this.routes.syncPlaylist(vibeID)).then(function (response) {
            _this10.updateData(response);
        }).catch(function (errors) {
            return console.log(errors);
        });
    },
    acceptJoinRequest: function acceptJoinRequest(form, requestID) {
        var _this11 = this;

        form.delete(this.routes.acceptJoinRequest(requestID)).then(function (response) {
            _this11.updateData(response);
        }).catch(function (errors) {
            return console.log(errors);
        });
    },
    rejectJoinRequest: function rejectJoinRequest(form, requestID) {
        var _this12 = this;

        form.delete(this.routes.rejectJoinRequest(requestID)).then(function (response) {
            _this12.updateData(response);
        }).catch(function (errors) {
            return console.log(errors);
        });
    },
    sendJoinRequest: function sendJoinRequest(form, vibeID) {
        var _this13 = this;

        form.post(this.routes.sendJoinRequest(vibeID)).then(function (response) {
            _this13.updateData(response);
        }).catch(function (errors) {
            return console.log(errors);
        });
    },


    cancelJoinRequest: function cancelJoinRequest(form, requestID) {
        var _this14 = this;

        form.delete(this.routes.cancelJoinRequest(requestID)).then(function (response) {
            _this14.updateData(response);
        }).catch(function (errors) {
            return console.log(errors);
        });
    },

    joinVibe: function joinVibe(form, vibeID) {
        var _this15 = this;

        form.post(this.routes.joinVibe(vibeID)).then(function (response) {
            _this15.updateData(response);
            _this15.user.updateVibesIDs(response.vibe);
        }).catch(function (errors) {
            return console.log(errors);
        });
    },

    leaveVibe: function leaveVibe(form, vibeID) {
        var _this16 = this;

        form.delete(this.routes.leaveVibe(vibeID)).then(function (response) {
            _this16.updateData(response);
            _this16.user.vibesIDs = _this16.user.vibesIDs.filter(function (id) {
                return id !== vibeID;
            });
        }).catch(function (errors) {
            return console.log(errors);
        });
    },

    removeUser: function removeUser(form, vibeID, userID) {
        var _this17 = this;

        form.delete(this.routes.removeUser(vibeID, userID)).then(function (response) {
            _this17.updateData(response);
        }).catch(function (errors) {
            return console.log(errors);
        });
    },

    removeTrack: function removeTrack(form, vibeID, trackID) {
        var _this18 = this;

        form.delete(this.routes.removeTrack(vibeID, trackID)).then(function (response) {
            _this18.all = _this18.all.map(function (vibe) {
                if (!vibe.auto_jd) {
                    vibe.api_tracks.forEach(function (track) {
                        if (track.vibon_id === trackID) {
                            var trackVibeIndex = track.vibes.indexOf(response.vibe.id);
                            if (trackVibeIndex !== -1) {
                                track.vibes.splice(trackVibeIndex, 1);
                            }
                        }
                    });
                }

                if (vibe.id === response.vibe.id) {
                    _this18.show = response.vibe;
                    return response.vibe;
                }

                return vibe;
            });
        }).catch(function (errors) {
            return console.log(errors);
        });
    },

    addTrack: function addTrack(form, vibeID, trackApiId) {
        var _this19 = this;

        form.post(this.routes.addTrack(vibeID, trackApiId)).then(function (response) {
            _this19.all = _this19.all.map(function (vibe) {
                if (!vibe.auto_jd) {
                    vibe.api_tracks.forEach(function (track) {
                        if (track.id === trackApiId) {
                            track.vibes.push(response.vibe.id);
                        }
                    });
                }

                if (vibe.id === response.vibe.id) {
                    _this19.show = response.vibe;
                    return response.vibe;
                }
                return vibe;
            });
        }).catch(function (errors) {
            return console.log(errors);
        });
    },

    upvoteTrack: function upvoteTrack(form, vibeID, trackID) {
        var _this20 = this;

        form.post(this.routes.upvoteTrack(vibeID, trackID)).then(function (response) {
            _this20.updateData(response);
        }).catch(function (errors) {
            return console.log(errors);
        });
    },

    downvoteTrack: function downvoteTrack(form, vibeID, trackID) {
        var _this21 = this;

        form.delete(this.routes.downvoteTrack(vibeID, trackID)).then(function (response) {
            _this21.updateData(response);
        }).catch(function (errors) {
            return console.log(errors);
        });
    }
};

/* harmony default export */ __webpack_exports__["a"] = (Vibes);

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })

/******/ });