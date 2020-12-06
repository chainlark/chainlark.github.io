(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor~.._.._node_modules_highlight.js_lib_languages_q"],{

/***/ "../../node_modules/highlight.js/lib/languages/q.js":
/*!****************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/q.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Q
Description: Q is a vector-based functional paradigm programming language built into the kdb+ database.
             (K/Q/Kdb+ from Kx Systems)
Author: Sergey Vidyuk <svidyuk@gmail.com>
Website: https://kx.com/connect-with-us/developers/
*/

function q(hljs) {
  const KEYWORDS = {
    $pattern: /(`?)[A-Za-z0-9_]+\b/,
    keyword:
      'do while select delete by update from',
    literal:
      '0b 1b',
    built_in:
      'neg not null string reciprocal floor ceiling signum mod xbar xlog and or each scan over prior mmu lsq inv md5 ltime gtime count first var dev med cov cor all any rand sums prds mins maxs fills deltas ratios avgs differ prev next rank reverse iasc idesc asc desc msum mcount mavg mdev xrank mmin mmax xprev rotate distinct group where flip type key til get value attr cut set upsert raze union inter except cross sv vs sublist enlist read0 read1 hopen hclose hdel hsym hcount peach system ltrim rtrim trim lower upper ssr view tables views cols xcols keys xkey xcol xasc xdesc fkeys meta lj aj aj0 ij pj asof uj ww wj wj1 fby xgroup ungroup ej save load rsave rload show csv parse eval min max avg wavg wsum sin cos tan sum',
    type:
      '`float `double int `timestamp `timespan `datetime `time `boolean `symbol `char `byte `short `long `real `month `date `minute `second `guid'
  };

  return {
    name: 'Q',
    aliases: [
      'k',
      'kdb'
    ],
    keywords: KEYWORDS,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE
    ]
  };
}

module.exports = q;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/qml.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/qml.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source(re) {
  if (!re) return null;
  if (typeof re === "string") return re;

  return re.source;
}

/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}

/*
Language: QML
Requires: javascript.js, xml.js
Author: John Foster <jfoster@esri.com>
Description: Syntax highlighting for the Qt Quick QML scripting language, based mostly off
             the JavaScript parser.
Website: https://doc.qt.io/qt-5/qmlapplications.html
Category: scripting
*/

function qml(hljs) {
  const KEYWORDS = {
    keyword:
      'in of on if for while finally var new function do return void else break catch ' +
      'instanceof with throw case default try this switch continue typeof delete ' +
      'let yield const export super debugger as async await import',
    literal:
      'true false null undefined NaN Infinity',
    built_in:
      'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' +
      'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' +
      'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' +
      'TypeError URIError Number Math Date String RegExp Array Float32Array ' +
      'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' +
      'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' +
      'module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect ' +
      'Behavior bool color coordinate date double enumeration font geocircle georectangle ' +
      'geoshape int list matrix4x4 parent point quaternion real rect ' +
      'size string url variant vector2d vector3d vector4d ' +
      'Promise'
  };

  const QML_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9\\._]*';

  // Isolate property statements. Ends at a :, =, ;, ,, a comment or end of line.
  // Use property class.
  const PROPERTY = {
    className: 'keyword',
    begin: '\\bproperty\\b',
    starts: {
      className: 'string',
      end: '(:|=|;|,|//|/\\*|$)',
      returnEnd: true
    }
  };

  // Isolate signal statements. Ends at a ) a comment or end of line.
  // Use property class.
  const SIGNAL = {
    className: 'keyword',
    begin: '\\bsignal\\b',
    starts: {
      className: 'string',
      end: '(\\(|:|=|;|,|//|/\\*|$)',
      returnEnd: true
    }
  };

  // id: is special in QML. When we see id: we want to mark the id: as attribute and
  // emphasize the token following.
  const ID_ID = {
    className: 'attribute',
    begin: '\\bid\\s*:',
    starts: {
      className: 'string',
      end: QML_IDENT_RE,
      returnEnd: false
    }
  };

  // Find QML object attribute. An attribute is a QML identifier followed by :.
  // Unfortunately it's hard to know where it ends, as it may contain scalars,
  // objects, object definitions, or javascript. The true end is either when the parent
  // ends or the next attribute is detected.
  const QML_ATTRIBUTE = {
    begin: QML_IDENT_RE + '\\s*:',
    returnBegin: true,
    contains: [
      {
        className: 'attribute',
        begin: QML_IDENT_RE,
        end: '\\s*:',
        excludeEnd: true,
        relevance: 0
      }
    ],
    relevance: 0
  };

  // Find QML object. A QML object is a QML identifier followed by { and ends at the matching }.
  // All we really care about is finding IDENT followed by { and just mark up the IDENT and ignore the {.
  const QML_OBJECT = {
    begin: concat(QML_IDENT_RE, /\s*\{/),
    end: /\{/,
    returnBegin: true,
    relevance: 0,
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {
        begin: QML_IDENT_RE
      })
    ]
  };

  return {
    name: 'QML',
    aliases: [ 'qt' ],
    case_insensitive: false,
    keywords: KEYWORDS,
    contains: [
      {
        className: 'meta',
        begin: /^\s*['"]use (strict|asm)['"]/
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      { // template string
        className: 'string',
        begin: '`',
        end: '`',
        contains: [
          hljs.BACKSLASH_ESCAPE,
          {
            className: 'subst',
            begin: '\\$\\{',
            end: '\\}'
          }
        ]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'number',
        variants: [
          {
            begin: '\\b(0[bB][01]+)'
          },
          {
            begin: '\\b(0[oO][0-7]+)'
          },
          {
            begin: hljs.C_NUMBER_RE
          }
        ],
        relevance: 0
      },
      { // "value" container
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.REGEXP_MODE,
          { // E4X / JSX
            begin: /</,
            end: />\s*[);\]]/,
            relevance: 0,
            subLanguage: 'xml'
          }
        ],
        relevance: 0
      },
      SIGNAL,
      PROPERTY,
      {
        className: 'function',
        beginKeywords: 'function',
        end: /\{/,
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: /[A-Za-z$_][0-9A-Za-z$_]*/
          }),
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            contains: [
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          }
        ],
        illegal: /\[|%/
      },
      {
        // hack: prevents detection of keywords after dots
        begin: '\\.' + hljs.IDENT_RE,
        relevance: 0
      },
      ID_ID,
      QML_ATTRIBUTE,
      QML_OBJECT
    ],
    illegal: /#/
  };
}

module.exports = qml;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/r.js":
/*!****************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/r.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source(re) {
  if (!re) return null;
  if (typeof re === "string") return re;

  return re.source;
}

/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}

/*
Language: R
Description: R is a free software environment for statistical computing and graphics.
Author: Joe Cheng <joe@rstudio.org>
Contributors: Konrad Rudolph <konrad.rudolph@gmail.com>
Website: https://www.r-project.org
Category: scientific
*/

