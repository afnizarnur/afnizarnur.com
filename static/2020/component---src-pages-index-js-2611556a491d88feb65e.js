/*! For license information please see component---src-pages-index-js-2611556a491d88feb65e.js.LICENSE.txt */
;(window.webpackJsonp = window.webpackJsonp || []).push([
    [7],
    {
        "1KU/": function (e, t, n) {
            "use strict"
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.outerWidth = void 0)
            t.outerWidth = function (e) {
                var t = e.offsetWidth,
                    n = getComputedStyle(e)
                return (t += parseInt(n.marginLeft) + parseInt(n.marginRight))
            }
        },
        "4VO2": function (e, t, n) {
            "use strict"
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.default = void 0)
            t.default = function () {
                return window
            }
        },
        "6mdT": function (e, t, n) {
            "use strict"
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.default = void 0)
            t.default = function (e, t, n) {
                var i = 0 === e ? e : e + t
                return (
                    "translate3d" +
                    ("(" +
                        ("horizontal" === n ? [i, 0, 0] : [0, i, 0]).join(",") +
                        ")")
                )
            }
        },
        "88hp": function (e, t, n) {
            "use strict"
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.default = void 0)
            var i = (function (e) {
                    if (e && e.__esModule) return e
                    if (
                        null === e ||
                        ("object" !== f(e) && "function" != typeof e)
                    )
                        return { default: e }
                    var t = d()
                    if (t && t.has(e)) return t.get(e)
                    var n = {},
                        i =
                            Object.defineProperty &&
                            Object.getOwnPropertyDescriptor
                    for (var r in e)
                        if (Object.prototype.hasOwnProperty.call(e, r)) {
                            var o = i
                                ? Object.getOwnPropertyDescriptor(e, r)
                                : null
                            o && (o.get || o.set)
                                ? Object.defineProperty(n, r, o)
                                : (n[r] = e[r])
                        }
                    ;(n.default = e), t && t.set(e, n)
                    return n
                })(n("q1tI")),
                r = p(n("JtOw")),
                o = p(n("Xbnk")),
                a = p(n("yE4M")),
                s = p(n("Z/Mu")),
                l = p(n("4VO2")),
                c = n("L/eG"),
                u = n("q0ma")
            function p(e) {
                return e && e.__esModule ? e : { default: e }
            }
            function d() {
                if ("function" != typeof WeakMap) return null
                var e = new WeakMap()
                return (
                    (d = function () {
                        return e
                    }),
                    e
                )
            }
            function f(e) {
                return (f =
                    "function" == typeof Symbol &&
                    "symbol" == typeof Symbol.iterator
                        ? function (e) {
                              return typeof e
                          }
                        : function (e) {
                              return e &&
                                  "function" == typeof Symbol &&
                                  e.constructor === Symbol &&
                                  e !== Symbol.prototype
                                  ? "symbol"
                                  : typeof e
                          })(e)
            }
            function m() {
                return (m =
                    Object.assign ||
                    function (e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t]
                            for (var i in n)
                                Object.prototype.hasOwnProperty.call(n, i) &&
                                    (e[i] = n[i])
                        }
                        return e
                    }).apply(this, arguments)
            }
            function h(e, t) {
                var n = Object.keys(e)
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e)
                    t &&
                        (i = i.filter(function (t) {
                            return Object.getOwnPropertyDescriptor(
                                e,
                                t
                            ).enumerable
                        })),
                        n.push.apply(n, i)
                }
                return n
            }
            function b(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {}
                    t % 2
                        ? h(Object(n), !0).forEach(function (t) {
                              O(e, t, n[t])
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(
                              e,
                              Object.getOwnPropertyDescriptors(n)
                          )
                        : h(Object(n)).forEach(function (t) {
                              Object.defineProperty(
                                  e,
                                  t,
                                  Object.getOwnPropertyDescriptor(n, t)
                              )
                          })
                }
                return e
            }
            function g(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n]
                    ;(i.enumerable = i.enumerable || !1),
                        (i.configurable = !0),
                        "value" in i && (i.writable = !0),
                        Object.defineProperty(e, i.key, i)
                }
            }
            function y(e, t) {
                return (y =
                    Object.setPrototypeOf ||
                    function (e, t) {
                        return (e.__proto__ = t), e
                    })(e, t)
            }
            function v(e) {
                var t = (function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct)
                        return !1
                    if (Reflect.construct.sham) return !1
                    if ("function" == typeof Proxy) return !0
                    try {
                        return (
                            Date.prototype.toString.call(
                                Reflect.construct(Date, [], function () {})
                            ),
                            !0
                        )
                    } catch (e) {
                        return !1
                    }
                })()
                return function () {
                    var n,
                        i = k(e)
                    if (t) {
                        var r = k(this).constructor
                        n = Reflect.construct(i, arguments, r)
                    } else n = i.apply(this, arguments)
                    return w(this, n)
                }
            }
            function w(e, t) {
                return !t || ("object" !== f(t) && "function" != typeof t)
                    ? S(e)
                    : t
            }
            function S(e) {
                if (void 0 === e)
                    throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                    )
                return e
            }
            function k(e) {
                return (k = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function (e) {
                          return e.__proto__ || Object.getPrototypeOf(e)
                      })(e)
            }
            function O(e, t, n) {
                return (
                    t in e
                        ? Object.defineProperty(e, t, {
                              value: n,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0
                          })
                        : (e[t] = n),
                    e
                )
            }
            var E = (function (e) {
                !(function (e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError(
                            "Super expression must either be null or a function"
                        )
                    ;(e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    })),
                        t && y(e, t)
                })(f, e)
                var t,
                    n,
                    p,
                    d = v(f)
                function f(e) {
                    var t
                    !(function (e, t) {
                        if (!(e instanceof t))
                            throw new TypeError(
                                "Cannot call a class as a function"
                            )
                    })(this, f),
                        O(S((t = d.call(this, e))), "thumbsRef", void 0),
                        O(S(t), "carouselWrapperRef", void 0),
                        O(S(t), "listRef", void 0),
                        O(S(t), "itemsRef", void 0),
                        O(S(t), "timer", void 0),
                        O(S(t), "animationHandler", void 0),
                        O(S(t), "setThumbsRef", function (e) {
                            t.thumbsRef = e
                        }),
                        O(S(t), "setCarouselWrapperRef", function (e) {
                            t.carouselWrapperRef = e
                        }),
                        O(S(t), "setListRef", function (e) {
                            t.listRef = e
                        }),
                        O(S(t), "setItemsRef", function (e, n) {
                            t.itemsRef || (t.itemsRef = []), (t.itemsRef[n] = e)
                        }),
                        O(S(t), "autoPlay", function () {
                            i.Children.count(t.props.children) <= 1 ||
                                (t.clearAutoPlay(),
                                t.props.autoPlay &&
                                    (t.timer = setTimeout(function () {
                                        t.increment()
                                    }, t.props.interval)))
                        }),
                        O(S(t), "clearAutoPlay", function () {
                            t.timer && clearTimeout(t.timer)
                        }),
                        O(S(t), "resetAutoPlay", function () {
                            t.clearAutoPlay(), t.autoPlay()
                        }),
                        O(S(t), "stopOnHover", function () {
                            t.setState({ isMouseEntered: !0 }, t.clearAutoPlay)
                        }),
                        O(S(t), "startOnLeave", function () {
                            t.setState({ isMouseEntered: !1 }, t.autoPlay)
                        }),
                        O(S(t), "isFocusWithinTheCarousel", function () {
                            return (
                                !!t.carouselWrapperRef &&
                                !(
                                    (0, s.default)().activeElement !==
                                        t.carouselWrapperRef &&
                                    !t.carouselWrapperRef.contains(
                                        (0, s.default)().activeElement
                                    )
                                )
                            )
                        }),
                        O(S(t), "navigateWithKeyboard", function (e) {
                            if (t.isFocusWithinTheCarousel()) {
                                var n = "horizontal" === t.props.axis,
                                    i = n ? 37 : 38
                                ;(n ? 39 : 40) === e.keyCode
                                    ? t.increment()
                                    : i === e.keyCode && t.decrement()
                            }
                        }),
                        O(S(t), "updateSizes", function () {
                            if (
                                t.state.initialized &&
                                t.itemsRef &&
                                0 !== t.itemsRef.length
                            ) {
                                var e = "horizontal" === t.props.axis,
                                    n = t.itemsRef[0]
                                if (n) {
                                    var i = e ? n.clientWidth : n.clientHeight
                                    t.setState({ itemSize: i }),
                                        t.thumbsRef && t.thumbsRef.updateSizes()
                                }
                            }
                        }),
                        O(S(t), "setMountState", function () {
                            t.setState({ hasMount: !0 }), t.updateSizes()
                        }),
                        O(S(t), "handleClickItem", function (e, n) {
                            0 !== i.Children.count(t.props.children) &&
                                (t.state.cancelClick
                                    ? t.setState({ cancelClick: !1 })
                                    : (t.props.onClickItem(e, n),
                                      e !== t.state.selectedItem &&
                                          t.setState({ selectedItem: e })))
                        }),
                        O(S(t), "handleOnChange", function (e, n) {
                            i.Children.count(t.props.children) <= 1 ||
                                t.props.onChange(e, n)
                        }),
                        O(S(t), "handleClickThumb", function (e, n) {
                            t.props.onClickThumb(e, n), t.moveTo(e)
                        }),
                        O(S(t), "onSwipeStart", function (e) {
                            t.setState({ swiping: !0 }), t.props.onSwipeStart(e)
                        }),
                        O(S(t), "onSwipeEnd", function (e) {
                            t.setState({
                                swiping: !1,
                                cancelClick: !1,
                                swipeMovementStarted: !1
                            }),
                                t.props.onSwipeEnd(e),
                                t.clearAutoPlay(),
                                t.state.autoPlay && t.autoPlay()
                        }),
                        O(S(t), "onSwipeMove", function (e, n) {
                            t.props.onSwipeMove(n)
                            var i = t.props.swipeAnimationHandler(
                                e,
                                t.props,
                                t.state,
                                t.setState.bind(S(t))
                            )
                            return t.setState(b({}, i)), !!Object.keys(i).length
                        }),
                        O(S(t), "decrement", function () {
                            var e =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : 1
                            t.moveTo(
                                t.state.selectedItem -
                                    ("number" == typeof e ? e : 1)
                            )
                        }),
                        O(S(t), "increment", function () {
                            var e =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : 1
                            t.moveTo(
                                t.state.selectedItem +
                                    ("number" == typeof e ? e : 1)
                            )
                        }),
                        O(S(t), "moveTo", function (e) {
                            if ("number" == typeof e) {
                                var n = i.Children.count(t.props.children) - 1
                                e < 0 && (e = t.props.infiniteLoop ? n : 0),
                                    e > n && (e = t.props.infiniteLoop ? 0 : n),
                                    t.selectItem({ selectedItem: e }),
                                    t.state.autoPlay &&
                                        !1 === t.state.isMouseEntered &&
                                        t.resetAutoPlay()
                            }
                        }),
                        O(S(t), "onClickNext", function () {
                            t.increment(1)
                        }),
                        O(S(t), "onClickPrev", function () {
                            t.decrement(1)
                        }),
                        O(S(t), "onSwipeForward", function () {
                            t.increment(1),
                                t.props.emulateTouch &&
                                    t.setState({ cancelClick: !0 })
                        }),
                        O(S(t), "onSwipeBackwards", function () {
                            t.decrement(1),
                                t.props.emulateTouch &&
                                    t.setState({ cancelClick: !0 })
                        }),
                        O(S(t), "changeItem", function (e) {
                            return function (n) {
                                ;((0, c.isKeyboardEvent)(n) &&
                                    "Enter" !== n.key) ||
                                    t.moveTo(e)
                            }
                        }),
                        O(S(t), "selectItem", function (e) {
                            t.setState(
                                b({ previousItem: t.state.selectedItem }, e),
                                function () {
                                    t.setState(
                                        t.animationHandler(t.props, t.state)
                                    )
                                }
                            ),
                                t.handleOnChange(
                                    e.selectedItem,
                                    i.Children.toArray(t.props.children)[
                                        e.selectedItem
                                    ]
                                )
                        }),
                        O(S(t), "getInitialImage", function () {
                            var e = t.props.selectedItem,
                                n = t.itemsRef && t.itemsRef[e]
                            return ((n && n.getElementsByTagName("img")) ||
                                [])[0]
                        }),
                        O(S(t), "getVariableItemHeight", function (e) {
                            var n = t.itemsRef && t.itemsRef[e]
                            if (t.state.hasMount && n && n.children.length) {
                                var i =
                                    n.children[0].getElementsByTagName("img") ||
                                    []
                                if (i.length > 0) {
                                    var r = i[0]
                                    if (!r.complete) {
                                        r.addEventListener(
                                            "load",
                                            function e() {
                                                t.forceUpdate(),
                                                    r.removeEventListener(
                                                        "load",
                                                        e
                                                    )
                                            }
                                        )
                                    }
                                }
                                var o = (i[0] || n.children[0]).clientHeight
                                return o > 0 ? o : null
                            }
                            return null
                        })
                    var n = {
                        initialized: !1,
                        previousItem: e.selectedItem,
                        selectedItem: e.selectedItem,
                        hasMount: !1,
                        isMouseEntered: !1,
                        autoPlay: e.autoPlay,
                        swiping: !1,
                        swipeMovementStarted: !1,
                        cancelClick: !1,
                        itemSize: 1,
                        itemListStyle: {},
                        slideStyle: {},
                        selectedStyle: {},
                        prevStyle: {}
                    }
                    return (
                        (t.animationHandler =
                            ("function" == typeof e.animationHandler &&
                                e.animationHandler) ||
                            ("fade" === e.animationHandler &&
                                u.fadeAnimationHandler) ||
                            u.slideAnimationHandler),
                        (t.state = b(b({}, n), t.animationHandler(e, n))),
                        t
                    )
                }
                return (
                    (t = f),
                    (n = [
                        {
                            key: "componentDidMount",
                            value: function () {
                                this.props.children && this.setupCarousel()
                            }
                        },
                        {
                            key: "componentDidUpdate",
                            value: function (e, t) {
                                e.children ||
                                    !this.props.children ||
                                    this.state.initialized ||
                                    this.setupCarousel(),
                                    !e.autoFocus &&
                                        this.props.autoFocus &&
                                        this.forceFocus(),
                                    t.swiping &&
                                        !this.state.swiping &&
                                        this.setState(
                                            b(
                                                {},
                                                this.props.stopSwipingHandler(
                                                    this.props,
                                                    this.state
                                                )
                                            )
                                        ),
                                    (e.selectedItem ===
                                        this.props.selectedItem &&
                                        e.centerMode ===
                                            this.props.centerMode) ||
                                        (this.updateSizes(),
                                        this.moveTo(this.props.selectedItem)),
                                    e.autoPlay !== this.props.autoPlay &&
                                        (this.props.autoPlay
                                            ? this.setupAutoPlay()
                                            : this.destroyAutoPlay(),
                                        this.setState({
                                            autoPlay: this.props.autoPlay
                                        }))
                            }
                        },
                        {
                            key: "componentWillUnmount",
                            value: function () {
                                this.destroyCarousel()
                            }
                        },
                        {
                            key: "setupCarousel",
                            value: function () {
                                var e = this
                                this.bindEvents(),
                                    this.state.autoPlay &&
                                        i.Children.count(this.props.children) >
                                            1 &&
                                        this.setupAutoPlay(),
                                    this.props.autoFocus && this.forceFocus(),
                                    this.setState(
                                        { initialized: !0 },
                                        function () {
                                            var t = e.getInitialImage()
                                            t && !t.complete
                                                ? t.addEventListener(
                                                      "load",
                                                      e.setMountState
                                                  )
                                                : e.setMountState()
                                        }
                                    )
                            }
                        },
                        {
                            key: "destroyCarousel",
                            value: function () {
                                this.state.initialized &&
                                    (this.unbindEvents(),
                                    this.destroyAutoPlay())
                            }
                        },
                        {
                            key: "setupAutoPlay",
                            value: function () {
                                this.autoPlay()
                                var e = this.carouselWrapperRef
                                this.props.stopOnHover &&
                                    e &&
                                    (e.addEventListener(
                                        "mouseenter",
                                        this.stopOnHover
                                    ),
                                    e.addEventListener(
                                        "mouseleave",
                                        this.startOnLeave
                                    ))
                            }
                        },
                        {
                            key: "destroyAutoPlay",
                            value: function () {
                                this.clearAutoPlay()
                                var e = this.carouselWrapperRef
                                this.props.stopOnHover &&
                                    e &&
                                    (e.removeEventListener(
                                        "mouseenter",
                                        this.stopOnHover
                                    ),
                                    e.removeEventListener(
                                        "mouseleave",
                                        this.startOnLeave
                                    ))
                            }
                        },
                        {
                            key: "bindEvents",
                            value: function () {
                                ;(0, l.default)().addEventListener(
                                    "resize",
                                    this.updateSizes
                                ),
                                    (0, l.default)().addEventListener(
                                        "DOMContentLoaded",
                                        this.updateSizes
                                    ),
                                    this.props.useKeyboardArrows &&
                                        (0, s.default)().addEventListener(
                                            "keydown",
                                            this.navigateWithKeyboard
                                        )
                            }
                        },
                        {
                            key: "unbindEvents",
                            value: function () {
                                ;(0, l.default)().removeEventListener(
                                    "resize",
                                    this.updateSizes
                                ),
                                    (0, l.default)().removeEventListener(
                                        "DOMContentLoaded",
                                        this.updateSizes
                                    )
                                var e = this.getInitialImage()
                                e &&
                                    e.removeEventListener(
                                        "load",
                                        this.setMountState
                                    ),
                                    this.props.useKeyboardArrows &&
                                        (0, s.default)().removeEventListener(
                                            "keydown",
                                            this.navigateWithKeyboard
                                        )
                            }
                        },
                        {
                            key: "forceFocus",
                            value: function () {
                                var e
                                null === (e = this.carouselWrapperRef) ||
                                    void 0 === e ||
                                    e.focus()
                            }
                        },
                        {
                            key: "renderItems",
                            value: function (e) {
                                var t = this
                                return this.props.children
                                    ? i.Children.map(
                                          this.props.children,
                                          function (n, r) {
                                              var a =
                                                      r ===
                                                      t.state.selectedItem,
                                                  s =
                                                      r ===
                                                      t.state.previousItem,
                                                  l =
                                                      (a &&
                                                          t.state
                                                              .selectedStyle) ||
                                                      (s &&
                                                          t.state.prevStyle) ||
                                                      t.state.slideStyle ||
                                                      {}
                                              t.props.centerMode &&
                                                  "horizontal" ===
                                                      t.props.axis &&
                                                  (l = b(
                                                      b({}, l),
                                                      {},
                                                      {
                                                          minWidth:
                                                              t.props
                                                                  .centerSlidePercentage +
                                                              "%"
                                                      }
                                                  )),
                                                  t.state.swiping &&
                                                      t.state
                                                          .swipeMovementStarted &&
                                                      (l = b(
                                                          b({}, l),
                                                          {},
                                                          {
                                                              pointerEvents:
                                                                  "none"
                                                          }
                                                      ))
                                              var c = {
                                                  ref: function (e) {
                                                      return t.setItemsRef(e, r)
                                                  },
                                                  key:
                                                      "itemKey" +
                                                      r +
                                                      (e ? "clone" : ""),
                                                  className: o.default.ITEM(
                                                      !0,
                                                      r ===
                                                          t.state.selectedItem,
                                                      r === t.state.previousItem
                                                  ),
                                                  onClick:
                                                      t.handleClickItem.bind(
                                                          t,
                                                          r,
                                                          n
                                                      ),
                                                  style: l
                                              }
                                              return i.default.createElement(
                                                  "li",
                                                  c,
                                                  t.props.renderItem(n, {
                                                      isSelected:
                                                          r ===
                                                          t.state.selectedItem,
                                                      isPrevious:
                                                          r ===
                                                          t.state.previousItem
                                                  })
                                              )
                                          }
                                      )
                                    : []
                            }
                        },
                        {
                            key: "renderControls",
                            value: function () {
                                var e = this,
                                    t = this.props,
                                    n = t.showIndicators,
                                    r = t.labels,
                                    o = t.renderIndicator,
                                    a = t.children
                                return n
                                    ? i.default.createElement(
                                          "ul",
                                          { className: "control-dots" },
                                          i.Children.map(a, function (t, n) {
                                              return (
                                                  o &&
                                                  o(
                                                      e.changeItem(n),
                                                      n ===
                                                          e.state.selectedItem,
                                                      n,
                                                      r.item
                                                  )
                                              )
                                          })
                                      )
                                    : null
                            }
                        },
                        {
                            key: "renderStatus",
                            value: function () {
                                return this.props.showStatus
                                    ? i.default.createElement(
                                          "p",
                                          { className: "carousel-status" },
                                          this.props.statusFormatter(
                                              this.state.selectedItem + 1,
                                              i.Children.count(
                                                  this.props.children
                                              )
                                          )
                                      )
                                    : null
                            }
                        },
                        {
                            key: "renderThumbs",
                            value: function () {
                                return this.props.showThumbs &&
                                    this.props.children &&
                                    0 !== i.Children.count(this.props.children)
                                    ? i.default.createElement(
                                          a.default,
                                          {
                                              ref: this.setThumbsRef,
                                              onSelectItem:
                                                  this.handleClickThumb,
                                              selectedItem:
                                                  this.state.selectedItem,
                                              transitionTime:
                                                  this.props.transitionTime,
                                              thumbWidth: this.props.thumbWidth,
                                              labels: this.props.labels,
                                              emulateTouch:
                                                  this.props.emulateTouch
                                          },
                                          this.props.renderThumbs(
                                              this.props.children
                                          )
                                      )
                                    : null
                            }
                        },
                        {
                            key: "render",
                            value: function () {
                                var e = this
                                if (
                                    !this.props.children ||
                                    0 === i.Children.count(this.props.children)
                                )
                                    return null
                                var t =
                                        this.props.swipeable &&
                                        i.Children.count(this.props.children) >
                                            1,
                                    n = "horizontal" === this.props.axis,
                                    a =
                                        this.props.showArrows &&
                                        i.Children.count(this.props.children) >
                                            1,
                                    s =
                                        (a &&
                                            (this.state.selectedItem > 0 ||
                                                this.props.infiniteLoop)) ||
                                        !1,
                                    l =
                                        (a &&
                                            (this.state.selectedItem <
                                                i.Children.count(
                                                    this.props.children
                                                ) -
                                                    1 ||
                                                this.props.infiniteLoop)) ||
                                        !1,
                                    c = this.renderItems(!0),
                                    u = c.shift(),
                                    p = c.pop(),
                                    d = {
                                        className: o.default.SLIDER(
                                            !0,
                                            this.state.swiping
                                        ),
                                        onSwipeMove: this.onSwipeMove,
                                        onSwipeStart: this.onSwipeStart,
                                        onSwipeEnd: this.onSwipeEnd,
                                        style: this.state.itemListStyle,
                                        tolerance:
                                            this.props.swipeScrollTolerance
                                    },
                                    f = {}
                                if (n) {
                                    if (
                                        ((d.onSwipeLeft = this.onSwipeForward),
                                        (d.onSwipeRight =
                                            this.onSwipeBackwards),
                                        this.props.dynamicHeight)
                                    ) {
                                        var h = this.getVariableItemHeight(
                                            this.state.selectedItem
                                        )
                                        f.height = h || "auto"
                                    }
                                } else
                                    (d.onSwipeUp =
                                        "natural" === this.props.verticalSwipe
                                            ? this.onSwipeBackwards
                                            : this.onSwipeForward),
                                        (d.onSwipeDown =
                                            "natural" ===
                                            this.props.verticalSwipe
                                                ? this.onSwipeForward
                                                : this.onSwipeBackwards),
                                        (d.style = b(
                                            b({}, d.style),
                                            {},
                                            { height: this.state.itemSize }
                                        )),
                                        (f.height = this.state.itemSize)
                                return i.default.createElement(
                                    "div",
                                    {
                                        "aria-label": this.props.ariaLabel,
                                        className: o.default.ROOT(
                                            this.props.className
                                        ),
                                        ref: this.setCarouselWrapperRef,
                                        tabIndex: this.props.useKeyboardArrows
                                            ? 0
                                            : void 0
                                    },
                                    i.default.createElement(
                                        "div",
                                        {
                                            className: o.default.CAROUSEL(!0),
                                            style: { width: this.props.width }
                                        },
                                        this.renderControls(),
                                        this.props.renderArrowPrev(
                                            this.onClickPrev,
                                            s,
                                            this.props.labels.leftArrow
                                        ),
                                        i.default.createElement(
                                            "div",
                                            {
                                                className: o.default.WRAPPER(
                                                    !0,
                                                    this.props.axis
                                                ),
                                                style: f
                                            },
                                            t
                                                ? i.default.createElement(
                                                      r.default,
                                                      m(
                                                          {
                                                              tagName: "ul",
                                                              innerRef:
                                                                  this
                                                                      .setListRef
                                                          },
                                                          d,
                                                          {
                                                              allowMouseEvents:
                                                                  this.props
                                                                      .emulateTouch
                                                          }
                                                      ),
                                                      this.props.infiniteLoop &&
                                                          p,
                                                      this.renderItems(),
                                                      this.props.infiniteLoop &&
                                                          u
                                                  )
                                                : i.default.createElement(
                                                      "ul",
                                                      {
                                                          className:
                                                              o.default.SLIDER(
                                                                  !0,
                                                                  this.state
                                                                      .swiping
                                                              ),
                                                          ref: function (t) {
                                                              return e.setListRef(
                                                                  t
                                                              )
                                                          },
                                                          style:
                                                              this.state
                                                                  .itemListStyle ||
                                                              {}
                                                      },
                                                      this.props.infiniteLoop &&
                                                          p,
                                                      this.renderItems(),
                                                      this.props.infiniteLoop &&
                                                          u
                                                  )
                                        ),
                                        this.props.renderArrowNext(
                                            this.onClickNext,
                                            l,
                                            this.props.labels.rightArrow
                                        ),
                                        this.renderStatus()
                                    ),
                                    this.renderThumbs()
                                )
                            }
                        }
                    ]) && g(t.prototype, n),
                    p && g(t, p),
                    f
                )
            })(i.default.Component)
            ;(t.default = E),
                O(E, "displayName", "Carousel"),
                O(E, "defaultProps", {
                    ariaLabel: void 0,
                    axis: "horizontal",
                    centerSlidePercentage: 80,
                    interval: 3e3,
                    labels: {
                        leftArrow: "previous slide / item",
                        rightArrow: "next slide / item",
                        item: "slide item"
                    },
                    onClickItem: c.noop,
                    onClickThumb: c.noop,
                    onChange: c.noop,
                    onSwipeStart: function () {},
                    onSwipeEnd: function () {},
                    onSwipeMove: function () {
                        return !1
                    },
                    preventMovementUntilSwipeScrollTolerance: !1,
                    renderArrowPrev: function (e, t, n) {
                        return i.default.createElement("button", {
                            type: "button",
                            "aria-label": n,
                            className: o.default.ARROW_PREV(!t),
                            onClick: e
                        })
                    },
                    renderArrowNext: function (e, t, n) {
                        return i.default.createElement("button", {
                            type: "button",
                            "aria-label": n,
                            className: o.default.ARROW_NEXT(!t),
                            onClick: e
                        })
                    },
                    renderIndicator: function (e, t, n, r) {
                        return i.default.createElement("li", {
                            className: o.default.DOT(t),
                            onClick: e,
                            onKeyDown: e,
                            value: n,
                            key: n,
                            role: "button",
                            tabIndex: 0,
                            "aria-label": "".concat(r, " ").concat(n + 1)
                        })
                    },
                    renderItem: function (e) {
                        return e
                    },
                    renderThumbs: function (e) {
                        var t = i.Children.map(e, function (e) {
                            var t = e
                            if (
                                ("img" !== e.type &&
                                    (t = i.Children.toArray(
                                        e.props.children
                                    ).find(function (e) {
                                        return "img" === e.type
                                    })),
                                t)
                            )
                                return t
                        })
                        return 0 ===
                            t.filter(function (e) {
                                return e
                            }).length
                            ? (console.warn(
                                  "No images found! Can't build the thumb list without images. If you don't need thumbs, set showThumbs={false} in the Carousel. Note that it's not possible to get images rendered inside custom components. More info at https://github.com/leandrowd/react-responsive-carousel/blob/master/TROUBLESHOOTING.md"
                              ),
                              [])
                            : t
                    },
                    statusFormatter: c.defaultStatusFormatter,
                    selectedItem: 0,
                    showArrows: !0,
                    showIndicators: !0,
                    showStatus: !0,
                    showThumbs: !0,
                    stopOnHover: !0,
                    swipeScrollTolerance: 5,
                    swipeable: !0,
                    transitionTime: 350,
                    verticalSwipe: "standard",
                    width: "100%",
                    animationHandler: "slide",
                    swipeAnimationHandler: u.slideSwipeAnimationHandler,
                    stopSwipingHandler: u.slideStopSwipingHandler
                })
        },
        Fzi1: function (e, t, n) {
            "use strict"
            n.d(t, "a", function () {
                return d
            })
            var i = n("q1tI"),
                r = n.n(i),
                o = n("QKO/"),
                a = n("QQ59"),
                s = n("m4Sl"),
                l = n("NDUj"),
                c = n("pngf"),
                u = n("vOnD"),
                p = Object(u.default)(o.Link).withConfig({
                    displayName: "Footer__ButtonPrimary",
                    componentId: "sc-4rd279-0"
                })(
                    [
                        "background:",
                        ";color:",
                        ";border-radius:4px;font-size:",
                        ";padding:0.75rem 1rem;font-weight:bold;&:hover{background:",
                        ";color:",
                        ';cursor:"pointer";transition:all ease 0.2s;}'
                    ],
                    function (e) {
                        return e.theme.colors.gray[0]
                    },
                    function (e) {
                        return e.theme.colors.black
                    },
                    function (e) {
                        return e.theme.fontSizes[2]
                    },
                    function (e) {
                        return e.theme.colors.black
                    },
                    function (e) {
                        return e.theme.colors.white
                    }
                ),
                d = function (e) {
                    var t = Object.assign({}, e)
                    return r.a.createElement(
                        l.a,
                        null,
                        r.a.createElement(
                            o.Flex,
                            Object.assign(
                                {
                                    paddingTop: [6, 7, 7],
                                    paddingBottom: [6, 6, "5.1875rem"],
                                    bg: "white"
                                },
                                t
                            ),
                            r.a.createElement(
                                s.a,
                                null,
                                r.a.createElement(
                                    a.e,
                                    null,
                                    "I'm always down for a coffee, feel free to get in touch!"
                                ),
                                r.a.createElement(
                                    a.c,
                                    {
                                        fontSize: [2, 3],
                                        mt: [4, 5],
                                        mb: [5, 5, 12]
                                    },
                                    "Let’s talk about anything from design, accessibility, front-end development, prototyping, and technology."
                                ),
                                r.a.createElement(
                                    o.Box,
                                    { fontSize: 2 },
                                    r.a.createElement(
                                        p,
                                        {
                                            href: "mailto:afnizarhilmi@gmail.com"
                                        },
                                        "Contact"
                                    )
                                ),
                                r.a.createElement(c.a, { mt: [6, 15, 15] })
                            )
                        )
                    )
                }
        },
        JtOw: function (e, t, n) {
            var i, r, o
            ;(r = [t, n("fnPv")]),
                void 0 ===
                    (o =
                        "function" ==
                        typeof (i = function (e, t) {
                            "use strict"
                            Object.defineProperty(e, "__esModule", {
                                value: !0
                            })
                            var n,
                                i = (n = t) && n.__esModule ? n : { default: n }
                            e.default = i.default
                        })
                            ? i.apply(t, r)
                            : i) || (e.exports = o)
        },
        "L/eG": function (e, t, n) {
            "use strict"
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.setPosition =
                    t.getPosition =
                    t.isKeyboardEvent =
                    t.defaultStatusFormatter =
                    t.noop =
                        void 0)
            var i,
                r = n("q1tI"),
                o = (i = n("6mdT")) && i.__esModule ? i : { default: i }
            t.noop = function () {}
            t.defaultStatusFormatter = function (e, t) {
                return "".concat(e, " of ").concat(t)
            }
            t.isKeyboardEvent = function (e) {
                return !!e && e.hasOwnProperty("key")
            }
            t.getPosition = function (e, t) {
                if ((t.infiniteLoop && ++e, 0 === e)) return 0
                var n = r.Children.count(t.children)
                if (t.centerMode && "horizontal" === t.axis) {
                    var i = -e * t.centerSlidePercentage,
                        o = n - 1
                    return (
                        e && (e !== o || t.infiniteLoop)
                            ? (i += (100 - t.centerSlidePercentage) / 2)
                            : e === o && (i += 100 - t.centerSlidePercentage),
                        i
                    )
                }
                return 100 * -e
            }
            t.setPosition = function (e, t) {
                var n = {}
                return (
                    [
                        "WebkitTransform",
                        "MozTransform",
                        "MsTransform",
                        "OTransform",
                        "transform",
                        "msTransform"
                    ].forEach(function (i) {
                        n[i] = (0, o.default)(e, "%", t)
                    }),
                    n
                )
            }
        },
        NDUj: function (e, t, n) {
            "use strict"
            var i = n("vOnD"),
                r = n("q1tI"),
                o = n.n(r),
                a = n("QKO/")
            t.a = function (e) {
                var t = e.children
                return o.a.createElement(
                    s,
                    { flex: "1", color: "black", bg: "white" },
                    o.a.createElement(
                        l,
                        { flexDirection: "column", mx: "auto" },
                        t
                    )
                )
            }
            var s = Object(i.default)(a.Box).withConfig({
                    displayName: "Full___StyledBox",
                    componentId: "sc-tka5g4-0"
                })(["padding:0!important;margin:0!important;max-width:100%"]),
                l = Object(i.default)(a.Flex).withConfig({
                    displayName: "Full___StyledFlex",
                    componentId: "sc-tka5g4-1"
                })(["height:100%"])
        },
        OM2W: function (e, t, n) {
            "use strict"
            var i = n("xEkU"),
                r = n.n(i),
                o = n("q1tI")
            function a(e, t, n) {
                return (
                    t in e
                        ? Object.defineProperty(e, t, {
                              value: n,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0
                          })
                        : (e[t] = n),
                    e
                )
            }
            function s(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {},
                        i = Object.keys(n)
                    "function" == typeof Object.getOwnPropertySymbols &&
                        (i = i.concat(
                            Object.getOwnPropertySymbols(n).filter(function (
                                e
                            ) {
                                return Object.getOwnPropertyDescriptor(n, e)
                                    .enumerable
                            })
                        )),
                        i.forEach(function (t) {
                            a(e, t, n[t])
                        })
                }
                return e
            }
            function l(e, t) {
                if (null == e) return {}
                var n,
                    i,
                    r = (function (e, t) {
                        if (null == e) return {}
                        var n,
                            i,
                            r = {},
                            o = Object.keys(e)
                        for (i = 0; i < o.length; i++)
                            (n = o[i]), t.indexOf(n) >= 0 || (r[n] = e[n])
                        return r
                    })(e, t)
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e)
                    for (i = 0; i < o.length; i++)
                        (n = o[i]),
                            t.indexOf(n) >= 0 ||
                                (Object.prototype.propertyIsEnumerable.call(
                                    e,
                                    n
                                ) &&
                                    (r[n] = e[n]))
                }
                return r
            }
            function c(e, t) {
                return (
                    (function (e) {
                        if (Array.isArray(e)) return e
                    })(e) ||
                    (function (e, t) {
                        var n = [],
                            i = !0,
                            r = !1,
                            o = void 0
                        try {
                            for (
                                var a, s = e[Symbol.iterator]();
                                !(i = (a = s.next()).done) &&
                                (n.push(a.value), !t || n.length !== t);
                                i = !0
                            );
                        } catch (e) {
                            ;(r = !0), (o = e)
                        } finally {
                            try {
                                i || null == s.return || s.return()
                            } finally {
                                if (r) throw o
                            }
                        }
                        return n
                    })(e, t) ||
                    (function () {
                        throw new TypeError(
                            "Invalid attempt to destructure non-iterable instance"
                        )
                    })()
                )
            }
            var u = function () {}
            function p(e) {
                return e && e.current ? e.current.scrollHeight : "auto"
            }
            var d = function () {
                    for (
                        var e = arguments.length, t = new Array(e), n = 0;
                        n < e;
                        n++
                    )
                        t[n] = arguments[n]
                    return function () {
                        for (
                            var e = arguments.length, n = new Array(e), i = 0;
                            i < e;
                            i++
                        )
                            n[i] = arguments[i]
                        return t.forEach(function (e) {
                            return e && e.apply(void 0, n)
                        })
                    }
                },
                f = {
                    transitionDuration: "500ms",
                    transitionTimingFunction:
                        "cubic-bezier(0.250, 0.460, 0.450, 0.940)"
                }
            function m(e) {
                if (e) {
                    var t = ["height"]
                    return (
                        t.push.apply(
                            t,
                            (function (e) {
                                return (
                                    (function (e) {
                                        if (Array.isArray(e)) {
                                            for (
                                                var t = 0,
                                                    n = new Array(e.length);
                                                t < e.length;
                                                t++
                                            )
                                                n[t] = e[t]
                                            return n
                                        }
                                    })(e) ||
                                    (function (e) {
                                        if (
                                            Symbol.iterator in Object(e) ||
                                            "[object Arguments]" ===
                                                Object.prototype.toString.call(
                                                    e
                                                )
                                        )
                                            return Array.from(e)
                                    })(e) ||
                                    (function () {
                                        throw new TypeError(
                                            "Invalid attempt to spread non-iterable instance"
                                        )
                                    })()
                                )
                            })(e.split(", "))
                        ),
                        t.join(", ")
                    )
                }
                return "height"
            }
            var h = 0,
                b = function () {
                    return ++h
                }
            t.a = function () {
                var e,
                    t,
                    n,
                    i,
                    h,
                    g,
                    y =
                        arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : {},
                    v =
                        ((i = c(Object(o.useState)(null), 2)),
                        (h = i[0]),
                        (g = i[1]),
                        Object(o.useEffect)(function () {
                            return g(b())
                        }, []),
                        h),
                    w = Object(o.useRef)(null),
                    S = (function (e) {
                        var t = e.isOpen,
                            n = e.defaultOpen,
                            i = c(Object(o.useState)(n || !1), 2),
                            r = i[0]
                        return [void 0 !== t ? t : r, i[1]]
                    })(y),
                    k = c(S, 2),
                    O = k[0],
                    E = k[1],
                    I = "".concat(y.collapsedHeight || 0, "px"),
                    _ = Object(o.useMemo)(
                        function () {
                            return {
                                display: "0px" === I ? "none" : "block",
                                height: I,
                                overflow: "hidden"
                            }
                        },
                        [I]
                    ),
                    P = Object(o.useMemo)(
                        function () {
                            return (
                                (n =
                                    void 0 === (t = (e = y).expandStyles)
                                        ? f
                                        : t),
                                (r = void 0 === (i = e.collapseStyles) ? f : i),
                                {
                                    expandStyles: s({}, n, {
                                        transitionProperty: m(
                                            n.transitionProperty
                                        )
                                    }),
                                    collapseStyles: s({}, r, {
                                        transitionProperty: m(
                                            r.transitionProperty
                                        )
                                    })
                                }
                            )
                            var e, t, n, i, r
                        },
                        [y]
                    ),
                    j = P.expandStyles,
                    x = P.collapseStyles,
                    T = c(Object(o.useState)(O ? {} : _), 2),
                    C = T[0],
                    M = T[1],
                    R = c(Object(o.useState)(O), 2),
                    L = R[0],
                    z = R[1],
                    D = Object(o.useCallback)(function () {
                        return E(function (e) {
                            return !e
                        })
                    }, [])
                ;(e = function () {
                    r()(
                        O
                            ? function () {
                                  z(!0),
                                      M(function (e) {
                                          return s({}, e, j, {
                                              willChange: "height",
                                              display: "block",
                                              overflow: "hidden"
                                          })
                                      }),
                                      r()(function () {
                                          var e = p(w)
                                          M(function (t) {
                                              return s({}, t, { height: e })
                                          })
                                      })
                              }
                            : function () {
                                  var e = p(w)
                                  M(function (t) {
                                      return s({}, t, x, {
                                          willChange: "height",
                                          height: e
                                      })
                                  }),
                                      r()(function () {
                                          M(function (e) {
                                              return s({}, e, {
                                                  height: I,
                                                  overflow: "hidden"
                                              })
                                          })
                                      })
                              }
                    )
                }),
                    (t = [O]),
                    (n = Object(o.useRef)(!0)),
                    Object(o.useEffect)(function () {
                        if (!n.current) return e()
                        n.current = !1
                    }, t)
                var N = function (e) {
                    if (e.target === w.current)
                        if (O) {
                            var t = p(w)
                            t === C.height
                                ? M({})
                                : M(function (e) {
                                      return s({}, e, { height: t })
                                  })
                        } else C.height === I && (z(!1), M(_))
                }
                return {
                    getToggleProps: function () {
                        var e =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : {},
                            t = e.disabled,
                            n = void 0 !== t && t,
                            i = e.onClick,
                            r = void 0 === i ? u : i,
                            o = l(e, ["disabled", "onClick"])
                        return s(
                            {
                                type: "button",
                                role: "button",
                                id: "react-collapsed-toggle-".concat(v),
                                "aria-controls":
                                    "react-collapsed-panel-".concat(v),
                                "aria-expanded": O ? "true" : "false",
                                tabIndex: 0
                            },
                            o,
                            { onClick: n ? u : d(r, D) }
                        )
                    },
                    getCollapseProps: function () {
                        var e,
                            t =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : {},
                            n = t.style,
                            i = void 0 === n ? {} : n,
                            r = t.onTransitionEnd,
                            o = void 0 === r ? u : r,
                            c = t.refKey,
                            p = void 0 === c ? "ref" : c,
                            h = l(t, ["style", "onTransitionEnd", "refKey"])
                        return s(
                            {
                                id: "react-collapsed-panel-".concat(v),
                                "aria-hidden": O ? null : "true"
                            },
                            h,
                            (a((e = {}), p, w),
                            a(e, "onTransitionEnd", d(N, o)),
                            a(
                                e,
                                "style",
                                s(
                                    {},
                                    f,
                                    i,
                                    {
                                        transitionProperty: m(
                                            i.transitionProperty
                                        )
                                    },
                                    C
                                )
                            ),
                            e)
                        )
                    },
                    isOpen: O,
                    toggleOpen: D,
                    mountChildren: L
                }
            }
        },
        RXBc: function (e, t, n) {
            "use strict"
            n.r(t)
            var i = n("q1tI"),
                r = n.n(i),
                o = n("rY4l"),
                a = n("zLVn"),
                s = n("vOnD"),
                l = n("QKO/"),
                c = n("oCA+"),
                u = n("QQ59"),
                p = n("9eSz"),
                d = n.n(p),
                f = n("oTKz"),
                m = (n("a6qw"), ["title", "description"]),
                h = Object(s.default)(l.Link).withConfig({
                    displayName: "ProjectFeatured__ViewProject",
                    componentId: "sc-fi068e-0"
                })(
                    [
                        "font-weight:bold;text-decoration:underline;letter-spacing:-0.2px;color:",
                        "!important;.active &{border-color:",
                        ";}",
                        ";"
                    ],
                    function (e) {
                        return e.theme.colors.black
                    },
                    function (e) {
                        return e.theme.colors.black
                    },
                    c.a
                ),
                b = Object(s.default)(l.Box).withConfig({
                    displayName: "ProjectFeatured__DisabledButton",
                    componentId: "sc-fi068e-1"
                })(
                    [
                        "font-weight:bold;letter-spacing:-0.2px;color:",
                        "!important;opacity:0.5;margin-top:",
                        ";cursor:no-drop;"
                    ],
                    function (e) {
                        return e.theme.colors.black
                    },
                    function (e) {
                        return e.theme.space[5]
                    }
                ),
                g = function (e) {
                    var t = e.title,
                        n = e.description,
                        i = Object(a.a)(e, m),
                        o = { width: "100%" }
                    return r.a.createElement(
                        l.Box,
                        Object.assign({ mb: ["4.5rem", 9, 11] }, i),
                        r.a.createElement(
                            l.Box,
                            { mb: [5, 13] },
                            r.a.createElement(
                                f.Carousel,
                                {
                                    emulateTouch: !0,
                                    showStatus: !1,
                                    showArrows: !0,
                                    infiniteLoop: !0,
                                    autoPlay: !0,
                                    showThumbs: !1,
                                    showIndicators: !1
                                },
                                r.a.createElement(
                                    "div",
                                    null,
                                    r.a.createElement(d.a, {
                                        style: o,
                                        alt: i.featuredimage1alt,
                                        sizes: i.featuredimage1
                                    })
                                ),
                                r.a.createElement(
                                    "div",
                                    null,
                                    r.a.createElement(d.a, {
                                        style: o,
                                        alt: i.featuredimage2alt,
                                        sizes: i.featuredimage2
                                    })
                                ),
                                r.a.createElement(
                                    "div",
                                    null,
                                    r.a.createElement(d.a, {
                                        style: o,
                                        alt: i.featuredimage3alt,
                                        sizes: i.featuredimage3
                                    })
                                )
                            )
                        ),
                        r.a.createElement(u.e, null, t),
                        r.a.createElement(
                            u.c,
                            { fontSize: [2, 3], mt: [4, 5], mb: 4 },
                            n
                        ),
                        i.link
                            ? r.a.createElement(
                                  h,
                                  {
                                      fontSize: [2, 3],
                                      fontWeight: "bold",
                                      href: i.link
                                  },
                                  "View Project"
                              )
                            : r.a.createElement(
                                  b,
                                  {
                                      title: "I'm still writing the case study, will publish it soon!",
                                      className: "disable",
                                      fontSize: [2, 2],
                                      fontWeight: "bold"
                                  },
                                  "Case Study In Progress"
                              )
                    )
                },
                y = n("Wbzz"),
                v = Object(s.default)(l.Link).withConfig({
                    displayName: "Project__ViewProject",
                    componentId: "sc-19hkl4j-0"
                })(
                    [
                        "font-weight:bold;text-decoration:underline;letter-spacing:-0.2px;color:",
                        " !important;",
                        ";"
                    ],
                    function (e) {
                        return e.theme.colors.black
                    },
                    c.a
                ),
                w = Object(s.default)(l.Box).withConfig({
                    displayName: "Project__InlineBox",
                    componentId: "sc-19hkl4j-1"
                })(["display:inline-block;"]),
                S = Object(s.default)(w).withConfig({
                    displayName: "Project___StyledInlineBox",
                    componentId: "sc-19hkl4j-2"
                })(["position:relative;top:-0.326rem"]),
                k = function (e) {
                    var t = Object.assign({}, e)
                    return r.a.createElement(
                        l.Box,
                        Object.assign(
                            { mb: [12, 12, 6], width: [1, 1 / 2.1, 1 / 3.2] },
                            t
                        ),
                        t.link &&
                            r.a.createElement(
                                v,
                                {
                                    fontSize: [2, 3],
                                    fontWeight: "bold",
                                    target: "blank",
                                    href: t.link
                                },
                                t.name
                            ),
                        !t.link &&
                            r.a.createElement(
                                l.Text,
                                {
                                    color: "#191a1b",
                                    fontSize: [2, 3],
                                    fontWeight: "bold"
                                },
                                t.name
                            ),
                        r.a.createElement(
                            u.c,
                            { fontSize: [2], mt: [4] },
                            t.description
                        ),
                        r.a.createElement(
                            l.Box,
                            { mt: [5] },
                            r.a.createElement(d.a, {
                                style: {
                                    display: "inline-block",
                                    width: "24px",
                                    height: "24px"
                                },
                                alt: t.imagealt,
                                sizes: t.imageurl
                            }),
                            r.a.createElement(
                                S,
                                null,
                                r.a.createElement(
                                    O,
                                    { ml: 2, mr: 2 },
                                    t.company
                                ),
                                r.a.createElement(E, null, "|"),
                                r.a.createElement(I, { ml: 2 }, t.date)
                            )
                        )
                    )
                },
                O = Object(s.default)(l.Text).withConfig({
                    displayName: "Project___StyledText",
                    componentId: "sc-19hkl4j-3"
                })(["display:inline-box;color:#191a1b"]),
                E = Object(s.default)("span").withConfig({
                    displayName: "Project___StyledSpan",
                    componentId: "sc-19hkl4j-4"
                })(["color:#d8d8d8"]),
                I = Object(s.default)(l.Text).withConfig({
                    displayName: "Project___StyledText2",
                    componentId: "sc-19hkl4j-5"
                })(["display:inline-box;color:#191a1b"]),
                _ = n("8upa"),
                P = n.n(_),
                j = ["title", "description"],
                x = Object(s.default)(l.Link).withConfig({
                    displayName: "ProjectList__GoToLink",
                    componentId: "sc-11scw5y-0"
                })(
                    [
                        "font-weight:bold;text-decoration:underline;letter-spacing:-0.2px;.active &{border-color:",
                        ";}",
                        ";"
                    ],
                    function (e) {
                        return e.theme.colors.black
                    },
                    c.a
                ),
                T = function (e) {
                    e.title, e.description
                    var t,
                        n = Object(a.a)(e, j),
                        i = Object(y.useStaticQuery)("121939129")
                    return r.a.createElement(
                        l.Box,
                        Object.assign({ mb: ["3.5rem", "3.5rem", 14] }, n),
                        r.a.createElement(
                            u.f,
                            { mb: [5, 6] },
                            "A few projects that I have worked on"
                        ),
                        r.a.createElement(
                            l.Flex,
                            {
                                justifyContent: "space-between",
                                flexWrap: "wrap"
                            },
                            r.a.createElement(k, {
                                name: "DANA",
                                imageurl: i.logobl.childImageSharp.fluid,
                                imagealt: "Bukalapak",
                                description:
                                    "Integrate payment wallet into eCommerce system.",
                                company: "Bukalapak",
                                date: "Oct 2018"
                            }),
                            r.a.createElement(k, {
                                name: "BBM Shopping",
                                imageurl: i.logobl.childImageSharp.fluid,
                                imagealt: "Bukalapak",
                                description:
                                    "Redesign and create the design system of the apps.",
                                company: "Bukalapak",
                                date: "Sep 2017"
                            }),
                            r.a.createElement(k, {
                                name: "Ayo Indonesia",
                                link: "https://ayo.co.id/",
                                imageurl: i.logost.childImageSharp.fluid,
                                imagealt: "Sixty Two",
                                description:
                                    "Matchmaking service for futsal players in Indonesia.",
                                company: "Sixty Two",
                                date: "May 2017"
                            }),
                            r.a.createElement(
                                k,
                                (((t = {
                                    name: "Sinon.JS",
                                    link: "https://sinonjs.org/",
                                    imageurl: "assets/logo-os.png"
                                }).imageurl = i.logoos.childImageSharp.fluid),
                                (t.imagealt = "Open Source"),
                                (t.description =
                                    "Redesign the documentation of javascript unit testing library."),
                                (t.company = "Open Source"),
                                (t.date = "Mar 2017"),
                                t)
                            ),
                            r.a.createElement(k, {
                                name: "Limakilo",
                                link: "http://limakilo.id/",
                                imageurl: i.logolimakilo.childImageSharp.fluid,
                                imagealt: "Limakilo",
                                description:
                                    "Buy food commodities directly from farmers.",
                                company: "Limakilo",
                                date: "Feb 2017"
                            }),
                            r.a.createElement(k, {
                                name: "CoCare",
                                link: "",
                                imageurl: i.logots.childImageSharp.fluid,
                                imagealt: "Tackle Studio",
                                description:
                                    "More flexible ways of delivering care possible.",
                                company: "Tackle Studio",
                                date: "Nov 2016"
                            })
                        ),
                        r.a.createElement(
                            u.c,
                            { color: P.a.colors.black, fontSize: [2, 3] },
                            "Still curious of my other work? Send me an email about your project and I will prepare a detailed portfolio with relevant work samples.",
                            " ",
                            r.a.createElement(
                                x,
                                { href: "mailto:afnizarhilmi@gmail.com" },
                                "Get in touch"
                            ),
                            "."
                        )
                    )
                },
                C = n("NDUj"),
                M = n("m4Sl"),
                R =
                    (n("za5s"),
                    function (e) {
                        var t = Object.assign({}, e)
                        return r.a.createElement(
                            l.Box,
                            { pb: [13, 6], width: [1, 1 / 2.1, 1 / 3.2] },
                            r.a.createElement(
                                L,
                                {
                                    fontWeight: "bold",
                                    fontSize: 2,
                                    mb: [4, 5],
                                    bg: P.a.colors.gray[0]
                                },
                                t.number
                            ),
                            r.a.createElement(
                                l.Text,
                                { fontSize: [2, 3], fontWeight: "bold" },
                                t.name
                            ),
                            r.a.createElement(
                                u.c,
                                { fontSize: [2], mt: 4 },
                                t.description
                            )
                        )
                    }),
                L = Object(s.default)(l.Box).withConfig({
                    displayName: "DesignProcessItem___StyledBox",
                    componentId: "sc-13ab8iy-0"
                })([
                    "border-radius:0.25rem;display:inline-block;text-align:center;margin-right:5px;width:2.1em;height:2.1em;line-height:2.1em;"
                ]),
                z = function () {
                    return r.a.createElement(
                        C.a,
                        null,
                        r.a.createElement(
                            D,
                            { paddingTop: [6, 6, 9], paddingBottom: [4, 4, 6] },
                            r.a.createElement(
                                M.a,
                                null,
                                r.a.createElement(
                                    u.d,
                                    null,
                                    "My design process for building products"
                                ),
                                r.a.createElement(
                                    u.c,
                                    {
                                        fontSize: [2, 3],
                                        mt: [4, 4, 5],
                                        mb: [12, 6, 14]
                                    },
                                    "This design process gives me time-tested and trusted ways to do good work, sometimes it’s as linear as it looks, other times it’s a zigzag. Sometimes I build something completely new."
                                ),
                                r.a.createElement(
                                    l.Flex,
                                    {
                                        justifyContent: "space-between",
                                        flexWrap: "wrap"
                                    },
                                    r.a.createElement(R, {
                                        number: "1",
                                        name: "Research",
                                        description:
                                            "Understand the problem to be solved by certain methods."
                                    }),
                                    r.a.createElement(R, {
                                        number: "2",
                                        name: "Define",
                                        description:
                                            "Analyze the results of research and synthesize them to define the main problem."
                                    }),
                                    r.a.createElement(R, {
                                        number: "3",
                                        name: "Ideate",
                                        description:
                                            "Looking for new solutions based on the main problems that exist."
                                    }),
                                    r.a.createElement(R, {
                                        number: "4",
                                        name: "Build",
                                        description:
                                            "Investigate the problem and build prototypes that would fix the problem."
                                    }),
                                    r.a.createElement(R, {
                                        number: "5",
                                        name: "Testing",
                                        description:
                                            "Test the results of the prototype and refine based the problem that are present."
                                    }),
                                    r.a.createElement(R, {
                                        number: "6",
                                        name: "Support",
                                        description:
                                            "Support the development team in implementing solutions in real environments."
                                    })
                                )
                            )
                        )
                    )
                },
                D = Object(s.default)(l.Flex).withConfig({
                    displayName: "DesignProcess___StyledFlex",
                    componentId: "sc-1mre6nq-0"
                })([
                    "background-image:linear-gradient(180deg,rgba(25,26,27,.07) 0%,rgba(255,255,255,0) 100%);"
                ]),
                N = Object(s.default)(l.Link).withConfig({
                    displayName: "TalkItem__ViewLink",
                    componentId: "sc-7eb4sw-0"
                })(
                    [
                        "font-weight:bold;text-decoration:underline;letter-spacing:-0.2px;.active &{border-color:",
                        ";}",
                        ";"
                    ],
                    function (e) {
                        return e.theme.colors.black
                    },
                    c.a
                ),
                A = function (e) {
                    var t = Object.assign({}, e)
                    return r.a.createElement(
                        B,
                        {
                            pr: 4,
                            mb: [5, 12, 12],
                            width: [1, 0.5, 0.5],
                            verticalAlign: "text-top"
                        },
                        r.a.createElement(
                            N,
                            { fontSize: 3, fontWeight: "bold", href: t.link },
                            t.title
                        ),
                        r.a.createElement(
                            W,
                            { color: P.a.colors.white, fontSize: [2], mt: 4 },
                            t.short
                        )
                    )
                },
                B = Object(s.default)(l.Box).withConfig({
                    displayName: "TalkItem___StyledBox",
                    componentId: "sc-7eb4sw-1"
                })(["display:inline-block"]),
                W = Object(s.default)(u.c).withConfig({
                    displayName: "TalkItem___StyledParagraph",
                    componentId: "sc-7eb4sw-2"
                })(["opacity:.8"]),
                F = n("OM2W"),
                H = Object(s.default)(l.Link).withConfig({
                    displayName: "TalkList__GoToLink",
                    componentId: "sc-oehtvw-0"
                })(
                    [
                        "font-weight:bold;text-decoration:underline;letter-spacing:-0.2px;.active &{border-color:",
                        ";}",
                        ";"
                    ],
                    function (e) {
                        return e.theme.colors.black
                    },
                    c.a
                ),
                U = function (e) {
                    var t = Object.assign({}, e),
                        n =
                            "\n    background-image: url(" +
                            t.talkbackground.src +
                            ");\n    background-position: 100% 0;\n    background-size: 90% auto;\n    background-repeat: no-repeat;\n  ",
                        i = Object(F.a)({ defaultOpen: !0 }),
                        o = i.getCollapseProps,
                        a = (i.getToggleProps, i.isOpen, Object(F.a)()),
                        s = a.getCollapseProps,
                        c = a.getToggleProps,
                        p = a.isOpen
                    return r.a.createElement(
                        K,
                        Object.assign(
                            {
                                id: "talks",
                                paddingTop: [6, 6, 9],
                                paddingBottom: [6, 6, 14],
                                color: "white",
                                bg: P.a.colors.black
                            },
                            t,
                            { $_css: n }
                        ),
                        r.a.createElement(
                            M.a,
                            null,
                            r.a.createElement(
                                u.e,
                                { color: "white", mb: [6, 6, 14] },
                                "In between my works, I love to share and help others by speaking and run workshops"
                            ),
                            r.a.createElement(
                                q,
                                Object.assign({}, o(), {
                                    $_css2: "position: relative"
                                }),
                                r.a.createElement(
                                    Q,
                                    { $_css3: "margin: 0 " },
                                    r.a.createElement(A, {
                                        link: "https://www.figma.com/community/file/840269596065453337/Careers-101%3A-Prepare-to-applying-jobs-or-intern",
                                        title: "Careers 101: Prepare to applying jobs or intern",
                                        short: "This talk is about what to prepare when applying jobs or intern. Presented in my high school community called Jagongan Stematel."
                                    }),
                                    r.a.createElement(A, {
                                        link: "https://speakerdeck.com/afnizarnur/easily-structure-and-communicate-ideas-using-wireframe",
                                        title: "Easily Structure & Communicate Ideas using Wireframe",
                                        short: "This talk discusses how wireframes can help in developing ideas and how to build them."
                                    }),
                                    r.a.createElement(A, {
                                        link: "https://speakerdeck.com/afnizarnur/b-testing-to-help-improve-user-experience",
                                        title: "Designing with Data: Using A/B Testing to Help Improve User Experience",
                                        short: "This talk discusses the use of A / B Testing on a product, its definition, and its important role so that it can produce an impact."
                                    }),
                                    r.a.createElement(A, {
                                        link: "https://speakerdeck.com/afnizarnur/designing-experience-and-interface",
                                        title: "Designing Experience and Interface",
                                        short: "This talk is about introduction of designing experience in building product."
                                    })
                                ),
                                r.a.createElement(
                                    l.Box,
                                    s({ style: { margin: 0 } }),
                                    r.a.createElement(A, {
                                        link: "https://speakerdeck.com/afnizarnur/craft-solution-using-design-thinking",
                                        title: "Craft Solution using Design Thinking",
                                        short: "Facilitate workshop about design thinking, from identifying the problem to crafting the solution."
                                    }),
                                    r.a.createElement(A, {
                                        link: "https://speakerdeck.com/afnizarnur/building-instagram-like-prototype-using-framer",
                                        title: "Building Instagram-like Prototype using Framer",
                                        short: "Facilitate workshop to create prototype using Framer."
                                    }),
                                    r.a.createElement(A, {
                                        link: "https://speakerdeck.com/afnizarnur/be-awesome-with-git",
                                        title: "Be Awesome with Git",
                                        short: "Facilitate workshop how to use Git in development project."
                                    })
                                ),
                                p &&
                                    r.a.createElement(
                                        V,
                                        Object.assign(
                                            { py: 4 },
                                            c({ style: { display: "block" } })
                                        ),
                                        "Collapse Talks"
                                    ),
                                !p &&
                                    r.a.createElement(
                                        l.Box,
                                        null,
                                        r.a.createElement(
                                            X,
                                            Object.assign(
                                                { py: 4 },
                                                c({
                                                    style: { display: "block" }
                                                })
                                            ),
                                            "Load More Talks"
                                        ),
                                        r.a.createElement(Y, null)
                                    )
                            ),
                            r.a.createElement(
                                u.c,
                                {
                                    paddingTop: [4, 0, 0],
                                    color: P.a.colors.white,
                                    fontSize: [2, 3],
                                    marginTop: 6
                                },
                                "I'm currently not available for speaking or workshop about design and technology. Still want to invite me to speak at your event?",
                                " ",
                                r.a.createElement(
                                    H,
                                    { href: "mailto:afnizarhilmi@gmail.com" },
                                    "Get in touch"
                                ),
                                "."
                            )
                        )
                    )
                },
                K = Object(s.default)(l.Box).withConfig({
                    displayName: "TalkList___StyledBox",
                    componentId: "sc-oehtvw-1"
                })(["", ""], function (e) {
                    return e.$_css
                }),
                q = Object(s.default)(l.Box).withConfig({
                    displayName: "TalkList___StyledBox2",
                    componentId: "sc-oehtvw-2"
                })(["", ""], function (e) {
                    return e.$_css2
                }),
                Q = Object(s.default)(l.Box).withConfig({
                    displayName: "TalkList___StyledBox3",
                    componentId: "sc-oehtvw-3"
                })(["", ""], function (e) {
                    return e.$_css3
                }),
                V = Object(s.default)(l.Button).withConfig({
                    displayName: "TalkList___StyledButton",
                    componentId: "sc-oehtvw-4"
                })([
                    "outline:none;font-size:1.125rem;background:rgba(255,255,255,0.1);width:100%;"
                ]),
                X = Object(s.default)(l.Button).withConfig({
                    displayName: "TalkList___StyledButton2",
                    componentId: "sc-oehtvw-5"
                })([
                    "outline:none;font-size:1.125rem;z-index:2;background:rgba(255,255,255,0.1);width:100%;"
                ]),
                Y = Object(s.default)(l.Box).withConfig({
                    displayName: "TalkList___StyledBox4",
                    componentId: "sc-oehtvw-6"
                })([
                    "position:absolute;width:100%;height:300px;bottom:52px;z-index:1;background:linear-gradient(180deg,rgba(25,26,27,0.0) 0%,#191a1b 100%)"
                ]),
                G = n("Fzi1"),
                J = n("Q/Mu"),
                $ = Object(s.default)("main").withConfig({
                    displayName: "pages__Main",
                    componentId: "sc-13rsxt4-0"
                })(
                    [
                        "padding-top:",
                        ";@media (max-width:",
                        "){padding-top:",
                        ";}"
                    ],
                    function (e) {
                        return e.theme.space[15]
                    },
                    function (e) {
                        return e.theme.breakpoints[0]
                    },
                    function (e) {
                        return e.theme.space[10]
                    }
                ),
                Z = Object(s.default)(l.Link).withConfig({
                    displayName: "pages__ButtonPrimary",
                    componentId: "sc-13rsxt4-1"
                })(
                    [
                        "background:",
                        ";color:",
                        ";border-radius:4px;font-size:",
                        ";padding:0.75rem 1rem;font-weight:bold;&:hover{background:",
                        ";color:",
                        ';cursor:"pointer";transition:all ease 0.2s;}'
                    ],
                    function (e) {
                        return e.theme.colors.gray[0]
                    },
                    function (e) {
                        return e.theme.colors.black
                    },
                    function (e) {
                        return e.theme.fontSizes[2]
                    },
                    function (e) {
                        return e.theme.colors.black
                    },
                    function (e) {
                        return e.theme.colors.white
                    }
                ),
                ee = Object(s.default)(l.Link).withConfig({
                    displayName: "pages__ButtonSecondary",
                    componentId: "sc-13rsxt4-2"
                })(
                    [
                        "background:",
                        ";color:",
                        ";border:1px solid #d8d8d8;border-radius:4px;padding:0.75rem 1rem;font-weight:bold;font-size:",
                        ";&:hover{background:",
                        ";color:",
                        ';cursor:"pointer";border:1px solid transparent;transition:all ease 0.2s;}'
                    ],
                    function (e) {
                        return e.theme.colors.white
                    },
                    function (e) {
                        return e.theme.colors.black
                    },
                    function (e) {
                        return e.theme.fontSizes[2]
                    },
                    function (e) {
                        return e.theme.colors.black
                    },
                    function (e) {
                        return e.theme.colors.white
                    }
                ),
                te =
                    ((t.default = function (e) {
                        return r.a.createElement(
                            l.Box,
                            null,
                            r.a.createElement(
                                M.a,
                                null,
                                r.a.createElement(J.a, null)
                            ),
                            r.a.createElement(
                                l.Box,
                                { as: "main", id: "main-content" },
                                r.a.createElement(
                                    M.a,
                                    null,
                                    r.a.createElement(
                                        o.a,
                                        null,
                                        r.a.createElement(
                                            te,
                                            {
                                                color: P.a.colors.black,
                                                fontSize: [2, 3],
                                                mt: [6, 9]
                                            },
                                            "Afnizar Nur Ghifari, Product Designer"
                                        ),
                                        r.a.createElement(
                                            ne,
                                            { mt: [5] },
                                            "Crafting meaningful digital experiences through design"
                                        ),
                                        r.a.createElement(
                                            ie,
                                            { mt: [5, 6], mb: [13, 13, 12] },
                                            r.a.createElement(
                                                Z,
                                                {
                                                    className:
                                                        "btnSelectedWork",
                                                    href: "#selectedwork",
                                                    mr: 4,
                                                    mb: 3
                                                },
                                                "Selected Work",
                                                r.a.createElement(re, {
                                                    className: "scrollWork",
                                                    ml: [4],
                                                    src: "./assets/arrow-down.svg",
                                                    alt: "Scroll to Selected Work"
                                                })
                                            ),
                                            r.a.createElement(
                                                ee,
                                                {
                                                    href: "/2020/resume.pdf",
                                                    target: "blank"
                                                },
                                                "Download Resume"
                                            )
                                        )
                                    )
                                ),
                                r.a.createElement(
                                    $,
                                    { id: "selectedwork" },
                                    r.a.createElement(
                                        M.a,
                                        null,
                                        r.a.createElement(g, {
                                            title: "BukaBike: A cheaper, faster, and more flexible bike sharing system",
                                            description:
                                                "Recently, I helped Bukalapak to design multimodal transportation that is cheap, fast, and flexible for the community in Indonesia.",
                                            featuredimage1:
                                                e.data.bukabike1.childImageSharp
                                                    .fluid,
                                            featuredimage2:
                                                e.data.bukabike2.childImageSharp
                                                    .fluid,
                                            featuredimage3:
                                                e.data.bukabike3.childImageSharp
                                                    .fluid,
                                            featuredimage1alt:
                                                "BukaBike Featured Image",
                                            featuredimage2alt:
                                                "BukaBike Screen History, Trip Detail, Open Bike",
                                            featuredimage3alt:
                                                "BukaBike Screen Reservation, Open Bike Reservation, Info when opening BukaBike"
                                        }),
                                        r.a.createElement(g, {
                                            title: "Design Tooling: I help designers to improve their workflows",
                                            description:
                                                "As a designer who codes, I try to help my design team by building tools like web app, Sketch plugin, or Figma plugin to improve their workflows.",
                                            featuredimage1:
                                                e.data.dt1.childImageSharp
                                                    .fluid,
                                            featuredimage2:
                                                e.data.dt2.childImageSharp
                                                    .fluid,
                                            featuredimage3:
                                                e.data.dt3.childImageSharp
                                                    .fluid,
                                            featuredimage1alt: "Color Finder",
                                            featuredimage2alt:
                                                "Illustration Organizer Sketch Plugin",
                                            featuredimage3alt: "Context"
                                        }),
                                        r.a.createElement(T, null)
                                    ),
                                    r.a.createElement(
                                        C.a,
                                        null,
                                        r.a.createElement(z, null),
                                        r.a.createElement(U, {
                                            talkbackground:
                                                e.data.talkbg.childImageSharp
                                                    .fluid
                                        }),
                                        r.a.createElement(G.a, null)
                                    )
                                )
                            )
                        )
                    }),
                    Object(s.default)(u.c).withConfig({
                        displayName: "pages___StyledParagraph",
                        componentId: "sc-13rsxt4-3"
                    })([
                        "animation:fadeInBottom 1s 0.25s cubic-bezier(0.19,1,0.22,1) backwards;"
                    ])),
                ne = Object(s.default)(u.d).withConfig({
                    displayName: "pages___StyledTitle",
                    componentId: "sc-13rsxt4-4"
                })([
                    "animation:fadeInBottom 1s 0.5s cubic-bezier(0.19,1,0.22,1) backwards;@media only screen and (min-width:48em){width:80%;}@media only screen and (max-width:48em){width:100%;}"
                ]),
                ie = Object(s.default)(l.Box).withConfig({
                    displayName: "pages___StyledBox",
                    componentId: "sc-13rsxt4-5"
                })([
                    "animation:fadeInBottom 1s 0.75s cubic-bezier(0.19,1,0.22,1) backwards;@media only screen and (max-width:48em){a{display:inline-block;}}"
                ]),
                re = Object(s.default)(l.Image).withConfig({
                    displayName: "pages___StyledImage",
                    componentId: "sc-13rsxt4-6"
                })([
                    "max-width:1000%;width:14px;height:14px;animation:slideDown 1s 0.75s cubic-bezier(0.645,0.045,0.355,1) infinite;"
                ])
        },
        TSYQ: function (e, t, n) {
            var i
            !(function () {
                "use strict"
                var n = {}.hasOwnProperty
                function r() {
                    for (var e = [], t = 0; t < arguments.length; t++) {
                        var i = arguments[t]
                        if (i) {
                            var o = typeof i
                            if ("string" === o || "number" === o) e.push(i)
                            else if (Array.isArray(i)) {
                                if (i.length) {
                                    var a = r.apply(null, i)
                                    a && e.push(a)
                                }
                            } else if ("object" === o)
                                if (i.toString === Object.prototype.toString)
                                    for (var s in i)
                                        n.call(i, s) && i[s] && e.push(s)
                                else e.push(i.toString())
                        }
                    }
                    return e.join(" ")
                }
                e.exports
                    ? ((r.default = r), (e.exports = r))
                    : void 0 ===
                          (i = function () {
                              return r
                          }.apply(t, [])) || (e.exports = i)
            })()
        },
        Xbnk: function (e, t, n) {
            "use strict"
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.default = void 0)
            var i,
                r = (i = n("TSYQ")) && i.__esModule ? i : { default: i }
            var o = {
                ROOT: function (e) {
                    return (0, r.default)(
                        (function (e, t, n) {
                            return (
                                t in e
                                    ? Object.defineProperty(e, t, {
                                          value: n,
                                          enumerable: !0,
                                          configurable: !0,
                                          writable: !0
                                      })
                                    : (e[t] = n),
                                e
                            )
                        })({ "carousel-root": !0 }, e || "", !!e)
                    )
                },
                CAROUSEL: function (e) {
                    return (0, r.default)({
                        carousel: !0,
                        "carousel-slider": e
                    })
                },
                WRAPPER: function (e, t) {
                    return (0, r.default)({
                        "thumbs-wrapper": !e,
                        "slider-wrapper": e,
                        "axis-horizontal": "horizontal" === t,
                        "axis-vertical": "horizontal" !== t
                    })
                },
                SLIDER: function (e, t) {
                    return (0, r.default)({
                        thumbs: !e,
                        slider: e,
                        animated: !t
                    })
                },
                ITEM: function (e, t, n) {
                    return (0, r.default)({
                        thumb: !e,
                        slide: e,
                        selected: t,
                        previous: n
                    })
                },
                ARROW_PREV: function (e) {
                    return (0, r.default)({
                        "control-arrow control-prev": !0,
                        "control-disabled": e
                    })
                },
                ARROW_NEXT: function (e) {
                    return (0, r.default)({
                        "control-arrow control-next": !0,
                        "control-disabled": e
                    })
                },
                DOT: function (e) {
                    return (0, r.default)({ dot: !0, selected: e })
                }
            }
            t.default = o
        },
        "YY+w": function (e, t, n) {},
        "Z/Mu": function (e, t, n) {
            "use strict"
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.default = void 0)
            t.default = function () {
                return document
            }
        },
        a6qw: function (e, t, n) {},
        fnPv: function (e, t, n) {
            var i, r, o
            ;(r = [t, n("q1tI"), n("17x9")]),
                void 0 ===
                    (o =
                        "function" ==
                        typeof (i = function (e, t, n) {
                            "use strict"
                            Object.defineProperty(e, "__esModule", {
                                value: !0
                            }),
                                (e.setHasSupportToCaptureOption = p)
                            var i = o(t),
                                r = o(n)
                            function o(e) {
                                return e && e.__esModule ? e : { default: e }
                            }
                            var a =
                                Object.assign ||
                                function (e) {
                                    for (var t = 1; t < arguments.length; t++) {
                                        var n = arguments[t]
                                        for (var i in n)
                                            Object.prototype.hasOwnProperty.call(
                                                n,
                                                i
                                            ) && (e[i] = n[i])
                                    }
                                    return e
                                }
                            function s(e, t) {
                                if (!(e instanceof t))
                                    throw new TypeError(
                                        "Cannot call a class as a function"
                                    )
                            }
                            var l = (function () {
                                function e(e, t) {
                                    for (var n = 0; n < t.length; n++) {
                                        var i = t[n]
                                        ;(i.enumerable = i.enumerable || !1),
                                            (i.configurable = !0),
                                            "value" in i && (i.writable = !0),
                                            Object.defineProperty(e, i.key, i)
                                    }
                                }
                                return function (t, n, i) {
                                    return (
                                        n && e(t.prototype, n), i && e(t, i), t
                                    )
                                }
                            })()
                            function c(e, t) {
                                if (!e)
                                    throw new ReferenceError(
                                        "this hasn't been initialised - super() hasn't been called"
                                    )
                                return !t ||
                                    ("object" != typeof t &&
                                        "function" != typeof t)
                                    ? e
                                    : t
                            }
                            var u = !1
                            function p(e) {
                                u = e
                            }
                            try {
                                addEventListener(
                                    "test",
                                    null,
                                    Object.defineProperty({}, "capture", {
                                        get: function () {
                                            p(!0)
                                        }
                                    })
                                )
                            } catch (h) {}
                            function d() {
                                var e =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : { capture: !0 }
                                return u ? e : e.capture
                            }
                            function f(e) {
                                if ("touches" in e) {
                                    var t = e.touches[0]
                                    return { x: t.pageX, y: t.pageY }
                                }
                                return { x: e.screenX, y: e.screenY }
                            }
                            var m = (function (e) {
                                function t() {
                                    var e
                                    s(this, t)
                                    for (
                                        var n = arguments.length,
                                            i = Array(n),
                                            r = 0;
                                        r < n;
                                        r++
                                    )
                                        i[r] = arguments[r]
                                    var o = c(
                                        this,
                                        (e =
                                            t.__proto__ ||
                                            Object.getPrototypeOf(
                                                t
                                            )).call.apply(e, [this].concat(i))
                                    )
                                    return (
                                        (o._handleSwipeStart =
                                            o._handleSwipeStart.bind(o)),
                                        (o._handleSwipeMove =
                                            o._handleSwipeMove.bind(o)),
                                        (o._handleSwipeEnd =
                                            o._handleSwipeEnd.bind(o)),
                                        (o._onMouseDown =
                                            o._onMouseDown.bind(o)),
                                        (o._onMouseMove =
                                            o._onMouseMove.bind(o)),
                                        (o._onMouseUp = o._onMouseUp.bind(o)),
                                        (o._setSwiperRef =
                                            o._setSwiperRef.bind(o)),
                                        o
                                    )
                                }
                                return (
                                    (function (e, t) {
                                        if (
                                            "function" != typeof t &&
                                            null !== t
                                        )
                                            throw new TypeError(
                                                "Super expression must either be null or a function, not " +
                                                    typeof t
                                            )
                                        ;(e.prototype = Object.create(
                                            t && t.prototype,
                                            {
                                                constructor: {
                                                    value: e,
                                                    enumerable: !1,
                                                    writable: !0,
                                                    configurable: !0
                                                }
                                            }
                                        )),
                                            t &&
                                                (Object.setPrototypeOf
                                                    ? Object.setPrototypeOf(
                                                          e,
                                                          t
                                                      )
                                                    : (e.__proto__ = t))
                                    })(t, e),
                                    l(t, [
                                        {
                                            key: "componentDidMount",
                                            value: function () {
                                                this.swiper &&
                                                    this.swiper.addEventListener(
                                                        "touchmove",
                                                        this._handleSwipeMove,
                                                        d({
                                                            capture: !0,
                                                            passive: !1
                                                        })
                                                    )
                                            }
                                        },
                                        {
                                            key: "componentWillUnmount",
                                            value: function () {
                                                this.swiper &&
                                                    this.swiper.removeEventListener(
                                                        "touchmove",
                                                        this._handleSwipeMove,
                                                        d({
                                                            capture: !0,
                                                            passive: !1
                                                        })
                                                    )
                                            }
                                        },
                                        {
                                            key: "_onMouseDown",
                                            value: function (e) {
                                                this.props.allowMouseEvents &&
                                                    ((this.mouseDown = !0),
                                                    document.addEventListener(
                                                        "mouseup",
                                                        this._onMouseUp
                                                    ),
                                                    document.addEventListener(
                                                        "mousemove",
                                                        this._onMouseMove
                                                    ),
                                                    this._handleSwipeStart(e))
                                            }
                                        },
                                        {
                                            key: "_onMouseMove",
                                            value: function (e) {
                                                this.mouseDown &&
                                                    this._handleSwipeMove(e)
                                            }
                                        },
                                        {
                                            key: "_onMouseUp",
                                            value: function (e) {
                                                ;(this.mouseDown = !1),
                                                    document.removeEventListener(
                                                        "mouseup",
                                                        this._onMouseUp
                                                    ),
                                                    document.removeEventListener(
                                                        "mousemove",
                                                        this._onMouseMove
                                                    ),
                                                    this._handleSwipeEnd(e)
                                            }
                                        },
                                        {
                                            key: "_handleSwipeStart",
                                            value: function (e) {
                                                var t = f(e),
                                                    n = t.x,
                                                    i = t.y
                                                ;(this.moveStart = {
                                                    x: n,
                                                    y: i
                                                }),
                                                    this.props.onSwipeStart(e)
                                            }
                                        },
                                        {
                                            key: "_handleSwipeMove",
                                            value: function (e) {
                                                if (this.moveStart) {
                                                    var t = f(e),
                                                        n = t.x,
                                                        i = t.y,
                                                        r =
                                                            n -
                                                            this.moveStart.x,
                                                        o = i - this.moveStart.y
                                                    ;(this.moving = !0),
                                                        this.props.onSwipeMove(
                                                            { x: r, y: o },
                                                            e
                                                        ) &&
                                                            e.cancelable &&
                                                            e.preventDefault(),
                                                        (this.movePosition = {
                                                            deltaX: r,
                                                            deltaY: o
                                                        })
                                                }
                                            }
                                        },
                                        {
                                            key: "_handleSwipeEnd",
                                            value: function (e) {
                                                this.props.onSwipeEnd(e)
                                                var t = this.props.tolerance
                                                this.moving &&
                                                    this.movePosition &&
                                                    (this.movePosition.deltaX <
                                                    -t
                                                        ? this.props.onSwipeLeft(
                                                              1,
                                                              e
                                                          )
                                                        : this.movePosition
                                                              .deltaX > t &&
                                                          this.props.onSwipeRight(
                                                              1,
                                                              e
                                                          ),
                                                    this.movePosition.deltaY <
                                                    -t
                                                        ? this.props.onSwipeUp(
                                                              1,
                                                              e
                                                          )
                                                        : this.movePosition
                                                              .deltaY > t &&
                                                          this.props.onSwipeDown(
                                                              1,
                                                              e
                                                          )),
                                                    (this.moveStart = null),
                                                    (this.moving = !1),
                                                    (this.movePosition = null)
                                            }
                                        },
                                        {
                                            key: "_setSwiperRef",
                                            value: function (e) {
                                                ;(this.swiper = e),
                                                    this.props.innerRef(e)
                                            }
                                        },
                                        {
                                            key: "render",
                                            value: function () {
                                                var e = this.props,
                                                    t =
                                                        (e.tagName,
                                                        e.className),
                                                    n = e.style,
                                                    r = e.children,
                                                    o =
                                                        (e.allowMouseEvents,
                                                        e.onSwipeUp,
                                                        e.onSwipeDown,
                                                        e.onSwipeLeft,
                                                        e.onSwipeRight,
                                                        e.onSwipeStart,
                                                        e.onSwipeMove,
                                                        e.onSwipeEnd,
                                                        e.innerRef,
                                                        e.tolerance,
                                                        (function (e, t) {
                                                            var n = {}
                                                            for (var i in e)
                                                                t.indexOf(i) >=
                                                                    0 ||
                                                                    (Object.prototype.hasOwnProperty.call(
                                                                        e,
                                                                        i
                                                                    ) &&
                                                                        (n[i] =
                                                                            e[
                                                                                i
                                                                            ]))
                                                            return n
                                                        })(e, [
                                                            "tagName",
                                                            "className",
                                                            "style",
                                                            "children",
                                                            "allowMouseEvents",
                                                            "onSwipeUp",
                                                            "onSwipeDown",
                                                            "onSwipeLeft",
                                                            "onSwipeRight",
                                                            "onSwipeStart",
                                                            "onSwipeMove",
                                                            "onSwipeEnd",
                                                            "innerRef",
                                                            "tolerance"
                                                        ]))
                                                return i.default.createElement(
                                                    this.props.tagName,
                                                    a(
                                                        {
                                                            ref: this
                                                                ._setSwiperRef,
                                                            onMouseDown:
                                                                this
                                                                    ._onMouseDown,
                                                            onTouchStart:
                                                                this
                                                                    ._handleSwipeStart,
                                                            onTouchEnd:
                                                                this
                                                                    ._handleSwipeEnd,
                                                            className: t,
                                                            style: n
                                                        },
                                                        o
                                                    ),
                                                    r
                                                )
                                            }
                                        }
                                    ]),
                                    t
                                )
                            })(t.Component)
                            ;(m.displayName = "ReactSwipe"),
                                (m.propTypes = {
                                    tagName: r.default.string,
                                    className: r.default.string,
                                    style: r.default.object,
                                    children: r.default.node,
                                    allowMouseEvents: r.default.bool,
                                    onSwipeUp: r.default.func,
                                    onSwipeDown: r.default.func,
                                    onSwipeLeft: r.default.func,
                                    onSwipeRight: r.default.func,
                                    onSwipeStart: r.default.func,
                                    onSwipeMove: r.default.func,
                                    onSwipeEnd: r.default.func,
                                    innerRef: r.default.func,
                                    tolerance: r.default.number.isRequired
                                }),
                                (m.defaultProps = {
                                    tagName: "div",
                                    allowMouseEvents: !1,
                                    onSwipeUp: function () {},
                                    onSwipeDown: function () {},
                                    onSwipeLeft: function () {},
                                    onSwipeRight: function () {},
                                    onSwipeStart: function () {},
                                    onSwipeMove: function () {},
                                    onSwipeEnd: function () {},
                                    innerRef: function () {},
                                    tolerance: 0
                                }),
                                (e.default = m)
                        })
                            ? i.apply(t, r)
                            : i) || (e.exports = o)
        },
        "oCA+": function (e, t, n) {
            "use strict"
            n.d(t, "a", function () {
                return r
            }),
                n.d(t, "b", function () {
                    return o
                })
            var i = n("vOnD"),
                r = Object(i.css)([
                    "color:inherit;&:hover{text-decoration:none;}"
                ]),
                o = Object(i.css)(
                    ["text-decoration:underline;text-decoration-color:", ";"],
                    function (e) {
                        return e.theme.colors.black
                    }
                )
        },
        oTKz: function (e, t, n) {
            "use strict"
            Object.defineProperty(t, "__esModule", { value: !0 }),
                Object.defineProperty(t, "Carousel", {
                    enumerable: !0,
                    get: function () {
                        return i.default
                    }
                }),
                Object.defineProperty(t, "CarouselProps", {
                    enumerable: !0,
                    get: function () {
                        return r.CarouselProps
                    }
                }),
                Object.defineProperty(t, "Thumbs", {
                    enumerable: !0,
                    get: function () {
                        return o.default
                    }
                })
            var i = a(n("88hp")),
                r = n("YY+w"),
                o = a(n("yE4M"))
            function a(e) {
                return e && e.__esModule ? e : { default: e }
            }
        },
        pngf: function (e, t, n) {
            "use strict"
            var i = n("q1tI"),
                r = n.n(i),
                o = n("vOnD"),
                a = n("8upa"),
                s = n.n(a),
                l = n("QKO/"),
                c = n("QQ59"),
                u = n("oCA+"),
                p = Object(o.default)(l.Link).withConfig({
                    displayName: "Mini__ViewLink",
                    componentId: "sc-18y50r3-0"
                })(
                    [
                        "text-decoration:underline;letter-spacing:-0.2px;.active &{border-color:",
                        ";}",
                        ";"
                    ],
                    function (e) {
                        return e.theme.colors.black
                    },
                    u.a
                )
            t.a = function (e) {
                var t = Object.assign({}, e)
                return r.a.createElement(
                    l.Flex,
                    Object.assign(
                        {
                            alignItems: "center",
                            justifyContent: "space-between",
                            bg: "white"
                        },
                        t
                    ),
                    r.a.createElement(
                        l.Box,
                        null,
                        r.a.createElement(
                            c.c,
                            {
                                fontSize: 2,
                                color: s.a.colors.gray[1],
                                paddingRight: 4
                            },
                            "Follow me for more thoughts and updates on",
                            " ",
                            r.a.createElement(
                                p,
                                { href: "https://twitter.com/afnizarnur" },
                                "Twitter"
                            ),
                            ",",
                            " ",
                            r.a.createElement(
                                p,
                                { href: "https://dribbble.com/afnizarnur" },
                                "Dribbble"
                            ),
                            ",",
                            " ",
                            r.a.createElement(
                                p,
                                { href: "https://behance.net/afnizarnur" },
                                "Behance"
                            ),
                            ", and",
                            " ",
                            r.a.createElement(
                                p,
                                {
                                    href: "https://www.linkedin.com/in/afnizarnur/"
                                },
                                "Linkedin"
                            ),
                            "."
                        )
                    ),
                    r.a.createElement(
                        l.Box,
                        null,
                        r.a.createElement(
                            d,
                            {
                                className: "scroll",
                                "aria-label": "Scroll to Top",
                                href: "#top"
                            },
                            r.a.createElement(f, {
                                className: "scrollImage",
                                mr: [3, 0],
                                src: "./assets/arrow-up.svg",
                                alt: "Scroll to Top"
                            })
                        )
                    )
                )
            }
            var d = Object(o.default)(l.Link).withConfig({
                    displayName: "Mini___StyledLink",
                    componentId: "sc-18y50r3-1"
                })([
                    "width:14px;height:14px;display:block;:focus{outline:none;}"
                ]),
                f = Object(o.default)(l.Image).withConfig({
                    displayName: "Mini___StyledImage",
                    componentId: "sc-18y50r3-2"
                })(["max-width:1000%;width:14px;height:14px"])
        },
        q0ma: function (e, t, n) {
            "use strict"
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.fadeAnimationHandler =
                    t.slideStopSwipingHandler =
                    t.slideSwipeAnimationHandler =
                    t.slideAnimationHandler =
                        void 0)
            var i,
                r = n("q1tI"),
                o = (i = n("6mdT")) && i.__esModule ? i : { default: i },
                a = n("L/eG")
            function s(e, t) {
                var n = Object.keys(e)
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e)
                    t &&
                        (i = i.filter(function (t) {
                            return Object.getOwnPropertyDescriptor(
                                e,
                                t
                            ).enumerable
                        })),
                        n.push.apply(n, i)
                }
                return n
            }
            function l(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {}
                    t % 2
                        ? s(Object(n), !0).forEach(function (t) {
                              c(e, t, n[t])
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(
                              e,
                              Object.getOwnPropertyDescriptors(n)
                          )
                        : s(Object(n)).forEach(function (t) {
                              Object.defineProperty(
                                  e,
                                  t,
                                  Object.getOwnPropertyDescriptor(n, t)
                              )
                          })
                }
                return e
            }
            function c(e, t, n) {
                return (
                    t in e
                        ? Object.defineProperty(e, t, {
                              value: n,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0
                          })
                        : (e[t] = n),
                    e
                )
            }
            t.slideAnimationHandler = function (e, t) {
                var n = {},
                    i = t.selectedItem,
                    s = i,
                    c = r.Children.count(e.children) - 1
                if (e.infiniteLoop && (i < 0 || i > c))
                    return (
                        s < 0
                            ? e.centerMode &&
                              e.centerSlidePercentage &&
                              "horizontal" === e.axis
                                ? (n.itemListStyle = (0, a.setPosition)(
                                      -(c + 2) * e.centerSlidePercentage -
                                          (100 - e.centerSlidePercentage) / 2,
                                      e.axis
                                  ))
                                : (n.itemListStyle = (0, a.setPosition)(
                                      100 * -(c + 2),
                                      e.axis
                                  ))
                            : s > c &&
                              (n.itemListStyle = (0, a.setPosition)(0, e.axis)),
                        n
                    )
                var u = (0, a.getPosition)(i, e),
                    p = (0, o.default)(u, "%", e.axis),
                    d = e.transitionTime + "ms"
                return (
                    (n.itemListStyle = {
                        WebkitTransform: p,
                        msTransform: p,
                        OTransform: p,
                        transform: p
                    }),
                    t.swiping ||
                        (n.itemListStyle = l(
                            l({}, n.itemListStyle),
                            {},
                            {
                                WebkitTransitionDuration: d,
                                MozTransitionDuration: d,
                                OTransitionDuration: d,
                                transitionDuration: d,
                                msTransitionDuration: d
                            }
                        )),
                    n
                )
            }
            t.slideSwipeAnimationHandler = function (e, t, n, i) {
                var o = {},
                    s = "horizontal" === t.axis,
                    l = r.Children.count(t.children),
                    c = (0, a.getPosition)(n.selectedItem, t),
                    u = t.infiniteLoop
                        ? (0, a.getPosition)(l - 1, t) - 100
                        : (0, a.getPosition)(l - 1, t),
                    p = s ? e.x : e.y,
                    d = p
                0 === c && p > 0 && (d = 0), c === u && p < 0 && (d = 0)
                var f = c + 100 / (n.itemSize / d),
                    m = Math.abs(p) > t.swipeScrollTolerance
                return (
                    t.infiniteLoop &&
                        m &&
                        (0 === n.selectedItem && f > -100
                            ? (f -= 100 * l)
                            : n.selectedItem === l - 1 &&
                              f < 100 * -l &&
                              (f += 100 * l)),
                    (!t.preventMovementUntilSwipeScrollTolerance ||
                        m ||
                        n.swipeMovementStarted) &&
                        (n.swipeMovementStarted ||
                            i({ swipeMovementStarted: !0 }),
                        (o.itemListStyle = (0, a.setPosition)(f, t.axis))),
                    m && !n.cancelClick && i({ cancelClick: !0 }),
                    o
                )
            }
            t.slideStopSwipingHandler = function (e, t) {
                var n = (0, a.getPosition)(t.selectedItem, e)
                return { itemListStyle: (0, a.setPosition)(n, e.axis) }
            }
            t.fadeAnimationHandler = function (e, t) {
                var n = e.transitionTime + "ms",
                    i = {
                        position: "absolute",
                        display: "block",
                        zIndex: -2,
                        minHeight: "100%",
                        opacity: 0,
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        transitionTimingFunction: "ease-in-out",
                        msTransitionTimingFunction: "ease-in-out",
                        MozTransitionTimingFunction: "ease-in-out",
                        WebkitTransitionTimingFunction: "ease-in-out",
                        OTransitionTimingFunction: "ease-in-out"
                    }
                return (
                    t.swiping ||
                        (i = l(
                            l({}, i),
                            {},
                            {
                                WebkitTransitionDuration: n,
                                MozTransitionDuration: n,
                                OTransitionDuration: n,
                                transitionDuration: n,
                                msTransitionDuration: n
                            }
                        )),
                    {
                        slideStyle: i,
                        selectedStyle: l(
                            l({}, i),
                            {},
                            { opacity: 1, position: "relative" }
                        ),
                        prevStyle: l({}, i)
                    }
                )
            }
        },
        yE4M: function (e, t, n) {
            "use strict"
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.default = void 0)
            var i = (function (e) {
                    if (e && e.__esModule) return e
                    if (
                        null === e ||
                        ("object" !== p(e) && "function" != typeof e)
                    )
                        return { default: e }
                    var t = u()
                    if (t && t.has(e)) return t.get(e)
                    var n = {},
                        i =
                            Object.defineProperty &&
                            Object.getOwnPropertyDescriptor
                    for (var r in e)
                        if (Object.prototype.hasOwnProperty.call(e, r)) {
                            var o = i
                                ? Object.getOwnPropertyDescriptor(e, r)
                                : null
                            o && (o.get || o.set)
                                ? Object.defineProperty(n, r, o)
                                : (n[r] = e[r])
                        }
                    ;(n.default = e), t && t.set(e, n)
                    return n
                })(n("q1tI")),
                r = c(n("Xbnk")),
                o = n("1KU/"),
                a = c(n("6mdT")),
                s = c(n("JtOw")),
                l = c(n("4VO2"))
            function c(e) {
                return e && e.__esModule ? e : { default: e }
            }
            function u() {
                if ("function" != typeof WeakMap) return null
                var e = new WeakMap()
                return (
                    (u = function () {
                        return e
                    }),
                    e
                )
            }
            function p(e) {
                return (p =
                    "function" == typeof Symbol &&
                    "symbol" == typeof Symbol.iterator
                        ? function (e) {
                              return typeof e
                          }
                        : function (e) {
                              return e &&
                                  "function" == typeof Symbol &&
                                  e.constructor === Symbol &&
                                  e !== Symbol.prototype
                                  ? "symbol"
                                  : typeof e
                          })(e)
            }
            function d() {
                return (d =
                    Object.assign ||
                    function (e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t]
                            for (var i in n)
                                Object.prototype.hasOwnProperty.call(n, i) &&
                                    (e[i] = n[i])
                        }
                        return e
                    }).apply(this, arguments)
            }
            function f(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n]
                    ;(i.enumerable = i.enumerable || !1),
                        (i.configurable = !0),
                        "value" in i && (i.writable = !0),
                        Object.defineProperty(e, i.key, i)
                }
            }
            function m(e, t) {
                return (m =
                    Object.setPrototypeOf ||
                    function (e, t) {
                        return (e.__proto__ = t), e
                    })(e, t)
            }
            function h(e) {
                var t = (function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct)
                        return !1
                    if (Reflect.construct.sham) return !1
                    if ("function" == typeof Proxy) return !0
                    try {
                        return (
                            Date.prototype.toString.call(
                                Reflect.construct(Date, [], function () {})
                            ),
                            !0
                        )
                    } catch (e) {
                        return !1
                    }
                })()
                return function () {
                    var n,
                        i = y(e)
                    if (t) {
                        var r = y(this).constructor
                        n = Reflect.construct(i, arguments, r)
                    } else n = i.apply(this, arguments)
                    return b(this, n)
                }
            }
            function b(e, t) {
                return !t || ("object" !== p(t) && "function" != typeof t)
                    ? g(e)
                    : t
            }
            function g(e) {
                if (void 0 === e)
                    throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                    )
                return e
            }
            function y(e) {
                return (y = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function (e) {
                          return e.__proto__ || Object.getPrototypeOf(e)
                      })(e)
            }
            function v(e, t, n) {
                return (
                    t in e
                        ? Object.defineProperty(e, t, {
                              value: n,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0
                          })
                        : (e[t] = n),
                    e
                )
            }
            var w = (function (e) {
                !(function (e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError(
                            "Super expression must either be null or a function"
                        )
                    ;(e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    })),
                        t && m(e, t)
                })(p, e)
                var t,
                    n,
                    c,
                    u = h(p)
                function p(e) {
                    var t
                    return (
                        (function (e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    "Cannot call a class as a function"
                                )
                        })(this, p),
                        v(g((t = u.call(this, e))), "itemsWrapperRef", void 0),
                        v(g(t), "itemsListRef", void 0),
                        v(g(t), "thumbsRef", void 0),
                        v(g(t), "setItemsWrapperRef", function (e) {
                            t.itemsWrapperRef = e
                        }),
                        v(g(t), "setItemsListRef", function (e) {
                            t.itemsListRef = e
                        }),
                        v(g(t), "setThumbsRef", function (e, n) {
                            t.thumbsRef || (t.thumbsRef = []),
                                (t.thumbsRef[n] = e)
                        }),
                        v(g(t), "updateSizes", function () {
                            if (
                                t.props.children &&
                                t.itemsWrapperRef &&
                                t.thumbsRef
                            ) {
                                var e = i.Children.count(t.props.children),
                                    n = t.itemsWrapperRef.clientWidth,
                                    r = t.props.thumbWidth
                                        ? t.props.thumbWidth
                                        : (0, o.outerWidth)(t.thumbsRef[0]),
                                    a = Math.floor(n / r),
                                    s = a < e,
                                    l = s ? e - a : 0
                                t.setState(function (e, n) {
                                    return {
                                        itemSize: r,
                                        visibleItems: a,
                                        firstItem: s
                                            ? t.getFirstItem(n.selectedItem)
                                            : 0,
                                        lastPosition: l,
                                        showArrows: s
                                    }
                                })
                            }
                        }),
                        v(g(t), "handleClickItem", function (e, n, i) {
                            if (
                                !(function (e) {
                                    return e.hasOwnProperty("key")
                                })(i) ||
                                "Enter" === i.key
                            ) {
                                var r = t.props.onSelectItem
                                "function" == typeof r && r(e, n)
                            }
                        }),
                        v(g(t), "onSwipeStart", function () {
                            t.setState({ swiping: !0 })
                        }),
                        v(g(t), "onSwipeEnd", function () {
                            t.setState({ swiping: !1 })
                        }),
                        v(g(t), "onSwipeMove", function (e) {
                            var n = e.x
                            if (
                                !t.state.itemSize ||
                                !t.itemsWrapperRef ||
                                !t.state.visibleItems
                            )
                                return !1
                            var r = i.Children.count(t.props.children),
                                o =
                                    (-100 * t.state.firstItem) /
                                    t.state.visibleItems
                            0 === o && n > 0 && (n = 0),
                                o ===
                                    (100 *
                                        -Math.max(
                                            r - t.state.visibleItems,
                                            0
                                        )) /
                                        t.state.visibleItems &&
                                    n < 0 &&
                                    (n = 0)
                            var s =
                                o + 100 / (t.itemsWrapperRef.clientWidth / n)
                            return (
                                t.itemsListRef &&
                                    [
                                        "WebkitTransform",
                                        "MozTransform",
                                        "MsTransform",
                                        "OTransform",
                                        "transform",
                                        "msTransform"
                                    ].forEach(function (e) {
                                        t.itemsListRef.style[e] = (0,
                                        a.default)(s, "%", t.props.axis)
                                    }),
                                !0
                            )
                        }),
                        v(g(t), "slideRight", function (e) {
                            t.moveTo(
                                t.state.firstItem -
                                    ("number" == typeof e ? e : 1)
                            )
                        }),
                        v(g(t), "slideLeft", function (e) {
                            t.moveTo(
                                t.state.firstItem +
                                    ("number" == typeof e ? e : 1)
                            )
                        }),
                        v(g(t), "moveTo", function (e) {
                            ;(e =
                                (e = e < 0 ? 0 : e) >= t.state.lastPosition
                                    ? t.state.lastPosition
                                    : e),
                                t.setState({ firstItem: e })
                        }),
                        (t.state = {
                            selectedItem: e.selectedItem,
                            swiping: !1,
                            showArrows: !1,
                            firstItem: 0,
                            visibleItems: 0,
                            lastPosition: 0
                        }),
                        t
                    )
                }
                return (
                    (t = p),
                    (n = [
                        {
                            key: "componentDidMount",
                            value: function () {
                                this.setupThumbs()
                            }
                        },
                        {
                            key: "UNSAFE_componentWillReceiveProps",
                            value: function (e) {
                                e.selectedItem !== this.state.selectedItem &&
                                    this.setState({
                                        selectedItem: e.selectedItem,
                                        firstItem: this.getFirstItem(
                                            e.selectedItem
                                        )
                                    })
                            }
                        },
                        {
                            key: "componentDidUpdate",
                            value: function (e) {
                                this.props.children !== e.children &&
                                    this.updateSizes()
                            }
                        },
                        {
                            key: "componentWillUnmount",
                            value: function () {
                                this.destroyThumbs()
                            }
                        },
                        {
                            key: "setupThumbs",
                            value: function () {
                                ;(0, l.default)().addEventListener(
                                    "resize",
                                    this.updateSizes
                                ),
                                    (0, l.default)().addEventListener(
                                        "DOMContentLoaded",
                                        this.updateSizes
                                    ),
                                    this.updateSizes()
                            }
                        },
                        {
                            key: "destroyThumbs",
                            value: function () {
                                ;(0, l.default)().removeEventListener(
                                    "resize",
                                    this.updateSizes
                                ),
                                    (0, l.default)().removeEventListener(
                                        "DOMContentLoaded",
                                        this.updateSizes
                                    )
                            }
                        },
                        {
                            key: "getFirstItem",
                            value: function (e) {
                                var t = e
                                return (
                                    e >= this.state.lastPosition &&
                                        (t = this.state.lastPosition),
                                    e <
                                        this.state.firstItem +
                                            this.state.visibleItems &&
                                        (t = this.state.firstItem),
                                    e < this.state.firstItem && (t = e),
                                    t
                                )
                            }
                        },
                        {
                            key: "renderItems",
                            value: function () {
                                var e = this
                                return this.props.children.map(function (t, n) {
                                    var o = r.default.ITEM(
                                            !1,
                                            n === e.state.selectedItem
                                        ),
                                        a = {
                                            key: n,
                                            ref: function (t) {
                                                return e.setThumbsRef(t, n)
                                            },
                                            className: o,
                                            onClick: e.handleClickItem.bind(
                                                e,
                                                n,
                                                e.props.children[n]
                                            ),
                                            onKeyDown: e.handleClickItem.bind(
                                                e,
                                                n,
                                                e.props.children[n]
                                            ),
                                            "aria-label": ""
                                                .concat(
                                                    e.props.labels.item,
                                                    " "
                                                )
                                                .concat(n + 1),
                                            style: { width: e.props.thumbWidth }
                                        }
                                    return i.default.createElement(
                                        "li",
                                        d({}, a, {
                                            role: "button",
                                            tabIndex: 0
                                        }),
                                        t
                                    )
                                })
                            }
                        },
                        {
                            key: "render",
                            value: function () {
                                var e = this
                                if (!this.props.children) return null
                                var t,
                                    n =
                                        i.Children.count(this.props.children) >
                                        1,
                                    o =
                                        this.state.showArrows &&
                                        this.state.firstItem > 0,
                                    l =
                                        this.state.showArrows &&
                                        this.state.firstItem <
                                            this.state.lastPosition,
                                    c =
                                        -this.state.firstItem *
                                        (this.state.itemSize || 0),
                                    u = (0, a.default)(
                                        c,
                                        "px",
                                        this.props.axis
                                    ),
                                    p = this.props.transitionTime + "ms"
                                return (
                                    (t = {
                                        WebkitTransform: u,
                                        MozTransform: u,
                                        MsTransform: u,
                                        OTransform: u,
                                        transform: u,
                                        msTransform: u,
                                        WebkitTransitionDuration: p,
                                        MozTransitionDuration: p,
                                        MsTransitionDuration: p,
                                        OTransitionDuration: p,
                                        transitionDuration: p,
                                        msTransitionDuration: p
                                    }),
                                    i.default.createElement(
                                        "div",
                                        { className: r.default.CAROUSEL(!1) },
                                        i.default.createElement(
                                            "div",
                                            {
                                                className: r.default.WRAPPER(
                                                    !1
                                                ),
                                                ref: this.setItemsWrapperRef
                                            },
                                            i.default.createElement("button", {
                                                type: "button",
                                                className: r.default.ARROW_PREV(
                                                    !o
                                                ),
                                                onClick: function () {
                                                    return e.slideRight()
                                                },
                                                "aria-label":
                                                    this.props.labels.leftArrow
                                            }),
                                            n
                                                ? i.default.createElement(
                                                      s.default,
                                                      {
                                                          tagName: "ul",
                                                          className:
                                                              r.default.SLIDER(
                                                                  !1,
                                                                  this.state
                                                                      .swiping
                                                              ),
                                                          onSwipeLeft:
                                                              this.slideLeft,
                                                          onSwipeRight:
                                                              this.slideRight,
                                                          onSwipeMove:
                                                              this.onSwipeMove,
                                                          onSwipeStart:
                                                              this.onSwipeStart,
                                                          onSwipeEnd:
                                                              this.onSwipeEnd,
                                                          style: t,
                                                          innerRef:
                                                              this
                                                                  .setItemsListRef,
                                                          allowMouseEvents:
                                                              this.props
                                                                  .emulateTouch
                                                      },
                                                      this.renderItems()
                                                  )
                                                : i.default.createElement(
                                                      "ul",
                                                      {
                                                          className:
                                                              r.default.SLIDER(
                                                                  !1,
                                                                  this.state
                                                                      .swiping
                                                              ),
                                                          ref: function (t) {
                                                              return e.setItemsListRef(
                                                                  t
                                                              )
                                                          },
                                                          style: t
                                                      },
                                                      this.renderItems()
                                                  ),
                                            i.default.createElement("button", {
                                                type: "button",
                                                className: r.default.ARROW_NEXT(
                                                    !l
                                                ),
                                                onClick: function () {
                                                    return e.slideLeft()
                                                },
                                                "aria-label":
                                                    this.props.labels.rightArrow
                                            })
                                        )
                                    )
                                )
                            }
                        }
                    ]) && f(t.prototype, n),
                    c && f(t, c),
                    p
                )
            })(i.Component)
            ;(t.default = w),
                v(w, "displayName", "Thumbs"),
                v(w, "defaultProps", {
                    axis: "horizontal",
                    labels: {
                        leftArrow: "previous slide / item",
                        rightArrow: "next slide / item",
                        item: "slide item"
                    },
                    selectedItem: 0,
                    thumbWidth: 80,
                    transitionTime: 350
                })
        }
    }
])
//# sourceMappingURL=component---src-pages-index-js-2611556a491d88feb65e.js.map
