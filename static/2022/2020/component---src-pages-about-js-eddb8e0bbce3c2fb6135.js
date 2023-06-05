;(window.webpackJsonp = window.webpackJsonp || []).push([
    [6],
    {
        "3XHS": function (e, t, n) {
            "use strict"
            n.r(t)
            var a = n("vOnD"),
                o = n("q1tI"),
                i = n.n(o),
                r = n("TJpk"),
                l = n.n(r),
                c = n("rY4l"),
                s = n("QQ59"),
                m = n("lwPf"),
                d = n("QKO/"),
                u = n("m4Sl"),
                p = n("Q/Mu"),
                g = n("Fzi1"),
                f = n("Wbzz"),
                h = n("8upa"),
                b = n.n(h),
                y = n("9eSz"),
                w = n.n(y),
                E = n("OM2W"),
                x = function (e) {
                    var t = Object.assign({}, e)
                    return i.a.createElement(
                        v,
                        {
                            pr: 4,
                            paddingBottom: [5, 13],
                            width: [1, 1 / 3, 1 / 3],
                            verticalAlign: "text-top"
                        },
                        i.a.createElement(
                            d.Box,
                            { mb: 4 },
                            i.a.createElement(w.a, {
                                alt: t.alticon,
                                sizes: t.imgsrc,
                                style: { width: 48, height: 48 }
                            })
                        ),
                        i.a.createElement(
                            d.Text,
                            {
                                target: "blank",
                                fontSize: 3,
                                fontWeight: "bold"
                            },
                            t.title
                        ),
                        i.a.createElement(
                            O,
                            { color: b.a.colors.white, fontSize: [2], mt: [4] },
                            t.description
                        )
                    )
                },
                v = Object(a.default)(d.Box).withConfig({
                    displayName: "AppItem___StyledBox",
                    componentId: "sc-6pup9g-0"
                })([
                    "@media only screen and (max-width:48em){border-bottom:1px solid rgba(255,255,255,.2);margin-bottom:1.5rem;}display:inline-block"
                ]),
                O = Object(a.default)(s.c).withConfig({
                    displayName: "AppItem___StyledParagraph",
                    componentId: "sc-6pup9g-1"
                })(["opacity:.8"]),
                S = n("oCA+"),
                I = Object(a.default)(d.Link).withConfig({
                    displayName: "AppList__ViewLink",
                    componentId: "sc-1o3ei4r-0"
                })(
                    [
                        "text-decoration:underline;letter-spacing:-0.2px;.active &{border-color:",
                        ";}",
                        ";"
                    ],
                    function (e) {
                        return e.theme.colors.black
                    },
                    S.a
                ),
                j = Object(a.default)(I).withConfig({
                    displayName: "AppList___StyledViewLink",
                    componentId: "sc-1o3ei4r-1"
                })(["text-decoration:underline;color:#fff"]),
                k = function () {
                    var e = Object(E.a)({ defaultOpen: !0 }),
                        t = e.getCollapseProps,
                        n = (e.getToggleProps, e.isOpen, Object(E.a)()),
                        a = n.getCollapseProps,
                        o = n.getToggleProps,
                        r = n.isOpen,
                        l = Object(f.useStaticQuery)("565617225")
                    return i.a.createElement(
                        _,
                        Object.assign({}, t(), { $_css: "position: relative" }),
                        i.a.createElement(
                            C,
                            {
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                $_css2: "margin: 0 "
                            },
                            i.a.createElement(
                                B,
                                { mb: [5, 5, 13] },
                                i.a.createElement(x, {
                                    imgsrc: l.figmaicon.childImageSharp.fluid,
                                    title: "Figma",
                                    description: [
                                        "My primary design tool right now. I also build figma plugin called ",
                                        i.a.createElement(
                                            j,
                                            {
                                                href: "https://www.figma.com/community/plugin/841201477778898873/Page-Automator"
                                            },
                                            "Page Automator"
                                        ),
                                        "."
                                    ]
                                }),
                                i.a.createElement(x, {
                                    imgsrc: l.origamiicon.childImageSharp.fluid,
                                    title: "Origami Studio",
                                    description:
                                        "A full package and free visual programming prototyping tools. Personal favourite."
                                }),
                                i.a.createElement(x, {
                                    imgsrc: l.vscodeicon.childImageSharp.fluid,
                                    title: "VS Code",
                                    description:
                                        "My favourite code editor. I switch from Sublime Text because it lightweight and free. "
                                })
                            ),
                            i.a.createElement(
                                A,
                                { mb: [5, 5, 13] },
                                i.a.createElement(x, {
                                    imgsrc: l.framericon.childImageSharp.fluid,
                                    title: "Framer",
                                    description:
                                        "Another personal favourite prototyping tools. Still love Framer Classic than X."
                                }),
                                i.a.createElement(x, {
                                    imgsrc: l.alfredicon.childImageSharp.fluid,
                                    title: "Alfred",
                                    description:
                                        "My spotlight replacement. Absolutely increasing my productivity."
                                }),
                                i.a.createElement(x, {
                                    imgsrc: l.iterm2icon.childImageSharp.fluid,
                                    title: "iTerm2",
                                    description:
                                        "Replacement of Terminal.  Lightweight. Help me to do a lot of things."
                                })
                            )
                        ),
                        i.a.createElement(
                            d.Flex,
                            Object.assign(
                                {
                                    justifyContent: "space-between",
                                    flexWrap: "wrap"
                                },
                                a({ style: { margin: 0 } })
                            ),
                            i.a.createElement(
                                z,
                                { mb: [5, 5, 13] },
                                i.a.createElement(x, {
                                    imgsrc: l.things3icon.childImageSharp.fluid,
                                    title: "Things 3",
                                    description:
                                        "My personal task management. I use Gettings Things Done system with this. Love it!"
                                }),
                                i.a.createElement(x, {
                                    imgsrc: l.abstracticon.childImageSharp
                                        .fluid,
                                    title: "Abstract",
                                    description:
                                        "Design version control. I store my personal project here."
                                }),
                                i.a.createElement(x, {
                                    imgsrc: l.sparkicon.childImageSharp.fluid,
                                    title: "Spark",
                                    description:
                                        "Best personal email client. Instantly see what's important and quickly clean up the rest. "
                                })
                            ),
                            i.a.createElement(
                                L,
                                { mb: [5, 5, 13] },
                                i.a.createElement(x, {
                                    imgsrc: l.notesicon.childImageSharp.fluid,
                                    title: "Apple Notes",
                                    description:
                                        "My primary note-taking app. Really love the sync feature and it’s lightweight. "
                                }),
                                i.a.createElement(x, {
                                    imgsrc: l.pixelsnapicon.childImageSharp
                                        .fluid,
                                    title: "PixelSnap",
                                    description:
                                        "Measure design easily, when in design QA, this my primary tools for helping test engineer in my team."
                                }),
                                i.a.createElement(x, {
                                    imgsrc: l.spotifyicon.childImageSharp.fluid,
                                    title: "Spotify",
                                    description: [
                                        "When working I hear a lot of music to help me focus. I also create a lot of ",
                                        i.a.createElement(
                                            I,
                                            {
                                                href: "https://open.spotify.com/user/afnizarnur"
                                            },
                                            "playlist"
                                        ),
                                        "."
                                    ]
                                })
                            ),
                            i.a.createElement(
                                d.Box,
                                { mb: [5, 5, 5] },
                                i.a.createElement(x, {
                                    imgsrc: l.ijaricon.childImageSharp.fluid,
                                    title: "IconJar",
                                    description:
                                        "My icon management tools. Help me use icons without hassle."
                                }),
                                i.a.createElement(x, {
                                    imgsrc: l.miroicon.childImageSharp.fluid,
                                    title: "Miro",
                                    description:
                                        "For brainstorming and discuss project with the team."
                                }),
                                i.a.createElement(x, {
                                    imgsrc: l.blendericon.childImageSharp.fluid,
                                    title: "Blender",
                                    description:
                                        "Currently, I’m learning building 3D model. It’s totally fun and promising!"
                                })
                            )
                        ),
                        r &&
                            i.a.createElement(
                                T,
                                Object.assign(
                                    { py: 4 },
                                    o({ style: { display: "block" } })
                                ),
                                "Collapse Applications and Tools"
                            ),
                        !r &&
                            i.a.createElement(
                                d.Box,
                                null,
                                i.a.createElement(
                                    N,
                                    Object.assign(
                                        { py: 4 },
                                        o({ style: { display: "block" } })
                                    ),
                                    "Load More Applications and Tools"
                                ),
                                i.a.createElement(P, null)
                            )
                    )
                },
                _ = Object(a.default)(d.Box).withConfig({
                    displayName: "AppList___StyledBox",
                    componentId: "sc-1o3ei4r-2"
                })(["", ""], function (e) {
                    return e.$_css
                }),
                C = Object(a.default)(d.Flex).withConfig({
                    displayName: "AppList___StyledFlex",
                    componentId: "sc-1o3ei4r-3"
                })(["", ""], function (e) {
                    return e.$_css2
                }),
                B = Object(a.default)(d.Box).withConfig({
                    displayName: "AppList___StyledBox2",
                    componentId: "sc-1o3ei4r-4"
                })([
                    "@media only screen and (min-width:48em){border-bottom:1px solid rgba(255,255,255,.2)}@media only screen and (max-width:48em){border-bottom:none;margin-bottom:0!important;}"
                ]),
                A = Object(a.default)(d.Box).withConfig({
                    displayName: "AppList___StyledBox3",
                    componentId: "sc-1o3ei4r-5"
                })([
                    "@media only screen and (min-width:48em){border-bottom:1px solid rgba(255,255,255,.2)}@media only screen and (max-width:48em){border-bottom:none;margin-bottom:0!important;}"
                ]),
                z = Object(a.default)(d.Box).withConfig({
                    displayName: "AppList___StyledBox4",
                    componentId: "sc-1o3ei4r-6"
                })([
                    "@media only screen and (min-width:48em){border-bottom:1px solid rgba(255,255,255,.2)}@media only screen and (max-width:48em){border-bottom:none;margin-bottom:0!important;}"
                ]),
                L = Object(a.default)(d.Box).withConfig({
                    displayName: "AppList___StyledBox5",
                    componentId: "sc-1o3ei4r-7"
                })([
                    "@media only screen and (min-width:48em){border-bottom:1px solid rgba(255,255,255,.2)}@media only screen and (max-width:48em){border-bottom:none;margin-bottom:0!important;}"
                ]),
                T = Object(a.default)(d.Button).withConfig({
                    displayName: "AppList___StyledButton",
                    componentId: "sc-1o3ei4r-8"
                })([
                    "outline:none;font-size:1.125rem;background:rgba(255,255,255,0.1);width:100%;"
                ]),
                N = Object(a.default)(d.Button).withConfig({
                    displayName: "AppList___StyledButton2",
                    componentId: "sc-1o3ei4r-9"
                })([
                    "outline:none;font-size:1.125rem;z-index:2;background:rgba(255,255,255,0.1);width:100%;"
                ]),
                P = Object(a.default)(d.Box).withConfig({
                    displayName: "AppList___StyledBox6",
                    componentId: "sc-1o3ei4r-10"
                })([
                    "position:absolute;width:100%;height:300px;bottom:52px;z-index:1;background:linear-gradient(180deg,rgba(25,26,27,0.0) 0%,#191a1b 100%)"
                ]),
                M = function () {
                    var e = { borderRadius: b.a.radii[2] },
                        t = Object(f.useStaticQuery)("2740591027")
                    return i.a.createElement(
                        d.Flex,
                        {
                            id: "workspace",
                            paddingTop: [6, 6, 9],
                            paddingBottom: [6, 6, 6],
                            color: "white",
                            bg: b.a.colors.black
                        },
                        i.a.createElement(
                            u.a,
                            null,
                            i.a.createElement(
                                d.Box,
                                null,
                                i.a.createElement(
                                    s.e,
                                    { color: "white" },
                                    "My workspace and things I use to get the job done"
                                ),
                                i.a.createElement(
                                    F,
                                    {
                                        color: b.a.colors.white,
                                        fontSize: [2, 3],
                                        mt: [4, 4, 5],
                                        mb: [12, 13, 13]
                                    },
                                    "Below are some things I use on the daily basis from hardware, software, and services."
                                ),
                                i.a.createElement(
                                    d.Flex,
                                    null,
                                    i.a.createElement(
                                        d.Box,
                                        { marginBottom: "1.25rem", width: 1 },
                                        i.a.createElement(w.a, {
                                            alt: "Laptop, Laptop Stand, Mechanical Keyboard and Mouse",
                                            backgroundColor: b.a.colors.black,
                                            style: e,
                                            sizes: t.workspace3.childImageSharp
                                                .fluid
                                        })
                                    )
                                ),
                                i.a.createElement(
                                    d.Flex,
                                    {
                                        justifyContent: "space-between",
                                        flexWrap: "wrap"
                                    },
                                    i.a.createElement(
                                        d.Box,
                                        {
                                            marginBottom: b.a.space[16],
                                            width: [1, 1 / 2.05, 1 / 2.05]
                                        },
                                        i.a.createElement(w.a, {
                                            alt: "Mechanical Keyboard",
                                            backgroundColor: b.a.colors.black,
                                            style: e,
                                            sizes: t.workspace2.childImageSharp
                                                .fluid
                                        })
                                    ),
                                    i.a.createElement(
                                        d.Box,
                                        { width: [1, 1 / 2.05, 1 / 2.05] },
                                        i.a.createElement(w.a, {
                                            alt: "Workspace",
                                            backgroundColor: b.a.colors.black,
                                            style: e,
                                            sizes: t.workspace1.childImageSharp
                                                .fluid
                                        })
                                    )
                                )
                            ),
                            i.a.createElement(
                                d.Box,
                                { mt: [12, 13] },
                                i.a.createElement(
                                    s.f,
                                    { color: b.a.colors.white, mb: [13, 13] },
                                    "Applications and Tools"
                                ),
                                i.a.createElement(k, null)
                            )
                        )
                    )
                },
                F = Object(a.default)(s.c).withConfig({
                    displayName: "Workspace___StyledParagraph",
                    componentId: "sc-195el5s-0"
                })(["opacity:.8"]),
                D =
                    ((t.default = function (e) {
                        Object.assign({}, e)
                        var t = Object(m.a)().title
                        return i.a.createElement(
                            i.a.Fragment,
                            null,
                            i.a.createElement(
                                l.a,
                                null,
                                i.a.createElement("title", null, "About | ", t),
                                i.a.createElement("meta", {
                                    property: "og:site_name",
                                    content: t
                                }),
                                i.a.createElement("meta", {
                                    property: "og:title",
                                    content: "About | " + t
                                }),
                                i.a.createElement("meta", {
                                    name: "twitter:title",
                                    content: "About | " + t
                                })
                            ),
                            i.a.createElement(
                                d.Box,
                                null,
                                i.a.createElement(
                                    u.a,
                                    null,
                                    i.a.createElement(p.a, null)
                                ),
                                i.a.createElement(
                                    d.Box,
                                    {
                                        as: "main",
                                        id: "main-content",
                                        mb: [5, 6]
                                    },
                                    i.a.createElement(
                                        u.a,
                                        null,
                                        i.a.createElement(
                                            c.a,
                                            null,
                                            i.a.createElement(
                                                D,
                                                { mt: [6, 9], mb: [6, 9, 9] },
                                                "It’s a nice to ",
                                                i.a.createElement("br", null),
                                                "meet you here"
                                            )
                                        )
                                    ),
                                    i.a.createElement(
                                        "main",
                                        null,
                                        i.a.createElement(
                                            u.a,
                                            null,
                                            i.a.createElement(
                                                d.Box,
                                                null,
                                                i.a.createElement(
                                                    s.c,
                                                    {
                                                        fontSize: [2, 3],
                                                        mb: [3, 5, 5],
                                                        color: b.a.colors.black
                                                    },
                                                    "Hi, my name is Afnizar. I am a product designer with background of engineering. I graduate from Bachelor of Computer Science at Telkom University, Bandung. I have been designing since high school, from there I got opportunity to working freelance and part-time in various startup and agency – local and international."
                                                ),
                                                i.a.createElement(
                                                    s.c,
                                                    { fontSize: [2], mb: [3] },
                                                    "I’m passionate about all areas of design and I believe in design as a better approach to solving human problem. My interests in design include interaction design, accessibility, and technological design."
                                                ),
                                                i.a.createElement(
                                                    s.c,
                                                    { fontSize: [2], mb: [3] },
                                                    "In between my works, I do front-end development and mentoring designer to code. I believe with coding, designer can create more impactful experiences by embracing the technicalities that make it happens. I enjoy writing HTML, CSS, Javascript, and React."
                                                ),
                                                i.a.createElement(
                                                    s.c,
                                                    {
                                                        fontSize: [2],
                                                        mb: [6, 6, 9]
                                                    },
                                                    "I’m always excited to connect with everyone and am open to speaking opportunities, so please don’t hesitate to get in touch. Anyway, thanks for viewing my portfolio!"
                                                )
                                            )
                                        ),
                                        i.a.createElement(M, null),
                                        i.a.createElement(g.a, null)
                                    )
                                )
                            )
                        )
                    }),
                    Object(a.default)(s.d).withConfig({
                        displayName: "about___StyledTitle",
                        componentId: "sc-jmqcus-0"
                    })([
                        "animation:fadeInBottom 1s 0.5s cubic-bezier(0.19,1,0.22,1) backwards;"
                    ]))
        },
        Fzi1: function (e, t, n) {
            "use strict"
            n.d(t, "a", function () {
                return u
            })
            var a = n("q1tI"),
                o = n.n(a),
                i = n("QKO/"),
                r = n("QQ59"),
                l = n("m4Sl"),
                c = n("NDUj"),
                s = n("pngf"),
                m = n("vOnD"),
                d = Object(m.default)(i.Link).withConfig({
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
                    return o.a.createElement(
                        c.a,
                        null,
                        o.a.createElement(
                            i.Flex,
                            Object.assign(
                                {
                                    paddingTop: [6, 7, 7],
                                    paddingBottom: [6, 6, "5.1875rem"],
                                    bg: "white"
                                },
                                t
                            ),
                            o.a.createElement(
                                l.a,
                                null,
                                o.a.createElement(
                                    r.e,
                                    null,
                                    "I'm always down for a coffee, feel free to get in touch!"
                                ),
                                o.a.createElement(
                                    r.c,
                                    {
                                        fontSize: [2, 3],
                                        mt: [4, 5],
                                        mb: [5, 5, 12]
                                    },
                                    "Let’s talk about anything from design, accessibility, front-end development, prototyping, and technology."
                                ),
                                o.a.createElement(
                                    i.Box,
                                    { fontSize: 2 },
                                    o.a.createElement(
                                        d,
                                        {
                                            href: "mailto:afnizarhilmi@gmail.com"
                                        },
                                        "Contact"
                                    )
                                ),
                                o.a.createElement(s.a, { mt: [6, 15, 15] })
                            )
                        )
                    )
                }
        },
        NDUj: function (e, t, n) {
            "use strict"
            var a = n("vOnD"),
                o = n("q1tI"),
                i = n.n(o),
                r = n("QKO/")
            t.a = function (e) {
                var t = e.children
                return i.a.createElement(
                    l,
                    { flex: "1", color: "black", bg: "white" },
                    i.a.createElement(
                        c,
                        { flexDirection: "column", mx: "auto" },
                        t
                    )
                )
            }
            var l = Object(a.default)(r.Box).withConfig({
                    displayName: "Full___StyledBox",
                    componentId: "sc-tka5g4-0"
                })(["padding:0!important;margin:0!important;max-width:100%"]),
                c = Object(a.default)(r.Flex).withConfig({
                    displayName: "Full___StyledFlex",
                    componentId: "sc-tka5g4-1"
                })(["height:100%"])
        },
        OM2W: function (e, t, n) {
            "use strict"
            var a = n("xEkU"),
                o = n.n(a),
                i = n("q1tI")
            function r(e, t, n) {
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
            function l(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {},
                        a = Object.keys(n)
                    "function" == typeof Object.getOwnPropertySymbols &&
                        (a = a.concat(
                            Object.getOwnPropertySymbols(n).filter(function (
                                e
                            ) {
                                return Object.getOwnPropertyDescriptor(n, e)
                                    .enumerable
                            })
                        )),
                        a.forEach(function (t) {
                            r(e, t, n[t])
                        })
                }
                return e
            }
            function c(e, t) {
                if (null == e) return {}
                var n,
                    a,
                    o = (function (e, t) {
                        if (null == e) return {}
                        var n,
                            a,
                            o = {},
                            i = Object.keys(e)
                        for (a = 0; a < i.length; a++)
                            (n = i[a]), t.indexOf(n) >= 0 || (o[n] = e[n])
                        return o
                    })(e, t)
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e)
                    for (a = 0; a < i.length; a++)
                        (n = i[a]),
                            t.indexOf(n) >= 0 ||
                                (Object.prototype.propertyIsEnumerable.call(
                                    e,
                                    n
                                ) &&
                                    (o[n] = e[n]))
                }
                return o
            }
            function s(e, t) {
                return (
                    (function (e) {
                        if (Array.isArray(e)) return e
                    })(e) ||
                    (function (e, t) {
                        var n = [],
                            a = !0,
                            o = !1,
                            i = void 0
                        try {
                            for (
                                var r, l = e[Symbol.iterator]();
                                !(a = (r = l.next()).done) &&
                                (n.push(r.value), !t || n.length !== t);
                                a = !0
                            );
                        } catch (e) {
                            ;(o = !0), (i = e)
                        } finally {
                            try {
                                a || null == l.return || l.return()
                            } finally {
                                if (o) throw i
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
            var m = function () {}
            function d(e) {
                return e && e.current ? e.current.scrollHeight : "auto"
            }
            var u = function () {
                    for (
                        var e = arguments.length, t = new Array(e), n = 0;
                        n < e;
                        n++
                    )
                        t[n] = arguments[n]
                    return function () {
                        for (
                            var e = arguments.length, n = new Array(e), a = 0;
                            a < e;
                            a++
                        )
                            n[a] = arguments[a]
                        return t.forEach(function (e) {
                            return e && e.apply(void 0, n)
                        })
                    }
                },
                p = {
                    transitionDuration: "500ms",
                    transitionTimingFunction:
                        "cubic-bezier(0.250, 0.460, 0.450, 0.940)"
                }
            function g(e) {
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
            var f = 0,
                h = function () {
                    return ++f
                }
            t.a = function () {
                var e,
                    t,
                    n,
                    a,
                    f,
                    b,
                    y =
                        arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : {},
                    w =
                        ((a = s(Object(i.useState)(null), 2)),
                        (f = a[0]),
                        (b = a[1]),
                        Object(i.useEffect)(function () {
                            return b(h())
                        }, []),
                        f),
                    E = Object(i.useRef)(null),
                    x = (function (e) {
                        var t = e.isOpen,
                            n = e.defaultOpen,
                            a = s(Object(i.useState)(n || !1), 2),
                            o = a[0]
                        return [void 0 !== t ? t : o, a[1]]
                    })(y),
                    v = s(x, 2),
                    O = v[0],
                    S = v[1],
                    I = "".concat(y.collapsedHeight || 0, "px"),
                    j = Object(i.useMemo)(
                        function () {
                            return {
                                display: "0px" === I ? "none" : "block",
                                height: I,
                                overflow: "hidden"
                            }
                        },
                        [I]
                    ),
                    k = Object(i.useMemo)(
                        function () {
                            return (
                                (n =
                                    void 0 === (t = (e = y).expandStyles)
                                        ? p
                                        : t),
                                (o = void 0 === (a = e.collapseStyles) ? p : a),
                                {
                                    expandStyles: l({}, n, {
                                        transitionProperty: g(
                                            n.transitionProperty
                                        )
                                    }),
                                    collapseStyles: l({}, o, {
                                        transitionProperty: g(
                                            o.transitionProperty
                                        )
                                    })
                                }
                            )
                            var e, t, n, a, o
                        },
                        [y]
                    ),
                    _ = k.expandStyles,
                    C = k.collapseStyles,
                    B = s(Object(i.useState)(O ? {} : j), 2),
                    A = B[0],
                    z = B[1],
                    L = s(Object(i.useState)(O), 2),
                    T = L[0],
                    N = L[1],
                    P = Object(i.useCallback)(function () {
                        return S(function (e) {
                            return !e
                        })
                    }, [])
                ;(e = function () {
                    o()(
                        O
                            ? function () {
                                  N(!0),
                                      z(function (e) {
                                          return l({}, e, _, {
                                              willChange: "height",
                                              display: "block",
                                              overflow: "hidden"
                                          })
                                      }),
                                      o()(function () {
                                          var e = d(E)
                                          z(function (t) {
                                              return l({}, t, { height: e })
                                          })
                                      })
                              }
                            : function () {
                                  var e = d(E)
                                  z(function (t) {
                                      return l({}, t, C, {
                                          willChange: "height",
                                          height: e
                                      })
                                  }),
                                      o()(function () {
                                          z(function (e) {
                                              return l({}, e, {
                                                  height: I,
                                                  overflow: "hidden"
                                              })
                                          })
                                      })
                              }
                    )
                }),
                    (t = [O]),
                    (n = Object(i.useRef)(!0)),
                    Object(i.useEffect)(function () {
                        if (!n.current) return e()
                        n.current = !1
                    }, t)
                var M = function (e) {
                    if (e.target === E.current)
                        if (O) {
                            var t = d(E)
                            t === A.height
                                ? z({})
                                : z(function (e) {
                                      return l({}, e, { height: t })
                                  })
                        } else A.height === I && (N(!1), z(j))
                }
                return {
                    getToggleProps: function () {
                        var e =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : {},
                            t = e.disabled,
                            n = void 0 !== t && t,
                            a = e.onClick,
                            o = void 0 === a ? m : a,
                            i = c(e, ["disabled", "onClick"])
                        return l(
                            {
                                type: "button",
                                role: "button",
                                id: "react-collapsed-toggle-".concat(w),
                                "aria-controls":
                                    "react-collapsed-panel-".concat(w),
                                "aria-expanded": O ? "true" : "false",
                                tabIndex: 0
                            },
                            i,
                            { onClick: n ? m : u(o, P) }
                        )
                    },
                    getCollapseProps: function () {
                        var e,
                            t =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : {},
                            n = t.style,
                            a = void 0 === n ? {} : n,
                            o = t.onTransitionEnd,
                            i = void 0 === o ? m : o,
                            s = t.refKey,
                            d = void 0 === s ? "ref" : s,
                            f = c(t, ["style", "onTransitionEnd", "refKey"])
                        return l(
                            {
                                id: "react-collapsed-panel-".concat(w),
                                "aria-hidden": O ? null : "true"
                            },
                            f,
                            (r((e = {}), d, E),
                            r(e, "onTransitionEnd", u(M, i)),
                            r(
                                e,
                                "style",
                                l(
                                    {},
                                    p,
                                    a,
                                    {
                                        transitionProperty: g(
                                            a.transitionProperty
                                        )
                                    },
                                    A
                                )
                            ),
                            e)
                        )
                    },
                    isOpen: O,
                    toggleOpen: P,
                    mountChildren: T
                }
            }
        },
        "oCA+": function (e, t, n) {
            "use strict"
            n.d(t, "a", function () {
                return o
            }),
                n.d(t, "b", function () {
                    return i
                })
            var a = n("vOnD"),
                o = Object(a.css)([
                    "color:inherit;&:hover{text-decoration:none;}"
                ]),
                i = Object(a.css)(
                    ["text-decoration:underline;text-decoration-color:", ";"],
                    function (e) {
                        return e.theme.colors.black
                    }
                )
        },
        pngf: function (e, t, n) {
            "use strict"
            var a = n("q1tI"),
                o = n.n(a),
                i = n("vOnD"),
                r = n("8upa"),
                l = n.n(r),
                c = n("QKO/"),
                s = n("QQ59"),
                m = n("oCA+"),
                d = Object(i.default)(c.Link).withConfig({
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
                    m.a
                )
            t.a = function (e) {
                var t = Object.assign({}, e)
                return o.a.createElement(
                    c.Flex,
                    Object.assign(
                        {
                            alignItems: "center",
                            justifyContent: "space-between",
                            bg: "white"
                        },
                        t
                    ),
                    o.a.createElement(
                        c.Box,
                        null,
                        o.a.createElement(
                            s.c,
                            {
                                fontSize: 2,
                                color: l.a.colors.gray[1],
                                paddingRight: 4
                            },
                            "Follow me for more thoughts and updates on",
                            " ",
                            o.a.createElement(
                                d,
                                { href: "https://twitter.com/afnizarnur" },
                                "Twitter"
                            ),
                            ",",
                            " ",
                            o.a.createElement(
                                d,
                                { href: "https://dribbble.com/afnizarnur" },
                                "Dribbble"
                            ),
                            ",",
                            " ",
                            o.a.createElement(
                                d,
                                { href: "https://behance.net/afnizarnur" },
                                "Behance"
                            ),
                            ", and",
                            " ",
                            o.a.createElement(
                                d,
                                {
                                    href: "https://www.linkedin.com/in/afnizarnur/"
                                },
                                "Linkedin"
                            ),
                            "."
                        )
                    ),
                    o.a.createElement(
                        c.Box,
                        null,
                        o.a.createElement(
                            u,
                            {
                                className: "scroll",
                                "aria-label": "Scroll to Top",
                                href: "#top"
                            },
                            o.a.createElement(p, {
                                className: "scrollImage",
                                mr: [3, 0],
                                src: "./assets/arrow-up.svg",
                                alt: "Scroll to Top"
                            })
                        )
                    )
                )
            }
            var u = Object(i.default)(c.Link).withConfig({
                    displayName: "Mini___StyledLink",
                    componentId: "sc-18y50r3-1"
                })([
                    "width:14px;height:14px;display:block;:focus{outline:none;}"
                ]),
                p = Object(i.default)(c.Image).withConfig({
                    displayName: "Mini___StyledImage",
                    componentId: "sc-18y50r3-2"
                })(["max-width:1000%;width:14px;height:14px"])
        }
    }
])
//# sourceMappingURL=component---src-pages-about-js-eddb8e0bbce3c2fb6135.js.map
