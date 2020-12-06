(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor~.._.._node_modules_highlight.js_lib_languages_j"],{

/***/ "../../node_modules/highlight.js/lib/languages/json.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/json.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: JSON
Description: JSON (JavaScript Object Notation) is a lightweight data-interchange format.
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Website: http://www.json.org
Category: common, protocols
*/

function json(hljs) {
  const LITERALS = {
    literal: 'true false null'
  };
  const ALLOWED_COMMENTS = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE
  ];
  const TYPES = [
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE
  ];
  const VALUE_CONTAINER = {
    end: ',',
    endsWithParent: true,
    excludeEnd: true,
    contains: TYPES,
    keywords: LITERALS
  };
  const OBJECT = {
    begin: /\{/,
    end: /\}/,
    contains: [
      {
        className: 'attr',
        begin: /"/,
        end: /"/,
        contains: [hljs.BACKSLASH_ESCAPE],
        illegal: '\\n'
      },
      hljs.inherit(VALUE_CONTAINER, {
        begin: /:/
      })
    ].concat(ALLOWED_COMMENTS),
    illegal: '\\S'
  };
  const ARRAY = {
    begin: '\\[',
    end: '\\]',
    contains: [hljs.inherit(VALUE_CONTAINER)], // inherit is a workaround for a bug that makes shared modes with endsWithParent compile only the ending of one of the parents
    illegal: '\\S'
  };
  TYPES.push(OBJECT, ARRAY);
  ALLOWED_COMMENTS.forEach(function(rule) {
    TYPES.push(rule);
  });
  return {
    name: 'JSON',
    contains: TYPES,
    keywords: LITERALS,
    illegal: '\\S'
  };
}

module.exports = json;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/julia-repl.js":
/*!*************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/julia-repl.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Julia REPL
Description: Julia REPL sessions
Author: Morten Piibeleht <morten.piibeleht@gmail.com>
Website: https://julialang.org
Requires: julia.js

The Julia REPL code blocks look something like the following:

  julia> function foo(x)
             x + 1
         end
  foo (generic function with 1 method)

They start on a new line with "julia>". Usually there should also be a space after this, but
we also allow the code to start right after the > character. The code may run over multiple
lines, but the additional lines must start with six spaces (i.e. be indented to match
"julia>"). The rest of the code is assumed to be output from the executed code and will be
left un-highlighted.

Using simply spaces to identify line continuations may get a false-positive if the output
also prints out six spaces, but such cases should be rare.
*/

function juliaRepl(hljs) {
  return {
    name: 'Julia REPL',
    contains: [
      {
        className: 'meta',
        begin: /^julia>/,
        relevance: 10,
        starts: {
          // end the highlighting if we are on a new line and the line does not have at
          // least six spaces in the beginning
          end: /^(?![ ]{6})/,
          subLanguage: 'julia'
      },
      // jldoctest Markdown blocks are used in the Julia manual and package docs indicate
      // code snippets that should be verified when the documentation is built. They can be
      // either REPL-like or script-like, but are usually REPL-like and therefore we apply
      // julia-repl highlighting to them. More information can be found in Documenter's
      // manual: https://juliadocs.github.io/Documenter.jl/latest/man/doctests.html
      aliases: ['jldoctest']
      }
    ]
  }
}

module.exports = juliaRepl;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/julia.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/julia.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Julia
Description: Julia is a high-level, high-performance, dynamic programming language.
Author: Kenta Sato <bicycle1885@gmail.com>
Contributors: Alex Arslan <ararslan@comcast.net>, Fredrik Ekre <ekrefredrik@gmail.com>
Website: https://julialang.org
*/

function julia(hljs) {
  // Since there are numerous special names in Julia, it is too much trouble
  // to maintain them by hand. Hence these names (i.e. keywords, literals and
  // built-ins) are automatically generated from Julia 1.5.2 itself through
  // the following scripts for each.

  // ref: https://docs.julialang.org/en/v1/manual/variables/#Allowed-Variable-Names
  var VARIABLE_NAME_RE = '[A-Za-z_\\u00A1-\\uFFFF][A-Za-z_0-9\\u00A1-\\uFFFF]*';

  // # keyword generator, multi-word keywords handled manually below (Julia 1.5.2)
  // import REPL.REPLCompletions
  // res = String["in", "isa", "where"]
  // for kw in collect(x.keyword for x in REPLCompletions.complete_keyword(""))
  //     if !(contains(kw, " ") || kw == "struct")
  //         push!(res, kw)
  //     end
  // end
  // sort!(unique!(res))
  // foreach(x -> println("\'", x, "\',"), res)
  var KEYWORD_LIST = [
    'baremodule',
    'begin',
    'break',
    'catch',
    'ccall',
    'const',
    'continue',
    'do',
    'else',
    'elseif',
    'end',
    'export',
    'false',
    'finally',
    'for',
    'function',
    'global',
    'if',
    'import',
    'in',
    'isa',
    'let',
    'local',
    'macro',
    'module',
    'quote',
    'return',
    'true',
    'try',
    'using',
    'where',
    'while',
  ];

  // # literal generator (Julia 1.5.2)
  // import REPL.REPLCompletions
  // res = String["true", "false"]
  // for compl in filter!(x -> isa(x, REPLCompletions.ModuleCompletion) && (x.parent === Base || x.parent === Core),
  //                     REPLCompletions.completions("", 0)[1])
  //     try
  //         v = eval(Symbol(compl.mod))
  //         if !(v isa Function || v isa Type || v isa TypeVar || v isa Module || v isa Colon)
  //             push!(res, compl.mod)
  //         end
  //     catch e
  //     end
  // end
  // sort!(unique!(res))
  // foreach(x -> println("\'", x, "\',"), res)
  var LITERAL_LIST = [
    'ARGS',
    'C_NULL',
    'DEPOT_PATH',
    'ENDIAN_BOM',
    'ENV',
    'Inf',
    'Inf16',
    'Inf32',
    'Inf64',
    'InsertionSort',
    'LOAD_PATH',
    'MergeSort',
    'NaN',
    'NaN16',
    'NaN32',
    'NaN64',
    'PROGRAM_FILE',
    'QuickSort',
    'RoundDown',
    'RoundFromZero',
    'RoundNearest',
    'RoundNearestTiesAway',
    'RoundNearestTiesUp',
    'RoundToZero',
    'RoundUp',
    'VERSION|0',
    'devnull',
    'false',
    'im',
    'missing',
    'nothing',
    'pi',
    'stderr',
    'stdin',
    'stdout',
    'true',
    'undef',
    'π',
    'ℯ',
  ];

  // # built_in generator (Julia 1.5.2)
  // import REPL.REPLCompletions
  // res = String[]
  // for compl in filter!(x -> isa(x, REPLCompletions.ModuleCompletion) && (x.parent === Base || x.parent === Core),
  //                     REPLCompletions.completions("", 0)[1])
  //     try
  //         v = eval(Symbol(compl.mod))
  //         if (v isa Type || v isa TypeVar) && (compl.mod != "=>")
  //             push!(res, compl.mod)
  //         end
  //     catch e
  //     end
  // end
  // sort!(unique!(res))
  // foreach(x -> println("\'", x, "\',"), res)
  var BUILT_IN_LIST = [
    'AbstractArray',
    'AbstractChannel',
    'AbstractChar',
    'AbstractDict',
    'AbstractDisplay',
    'AbstractFloat',
    'AbstractIrrational',
    'AbstractMatrix',
    'AbstractRange',
    'AbstractSet',
    'AbstractString',
    'AbstractUnitRange',
    'AbstractVecOrMat',
    'AbstractVector',
    'Any',
    'ArgumentError',
    'Array',
    'AssertionError',
    'BigFloat',
    'BigInt',
    'BitArray',
    'BitMatrix',
    'BitSet',
    'BitVector',
    'Bool',
    'BoundsError',
    'CapturedException',
    'CartesianIndex',
    'CartesianIndices',
    'Cchar',
    'Cdouble',
    'Cfloat',
    'Channel',
    'Char',
    'Cint',
    'Cintmax_t',
    'Clong',
    'Clonglong',
    'Cmd',
    'Colon',
    'Complex',
    'ComplexF16',
    'ComplexF32',
    'ComplexF64',
    'CompositeException',
    'Condition',
    'Cptrdiff_t',
    'Cshort',
    'Csize_t',
    'Cssize_t',
    'Cstring',
    'Cuchar',
    'Cuint',
    'Cuintmax_t',
    'Culong',
    'Culonglong',
    'Cushort',
    'Cvoid',
    'Cwchar_t',
    'Cwstring',
    'DataType',
    'DenseArray',
    'DenseMatrix',
    'DenseVecOrMat',
    'DenseVector',
    'Dict',
    'DimensionMismatch',
    'Dims',
    'DivideError',
    'DomainError',
    'EOFError',
    'Enum',
    'ErrorException',
    'Exception',
    'ExponentialBackOff',
    'Expr',
    'Float16',
    'Float32',
    'Float64',
    'Function',
    'GlobalRef',
    'HTML',
    'IO',
    'IOBuffer',
    'IOContext',
    'IOStream',
    'IdDict',
    'IndexCartesian',
    'IndexLinear',
    'IndexStyle',
    'InexactError',
    'InitError',
    'Int',
    'Int128',
    'Int16',
    'Int32',
    'Int64',
    'Int8',
    'Integer',
    'InterruptException',
    'InvalidStateException',
    'Irrational',
    'KeyError',
    'LinRange',
    'LineNumberNode',
    'LinearIndices',
    'LoadError',
    'MIME',
    'Matrix',
    'Method',
    'MethodError',
    'Missing',
    'MissingException',
    'Module',
    'NTuple',
    'NamedTuple',
    'Nothing',
    'Number',
    'OrdinalRange',
    'OutOfMemoryError',
    'OverflowError',
    'Pair',
    'PartialQuickSort',
    'PermutedDimsArray',
    'Pipe',
    'ProcessFailedException',
    'Ptr',
    'QuoteNode',
    'Rational',
    'RawFD',
    'ReadOnlyMemoryError',
    'Real',
    'ReentrantLock',
    'Ref',
    'Regex',
    'RegexMatch',
    'RoundingMode',
    'SegmentationFault',
    'Set',
    'Signed',
    'Some',
    'StackOverflowError',
    'StepRange',
    'StepRangeLen',
    'StridedArray',
    'StridedMatrix',
    'StridedVecOrMat',
    'StridedVector',
    'String',
    'StringIndexError',
    'SubArray',
    'SubString',
    'SubstitutionString',
    'Symbol',
    'SystemError',
    'Task',
    'TaskFailedException',
    'Text',
    'TextDisplay',
    'Timer',
    'Tuple',
    'Type',
    'TypeError',
    'TypeVar',
    'UInt',
    'UInt128',
    'UInt16',
    'UInt32',
    'UInt64',
    'UInt8',
    'UndefInitializer',
    'UndefKeywordError',
    'UndefRefError',
    'UndefVarError',
    'Union',
    'UnionAll',
    'UnitRange',
    'Unsigned',
    'Val',
    'Vararg',
    'VecElement',
    'VecOrMat',
    'Vector',
    'VersionNumber',
    'WeakKeyDict',
    'WeakRef',
  ];

  var KEYWORDS = {
    $pattern: VARIABLE_NAME_RE,
    keyword: KEYWORD_LIST.join(" "),
    literal: LITERAL_LIST.join(" "),
    built_in: BUILT_IN_LIST.join(" "),
  };

  // placeholder for recursive self-reference
  var DEFAULT = {
    keywords: KEYWORDS, illegal: /<\//
  };

  // ref: https://docs.julialang.org/en/v1/manual/integers-and-floating-point-numbers/
  var NUMBER = {
    className: 'number',
    // supported numeric literals:
    //  * binary literal (e.g. 0x10)
    //  * octal literal (e.g. 0o76543210)
    //  * hexadecimal literal (e.g. 0xfedcba876543210)
    //  * hexadecimal floating point literal (e.g. 0x1p0, 0x1.2p2)
    //  * decimal literal (e.g. 9876543210, 100_000_000)
    //  * floating pointe literal (e.g. 1.2, 1.2f, .2, 1., 1.2e10, 1.2e-10)
    begin: /(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)p[-+]?\d+|\b0[box][a-fA-F0-9][a-fA-F0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/,
    relevance: 0
  };

  var CHAR = {
    className: 'string',
    begin: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
  };

  var INTERPOLATION = {
    className: 'subst',
    begin: /\$\(/, end: /\)/,
    keywords: KEYWORDS
  };

  var INTERPOLATED_VARIABLE = {
    className: 'variable',
    begin: '\\$' + VARIABLE_NAME_RE
  };

  // TODO: neatly escape normal code in string literal
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, INTERPOLATION, INTERPOLATED_VARIABLE],
    variants: [
      { begin: /\w*"""/, end: /"""\w*/, relevance: 10 },
      { begin: /\w*"/, end: /"\w*/ }
    ]
  };

  var COMMAND = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, INTERPOLATION, INTERPOLATED_VARIABLE],
    begin: '`', end: '`'
  };

  var MACROCALL = {
    className: 'meta',
    begin: '@' + VARIABLE_NAME_RE
  };

  var COMMENT = {
    className: 'comment',
    variants: [
      { begin: '#=', end: '=#', relevance: 10 },
      { begin: '#', end: '$' }
    ]
  };

  DEFAULT.name = 'Julia';
  DEFAULT.contains = [
    NUMBER,
    CHAR,
    STRING,
    COMMAND,
    MACROCALL,
    COMMENT,
    hljs.HASH_COMMENT_MODE,
    {
      className: 'keyword',
      begin:
        '\\b(((abstract|primitive)\\s+)type|(mutable\\s+)?struct)\\b'
    },
    {begin: /<:/}  // relevance booster
  ];
  INTERPOLATION.contains = DEFAULT.contains;

  return DEFAULT;
}