function r(hljs) {
  // Identifiers in R cannot start with `_`, but they can start with `.` if it
  // is not immediately followed by a digit.
  // R also supports quoted identifiers, which are near-arbitrary sequences
  // delimited by backticks (`…`), which may contain escape sequences. These are
  // handled in a separate mode. See `test/markup/r/names.txt` for examples.
  // FIXME: Support Unicode identifiers.
  const IDENT_RE = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/;
  const SIMPLE_IDENT = /[a-zA-Z][a-zA-Z_0-9]*/;

  return {
    name: 'R',

    // only in Haskell, not R
    illegal: /->/,
    keywords: {
      $pattern: IDENT_RE,
      keyword:
        'function if in break next repeat else for while',
      literal:
        'NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 ' +
        'NA_character_|10 NA_complex_|10',
      built_in:
        // Builtin constants
        'LETTERS letters month.abb month.name pi T F ' +
        // Primitive functions
        // These are all the functions in `base` that are implemented as a
        // `.Primitive`, minus those functions that are also keywords.
        'abs acos acosh all any anyNA Arg as.call as.character ' +
        'as.complex as.double as.environment as.integer as.logical ' +
        'as.null.default as.numeric as.raw asin asinh atan atanh attr ' +
        'attributes baseenv browser c call ceiling class Conj cos cosh ' +
        'cospi cummax cummin cumprod cumsum digamma dim dimnames ' +
        'emptyenv exp expression floor forceAndCall gamma gc.time ' +
        'globalenv Im interactive invisible is.array is.atomic is.call ' +
        'is.character is.complex is.double is.environment is.expression ' +
        'is.finite is.function is.infinite is.integer is.language ' +
        'is.list is.logical is.matrix is.na is.name is.nan is.null ' +
        'is.numeric is.object is.pairlist is.raw is.recursive is.single ' +
        'is.symbol lazyLoadDBfetch length lgamma list log max min ' +
        'missing Mod names nargs nzchar oldClass on.exit pos.to.env ' +
        'proc.time prod quote range Re rep retracemem return round ' +
        'seq_along seq_len seq.int sign signif sin sinh sinpi sqrt ' +
        'standardGeneric substitute sum switch tan tanh tanpi tracemem ' +
        'trigamma trunc unclass untracemem UseMethod xtfrm',
    },

    contains: [
      // Roxygen comments
      hljs.COMMENT(
        /#'/,
        /$/,
        {
          contains: [
            {
              // Handle `@examples` separately to cause all subsequent code
              // until the next `@`-tag on its own line to be kept as-is,
              // preventing highlighting. This code is example R code, so nested
              // doctags shouldn’t be treated as such. See
              // `test/markup/r/roxygen.txt` for an example.
              className: 'doctag',
              begin: '@examples',
              starts: {
                contains: [
                  { begin: /\n/ },
                  {
                    begin: /#'\s*(?=@[a-zA-Z]+)/,
                    endsParent: true,
                  },
                  {
                    begin: /#'/,
                    end: /$/,
                    excludeBegin: true,
                  }
                ]
              }
            },
            {
              // Handle `@param` to highlight the parameter name following
              // after.
              className: 'doctag',
              begin: '@param',
              end: /$/,
              contains: [
                {
                  className: 'variable',
                  variants: [
                    { begin: IDENT_RE },
                    { begin: /`(?:\\.|[^`])+`/ }
                  ],
                  endsParent: true
                }
              ]
            },
            {
              className: 'doctag',
              begin: /@[a-zA-Z]+/
            },
            {
              className: 'meta-keyword',
              begin: /\\[a-zA-Z]+/,
            }
          ]
        }
      ),

      hljs.HASH_COMMENT_MODE,

      {
        className: 'string',
        contains: [hljs.BACKSLASH_ESCAPE],
        variants: [
          hljs.END_SAME_AS_BEGIN({ begin: /[rR]"(-*)\(/, end: /\)(-*)"/ }),
          hljs.END_SAME_AS_BEGIN({ begin: /[rR]"(-*)\{/, end: /\}(-*)"/ }),
          hljs.END_SAME_AS_BEGIN({ begin: /[rR]"(-*)\[/, end: /\](-*)"/ }),
          hljs.END_SAME_AS_BEGIN({ begin: /[rR]'(-*)\(/, end: /\)(-*)'/ }),
          hljs.END_SAME_AS_BEGIN({ begin: /[rR]'(-*)\{/, end: /\}(-*)'/ }),
          hljs.END_SAME_AS_BEGIN({ begin: /[rR]'(-*)\[/, end: /\](-*)'/ }),
          {begin: '"', end: '"', relevance: 0},
          {begin: "'", end: "'", relevance: 0}
        ],
      },
      {
        className: 'number',
        variants: [
          // TODO: replace with negative look-behind when available
          // { begin: /(?<![a-zA-Z0-9._])0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/ },
          // { begin: /(?<![a-zA-Z0-9._])0[xX][0-9a-fA-F]+([pP][+-]?\d+)?[Li]?/ },
          // { begin: /(?<![a-zA-Z0-9._])(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[Li]?/ }

          // The below rules all eat an extra character in front (for the
          // look-behind check) and then exclude it from the match, but I think
          // in many cases this will work out just fine.
          {
            // Special case: only hexadecimal binary powers can contain fractions.
            begin: /([^a-zA-Z0-9._])(?=0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?)/,
            end: /0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/,
            excludeBegin: true
          },
          {
            begin: /([^a-zA-Z0-9._])(?=0[xX][0-9a-fA-F]+([pP][+-]?\d+)?[Li]?)/,
            end: /0[xX][0-9a-fA-F]+([pP][+-]?\d+)?[Li]?/ ,
            excludeBegin: true
          },
          {
            begin: /([^a-zA-Z0-9._])(?=(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[Li]?)/,
            end: /(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[Li]?/,
            excludeBegin: true
          }
        ],
        // "on:begin": (match, response) => {
        //   if (match.index > 0) {
        //     let priorChar = match.input[match.index - 1];
        //     if (priorChar.match(/[a-zA-Z0-9._]/)) response.ignoreMatch();
        //   }
        // },
        relevance: 0
      },

      {
        // infix operator
        begin: '%',
        end: '%'
      },
      // relevance boost for assignment
      {
        begin: concat(SIMPLE_IDENT, "\\s+<-\\s+")
      },
      {
        // escaped identifier
        begin: '`',
        end: '`',
        contains: [
          { begin: /\\./ }
        ]
      }
    ]
  };
}

module.exports = r;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/reasonml.js":
/*!***********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/reasonml.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: ReasonML
Description: Reason lets you write simple, fast and quality type safe code while leveraging both the JavaScript & OCaml ecosystems.
Website: https://reasonml.github.io
Author: Gidi Meir Morris <oss@gidi.io>
Category: functional
*/
function reasonml(hljs) {
  function orReValues(ops) {
    return ops
      .map(function(op) {
        return op
          .split('')
          .map(function(char) {
            return '\\' + char;
          })
          .join('');
      })
      .join('|');
  }

  const RE_IDENT = '~?[a-z$_][0-9a-zA-Z$_]*';
  const RE_MODULE_IDENT = '`?[A-Z$_][0-9a-zA-Z$_]*';

  const RE_PARAM_TYPEPARAM = '\'?[a-z$_][0-9a-z$_]*';
  const RE_PARAM_TYPE = '\s*:\s*[a-z$_][0-9a-z$_]*(\(\s*(' + RE_PARAM_TYPEPARAM + '\s*(,' + RE_PARAM_TYPEPARAM + ')*)?\s*\))?';
  const RE_PARAM = RE_IDENT + '(' + RE_PARAM_TYPE + ')?(' + RE_PARAM_TYPE + ')?';
  const RE_OPERATOR = "(" + orReValues([
    '||',
    '++',
    '**',
    '+.',
    '*',
    '/',
    '*.',
    '/.',
    '...'
  ]) + "|\\|>|&&|==|===)";
  const RE_OPERATOR_SPACED = "\\s+" + RE_OPERATOR + "\\s+";

  const KEYWORDS = {
    keyword:
      'and as asr assert begin class constraint do done downto else end exception external ' +
      'for fun function functor if in include inherit initializer ' +
      'land lazy let lor lsl lsr lxor match method mod module mutable new nonrec ' +
      'object of open or private rec sig struct then to try type val virtual when while with',
    built_in:
      'array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 ref string unit ',
    literal:
      'true false'
  };

  const RE_NUMBER = '\\b(0[xX][a-fA-F0-9_]+[Lln]?|' +
    '0[oO][0-7_]+[Lln]?|' +
    '0[bB][01_]+[Lln]?|' +
    '[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)';

  const NUMBER_MODE = {
    className: 'number',
    relevance: 0,
    variants: [
      {
        begin: RE_NUMBER
      },
      {
        begin: '\\(-' + RE_NUMBER + '\\)'
      }
    ]
  };

  const OPERATOR_MODE = {
    className: 'operator',
    relevance: 0,
    begin: RE_OPERATOR
  };
  const LIST_CONTENTS_MODES = [
    {
      className: 'identifier',
      relevance: 0,
      begin: RE_IDENT
    },
    OPERATOR_MODE,
    NUMBER_MODE
  ];

  const MODULE_ACCESS_CONTENTS = [
    hljs.QUOTE_STRING_MODE,
    OPERATOR_MODE,
    {
      className: 'module',
      begin: "\\b" + RE_MODULE_IDENT,
      returnBegin: true,
      end: "\.",
      contains: [
        {
          className: 'identifier',
          begin: RE_MODULE_IDENT,
          relevance: 0
        }
      ]
    }
  ];

  const PARAMS_CONTENTS = [
    {
      className: 'module',
      begin: "\\b" + RE_MODULE_IDENT,
      returnBegin: true,
      end: "\.",
      relevance: 0,
      contains: [
        {
          className: 'identifier',
          begin: RE_MODULE_IDENT,
          relevance: 0
        }
      ]
    }
  ];

  const PARAMS_MODE = {
    begin: RE_IDENT,
    end: '(,|\\n|\\))',
    relevance: 0,
    contains: [
      OPERATOR_MODE,
      {
        className: 'typing',
        begin: ':',
        end: '(,|\\n)',
        returnBegin: true,
        relevance: 0,
        contains: PARAMS_CONTENTS
      }
    ]
  };

  const FUNCTION_BLOCK_MODE = {
    className: 'function',
    relevance: 0,
    keywords: KEYWORDS,
    variants: [
      {
        begin: '\\s(\\(\\.?.*?\\)|' + RE_IDENT + ')\\s*=>',
        end: '\\s*=>',
        returnBegin: true,
        relevance: 0,
        contains: [
          {
            className: 'params',
            variants: [
              {
                begin: RE_IDENT
              },
              {
                begin: RE_PARAM
              },
              {
                begin: /\(\s*\)/
              }
            ]
          }
        ]
      },
      {
        begin: '\\s\\(\\.?[^;\\|]*\\)\\s*=>',
        end: '\\s=>',
        returnBegin: true,
        relevance: 0,
        contains: [
          {
            className: 'params',
            relevance: 0,
            variants: [ PARAMS_MODE ]
          }
        ]
      },
      {
        begin: '\\(\\.\\s' + RE_IDENT + '\\)\\s*=>'
      }
    ]
  };
  MODULE_ACCESS_CONTENTS.push(FUNCTION_BLOCK_MODE);

  const CONSTRUCTOR_MODE = {
    className: 'constructor',
    begin: RE_MODULE_IDENT + '\\(',
    end: '\\)',
    illegal: '\\n',
    keywords: KEYWORDS,
    contains: [
      hljs.QUOTE_STRING_MODE,
      OPERATOR_MODE,
      {
        className: 'params',
        begin: '\\b' + RE_IDENT
      }
    ]
  };

  const PATTERN_MATCH_BLOCK_MODE = {
    className: 'pattern-match',
    begin: '\\|',
    returnBegin: true,
    keywords: KEYWORDS,
    end: '=>',
    relevance: 0,
    contains: [
      CONSTRUCTOR_MODE,
      OPERATOR_MODE,
      {
        relevance: 0,
        className: 'constructor',
        begin: RE_MODULE_IDENT
      }
    ]
  };

  const MODULE_ACCESS_MODE = {
    className: 'module-access',
    keywords: KEYWORDS,
    returnBegin: true,
    variants: [
      {
        begin: "\\b(" + RE_MODULE_IDENT + "\\.)+" + RE_IDENT
      },
      {
        begin: "\\b(" + RE_MODULE_IDENT + "\\.)+\\(",
        end: "\\)",
        returnBegin: true,
        contains: [
          FUNCTION_BLOCK_MODE,
          {
            begin: '\\(',
            end: '\\)',
            skip: true
          }
        ].concat(MODULE_ACCESS_CONTENTS)
      },
      {
        begin: "\\b(" + RE_MODULE_IDENT + "\\.)+\\{",
        end: /\}/
      }
    ],
    contains: MODULE_ACCESS_CONTENTS
  };

  PARAMS_CONTENTS.push(MODULE_ACCESS_MODE);

  return {
    name: 'ReasonML',
    aliases: [ 're' ],
    keywords: KEYWORDS,
    illegal: '(:-|:=|\\$\\{|\\+=)',
    contains: [
      hljs.COMMENT('/\\*', '\\*/', {
        illegal: '^(#,\\/\\/)'
      }),
      {
        className: 'character',
        begin: '\'(\\\\[^\']+|[^\'])\'',
        illegal: '\\n',
        relevance: 0
      },
      hljs.QUOTE_STRING_MODE,
      {
        className: 'literal',
        begin: '\\(\\)',
        relevance: 0
      },
      {
        className: 'literal',
        begin: '\\[\\|',
        end: '\\|\\]',
        relevance: 0,
        contains: LIST_CONTENTS_MODES
      },
      {
        className: 'literal',
        begin: '\\[',
        end: '\\]',
        relevance: 0,
        contains: LIST_CONTENTS_MODES
      },
      CONSTRUCTOR_MODE,
      {
        className: 'operator',
        begin: RE_OPERATOR_SPACED,
        illegal: '-->',
        relevance: 0
      },
      NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      PATTERN_MATCH_BLOCK_MODE,
      FUNCTION_BLOCK_MODE,
      {
        className: 'module-def',
        begin: "\\bmodule\\s+" + RE_IDENT + "\\s+" + RE_MODULE_IDENT + "\\s+=\\s+\\{",
        end: /\}/,
        returnBegin: true,
        keywords: KEYWORDS,
        relevance: 0,
        contains: [
          {
            className: 'module',
            relevance: 0,
            begin: RE_MODULE_IDENT
          },
          {
            begin: /\{/,
            end: /\}/,
            skip: true
          }
        ].concat(MODULE_ACCESS_CONTENTS)
      },
      MODULE_ACCESS_MODE
    ]
  };
}

module.exports = reasonml;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/rib.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/rib.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: RenderMan RIB
Author: Konstantin Evdokimenko <qewerty@gmail.com>
Contributors: Shuen-Huei Guan <drake.guan@gmail.com>
Website: https://renderman.pixar.com/resources/RenderMan_20/ribBinding.html
Category: graphics
*/

function rib(hljs) {
  return {
    name: 'RenderMan RIB',
    keywords:
      'ArchiveRecord AreaLightSource Atmosphere Attribute AttributeBegin AttributeEnd Basis ' +
      'Begin Blobby Bound Clipping ClippingPlane Color ColorSamples ConcatTransform Cone ' +
      'CoordinateSystem CoordSysTransform CropWindow Curves Cylinder DepthOfField Detail ' +
      'DetailRange Disk Displacement Display End ErrorHandler Exposure Exterior Format ' +
      'FrameAspectRatio FrameBegin FrameEnd GeneralPolygon GeometricApproximation Geometry ' +
      'Hider Hyperboloid Identity Illuminate Imager Interior LightSource ' +
      'MakeCubeFaceEnvironment MakeLatLongEnvironment MakeShadow MakeTexture Matte ' +
      'MotionBegin MotionEnd NuPatch ObjectBegin ObjectEnd ObjectInstance Opacity Option ' +
      'Orientation Paraboloid Patch PatchMesh Perspective PixelFilter PixelSamples ' +
      'PixelVariance Points PointsGeneralPolygons PointsPolygons Polygon Procedural Projection ' +
      'Quantize ReadArchive RelativeDetail ReverseOrientation Rotate Scale ScreenWindow ' +
      'ShadingInterpolation ShadingRate Shutter Sides Skew SolidBegin SolidEnd Sphere ' +
      'SubdivisionMesh Surface TextureCoordinates Torus Transform TransformBegin TransformEnd ' +
      'TransformPoints Translate TrimCurve WorldBegin WorldEnd',
    illegal: '</',
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };
}

module.exports = rib;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/roboconf.js":
/*!***********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/roboconf.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Roboconf
Author: Vincent Zurczak <vzurczak@linagora.com>
Description: Syntax highlighting for Roboconf's DSL
Website: http://roboconf.net
Category: config
*/

function roboconf(hljs) {
  const IDENTIFIER = '[a-zA-Z-_][^\\n{]+\\{';

  const PROPERTY = {
    className: 'attribute',
    begin: /[a-zA-Z-_]+/,
    end: /\s*:/,
    excludeEnd: true,
    starts: {
      end: ';',
      relevance: 0,
      contains: [
        {
          className: 'variable',
          begin: /\.[a-zA-Z-_]+/
        },
        {
          className: 'keyword',
          begin: /\(optional\)/
        }
      ]
    }
  };

  return {
    name: 'Roboconf',
    aliases: [
      'graph',
      'instances'
    ],
    case_insensitive: true,
    keywords: 'import',
    contains: [
      // Facet sections
      {
        begin: '^facet ' + IDENTIFIER,
        end: /\}/,
        keywords: 'facet',
        contains: [
          PROPERTY,
          hljs.HASH_COMMENT_MODE
        ]
      },

      // Instance sections
      {
        begin: '^\\s*instance of ' + IDENTIFIER,
        end: /\}/,
        keywords: 'name count channels instance-data instance-state instance of',
        illegal: /\S/,
        contains: [
          'self',
          PROPERTY,
          hljs.HASH_COMMENT_MODE
        ]
      },

      // Component sections
      {
        begin: '^' + IDENTIFIER,
        end: /\}/,
        contains: [
          PROPERTY,
          hljs.HASH_COMMENT_MODE
        ]
      },

      // Comments
      hljs.HASH_COMMENT_MODE
    ]
  };
}

module.exports = roboconf;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/routeros.js":
/*!***********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/routeros.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Microtik RouterOS script
Author: Ivan Dementev <ivan_div@mail.ru>
Description: Scripting host provides a way to automate some router maintenance tasks by means of executing user-defined scripts bounded to some event occurrence
Website: https://wiki.mikrotik.com/wiki/Manual:Scripting
*/

// Colors from RouterOS terminal:
//   green        - #0E9A00
//   teal         - #0C9A9A
//   purple       - #99069A
//   light-brown  - #9A9900

function routeros(hljs) {
  const STATEMENTS = 'foreach do while for if from to step else on-error and or not in';

  // Global commands: Every global command should start with ":" token, otherwise it will be treated as variable.
  const GLOBAL_COMMANDS = 'global local beep delay put len typeof pick log time set find environment terminal error execute parse resolve toarray tobool toid toip toip6 tonum tostr totime';

  // Common commands: Following commands available from most sub-menus:
  const COMMON_COMMANDS = 'add remove enable disable set get print export edit find run debug error info warning';

  const LITERALS = 'true false yes no nothing nil null';

  const OBJECTS = 'traffic-flow traffic-generator firewall scheduler aaa accounting address-list address align area bandwidth-server bfd bgp bridge client clock community config connection console customer default dhcp-client dhcp-server discovery dns e-mail ethernet filter firewall firmware gps graphing group hardware health hotspot identity igmp-proxy incoming instance interface ip ipsec ipv6 irq l2tp-server lcd ldp logging mac-server mac-winbox mangle manual mirror mme mpls nat nd neighbor network note ntp ospf ospf-v3 ovpn-server page peer pim ping policy pool port ppp pppoe-client pptp-server prefix profile proposal proxy queue radius resource rip ripng route routing screen script security-profiles server service service-port settings shares smb sms sniffer snmp snooper socks sstp-server system tool tracking type upgrade upnp user-manager users user vlan secret vrrp watchdog web-access wireless pptp pppoe lan wan layer7-protocol lease simple raw';

  const VAR = {
    className: 'variable',
    variants: [
      {
        begin: /\$[\w\d#@][\w\d_]*/
      },
      {
        begin: /\$\{(.*?)\}/
      }
    ]
  };

  const QUOTE_STRING = {
    className: 'string',
    begin: /"/,
    end: /"/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      VAR,
      {
        className: 'variable',
        begin: /\$\(/,
        end: /\)/,
        contains: [ hljs.BACKSLASH_ESCAPE ]
      }
    ]
  };

  const APOS_STRING = {
    className: 'string',
    begin: /'/,
    end: /'/
  };

  return {
    name: 'Microtik RouterOS script',
    aliases: [
      'routeros',
      'mikrotik'
    ],
    case_insensitive: true,
    keywords: {
      $pattern: /:?[\w-]+/,
      literal: LITERALS,
      keyword: STATEMENTS + ' :' + STATEMENTS.split(' ').join(' :') + ' :' + GLOBAL_COMMANDS.split(' ').join(' :')
    },
    contains: [
      { // illegal syntax
        variants: [
          { // -- comment
            begin: /\/\*/,
            end: /\*\//
          },
          { // Stan comment
            begin: /\/\//,
            end: /$/
          },
          { // HTML tags
            begin: /<\//,
            end: />/
          }
        ],
        illegal: /./
      },
      hljs.COMMENT('^#', '$'),
      QUOTE_STRING,
      APOS_STRING,
      VAR,
      { // attribute=value
        begin: /[\w-]+=([^\s{}[\]()]+)/,
        relevance: 0,
        returnBegin: true,
        contains: [
          {
            className: 'attribute',
            begin: /[^=]+/
          },
          {
            begin: /=/,
            endsWithParent: true,
            relevance: 0,
            contains: [
              QUOTE_STRING,
              APOS_STRING,
              VAR,
              {
                className: 'literal',
                begin: '\\b(' + LITERALS.split(' ').join('|') + ')\\b'
              },
              {
                // Do not format unclassified values. Needed to exclude highlighting of values as built_in.
                begin: /("[^"]*"|[^\s{}[\]]+)/
              }
              /*
              {
                // IPv4 addresses and subnets
                className: 'number',
                variants: [
                  {begin: IPADDR_wBITMASK+'(,'+IPADDR_wBITMASK+')*'}, //192.168.0.0/24,1.2.3.0/24
                  {begin: IPADDR+'-'+IPADDR},       // 192.168.0.1-192.168.0.3
                  {begin: IPADDR+'(,'+IPADDR+')*'}, // 192.168.0.1,192.168.0.34,192.168.24.1,192.168.0.1
                ]
              },
              {
                // MAC addresses and DHCP Client IDs
                className: 'number',
                begin: /\b(1:)?([0-9A-Fa-f]{1,2}[:-]){5}([0-9A-Fa-f]){1,2}\b/,
              },
              */
            ]
          }
        ]
      },
      {
        // HEX values
        className: 'number',
        begin: /\*[0-9a-fA-F]+/
      },
      {
        begin: '\\b(' + COMMON_COMMANDS.split(' ').join('|') + ')([\\s[(\\]|])',
        returnBegin: true,
        contains: [
          {
            className: 'builtin-name', // 'function',
            begin: /\w+/
          }
        ]
      },
      {
        className: 'built_in',
        variants: [
          {
            begin: '(\\.\\./|/|\\s)((' + OBJECTS.split(' ').join('|') + ');?\\s)+'
          },
          {
            begin: /\.\./,
            relevance: 0
          }
        ]
      }
    ]
  };
}

module.exports = routeros;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/rsl.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/rsl.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: RenderMan RSL
Author: Konstantin Evdokimenko <qewerty@gmail.com>
Contributors: Shuen-Huei Guan <drake.guan@gmail.com>
Website: https://renderman.pixar.com/resources/RenderMan_20/shadingLanguage.html
Category: graphics
*/

function rsl(hljs) {
  return {
    name: 'RenderMan RSL',
    keywords: {
      keyword:
        'float color point normal vector matrix while for if do return else break extern continue',
      built_in:
        'abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise ' +
        'clamp comp concat cos degrees depth Deriv diffuse distance Du Dv environment exp ' +
        'faceforward filterstep floor format fresnel incident length lightsource log match ' +
        'max min mod noise normalize ntransform opposite option phong pnoise pow printf ' +
        'ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp ' +
        'setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan ' +
        'texture textureinfo trace transform vtransform xcomp ycomp zcomp'
    },
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'meta',
        begin: '#',
        end: '$'
      },
      {
        className: 'class',
        beginKeywords: 'surface displacement light volume imager',
        end: '\\('
      },
      {
        beginKeywords: 'illuminate illuminance gather',
        end: '\\('
      }
    ]
  };
}

