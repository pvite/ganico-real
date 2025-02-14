__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HSShowAnimation; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
* HSShowAnimation Plugin
* @version: 3.0.0 (Sat, 20 Nov 2021)
* @author: HtmlStream
* @event-namespace: .HSShowAnimation
* @license: Htmlstream Libraries (https://htmlstream.com/)
* Copyright 2021 Htmlstream
*/

var dataAttributeName = 'data-hs-show-animation-options';
var defaults = {
  groupName: null,
  targetSelector: null,
  siblingSelector: null,
  eventType: 'click',
  classMap: {
    active: 'active'
  },
  animationType: 'simple',
  animationInit: 'animated',
  animationIn: null,
  duration: null,
  afterShow: function afterShow() {}
};

var HSShowAnimation = /*#__PURE__*/function () {
  function HSShowAnimation(el, options, id) {
    _classCallCheck(this, HSShowAnimation);

    this.collection = [];
    var that = this;
    var elems;

    if (el instanceof HTMLElement) {
      elems = [el];
    } else if (el instanceof Object) {
      elems = el;
    } else {
      elems = document.querySelectorAll(el);
    }

    for (var i = 0; i < elems.length; i += 1) {
      that.addToCollection(elems[i], options, id || elems[i].id);
    }

    if (!that.collection.length) {
      return false;
    } // initialization calls


    that._init();

    return this;
  }

  _createClass(HSShowAnimation, [{
    key: "_init",
    value: function _init() {
      var that = this;

      var _loop = function _loop(i) {
        var _$el = void 0;

        var _options = void 0;

        if (that.collection[i].hasOwnProperty('$initializedEl')) {
          return "continue";
        }

        _$el = that.collection[i].$el;
        _options = that.collection[i].options;
        that.prepareObject(_$el, _options);

        _$el.addEventListener(_options.eventType, function (e) {
          e.preventDefault();

          if (_$el.classList.contains(_options.classMap.active)) {
            return;
          }

          that.activeClassChange(_options);

          if (_options.animationType === 'css-animation') {
            that.cssAnimation(_options);
          } else {
            that.simpleAnimation(_options);
          }
        });
      };

      for (var i = 0; i < that.collection.length; i += 1) {
        var _ret = _loop(i);

        if (_ret === "continue") continue;
      }
    }
  }, {
    key: "prepareObject",
    value: function prepareObject($el, settings) {
      var $targetSelector = document.querySelector(settings.targetSelector),
          $siblingSelector = document.querySelector(settings.siblingSelector);
      $el.setAttribute('data-hs-show-animation-link-group', settings.groupName);

      if (settings.duration) {
        $targetSelector.style.animationDuration = "".concat(settings.duration, "ms");
      }

      $targetSelector.setAttribute('data-hs-show-animation-target-group', settings.groupName);

      if ($siblingSelector) {
        $siblingSelector.setAttribute('data-hs-show-animation-target-group', settings.groupName);
      }
    }
  }, {
    key: "activeClassChange",
    value: function activeClassChange(settings) {
      var $targets = document.querySelectorAll("[data-hs-show-animation-link-group=\"".concat(settings.groupName, "\"]"));

      if ($targets.length) {
        $targets.forEach(function ($item) {
          return $item.classList.remove(settings.classMap.active);
        });
      }
    }
  }, {
    key: "simpleAnimation",
    value: function simpleAnimation(settings) {
      var $targets = document.querySelectorAll("[data-hs-show-animation-target-group=\"".concat(settings.groupName, "\"]")),
          $targetSelector = document.querySelector(settings.targetSelector);

      if ($targets.length) {
        $targets.forEach(function ($item) {
          $item.style.display = 'none';
          $item.style.opacity = 0;
        });
      }

      Object(_utils__WEBPACK_IMPORTED_MODULE_0__["fadeIn"])($targetSelector, 400);
      settings.afterShow();
    }
  }, {
    key: "cssAnimation",
    value: function cssAnimation(settings) {
      var $targets = document.querySelectorAll("[data-hs-show-animation-target-group=\"".concat(settings.groupName, "\"]")),
          $targetSelector = document.querySelector(settings.targetSelector);

      if ($targets.length) {
        $targets.forEach(function ($item) {
          $item.style.display = 'none';
          $item.style.opacity = 0;
          $item.classList.remove(settings.animationInit, settings.animationIn);
        });
      }

      $targetSelector.style.display = 'block';
      settings.afterShow();
      setTimeout(function () {
        $targetSelector.style.opacity = 1;
        $targetSelector.classList.add(settings.animationInit, settings.animationIn);
      }, 50);
    }
  }, {
    key: "addToCollection",
    value: function addToCollection(item, options, id) {
      this.collection.push({
        $el: item,
        id: id || null,
        options: Object.assign({}, defaults, item.hasAttribute(dataAttributeName) ? JSON.parse(item.getAttribute(dataAttributeName)) : {}, options)
      });
    }
  }, {
    key: "getItem",
    value: function getItem(item) {
      if (typeof item === 'number') {
        return this.collection[item].$initializedEl;
      } else {
        return this.collection.find(function (el) {
          return el.id === item;
        }).$initializedEl;
      }
    }
  }]);

  return HSShowAnimation;
}();



//# sourceURL=webpack://HSShowAnimation/./src/js/hs-show-animation.js?