module.exports = julia;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/kotlin.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/kotlin.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 Language: Kotlin
 Description: Kotlin is an OSS statically typed programming language that targets the JVM, Android, JavaScript and Native.
 Author: Sergey Mashkov <cy6erGn0m@gmail.com>
 Website: https://kotlinlang.org
 Category: common
 */

function kotlin(hljs) {
  const KEYWORDS = {
    keyword:
      'abstract as val var vararg get set class object open private protected public noinline ' +
      'crossinline dynamic final enum if else do while for when throw try catch finally ' +
      'import package is in fun override companion reified inline lateinit init ' +
      'interface annotation data sealed internal infix operator out by constructor super ' +
      'tailrec where const inner suspend typealias external expect actual',
    built_in:
      'Byte Short Char Int Long Boolean Float Double Void Unit Nothing',
    literal:
      'true false null'
  };
  const KEYWORDS_WITH_LABEL = {
    className: 'keyword',
    begin: /\b(break|continue|return|this)\b/,
    starts: {
      contains: [
        {
          className: 'symbol',
          begin: /@\w+/
        }
      ]
    }
  };
  const LABEL = {
    className: 'symbol',
    begin: hljs.UNDERSCORE_IDENT_RE + '@'
  };

  // for string templates
  const SUBST = {
    className: 'subst',
    begin: /\$\{/,
    end: /\}/,
    contains: [ hljs.C_NUMBER_MODE ]
  };
  const VARIABLE = {
    className: 'variable',
    begin: '\\$' + hljs.UNDERSCORE_IDENT_RE
  };
  const STRING = {
    className: 'string',
    variants: [
      {
        begin: '"""',
        end: '"""(?=[^"])',
        contains: [
          VARIABLE,
          SUBST
        ]
      },
      // Can't use built-in modes easily, as we want to use STRING in the meta
      // context as 'meta-string' and there's no syntax to remove explicitly set
      // classNames in built-in modes.
      {
        begin: '\'',
        end: '\'',
        illegal: /\n/,
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: '"',
        end: '"',
        illegal: /\n/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          VARIABLE,
          SUBST
        ]
      }
    ]
  };
  SUBST.contains.push(STRING);

  const ANNOTATION_USE_SITE = {
    className: 'meta',
    begin: '@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*' + hljs.UNDERSCORE_IDENT_RE + ')?'
  };
  const ANNOTATION = {
    className: 'meta',
    begin: '@' + hljs.UNDERSCORE_IDENT_RE,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: [
          hljs.inherit(STRING, {
            className: 'meta-string'
          })
        ]
      }
    ]
  };

  // https://kotlinlang.org/docs/reference/whatsnew11.html#underscores-in-numeric-literals
  // According to the doc above, the number mode of kotlin is the same as java 8,
  // so the code below is copied from java.js
  const KOTLIN_NUMBER_RE = '\\b' +
    '(' +
      '0[bB]([01]+[01_]+[01]+|[01]+)' + // 0b...
      '|' +
      '0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)' + // 0x...
      '|' +
      '(' +
        '([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?' +
        '|' +
        '\\.([\\d]+[\\d_]+[\\d]+|[\\d]+)' +
      ')' +
      '([eE][-+]?\\d+)?' + // octal, decimal, float
    ')' +
    '[lLfF]?';
  const KOTLIN_NUMBER_MODE = {
    className: 'number',
    begin: KOTLIN_NUMBER_RE,
    relevance: 0
  };
  const KOTLIN_NESTED_COMMENT = hljs.COMMENT(
    '/\\*', '\\*/',
    {
      contains: [ hljs.C_BLOCK_COMMENT_MODE ]
    }
  );
  const KOTLIN_PAREN_TYPE = {
    variants: [
      {
        className: 'type',
        begin: hljs.UNDERSCORE_IDENT_RE
      },
      {
        begin: /\(/,
        end: /\)/,
        contains: [] // defined later
      }
    ]
  };
  const KOTLIN_PAREN_TYPE2 = KOTLIN_PAREN_TYPE;
  KOTLIN_PAREN_TYPE2.variants[1].contains = [ KOTLIN_PAREN_TYPE ];
  KOTLIN_PAREN_TYPE.variants[1].contains = [ KOTLIN_PAREN_TYPE2 ];

  return {
    name: 'Kotlin',
    aliases: [ 'kt' ],
    keywords: KEYWORDS,
    contains: [
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/',
        {
          relevance: 0,
          contains: [
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      KOTLIN_NESTED_COMMENT,
      KEYWORDS_WITH_LABEL,
      LABEL,
      ANNOTATION_USE_SITE,
      ANNOTATION,
      {
        className: 'function',
        beginKeywords: 'fun',
        end: '[(]|$',
        returnBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS,
        illegal: /fun\s+(<.*>)?[^\s\(]+(\s+[^\s\(]+)\s*=/,
        relevance: 5,
        contains: [
          {
            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
            returnBegin: true,
            relevance: 0,
            contains: [ hljs.UNDERSCORE_TITLE_MODE ]
          },
          {
            className: 'type',
            begin: /</,
            end: />/,
            keywords: 'reified',
            relevance: 0
          },
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            endsParent: true,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              {
                begin: /:/,
                end: /[=,\/]/,
                endsWithParent: true,
                contains: [
                  KOTLIN_PAREN_TYPE,
                  hljs.C_LINE_COMMENT_MODE,
                  KOTLIN_NESTED_COMMENT
                ],
                relevance: 0
              },
              hljs.C_LINE_COMMENT_MODE,
              KOTLIN_NESTED_COMMENT,
              ANNOTATION_USE_SITE,
              ANNOTATION,
              STRING,
              hljs.C_NUMBER_MODE
            ]
          },
          KOTLIN_NESTED_COMMENT
        ]
      },
      {
        className: 'class',
        beginKeywords: 'class interface trait', // remove 'trait' when removed from KEYWORDS
        end: /[:\{(]|$/,
        excludeEnd: true,
        illegal: 'extends implements',
        contains: [
          {
            beginKeywords: 'public protected internal private constructor'
          },
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'type',
            begin: /</,
            end: />/,
            excludeBegin: true,
            excludeEnd: true,
            relevance: 0
          },
          {
            className: 'type',
            begin: /[,:]\s*/,
            end: /[<\(,]|$/,
            excludeBegin: true,
            returnEnd: true
          },
          ANNOTATION_USE_SITE,
          ANNOTATION
        ]
      },
      STRING,
      {
        className: 'meta',
        begin: "^#!/usr/bin/env",
        end: '$',
        illegal: '\n'
      },
      KOTLIN_NUMBER_MODE
    ]
  };
}

module.exports = kotlin;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/lasso.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/lasso.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Lasso
Author: Eric Knibbe <eric@lassosoft.com>
Description: Lasso is a language and server platform for database-driven web applications. This definition handles Lasso 9 syntax and LassoScript for Lasso 8.6 and earlier.
Website: http://www.lassosoft.com/What-Is-Lasso
*/

function lasso(hljs) {
  const LASSO_IDENT_RE = '[a-zA-Z_][\\w.]*';
  const LASSO_ANGLE_RE = '<\\?(lasso(script)?|=)';
  const LASSO_CLOSE_RE = '\\]|\\?>';
  const LASSO_KEYWORDS = {
    $pattern: LASSO_IDENT_RE + '|&[lg]t;',
    literal:
      'true false none minimal full all void and or not ' +
      'bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft',
    built_in:
      'array date decimal duration integer map pair string tag xml null ' +
      'boolean bytes keyword list locale queue set stack staticarray ' +
      'local var variable global data self inherited currentcapture givenblock',
    keyword:
      'cache database_names database_schemanames database_tablenames ' +
      'define_tag define_type email_batch encode_set html_comment handle ' +
      'handle_error header if inline iterate ljax_target link ' +
      'link_currentaction link_currentgroup link_currentrecord link_detail ' +
      'link_firstgroup link_firstrecord link_lastgroup link_lastrecord ' +
      'link_nextgroup link_nextrecord link_prevgroup link_prevrecord log ' +
      'loop namespace_using output_none portal private protect records ' +
      'referer referrer repeating resultset rows search_args ' +
      'search_arguments select sort_args sort_arguments thread_atomic ' +
      'value_list while abort case else fail_if fail_ifnot fail if_empty ' +
      'if_false if_null if_true loop_abort loop_continue loop_count params ' +
      'params_up return return_value run_children soap_definetag ' +
      'soap_lastrequest soap_lastresponse tag_name ascending average by ' +
      'define descending do equals frozen group handle_failure import in ' +
      'into join let match max min on order parent protected provide public ' +
      'require returnhome skip split_thread sum take thread to trait type ' +
      'where with yield yieldhome'
  };
  const HTML_COMMENT = hljs.COMMENT(
    '<!--',
    '-->',
    {
      relevance: 0
    }
  );
  const LASSO_NOPROCESS = {
    className: 'meta',
    begin: '\\[noprocess\\]',
    starts: {
      end: '\\[/noprocess\\]',
      returnEnd: true,
      contains: [HTML_COMMENT]
    }
  };
  const LASSO_START = {
    className: 'meta',
    begin: '\\[/noprocess|' + LASSO_ANGLE_RE
  };
  const LASSO_DATAMEMBER = {
    className: 'symbol',
    begin: '\'' + LASSO_IDENT_RE + '\''
  };
  const LASSO_CODE = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.inherit(hljs.C_NUMBER_MODE, {
      begin: hljs.C_NUMBER_RE + '|(-?infinity|NaN)\\b'
    }),
    hljs.inherit(hljs.APOS_STRING_MODE, {
      illegal: null
    }),
    hljs.inherit(hljs.QUOTE_STRING_MODE, {
      illegal: null
    }),
    {
      className: 'string',
      begin: '`',
      end: '`'
    },
    { // variables
      variants: [
        {
          begin: '[#$]' + LASSO_IDENT_RE
        },
        {
          begin: '#',
          end: '\\d+',
          illegal: '\\W'
        }
      ]
    },
    {
      className: 'type',
      begin: '::\\s*',
      end: LASSO_IDENT_RE,
      illegal: '\\W'
    },
    {
      className: 'params',
      variants: [
        {
          begin: '-(?!infinity)' + LASSO_IDENT_RE,
          relevance: 0
        },
        {
          begin: '(\\.\\.\\.)'
        }
      ]
    },
    {
      begin: /(->|\.)\s*/,
      relevance: 0,
      contains: [LASSO_DATAMEMBER]
    },
    {
      className: 'class',
      beginKeywords: 'define',
      returnEnd: true,
      end: '\\(|=>',
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
          begin: LASSO_IDENT_RE + '(=(?!>))?|[-+*/%](?!>)'
        })
      ]
    }
  ];
  return {
    name: 'Lasso',
    aliases: [
      'ls',
      'lassoscript'
    ],
    case_insensitive: true,
    keywords: LASSO_KEYWORDS,
    contains: [
      {
        className: 'meta',
        begin: LASSO_CLOSE_RE,
        relevance: 0,
        starts: { // markup
          end: '\\[|' + LASSO_ANGLE_RE,
          returnEnd: true,
          relevance: 0,
          contains: [HTML_COMMENT]
        }
      },
      LASSO_NOPROCESS,
      LASSO_START,
      {
        className: 'meta',
        begin: '\\[no_square_brackets',
        starts: {
          end: '\\[/no_square_brackets\\]', // not implemented in the language
          keywords: LASSO_KEYWORDS,
          contains: [
            {
              className: 'meta',
              begin: LASSO_CLOSE_RE,
              relevance: 0,
              starts: {
                end: '\\[noprocess\\]|' + LASSO_ANGLE_RE,
                returnEnd: true,
                contains: [HTML_COMMENT]
              }
            },
            LASSO_NOPROCESS,
            LASSO_START
          ].concat(LASSO_CODE)
        }
      },
      {
        className: 'meta',
        begin: '\\[',
        relevance: 0
      },
      {
        className: 'meta',
        begin: '^#!',
        end: 'lasso9$',
        relevance: 10
      }
    ].concat(LASSO_CODE)
  };
}