module.exports = rsl;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/ruby.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/ruby.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source(re) {
  if (!re) return null;
  if (typeof re === "string") return re;

  return re.source;
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function lookahead(re) {
  return concat('(?=', re, ')');
}

/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}

/*
Language: Ruby
Description: Ruby is a dynamic, open source programming language with a focus on simplicity and productivity.
Website: https://www.ruby-lang.org/
Author: Anton Kovalyov <anton@kovalyov.net>
Contributors: Peter Leonov <gojpeg@yandex.ru>, Vasily Polovnyov <vast@whiteants.net>, Loren Segal <lsegal@soen.ca>, Pascal Hurni <phi@ruby-reactive.org>, Cedric Sohrauer <sohrauer@googlemail.com>
Category: common
*/

function ruby(hljs) {
  var RUBY_METHOD_RE = '([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)';
  var RUBY_KEYWORDS = {
    keyword:
      'and then defined module in return redo if BEGIN retry end for self when ' +
      'next until do begin unless END rescue else break undef not super class case ' +
      'require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor ' +
      '__FILE__',
    built_in: 'proc lambda',
    literal:
      'true false nil'
  };
  var YARDOCTAG = {
    className: 'doctag',
    begin: '@[A-Za-z]+'
  };
  var IRB_OBJECT = {
    begin: '#<', end: '>'
  };
  var COMMENT_MODES = [
    hljs.COMMENT(
      '#',
      '$',
      {
        contains: [YARDOCTAG]
      }
    ),
    hljs.COMMENT(
      '^=begin',
      '^=end',
      {
        contains: [YARDOCTAG],
        relevance: 10
      }
    ),
    hljs.COMMENT('^__END__', '\\n$')
  ];
  var SUBST = {
    className: 'subst',
    begin: /#\{/, end: /\}/,
    keywords: RUBY_KEYWORDS
  };
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    variants: [
      {begin: /'/, end: /'/},
      {begin: /"/, end: /"/},
      {begin: /`/, end: /`/},
      {begin: /%[qQwWx]?\(/, end: /\)/},
      {begin: /%[qQwWx]?\[/, end: /\]/},
      {begin: /%[qQwWx]?\{/, end: /\}/},
      {begin: /%[qQwWx]?</, end: />/},
      {begin: /%[qQwWx]?\//, end: /\//},
      {begin: /%[qQwWx]?%/, end: /%/},
      {begin: /%[qQwWx]?-/, end: /-/},
      {begin: /%[qQwWx]?\|/, end: /\|/},
      {
        // \B in the beginning suppresses recognition of ?-sequences where ?
        // is the last character of a preceding identifier, as in: `func?4`
        begin: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
      },
      { // heredocs
        begin: /<<[-~]?'?(\w+)(?:.|\n)*?\n\s*\1\b/,
        returnBegin: true,
        contains: [
          { begin: /<<[-~]?'?/ },
          hljs.END_SAME_AS_BEGIN({
            begin: /(\w+)/, end: /(\w+)/,
            contains: [hljs.BACKSLASH_ESCAPE, SUBST],
          })
        ]
      }
    ]
  };

  // Ruby syntax is underdocumented, but this grammar seems to be accurate
  // as of version 2.7.2 (confirmed with (irb and `Ripper.sexp(...)`)
  // https://docs.ruby-lang.org/en/2.7.0/doc/syntax/literals_rdoc.html#label-Numbers
  var decimal = '[1-9](_?[0-9])*|0';
  var digits = '[0-9](_?[0-9])*';
  var NUMBER = {
    className: 'number', relevance: 0,
    variants: [
      // decimal integer/float, optionally exponential or rational, optionally imaginary
      { begin: `\\b(${decimal})(\\.(${digits}))?([eE][+-]?(${digits})|r)?i?\\b` },

      // explicit decimal/binary/octal/hexadecimal integer,
      // optionally rational and/or imaginary
      { begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b" },
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b" },

      // 0-prefixed implicit octal integer, optionally rational and/or imaginary
      { begin: "\\b0(_?[0-7])+r?i?\\b" },
    ]
  };

  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)', endsParent: true,
    keywords: RUBY_KEYWORDS
  };

  var RUBY_DEFAULT_CONTAINS = [
    STRING,
    {
      className: 'class',
      beginKeywords: 'class module', end: '$|;',
      illegal: /=/,
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {begin: '[A-Za-z_]\\w*(::\\w+)*(\\?|!)?'}),
        {
          begin: '<\\s*',
          contains: [{
            begin: '(' + hljs.IDENT_RE + '::)?' + hljs.IDENT_RE
          }]
        }
      ].concat(COMMENT_MODES)
    },
    {
      className: 'function',
      // def method_name(
      // def method_name;
      // def method_name (end of line)
      begin: concat(/def\s*/, lookahead(RUBY_METHOD_RE + "\\s*(\\(|;|$)")),
      keywords: "def",
      end: '$|;',
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {begin: RUBY_METHOD_RE}),
        PARAMS
      ].concat(COMMENT_MODES)
    },
    {
      // swallow namespace qualifiers before symbols
      begin: hljs.IDENT_RE + '::'
    },
    {
      className: 'symbol',
      begin: hljs.UNDERSCORE_IDENT_RE + '(!|\\?)?:',
      relevance: 0
    },
    {
      className: 'symbol',
      begin: ':(?!\\s)',
      contains: [STRING, {begin: RUBY_METHOD_RE}],
      relevance: 0
    },
    NUMBER,
    {
      // negative-look forward attemps to prevent false matches like:
      // @ident@ or $ident$ that might indicate this is not ruby at all
      className: "variable",
      begin: '(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])' + `(?![A-Za-z])(?![@$?'])`
    },
    {
      className: 'params',
      begin: /\|/,
      end: /\|/,
      relevance:0, // this could be a lot of things (in other languages) other than params
      keywords: RUBY_KEYWORDS
    },
    { // regexp container
      begin: '(' + hljs.RE_STARTERS_RE + '|unless)\\s*',
      keywords: 'unless',
      contains: [
        {
          className: 'regexp',
          contains: [hljs.BACKSLASH_ESCAPE, SUBST],
          illegal: /\n/,
          variants: [
            {begin: '/', end: '/[a-z]*'},
            {begin: /%r\{/, end: /\}[a-z]*/},
            {begin: '%r\\(', end: '\\)[a-z]*'},
            {begin: '%r!', end: '![a-z]*'},
            {begin: '%r\\[', end: '\\][a-z]*'}
          ]
        }
      ].concat(IRB_OBJECT, COMMENT_MODES),
      relevance: 0
    }
  ].concat(IRB_OBJECT, COMMENT_MODES);

  SUBST.contains = RUBY_DEFAULT_CONTAINS;
  PARAMS.contains = RUBY_DEFAULT_CONTAINS;

  // >>
  // ?>
  var SIMPLE_PROMPT = "[>?]>";
  // irb(main):001:0>
  var DEFAULT_PROMPT = "[\\w#]+\\(\\w+\\):\\d+:\\d+>";
  var RVM_PROMPT = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>";

  var IRB_DEFAULT = [
    {
      begin: /^\s*=>/,
      starts: {
        end: '$', contains: RUBY_DEFAULT_CONTAINS
      }
    },
    {
      className: 'meta',
      begin: '^('+SIMPLE_PROMPT+"|"+DEFAULT_PROMPT+'|'+RVM_PROMPT+')(?=[ ])',
      starts: {
        end: '$', contains: RUBY_DEFAULT_CONTAINS
      }
    }
  ];

  COMMENT_MODES.unshift(IRB_OBJECT);

  return {
    name: 'Ruby',
    aliases: ['rb', 'gemspec', 'podspec', 'thor', 'irb'],
    keywords: RUBY_KEYWORDS,
    illegal: /\/\*/,
    contains: [
        hljs.SHEBANG({binary:"ruby"}),
      ]
      .concat(IRB_DEFAULT)
      .concat(COMMENT_MODES)
      .concat(RUBY_DEFAULT_CONTAINS)
  };
}

module.exports = ruby;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/ruleslanguage.js":
/*!****************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/ruleslanguage.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Oracle Rules Language
Author: Jason Jacobson <jason.a.jacobson@gmail.com>
Description: The Oracle Utilities Rules Language is used to program the Oracle Utilities Applications acquired from LODESTAR Corporation.  The products include Billing Component, LPSS, Pricing Component etc. through version 1.6.1.
Website: https://docs.oracle.com/cd/E17904_01/dev.1111/e10227/rlref.htm
Category: enterprise
*/

function ruleslanguage(hljs) {
  return {
    name: 'Oracle Rules Language',
    keywords: {
      keyword:
        'BILL_PERIOD BILL_START BILL_STOP RS_EFFECTIVE_START RS_EFFECTIVE_STOP RS_JURIS_CODE RS_OPCO_CODE ' +
        'INTDADDATTRIBUTE|5 INTDADDVMSG|5 INTDBLOCKOP|5 INTDBLOCKOPNA|5 INTDCLOSE|5 INTDCOUNT|5 ' +
        'INTDCOUNTSTATUSCODE|5 INTDCREATEMASK|5 INTDCREATEDAYMASK|5 INTDCREATEFACTORMASK|5 ' +
        'INTDCREATEHANDLE|5 INTDCREATEOVERRIDEDAYMASK|5 INTDCREATEOVERRIDEMASK|5 ' +
        'INTDCREATESTATUSCODEMASK|5 INTDCREATETOUPERIOD|5 INTDDELETE|5 INTDDIPTEST|5 INTDEXPORT|5 ' +
        'INTDGETERRORCODE|5 INTDGETERRORMESSAGE|5 INTDISEQUAL|5 INTDJOIN|5 INTDLOAD|5 INTDLOADACTUALCUT|5 ' +
        'INTDLOADDATES|5 INTDLOADHIST|5 INTDLOADLIST|5 INTDLOADLISTDATES|5 INTDLOADLISTENERGY|5 ' +
        'INTDLOADLISTHIST|5 INTDLOADRELATEDCHANNEL|5 INTDLOADSP|5 INTDLOADSTAGING|5 INTDLOADUOM|5 ' +
        'INTDLOADUOMDATES|5 INTDLOADUOMHIST|5 INTDLOADVERSION|5 INTDOPEN|5 INTDREADFIRST|5 INTDREADNEXT|5 ' +
        'INTDRECCOUNT|5 INTDRELEASE|5 INTDREPLACE|5 INTDROLLAVG|5 INTDROLLPEAK|5 INTDSCALAROP|5 INTDSCALE|5 ' +
        'INTDSETATTRIBUTE|5 INTDSETDSTPARTICIPANT|5 INTDSETSTRING|5 INTDSETVALUE|5 INTDSETVALUESTATUS|5 ' +
        'INTDSHIFTSTARTTIME|5 INTDSMOOTH|5 INTDSORT|5 INTDSPIKETEST|5 INTDSUBSET|5 INTDTOU|5 ' +
        'INTDTOURELEASE|5 INTDTOUVALUE|5 INTDUPDATESTATS|5 INTDVALUE|5 STDEV INTDDELETEEX|5 ' +
        'INTDLOADEXACTUAL|5 INTDLOADEXCUT|5 INTDLOADEXDATES|5 INTDLOADEX|5 INTDLOADEXRELATEDCHANNEL|5 ' +
        'INTDSAVEEX|5 MVLOAD|5 MVLOADACCT|5 MVLOADACCTDATES|5 MVLOADACCTHIST|5 MVLOADDATES|5 MVLOADHIST|5 ' +
        'MVLOADLIST|5 MVLOADLISTDATES|5 MVLOADLISTHIST|5 IF FOR NEXT DONE SELECT END CALL ABORT CLEAR CHANNEL FACTOR LIST NUMBER ' +
        'OVERRIDE SET WEEK DISTRIBUTIONNODE ELSE WHEN THEN OTHERWISE IENUM CSV INCLUDE LEAVE RIDER SAVE DELETE ' +
        'NOVALUE SECTION WARN SAVE_UPDATE DETERMINANT LABEL REPORT REVENUE EACH ' +
        'IN FROM TOTAL CHARGE BLOCK AND OR CSV_FILE RATE_CODE AUXILIARY_DEMAND ' +
        'UIDACCOUNT RS BILL_PERIOD_SELECT HOURS_PER_MONTH INTD_ERROR_STOP SEASON_SCHEDULE_NAME ' +
        'ACCOUNTFACTOR ARRAYUPPERBOUND CALLSTOREDPROC GETADOCONNECTION GETCONNECT GETDATASOURCE ' +
        'GETQUALIFIER GETUSERID HASVALUE LISTCOUNT LISTOP LISTUPDATE LISTVALUE PRORATEFACTOR RSPRORATE ' +
        'SETBINPATH SETDBMONITOR WQ_OPEN BILLINGHOURS DATE DATEFROMFLOAT DATETIMEFROMSTRING ' +
        'DATETIMETOSTRING DATETOFLOAT DAY DAYDIFF DAYNAME DBDATETIME HOUR MINUTE MONTH MONTHDIFF ' +
        'MONTHHOURS MONTHNAME ROUNDDATE SAMEWEEKDAYLASTYEAR SECOND WEEKDAY WEEKDIFF YEAR YEARDAY ' +
        'YEARSTR COMPSUM HISTCOUNT HISTMAX HISTMIN HISTMINNZ HISTVALUE MAXNRANGE MAXRANGE MINRANGE ' +
        'COMPIKVA COMPKVA COMPKVARFROMKQKW COMPLF IDATTR FLAG LF2KW LF2KWH MAXKW POWERFACTOR ' +
        'READING2USAGE AVGSEASON MAXSEASON MONTHLYMERGE SEASONVALUE SUMSEASON ACCTREADDATES ' +
        'ACCTTABLELOAD CONFIGADD CONFIGGET CREATEOBJECT CREATEREPORT EMAILCLIENT EXPBLKMDMUSAGE ' +
        'EXPMDMUSAGE EXPORT_USAGE FACTORINEFFECT GETUSERSPECIFIEDSTOP INEFFECT ISHOLIDAY RUNRATE ' +
        'SAVE_PROFILE SETREPORTTITLE USEREXIT WATFORRUNRATE TO TABLE ACOS ASIN ATAN ATAN2 BITAND CEIL ' +
        'COS COSECANT COSH COTANGENT DIVQUOT DIVREM EXP FABS FLOOR FMOD FREPM FREXPN LOG LOG10 MAX MAXN ' +
        'MIN MINNZ MODF POW ROUND ROUND2VALUE ROUNDINT SECANT SIN SINH SQROOT TAN TANH FLOAT2STRING ' +
        'FLOAT2STRINGNC INSTR LEFT LEN LTRIM MID RIGHT RTRIM STRING STRINGNC TOLOWER TOUPPER TRIM ' +
        'NUMDAYS READ_DATE STAGING',
      built_in:
        'IDENTIFIER OPTIONS XML_ELEMENT XML_OP XML_ELEMENT_OF DOMDOCCREATE DOMDOCLOADFILE DOMDOCLOADXML ' +
        'DOMDOCSAVEFILE DOMDOCGETROOT DOMDOCADDPI DOMNODEGETNAME DOMNODEGETTYPE DOMNODEGETVALUE DOMNODEGETCHILDCT ' +
        'DOMNODEGETFIRSTCHILD DOMNODEGETSIBLING DOMNODECREATECHILDELEMENT DOMNODESETATTRIBUTE ' +
        'DOMNODEGETCHILDELEMENTCT DOMNODEGETFIRSTCHILDELEMENT DOMNODEGETSIBLINGELEMENT DOMNODEGETATTRIBUTECT ' +
        'DOMNODEGETATTRIBUTEI DOMNODEGETATTRIBUTEBYNAME DOMNODEGETBYNAME'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'literal',
        variants: [
          { // looks like #-comment
            begin: '#\\s+[a-zA-Z .]*',
            relevance: 0
          },
          {
            begin: '#[a-zA-Z .]+'
          }
        ]
      }
    ]
  };
}

