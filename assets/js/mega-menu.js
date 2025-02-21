__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HSMegaMenu; });
/* harmony import */ var _methods_object_assign_deep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods/object-assign-deep */ "./src/js/methods/object-assign-deep.js");
/* harmony import */ var _methods_object_assign_deep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_methods_object_assign_deep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _methods_get_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./methods/get-type */ "./src/js/methods/get-type.js");
/* harmony import */ var _methods_smart_position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./methods/smart-position */ "./src/js/methods/smart-position.js");
/* harmony import */ var _methods_desktop_css_animation_enable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./methods/desktop-css-animation-enable */ "./src/js/methods/desktop-css-animation-enable.js");
/* harmony import */ var _methods_desktop_mouseenter_event_listener__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./methods/desktop-mouseenter-event-listener */ "./src/js/methods/desktop-mouseenter-event-listener.js");
/* harmony import */ var _methods_desktop_mouseleave_event_listener__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./methods/desktop-mouseleave-event-listener */ "./src/js/methods/desktop-mouseleave-event-listener.js");
/* harmony import */ var _methods_desktop_click_event_listener__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./methods/desktop-click-event-listener */ "./src/js/methods/desktop-click-event-listener.js");
/* harmony import */ var _methods_mobile_click_event_listener__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./methods/mobile-click-event-listener */ "./src/js/methods/mobile-click-event-listener.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
* HSMegaMenu Plugin
* @version: 2.0.1 (Sun, 1 Nov 2021)
* @author: HtmlStream
* @event-namespace: .HSMegaMenu
* @license: Htmlstream Libraries (https://htmlstream.com/)
* Copyright 2021 Htmlstream
*/








var dataAttributeName = 'data-hs-mega-menu-options';
var defaults = {
  eventType: 'hover',
  direction: 'horizontal',
  breakpoint: 'lg',
  rtl: false,
  isMenuOpened: false,
  sideBarRatio: 1 / 4,
  pageContainer: document.getElementsByTagName('body'),
  mobileSpeed: 400,
  duration: 300,
  delay: 0,
  itemOptions: {
    megaMenuTimeOut: null,
    desktop: {
      animation: 'animated',
      animationIn: 'slideInUp',
      animationOut: false,
      position: null,
      maxWidth: null
    }
  },
  classMap: {
    rtl: '.hs-rtl',
    reversed: '.hs-reversed',
    initialized: '.hs-menu-initialized',
    mobileState: '.hs-mobile-state',
    invoker: '.hs-mega-menu-invoker',
    subMenu: '.hs-sub-menu',
    hasSubMenu: '.hs-has-sub-menu',
    hasSubMenuActive: '.hs-sub-menu-opened',
    megaMenu: '.hs-mega-menu',
    hasMegaMenu: '.hs-has-mega-menu',
    hasMegaMenuActive: '.hs-mega-menu-opened'
  }
};

var HSMegaMenu = /*#__PURE__*/function () {
  function HSMegaMenu(el, options, id) {
    _classCallCheck(this, HSMegaMenu);

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

  _createClass(HSMegaMenu, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      var that = this;

      var _loop = function _loop(i) {
        var _$el = void 0;

        var _options = void 0;

        if (that.collection[i].hasOwnProperty('$initializedEl')) {
          return "continue";
        }

        _$el = that.collection[i].$el;
        _options = that.collection[i].options;
        _options.state = null; // Resolution list

        resolutionsList = {
          xs: 0,
          sm: 576,
          md: 768,
          lg: 992,
          xl: 1200
        }; // Keycodes

        ESC_KEYCODE = 27;
        TAB_KEYCODE = 9;
        ENTER_KEYCODE = 13;
        SPACE_KEYCODE = 32;
        ARROW_UP_KEYCODE = 38;
        ARROW_DOWN_KEYCODE = 40;
        ARROW_RIGHT_KEYCODE = 39;
        ARROW_LEFT_KEYCODE = 37; // Prevent scroll

        var preventScroll = function preventScroll(keycode) {
          return function (e) {
            if (e.which === keycode) {
              e.preventDefault();
            }
          };
        }; // Get Item Settings


        var getItemSettings = function getItemSettings($el) {
          if (!$el) return false;
          var dataSettings = $el.hasAttribute('data-hs-mega-menu-item-options') ? JSON.parse($el.getAttribute('data-hs-mega-menu-item-options')) : {},
              itemSettings = _options.itemOptions;
          itemSettings = Object.assign({}, itemSettings, dataSettings);

          itemSettings.activeItemClass = function () {
            return Object(_methods_get_type__WEBPACK_IMPORTED_MODULE_1__["default"])($el, _options) === 'mega-menu' ? _options.classMap.hasMegaMenuActive : _options.classMap.hasSubMenuActive;
          };

          return itemSettings;
        };

        var stateDetection = function stateDetection() {
          if (window.innerWidth < resolutionsList[_options.breakpoint]) {
            _this.state = 'mobile';
          } else {
            _this.state = 'desktop';
          }
        };

        stateDetection(); // State Detection

        window.addEventListener('resize', function () {
          stateDetection();
        }); // Set RTL

        if (_options.rtl) {
          _$el.addClass(_options.classMap.rtl.slice(1));
        } // Init Menu Items


        _$el.querySelectorAll("".concat(_options.classMap.hasMegaMenu, ", ").concat(_options.classMap.hasSubMenu)).forEach(function (el) {
          _this.MegaMenuItem(el, el.querySelector(_options.classMap[Object(_methods_get_type__WEBPACK_IMPORTED_MODULE_1__["default"])(el, _options) === 'mega-menu' ? 'megaMenu' : 'subMenu']), _options);
        }); // Add Initialized Classes


        _$el.classList.add("".concat(_options.classMap.initialized.slice(1)), "hs-menu-".concat(_options.direction)); // *****
        // Start: ACCESSIBILITY
        // *****


        myPreventScrollSpace = preventScroll(SPACE_KEYCODE);
        myPreventScrollDown = preventScroll(ARROW_DOWN_KEYCODE);
        myPreventScrollUp = preventScroll(ARROW_UP_KEYCODE);
        var $items = void 0,
            index = void 0,
            state = null;
        document.addEventListener('keyup', function () {
          window.removeEventListener('keydown', myPreventScrollSpace, false);
          window.removeEventListener('keydown', myPreventScrollUp, false);
          window.removeEventListener('keydown', myPreventScrollDown, false);
        });
        document.addEventListener('keyup', function (e) {
          if (!e.target.closest("".concat(_options.classMap.hasMegaMenu, ", ").concat(_options.classMap.hasSubMenu)) || e.target.closest('input')) return false; //
          // Start: PREVENT SCROLL
          //

          e.preventDefault();
          e.stopPropagation();
          window.addEventListener('keydown', myPreventScrollSpace, false);
          window.addEventListener('keydown', myPreventScrollUp, false);
          window.addEventListener('keydown', myPreventScrollDown, false); //
          // End: PREVENT SCROLL
          //
          //
          // Start: ELEMENT DETECTION
          //

          if (e.target.classList.contains(_options.classMap.invoker.slice(1)) && !e.target.closest(["".concat(_options.classMap.subMenu, ", ").concat(_options.classMap.megaMenu)])) {
            // console.log('Top level');
            if (state !== 'topLevel') {
              state = 'topLevel';
            }

            $items = [].slice.call(e.target.parentNode.parentNode.querySelectorAll(_options.classMap.invoker)).filter(function (item) {
              if (!item.closest(["".concat(_options.classMap.subMenu, ", ").concat(_options.classMap.megaMenu)])) {
                return item.offsetParent !== null;
              }
            });
          } else if (e.target.closest(["".concat(_options.classMap.subMenu, ", ").concat(_options.classMap.megaMenu)]) && e.target.parentNode.querySelector("".concat(_options.classMap.subMenu, ", ").concat(_options.classMap.megaMenu))) {
            // console.log('Has submenu and not top level');
            if (state !== 'hasSubmenu') {
              state = 'hasSubmenu';
            }

            $items = [].slice.call(e.target.parentNode.parentNode.querySelectorAll(_options.classMap.invoker)).filter(function (item) {
              return item.offsetParent !== null;
            });
          } else {
            // console.log('Just element');
            if (state !== 'simple') {
              state = 'simple';
            }

            $items = [].slice.call(e.target.closest(["".concat(_options.classMap.subMenu, ", ").concat(_options.classMap.megaMenu)]).querySelectorAll('a, button')).filter(function (item) {
              return item.offsetParent !== null;
            });
          } //
          // End: ELEMENT DETECTION
          //


          index = $items.indexOf(e.target); //
          // Start: TOP LEVEL
          //
          // Left

          if (state === 'topLevel' && e.which === ARROW_LEFT_KEYCODE && index > 0) {
            index--;
          } // Right


          if (state === 'topLevel' && e.which === ARROW_RIGHT_KEYCODE && index < $items.length - 1) {
            index++;
          } // Open Sub


          if (state === 'topLevel' && (e.which === ARROW_DOWN_KEYCODE || e.which === SPACE_KEYCODE || e.which === ENTER_KEYCODE)) {
            if (!e.target.parentNode.querySelector(["".concat(_options.classMap.megaMenu, ".").concat(_options.itemOptions.desktop.animationIn, ", ").concat(_options.classMap.subMenu, ".").concat(_options.itemOptions.desktop.animationIn)])) {
              Object(_methods_desktop_mouseenter_event_listener__WEBPACK_IMPORTED_MODULE_4__["default"])(e.target.parentNode, e.target.parentNode.querySelector(["".concat(_options.classMap.subMenu, ", ").concat(_options.classMap.megaMenu)]), _options, getItemSettings(e.target.parentNode))();
            } else if (e.target.parentNode.querySelector(["".concat(_options.classMap.megaMenu, ".").concat(_options.itemOptions.desktop.animationIn, ", ").concat(_options.classMap.subMenu, ".").concat(_options.itemOptions.desktop.animationIn)])) {
              e.target.parentNode.querySelector(["".concat(_options.classMap.megaMenu, ".").concat(_options.itemOptions.desktop.animationIn, ", ").concat(_options.classMap.subMenu, ".").concat(_options.itemOptions.desktop.animationIn)]).querySelectorAll('a')[0].focus();
              return;
            }
          } // Close Siblings


          if (state === 'topLevel' && (e.which === TAB_KEYCODE || e.which === ARROW_RIGHT_KEYCODE || e.which === ARROW_LEFT_KEYCODE) && e.target.closest("".concat(_options.classMap.hasMegaMenu, ", ").concat(_options.classMap.hasSubMenu)).parentNode.querySelector("".concat(_options.classMap.megaMenu, ".").concat(_options.itemOptions.desktop.animationIn, ", ").concat(_options.classMap.subMenu, ".").concat(_options.itemOptions.desktop.animationIn))) {
            Object(_methods_desktop_mouseleave_event_listener__WEBPACK_IMPORTED_MODULE_5__["default"])(e.target.closest("".concat(_options.classMap.hasMegaMenu, ", ").concat(_options.classMap.hasSubMenu)), e.target.closest("".concat(_options.classMap.hasMegaMenu, ", ").concat(_options.classMap.hasSubMenu)).parentNode.querySelector("".concat(_options.classMap.hasMegaMenuActive, " > ").concat(_options.classMap.megaMenu, ", ").concat(_options.classMap.hasSubMenuActive, " > ").concat(_options.classMap.subMenu)), _options, getItemSettings(e.target.closest("".concat(_options.classMap.hasMegaMenu, ", ").concat(_options.classMap.hasSubMenu))))();
          } //
          // End: TOP LEVEL
          //
          //
          // Start: HAS SUB-MENU BUT NOT TOP LEVEL
          //
          // Up


          if (state === 'hasSubmenu' && e.which === ARROW_UP_KEYCODE && index > 0) {
            index--;
          } // Down


          if (state === 'hasSubmenu' && e.which === ARROW_DOWN_KEYCODE && index < $items.length - 1) {
            index++;
          } // Open Sub


          if (state === 'hasSubmenu' && (e.which === ARROW_LEFT_KEYCODE || e.which === ARROW_RIGHT_KEYCODE || e.which === SPACE_KEYCODE || e.which === ENTER_KEYCODE)) {
            if (!e.target.parentNode.querySelector(["".concat(_options.classMap.megaMenu, ".").concat(_options.itemOptions.desktop.animationIn, ", ").concat(_options.classMap.subMenu, ".").concat(_options.itemOptions.desktop.animationIn)])) {
              Object(_methods_desktop_mouseenter_event_listener__WEBPACK_IMPORTED_MODULE_4__["default"])(e.target.parentNode, e.target.parentNode.querySelector(["".concat(_options.classMap.subMenu, ", ").concat(_options.classMap.megaMenu)]), _options, getItemSettings(e.target.parentNode))();
            } else if (e.target.parentNode.querySelector(["".concat(_options.classMap.megaMenu, ".").concat(_options.itemOptions.desktop.animationIn, ", ").concat(_options.classMap.subMenu, ".").concat(_options.itemOptions.desktop.animationIn)])) {
              e.target.parentNode.querySelector(["".concat(_options.classMap.megaMenu, ".").concat(_options.itemOptions.desktop.animationIn, ", ").concat(_options.classMap.subMenu, ".").concat(_options.itemOptions.desktop.animationIn)]).querySelectorAll('a')[0].focus();
              return;
            }
          } // Close Siblings


          if (state === 'hasSubmenu' && (e.which === TAB_KEYCODE || e.which === ARROW_DOWN_KEYCODE || e.which === ARROW_UP_KEYCODE) && e.target.closest(["".concat(_options.classMap.hasMegaMenu, ", ").concat(_options.classMap.hasSubMenu)]).parentNode.querySelectorAll("".concat(_options.classMap.megaMenu, ".").concat(_options.itemOptions.desktop.animationIn, ", ").concat(_options.classMap.subMenu, ".").concat(_options.itemOptions.desktop.animationIn)).length) {
            Object(_methods_desktop_mouseleave_event_listener__WEBPACK_IMPORTED_MODULE_5__["default"])(e.target.closest(["".concat(_options.classMap.hasMegaMenu, ", ").concat(_options.classMap.hasSubMenu)]), e.target.closest(["".concat(_options.classMap.hasMegaMenu, ", ").concat(_options.classMap.hasSubMenu)]).parentNode.querySelector("".concat(_options.classMap.hasMegaMenuActive, " > ").concat(_options.classMap.megaMenu, ", ").concat(_options.classMap.hasSubMenuActive, " > ").concat(_options.classMap.subMenu)), _options, getItemSettings(e.target.closest(["".concat(_options.classMap.hasMegaMenu, ", ").concat(_options.classMap.hasSubMenu)])))();
          } //
          // End: HAS SUB-MENU BUT NOT TOP LEVEL
          //
          //
          // Start: SIMPLE
          //
          // Left, Up


          if (state === 'simple' && e.which === ARROW_UP_KEYCODE && index > 0) {
            index--;
          } // Right, Down


          if (state === 'simple' && e.which === ARROW_DOWN_KEYCODE && index < $items.length - 1) {
            index++;
          } // Close Siblings


          if (state === 'simple' && (e.which === ARROW_RIGHT_KEYCODE || e.which === ARROW_LEFT_KEYCODE) && e.target.closest(_options.classMap.hasSubMenu).parentNode.querySelector(_options.classMap.subMenu)) {
            e.target.closest(_options.classMap.hasSubMenu).querySelector(_options.classMap.invoker).focus();
            Object(_methods_desktop_mouseleave_event_listener__WEBPACK_IMPORTED_MODULE_5__["default"])(e.target.closest(_options.classMap.hasSubMenu), e.target.closest(_options.classMap.hasSubMenu).parentNode.querySelector("".concat(_options.classMap.hasSubMenuActive, " > ").concat(_options.classMap.subMenu)), _options, getItemSettings(e.target.closest(_options.classMap.hasSubMenu)))();
            return;
          } //
          // End: SIMPLE
          //
          // Close Self


          if (e.which === ESC_KEYCODE && _this.state === 'desktop' && document.querySelector("".concat(_options.classMap.megaMenu, ".").concat(_options.itemOptions.desktop.animationIn, ", ").concat(_options.classMap.subMenu, ".").concat(_options.itemOptions.desktop.animationIn))) {
            Object(_methods_desktop_mouseleave_event_listener__WEBPACK_IMPORTED_MODULE_5__["default"])(document.querySelector("".concat(_options.classMap.hasMegaMenuActive, ", ").concat(_options.classMap.hasSubMenuActive)), document.querySelector("".concat(_options.classMap.megaMenu, ".").concat(_options.itemOptions.desktop.animationIn, ", ").concat(_options.classMap.subMenu, ".").concat(_options.itemOptions.desktop.animationIn)), _options, getItemSettings(document.querySelector("".concat(_options.classMap.hasMegaMenuActive, ", ").concat(_options.classMap.hasSubMenuActive))))();
            return;
          } // Reset index


          if (index < 0) {
            index = 0;
          }

          $items[index].focus();
        });
        document.addEventListener('keyup', function (e) {
          // Close All
          if (e.which === TAB_KEYCODE && document.querySelector("".concat(_options.classMap.megaMenu, ".").concat(_options.itemOptions.desktop.animationIn, ", ").concat(_options.classMap.subMenu, ".").concat(_options.itemOptions.desktop.animationIn))) {
            Object(_methods_desktop_mouseleave_event_listener__WEBPACK_IMPORTED_MODULE_5__["default"])(document.querySelector("".concat(_options.classMap.hasMegaMenuActive, ", ").concat(_options.classMap.hasSubMenuActive)), document.querySelector("".concat(_options.classMap.megaMenu, ".").concat(_options.itemOptions.desktop.animationIn, ", ").concat(_options.classMap.subMenu, ".").concat(_options.itemOptions.desktop.animationIn)), _options, getItemSettings(document.querySelector("".concat(_options.classMap.hasMegaMenuActive, ", ").concat(_options.classMap.hasSubMenuActive))))();
          }
        }); // *****
        // End: ACCESSIBILITY
        // *****

        that.collection[i].$initializedEl = _options;
      };

      for (var i = 0; i < that.collection.length; i += 1) {
        var resolutionsList;
        var ESC_KEYCODE, TAB_KEYCODE, ENTER_KEYCODE, SPACE_KEYCODE, ARROW_UP_KEYCODE, ARROW_DOWN_KEYCODE, ARROW_RIGHT_KEYCODE, ARROW_LEFT_KEYCODE;
        var myPreventScrollSpace, myPreventScrollDown, myPreventScrollUp;

        var _ret = _loop(i);

        if (_ret === "continue") continue;
      }
    }
  }, {
    key: "MegaMenuItem",
    value: function MegaMenuItem(el, menu, params) {
      var context = this,
          settings = params,
          itemDataSettings = el.hasAttribute('data-hs-mega-menu-item-options') ? JSON.parse(el.getAttribute('data-hs-mega-menu-item-options')) : {},
          $el = el,
          $menu = menu;
      var itemSettings = {
        eventType: itemDataSettings.eventType ? itemDataSettings.eventType : settings.eventType,
        megaMenuTimeOut: null,
        desktop: {
          animation: 'animated',
          animationIn: 'slideInUp',
          animationOut: false,
          position: null,
          maxWidth: null
        }
      };
      itemSettings = _methods_object_assign_deep__WEBPACK_IMPORTED_MODULE_0___default()({}, settings, itemSettings, itemDataSettings);

      itemSettings.activeItemClass = function () {
        return Object(_methods_get_type__WEBPACK_IMPORTED_MODULE_1__["default"])($el, itemSettings) === 'mega-menu' ? itemSettings.classMap.hasMegaMenuActive : itemSettings.classMap.hasSubMenuActive;
      }; // Set Menu Breakpoint Class


      $menu.classList.add(Object(_methods_get_type__WEBPACK_IMPORTED_MODULE_1__["default"])($el, itemSettings) === 'mega-menu' ? "hs-mega-menu-desktop-".concat(itemSettings.breakpoint) : "hs-sub-menu-desktop-".concat(itemSettings.breakpoint)); // Listeners

      var myDesktopCSSAnimationEnable = Object(_methods_desktop_css_animation_enable__WEBPACK_IMPORTED_MODULE_3__["default"])($menu, itemSettings),
          myDesktopMouseEnterEventListener = Object(_methods_desktop_mouseenter_event_listener__WEBPACK_IMPORTED_MODULE_4__["default"])($el, $menu, settings, itemSettings),
          myDesktopMouseLeaveEventListener = Object(_methods_desktop_mouseleave_event_listener__WEBPACK_IMPORTED_MODULE_5__["default"])($el, $menu, settings, itemSettings),
          myDesktopClickEventListener = Object(_methods_desktop_click_event_listener__WEBPACK_IMPORTED_MODULE_6__["default"])($el, $menu, settings, itemSettings),
          myMobileClickEventListener = Object(_methods_mobile_click_event_listener__WEBPACK_IMPORTED_MODULE_7__["default"])($el, $menu, settings, itemSettings);

      var mobileListeners = function mobileListeners() {
        // Remove Desktop Listeners
        $menu.removeEventListener('animationend', myDesktopCSSAnimationEnable, false);
        $menu.removeEventListener('webkitAnimationEnd', myDesktopCSSAnimationEnable, false);
        $el.removeEventListener('mouseenter', myDesktopMouseEnterEventListener, false);
        $el.removeEventListener('mouseleave', myDesktopMouseLeaveEventListener, false); // $el.children(settings.classMap.invoker)[0].removeEventListener('focus', myDesktopMouseEnterEventListener, false);

        $el.querySelector(itemSettings.classMap.invoker).removeEventListener('click', myDesktopClickEventListener, false); // Add Mobile Listeners

        $el.querySelector(itemSettings.classMap.invoker).addEventListener('click', myMobileClickEventListener, false);
      },
          desktopListeners = function desktopListeners() {
        // Remove Mobile Listeners
        $el.querySelector(itemSettings.classMap.invoker).removeEventListener('click', myMobileClickEventListener, false); // Add Desktop Listeners

        $menu.addEventListener('animationend', myDesktopCSSAnimationEnable, false);
        $menu.addEventListener('webkitAnimationEnd', myDesktopCSSAnimationEnable, false);

        if (itemSettings.eventType === 'hover') {
          $el.addEventListener('mouseenter', myDesktopMouseEnterEventListener, false);
          $el.addEventListener('mouseleave', myDesktopMouseLeaveEventListener, false);
        }

        if (itemSettings.eventType === 'click') {
          $el.querySelector(itemSettings.classMap.invoker).addEventListener('click', myDesktopClickEventListener, false);
        }
      };

      if (itemSettings.desktop.maxWidth) {
        $menu.style.maxWidth = itemSettings.desktop.maxWidth;
      }

      if (itemSettings.desktop.position) {
        $menu.classList.add("hs-position-".concat(itemSettings.desktop.position));
      } // Document Events


      document.addEventListener('click', function (e) {
        if (!e.target.closest([itemSettings.classMap.subMenu, itemSettings.classMap.megaMenu, itemSettings.classMap.invoker]) && context.state === 'desktop') {
          $el.classList.remove(itemSettings.activeItemClass().slice(1));
          $menu.classList.remove(itemSettings.desktop.animationIn);

          if (itemSettings.animationOut) {
            $menu.classList.add(itemSettings.desktop.animationOut);
          } else {
            $menu.style.display = 'none';
          }
        }
      }); // Resize and Scroll Events

      window.addEventListener('resize', function () {
        if (context.state === 'desktop') {
          Object(_methods_smart_position__WEBPACK_IMPORTED_MODULE_2__["default"])($menu, itemSettings);
        }
      });

      var resizeDetection = function resizeDetection() {
        if (context.state === 'mobile') {
          $menu.classList.remove(itemSettings.desktop.animation);
          $menu.style.animationDuration = '';
          mobileListeners();
        } else if (context.state === 'desktop') {
          $menu.classList.add(itemSettings.desktop.animation);
          $menu.style.animationDuration = "".concat(itemSettings.duration, "ms");
          desktopListeners();
        }
      };

      resizeDetection(); // State Detection

      window.addEventListener('resize', function () {
        resizeDetection();
      });
    }
  }, {
    key: "addToCollection",
    value: function addToCollection(item, options, id) {
      this.collection.push({
        $el: item,
        id: id || null,
        options: _methods_object_assign_deep__WEBPACK_IMPORTED_MODULE_0___default()({}, defaults, item.hasAttribute(dataAttributeName) ? JSON.parse(item.getAttribute(dataAttributeName)) : {}, options)
      });
    }
  }, {
    key: "getItems",
    value: function getItems() {
      var that = this;
      var newCollection = [];

      for (var i = 0; i < that.collection.length; i += 1) {
        newCollection.push(that.collection[i].$initializedEl);
      }

      return newCollection;
    }
  }, {
    key: "getItem",
    value: function getItem(ind) {
      return this.collection[ind].$initializedEl;
    }
  }]);

  return HSMegaMenu;
}();



//# sourceURL=webpack://HSMegaMenu/./src/js/hs-mega-menu.js?