module.exports = lasso;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/latex.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/latex.js ***!
  \********************************************************************************************************/
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
Language: LaTeX
Author: Benedikt Wilde <bwilde@posteo.de>
Website: https://www.latex-project.org
Category: markup
*/

/** @type LanguageFn */
function latex(hljs) {
  const KNOWN_CONTROL_WORDS = either(...[
      '(?:NeedsTeXFormat|RequirePackage|GetIdInfo)',
      'Provides(?:Expl)?(?:Package|Class|File)',
      '(?:DeclareOption|ProcessOptions)',
      '(?:documentclass|usepackage|input|include)',
      'makeat(?:letter|other)',
      'ExplSyntax(?:On|Off)',
      '(?:new|renew|provide)?command',
      '(?:re)newenvironment',
      '(?:New|Renew|Provide|Declare)(?:Expandable)?DocumentCommand',
      '(?:New|Renew|Provide|Declare)DocumentEnvironment',
      '(?:(?:e|g|x)?def|let)',
      '(?:begin|end)',
      '(?:part|chapter|(?:sub){0,2}section|(?:sub)?paragraph)',
      'caption',
      '(?:label|(?:eq|page|name)?ref|(?:paren|foot|super)?cite)',
      '(?:alpha|beta|[Gg]amma|[Dd]elta|(?:var)?epsilon|zeta|eta|[Tt]heta|vartheta)',
      '(?:iota|(?:var)?kappa|[Ll]ambda|mu|nu|[Xx]i|[Pp]i|varpi|(?:var)rho)',
      '(?:[Ss]igma|varsigma|tau|[Uu]psilon|[Pp]hi|varphi|chi|[Pp]si|[Oo]mega)',
      '(?:frac|sum|prod|lim|infty|times|sqrt|leq|geq|left|right|middle|[bB]igg?)',
      '(?:[lr]angle|q?quad|[lcvdi]?dots|d?dot|hat|tilde|bar)'
    ].map(word => word + '(?![a-zA-Z@:_])'));
  const L3_REGEX = new RegExp([
      // A function \module_function_name:signature or \__module_function_name:signature,
      // where both module and function_name need at least two characters and
      // function_name may contain single underscores.
      '(?:__)?[a-zA-Z]{2,}_[a-zA-Z](?:_?[a-zA-Z])+:[a-zA-Z]*',
      // A variable \scope_module_and_name_type or \scope__module_ane_name_type,
      // where scope is one of l, g or c, type needs at least two characters
      // and module_and_name may contain single underscores.
      '[lgc]__?[a-zA-Z](?:_?[a-zA-Z])*_[a-zA-Z]{2,}',
      // A quark \q_the_name or \q__the_name or
      // scan mark \s_the_name or \s__vthe_name,
      // where variable_name needs at least two characters and
      // may contain single underscores.
      '[qs]__?[a-zA-Z](?:_?[a-zA-Z])+',
      // Other LaTeX3 macro names that are not covered by the three rules above.
      'use(?:_i)?:[a-zA-Z]*',
      '(?:else|fi|or):',
      '(?:if|cs|exp):w',
      '(?:hbox|vbox):n',
      '::[a-zA-Z]_unbraced',
      '::[a-zA-Z:]'
    ].map(pattern => pattern + '(?![a-zA-Z:_])').join('|'));
  const L2_VARIANTS = [
    {begin: /[a-zA-Z@]+/}, // control word
    {begin: /[^a-zA-Z@]?/} // control symbol
  ];
  const DOUBLE_CARET_VARIANTS = [
    {begin: /\^{6}[0-9a-f]{6}/},
    {begin: /\^{5}[0-9a-f]{5}/},
    {begin: /\^{4}[0-9a-f]{4}/},
    {begin: /\^{3}[0-9a-f]{3}/},
    {begin: /\^{2}[0-9a-f]{2}/},
    {begin: /\^{2}[\u0000-\u007f]/}
  ];
  const CONTROL_SEQUENCE = {
    className: 'keyword',
    begin: /\\/,
    relevance: 0,
    contains: [
      {
        endsParent: true,
        begin: KNOWN_CONTROL_WORDS
      },
      {
        endsParent: true,
        begin: L3_REGEX
      },
      {
        endsParent: true,
        variants: DOUBLE_CARET_VARIANTS
      },
      {
        endsParent: true,
        relevance: 0,
        variants: L2_VARIANTS
      }
    ]
  };
  const MACRO_PARAM = {
    className: 'params',
    relevance: 0,
    begin: /#+\d?/
  };
  const DOUBLE_CARET_CHAR = {
    // relevance: 1
    variants: DOUBLE_CARET_VARIANTS
  };
  const SPECIAL_CATCODE = {
    className: 'built_in',
    relevance: 0,
    begin: /[$&^_]/
  };
  const MAGIC_COMMENT = {
    className: 'meta',
    begin: '% !TeX',
    end: '$',
    relevance: 10
  };
  const COMMENT = hljs.COMMENT(
    '%',
    '$',
    {
      relevance: 0
    }
  );
  const EVERYTHING_BUT_VERBATIM = [
    CONTROL_SEQUENCE,
    MACRO_PARAM,
    DOUBLE_CARET_CHAR,
    SPECIAL_CATCODE,
    MAGIC_COMMENT,
    COMMENT
  ];
  const BRACE_GROUP_NO_VERBATIM = {
    begin: /\{/, end: /\}/,
    relevance: 0,
    contains: ['self', ...EVERYTHING_BUT_VERBATIM]
  };
  const ARGUMENT_BRACES = hljs.inherit(
    BRACE_GROUP_NO_VERBATIM,
    {
      relevance: 0,
      endsParent: true,
      contains: [BRACE_GROUP_NO_VERBATIM, ...EVERYTHING_BUT_VERBATIM]
    }
  );
  const ARGUMENT_BRACKETS = {
    begin: /\[/,
      end: /\]/,
    endsParent: true,
    relevance: 0,
    contains: [BRACE_GROUP_NO_VERBATIM, ...EVERYTHING_BUT_VERBATIM]
  };
  const SPACE_GOBBLER = {
    begin: /\s+/,
    relevance: 0
  };
  const ARGUMENT_M = [ARGUMENT_BRACES];
  const ARGUMENT_O = [ARGUMENT_BRACKETS];
  const ARGUMENT_AND_THEN = function(arg, starts_mode) {
    return {
      contains: [SPACE_GOBBLER],
      starts: {
        relevance: 0,
        contains: arg,
        starts: starts_mode
      }
    };
  };
  const CSNAME = function(csname, starts_mode) {
    return {
        begin: '\\\\' + csname + '(?![a-zA-Z@:_])',
        keywords: {$pattern: /\\[a-zA-Z]+/, keyword: '\\' + csname},
        relevance: 0,
        contains: [SPACE_GOBBLER],
        starts: starts_mode
      };
  };
  const BEGIN_ENV = function(envname, starts_mode) {
    return hljs.inherit(
      {
        begin: '\\\\begin(?=\\s*\\r?\\n?\\s*\\{' + envname + '\\})',
        keywords: {$pattern: /\\[a-zA-Z]+/, keyword: '\\begin'},
        relevance: 0,
      },
      ARGUMENT_AND_THEN(ARGUMENT_M, starts_mode)
    );
  };
  const VERBATIM_DELIMITED_EQUAL = (innerName = "string") => {
    return hljs.END_SAME_AS_BEGIN({
      className: innerName,
      begin: /(.|\r?\n)/,
      end: /(.|\r?\n)/,
      excludeBegin: true,
      excludeEnd: true,
      endsParent: true
    });
  };
  const VERBATIM_DELIMITED_ENV = function(envname) {
    return {
      className: 'string',
      end: '(?=\\\\end\\{' + envname + '\\})'
    };
  };

  const VERBATIM_DELIMITED_BRACES = (innerName = "string") => {
    return {
      relevance: 0,
      begin: /\{/,
      starts: {
        endsParent: true,
        contains: [
          {
            className: innerName,
            end: /(?=\})/,
            endsParent:true,
            contains: [
              {
                begin: /\{/,
                end: /\}/,
                relevance: 0,
                contains: ["self"]
              }
            ],
          }
        ]
      }
    };
  };
  const VERBATIM = [
    ...['verb', 'lstinline'].map(csname => CSNAME(csname, {contains: [VERBATIM_DELIMITED_EQUAL()]})),
    CSNAME('mint', ARGUMENT_AND_THEN(ARGUMENT_M, {contains: [VERBATIM_DELIMITED_EQUAL()]})),
    CSNAME('mintinline', ARGUMENT_AND_THEN(ARGUMENT_M, {contains: [VERBATIM_DELIMITED_BRACES(), VERBATIM_DELIMITED_EQUAL()]})),
    CSNAME('url', {contains: [VERBATIM_DELIMITED_BRACES("link"), VERBATIM_DELIMITED_BRACES("link")]}),
    CSNAME('hyperref', {contains: [VERBATIM_DELIMITED_BRACES("link")]}),
    CSNAME('href', ARGUMENT_AND_THEN(ARGUMENT_O, {contains: [VERBATIM_DELIMITED_BRACES("link")]})),
    ...[].concat(...['', '\\*'].map(suffix => [
      BEGIN_ENV('verbatim' + suffix, VERBATIM_DELIMITED_ENV('verbatim' + suffix)),
      BEGIN_ENV('filecontents' + suffix,  ARGUMENT_AND_THEN(ARGUMENT_M, VERBATIM_DELIMITED_ENV('filecontents' + suffix))),
      ...['', 'B', 'L'].map(prefix =>
        BEGIN_ENV(prefix + 'Verbatim' + suffix, ARGUMENT_AND_THEN(ARGUMENT_O, VERBATIM_DELIMITED_ENV(prefix + 'Verbatim' + suffix)))
      )
    ])),
    BEGIN_ENV('minted', ARGUMENT_AND_THEN(ARGUMENT_O, ARGUMENT_AND_THEN(ARGUMENT_M, VERBATIM_DELIMITED_ENV('minted')))),
  ];

  return {
    name: 'LaTeX',
    aliases: ['TeX'],
    contains: [
      ...VERBATIM,
      ...EVERYTHING_BUT_VERBATIM
    ]
  };
}

