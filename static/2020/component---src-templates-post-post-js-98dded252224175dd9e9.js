;(window.webpackJsonp = window.webpackJsonp || []).push([
    [12],
    {
        "/9aa": function (e, t, n) {
            var r = n("NykK"),
                o = n("ExA7")
            e.exports = function (e) {
                return (
                    "symbol" == typeof e || (o(e) && "[object Symbol]" == r(e))
                )
            }
        },
        "3cYt": function (e, t) {
            e.exports = function (e) {
                return function (t) {
                    return null == e ? void 0 : e[t]
                }
            }
        },
        "6nK8": function (e, t, n) {
            var r = n("dVn5"),
                o = n("fo6e"),
                i = n("dt0z"),
                a = n("9NmV")
            e.exports = function (e, t, n) {
                return (
                    (e = i(e)),
                    void 0 === (t = n ? void 0 : t)
                        ? o(e)
                            ? a(e)
                            : r(e)
                        : e.match(t) || []
                )
            }
        },
        "9NmV": function (e, t) {
            var n =
                    "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
                r = "[" + n + "]",
                o = "\\d+",
                i = "[\\u2700-\\u27bf]",
                a = "[a-z\\xdf-\\xf6\\xf8-\\xff]",
                c =
                    "[^\\ud800-\\udfff" +
                    n +
                    o +
                    "\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",
                u = "(?:\\ud83c[\\udde6-\\uddff]){2}",
                m = "[\\ud800-\\udbff][\\udc00-\\udfff]",
                l = "[A-Z\\xc0-\\xd6\\xd8-\\xde]",
                f = "(?:" + a + "|" + c + ")",
                s = "(?:" + l + "|" + c + ")",
                d =
                    "(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",
                p =
                    "[\\ufe0e\\ufe0f]?" +
                    d +
                    ("(?:\\u200d(?:" +
                        ["[^\\ud800-\\udfff]", u, m].join("|") +
                        ")[\\ufe0e\\ufe0f]?" +
                        d +
                        ")*"),
                h = "(?:" + [i, u, m].join("|") + ")" + p,
                g = RegExp(
                    [
                        l +
                            "?" +
                            a +
                            "+(?:['’](?:d|ll|m|re|s|t|ve))?(?=" +
                            [r, l, "$"].join("|") +
                            ")",
                        s +
                            "+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=" +
                            [r, l + f, "$"].join("|") +
                            ")",
                        l + "?" + f + "+(?:['’](?:d|ll|m|re|s|t|ve))?",
                        l + "+(?:['’](?:D|LL|M|RE|S|T|VE))?",
                        "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
                        "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
                        o,
                        h
                    ].join("|"),
                    "g"
                )
            e.exports = function (e) {
                return e.match(g) || []
            }
        },
        AP2z: function (e, t, n) {
            var r = n("nmnc"),
                o = Object.prototype,
                i = o.hasOwnProperty,
                a = o.toString,
                c = r ? r.toStringTag : void 0
            e.exports = function (e) {
                var t = i.call(e, c),
                    n = e[c]
                try {
                    e[c] = void 0
                    var r = !0
                } catch (u) {}
                var o = a.call(e)
                return r && (t ? (e[c] = n) : delete e[c]), o
            }
        },
        ExA7: function (e, t) {
            e.exports = function (e) {
                return null != e && "object" == typeof e
            }
        },
        F9h1: function (e, t, n) {},
        KfNM: function (e, t) {
            var n = Object.prototype.toString
            e.exports = function (e) {
                return n.call(e)
            }
        },
        Kz5y: function (e, t, n) {
            var r = n("WFqU"),
                o =
                    "object" == typeof self &&
                    self &&
                    self.Object === Object &&
                    self,
                i = r || o || Function("return this")()
            e.exports = i
        },
        N1om: function (e, t, n) {
            var r = n("sgoq")(function (e, t, n) {
                return e + (n ? "-" : "") + t.toLowerCase()
            })
            e.exports = r
        },
        NykK: function (e, t, n) {
            var r = n("nmnc"),
                o = n("AP2z"),
                i = n("KfNM"),
                a = r ? r.toStringTag : void 0
            e.exports = function (e) {
                return null == e
                    ? void 0 === e
                        ? "[object Undefined]"
                        : "[object Null]"
                    : a && a in Object(e)
                    ? o(e)
                    : i(e)
            }
        },
        TKrE: function (e, t, n) {
            var r = n("qRkn"),
                o = n("dt0z"),
                i = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
                a = RegExp(
                    "[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",
                    "g"
                )
            e.exports = function (e) {
                return (e = o(e)) && e.replace(i, r).replace(a, "")
            }
        },
        WFqU: function (e, t, n) {
            ;(function (t) {
                var n = "object" == typeof t && t && t.Object === Object && t
                e.exports = n
            }.call(this, n("yLpj")))
        },
        Z0cm: function (e, t) {
            var n = Array.isArray
            e.exports = n
        },
        asDA: function (e, t) {
            e.exports = function (e, t, n, r) {
                var o = -1,
                    i = null == e ? 0 : e.length
                for (r && i && (n = e[++o]); ++o < i; ) n = t(n, e[o], o, e)
                return n
            }
        },
        dVn5: function (e, t) {
            var n = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g
            e.exports = function (e) {
                return e.match(n) || []
            }
        },
        dt0z: function (e, t, n) {
            var r = n("zoYe")
            e.exports = function (e) {
                return null == e ? "" : r(e)
            }
        },
        eUgh: function (e, t) {
            e.exports = function (e, t) {
                for (
                    var n = -1, r = null == e ? 0 : e.length, o = Array(r);
                    ++n < r;

                )
                    o[n] = t(e[n], n, e)
                return o
            }
        },
        fo6e: function (e, t) {
            var n =
                /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/
            e.exports = function (e) {
                return n.test(e)
            }
        },
        nmnc: function (e, t, n) {
            var r = n("Kz5y").Symbol
            e.exports = r
        },
        "oCA+": function (e, t, n) {
            "use strict"
            n.d(t, "a", function () {
                return o
            }),
                n.d(t, "b", function () {
                    return i
                })
            var r = n("vOnD"),
                o = Object(r.css)([
                    "color:inherit;&:hover{text-decoration:none;}"
                ]),
                i = Object(r.css)(
                    ["text-decoration:underline;text-decoration-color:", ";"],
                    function (e) {
                        return e.theme.colors.black
                    }
                )
        },
        oo1y: function (e, t, n) {
            "use strict"
            n.r(t)
            var r = n("q1tI"),
                o = n.n(r),
                i = n("Wbzz"),
                a = n("TJpk"),
                c = n.n(a),
                u = n("rY4l"),
                m = n("QQ59"),
                l = n("vOnD"),
                f = n("QKO/"),
                s = n("oCA+"),
                d = Object(l.default)(f.Text).withConfig({
                    displayName: "MarkdownContent",
                    componentId: "sc-1i0jpvx-0"
                })(
                    [
                        "& > *{margin-top:0;margin-bottom:0;& + *{margin-top:",
                        ";}& + h1,& + h2{margin-top:3rem;}& + h3,& + h4{margin-top:3rem;@media (max-width:",
                        "){margin-top:2.5rem;margin-bottom:-0.5rem;}}}h1,h2,h3,h4,h5,h6{line-height:",
                        ";}h1{font-size:",
                        ";letter-spacing:",
                        ";font-weight:800;@media (max-width:",
                        "){letter-spacing:0px;font-size:",
                        ";}}h2{font-size:2.5rem;letter-spacing:",
                        ";font-weight:600;@media (max-width:",
                        "){letter-spacing:0px;font-size:",
                        ";}}h3{font-size:2rem;font-weight:600;@media (max-width:",
                        "){font-size:",
                        ";}}h4,h5,h6{font-size:",
                        ";font-weight:600;@media (max-width:",
                        "){font-size:",
                        ";}}h1 code,h2 code,h3 code,h4 code,h5 code,h6 code{background-color:transparent;color:inherit;}p{color:",
                        ";}hr{overflow:visible;padding:0;border:none;color:",
                        ";text-align:center;margin:",
                        ' 0;}hr:after{content:"...";letter-spacing:0.5em;display:inline-block;position:relative;top:-0.7em;font-size:1.5em;background:white;}ul,ol,dl{color:',
                        ";}ul{list-style-type:square;}ul ul,ol ol,ul ol,ol ul{margin-top:0;margin-bottom:0;}b,strong,em,small,code{line-height:1;}sup,sub{vertical-align:baseline;position:relative;top:-0.4em;}sub{top:0.4em;}a{",
                        ";",
                        ';&:hover code{opacity:0.8;}&.anchor{margin-left:-24px;}@media print{&:after{content:" (" attr(href) ")";font-size:0.875em;}&[href^="/"]:after{content:" (https://afnizarnur.com" attr(href) ")";}&[href^="#"]{text-decoration:none;&:after{content:"";}}}}blockquote{margin:2.75rem -1.7rem;border-left:4px solid ',
                        ";border-left-style:groove;padding:0 ",
                        ";font-style:italic;@media (max-width:",
                        "){margin:2.75rem 0rem;}}details{margin-top:",
                        ";margin-bottom:",
                        ";border-radius:",
                        ";padding:",
                        ";background-color:",
                        ";p{outline:none !important;}>:first-child{margin-top:0;outline:none;font-weight:bold;}>:last-child{margin-bottom:0;}}code{font-family:",
                        "!important;}p code,li code{border-radius:",
                        ";padding-left:",
                        ";padding-right:",
                        ";white-space:nowrap;box-shadow:none !important;border:none !important;@media (min-width:",
                        "){font-size:",
                        ";}}p code{background-color:",
                        "!important;color:",
                        ";text-shadow:none;padding:0.2em 0.3em !important;}pre{width:100%;overflow-x:scroll;margin-top:2.75rem;margin-bottom:2.75rem;border-radius:",
                        ";padding:",
                        ";background-color:",
                        ";color:",
                        ";font-size:",
                        ";font-family:",
                        "!important;white-space:pre;@media (min-width:",
                        "){font-size:",
                        ";}@media print{background-color:transparent;color:",
                        ";}}img{display:block;width:100%;border-radius:",
                        ";}.gatsby-resp-image-figure .gatsby-resp-image-wrapper{margin-bottom:",
                        ";border-radius:",
                        ";}.gatsby-resp-image-figure .gatsby-resp-image-figcaption{text-align:center;font-style:italic;}.gatsby-resp-image-background-image{border-radius:",
                        ";}.gatsby-resp-image-wrapper{margin-top:2.75rem;margin-bottom:3.25rem;border-radius:",
                        ";}iframe{margin-top:",
                        ";margin-bottom:",
                        ";border:1px solid ",
                        ";}"
                    ],
                    function (e) {
                        return e.theme.space[5]
                    },
                    function (e) {
                        return e.theme.breakpoints[0]
                    },
                    function (e) {
                        return e.theme.lineHeights.title1
                    },
                    function (e) {
                        return e.theme.fontSizes[4]
                    },
                    function (e) {
                        return e.theme.letterSpacings.title2
                    },
                    function (e) {
                        return e.theme.breakpoints[0]
                    },
                    function (e) {
                        return e.theme.fontSizes[3]
                    },
                    function (e) {
                        return e.theme.letterSpacings.title3
                    },
                    function (e) {
                        return e.theme.breakpoints[0]
                    },
                    function (e) {
                        return e.theme.fontSizes[3]
                    },
                    function (e) {
                        return e.theme.breakpoints[0]
                    },
                    function (e) {
                        return e.theme.fontSizes[2]
                    },
                    function (e) {
                        return e.theme.fontSizes[1]
                    },
                    function (e) {
                        return e.theme.breakpoints[0]
                    },
                    function (e) {
                        return e.theme.fontSizes[2]
                    },
                    function (e) {
                        return e.theme.colors.gray[2]
                    },
                    function (e) {
                        return e.theme.colors.gray[1]
                    },
                    function (e) {
                        return e.theme.space[6]
                    },
                    function (e) {
                        return e.theme.colors.gray[2]
                    },
                    s.a,
                    s.b,
                    function (e) {
                        return e.theme.colors.black
                    },
                    function (e) {
                        return e.theme.space[5]
                    },
                    function (e) {
                        return e.theme.breakpoints[0]
                    },
                    function (e) {
                        return e.theme.space[4]
                    },
                    function (e) {
                        return e.theme.space[4]
                    },
                    function (e) {
                        return e.theme.radii[2]
                    },
                    function (e) {
                        return e.theme.space[4]
                    },
                    function (e) {
                        return e.theme.colors.gray[0]
                    },
                    function (e) {
                        return e.theme.fonts.monospace
                    },
                    function (e) {
                        return e.theme.radii[1]
                    },
                    function (e) {
                        return e.theme.space[1]
                    },
                    function (e) {
                        return e.theme.space[1]
                    },
                    function (e) {
                        return e.theme.breakpoints[0]
                    },
                    function (e) {
                        return e.theme.fontSizes[1]
                    },
                    function (e) {
                        return e.theme.colors.gray[0]
                    },
                    function (e) {
                        return e.theme.colors.gray[2]
                    },
                    function (e) {
                        return e.theme.radii[2]
                    },
                    function (e) {
                        return e.theme.space[3]
                    },
                    function (e) {
                        return e.theme.colors.gray[2]
                    },
                    function (e) {
                        return e.theme.colors.white
                    },
                    function (e) {
                        return e.theme.fontSizes[0]
                    },
                    function (e) {
                        return e.theme.fonts.monospace
                    },
                    function (e) {
                        return e.theme.breakpoints[0]
                    },
                    function (e) {
                        return e.theme.fontSizes[1]
                    },
                    function (e) {
                        return e.theme.colors.gray[2]
                    },
                    function (e) {
                        return e.theme.radii[2]
                    },
                    function (e) {
                        return e.theme.space[4]
                    },
                    function (e) {
                        return e.theme.radii[2]
                    },
                    function (e) {
                        return e.theme.radii[2]
                    },
                    function (e) {
                        return e.theme.radii[2]
                    },
                    function (e) {
                        return e.theme.space[4]
                    },
                    function (e) {
                        return e.theme.space[4]
                    },
                    function (e) {
                        return e.theme.colors.white
                    }
                ),
                p = n("lwPf"),
                h = n("m4Sl"),
                g = function (e) {
                    var t = e.children
                    return o.a.createElement(
                        b,
                        { flex: "1", px: [5, 5, 4] },
                        o.a.createElement(
                            x,
                            { flexDirection: "column", mx: "auto" },
                            t
                        )
                    )
                },
                b = Object(l.default)(f.Box).withConfig({
                    displayName: "Blog___StyledBox",
                    componentId: "sc-11m55gt-0"
                })(["max-width:100%"]),
                x = Object(l.default)(f.Flex).withConfig({
                    displayName: "Blog___StyledFlex",
                    componentId: "sc-11m55gt-1"
                })(["max-width:795px;height:100%"]),
                y = n("Q/Mu"),
                w = n("pngf"),
                z = (n("F9h1"), n("N1om")),
                E = n.n(z),
                v = n("8upa"),
                k = n.n(v),
                S =
                    (Object(l.default)(f.Link).withConfig({
                        displayName: "Post__ViewLink",
                        componentId: "sc-1oczmit-0"
                    })(
                        [
                            "text-decoration:underline;letter-spacing:-0.2px;font-size:",
                            ";color:",
                            "!important;",
                            ";"
                        ],
                        function (e) {
                            return e.theme.fontSizes[2]
                        },
                        function (e) {
                            return e.theme.colors.gray[2]
                        },
                        s.a
                    ),
                    Object(l.default)(i.Link).withConfig({
                        displayName: "Post__TagButton",
                        componentId: "sc-1oczmit-1"
                    })(
                        [
                            "background:",
                            ";color:",
                            ";border-radius:4px;font-size:",
                            ";padding:0.5rem 0.75rem;&:hover{background:",
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
                            return e.theme.fontSizes[1]
                        },
                        function (e) {
                            return e.theme.colors.black
                        },
                        function (e) {
                            return e.theme.colors.white
                        }
                    )),
                j =
                    ((t.default = function (e) {
                        var t = e.data,
                            n = Object(p.a)(),
                            r = n.title,
                            i = n.siteUrl,
                            a = t.markdownRemark
                        a.frontmatter.tags.map(function (e) {
                            return o.a.createElement(
                                S,
                                { to: "writing/tags/" + E()(e) + "/" },
                                e
                            )
                        })
                        return o.a.createElement(
                            o.a.Fragment,
                            null,
                            o.a.createElement(
                                c.a,
                                null,
                                o.a.createElement(
                                    "title",
                                    null,
                                    a.frontmatter.title,
                                    " | ",
                                    r
                                ),
                                o.a.createElement("meta", {
                                    name: "description",
                                    content: a.frontmatter.description
                                }),
                                o.a.createElement("meta", {
                                    property: "og:site_name",
                                    content: r
                                }),
                                o.a.createElement("meta", {
                                    property: "og:title",
                                    content: a.frontmatter.title
                                }),
                                o.a.createElement("meta", {
                                    property: "og:url",
                                    content: "" + i + a.fields.slug
                                }),
                                o.a.createElement("meta", {
                                    property: "og:description",
                                    content: a.frontmatter.description
                                }),
                                o.a.createElement("meta", {
                                    property: "og:image",
                                    content:
                                        "https://afnizarnur-og-image-generator.now.sh/api?title=" +
                                        encodeURIComponent(
                                            String(a.frontmatter.title)
                                        )
                                }),
                                o.a.createElement("meta", {
                                    name: "twitter:title",
                                    content: a.frontmatter.title
                                }),
                                o.a.createElement("meta", {
                                    name: "twitter:site",
                                    content: "@afnizarnur"
                                }),
                                o.a.createElement("meta", {
                                    name: "twitter:description",
                                    content: a.frontmatter.description
                                }),
                                o.a.createElement("meta", {
                                    name: "twitter:image",
                                    content:
                                        "https://afnizarnur-og-image-generator.now.sh/api?title=" +
                                        encodeURIComponent(
                                            String(a.frontmatter.title)
                                        )
                                }),
                                o.a.createElement("meta", {
                                    name: "twitter:card",
                                    content: "summary_large_image"
                                })
                            ),
                            o.a.createElement(
                                f.Box,
                                null,
                                o.a.createElement(
                                    h.a,
                                    null,
                                    o.a.createElement(y.a, null)
                                ),
                                o.a.createElement(
                                    "article",
                                    { id: "main-content" },
                                    o.a.createElement(
                                        g,
                                        null,
                                        o.a.createElement(
                                            u.a,
                                            null,
                                            o.a.createElement(
                                                j,
                                                {
                                                    fontSize: [2, 3],
                                                    mt: [6, 9]
                                                },
                                                "Published on",
                                                " ",
                                                o.a.createElement(
                                                    "time",
                                                    {
                                                        dateTime:
                                                            a.frontmatter
                                                                .datetime
                                                    },
                                                    a.frontmatter.date
                                                )
                                            ),
                                            o.a.createElement(
                                                O,
                                                { mt: "2.0rem" },
                                                a.frontmatter.title
                                            ),
                                            o.a.createElement(
                                                _,
                                                {
                                                    fontSize: [2, 3],
                                                    mt: [16],
                                                    mb: 12
                                                },
                                                a.frontmatter.description
                                            ),
                                            o.a.createElement("hr", {
                                                style: {
                                                    border: "none",
                                                    borderTop:
                                                        "1px solid #d8d8d8"
                                                }
                                            })
                                        ),
                                        o.a.createElement(d, {
                                            as: "main",
                                            lineHeight: "copy",
                                            fontSize: [1, 2],
                                            mt: 12,
                                            dangerouslySetInnerHTML: {
                                                __html: a.html
                                            }
                                        }),
                                        o.a.createElement(
                                            f.Box,
                                            { mt: 12 },
                                            o.a.createElement(
                                                I,
                                                {
                                                    flexDirection: "row",
                                                    justifyContent:
                                                        "space-between"
                                                },
                                                o.a.createElement(
                                                    f.Box,
                                                    null,
                                                    o.a.createElement(
                                                        "ul",
                                                        {
                                                            style: {
                                                                padding: 0,
                                                                margin: 0,
                                                                display: "block"
                                                            }
                                                        },
                                                        a.frontmatter.tags.map(
                                                            function (e) {
                                                                return o.a.createElement(
                                                                    "li",
                                                                    {
                                                                        key: e,
                                                                        style: {
                                                                            marginRight:
                                                                                k
                                                                                    .a
                                                                                    .space[2],
                                                                            marginBottom:
                                                                                "1.8rem",
                                                                            display:
                                                                                "inline-block"
                                                                        }
                                                                    },
                                                                    o.a.createElement(
                                                                        S,
                                                                        {
                                                                            to:
                                                                                "writing/tags/" +
                                                                                E()(
                                                                                    e
                                                                                ) +
                                                                                "/",
                                                                            key: e
                                                                        },
                                                                        e
                                                                    )
                                                                )
                                                            }
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                ),
                                o.a.createElement(
                                    A,
                                    { mt: [13] },
                                    o.a.createElement(
                                        h.a,
                                        null,
                                        o.a.createElement(w.a, {
                                            paddingTop: [6],
                                            paddingBottom: [6]
                                        })
                                    )
                                )
                            )
                        )
                    }),
                    Object(l.default)(m.c).withConfig({
                        displayName: "Post___StyledParagraph",
                        componentId: "sc-1oczmit-2"
                    })([
                        "animation:fadeInBottom 1s 0.25s cubic-bezier(0.19,1,0.22,1) backwards;"
                    ])),
                O = Object(l.default)(m.d).withConfig({
                    displayName: "Post___StyledTitle",
                    componentId: "sc-1oczmit-3"
                })([
                    "animation:fadeInBottom 1s 0.5s cubic-bezier(0.19,1,0.22,1) backwards;"
                ]),
                _ = Object(l.default)(m.c).withConfig({
                    displayName: "Post___StyledParagraph2",
                    componentId: "sc-1oczmit-4"
                })([
                    "animation:fadeInBottom 1s 0.75s cubic-bezier(0.19,1,0.22,1) backwards;"
                ]),
                I = Object(l.default)(f.Flex).withConfig({
                    displayName: "Post___StyledFlex",
                    componentId: "sc-1oczmit-5"
                })([
                    "@media only screen and (max-width:48em){flex-direction:column;}"
                ]),
                A = Object(l.default)(f.Box).withConfig({
                    displayName: "Post___StyledBox",
                    componentId: "sc-1oczmit-6"
                })(["border-top:1px solid #d8d8d8"])
        },
        pngf: function (e, t, n) {
            "use strict"
            var r = n("q1tI"),
                o = n.n(r),
                i = n("vOnD"),
                a = n("8upa"),
                c = n.n(a),
                u = n("QKO/"),
                m = n("QQ59"),
                l = n("oCA+"),
                f = Object(i.default)(u.Link).withConfig({
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
                    l.a
                )
            t.a = function (e) {
                var t = Object.assign({}, e)
                return o.a.createElement(
                    u.Flex,
                    Object.assign(
                        {
                            alignItems: "center",
                            justifyContent: "space-between",
                            bg: "white"
                        },
                        t
                    ),
                    o.a.createElement(
                        u.Box,
                        null,
                        o.a.createElement(
                            m.c,
                            {
                                fontSize: 2,
                                color: c.a.colors.gray[1],
                                paddingRight: 4
                            },
                            "Follow me for more thoughts and updates on",
                            " ",
                            o.a.createElement(
                                f,
                                { href: "https://twitter.com/afnizarnur" },
                                "Twitter"
                            ),
                            ",",
                            " ",
                            o.a.createElement(
                                f,
                                { href: "https://dribbble.com/afnizarnur" },
                                "Dribbble"
                            ),
                            ",",
                            " ",
                            o.a.createElement(
                                f,
                                { href: "https://behance.net/afnizarnur" },
                                "Behance"
                            ),
                            ", and",
                            " ",
                            o.a.createElement(
                                f,
                                {
                                    href: "https://www.linkedin.com/in/afnizarnur/"
                                },
                                "Linkedin"
                            ),
                            "."
                        )
                    ),
                    o.a.createElement(
                        u.Box,
                        null,
                        o.a.createElement(
                            s,
                            {
                                className: "scroll",
                                "aria-label": "Scroll to Top",
                                href: "#top"
                            },
                            o.a.createElement(d, {
                                className: "scrollImage",
                                mr: [3, 0],
                                src: "./assets/arrow-up.svg",
                                alt: "Scroll to Top"
                            })
                        )
                    )
                )
            }
            var s = Object(i.default)(u.Link).withConfig({
                    displayName: "Mini___StyledLink",
                    componentId: "sc-18y50r3-1"
                })([
                    "width:14px;height:14px;display:block;:focus{outline:none;}"
                ]),
                d = Object(i.default)(u.Image).withConfig({
                    displayName: "Mini___StyledImage",
                    componentId: "sc-18y50r3-2"
                })(["max-width:1000%;width:14px;height:14px"])
        },
        qRkn: function (e, t, n) {
            var r = n("3cYt")({
                À: "A",
                Á: "A",
                Â: "A",
                Ã: "A",
                Ä: "A",
                Å: "A",
                à: "a",
                á: "a",
                â: "a",
                ã: "a",
                ä: "a",
                å: "a",
                Ç: "C",
                ç: "c",
                Ð: "D",
                ð: "d",
                È: "E",
                É: "E",
                Ê: "E",
                Ë: "E",
                è: "e",
                é: "e",
                ê: "e",
                ë: "e",
                Ì: "I",
                Í: "I",
                Î: "I",
                Ï: "I",
                ì: "i",
                í: "i",
                î: "i",
                ï: "i",
                Ñ: "N",
                ñ: "n",
                Ò: "O",
                Ó: "O",
                Ô: "O",
                Õ: "O",
                Ö: "O",
                Ø: "O",
                ò: "o",
                ó: "o",
                ô: "o",
                õ: "o",
                ö: "o",
                ø: "o",
                Ù: "U",
                Ú: "U",
                Û: "U",
                Ü: "U",
                ù: "u",
                ú: "u",
                û: "u",
                ü: "u",
                Ý: "Y",
                ý: "y",
                ÿ: "y",
                Æ: "Ae",
                æ: "ae",
                Þ: "Th",
                þ: "th",
                ß: "ss",
                Ā: "A",
                Ă: "A",
                Ą: "A",
                ā: "a",
                ă: "a",
                ą: "a",
                Ć: "C",
                Ĉ: "C",
                Ċ: "C",
                Č: "C",
                ć: "c",
                ĉ: "c",
                ċ: "c",
                č: "c",
                Ď: "D",
                Đ: "D",
                ď: "d",
                đ: "d",
                Ē: "E",
                Ĕ: "E",
                Ė: "E",
                Ę: "E",
                Ě: "E",
                ē: "e",
                ĕ: "e",
                ė: "e",
                ę: "e",
                ě: "e",
                Ĝ: "G",
                Ğ: "G",
                Ġ: "G",
                Ģ: "G",
                ĝ: "g",
                ğ: "g",
                ġ: "g",
                ģ: "g",
                Ĥ: "H",
                Ħ: "H",
                ĥ: "h",
                ħ: "h",
                Ĩ: "I",
                Ī: "I",
                Ĭ: "I",
                Į: "I",
                İ: "I",
                ĩ: "i",
                ī: "i",
                ĭ: "i",
                į: "i",
                ı: "i",
                Ĵ: "J",
                ĵ: "j",
                Ķ: "K",
                ķ: "k",
                ĸ: "k",
                Ĺ: "L",
                Ļ: "L",
                Ľ: "L",
                Ŀ: "L",
                Ł: "L",
                ĺ: "l",
                ļ: "l",
                ľ: "l",
                ŀ: "l",
                ł: "l",
                Ń: "N",
                Ņ: "N",
                Ň: "N",
                Ŋ: "N",
                ń: "n",
                ņ: "n",
                ň: "n",
                ŋ: "n",
                Ō: "O",
                Ŏ: "O",
                Ő: "O",
                ō: "o",
                ŏ: "o",
                ő: "o",
                Ŕ: "R",
                Ŗ: "R",
                Ř: "R",
                ŕ: "r",
                ŗ: "r",
                ř: "r",
                Ś: "S",
                Ŝ: "S",
                Ş: "S",
                Š: "S",
                ś: "s",
                ŝ: "s",
                ş: "s",
                š: "s",
                Ţ: "T",
                Ť: "T",
                Ŧ: "T",
                ţ: "t",
                ť: "t",
                ŧ: "t",
                Ũ: "U",
                Ū: "U",
                Ŭ: "U",
                Ů: "U",
                Ű: "U",
                Ų: "U",
                ũ: "u",
                ū: "u",
                ŭ: "u",
                ů: "u",
                ű: "u",
                ų: "u",
                Ŵ: "W",
                ŵ: "w",
                Ŷ: "Y",
                ŷ: "y",
                Ÿ: "Y",
                Ź: "Z",
                Ż: "Z",
                Ž: "Z",
                ź: "z",
                ż: "z",
                ž: "z",
                Ĳ: "IJ",
                ĳ: "ij",
                Œ: "Oe",
                œ: "oe",
                ŉ: "'n",
                ſ: "s"
            })
            e.exports = r
        },
        sgoq: function (e, t, n) {
            var r = n("asDA"),
                o = n("TKrE"),
                i = n("6nK8"),
                a = RegExp("['’]", "g")
            e.exports = function (e) {
                return function (t) {
                    return r(i(o(t).replace(a, "")), e, "")
                }
            }
        },
        zoYe: function (e, t, n) {
            var r = n("nmnc"),
                o = n("eUgh"),
                i = n("Z0cm"),
                a = n("/9aa"),
                c = r ? r.prototype : void 0,
                u = c ? c.toString : void 0
            e.exports = function e(t) {
                if ("string" == typeof t) return t
                if (i(t)) return o(t, e) + ""
                if (a(t)) return u ? u.call(t) : ""
                var n = t + ""
                return "0" == n && 1 / t == -1 / 0 ? "-0" : n
            }
        }
    }
])
//# sourceMappingURL=component---src-templates-post-post-js-98dded252224175dd9e9.js.map