module.exports = ruleslanguage;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/rust.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/rust.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Rust
Author: Andrey Vlasovskikh <andrey.vlasovskikh@gmail.com>
Contributors: Roman Shmatov <romanshmatov@gmail.com>, Kasper Andersen <kma_untrusted@protonmail.com>
Website: https://www.rust-lang.org
Category: common, system
*/

function rust(hljs) {
  const NUM_SUFFIX = '([ui](8|16|32|64|128|size)|f(32|64))\?';
  const KEYWORDS =
    'abstract as async await become box break const continue crate do dyn ' +
    'else enum extern false final fn for if impl in let loop macro match mod ' +
    'move mut override priv pub ref return self Self static struct super ' +
    'trait true try type typeof unsafe unsized use virtual where while yield';
  const BUILTINS =
    // functions
    'drop ' +
    // types
    'i8 i16 i32 i64 i128 isize ' +
    'u8 u16 u32 u64 u128 usize ' +
    'f32 f64 ' +
    'str char bool ' +
    'Box Option Result String Vec ' +
    // traits
    'Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug ' +
    'PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator ' +
    'Extend IntoIterator DoubleEndedIterator ExactSizeIterator ' +
    'SliceConcatExt ToString ' +
    // macros
    'assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! ' +
    'debug_assert! debug_assert_eq! env! panic! file! format! format_args! ' +
    'include_bin! include_str! line! local_data_key! module_path! ' +
    'option_env! print! println! select! stringify! try! unimplemented! ' +
    'unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!';
  return {
    name: 'Rust',
    aliases: [ 'rs' ],
    keywords: {
      $pattern: hljs.IDENT_RE + '!?',
      keyword:
        KEYWORDS,
      literal:
        'true false Some None Ok Err',
      built_in:
        BUILTINS
    },
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.COMMENT('/\\*', '\\*/', {
        contains: [ 'self' ]
      }),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        begin: /b?"/,
        illegal: null
      }),
      {
        className: 'string',
        variants: [
          {
            begin: /r(#*)"(.|\n)*?"\1(?!#)/
          },
          {
            begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
          }
        ]
      },
      {
        className: 'symbol',
        begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
      },
      {
        className: 'number',
        variants: [
          {
            begin: '\\b0b([01_]+)' + NUM_SUFFIX
          },
          {
            begin: '\\b0o([0-7_]+)' + NUM_SUFFIX
          },
          {
            begin: '\\b0x([A-Fa-f0-9_]+)' + NUM_SUFFIX
          },
          {
            begin: '\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)' +
                   NUM_SUFFIX
          }
        ],
        relevance: 0
      },
      {
        className: 'function',
        beginKeywords: 'fn',
        end: '(\\(|<)',
        excludeEnd: true,
        contains: [ hljs.UNDERSCORE_TITLE_MODE ]
      },
      {
        className: 'meta',
        begin: '#!?\\[',
        end: '\\]',
        contains: [
          {
            className: 'meta-string',
            begin: /"/,
            end: /"/
          }
        ]
      },
      {
        className: 'class',
        beginKeywords: 'type',
        end: ';',
        contains: [
          hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, {
            endsParent: true
          })
        ],
        illegal: '\\S'
      },
      {
        className: 'class',
        beginKeywords: 'trait enum struct union',
        end: /\{/,
        contains: [
          hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, {
            endsParent: true
          })
        ],
        illegal: '[\\w\\d]'
      },
      {
        begin: hljs.IDENT_RE + '::',
        keywords: {
          built_in: BUILTINS
        }
      },
      {
        begin: '->'
      }
    ]
  };
}

module.exports = rust;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/sas.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/sas.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: SAS
Author: Mauricio Caceres <mauricio.caceres.bravo@gmail.com>
Description: Syntax Highlighting for SAS
*/

function sas(hljs) {
  // Data step and PROC SQL statements
  const SAS_KEYWORDS =
    'do if then else end until while ' +
    '' +
    'abort array attrib by call cards cards4 catname continue ' +
    'datalines datalines4 delete delim delimiter display dm drop ' +
    'endsas error file filename footnote format goto in infile ' +
    'informat input keep label leave length libname link list ' +
    'lostcard merge missing modify options output out page put ' +
    'redirect remove rename replace retain return select set skip ' +
    'startsas stop title update waitsas where window x systask ' +
    '' +
    'add and alter as cascade check create delete describe ' +
    'distinct drop foreign from group having index insert into in ' +
    'key like message modify msgtype not null on or order primary ' +
    'references reset restrict select set table unique update ' +
    'validate view where';

  // Built-in SAS functions
  const SAS_FUN =
    'abs|addr|airy|arcos|arsin|atan|attrc|attrn|band|' +
    'betainv|blshift|bnot|bor|brshift|bxor|byte|cdf|ceil|' +
    'cexist|cinv|close|cnonct|collate|compbl|compound|' +
    'compress|cos|cosh|css|curobs|cv|daccdb|daccdbsl|' +
    'daccsl|daccsyd|dacctab|dairy|date|datejul|datepart|' +
    'datetime|day|dclose|depdb|depdbsl|depdbsl|depsl|' +
    'depsl|depsyd|depsyd|deptab|deptab|dequote|dhms|dif|' +
    'digamma|dim|dinfo|dnum|dopen|doptname|doptnum|dread|' +
    'dropnote|dsname|erf|erfc|exist|exp|fappend|fclose|' +
    'fcol|fdelete|fetch|fetchobs|fexist|fget|fileexist|' +
    'filename|fileref|finfo|finv|fipname|fipnamel|' +
    'fipstate|floor|fnonct|fnote|fopen|foptname|foptnum|' +
    'fpoint|fpos|fput|fread|frewind|frlen|fsep|fuzz|' +
    'fwrite|gaminv|gamma|getoption|getvarc|getvarn|hbound|' +
    'hms|hosthelp|hour|ibessel|index|indexc|indexw|input|' +
    'inputc|inputn|int|intck|intnx|intrr|irr|jbessel|' +
    'juldate|kurtosis|lag|lbound|left|length|lgamma|' +
    'libname|libref|log|log10|log2|logpdf|logpmf|logsdf|' +
    'lowcase|max|mdy|mean|min|minute|mod|month|mopen|' +
    'mort|n|netpv|nmiss|normal|note|npv|open|ordinal|' +
    'pathname|pdf|peek|peekc|pmf|point|poisson|poke|' +
    'probbeta|probbnml|probchi|probf|probgam|probhypr|' +
    'probit|probnegb|probnorm|probt|put|putc|putn|qtr|' +
    'quote|ranbin|rancau|ranexp|rangam|range|rank|rannor|' +
    'ranpoi|rantbl|rantri|ranuni|repeat|resolve|reverse|' +
    'rewind|right|round|saving|scan|sdf|second|sign|' +
    'sin|sinh|skewness|soundex|spedis|sqrt|std|stderr|' +
    'stfips|stname|stnamel|substr|sum|symget|sysget|' +
    'sysmsg|sysprod|sysrc|system|tan|tanh|time|timepart|' +
    'tinv|tnonct|today|translate|tranwrd|trigamma|' +
    'trim|trimn|trunc|uniform|upcase|uss|var|varfmt|' +
    'varinfmt|varlabel|varlen|varname|varnum|varray|' +
    'varrayx|vartype|verify|vformat|vformatd|vformatdx|' +
    'vformatn|vformatnx|vformatw|vformatwx|vformatx|' +
    'vinarray|vinarrayx|vinformat|vinformatd|vinformatdx|' +
    'vinformatn|vinformatnx|vinformatw|vinformatwx|' +
    'vinformatx|vlabel|vlabelx|vlength|vlengthx|vname|' +
    'vnamex|vtype|vtypex|weekday|year|yyq|zipfips|zipname|' +
    'zipnamel|zipstate';

  // Built-in macro functions
  const SAS_MACRO_FUN =
    'bquote|nrbquote|cmpres|qcmpres|compstor|' +
    'datatyp|display|do|else|end|eval|global|goto|' +
    'if|index|input|keydef|label|left|length|let|' +
    'local|lowcase|macro|mend|nrbquote|nrquote|' +
    'nrstr|put|qcmpres|qleft|qlowcase|qscan|' +
    'qsubstr|qsysfunc|qtrim|quote|qupcase|scan|str|' +
    'substr|superq|syscall|sysevalf|sysexec|sysfunc|' +
    'sysget|syslput|sysprod|sysrc|sysrput|then|to|' +
    'trim|unquote|until|upcase|verify|while|window';

  return {
    name: 'SAS',
    aliases: [
      'sas',
      'SAS'
    ],
    case_insensitive: true, // SAS is case-insensitive
    keywords: {
      literal:
        'null missing _all_ _automatic_ _character_ _infile_ ' +
        '_n_ _name_ _null_ _numeric_ _user_ _webout_',
      meta:
        SAS_KEYWORDS
    },
    contains: [
      {
        // Distinct highlight for proc <proc>, data, run, quit
        className: 'keyword',
        begin: /^\s*(proc [\w\d_]+|data|run|quit)[\s;]/
      },
      {
        // Macro variables
        className: 'variable',
        begin: /&[a-zA-Z_&][a-zA-Z0-9_]*\.?/
      },
      {
        // Special emphasis for datalines|cards
        className: 'emphasis',
        begin: /^\s*datalines|cards.*;/,
        end: /^\s*;\s*$/
      },
      { // Built-in macro variables take precedence
        className: 'built_in',
        begin: '%(' + SAS_MACRO_FUN + ')'
      },
      {
        // User-defined macro functions highlighted after
        className: 'name',
        begin: /%[a-zA-Z_][a-zA-Z_0-9]*/
      },
      {
        className: 'meta',
        begin: '[^%](' + SAS_FUN + ')[\(]'
      },
      {
        className: 'string',
        variants: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE
        ]
      },
      hljs.COMMENT('\\*', ';'),
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };
}

module.exports = sas;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/scala.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/scala.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Scala
Category: functional
Author: Jan Berkel <jan.berkel@gmail.com>
Contributors: Erik Osheim <d_m@plastic-idolatry.com>
Website: https://www.scala-lang.org
*/

