(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor~.._.._node_modules_highlight.js_lib_languages_g"],{

/***/ "../../node_modules/highlight.js/lib/languages/gradle.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/gradle.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Gradle
Description: Gradle is an open-source build automation tool focused on flexibility and performance.
Website: https://gradle.org
Author: Damian Mee <mee.damian@gmail.com>
*/

function gradle(hljs) {
  return {
    name: 'Gradle',
    case_insensitive: true,
    keywords: {
      keyword:
        'task project allprojects subprojects artifacts buildscript configurations ' +
        'dependencies repositories sourceSets description delete from into include ' +
        'exclude source classpath destinationDir includes options sourceCompatibility ' +
        'targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant ' +
        'def abstract break case catch continue default do else extends final finally ' +
        'for if implements instanceof native new private protected public return static ' +
        'switch synchronized throw throws transient try volatile while strictfp package ' +
        'import false null super this true antlrtask checkstyle codenarc copy boolean ' +
        'byte char class double float int interface long short void compile runTime ' +
        'file fileTree abs any append asList asWritable call collect compareTo count ' +
        'div dump each eachByte eachFile eachLine every find findAll flatten getAt ' +
        'getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods ' +
        'isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter ' +
        'newReader newWriter next plus pop power previous print println push putAt read ' +
        'readBytes readLines reverse reverseEach round size sort splitEachLine step subMap ' +
        'times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader ' +
        'withStream withWriter withWriterAppend write writeLine'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.REGEXP_MODE

    ]
  };
}

module.exports = gradle;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/groovy.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/groovy.js ***!
  \*********************************************************************************************************/
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
 Language: Groovy
 Author: Guillaume Laforge <glaforge@gmail.com>
 Description: Groovy programming language implementation inspired from Vsevolod's Java mode
 Website: https://groovy-lang.org
 */

function variants(variants, obj = {}) {
  obj.variants = variants;
  return obj;
}

function groovy(hljs) {
  const IDENT_RE = '[A-Za-z0-9_$]+';
  const COMMENT = variants([
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.COMMENT(
      '/\\*\\*',
      '\\*/',
      {
        relevance : 0,
        contains : [
          {
            // eat up @'s in emails to prevent them to be recognized as doctags
            begin: /\w+@/, relevance: 0
          }, {
            className : 'doctag',
            begin : '@[A-Za-z]+'
          }
        ]
      }
    )
  ]);
  const REGEXP = {
    className: 'regexp',
    begin: /~?\/[^\/\n]+\//,
    contains: [
      hljs.BACKSLASH_ESCAPE
    ]
  };
  const NUMBER = variants([
    hljs.BINARY_NUMBER_MODE,
    hljs.C_NUMBER_MODE,
  ]);
  const STRING = variants([
    {
      begin: /"""/,
      end: /"""/
    }, {
      begin: /'''/,
      end: /'''/
    }, {
      begin: "\\$/",
      end: "/\\$",
      relevance: 10
    },
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    ],
    { className: "string" }
  );

    return {
        name: 'Groovy',
        keywords: {
            built_in: 'this super',
            literal: 'true false null',
            keyword:
            'byte short char int long boolean float double void ' +
            // groovy specific keywords
            'def as in assert trait ' +
            // common keywords with Java
            'abstract static volatile transient public private protected synchronized final ' +
            'class interface enum if else for while switch case break default continue ' +
            'throw throws try catch finally implements extends new import package return instanceof'
        },
        contains: [
            hljs.SHEBANG({
              binary: "groovy",
              relevance: 10
            }),
            COMMENT,
            STRING,
            REGEXP,
            NUMBER,
            {
                className: 'class',
                beginKeywords: 'class interface trait enum', end: /\{/,
                illegal: ':',
                contains: [
                    {beginKeywords: 'extends implements'},
                    hljs.UNDERSCORE_TITLE_MODE
                ]
            },
            {
                className: 'meta',
                begin: '@[A-Za-z]+',
                relevance: 0
            },
            {
              // highlight map keys and named parameters as attrs
              className: 'attr', begin: IDENT_RE + '[ \t]*:'
            },
            {
              // catch middle element of the ternary operator
              // to avoid highlight it as a label, named parameter, or map key
              begin: /\?/,
              end: /:/,
              relevance: 0,
              contains: [
                COMMENT,
                STRING,
                REGEXP,
                NUMBER,
                'self'
              ]
            },
            {
                // highlight labeled statements
                className: 'symbol',
                begin: '^[ \t]*' + lookahead(IDENT_RE + ':'),
                excludeBegin: true,
                end: IDENT_RE + ':',
                relevance: 0
            }
        ],
        illegal: /#|<\//
    };
}

module.exports = groovy;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/haml.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/haml.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: HAML
Requires: ruby.js
Author: Dan Allen <dan.j.allen@gmail.com>
Website: http://haml.info
Category: template
*/

// TODO support filter tags like :javascript, support inline HTML
function haml(hljs) {
  return {
    name: 'HAML',
    case_insensitive: true,
    contains: [
      {
        className: 'meta',
        begin: '^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$',
        relevance: 10
      },
      // FIXME these comments should be allowed to span indented lines
      hljs.COMMENT(
        '^\\s*(!=#|=#|-#|/).*$',
        false,
        {
          relevance: 0
        }
      ),
      {
        begin: '^\\s*(-|=|!=)(?!#)',
        starts: {
          end: '\\n',
          subLanguage: 'ruby'
        }
      },
      {
        className: 'tag',
        begin: '^\\s*%',
        contains: [
          {
            className: 'selector-tag',
            begin: '\\w+'
          },
          {
            className: 'selector-id',
            begin: '#[\\w-]+'
          },
          {
            className: 'selector-class',
            begin: '\\.[\\w-]+'
          },
          {
            begin: /\{\s*/,
            end: /\s*\}/,
            contains: [
              {
                begin: ':\\w+\\s*=>',
                end: ',\\s+',
                returnBegin: true,
                endsWithParent: true,
                contains: [
                  {
                    className: 'attr',
                    begin: ':\\w+'
                  },
                  hljs.APOS_STRING_MODE,
                  hljs.QUOTE_STRING_MODE,
                  {
                    begin: '\\w+',
                    relevance: 0
                  }
                ]
              }
            ]
          },
          {
            begin: '\\(\\s*',
            end: '\\s*\\)',
            excludeEnd: true,
            contains: [
              {
                begin: '\\w+\\s*=',
                end: '\\s+',
                returnBegin: true,
                endsWithParent: true,
                contains: [
                  {
                    className: 'attr',
                    begin: '\\w+',
                    relevance: 0
                  },
                  hljs.APOS_STRING_MODE,
                  hljs.QUOTE_STRING_MODE,
                  {
                    begin: '\\w+',
                    relevance: 0
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        begin: '^\\s*[=~]\\s*'
      },
      {
        begin: /#\{/,
        starts: {
          end: /\}/,
          subLanguage: 'ruby'
        }
      }
    ]
  };
}

module.exports = haml;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/handlebars.js":
/*!*************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/handlebars.js ***!
  \*************************************************************************************************************/
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
Language: Handlebars
Requires: xml.js
Author: Robin Ward <robin.ward@gmail.com>
Description: Matcher for Handlebars as well as EmberJS additions.
Website: https://handlebarsjs.com
Category: template
*/

function handlebars(hljs) {
  const BUILT_INS = {
    'builtin-name': [
      'action',
      'bindattr',
      'collection',
      'component',
      'concat',
      'debugger',
      'each',
      'each-in',
      'get',
      'hash',
      'if',
      'in',
      'input',
      'link-to',
      'loc',
      'log',
      'lookup',
      'mut',
      'outlet',
      'partial',
      'query-params',
      'render',
      'template',
      'textarea',
      'unbound',
      'unless',
      'view',
      'with',
      'yield'
    ].join(" ")
  };

  const LITERALS = {
    literal: [
      'true',
      'false',
      'undefined',
      'null'
    ].join(" ")
  };

  // as defined in https://handlebarsjs.com/guide/expressions.html#literal-segments
  // this regex matches literal segments like ' abc ' or [ abc ] as well as helpers and paths
  // like a/b, ./abc/cde, and abc.bcd

  const DOUBLE_QUOTED_ID_REGEX = /".*?"/;
  const SINGLE_QUOTED_ID_REGEX = /'.*?'/;
  const BRACKET_QUOTED_ID_REGEX = /\[.*?\]/;
  const PLAIN_ID_REGEX = /[^\s!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/;
  const PATH_DELIMITER_REGEX = /\.|\//;

  const IDENTIFIER_REGEX = concat(
    '(',
    SINGLE_QUOTED_ID_REGEX, '|',
    DOUBLE_QUOTED_ID_REGEX, '|',
    BRACKET_QUOTED_ID_REGEX, '|',
    PLAIN_ID_REGEX, '|',
    PATH_DELIMITER_REGEX,
    ')+'
  );

  // identifier followed by a equal-sign (without the equal sign)
  const HASH_PARAM_REGEX = concat(
    '(',
    BRACKET_QUOTED_ID_REGEX, '|',
    PLAIN_ID_REGEX,
    ')(?==)'
  );

  const HELPER_NAME_OR_PATH_EXPRESSION = {
    begin: IDENTIFIER_REGEX,
    lexemes: /[\w.\/]+/
  };

  const HELPER_PARAMETER = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    keywords: LITERALS
  });

  const SUB_EXPRESSION = {
    begin: /\(/,
    end: /\)/
    // the "contains" is added below when all necessary sub-modes are defined
  };

  const HASH = {
    // fka "attribute-assignment", parameters of the form 'key=value'
    className: 'attr',
    begin: HASH_PARAM_REGEX,
    relevance: 0,
    starts: {
      begin: /=/,
      end: /=/,
      starts: {
        contains: [
          hljs.NUMBER_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          HELPER_PARAMETER,
          SUB_EXPRESSION
        ]
      }
    }
  };

  const BLOCK_PARAMS = {
    // parameters of the form '{{#with x as | y |}}...{{/with}}'
    begin: /as\s+\|/,
    keywords: {
      keyword: 'as'
    },
    end: /\|/,
    contains: [
      {
        // define sub-mode in order to prevent highlighting of block-parameter named "as"
        begin: /\w+/
      }
    ]
  };

  const HELPER_PARAMETERS = {
    contains: [
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      BLOCK_PARAMS,
      HASH,
      HELPER_PARAMETER,
      SUB_EXPRESSION
    ],
    returnEnd: true
    // the property "end" is defined through inheritance when the mode is used. If depends
    // on the surrounding mode, but "endsWithParent" does not work here (i.e. it includes the
    // end-token of the surrounding mode)
  };

  const SUB_EXPRESSION_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    className: 'name',
    keywords: BUILT_INS,
    starts: hljs.inherit(HELPER_PARAMETERS, {
      end: /\)/
    })
  });

  SUB_EXPRESSION.contains = [SUB_EXPRESSION_CONTENTS];

  const OPENING_BLOCK_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    keywords: BUILT_INS,
    className: 'name',
    starts: hljs.inherit(HELPER_PARAMETERS, {
      end: /\}\}/
    })
  });

  const CLOSING_BLOCK_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    keywords: BUILT_INS,
    className: 'name'
  });

  const BASIC_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    className: 'name',
    keywords: BUILT_INS,
    starts: hljs.inherit(HELPER_PARAMETERS, {
      end: /\}\}/
    })
  });

  const ESCAPE_MUSTACHE_WITH_PRECEEDING_BACKSLASH = {
    begin: /\\\{\{/,
    skip: true
  };
  const PREVENT_ESCAPE_WITH_ANOTHER_PRECEEDING_BACKSLASH = {
    begin: /\\\\(?=\{\{)/,
    skip: true
  };

  return {
    name: 'Handlebars',
    aliases: [
      'hbs',
      'html.hbs',
      'html.handlebars',
      'htmlbars'
    ],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      ESCAPE_MUSTACHE_WITH_PRECEEDING_BACKSLASH,
      PREVENT_ESCAPE_WITH_ANOTHER_PRECEEDING_BACKSLASH,
      hljs.COMMENT(/\{\{!--/, /--\}\}/),
      hljs.COMMENT(/\{\{!/, /\}\}/),
      {
        // open raw block "{{{{raw}}}} content not evaluated {{{{/raw}}}}"
        className: 'template-tag',
        begin: /\{\{\{\{(?!\/)/,
        end: /\}\}\}\}/,
        contains: [OPENING_BLOCK_MUSTACHE_CONTENTS],
        starts: {
          end: /\{\{\{\{\//,
          returnEnd: true,
          subLanguage: 'xml'
        }
      },
      {
        // close raw block
        className: 'template-tag',
        begin: /\{\{\{\{\//,
        end: /\}\}\}\}/,
        contains: [CLOSING_BLOCK_MUSTACHE_CONTENTS]
      },
      {
        // open block statement
        className: 'template-tag',
        begin: /\{\{#/,
        end: /\}\}/,
        contains: [OPENING_BLOCK_MUSTACHE_CONTENTS]
      },
      {
        className: 'template-tag',
        begin: /\{\{(?=else\}\})/,
        end: /\}\}/,
        keywords: 'else'
      },
      {
        className: 'template-tag',
        begin: /\{\{(?=else if)/,
        end: /\}\}/,
        keywords: 'else if'
      },
      {
        // closing block statement
        className: 'template-tag',
        begin: /\{\{\//,
        end: /\}\}/,
        contains: [CLOSING_BLOCK_MUSTACHE_CONTENTS]
      },
      {
        // template variable or helper-call that is NOT html-escaped
        className: 'template-variable',
        begin: /\{\{\{/,
        end: /\}\}\}/,
        contains: [BASIC_MUSTACHE_CONTENTS]
      },
      {
        // template variable or helper-call that is html-escaped
        className: 'template-variable',
        begin: /\{\{/,
        end: /\}\}/,
        contains: [BASIC_MUSTACHE_CONTENTS]
      }
    ]
  };
}

module.exports = handlebars;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/haskell.js":
/*!**********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/haskell.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Haskell
Author: Jeremy Hull <sourdrums@gmail.com>
Contributors: Zena Treep <zena.treep@gmail.com>
Website: https://www.haskell.org
Category: functional
*/

function haskell(hljs) {
  const COMMENT = {
    variants: [
      hljs.COMMENT('--', '$'),
      hljs.COMMENT(
        /\{-/,
        /-\}/,
        {
          contains: ['self']
        }
      )
    ]
  };

  const PRAGMA = {
    className: 'meta',
    begin: /\{-#/,
    end: /#-\}/
  };

  const PREPROCESSOR = {
    className: 'meta',
    begin: '^#',
    end: '$'
  };

  const CONSTRUCTOR = {
    className: 'type',
    begin: '\\b[A-Z][\\w\']*', // TODO: other constructors (build-in, infix).
    relevance: 0
  };

  const LIST = {
    begin: '\\(',
    end: '\\)',
    illegal: '"',
    contains: [
      PRAGMA,
      PREPROCESSOR,
      {
        className: 'type',
        begin: '\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?'
      },
      hljs.inherit(hljs.TITLE_MODE, {
        begin: '[_a-z][\\w\']*'
      }),
      COMMENT
    ]
  };

  const RECORD = {
    begin: /\{/,
    end: /\}/,
    contains: LIST.contains
  };

  return {
    name: 'Haskell',
    aliases: ['hs'],
    keywords:
      'let in if then else case of where do module import hiding ' +
      'qualified type data newtype deriving class instance as default ' +
      'infix infixl infixr foreign export ccall stdcall cplusplus ' +
      'jvm dotnet safe unsafe family forall mdo proc rec',
    contains: [
      // Top-level constructions.
      {
        beginKeywords: 'module',
        end: 'where',
        keywords: 'module where',
        contains: [
          LIST,
          COMMENT
        ],
        illegal: '\\W\\.|;'
      },
      {
        begin: '\\bimport\\b',
        end: '$',
        keywords: 'import qualified as hiding',
        contains: [
          LIST,
          COMMENT
        ],
        illegal: '\\W\\.|;'
      },
      {
        className: 'class',
        begin: '^(\\s*)?(class|instance)\\b',
        end: 'where',
        keywords: 'class family instance where',
        contains: [
          CONSTRUCTOR,
          LIST,
          COMMENT
        ]
      },
      {
        className: 'class',
        begin: '\\b(data|(new)?type)\\b',
        end: '$',
        keywords: 'data family type newtype deriving',
        contains: [
          PRAGMA,
          CONSTRUCTOR,
          LIST,
          RECORD,
          COMMENT
        ]
      },
      {
        beginKeywords: 'default',
        end: '$',
        contains: [
          CONSTRUCTOR,
          LIST,
          COMMENT
        ]
      },
      {
        beginKeywords: 'infix infixl infixr',
        end: '$',
        contains: [
          hljs.C_NUMBER_MODE,
          COMMENT
        ]
      },
      {
        begin: '\\bforeign\\b',
        end: '$',
        keywords: 'foreign import export ccall stdcall cplusplus jvm ' +
                  'dotnet safe unsafe',
        contains: [
          CONSTRUCTOR,
          hljs.QUOTE_STRING_MODE,
          COMMENT
        ]
      },
      {
        className: 'meta',
        begin: '#!\\/usr\\/bin\\/env\ runhaskell',
        end: '$'
      },
      // "Whitespaces".
      PRAGMA,
      PREPROCESSOR,

      // Literals and names.

      // TODO: characters.
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      CONSTRUCTOR,
      hljs.inherit(hljs.TITLE_MODE, {
        begin: '^[_a-z][\\w\']*'
      }),
      COMMENT,
      { // No markup, relevance booster
        begin: '->|<-'
      }
    ]
  };
}

module.exports = haskell;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/haxe.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/haxe.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Haxe
Description: Haxe is an open source toolkit based on a modern, high level, strictly typed programming language.
Author: Christopher Kaster <ikasoki@gmail.com> (Based on the actionscript.js language file by Alexander Myadzel)
Contributors: Kenton Hamaluik <kentonh@gmail.com>
Website: https://haxe.org
*/

function haxe(hljs) {

  const HAXE_BASIC_TYPES = 'Int Float String Bool Dynamic Void Array ';

  return {
    name: 'Haxe',
    aliases: ['hx'],
    keywords: {
      keyword: 'break case cast catch continue default do dynamic else enum extern ' +
               'for function here if import in inline never new override package private get set ' +
               'public return static super switch this throw trace try typedef untyped using var while ' +
               HAXE_BASIC_TYPES,
      built_in:
        'trace this',
      literal:
        'true false null _'
    },
    contains: [
      {
        className: 'string', // interpolate-able strings
        begin: '\'',
        end: '\'',
        contains: [
          hljs.BACKSLASH_ESCAPE,
          {
            className: 'subst', // interpolation
            begin: '\\$\\{',
            end: '\\}'
          },
          {
            className: 'subst', // interpolation
            begin: '\\$',
            end: /\W\}/
          }
        ]
      },
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'meta', // compiler meta
        begin: '@:',
        end: '$'
      },
      {
        className: 'meta', // compiler conditionals
        begin: '#',
        end: '$',
        keywords: {
          'meta-keyword': 'if else elseif end error'
        }
      },
      {
        className: 'type', // function types
        begin: ':[ \t]*',
        end: '[^A-Za-z0-9_ \t\\->]',
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0
      },
      {
        className: 'type', // types
        begin: ':[ \t]*',
        end: '\\W',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: 'type', // instantiation
        begin: 'new *',
        end: '\\W',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: 'class', // enums
        beginKeywords: 'enum',
        end: '\\{',
        contains: [hljs.TITLE_MODE]
      },
      {
        className: 'class', // abstracts
        beginKeywords: 'abstract',
        end: '[\\{$]',
        contains: [
          {
            className: 'type',
            begin: '\\(',
            end: '\\)',
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: 'type',
            begin: 'from +',
            end: '\\W',
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: 'type',
            begin: 'to +',
            end: '\\W',
            excludeBegin: true,
            excludeEnd: true
          },
          hljs.TITLE_MODE
        ],
        keywords: {
          keyword: 'abstract from to'
        }
      },
      {
        className: 'class', // classes
        begin: '\\b(class|interface) +',
        end: '[\\{$]',
        excludeEnd: true,
        keywords: 'class interface',
        contains: [
          {
            className: 'keyword',
            begin: '\\b(extends|implements) +',
            keywords: 'extends implements',
            contains: [
              {
                className: 'type',
                begin: hljs.IDENT_RE,
                relevance: 0
              }
            ]
          },
          hljs.TITLE_MODE
        ]
      },
      {
        className: 'function',
        beginKeywords: 'function',
        end: '\\(',
        excludeEnd: true,
        illegal: '\\S',
        contains: [hljs.TITLE_MODE]
      }
    ],
    illegal: /<\//
  };
}

module.exports = haxe;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/hsp.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/hsp.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: HSP
Author: prince <MC.prince.0203@gmail.com>
Website: https://en.wikipedia.org/wiki/Hot_Soup_Processor
Category: scripting
*/

function hsp(hljs) {
  return {
    name: 'HSP',
    case_insensitive: true,
    keywords: {
      $pattern: /[\w._]+/,
      keyword: 'goto gosub return break repeat loop continue wait await dim sdim foreach dimtype dup dupptr end stop newmod delmod mref run exgoto on mcall assert logmes newlab resume yield onexit onerror onkey onclick oncmd exist delete mkdir chdir dirlist bload bsave bcopy memfile if else poke wpoke lpoke getstr chdpm memexpand memcpy memset notesel noteadd notedel noteload notesave randomize noteunsel noteget split strrep setease button chgdisp exec dialog mmload mmplay mmstop mci pset pget syscolor mes print title pos circle cls font sysfont objsize picload color palcolor palette redraw width gsel gcopy gzoom gmode bmpsave hsvcolor getkey listbox chkbox combox input mesbox buffer screen bgscr mouse objsel groll line clrobj boxf objprm objmode stick grect grotate gsquare gradf objimage objskip objenable celload celdiv celput newcom querycom delcom cnvstow comres axobj winobj sendmsg comevent comevarg sarrayconv callfunc cnvwtos comevdisp libptr system hspstat hspver stat cnt err strsize looplev sublev iparam wparam lparam refstr refdval int rnd strlen length length2 length3 length4 vartype gettime peek wpeek lpeek varptr varuse noteinfo instr abs limit getease str strmid strf getpath strtrim sin cos tan atan sqrt double absf expf logf limitf powf geteasef mousex mousey mousew hwnd hinstance hdc ginfo objinfo dirinfo sysinfo thismod __hspver__ __hsp30__ __date__ __time__ __line__ __file__ _debug __hspdef__ and or xor not screen_normal screen_palette screen_hide screen_fixedsize screen_tool screen_frame gmode_gdi gmode_mem gmode_rgb0 gmode_alpha gmode_rgb0alpha gmode_add gmode_sub gmode_pixela ginfo_mx ginfo_my ginfo_act ginfo_sel ginfo_wx1 ginfo_wy1 ginfo_wx2 ginfo_wy2 ginfo_vx ginfo_vy ginfo_sizex ginfo_sizey ginfo_winx ginfo_winy ginfo_mesx ginfo_mesy ginfo_r ginfo_g ginfo_b ginfo_paluse ginfo_dispx ginfo_dispy ginfo_cx ginfo_cy ginfo_intid ginfo_newid ginfo_sx ginfo_sy objinfo_mode objinfo_bmscr objinfo_hwnd notemax notesize dir_cur dir_exe dir_win dir_sys dir_cmdline dir_desktop dir_mydoc dir_tv font_normal font_bold font_italic font_underline font_strikeout font_antialias objmode_normal objmode_guifont objmode_usefont gsquare_grad msgothic msmincho do until while wend for next _break _continue switch case default swbreak swend ddim ldim alloc m_pi rad2deg deg2rad ease_linear ease_quad_in ease_quad_out ease_quad_inout ease_cubic_in ease_cubic_out ease_cubic_inout ease_quartic_in ease_quartic_out ease_quartic_inout ease_bounce_in ease_bounce_out ease_bounce_inout ease_shake_in ease_shake_out ease_shake_inout ease_loop'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,

      {
        // multi-line string
        className: 'string',
        begin: /\{"/,
        end: /"\}/,
        contains: [hljs.BACKSLASH_ESCAPE]
      },

      hljs.COMMENT(';', '$', {
        relevance: 0
      }),

      {
        // pre-processor
        className: 'meta',
        begin: '#',
        end: '$',
        keywords: {
          'meta-keyword': 'addion cfunc cmd cmpopt comfunc const defcfunc deffunc define else endif enum epack func global if ifdef ifndef include modcfunc modfunc modinit modterm module pack packopt regcmd runtime undef usecom uselib'
        },
        contains: [
          hljs.inherit(hljs.QUOTE_STRING_MODE, {
            className: 'meta-string'
          }),
          hljs.NUMBER_MODE,
          hljs.C_NUMBER_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },

      {
        // label
        className: 'symbol',
        begin: '^\\*(\\w+|@)'
      },

      hljs.NUMBER_MODE,
      hljs.C_NUMBER_MODE
    ]
  };
}

module.exports = hsp;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/htmlbars.js":
/*!***********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/htmlbars.js ***!
  \***********************************************************************************************************/
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
Language: Handlebars
Requires: xml.js
Author: Robin Ward <robin.ward@gmail.com>
Description: Matcher for Handlebars as well as EmberJS additions.
Website: https://handlebarsjs.com
Category: template
*/

function handlebars(hljs) {
  const BUILT_INS = {
    'builtin-name': [
      'action',
      'bindattr',
      'collection',
      'component',
      'concat',
      'debugger',
      'each',
      'each-in',
      'get',
      'hash',
      'if',
      'in',
      'input',
      'link-to',
      'loc',
      'log',
      'lookup',
      'mut',
      'outlet',
      'partial',
      'query-params',
      'render',
      'template',
      'textarea',
      'unbound',
      'unless',
      'view',
      'with',
      'yield'
    ].join(" ")
  };

  const LITERALS = {
    literal: [
      'true',
      'false',
      'undefined',
      'null'
    ].join(" ")
  };

  // as defined in https://handlebarsjs.com/guide/expressions.html#literal-segments
  // this regex matches literal segments like ' abc ' or [ abc ] as well as helpers and paths
  // like a/b, ./abc/cde, and abc.bcd

  const DOUBLE_QUOTED_ID_REGEX = /".*?"/;
  const SINGLE_QUOTED_ID_REGEX = /'.*?'/;
  const BRACKET_QUOTED_ID_REGEX = /\[.*?\]/;
  const PLAIN_ID_REGEX = /[^\s!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/;
  const PATH_DELIMITER_REGEX = /\.|\//;

  const IDENTIFIER_REGEX = concat(
    '(',
    SINGLE_QUOTED_ID_REGEX, '|',
    DOUBLE_QUOTED_ID_REGEX, '|',
    BRACKET_QUOTED_ID_REGEX, '|',
    PLAIN_ID_REGEX, '|',
    PATH_DELIMITER_REGEX,
    ')+'
  );

  // identifier followed by a equal-sign (without the equal sign)
  const HASH_PARAM_REGEX = concat(
    '(',
    BRACKET_QUOTED_ID_REGEX, '|',
    PLAIN_ID_REGEX,
    ')(?==)'
  );

  const HELPER_NAME_OR_PATH_EXPRESSION = {
    begin: IDENTIFIER_REGEX,
    lexemes: /[\w.\/]+/
  };

  const HELPER_PARAMETER = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    keywords: LITERALS
  });

  const SUB_EXPRESSION = {
    begin: /\(/,
    end: /\)/
    // the "contains" is added below when all necessary sub-modes are defined
  };

  const HASH = {
    // fka "attribute-assignment", parameters of the form 'key=value'
    className: 'attr',
    begin: HASH_PARAM_REGEX,
    relevance: 0,
    starts: {
      begin: /=/,
      end: /=/,
      starts: {
        contains: [
          hljs.NUMBER_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          HELPER_PARAMETER,
          SUB_EXPRESSION
        ]
      }
    }
  };

  const BLOCK_PARAMS = {
    // parameters of the form '{{#with x as | y |}}...{{/with}}'
    begin: /as\s+\|/,
    keywords: {
      keyword: 'as'
    },
    end: /\|/,
    contains: [
      {
        // define sub-mode in order to prevent highlighting of block-parameter named "as"
        begin: /\w+/
      }
    ]
  };

  const HELPER_PARAMETERS = {
    contains: [
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      BLOCK_PARAMS,
      HASH,
      HELPER_PARAMETER,
      SUB_EXPRESSION
    ],
    returnEnd: true
    // the property "end" is defined through inheritance when the mode is used. If depends
    // on the surrounding mode, but "endsWithParent" does not work here (i.e. it includes the
    // end-token of the surrounding mode)
  };

  const SUB_EXPRESSION_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    className: 'name',
    keywords: BUILT_INS,
    starts: hljs.inherit(HELPER_PARAMETERS, {
      end: /\)/
    })
  });

  SUB_EXPRESSION.contains = [SUB_EXPRESSION_CONTENTS];

  const OPENING_BLOCK_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    keywords: BUILT_INS,
    className: 'name',
    starts: hljs.inherit(HELPER_PARAMETERS, {
      end: /\}\}/
    })
  });

  const CLOSING_BLOCK_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    keywords: BUILT_INS,
    className: 'name'
  });

  const BASIC_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
    className: 'name',
    keywords: BUILT_INS,
    starts: hljs.inherit(HELPER_PARAMETERS, {
      end: /\}\}/
    })
  });

  const ESCAPE_MUSTACHE_WITH_PRECEEDING_BACKSLASH = {
    begin: /\\\{\{/,
    skip: true
  };
  const PREVENT_ESCAPE_WITH_ANOTHER_PRECEEDING_BACKSLASH = {
    begin: /\\\\(?=\{\{)/,
    skip: true
  };

  return {
    name: 'Handlebars',
    aliases: [
      'hbs',
      'html.hbs',
      'html.handlebars',
      'htmlbars'
    ],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      ESCAPE_MUSTACHE_WITH_PRECEEDING_BACKSLASH,
      PREVENT_ESCAPE_WITH_ANOTHER_PRECEEDING_BACKSLASH,
      hljs.COMMENT(/\{\{!--/, /--\}\}/),
      hljs.COMMENT(/\{\{!/, /\}\}/),
      {
        // open raw block "{{{{raw}}}} content not evaluated {{{{/raw}}}}"
        className: 'template-tag',
        begin: /\{\{\{\{(?!\/)/,
        end: /\}\}\}\}/,
        contains: [OPENING_BLOCK_MUSTACHE_CONTENTS],
        starts: {
          end: /\{\{\{\{\//,
          returnEnd: true,
          subLanguage: 'xml'
        }
      },
      {
        // close raw block
        className: 'template-tag',
        begin: /\{\{\{\{\//,
        end: /\}\}\}\}/,
        contains: [CLOSING_BLOCK_MUSTACHE_CONTENTS]
      },
      {
        // open block statement
        className: 'template-tag',
        begin: /\{\{#/,
        end: /\}\}/,
        contains: [OPENING_BLOCK_MUSTACHE_CONTENTS]
      },
      {
        className: 'template-tag',
        begin: /\{\{(?=else\}\})/,
        end: /\}\}/,
        keywords: 'else'
      },
      {
        className: 'template-tag',
        begin: /\{\{(?=else if)/,
        end: /\}\}/,
        keywords: 'else if'
      },
      {
        // closing block statement
        className: 'template-tag',
        begin: /\{\{\//,
        end: /\}\}/,
        contains: [CLOSING_BLOCK_MUSTACHE_CONTENTS]
      },
      {
        // template variable or helper-call that is NOT html-escaped
        className: 'template-variable',
        begin: /\{\{\{/,
        end: /\}\}\}/,
        contains: [BASIC_MUSTACHE_CONTENTS]
      },
      {
        // template variable or helper-call that is html-escaped
        className: 'template-variable',
        begin: /\{\{/,
        end: /\}\}/,
        contains: [BASIC_MUSTACHE_CONTENTS]
      }
    ]
  };
}

/*
 Language: HTMLBars (legacy)
 Requires: xml.js
 Description: Matcher for Handlebars as well as EmberJS additions.
 Website: https://github.com/tildeio/htmlbars
 Category: template
 */

function htmlbars(hljs) {
  const definition = handlebars(hljs);

  definition.name = "HTMLbars";

  // HACK: This lets handlebars do the auto-detection if it's been loaded (by
  // default the build script will load in alphabetical order) and if not (perhaps
  // an install is only using `htmlbars`, not `handlebars`) then this will still
  // allow HTMLBars to participate in the auto-detection

  // worse case someone will have HTMLbars and handlebars competing for the same
  // content and will need to change their setup to only require handlebars, but
  // I don't consider this a breaking change
  if (hljs.getLanguage("handlebars")) {
    definition.disableAutodetect = true;
  }

  return definition;
}

module.exports = htmlbars;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/http.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/http.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: HTTP
Description: HTTP request and response headers with automatic body highlighting
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Category: common, protocols
Website: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
*/

function http(hljs) {
  var VERSION = 'HTTP/[0-9\\.]+';
  return {
    name: 'HTTP',
    aliases: ['https'],
    illegal: '\\S',
    contains: [
      {
        begin: '^' + VERSION, end: '$',
        contains: [{className: 'number', begin: '\\b\\d{3}\\b'}]
      },
      {
        begin: '^[A-Z]+ (.*?) ' + VERSION + '$', returnBegin: true, end: '$',
        contains: [
          {
            className: 'string',
            begin: ' ', end: ' ',
            excludeBegin: true, excludeEnd: true
          },
          {
            begin: VERSION
          },
          {
            className: 'keyword',
            begin: '[A-Z]+'
          }
        ]
      },
      {
        className: 'attribute',
        begin: '^\\w', end: ': ', excludeEnd: true,
        illegal: '\\n|\\s|=',
        starts: {end: '$', relevance: 0}
      },
      {
        begin: '\\n\\n',
        starts: {subLanguage: [], endsWithParent: true}
      }
    ]
  };
}

module.exports = http;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/hy.js":
/*!*****************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/hy.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Hy
Description: Hy is a wonderful dialect of Lisp that’s embedded in Python.
Author: Sergey Sobko <s.sobko@profitware.ru>
Website: http://docs.hylang.org/en/stable/
Category: lisp
*/

function hy(hljs) {
  var SYMBOLSTART = 'a-zA-Z_\\-!.?+*=<>&#\'';
  var SYMBOL_RE = '[' + SYMBOLSTART + '][' + SYMBOLSTART + '0-9/;:]*';
  var keywords = {
    $pattern: SYMBOL_RE,
    'builtin-name':
      // keywords
      '!= % %= & &= * ** **= *= *map ' +
      '+ += , --build-class-- --import-- -= . / // //= ' +
      '/= < << <<= <= = > >= >> >>= ' +
      '@ @= ^ ^= abs accumulate all and any ap-compose ' +
      'ap-dotimes ap-each ap-each-while ap-filter ap-first ap-if ap-last ap-map ap-map-when ap-pipe ' +
      'ap-reduce ap-reject apply as-> ascii assert assoc bin break butlast ' +
      'callable calling-module-name car case cdr chain chr coll? combinations compile ' +
      'compress cond cons cons? continue count curry cut cycle dec ' +
      'def default-method defclass defmacro defmacro-alias defmacro/g! defmain defmethod defmulti defn ' +
      'defn-alias defnc defnr defreader defseq del delattr delete-route dict-comp dir ' +
      'disassemble dispatch-reader-macro distinct divmod do doto drop drop-last drop-while empty? ' +
      'end-sequence eval eval-and-compile eval-when-compile even? every? except exec filter first ' +
      'flatten float? fn fnc fnr for for* format fraction genexpr ' +
      'gensym get getattr global globals group-by hasattr hash hex id ' +
      'identity if if* if-not if-python2 import in inc input instance? ' +
      'integer integer-char? integer? interleave interpose is is-coll is-cons is-empty is-even ' +
      'is-every is-float is-instance is-integer is-integer-char is-iterable is-iterator is-keyword is-neg is-none ' +
      'is-not is-numeric is-odd is-pos is-string is-symbol is-zero isinstance islice issubclass ' +
      'iter iterable? iterate iterator? keyword keyword? lambda last len let ' +
      'lif lif-not list* list-comp locals loop macro-error macroexpand macroexpand-1 macroexpand-all ' +
      'map max merge-with method-decorator min multi-decorator multicombinations name neg? next ' +
      'none? nonlocal not not-in not? nth numeric? oct odd? open ' +
      'or ord partition permutations pos? post-route postwalk pow prewalk print ' +
      'product profile/calls profile/cpu put-route quasiquote quote raise range read read-str ' +
      'recursive-replace reduce remove repeat repeatedly repr require rest round route ' +
      'route-with-methods rwm second seq set-comp setattr setv some sorted string ' +
      'string? sum switch symbol? take take-nth take-while tee try unless ' +
      'unquote unquote-splicing vars walk when while with with* with-decorator with-gensyms ' +
      'xi xor yield yield-from zero? zip zip-longest | |= ~'
   };

  var SIMPLE_NUMBER_RE = '[-+]?\\d+(\\.\\d+)?';

  var SYMBOL = {
    begin: SYMBOL_RE,
    relevance: 0
  };
  var NUMBER = {
    className: 'number', begin: SIMPLE_NUMBER_RE,
    relevance: 0
  };
  var STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null});
  var COMMENT = hljs.COMMENT(
    ';',
    '$',
    {
      relevance: 0
    }
  );
  var LITERAL = {
    className: 'literal',
    begin: /\b([Tt]rue|[Ff]alse|nil|None)\b/
  };
  var COLLECTION = {
    begin: '[\\[\\{]', end: '[\\]\\}]'
  };
  var HINT = {
    className: 'comment',
    begin: '\\^' + SYMBOL_RE
  };
  var HINT_COL = hljs.COMMENT('\\^\\{', '\\}');
  var KEY = {
    className: 'symbol',
    begin: '[:]{1,2}' + SYMBOL_RE
  };
  var LIST = {
    begin: '\\(', end: '\\)'
  };
  var BODY = {
    endsWithParent: true,
    relevance: 0
  };
  var NAME = {
    className: 'name',
    relevance: 0,
    keywords: keywords,
    begin: SYMBOL_RE,
    starts: BODY
  };
  var DEFAULT_CONTAINS = [LIST, STRING, HINT, HINT_COL, COMMENT, KEY, COLLECTION, NUMBER, LITERAL, SYMBOL];

  LIST.contains = [hljs.COMMENT('comment', ''), NAME, BODY];
  BODY.contains = DEFAULT_CONTAINS;
  COLLECTION.contains = DEFAULT_CONTAINS;

  return {
    name: 'Hy',
    aliases: ['hylang'],
    illegal: /\S/,
    contains: [hljs.SHEBANG(), LIST, STRING, HINT, HINT_COL, COMMENT, KEY, COLLECTION, NUMBER, LITERAL]
  };
}

module.exports = hy;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/inform7.js":
/*!**********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/inform7.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Inform 7
Author: Bruno Dias <bruno.r.dias@gmail.com>
Description: Language definition for Inform 7, a DSL for writing parser interactive fiction.
Website: http://inform7.com
*/

function inform7(hljs) {
  const START_BRACKET = '\\[';
  const END_BRACKET = '\\]';
  return {
    name: 'Inform 7',
    aliases: ['i7'],
    case_insensitive: true,
    keywords: {
      // Some keywords more or less unique to I7, for relevance.
      keyword:
        // kind:
        'thing room person man woman animal container ' +
        'supporter backdrop door ' +
        // characteristic:
        'scenery open closed locked inside gender ' +
        // verb:
        'is are say understand ' +
        // misc keyword:
        'kind of rule'
    },
    contains: [
      {
        className: 'string',
        begin: '"',
        end: '"',
        relevance: 0,
        contains: [
          {
            className: 'subst',
            begin: START_BRACKET,
            end: END_BRACKET
          }
        ]
      },
      {
        className: 'section',
        begin: /^(Volume|Book|Part|Chapter|Section|Table)\b/,
        end: '$'
      },
      {
        // Rule definition
        // This is here for relevance.
        begin: /^(Check|Carry out|Report|Instead of|To|Rule|When|Before|After)\b/,
        end: ':',
        contains: [
          {
            // Rule name
            begin: '\\(This',
            end: '\\)'
          }
        ]
      },
      {
        className: 'comment',
        begin: START_BRACKET,
        end: END_BRACKET,
        contains: ['self']
      }
    ]
  };
}

module.exports = inform7;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/ini.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/ini.js ***!
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

/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] } args
 * @returns {string}
 */