module.exports = latex;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/ldif.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/ldif.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: LDIF
Contributors: Jacob Childress <jacobc@gmail.com>
Category: enterprise, config
Website: https://en.wikipedia.org/wiki/LDAP_Data_Interchange_Format
*/
function ldif(hljs) {
  return {
    name: 'LDIF',
    contains: [
      {
        className: 'attribute',
        begin: '^dn',
        end: ': ',
        excludeEnd: true,
        starts: {
          end: '$',
          relevance: 0
        },
        relevance: 10
      },
      {
        className: 'attribute',
        begin: '^\\w',
        end: ': ',
        excludeEnd: true,
        starts: {
          end: '$',
          relevance: 0
        }
      },
      {
        className: 'literal',
        begin: '^-',
        end: '$'
      },
      hljs.HASH_COMMENT_MODE
    ]
  };
}

module.exports = ldif;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/leaf.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/leaf.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Leaf
Author: Hale Chan <halechan@qq.com>
Description: Based on the Leaf reference from https://vapor.github.io/documentation/guide/leaf.html.
*/

function leaf(hljs) {
  return {
    name: 'Leaf',
    contains: [
      {
        className: 'function',
        begin: '#+' + '[A-Za-z_0-9]*' + '\\(',
        end: / \{/,
        returnBegin: true,
        excludeEnd: true,
        contains: [
          {
            className: 'keyword',
            begin: '#+'
          },
          {
            className: 'title',
            begin: '[A-Za-z_][A-Za-z_0-9]*'
          },
          {
            className: 'params',
            begin: '\\(',
            end: '\\)',
            endsParent: true,
            contains: [
              {
                className: 'string',
                begin: '"',
                end: '"'
              },
              {
                className: 'variable',
                begin: '[A-Za-z_][A-Za-z_0-9]*'
              }
            ]
          }
        ]
      }
    ]
  };
}

module.exports = leaf;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/less.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/less.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Less
Description: It's CSS, with just a little more.
Author:   Max Mikhailov <seven.phases.max@gmail.com>
Website: http://lesscss.org
Category: common, css
*/

function less(hljs) {
  var IDENT_RE        = '[\\w-]+'; // yes, Less identifiers may begin with a digit
  var INTERP_IDENT_RE = '(' + IDENT_RE + '|@\\{' + IDENT_RE + '\\})';

  /* Generic Modes */

  var RULES = [], VALUE = []; // forward def. for recursive modes

  var STRING_MODE = function(c) { return {
    // Less strings are not multiline (also include '~' for more consistent coloring of "escaped" strings)
    className: 'string', begin: '~?' + c + '.*?' + c
  };};

  var IDENT_MODE = function(name, begin, relevance) { return {
    className: name, begin: begin, relevance: relevance
  };};

  var PARENS_MODE = {
    // used only to properly balance nested parens inside mixin call, def. arg list
    begin: '\\(', end: '\\)', contains: VALUE, relevance: 0
  };

  // generic Less highlighter (used almost everywhere except selectors):
  VALUE.push(
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    STRING_MODE("'"),
    STRING_MODE('"'),
    hljs.CSS_NUMBER_MODE, // fixme: it does not include dot for numbers like .5em :(
    {
      begin: '(url|data-uri)\\(',
      starts: {className: 'string', end: '[\\)\\n]', excludeEnd: true}
    },
    IDENT_MODE('number', '#[0-9A-Fa-f]+\\b'),
    PARENS_MODE,
    IDENT_MODE('variable', '@@?' + IDENT_RE, 10),
    IDENT_MODE('variable', '@\\{'  + IDENT_RE + '\\}'),
    IDENT_MODE('built_in', '~?`[^`]*?`'), // inline javascript (or whatever host language) *multiline* string
    { // @media features (it’s here to not duplicate things in AT_RULE_MODE with extra PARENS_MODE overriding):
      className: 'attribute', begin: IDENT_RE + '\\s*:', end: ':', returnBegin: true, excludeEnd: true
    },
    {
      className: 'meta',
      begin: '!important'
    }
  );

  var VALUE_WITH_RULESETS = VALUE.concat({
    begin: /\{/, end: /\}/, contains: RULES
  });

  var MIXIN_GUARD_MODE = {
    beginKeywords: 'when', endsWithParent: true,
    contains: [{beginKeywords: 'and not'}].concat(VALUE) // using this form to override VALUE’s 'function' match
  };

  /* Rule-Level Modes */

  var RULE_MODE = {
    begin: INTERP_IDENT_RE + '\\s*:', returnBegin: true, end: '[;}]',
    relevance: 0,
    contains: [
      {
        className: 'attribute',
        begin: INTERP_IDENT_RE, end: ':', excludeEnd: true,
        starts: {
          endsWithParent: true, illegal: '[<=$]',
          relevance: 0,
          contains: VALUE
        }
      }
    ]
  };

  var AT_RULE_MODE = {
    className: 'keyword',
    begin: '@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b',
    starts: {end: '[;{}]', returnEnd: true, contains: VALUE, relevance: 0}
  };

  // variable definitions and calls
  var VAR_RULE_MODE = {
    className: 'variable',
    variants: [
      // using more strict pattern for higher relevance to increase chances of Less detection.
      // this is *the only* Less specific statement used in most of the sources, so...
      // (we’ll still often loose to the css-parser unless there's '//' comment,
      // simply because 1 variable just can't beat 99 properties :)
      {begin: '@' + IDENT_RE + '\\s*:', relevance: 15},
      {begin: '@' + IDENT_RE}
    ],
    starts: {end: '[;}]', returnEnd: true, contains: VALUE_WITH_RULESETS}
  };

  var SELECTOR_MODE = {
    // first parse unambiguous selectors (i.e. those not starting with tag)
    // then fall into the scary lookahead-discriminator variant.
    // this mode also handles mixin definitions and calls
    variants: [{
      begin: '[\\.#:&\\[>]', end: '[;{}]'  // mixin calls end with ';'
      }, {
      begin: INTERP_IDENT_RE, end: /\{/
    }],
    returnBegin: true,
    returnEnd:   true,
    illegal: '[<=\'$"]',
    relevance: 0,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      MIXIN_GUARD_MODE,
      IDENT_MODE('keyword',  'all\\b'),
      IDENT_MODE('variable', '@\\{'  + IDENT_RE + '\\}'),     // otherwise it’s identified as tag
      IDENT_MODE('selector-tag',  INTERP_IDENT_RE + '%?', 0), // '%' for more consistent coloring of @keyframes "tags"
      IDENT_MODE('selector-id', '#' + INTERP_IDENT_RE),
      IDENT_MODE('selector-class', '\\.' + INTERP_IDENT_RE, 0),
      IDENT_MODE('selector-tag',  '&', 0),
      {className: 'selector-attr', begin: '\\[', end: '\\]'},
      {className: 'selector-pseudo', begin: /:(:)?[a-zA-Z0-9_\-+()"'.]+/},
      {begin: '\\(', end: '\\)', contains: VALUE_WITH_RULESETS}, // argument list of parametric mixins
      {begin: '!important'} // eat !important after mixin call or it will be colored as tag
    ]
  };

  RULES.push(
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    AT_RULE_MODE,
    VAR_RULE_MODE,
    RULE_MODE,
    SELECTOR_MODE
  );

  return {
    name: 'Less',
    case_insensitive: true,
    illegal: '[=>\'/<($"]',
    contains: RULES
  };
}

module.exports = less;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/lisp.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/lisp.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Lisp
Description: Generic lisp syntax
Author: Vasily Polovnyov <vast@whiteants.net>
Category: lisp
*/

function lisp(hljs) {
  var LISP_IDENT_RE = '[a-zA-Z_\\-+\\*\\/<=>&#][a-zA-Z0-9_\\-+*\\/<=>&#!]*';
  var MEC_RE = '\\|[^]*?\\|';
  var LISP_SIMPLE_NUMBER_RE = '(-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|-)?\\d+)?';
  var LITERAL = {
    className: 'literal',
    begin: '\\b(t{1}|nil)\\b'
  };
  var NUMBER = {
    className: 'number',
    variants: [
      {begin: LISP_SIMPLE_NUMBER_RE, relevance: 0},
      {begin: '#(b|B)[0-1]+(/[0-1]+)?'},
      {begin: '#(o|O)[0-7]+(/[0-7]+)?'},
      {begin: '#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?'},
      {begin: '#(c|C)\\(' + LISP_SIMPLE_NUMBER_RE + ' +' + LISP_SIMPLE_NUMBER_RE, end: '\\)'}
    ]
  };
  var STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null});
  var COMMENT = hljs.COMMENT(
    ';', '$',
    {
      relevance: 0
    }
  );
  var VARIABLE = {
    begin: '\\*', end: '\\*'
  };
  var KEYWORD = {
    className: 'symbol',
    begin: '[:&]' + LISP_IDENT_RE
  };
  var IDENT = {
    begin: LISP_IDENT_RE,
    relevance: 0
  };
  var MEC = {
    begin: MEC_RE
  };
  var QUOTED_LIST = {
    begin: '\\(', end: '\\)',
    contains: ['self', LITERAL, STRING, NUMBER, IDENT]
  };
  var QUOTED = {
    contains: [NUMBER, STRING, VARIABLE, KEYWORD, QUOTED_LIST, IDENT],
    variants: [
      {
        begin: '[\'`]\\(', end: '\\)'
      },
      {
        begin: '\\(quote ', end: '\\)',
        keywords: {name: 'quote'}
      },
      {
        begin: '\'' + MEC_RE
      }
    ]
  };
  var QUOTED_ATOM = {
    variants: [
      {begin: '\'' + LISP_IDENT_RE},
      {begin: '#\'' + LISP_IDENT_RE + '(::' + LISP_IDENT_RE + ')*'}
    ]
  };
  var LIST = {
    begin: '\\(\\s*', end: '\\)'
  };
  var BODY = {
    endsWithParent: true,
    relevance: 0
  };
  LIST.contains = [
    {
      className: 'name',
      variants: [
        {
          begin: LISP_IDENT_RE,
          relevance: 0,
        },
        {begin: MEC_RE}
      ]
    },
    BODY
  ];
  BODY.contains = [QUOTED, QUOTED_ATOM, LIST, LITERAL, NUMBER, STRING, COMMENT, VARIABLE, KEYWORD, MEC, IDENT];

  return {
    name: 'Lisp',
    illegal: /\S/,
    contains: [
      NUMBER,
      hljs.SHEBANG(),
      LITERAL,
      STRING,
      COMMENT,
      QUOTED,
      QUOTED_ATOM,
      LIST,
      IDENT
    ]
  };
}

module.exports = lisp;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/livecodeserver.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/livecodeserver.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: LiveCode
Author: Ralf Bitter <rabit@revigniter.com>
Description: Language definition for LiveCode server accounting for revIgniter (a web application framework) characteristics.
Version: 1.1
Date: 2019-04-17
Category: enterprise
*/

function livecodeserver(hljs) {
  const VARIABLE = {
    className: 'variable',
    variants: [
      {
        begin: '\\b([gtps][A-Z]{1}[a-zA-Z0-9]*)(\\[.+\\])?(?:\\s*?)'
      },
      {
        begin: '\\$_[A-Z]+'
      }
    ],
    relevance: 0
  };
  const COMMENT_MODES = [
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.HASH_COMMENT_MODE,
    hljs.COMMENT('--', '$'),
    hljs.COMMENT('[^:]//', '$')
  ];
  const TITLE1 = hljs.inherit(hljs.TITLE_MODE, {
    variants: [
      {
        begin: '\\b_*rig[A-Z]+[A-Za-z0-9_\\-]*'
      },
      {
        begin: '\\b_[a-z0-9\\-]+'
      }
    ]
  });
  const TITLE2 = hljs.inherit(hljs.TITLE_MODE, {
    begin: '\\b([A-Za-z0-9_\\-]+)\\b'
  });
  return {
    name: 'LiveCode',
    case_insensitive: false,
    keywords: {
      keyword:
        '$_COOKIE $_FILES $_GET $_GET_BINARY $_GET_RAW $_POST $_POST_BINARY $_POST_RAW $_SESSION $_SERVER ' +
        'codepoint codepoints segment segments codeunit codeunits sentence sentences trueWord trueWords paragraph ' +
        'after byte bytes english the until http forever descending using line real8 with seventh ' +
        'for stdout finally element word words fourth before black ninth sixth characters chars stderr ' +
        'uInt1 uInt1s uInt2 uInt2s stdin string lines relative rel any fifth items from middle mid ' +
        'at else of catch then third it file milliseconds seconds second secs sec int1 int1s int4 ' +
        'int4s internet int2 int2s normal text item last long detailed effective uInt4 uInt4s repeat ' +
        'end repeat URL in try into switch to words https token binfile each tenth as ticks tick ' +
        'system real4 by dateItems without char character ascending eighth whole dateTime numeric short ' +
        'first ftp integer abbreviated abbr abbrev private case while if ' +
        'div mod wrap and or bitAnd bitNot bitOr bitXor among not in a an within ' +
        'contains ends with begins the keys of keys',
      literal:
        'SIX TEN FORMFEED NINE ZERO NONE SPACE FOUR FALSE COLON CRLF PI COMMA ENDOFFILE EOF EIGHT FIVE ' +
        'QUOTE EMPTY ONE TRUE RETURN CR LINEFEED RIGHT BACKSLASH NULL SEVEN TAB THREE TWO ' +
        'six ten formfeed nine zero none space four false colon crlf pi comma endoffile eof eight five ' +
        'quote empty one true return cr linefeed right backslash null seven tab three two ' +
        'RIVERSION RISTATE FILE_READ_MODE FILE_WRITE_MODE FILE_WRITE_MODE DIR_WRITE_MODE FILE_READ_UMASK ' +
        'FILE_WRITE_UMASK DIR_READ_UMASK DIR_WRITE_UMASK',
      built_in:
        'put abs acos aliasReference annuity arrayDecode arrayEncode asin atan atan2 average avg avgDev base64Decode ' +
        'base64Encode baseConvert binaryDecode binaryEncode byteOffset byteToNum cachedURL cachedURLs charToNum ' +
        'cipherNames codepointOffset codepointProperty codepointToNum codeunitOffset commandNames compound compress ' +
        'constantNames cos date dateFormat decompress difference directories ' +
        'diskSpace DNSServers exp exp1 exp2 exp10 extents files flushEvents folders format functionNames geometricMean global ' +
        'globals hasMemory harmonicMean hostAddress hostAddressToName hostName hostNameToAddress isNumber ISOToMac itemOffset ' +
        'keys len length libURLErrorData libUrlFormData libURLftpCommand libURLLastHTTPHeaders libURLLastRHHeaders ' +
        'libUrlMultipartFormAddPart libUrlMultipartFormData libURLVersion lineOffset ln ln1 localNames log log2 log10 ' +
        'longFilePath lower macToISO matchChunk matchText matrixMultiply max md5Digest median merge messageAuthenticationCode messageDigest millisec ' +
        'millisecs millisecond milliseconds min monthNames nativeCharToNum normalizeText num number numToByte numToChar ' +
        'numToCodepoint numToNativeChar offset open openfiles openProcesses openProcessIDs openSockets ' +
        'paragraphOffset paramCount param params peerAddress pendingMessages platform popStdDev populationStandardDeviation ' +
        'populationVariance popVariance processID random randomBytes replaceText result revCreateXMLTree revCreateXMLTreeFromFile ' +
        'revCurrentRecord revCurrentRecordIsFirst revCurrentRecordIsLast revDatabaseColumnCount revDatabaseColumnIsNull ' +
        'revDatabaseColumnLengths revDatabaseColumnNames revDatabaseColumnNamed revDatabaseColumnNumbered ' +
        'revDatabaseColumnTypes revDatabaseConnectResult revDatabaseCursors revDatabaseID revDatabaseTableNames ' +
        'revDatabaseType revDataFromQuery revdb_closeCursor revdb_columnbynumber revdb_columncount revdb_columnisnull ' +
        'revdb_columnlengths revdb_columnnames revdb_columntypes revdb_commit revdb_connect revdb_connections ' +
        'revdb_connectionerr revdb_currentrecord revdb_cursorconnection revdb_cursorerr revdb_cursors revdb_dbtype ' +
        'revdb_disconnect revdb_execute revdb_iseof revdb_isbof revdb_movefirst revdb_movelast revdb_movenext ' +
        'revdb_moveprev revdb_query revdb_querylist revdb_recordcount revdb_rollback revdb_tablenames ' +
        'revGetDatabaseDriverPath revNumberOfRecords revOpenDatabase revOpenDatabases revQueryDatabase ' +
        'revQueryDatabaseBlob revQueryResult revQueryIsAtStart revQueryIsAtEnd revUnixFromMacPath revXMLAttribute ' +
        'revXMLAttributes revXMLAttributeValues revXMLChildContents revXMLChildNames revXMLCreateTreeFromFileWithNamespaces ' +
        'revXMLCreateTreeWithNamespaces revXMLDataFromXPathQuery revXMLEvaluateXPath revXMLFirstChild revXMLMatchingNode ' +
        'revXMLNextSibling revXMLNodeContents revXMLNumberOfChildren revXMLParent revXMLPreviousSibling ' +
        'revXMLRootNode revXMLRPC_CreateRequest revXMLRPC_Documents revXMLRPC_Error ' +
        'revXMLRPC_GetHost revXMLRPC_GetMethod revXMLRPC_GetParam revXMLText revXMLRPC_Execute ' +
        'revXMLRPC_GetParamCount revXMLRPC_GetParamNode revXMLRPC_GetParamType revXMLRPC_GetPath revXMLRPC_GetPort ' +
        'revXMLRPC_GetProtocol revXMLRPC_GetRequest revXMLRPC_GetResponse revXMLRPC_GetSocket revXMLTree ' +
        'revXMLTrees revXMLValidateDTD revZipDescribeItem revZipEnumerateItems revZipOpenArchives round sampVariance ' +
        'sec secs seconds sentenceOffset sha1Digest shell shortFilePath sin specialFolderPath sqrt standardDeviation statRound ' +
        'stdDev sum sysError systemVersion tan tempName textDecode textEncode tick ticks time to tokenOffset toLower toUpper ' +
        'transpose truewordOffset trunc uniDecode uniEncode upper URLDecode URLEncode URLStatus uuid value variableNames ' +
        'variance version waitDepth weekdayNames wordOffset xsltApplyStylesheet xsltApplyStylesheetFromFile xsltLoadStylesheet ' +
        'xsltLoadStylesheetFromFile add breakpoint cancel clear local variable file word line folder directory URL close socket process ' +
        'combine constant convert create new alias folder directory decrypt delete variable word line folder ' +
        'directory URL dispatch divide do encrypt filter get include intersect kill libURLDownloadToFile ' +
        'libURLFollowHttpRedirects libURLftpUpload libURLftpUploadFile libURLresetAll libUrlSetAuthCallback libURLSetDriver ' +
        'libURLSetCustomHTTPHeaders libUrlSetExpect100 libURLSetFTPListCommand libURLSetFTPMode libURLSetFTPStopTime ' +
        'libURLSetStatusCallback load extension loadedExtensions multiply socket prepare process post seek rel relative read from process rename ' +
        'replace require resetAll resolve revAddXMLNode revAppendXML revCloseCursor revCloseDatabase revCommitDatabase ' +
        'revCopyFile revCopyFolder revCopyXMLNode revDeleteFolder revDeleteXMLNode revDeleteAllXMLTrees ' +
        'revDeleteXMLTree revExecuteSQL revGoURL revInsertXMLNode revMoveFolder revMoveToFirstRecord revMoveToLastRecord ' +
        'revMoveToNextRecord revMoveToPreviousRecord revMoveToRecord revMoveXMLNode revPutIntoXMLNode revRollBackDatabase ' +
        'revSetDatabaseDriverPath revSetXMLAttribute revXMLRPC_AddParam revXMLRPC_DeleteAllDocuments revXMLAddDTD ' +
        'revXMLRPC_Free revXMLRPC_FreeAll revXMLRPC_DeleteDocument revXMLRPC_DeleteParam revXMLRPC_SetHost ' +
        'revXMLRPC_SetMethod revXMLRPC_SetPort revXMLRPC_SetProtocol revXMLRPC_SetSocket revZipAddItemWithData ' +
        'revZipAddItemWithFile revZipAddUncompressedItemWithData revZipAddUncompressedItemWithFile revZipCancel ' +
        'revZipCloseArchive revZipDeleteItem revZipExtractItemToFile revZipExtractItemToVariable revZipSetProgressCallback ' +
        'revZipRenameItem revZipReplaceItemWithData revZipReplaceItemWithFile revZipOpenArchive send set sort split start stop ' +
        'subtract symmetric union unload vectorDotProduct wait write'
    },
    contains: [
      VARIABLE,
      {
        className: 'keyword',
        begin: '\\bend\\sif\\b'
      },
      {
        className: 'function',
        beginKeywords: 'function',
        end: '$',
        contains: [
          VARIABLE,
          TITLE2,
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.BINARY_NUMBER_MODE,
          hljs.C_NUMBER_MODE,
          TITLE1
        ]
      },
      {
        className: 'function',
        begin: '\\bend\\s+',
        end: '$',
        keywords: 'end',
        contains: [
          TITLE2,
          TITLE1
        ],
        relevance: 0
      },
      {
        beginKeywords: 'command on',
        end: '$',
        contains: [
          VARIABLE,
          TITLE2,
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.BINARY_NUMBER_MODE,
          hljs.C_NUMBER_MODE,
          TITLE1
        ]
      },
      {
        className: 'meta',
        variants: [
          {
            begin: '<\\?(rev|lc|livecode)',
            relevance: 10
          },
          {
            begin: '<\\?'
          },
          {
            begin: '\\?>'
          }
        ]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.BINARY_NUMBER_MODE,
      hljs.C_NUMBER_MODE,
      TITLE1
    ].concat(COMMENT_MODES),
    illegal: ';$|^\\[|^=|&|\\{'
  };
}

module.exports = livecodeserver;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/livescript.js":
/*!*************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/livescript.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/*
Language: LiveScript
Author: Taneli Vatanen <taneli.vatanen@gmail.com>
Contributors: Jen Evers-Corvina <jen@sevvie.net>
Origin: coffeescript.js
Description: LiveScript is a programming language that transcompiles to JavaScript. For info about language see http://livescript.net/
Website: https://livescript.net
Category: scripting
*/

function livescript(hljs) {
  const LIVESCRIPT_BUILT_INS = [
    'npm',
    'print'
  ];
  const LIVESCRIPT_LITERALS = [
    'yes',
    'no',
    'on',
    'off',
    'it',
    'that',
    'void'
  ];
  const LIVESCRIPT_KEYWORDS = [
    'then',
    'unless',
    'until',
    'loop',
    'of',
    'by',
    'when',
    'and',
    'or',
    'is',
    'isnt',
    'not',
    'it',
    'that',
    'otherwise',
    'from',
    'to',
    'til',
    'fallthrough',
    'case',
    'enum',
    'native',
    'list',
    'map',
    '__hasProp',
    '__extends',
    '__slice',
    '__bind',
    '__indexOf'
  ];
  const KEYWORDS$1 = {
    keyword: KEYWORDS.concat(LIVESCRIPT_KEYWORDS).join(" "),
    literal: LITERALS.concat(LIVESCRIPT_LITERALS).join(" "),
    built_in: BUILT_INS.concat(LIVESCRIPT_BUILT_INS).join(" ")
  };
  const JS_IDENT_RE = '[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*';
  const TITLE = hljs.inherit(hljs.TITLE_MODE, {
    begin: JS_IDENT_RE
  });
  const SUBST = {
    className: 'subst',
    begin: /#\{/,
    end: /\}/,
    keywords: KEYWORDS$1
  };
  const SUBST_SIMPLE = {
    className: 'subst',
    begin: /#[A-Za-z$_]/,
    end: /(?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*/,
    keywords: KEYWORDS$1
  };
  const EXPRESSIONS = [
    hljs.BINARY_NUMBER_MODE,
    {
      className: 'number',
      begin: '(\\b0[xX][a-fA-F0-9_]+)|(\\b\\d(\\d|_\\d)*(\\.(\\d(\\d|_\\d)*)?)?(_*[eE]([-+]\\d(_\\d|\\d)*)?)?[_a-z]*)',
      relevance: 0,
      starts: {
        end: '(\\s*/)?',
        relevance: 0
      } // a number tries to eat the following slash to prevent treating it as a regexp
    },
    {
      className: 'string',
      variants: [
        {
          begin: /'''/,
          end: /'''/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /'/,
          end: /'/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /"""/,
          end: /"""/,
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST,
            SUBST_SIMPLE
          ]
        },
        {
          begin: /"/,
          end: /"/,
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST,
            SUBST_SIMPLE
          ]
        },
        {
          begin: /\\/,
          end: /(\s|$)/,
          excludeEnd: true
        }
      ]
    },
    {
      className: 'regexp',
      variants: [
        {
          begin: '//',
          end: '//[gim]*',
          contains: [
            SUBST,
            hljs.HASH_COMMENT_MODE
          ]
        },
        {
          // regex can't start with space to parse x / 2 / 3 as two divisions
          // regex can't start with *, and it supports an "illegal" in the main mode
          begin: /\/(?![ *])(\\.|[^\\\n])*?\/[gim]*(?=\W)/
        }
      ]
    },
    {
      begin: '@' + JS_IDENT_RE
    },
    {
      begin: '``',
      end: '``',
      excludeBegin: true,
      excludeEnd: true,
      subLanguage: 'javascript'
    }
  ];
  SUBST.contains = EXPRESSIONS;

  const PARAMS = {
    className: 'params',
    begin: '\\(',
    returnBegin: true,
    /* We need another contained nameless mode to not have every nested
    pair of parens to be called "params" */
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS$1,
        contains: ['self'].concat(EXPRESSIONS)
      }
    ]
  };

  const SYMBOLS = {
    begin: '(#=>|=>|\\|>>|-?->|!->)'
  };

  return {
    name: 'LiveScript',
    aliases: ['ls'],
    keywords: KEYWORDS$1,
    illegal: /\/\*/,
    contains: EXPRESSIONS.concat([
      hljs.COMMENT('\\/\\*', '\\*\\/'),
      hljs.HASH_COMMENT_MODE,
      SYMBOLS, // relevance booster
      {
        className: 'function',
        contains: [
          TITLE,
          PARAMS
        ],
        returnBegin: true,
        variants: [
          {
            begin: '(' + JS_IDENT_RE + '\\s*(?:=|:=)\\s*)?(\\(.*\\))?\\s*\\B->\\*?',
            end: '->\\*?'
          },
          {
            begin: '(' + JS_IDENT_RE + '\\s*(?:=|:=)\\s*)?!?(\\(.*\\))?\\s*\\B[-~]{1,2}>\\*?',
            end: '[-~]{1,2}>\\*?'
          },
          {
            begin: '(' + JS_IDENT_RE + '\\s*(?:=|:=)\\s*)?(\\(.*\\))?\\s*\\B!?[-~]{1,2}>\\*?',
            end: '!?[-~]{1,2}>\\*?'
          }
        ]
      },
      {
        className: 'class',
        beginKeywords: 'class',
        end: '$',
        illegal: /[:="\[\]]/,
        contains: [
          {
            beginKeywords: 'extends',
            endsWithParent: true,
            illegal: /[:="\[\]]/,
            contains: [TITLE]
          },
          TITLE
        ]
      },
      {
        begin: JS_IDENT_RE + ':',
        end: ':',
        returnBegin: true,
        returnEnd: true,
        relevance: 0
      }
    ])
  };
}

module.exports = livescript;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/llvm.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/llvm.js ***!
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
 * @param {...(RegExp | string) } args
 * @returns {string}
 */
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}

/*
Language: LLVM IR
Author: Michael Rodler <contact@f0rki.at>
Description: language used as intermediate representation in the LLVM compiler framework
Website: https://llvm.org/docs/LangRef.html
Category: assembler
Audit: 2020
*/

/** @type LanguageFn */
function llvm(hljs) {
  const IDENT_RE = /([-a-zA-Z$._][\w$.-]*)/;
  const TYPE = {
    className: 'type',
    begin: /\bi\d+(?=\s|\b)/
  };
  const OPERATOR = {
    className: 'operator',
    relevance: 0,
    begin: /=/
  };
  const PUNCTUATION = {
    className: 'punctuation',
    relevance: 0,
    begin: /,/
  };
  const NUMBER = {
    className: 'number',
    variants: [
        { begin: /0[xX][a-fA-F0-9]+/ },
        { begin: /-?\d+(?:[.]\d+)?(?:[eE][-+]?\d+(?:[.]\d+)?)?/ }
    ],
    relevance: 0
  };
  const LABEL = {
    className: 'symbol',
    variants: [
        { begin: /^\s*[a-z]+:/ }, // labels
    ],
    relevance: 0
  };
  const VARIABLE = {
    className: 'variable',
    variants: [
      { begin: concat(/%/, IDENT_RE) },
      { begin: /%\d+/ },
      { begin: /#\d+/ },
    ]
  };
  const FUNCTION = {
    className: 'title',
    variants: [
      { begin: concat(/@/, IDENT_RE) },
      { begin: /@\d+/ },
      { begin: concat(/!/, IDENT_RE) },
      { begin: concat(/!\d+/, IDENT_RE) },
      // https://llvm.org/docs/LangRef.html#namedmetadatastructure
      // obviously a single digit can also be used in this fashion
      { begin: /!\d+/ }
    ]
  };

  return {
    name: 'LLVM IR',
    // TODO: split into different categories of keywords
    keywords:
      'begin end true false declare define global ' +
      'constant private linker_private internal ' +
      'available_externally linkonce linkonce_odr weak ' +
      'weak_odr appending dllimport dllexport common ' +
      'default hidden protected extern_weak external ' +
      'thread_local zeroinitializer undef null to tail ' +
      'target triple datalayout volatile nuw nsw nnan ' +
      'ninf nsz arcp fast exact inbounds align ' +
      'addrspace section alias module asm sideeffect ' +
      'gc dbg linker_private_weak attributes blockaddress ' +
      'initialexec localdynamic localexec prefix unnamed_addr ' +
      'ccc fastcc coldcc x86_stdcallcc x86_fastcallcc ' +
      'arm_apcscc arm_aapcscc arm_aapcs_vfpcc ptx_device ' +
      'ptx_kernel intel_ocl_bicc msp430_intrcc spir_func ' +
      'spir_kernel x86_64_sysvcc x86_64_win64cc x86_thiscallcc ' +
      'cc c signext zeroext inreg sret nounwind ' +
      'noreturn noalias nocapture byval nest readnone ' +
      'readonly inlinehint noinline alwaysinline optsize ssp ' +
      'sspreq noredzone noimplicitfloat naked builtin cold ' +
      'nobuiltin noduplicate nonlazybind optnone returns_twice ' +
      'sanitize_address sanitize_memory sanitize_thread sspstrong ' +
      'uwtable returned type opaque eq ne slt sgt ' +
      'sle sge ult ugt ule uge oeq one olt ogt ' +
      'ole oge ord uno ueq une x acq_rel acquire ' +
      'alignstack atomic catch cleanup filter inteldialect ' +
      'max min monotonic nand personality release seq_cst ' +
      'singlethread umax umin unordered xchg add fadd ' +
      'sub fsub mul fmul udiv sdiv fdiv urem srem ' +
      'frem shl lshr ashr and or xor icmp fcmp ' +
      'phi call trunc zext sext fptrunc fpext uitofp ' +
      'sitofp fptoui fptosi inttoptr ptrtoint bitcast ' +
      'addrspacecast select va_arg ret br switch invoke ' +
      'unwind unreachable indirectbr landingpad resume ' +
      'malloc alloca free load store getelementptr ' +
      'extractelement insertelement shufflevector getresult ' +
      'extractvalue insertvalue atomicrmw cmpxchg fence ' +
      'argmemonly double',
    contains: [
      TYPE,
      // this matches "empty comments"...
      // ...because it's far more likely this is a statement terminator in
      // another language than an actual comment
      hljs.COMMENT(/;\s*$/, null, { relevance: 0 }),
      hljs.COMMENT(/;/, /$/),
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        variants: [
          // Double-quoted string
          { begin: /"/, end: /[^\\]"/ },
        ]
      },
      FUNCTION,
      PUNCTUATION,
      OPERATOR,
      VARIABLE,
      LABEL,
      NUMBER
    ]
  };
}

module.exports = llvm;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/lsl.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/lsl.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: LSL (Linden Scripting Language)
Description: The Linden Scripting Language is used in Second Life by Linden Labs.
Author: Builder's Brewery <buildersbrewery@gmail.com>
Website: http://wiki.secondlife.com/wiki/LSL_Portal
Category: scripting
*/

function lsl(hljs) {

    var LSL_STRING_ESCAPE_CHARS = {
        className: 'subst',
        begin: /\\[tn"\\]/
    };

    var LSL_STRINGS = {
        className: 'string',
        begin: '"',
        end: '"',
        contains: [
            LSL_STRING_ESCAPE_CHARS
        ]
    };

    var LSL_NUMBERS = {
        className: 'number',
        relevance:0,
        begin: hljs.C_NUMBER_RE
    };

    var LSL_CONSTANTS = {
        className: 'literal',
        variants: [
            {
                begin: '\\b(PI|TWO_PI|PI_BY_TWO|DEG_TO_RAD|RAD_TO_DEG|SQRT2)\\b'
            },
            {
                begin: '\\b(XP_ERROR_(EXPERIENCES_DISABLED|EXPERIENCE_(DISABLED|SUSPENDED)|INVALID_(EXPERIENCE|PARAMETERS)|KEY_NOT_FOUND|MATURITY_EXCEEDED|NONE|NOT_(FOUND|PERMITTED(_LAND)?)|NO_EXPERIENCE|QUOTA_EXCEEDED|RETRY_UPDATE|STORAGE_EXCEPTION|STORE_DISABLED|THROTTLED|UNKNOWN_ERROR)|JSON_APPEND|STATUS_(PHYSICS|ROTATE_[XYZ]|PHANTOM|SANDBOX|BLOCK_GRAB(_OBJECT)?|(DIE|RETURN)_AT_EDGE|CAST_SHADOWS|OK|MALFORMED_PARAMS|TYPE_MISMATCH|BOUNDS_ERROR|NOT_(FOUND|SUPPORTED)|INTERNAL_ERROR|WHITELIST_FAILED)|AGENT(_(BY_(LEGACY_|USER)NAME|FLYING|ATTACHMENTS|SCRIPTED|MOUSELOOK|SITTING|ON_OBJECT|AWAY|WALKING|IN_AIR|TYPING|CROUCHING|BUSY|ALWAYS_RUN|AUTOPILOT|LIST_(PARCEL(_OWNER)?|REGION)))?|CAMERA_(PITCH|DISTANCE|BEHINDNESS_(ANGLE|LAG)|(FOCUS|POSITION)(_(THRESHOLD|LOCKED|LAG))?|FOCUS_OFFSET|ACTIVE)|ANIM_ON|LOOP|REVERSE|PING_PONG|SMOOTH|ROTATE|SCALE|ALL_SIDES|LINK_(ROOT|SET|ALL_(OTHERS|CHILDREN)|THIS)|ACTIVE|PASS(IVE|_(ALWAYS|IF_NOT_HANDLED|NEVER))|SCRIPTED|CONTROL_(FWD|BACK|(ROT_)?(LEFT|RIGHT)|UP|DOWN|(ML_)?LBUTTON)|PERMISSION_(RETURN_OBJECTS|DEBIT|OVERRIDE_ANIMATIONS|SILENT_ESTATE_MANAGEMENT|TAKE_CONTROLS|TRIGGER_ANIMATION|ATTACH|CHANGE_LINKS|(CONTROL|TRACK)_CAMERA|TELEPORT)|INVENTORY_(TEXTURE|SOUND|OBJECT|SCRIPT|LANDMARK|CLOTHING|NOTECARD|BODYPART|ANIMATION|GESTURE|ALL|NONE)|CHANGED_(INVENTORY|COLOR|SHAPE|SCALE|TEXTURE|LINK|ALLOWED_DROP|OWNER|REGION(_START)?|TELEPORT|MEDIA)|OBJECT_(CLICK_ACTION|HOVER_HEIGHT|LAST_OWNER_ID|(PHYSICS|SERVER|STREAMING)_COST|UNKNOWN_DETAIL|CHARACTER_TIME|PHANTOM|PHYSICS|TEMP_(ATTACHED|ON_REZ)|NAME|DESC|POS|PRIM_(COUNT|EQUIVALENCE)|RETURN_(PARCEL(_OWNER)?|REGION)|REZZER_KEY|ROO?T|VELOCITY|OMEGA|OWNER|GROUP(_TAG)?|CREATOR|ATTACHED_(POINT|SLOTS_AVAILABLE)|RENDER_WEIGHT|(BODY_SHAPE|PATHFINDING)_TYPE|(RUNNING|TOTAL)_SCRIPT_COUNT|TOTAL_INVENTORY_COUNT|SCRIPT_(MEMORY|TIME))|TYPE_(INTEGER|FLOAT|STRING|KEY|VECTOR|ROTATION|INVALID)|(DEBUG|PUBLIC)_CHANNEL|ATTACH_(AVATAR_CENTER|CHEST|HEAD|BACK|PELVIS|MOUTH|CHIN|NECK|NOSE|BELLY|[LR](SHOULDER|HAND|FOOT|EAR|EYE|[UL](ARM|LEG)|HIP)|(LEFT|RIGHT)_PEC|HUD_(CENTER_[12]|TOP_(RIGHT|CENTER|LEFT)|BOTTOM(_(RIGHT|LEFT))?)|[LR]HAND_RING1|TAIL_(BASE|TIP)|[LR]WING|FACE_(JAW|[LR]EAR|[LR]EYE|TOUNGE)|GROIN|HIND_[LR]FOOT)|LAND_(LEVEL|RAISE|LOWER|SMOOTH|NOISE|REVERT)|DATA_(ONLINE|NAME|BORN|SIM_(POS|STATUS|RATING)|PAYINFO)|PAYMENT_INFO_(ON_FILE|USED)|REMOTE_DATA_(CHANNEL|REQUEST|REPLY)|PSYS_(PART_(BF_(ZERO|ONE(_MINUS_(DEST_COLOR|SOURCE_(ALPHA|COLOR)))?|DEST_COLOR|SOURCE_(ALPHA|COLOR))|BLEND_FUNC_(DEST|SOURCE)|FLAGS|(START|END)_(COLOR|ALPHA|SCALE|GLOW)|MAX_AGE|(RIBBON|WIND|INTERP_(COLOR|SCALE)|BOUNCE|FOLLOW_(SRC|VELOCITY)|TARGET_(POS|LINEAR)|EMISSIVE)_MASK)|SRC_(MAX_AGE|PATTERN|ANGLE_(BEGIN|END)|BURST_(RATE|PART_COUNT|RADIUS|SPEED_(MIN|MAX))|ACCEL|TEXTURE|TARGET_KEY|OMEGA|PATTERN_(DROP|EXPLODE|ANGLE(_CONE(_EMPTY)?)?)))|VEHICLE_(REFERENCE_FRAME|TYPE_(NONE|SLED|CAR|BOAT|AIRPLANE|BALLOON)|(LINEAR|ANGULAR)_(FRICTION_TIMESCALE|MOTOR_DIRECTION)|LINEAR_MOTOR_OFFSET|HOVER_(HEIGHT|EFFICIENCY|TIMESCALE)|BUOYANCY|(LINEAR|ANGULAR)_(DEFLECTION_(EFFICIENCY|TIMESCALE)|MOTOR_(DECAY_)?TIMESCALE)|VERTICAL_ATTRACTION_(EFFICIENCY|TIMESCALE)|BANKING_(EFFICIENCY|MIX|TIMESCALE)|FLAG_(NO_DEFLECTION_UP|LIMIT_(ROLL_ONLY|MOTOR_UP)|HOVER_((WATER|TERRAIN|UP)_ONLY|GLOBAL_HEIGHT)|MOUSELOOK_(STEER|BANK)|CAMERA_DECOUPLED))|PRIM_(ALLOW_UNSIT|ALPHA_MODE(_(BLEND|EMISSIVE|MASK|NONE))?|NORMAL|SPECULAR|TYPE(_(BOX|CYLINDER|PRISM|SPHERE|TORUS|TUBE|RING|SCULPT))?|HOLE_(DEFAULT|CIRCLE|SQUARE|TRIANGLE)|MATERIAL(_(STONE|METAL|GLASS|WOOD|FLESH|PLASTIC|RUBBER))?|SHINY_(NONE|LOW|MEDIUM|HIGH)|BUMP_(NONE|BRIGHT|DARK|WOOD|BARK|BRICKS|CHECKER|CONCRETE|TILE|STONE|DISKS|GRAVEL|BLOBS|SIDING|LARGETILE|STUCCO|SUCTION|WEAVE)|TEXGEN_(DEFAULT|PLANAR)|SCRIPTED_SIT_ONLY|SCULPT_(TYPE_(SPHERE|TORUS|PLANE|CYLINDER|MASK)|FLAG_(MIRROR|INVERT))|PHYSICS(_(SHAPE_(CONVEX|NONE|PRIM|TYPE)))?|(POS|ROT)_LOCAL|SLICE|TEXT|FLEXIBLE|POINT_LIGHT|TEMP_ON_REZ|PHANTOM|POSITION|SIT_TARGET|SIZE|ROTATION|TEXTURE|NAME|OMEGA|DESC|LINK_TARGET|COLOR|BUMP_SHINY|FULLBRIGHT|TEXGEN|GLOW|MEDIA_(ALT_IMAGE_ENABLE|CONTROLS|(CURRENT|HOME)_URL|AUTO_(LOOP|PLAY|SCALE|ZOOM)|FIRST_CLICK_INTERACT|(WIDTH|HEIGHT)_PIXELS|WHITELIST(_ENABLE)?|PERMS_(INTERACT|CONTROL)|PARAM_MAX|CONTROLS_(STANDARD|MINI)|PERM_(NONE|OWNER|GROUP|ANYONE)|MAX_(URL_LENGTH|WHITELIST_(SIZE|COUNT)|(WIDTH|HEIGHT)_PIXELS)))|MASK_(BASE|OWNER|GROUP|EVERYONE|NEXT)|PERM_(TRANSFER|MODIFY|COPY|MOVE|ALL)|PARCEL_(MEDIA_COMMAND_(STOP|PAUSE|PLAY|LOOP|TEXTURE|URL|TIME|AGENT|UNLOAD|AUTO_ALIGN|TYPE|SIZE|DESC|LOOP_SET)|FLAG_(ALLOW_(FLY|(GROUP_)?SCRIPTS|LANDMARK|TERRAFORM|DAMAGE|CREATE_(GROUP_)?OBJECTS)|USE_(ACCESS_(GROUP|LIST)|BAN_LIST|LAND_PASS_LIST)|LOCAL_SOUND_ONLY|RESTRICT_PUSHOBJECT|ALLOW_(GROUP|ALL)_OBJECT_ENTRY)|COUNT_(TOTAL|OWNER|GROUP|OTHER|SELECTED|TEMP)|DETAILS_(NAME|DESC|OWNER|GROUP|AREA|ID|SEE_AVATARS))|LIST_STAT_(MAX|MIN|MEAN|MEDIAN|STD_DEV|SUM(_SQUARES)?|NUM_COUNT|GEOMETRIC_MEAN|RANGE)|PAY_(HIDE|DEFAULT)|REGION_FLAG_(ALLOW_DAMAGE|FIXED_SUN|BLOCK_TERRAFORM|SANDBOX|DISABLE_(COLLISIONS|PHYSICS)|BLOCK_FLY|ALLOW_DIRECT_TELEPORT|RESTRICT_PUSHOBJECT)|HTTP_(METHOD|MIMETYPE|BODY_(MAXLENGTH|TRUNCATED)|CUSTOM_HEADER|PRAGMA_NO_CACHE|VERBOSE_THROTTLE|VERIFY_CERT)|SIT_(INVALID_(AGENT|LINK_OBJECT)|NO(T_EXPERIENCE|_(ACCESS|EXPERIENCE_PERMISSION|SIT_TARGET)))|STRING_(TRIM(_(HEAD|TAIL))?)|CLICK_ACTION_(NONE|TOUCH|SIT|BUY|PAY|OPEN(_MEDIA)?|PLAY|ZOOM)|TOUCH_INVALID_FACE|PROFILE_(NONE|SCRIPT_MEMORY)|RC_(DATA_FLAGS|DETECT_PHANTOM|GET_(LINK_NUM|NORMAL|ROOT_KEY)|MAX_HITS|REJECT_(TYPES|AGENTS|(NON)?PHYSICAL|LAND))|RCERR_(CAST_TIME_EXCEEDED|SIM_PERF_LOW|UNKNOWN)|ESTATE_ACCESS_(ALLOWED_(AGENT|GROUP)_(ADD|REMOVE)|BANNED_AGENT_(ADD|REMOVE))|DENSITY|FRICTION|RESTITUTION|GRAVITY_MULTIPLIER|KFM_(COMMAND|CMD_(PLAY|STOP|PAUSE)|MODE|FORWARD|LOOP|PING_PONG|REVERSE|DATA|ROTATION|TRANSLATION)|ERR_(GENERIC|PARCEL_PERMISSIONS|MALFORMED_PARAMS|RUNTIME_PERMISSIONS|THROTTLED)|CHARACTER_(CMD_((SMOOTH_)?STOP|JUMP)|DESIRED_(TURN_)?SPEED|RADIUS|STAY_WITHIN_PARCEL|LENGTH|ORIENTATION|ACCOUNT_FOR_SKIPPED_FRAMES|AVOIDANCE_MODE|TYPE(_([ABCD]|NONE))?|MAX_(DECEL|TURN_RADIUS|(ACCEL|SPEED)))|PURSUIT_(OFFSET|FUZZ_FACTOR|GOAL_TOLERANCE|INTERCEPT)|REQUIRE_LINE_OF_SIGHT|FORCE_DIRECT_PATH|VERTICAL|HORIZONTAL|AVOID_(CHARACTERS|DYNAMIC_OBSTACLES|NONE)|PU_(EVADE_(HIDDEN|SPOTTED)|FAILURE_(DYNAMIC_PATHFINDING_DISABLED|INVALID_(GOAL|START)|NO_(NAVMESH|VALID_DESTINATION)|OTHER|TARGET_GONE|(PARCEL_)?UNREACHABLE)|(GOAL|SLOWDOWN_DISTANCE)_REACHED)|TRAVERSAL_TYPE(_(FAST|NONE|SLOW))?|CONTENT_TYPE_(ATOM|FORM|HTML|JSON|LLSD|RSS|TEXT|XHTML|XML)|GCNP_(RADIUS|STATIC)|(PATROL|WANDER)_PAUSE_AT_WAYPOINTS|OPT_(AVATAR|CHARACTER|EXCLUSION_VOLUME|LEGACY_LINKSET|MATERIAL_VOLUME|OTHER|STATIC_OBSTACLE|WALKABLE)|SIM_STAT_PCT_CHARS_STEPPED)\\b'
            },
            {
                begin: '\\b(FALSE|TRUE)\\b'
            },
            {
                begin: '\\b(ZERO_ROTATION)\\b'
            },
            {
                begin: '\\b(EOF|JSON_(ARRAY|DELETE|FALSE|INVALID|NULL|NUMBER|OBJECT|STRING|TRUE)|NULL_KEY|TEXTURE_(BLANK|DEFAULT|MEDIA|PLYWOOD|TRANSPARENT)|URL_REQUEST_(GRANTED|DENIED))\\b'
            },
            {
                begin: '\\b(ZERO_VECTOR|TOUCH_INVALID_(TEXCOORD|VECTOR))\\b'
            }
        ]
    };

    var LSL_FUNCTIONS = {
        className: 'built_in',
        begin: '\\b(ll(AgentInExperience|(Create|DataSize|Delete|KeyCount|Keys|Read|Update)KeyValue|GetExperience(Details|ErrorMessage)|ReturnObjectsBy(ID|Owner)|Json(2List|[GS]etValue|ValueType)|Sin|Cos|Tan|Atan2|Sqrt|Pow|Abs|Fabs|Frand|Floor|Ceil|Round|Vec(Mag|Norm|Dist)|Rot(Between|2(Euler|Fwd|Left|Up))|(Euler|Axes)2Rot|Whisper|(Region|Owner)?Say|Shout|Listen(Control|Remove)?|Sensor(Repeat|Remove)?|Detected(Name|Key|Owner|Type|Pos|Vel|Grab|Rot|Group|LinkNumber)|Die|Ground|Wind|([GS]et)(AnimationOverride|MemoryLimit|PrimMediaParams|ParcelMusicURL|Object(Desc|Name)|PhysicsMaterial|Status|Scale|Color|Alpha|Texture|Pos|Rot|Force|Torque)|ResetAnimationOverride|(Scale|Offset|Rotate)Texture|(Rot)?Target(Remove)?|(Stop)?MoveToTarget|Apply(Rotational)?Impulse|Set(KeyframedMotion|ContentType|RegionPos|(Angular)?Velocity|Buoyancy|HoverHeight|ForceAndTorque|TimerEvent|ScriptState|Damage|TextureAnim|Sound(Queueing|Radius)|Vehicle(Type|(Float|Vector|Rotation)Param)|(Touch|Sit)?Text|Camera(Eye|At)Offset|PrimitiveParams|ClickAction|Link(Alpha|Color|PrimitiveParams(Fast)?|Texture(Anim)?|Camera|Media)|RemoteScriptAccessPin|PayPrice|LocalRot)|ScaleByFactor|Get((Max|Min)ScaleFactor|ClosestNavPoint|StaticPath|SimStats|Env|PrimitiveParams|Link(PrimitiveParams|Number(OfSides)?|Key|Name|Media)|HTTPHeader|FreeURLs|Object(Details|PermMask|PrimCount)|Parcel(MaxPrims|Details|Prim(Count|Owners))|Attached(List)?|(SPMax|Free|Used)Memory|Region(Name|TimeDilation|FPS|Corner|AgentCount)|Root(Position|Rotation)|UnixTime|(Parcel|Region)Flags|(Wall|GMT)clock|SimulatorHostname|BoundingBox|GeometricCenter|Creator|NumberOf(Prims|NotecardLines|Sides)|Animation(List)?|(Camera|Local)(Pos|Rot)|Vel|Accel|Omega|Time(stamp|OfDay)|(Object|CenterOf)?Mass|MassMKS|Energy|Owner|(Owner)?Key|SunDirection|Texture(Offset|Scale|Rot)|Inventory(Number|Name|Key|Type|Creator|PermMask)|Permissions(Key)?|StartParameter|List(Length|EntryType)|Date|Agent(Size|Info|Language|List)|LandOwnerAt|NotecardLine|Script(Name|State))|(Get|Reset|GetAndReset)Time|PlaySound(Slave)?|LoopSound(Master|Slave)?|(Trigger|Stop|Preload)Sound|((Get|Delete)Sub|Insert)String|To(Upper|Lower)|Give(InventoryList|Money)|RezObject|(Stop)?LookAt|Sleep|CollisionFilter|(Take|Release)Controls|DetachFromAvatar|AttachToAvatar(Temp)?|InstantMessage|(GetNext)?Email|StopHover|MinEventDelay|RotLookAt|String(Length|Trim)|(Start|Stop)Animation|TargetOmega|Request(Experience)?Permissions|(Create|Break)Link|BreakAllLinks|(Give|Remove)Inventory|Water|PassTouches|Request(Agent|Inventory)Data|TeleportAgent(Home|GlobalCoords)?|ModifyLand|CollisionSound|ResetScript|MessageLinked|PushObject|PassCollisions|AxisAngle2Rot|Rot2(Axis|Angle)|A(cos|sin)|AngleBetween|AllowInventoryDrop|SubStringIndex|List2(CSV|Integer|Json|Float|String|Key|Vector|Rot|List(Strided)?)|DeleteSubList|List(Statistics|Sort|Randomize|(Insert|Find|Replace)List)|EdgeOfWorld|AdjustSoundVolume|Key2Name|TriggerSoundLimited|EjectFromLand|(CSV|ParseString)2List|OverMyLand|SameGroup|UnSit|Ground(Slope|Normal|Contour)|GroundRepel|(Set|Remove)VehicleFlags|SitOnLink|(AvatarOn)?(Link)?SitTarget|Script(Danger|Profiler)|Dialog|VolumeDetect|ResetOtherScript|RemoteLoadScriptPin|(Open|Close)RemoteDataChannel|SendRemoteData|RemoteDataReply|(Integer|String)ToBase64|XorBase64|Log(10)?|Base64To(String|Integer)|ParseStringKeepNulls|RezAtRoot|RequestSimulatorData|ForceMouselook|(Load|Release|(E|Une)scape)URL|ParcelMedia(CommandList|Query)|ModPow|MapDestination|(RemoveFrom|AddTo|Reset)Land(Pass|Ban)List|(Set|Clear)CameraParams|HTTP(Request|Response)|TextBox|DetectedTouch(UV|Face|Pos|(N|Bin)ormal|ST)|(MD5|SHA1|DumpList2)String|Request(Secure)?URL|Clear(Prim|Link)Media|(Link)?ParticleSystem|(Get|Request)(Username|DisplayName)|RegionSayTo|CastRay|GenerateKey|TransferLindenDollars|ManageEstateAccess|(Create|Delete)Character|ExecCharacterCmd|Evade|FleeFrom|NavigateTo|PatrolPoints|Pursue|UpdateCharacter|WanderWithin))\\b'
    };

    return {
        name: 'LSL (Linden Scripting Language)',
        illegal: ':',
        contains: [
            LSL_STRINGS,
            {
                className: 'comment',
                variants: [
                    hljs.COMMENT('//', '$'),
                    hljs.COMMENT('/\\*', '\\*/')
                ],
                relevance: 0
            },
            LSL_NUMBERS,
            {
                className: 'section',
                variants: [
                    {
                        begin: '\\b(state|default)\\b'
                    },
                    {
                        begin: '\\b(state_(entry|exit)|touch(_(start|end))?|(land_)?collision(_(start|end))?|timer|listen|(no_)?sensor|control|(not_)?at_(rot_)?target|money|email|experience_permissions(_denied)?|run_time_permissions|changed|attach|dataserver|moving_(start|end)|link_message|(on|object)_rez|remote_data|http_re(sponse|quest)|path_update|transaction_result)\\b'
                    }
                ]
            },
            LSL_FUNCTIONS,
            LSL_CONSTANTS,
            {
                className: 'type',
                begin: '\\b(integer|float|string|key|vector|quaternion|rotation|list)\\b'
            }
        ]
    };
}

module.exports = lsl;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/lua.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/lua.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Lua
Description: Lua is a powerful, efficient, lightweight, embeddable scripting language.
Author: Andrew Fedorov <dmmdrs@mail.ru>
Category: common, scripting
Website: https://www.lua.org
*/

function lua(hljs) {
  const OPENING_LONG_BRACKET = '\\[=*\\[';
  const CLOSING_LONG_BRACKET = '\\]=*\\]';
  const LONG_BRACKETS = {
    begin: OPENING_LONG_BRACKET,
    end: CLOSING_LONG_BRACKET,
    contains: ['self']
  };
  const COMMENTS = [
    hljs.COMMENT('--(?!' + OPENING_LONG_BRACKET + ')', '$'),
    hljs.COMMENT(
      '--' + OPENING_LONG_BRACKET,
      CLOSING_LONG_BRACKET,
      {
        contains: [LONG_BRACKETS],
        relevance: 10
      }
    )
  ];
  return {
    name: 'Lua',
    keywords: {
      $pattern: hljs.UNDERSCORE_IDENT_RE,
      literal: "true false nil",
      keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
      built_in:
        // Metatags and globals:
        '_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len ' +
        '__gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert ' +
        // Standard methods and properties:
        'collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring ' +
        'module next pairs pcall print rawequal rawget rawset require select setfenv ' +
        'setmetatable tonumber tostring type unpack xpcall arg self ' +
        // Library methods and properties (one line per library):
        'coroutine resume yield status wrap create running debug getupvalue ' +
        'debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv ' +
        'io lines write close flush open output type read stderr stdin input stdout popen tmpfile ' +
        'math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan ' +
        'os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall ' +
        'string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower ' +
        'table setn insert getn foreachi maxn foreach concat sort remove'
    },
    contains: COMMENTS.concat([
      {
        className: 'function',
        beginKeywords: 'function',
        end: '\\)',
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: '([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*'
          }),
          {
            className: 'params',
            begin: '\\(',
            endsWithParent: true,
            contains: COMMENTS
          }
        ].concat(COMMENTS)
      },
      hljs.C_NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: OPENING_LONG_BRACKET,
        end: CLOSING_LONG_BRACKET,
        contains: [LONG_BRACKETS],
        relevance: 5
      }
    ])
  };
}

module.exports = lua;


/***/ })

}]);
//# sourceMappingURL=7a936fa43c976f2e0325.chunk.js.map