function scala(hljs) {
  const ANNOTATION = {
    className: 'meta',
    begin: '@[A-Za-z]+'
  };

  // used in strings for escaping/interpolation/substitution
  const SUBST = {
    className: 'subst',
    variants: [
      {
        begin: '\\$[A-Za-z0-9_]+'
      },
      {
        begin: /\$\{/,
        end: /\}/
      }
    ]
  };

  const STRING = {
    className: 'string',
    variants: [
      {
        begin: '"',
        end: '"',
        illegal: '\\n',
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: '"""',
        end: '"""',
        relevance: 10
      },
      {
        begin: '[a-z]+"',
        end: '"',
        illegal: '\\n',
        contains: [ hljs.BACKSLASH_ESCAPE,
          SUBST ]
      },
      {
        className: 'string',
        begin: '[a-z]+"""',
        end: '"""',
        contains: [ SUBST ],
        relevance: 10
      }
    ]

  };

  const SYMBOL = {
    className: 'symbol',
    begin: '\'\\w[\\w\\d_]*(?!\')'
  };

  const TYPE = {
    className: 'type',
    begin: '\\b[A-Z][A-Za-z0-9_]*',
    relevance: 0
  };

  const NAME = {
    className: 'title',
    begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
    relevance: 0
  };

  const CLASS = {
    className: 'class',
    beginKeywords: 'class object trait type',
    end: /[:={\[\n;]/,
    excludeEnd: true,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        beginKeywords: 'extends with',
        relevance: 10
      },
      {
        begin: /\[/,
        end: /\]/,
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0,
        contains: [ TYPE ]
      },
      {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0,
        contains: [ TYPE ]
      },
      NAME
    ]
  };

  const METHOD = {
    className: 'function',
    beginKeywords: 'def',
    end: /[:={\[(\n;]/,
    excludeEnd: true,
    contains: [ NAME ]
  };

  return {
    name: 'Scala',
    keywords: {
      literal: 'true false null',
      keyword: 'type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      STRING,
      SYMBOL,
      TYPE,
      METHOD,
      CLASS,
      hljs.C_NUMBER_MODE,
      ANNOTATION
    ]
  };
}

module.exports = scala;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/scheme.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/scheme.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Scheme
Description: Scheme is a programming language in the Lisp family.
             (keywords based on http://community.schemewiki.org/?scheme-keywords)
Author: JP Verkamp <me@jverkamp.com>
Contributors: Ivan Sagalaev <maniac@softwaremaniacs.org>
Origin: clojure.js
Website: http://community.schemewiki.org/?what-is-scheme
Category: lisp
*/

function scheme(hljs) {
  var SCHEME_IDENT_RE = '[^\\(\\)\\[\\]\\{\\}",\'`;#|\\\\\\s]+';
  var SCHEME_SIMPLE_NUMBER_RE = '(-|\\+)?\\d+([./]\\d+)?';
  var SCHEME_COMPLEX_NUMBER_RE = SCHEME_SIMPLE_NUMBER_RE + '[+\\-]' + SCHEME_SIMPLE_NUMBER_RE + 'i';
  var KEYWORDS = {
    $pattern: SCHEME_IDENT_RE,
    'builtin-name':
      'case-lambda call/cc class define-class exit-handler field import ' +
      'inherit init-field interface let*-values let-values let/ec mixin ' +
      'opt-lambda override protect provide public rename require ' +
      'require-for-syntax syntax syntax-case syntax-error unit/sig unless ' +
      'when with-syntax and begin call-with-current-continuation ' +
      'call-with-input-file call-with-output-file case cond define ' +
      'define-syntax delay do dynamic-wind else for-each if lambda let let* ' +
      'let-syntax letrec letrec-syntax map or syntax-rules \' * + , ,@ - ... / ' +
      '; < <= = => > >= ` abs acos angle append apply asin assoc assq assv atan ' +
      'boolean? caar cadr call-with-input-file call-with-output-file ' +
      'call-with-values car cdddar cddddr cdr ceiling char->integer ' +
      'char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? ' +
      'char-downcase char-lower-case? char-numeric? char-ready? char-upcase ' +
      'char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? ' +
      'char? close-input-port close-output-port complex? cons cos ' +
      'current-input-port current-output-port denominator display eof-object? ' +
      'eq? equal? eqv? eval even? exact->inexact exact? exp expt floor ' +
      'force gcd imag-part inexact->exact inexact? input-port? integer->char ' +
      'integer? interaction-environment lcm length list list->string ' +
      'list->vector list-ref list-tail list? load log magnitude make-polar ' +
      'make-rectangular make-string make-vector max member memq memv min ' +
      'modulo negative? newline not null-environment null? number->string ' +
      'number? numerator odd? open-input-file open-output-file output-port? ' +
      'pair? peek-char port? positive? procedure? quasiquote quote quotient ' +
      'rational? rationalize read read-char real-part real? remainder reverse ' +
      'round scheme-report-environment set! set-car! set-cdr! sin sqrt string ' +
      'string->list string->number string->symbol string-append string-ci<=? ' +
      'string-ci<? string-ci=? string-ci>=? string-ci>? string-copy ' +
      'string-fill! string-length string-ref string-set! string<=? string<? ' +
      'string=? string>=? string>? string? substring symbol->string symbol? ' +
      'tan transcript-off transcript-on truncate values vector ' +
      'vector->list vector-fill! vector-length vector-ref vector-set! ' +
      'with-input-from-file with-output-to-file write write-char zero?'
  };

  var LITERAL = {
    className: 'literal',
    begin: '(#t|#f|#\\\\' + SCHEME_IDENT_RE + '|#\\\\.)'
  };

  var NUMBER = {
    className: 'number',
    variants: [
      { begin: SCHEME_SIMPLE_NUMBER_RE, relevance: 0 },
      { begin: SCHEME_COMPLEX_NUMBER_RE, relevance: 0 },
      { begin: '#b[0-1]+(/[0-1]+)?' },
      { begin: '#o[0-7]+(/[0-7]+)?' },
      { begin: '#x[0-9a-f]+(/[0-9a-f]+)?' }
    ]
  };

  var STRING = hljs.QUOTE_STRING_MODE;

  var COMMENT_MODES = [
    hljs.COMMENT(
      ';',
      '$',
      {
        relevance: 0
      }
    ),
    hljs.COMMENT('#\\|', '\\|#')
  ];

  var IDENT = {
    begin: SCHEME_IDENT_RE,
    relevance: 0
  };

  var QUOTED_IDENT = {
    className: 'symbol',
    begin: '\'' + SCHEME_IDENT_RE
  };

  var BODY = {
    endsWithParent: true,
    relevance: 0
  };

  var QUOTED_LIST = {
    variants: [
      { begin: /'/ },
      { begin: '`' }
    ],
    contains: [
      {
        begin: '\\(', end: '\\)',
        contains: ['self', LITERAL, STRING, NUMBER, IDENT, QUOTED_IDENT]
      }
    ]
  };

  var NAME = {
    className: 'name',
    relevance: 0,
    begin: SCHEME_IDENT_RE,
    keywords: KEYWORDS
  };

  var LAMBDA = {
    begin: /lambda/, endsWithParent: true, returnBegin: true,
    contains: [
      NAME,
      {
        begin: /\(/, end: /\)/, endsParent: true,
        contains: [IDENT],
      }
    ]
  };

  var LIST = {
    variants: [
      { begin: '\\(', end: '\\)' },
      { begin: '\\[', end: '\\]' }
    ],
    contains: [LAMBDA, NAME, BODY]
  };

  BODY.contains = [LITERAL, NUMBER, STRING, IDENT, QUOTED_IDENT, QUOTED_LIST, LIST].concat(COMMENT_MODES);

  return {
    name: 'Scheme',
    illegal: /\S/,
    contains: [hljs.SHEBANG(), NUMBER, STRING, QUOTED_IDENT, QUOTED_LIST, LIST].concat(COMMENT_MODES)
  };
}

module.exports = scheme;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/scilab.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/scilab.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Scilab
Author: Sylvestre Ledru <sylvestre.ledru@scilab-enterprises.com>
Origin: matlab.js
Description: Scilab is a port from Matlab
Website: https://www.scilab.org
Category: scientific
*/

function scilab(hljs) {
  const COMMON_CONTAINS = [
    hljs.C_NUMBER_MODE,
    {
      className: 'string',
      begin: '\'|\"',
      end: '\'|\"',
      contains: [ hljs.BACKSLASH_ESCAPE,
        {
          begin: '\'\''
        } ]
    }
  ];

  return {
    name: 'Scilab',
    aliases: [ 'sci' ],
    keywords: {
      $pattern: /%?\w+/,
      keyword: 'abort break case clear catch continue do elseif else endfunction end for function ' +
        'global if pause return resume select try then while',
      literal:
        '%f %F %t %T %pi %eps %inf %nan %e %i %z %s',
      built_in: // Scilab has more than 2000 functions. Just list the most commons
       'abs and acos asin atan ceil cd chdir clearglobal cosh cos cumprod deff disp error ' +
       'exec execstr exists exp eye gettext floor fprintf fread fsolve imag isdef isempty ' +
       'isinfisnan isvector lasterror length load linspace list listfiles log10 log2 log ' +
       'max min msprintf mclose mopen ones or pathconvert poly printf prod pwd rand real ' +
       'round sinh sin size gsort sprintf sqrt strcat strcmps tring sum system tanh tan ' +
       'type typename warning zeros matrix'
    },
    illegal: '("|#|/\\*|\\s+/\\w+)',
    contains: [
      {
        className: 'function',
        beginKeywords: 'function',
        end: '$',
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'params',
            begin: '\\(',
            end: '\\)'
          }
        ]
      },
      {
        begin: '[a-zA-Z_][a-zA-Z_0-9]*(\'+[\\.\']*|[\\.\']+)',
        end: '',
        relevance: 0
      },
      {
        begin: '\\[',
        end: '\\]\'*[\\.\']*',
        relevance: 0,
        contains: COMMON_CONTAINS
      },
      hljs.COMMENT('//', '$')
    ].concat(COMMON_CONTAINS)
  };
}

module.exports = scilab;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/scss.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/scss.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: SCSS
Description: Scss is an extension of the syntax of CSS.
Author: Kurt Emch <kurt@kurtemch.com>
Website: https://sass-lang.com
Category: common, css
*/
function scss(hljs) {
  var AT_IDENTIFIER = '@[a-z-]+'; // @font-face
  var AT_MODIFIERS = "and or not only";
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var VARIABLE = {
    className: 'variable',
    begin: '(\\$' + IDENT_RE + ')\\b'
  };
  var HEXCOLOR = {
    className: 'number', begin: '#[0-9A-Fa-f]+'
  };
  var DEF_INTERNALS = {
    className: 'attribute',
    begin: '[A-Z\\_\\.\\-]+', end: ':',
    excludeEnd: true,
    illegal: '[^\\s]',
    starts: {
      endsWithParent: true, excludeEnd: true,
      contains: [
        HEXCOLOR,
        hljs.CSS_NUMBER_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.APOS_STRING_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        {
          className: 'meta', begin: '!important'
        }
      ]
    }
  };
  return {
    name: 'SCSS',
    case_insensitive: true,
    illegal: '[=/|\']',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'selector-id', begin: '#[A-Za-z0-9_-]+',
        relevance: 0
      },
      {
        className: 'selector-class', begin: '\\.[A-Za-z0-9_-]+',
        relevance: 0
      },
      {
        className: 'selector-attr', begin: '\\[', end: '\\]',
        illegal: '$'
      },
      {
        className: 'selector-tag', // begin: IDENT_RE, end: '[,|\\s]'
        begin: '\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b',
        relevance: 0
      },
      {
        className: 'selector-pseudo',
        begin: ':(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)'
      },
      {
        className: 'selector-pseudo',
        begin: '::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)'
      },
      VARIABLE,
      {
        className: 'attribute',
        begin: '\\b(src|z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b',
        illegal: '[^\\s]'
      },
      {
        begin: '\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b'
      },
      {
        begin: ':', end: ';',
        contains: [
          VARIABLE,
          HEXCOLOR,
          hljs.CSS_NUMBER_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          {
            className: 'meta', begin: '!important'
          }
        ]
      },
      // matching these here allows us to treat them more like regular CSS
      // rules so everything between the {} gets regular rule highlighting,
      // which is what we want for page and font-face
      {
        begin: '@(page|font-face)',
        lexemes: AT_IDENTIFIER,
        keywords: '@page @font-face'
      },
      {
        begin: '@', end: '[{;]',
        returnBegin: true,
        keywords: AT_MODIFIERS,
        contains: [
          {
            begin: AT_IDENTIFIER,
            className: "keyword"
          },
          VARIABLE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          HEXCOLOR,
          hljs.CSS_NUMBER_MODE,
          // {
          //   begin: '\\s[A-Za-z0-9_.-]+',
          //   relevance: 0
          // }
        ]
      }
    ]
  };
}

module.exports = scss;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/shell.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/shell.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Shell Session
Requires: bash.js
Author: TSUYUSATO Kitsune <make.just.on@gmail.com>
Category: common
Audit: 2020
*/

/** @type LanguageFn */
function shell(hljs) {
  return {
    name: 'Shell Session',
    aliases: [ 'console' ],
    contains: [
      {
        className: 'meta',
        // We cannot add \s (spaces) in the regular expression otherwise it will be too broad and produce unexpected result.
        // For instance, in the following example, it would match "echo /path/to/home >" as a prompt:
        // echo /path/to/home > t.exe
        begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#]/,
        starts: {
          end: /[^\\](?=\s*$)/,
          subLanguage: 'bash'
        }
      }
    ]
  };
}

module.exports = shell;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/smali.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/smali.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Smali
Author: Dennis Titze <dennis.titze@gmail.com>
Description: Basic Smali highlighting
Website: https://github.com/JesusFreke/smali
*/

function smali(hljs) {
  const smali_instr_low_prio = [
    'add',
    'and',
    'cmp',
    'cmpg',
    'cmpl',
    'const',
    'div',
    'double',
    'float',
    'goto',
    'if',
    'int',
    'long',
    'move',
    'mul',
    'neg',
    'new',
    'nop',
    'not',
    'or',
    'rem',
    'return',
    'shl',
    'shr',
    'sput',
    'sub',
    'throw',
    'ushr',
    'xor'
  ];
  const smali_instr_high_prio = [
    'aget',
    'aput',
    'array',
    'check',
    'execute',
    'fill',
    'filled',
    'goto/16',
    'goto/32',
    'iget',
    'instance',
    'invoke',
    'iput',
    'monitor',
    'packed',
    'sget',
    'sparse'
  ];
  const smali_keywords = [
    'transient',
    'constructor',
    'abstract',
    'final',
    'synthetic',
    'public',
    'private',
    'protected',
    'static',
    'bridge',
    'system'
  ];
  return {
    name: 'Smali',
    aliases: [ 'smali' ],
    contains: [
      {
        className: 'string',
        begin: '"',
        end: '"',
        relevance: 0
      },
      hljs.COMMENT(
        '#',
        '$',
        {
          relevance: 0
        }
      ),
      {
        className: 'keyword',
        variants: [
          {
            begin: '\\s*\\.end\\s[a-zA-Z0-9]*'
          },
          {
            begin: '^[ ]*\\.[a-zA-Z]*',
            relevance: 0
          },
          {
            begin: '\\s:[a-zA-Z_0-9]*',
            relevance: 0
          },
          {
            begin: '\\s(' + smali_keywords.join('|') + ')'
          }
        ]
      },
      {
        className: 'built_in',
        variants: [
          {
            begin: '\\s(' + smali_instr_low_prio.join('|') + ')\\s'
          },
          {
            begin: '\\s(' + smali_instr_low_prio.join('|') + ')((-|/)[a-zA-Z0-9]+)+\\s',
            relevance: 10
          },
          {
            begin: '\\s(' + smali_instr_high_prio.join('|') + ')((-|/)[a-zA-Z0-9]+)*\\s',
            relevance: 10
          }
        ]
      },
      {
        className: 'class',
        begin: 'L[^\(;:\n]*;',
        relevance: 0
      },
      {
        begin: '[vp][0-9]+'
      }
    ]
  };
}

module.exports = smali;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/smalltalk.js":
/*!************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/smalltalk.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Smalltalk
Description: Smalltalk is an object-oriented, dynamically typed reflective programming language.
Author: Vladimir Gubarkov <xonixx@gmail.com>
Website: https://en.wikipedia.org/wiki/Smalltalk
*/

function smalltalk(hljs) {
  const VAR_IDENT_RE = '[a-z][a-zA-Z0-9_]*';
  const CHAR = {
    className: 'string',
    begin: '\\$.{1}'
  };
  const SYMBOL = {
    className: 'symbol',
    begin: '#' + hljs.UNDERSCORE_IDENT_RE
  };
  return {
    name: 'Smalltalk',
    aliases: [ 'st' ],
    keywords: 'self super nil true false thisContext', // only 6
    contains: [
      hljs.COMMENT('"', '"'),
      hljs.APOS_STRING_MODE,
      {
        className: 'type',
        begin: '\\b[A-Z][A-Za-z0-9_]*',
        relevance: 0
      },
      {
        begin: VAR_IDENT_RE + ':',
        relevance: 0
      },
      hljs.C_NUMBER_MODE,
      SYMBOL,
      CHAR,
      {
        // This looks more complicated than needed to avoid combinatorial
        // explosion under V8. It effectively means `| var1 var2 ... |` with
        // whitespace adjacent to `|` being optional.
        begin: '\\|[ ]*' + VAR_IDENT_RE + '([ ]+' + VAR_IDENT_RE + ')*[ ]*\\|',
        returnBegin: true,
        end: /\|/,
        illegal: /\S/,
        contains: [ {
          begin: '(\\|[ ]*)?' + VAR_IDENT_RE
        } ]
      },
      {
        begin: '#\\(',
        end: '\\)',
        contains: [
          hljs.APOS_STRING_MODE,
          CHAR,
          hljs.C_NUMBER_MODE,
          SYMBOL
        ]
      }
    ]
  };
}

module.exports = smalltalk;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/sml.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/sml.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: SML (Standard ML)
Author: Edwin Dalorzo <edwin@dalorzo.org>
Description: SML language definition.
Website: https://www.smlnj.org
Origin: ocaml.js
Category: functional
*/
function sml(hljs) {
  return {
    name: 'SML (Standard ML)',
    aliases: [ 'ml' ],
    keywords: {
      $pattern: '[a-z_]\\w*!?',
      keyword:
        /* according to Definition of Standard ML 97  */
        'abstype and andalso as case datatype do else end eqtype ' +
        'exception fn fun functor handle if in include infix infixr ' +
        'let local nonfix of op open orelse raise rec sharing sig ' +
        'signature struct structure then type val with withtype where while',
      built_in:
        /* built-in types according to basis library */
        'array bool char exn int list option order real ref string substring vector unit word',
      literal:
        'true false NONE SOME LESS EQUAL GREATER nil'
    },
    illegal: /\/\/|>>/,
    contains: [
      {
        className: 'literal',
        begin: /\[(\|\|)?\]|\(\)/,
        relevance: 0
      },
      hljs.COMMENT(
        '\\(\\*',
        '\\*\\)',
        {
          contains: [ 'self' ]
        }
      ),
      { /* type variable */
        className: 'symbol',
        begin: '\'[A-Za-z_](?!\')[\\w\']*'
        /* the grammar is ambiguous on how 'a'b should be interpreted but not the compiler */
      },
      { /* polymorphic variant */
        className: 'type',
        begin: '`[A-Z][\\w\']*'
      },
      { /* module or constructor */
        className: 'type',
        begin: '\\b[A-Z][\\w\']*',
        relevance: 0
      },
      { /* don't color identifiers, but safely catch all identifiers with ' */
        begin: '[a-z_]\\w*\'[\\w\']*'
      },
      hljs.inherit(hljs.APOS_STRING_MODE, {
        className: 'string',
        relevance: 0
      }),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        illegal: null
      }),
      {
        className: 'number',
        begin:
          '\\b(0[xX][a-fA-F0-9_]+[Lln]?|' +
          '0[oO][0-7_]+[Lln]?|' +
          '0[bB][01_]+[Lln]?|' +
          '[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)',
        relevance: 0
      },
      {
        begin: /[-=]>/ // relevance booster
      }
    ]
  };
}

module.exports = sml;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/sqf.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/sqf.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: SQF
Author: Søren Enevoldsen <senevoldsen90@gmail.com>
Contributors: Marvin Saignat <contact@zgmrvn.com>, Dedmen Miller <dedmen@dedmen.de>
Description: Scripting language for the Arma game series
Website: https://community.bistudio.com/wiki/SQF_syntax
Category: scripting
*/