function either(...args) {
  const joined = '(' + args.map((x) => source(x)).join("|") + ")";
  return joined;
}

/*
Language: TOML, also INI
Description: TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics.
Contributors: Guillaume Gomez <guillaume1.gomez@gmail.com>
Category: common, config
Website: https://github.com/toml-lang/toml
*/

function ini(hljs) {
  const NUMBERS = {
    className: 'number',
    relevance: 0,
    variants: [
      {
        begin: /([+-]+)?[\d]+_[\d_]+/
      },
      {
        begin: hljs.NUMBER_RE
      }
    ]
  };
  const COMMENTS = hljs.COMMENT();
  COMMENTS.variants = [
    {
      begin: /;/,
      end: /$/
    },
    {
      begin: /#/,
      end: /$/
    }
  ];
  const VARIABLES = {
    className: 'variable',
    variants: [
      {
        begin: /\$[\w\d"][\w\d_]*/
      },
      {
        begin: /\$\{(.*?)\}/
      }
    ]
  };
  const LITERALS = {
    className: 'literal',
    begin: /\bon|off|true|false|yes|no\b/
  };
  const STRINGS = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: "'''",
        end: "'''",
        relevance: 10
      },
      {
        begin: '"""',
        end: '"""',
        relevance: 10
      },
      {
        begin: '"',
        end: '"'
      },
      {
        begin: "'",
        end: "'"
      }
    ]
  };
  const ARRAY = {
    begin: /\[/,
    end: /\]/,
    contains: [
      COMMENTS,
      LITERALS,
      VARIABLES,
      STRINGS,
      NUMBERS,
      'self'
    ],
    relevance: 0
  };

  const BARE_KEY = /[A-Za-z0-9_-]+/;
  const QUOTED_KEY_DOUBLE_QUOTE = /"(\\"|[^"])*"/;
  const QUOTED_KEY_SINGLE_QUOTE = /'[^']*'/;
  const ANY_KEY = either(
    BARE_KEY, QUOTED_KEY_DOUBLE_QUOTE, QUOTED_KEY_SINGLE_QUOTE
  );
  const DOTTED_KEY = concat(
    ANY_KEY, '(\\s*\\.\\s*', ANY_KEY, ')*',
    lookahead(/\s*=\s*[^#\s]/)
  );

  return {
    name: 'TOML, also INI',
    aliases: ['toml'],
    case_insensitive: true,
    illegal: /\S/,
    contains: [
      COMMENTS,
      {
        className: 'section',
        begin: /\[+/,
        end: /\]+/
      },
      {
        begin: DOTTED_KEY,
        className: 'attr',
        starts: {
          end: /$/,
          contains: [
            COMMENTS,
            ARRAY,
            LITERALS,
            VARIABLES,
            STRINGS,
            NUMBERS
          ]
        }
      }
    ]
  };
}

module.exports = ini;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/irpf90.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/irpf90.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: IRPF90
Author: Anthony Scemama <scemama@irsamc.ups-tlse.fr>
Description: IRPF90 is an open-source Fortran code generator
Website: http://irpf90.ups-tlse.fr
Category: scientific
*/

function irpf90(hljs) {
  const PARAMS = {
    className: 'params',
    begin: '\\(',
    end: '\\)'
  };

  const F_KEYWORDS = {
    literal: '.False. .True.',
    keyword: 'kind do while private call intrinsic where elsewhere ' +
      'type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then ' +
      'public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. ' +
      'goto save else use module select case ' +
      'access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit ' +
      'continue format pause cycle exit ' +
      'c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg ' +
      'synchronous nopass non_overridable pass protected volatile abstract extends import ' +
      'non_intrinsic value deferred generic final enumerator class associate bind enum ' +
      'c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t ' +
      'c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double ' +
      'c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr ' +
      'c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer ' +
      'c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor ' +
      'numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ' +
      'ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive ' +
      'pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure ' +
      'integer real character complex logical dimension allocatable|10 parameter ' +
      'external implicit|10 none double precision assign intent optional pointer ' +
      'target in out common equivalence data ' +
      // IRPF90 special keywords
      'begin_provider &begin_provider end_provider begin_shell end_shell begin_template end_template subst assert touch ' +
      'soft_touch provide no_dep free irp_if irp_else irp_endif irp_write irp_read',
    built_in: 'alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint ' +
      'dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl ' +
      'algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama ' +
      'iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod ' +
      'qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log ' +
      'log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate ' +
      'adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product ' +
      'eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul ' +
      'maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product ' +
      'radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind ' +
      'set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer ' +
      'dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ' +
      'ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode ' +
      'is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_of ' +
      'acosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 ' +
      'atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits ' +
      'bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr ' +
      'num_images parity popcnt poppar shifta shiftl shiftr this_image ' +
      // IRPF90 special built_ins
      'IRP_ALIGN irp_here'
  };
  return {
    name: 'IRPF90',
    case_insensitive: true,
    keywords: F_KEYWORDS,
    illegal: /\/\*/,
    contains: [
      hljs.inherit(hljs.APOS_STRING_MODE, {
        className: 'string',
        relevance: 0
      }),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        className: 'string',
        relevance: 0
      }),
      {
        className: 'function',
        beginKeywords: 'subroutine function program',
        illegal: '[${=\\n]',
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          PARAMS
        ]
      },
      hljs.COMMENT('!', '$', {
        relevance: 0
      }),
      hljs.COMMENT('begin_doc', 'end_doc', {
        relevance: 10
      }),
      {
        className: 'number',
        // regex in both fortran and irpf90 should match
        begin: '(?=\\b|\\+|-|\\.)(?:\\.|\\d+\\.?)\\d*([de][+-]?\\d+)?(_[a-z_\\d]+)?',
        relevance: 0
      }
    ]
  };
}

module.exports = irpf90;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/isbl.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/isbl.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: ISBL
Author: Dmitriy Tarasov <dimatar@gmail.com>
Description: built-in language DIRECTUM
Category: enterprise
*/

