;(window.webpackJsonp = window.webpackJsonp || []).push([
    [13],
    {
        Fzi1: function (e, t, n) {
            "use strict"
            n.d(t, "a", function () {
                return u
            })
            var a = n("q1tI"),
                r = n.n(a),
                o = n("QKO/"),
                l = n("QQ59"),
                i = n("m4Sl"),
                c = n("NDUj"),
                m = n("pngf"),
                s = n("vOnD"),
                d = Object(s.default)(o.Link).withConfig({
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
                    return r.a.createElement(
                        c.a,
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
                                i.a,
                                null,
                                r.a.createElement(
                                    l.e,
                                    null,
                                    "I'm always down for a coffee, feel free to get in touch!"
                                ),
                                r.a.createElement(
                                    l.c,
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
                                        d,
                                        {
                                            href: "mailto:afnizarhilmi@gmail.com"
                                        },
                                        "Contact"
                                    )
                                ),
                                r.a.createElement(m.a, { mt: [6, 15, 15] })
                            )
                        )
                    )
                }
        },
        NDUj: function (e, t, n) {
            "use strict"
            var a = n("vOnD"),
                r = n("q1tI"),
                o = n.n(r),
                l = n("QKO/")
            t.a = function (e) {
                var t = e.children
                return o.a.createElement(
                    i,
                    { flex: "1", color: "black", bg: "white" },
                    o.a.createElement(
                        c,
                        { flexDirection: "column", mx: "auto" },
                        t
                    )
                )
            }
            var i = Object(a.default)(l.Box).withConfig({
                    displayName: "Full___StyledBox",
                    componentId: "sc-tka5g4-0"
                })(["padding:0!important;margin:0!important;max-width:100%"]),
                c = Object(a.default)(l.Flex).withConfig({
                    displayName: "Full___StyledFlex",
                    componentId: "sc-tka5g4-1"
                })(["height:100%"])
        },
        UAEB: function (e, t, n) {
            "use strict"
            n.r(t)
            var a = n("q1tI"),
                r = n.n(a),
                o = n("9eSz"),
                l = n.n(o),
                i = n("Wbzz"),
                c = n("Q/Mu"),
                m = n("QKO/"),
                s = n("rY4l"),
                d = n("m4Sl"),
                u = n("QQ59"),
                f = n("vOnD"),
                p = n("8upa"),
                g = n.n(p),
                h = n("oCA+"),
                b = n("Fzi1"),
                E = n("TJpk"),
                w = n.n(E),
                x = n("lwPf"),
                y = function (e) {
                    var t = e.children
                    return r.a.createElement(
                        _,
                        {
                            as: "h3",
                            fontSize: [3],
                            lineHeight: "title",
                            color: g.a.colors.black,
                            mb: 3
                        },
                        t
                    )
                },
                j = Object(f.default)(i.Link).withConfig({
                    displayName: "Tags__ViewLink",
                    componentId: "sc-13cr0jj-0"
                })(["text-decoration:underline;", ";"], h.a),
                k = Object(f.default)(j).withConfig({
                    displayName: "Tags___StyledViewLink",
                    componentId: "sc-13cr0jj-1"
                })(["", ""], h.a)
            t.default = function (e) {
                var t = e.pageContext,
                    n = e.data,
                    a = Object(x.a)().title,
                    o = t.tag,
                    f = n.allMarkdownRemark,
                    p = f.edges,
                    h = f.totalCount,
                    E =
                        h +
                        " post" +
                        (1 === h ? "" : "s") +
                        ' tagged with "' +
                        o +
                        '"',
                    j = { borderRadius: g.a.radii[2] }
                return r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement(
                        w.a,
                        null,
                        r.a.createElement(
                            "title",
                            null,
                            'Tags "',
                            o,
                            '" | ',
                            a
                        ),
                        r.a.createElement("meta", {
                            property: "og:site_name",
                            content: a
                        }),
                        r.a.createElement("meta", {
                            property: "og:title",
                            content: "Tags " + o + " | " + a
                        }),
                        r.a.createElement("meta", {
                            name: "twitter:title",
                            content: "Tags " + o + " | " + a
                        })
                    ),
                    r.a.createElement(
                        m.Box,
                        null,
                        r.a.createElement(
                            d.a,
                            null,
                            r.a.createElement(c.a, null)
                        )
                    ),
                    r.a.createElement(
                        m.Box,
                        { as: "main", id: "main-content" },
                        r.a.createElement(
                            d.a,
                            null,
                            r.a.createElement(
                                s.a,
                                null,
                                r.a.createElement(
                                    u.f,
                                    { mt: [6, 9], mb: [6, 14] },
                                    E
                                )
                            ),
                            r.a.createElement(
                                "main",
                                null,
                                r.a.createElement(
                                    m.Flex,
                                    {
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        flexWrap: "wrap"
                                    },
                                    p.map(function (e, t) {
                                        var n = e.node,
                                            a = n.fields.slug
                                        return r.a.createElement(
                                            m.Box,
                                            Object.assign(
                                                {
                                                    key: a,
                                                    width: [
                                                        1,
                                                        1 / 2.05,
                                                        1 / 2.05
                                                    ]
                                                },
                                                t + 1 === p.length
                                                    ? {}
                                                    : { mb: [12, 6] }
                                            ),
                                            n.frontmatter.featuredimage
                                                ? r.a.createElement(
                                                      m.Box,
                                                      { mb: [4, 5] },
                                                      r.a.createElement(
                                                          i.Link,
                                                          { to: a },
                                                          r.a.createElement(
                                                              l.a,
                                                              {
                                                                  style: j,
                                                                  fluid: n
                                                                      .frontmatter
                                                                      .featuredimage
                                                                      .childImageSharp
                                                                      .fluid
                                                              }
                                                          )
                                                      )
                                                  )
                                                : null,
                                            r.a.createElement(
                                                u.c,
                                                { mb: 4 },
                                                n.frontmatter.category
                                            ),
                                            r.a.createElement(
                                                y,
                                                null,
                                                r.a.createElement(
                                                    k,
                                                    { to: a },
                                                    n.frontmatter.title
                                                )
                                            ),
                                            r.a.createElement(
                                                u.c,
                                                {
                                                    fontSize: [1, 2],
                                                    lineHeight: "copy",
                                                    mb: 4
                                                },
                                                n.frontmatter.description
                                            ),
                                            r.a.createElement(
                                                u.c,
                                                { fontSize: [1, 2] },
                                                "Published on ",
                                                n.frontmatter.date
                                            )
                                        )
                                    })
                                )
                            )
                        ),
                        r.a.createElement(
                            O,
                            { mt: 14 },
                            r.a.createElement(b.a, null)
                        )
                    )
                )
            }
            var _ = Object(f.default)(m.Heading).withConfig({
                    displayName: "Tags___StyledHeading",
                    componentId: "sc-13cr0jj-2"
                })(["letter-spacing:-0.2px;"]),
                O = Object(f.default)(m.Box).withConfig({
                    displayName: "Tags___StyledBox",
                    componentId: "sc-13cr0jj-3"
                })(["border-top:1px solid #d8d8d8"])
        },
        "oCA+": function (e, t, n) {
            "use strict"
            n.d(t, "a", function () {
                return r
            }),
                n.d(t, "b", function () {
                    return o
                })
            var a = n("vOnD"),
                r = Object(a.css)([
                    "color:inherit;&:hover{text-decoration:none;}"
                ]),
                o = Object(a.css)(
                    ["text-decoration:underline;text-decoration-color:", ";"],
                    function (e) {
                        return e.theme.colors.black
                    }
                )
        },
        pngf: function (e, t, n) {
            "use strict"
            var a = n("q1tI"),
                r = n.n(a),
                o = n("vOnD"),
                l = n("8upa"),
                i = n.n(l),
                c = n("QKO/"),
                m = n("QQ59"),
                s = n("oCA+"),
                d = Object(o.default)(c.Link).withConfig({
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
                    s.a
                )
            t.a = function (e) {
                var t = Object.assign({}, e)
                return r.a.createElement(
                    c.Flex,
                    Object.assign(
                        {
                            alignItems: "center",
                            justifyContent: "space-between",
                            bg: "white"
                        },
                        t
                    ),
                    r.a.createElement(
                        c.Box,
                        null,
                        r.a.createElement(
                            m.c,
                            {
                                fontSize: 2,
                                color: i.a.colors.gray[1],
                                paddingRight: 4
                            },
                            "Follow me for more thoughts and updates on",
                            " ",
                            r.a.createElement(
                                d,
                                { href: "https://twitter.com/afnizarnur" },
                                "Twitter"
                            ),
                            ",",
                            " ",
                            r.a.createElement(
                                d,
                                { href: "https://dribbble.com/afnizarnur" },
                                "Dribbble"
                            ),
                            ",",
                            " ",
                            r.a.createElement(
                                d,
                                { href: "https://behance.net/afnizarnur" },
                                "Behance"
                            ),
                            ", and",
                            " ",
                            r.a.createElement(
                                d,
                                {
                                    href: "https://www.linkedin.com/in/afnizarnur/"
                                },
                                "Linkedin"
                            ),
                            "."
                        )
                    ),
                    r.a.createElement(
                        c.Box,
                        null,
                        r.a.createElement(
                            u,
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
            var u = Object(o.default)(c.Link).withConfig({
                    displayName: "Mini___StyledLink",
                    componentId: "sc-18y50r3-1"
                })([
                    "width:14px;height:14px;display:block;:focus{outline:none;}"
                ]),
                f = Object(o.default)(c.Image).withConfig({
                    displayName: "Mini___StyledImage",
                    componentId: "sc-18y50r3-2"
                })(["max-width:1000%;width:14px;height:14px"])
        }
    }
])
//# sourceMappingURL=component---src-templates-tags-js-8bbb9124f72359054a0d.js.map