function sqf(hljs) {
  // In SQF, a variable start with _
  const VARIABLE = {
    className: 'variable',
    begin: /\b_+[a-zA-Z_]\w*/
  };

  // In SQF, a function should fit myTag_fnc_myFunction pattern
  // https://community.bistudio.com/wiki/Functions_Library_(Arma_3)#Adding_a_Function
  const FUNCTION = {
    className: 'title',
    begin: /[a-zA-Z][a-zA-Z0-9]+_fnc_\w*/
  };

  // In SQF strings, quotes matching the start are escaped by adding a consecutive.
  // Example of single escaped quotes: " "" " and  ' '' '.
  const STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '"',
        end: '"',
        contains: [ {
          begin: '""',
          relevance: 0
        } ]
      },
      {
        begin: '\'',
        end: '\'',
        contains: [ {
          begin: '\'\'',
          relevance: 0
        } ]
      }
    ]
  };

  // list of keywords from:
  // https://community.bistudio.com/wiki/PreProcessor_Commands
  const PREPROCESSOR = {
    className: 'meta',
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: {
      'meta-keyword':
        'define undef ifdef ifndef else endif include'
    },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      hljs.inherit(STRINGS, {
        className: 'meta-string'
      }),
      {
        className: 'meta-string',
        begin: /<[^\n>]*>/,
        end: /$/,
        illegal: '\\n'
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  return {
    name: 'SQF',
    aliases: [ 'sqf' ],
    case_insensitive: true,
    keywords: {
      keyword:
        'case catch default do else exit exitWith for forEach from if ' +
        'private switch then throw to try waitUntil while with',
      built_in:
        'abs accTime acos action actionIDs actionKeys actionKeysImages actionKeysNames ' +
        'actionKeysNamesArray actionName actionParams activateAddons activatedAddons activateKey ' +
        'add3DENConnection add3DENEventHandler add3DENLayer addAction addBackpack addBackpackCargo ' +
        'addBackpackCargoGlobal addBackpackGlobal addCamShake addCuratorAddons addCuratorCameraArea ' +
        'addCuratorEditableObjects addCuratorEditingArea addCuratorPoints addEditorObject addEventHandler ' +
        'addForce addGoggles addGroupIcon addHandgunItem addHeadgear addItem addItemCargo ' +
        'addItemCargoGlobal addItemPool addItemToBackpack addItemToUniform addItemToVest addLiveStats ' +
        'addMagazine addMagazineAmmoCargo addMagazineCargo addMagazineCargoGlobal addMagazineGlobal ' +
        'addMagazinePool addMagazines addMagazineTurret addMenu addMenuItem addMissionEventHandler ' +
        'addMPEventHandler addMusicEventHandler addOwnedMine addPlayerScores addPrimaryWeaponItem ' +
        'addPublicVariableEventHandler addRating addResources addScore addScoreSide addSecondaryWeaponItem ' +
        'addSwitchableUnit addTeamMember addToRemainsCollector addTorque addUniform addVehicle addVest ' +
        'addWaypoint addWeapon addWeaponCargo addWeaponCargoGlobal addWeaponGlobal addWeaponItem ' +
        'addWeaponPool addWeaponTurret admin agent agents AGLToASL aimedAtTarget aimPos airDensityRTD ' +
        'airplaneThrottle airportSide AISFinishHeal alive all3DENEntities allAirports allControls ' +
        'allCurators allCutLayers allDead allDeadMen allDisplays allGroups allMapMarkers allMines ' +
        'allMissionObjects allow3DMode allowCrewInImmobile allowCuratorLogicIgnoreAreas allowDamage ' +
        'allowDammage allowFileOperations allowFleeing allowGetIn allowSprint allPlayers allSimpleObjects ' +
        'allSites allTurrets allUnits allUnitsUAV allVariables ammo ammoOnPylon and animate animateBay ' +
        'animateDoor animatePylon animateSource animationNames animationPhase animationSourcePhase ' +
        'animationState append apply armoryPoints arrayIntersect asin ASLToAGL ASLToATL assert ' +
        'assignAsCargo assignAsCargoIndex assignAsCommander assignAsDriver assignAsGunner assignAsTurret ' +
        'assignCurator assignedCargo assignedCommander assignedDriver assignedGunner assignedItems ' +
        'assignedTarget assignedTeam assignedVehicle assignedVehicleRole assignItem assignTeam ' +
        'assignToAirport atan atan2 atg ATLToASL attachedObject attachedObjects attachedTo attachObject ' +
        'attachTo attackEnabled backpack backpackCargo backpackContainer backpackItems backpackMagazines ' +
        'backpackSpaceFor behaviour benchmark binocular boundingBox boundingBoxReal boundingCenter ' +
        'breakOut breakTo briefingName buildingExit buildingPos buttonAction buttonSetAction cadetMode ' +
        'call callExtension camCommand camCommit camCommitPrepared camCommitted camConstuctionSetParams ' +
        'camCreate camDestroy cameraEffect cameraEffectEnableHUD cameraInterest cameraOn cameraView ' +
        'campaignConfigFile camPreload camPreloaded camPrepareBank camPrepareDir camPrepareDive ' +
        'camPrepareFocus camPrepareFov camPrepareFovRange camPreparePos camPrepareRelPos camPrepareTarget ' +
        'camSetBank camSetDir camSetDive camSetFocus camSetFov camSetFovRange camSetPos camSetRelPos ' +
        'camSetTarget camTarget camUseNVG canAdd canAddItemToBackpack canAddItemToUniform canAddItemToVest ' +
        'cancelSimpleTaskDestination canFire canMove canSlingLoad canStand canSuspend ' +
        'canTriggerDynamicSimulation canUnloadInCombat canVehicleCargo captive captiveNum cbChecked ' +
        'cbSetChecked ceil channelEnabled cheatsEnabled checkAIFeature checkVisibility className ' +
        'clearAllItemsFromBackpack clearBackpackCargo clearBackpackCargoGlobal clearGroupIcons ' +
        'clearItemCargo clearItemCargoGlobal clearItemPool clearMagazineCargo clearMagazineCargoGlobal ' +
        'clearMagazinePool clearOverlay clearRadio clearWeaponCargo clearWeaponCargoGlobal clearWeaponPool ' +
        'clientOwner closeDialog closeDisplay closeOverlay collapseObjectTree collect3DENHistory ' +
        'collectiveRTD combatMode commandArtilleryFire commandChat commander commandFire commandFollow ' +
        'commandFSM commandGetOut commandingMenu commandMove commandRadio commandStop ' +
        'commandSuppressiveFire commandTarget commandWatch comment commitOverlay compile compileFinal ' +
        'completedFSM composeText configClasses configFile configHierarchy configName configProperties ' +
        'configSourceAddonList configSourceMod configSourceModList confirmSensorTarget ' +
        'connectTerminalToUAV controlsGroupCtrl copyFromClipboard copyToClipboard copyWaypoints cos count ' +
        'countEnemy countFriendly countSide countType countUnknown create3DENComposition create3DENEntity ' +
        'createAgent createCenter createDialog createDiaryLink createDiaryRecord createDiarySubject ' +
        'createDisplay createGearDialog createGroup createGuardedPoint createLocation createMarker ' +
        'createMarkerLocal createMenu createMine createMissionDisplay createMPCampaignDisplay ' +
        'createSimpleObject createSimpleTask createSite createSoundSource createTask createTeam ' +
        'createTrigger createUnit createVehicle createVehicleCrew createVehicleLocal crew ctAddHeader ' +
        'ctAddRow ctClear ctCurSel ctData ctFindHeaderRows ctFindRowHeader ctHeaderControls ctHeaderCount ' +
        'ctRemoveHeaders ctRemoveRows ctrlActivate ctrlAddEventHandler ctrlAngle ctrlAutoScrollDelay ' +
        'ctrlAutoScrollRewind ctrlAutoScrollSpeed ctrlChecked ctrlClassName ctrlCommit ctrlCommitted ' +
        'ctrlCreate ctrlDelete ctrlEnable ctrlEnabled ctrlFade ctrlHTMLLoaded ctrlIDC ctrlIDD ' +
        'ctrlMapAnimAdd ctrlMapAnimClear ctrlMapAnimCommit ctrlMapAnimDone ctrlMapCursor ctrlMapMouseOver ' +
        'ctrlMapScale ctrlMapScreenToWorld ctrlMapWorldToScreen ctrlModel ctrlModelDirAndUp ctrlModelScale ' +
        'ctrlParent ctrlParentControlsGroup ctrlPosition ctrlRemoveAllEventHandlers ctrlRemoveEventHandler ' +
        'ctrlScale ctrlSetActiveColor ctrlSetAngle ctrlSetAutoScrollDelay ctrlSetAutoScrollRewind ' +
        'ctrlSetAutoScrollSpeed ctrlSetBackgroundColor ctrlSetChecked ctrlSetEventHandler ctrlSetFade ' +
        'ctrlSetFocus ctrlSetFont ctrlSetFontH1 ctrlSetFontH1B ctrlSetFontH2 ctrlSetFontH2B ctrlSetFontH3 ' +
        'ctrlSetFontH3B ctrlSetFontH4 ctrlSetFontH4B ctrlSetFontH5 ctrlSetFontH5B ctrlSetFontH6 ' +
        'ctrlSetFontH6B ctrlSetFontHeight ctrlSetFontHeightH1 ctrlSetFontHeightH2 ctrlSetFontHeightH3 ' +
        'ctrlSetFontHeightH4 ctrlSetFontHeightH5 ctrlSetFontHeightH6 ctrlSetFontHeightSecondary ' +
        'ctrlSetFontP ctrlSetFontPB ctrlSetFontSecondary ctrlSetForegroundColor ctrlSetModel ' +
        'ctrlSetModelDirAndUp ctrlSetModelScale ctrlSetPixelPrecision ctrlSetPosition ctrlSetScale ' +
        'ctrlSetStructuredText ctrlSetText ctrlSetTextColor ctrlSetTooltip ctrlSetTooltipColorBox ' +
        'ctrlSetTooltipColorShade ctrlSetTooltipColorText ctrlShow ctrlShown ctrlText ctrlTextHeight ' +
        'ctrlTextWidth ctrlType ctrlVisible ctRowControls ctRowCount ctSetCurSel ctSetData ' +
        'ctSetHeaderTemplate ctSetRowTemplate ctSetValue ctValue curatorAddons curatorCamera ' +
        'curatorCameraArea curatorCameraAreaCeiling curatorCoef curatorEditableObjects curatorEditingArea ' +
        'curatorEditingAreaType curatorMouseOver curatorPoints curatorRegisteredObjects curatorSelected ' +
        'curatorWaypointCost current3DENOperation currentChannel currentCommand currentMagazine ' +
        'currentMagazineDetail currentMagazineDetailTurret currentMagazineTurret currentMuzzle ' +
        'currentNamespace currentTask currentTasks currentThrowable currentVisionMode currentWaypoint ' +
        'currentWeapon currentWeaponMode currentWeaponTurret currentZeroing cursorObject cursorTarget ' +
        'customChat customRadio cutFadeOut cutObj cutRsc cutText damage date dateToNumber daytime ' +
        'deActivateKey debriefingText debugFSM debugLog deg delete3DENEntities deleteAt deleteCenter ' +
        'deleteCollection deleteEditorObject deleteGroup deleteGroupWhenEmpty deleteIdentity ' +
        'deleteLocation deleteMarker deleteMarkerLocal deleteRange deleteResources deleteSite deleteStatus ' +
        'deleteTeam deleteVehicle deleteVehicleCrew deleteWaypoint detach detectedMines ' +
        'diag_activeMissionFSMs diag_activeScripts diag_activeSQFScripts diag_activeSQSScripts ' +
        'diag_captureFrame diag_captureFrameToFile diag_captureSlowFrame diag_codePerformance ' +
        'diag_drawMode diag_enable diag_enabled diag_fps diag_fpsMin diag_frameNo diag_lightNewLoad ' +
        'diag_list diag_log diag_logSlowFrame diag_mergeConfigFile diag_recordTurretLimits ' +
        'diag_setLightNew diag_tickTime diag_toggle dialog diarySubjectExists didJIP didJIPOwner ' +
        'difficulty difficultyEnabled difficultyEnabledRTD difficultyOption direction directSay disableAI ' +
        'disableCollisionWith disableConversation disableDebriefingStats disableMapIndicators ' +
        'disableNVGEquipment disableRemoteSensors disableSerialization disableTIEquipment ' +
        'disableUAVConnectability disableUserInput displayAddEventHandler displayCtrl displayParent ' +
        'displayRemoveAllEventHandlers displayRemoveEventHandler displaySetEventHandler dissolveTeam ' +
        'distance distance2D distanceSqr distributionRegion do3DENAction doArtilleryFire doFire doFollow ' +
        'doFSM doGetOut doMove doorPhase doStop doSuppressiveFire doTarget doWatch drawArrow drawEllipse ' +
        'drawIcon drawIcon3D drawLine drawLine3D drawLink drawLocation drawPolygon drawRectangle ' +
        'drawTriangle driver drop dynamicSimulationDistance dynamicSimulationDistanceCoef ' +
        'dynamicSimulationEnabled dynamicSimulationSystemEnabled echo edit3DENMissionAttributes editObject ' +
        'editorSetEventHandler effectiveCommander emptyPositions enableAI enableAIFeature ' +
        'enableAimPrecision enableAttack enableAudioFeature enableAutoStartUpRTD enableAutoTrimRTD ' +
        'enableCamShake enableCaustics enableChannel enableCollisionWith enableCopilot ' +
        'enableDebriefingStats enableDiagLegend enableDynamicSimulation enableDynamicSimulationSystem ' +
        'enableEndDialog enableEngineArtillery enableEnvironment enableFatigue enableGunLights ' +
        'enableInfoPanelComponent enableIRLasers enableMimics enablePersonTurret enableRadio enableReload ' +
        'enableRopeAttach enableSatNormalOnDetail enableSaving enableSentences enableSimulation ' +
        'enableSimulationGlobal enableStamina enableTeamSwitch enableTraffic enableUAVConnectability ' +
        'enableUAVWaypoints enableVehicleCargo enableVehicleSensor enableWeaponDisassembly ' +
        'endLoadingScreen endMission engineOn enginesIsOnRTD enginesRpmRTD enginesTorqueRTD entities ' +
        'environmentEnabled estimatedEndServerTime estimatedTimeLeft evalObjectArgument everyBackpack ' +
        'everyContainer exec execEditorScript execFSM execVM exp expectedDestination exportJIPMessages ' +
        'eyeDirection eyePos face faction fadeMusic fadeRadio fadeSound fadeSpeech failMission ' +
        'fillWeaponsFromPool find findCover findDisplay findEditorObject findEmptyPosition ' +
        'findEmptyPositionReady findIf findNearestEnemy finishMissionInit finite fire fireAtTarget ' +
        'firstBackpack flag flagAnimationPhase flagOwner flagSide flagTexture fleeing floor flyInHeight ' +
        'flyInHeightASL fog fogForecast fogParams forceAddUniform forcedMap forceEnd forceFlagTexture ' +
        'forceFollowRoad forceMap forceRespawn forceSpeed forceWalk forceWeaponFire forceWeatherChange ' +
        'forEachMember forEachMemberAgent forEachMemberTeam forgetTarget format formation ' +
        'formationDirection formationLeader formationMembers formationPosition formationTask formatText ' +
        'formLeader freeLook fromEditor fuel fullCrew gearIDCAmmoCount gearSlotAmmoCount gearSlotData ' +
        'get3DENActionState get3DENAttribute get3DENCamera get3DENConnections get3DENEntity ' +
        'get3DENEntityID get3DENGrid get3DENIconsVisible get3DENLayerEntities get3DENLinesVisible ' +
        'get3DENMissionAttribute get3DENMouseOver get3DENSelected getAimingCoef getAllEnvSoundControllers ' +
        'getAllHitPointsDamage getAllOwnedMines getAllSoundControllers getAmmoCargo getAnimAimPrecision ' +
        'getAnimSpeedCoef getArray getArtilleryAmmo getArtilleryComputerSettings getArtilleryETA ' +
        'getAssignedCuratorLogic getAssignedCuratorUnit getBackpackCargo getBleedingRemaining ' +
        'getBurningValue getCameraViewDirection getCargoIndex getCenterOfMass getClientState ' +
        'getClientStateNumber getCompatiblePylonMagazines getConnectedUAV getContainerMaxLoad ' +
        'getCursorObjectParams getCustomAimCoef getDammage getDescription getDir getDirVisual ' +
        'getDLCAssetsUsage getDLCAssetsUsageByName getDLCs getEditorCamera getEditorMode ' +
        'getEditorObjectScope getElevationOffset getEnvSoundController getFatigue getForcedFlagTexture ' +
        'getFriend getFSMVariable getFuelCargo getGroupIcon getGroupIconParams getGroupIcons getHideFrom ' +
        'getHit getHitIndex getHitPointDamage getItemCargo getMagazineCargo getMarkerColor getMarkerPos ' +
        'getMarkerSize getMarkerType getMass getMissionConfig getMissionConfigValue getMissionDLCs ' +
        'getMissionLayerEntities getModelInfo getMousePosition getMusicPlayedTime getNumber ' +
        'getObjectArgument getObjectChildren getObjectDLC getObjectMaterials getObjectProxy ' +
        'getObjectTextures getObjectType getObjectViewDistance getOxygenRemaining getPersonUsedDLCs ' +
        'getPilotCameraDirection getPilotCameraPosition getPilotCameraRotation getPilotCameraTarget ' +
        'getPlateNumber getPlayerChannel getPlayerScores getPlayerUID getPos getPosASL getPosASLVisual ' +
        'getPosASLW getPosATL getPosATLVisual getPosVisual getPosWorld getPylonMagazines getRelDir ' +
        'getRelPos getRemoteSensorsDisabled getRepairCargo getResolution getShadowDistance getShotParents ' +
        'getSlingLoad getSoundController getSoundControllerResult getSpeed getStamina getStatValue ' +
        'getSuppression getTerrainGrid getTerrainHeightASL getText getTotalDLCUsageTime getUnitLoadout ' +
        'getUnitTrait getUserMFDText getUserMFDvalue getVariable getVehicleCargo getWeaponCargo ' +
        'getWeaponSway getWingsOrientationRTD getWingsPositionRTD getWPPos glanceAt globalChat globalRadio ' +
        'goggles goto group groupChat groupFromNetId groupIconSelectable groupIconsVisible groupId ' +
        'groupOwner groupRadio groupSelectedUnits groupSelectUnit gunner gusts halt handgunItems ' +
        'handgunMagazine handgunWeapon handsHit hasInterface hasPilotCamera hasWeapon hcAllGroups ' +
        'hcGroupParams hcLeader hcRemoveAllGroups hcRemoveGroup hcSelected hcSelectGroup hcSetGroup ' +
        'hcShowBar hcShownBar headgear hideBody hideObject hideObjectGlobal hideSelection hint hintC ' +
        'hintCadet hintSilent hmd hostMission htmlLoad HUDMovementLevels humidity image importAllGroups ' +
        'importance in inArea inAreaArray incapacitatedState inflame inflamed infoPanel ' +
        'infoPanelComponentEnabled infoPanelComponents infoPanels inGameUISetEventHandler inheritsFrom ' +
        'initAmbientLife inPolygon inputAction inRangeOfArtillery insertEditorObject intersect is3DEN ' +
        'is3DENMultiplayer isAbleToBreathe isAgent isArray isAutoHoverOn isAutonomous isAutotest ' +
        'isBleeding isBurning isClass isCollisionLightOn isCopilotEnabled isDamageAllowed isDedicated ' +
        'isDLCAvailable isEngineOn isEqualTo isEqualType isEqualTypeAll isEqualTypeAny isEqualTypeArray ' +
        'isEqualTypeParams isFilePatchingEnabled isFlashlightOn isFlatEmpty isForcedWalk isFormationLeader ' +
        'isGroupDeletedWhenEmpty isHidden isInRemainsCollector isInstructorFigureEnabled isIRLaserOn ' +
        'isKeyActive isKindOf isLaserOn isLightOn isLocalized isManualFire isMarkedForCollection ' +
        'isMultiplayer isMultiplayerSolo isNil isNull isNumber isObjectHidden isObjectRTD isOnRoad ' +
        'isPipEnabled isPlayer isRealTime isRemoteExecuted isRemoteExecutedJIP isServer isShowing3DIcons ' +
        'isSimpleObject isSprintAllowed isStaminaEnabled isSteamMission isStreamFriendlyUIEnabled isText ' +
        'isTouchingGround isTurnedOut isTutHintsEnabled isUAVConnectable isUAVConnected isUIContext ' +
        'isUniformAllowed isVehicleCargo isVehicleRadarOn isVehicleSensorEnabled isWalking ' +
        'isWeaponDeployed isWeaponRested itemCargo items itemsWithMagazines join joinAs joinAsSilent ' +
        'joinSilent joinString kbAddDatabase kbAddDatabaseTargets kbAddTopic kbHasTopic kbReact ' +
        'kbRemoveTopic kbTell kbWasSaid keyImage keyName knowsAbout land landAt landResult language ' +
        'laserTarget lbAdd lbClear lbColor lbColorRight lbCurSel lbData lbDelete lbIsSelected lbPicture ' +
        'lbPictureRight lbSelection lbSetColor lbSetColorRight lbSetCurSel lbSetData lbSetPicture ' +
        'lbSetPictureColor lbSetPictureColorDisabled lbSetPictureColorSelected lbSetPictureRight ' +
        'lbSetPictureRightColor lbSetPictureRightColorDisabled lbSetPictureRightColorSelected ' +
        'lbSetSelectColor lbSetSelectColorRight lbSetSelected lbSetText lbSetTextRight lbSetTooltip ' +
        'lbSetValue lbSize lbSort lbSortByValue lbText lbTextRight lbValue leader leaderboardDeInit ' +
        'leaderboardGetRows leaderboardInit leaderboardRequestRowsFriends leaderboardsRequestUploadScore ' +
        'leaderboardsRequestUploadScoreKeepBest leaderboardState leaveVehicle libraryCredits ' +
        'libraryDisclaimers lifeState lightAttachObject lightDetachObject lightIsOn lightnings limitSpeed ' +
        'linearConversion lineIntersects lineIntersectsObjs lineIntersectsSurfaces lineIntersectsWith ' +
        'linkItem list listObjects listRemoteTargets listVehicleSensors ln lnbAddArray lnbAddColumn ' +
        'lnbAddRow lnbClear lnbColor lnbCurSelRow lnbData lnbDeleteColumn lnbDeleteRow ' +
        'lnbGetColumnsPosition lnbPicture lnbSetColor lnbSetColumnsPos lnbSetCurSelRow lnbSetData ' +
        'lnbSetPicture lnbSetText lnbSetValue lnbSize lnbSort lnbSortByValue lnbText lnbValue load loadAbs ' +
        'loadBackpack loadFile loadGame loadIdentity loadMagazine loadOverlay loadStatus loadUniform ' +
        'loadVest local localize locationPosition lock lockCameraTo lockCargo lockDriver locked ' +
        'lockedCargo lockedDriver lockedTurret lockIdentity lockTurret lockWP log logEntities logNetwork ' +
        'logNetworkTerminate lookAt lookAtPos magazineCargo magazines magazinesAllTurrets magazinesAmmo ' +
        'magazinesAmmoCargo magazinesAmmoFull magazinesDetail magazinesDetailBackpack ' +
        'magazinesDetailUniform magazinesDetailVest magazinesTurret magazineTurretAmmo mapAnimAdd ' +
        'mapAnimClear mapAnimCommit mapAnimDone mapCenterOnCamera mapGridPosition markAsFinishedOnSteam ' +
        'markerAlpha markerBrush markerColor markerDir markerPos markerShape markerSize markerText ' +
        'markerType max members menuAction menuAdd menuChecked menuClear menuCollapse menuData menuDelete ' +
        'menuEnable menuEnabled menuExpand menuHover menuPicture menuSetAction menuSetCheck menuSetData ' +
        'menuSetPicture menuSetValue menuShortcut menuShortcutText menuSize menuSort menuText menuURL ' +
        'menuValue min mineActive mineDetectedBy missionConfigFile missionDifficulty missionName ' +
        'missionNamespace missionStart missionVersion mod modelToWorld modelToWorldVisual ' +
        'modelToWorldVisualWorld modelToWorldWorld modParams moonIntensity moonPhase morale move ' +
        'move3DENCamera moveInAny moveInCargo moveInCommander moveInDriver moveInGunner moveInTurret ' +
        'moveObjectToEnd moveOut moveTime moveTo moveToCompleted moveToFailed musicVolume name nameSound ' +
        'nearEntities nearestBuilding nearestLocation nearestLocations nearestLocationWithDubbing ' +
        'nearestObject nearestObjects nearestTerrainObjects nearObjects nearObjectsReady nearRoads ' +
        'nearSupplies nearTargets needReload netId netObjNull newOverlay nextMenuItemIndex ' +
        'nextWeatherChange nMenuItems not numberOfEnginesRTD numberToDate objectCurators objectFromNetId ' +
        'objectParent objStatus onBriefingGroup onBriefingNotes onBriefingPlan onBriefingTeamSwitch ' +
        'onCommandModeChanged onDoubleClick onEachFrame onGroupIconClick onGroupIconOverEnter ' +
        'onGroupIconOverLeave onHCGroupSelectionChanged onMapSingleClick onPlayerConnected ' +
        'onPlayerDisconnected onPreloadFinished onPreloadStarted onShowNewObject onTeamSwitch ' +
        'openCuratorInterface openDLCPage openMap openSteamApp openYoutubeVideo or orderGetIn overcast ' +
        'overcastForecast owner param params parseNumber parseSimpleArray parseText parsingNamespace ' +
        'particlesQuality pickWeaponPool pitch pixelGrid pixelGridBase pixelGridNoUIScale pixelH pixelW ' +
        'playableSlotsNumber playableUnits playAction playActionNow player playerRespawnTime playerSide ' +
        'playersNumber playGesture playMission playMove playMoveNow playMusic playScriptedMission ' +
        'playSound playSound3D position positionCameraToWorld posScreenToWorld posWorldToScreen ' +
        'ppEffectAdjust ppEffectCommit ppEffectCommitted ppEffectCreate ppEffectDestroy ppEffectEnable ' +
        'ppEffectEnabled ppEffectForceInNVG precision preloadCamera preloadObject preloadSound ' +
        'preloadTitleObj preloadTitleRsc preprocessFile preprocessFileLineNumbers primaryWeapon ' +
        'primaryWeaponItems primaryWeaponMagazine priority processDiaryLink productVersion profileName ' +
        'profileNamespace profileNameSteam progressLoadingScreen progressPosition progressSetPosition ' +
        'publicVariable publicVariableClient publicVariableServer pushBack pushBackUnique putWeaponPool ' +
        'queryItemsPool queryMagazinePool queryWeaponPool rad radioChannelAdd radioChannelCreate ' +
        'radioChannelRemove radioChannelSetCallSign radioChannelSetLabel radioVolume rain rainbow random ' +
        'rank rankId rating rectangular registeredTasks registerTask reload reloadEnabled remoteControl ' +
        'remoteExec remoteExecCall remoteExecutedOwner remove3DENConnection remove3DENEventHandler ' +
        'remove3DENLayer removeAction removeAll3DENEventHandlers removeAllActions removeAllAssignedItems ' +
        'removeAllContainers removeAllCuratorAddons removeAllCuratorCameraAreas ' +
        'removeAllCuratorEditingAreas removeAllEventHandlers removeAllHandgunItems removeAllItems ' +
        'removeAllItemsWithMagazines removeAllMissionEventHandlers removeAllMPEventHandlers ' +
        'removeAllMusicEventHandlers removeAllOwnedMines removeAllPrimaryWeaponItems removeAllWeapons ' +
        'removeBackpack removeBackpackGlobal removeCuratorAddons removeCuratorCameraArea ' +
        'removeCuratorEditableObjects removeCuratorEditingArea removeDrawIcon removeDrawLinks ' +
        'removeEventHandler removeFromRemainsCollector removeGoggles removeGroupIcon removeHandgunItem ' +
        'removeHeadgear removeItem removeItemFromBackpack removeItemFromUniform removeItemFromVest ' +
        'removeItems removeMagazine removeMagazineGlobal removeMagazines removeMagazinesTurret ' +
        'removeMagazineTurret removeMenuItem removeMissionEventHandler removeMPEventHandler ' +
        'removeMusicEventHandler removeOwnedMine removePrimaryWeaponItem removeSecondaryWeaponItem ' +
        'removeSimpleTask removeSwitchableUnit removeTeamMember removeUniform removeVest removeWeapon ' +
        'removeWeaponAttachmentCargo removeWeaponCargo removeWeaponGlobal removeWeaponTurret ' +
        'reportRemoteTarget requiredVersion resetCamShake resetSubgroupDirection resize resources ' +
        'respawnVehicle restartEditorCamera reveal revealMine reverse reversedMouseY roadAt ' +
        'roadsConnectedTo roleDescription ropeAttachedObjects ropeAttachedTo ropeAttachEnabled ' +
        'ropeAttachTo ropeCreate ropeCut ropeDestroy ropeDetach ropeEndPosition ropeLength ropes ' +
        'ropeUnwind ropeUnwound rotorsForcesRTD rotorsRpmRTD round runInitScript safeZoneH safeZoneW ' +
        'safeZoneWAbs safeZoneX safeZoneXAbs safeZoneY save3DENInventory saveGame saveIdentity ' +
        'saveJoysticks saveOverlay saveProfileNamespace saveStatus saveVar savingEnabled say say2D say3D ' +
        'scopeName score scoreSide screenshot screenToWorld scriptDone scriptName scudState ' +
        'secondaryWeapon secondaryWeaponItems secondaryWeaponMagazine select selectBestPlaces ' +
        'selectDiarySubject selectedEditorObjects selectEditorObject selectionNames selectionPosition ' +
        'selectLeader selectMax selectMin selectNoPlayer selectPlayer selectRandom selectRandomWeighted ' +
        'selectWeapon selectWeaponTurret sendAUMessage sendSimpleCommand sendTask sendTaskResult ' +
        'sendUDPMessage serverCommand serverCommandAvailable serverCommandExecutable serverName serverTime ' +
        'set set3DENAttribute set3DENAttributes set3DENGrid set3DENIconsVisible set3DENLayer ' +
        'set3DENLinesVisible set3DENLogicType set3DENMissionAttribute set3DENMissionAttributes ' +
        'set3DENModelsVisible set3DENObjectType set3DENSelected setAccTime setActualCollectiveRTD ' +
        'setAirplaneThrottle setAirportSide setAmmo setAmmoCargo setAmmoOnPylon setAnimSpeedCoef ' +
        'setAperture setApertureNew setArmoryPoints setAttributes setAutonomous setBehaviour ' +
        'setBleedingRemaining setBrakesRTD setCameraInterest setCamShakeDefParams setCamShakeParams ' +
        'setCamUseTI setCaptive setCenterOfMass setCollisionLight setCombatMode setCompassOscillation ' +
        'setConvoySeparation setCuratorCameraAreaCeiling setCuratorCoef setCuratorEditingAreaType ' +
        'setCuratorWaypointCost setCurrentChannel setCurrentTask setCurrentWaypoint setCustomAimCoef ' +
        'setCustomWeightRTD setDamage setDammage setDate setDebriefingText setDefaultCamera setDestination ' +
        'setDetailMapBlendPars setDir setDirection setDrawIcon setDriveOnPath setDropInterval ' +
        'setDynamicSimulationDistance setDynamicSimulationDistanceCoef setEditorMode setEditorObjectScope ' +
        'setEffectCondition setEngineRPMRTD setFace setFaceAnimation setFatigue setFeatureType ' +
        'setFlagAnimationPhase setFlagOwner setFlagSide setFlagTexture setFog setFormation ' +
        'setFormationTask setFormDir setFriend setFromEditor setFSMVariable setFuel setFuelCargo ' +
        'setGroupIcon setGroupIconParams setGroupIconsSelectable setGroupIconsVisible setGroupId ' +
        'setGroupIdGlobal setGroupOwner setGusts setHideBehind setHit setHitIndex setHitPointDamage ' +
        'setHorizonParallaxCoef setHUDMovementLevels setIdentity setImportance setInfoPanel setLeader ' +
        'setLightAmbient setLightAttenuation setLightBrightness setLightColor setLightDayLight ' +
        'setLightFlareMaxDistance setLightFlareSize setLightIntensity setLightnings setLightUseFlare ' +
        'setLocalWindParams setMagazineTurretAmmo setMarkerAlpha setMarkerAlphaLocal setMarkerBrush ' +
        'setMarkerBrushLocal setMarkerColor setMarkerColorLocal setMarkerDir setMarkerDirLocal ' +
        'setMarkerPos setMarkerPosLocal setMarkerShape setMarkerShapeLocal setMarkerSize ' +
        'setMarkerSizeLocal setMarkerText setMarkerTextLocal setMarkerType setMarkerTypeLocal setMass ' +
        'setMimic setMousePosition setMusicEffect setMusicEventHandler setName setNameSound ' +
        'setObjectArguments setObjectMaterial setObjectMaterialGlobal setObjectProxy setObjectTexture ' +
        'setObjectTextureGlobal setObjectViewDistance setOvercast setOwner setOxygenRemaining ' +
        'setParticleCircle setParticleClass setParticleFire setParticleParams setParticleRandom ' +
        'setPilotCameraDirection setPilotCameraRotation setPilotCameraTarget setPilotLight setPiPEffect ' +
        'setPitch setPlateNumber setPlayable setPlayerRespawnTime setPos setPosASL setPosASL2 setPosASLW ' +
        'setPosATL setPosition setPosWorld setPylonLoadOut setPylonsPriority setRadioMsg setRain ' +
        'setRainbow setRandomLip setRank setRectangular setRepairCargo setRotorBrakeRTD setShadowDistance ' +
        'setShotParents setSide setSimpleTaskAlwaysVisible setSimpleTaskCustomData ' +
        'setSimpleTaskDescription setSimpleTaskDestination setSimpleTaskTarget setSimpleTaskType ' +
        'setSimulWeatherLayers setSize setSkill setSlingLoad setSoundEffect setSpeaker setSpeech ' +
        'setSpeedMode setStamina setStaminaScheme setStatValue setSuppression setSystemOfUnits ' +
        'setTargetAge setTaskMarkerOffset setTaskResult setTaskState setTerrainGrid setText ' +
        'setTimeMultiplier setTitleEffect setTrafficDensity setTrafficDistance setTrafficGap ' +
        'setTrafficSpeed setTriggerActivation setTriggerArea setTriggerStatements setTriggerText ' +
        'setTriggerTimeout setTriggerType setType setUnconscious setUnitAbility setUnitLoadout setUnitPos ' +
        'setUnitPosWeak setUnitRank setUnitRecoilCoefficient setUnitTrait setUnloadInCombat ' +
        'setUserActionText setUserMFDText setUserMFDvalue setVariable setVectorDir setVectorDirAndUp ' +
        'setVectorUp setVehicleAmmo setVehicleAmmoDef setVehicleArmor setVehicleCargo setVehicleId ' +
        'setVehicleLock setVehiclePosition setVehicleRadar setVehicleReceiveRemoteTargets ' +
        'setVehicleReportOwnPosition setVehicleReportRemoteTargets setVehicleTIPars setVehicleVarName ' +
        'setVelocity setVelocityModelSpace setVelocityTransformation setViewDistance ' +
        'setVisibleIfTreeCollapsed setWantedRPMRTD setWaves setWaypointBehaviour setWaypointCombatMode ' +
        'setWaypointCompletionRadius setWaypointDescription setWaypointForceBehaviour setWaypointFormation ' +
        'setWaypointHousePosition setWaypointLoiterRadius setWaypointLoiterType setWaypointName ' +
        'setWaypointPosition setWaypointScript setWaypointSpeed setWaypointStatements setWaypointTimeout ' +
        'setWaypointType setWaypointVisible setWeaponReloadingTime setWind setWindDir setWindForce ' +
        'setWindStr setWingForceScaleRTD setWPPos show3DIcons showChat showCinemaBorder showCommandingMenu ' +
        'showCompass showCuratorCompass showGPS showHUD showLegend showMap shownArtilleryComputer ' +
        'shownChat shownCompass shownCuratorCompass showNewEditorObject shownGPS shownHUD shownMap ' +
        'shownPad shownRadio shownScoretable shownUAVFeed shownWarrant shownWatch showPad showRadio ' +
        'showScoretable showSubtitles showUAVFeed showWarrant showWatch showWaypoint showWaypoints side ' +
        'sideChat sideEnemy sideFriendly sideRadio simpleTasks simulationEnabled simulCloudDensity ' +
        'simulCloudOcclusion simulInClouds simulWeatherSync sin size sizeOf skill skillFinal skipTime ' +
        'sleep sliderPosition sliderRange sliderSetPosition sliderSetRange sliderSetSpeed sliderSpeed ' +
        'slingLoadAssistantShown soldierMagazines someAmmo sort soundVolume spawn speaker speed speedMode ' +
        'splitString sqrt squadParams stance startLoadingScreen step stop stopEngineRTD stopped str ' +
        'sunOrMoon supportInfo suppressFor surfaceIsWater surfaceNormal surfaceType swimInDepth ' +
        'switchableUnits switchAction switchCamera switchGesture switchLight switchMove ' +
        'synchronizedObjects synchronizedTriggers synchronizedWaypoints synchronizeObjectsAdd ' +
        'synchronizeObjectsRemove synchronizeTrigger synchronizeWaypoint systemChat systemOfUnits tan ' +
        'targetKnowledge targets targetsAggregate targetsQuery taskAlwaysVisible taskChildren ' +
        'taskCompleted taskCustomData taskDescription taskDestination taskHint taskMarkerOffset taskParent ' +
        'taskResult taskState taskType teamMember teamName teams teamSwitch teamSwitchEnabled teamType ' +
        'terminate terrainIntersect terrainIntersectASL terrainIntersectAtASL text textLog textLogFormat ' +
        'tg time timeMultiplier titleCut titleFadeOut titleObj titleRsc titleText toArray toFixed toLower ' +
        'toString toUpper triggerActivated triggerActivation triggerArea triggerAttachedVehicle ' +
        'triggerAttachObject triggerAttachVehicle triggerDynamicSimulation triggerStatements triggerText ' +
        'triggerTimeout triggerTimeoutCurrent triggerType turretLocal turretOwner turretUnit tvAdd tvClear ' +
        'tvCollapse tvCollapseAll tvCount tvCurSel tvData tvDelete tvExpand tvExpandAll tvPicture ' +
        'tvSetColor tvSetCurSel tvSetData tvSetPicture tvSetPictureColor tvSetPictureColorDisabled ' +
        'tvSetPictureColorSelected tvSetPictureRight tvSetPictureRightColor tvSetPictureRightColorDisabled ' +
        'tvSetPictureRightColorSelected tvSetText tvSetTooltip tvSetValue tvSort tvSortByValue tvText ' +
        'tvTooltip tvValue type typeName typeOf UAVControl uiNamespace uiSleep unassignCurator ' +
        'unassignItem unassignTeam unassignVehicle underwater uniform uniformContainer uniformItems ' +
        'uniformMagazines unitAddons unitAimPosition unitAimPositionVisual unitBackpack unitIsUAV unitPos ' +
        'unitReady unitRecoilCoefficient units unitsBelowHeight unlinkItem unlockAchievement ' +
        'unregisterTask updateDrawIcon updateMenuItem updateObjectTree useAISteeringComponent ' +
        'useAudioTimeForMoves userInputDisabled vectorAdd vectorCos vectorCrossProduct vectorDiff ' +
        'vectorDir vectorDirVisual vectorDistance vectorDistanceSqr vectorDotProduct vectorFromTo ' +
        'vectorMagnitude vectorMagnitudeSqr vectorModelToWorld vectorModelToWorldVisual vectorMultiply ' +
        'vectorNormalized vectorUp vectorUpVisual vectorWorldToModel vectorWorldToModelVisual vehicle ' +
        'vehicleCargoEnabled vehicleChat vehicleRadio vehicleReceiveRemoteTargets vehicleReportOwnPosition ' +
        'vehicleReportRemoteTargets vehicles vehicleVarName velocity velocityModelSpace verifySignature ' +
        'vest vestContainer vestItems vestMagazines viewDistance visibleCompass visibleGPS visibleMap ' +
        'visiblePosition visiblePositionASL visibleScoretable visibleWatch waves waypointAttachedObject ' +
        'waypointAttachedVehicle waypointAttachObject waypointAttachVehicle waypointBehaviour ' +
        'waypointCombatMode waypointCompletionRadius waypointDescription waypointForceBehaviour ' +
        'waypointFormation waypointHousePosition waypointLoiterRadius waypointLoiterType waypointName ' +
        'waypointPosition waypoints waypointScript waypointsEnabledUAV waypointShow waypointSpeed ' +
        'waypointStatements waypointTimeout waypointTimeoutCurrent waypointType waypointVisible ' +
        'weaponAccessories weaponAccessoriesCargo weaponCargo weaponDirection weaponInertia weaponLowered ' +
        'weapons weaponsItems weaponsItemsCargo weaponState weaponsTurret weightRTD WFSideText wind ',
      literal:
        'blufor civilian configNull controlNull displayNull east endl false grpNull independent lineBreak ' +
        'locationNull nil objNull opfor pi resistance scriptNull sideAmbientLife sideEmpty sideLogic ' +
        'sideUnknown taskNull teamMemberNull true west'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.NUMBER_MODE,
      VARIABLE,
      FUNCTION,
      STRINGS,
      PREPROCESSOR
    ],
    illegal: /#|^\$ /
  };
}

module.exports = sqf;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/sql.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/sql.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 Language: SQL
 Contributors: Nikolay Lisienko <info@neor.ru>, Heiko August <post@auge8472.de>, Travis Odom <travis.a.odom@gmail.com>, Vadimtro <vadimtro@yahoo.com>, Benjamin Auder <benjamin.auder@gmail.com>
 Website: https://en.wikipedia.org/wiki/SQL
 Category: common
 */

function sql(hljs) {
  var COMMENT_MODE = hljs.COMMENT('--', '$');
  return {
    name: 'SQL',
    case_insensitive: true,
    illegal: /[<>{}*]/,
    contains: [
      {
        beginKeywords:
          'begin end start commit rollback savepoint lock alter create drop rename call ' +
          'delete do handler insert load replace select truncate update set show pragma grant ' +
          'merge describe use explain help declare prepare execute deallocate release ' +
          'unlock purge reset change stop analyze cache flush optimize repair kill ' +
          'install uninstall checksum restore check backup revoke comment values with',
        end: /;/, endsWithParent: true,
        keywords: {
          $pattern: /[\w\.]+/,
          keyword:
            'as abort abs absolute acc acce accep accept access accessed accessible account acos action activate add ' +
            'addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias ' +
            'all allocate allow alter always analyze ancillary and anti any anydata anydataset anyschema anytype apply ' +
            'archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan ' +
            'atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid ' +
            'authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile ' +
            'before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float ' +
            'binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound ' +
            'bucket buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel ' +
            'capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base ' +
            'char_length character_length characters characterset charindex charset charsetform charsetid check ' +
            'checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close ' +
            'cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation ' +
            'collect colu colum column column_value columns columns_updated comment commit compact compatibility ' +
            'compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn ' +
            'connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection ' +
            'consider consistent constant constraint constraints constructor container content contents context ' +
            'contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost ' +
            'count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation ' +
            'critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user ' +
            'cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add ' +
            'date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts ' +
            'day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate ' +
            'declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults ' +
            'deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank ' +
            'depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor ' +
            'deterministic diagnostics difference dimension direct_load directory disable disable_all ' +
            'disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div ' +
            'do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable ' +
            'editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt ' +
            'end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors ' +
            'escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding ' +
            'execu execut execute exempt exists exit exp expire explain explode export export_set extended extent external ' +
            'external_1 external_2 externally extract failed failed_login_attempts failover failure far fast ' +
            'feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final ' +
            'finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign ' +
            'form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ' +
            'ftp full function general generated get get_format get_lock getdate getutcdate global global_name ' +
            'globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups ' +
            'gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex ' +
            'hierarchy high high_priority hosts hour hours http id ident_current ident_incr ident_seed identified ' +
            'identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment ' +
            'index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile ' +
            'initial initialized initially initrans inmemory inner innodb input insert install instance instantiable ' +
            'instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat ' +
            'is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists ' +
            'keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lateral lax lcase ' +
            'lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit ' +
            'lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate ' +
            'locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call ' +
            'logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime ' +
            'managed management manual map mapping mask master master_pos_wait match matched materialized max ' +
            'maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans ' +
            'md5 measures median medium member memcompress memory merge microsecond mid migration min minextents ' +
            'minimum mining minus minute minutes minvalue missing mod mode model modification modify module monitoring month ' +
            'months mount move movement multiset mutex name name_const names nan national native natural nav nchar ' +
            'nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile ' +
            'nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile ' +
            'nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder ' +
            'nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck ' +
            'noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe ' +
            'nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ' +
            'ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old ' +
            'on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date ' +
            'oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary ' +
            'out outer outfile outline output over overflow overriding package pad parallel parallel_enable ' +
            'parameters parent parse partial partition partitions pascal passing password password_grace_time ' +
            'password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex ' +
            'pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc ' +
            'performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin ' +
            'policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction ' +
            'prediction_cost prediction_details prediction_probability prediction_set prepare present preserve ' +
            'prior priority private private_sga privileges procedural procedure procedure_analyze processlist ' +
            'profiles project prompt protection public publishingservername purge quarter query quick quiesce quota ' +
            'quotename radians raise rand range rank raw read reads readsize rebuild record records ' +
            'recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh ' +
            'regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy ' +
            'reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename ' +
            'repair repeat replace replicate replication required reset resetlogs resize resource respect restore ' +
            'restricted result result_cache resumable resume retention return returning returns reuse reverse revoke ' +
            'right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows ' +
            'rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll ' +
            'sdo_georaster sdo_topo_geometry search sec_to_time second seconds section securefile security seed segment select ' +
            'self semi sequence sequential serializable server servererror session session_user sessions_per_user set ' +
            'sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor ' +
            'si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin ' +
            'size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex ' +
            'source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows ' +
            'sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone ' +
            'standby start starting startup statement static statistics stats_binomial_test stats_crosstab ' +
            'stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep ' +
            'stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev ' +
            'stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate ' +
            'subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum ' +
            'suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate ' +
            'sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tablesample tan tdo ' +
            'template temporary terminated tertiary_weights test than then thread through tier ties time time_format ' +
            'time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr ' +
            'timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking ' +
            'transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate ' +
            'try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress ' +
            'under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot ' +
            'unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert ' +
            'url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date ' +
            'utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var ' +
            'var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray ' +
            'verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear ' +
            'wellformed when whene whenev wheneve whenever where while whitespace window with within without work wrapped ' +
            'xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces ' +
            'xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek',
          literal:
            'true false null unknown',
          built_in:
            'array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number ' +
            'numeric real record serial serial8 smallint text time timestamp tinyint varchar varchar2 varying void'
        },
        contains: [
          {
            className: 'string',
            begin: '\'', end: '\'',
            contains: [{begin: '\'\''}]
          },
          {
            className: 'string',
            begin: '"', end: '"',
            contains: [{begin: '""'}]
          },
          {
            className: 'string',
            begin: '`', end: '`'
          },
          hljs.C_NUMBER_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          COMMENT_MODE,
          hljs.HASH_COMMENT_MODE
        ]
      },
      hljs.C_BLOCK_COMMENT_MODE,
      COMMENT_MODE,
      hljs.HASH_COMMENT_MODE
    ]
  };
}

module.exports = sql;


/***/ })

}]);
//# sourceMappingURL=848b71cce8dd4459462a.chunk.js.map