function isbl(hljs) {
  // Определение идентификаторов
  const UNDERSCORE_IDENT_RE = "[A-Za-zА-Яа-яёЁ_!][A-Za-zА-Яа-яёЁ_0-9]*";

  // Определение имен функций
  const FUNCTION_NAME_IDENT_RE = "[A-Za-zА-Яа-яёЁ_][A-Za-zА-Яа-яёЁ_0-9]*";

  // keyword : ключевые слова
  const KEYWORD =
    "and и else иначе endexcept endfinally endforeach конецвсе endif конецесли endwhile конецпока " +
    "except exitfor finally foreach все if если in в not не or или try while пока ";

  // SYSRES Constants
  const sysres_constants =
    "SYSRES_CONST_ACCES_RIGHT_TYPE_EDIT " +
    "SYSRES_CONST_ACCES_RIGHT_TYPE_FULL " +
    "SYSRES_CONST_ACCES_RIGHT_TYPE_VIEW " +
    "SYSRES_CONST_ACCESS_MODE_REQUISITE_CODE " +
    "SYSRES_CONST_ACCESS_NO_ACCESS_VIEW " +
    "SYSRES_CONST_ACCESS_NO_ACCESS_VIEW_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_ADD_REQUISITE_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_ADD_REQUISITE_YES_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_CHANGE_REQUISITE_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_CHANGE_REQUISITE_YES_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_DELETE_REQUISITE_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_DELETE_REQUISITE_YES_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_EXECUTE_REQUISITE_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_EXECUTE_REQUISITE_YES_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_NO_ACCESS_REQUISITE_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_NO_ACCESS_REQUISITE_YES_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_RATIFY_REQUISITE_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_RATIFY_REQUISITE_YES_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_REQUISITE_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_VIEW " +
    "SYSRES_CONST_ACCESS_RIGHTS_VIEW_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_VIEW_REQUISITE_CODE " +
    "SYSRES_CONST_ACCESS_RIGHTS_VIEW_REQUISITE_YES_CODE " +
    "SYSRES_CONST_ACCESS_TYPE_CHANGE " +
    "SYSRES_CONST_ACCESS_TYPE_CHANGE_CODE " +
    "SYSRES_CONST_ACCESS_TYPE_EXISTS " +
    "SYSRES_CONST_ACCESS_TYPE_EXISTS_CODE " +
    "SYSRES_CONST_ACCESS_TYPE_FULL " +
    "SYSRES_CONST_ACCESS_TYPE_FULL_CODE " +
    "SYSRES_CONST_ACCESS_TYPE_VIEW " +
    "SYSRES_CONST_ACCESS_TYPE_VIEW_CODE " +
    "SYSRES_CONST_ACTION_TYPE_ABORT " +
    "SYSRES_CONST_ACTION_TYPE_ACCEPT " +
    "SYSRES_CONST_ACTION_TYPE_ACCESS_RIGHTS " +
    "SYSRES_CONST_ACTION_TYPE_ADD_ATTACHMENT " +
    "SYSRES_CONST_ACTION_TYPE_CHANGE_CARD " +
    "SYSRES_CONST_ACTION_TYPE_CHANGE_KIND " +
    "SYSRES_CONST_ACTION_TYPE_CHANGE_STORAGE " +
    "SYSRES_CONST_ACTION_TYPE_CONTINUE " +
    "SYSRES_CONST_ACTION_TYPE_COPY " +
    "SYSRES_CONST_ACTION_TYPE_CREATE " +
    "SYSRES_CONST_ACTION_TYPE_CREATE_VERSION " +
    "SYSRES_CONST_ACTION_TYPE_DELETE " +
    "SYSRES_CONST_ACTION_TYPE_DELETE_ATTACHMENT " +
    "SYSRES_CONST_ACTION_TYPE_DELETE_VERSION " +
    "SYSRES_CONST_ACTION_TYPE_DISABLE_DELEGATE_ACCESS_RIGHTS " +
    "SYSRES_CONST_ACTION_TYPE_ENABLE_DELEGATE_ACCESS_RIGHTS " +
    "SYSRES_CONST_ACTION_TYPE_ENCRYPTION_BY_CERTIFICATE " +
    "SYSRES_CONST_ACTION_TYPE_ENCRYPTION_BY_CERTIFICATE_AND_PASSWORD " +
    "SYSRES_CONST_ACTION_TYPE_ENCRYPTION_BY_PASSWORD " +
    "SYSRES_CONST_ACTION_TYPE_EXPORT_WITH_LOCK " +
    "SYSRES_CONST_ACTION_TYPE_EXPORT_WITHOUT_LOCK " +
    "SYSRES_CONST_ACTION_TYPE_IMPORT_WITH_UNLOCK " +
    "SYSRES_CONST_ACTION_TYPE_IMPORT_WITHOUT_UNLOCK " +
    "SYSRES_CONST_ACTION_TYPE_LIFE_CYCLE_STAGE " +
    "SYSRES_CONST_ACTION_TYPE_LOCK " +
    "SYSRES_CONST_ACTION_TYPE_LOCK_FOR_SERVER " +
    "SYSRES_CONST_ACTION_TYPE_LOCK_MODIFY " +
    "SYSRES_CONST_ACTION_TYPE_MARK_AS_READED " +
    "SYSRES_CONST_ACTION_TYPE_MARK_AS_UNREADED " +
    "SYSRES_CONST_ACTION_TYPE_MODIFY " +
    "SYSRES_CONST_ACTION_TYPE_MODIFY_CARD " +
    "SYSRES_CONST_ACTION_TYPE_MOVE_TO_ARCHIVE " +
    "SYSRES_CONST_ACTION_TYPE_OFF_ENCRYPTION " +
    "SYSRES_CONST_ACTION_TYPE_PASSWORD_CHANGE " +
    "SYSRES_CONST_ACTION_TYPE_PERFORM " +
    "SYSRES_CONST_ACTION_TYPE_RECOVER_FROM_LOCAL_COPY " +
    "SYSRES_CONST_ACTION_TYPE_RESTART " +
    "SYSRES_CONST_ACTION_TYPE_RESTORE_FROM_ARCHIVE " +
    "SYSRES_CONST_ACTION_TYPE_REVISION " +
    "SYSRES_CONST_ACTION_TYPE_SEND_BY_MAIL " +
    "SYSRES_CONST_ACTION_TYPE_SIGN " +
    "SYSRES_CONST_ACTION_TYPE_START " +
    "SYSRES_CONST_ACTION_TYPE_UNLOCK " +
    "SYSRES_CONST_ACTION_TYPE_UNLOCK_FROM_SERVER " +
    "SYSRES_CONST_ACTION_TYPE_VERSION_STATE " +
    "SYSRES_CONST_ACTION_TYPE_VERSION_VISIBILITY " +
    "SYSRES_CONST_ACTION_TYPE_VIEW " +
    "SYSRES_CONST_ACTION_TYPE_VIEW_SHADOW_COPY " +
    "SYSRES_CONST_ACTION_TYPE_WORKFLOW_DESCRIPTION_MODIFY " +
    "SYSRES_CONST_ACTION_TYPE_WRITE_HISTORY " +
    "SYSRES_CONST_ACTIVE_VERSION_STATE_PICK_VALUE " +
    "SYSRES_CONST_ADD_REFERENCE_MODE_NAME " +
    "SYSRES_CONST_ADDITION_REQUISITE_CODE " +
    "SYSRES_CONST_ADDITIONAL_PARAMS_REQUISITE_CODE " +
    "SYSRES_CONST_ADITIONAL_JOB_END_DATE_REQUISITE_NAME " +
    "SYSRES_CONST_ADITIONAL_JOB_READ_REQUISITE_NAME " +
    "SYSRES_CONST_ADITIONAL_JOB_START_DATE_REQUISITE_NAME " +
    "SYSRES_CONST_ADITIONAL_JOB_STATE_REQUISITE_NAME " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_ADDING_USER_TO_GROUP_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_ADDING_USER_TO_GROUP_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_CREATION_COMP_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_CREATION_COMP_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_CREATION_GROUP_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_CREATION_GROUP_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_CREATION_USER_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_CREATION_USER_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_DATABASE_USER_CREATION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_DATABASE_USER_CREATION_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_DATABASE_USER_DELETION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_DATABASE_USER_DELETION_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_DELETION_COMP_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_DELETION_COMP_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_DELETION_GROUP_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_DELETION_GROUP_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_DELETION_USER_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_DELETION_USER_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_DELETION_USER_FROM_GROUP_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_DELETION_USER_FROM_GROUP_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_GRANTING_FILTERER_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_GRANTING_FILTERER_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_GRANTING_FILTERER_RESTRICTION_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_GRANTING_FILTERER_RESTRICTION_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_GRANTING_PRIVILEGE_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_GRANTING_PRIVILEGE_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_GRANTING_RIGHTS_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_GRANTING_RIGHTS_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_IS_MAIN_SERVER_CHANGED_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_IS_MAIN_SERVER_CHANGED_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_IS_PUBLIC_CHANGED_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_IS_PUBLIC_CHANGED_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_REMOVING_FILTERER_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_REMOVING_FILTERER_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_REMOVING_FILTERER_RESTRICTION_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_REMOVING_FILTERER_RESTRICTION_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_REMOVING_PRIVILEGE_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_REMOVING_PRIVILEGE_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_REMOVING_RIGHTS_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_REMOVING_RIGHTS_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_SERVER_LOGIN_CREATION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_SERVER_LOGIN_CREATION_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_SERVER_LOGIN_DELETION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_SERVER_LOGIN_DELETION_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_CATEGORY_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_CATEGORY_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_COMP_TITLE_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_COMP_TITLE_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_FULL_NAME_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_FULL_NAME_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_GROUP_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_GROUP_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_PARENT_GROUP_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_PARENT_GROUP_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_USER_AUTH_TYPE_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_USER_AUTH_TYPE_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_USER_LOGIN_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_USER_LOGIN_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_USER_STATUS_ACTION " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_UPDATING_USER_STATUS_ACTION_CODE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_USER_PASSWORD_CHANGE " +
    "SYSRES_CONST_ADMINISTRATION_HISTORY_USER_PASSWORD_CHANGE_ACTION " +
    "SYSRES_CONST_ALL_ACCEPT_CONDITION_RUS " +
    "SYSRES_CONST_ALL_USERS_GROUP " +
    "SYSRES_CONST_ALL_USERS_GROUP_NAME " +
    "SYSRES_CONST_ALL_USERS_SERVER_GROUP_NAME " +
    "SYSRES_CONST_ALLOWED_ACCESS_TYPE_CODE " +
    "SYSRES_CONST_ALLOWED_ACCESS_TYPE_NAME " +
    "SYSRES_CONST_APP_VIEWER_TYPE_REQUISITE_CODE " +
    "SYSRES_CONST_APPROVING_SIGNATURE_NAME " +
    "SYSRES_CONST_APPROVING_SIGNATURE_REQUISITE_CODE " +
    "SYSRES_CONST_ASSISTANT_SUBSTITUE_TYPE " +
    "SYSRES_CONST_ASSISTANT_SUBSTITUE_TYPE_CODE " +
    "SYSRES_CONST_ATTACH_TYPE_COMPONENT_TOKEN " +
    "SYSRES_CONST_ATTACH_TYPE_DOC " +
    "SYSRES_CONST_ATTACH_TYPE_EDOC " +
    "SYSRES_CONST_ATTACH_TYPE_FOLDER " +
    "SYSRES_CONST_ATTACH_TYPE_JOB " +
    "SYSRES_CONST_ATTACH_TYPE_REFERENCE " +
    "SYSRES_CONST_ATTACH_TYPE_TASK " +
    "SYSRES_CONST_AUTH_ENCODED_PASSWORD " +
    "SYSRES_CONST_AUTH_ENCODED_PASSWORD_CODE " +
    "SYSRES_CONST_AUTH_NOVELL " +
    "SYSRES_CONST_AUTH_PASSWORD " +
    "SYSRES_CONST_AUTH_PASSWORD_CODE " +
    "SYSRES_CONST_AUTH_WINDOWS " +
    "SYSRES_CONST_AUTHENTICATING_SIGNATURE_NAME " +
    "SYSRES_CONST_AUTHENTICATING_SIGNATURE_REQUISITE_CODE " +
    "SYSRES_CONST_AUTO_ENUM_METHOD_FLAG " +
    "SYSRES_CONST_AUTO_NUMERATION_CODE " +
    "SYSRES_CONST_AUTO_STRONG_ENUM_METHOD_FLAG " +
    "SYSRES_CONST_AUTOTEXT_NAME_REQUISITE_CODE " +
    "SYSRES_CONST_AUTOTEXT_TEXT_REQUISITE_CODE " +
    "SYSRES_CONST_AUTOTEXT_USAGE_ALL " +
    "SYSRES_CONST_AUTOTEXT_USAGE_ALL_CODE " +
    "SYSRES_CONST_AUTOTEXT_USAGE_SIGN " +
    "SYSRES_CONST_AUTOTEXT_USAGE_SIGN_CODE " +
    "SYSRES_CONST_AUTOTEXT_USAGE_WORK " +
    "SYSRES_CONST_AUTOTEXT_USAGE_WORK_CODE " +
    "SYSRES_CONST_AUTOTEXT_USE_ANYWHERE_CODE " +
    "SYSRES_CONST_AUTOTEXT_USE_ON_SIGNING_CODE " +
    "SYSRES_CONST_AUTOTEXT_USE_ON_WORK_CODE " +
    "SYSRES_CONST_BEGIN_DATE_REQUISITE_CODE " +
    "SYSRES_CONST_BLACK_LIFE_CYCLE_STAGE_FONT_COLOR " +
    "SYSRES_CONST_BLUE_LIFE_CYCLE_STAGE_FONT_COLOR " +
    "SYSRES_CONST_BTN_PART " +
    "SYSRES_CONST_CALCULATED_ROLE_TYPE_CODE " +
    "SYSRES_CONST_CALL_TYPE_VARIABLE_BUTTON_VALUE " +
    "SYSRES_CONST_CALL_TYPE_VARIABLE_PROGRAM_VALUE " +
    "SYSRES_CONST_CANCEL_MESSAGE_FUNCTION_RESULT " +
    "SYSRES_CONST_CARD_PART " +
    "SYSRES_CONST_CARD_REFERENCE_MODE_NAME " +
    "SYSRES_CONST_CERTIFICATE_TYPE_REQUISITE_ENCRYPT_VALUE " +
    "SYSRES_CONST_CERTIFICATE_TYPE_REQUISITE_SIGN_AND_ENCRYPT_VALUE " +
    "SYSRES_CONST_CERTIFICATE_TYPE_REQUISITE_SIGN_VALUE " +
    "SYSRES_CONST_CHECK_PARAM_VALUE_DATE_PARAM_TYPE " +
    "SYSRES_CONST_CHECK_PARAM_VALUE_FLOAT_PARAM_TYPE " +
    "SYSRES_CONST_CHECK_PARAM_VALUE_INTEGER_PARAM_TYPE " +
    "SYSRES_CONST_CHECK_PARAM_VALUE_PICK_PARAM_TYPE " +
    "SYSRES_CONST_CHECK_PARAM_VALUE_REEFRENCE_PARAM_TYPE " +
    "SYSRES_CONST_CLOSED_RECORD_FLAG_VALUE_FEMININE " +
    "SYSRES_CONST_CLOSED_RECORD_FLAG_VALUE_MASCULINE " +
    "SYSRES_CONST_CODE_COMPONENT_TYPE_ADMIN " +
    "SYSRES_CONST_CODE_COMPONENT_TYPE_DEVELOPER " +
    "SYSRES_CONST_CODE_COMPONENT_TYPE_DOCS " +
    "SYSRES_CONST_CODE_COMPONENT_TYPE_EDOC_CARDS " +
    "SYSRES_CONST_CODE_COMPONENT_TYPE_EXTERNAL_EXECUTABLE " +
    "SYSRES_CONST_CODE_COMPONENT_TYPE_OTHER " +
    "SYSRES_CONST_CODE_COMPONENT_TYPE_REFERENCE " +
    "SYSRES_CONST_CODE_COMPONENT_TYPE_REPORT " +
    "SYSRES_CONST_CODE_COMPONENT_TYPE_SCRIPT " +
    "SYSRES_CONST_CODE_COMPONENT_TYPE_URL " +
    "SYSRES_CONST_CODE_REQUISITE_ACCESS " +
    "SYSRES_CONST_CODE_REQUISITE_CODE " +
    "SYSRES_CONST_CODE_REQUISITE_COMPONENT " +
    "SYSRES_CONST_CODE_REQUISITE_DESCRIPTION " +
    "SYSRES_CONST_CODE_REQUISITE_EXCLUDE_COMPONENT " +
    "SYSRES_CONST_CODE_REQUISITE_RECORD " +
    "SYSRES_CONST_COMMENT_REQ_CODE " +
    "SYSRES_CONST_COMMON_SETTINGS_REQUISITE_CODE " +
    "SYSRES_CONST_COMP_CODE_GRD " +
    "SYSRES_CONST_COMPONENT_GROUP_TYPE_REQUISITE_CODE " +
    "SYSRES_CONST_COMPONENT_TYPE_ADMIN_COMPONENTS " +
    "SYSRES_CONST_COMPONENT_TYPE_DEVELOPER_COMPONENTS " +
    "SYSRES_CONST_COMPONENT_TYPE_DOCS " +
    "SYSRES_CONST_COMPONENT_TYPE_EDOC_CARDS " +
    "SYSRES_CONST_COMPONENT_TYPE_EDOCS " +
    "SYSRES_CONST_COMPONENT_TYPE_EXTERNAL_EXECUTABLE " +
    "SYSRES_CONST_COMPONENT_TYPE_OTHER " +
    "SYSRES_CONST_COMPONENT_TYPE_REFERENCE_TYPES " +
    "SYSRES_CONST_COMPONENT_TYPE_REFERENCES " +
    "SYSRES_CONST_COMPONENT_TYPE_REPORTS " +
    "SYSRES_CONST_COMPONENT_TYPE_SCRIPTS " +
    "SYSRES_CONST_COMPONENT_TYPE_URL " +
    "SYSRES_CONST_COMPONENTS_REMOTE_SERVERS_VIEW_CODE " +
    "SYSRES_CONST_CONDITION_BLOCK_DESCRIPTION " +
    "SYSRES_CONST_CONST_FIRM_STATUS_COMMON " +
    "SYSRES_CONST_CONST_FIRM_STATUS_INDIVIDUAL " +
    "SYSRES_CONST_CONST_NEGATIVE_VALUE " +
    "SYSRES_CONST_CONST_POSITIVE_VALUE " +
    "SYSRES_CONST_CONST_SERVER_STATUS_DONT_REPLICATE " +
    "SYSRES_CONST_CONST_SERVER_STATUS_REPLICATE " +
    "SYSRES_CONST_CONTENTS_REQUISITE_CODE " +
    "SYSRES_CONST_DATA_TYPE_BOOLEAN " +
    "SYSRES_CONST_DATA_TYPE_DATE " +
    "SYSRES_CONST_DATA_TYPE_FLOAT " +
    "SYSRES_CONST_DATA_TYPE_INTEGER " +
    "SYSRES_CONST_DATA_TYPE_PICK " +
    "SYSRES_CONST_DATA_TYPE_REFERENCE " +
    "SYSRES_CONST_DATA_TYPE_STRING " +
    "SYSRES_CONST_DATA_TYPE_TEXT " +
    "SYSRES_CONST_DATA_TYPE_VARIANT " +
    "SYSRES_CONST_DATE_CLOSE_REQ_CODE " +
    "SYSRES_CONST_DATE_FORMAT_DATE_ONLY_CHAR " +
    "SYSRES_CONST_DATE_OPEN_REQ_CODE " +
    "SYSRES_CONST_DATE_REQUISITE " +
    "SYSRES_CONST_DATE_REQUISITE_CODE " +
    "SYSRES_CONST_DATE_REQUISITE_NAME " +
    "SYSRES_CONST_DATE_REQUISITE_TYPE " +
    "SYSRES_CONST_DATE_TYPE_CHAR " +
    "SYSRES_CONST_DATETIME_FORMAT_VALUE " +
    "SYSRES_CONST_DEA_ACCESS_RIGHTS_ACTION_CODE " +
    "SYSRES_CONST_DESCRIPTION_LOCALIZE_ID_REQUISITE_CODE " +
    "SYSRES_CONST_DESCRIPTION_REQUISITE_CODE " +
    "SYSRES_CONST_DET1_PART " +
    "SYSRES_CONST_DET2_PART " +
    "SYSRES_CONST_DET3_PART " +
    "SYSRES_CONST_DET4_PART " +
    "SYSRES_CONST_DET5_PART " +
    "SYSRES_CONST_DET6_PART " +
    "SYSRES_CONST_DETAIL_DATASET_KEY_REQUISITE_CODE " +
    "SYSRES_CONST_DETAIL_PICK_REQUISITE_CODE " +
    "SYSRES_CONST_DETAIL_REQ_CODE " +
    "SYSRES_CONST_DO_NOT_USE_ACCESS_TYPE_CODE " +
    "SYSRES_CONST_DO_NOT_USE_ACCESS_TYPE_NAME " +
    "SYSRES_CONST_DO_NOT_USE_ON_VIEW_ACCESS_TYPE_CODE " +
    "SYSRES_CONST_DO_NOT_USE_ON_VIEW_ACCESS_TYPE_NAME " +
    "SYSRES_CONST_DOCUMENT_STORAGES_CODE " +
    "SYSRES_CONST_DOCUMENT_TEMPLATES_TYPE_NAME " +
    "SYSRES_CONST_DOUBLE_REQUISITE_CODE " +
    "SYSRES_CONST_EDITOR_CLOSE_FILE_OBSERV_TYPE_CODE " +
    "SYSRES_CONST_EDITOR_CLOSE_PROCESS_OBSERV_TYPE_CODE " +
    "SYSRES_CONST_EDITOR_TYPE_REQUISITE_CODE " +
    "SYSRES_CONST_EDITORS_APPLICATION_NAME_REQUISITE_CODE " +
    "SYSRES_CONST_EDITORS_CREATE_SEVERAL_PROCESSES_REQUISITE_CODE " +
    "SYSRES_CONST_EDITORS_EXTENSION_REQUISITE_CODE " +
    "SYSRES_CONST_EDITORS_OBSERVER_BY_PROCESS_TYPE " +
    "SYSRES_CONST_EDITORS_REFERENCE_CODE " +
    "SYSRES_CONST_EDITORS_REPLACE_SPEC_CHARS_REQUISITE_CODE " +
    "SYSRES_CONST_EDITORS_USE_PLUGINS_REQUISITE_CODE " +
    "SYSRES_CONST_EDITORS_VIEW_DOCUMENT_OPENED_TO_EDIT_CODE " +
    "SYSRES_CONST_EDOC_CARD_TYPE_REQUISITE_CODE " +
    "SYSRES_CONST_EDOC_CARD_TYPES_LINK_REQUISITE_CODE " +
    "SYSRES_CONST_EDOC_CERTIFICATE_AND_PASSWORD_ENCODE_CODE " +
    "SYSRES_CONST_EDOC_CERTIFICATE_ENCODE_CODE " +
    "SYSRES_CONST_EDOC_DATE_REQUISITE_CODE " +
    "SYSRES_CONST_EDOC_KIND_REFERENCE_CODE " +
    "SYSRES_CONST_EDOC_KINDS_BY_TEMPLATE_ACTION_CODE " +
    "SYSRES_CONST_EDOC_MANAGE_ACCESS_CODE " +
    "SYSRES_CONST_EDOC_NONE_ENCODE_CODE " +
    "SYSRES_CONST_EDOC_NUMBER_REQUISITE_CODE " +
    "SYSRES_CONST_EDOC_PASSWORD_ENCODE_CODE " +
    "SYSRES_CONST_EDOC_READONLY_ACCESS_CODE " +
    "SYSRES_CONST_EDOC_SHELL_LIFE_TYPE_VIEW_VALUE " +
    "SYSRES_CONST_EDOC_SIZE_RESTRICTION_PRIORITY_REQUISITE_CODE " +
    "SYSRES_CONST_EDOC_STORAGE_CHECK_ACCESS_RIGHTS_REQUISITE_CODE " +
    "SYSRES_CONST_EDOC_STORAGE_COMPUTER_NAME_REQUISITE_CODE " +
    "SYSRES_CONST_EDOC_STORAGE_DATABASE_NAME_REQUISITE_CODE " +
    "SYSRES_CONST_EDOC_STORAGE_EDIT_IN_STORAGE_REQUISITE_CODE " +
    "SYSRES_CONST_EDOC_STORAGE_LOCAL_PATH_REQUISITE_CODE " +
    "SYSRES_CONST_EDOC_STORAGE_SHARED_SOURCE_NAME_REQUISITE_CODE " +
    "SYSRES_CONST_EDOC_TEMPLATE_REQUISITE_CODE " +
    "SYSRES_CONST_EDOC_TYPES_REFERENCE_CODE " +
    "SYSRES_CONST_EDOC_VERSION_ACTIVE_STAGE_CODE " +
    "SYSRES_CONST_EDOC_VERSION_DESIGN_STAGE_CODE " +
    "SYSRES_CONST_EDOC_VERSION_OBSOLETE_STAGE_CODE " +
    "SYSRES_CONST_EDOC_WRITE_ACCES_CODE " +
    "SYSRES_CONST_EDOCUMENT_CARD_REQUISITES_REFERENCE_CODE_SELECTED_REQUISITE " +
    "SYSRES_CONST_ENCODE_CERTIFICATE_TYPE_CODE " +
    "SYSRES_CONST_END_DATE_REQUISITE_CODE " +
    "SYSRES_CONST_ENUMERATION_TYPE_REQUISITE_CODE " +
    "SYSRES_CONST_EXECUTE_ACCESS_RIGHTS_TYPE_CODE " +
    "SYSRES_CONST_EXECUTIVE_FILE_STORAGE_TYPE " +
    "SYSRES_CONST_EXIST_CONST " +
    "SYSRES_CONST_EXIST_VALUE " +
    "SYSRES_CONST_EXPORT_LOCK_TYPE_ASK " +
    "SYSRES_CONST_EXPORT_LOCK_TYPE_WITH_LOCK " +
    "SYSRES_CONST_EXPORT_LOCK_TYPE_WITHOUT_LOCK " +
    "SYSRES_CONST_EXPORT_VERSION_TYPE_ASK " +
    "SYSRES_CONST_EXPORT_VERSION_TYPE_LAST " +
    "SYSRES_CONST_EXPORT_VERSION_TYPE_LAST_ACTIVE " +
    "SYSRES_CONST_EXTENSION_REQUISITE_CODE " +
    "SYSRES_CONST_FILTER_NAME_REQUISITE_CODE " +
    "SYSRES_CONST_FILTER_REQUISITE_CODE " +
    "SYSRES_CONST_FILTER_TYPE_COMMON_CODE " +
    "SYSRES_CONST_FILTER_TYPE_COMMON_NAME " +
    "SYSRES_CONST_FILTER_TYPE_USER_CODE " +
    "SYSRES_CONST_FILTER_TYPE_USER_NAME " +
    "SYSRES_CONST_FILTER_VALUE_REQUISITE_NAME " +
    "SYSRES_CONST_FLOAT_NUMBER_FORMAT_CHAR " +
    "SYSRES_CONST_FLOAT_REQUISITE_TYPE " +
    "SYSRES_CONST_FOLDER_AUTHOR_VALUE " +
    "SYSRES_CONST_FOLDER_KIND_ANY_OBJECTS " +
    "SYSRES_CONST_FOLDER_KIND_COMPONENTS " +
    "SYSRES_CONST_FOLDER_KIND_EDOCS " +
    "SYSRES_CONST_FOLDER_KIND_JOBS " +
    "SYSRES_CONST_FOLDER_KIND_TASKS " +
    "SYSRES_CONST_FOLDER_TYPE_COMMON " +
    "SYSRES_CONST_FOLDER_TYPE_COMPONENT " +
    "SYSRES_CONST_FOLDER_TYPE_FAVORITES " +
    "SYSRES_CONST_FOLDER_TYPE_INBOX " +
    "SYSRES_CONST_FOLDER_TYPE_OUTBOX " +
    "SYSRES_CONST_FOLDER_TYPE_QUICK_LAUNCH " +
    "SYSRES_CONST_FOLDER_TYPE_SEARCH " +
    "SYSRES_CONST_FOLDER_TYPE_SHORTCUTS " +
    "SYSRES_CONST_FOLDER_TYPE_USER " +
    "SYSRES_CONST_FROM_DICTIONARY_ENUM_METHOD_FLAG " +
    "SYSRES_CONST_FULL_SUBSTITUTE_TYPE " +
    "SYSRES_CONST_FULL_SUBSTITUTE_TYPE_CODE " +
    "SYSRES_CONST_FUNCTION_CANCEL_RESULT " +
    "SYSRES_CONST_FUNCTION_CATEGORY_SYSTEM " +
    "SYSRES_CONST_FUNCTION_CATEGORY_USER " +
    "SYSRES_CONST_FUNCTION_FAILURE_RESULT " +
    "SYSRES_CONST_FUNCTION_SAVE_RESULT " +
    "SYSRES_CONST_GENERATED_REQUISITE " +
    "SYSRES_CONST_GREEN_LIFE_CYCLE_STAGE_FONT_COLOR " +
    "SYSRES_CONST_GROUP_ACCOUNT_TYPE_VALUE_CODE " +
    "SYSRES_CONST_GROUP_CATEGORY_NORMAL_CODE " +
    "SYSRES_CONST_GROUP_CATEGORY_NORMAL_NAME " +
    "SYSRES_CONST_GROUP_CATEGORY_SERVICE_CODE " +
    "SYSRES_CONST_GROUP_CATEGORY_SERVICE_NAME " +
    "SYSRES_CONST_GROUP_COMMON_CATEGORY_FIELD_VALUE " +
    "SYSRES_CONST_GROUP_FULL_NAME_REQUISITE_CODE " +
    "SYSRES_CONST_GROUP_NAME_REQUISITE_CODE " +
    "SYSRES_CONST_GROUP_RIGHTS_T_REQUISITE_CODE " +
    "SYSRES_CONST_GROUP_SERVER_CODES_REQUISITE_CODE " +
    "SYSRES_CONST_GROUP_SERVER_NAME_REQUISITE_CODE " +
    "SYSRES_CONST_GROUP_SERVICE_CATEGORY_FIELD_VALUE " +
    "SYSRES_CONST_GROUP_USER_REQUISITE_CODE " +
    "SYSRES_CONST_GROUPS_REFERENCE_CODE " +
    "SYSRES_CONST_GROUPS_REQUISITE_CODE " +
    "SYSRES_CONST_HIDDEN_MODE_NAME " +
    "SYSRES_CONST_HIGH_LVL_REQUISITE_CODE " +
    "SYSRES_CONST_HISTORY_ACTION_CREATE_CODE " +
    "SYSRES_CONST_HISTORY_ACTION_DELETE_CODE " +
    "SYSRES_CONST_HISTORY_ACTION_EDIT_CODE " +
    "SYSRES_CONST_HOUR_CHAR " +
    "SYSRES_CONST_ID_REQUISITE_CODE " +
    "SYSRES_CONST_IDSPS_REQUISITE_CODE " +
    "SYSRES_CONST_IMAGE_MODE_COLOR " +
    "SYSRES_CONST_IMAGE_MODE_GREYSCALE " +
    "SYSRES_CONST_IMAGE_MODE_MONOCHROME " +
    "SYSRES_CONST_IMPORTANCE_HIGH " +
    "SYSRES_CONST_IMPORTANCE_LOW " +
    "SYSRES_CONST_IMPORTANCE_NORMAL " +
    "SYSRES_CONST_IN_DESIGN_VERSION_STATE_PICK_VALUE " +
    "SYSRES_CONST_INCOMING_WORK_RULE_TYPE_CODE " +
    "SYSRES_CONST_INT_REQUISITE " +
    "SYSRES_CONST_INT_REQUISITE_TYPE " +
    "SYSRES_CONST_INTEGER_NUMBER_FORMAT_CHAR " +
    "SYSRES_CONST_INTEGER_TYPE_CHAR " +
    "SYSRES_CONST_IS_GENERATED_REQUISITE_NEGATIVE_VALUE " +
    "SYSRES_CONST_IS_PUBLIC_ROLE_REQUISITE_CODE " +
    "SYSRES_CONST_IS_REMOTE_USER_NEGATIVE_VALUE " +
    "SYSRES_CONST_IS_REMOTE_USER_POSITIVE_VALUE " +
    "SYSRES_CONST_IS_STORED_REQUISITE_NEGATIVE_VALUE " +
    "SYSRES_CONST_IS_STORED_REQUISITE_STORED_VALUE " +
    "SYSRES_CONST_ITALIC_LIFE_CYCLE_STAGE_DRAW_STYLE " +
    "SYSRES_CONST_JOB_BLOCK_DESCRIPTION " +
    "SYSRES_CONST_JOB_KIND_CONTROL_JOB " +
    "SYSRES_CONST_JOB_KIND_JOB " +
    "SYSRES_CONST_JOB_KIND_NOTICE " +
    "SYSRES_CONST_JOB_STATE_ABORTED " +
    "SYSRES_CONST_JOB_STATE_COMPLETE " +
    "SYSRES_CONST_JOB_STATE_WORKING " +
    "SYSRES_CONST_KIND_REQUISITE_CODE " +
    "SYSRES_CONST_KIND_REQUISITE_NAME " +
    "SYSRES_CONST_KINDS_CREATE_SHADOW_COPIES_REQUISITE_CODE " +
    "SYSRES_CONST_KINDS_DEFAULT_EDOC_LIFE_STAGE_REQUISITE_CODE " +
    "SYSRES_CONST_KINDS_EDOC_ALL_TEPLATES_ALLOWED_REQUISITE_CODE " +
    "SYSRES_CONST_KINDS_EDOC_ALLOW_LIFE_CYCLE_STAGE_CHANGING_REQUISITE_CODE " +
    "SYSRES_CONST_KINDS_EDOC_ALLOW_MULTIPLE_ACTIVE_VERSIONS_REQUISITE_CODE " +
    "SYSRES_CONST_KINDS_EDOC_SHARE_ACCES_RIGHTS_BY_DEFAULT_CODE " +
    "SYSRES_CONST_KINDS_EDOC_TEMPLATE_REQUISITE_CODE " +
    "SYSRES_CONST_KINDS_EDOC_TYPE_REQUISITE_CODE " +
    "SYSRES_CONST_KINDS_SIGNERS_REQUISITES_CODE " +
    "SYSRES_CONST_KOD_INPUT_TYPE " +
    "SYSRES_CONST_LAST_UPDATE_DATE_REQUISITE_CODE " +
    "SYSRES_CONST_LIFE_CYCLE_START_STAGE_REQUISITE_CODE " +
    "SYSRES_CONST_LILAC_LIFE_CYCLE_STAGE_FONT_COLOR " +
    "SYSRES_CONST_LINK_OBJECT_KIND_COMPONENT " +
    "SYSRES_CONST_LINK_OBJECT_KIND_DOCUMENT " +
    "SYSRES_CONST_LINK_OBJECT_KIND_EDOC " +
    "SYSRES_CONST_LINK_OBJECT_KIND_FOLDER " +
    "SYSRES_CONST_LINK_OBJECT_KIND_JOB " +
    "SYSRES_CONST_LINK_OBJECT_KIND_REFERENCE " +
    "SYSRES_CONST_LINK_OBJECT_KIND_TASK " +
    "SYSRES_CONST_LINK_REF_TYPE_REQUISITE_CODE " +
    "SYSRES_CONST_LIST_REFERENCE_MODE_NAME " +
    "SYSRES_CONST_LOCALIZATION_DICTIONARY_MAIN_VIEW_CODE " +
    "SYSRES_CONST_MAIN_VIEW_CODE " +
    "SYSRES_CONST_MANUAL_ENUM_METHOD_FLAG " +
    "SYSRES_CONST_MASTER_COMP_TYPE_REQUISITE_CODE " +
    "SYSRES_CONST_MASTER_TABLE_REC_ID_REQUISITE_CODE " +
    "SYSRES_CONST_MAXIMIZED_MODE_NAME " +
    "SYSRES_CONST_ME_VALUE " +
    "SYSRES_CONST_MESSAGE_ATTENTION_CAPTION " +
    "SYSRES_CONST_MESSAGE_CONFIRMATION_CAPTION " +
    "SYSRES_CONST_MESSAGE_ERROR_CAPTION " +
    "SYSRES_CONST_MESSAGE_INFORMATION_CAPTION " +
    "SYSRES_CONST_MINIMIZED_MODE_NAME " +
    "SYSRES_CONST_MINUTE_CHAR " +
    "SYSRES_CONST_MODULE_REQUISITE_CODE " +
    "SYSRES_CONST_MONITORING_BLOCK_DESCRIPTION " +
    "SYSRES_CONST_MONTH_FORMAT_VALUE " +
    "SYSRES_CONST_NAME_LOCALIZE_ID_REQUISITE_CODE " +
    "SYSRES_CONST_NAME_REQUISITE_CODE " +
    "SYSRES_CONST_NAME_SINGULAR_REQUISITE_CODE " +
    "SYSRES_CONST_NAMEAN_INPUT_TYPE " +
    "SYSRES_CONST_NEGATIVE_PICK_VALUE " +
    "SYSRES_CONST_NEGATIVE_VALUE " +
    "SYSRES_CONST_NO " +
    "SYSRES_CONST_NO_PICK_VALUE " +
    "SYSRES_CONST_NO_SIGNATURE_REQUISITE_CODE " +
    "SYSRES_CONST_NO_VALUE " +
    "SYSRES_CONST_NONE_ACCESS_RIGHTS_TYPE_CODE " +
    "SYSRES_CONST_NONOPERATING_RECORD_FLAG_VALUE " +
    "SYSRES_CONST_NONOPERATING_RECORD_FLAG_VALUE_MASCULINE " +
    "SYSRES_CONST_NORMAL_ACCESS_RIGHTS_TYPE_CODE " +
    "SYSRES_CONST_NORMAL_LIFE_CYCLE_STAGE_DRAW_STYLE " +
    "SYSRES_CONST_NORMAL_MODE_NAME " +
    "SYSRES_CONST_NOT_ALLOWED_ACCESS_TYPE_CODE " +
    "SYSRES_CONST_NOT_ALLOWED_ACCESS_TYPE_NAME " +
    "SYSRES_CONST_NOTE_REQUISITE_CODE " +
    "SYSRES_CONST_NOTICE_BLOCK_DESCRIPTION " +
    "SYSRES_CONST_NUM_REQUISITE " +
    "SYSRES_CONST_NUM_STR_REQUISITE_CODE " +
    "SYSRES_CONST_NUMERATION_AUTO_NOT_STRONG " +
    "SYSRES_CONST_NUMERATION_AUTO_STRONG " +
    "SYSRES_CONST_NUMERATION_FROM_DICTONARY " +
    "SYSRES_CONST_NUMERATION_MANUAL " +
    "SYSRES_CONST_NUMERIC_TYPE_CHAR " +
    "SYSRES_CONST_NUMREQ_REQUISITE_CODE " +
    "SYSRES_CONST_OBSOLETE_VERSION_STATE_PICK_VALUE " +
    "SYSRES_CONST_OPERATING_RECORD_FLAG_VALUE " +
    "SYSRES_CONST_OPERATING_RECORD_FLAG_VALUE_CODE " +
    "SYSRES_CONST_OPERATING_RECORD_FLAG_VALUE_FEMININE " +
    "SYSRES_CONST_OPERATING_RECORD_FLAG_VALUE_MASCULINE " +
    "SYSRES_CONST_OPTIONAL_FORM_COMP_REQCODE_PREFIX " +
    "SYSRES_CONST_ORANGE_LIFE_CYCLE_STAGE_FONT_COLOR " +
    "SYSRES_CONST_ORIGINALREF_REQUISITE_CODE " +
    "SYSRES_CONST_OURFIRM_REF_CODE " +
    "SYSRES_CONST_OURFIRM_REQUISITE_CODE " +
    "SYSRES_CONST_OURFIRM_VAR " +
    "SYSRES_CONST_OUTGOING_WORK_RULE_TYPE_CODE " +
    "SYSRES_CONST_PICK_NEGATIVE_RESULT " +
    "SYSRES_CONST_PICK_POSITIVE_RESULT " +
    "SYSRES_CONST_PICK_REQUISITE " +
    "SYSRES_CONST_PICK_REQUISITE_TYPE " +
    "SYSRES_CONST_PICK_TYPE_CHAR " +
    "SYSRES_CONST_PLAN_STATUS_REQUISITE_CODE " +
    "SYSRES_CONST_PLATFORM_VERSION_COMMENT " +
    "SYSRES_CONST_PLUGINS_SETTINGS_DESCRIPTION_REQUISITE_CODE " +
    "SYSRES_CONST_POSITIVE_PICK_VALUE " +
    "SYSRES_CONST_POWER_TO_CREATE_ACTION_CODE " +
    "SYSRES_CONST_POWER_TO_SIGN_ACTION_CODE " +
    "SYSRES_CONST_PRIORITY_REQUISITE_CODE " +
    "SYSRES_CONST_QUALIFIED_TASK_TYPE " +
    "SYSRES_CONST_QUALIFIED_TASK_TYPE_CODE " +
    "SYSRES_CONST_RECSTAT_REQUISITE_CODE " +
    "SYSRES_CONST_RED_LIFE_CYCLE_STAGE_FONT_COLOR " +
    "SYSRES_CONST_REF_ID_T_REF_TYPE_REQUISITE_CODE " +
    "SYSRES_CONST_REF_REQUISITE " +
    "SYSRES_CONST_REF_REQUISITE_TYPE " +
    "SYSRES_CONST_REF_REQUISITES_REFERENCE_CODE_SELECTED_REQUISITE " +
    "SYSRES_CONST_REFERENCE_RECORD_HISTORY_CREATE_ACTION_CODE " +
    "SYSRES_CONST_REFERENCE_RECORD_HISTORY_DELETE_ACTION_CODE " +
    "SYSRES_CONST_REFERENCE_RECORD_HISTORY_MODIFY_ACTION_CODE " +
    "SYSRES_CONST_REFERENCE_TYPE_CHAR " +
    "SYSRES_CONST_REFERENCE_TYPE_REQUISITE_NAME " +
    "SYSRES_CONST_REFERENCES_ADD_PARAMS_REQUISITE_CODE " +
    "SYSRES_CONST_REFERENCES_DISPLAY_REQUISITE_REQUISITE_CODE " +
    "SYSRES_CONST_REMOTE_SERVER_STATUS_WORKING " +
    "SYSRES_CONST_REMOTE_SERVER_TYPE_MAIN " +
    "SYSRES_CONST_REMOTE_SERVER_TYPE_SECONDARY " +
    "SYSRES_CONST_REMOTE_USER_FLAG_VALUE_CODE " +
    "SYSRES_CONST_REPORT_APP_EDITOR_INTERNAL " +
    "SYSRES_CONST_REPORT_BASE_REPORT_ID_REQUISITE_CODE " +
    "SYSRES_CONST_REPORT_BASE_REPORT_REQUISITE_CODE " +
    "SYSRES_CONST_REPORT_SCRIPT_REQUISITE_CODE " +
    "SYSRES_CONST_REPORT_TEMPLATE_REQUISITE_CODE " +
    "SYSRES_CONST_REPORT_VIEWER_CODE_REQUISITE_CODE " +
    "SYSRES_CONST_REQ_ALLOW_COMPONENT_DEFAULT_VALUE " +
    "SYSRES_CONST_REQ_ALLOW_RECORD_DEFAULT_VALUE " +
    "SYSRES_CONST_REQ_ALLOW_SERVER_COMPONENT_DEFAULT_VALUE " +
    "SYSRES_CONST_REQ_MODE_AVAILABLE_CODE " +
    "SYSRES_CONST_REQ_MODE_EDIT_CODE " +
    "SYSRES_CONST_REQ_MODE_HIDDEN_CODE " +
    "SYSRES_CONST_REQ_MODE_NOT_AVAILABLE_CODE " +
    "SYSRES_CONST_REQ_MODE_VIEW_CODE " +
    "SYSRES_CONST_REQ_NUMBER_REQUISITE_CODE " +
    "SYSRES_CONST_REQ_SECTION_VALUE " +
    "SYSRES_CONST_REQ_TYPE_VALUE " +
    "SYSRES_CONST_REQUISITE_FORMAT_BY_UNIT " +
    "SYSRES_CONST_REQUISITE_FORMAT_DATE_FULL " +
    "SYSRES_CONST_REQUISITE_FORMAT_DATE_TIME " +
    "SYSRES_CONST_REQUISITE_FORMAT_LEFT " +
    "SYSRES_CONST_REQUISITE_FORMAT_RIGHT " +
    "SYSRES_CONST_REQUISITE_FORMAT_WITHOUT_UNIT " +
    "SYSRES_CONST_REQUISITE_NUMBER_REQUISITE_CODE " +
    "SYSRES_CONST_REQUISITE_SECTION_ACTIONS " +
    "SYSRES_CONST_REQUISITE_SECTION_BUTTON " +
    "SYSRES_CONST_REQUISITE_SECTION_BUTTONS " +
    "SYSRES_CONST_REQUISITE_SECTION_CARD " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE10 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE11 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE12 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE13 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE14 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE15 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE16 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE17 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE18 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE19 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE2 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE20 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE21 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE22 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE23 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE24 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE3 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE4 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE5 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE6 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE7 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE8 " +
    "SYSRES_CONST_REQUISITE_SECTION_TABLE9 " +
    "SYSRES_CONST_REQUISITES_PSEUDOREFERENCE_REQUISITE_NUMBER_REQUISITE_CODE " +
    "SYSRES_CONST_RIGHT_ALIGNMENT_CODE " +
    "SYSRES_CONST_ROLES_REFERENCE_CODE " +
    "SYSRES_CONST_ROUTE_STEP_AFTER_RUS " +
    "SYSRES_CONST_ROUTE_STEP_AND_CONDITION_RUS " +
    "SYSRES_CONST_ROUTE_STEP_OR_CONDITION_RUS " +
    "SYSRES_CONST_ROUTE_TYPE_COMPLEX " +
    "SYSRES_CONST_ROUTE_TYPE_PARALLEL " +
    "SYSRES_CONST_ROUTE_TYPE_SERIAL " +
    "SYSRES_CONST_SBDATASETDESC_NEGATIVE_VALUE " +
    "SYSRES_CONST_SBDATASETDESC_POSITIVE_VALUE " +
    "SYSRES_CONST_SBVIEWSDESC_POSITIVE_VALUE " +
    "SYSRES_CONST_SCRIPT_BLOCK_DESCRIPTION " +
    "SYSRES_CONST_SEARCH_BY_TEXT_REQUISITE_CODE " +
    "SYSRES_CONST_SEARCHES_COMPONENT_CONTENT " +
    "SYSRES_CONST_SEARCHES_CRITERIA_ACTION_NAME " +
    "SYSRES_CONST_SEARCHES_EDOC_CONTENT " +
    "SYSRES_CONST_SEARCHES_FOLDER_CONTENT " +
    "SYSRES_CONST_SEARCHES_JOB_CONTENT " +
    "SYSRES_CONST_SEARCHES_REFERENCE_CODE " +
    "SYSRES_CONST_SEARCHES_TASK_CONTENT " +
    "SYSRES_CONST_SECOND_CHAR " +
    "SYSRES_CONST_SECTION_REQUISITE_ACTIONS_VALUE " +
    "SYSRES_CONST_SECTION_REQUISITE_CARD_VALUE " +
    "SYSRES_CONST_SECTION_REQUISITE_CODE " +
    "SYSRES_CONST_SECTION_REQUISITE_DETAIL_1_VALUE " +
    "SYSRES_CONST_SECTION_REQUISITE_DETAIL_2_VALUE " +
    "SYSRES_CONST_SECTION_REQUISITE_DETAIL_3_VALUE " +
    "SYSRES_CONST_SECTION_REQUISITE_DETAIL_4_VALUE " +
    "SYSRES_CONST_SECTION_REQUISITE_DETAIL_5_VALUE " +
    "SYSRES_CONST_SECTION_REQUISITE_DETAIL_6_VALUE " +
    "SYSRES_CONST_SELECT_REFERENCE_MODE_NAME " +
    "SYSRES_CONST_SELECT_TYPE_SELECTABLE " +
    "SYSRES_CONST_SELECT_TYPE_SELECTABLE_ONLY_CHILD " +
    "SYSRES_CONST_SELECT_TYPE_SELECTABLE_WITH_CHILD " +
    "SYSRES_CONST_SELECT_TYPE_UNSLECTABLE " +
    "SYSRES_CONST_SERVER_TYPE_MAIN " +
    "SYSRES_CONST_SERVICE_USER_CATEGORY_FIELD_VALUE " +
    "SYSRES_CONST_SETTINGS_USER_REQUISITE_CODE " +
    "SYSRES_CONST_SIGNATURE_AND_ENCODE_CERTIFICATE_TYPE_CODE " +
    "SYSRES_CONST_SIGNATURE_CERTIFICATE_TYPE_CODE " +
    "SYSRES_CONST_SINGULAR_TITLE_REQUISITE_CODE " +
    "SYSRES_CONST_SQL_SERVER_AUTHENTIFICATION_FLAG_VALUE_CODE " +
    "SYSRES_CONST_SQL_SERVER_ENCODE_AUTHENTIFICATION_FLAG_VALUE_CODE " +
    "SYSRES_CONST_STANDART_ROUTE_REFERENCE_CODE " +
    "SYSRES_CONST_STANDART_ROUTE_REFERENCE_COMMENT_REQUISITE_CODE " +
    "SYSRES_CONST_STANDART_ROUTES_GROUPS_REFERENCE_CODE " +
    "SYSRES_CONST_STATE_REQ_NAME " +
    "SYSRES_CONST_STATE_REQUISITE_ACTIVE_VALUE " +
    "SYSRES_CONST_STATE_REQUISITE_CLOSED_VALUE " +
    "SYSRES_CONST_STATE_REQUISITE_CODE " +
    "SYSRES_CONST_STATIC_ROLE_TYPE_CODE " +
    "SYSRES_CONST_STATUS_PLAN_DEFAULT_VALUE " +
    "SYSRES_CONST_STATUS_VALUE_AUTOCLEANING " +
    "SYSRES_CONST_STATUS_VALUE_BLUE_SQUARE " +
    "SYSRES_CONST_STATUS_VALUE_COMPLETE " +
    "SYSRES_CONST_STATUS_VALUE_GREEN_SQUARE " +
    "SYSRES_CONST_STATUS_VALUE_ORANGE_SQUARE " +
    "SYSRES_CONST_STATUS_VALUE_PURPLE_SQUARE " +
    "SYSRES_CONST_STATUS_VALUE_RED_SQUARE " +
    "SYSRES_CONST_STATUS_VALUE_SUSPEND " +
    "SYSRES_CONST_STATUS_VALUE_YELLOW_SQUARE " +
    "SYSRES_CONST_STDROUTE_SHOW_TO_USERS_REQUISITE_CODE " +
    "SYSRES_CONST_STORAGE_TYPE_FILE " +
    "SYSRES_CONST_STORAGE_TYPE_SQL_SERVER " +
    "SYSRES_CONST_STR_REQUISITE " +
    "SYSRES_CONST_STRIKEOUT_LIFE_CYCLE_STAGE_DRAW_STYLE " +
    "SYSRES_CONST_STRING_FORMAT_LEFT_ALIGN_CHAR " +
    "SYSRES_CONST_STRING_FORMAT_RIGHT_ALIGN_CHAR " +
    "SYSRES_CONST_STRING_REQUISITE_CODE " +
    "SYSRES_CONST_STRING_REQUISITE_TYPE " +
    "SYSRES_CONST_STRING_TYPE_CHAR " +
    "SYSRES_CONST_SUBSTITUTES_PSEUDOREFERENCE_CODE " +
    "SYSRES_CONST_SUBTASK_BLOCK_DESCRIPTION " +
    "SYSRES_CONST_SYSTEM_SETTING_CURRENT_USER_PARAM_VALUE " +
    "SYSRES_CONST_SYSTEM_SETTING_EMPTY_VALUE_PARAM_VALUE " +
    "SYSRES_CONST_SYSTEM_VERSION_COMMENT " +
    "SYSRES_CONST_TASK_ACCESS_TYPE_ALL " +
    "SYSRES_CONST_TASK_ACCESS_TYPE_ALL_MEMBERS " +
    "SYSRES_CONST_TASK_ACCESS_TYPE_MANUAL " +
    "SYSRES_CONST_TASK_ENCODE_TYPE_CERTIFICATION " +
    "SYSRES_CONST_TASK_ENCODE_TYPE_CERTIFICATION_AND_PASSWORD " +
    "SYSRES_CONST_TASK_ENCODE_TYPE_NONE " +
    "SYSRES_CONST_TASK_ENCODE_TYPE_PASSWORD " +
    "SYSRES_CONST_TASK_ROUTE_ALL_CONDITION " +
    "SYSRES_CONST_TASK_ROUTE_AND_CONDITION " +
    "SYSRES_CONST_TASK_ROUTE_OR_CONDITION " +
    "SYSRES_CONST_TASK_STATE_ABORTED " +
    "SYSRES_CONST_TASK_STATE_COMPLETE " +
    "SYSRES_CONST_TASK_STATE_CONTINUED " +
    "SYSRES_CONST_TASK_STATE_CONTROL " +
    "SYSRES_CONST_TASK_STATE_INIT " +
    "SYSRES_CONST_TASK_STATE_WORKING " +
    "SYSRES_CONST_TASK_TITLE " +
    "SYSRES_CONST_TASK_TYPES_GROUPS_REFERENCE_CODE " +
    "SYSRES_CONST_TASK_TYPES_REFERENCE_CODE " +
    "SYSRES_CONST_TEMPLATES_REFERENCE_CODE " +
    "SYSRES_CONST_TEST_DATE_REQUISITE_NAME " +
    "SYSRES_CONST_TEST_DEV_DATABASE_NAME " +
    "SYSRES_CONST_TEST_DEV_SYSTEM_CODE " +
    "SYSRES_CONST_TEST_EDMS_DATABASE_NAME " +
    "SYSRES_CONST_TEST_EDMS_MAIN_CODE " +
    "SYSRES_CONST_TEST_EDMS_MAIN_DB_NAME " +
    "SYSRES_CONST_TEST_EDMS_SECOND_CODE " +
    "SYSRES_CONST_TEST_EDMS_SECOND_DB_NAME " +
    "SYSRES_CONST_TEST_EDMS_SYSTEM_CODE " +
    "SYSRES_CONST_TEST_NUMERIC_REQUISITE_NAME " +
    "SYSRES_CONST_TEXT_REQUISITE " +
    "SYSRES_CONST_TEXT_REQUISITE_CODE " +
    "SYSRES_CONST_TEXT_REQUISITE_TYPE " +
    "SYSRES_CONST_TEXT_TYPE_CHAR " +
    "SYSRES_CONST_TYPE_CODE_REQUISITE_CODE " +
    "SYSRES_CONST_TYPE_REQUISITE_CODE " +
    "SYSRES_CONST_UNDEFINED_LIFE_CYCLE_STAGE_FONT_COLOR " +
    "SYSRES_CONST_UNITS_SECTION_ID_REQUISITE_CODE " +
    "SYSRES_CONST_UNITS_SECTION_REQUISITE_CODE " +
    "SYSRES_CONST_UNOPERATING_RECORD_FLAG_VALUE_CODE " +
    "SYSRES_CONST_UNSTORED_DATA_REQUISITE_CODE " +
    "SYSRES_CONST_UNSTORED_DATA_REQUISITE_NAME " +
    "SYSRES_CONST_USE_ACCESS_TYPE_CODE " +
    "SYSRES_CONST_USE_ACCESS_TYPE_NAME " +
    "SYSRES_CONST_USER_ACCOUNT_TYPE_VALUE_CODE " +
    "SYSRES_CONST_USER_ADDITIONAL_INFORMATION_REQUISITE_CODE " +
    "SYSRES_CONST_USER_AND_GROUP_ID_FROM_PSEUDOREFERENCE_REQUISITE_CODE " +
    "SYSRES_CONST_USER_CATEGORY_NORMAL " +
    "SYSRES_CONST_USER_CERTIFICATE_REQUISITE_CODE " +
    "SYSRES_CONST_USER_CERTIFICATE_STATE_REQUISITE_CODE " +
    "SYSRES_CONST_USER_CERTIFICATE_SUBJECT_NAME_REQUISITE_CODE " +
    "SYSRES_CONST_USER_CERTIFICATE_THUMBPRINT_REQUISITE_CODE " +
    "SYSRES_CONST_USER_COMMON_CATEGORY " +
    "SYSRES_CONST_USER_COMMON_CATEGORY_CODE " +
    "SYSRES_CONST_USER_FULL_NAME_REQUISITE_CODE " +
    "SYSRES_CONST_USER_GROUP_TYPE_REQUISITE_CODE " +
    "SYSRES_CONST_USER_LOGIN_REQUISITE_CODE " +
    "SYSRES_CONST_USER_REMOTE_CONTROLLER_REQUISITE_CODE " +
    "SYSRES_CONST_USER_REMOTE_SYSTEM_REQUISITE_CODE " +
    "SYSRES_CONST_USER_RIGHTS_T_REQUISITE_CODE " +
    "SYSRES_CONST_USER_SERVER_NAME_REQUISITE_CODE " +
    "SYSRES_CONST_USER_SERVICE_CATEGORY " +
    "SYSRES_CONST_USER_SERVICE_CATEGORY_CODE " +
    "SYSRES_CONST_USER_STATUS_ADMINISTRATOR_CODE " +
    "SYSRES_CONST_USER_STATUS_ADMINISTRATOR_NAME " +
    "SYSRES_CONST_USER_STATUS_DEVELOPER_CODE " +
    "SYSRES_CONST_USER_STATUS_DEVELOPER_NAME " +
    "SYSRES_CONST_USER_STATUS_DISABLED_CODE " +
    "SYSRES_CONST_USER_STATUS_DISABLED_NAME " +
    "SYSRES_CONST_USER_STATUS_SYSTEM_DEVELOPER_CODE " +
    "SYSRES_CONST_USER_STATUS_USER_CODE " +
    "SYSRES_CONST_USER_STATUS_USER_NAME " +
    "SYSRES_CONST_USER_STATUS_USER_NAME_DEPRECATED " +
    "SYSRES_CONST_USER_TYPE_FIELD_VALUE_USER " +
    "SYSRES_CONST_USER_TYPE_REQUISITE_CODE " +
    "SYSRES_CONST_USERS_CONTROLLER_REQUISITE_CODE " +
    "SYSRES_CONST_USERS_IS_MAIN_SERVER_REQUISITE_CODE " +
    "SYSRES_CONST_USERS_REFERENCE_CODE " +
    "SYSRES_CONST_USERS_REGISTRATION_CERTIFICATES_ACTION_NAME " +
    "SYSRES_CONST_USERS_REQUISITE_CODE " +
    "SYSRES_CONST_USERS_SYSTEM_REQUISITE_CODE " +
    "SYSRES_CONST_USERS_USER_ACCESS_RIGHTS_TYPR_REQUISITE_CODE " +
    "SYSRES_CONST_USERS_USER_AUTHENTICATION_REQUISITE_CODE " +
    "SYSRES_CONST_USERS_USER_COMPONENT_REQUISITE_CODE " +
    "SYSRES_CONST_USERS_USER_GROUP_REQUISITE_CODE " +
    "SYSRES_CONST_USERS_VIEW_CERTIFICATES_ACTION_NAME " +
    "SYSRES_CONST_VIEW_DEFAULT_CODE " +
    "SYSRES_CONST_VIEW_DEFAULT_NAME " +
    "SYSRES_CONST_VIEWER_REQUISITE_CODE " +
    "SYSRES_CONST_WAITING_BLOCK_DESCRIPTION " +
    "SYSRES_CONST_WIZARD_FORM_LABEL_TEST_STRING  " +
    "SYSRES_CONST_WIZARD_QUERY_PARAM_HEIGHT_ETALON_STRING " +
    "SYSRES_CONST_WIZARD_REFERENCE_COMMENT_REQUISITE_CODE " +
    "SYSRES_CONST_WORK_RULES_DESCRIPTION_REQUISITE_CODE " +
    "SYSRES_CONST_WORK_TIME_CALENDAR_REFERENCE_CODE " +
    "SYSRES_CONST_WORK_WORKFLOW_HARD_ROUTE_TYPE_VALUE " +
    "SYSRES_CONST_WORK_WORKFLOW_HARD_ROUTE_TYPE_VALUE_CODE " +
    "SYSRES_CONST_WORK_WORKFLOW_HARD_ROUTE_TYPE_VALUE_CODE_RUS " +
    "SYSRES_CONST_WORK_WORKFLOW_SOFT_ROUTE_TYPE_VALUE_CODE_RUS " +
    "SYSRES_CONST_WORKFLOW_ROUTE_TYPR_HARD " +
    "SYSRES_CONST_WORKFLOW_ROUTE_TYPR_SOFT " +
    "SYSRES_CONST_XML_ENCODING " +
    "SYSRES_CONST_XREC_STAT_REQUISITE_CODE " +
    "SYSRES_CONST_XRECID_FIELD_NAME " +
    "SYSRES_CONST_YES " +
    "SYSRES_CONST_YES_NO_2_REQUISITE_CODE " +
    "SYSRES_CONST_YES_NO_REQUISITE_CODE " +
    "SYSRES_CONST_YES_NO_T_REF_TYPE_REQUISITE_CODE " +
    "SYSRES_CONST_YES_PICK_VALUE " +
    "SYSRES_CONST_YES_VALUE ";

  // Base constant
  const base_constants = "CR FALSE nil NO_VALUE NULL TAB TRUE YES_VALUE ";

  // Base group name
  const base_group_name_constants =
    "ADMINISTRATORS_GROUP_NAME CUSTOMIZERS_GROUP_NAME DEVELOPERS_GROUP_NAME SERVICE_USERS_GROUP_NAME ";

  // Decision block properties
  const decision_block_properties_constants =
    "DECISION_BLOCK_FIRST_OPERAND_PROPERTY DECISION_BLOCK_NAME_PROPERTY DECISION_BLOCK_OPERATION_PROPERTY " +
    "DECISION_BLOCK_RESULT_TYPE_PROPERTY DECISION_BLOCK_SECOND_OPERAND_PROPERTY ";

  // File extension
  const file_extension_constants =
    "ANY_FILE_EXTENTION COMPRESSED_DOCUMENT_EXTENSION EXTENDED_DOCUMENT_EXTENSION " +
    "SHORT_COMPRESSED_DOCUMENT_EXTENSION SHORT_EXTENDED_DOCUMENT_EXTENSION ";

  // Job block properties
  const job_block_properties_constants =
    "JOB_BLOCK_ABORT_DEADLINE_PROPERTY " +
    "JOB_BLOCK_AFTER_FINISH_EVENT " +
    "JOB_BLOCK_AFTER_QUERY_PARAMETERS_EVENT " +
    "JOB_BLOCK_ATTACHMENT_PROPERTY " +
    "JOB_BLOCK_ATTACHMENTS_RIGHTS_GROUP_PROPERTY " +
    "JOB_BLOCK_ATTACHMENTS_RIGHTS_TYPE_PROPERTY " +
    "JOB_BLOCK_BEFORE_QUERY_PARAMETERS_EVENT " +
    "JOB_BLOCK_BEFORE_START_EVENT " +
    "JOB_BLOCK_CREATED_JOBS_PROPERTY " +
    "JOB_BLOCK_DEADLINE_PROPERTY " +
    "JOB_BLOCK_EXECUTION_RESULTS_PROPERTY " +
    "JOB_BLOCK_IS_PARALLEL_PROPERTY " +
    "JOB_BLOCK_IS_RELATIVE_ABORT_DEADLINE_PROPERTY " +
    "JOB_BLOCK_IS_RELATIVE_DEADLINE_PROPERTY " +
    "JOB_BLOCK_JOB_TEXT_PROPERTY " +
    "JOB_BLOCK_NAME_PROPERTY " +
    "JOB_BLOCK_NEED_SIGN_ON_PERFORM_PROPERTY " +
    "JOB_BLOCK_PERFORMER_PROPERTY " +
    "JOB_BLOCK_RELATIVE_ABORT_DEADLINE_TYPE_PROPERTY " +
    "JOB_BLOCK_RELATIVE_DEADLINE_TYPE_PROPERTY " +
    "JOB_BLOCK_SUBJECT_PROPERTY ";

  // Language code
  const language_code_constants = "ENGLISH_LANGUAGE_CODE RUSSIAN_LANGUAGE_CODE ";

  // Launching external applications
  const launching_external_applications_constants =
    "smHidden smMaximized smMinimized smNormal wmNo wmYes ";

  // Link kind
  const link_kind_constants =
    "COMPONENT_TOKEN_LINK_KIND " +
    "DOCUMENT_LINK_KIND " +
    "EDOCUMENT_LINK_KIND " +
    "FOLDER_LINK_KIND " +
    "JOB_LINK_KIND " +
    "REFERENCE_LINK_KIND " +
    "TASK_LINK_KIND ";

  // Lock type
  const lock_type_constants =
    "COMPONENT_TOKEN_LOCK_TYPE EDOCUMENT_VERSION_LOCK_TYPE ";

  // Monitor block properties
  const monitor_block_properties_constants =
    "MONITOR_BLOCK_AFTER_FINISH_EVENT " +
    "MONITOR_BLOCK_BEFORE_START_EVENT " +
    "MONITOR_BLOCK_DEADLINE_PROPERTY " +
    "MONITOR_BLOCK_INTERVAL_PROPERTY " +
    "MONITOR_BLOCK_INTERVAL_TYPE_PROPERTY " +
    "MONITOR_BLOCK_IS_RELATIVE_DEADLINE_PROPERTY " +
    "MONITOR_BLOCK_NAME_PROPERTY " +
    "MONITOR_BLOCK_RELATIVE_DEADLINE_TYPE_PROPERTY " +
    "MONITOR_BLOCK_SEARCH_SCRIPT_PROPERTY ";

  // Notice block properties
  const notice_block_properties_constants =
    "NOTICE_BLOCK_AFTER_FINISH_EVENT " +
    "NOTICE_BLOCK_ATTACHMENT_PROPERTY " +
    "NOTICE_BLOCK_ATTACHMENTS_RIGHTS_GROUP_PROPERTY " +
    "NOTICE_BLOCK_ATTACHMENTS_RIGHTS_TYPE_PROPERTY " +
    "NOTICE_BLOCK_BEFORE_START_EVENT " +
    "NOTICE_BLOCK_CREATED_NOTICES_PROPERTY " +
    "NOTICE_BLOCK_DEADLINE_PROPERTY " +
    "NOTICE_BLOCK_IS_RELATIVE_DEADLINE_PROPERTY " +
    "NOTICE_BLOCK_NAME_PROPERTY " +
    "NOTICE_BLOCK_NOTICE_TEXT_PROPERTY " +
    "NOTICE_BLOCK_PERFORMER_PROPERTY " +
    "NOTICE_BLOCK_RELATIVE_DEADLINE_TYPE_PROPERTY " +
    "NOTICE_BLOCK_SUBJECT_PROPERTY ";

  // Object events
  const object_events_constants =
    "dseAfterCancel " +
    "dseAfterClose " +
    "dseAfterDelete " +
    "dseAfterDeleteOutOfTransaction " +
    "dseAfterInsert " +
    "dseAfterOpen " +
    "dseAfterScroll " +
    "dseAfterUpdate " +
    "dseAfterUpdateOutOfTransaction " +
    "dseBeforeCancel " +
    "dseBeforeClose " +
    "dseBeforeDelete " +
    "dseBeforeDetailUpdate " +
    "dseBeforeInsert " +
    "dseBeforeOpen " +
    "dseBeforeUpdate " +
    "dseOnAnyRequisiteChange " +
    "dseOnCloseRecord " +
    "dseOnDeleteError " +
    "dseOnOpenRecord " +
    "dseOnPrepareUpdate " +
    "dseOnUpdateError " +
    "dseOnUpdateRatifiedRecord " +
    "dseOnValidDelete " +
    "dseOnValidUpdate " +
    "reOnChange " +
    "reOnChangeValues " +
    "SELECTION_BEGIN_ROUTE_EVENT " +
    "SELECTION_END_ROUTE_EVENT ";

  // Object params
  const object_params_constants =
    "CURRENT_PERIOD_IS_REQUIRED " +
    "PREVIOUS_CARD_TYPE_NAME " +
    "SHOW_RECORD_PROPERTIES_FORM ";

  // Other
  const other_constants =
    "ACCESS_RIGHTS_SETTING_DIALOG_CODE " +
    "ADMINISTRATOR_USER_CODE " +
    "ANALYTIC_REPORT_TYPE " +
    "asrtHideLocal " +
    "asrtHideRemote " +
    "CALCULATED_ROLE_TYPE_CODE " +
    "COMPONENTS_REFERENCE_DEVELOPER_VIEW_CODE " +
    "DCTS_TEST_PROTOCOLS_FOLDER_PATH " +
    "E_EDOC_VERSION_ALREADY_APPROVINGLY_SIGNED " +
    "E_EDOC_VERSION_ALREADY_APPROVINGLY_SIGNED_BY_USER " +
    "E_EDOC_VERSION_ALREDY_SIGNED " +
    "E_EDOC_VERSION_ALREDY_SIGNED_BY_USER " +
    "EDOC_TYPES_CODE_REQUISITE_FIELD_NAME " +
    "EDOCUMENTS_ALIAS_NAME " +
    "FILES_FOLDER_PATH " +
    "FILTER_OPERANDS_DELIMITER " +
    "FILTER_OPERATIONS_DELIMITER " +
    "FORMCARD_NAME " +
    "FORMLIST_NAME " +
    "GET_EXTENDED_DOCUMENT_EXTENSION_CREATION_MODE " +
    "GET_EXTENDED_DOCUMENT_EXTENSION_IMPORT_MODE " +
    "INTEGRATED_REPORT_TYPE " +
    "IS_BUILDER_APPLICATION_ROLE " +
    "IS_BUILDER_APPLICATION_ROLE2 " +
    "IS_BUILDER_USERS " +
    "ISBSYSDEV " +
    "LOG_FOLDER_PATH " +
    "mbCancel " +
    "mbNo " +
    "mbNoToAll " +
    "mbOK " +
    "mbYes " +
    "mbYesToAll " +
    "MEMORY_DATASET_DESRIPTIONS_FILENAME " +
    "mrNo " +
    "mrNoToAll " +
    "mrYes " +
    "mrYesToAll " +
    "MULTIPLE_SELECT_DIALOG_CODE " +
    "NONOPERATING_RECORD_FLAG_FEMININE " +
    "NONOPERATING_RECORD_FLAG_MASCULINE " +
    "OPERATING_RECORD_FLAG_FEMININE " +
    "OPERATING_RECORD_FLAG_MASCULINE " +
    "PROFILING_SETTINGS_COMMON_SETTINGS_CODE_VALUE " +
    "PROGRAM_INITIATED_LOOKUP_ACTION " +
    "ratDelete " +
    "ratEdit " +
    "ratInsert " +
    "REPORT_TYPE " +
    "REQUIRED_PICK_VALUES_VARIABLE " +
    "rmCard " +
    "rmList " +
    "SBRTE_PROGID_DEV " +
    "SBRTE_PROGID_RELEASE " +
    "STATIC_ROLE_TYPE_CODE " +
    "SUPPRESS_EMPTY_TEMPLATE_CREATION " +
    "SYSTEM_USER_CODE " +
    "UPDATE_DIALOG_DATASET " +
    "USED_IN_OBJECT_HINT_PARAM " +
    "USER_INITIATED_LOOKUP_ACTION " +
    "USER_NAME_FORMAT " +
    "USER_SELECTION_RESTRICTIONS " +
    "WORKFLOW_TEST_PROTOCOLS_FOLDER_PATH " +
    "ELS_SUBTYPE_CONTROL_NAME " +
    "ELS_FOLDER_KIND_CONTROL_NAME " +
    "REPEAT_PROCESS_CURRENT_OBJECT_EXCEPTION_NAME ";

  // Privileges
  const privileges_constants =
    "PRIVILEGE_COMPONENT_FULL_ACCESS " +
    "PRIVILEGE_DEVELOPMENT_EXPORT " +
    "PRIVILEGE_DEVELOPMENT_IMPORT " +
    "PRIVILEGE_DOCUMENT_DELETE " +
    "PRIVILEGE_ESD " +
    "PRIVILEGE_FOLDER_DELETE " +
    "PRIVILEGE_MANAGE_ACCESS_RIGHTS " +
    "PRIVILEGE_MANAGE_REPLICATION " +
    "PRIVILEGE_MANAGE_SESSION_SERVER " +
    "PRIVILEGE_OBJECT_FULL_ACCESS " +
    "PRIVILEGE_OBJECT_VIEW " +
    "PRIVILEGE_RESERVE_LICENSE " +
    "PRIVILEGE_SYSTEM_CUSTOMIZE " +
    "PRIVILEGE_SYSTEM_DEVELOP " +
    "PRIVILEGE_SYSTEM_INSTALL " +
    "PRIVILEGE_TASK_DELETE " +
    "PRIVILEGE_USER_PLUGIN_SETTINGS_CUSTOMIZE " +
    "PRIVILEGES_PSEUDOREFERENCE_CODE ";

  // Pseudoreference code
  const pseudoreference_code_constants =
    "ACCESS_TYPES_PSEUDOREFERENCE_CODE " +
    "ALL_AVAILABLE_COMPONENTS_PSEUDOREFERENCE_CODE " +
    "ALL_AVAILABLE_PRIVILEGES_PSEUDOREFERENCE_CODE " +
    "ALL_REPLICATE_COMPONENTS_PSEUDOREFERENCE_CODE " +
    "AVAILABLE_DEVELOPERS_COMPONENTS_PSEUDOREFERENCE_CODE " +
    "COMPONENTS_PSEUDOREFERENCE_CODE " +
    "FILTRATER_SETTINGS_CONFLICTS_PSEUDOREFERENCE_CODE " +
    "GROUPS_PSEUDOREFERENCE_CODE " +
    "RECEIVE_PROTOCOL_PSEUDOREFERENCE_CODE " +
    "REFERENCE_REQUISITE_PSEUDOREFERENCE_CODE " +
    "REFERENCE_REQUISITES_PSEUDOREFERENCE_CODE " +
    "REFTYPES_PSEUDOREFERENCE_CODE " +
    "REPLICATION_SEANCES_DIARY_PSEUDOREFERENCE_CODE " +
    "SEND_PROTOCOL_PSEUDOREFERENCE_CODE " +
    "SUBSTITUTES_PSEUDOREFERENCE_CODE " +
    "SYSTEM_SETTINGS_PSEUDOREFERENCE_CODE " +
    "UNITS_PSEUDOREFERENCE_CODE " +
    "USERS_PSEUDOREFERENCE_CODE " +
    "VIEWERS_PSEUDOREFERENCE_CODE ";

  // Requisite ISBCertificateType values
  const requisite_ISBCertificateType_values_constants =
    "CERTIFICATE_TYPE_ENCRYPT " +
    "CERTIFICATE_TYPE_SIGN " +
    "CERTIFICATE_TYPE_SIGN_AND_ENCRYPT ";

  // Requisite ISBEDocStorageType values
  const requisite_ISBEDocStorageType_values_constants =
    "STORAGE_TYPE_FILE " +
    "STORAGE_TYPE_NAS_CIFS " +
    "STORAGE_TYPE_SAPERION " +
    "STORAGE_TYPE_SQL_SERVER ";

  // Requisite CompType2 values
  const requisite_compType2_values_constants =
    "COMPTYPE2_REQUISITE_DOCUMENTS_VALUE " +
    "COMPTYPE2_REQUISITE_TASKS_VALUE " +
    "COMPTYPE2_REQUISITE_FOLDERS_VALUE " +
    "COMPTYPE2_REQUISITE_REFERENCES_VALUE ";

  // Requisite name
  const requisite_name_constants =
    "SYSREQ_CODE " +
    "SYSREQ_COMPTYPE2 " +
    "SYSREQ_CONST_AVAILABLE_FOR_WEB " +
    "SYSREQ_CONST_COMMON_CODE " +
    "SYSREQ_CONST_COMMON_VALUE " +
    "SYSREQ_CONST_FIRM_CODE " +
    "SYSREQ_CONST_FIRM_STATUS " +
    "SYSREQ_CONST_FIRM_VALUE " +
    "SYSREQ_CONST_SERVER_STATUS " +
    "SYSREQ_CONTENTS " +
    "SYSREQ_DATE_OPEN " +
    "SYSREQ_DATE_CLOSE " +
    "SYSREQ_DESCRIPTION " +
    "SYSREQ_DESCRIPTION_LOCALIZE_ID " +
    "SYSREQ_DOUBLE " +
    "SYSREQ_EDOC_ACCESS_TYPE " +
    "SYSREQ_EDOC_AUTHOR " +
    "SYSREQ_EDOC_CREATED " +
    "SYSREQ_EDOC_DELEGATE_RIGHTS_REQUISITE_CODE " +
    "SYSREQ_EDOC_EDITOR " +
    "SYSREQ_EDOC_ENCODE_TYPE " +
    "SYSREQ_EDOC_ENCRYPTION_PLUGIN_NAME " +
    "SYSREQ_EDOC_ENCRYPTION_PLUGIN_VERSION " +
    "SYSREQ_EDOC_EXPORT_DATE " +
    "SYSREQ_EDOC_EXPORTER " +
    "SYSREQ_EDOC_KIND " +
    "SYSREQ_EDOC_LIFE_STAGE_NAME " +
    "SYSREQ_EDOC_LOCKED_FOR_SERVER_CODE " +
    "SYSREQ_EDOC_MODIFIED " +
    "SYSREQ_EDOC_NAME " +
    "SYSREQ_EDOC_NOTE " +
    "SYSREQ_EDOC_QUALIFIED_ID " +
    "SYSREQ_EDOC_SESSION_KEY " +
    "SYSREQ_EDOC_SESSION_KEY_ENCRYPTION_PLUGIN_NAME " +
    "SYSREQ_EDOC_SESSION_KEY_ENCRYPTION_PLUGIN_VERSION " +
    "SYSREQ_EDOC_SIGNATURE_TYPE " +
    "SYSREQ_EDOC_SIGNED " +
    "SYSREQ_EDOC_STORAGE " +
    "SYSREQ_EDOC_STORAGES_ARCHIVE_STORAGE " +
    "SYSREQ_EDOC_STORAGES_CHECK_RIGHTS " +
    "SYSREQ_EDOC_STORAGES_COMPUTER_NAME " +
    "SYSREQ_EDOC_STORAGES_EDIT_IN_STORAGE " +
    "SYSREQ_EDOC_STORAGES_EXECUTIVE_STORAGE " +
    "SYSREQ_EDOC_STORAGES_FUNCTION " +
    "SYSREQ_EDOC_STORAGES_INITIALIZED " +
    "SYSREQ_EDOC_STORAGES_LOCAL_PATH " +
    "SYSREQ_EDOC_STORAGES_SAPERION_DATABASE_NAME " +
    "SYSREQ_EDOC_STORAGES_SEARCH_BY_TEXT " +
    "SYSREQ_EDOC_STORAGES_SERVER_NAME " +
    "SYSREQ_EDOC_STORAGES_SHARED_SOURCE_NAME " +
    "SYSREQ_EDOC_STORAGES_TYPE " +
    "SYSREQ_EDOC_TEXT_MODIFIED " +
    "SYSREQ_EDOC_TYPE_ACT_CODE " +
    "SYSREQ_EDOC_TYPE_ACT_DESCRIPTION " +
    "SYSREQ_EDOC_TYPE_ACT_DESCRIPTION_LOCALIZE_ID " +
    "SYSREQ_EDOC_TYPE_ACT_ON_EXECUTE " +
    "SYSREQ_EDOC_TYPE_ACT_ON_EXECUTE_EXISTS " +
    "SYSREQ_EDOC_TYPE_ACT_SECTION " +
    "SYSREQ_EDOC_TYPE_ADD_PARAMS " +
    "SYSREQ_EDOC_TYPE_COMMENT " +
    "SYSREQ_EDOC_TYPE_EVENT_TEXT " +
    "SYSREQ_EDOC_TYPE_NAME_IN_SINGULAR " +
    "SYSREQ_EDOC_TYPE_NAME_IN_SINGULAR_LOCALIZE_ID " +
    "SYSREQ_EDOC_TYPE_NAME_LOCALIZE_ID " +
    "SYSREQ_EDOC_TYPE_NUMERATION_METHOD " +
    "SYSREQ_EDOC_TYPE_PSEUDO_REQUISITE_CODE " +
    "SYSREQ_EDOC_TYPE_REQ_CODE " +
    "SYSREQ_EDOC_TYPE_REQ_DESCRIPTION " +
    "SYSREQ_EDOC_TYPE_REQ_DESCRIPTION_LOCALIZE_ID " +
    "SYSREQ_EDOC_TYPE_REQ_IS_LEADING " +
    "SYSREQ_EDOC_TYPE_REQ_IS_REQUIRED " +
    "SYSREQ_EDOC_TYPE_REQ_NUMBER " +
    "SYSREQ_EDOC_TYPE_REQ_ON_CHANGE " +
    "SYSREQ_EDOC_TYPE_REQ_ON_CHANGE_EXISTS " +
    "SYSREQ_EDOC_TYPE_REQ_ON_SELECT " +
    "SYSREQ_EDOC_TYPE_REQ_ON_SELECT_KIND " +
    "SYSREQ_EDOC_TYPE_REQ_SECTION " +
    "SYSREQ_EDOC_TYPE_VIEW_CARD " +
    "SYSREQ_EDOC_TYPE_VIEW_CODE " +
    "SYSREQ_EDOC_TYPE_VIEW_COMMENT " +
    "SYSREQ_EDOC_TYPE_VIEW_IS_MAIN " +
    "SYSREQ_EDOC_TYPE_VIEW_NAME " +
    "SYSREQ_EDOC_TYPE_VIEW_NAME_LOCALIZE_ID " +
    "SYSREQ_EDOC_VERSION_AUTHOR " +
    "SYSREQ_EDOC_VERSION_CRC " +
    "SYSREQ_EDOC_VERSION_DATA " +
    "SYSREQ_EDOC_VERSION_EDITOR " +
    "SYSREQ_EDOC_VERSION_EXPORT_DATE " +
    "SYSREQ_EDOC_VERSION_EXPORTER " +
    "SYSREQ_EDOC_VERSION_HIDDEN " +
    "SYSREQ_EDOC_VERSION_LIFE_STAGE " +
    "SYSREQ_EDOC_VERSION_MODIFIED " +
    "SYSREQ_EDOC_VERSION_NOTE " +
    "SYSREQ_EDOC_VERSION_SIGNATURE_TYPE " +
    "SYSREQ_EDOC_VERSION_SIGNED " +
    "SYSREQ_EDOC_VERSION_SIZE " +
    "SYSREQ_EDOC_VERSION_SOURCE " +
    "SYSREQ_EDOC_VERSION_TEXT_MODIFIED " +
    "SYSREQ_EDOCKIND_DEFAULT_VERSION_STATE_CODE " +
    "SYSREQ_FOLDER_KIND " +
    "SYSREQ_FUNC_CATEGORY " +
    "SYSREQ_FUNC_COMMENT " +
    "SYSREQ_FUNC_GROUP " +
    "SYSREQ_FUNC_GROUP_COMMENT " +
    "SYSREQ_FUNC_GROUP_NUMBER " +
    "SYSREQ_FUNC_HELP " +
    "SYSREQ_FUNC_PARAM_DEF_VALUE " +
    "SYSREQ_FUNC_PARAM_IDENT " +
    "SYSREQ_FUNC_PARAM_NUMBER " +
    "SYSREQ_FUNC_PARAM_TYPE " +
    "SYSREQ_FUNC_TEXT " +
    "SYSREQ_GROUP_CATEGORY " +
    "SYSREQ_ID " +
    "SYSREQ_LAST_UPDATE " +
    "SYSREQ_LEADER_REFERENCE " +
    "SYSREQ_LINE_NUMBER " +
    "SYSREQ_MAIN_RECORD_ID " +
    "SYSREQ_NAME " +
    "SYSREQ_NAME_LOCALIZE_ID " +
    "SYSREQ_NOTE " +
    "SYSREQ_ORIGINAL_RECORD " +
    "SYSREQ_OUR_FIRM " +
    "SYSREQ_PROFILING_SETTINGS_BATCH_LOGING " +
    "SYSREQ_PROFILING_SETTINGS_BATCH_SIZE " +
    "SYSREQ_PROFILING_SETTINGS_PROFILING_ENABLED " +
    "SYSREQ_PROFILING_SETTINGS_SQL_PROFILING_ENABLED " +
    "SYSREQ_PROFILING_SETTINGS_START_LOGGED " +
    "SYSREQ_RECORD_STATUS " +
    "SYSREQ_REF_REQ_FIELD_NAME " +
    "SYSREQ_REF_REQ_FORMAT " +
    "SYSREQ_REF_REQ_GENERATED " +
    "SYSREQ_REF_REQ_LENGTH " +
    "SYSREQ_REF_REQ_PRECISION " +
    "SYSREQ_REF_REQ_REFERENCE " +
    "SYSREQ_REF_REQ_SECTION " +
    "SYSREQ_REF_REQ_STORED " +
    "SYSREQ_REF_REQ_TOKENS " +
    "SYSREQ_REF_REQ_TYPE " +
    "SYSREQ_REF_REQ_VIEW " +
    "SYSREQ_REF_TYPE_ACT_CODE " +
    "SYSREQ_REF_TYPE_ACT_DESCRIPTION " +
    "SYSREQ_REF_TYPE_ACT_DESCRIPTION_LOCALIZE_ID " +
    "SYSREQ_REF_TYPE_ACT_ON_EXECUTE " +
    "SYSREQ_REF_TYPE_ACT_ON_EXECUTE_EXISTS " +
    "SYSREQ_REF_TYPE_ACT_SECTION " +
    "SYSREQ_REF_TYPE_ADD_PARAMS " +
    "SYSREQ_REF_TYPE_COMMENT " +
    "SYSREQ_REF_TYPE_COMMON_SETTINGS " +
    "SYSREQ_REF_TYPE_DISPLAY_REQUISITE_NAME " +
    "SYSREQ_REF_TYPE_EVENT_TEXT " +
    "SYSREQ_REF_TYPE_MAIN_LEADING_REF " +
    "SYSREQ_REF_TYPE_NAME_IN_SINGULAR " +
    "SYSREQ_REF_TYPE_NAME_IN_SINGULAR_LOCALIZE_ID " +
    "SYSREQ_REF_TYPE_NAME_LOCALIZE_ID " +
    "SYSREQ_REF_TYPE_NUMERATION_METHOD " +
    "SYSREQ_REF_TYPE_REQ_CODE " +
    "SYSREQ_REF_TYPE_REQ_DESCRIPTION " +
    "SYSREQ_REF_TYPE_REQ_DESCRIPTION_LOCALIZE_ID " +
    "SYSREQ_REF_TYPE_REQ_IS_CONTROL " +
    "SYSREQ_REF_TYPE_REQ_IS_FILTER " +
    "SYSREQ_REF_TYPE_REQ_IS_LEADING " +
    "SYSREQ_REF_TYPE_REQ_IS_REQUIRED " +
    "SYSREQ_REF_TYPE_REQ_NUMBER " +
    "SYSREQ_REF_TYPE_REQ_ON_CHANGE " +
    "SYSREQ_REF_TYPE_REQ_ON_CHANGE_EXISTS " +
    "SYSREQ_REF_TYPE_REQ_ON_SELECT " +
    "SYSREQ_REF_TYPE_REQ_ON_SELECT_KIND " +
    "SYSREQ_REF_TYPE_REQ_SECTION " +
    "SYSREQ_REF_TYPE_VIEW_CARD " +
    "SYSREQ_REF_TYPE_VIEW_CODE " +
    "SYSREQ_REF_TYPE_VIEW_COMMENT " +
    "SYSREQ_REF_TYPE_VIEW_IS_MAIN " +
    "SYSREQ_REF_TYPE_VIEW_NAME " +
    "SYSREQ_REF_TYPE_VIEW_NAME_LOCALIZE_ID " +
    "SYSREQ_REFERENCE_TYPE_ID " +
    "SYSREQ_STATE " +
    "SYSREQ_STATЕ " +
    "SYSREQ_SYSTEM_SETTINGS_VALUE " +
    "SYSREQ_TYPE " +
    "SYSREQ_UNIT " +
    "SYSREQ_UNIT_ID " +
    "SYSREQ_USER_GROUPS_GROUP_FULL_NAME " +
    "SYSREQ_USER_GROUPS_GROUP_NAME " +
    "SYSREQ_USER_GROUPS_GROUP_SERVER_NAME " +
    "SYSREQ_USERS_ACCESS_RIGHTS " +
    "SYSREQ_USERS_AUTHENTICATION " +
    "SYSREQ_USERS_CATEGORY " +
    "SYSREQ_USERS_COMPONENT " +
    "SYSREQ_USERS_COMPONENT_USER_IS_PUBLIC " +
    "SYSREQ_USERS_DOMAIN " +
    "SYSREQ_USERS_FULL_USER_NAME " +
    "SYSREQ_USERS_GROUP " +
    "SYSREQ_USERS_IS_MAIN_SERVER " +
    "SYSREQ_USERS_LOGIN " +
    "SYSREQ_USERS_REFERENCE_USER_IS_PUBLIC " +
    "SYSREQ_USERS_STATUS " +
    "SYSREQ_USERS_USER_CERTIFICATE " +
    "SYSREQ_USERS_USER_CERTIFICATE_INFO " +
    "SYSREQ_USERS_USER_CERTIFICATE_PLUGIN_NAME " +
    "SYSREQ_USERS_USER_CERTIFICATE_PLUGIN_VERSION " +
    "SYSREQ_USERS_USER_CERTIFICATE_STATE " +
    "SYSREQ_USERS_USER_CERTIFICATE_SUBJECT_NAME " +
    "SYSREQ_USERS_USER_CERTIFICATE_THUMBPRINT " +
    "SYSREQ_USERS_USER_DEFAULT_CERTIFICATE " +
    "SYSREQ_USERS_USER_DESCRIPTION " +
    "SYSREQ_USERS_USER_GLOBAL_NAME " +
    "SYSREQ_USERS_USER_LOGIN " +
    "SYSREQ_USERS_USER_MAIN_SERVER " +
    "SYSREQ_USERS_USER_TYPE " +
    "SYSREQ_WORK_RULES_FOLDER_ID ";

  // Result
  const result_constants = "RESULT_VAR_NAME RESULT_VAR_NAME_ENG ";

  // Rule identification
  const rule_identification_constants =
    "AUTO_NUMERATION_RULE_ID " +
    "CANT_CHANGE_ID_REQUISITE_RULE_ID " +
    "CANT_CHANGE_OURFIRM_REQUISITE_RULE_ID " +
    "CHECK_CHANGING_REFERENCE_RECORD_USE_RULE_ID " +
    "CHECK_CODE_REQUISITE_RULE_ID " +
    "CHECK_DELETING_REFERENCE_RECORD_USE_RULE_ID " +
    "CHECK_FILTRATER_CHANGES_RULE_ID " +
    "CHECK_RECORD_INTERVAL_RULE_ID " +
    "CHECK_REFERENCE_INTERVAL_RULE_ID " +
    "CHECK_REQUIRED_DATA_FULLNESS_RULE_ID " +
    "CHECK_REQUIRED_REQUISITES_FULLNESS_RULE_ID " +
    "MAKE_RECORD_UNRATIFIED_RULE_ID " +
    "RESTORE_AUTO_NUMERATION_RULE_ID " +
    "SET_FIRM_CONTEXT_FROM_RECORD_RULE_ID " +
    "SET_FIRST_RECORD_IN_LIST_FORM_RULE_ID " +
    "SET_IDSPS_VALUE_RULE_ID " +
    "SET_NEXT_CODE_VALUE_RULE_ID " +
    "SET_OURFIRM_BOUNDS_RULE_ID " +
    "SET_OURFIRM_REQUISITE_RULE_ID ";

  // Script block properties
  const script_block_properties_constants =
    "SCRIPT_BLOCK_AFTER_FINISH_EVENT " +
    "SCRIPT_BLOCK_BEFORE_START_EVENT " +
    "SCRIPT_BLOCK_EXECUTION_RESULTS_PROPERTY " +
    "SCRIPT_BLOCK_NAME_PROPERTY " +
    "SCRIPT_BLOCK_SCRIPT_PROPERTY ";

  // Subtask block properties
  const subtask_block_properties_constants =
    "SUBTASK_BLOCK_ABORT_DEADLINE_PROPERTY " +
    "SUBTASK_BLOCK_AFTER_FINISH_EVENT " +
    "SUBTASK_BLOCK_ASSIGN_PARAMS_EVENT " +
    "SUBTASK_BLOCK_ATTACHMENTS_PROPERTY " +
    "SUBTASK_BLOCK_ATTACHMENTS_RIGHTS_GROUP_PROPERTY " +
    "SUBTASK_BLOCK_ATTACHMENTS_RIGHTS_TYPE_PROPERTY " +
    "SUBTASK_BLOCK_BEFORE_START_EVENT " +
    "SUBTASK_BLOCK_CREATED_TASK_PROPERTY " +
    "SUBTASK_BLOCK_CREATION_EVENT " +
    "SUBTASK_BLOCK_DEADLINE_PROPERTY " +
    "SUBTASK_BLOCK_IMPORTANCE_PROPERTY " +
    "SUBTASK_BLOCK_INITIATOR_PROPERTY " +
    "SUBTASK_BLOCK_IS_RELATIVE_ABORT_DEADLINE_PROPERTY " +
    "SUBTASK_BLOCK_IS_RELATIVE_DEADLINE_PROPERTY " +
    "SUBTASK_BLOCK_JOBS_TYPE_PROPERTY " +
    "SUBTASK_BLOCK_NAME_PROPERTY " +
    "SUBTASK_BLOCK_PARALLEL_ROUTE_PROPERTY " +
    "SUBTASK_BLOCK_PERFORMERS_PROPERTY " +
    "SUBTASK_BLOCK_RELATIVE_ABORT_DEADLINE_TYPE_PROPERTY " +
    "SUBTASK_BLOCK_RELATIVE_DEADLINE_TYPE_PROPERTY " +
    "SUBTASK_BLOCK_REQUIRE_SIGN_PROPERTY " +
    "SUBTASK_BLOCK_STANDARD_ROUTE_PROPERTY " +
    "SUBTASK_BLOCK_START_EVENT " +
    "SUBTASK_BLOCK_STEP_CONTROL_PROPERTY " +
    "SUBTASK_BLOCK_SUBJECT_PROPERTY " +
    "SUBTASK_BLOCK_TASK_CONTROL_PROPERTY " +
    "SUBTASK_BLOCK_TEXT_PROPERTY " +
    "SUBTASK_BLOCK_UNLOCK_ATTACHMENTS_ON_STOP_PROPERTY " +
    "SUBTASK_BLOCK_USE_STANDARD_ROUTE_PROPERTY " +
    "SUBTASK_BLOCK_WAIT_FOR_TASK_COMPLETE_PROPERTY ";

  // System component
  const system_component_constants =
    "SYSCOMP_CONTROL_JOBS " +
    "SYSCOMP_FOLDERS " +
    "SYSCOMP_JOBS " +
    "SYSCOMP_NOTICES " +
    "SYSCOMP_TASKS ";

  // System dialogs
  const system_dialogs_constants =
    "SYSDLG_CREATE_EDOCUMENT " +
    "SYSDLG_CREATE_EDOCUMENT_VERSION " +
    "SYSDLG_CURRENT_PERIOD " +
    "SYSDLG_EDIT_FUNCTION_HELP " +
    "SYSDLG_EDOCUMENT_KINDS_FOR_TEMPLATE " +
    "SYSDLG_EXPORT_MULTIPLE_EDOCUMENTS " +
    "SYSDLG_EXPORT_SINGLE_EDOCUMENT " +
    "SYSDLG_IMPORT_EDOCUMENT " +
    "SYSDLG_MULTIPLE_SELECT " +
    "SYSDLG_SETUP_ACCESS_RIGHTS " +
    "SYSDLG_SETUP_DEFAULT_RIGHTS " +
    "SYSDLG_SETUP_FILTER_CONDITION " +
    "SYSDLG_SETUP_SIGN_RIGHTS " +
    "SYSDLG_SETUP_TASK_OBSERVERS " +
    "SYSDLG_SETUP_TASK_ROUTE " +
    "SYSDLG_SETUP_USERS_LIST " +
    "SYSDLG_SIGN_EDOCUMENT " +
    "SYSDLG_SIGN_MULTIPLE_EDOCUMENTS ";

  // System reference names
  const system_reference_names_constants =
    "SYSREF_ACCESS_RIGHTS_TYPES " +
    "SYSREF_ADMINISTRATION_HISTORY " +
    "SYSREF_ALL_AVAILABLE_COMPONENTS " +
    "SYSREF_ALL_AVAILABLE_PRIVILEGES " +
    "SYSREF_ALL_REPLICATING_COMPONENTS " +
    "SYSREF_AVAILABLE_DEVELOPERS_COMPONENTS " +
    "SYSREF_CALENDAR_EVENTS " +
    "SYSREF_COMPONENT_TOKEN_HISTORY " +
    "SYSREF_COMPONENT_TOKENS " +
    "SYSREF_COMPONENTS " +
    "SYSREF_CONSTANTS " +
    "SYSREF_DATA_RECEIVE_PROTOCOL " +
    "SYSREF_DATA_SEND_PROTOCOL " +
    "SYSREF_DIALOGS " +
    "SYSREF_DIALOGS_REQUISITES " +
    "SYSREF_EDITORS " +
    "SYSREF_EDOC_CARDS " +
    "SYSREF_EDOC_TYPES " +
    "SYSREF_EDOCUMENT_CARD_REQUISITES " +
    "SYSREF_EDOCUMENT_CARD_TYPES " +
    "SYSREF_EDOCUMENT_CARD_TYPES_REFERENCE " +
    "SYSREF_EDOCUMENT_CARDS " +
    "SYSREF_EDOCUMENT_HISTORY " +
    "SYSREF_EDOCUMENT_KINDS " +
    "SYSREF_EDOCUMENT_REQUISITES " +
    "SYSREF_EDOCUMENT_SIGNATURES " +
    "SYSREF_EDOCUMENT_TEMPLATES " +
    "SYSREF_EDOCUMENT_TEXT_STORAGES " +
    "SYSREF_EDOCUMENT_VIEWS " +
    "SYSREF_FILTERER_SETUP_CONFLICTS " +
    "SYSREF_FILTRATER_SETTING_CONFLICTS " +
    "SYSREF_FOLDER_HISTORY " +
    "SYSREF_FOLDERS " +
    "SYSREF_FUNCTION_GROUPS " +
    "SYSREF_FUNCTION_PARAMS " +
    "SYSREF_FUNCTIONS " +
    "SYSREF_JOB_HISTORY " +
    "SYSREF_LINKS " +
    "SYSREF_LOCALIZATION_DICTIONARY " +
    "SYSREF_LOCALIZATION_LANGUAGES " +
    "SYSREF_MODULES " +
    "SYSREF_PRIVILEGES " +
    "SYSREF_RECORD_HISTORY " +
    "SYSREF_REFERENCE_REQUISITES " +
    "SYSREF_REFERENCE_TYPE_VIEWS " +
    "SYSREF_REFERENCE_TYPES " +
    "SYSREF_REFERENCES " +
    "SYSREF_REFERENCES_REQUISITES " +
    "SYSREF_REMOTE_SERVERS " +
    "SYSREF_REPLICATION_SESSIONS_LOG " +
    "SYSREF_REPLICATION_SESSIONS_PROTOCOL " +
    "SYSREF_REPORTS " +
    "SYSREF_ROLES " +
    "SYSREF_ROUTE_BLOCK_GROUPS " +
    "SYSREF_ROUTE_BLOCKS " +
    "SYSREF_SCRIPTS " +
    "SYSREF_SEARCHES " +
    "SYSREF_SERVER_EVENTS " +
    "SYSREF_SERVER_EVENTS_HISTORY " +
    "SYSREF_STANDARD_ROUTE_GROUPS " +
    "SYSREF_STANDARD_ROUTES " +
    "SYSREF_STATUSES " +
    "SYSREF_SYSTEM_SETTINGS " +
    "SYSREF_TASK_HISTORY " +
    "SYSREF_TASK_KIND_GROUPS " +
    "SYSREF_TASK_KINDS " +
    "SYSREF_TASK_RIGHTS " +
    "SYSREF_TASK_SIGNATURES " +
    "SYSREF_TASKS " +
    "SYSREF_UNITS " +
    "SYSREF_USER_GROUPS " +
    "SYSREF_USER_GROUPS_REFERENCE " +
    "SYSREF_USER_SUBSTITUTION " +
    "SYSREF_USERS " +
    "SYSREF_USERS_REFERENCE " +
    "SYSREF_VIEWERS " +
    "SYSREF_WORKING_TIME_CALENDARS ";

  // Table name
  const table_name_constants =
    "ACCESS_RIGHTS_TABLE_NAME " +
    "EDMS_ACCESS_TABLE_NAME " +
    "EDOC_TYPES_TABLE_NAME ";

  // Test
  const test_constants =
    "TEST_DEV_DB_NAME " +
    "TEST_DEV_SYSTEM_CODE " +
    "TEST_EDMS_DB_NAME " +
    "TEST_EDMS_MAIN_CODE " +
    "TEST_EDMS_MAIN_DB_NAME " +
    "TEST_EDMS_SECOND_CODE " +
    "TEST_EDMS_SECOND_DB_NAME " +
    "TEST_EDMS_SYSTEM_CODE " +
    "TEST_ISB5_MAIN_CODE " +
    "TEST_ISB5_SECOND_CODE " +
    "TEST_SQL_SERVER_2005_NAME " +
    "TEST_SQL_SERVER_NAME ";

  // Using the dialog windows
  const using_the_dialog_windows_constants =
    "ATTENTION_CAPTION " +
    "cbsCommandLinks " +
    "cbsDefault " +
    "CONFIRMATION_CAPTION " +
    "ERROR_CAPTION " +
    "INFORMATION_CAPTION " +
    "mrCancel " +
    "mrOk ";

  // Using the document
  const using_the_document_constants =
    "EDOC_VERSION_ACTIVE_STAGE_CODE " +
    "EDOC_VERSION_DESIGN_STAGE_CODE " +
    "EDOC_VERSION_OBSOLETE_STAGE_CODE ";

  // Using the EA and encryption
  const using_the_EA_and_encryption_constants =
    "cpDataEnciphermentEnabled " +
    "cpDigitalSignatureEnabled " +
    "cpID " +
    "cpIssuer " +
    "cpPluginVersion " +
    "cpSerial " +
    "cpSubjectName " +
    "cpSubjSimpleName " +
    "cpValidFromDate " +
    "cpValidToDate ";

  // Using the ISBL-editor
  const using_the_ISBL_editor_constants =
    "ISBL_SYNTAX " + "NO_SYNTAX " + "XML_SYNTAX ";

  // Wait block properties
  const wait_block_properties_constants =
    "WAIT_BLOCK_AFTER_FINISH_EVENT " +
    "WAIT_BLOCK_BEFORE_START_EVENT " +
    "WAIT_BLOCK_DEADLINE_PROPERTY " +
    "WAIT_BLOCK_IS_RELATIVE_DEADLINE_PROPERTY " +
    "WAIT_BLOCK_NAME_PROPERTY " +
    "WAIT_BLOCK_RELATIVE_DEADLINE_TYPE_PROPERTY ";

  // SYSRES Common
  const sysres_common_constants =
    "SYSRES_COMMON " +
    "SYSRES_CONST " +
    "SYSRES_MBFUNC " +
    "SYSRES_SBDATA " +
    "SYSRES_SBGUI " +
    "SYSRES_SBINTF " +
    "SYSRES_SBREFDSC " +
    "SYSRES_SQLERRORS " +
    "SYSRES_SYSCOMP ";

  // Константы ==> built_in
  const CONSTANTS =
    sysres_constants +
    base_constants +
    base_group_name_constants +
    decision_block_properties_constants +
    file_extension_constants +
    job_block_properties_constants +
    language_code_constants +
    launching_external_applications_constants +
    link_kind_constants +
    lock_type_constants +
    monitor_block_properties_constants +
    notice_block_properties_constants +
    object_events_constants +
    object_params_constants +
    other_constants +
    privileges_constants +
    pseudoreference_code_constants +
    requisite_ISBCertificateType_values_constants +
    requisite_ISBEDocStorageType_values_constants +
    requisite_compType2_values_constants +
    requisite_name_constants +
    result_constants +
    rule_identification_constants +
    script_block_properties_constants +
    subtask_block_properties_constants +
    system_component_constants +
    system_dialogs_constants +
    system_reference_names_constants +
    table_name_constants +
    test_constants +
    using_the_dialog_windows_constants +
    using_the_document_constants +
    using_the_EA_and_encryption_constants +
    using_the_ISBL_editor_constants +
    wait_block_properties_constants +
    sysres_common_constants;

  // enum TAccountType
  const TAccountType = "atUser atGroup atRole ";

  // enum TActionEnabledMode
  const TActionEnabledMode =
    "aemEnabledAlways " +
    "aemDisabledAlways " +
    "aemEnabledOnBrowse " +
    "aemEnabledOnEdit " +
    "aemDisabledOnBrowseEmpty ";

  // enum TAddPosition
  const TAddPosition = "apBegin apEnd ";

  // enum TAlignment
  const TAlignment = "alLeft alRight ";

  // enum TAreaShowMode
  const TAreaShowMode =
    "asmNever " +
    "asmNoButCustomize " +
    "asmAsLastTime " +
    "asmYesButCustomize " +
    "asmAlways ";

  // enum TCertificateInvalidationReason
  const TCertificateInvalidationReason = "cirCommon cirRevoked ";

  // enum TCertificateType
  const TCertificateType = "ctSignature ctEncode ctSignatureEncode ";

  // enum TCheckListBoxItemState
  const TCheckListBoxItemState = "clbUnchecked clbChecked clbGrayed ";

  // enum TCloseOnEsc
  const TCloseOnEsc = "ceISB ceAlways ceNever ";

  // enum TCompType
  const TCompType =
    "ctDocument " +
    "ctReference " +
    "ctScript " +
    "ctUnknown " +
    "ctReport " +
    "ctDialog " +
    "ctFunction " +
    "ctFolder " +
    "ctEDocument " +
    "ctTask " +
    "ctJob " +
    "ctNotice " +
    "ctControlJob ";

  // enum TConditionFormat
  const TConditionFormat = "cfInternal cfDisplay ";

  // enum TConnectionIntent
  const TConnectionIntent = "ciUnspecified ciWrite ciRead ";

  // enum TContentKind
  const TContentKind =
    "ckFolder " +
    "ckEDocument " +
    "ckTask " +
    "ckJob " +
    "ckComponentToken " +
    "ckAny " +
    "ckReference " +
    "ckScript " +
    "ckReport " +
    "ckDialog ";

  // enum TControlType
  const TControlType =
    "ctISBLEditor " +
    "ctBevel " +
    "ctButton " +
    "ctCheckListBox " +
    "ctComboBox " +
    "ctComboEdit " +
    "ctGrid " +
    "ctDBCheckBox " +
    "ctDBComboBox " +
    "ctDBEdit " +
    "ctDBEllipsis " +
    "ctDBMemo " +
    "ctDBNavigator " +
    "ctDBRadioGroup " +
    "ctDBStatusLabel " +
    "ctEdit " +
    "ctGroupBox " +
    "ctInplaceHint " +
    "ctMemo " +
    "ctPanel " +
    "ctListBox " +
    "ctRadioButton " +
    "ctRichEdit " +
    "ctTabSheet " +
    "ctWebBrowser " +
    "ctImage " +
    "ctHyperLink " +
    "ctLabel " +
    "ctDBMultiEllipsis " +
    "ctRibbon " +
    "ctRichView " +
    "ctInnerPanel " +
    "ctPanelGroup " +
    "ctBitButton ";

  // enum TCriterionContentType
  const TCriterionContentType =
    "cctDate " +
    "cctInteger " +
    "cctNumeric " +
    "cctPick " +
    "cctReference " +
    "cctString " +
    "cctText ";

  // enum TCultureType
  const TCultureType = "cltInternal cltPrimary cltGUI ";

  // enum TDataSetEventType
  const TDataSetEventType =
    "dseBeforeOpen " +
    "dseAfterOpen " +
    "dseBeforeClose " +
    "dseAfterClose " +
    "dseOnValidDelete " +
    "dseBeforeDelete " +
    "dseAfterDelete " +
    "dseAfterDeleteOutOfTransaction " +
    "dseOnDeleteError " +
    "dseBeforeInsert " +
    "dseAfterInsert " +
    "dseOnValidUpdate " +
    "dseBeforeUpdate " +
    "dseOnUpdateRatifiedRecord " +
    "dseAfterUpdate " +
    "dseAfterUpdateOutOfTransaction " +
    "dseOnUpdateError " +
    "dseAfterScroll " +
    "dseOnOpenRecord " +
    "dseOnCloseRecord " +
    "dseBeforeCancel " +
    "dseAfterCancel " +
    "dseOnUpdateDeadlockError " +
    "dseBeforeDetailUpdate " +
    "dseOnPrepareUpdate " +
    "dseOnAnyRequisiteChange ";

  // enum TDataSetState
  const TDataSetState = "dssEdit dssInsert dssBrowse dssInActive ";

  // enum TDateFormatType
  const TDateFormatType = "dftDate dftShortDate dftDateTime dftTimeStamp ";

  // enum TDateOffsetType
  const TDateOffsetType = "dotDays dotHours dotMinutes dotSeconds ";

  // enum TDateTimeKind
  const TDateTimeKind = "dtkndLocal dtkndUTC ";

  // enum TDeaAccessRights
  const TDeaAccessRights = "arNone arView arEdit arFull ";

  // enum TDocumentDefaultAction
  const TDocumentDefaultAction = "ddaView ddaEdit ";

  // enum TEditMode
  const TEditMode =
    "emLock " +
    "emEdit " +
    "emSign " +
    "emExportWithLock " +
    "emImportWithUnlock " +
    "emChangeVersionNote " +
    "emOpenForModify " +
    "emChangeLifeStage " +
    "emDelete " +
    "emCreateVersion " +
    "emImport " +
    "emUnlockExportedWithLock " +
    "emStart " +
    "emAbort " +
    "emReInit " +
    "emMarkAsReaded " +
    "emMarkAsUnreaded " +
    "emPerform " +
    "emAccept " +
    "emResume " +
    "emChangeRights " +
    "emEditRoute " +
    "emEditObserver " +
    "emRecoveryFromLocalCopy " +
    "emChangeWorkAccessType " +
    "emChangeEncodeTypeToCertificate " +
    "emChangeEncodeTypeToPassword " +
    "emChangeEncodeTypeToNone " +
    "emChangeEncodeTypeToCertificatePassword " +
    "emChangeStandardRoute " +
    "emGetText " +
    "emOpenForView " +
    "emMoveToStorage " +
    "emCreateObject " +
    "emChangeVersionHidden " +
    "emDeleteVersion " +
    "emChangeLifeCycleStage " +
    "emApprovingSign " +
    "emExport " +
    "emContinue " +
    "emLockFromEdit " +
    "emUnLockForEdit " +
    "emLockForServer " +
    "emUnlockFromServer " +
    "emDelegateAccessRights " +
    "emReEncode ";

  // enum TEditorCloseObservType
  const TEditorCloseObservType = "ecotFile ecotProcess ";

  // enum TEdmsApplicationAction
  const TEdmsApplicationAction = "eaGet eaCopy eaCreate eaCreateStandardRoute ";

  // enum TEDocumentLockType
  const TEDocumentLockType = "edltAll edltNothing edltQuery ";

  // enum TEDocumentStepShowMode
  const TEDocumentStepShowMode = "essmText essmCard ";

  // enum TEDocumentStepVersionType
  const TEDocumentStepVersionType = "esvtLast esvtLastActive esvtSpecified ";

  // enum TEDocumentStorageFunction
  const TEDocumentStorageFunction = "edsfExecutive edsfArchive ";

  // enum TEDocumentStorageType
  const TEDocumentStorageType = "edstSQLServer edstFile ";

  // enum TEDocumentVersionSourceType
  const TEDocumentVersionSourceType =
    "edvstNone edvstEDocumentVersionCopy edvstFile edvstTemplate edvstScannedFile ";

  // enum TEDocumentVersionState
  const TEDocumentVersionState = "vsDefault vsDesign vsActive vsObsolete ";

  // enum TEncodeType
  const TEncodeType = "etNone etCertificate etPassword etCertificatePassword ";

  // enum TExceptionCategory
  const TExceptionCategory = "ecException ecWarning ecInformation ";

  // enum TExportedSignaturesType
  const TExportedSignaturesType = "estAll estApprovingOnly ";

  // enum TExportedVersionType
  const TExportedVersionType = "evtLast evtLastActive evtQuery ";

  // enum TFieldDataType
  const TFieldDataType =
    "fdtString " +
    "fdtNumeric " +
    "fdtInteger " +
    "fdtDate " +
    "fdtText " +
    "fdtUnknown " +
    "fdtWideString " +
    "fdtLargeInteger ";

  // enum TFolderType
  const TFolderType =
    "ftInbox " +
    "ftOutbox " +
    "ftFavorites " +
    "ftCommonFolder " +
    "ftUserFolder " +
    "ftComponents " +
    "ftQuickLaunch " +
    "ftShortcuts " +
    "ftSearch ";

  // enum TGridRowHeight
  const TGridRowHeight = "grhAuto " + "grhX1 " + "grhX2 " + "grhX3 ";

  // enum THyperlinkType
  const THyperlinkType = "hltText " + "hltRTF " + "hltHTML ";

  // enum TImageFileFormat
  const TImageFileFormat =
    "iffBMP " +
    "iffJPEG " +
    "iffMultiPageTIFF " +
    "iffSinglePageTIFF " +
    "iffTIFF " +
    "iffPNG ";

  // enum TImageMode
  const TImageMode = "im8bGrayscale " + "im24bRGB " + "im1bMonochrome ";

  // enum TImageType
  const TImageType = "itBMP " + "itJPEG " + "itWMF " + "itPNG ";

  // enum TInplaceHintKind
  const TInplaceHintKind =
    "ikhInformation " + "ikhWarning " + "ikhError " + "ikhNoIcon ";

  // enum TISBLContext
  const TISBLContext =
    "icUnknown " +
    "icScript " +
    "icFunction " +
    "icIntegratedReport " +
    "icAnalyticReport " +
    "icDataSetEventHandler " +
    "icActionHandler " +
    "icFormEventHandler " +
    "icLookUpEventHandler " +
    "icRequisiteChangeEventHandler " +
    "icBeforeSearchEventHandler " +
    "icRoleCalculation " +
    "icSelectRouteEventHandler " +
    "icBlockPropertyCalculation " +
    "icBlockQueryParamsEventHandler " +
    "icChangeSearchResultEventHandler " +
    "icBlockEventHandler " +
    "icSubTaskInitEventHandler " +
    "icEDocDataSetEventHandler " +
    "icEDocLookUpEventHandler " +
    "icEDocActionHandler " +
    "icEDocFormEventHandler " +
    "icEDocRequisiteChangeEventHandler " +
    "icStructuredConversionRule " +
    "icStructuredConversionEventBefore " +
    "icStructuredConversionEventAfter " +
    "icWizardEventHandler " +
    "icWizardFinishEventHandler " +
    "icWizardStepEventHandler " +
    "icWizardStepFinishEventHandler " +
    "icWizardActionEnableEventHandler " +
    "icWizardActionExecuteEventHandler " +
    "icCreateJobsHandler " +
    "icCreateNoticesHandler " +
    "icBeforeLookUpEventHandler " +
    "icAfterLookUpEventHandler " +
    "icTaskAbortEventHandler " +
    "icWorkflowBlockActionHandler " +
    "icDialogDataSetEventHandler " +
    "icDialogActionHandler " +
    "icDialogLookUpEventHandler " +
    "icDialogRequisiteChangeEventHandler " +
    "icDialogFormEventHandler " +
    "icDialogValidCloseEventHandler " +
    "icBlockFormEventHandler " +
    "icTaskFormEventHandler " +
    "icReferenceMethod " +
    "icEDocMethod " +
    "icDialogMethod " +
    "icProcessMessageHandler ";

  // enum TItemShow
  const TItemShow = "isShow " + "isHide " + "isByUserSettings ";

  // enum TJobKind
  const TJobKind = "jkJob " + "jkNotice " + "jkControlJob ";

  // enum TJoinType
  const TJoinType = "jtInner " + "jtLeft " + "jtRight " + "jtFull " + "jtCross ";

  // enum TLabelPos
  const TLabelPos = "lbpAbove " + "lbpBelow " + "lbpLeft " + "lbpRight ";

  // enum TLicensingType
  const TLicensingType = "eltPerConnection " + "eltPerUser ";

  // enum TLifeCycleStageFontColor
  const TLifeCycleStageFontColor =
    "sfcUndefined " +
    "sfcBlack " +
    "sfcGreen " +
    "sfcRed " +
    "sfcBlue " +
    "sfcOrange " +
    "sfcLilac ";

  // enum TLifeCycleStageFontStyle
  const TLifeCycleStageFontStyle = "sfsItalic " + "sfsStrikeout " + "sfsNormal ";

  // enum TLockableDevelopmentComponentType
  const TLockableDevelopmentComponentType =
    "ldctStandardRoute " +
    "ldctWizard " +
    "ldctScript " +
    "ldctFunction " +
    "ldctRouteBlock " +
    "ldctIntegratedReport " +
    "ldctAnalyticReport " +
    "ldctReferenceType " +
    "ldctEDocumentType " +
    "ldctDialog " +
    "ldctServerEvents ";

  // enum TMaxRecordCountRestrictionType
  const TMaxRecordCountRestrictionType =
    "mrcrtNone " + "mrcrtUser " + "mrcrtMaximal " + "mrcrtCustom ";

  // enum TRangeValueType
  const TRangeValueType =
    "vtEqual " + "vtGreaterOrEqual " + "vtLessOrEqual " + "vtRange ";

  // enum TRelativeDate
  const TRelativeDate =
    "rdYesterday " +
    "rdToday " +
    "rdTomorrow " +
    "rdThisWeek " +
    "rdThisMonth " +
    "rdThisYear " +
    "rdNextMonth " +
    "rdNextWeek " +
    "rdLastWeek " +
    "rdLastMonth ";

  // enum TReportDestination
  const TReportDestination = "rdWindow " + "rdFile " + "rdPrinter ";

  // enum TReqDataType
  const TReqDataType =
    "rdtString " +
    "rdtNumeric " +
    "rdtInteger " +
    "rdtDate " +
    "rdtReference " +
    "rdtAccount " +
    "rdtText " +
    "rdtPick " +
    "rdtUnknown " +
    "rdtLargeInteger " +
    "rdtDocument ";

  // enum TRequisiteEventType
  const TRequisiteEventType = "reOnChange " + "reOnChangeValues ";

  // enum TSBTimeType
  const TSBTimeType = "ttGlobal " + "ttLocal " + "ttUser " + "ttSystem ";

  // enum TSearchShowMode
  const TSearchShowMode =
    "ssmBrowse " + "ssmSelect " + "ssmMultiSelect " + "ssmBrowseModal ";

  // enum TSelectMode
  const TSelectMode = "smSelect " + "smLike " + "smCard ";

  // enum TSignatureType
  const TSignatureType = "stNone " + "stAuthenticating " + "stApproving ";

  // enum TSignerContentType
  const TSignerContentType = "sctString " + "sctStream ";

  // enum TStringsSortType
  const TStringsSortType = "sstAnsiSort " + "sstNaturalSort ";

  // enum TStringValueType
  const TStringValueType = "svtEqual " + "svtContain ";

  // enum TStructuredObjectAttributeType
  const TStructuredObjectAttributeType =
    "soatString " +
    "soatNumeric " +
    "soatInteger " +
    "soatDatetime " +
    "soatReferenceRecord " +
    "soatText " +
    "soatPick " +
    "soatBoolean " +
    "soatEDocument " +
    "soatAccount " +
    "soatIntegerCollection " +
    "soatNumericCollection " +
    "soatStringCollection " +
    "soatPickCollection " +
    "soatDatetimeCollection " +
    "soatBooleanCollection " +
    "soatReferenceRecordCollection " +
    "soatEDocumentCollection " +
    "soatAccountCollection " +
    "soatContents " +
    "soatUnknown ";

  // enum TTaskAbortReason
  const TTaskAbortReason = "tarAbortByUser " + "tarAbortByWorkflowException ";

  // enum TTextValueType
  const TTextValueType = "tvtAllWords " + "tvtExactPhrase " + "tvtAnyWord ";

  // enum TUserObjectStatus
  const TUserObjectStatus =
    "usNone " +
    "usCompleted " +
    "usRedSquare " +
    "usBlueSquare " +
    "usYellowSquare " +
    "usGreenSquare " +
    "usOrangeSquare " +
    "usPurpleSquare " +
    "usFollowUp ";

  // enum TUserType
  const TUserType =
    "utUnknown " +
    "utUser " +
    "utDeveloper " +
    "utAdministrator " +
    "utSystemDeveloper " +
    "utDisconnected ";

  // enum TValuesBuildType
  const TValuesBuildType =
    "btAnd " + "btDetailAnd " + "btOr " + "btNotOr " + "btOnly ";

  // enum TViewMode
  const TViewMode = "vmView " + "vmSelect " + "vmNavigation ";

  // enum TViewSelectionMode
  const TViewSelectionMode =
    "vsmSingle " + "vsmMultiple " + "vsmMultipleCheck " + "vsmNoSelection ";

  // enum TWizardActionType
  const TWizardActionType =
    "wfatPrevious " + "wfatNext " + "wfatCancel " + "wfatFinish ";

  // enum TWizardFormElementProperty
  const TWizardFormElementProperty =
    "wfepUndefined " +
    "wfepText3 " +
    "wfepText6 " +
    "wfepText9 " +
    "wfepSpinEdit " +
    "wfepDropDown " +
    "wfepRadioGroup " +
    "wfepFlag " +
    "wfepText12 " +
    "wfepText15 " +
    "wfepText18 " +
    "wfepText21 " +
    "wfepText24 " +
    "wfepText27 " +
    "wfepText30 " +
    "wfepRadioGroupColumn1 " +
    "wfepRadioGroupColumn2 " +
    "wfepRadioGroupColumn3 ";

  // enum TWizardFormElementType
  const TWizardFormElementType =
    "wfetQueryParameter " + "wfetText " + "wfetDelimiter " + "wfetLabel ";

  // enum TWizardParamType
  const TWizardParamType =
    "wptString " +
    "wptInteger " +
    "wptNumeric " +
    "wptBoolean " +
    "wptDateTime " +
    "wptPick " +
    "wptText " +
    "wptUser " +
    "wptUserList " +
    "wptEDocumentInfo " +
    "wptEDocumentInfoList " +
    "wptReferenceRecordInfo " +
    "wptReferenceRecordInfoList " +
    "wptFolderInfo " +
    "wptTaskInfo " +
    "wptContents " +
    "wptFileName " +
    "wptDate ";

  // enum TWizardStepResult
  const TWizardStepResult =
    "wsrComplete " +
    "wsrGoNext " +
    "wsrGoPrevious " +
    "wsrCustom " +
    "wsrCancel " +
    "wsrGoFinal ";

  // enum TWizardStepType
  const TWizardStepType =
    "wstForm " +
    "wstEDocument " +
    "wstTaskCard " +
    "wstReferenceRecordCard " +
    "wstFinal ";

  // enum TWorkAccessType
  const TWorkAccessType = "waAll " + "waPerformers " + "waManual ";

  // enum TWorkflowBlockType
  const TWorkflowBlockType =
    "wsbStart " +
    "wsbFinish " +
    "wsbNotice " +
    "wsbStep " +
    "wsbDecision " +
    "wsbWait " +
    "wsbMonitor " +
    "wsbScript " +
    "wsbConnector " +
    "wsbSubTask " +
    "wsbLifeCycleStage " +
    "wsbPause ";

  // enum TWorkflowDataType
  const TWorkflowDataType =
    "wdtInteger " +
    "wdtFloat " +
    "wdtString " +
    "wdtPick " +
    "wdtDateTime " +
    "wdtBoolean " +
    "wdtTask " +
    "wdtJob " +
    "wdtFolder " +
    "wdtEDocument " +
    "wdtReferenceRecord " +
    "wdtUser " +
    "wdtGroup " +
    "wdtRole " +
    "wdtIntegerCollection " +
    "wdtFloatCollection " +
    "wdtStringCollection " +
    "wdtPickCollection " +
    "wdtDateTimeCollection " +
    "wdtBooleanCollection " +
    "wdtTaskCollection " +
    "wdtJobCollection " +
    "wdtFolderCollection " +
    "wdtEDocumentCollection " +
    "wdtReferenceRecordCollection " +
    "wdtUserCollection " +
    "wdtGroupCollection " +
    "wdtRoleCollection " +
    "wdtContents " +
    "wdtUserList " +
    "wdtSearchDescription " +
    "wdtDeadLine " +
    "wdtPickSet " +
    "wdtAccountCollection ";

  // enum TWorkImportance
  const TWorkImportance = "wiLow " + "wiNormal " + "wiHigh ";

  // enum TWorkRouteType
  const TWorkRouteType = "wrtSoft " + "wrtHard ";

  // enum TWorkState
  const TWorkState =
    "wsInit " +
    "wsRunning " +
    "wsDone " +
    "wsControlled " +
    "wsAborted " +
    "wsContinued ";

  // enum TWorkTextBuildingMode
  const TWorkTextBuildingMode =
    "wtmFull " + "wtmFromCurrent " + "wtmOnlyCurrent ";

  // Перечисления
  const ENUMS =
    TAccountType +
    TActionEnabledMode +
    TAddPosition +
    TAlignment +
    TAreaShowMode +
    TCertificateInvalidationReason +
    TCertificateType +
    TCheckListBoxItemState +
    TCloseOnEsc +
    TCompType +
    TConditionFormat +
    TConnectionIntent +
    TContentKind +
    TControlType +
    TCriterionContentType +
    TCultureType +
    TDataSetEventType +
    TDataSetState +
    TDateFormatType +
    TDateOffsetType +
    TDateTimeKind +
    TDeaAccessRights +
    TDocumentDefaultAction +
    TEditMode +
    TEditorCloseObservType +
    TEdmsApplicationAction +
    TEDocumentLockType +
    TEDocumentStepShowMode +
    TEDocumentStepVersionType +
    TEDocumentStorageFunction +
    TEDocumentStorageType +
    TEDocumentVersionSourceType +
    TEDocumentVersionState +
    TEncodeType +
    TExceptionCategory +
    TExportedSignaturesType +
    TExportedVersionType +
    TFieldDataType +
    TFolderType +
    TGridRowHeight +
    THyperlinkType +
    TImageFileFormat +
    TImageMode +
    TImageType +
    TInplaceHintKind +
    TISBLContext +
    TItemShow +
    TJobKind +
    TJoinType +
    TLabelPos +
    TLicensingType +
    TLifeCycleStageFontColor +
    TLifeCycleStageFontStyle +
    TLockableDevelopmentComponentType +
    TMaxRecordCountRestrictionType +
    TRangeValueType +
    TRelativeDate +
    TReportDestination +
    TReqDataType +
    TRequisiteEventType +
    TSBTimeType +
    TSearchShowMode +
    TSelectMode +
    TSignatureType +
    TSignerContentType +
    TStringsSortType +
    TStringValueType +
    TStructuredObjectAttributeType +
    TTaskAbortReason +
    TTextValueType +
    TUserObjectStatus +
    TUserType +
    TValuesBuildType +
    TViewMode +
    TViewSelectionMode +
    TWizardActionType +
    TWizardFormElementProperty +
    TWizardFormElementType +
    TWizardParamType +
    TWizardStepResult +
    TWizardStepType +
    TWorkAccessType +
    TWorkflowBlockType +
    TWorkflowDataType +
    TWorkImportance +
    TWorkRouteType +
    TWorkState +
    TWorkTextBuildingMode;

  // Системные функции ==> SYSFUNCTIONS
  const system_functions =
    "AddSubString " +
    "AdjustLineBreaks " +
    "AmountInWords " +
    "Analysis " +
    "ArrayDimCount " +
    "ArrayHighBound " +
    "ArrayLowBound " +
    "ArrayOf " +
    "ArrayReDim " +
    "Assert " +
    "Assigned " +
    "BeginOfMonth " +
    "BeginOfPeriod " +
    "BuildProfilingOperationAnalysis " +
    "CallProcedure " +
    "CanReadFile " +
    "CArrayElement " +
    "CDataSetRequisite " +
    "ChangeDate " +
    "ChangeReferenceDataset " +
    "Char " +
    "CharPos " +
    "CheckParam " +
    "CheckParamValue " +
    "CompareStrings " +
    "ConstantExists " +
    "ControlState " +
    "ConvertDateStr " +
    "Copy " +
    "CopyFile " +
    "CreateArray " +
    "CreateCachedReference " +
    "CreateConnection " +
    "CreateDialog " +
    "CreateDualListDialog " +
    "CreateEditor " +
    "CreateException " +
    "CreateFile " +
    "CreateFolderDialog " +
    "CreateInputDialog " +
    "CreateLinkFile " +
    "CreateList " +
    "CreateLock " +
    "CreateMemoryDataSet " +
    "CreateObject " +
    "CreateOpenDialog " +
    "CreateProgress " +
    "CreateQuery " +
    "CreateReference " +
    "CreateReport " +
    "CreateSaveDialog " +
    "CreateScript " +
    "CreateSQLPivotFunction " +
    "CreateStringList " +
    "CreateTreeListSelectDialog " +
    "CSelectSQL " +
    "CSQL " +
    "CSubString " +
    "CurrentUserID " +
    "CurrentUserName " +
    "CurrentVersion " +
    "DataSetLocateEx " +
    "DateDiff " +
    "DateTimeDiff " +
    "DateToStr " +
    "DayOfWeek " +
    "DeleteFile " +
    "DirectoryExists " +
    "DisableCheckAccessRights " +
    "DisableCheckFullShowingRestriction " +
    "DisableMassTaskSendingRestrictions " +
    "DropTable " +
    "DupeString " +
    "EditText " +
    "EnableCheckAccessRights " +
    "EnableCheckFullShowingRestriction " +
    "EnableMassTaskSendingRestrictions " +
    "EndOfMonth " +
    "EndOfPeriod " +
    "ExceptionExists " +
    "ExceptionsOff " +
    "ExceptionsOn " +
    "Execute " +
    "ExecuteProcess " +
    "Exit " +
    "ExpandEnvironmentVariables " +
    "ExtractFileDrive " +
    "ExtractFileExt " +
    "ExtractFileName " +
    "ExtractFilePath " +
    "ExtractParams " +
    "FileExists " +
    "FileSize " +
    "FindFile " +
    "FindSubString " +
    "FirmContext " +
    "ForceDirectories " +
    "Format " +
    "FormatDate " +
    "FormatNumeric " +
    "FormatSQLDate " +
    "FormatString " +
    "FreeException " +
    "GetComponent " +
    "GetComponentLaunchParam " +
    "GetConstant " +
    "GetLastException " +
    "GetReferenceRecord " +
    "GetRefTypeByRefID " +
    "GetTableID " +
    "GetTempFolder " +
    "IfThen " +
    "In " +
    "IndexOf " +
    "InputDialog " +
    "InputDialogEx " +
    "InteractiveMode " +
    "IsFileLocked " +
    "IsGraphicFile " +
    "IsNumeric " +
    "Length " +
    "LoadString " +
    "LoadStringFmt " +
    "LocalTimeToUTC " +
    "LowerCase " +
    "Max " +
    "MessageBox " +
    "MessageBoxEx " +
    "MimeDecodeBinary " +
    "MimeDecodeString " +
    "MimeEncodeBinary " +
    "MimeEncodeString " +
    "Min " +
    "MoneyInWords " +
    "MoveFile " +
    "NewID " +
    "Now " +
    "OpenFile " +
    "Ord " +
    "Precision " +
    "Raise " +
    "ReadCertificateFromFile " +
    "ReadFile " +
    "ReferenceCodeByID " +
    "ReferenceNumber " +
    "ReferenceRequisiteMode " +
    "ReferenceRequisiteValue " +
    "RegionDateSettings " +
    "RegionNumberSettings " +
    "RegionTimeSettings " +
    "RegRead " +
    "RegWrite " +
    "RenameFile " +
    "Replace " +
    "Round " +
    "SelectServerCode " +
    "SelectSQL " +
    "ServerDateTime " +
    "SetConstant " +
    "SetManagedFolderFieldsState " +
    "ShowConstantsInputDialog " +
    "ShowMessage " +
    "Sleep " +
    "Split " +
    "SQL " +
    "SQL2XLSTAB " +
    "SQLProfilingSendReport " +
    "StrToDate " +
    "SubString " +
    "SubStringCount " +
    "SystemSetting " +
    "Time " +
    "TimeDiff " +
    "Today " +
    "Transliterate " +
    "Trim " +
    "UpperCase " +
    "UserStatus " +
    "UTCToLocalTime " +
    "ValidateXML " +
    "VarIsClear " +
    "VarIsEmpty " +
    "VarIsNull " +
    "WorkTimeDiff " +
    "WriteFile " +
    "WriteFileEx " +
    "WriteObjectHistory " +
    "Анализ " +
    "БазаДанных " +
    "БлокЕсть " +
    "БлокЕстьРасш " +
    "БлокИнфо " +
    "БлокСнять " +
    "БлокСнятьРасш " +
    "БлокУстановить " +
    "Ввод " +
    "ВводМеню " +
    "ВедС " +
    "ВедСпр " +
    "ВерхняяГраницаМассива " +
    "ВнешПрогр " +
    "Восст " +
    "ВременнаяПапка " +
    "Время " +
    "ВыборSQL " +
    "ВыбратьЗапись " +
    "ВыделитьСтр " +
    "Вызвать " +
    "Выполнить " +
    "ВыпПрогр " +
    "ГрафическийФайл " +
    "ГруппаДополнительно " +
    "ДатаВремяСерв " +
    "ДеньНедели " +
    "ДиалогДаНет " +
    "ДлинаСтр " +
    "ДобПодстр " +
    "ЕПусто " +
    "ЕслиТо " +
    "ЕЧисло " +
    "ЗамПодстр " +
    "ЗаписьСправочника " +
    "ЗначПоляСпр " +
    "ИДТипСпр " +
    "ИзвлечьДиск " +
    "ИзвлечьИмяФайла " +
    "ИзвлечьПуть " +
    "ИзвлечьРасширение " +
    "ИзмДат " +
    "ИзменитьРазмерМассива " +
    "ИзмеренийМассива " +
    "ИмяОрг " +
    "ИмяПоляСпр " +
    "Индекс " +
    "ИндикаторЗакрыть " +
    "ИндикаторОткрыть " +
    "ИндикаторШаг " +
    "ИнтерактивныйРежим " +
    "ИтогТблСпр " +
    "КодВидВедСпр " +
    "КодВидСпрПоИД " +
    "КодПоAnalit " +
    "КодСимвола " +
    "КодСпр " +
    "КолПодстр " +
    "КолПроп " +
    "КонМес " +
    "Конст " +
    "КонстЕсть " +
    "КонстЗнач " +
    "КонТран " +
    "КопироватьФайл " +
    "КопияСтр " +
    "КПериод " +
    "КСтрТблСпр " +
    "Макс " +
    "МаксСтрТблСпр " +
    "Массив " +
    "Меню " +
    "МенюРасш " +
    "Мин " +
    "НаборДанныхНайтиРасш " +
    "НаимВидСпр " +
    "НаимПоAnalit " +
    "НаимСпр " +
    "НастроитьПереводыСтрок " +
    "НачМес " +
    "НачТран " +
    "НижняяГраницаМассива " +
    "НомерСпр " +
    "НПериод " +
    "Окно " +
    "Окр " +
    "Окружение " +
    "ОтлИнфДобавить " +
    "ОтлИнфУдалить " +
    "Отчет " +
    "ОтчетАнал " +
    "ОтчетИнт " +
    "ПапкаСуществует " +
    "Пауза " +
    "ПВыборSQL " +
    "ПереименоватьФайл " +
    "Переменные " +
    "ПереместитьФайл " +
    "Подстр " +
    "ПоискПодстр " +
    "ПоискСтр " +
    "ПолучитьИДТаблицы " +
    "ПользовательДополнительно " +
    "ПользовательИД " +
    "ПользовательИмя " +
    "ПользовательСтатус " +
    "Прервать " +
    "ПроверитьПараметр " +
    "ПроверитьПараметрЗнач " +
    "ПроверитьУсловие " +
    "РазбСтр " +
    "РазнВремя " +
    "РазнДат " +
    "РазнДатаВремя " +
    "РазнРабВремя " +
    "РегУстВрем " +
    "РегУстДат " +
    "РегУстЧсл " +
    "РедТекст " +
    "РеестрЗапись " +
    "РеестрСписокИменПарам " +
    "РеестрЧтение " +
    "РеквСпр " +
    "РеквСпрПр " +
    "Сегодня " +
    "Сейчас " +
    "Сервер " +
    "СерверПроцессИД " +
    "СертификатФайлСчитать " +
    "СжПроб " +
    "Символ " +
    "СистемаДиректумКод " +
    "СистемаИнформация " +
    "СистемаКод " +
    "Содержит " +
    "СоединениеЗакрыть " +
    "СоединениеОткрыть " +
    "СоздатьДиалог " +
    "СоздатьДиалогВыбораИзДвухСписков " +
    "СоздатьДиалогВыбораПапки " +
    "СоздатьДиалогОткрытияФайла " +
    "СоздатьДиалогСохраненияФайла " +
    "СоздатьЗапрос " +
    "СоздатьИндикатор " +
    "СоздатьИсключение " +
    "СоздатьКэшированныйСправочник " +
    "СоздатьМассив " +
    "СоздатьНаборДанных " +
    "СоздатьОбъект " +
    "СоздатьОтчет " +
    "СоздатьПапку " +
    "СоздатьРедактор " +
    "СоздатьСоединение " +
    "СоздатьСписок " +
    "СоздатьСписокСтрок " +
    "СоздатьСправочник " +
    "СоздатьСценарий " +
    "СоздСпр " +
    "СостСпр " +
    "Сохр " +
    "СохрСпр " +
    "СписокСистем " +
    "Спр " +
    "Справочник " +
    "СпрБлокЕсть " +
    "СпрБлокСнять " +
    "СпрБлокСнятьРасш " +
    "СпрБлокУстановить " +
    "СпрИзмНабДан " +
    "СпрКод " +
    "СпрНомер " +
    "СпрОбновить " +
    "СпрОткрыть " +
    "СпрОтменить " +
    "СпрПарам " +
    "СпрПолеЗнач " +
    "СпрПолеИмя " +
    "СпрРекв " +
    "СпрРеквВведЗн " +
    "СпрРеквНовые " +
    "СпрРеквПр " +
    "СпрРеквПредЗн " +
    "СпрРеквРежим " +
    "СпрРеквТипТекст " +
    "СпрСоздать " +
    "СпрСост " +
    "СпрСохранить " +
    "СпрТблИтог " +
    "СпрТблСтр " +
    "СпрТблСтрКол " +
    "СпрТблСтрМакс " +
    "СпрТблСтрМин " +
    "СпрТблСтрПред " +
    "СпрТблСтрСлед " +
    "СпрТблСтрСозд " +
    "СпрТблСтрУд " +
    "СпрТекПредст " +
    "СпрУдалить " +
    "СравнитьСтр " +
    "СтрВерхРегистр " +
    "СтрНижнРегистр " +
    "СтрТблСпр " +
    "СумПроп " +
    "Сценарий " +
    "СценарийПарам " +
    "ТекВерсия " +
    "ТекОрг " +
    "Точн " +
    "Тран " +
    "Транслитерация " +
    "УдалитьТаблицу " +
    "УдалитьФайл " +
    "УдСпр " +
    "УдСтрТблСпр " +
    "Уст " +
    "УстановкиКонстант " +
    "ФайлАтрибутСчитать " +
    "ФайлАтрибутУстановить " +
    "ФайлВремя " +
    "ФайлВремяУстановить " +
    "ФайлВыбрать " +
    "ФайлЗанят " +
    "ФайлЗаписать " +
    "ФайлИскать " +
    "ФайлКопировать " +
    "ФайлМожноЧитать " +
    "ФайлОткрыть " +
    "ФайлПереименовать " +
    "ФайлПерекодировать " +
    "ФайлПереместить " +
    "ФайлПросмотреть " +
    "ФайлРазмер " +
    "ФайлСоздать " +
    "ФайлСсылкаСоздать " +
    "ФайлСуществует " +
    "ФайлСчитать " +
    "ФайлУдалить " +
    "ФмтSQLДат " +
    "ФмтДат " +
    "ФмтСтр " +
    "ФмтЧсл " +
    "Формат " +
    "ЦМассивЭлемент " +
    "ЦНаборДанныхРеквизит " +
    "ЦПодстр ";

  // Предопределенные переменные ==> built_in
  const predefined_variables =
    "AltState " +
    "Application " +
    "CallType " +
    "ComponentTokens " +
    "CreatedJobs " +
    "CreatedNotices " +
    "ControlState " +
    "DialogResult " +
    "Dialogs " +
    "EDocuments " +
    "EDocumentVersionSource " +
    "Folders " +
    "GlobalIDs " +
    "Job " +
    "Jobs " +
    "InputValue " +
    "LookUpReference " +
    "LookUpRequisiteNames " +
    "LookUpSearch " +
    "Object " +
    "ParentComponent " +
    "Processes " +
    "References " +
    "Requisite " +
    "ReportName " +
    "Reports " +
    "Result " +
    "Scripts " +
    "Searches " +
    "SelectedAttachments " +
    "SelectedItems " +
    "SelectMode " +
    "Sender " +
    "ServerEvents " +
    "ServiceFactory " +
    "ShiftState " +
    "SubTask " +
    "SystemDialogs " +
    "Tasks " +
    "Wizard " +
    "Wizards " +
    "Work " +
    "ВызовСпособ " +
    "ИмяОтчета " +
    "РеквЗнач ";

  // Интерфейсы ==> type
  const interfaces =
    "IApplication " +
    "IAccessRights " +
    "IAccountRepository " +
    "IAccountSelectionRestrictions " +
    "IAction " +
    "IActionList " +
    "IAdministrationHistoryDescription " +
    "IAnchors " +
    "IApplication " +
    "IArchiveInfo " +
    "IAttachment " +
    "IAttachmentList " +
    "ICheckListBox " +
    "ICheckPointedList " +
    "IColumn " +
    "IComponent " +
    "IComponentDescription " +
    "IComponentToken " +
    "IComponentTokenFactory " +
    "IComponentTokenInfo " +
    "ICompRecordInfo " +
    "IConnection " +
    "IContents " +
    "IControl " +
    "IControlJob " +
    "IControlJobInfo " +
    "IControlList " +
    "ICrypto " +
    "ICrypto2 " +
    "ICustomJob " +
    "ICustomJobInfo " +
    "ICustomListBox " +
    "ICustomObjectWizardStep " +
    "ICustomWork " +
    "ICustomWorkInfo " +
    "IDataSet " +
    "IDataSetAccessInfo " +
    "IDataSigner " +
    "IDateCriterion " +
    "IDateRequisite " +
    "IDateRequisiteDescription " +
    "IDateValue " +
    "IDeaAccessRights " +
    "IDeaObjectInfo " +
    "IDevelopmentComponentLock " +
    "IDialog " +
    "IDialogFactory " +
    "IDialogPickRequisiteItems " +
    "IDialogsFactory " +
    "IDICSFactory " +
    "IDocRequisite " +
    "IDocumentInfo " +
    "IDualListDialog " +
    "IECertificate " +
    "IECertificateInfo " +
    "IECertificates " +
    "IEditControl " +
    "IEditorForm " +
    "IEdmsExplorer " +
    "IEdmsObject " +
    "IEdmsObjectDescription " +
    "IEdmsObjectFactory " +
    "IEdmsObjectInfo " +
    "IEDocument " +
    "IEDocumentAccessRights " +
    "IEDocumentDescription " +
    "IEDocumentEditor " +
    "IEDocumentFactory " +
    "IEDocumentInfo " +
    "IEDocumentStorage " +
    "IEDocumentVersion " +
    "IEDocumentVersionListDialog " +
    "IEDocumentVersionSource " +
    "IEDocumentWizardStep " +
    "IEDocVerSignature " +
    "IEDocVersionState " +
    "IEnabledMode " +
    "IEncodeProvider " +
    "IEncrypter " +
    "IEvent " +
    "IEventList " +
    "IException " +
    "IExternalEvents " +
    "IExternalHandler " +
    "IFactory " +
    "IField " +
    "IFileDialog " +
    "IFolder " +
    "IFolderDescription " +
    "IFolderDialog " +
    "IFolderFactory " +
    "IFolderInfo " +
    "IForEach " +
    "IForm " +
    "IFormTitle " +
    "IFormWizardStep " +
    "IGlobalIDFactory " +
    "IGlobalIDInfo " +
    "IGrid " +
    "IHasher " +
    "IHistoryDescription " +
    "IHyperLinkControl " +
    "IImageButton " +
    "IImageControl " +
    "IInnerPanel " +
    "IInplaceHint " +
    "IIntegerCriterion " +
    "IIntegerList " +
    "IIntegerRequisite " +
    "IIntegerValue " +
    "IISBLEditorForm " +
    "IJob " +
    "IJobDescription " +
    "IJobFactory " +
    "IJobForm " +
    "IJobInfo " +
    "ILabelControl " +
    "ILargeIntegerCriterion " +
    "ILargeIntegerRequisite " +
    "ILargeIntegerValue " +
    "ILicenseInfo " +
    "ILifeCycleStage " +
    "IList " +
    "IListBox " +
    "ILocalIDInfo " +
    "ILocalization " +
    "ILock " +
    "IMemoryDataSet " +
    "IMessagingFactory " +
    "IMetadataRepository " +
    "INotice " +
    "INoticeInfo " +
    "INumericCriterion " +
    "INumericRequisite " +
    "INumericValue " +
    "IObject " +
    "IObjectDescription " +
    "IObjectImporter " +
    "IObjectInfo " +
    "IObserver " +
    "IPanelGroup " +
    "IPickCriterion " +
    "IPickProperty " +
    "IPickRequisite " +
    "IPickRequisiteDescription " +
    "IPickRequisiteItem " +
    "IPickRequisiteItems " +
    "IPickValue " +
    "IPrivilege " +
    "IPrivilegeList " +
    "IProcess " +
    "IProcessFactory " +
    "IProcessMessage " +
    "IProgress " +
    "IProperty " +
    "IPropertyChangeEvent " +
    "IQuery " +
    "IReference " +
    "IReferenceCriterion " +
    "IReferenceEnabledMode " +
    "IReferenceFactory " +
    "IReferenceHistoryDescription " +
    "IReferenceInfo " +
    "IReferenceRecordCardWizardStep " +
    "IReferenceRequisiteDescription " +
    "IReferencesFactory " +
    "IReferenceValue " +
    "IRefRequisite " +
    "IReport " +
    "IReportFactory " +
    "IRequisite " +
    "IRequisiteDescription " +
    "IRequisiteDescriptionList " +
    "IRequisiteFactory " +
    "IRichEdit " +
    "IRouteStep " +
    "IRule " +
    "IRuleList " +
    "ISchemeBlock " +
    "IScript " +
    "IScriptFactory " +
    "ISearchCriteria " +
    "ISearchCriterion " +
    "ISearchDescription " +
    "ISearchFactory " +
    "ISearchFolderInfo " +
    "ISearchForObjectDescription " +
    "ISearchResultRestrictions " +
    "ISecuredContext " +
    "ISelectDialog " +
    "IServerEvent " +
    "IServerEventFactory " +
    "IServiceDialog " +
    "IServiceFactory " +
    "ISignature " +
    "ISignProvider " +
    "ISignProvider2 " +
    "ISignProvider3 " +
    "ISimpleCriterion " +
    "IStringCriterion " +
    "IStringList " +
    "IStringRequisite " +
    "IStringRequisiteDescription " +
    "IStringValue " +
    "ISystemDialogsFactory " +
    "ISystemInfo " +
    "ITabSheet " +
    "ITask " +
    "ITaskAbortReasonInfo " +
    "ITaskCardWizardStep " +
    "ITaskDescription " +
    "ITaskFactory " +
    "ITaskInfo " +
    "ITaskRoute " +
    "ITextCriterion " +
    "ITextRequisite " +
    "ITextValue " +
    "ITreeListSelectDialog " +
    "IUser " +
    "IUserList " +
    "IValue " +
    "IView " +
    "IWebBrowserControl " +
    "IWizard " +
    "IWizardAction " +
    "IWizardFactory " +
    "IWizardFormElement " +
    "IWizardParam " +
    "IWizardPickParam " +
    "IWizardReferenceParam " +
    "IWizardStep " +
    "IWorkAccessRights " +
    "IWorkDescription " +
    "IWorkflowAskableParam " +
    "IWorkflowAskableParams " +
    "IWorkflowBlock " +
    "IWorkflowBlockResult " +
    "IWorkflowEnabledMode " +
    "IWorkflowParam " +
    "IWorkflowPickParam " +
    "IWorkflowReferenceParam " +
    "IWorkState " +
    "IWorkTreeCustomNode " +
    "IWorkTreeJobNode " +
    "IWorkTreeTaskNode " +
    "IXMLEditorForm " +
    "SBCrypto ";

  // built_in : встроенные или библиотечные объекты (константы, перечисления)
  const BUILTIN = CONSTANTS + ENUMS;

  // class: встроенные наборы значений, системные объекты, фабрики
  const CLASS = predefined_variables;

  // literal : примитивные типы
  const LITERAL = "null true false nil ";

  // number : числа
  const NUMBERS = {
    className: "number",
    begin: hljs.NUMBER_RE,
    relevance: 0
  };

  // string : строки
  const STRINGS = {
    className: "string",
    variants: [
      {
        begin: '"',
        end: '"'
      },
      {
        begin: "'",
        end: "'"
      }
    ]
  };

  // Токены
  const DOCTAGS = {
    className: "doctag",
    begin: "\\b(?:TODO|DONE|BEGIN|END|STUB|CHG|FIXME|NOTE|BUG|XXX)\\b",
    relevance: 0
  };

  // Однострочный комментарий
  const ISBL_LINE_COMMENT_MODE = {
    className: "comment",
    begin: "//",
    end: "$",
    relevance: 0,
    contains: [
      hljs.PHRASAL_WORDS_MODE,
      DOCTAGS
    ]
  };

  // Многострочный комментарий
  const ISBL_BLOCK_COMMENT_MODE = {
    className: "comment",
    begin: "/\\*",
    end: "\\*/",
    relevance: 0,
    contains: [
      hljs.PHRASAL_WORDS_MODE,
      DOCTAGS
    ]
  };

  // comment : комментарии
  const COMMENTS = {
    variants: [
      ISBL_LINE_COMMENT_MODE,
      ISBL_BLOCK_COMMENT_MODE
    ]
  };

  // keywords : ключевые слова
  const KEYWORDS = {
    $pattern: UNDERSCORE_IDENT_RE,
    keyword: KEYWORD,
    built_in: BUILTIN,
    class: CLASS,
    literal: LITERAL
  };

  // methods : методы
  const METHODS = {
    begin: "\\.\\s*" + hljs.UNDERSCORE_IDENT_RE,
    keywords: KEYWORDS,
    relevance: 0
  };

  // type : встроенные типы
  const TYPES = {
    className: "type",
    begin: ":[ \\t]*(" + interfaces.trim().replace(/\s/g, "|") + ")",
    end: "[ \\t]*=",
    excludeEnd: true
  };

  // variables : переменные
  const VARIABLES = {
    className: "variable",
    keywords: KEYWORDS,
    begin: UNDERSCORE_IDENT_RE,
    relevance: 0,
    contains: [
      TYPES,
      METHODS
    ]
  };

  // Имена функций
  const FUNCTION_TITLE = FUNCTION_NAME_IDENT_RE + "\\(";

  const TITLE_MODE = {
    className: "title",
    keywords: {
      $pattern: UNDERSCORE_IDENT_RE,
      built_in: system_functions
    },
    begin: FUNCTION_TITLE,
    end: "\\(",
    returnBegin: true,
    excludeEnd: true
  };

  // function : функции
  const FUNCTIONS = {
    className: "function",
    begin: FUNCTION_TITLE,
    end: "\\)$",
    returnBegin: true,
    keywords: KEYWORDS,
    illegal: "[\\[\\]\\|\\$\\?%,~#@]",
    contains: [
      TITLE_MODE,
      METHODS,
      VARIABLES,
      STRINGS,
      NUMBERS,
      COMMENTS
    ]
  };

  return {
    name: 'ISBL',
    aliases: ["isbl"],
    case_insensitive: true,
    keywords: KEYWORDS,
    illegal: "\\$|\\?|%|,|;$|~|#|@|</",
    contains: [
      FUNCTIONS,
      TYPES,
      METHODS,
      VARIABLES,
      STRINGS,
      NUMBERS,
      COMMENTS
    ]
  };
}

