;(window.webpackJsonp = window.webpackJsonp || []).push([
    [10],
    {
        F8J9: function (e, t, n) {
            "use strict"
            n.r(t)
            var a = n("q1tI"),
                i = n.n(a),
                r = n("Wbzz"),
                l = n("TJpk"),
                o = n.n(l),
                c = n("QKO/"),
                m = n("rY4l"),
                d = n("QQ59"),
                s = n("lwPf"),
                u = n("oCA+"),
                f = n("m4Sl"),
                g = n("Q/Mu"),
                p = n("Fzi1"),
                h = n("8upa"),
                b = n.n(h),
                w = n("9eSz"),
                E = n.n(w),
                y = n("vOnD"),
                x = function (e) {
                    var t = e.children
                    return i.a.createElement(
                        O,
                        {
                            as: "h3",
                            fontSize: [3],
                            lineHeight: "title",
                            color: b.a.colors.black,
                            mb: 3
                        },
                        t
                    )
                },
                k = Object(y.default)(r.Link).withConfig({
                    displayName: "writing__ViewLink",
                    componentId: "sc-1l0uxkl-0"
                })(["text-decoration:underline;", ";"], u.a),
                _ = Object(y.default)(k).withConfig({
                    displayName: "writing___StyledViewLink",
                    componentId: "sc-1l0uxkl-1"
                })(["", ""], u.a)
            t.default = function () {
                var e = Object(s.a)().title,
                    t = Object(r.useStaticQuery)("1415020275").allMarkdownRemark
                        .edges,
                    n = { borderRadius: b.a.radii[2] }
                return i.a.createElement(
                    i.a.Fragment,
                    null,
                    i.a.createElement(
                        o.a,
                        null,
                        i.a.createElement("title", null, "Writing | ", e),
                        i.a.createElement("meta", {
                            property: "og:site_name",
                            content: e
                        }),
                        i.a.createElement("meta", {
                            property: "og:title",
                            content: "Writing | " + e
                        }),
                        i.a.createElement("meta", {
                            name: "twitter:title",
                            content: "Writing | " + e
                        })
                    ),
                    i.a.createElement(
                        c.Box,
                        null,
                        i.a.createElement(
                            f.a,
                            null,
                            i.a.createElement(g.a, null)
                        ),
                        i.a.createElement(
                            c.Box,
                            { as: "main", id: "main-content" },
                            i.a.createElement(
                                f.a,
                                null,
                                i.a.createElement(
                                    m.a,
                                    null,
                                    i.a.createElement(
                                        I,
                                        { mt: [6, 9] },
                                        "Writing"
                                    ),
                                    i.a.createElement(
                                        j,
                                        {
                                            maxWidth: "90%",
                                            fontSize: [2, 3],
                                            mt: [4, 5],
                                            mb: [10, 14]
                                        },
                                        "I occasionally write about what work I’ve been doing and share my thoughts on anything from design to personal life."
                                    )
                                ),
                                i.a.createElement(
                                    "main",
                                    null,
                                    i.a.createElement(
                                        c.Flex,
                                        {
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            flexWrap: "wrap"
                                        },
                                        t.map(function (e, a) {
                                            var l = e.node,
                                                o = l.fields,
                                                m = l.frontmatter
                                            return i.a.createElement(
                                                c.Box,
                                                Object.assign(
                                                    {
                                                        key: o.slug,
                                                        width: [
                                                            1,
                                                            1 / 2.05,
                                                            1 / 2.05
                                                        ]
                                                    },
                                                    a + 1 === t.length
                                                        ? {}
                                                        : { mb: [12, 6] }
                                                ),
                                                m.featuredimage
                                                    ? i.a.createElement(
                                                          c.Box,
                                                          { mb: [4, 5] },
                                                          i.a.createElement(
                                                              r.Link,
                                                              { to: o.slug },
                                                              i.a.createElement(
                                                                  E.a,
                                                                  {
                                                                      style: n,
                                                                      fluid: m
                                                                          .featuredimage
                                                                          .childImageSharp
                                                                          .fluid
                                                                  }
                                                              )
                                                          )
                                                      )
                                                    : null,
                                                i.a.createElement(
                                                    d.c,
                                                    { mb: 4 },
                                                    m.category
                                                ),
                                                i.a.createElement(
                                                    x,
                                                    null,
                                                    i.a.createElement(
                                                        _,
                                                        { to: o.slug },
                                                        m.title
                                                    )
                                                ),
                                                i.a.createElement(
                                                    d.c,
                                                    {
                                                        fontSize: [1, 2],
                                                        lineHeight: "copy",
                                                        mb: 4
                                                    },
                                                    m.description
                                                ),
                                                i.a.createElement(
                                                    d.c,
                                                    { fontSize: [1, 2] },
                                                    "Published on ",
                                                    m.date
                                                )
                                            )
                                        })
                                    )
                                )
                            ),
                            i.a.createElement(
                                v,
                                { mt: 14 },
                                i.a.createElement(p.a, null)
                            )
                        )
                    )
                )
            }
            var O = Object(y.default)(c.Heading).withConfig({
                    displayName: "writing___StyledHeading",
                    componentId: "sc-1l0uxkl-2"
                })(["letter-spacing:-0.2px;"]),
                I = Object(y.default)(d.d).withConfig({
                    displayName: "writing___StyledTitle",
                    componentId: "sc-1l0uxkl-3"
                })([
                    "animation:fadeInBottom 1s 0.5s cubic-bezier(0.19,1,0.22,1) backwards;"
                ]),
                j = Object(y.default)(d.c).withConfig({
                    displayName: "writing___StyledParagraph",
                    componentId: "sc-1l0uxkl-4"
                })([
                    "animation:fadeInBottom 1s 0.75s cubic-bezier(0.19,1,0.22,1) backwards;"
                ]),
                v = Object(y.default)(c.Box).withConfig({
                    displayName: "writing___StyledBox",
                    componentId: "sc-1l0uxkl-5"
                })(["border-top:1px solid #d8d8d8"])
        },
        Fzi1: function (e, t, n) {
            "use strict"
            n.d(t, "a", function () {
                return u
            })
            var a = n("q1tI"),
                i = n.n(a),
                r = n("QKO/"),
                l = n("QQ59"),
                o = n("m4Sl"),
                c = n("NDUj"),
                m = n("pngf"),
                d = n("vOnD"),
                s = Object(d.default)(r.Link).withConfig({
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
                u = function (e) {
                    var t = Object.assign({}, e)
                    return i.a.createElement(
                        c.a,
                        null,
                        i.a.createElement(
                            r.Flex,
                            Object.assign(
                                {
                                    paddingTop: [6, 7, 7],
                                    paddingBottom: [6, 6, "5.1875rem"],
                                    bg: "white"
                                },
                                t
                            ),
                            i.a.createElement(
                                o.a,
                                null,
                                i.a.createElement(
                                    l.e,
                                    null,
                                    "I'm always down for a coffee, feel free to get in touch!"
                                ),
                                i.a.createElement(
                                    l.c,
                                    {
                                        fontSize: [2, 3],
                                        mt: [4, 5],
                                        mb: [5, 5, 12]
                                    },
                                    "Let’s talk about anything from design, accessibility, front-end development, prototyping, and technology."
                                ),
                                i.a.createElement(
                                    r.Box,
                                    { fontSize: 2 },
                                    i.a.createElement(
                                        s,
                                        {
                                            href: "mailto:afnizarhilmi@gmail.com"
                                        },
                                        "Contact"
                                    )
                                ),
                                i.a.createElement(m.a, { mt: [6, 15, 15] })
                            )
                        )
                    )
                }
        },
        NDUj: function (e, t, n) {
            "use strict"
            var a = n("vOnD"),
                i = n("q1tI"),
                r = n.n(i),
                l = n("QKO/")
            t.a = function (e) {
                var t = e.children
                return r.a.createElement(
                    o,
                    { flex: "1", color: "black", bg: "white" },
                    r.a.createElement(
                        c,
                        { flexDirection: "column", mx: "auto" },
                        t
                    )
                )
            }
            var o = Object(a.default)(l.Box).withConfig({
                    displayName: "Full___StyledBox",
                    componentId: "sc-tka5g4-0"
                })(["padding:0!important;margin:0!important;max-width:100%"]),
                c = Object(a.default)(l.Flex).withConfig({
                    displayName: "Full___StyledFlex",
                    componentId: "sc-tka5g4-1"
                })(["height:100%"])
        },
        "oCA+": function (e, t, n) {
            "use strict"
            n.d(t, "a", function () {
                return i
            }),
                n.d(t, "b", function () {
                    return r
                })
            var a = n("vOnD"),
                i = Object(a.css)([
                    "color:inherit;&:hover{text-decoration:none;}"
                ]),
                r = Object(a.css)(
                    ["text-decoration:underline;text-decoration-color:", ";"],
                    function (e) {
                        return e.theme.colors.black
                    }
                )
        },
        pngf: function (e, t, n) {
            "use strict"
            var a = n("q1tI"),
                i = n.n(a),
                r = n("vOnD"),
                l = n("8upa"),
                o = n.n(l),
                c = n("QKO/"),
                m = n("QQ59"),
                d = n("oCA+"),
                s = Object(r.default)(c.Link).withConfig({
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
                    d.a
                )
            t.a = function (e) {
                var t = Object.assign({}, e)
                return i.a.createElement(
                    c.Flex,
                    Object.assign(
                        {
                            alignItems: "center",
                            justifyContent: "space-between",
                            bg: "white"
                        },
                        t
                    ),
                    i.a.createElement(
                        c.Box,
                        null,
                        i.a.createElement(
                            m.c,
                            {
                                fontSize: 2,
                                color: o.a.colors.gray[1],
                                paddingRight: 4
                            },
                            "Follow me for more thoughts and updates on",
                            " ",
                            i.a.createElement(
                                s,
                                { href: "https://twitter.com/afnizarnur" },
                                "Twitter"
                            ),
                            ",",
                            " ",
                            i.a.createElement(
                                s,
                                { href: "https://dribbble.com/afnizarnur" },
                                "Dribbble"
                            ),
                            ",",
                            " ",
                            i.a.createElement(
                                s,
                                { href: "https://behance.net/afnizarnur" },
                                "Behance"
                            ),
                            ", and",
                            " ",
                            i.a.createElement(
                                s,
                                {
                                    href: "https://www.linkedin.com/in/afnizarnur/"
                                },
                                "Linkedin"
                            ),
                            "."
                        )
                    ),
                    i.a.createElement(
                        c.Box,
                        null,
                        i.a.createElement(
                            u,
                            {
                                className: "scroll",
                                "aria-label": "Scroll to Top",
                                href: "#top"
                            },
                            i.a.createElement(f, {
                                className: "scrollImage",
                                mr: [3, 0],
                                src: "./assets/arrow-up.svg",
                                alt: "Scroll to Top"
                            })
                        )
                    )
                )
            }
            var u = Object(r.default)(c.Link).withConfig({
                    displayName: "Mini___StyledLink",
                    componentId: "sc-18y50r3-1"
                })([
                    "width:14px;height:14px;display:block;:focus{outline:none;}"
                ]),
                f = Object(r.default)(c.Image).withConfig({
                    displayName: "Mini___StyledImage",
                    componentId: "sc-18y50r3-2"
                })(["max-width:1000%;width:14px;height:14px"])
        }
    }
])
//# sourceMappingURL=component---src-pages-writing-index-js-aa090f1a209817e8a483.js.map