module.exports = isbl;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/java.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/java.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Java
Author: Vsevolod Solovyov <vsevolod.solovyov@gmail.com>
Category: common, enterprise
Website: https://www.java.com/
*/

function java(hljs) {
  var JAVA_IDENT_RE = '[\u00C0-\u02B8a-zA-Z_$][\u00C0-\u02B8a-zA-Z_$0-9]*';
  var GENERIC_IDENT_RE = JAVA_IDENT_RE + '(<' + JAVA_IDENT_RE + '(\\s*,\\s*' + JAVA_IDENT_RE + ')*>)?';
  var KEYWORDS = 'false synchronized int abstract float private char boolean var static null if const ' +
    'for true while long strictfp finally protected import native final void ' +
    'enum else break transient catch instanceof byte super volatile case assert short ' +
    'package default double public try this switch continue throws protected public private ' +
    'module requires exports do';

  var ANNOTATION = {
    className: 'meta',
    begin: '@' + JAVA_IDENT_RE,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: ["self"] // allow nested () inside our annotation
      },
    ]
  };

  // https://docs.oracle.com/javase/specs/jls/se15/html/jls-3.html#jls-3.10
  var decimalDigits = '[0-9](_*[0-9])*';
  var frac = `\\.(${decimalDigits})`;
  var hexDigits = '[0-9a-fA-F](_*[0-9a-fA-F])*';
  var NUMBER = {
    className: 'number',
    variants: [
      // DecimalFloatingPointLiteral
      // including ExponentPart
      { begin: `(\\b(${decimalDigits})((${frac})|\\.)?|(${frac}))` +
        `[eE][+-]?(${decimalDigits})[fFdD]?\\b` },
      // excluding ExponentPart
      { begin: `\\b(${decimalDigits})((${frac})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
      { begin: `(${frac})[fFdD]?\\b` },
      { begin: `\\b(${decimalDigits})[fFdD]\\b` },

      // HexadecimalFloatingPointLiteral
      { begin: `\\b0[xX]((${hexDigits})\\.?|(${hexDigits})?\\.(${hexDigits}))` +
        `[pP][+-]?(${decimalDigits})[fFdD]?\\b` },

      // DecimalIntegerLiteral
      { begin: '\\b(0|[1-9](_*[0-9])*)[lL]?\\b' },

      // HexIntegerLiteral
      { begin: `\\b0[xX](${hexDigits})[lL]?\\b` },

      // OctalIntegerLiteral
      { begin: '\\b0(_*[0-7])*[lL]?\\b' },

      // BinaryIntegerLiteral
      { begin: '\\b0[bB][01](_*[01])*[lL]?\\b' },
    ],
    relevance: 0
  };

  return {
    name: 'Java',
    aliases: ['jsp'],
    keywords: KEYWORDS,
    illegal: /<\/|#/,
    contains: [
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/',
        {
          relevance: 0,
          contains: [
            {
              // eat up @'s in emails to prevent them to be recognized as doctags
              begin: /\w+@/, relevance: 0
            },
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            }
          ]
        }
      ),
      // relevance boost
      {
        begin: /import java\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'class',
        beginKeywords: 'class interface enum', end: /[{;=]/, excludeEnd: true,
        keywords: 'class interface enum',
        illegal: /[:"\[\]]/,
        contains: [
          { beginKeywords: 'extends implements' },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: 'new throw return else',
        relevance: 0
      },
      {
        className: 'class',
        begin: 'record\\s+' + hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
        returnBegin: true,
        excludeEnd: true,
        end: /[{;=]/,
        keywords: KEYWORDS,
        contains: [
          { beginKeywords: "record" },
          {
            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
            returnBegin: true,
            relevance: 0,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        className: 'function',
        begin: '(' + GENERIC_IDENT_RE + '\\s+)+' + hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true, end: /[{;=]/,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          {
            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true,
            relevance: 0,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              ANNOTATION,
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              NUMBER,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      NUMBER,
      ANNOTATION
    ]
  };
}

module.exports = java;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/javascript.js":
/*!*************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/javascript.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
const KEYWORDS = [
  "as", // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends"
];
const LITERALS = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
];

const TYPES = [
  "Intl",
  "DataView",
  "Number",
  "Math",
  "Date",
  "String",
  "RegExp",
  "Object",
  "Function",
  "Boolean",
  "Error",
  "Symbol",
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  "Proxy",
  "Reflect",
  "JSON",
  "Promise",
  "Float64Array",
  "Int16Array",
  "Int32Array",
  "Int8Array",
  "Uint16Array",
  "Uint32Array",
  "Float32Array",
  "Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "ArrayBuffer"
];

const ERROR_TYPES = [
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];

const BUILT_IN_GLOBALS = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",

  "require",
  "exports",

  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
];

const BUILT_IN_VARIABLES = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "module",
  "global" // Node.js
];

const BUILT_INS = [].concat(
  BUILT_IN_GLOBALS,
  BUILT_IN_VARIABLES,
  TYPES,
  ERROR_TYPES
);

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
Language: JavaScript
Description: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
Category: common, scripting
Website: https://developer.mozilla.org/en-US/docs/Web/JavaScript
*/

/** @type LanguageFn */
function javascript(hljs) {
  /**
   * Takes a string like "<Booger" and checks to see
   * if we can find a matching "</Booger" later in the
   * content.
   * @param {RegExpMatchArray} match
   * @param {{after:number}} param1
   */
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };

  const IDENT_RE$1 = IDENT_RE;
  const FRAGMENT = {
    begin: '<>',
    end: '</>'
  };
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      // nested type?
      // HTML should not include another raw `<` inside a tag
      // But a type might: `<Array<Array<number>>`, etc.
      if (nextChar === "<") {
        response.ignoreMatch();
        return;
      }
      // <something>
      // This is now either a tag or a type.
      if (nextChar === ">") {
        // if we cannot find a matching closing tag, then we
        // will ignore it
        if (!hasClosingTag(match, { after: afterMatchIndex })) {
          response.ignoreMatch();
        }
      }
    }
  };
  const KEYWORDS$1 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS.join(" "),
    literal: LITERALS.join(" "),
    built_in: BUILT_INS.join(" ")
  };

  // https://tc39.es/ecma262/#sec-literals-numeric-literals
  const decimalDigits = '[0-9](_?[0-9])*';
  const frac = `\\.(${decimalDigits})`;
  // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral
  // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: 'number',
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))` +
        `[eE][+-]?(${decimalDigits})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },

      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },

      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },

      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" },
    ],
    relevance: 0
  };

  const SUBST = {
    className: 'subst',
    begin: '\\$\\{',
    end: '\\}',
    keywords: KEYWORDS$1,
    contains: [] // defined later
  };
  const HTML_TEMPLATE = {
    begin: 'html`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'xml'
    }
  };
  const CSS_TEMPLATE = {
    begin: 'css`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'css'
    }
  };
  const TEMPLATE_STRING = {
    className: 'string',
    begin: '`',
    end: '`',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    '/\\*\\*',
    '\\*/',
    {
      relevance: 0,
      contains: [
        {
          className: 'doctag',
          begin: '@[A-Za-z]+',
          contains: [
            {
              className: 'type',
              begin: '\\{',
              end: '\\}',
              relevance: 0
            },
            {
              className: 'variable',
              begin: IDENT_RE$1 + '(?=\\s*(-)|$)',
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    TEMPLATE_STRING,
    NUMBER,
    hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS
    .concat({
      // we need to pair up {} inside our subst to prevent
      // it from ending too early by matching another }
      begin: /\{/,
      end: /\}/,
      keywords: KEYWORDS$1,
      contains: [
        "self"
      ].concat(SUBST_INTERNALS)
    });
  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS$1,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: 'params',
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$1,
    contains: PARAMS_CONTAINS
  };

  return {
    name: 'Javascript',
    aliases: ['js', 'jsx', 'mjs', 'cjs'],
    keywords: KEYWORDS$1,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS },
    illegal: /#(?![$_A-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      {
        label: "use_strict",
        className: 'meta',
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT,
      NUMBER,
      { // object attr container
        begin: concat(/[{,\n]\s*/,
          // we need to look ahead to make sure that we actually have an
          // attribute coming up so we don't steal a comma from a potential
          // "value" container
          //
          // NOTE: this might not work how you think.  We don't actually always
          // enter this mode and stay.  Instead it might merely match `,
          // <comments up next>` and then immediately end after the , because it
          // fails to find any actual attrs. But this still does the job because
          // it prevents the value contain rule from grabbing this instead and
          // prevening this rule from firing when we actually DO have keys.
          lookahead(concat(
            // we also need to allow for multiple possible comments inbetween
            // the first key:value pairing
            /(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/,
            IDENT_RE$1 + '\\s*:'))),
        relevance: 0,
        contains: [
          {
            className: 'attr',
            begin: IDENT_RE$1 + lookahead('\\s*:'),
            relevance: 0
          }
        ]
      },
      { // "value" container
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        contains: [
          COMMENT,
          hljs.REGEXP_MODE,
          {
            className: 'function',
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: '(\\(' +
            '[^()]*(\\(' +
            '[^()]*(\\(' +
            '[^()]*' +
            '\\))*[^()]*' +
            '\\))*[^()]*' +
            '\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>',
            returnBegin: true,
            end: '\\s*=>',
            contains: [
              {
                className: 'params',
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$1,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          { // could be a comma delimited list of params to a function call
            begin: /,/, relevance: 0
          },
          {
            className: '',
            begin: /\s/,
            end: /\s*/,
            skip: true
          },
          { // JSX
            variants: [
              { begin: FRAGMENT.begin, end: FRAGMENT.end },
              {
                begin: XML_TAG.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                'on:begin': XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: 'xml',
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ['self']
              }
            ]
          }
        ],
        relevance: 0
      },
      {
        className: 'function',
        beginKeywords: 'function',
        end: /[{;]/,
        excludeEnd: true,
        keywords: KEYWORDS$1,
        contains: [
          'self',
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1 }),
          PARAMS
        ],
        illegal: /%/
      },
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        className: 'function',
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: hljs.UNDERSCORE_IDENT_RE +
          '\\(' + // first parens
          '[^()]*(\\(' +
            '[^()]*(\\(' +
              '[^()]*' +
            '\\))*[^()]*' +
          '\\))*[^()]*' +
          '\\)\\s*\\{', // end parens
        returnBegin:true,
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1 }),
        ]
      },
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        variants: [
          { begin: '\\.' + IDENT_RE$1 },
          { begin: '\\$' + IDENT_RE$1 }
        ],
        relevance: 0
      },
      { // ES6 class
        className: 'class',
        beginKeywords: 'class',
        end: /[{;=]/,
        excludeEnd: true,
        illegal: /[:"[\]]/,
        contains: [
          { beginKeywords: 'extends' },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        begin: /\b(?=constructor)/,
        end: /[{;]/,
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1 }),
          'self',
          PARAMS
        ]
      },
      {
        begin: '(get|set)\\s+(?=' + IDENT_RE$1 + '\\()',
        end: /\{/,
        keywords: "get set",
        contains: [
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1 }),
          { begin: /\(\)/ }, // eat to avoid empty params
          PARAMS
        ]
      },
      {
        begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}

module.exports = javascript;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/jboss-cli.js":
/*!************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/jboss-cli.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 Language: JBoss CLI
 Author: Raphaël Parrëe <rparree@edc4it.com>
 Description: language definition jboss cli
 Website: https://docs.jboss.org/author/display/WFLY/Command+Line+Interface
 Category: config
 */

function jbossCli(hljs) {
  const PARAM = {
    begin: /[\w-]+ *=/,
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        className: 'attr',
        begin: /[\w-]+/
      }
    ]
  };
  const PARAMSBLOCK = {
    className: 'params',
    begin: /\(/,
    end: /\)/,
    contains: [PARAM],
    relevance: 0
  };
  const OPERATION = {
    className: 'function',
    begin: /:[\w\-.]+/,
    relevance: 0
  };
  const PATH = {
    className: 'string',
    begin: /\B(([\/.])[\w\-.\/=]+)+/
  };
  const COMMAND_PARAMS = {
    className: 'params',
    begin: /--[\w\-=\/]+/
  };
  return {
    name: 'JBoss CLI',
    aliases: ['wildfly-cli'],
    keywords: {
      $pattern: '[a-z\-]+',
      keyword: 'alias batch cd clear command connect connection-factory connection-info data-source deploy ' +
      'deployment-info deployment-overlay echo echo-dmr help history if jdbc-driver-info jms-queue|20 jms-topic|20 ls ' +
      'patch pwd quit read-attribute read-operation reload rollout-plan run-batch set shutdown try unalias ' +
      'undeploy unset version xa-data-source', // module
      literal: 'true false'
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      COMMAND_PARAMS,
      OPERATION,
      PATH,
      PARAMSBLOCK
    ]
  };
}

module.exports = jbossCli;


/***/ })

}]);
//# sourceMappingURL=59ff6be592735723ad3f.chunk.js.map