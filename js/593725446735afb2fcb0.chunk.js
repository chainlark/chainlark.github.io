(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor~.._.._node_modules_highlight.js_lib_languages_c"],{

/***/ "../../node_modules/highlight.js/lib/languages/clean.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/clean.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Clean
Author: Camil Staps <info@camilstaps.nl>
Category: functional
Website: http://clean.cs.ru.nl
*/

/** @type LanguageFn */
function clean(hljs) {
  return {
    name: 'Clean',
    aliases: [
      'clean',
      'icl',
      'dcl'
    ],
    keywords: {
      keyword:
        'if let in with where case of class instance otherwise ' +
        'implementation definition system module from import qualified as ' +
        'special code inline foreign export ccall stdcall generic derive ' +
        'infix infixl infixr',
      built_in:
        'Int Real Char Bool',
      literal:
        'True False'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      { // relevance booster
        begin: '->|<-[|:]?|#!?|>>=|\\{\\||\\|\\}|:==|=:|<>'
      }
    ]
  };
}

module.exports = clean;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/clojure-repl.js":
/*!***************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/clojure-repl.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Clojure REPL
Description: Clojure REPL sessions
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Requires: clojure.js
Website: https://clojure.org
Category: lisp
*/

/** @type LanguageFn */
function clojureRepl(hljs) {
  return {
    name: 'Clojure REPL',
    contains: [{
      className: 'meta',
      begin: /^([\w.-]+|\s*#_)?=>/,
      starts: {
        end: /$/,
        subLanguage: 'clojure'
      }
    }]
  };
}

module.exports = clojureRepl;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/clojure.js":
/*!**********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/clojure.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Clojure
Description: Clojure syntax (based on lisp.js)
Author: mfornos
Website: https://clojure.org
Category: lisp
*/

/** @type LanguageFn */
function clojure(hljs) {
  var SYMBOLSTART = 'a-zA-Z_\\-!.?+*=<>&#\'';
  var SYMBOL_RE = '[' + SYMBOLSTART + '][' + SYMBOLSTART + '0-9/;:]*';
  var globals = 'def defonce defprotocol defstruct defmulti defmethod defn- defn defmacro deftype defrecord';
  var keywords = {
    $pattern: SYMBOL_RE,
    'builtin-name':
      // Clojure keywords
      globals + ' ' +
      'cond apply if-not if-let if not not= =|0 <|0 >|0 <=|0 >=|0 ==|0 +|0 /|0 *|0 -|0 rem ' +
      'quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? ' +
      'set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? ' +
      'class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? ' +
      'string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . ' +
      'inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last ' +
      'drop-while while intern condp case reduced cycle split-at split-with repeat replicate ' +
      'iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext ' +
      'nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends ' +
      'add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler ' +
      'set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter ' +
      'monitor-exit macroexpand macroexpand-1 for dosync and or ' +
      'when when-not when-let comp juxt partial sequence memoize constantly complement identity assert ' +
      'peek pop doto proxy first rest cons cast coll last butlast ' +
      'sigs reify second ffirst fnext nfirst nnext meta with-meta ns in-ns create-ns import ' +
      'refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! ' +
      'assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger ' +
      'bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline ' +
      'flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking ' +
      'assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! ' +
      'reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! ' +
      'new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty ' +
      'hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list ' +
      'disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer ' +
      'chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate ' +
      'unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta ' +
      'lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize'
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
    begin: /\b(true|false|nil)\b/
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
    keywords: keywords,
    className: 'name',
    begin: SYMBOL_RE,
    relevance: 0,
    starts: BODY
  };
  var DEFAULT_CONTAINS = [LIST, STRING, HINT, HINT_COL, COMMENT, KEY, COLLECTION, NUMBER, LITERAL, SYMBOL];

  var GLOBAL = {
    beginKeywords: globals,
    lexemes: SYMBOL_RE,
    end: '(\\[|#|\\d|"|:|\\{|\\)|\\(|$)',
    contains: [
      {
        className: 'title',
        begin: SYMBOL_RE,
        relevance: 0,
        excludeEnd: true,
        // we can only have a single title
        endsParent: true
      },
    ].concat(DEFAULT_CONTAINS)
  };

  LIST.contains = [hljs.COMMENT('comment', ''), GLOBAL, NAME, BODY];
  BODY.contains = DEFAULT_CONTAINS;
  COLLECTION.contains = DEFAULT_CONTAINS;
  HINT_COL.contains = [COLLECTION];

  return {
    name: 'Clojure',
    aliases: ['clj'],
    illegal: /\S/,
    contains: [LIST, STRING, HINT, HINT_COL, COMMENT, KEY, COLLECTION, NUMBER, LITERAL]
  };
}

module.exports = clojure;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/cmake.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/cmake.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: CMake
Description: CMake is an open-source cross-platform system for build automation.
Author: Igor Kalnitsky <igor@kalnitsky.org>
Website: https://cmake.org
*/

/** @type LanguageFn */
function cmake(hljs) {
  return {
    name: 'CMake',
    aliases: ['cmake.in'],
    case_insensitive: true,
    keywords: {
      keyword:
        // scripting commands
        'break cmake_host_system_information cmake_minimum_required cmake_parse_arguments ' +
        'cmake_policy configure_file continue elseif else endforeach endfunction endif endmacro ' +
        'endwhile execute_process file find_file find_library find_package find_path ' +
        'find_program foreach function get_cmake_property get_directory_property ' +
        'get_filename_component get_property if include include_guard list macro ' +
        'mark_as_advanced math message option return separate_arguments ' +
        'set_directory_properties set_property set site_name string unset variable_watch while ' +
        // project commands
        'add_compile_definitions add_compile_options add_custom_command add_custom_target ' +
        'add_definitions add_dependencies add_executable add_library add_link_options ' +
        'add_subdirectory add_test aux_source_directory build_command create_test_sourcelist ' +
        'define_property enable_language enable_testing export fltk_wrap_ui ' +
        'get_source_file_property get_target_property get_test_property include_directories ' +
        'include_external_msproject include_regular_expression install link_directories ' +
        'link_libraries load_cache project qt_wrap_cpp qt_wrap_ui remove_definitions ' +
        'set_source_files_properties set_target_properties set_tests_properties source_group ' +
        'target_compile_definitions target_compile_features target_compile_options ' +
        'target_include_directories target_link_directories target_link_libraries ' +
        'target_link_options target_sources try_compile try_run ' +
        // CTest commands
        'ctest_build ctest_configure ctest_coverage ctest_empty_binary_directory ctest_memcheck ' +
        'ctest_read_custom_files ctest_run_script ctest_sleep ctest_start ctest_submit ' +
        'ctest_test ctest_update ctest_upload ' +
        // deprecated commands
        'build_name exec_program export_library_dependencies install_files install_programs ' +
        'install_targets load_command make_directory output_required_files remove ' +
        'subdir_depends subdirs use_mangled_mesa utility_source variable_requires write_file ' +
        'qt5_use_modules qt5_use_package qt5_wrap_cpp ' +
        // core keywords
        'on off true false and or not command policy target test exists is_newer_than ' +
        'is_directory is_symlink is_absolute matches less greater equal less_equal ' +
        'greater_equal strless strgreater strequal strless_equal strgreater_equal version_less ' +
        'version_greater version_equal version_less_equal version_greater_equal in_list defined'
    },
    contains: [
      {
        className: 'variable',
        begin: /\$\{/,
        end: /\}/
      },
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE
    ]
  };
}

module.exports = cmake;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/coffeescript.js":
/*!***************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/coffeescript.js ***!
  \***************************************************************************************************************/
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
Language: CoffeeScript
Author: Dmytrii Nagirniak <dnagir@gmail.com>
Contributors: Oleg Efimov <efimovov@gmail.com>, Cédric Néhémie <cedric.nehemie@gmail.com>
Description: CoffeeScript is a programming language that transcompiles to JavaScript. For info about language see http://coffeescript.org/
Category: common, scripting
Website: https://coffeescript.org
*/

/** @type LanguageFn */
function coffeescript(hljs) {
  const COFFEE_BUILT_INS = [
    'npm',
    'print'
  ];
  const COFFEE_LITERALS = [
    'yes',
    'no',
    'on',
    'off'
  ];
  const COFFEE_KEYWORDS = [
    'then',
    'unless',
    'until',
    'loop',
    'by',
    'when',
    'and',
    'or',
    'is',
    'isnt',
    'not'
  ];
  const NOT_VALID_KEYWORDS = [
    "var",
    "const",
    "let",
    "function",
    "static"
  ];
  const excluding = (list) =>
    (kw) => !list.includes(kw);
  const KEYWORDS$1 = {
    keyword: KEYWORDS.concat(COFFEE_KEYWORDS).filter(excluding(NOT_VALID_KEYWORDS)).join(" "),
    literal: LITERALS.concat(COFFEE_LITERALS).join(" "),
    built_in: BUILT_INS.concat(COFFEE_BUILT_INS).join(" ")
  };
  const JS_IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
  const SUBST = {
    className: 'subst',
    begin: /#\{/,
    end: /\}/,
    keywords: KEYWORDS$1
  };
  const EXPRESSIONS = [
    hljs.BINARY_NUMBER_MODE,
    hljs.inherit(hljs.C_NUMBER_MODE, {
      starts: {
        end: '(\\s*/)?',
        relevance: 0
      }
    }), // a number tries to eat the following slash to prevent treating it as a regexp
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
            SUBST
          ]
        },
        {
          begin: /"/,
          end: /"/,
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST
          ]
        }
      ]
    },
    {
      className: 'regexp',
      variants: [
        {
          begin: '///',
          end: '///',
          contains: [
            SUBST,
            hljs.HASH_COMMENT_MODE
          ]
        },
        {
          begin: '//[gim]{0,3}(?=\\W)',
          relevance: 0
        },
        {
          // regex can't start with space to parse x / 2 / 3 as two divisions
          // regex can't start with *, and it supports an "illegal" in the main mode
          begin: /\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/
        }
      ]
    },
    {
      begin: '@' + JS_IDENT_RE // relevance booster
    },
    {
      subLanguage: 'javascript',
      excludeBegin: true,
      excludeEnd: true,
      variants: [
        {
          begin: '```',
          end: '```'
        },
        {
          begin: '`',
          end: '`'
        }
      ]
    }
  ];
  SUBST.contains = EXPRESSIONS;

  const TITLE = hljs.inherit(hljs.TITLE_MODE, {
    begin: JS_IDENT_RE
  });
  const PARAMS_RE = '(\\(.*\\))?\\s*\\B[-=]>';
  const PARAMS = {
    className: 'params',
    begin: '\\([^\\(]',
    returnBegin: true,
    /* We need another contained nameless mode to not have every nested
    pair of parens to be called "params" */
    contains: [{
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS$1,
      contains: ['self'].concat(EXPRESSIONS)
    }]
  };

  return {
    name: 'CoffeeScript',
    aliases: [
      'coffee',
      'cson',
      'iced'
    ],
    keywords: KEYWORDS$1,
    illegal: /\/\*/,
    contains: EXPRESSIONS.concat([
      hljs.COMMENT('###', '###'),
      hljs.HASH_COMMENT_MODE,
      {
        className: 'function',
        begin: '^\\s*' + JS_IDENT_RE + '\\s*=\\s*' + PARAMS_RE,
        end: '[-=]>',
        returnBegin: true,
        contains: [
          TITLE,
          PARAMS
        ]
      },
      {
        // anonymous function start
        begin: /[:\(,=]\s*/,
        relevance: 0,
        contains: [{
          className: 'function',
          begin: PARAMS_RE,
          end: '[-=]>',
          returnBegin: true,
          contains: [PARAMS]
        }]
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

module.exports = coffeescript;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/coq.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/coq.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Coq
Author: Stephan Boyer <stephan@stephanboyer.com>
Category: functional
Website: https://coq.inria.fr
*/

/** @type LanguageFn */
function coq(hljs) {
  return {
    name: 'Coq',
    keywords: {
      keyword:
        '_|0 as at cofix else end exists exists2 fix for forall fun if IF in let ' +
        'match mod Prop return Set then Type using where with ' +
        'Abort About Add Admit Admitted All Arguments Assumptions Axiom Back BackTo ' +
        'Backtrack Bind Blacklist Canonical Cd Check Class Classes Close Coercion ' +
        'Coercions CoFixpoint CoInductive Collection Combined Compute Conjecture ' +
        'Conjectures Constant constr Constraint Constructors Context Corollary ' +
        'CreateHintDb Cut Declare Defined Definition Delimit Dependencies Dependent ' +
        'Derive Drop eauto End Equality Eval Example Existential Existentials ' +
        'Existing Export exporting Extern Extract Extraction Fact Field Fields File ' +
        'Fixpoint Focus for From Function Functional Generalizable Global Goal Grab ' +
        'Grammar Graph Guarded Heap Hint HintDb Hints Hypotheses Hypothesis ident ' +
        'Identity If Immediate Implicit Import Include Inductive Infix Info Initial ' +
        'Inline Inspect Instance Instances Intro Intros Inversion Inversion_clear ' +
        'Language Left Lemma Let Libraries Library Load LoadPath Local Locate Ltac ML ' +
        'Mode Module Modules Monomorphic Morphism Next NoInline Notation Obligation ' +
        'Obligations Opaque Open Optimize Options Parameter Parameters Parametric ' +
        'Path Paths pattern Polymorphic Preterm Print Printing Program Projections ' +
        'Proof Proposition Pwd Qed Quit Rec Record Recursive Redirect Relation Remark ' +
        'Remove Require Reserved Reset Resolve Restart Rewrite Right Ring Rings Save ' +
        'Scheme Scope Scopes Script Search SearchAbout SearchHead SearchPattern ' +
        'SearchRewrite Section Separate Set Setoid Show Solve Sorted Step Strategies ' +
        'Strategy Structure SubClass Table Tables Tactic Term Test Theorem Time ' +
        'Timeout Transparent Type Typeclasses Types Undelimit Undo Unfocus Unfocused ' +
        'Unfold Universe Universes Unset Unshelve using Variable Variables Variant ' +
        'Verbose Visibility where with',
      built_in:
        'abstract absurd admit after apply as assert assumption at auto autorewrite ' +
        'autounfold before bottom btauto by case case_eq cbn cbv change ' +
        'classical_left classical_right clear clearbody cofix compare compute ' +
        'congruence constr_eq constructor contradict contradiction cut cutrewrite ' +
        'cycle decide decompose dependent destruct destruction dintuition ' +
        'discriminate discrR do double dtauto eapply eassumption eauto ecase ' +
        'econstructor edestruct ediscriminate eelim eexact eexists einduction ' +
        'einjection eleft elim elimtype enough equality erewrite eright ' +
        'esimplify_eq esplit evar exact exactly_once exfalso exists f_equal fail ' +
        'field field_simplify field_simplify_eq first firstorder fix fold fourier ' +
        'functional generalize generalizing gfail give_up has_evar hnf idtac in ' +
        'induction injection instantiate intro intro_pattern intros intuition ' +
        'inversion inversion_clear is_evar is_var lapply lazy left lia lra move ' +
        'native_compute nia nsatz omega once pattern pose progress proof psatz quote ' +
        'record red refine reflexivity remember rename repeat replace revert ' +
        'revgoals rewrite rewrite_strat right ring ring_simplify rtauto set ' +
        'setoid_reflexivity setoid_replace setoid_rewrite setoid_symmetry ' +
        'setoid_transitivity shelve shelve_unifiable simpl simple simplify_eq solve ' +
        'specialize split split_Rabs split_Rmult stepl stepr subst sum swap ' +
        'symmetry tactic tauto time timeout top transitivity trivial try tryif ' +
        'unfold unify until using vm_compute with'
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.COMMENT('\\(\\*', '\\*\\)'),
      hljs.C_NUMBER_MODE,
      {
        className: 'type',
        excludeBegin: true,
        begin: '\\|\\s*',
        end: '\\w+'
      },
      { // relevance booster
        begin: /[-=]>/
      }
    ]
  };
}

module.exports = coq;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/cos.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/cos.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Caché Object Script
Author: Nikita Savchenko <zitros.lab@gmail.com>
Category: enterprise, scripting
Website: https://cedocs.intersystems.com/latest/csp/docbook/DocBook.UI.Page.cls
*/

/** @type LanguageFn */
function cos(hljs) {
  const STRINGS = {
    className: 'string',
    variants: [{
      begin: '"',
      end: '"',
      contains: [{ // escaped
        begin: "\"\"",
        relevance: 0
      }]
    }]
  };

  const NUMBERS = {
    className: "number",
    begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)",
    relevance: 0
  };

  const COS_KEYWORDS =
    'property parameter class classmethod clientmethod extends as break ' +
    'catch close continue do d|0 else elseif for goto halt hang h|0 if job ' +
    'j|0 kill k|0 lock l|0 merge new open quit q|0 read r|0 return set s|0 ' +
    'tcommit throw trollback try tstart use view while write w|0 xecute x|0 ' +
    'zkill znspace zn ztrap zwrite zw zzdump zzwrite print zbreak zinsert ' +
    'zload zprint zremove zsave zzprint mv mvcall mvcrt mvdim mvprint zquit ' +
    'zsync ascii';

  // registered function - no need in them due to all functions are highlighted,
  // but I'll just leave this here.

  // "$bit", "$bitcount",
  // "$bitfind", "$bitlogic", "$case", "$char", "$classmethod", "$classname",
  // "$compile", "$data", "$decimal", "$double", "$extract", "$factor",
  // "$find", "$fnumber", "$get", "$increment", "$inumber", "$isobject",
  // "$isvaliddouble", "$isvalidnum", "$justify", "$length", "$list",
  // "$listbuild", "$listdata", "$listfind", "$listfromstring", "$listget",
  // "$listlength", "$listnext", "$listsame", "$listtostring", "$listvalid",
  // "$locate", "$match", "$method", "$name", "$nconvert", "$next",
  // "$normalize", "$now", "$number", "$order", "$parameter", "$piece",
  // "$prefetchoff", "$prefetchon", "$property", "$qlength", "$qsubscript",
  // "$query", "$random", "$replace", "$reverse", "$sconvert", "$select",
  // "$sortbegin", "$sortend", "$stack", "$text", "$translate", "$view",
  // "$wascii", "$wchar", "$wextract", "$wfind", "$wiswide", "$wlength",
  // "$wreverse", "$xecute", "$zabs", "$zarccos", "$zarcsin", "$zarctan",
  // "$zcos", "$zcot", "$zcsc", "$zdate", "$zdateh", "$zdatetime",
  // "$zdatetimeh", "$zexp", "$zhex", "$zln", "$zlog", "$zpower", "$zsec",
  // "$zsin", "$zsqr", "$ztan", "$ztime", "$ztimeh", "$zboolean",
  // "$zconvert", "$zcrc", "$zcyc", "$zdascii", "$zdchar", "$zf",
  // "$ziswide", "$zlascii", "$zlchar", "$zname", "$zposition", "$zqascii",
  // "$zqchar", "$zsearch", "$zseek", "$zstrip", "$zwascii", "$zwchar",
  // "$zwidth", "$zwpack", "$zwbpack", "$zwunpack", "$zwbunpack", "$zzenkaku",
  // "$change", "$mv", "$mvat", "$mvfmt", "$mvfmts", "$mviconv",
  // "$mviconvs", "$mvinmat", "$mvlover", "$mvoconv", "$mvoconvs", "$mvraise",
  // "$mvtrans", "$mvv", "$mvname", "$zbitand", "$zbitcount", "$zbitfind",
  // "$zbitget", "$zbitlen", "$zbitnot", "$zbitor", "$zbitset", "$zbitstr",
  // "$zbitxor", "$zincrement", "$znext", "$zorder", "$zprevious", "$zsort",
  // "device", "$ecode", "$estack", "$etrap", "$halt", "$horolog",
  // "$io", "$job", "$key", "$namespace", "$principal", "$quit", "$roles",
  // "$storage", "$system", "$test", "$this", "$tlevel", "$username",
  // "$x", "$y", "$za", "$zb", "$zchild", "$zeof", "$zeos", "$zerror",
  // "$zhorolog", "$zio", "$zjob", "$zmode", "$znspace", "$zparent", "$zpi",
  // "$zpos", "$zreference", "$zstorage", "$ztimestamp", "$ztimezone",
  // "$ztrap", "$zversion"

  return {
    name: 'Caché Object Script',
    case_insensitive: true,
    aliases: [
      "cos",
      "cls"
    ],
    keywords: COS_KEYWORDS,
    contains: [
      NUMBERS,
      STRINGS,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: "comment",
        begin: /;/,
        end: "$",
        relevance: 0
      },
      { // Functions and user-defined functions: write $ztime(60*60*3), $$myFunc(10), $$^Val(1)
        className: "built_in",
        begin: /(?:\$\$?|\.\.)\^?[a-zA-Z]+/
      },
      { // Macro command: quit $$$OK
        className: "built_in",
        begin: /\$\$\$[a-zA-Z]+/
      },
      { // Special (global) variables: write %request.Content; Built-in classes: %Library.Integer
        className: "built_in",
        begin: /%[a-z]+(?:\.[a-z]+)*/
      },
      { // Global variable: set ^globalName = 12 write ^globalName
        className: "symbol",
        begin: /\^%?[a-zA-Z][\w]*/
      },
      { // Some control constructions: do ##class(Package.ClassName).Method(), ##super()
        className: "keyword",
        begin: /##class|##super|#define|#dim/
      },
      // sub-languages: are not fully supported by hljs by 11/15/2015
      // left for the future implementation.
      {
        begin: /&sql\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        subLanguage: "sql"
      },
      {
        begin: /&(js|jscript|javascript)</,
        end: />/,
        excludeBegin: true,
        excludeEnd: true,
        subLanguage: "javascript"
      },
      {
        // this brakes first and last tag, but this is the only way to embed a valid html
        begin: /&html<\s*</,
        end: />\s*>/,
        subLanguage: "xml"
      }
    ]
  };
}

module.exports = cos;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/cpp.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/cpp.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: C-like foundation grammar for C/C++ grammars
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Contributors: Evgeny Stepanischev <imbolk@gmail.com>, Zaven Muradyan <megalivoithos@gmail.com>, Roel Deckers <admin@codingcat.nl>, Sam Wu <samsam2310@gmail.com>, Jordi Petit <jordi.petit@gmail.com>, Pieter Vantorre <pietervantorre@gmail.com>, Google Inc. (David Benjamin) <davidben@google.com>
*/

/* In the future the intention is to split out the C/C++ grammars distinctly
since they are separate languages.  They will likely share a common foundation
though, and this file sets the groundwork for that - so that we get the breaking
change in v10 and don't have to change the requirements again later.

See: https://github.com/highlightjs/highlight.js/issues/2146
*/

/** @type LanguageFn */
function cLike(hljs) {
  function optional(s) {
    return '(?:' + s + ')?';
  }
  // added for historic reasons because `hljs.C_LINE_COMMENT_MODE` does
  // not include such support nor can we be sure all the grammars depending
  // on it would desire this behavior
  var C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$', {
    contains: [{begin: /\\\n/}]
  });
  var DECLTYPE_AUTO_RE = 'decltype\\(auto\\)';
  var NAMESPACE_RE = '[a-zA-Z_]\\w*::';
  var TEMPLATE_ARGUMENT_RE = '<.*?>';
  var FUNCTION_TYPE_RE = '(' +
    DECLTYPE_AUTO_RE + '|' +
    optional(NAMESPACE_RE) +'[a-zA-Z_]\\w*' + optional(TEMPLATE_ARGUMENT_RE) +
  ')';
  var CPP_PRIMITIVE_TYPES = {
    className: 'keyword',
    begin: '\\b[a-z\\d_]*_t\\b'
  };

  // https://en.cppreference.com/w/cpp/language/escape
  // \\ \x \xFF \u2837 \u00323747 \374
  var CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';
  var STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '(u8?|U|L)?"', end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: '(u8?|U|L)?\'(' + CHARACTER_ESCAPES + "|.)", end: '\'',
        illegal: '.'
      },
      hljs.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/,
      })
    ]
  };

  var NUMBERS = {
    className: 'number',
    variants: [
      { begin: '\\b(0b[01\']+)' },
      { begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)(u|U|l|L|ul|UL|f|F|b|B)' },
      { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }
    ],
    relevance: 0
  };

  var PREPROCESSOR =       {
    className: 'meta',
    begin: /#\s*[a-z]+\b/, end: /$/,
    keywords: {
      'meta-keyword':
        'if else elif endif define undef warning error line ' +
        'pragma _Pragma ifdef ifndef include'
    },
    contains: [
      {
        begin: /\\\n/, relevance: 0
      },
      hljs.inherit(STRINGS, {className: 'meta-string'}),
      {
        className: 'meta-string',
        begin: /<.*?>/, end: /$/,
        illegal: '\\n',
      },
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  var TITLE_MODE = {
    className: 'title',
    begin: optional(NAMESPACE_RE) + hljs.IDENT_RE,
    relevance: 0
  };

  var FUNCTION_TITLE = optional(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';

  var CPP_KEYWORDS = {
    keyword: 'int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof ' +
      'dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace ' +
      'unsigned long volatile static protected bool template mutable if public friend ' +
      'do goto auto void enum else break extern using asm case typeid wchar_t ' +
      'short reinterpret_cast|10 default double register explicit signed typename try this ' +
      'switch continue inline delete alignas alignof constexpr consteval constinit decltype ' +
      'concept co_await co_return co_yield requires ' +
      'noexcept static_assert thread_local restrict final override ' +
      'atomic_bool atomic_char atomic_schar ' +
      'atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong ' +
      'atomic_ullong new throw return ' +
      'and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq',
    built_in: 'std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream ' +
      'auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set ' +
      'unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos ' +
      'asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp ' +
      'fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper ' +
      'isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow ' +
      'printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp ' +
      'strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan ' +
      'vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary',
    literal: 'true false nullptr NULL'
  };

  var EXPRESSION_CONTAINS = [
    PREPROCESSOR,
    CPP_PRIMITIVE_TYPES,
    C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    NUMBERS,
    STRINGS
  ];

  var EXPRESSION_CONTEXT = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [
      {begin: /=/, end: /;/},
      {begin: /\(/, end: /\)/},
      {beginKeywords: 'new throw return else', end: /;/}
    ],
    keywords: CPP_KEYWORDS,
    contains: EXPRESSION_CONTAINS.concat([
      {
        begin: /\(/, end: /\)/,
        keywords: CPP_KEYWORDS,
        contains: EXPRESSION_CONTAINS.concat(['self']),
        relevance: 0
      }
    ]),
    relevance: 0
  };

  var FUNCTION_DECLARATION = {
    className: 'function',
    begin: '(' + FUNCTION_TYPE_RE + '[\\*&\\s]+)+' + FUNCTION_TITLE,
    returnBegin: true, end: /[{;=]/,
    excludeEnd: true,
    keywords: CPP_KEYWORDS,
    illegal: /[^\w\s\*&:<>]/,
    contains: [

      { // to prevent it from being confused as the function title
        begin: DECLTYPE_AUTO_RE,
        keywords: CPP_KEYWORDS,
        relevance: 0,
      },
      {
        begin: FUNCTION_TITLE, returnBegin: true,
        contains: [TITLE_MODE],
        relevance: 0
      },
      {
        className: 'params',
        begin: /\(/, end: /\)/,
        keywords: CPP_KEYWORDS,
        relevance: 0,
        contains: [
          C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          STRINGS,
          NUMBERS,
          CPP_PRIMITIVE_TYPES,
          // Count matching parentheses.
          {
            begin: /\(/, end: /\)/,
            keywords: CPP_KEYWORDS,
            relevance: 0,
            contains: [
              'self',
              C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE,
              STRINGS,
              NUMBERS,
              CPP_PRIMITIVE_TYPES
            ]
          }
        ]
      },
      CPP_PRIMITIVE_TYPES,
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      PREPROCESSOR
    ]
  };

  return {
    aliases: ['c', 'cc', 'h', 'c++', 'h++', 'hpp', 'hh', 'hxx', 'cxx'],
    keywords: CPP_KEYWORDS,
    // the base c-like language will NEVER be auto-detected, rather the
    // derivitives: c, c++, arduino turn auto-detect back on for themselves
    disableAutodetect: true,
    illegal: '</',
    contains: [].concat(
      EXPRESSION_CONTEXT,
      FUNCTION_DECLARATION,
      EXPRESSION_CONTAINS,
      [
      PREPROCESSOR,
      { // containers: ie, `vector <int> rooms (9);`
        begin: '\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<', end: '>',
        keywords: CPP_KEYWORDS,
        contains: ['self', CPP_PRIMITIVE_TYPES]
      },
      {
        begin: hljs.IDENT_RE + '::',
        keywords: CPP_KEYWORDS
      },
      {
        className: 'class',
        beginKeywords: 'enum class struct union', end: /[{;:<>=]/,
        contains: [
          { beginKeywords: "final class struct" },
          hljs.TITLE_MODE
        ]
      }
    ]),
    exports: {
      preprocessor: PREPROCESSOR,
      strings: STRINGS,
      keywords: CPP_KEYWORDS
    }
  };
}

/*
Language: C++
Category: common, system
Website: https://isocpp.org
*/

/** @type LanguageFn */
function cpp(hljs) {
  const lang = cLike(hljs);
  // return auto-detection back on
  lang.disableAutodetect = false;
  lang.name = 'C++';
  lang.aliases = ['cc', 'c++', 'h++', 'hpp', 'hh', 'hxx', 'cxx'];
  return lang;
}

module.exports = cpp;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/crmsh.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/crmsh.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: crmsh
Author: Kristoffer Gronlund <kgronlund@suse.com>
Website: http://crmsh.github.io
Description: Syntax Highlighting for the crmsh DSL
Category: config
*/

/** @type LanguageFn */
function crmsh(hljs) {
  const RESOURCES = 'primitive rsc_template';
  const COMMANDS = 'group clone ms master location colocation order fencing_topology ' +
      'rsc_ticket acl_target acl_group user role ' +
      'tag xml';
  const PROPERTY_SETS = 'property rsc_defaults op_defaults';
  const KEYWORDS = 'params meta operations op rule attributes utilization';
  const OPERATORS = 'read write deny defined not_defined in_range date spec in ' +
      'ref reference attribute type xpath version and or lt gt tag ' +
      'lte gte eq ne \\';
  const TYPES = 'number string';
  const LITERALS = 'Master Started Slave Stopped start promote demote stop monitor true false';

  return {
    name: 'crmsh',
    aliases: [
      'crm',
      'pcmk'
    ],
    case_insensitive: true,
    keywords: {
      keyword: KEYWORDS + ' ' + OPERATORS + ' ' + TYPES,
      literal: LITERALS
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        beginKeywords: 'node',
        starts: {
          end: '\\s*([\\w_-]+:)?',
          starts: {
            className: 'title',
            end: '\\s*[\\$\\w_][\\w_-]*'
          }
        }
      },
      {
        beginKeywords: RESOURCES,
        starts: {
          className: 'title',
          end: '\\s*[\\$\\w_][\\w_-]*',
          starts: {
            end: '\\s*@?[\\w_][\\w_\\.:-]*'
          }
        }
      },
      {
        begin: '\\b(' + COMMANDS.split(' ').join('|') + ')\\s+',
        keywords: COMMANDS,
        starts: {
          className: 'title',
          end: '[\\$\\w_][\\w_-]*'
        }
      },
      {
        beginKeywords: PROPERTY_SETS,
        starts: {
          className: 'title',
          end: '\\s*([\\w_-]+:)?'
        }
      },
      hljs.QUOTE_STRING_MODE,
      {
        className: 'meta',
        begin: '(ocf|systemd|service|lsb):[\\w_:-]+',
        relevance: 0
      },
      {
        className: 'number',
        begin: '\\b\\d+(\\.\\d+)?(ms|s|h|m)?',
        relevance: 0
      },
      {
        className: 'literal',
        begin: '[-]?(infinity|inf)',
        relevance: 0
      },
      {
        className: 'attr',
        begin: /([A-Za-z$_#][\w_-]+)=/,
        relevance: 0
      },
      {
        className: 'tag',
        begin: '</?',
        end: '/?>',
        relevance: 0
      }
    ]
  };
}

module.exports = crmsh;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/crystal.js":
/*!**********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/crystal.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Crystal
Author: TSUYUSATO Kitsune <make.just.on@gmail.com>
Website: https://crystal-lang.org
*/

/** @type LanguageFn */
function crystal(hljs) {
  var INT_SUFFIX = '(_*[ui](8|16|32|64|128))?';
  var FLOAT_SUFFIX = '(_*f(32|64))?';
  var CRYSTAL_IDENT_RE = '[a-zA-Z_]\\w*[!?=]?';
  var CRYSTAL_METHOD_RE = '[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|[=!]~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?';
  var CRYSTAL_PATH_RE = '[A-Za-z_]\\w*(::\\w+)*(\\?|!)?';
  var CRYSTAL_KEYWORDS = {
    $pattern: CRYSTAL_IDENT_RE,
    keyword:
      'abstract alias annotation as as? asm begin break case class def do else elsif end ensure enum extend for fun if ' +
      'include instance_sizeof is_a? lib macro module next nil? of out pointerof private protected rescue responds_to? ' +
      'return require select self sizeof struct super then type typeof union uninitialized unless until verbatim when while with yield ' +
      '__DIR__ __END_LINE__ __FILE__ __LINE__',
    literal: 'false nil true'
  };
  var SUBST = {
    className: 'subst',
    begin: /#\{/, end: /\}/,
    keywords: CRYSTAL_KEYWORDS
  };
  var EXPANSION = {
    className: 'template-variable',
    variants: [
      {begin: '\\{\\{', end: '\\}\\}'},
      {begin: '\\{%', end: '%\\}'}
    ],
    keywords: CRYSTAL_KEYWORDS
  };

  function recursiveParen(begin, end) {
    var
    contains = [{begin: begin, end: end}];
    contains[0].contains = contains;
    return contains;
  }
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    variants: [
      {begin: /'/, end: /'/},
      {begin: /"/, end: /"/},
      {begin: /`/, end: /`/},
      {begin: '%[Qwi]?\\(', end: '\\)', contains: recursiveParen('\\(', '\\)')},
      {begin: '%[Qwi]?\\[', end: '\\]', contains: recursiveParen('\\[', '\\]')},
      {begin: '%[Qwi]?\\{', end: /\}/, contains: recursiveParen(/\{/, /\}/)},
      {begin: '%[Qwi]?<', end: '>', contains: recursiveParen('<', '>')},
      {begin: '%[Qwi]?\\|', end: '\\|'},
      {begin: /<<-\w+$/, end: /^\s*\w+$/},
    ],
    relevance: 0,
  };
  var Q_STRING = {
    className: 'string',
    variants: [
      {begin: '%q\\(', end: '\\)', contains: recursiveParen('\\(', '\\)')},
      {begin: '%q\\[', end: '\\]', contains: recursiveParen('\\[', '\\]')},
      {begin: '%q\\{', end: /\}/, contains: recursiveParen(/\{/, /\}/)},
      {begin: '%q<', end: '>', contains: recursiveParen('<', '>')},
      {begin: '%q\\|', end: '\\|'},
      {begin: /<<-'\w+'$/, end: /^\s*\w+$/},
    ],
    relevance: 0,
  };
  var REGEXP = {
    begin: '(?!%\\})(' + hljs.RE_STARTERS_RE + '|\\n|\\b(case|if|select|unless|until|when|while)\\b)\\s*',
    keywords: 'case if select unless until when while',
    contains: [
      {
        className: 'regexp',
        contains: [hljs.BACKSLASH_ESCAPE, SUBST],
        variants: [
          {begin: '//[a-z]*', relevance: 0},
          {begin: '/(?!\\/)', end: '/[a-z]*'},
        ]
      }
    ],
    relevance: 0
  };
  var REGEXP2 = {
    className: 'regexp',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    variants: [
      {begin: '%r\\(', end: '\\)', contains: recursiveParen('\\(', '\\)')},
      {begin: '%r\\[', end: '\\]', contains: recursiveParen('\\[', '\\]')},
      {begin: '%r\\{', end: /\}/, contains: recursiveParen(/\{/, /\}/)},
      {begin: '%r<', end: '>', contains: recursiveParen('<', '>')},
      {begin: '%r\\|', end: '\\|'},
    ],
    relevance: 0
  };
  var ATTRIBUTE = {
    className: 'meta',
    begin: '@\\[', end: '\\]',
    contains: [
      hljs.inherit(hljs.QUOTE_STRING_MODE, {className: 'meta-string'})
    ]
  };
  var CRYSTAL_DEFAULT_CONTAINS = [
    EXPANSION,
    STRING,
    Q_STRING,
    REGEXP2,
    REGEXP,
    ATTRIBUTE,
    hljs.HASH_COMMENT_MODE,
    {
      className: 'class',
      beginKeywords: 'class module struct', end: '$|;',
      illegal: /=/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {begin: CRYSTAL_PATH_RE}),
        {begin: '<'} // relevance booster for inheritance
      ]
    },
    {
      className: 'class',
      beginKeywords: 'lib enum union', end: '$|;',
      illegal: /=/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {begin: CRYSTAL_PATH_RE}),
      ],
      relevance: 10
    },
    {
      beginKeywords: 'annotation', end: '$|;',
      illegal: /=/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {begin: CRYSTAL_PATH_RE}),
      ],
      relevance: 10
    },
    {
      className: 'function',
      beginKeywords: 'def', end: /\B\b/,
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
          begin: CRYSTAL_METHOD_RE,
          endsParent: true
        })
      ]
    },
    {
      className: 'function',
      beginKeywords: 'fun macro', end: /\B\b/,
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
          begin: CRYSTAL_METHOD_RE,
          endsParent: true
        })
      ],
      relevance: 2
    },
    {
      className: 'symbol',
      begin: hljs.UNDERSCORE_IDENT_RE + '(!|\\?)?:',
      relevance: 0
    },
    {
      className: 'symbol',
      begin: ':',
      contains: [STRING, {begin: CRYSTAL_METHOD_RE}],
      relevance: 0
    },
    {
      className: 'number',
      variants: [
        { begin: '\\b0b([01_]+)' + INT_SUFFIX },
        { begin: '\\b0o([0-7_]+)' + INT_SUFFIX },
        { begin: '\\b0x([A-Fa-f0-9_]+)' + INT_SUFFIX },
        { begin: '\\b([1-9][0-9_]*[0-9]|[0-9])(\\.[0-9][0-9_]*)?([eE]_*[-+]?[0-9_]*)?' + FLOAT_SUFFIX + '(?!_)' },
        { begin: '\\b([1-9][0-9_]*|0)' + INT_SUFFIX }
      ],
      relevance: 0
    }
  ];
  SUBST.contains = CRYSTAL_DEFAULT_CONTAINS;
  EXPANSION.contains = CRYSTAL_DEFAULT_CONTAINS.slice(1); // without EXPANSION

  return {
    name: 'Crystal',
    aliases: ['cr'],
    keywords: CRYSTAL_KEYWORDS,
    contains: CRYSTAL_DEFAULT_CONTAINS
  };
}

module.exports = crystal;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/csharp.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/csharp.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: C#
Author: Jason Diamond <jason@diamond.name>
Contributor: Nicolas LLOBERA <nllobera@gmail.com>, Pieter Vantorre <pietervantorre@gmail.com>, David Pine <david.pine@microsoft.com>
Website: https://docs.microsoft.com/en-us/dotnet/csharp/
Category: common
*/

/** @type LanguageFn */
function csharp(hljs) {
  var BUILT_IN_KEYWORDS = [
      'bool',
      'byte',
      'char',
      'decimal',
      'delegate',
      'double',
      'dynamic',
      'enum',
      'float',
      'int',
      'long',
      'nint',
      'nuint',
      'object',
      'sbyte',
      'short',
      'string',
      'ulong',
      'unit',
      'ushort'
  ];
  var FUNCTION_MODIFIERS = [
    'public',
    'private',
    'protected',
    'static',
    'internal',
    'protected',
    'abstract',
    'async',
    'extern',
    'override',
    'unsafe',
    'virtual',
    'new',
    'sealed',
    'partial'
  ];
  var LITERAL_KEYWORDS = [
      'default',
      'false',
      'null',
      'true'
  ];
  var NORMAL_KEYWORDS = [
    'abstract',
    'as',
    'base',
    'break',
    'case',
    'class',
    'const',
    'continue',
    'do',
    'else',
    'event',
    'explicit',
    'extern',
    'finally',
    'fixed',
    'for',
    'foreach',
    'goto',
    'if',
    'implicit',
    'in',
    'interface',
    'internal',
    'is',
    'lock',
    'namespace',
    'new',
    'operator',
    'out',
    'override',
    'params',
    'private',
    'protected',
    'public',
    'readonly',
    'record',
    'ref',
    'return',
    'sealed',
    'sizeof',
    'stackalloc',
    'static',
    'struct',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'unchecked',
    'unsafe',
    'using',
    'virtual',
    'void',
    'volatile',
    'while'
  ];
  var CONTEXTUAL_KEYWORDS = [
    'add',
    'alias',
    'and',
    'ascending',
    'async',
    'await',
    'by',
    'descending',
    'equals',
    'from',
    'get',
    'global',
    'group',
    'init',
    'into',
    'join',
    'let',
    'nameof',
    'not',
    'notnull',
    'on',
    'or',
    'orderby',
    'partial',
    'remove',
    'select',
    'set',
    'unmanaged',
    'value|0',
    'var',
    'when',
    'where',
    'with',
    'yield'
  ];

  var KEYWORDS = {
    keyword: NORMAL_KEYWORDS.concat(CONTEXTUAL_KEYWORDS).join(' '),
    built_in: BUILT_IN_KEYWORDS.join(' '),
    literal: LITERAL_KEYWORDS.join(' ')
  };
  var TITLE_MODE = hljs.inherit(hljs.TITLE_MODE, {begin: '[a-zA-Z](\\.?\\w)*'});
  var NUMBERS = {
    className: 'number',
    variants: [
      { begin: '\\b(0b[01\']+)' },
      { begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)(u|U|l|L|ul|UL|f|F|b|B)' },
      { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }
    ],
    relevance: 0
  };
  var VERBATIM_STRING = {
    className: 'string',
    begin: '@"', end: '"',
    contains: [{begin: '""'}]
  };
  var VERBATIM_STRING_NO_LF = hljs.inherit(VERBATIM_STRING, {illegal: /\n/});
  var SUBST = {
    className: 'subst',
    begin: /\{/, end: /\}/,
    keywords: KEYWORDS
  };
  var SUBST_NO_LF = hljs.inherit(SUBST, {illegal: /\n/});
  var INTERPOLATED_STRING = {
    className: 'string',
    begin: /\$"/, end: '"',
    illegal: /\n/,
    contains: [{begin: /\{\{/}, {begin: /\}\}/}, hljs.BACKSLASH_ESCAPE, SUBST_NO_LF]
  };
  var INTERPOLATED_VERBATIM_STRING = {
    className: 'string',
    begin: /\$@"/, end: '"',
    contains: [{begin: /\{\{/}, {begin: /\}\}/}, {begin: '""'}, SUBST]
  };
  var INTERPOLATED_VERBATIM_STRING_NO_LF = hljs.inherit(INTERPOLATED_VERBATIM_STRING, {
    illegal: /\n/,
    contains: [{begin: /\{\{/}, {begin: /\}\}/}, {begin: '""'}, SUBST_NO_LF]
  });
  SUBST.contains = [
    INTERPOLATED_VERBATIM_STRING,
    INTERPOLATED_STRING,
    VERBATIM_STRING,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBERS,
    hljs.C_BLOCK_COMMENT_MODE
  ];
  SUBST_NO_LF.contains = [
    INTERPOLATED_VERBATIM_STRING_NO_LF,
    INTERPOLATED_STRING,
    VERBATIM_STRING_NO_LF,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBERS,
    hljs.inherit(hljs.C_BLOCK_COMMENT_MODE, {illegal: /\n/})
  ];
  var STRING = {
    variants: [
      INTERPOLATED_VERBATIM_STRING,
      INTERPOLATED_STRING,
      VERBATIM_STRING,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  var GENERIC_MODIFIER = {
    begin: "<",
    end: ">",
    contains: [
      { beginKeywords: "in out"},
      TITLE_MODE
    ]
  };
  var TYPE_IDENT_RE = hljs.IDENT_RE + '(<' + hljs.IDENT_RE + '(\\s*,\\s*' + hljs.IDENT_RE + ')*>)?(\\[\\])?';
  var AT_IDENTIFIER = {
    // prevents expressions like `@class` from incorrect flagging
    // `class` as a keyword
    begin: "@" + hljs.IDENT_RE,
    relevance: 0
  };

  return {
    name: 'C#',
    aliases: ['cs', 'c#'],
    keywords: KEYWORDS,
    illegal: /::/,
    contains: [
      hljs.COMMENT(
        '///',
        '$',
        {
          returnBegin: true,
          contains: [
            {
              className: 'doctag',
              variants: [
                {
                  begin: '///', relevance: 0
                },
                {
                  begin: '<!--|-->'
                },
                {
                  begin: '</?', end: '>'
                }
              ]
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'meta',
        begin: '#', end: '$',
        keywords: {
          'meta-keyword': 'if else elif endif define undef warning error line region endregion pragma checksum'
        }
      },
      STRING,
      NUMBERS,
      {
        beginKeywords: 'class interface',
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:,]/,
        contains: [
          { beginKeywords: "where class" },
          TITLE_MODE,
          GENERIC_MODIFIER,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: 'namespace',
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          TITLE_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: 'record',
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          TITLE_MODE,
          GENERIC_MODIFIER,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // [Attributes("")]
        className: 'meta',
        begin: '^\\s*\\[', excludeBegin: true, end: '\\]', excludeEnd: true,
        contains: [
          {className: 'meta-string', begin: /"/, end: /"/}
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: 'new return throw await else',
        relevance: 0
      },
      {
        className: 'function',
        begin: '(' + TYPE_IDENT_RE + '\\s+)+' + hljs.IDENT_RE + '\\s*(<.+>)?\\s*\\(', returnBegin: true,
        end: /\s*[{;=]/, excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          // prevents these from being highlighted `title`
          {
            beginKeywords: FUNCTION_MODIFIERS.join(" "),
            relevance: 0
          },
          {
            begin: hljs.IDENT_RE + '\\s*(<.+>)?\\s*\\(', returnBegin: true,
            contains: [
              hljs.TITLE_MODE,
              GENERIC_MODIFIER
            ],
            relevance: 0
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              STRING,
              NUMBERS,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      AT_IDENTIFIER
    ]
  };
}

module.exports = csharp;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/csp.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/csp.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: CSP
Description: Content Security Policy definition highlighting
Author: Taras <oxdef@oxdef.info>
Website: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

vim: ts=2 sw=2 st=2
*/

/** @type LanguageFn */
function csp(hljs) {
  return {
    name: 'CSP',
    case_insensitive: false,
    keywords: {
      $pattern: '[a-zA-Z][a-zA-Z0-9_-]*',
      keyword: 'base-uri child-src connect-src default-src font-src form-action ' +
        'frame-ancestors frame-src img-src media-src object-src plugin-types ' +
        'report-uri sandbox script-src style-src'
    },
    contains: [
      {
        className: 'string',
        begin: "'",
        end: "'"
      },
      {
        className: 'attribute',
        begin: '^Content',
        end: ':',
        excludeEnd: true
      }
    ]
  };
}

module.exports = csp;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/css.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/css.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: CSS
Category: common, css
Website: https://developer.mozilla.org/en-US/docs/Web/CSS
*/

/** @type LanguageFn */
function css(hljs) {
  var FUNCTION_LIKE = {
    begin: /[\w-]+\(/, returnBegin: true,
    contains: [
      {
        className: 'built_in',
        begin: /[\w-]+/
      },
      {
        begin: /\(/, end: /\)/,
        contains: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.CSS_NUMBER_MODE,
        ]
      }
    ]
  };
  var ATTRIBUTE = {
    className: 'attribute',
    begin: /\S/, end: ':', excludeEnd: true,
    starts: {
      endsWithParent: true, excludeEnd: true,
      contains: [
        FUNCTION_LIKE,
        hljs.CSS_NUMBER_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.APOS_STRING_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        {
          className: 'number', begin: '#[0-9A-Fa-f]+'
        },
        {
          className: 'meta', begin: '!important'
        }
      ]
    }
  };
  var AT_IDENTIFIER = '@[a-z-]+'; // @font-face
  var AT_MODIFIERS = "and or not only";
  var AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/; // @-webkit-keyframes
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var RULE = {
    begin: /([*]\s?)?(?:[A-Z_.\-\\]+|--[a-zA-Z0-9_-]+)\s*(\/\*\*\/)?:/, returnBegin: true, end: ';', endsWithParent: true,
    contains: [
      ATTRIBUTE
    ]
  };

  return {
    name: 'CSS',
    case_insensitive: true,
    illegal: /[=|'\$]/,
    contains: [
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'selector-id', begin: /#[A-Za-z0-9_-]+/
      },
      {
        className: 'selector-class', begin: '\\.' + IDENT_RE
      },
      {
        className: 'selector-attr',
        begin: /\[/, end: /\]/,
        illegal: '$',
        contains: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
        ]
      },
      {
        className: 'selector-pseudo',
        begin: /:(:)?[a-zA-Z0-9_+()"'.-]+/
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
        begin: '@', end: '[{;]', // at_rule eating first "{" is a good thing
                                 // because it doesn’t let it to be parsed as
                                 // a rule set but instead drops parser into
                                 // the default mode which is how it should be.
        illegal: /:/, // break on Less variables @var: ...
        returnBegin: true,
        contains: [
          {
            className: 'keyword',
            begin: AT_PROPERTY_RE
          },
          {
            begin: /\s/, endsWithParent: true, excludeEnd: true,
            relevance: 0,
            keywords: AT_MODIFIERS,
            contains: [
              {
                begin: /[a-z-]+:/,
                className:"attribute"
              },
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: 'selector-tag', begin: IDENT_RE,
        relevance: 0
      },
      {
        begin: /\{/, end: /\}/,
        illegal: /\S/,
        contains: [
          hljs.C_BLOCK_COMMENT_MODE,
          { begin: /;/ }, // empty ; rule
          RULE,
        ]
      }
    ]
  };
}

module.exports = css;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/d.js":
/*!****************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/d.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: D
Author: Aleksandar Ruzicic <aleksandar@ruzicic.info>
Description: D is a language with C-like syntax and static typing. It pragmatically combines efficiency, control, and modeling power, with safety and programmer productivity.
Version: 1.0a
Website: https://dlang.org
Date: 2012-04-08
*/

/**
 * Known issues:
 *
 * - invalid hex string literals will be recognized as a double quoted strings
 *   but 'x' at the beginning of string will not be matched
 *
 * - delimited string literals are not checked for matching end delimiter
 *   (not possible to do with js regexp)
 *
 * - content of token string is colored as a string (i.e. no keyword coloring inside a token string)
 *   also, content of token string is not validated to contain only valid D tokens
 *
 * - special token sequence rule is not strictly following D grammar (anything following #line
 *   up to the end of line is matched as special token sequence)
 */

/** @type LanguageFn */
function d(hljs) {
  /**
   * Language keywords
   *
   * @type {Object}
   */
  const D_KEYWORDS = {
    $pattern: hljs.UNDERSCORE_IDENT_RE,
    keyword:
      'abstract alias align asm assert auto body break byte case cast catch class ' +
      'const continue debug default delete deprecated do else enum export extern final ' +
      'finally for foreach foreach_reverse|10 goto if immutable import in inout int ' +
      'interface invariant is lazy macro mixin module new nothrow out override package ' +
      'pragma private protected public pure ref return scope shared static struct ' +
      'super switch synchronized template this throw try typedef typeid typeof union ' +
      'unittest version void volatile while with __FILE__ __LINE__ __gshared|10 ' +
      '__thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__',
    built_in:
      'bool cdouble cent cfloat char creal dchar delegate double dstring float function ' +
      'idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar ' +
      'wstring',
    literal:
      'false null true'
  };

  /**
   * Number literal regexps
   *
   * @type {String}
   */
  const decimal_integer_re = '(0|[1-9][\\d_]*)';
  const decimal_integer_nosus_re = '(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)';
  const binary_integer_re = '0[bB][01_]+';
  const hexadecimal_digits_re = '([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)';
  const hexadecimal_integer_re = '0[xX]' + hexadecimal_digits_re;

  const decimal_exponent_re = '([eE][+-]?' + decimal_integer_nosus_re + ')';
  const decimal_float_re = '(' + decimal_integer_nosus_re + '(\\.\\d*|' + decimal_exponent_re + ')|' +
                '\\d+\\.' + decimal_integer_nosus_re + decimal_integer_nosus_re + '|' +
                '\\.' + decimal_integer_re + decimal_exponent_re + '?' +
              ')';
  const hexadecimal_float_re = '(0[xX](' +
                  hexadecimal_digits_re + '\\.' + hexadecimal_digits_re + '|' +
                  '\\.?' + hexadecimal_digits_re +
                 ')[pP][+-]?' + decimal_integer_nosus_re + ')';

  const integer_re = '(' +
      decimal_integer_re + '|' +
      binary_integer_re + '|' +
       hexadecimal_integer_re +
    ')';

  const float_re = '(' +
      hexadecimal_float_re + '|' +
      decimal_float_re +
    ')';

  /**
   * Escape sequence supported in D string and character literals
   *
   * @type {String}
   */
  const escape_sequence_re = '\\\\(' +
              '[\'"\\?\\\\abfnrtv]|' + // common escapes
              'u[\\dA-Fa-f]{4}|' + // four hex digit unicode codepoint
              '[0-7]{1,3}|' + // one to three octal digit ascii char code
              'x[\\dA-Fa-f]{2}|' + // two hex digit ascii char code
              'U[\\dA-Fa-f]{8}' + // eight hex digit unicode codepoint
              ')|' +
              '&[a-zA-Z\\d]{2,};'; // named character entity

  /**
   * D integer number literals
   *
   * @type {Object}
   */
  const D_INTEGER_MODE = {
    className: 'number',
    begin: '\\b' + integer_re + '(L|u|U|Lu|LU|uL|UL)?',
    relevance: 0
  };

  /**
   * [D_FLOAT_MODE description]
   * @type {Object}
   */
  const D_FLOAT_MODE = {
    className: 'number',
    begin: '\\b(' +
        float_re + '([fF]|L|i|[fF]i|Li)?|' +
        integer_re + '(i|[fF]i|Li)' +
      ')',
    relevance: 0
  };

  /**
   * D character literal
   *
   * @type {Object}
   */
  const D_CHARACTER_MODE = {
    className: 'string',
    begin: '\'(' + escape_sequence_re + '|.)',
    end: '\'',
    illegal: '.'
  };

  /**
   * D string escape sequence
   *
   * @type {Object}
   */
  const D_ESCAPE_SEQUENCE = {
    begin: escape_sequence_re,
    relevance: 0
  };

  /**
   * D double quoted string literal
   *
   * @type {Object}
   */
  const D_STRING_MODE = {
    className: 'string',
    begin: '"',
    contains: [D_ESCAPE_SEQUENCE],
    end: '"[cwd]?'
  };

  /**
   * D wysiwyg and delimited string literals
   *
   * @type {Object}
   */
  const D_WYSIWYG_DELIMITED_STRING_MODE = {
    className: 'string',
    begin: '[rq]"',
    end: '"[cwd]?',
    relevance: 5
  };

  /**
   * D alternate wysiwyg string literal
   *
   * @type {Object}
   */
  const D_ALTERNATE_WYSIWYG_STRING_MODE = {
    className: 'string',
    begin: '`',
    end: '`[cwd]?'
  };

  /**
   * D hexadecimal string literal
   *
   * @type {Object}
   */
  const D_HEX_STRING_MODE = {
    className: 'string',
    begin: 'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?',
    relevance: 10
  };

  /**
   * D delimited string literal
   *
   * @type {Object}
   */
  const D_TOKEN_STRING_MODE = {
    className: 'string',
    begin: 'q"\\{',
    end: '\\}"'
  };

  /**
   * Hashbang support
   *
   * @type {Object}
   */
  const D_HASHBANG_MODE = {
    className: 'meta',
    begin: '^#!',
    end: '$',
    relevance: 5
  };

  /**
   * D special token sequence
   *
   * @type {Object}
   */
  const D_SPECIAL_TOKEN_SEQUENCE_MODE = {
    className: 'meta',
    begin: '#(line)',
    end: '$',
    relevance: 5
  };

  /**
   * D attributes
   *
   * @type {Object}
   */
  const D_ATTRIBUTE_MODE = {
    className: 'keyword',
    begin: '@[a-zA-Z_][a-zA-Z_\\d]*'
  };

  /**
   * D nesting comment
   *
   * @type {Object}
   */
  const D_NESTING_COMMENT_MODE = hljs.COMMENT(
    '\\/\\+',
    '\\+\\/',
    {
      contains: ['self'],
      relevance: 10
    }
  );

  return {
    name: 'D',
    keywords: D_KEYWORDS,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      D_NESTING_COMMENT_MODE,
      D_HEX_STRING_MODE,
      D_STRING_MODE,
      D_WYSIWYG_DELIMITED_STRING_MODE,
      D_ALTERNATE_WYSIWYG_STRING_MODE,
      D_TOKEN_STRING_MODE,
      D_FLOAT_MODE,
      D_INTEGER_MODE,
      D_CHARACTER_MODE,
      D_HASHBANG_MODE,
      D_SPECIAL_TOKEN_SEQUENCE_MODE,
      D_ATTRIBUTE_MODE
    ]
  };
}

module.exports = d;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/dart.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/dart.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Dart
Requires: markdown.js
Author: Maxim Dikun <dikmax@gmail.com>
Description: Dart a modern, object-oriented language developed by Google. For more information see https://www.dartlang.org/
Website: https://dart.dev
Category: scripting
*/

/** @type LanguageFn */
function dart(hljs) {
  const SUBST = {
    className: 'subst',
    variants: [{
      begin: '\\$[A-Za-z0-9_]+'
    }]
  };

  const BRACED_SUBST = {
    className: 'subst',
    variants: [{
      begin: /\$\{/,
      end: /\}/
    }],
    keywords: 'true false null this is new super'
  };

  const STRING = {
    className: 'string',
    variants: [
      {
        begin: 'r\'\'\'',
        end: '\'\'\''
      },
      {
        begin: 'r"""',
        end: '"""'
      },
      {
        begin: 'r\'',
        end: '\'',
        illegal: '\\n'
      },
      {
        begin: 'r"',
        end: '"',
        illegal: '\\n'
      },
      {
        begin: '\'\'\'',
        end: '\'\'\'',
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST,
          BRACED_SUBST
        ]
      },
      {
        begin: '"""',
        end: '"""',
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST,
          BRACED_SUBST
        ]
      },
      {
        begin: '\'',
        end: '\'',
        illegal: '\\n',
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST,
          BRACED_SUBST
        ]
      },
      {
        begin: '"',
        end: '"',
        illegal: '\\n',
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST,
          BRACED_SUBST
        ]
      }
    ]
  };
  BRACED_SUBST.contains = [
    hljs.C_NUMBER_MODE,
    STRING
  ];

  const BUILT_IN_TYPES = [
    // dart:core
    'Comparable',
    'DateTime',
    'Duration',
    'Function',
    'Iterable',
    'Iterator',
    'List',
    'Map',
    'Match',
    'Object',
    'Pattern',
    'RegExp',
    'Set',
    'Stopwatch',
    'String',
    'StringBuffer',
    'StringSink',
    'Symbol',
    'Type',
    'Uri',
    'bool',
    'double',
    'int',
    'num',
    // dart:html
    'Element',
    'ElementList'
  ];
  const NULLABLE_BUILT_IN_TYPES = BUILT_IN_TYPES.map((e) => `${e}?`);

  const KEYWORDS = {
    keyword: 'abstract as assert async await break case catch class const continue covariant default deferred do ' +
      'dynamic else enum export extends extension external factory false final finally for Function get hide if ' +
      'implements import in inferface is late library mixin new null on operator part required rethrow return set ' +
      'show static super switch sync this throw true try typedef var void while with yield',
    built_in:
      BUILT_IN_TYPES
        .concat(NULLABLE_BUILT_IN_TYPES)
        .concat([
          // dart:core
          'Never',
          'Null',
          'dynamic',
          'print',
          // dart:html
          'document',
          'querySelector',
          'querySelectorAll',
          'window'
        ]).join(' '),
    $pattern: /[A-Za-z][A-Za-z0-9_]*\??/
  };

  return {
    name: 'Dart',
    keywords: KEYWORDS,
    contains: [
      STRING,
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/', {
          subLanguage: 'markdown',
          relevance: 0
        }
      ),
      hljs.COMMENT(
        '///+\\s*',
        '$', {
          contains: [{
            subLanguage: 'markdown',
            begin: '.',
            end: '$',
            relevance: 0
          }]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'class',
        beginKeywords: 'class interface',
        end: /\{/,
        excludeEnd: true,
        contains: [
          {
            beginKeywords: 'extends implements'
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      hljs.C_NUMBER_MODE,
      {
        className: 'meta',
        begin: '@[A-Za-z]+'
      },
      {
        begin: '=>' // No markup, just a relevance booster
      }
    ]
  };
}

module.exports = dart;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/delphi.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/delphi.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Delphi
Website: https://www.embarcadero.com/products/delphi
*/

/** @type LanguageFn */
function delphi(hljs) {
  const KEYWORDS =
    'exports register file shl array record property for mod while set ally label uses raise not ' +
    'stored class safecall var interface or private static exit index inherited to else stdcall ' +
    'override shr asm far resourcestring finalization packed virtual out and protected library do ' +
    'xorwrite goto near function end div overload object unit begin string on inline repeat until ' +
    'destructor write message program with read initialization except default nil if case cdecl in ' +
    'downto threadvar of try pascal const external constructor type public then implementation ' +
    'finally published procedure absolute reintroduce operator as is abstract alias assembler ' +
    'bitpacked break continue cppdecl cvar enumerator experimental platform deprecated ' +
    'unimplemented dynamic export far16 forward generic helper implements interrupt iochecks ' +
    'local name nodefault noreturn nostackframe oldfpccall otherwise saveregisters softfloat ' +
    'specialize strict unaligned varargs ';
  const COMMENT_MODES = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.COMMENT(/\{/, /\}/, {
      relevance: 0
    }),
    hljs.COMMENT(/\(\*/, /\*\)/, {
      relevance: 10
    })
  ];
  const DIRECTIVE = {
    className: 'meta',
    variants: [
      {
        begin: /\{\$/,
        end: /\}/
      },
      {
        begin: /\(\*\$/,
        end: /\*\)/
      }
    ]
  };
  const STRING = {
    className: 'string',
    begin: /'/,
    end: /'/,
    contains: [{
      begin: /''/
    }]
  };
  const NUMBER = {
    className: 'number',
    relevance: 0,
    // Source: https://www.freepascal.org/docs-html/ref/refse6.html
    variants: [
      {
        // Hexadecimal notation, e.g., $7F.
        begin: '\\$[0-9A-Fa-f]+'
      },
      {
        // Octal notation, e.g., &42.
        begin: '&[0-7]+'
      },
      {
        // Binary notation, e.g., %1010.
        begin: '%[01]+'
      }
    ]
  };
  const CHAR_STRING = {
    className: 'string',
    begin: /(#\d+)+/
  };
  const CLASS = {
    begin: hljs.IDENT_RE + '\\s*=\\s*class\\s*\\(',
    returnBegin: true,
    contains: [hljs.TITLE_MODE]
  };
  const FUNCTION = {
    className: 'function',
    beginKeywords: 'function constructor destructor procedure',
    end: /[:;]/,
    keywords: 'function constructor|10 destructor|10 procedure|10',
    contains: [
      hljs.TITLE_MODE,
      {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        contains: [
          STRING,
          CHAR_STRING,
          DIRECTIVE
        ].concat(COMMENT_MODES)
      },
      DIRECTIVE
    ].concat(COMMENT_MODES)
  };
  return {
    name: 'Delphi',
    aliases: [
      'dpr',
      'dfm',
      'pas',
      'pascal',
      'freepascal',
      'lazarus',
      'lpr',
      'lfm'
    ],
    case_insensitive: true,
    keywords: KEYWORDS,
    illegal: /"|\$[G-Zg-z]|\/\*|<\/|\|/,
    contains: [
      STRING,
      CHAR_STRING,
      hljs.NUMBER_MODE,
      NUMBER,
      CLASS,
      FUNCTION,
      DIRECTIVE
    ].concat(COMMENT_MODES)
  };
}

module.exports = delphi;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/diff.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/diff.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Diff
Description: Unified and context diff
Author: Vasily Polovnyov <vast@whiteants.net>
Website: https://www.gnu.org/software/diffutils/
Category: common
*/

/** @type LanguageFn */
function diff(hljs) {
  return {
    name: 'Diff',
    aliases: ['patch'],
    contains: [
      {
        className: 'meta',
        relevance: 10,
        variants: [
          {
            begin: /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/
          },
          {
            begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
          },
          {
            begin: /^--- +\d+,\d+ +----$/
          }
        ]
      },
      {
        className: 'comment',
        variants: [
          {
            begin: /Index: /,
            end: /$/
          },
          {
            begin: /^index/,
            end: /$/
          },
          {
            begin: /={3,}/,
            end: /$/
          },
          {
            begin: /^-{3}/,
            end: /$/
          },
          {
            begin: /^\*{3} /,
            end: /$/
          },
          {
            begin: /^\+{3}/,
            end: /$/
          },
          {
            begin: /^\*{15}$/
          },
          {
            begin: /^diff --git/,
            end: /$/
          }
        ]
      },
      {
        className: 'addition',
        begin: /^\+/,
        end: /$/
      },
      {
        className: 'deletion',
        begin: /^-/,
        end: /$/
      },
      {
        className: 'addition',
        begin: /^!/,
        end: /$/
      }
    ]
  };
}

module.exports = diff;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/django.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/django.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Django
Description: Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design.
Requires: xml.js
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Contributors: Ilya Baryshev <baryshev@gmail.com>
Website: https://www.djangoproject.com
Category: template
*/

/** @type LanguageFn */
function django(hljs) {
  const FILTER = {
    begin: /\|[A-Za-z]+:?/,
    keywords: {
      name:
        'truncatewords removetags linebreaksbr yesno get_digit timesince random striptags ' +
        'filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands ' +
        'title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode ' +
        'timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort ' +
        'dictsortreversed default_if_none pluralize lower join center default ' +
        'truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first ' +
        'escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize ' +
        'localtime utc timezone'
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE
    ]
  };

  return {
    name: 'Django',
    aliases: ['jinja'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT(/\{%\s*comment\s*%\}/, /\{%\s*endcomment\s*%\}/),
      hljs.COMMENT(/\{#/, /#\}/),
      {
        className: 'template-tag',
        begin: /\{%/,
        end: /%\}/,
        contains: [{
          className: 'name',
          begin: /\w+/,
          keywords: {
            name:
                'comment endcomment load templatetag ifchanged endifchanged if endif firstof for ' +
                'endfor ifnotequal endifnotequal widthratio extends include spaceless ' +
                'endspaceless regroup ifequal endifequal ssi now with cycle url filter ' +
                'endfilter debug block endblock else autoescape endautoescape csrf_token empty elif ' +
                'endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix ' +
                'plural get_current_language language get_available_languages ' +
                'get_current_language_bidi get_language_info get_language_info_list localize ' +
                'endlocalize localtime endlocaltime timezone endtimezone get_current_timezone ' +
                'verbatim'
          },
          starts: {
            endsWithParent: true,
            keywords: 'in by as',
            contains: [FILTER],
            relevance: 0
          }
        }]
      },
      {
        className: 'template-variable',
        begin: /\{\{/,
        end: /\}\}/,
        contains: [FILTER]
      }
    ]
  };
}

module.exports = django;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/dns.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/dns.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: DNS Zone
Author: Tim Schumacher <tim@datenknoten.me>
Category: config
Website: https://en.wikipedia.org/wiki/Zone_file
*/

/** @type LanguageFn */
function dns(hljs) {
  return {
    name: 'DNS Zone',
    aliases: [
      'bind',
      'zone'
    ],
    keywords: {
      keyword:
        'IN A AAAA AFSDB APL CAA CDNSKEY CDS CERT CNAME DHCID DLV DNAME DNSKEY DS HIP IPSECKEY KEY KX ' +
        'LOC MX NAPTR NS NSEC NSEC3 NSEC3PARAM PTR RRSIG RP SIG SOA SRV SSHFP TA TKEY TLSA TSIG TXT'
    },
    contains: [
      hljs.COMMENT(';', '$', {
        relevance: 0
      }),
      {
        className: 'meta',
        begin: /^\$(TTL|GENERATE|INCLUDE|ORIGIN)\b/
      },
      // IPv6
      {
        className: 'number',
        begin: '((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))\\b'
      },
      // IPv4
      {
        className: 'number',
        begin: '((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\b'
      },
      hljs.inherit(hljs.NUMBER_MODE, {
        begin: /\b\d+[dhwm]?/
      })
    ]
  };
}

module.exports = dns;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/dockerfile.js":
/*!*************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/dockerfile.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Dockerfile
Requires: bash.js
Author: Alexis Hénaut <alexis@henaut.net>
Description: language definition for Dockerfile files
Website: https://docs.docker.com/engine/reference/builder/
Category: config
*/

/** @type LanguageFn */
function dockerfile(hljs) {
  return {
    name: 'Dockerfile',
    aliases: ['docker'],
    case_insensitive: true,
    keywords: 'from maintainer expose env arg user onbuild stopsignal',
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      {
        beginKeywords: 'run cmd entrypoint volume add copy workdir label healthcheck shell',
        starts: {
          end: /[^\\]$/,
          subLanguage: 'bash'
        }
      }
    ],
    illegal: '</'
  };
}

module.exports = dockerfile;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/dos.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/dos.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Batch file (DOS)
Author: Alexander Makarov <sam@rmcreative.ru>
Contributors: Anton Kochkov <anton.kochkov@gmail.com>
Website: https://en.wikipedia.org/wiki/Batch_file
*/

/** @type LanguageFn */
function dos(hljs) {
  const COMMENT = hljs.COMMENT(
    /^\s*@?rem\b/, /$/,
    {
      relevance: 10
    }
  );
  const LABEL = {
    className: 'symbol',
    begin: '^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)',
    relevance: 0
  };
  return {
    name: 'Batch file (DOS)',
    aliases: [
      'bat',
      'cmd'
    ],
    case_insensitive: true,
    illegal: /\/\*/,
    keywords: {
      keyword:
        'if else goto for in do call exit not exist errorlevel defined ' +
        'equ neq lss leq gtr geq',
      built_in:
        'prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux ' +
        'shift cd dir echo setlocal endlocal set pause copy ' +
        'append assoc at attrib break cacls cd chcp chdir chkdsk chkntfs cls cmd color ' +
        'comp compact convert date dir diskcomp diskcopy doskey erase fs ' +
        'find findstr format ftype graftabl help keyb label md mkdir mode more move path ' +
        'pause print popd pushd promt rd recover rem rename replace restore rmdir shift ' +
        'sort start subst time title tree type ver verify vol ' +
        // winutils
        'ping net ipconfig taskkill xcopy ren del'
    },
    contains: [
      {
        className: 'variable',
        begin: /%%[^ ]|%[^ ]+?%|![^ ]+?!/
      },
      {
        className: 'function',
        begin: LABEL.begin,
        end: 'goto:eof',
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: '([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*'
          }),
          COMMENT
        ]
      },
      {
        className: 'number',
        begin: '\\b\\d+',
        relevance: 0
      },
      COMMENT
    ]
  };
}

module.exports = dos;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/dsconfig.js":
/*!***********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/dsconfig.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 Language: dsconfig
 Description: dsconfig batch configuration language for LDAP directory servers
 Contributors: Jacob Childress <jacobc@gmail.com>
 Category: enterprise, config
 */

 /** @type LanguageFn */
function dsconfig(hljs) {
  const QUOTED_PROPERTY = {
    className: 'string',
    begin: /"/,
    end: /"/
  };
  const APOS_PROPERTY = {
    className: 'string',
    begin: /'/,
    end: /'/
  };
  const UNQUOTED_PROPERTY = {
    className: 'string',
    begin: /[\w\-?]+:\w+/,
    end: /\W/,
    relevance: 0
  };
  const VALUELESS_PROPERTY = {
    className: 'string',
    begin: /\w+-?\w+/,
    end: /\W/,
    relevance: 0
  };

  return {
    keywords: 'dsconfig',
    contains: [
      {
        className: 'keyword',
        begin: '^dsconfig',
        end: /\s/,
        excludeEnd: true,
        relevance: 10
      },
      {
        className: 'built_in',
        begin: /(list|create|get|set|delete)-(\w+)/,
        end: /\s/,
        excludeEnd: true,
        illegal: '!@#$%^&*()',
        relevance: 10
      },
      {
        className: 'built_in',
        begin: /--(\w+)/,
        end: /\s/,
        excludeEnd: true
      },
      QUOTED_PROPERTY,
      APOS_PROPERTY,
      UNQUOTED_PROPERTY,
      VALUELESS_PROPERTY,
      hljs.HASH_COMMENT_MODE
    ]
  };
}

module.exports = dsconfig;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/dts.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/dts.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Device Tree
Description: *.dts files used in the Linux kernel
Author: Martin Braun <martin.braun@ettus.com>, Moritz Fischer <moritz.fischer@ettus.com>
Website: https://elinux.org/Device_Tree_Reference
Category: config
*/

/** @type LanguageFn */
function dts(hljs) {
  const STRINGS = {
    className: 'string',
    variants: [
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        begin: '((u8?|U)|L)?"'
      }),
      {
        begin: '(u8?|U)?R"',
        end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: '\'\\\\?.',
        end: '\'',
        illegal: '.'
      }
    ]
  };

  const NUMBERS = {
    className: 'number',
    variants: [
      {
        begin: '\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)'
      },
      {
        begin: hljs.C_NUMBER_RE
      }
    ],
    relevance: 0
  };

  const PREPROCESSOR = {
    className: 'meta',
    begin: '#',
    end: '$',
    keywords: {
      'meta-keyword': 'if else elif endif define undef ifdef ifndef'
    },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      {
        beginKeywords: 'include',
        end: '$',
        keywords: {
          'meta-keyword': 'include'
        },
        contains: [
          hljs.inherit(STRINGS, {
            className: 'meta-string'
          }),
          {
            className: 'meta-string',
            begin: '<',
            end: '>',
            illegal: '\\n'
          }
        ]
      },
      STRINGS,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  const DTS_REFERENCE = {
    className: 'variable',
    begin: /&[a-z\d_]*\b/
  };

  const DTS_KEYWORD = {
    className: 'meta-keyword',
    begin: '/[a-z][a-z\\d-]*/'
  };

  const DTS_LABEL = {
    className: 'symbol',
    begin: '^\\s*[a-zA-Z_][a-zA-Z\\d_]*:'
  };

  const DTS_CELL_PROPERTY = {
    className: 'params',
    begin: '<',
    end: '>',
    contains: [
      NUMBERS,
      DTS_REFERENCE
    ]
  };

  const DTS_NODE = {
    className: 'class',
    begin: /[a-zA-Z_][a-zA-Z\d_@]*\s\{/,
    end: /[{;=]/,
    returnBegin: true,
    excludeEnd: true
  };

  const DTS_ROOT_NODE = {
    className: 'class',
    begin: '/\\s*\\{',
    end: /\};/,
    relevance: 10,
    contains: [
      DTS_REFERENCE,
      DTS_KEYWORD,
      DTS_LABEL,
      DTS_NODE,
      DTS_CELL_PROPERTY,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      NUMBERS,
      STRINGS
    ]
  };

  return {
    name: 'Device Tree',
    keywords: "",
    contains: [
      DTS_ROOT_NODE,
      DTS_REFERENCE,
      DTS_KEYWORD,
      DTS_LABEL,
      DTS_NODE,
      DTS_CELL_PROPERTY,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      NUMBERS,
      STRINGS,
      PREPROCESSOR,
      {
        begin: hljs.IDENT_RE + '::',
        keywords: ""
      }
    ]
  };
}

module.exports = dts;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/dust.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/dust.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Dust
Requires: xml.js
Author: Michael Allen <michael.allen@benefitfocus.com>
Description: Matcher for dust.js templates.
Website: https://www.dustjs.com
Category: template
*/

/** @type LanguageFn */
function dust(hljs) {
  const EXPRESSION_KEYWORDS = 'if eq ne lt lte gt gte select default math sep';
  return {
    name: 'Dust',
    aliases: ['dst'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      {
        className: 'template-tag',
        begin: /\{[#\/]/,
        end: /\}/,
        illegal: /;/,
        contains: [{
          className: 'name',
          begin: /[a-zA-Z\.-]+/,
          starts: {
            endsWithParent: true,
            relevance: 0,
            contains: [hljs.QUOTE_STRING_MODE]
          }
        }]
      },
      {
        className: 'template-variable',
        begin: /\{/,
        end: /\}/,
        illegal: /;/,
        keywords: EXPRESSION_KEYWORDS
      }
    ]
  };
}

module.exports = dust;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/ebnf.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/ebnf.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Extended Backus-Naur Form
Author: Alex McKibben <alex@nullscope.net>
Website: https://en.wikipedia.org/wiki/Extended_Backus–Naur_form
*/

/** @type LanguageFn */
function ebnf(hljs) {
  const commentMode = hljs.COMMENT(/\(\*/, /\*\)/);

  const nonTerminalMode = {
    className: "attribute",
    begin: /^[ ]*[a-zA-Z][a-zA-Z_-]*([\s_-]+[a-zA-Z][a-zA-Z]*)*/
  };

  const specialSequenceMode = {
    className: "meta",
    begin: /\?.*\?/
  };

  const ruleBodyMode = {
    begin: /=/,
    end: /[.;]/,
    contains: [
      commentMode,
      specialSequenceMode,
      {
        // terminals
        className: 'string',
        variants: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          {
            begin: '`',
            end: '`'
          }
        ]
      }
    ]
  };

  return {
    name: 'Extended Backus-Naur Form',
    illegal: /\S/,
    contains: [
      commentMode,
      nonTerminalMode,
      ruleBodyMode
    ]
  };
}

module.exports = ebnf;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/elixir.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/elixir.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Elixir
Author: Josh Adams <josh@isotope11.com>
Description: language definition for Elixir source code files (.ex and .exs).  Based on ruby language support.
Category: functional
Website: https://elixir-lang.org
*/

/** @type LanguageFn */
function elixir(hljs) {
  const ELIXIR_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?';
  const ELIXIR_METHOD_RE = '[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?';
  const ELIXIR_KEYWORDS = {
    $pattern: ELIXIR_IDENT_RE,
    keyword: 'and false then defined module in return redo retry end for true self when ' +
    'next until do begin unless nil break not case cond alias while ensure or ' +
    'include use alias fn quote require import with|0'
  };
  const SUBST = {
    className: 'subst',
    begin: /#\{/,
    end: /\}/,
    keywords: ELIXIR_KEYWORDS
  };
  const NUMBER = {
    className: 'number',
    begin: '(\\b0o[0-7_]+)|(\\b0b[01_]+)|(\\b0x[0-9a-fA-F_]+)|(-?\\b[1-9][0-9_]*(.[0-9_]+([eE][-+]?[0-9]+)?)?)',
    relevance: 0
  };
  const SIGIL_DELIMITERS = '[/|([{<"\']';
  const LOWERCASE_SIGIL = {
    className: 'string',
    begin: '~[a-z]' + '(?=' + SIGIL_DELIMITERS + ')',
    contains: [
      {
        endsParent: true,
        contains: [
          {
            contains: [
              hljs.BACKSLASH_ESCAPE,
              SUBST
            ],
            variants: [
              {
                begin: /"/,
                end: /"/
              },
              {
                begin: /'/,
                end: /'/
              },
              {
                begin: /\//,
                end: /\//
              },
              {
                begin: /\|/,
                end: /\|/
              },
              {
                begin: /\(/,
                end: /\)/
              },
              {
                begin: /\[/,
                end: /\]/
              },
              {
                begin: /\{/,
                end: /\}/
              },
              {
                begin: /</,
                end: />/
              }
            ]
          }
        ]
      }
    ]
  };

  const UPCASE_SIGIL = {
    className: 'string',
    begin: '~[A-Z]' + '(?=' + SIGIL_DELIMITERS + ')',
    contains: [
      {
        begin: /"/,
        end: /"/
      },
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /\//,
        end: /\//
      },
      {
        begin: /\|/,
        end: /\|/
      },
      {
        begin: /\(/,
        end: /\)/
      },
      {
        begin: /\[/,
        end: /\]/
      },
      {
        begin: /\{/,
        end: /\}/
      },
      {
        begin: /</,
        end: />/
      }
    ]
  };

  const STRING = {
    className: 'string',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ],
    variants: [
      {
        begin: /"""/,
        end: /"""/
      },
      {
        begin: /'''/,
        end: /'''/
      },
      {
        begin: /~S"""/,
        end: /"""/,
        contains: []
      },
      {
        begin: /~S"/,
        end: /"/,
        contains: []
      },
      {
        begin: /~S'''/,
        end: /'''/,
        contains: []
      },
      {
        begin: /~S'/,
        end: /'/,
        contains: []
      },
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /"/,
        end: /"/
      }
    ]
  };
  const FUNCTION = {
    className: 'function',
    beginKeywords: 'def defp defmacro',
    end: /\B\b/, // the mode is ended by the title
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {
        begin: ELIXIR_IDENT_RE,
        endsParent: true
      })
    ]
  };
  const CLASS = hljs.inherit(FUNCTION, {
    className: 'class',
    beginKeywords: 'defimpl defmodule defprotocol defrecord',
    end: /\bdo\b|$|;/
  });
  const ELIXIR_DEFAULT_CONTAINS = [
    STRING,
    UPCASE_SIGIL,
    LOWERCASE_SIGIL,
    hljs.HASH_COMMENT_MODE,
    CLASS,
    FUNCTION,
    {
      begin: '::'
    },
    {
      className: 'symbol',
      begin: ':(?![\\s:])',
      contains: [
        STRING,
        {
          begin: ELIXIR_METHOD_RE
        }
      ],
      relevance: 0
    },
    {
      className: 'symbol',
      begin: ELIXIR_IDENT_RE + ':(?!:)',
      relevance: 0
    },
    NUMBER,
    {
      className: 'variable',
      begin: '(\\$\\W)|((\\$|@@?)(\\w+))'
    },
    {
      begin: '->'
    },
    { // regexp container
      begin: '(' + hljs.RE_STARTERS_RE + ')\\s*',
      contains: [
        hljs.HASH_COMMENT_MODE,
        {
          // to prevent false regex triggers for the division function:
          // /:
          begin: /\/: (?=\d+\s*[,\]])/,
          relevance: 0,
          contains: [NUMBER]
        },
        {
          className: 'regexp',
          illegal: '\\n',
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST
          ],
          variants: [
            {
              begin: '/',
              end: '/[a-z]*'
            },
            {
              begin: '%r\\[',
              end: '\\][a-z]*'
            }
          ]
        }
      ],
      relevance: 0
    }
  ];
  SUBST.contains = ELIXIR_DEFAULT_CONTAINS;

  return {
    name: 'Elixir',
    keywords: ELIXIR_KEYWORDS,
    contains: ELIXIR_DEFAULT_CONTAINS
  };
}

module.exports = elixir;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/elm.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/elm.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Elm
Author: Janis Voigtlaender <janis.voigtlaender@gmail.com>
Website: https://elm-lang.org
Category: functional
*/

/** @type LanguageFn */
function elm(hljs) {
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

  const CONSTRUCTOR = {
    className: 'type',
    begin: '\\b[A-Z][\\w\']*', // TODO: other constructors (built-in, infix).
    relevance: 0
  };

  const LIST = {
    begin: '\\(',
    end: '\\)',
    illegal: '"',
    contains: [
      {
        className: 'type',
        begin: '\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?'
      },
      COMMENT
    ]
  };

  const RECORD = {
    begin: /\{/,
    end: /\}/,
    contains: LIST.contains
  };

  const CHARACTER = {
    className: 'string',
    begin: '\'\\\\?.',
    end: '\'',
    illegal: '.'
  };

  return {
    name: 'Elm',
    keywords:
      'let in if then else case of where module import exposing ' +
      'type alias as infix infixl infixr port effect command subscription',
    contains: [

      // Top-level constructions.

      {
        beginKeywords: 'port effect module',
        end: 'exposing',
        keywords: 'port effect module where command subscription exposing',
        contains: [
          LIST,
          COMMENT
        ],
        illegal: '\\W\\.|;'
      },
      {
        begin: 'import',
        end: '$',
        keywords: 'import as exposing',
        contains: [
          LIST,
          COMMENT
        ],
        illegal: '\\W\\.|;'
      },
      {
        begin: 'type',
        end: '$',
        keywords: 'type alias',
        contains: [
          CONSTRUCTOR,
          LIST,
          RECORD,
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
        begin: 'port',
        end: '$',
        keywords: 'port',
        contains: [COMMENT]
      },

      // Literals and names.

      CHARACTER,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      CONSTRUCTOR,
      hljs.inherit(hljs.TITLE_MODE, {
        begin: '^[_a-z][\\w\']*'
      }),
      COMMENT,

      {
        begin: '->|<-'
      } // No markup, relevance booster
    ],
    illegal: /;/
  };
}

module.exports = elm;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/erb.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/erb.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: ERB (Embedded Ruby)
Requires: xml.js, ruby.js
Author: Lucas Mazza <lucastmazza@gmail.com>
Contributors: Kassio Borges <kassioborgesm@gmail.com>
Description: "Bridge" language defining fragments of Ruby in HTML within <% .. %>
Website: https://ruby-doc.org/stdlib-2.6.5/libdoc/erb/rdoc/ERB.html
Category: template
*/

/** @type LanguageFn */
function erb(hljs) {
  return {
    name: 'ERB',
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT('<%#', '%>'),
      {
        begin: '<%[%=-]?',
        end: '[%-]?%>',
        subLanguage: 'ruby',
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };
}

module.exports = erb;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/erlang-repl.js":
/*!**************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/erlang-repl.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Erlang REPL
Author: Sergey Ignatov <sergey@ignatov.spb.su>
Website: https://www.erlang.org
Category: functional
*/

/** @type LanguageFn */
function erlangRepl(hljs) {
  return {
    name: 'Erlang REPL',
    keywords: {
      built_in:
        'spawn spawn_link self',
      keyword:
        'after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if ' +
        'let not of or orelse|10 query receive rem try when xor'
    },
    contains: [
      {
        className: 'meta',
        begin: '^[0-9]+> ',
        relevance: 10
      },
      hljs.COMMENT('%', '$'),
      {
        className: 'number',
        begin: '\\b(\\d+(_\\d+)*#[a-fA-F0-9]+(_[a-fA-F0-9]+)*|\\d+(_\\d+)*(\\.\\d+(_\\d+)*)?([eE][-+]?\\d+)?)',
        relevance: 0
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        begin: '\\?(::)?([A-Z]\\w*(::)?)+'
      },
      {
        begin: '->'
      },
      {
        begin: 'ok'
      },
      {
        begin: '!'
      },
      {
        begin: '(\\b[a-z\'][a-zA-Z0-9_\']*:[a-z\'][a-zA-Z0-9_\']*)|(\\b[a-z\'][a-zA-Z0-9_\']*)',
        relevance: 0
      },
      {
        begin: '[A-Z][a-zA-Z0-9_\']*',
        relevance: 0
      }
    ]
  };
}

module.exports = erlangRepl;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/erlang.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/erlang.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Erlang
Description: Erlang is a general-purpose functional language, with strict evaluation, single assignment, and dynamic typing.
Author: Nikolay Zakharov <nikolay.desh@gmail.com>, Dmitry Kovega <arhibot@gmail.com>
Website: https://www.erlang.org
Category: functional
*/

/** @type LanguageFn */
function erlang(hljs) {
  const BASIC_ATOM_RE = '[a-z\'][a-zA-Z0-9_\']*';
  const FUNCTION_NAME_RE = '(' + BASIC_ATOM_RE + ':' + BASIC_ATOM_RE + '|' + BASIC_ATOM_RE + ')';
  const ERLANG_RESERVED = {
    keyword:
      'after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if ' +
      'let not of orelse|10 query receive rem try when xor',
    literal:
      'false true'
  };

  const COMMENT = hljs.COMMENT('%', '$');
  const NUMBER = {
    className: 'number',
    begin: '\\b(\\d+(_\\d+)*#[a-fA-F0-9]+(_[a-fA-F0-9]+)*|\\d+(_\\d+)*(\\.\\d+(_\\d+)*)?([eE][-+]?\\d+)?)',
    relevance: 0
  };
  const NAMED_FUN = {
    begin: 'fun\\s+' + BASIC_ATOM_RE + '/\\d+'
  };
  const FUNCTION_CALL = {
    begin: FUNCTION_NAME_RE + '\\(',
    end: '\\)',
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        begin: FUNCTION_NAME_RE,
        relevance: 0
      },
      {
        begin: '\\(',
        end: '\\)',
        endsWithParent: true,
        returnEnd: true,
        relevance: 0
        // "contains" defined later
      }
    ]
  };
  const TUPLE = {
    begin: /\{/,
    end: /\}/,
    relevance: 0
    // "contains" defined later
  };
  const VAR1 = {
    begin: '\\b_([A-Z][A-Za-z0-9_]*)?',
    relevance: 0
  };
  const VAR2 = {
    begin: '[A-Z][a-zA-Z0-9_]*',
    relevance: 0
  };
  const RECORD_ACCESS = {
    begin: '#' + hljs.UNDERSCORE_IDENT_RE,
    relevance: 0,
    returnBegin: true,
    contains: [
      {
        begin: '#' + hljs.UNDERSCORE_IDENT_RE,
        relevance: 0
      },
      {
        begin: /\{/,
        end: /\}/,
        relevance: 0
        // "contains" defined later
      }
    ]
  };

  const BLOCK_STATEMENTS = {
    beginKeywords: 'fun receive if try case',
    end: 'end',
    keywords: ERLANG_RESERVED
  };
  BLOCK_STATEMENTS.contains = [
    COMMENT,
    NAMED_FUN,
    hljs.inherit(hljs.APOS_STRING_MODE, {
      className: ''
    }),
    BLOCK_STATEMENTS,
    FUNCTION_CALL,
    hljs.QUOTE_STRING_MODE,
    NUMBER,
    TUPLE,
    VAR1,
    VAR2,
    RECORD_ACCESS
  ];

  const BASIC_MODES = [
    COMMENT,
    NAMED_FUN,
    BLOCK_STATEMENTS,
    FUNCTION_CALL,
    hljs.QUOTE_STRING_MODE,
    NUMBER,
    TUPLE,
    VAR1,
    VAR2,
    RECORD_ACCESS
  ];
  FUNCTION_CALL.contains[1].contains = BASIC_MODES;
  TUPLE.contains = BASIC_MODES;
  RECORD_ACCESS.contains[1].contains = BASIC_MODES;

  const PARAMS = {
    className: 'params',
    begin: '\\(',
    end: '\\)',
    contains: BASIC_MODES
  };
  return {
    name: 'Erlang',
    aliases: ['erl'],
    keywords: ERLANG_RESERVED,
    illegal: '(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))',
    contains: [
      {
        className: 'function',
        begin: '^' + BASIC_ATOM_RE + '\\s*\\(',
        end: '->',
        returnBegin: true,
        illegal: '\\(|#|//|/\\*|\\\\|:|;',
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, {
            begin: BASIC_ATOM_RE
          })
        ],
        starts: {
          end: ';|\\.',
          keywords: ERLANG_RESERVED,
          contains: BASIC_MODES
        }
      },
      COMMENT,
      {
        begin: '^-',
        end: '\\.',
        relevance: 0,
        excludeEnd: true,
        returnBegin: true,
        keywords: {
          $pattern: '-' + hljs.IDENT_RE,
          keyword: '-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn ' +
          '-import -include -include_lib -compile -define -else -endif -file -behaviour ' +
          '-behavior -spec'
        },
        contains: [PARAMS]
      },
      NUMBER,
      hljs.QUOTE_STRING_MODE,
      RECORD_ACCESS,
      VAR1,
      VAR2,
      TUPLE,
      {
        begin: /\.$/
      } // relevance booster
    ]
  };
}

module.exports = erlang;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/excel.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/excel.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Excel formulae
Author: Victor Zhou <OiCMudkips@users.noreply.github.com>
Description: Excel formulae
Website: https://products.office.com/en-us/excel/
*/

/** @type LanguageFn */
function excel(hljs) {
  return {
    name: 'Excel formulae',
    aliases: [
      'xlsx',
      'xls'
    ],
    case_insensitive: true,
    // built-in functions imported from https://web.archive.org/web/20160513042710/https://support.office.com/en-us/article/Excel-functions-alphabetical-b3944572-255d-4efb-bb96-c6d90033e188
    keywords: {
      $pattern: /[a-zA-Z][\w\.]*/,
      built_in: 'ABS ACCRINT ACCRINTM ACOS ACOSH ACOT ACOTH AGGREGATE ADDRESS AMORDEGRC AMORLINC AND ARABIC AREAS ASC ASIN ASINH ATAN ATAN2 ATANH AVEDEV AVERAGE AVERAGEA AVERAGEIF AVERAGEIFS BAHTTEXT BASE BESSELI BESSELJ BESSELK BESSELY BETADIST BETA.DIST BETAINV BETA.INV BIN2DEC BIN2HEX BIN2OCT BINOMDIST BINOM.DIST BINOM.DIST.RANGE BINOM.INV BITAND BITLSHIFT BITOR BITRSHIFT BITXOR CALL CEILING CEILING.MATH CEILING.PRECISE CELL CHAR CHIDIST CHIINV CHITEST CHISQ.DIST CHISQ.DIST.RT CHISQ.INV CHISQ.INV.RT CHISQ.TEST CHOOSE CLEAN CODE COLUMN COLUMNS COMBIN COMBINA COMPLEX CONCAT CONCATENATE CONFIDENCE CONFIDENCE.NORM CONFIDENCE.T CONVERT CORREL COS COSH COT COTH COUNT COUNTA COUNTBLANK COUNTIF COUNTIFS COUPDAYBS COUPDAYS COUPDAYSNC COUPNCD COUPNUM COUPPCD COVAR COVARIANCE.P COVARIANCE.S CRITBINOM CSC CSCH CUBEKPIMEMBER CUBEMEMBER CUBEMEMBERPROPERTY CUBERANKEDMEMBER CUBESET CUBESETCOUNT CUBEVALUE CUMIPMT CUMPRINC DATE DATEDIF DATEVALUE DAVERAGE DAY DAYS DAYS360 DB DBCS DCOUNT DCOUNTA DDB DEC2BIN DEC2HEX DEC2OCT DECIMAL DEGREES DELTA DEVSQ DGET DISC DMAX DMIN DOLLAR DOLLARDE DOLLARFR DPRODUCT DSTDEV DSTDEVP DSUM DURATION DVAR DVARP EDATE EFFECT ENCODEURL EOMONTH ERF ERF.PRECISE ERFC ERFC.PRECISE ERROR.TYPE EUROCONVERT EVEN EXACT EXP EXPON.DIST EXPONDIST FACT FACTDOUBLE FALSE|0 F.DIST FDIST F.DIST.RT FILTERXML FIND FINDB F.INV F.INV.RT FINV FISHER FISHERINV FIXED FLOOR FLOOR.MATH FLOOR.PRECISE FORECAST FORECAST.ETS FORECAST.ETS.CONFINT FORECAST.ETS.SEASONALITY FORECAST.ETS.STAT FORECAST.LINEAR FORMULATEXT FREQUENCY F.TEST FTEST FV FVSCHEDULE GAMMA GAMMA.DIST GAMMADIST GAMMA.INV GAMMAINV GAMMALN GAMMALN.PRECISE GAUSS GCD GEOMEAN GESTEP GETPIVOTDATA GROWTH HARMEAN HEX2BIN HEX2DEC HEX2OCT HLOOKUP HOUR HYPERLINK HYPGEOM.DIST HYPGEOMDIST IF IFERROR IFNA IFS IMABS IMAGINARY IMARGUMENT IMCONJUGATE IMCOS IMCOSH IMCOT IMCSC IMCSCH IMDIV IMEXP IMLN IMLOG10 IMLOG2 IMPOWER IMPRODUCT IMREAL IMSEC IMSECH IMSIN IMSINH IMSQRT IMSUB IMSUM IMTAN INDEX INDIRECT INFO INT INTERCEPT INTRATE IPMT IRR ISBLANK ISERR ISERROR ISEVEN ISFORMULA ISLOGICAL ISNA ISNONTEXT ISNUMBER ISODD ISREF ISTEXT ISO.CEILING ISOWEEKNUM ISPMT JIS KURT LARGE LCM LEFT LEFTB LEN LENB LINEST LN LOG LOG10 LOGEST LOGINV LOGNORM.DIST LOGNORMDIST LOGNORM.INV LOOKUP LOWER MATCH MAX MAXA MAXIFS MDETERM MDURATION MEDIAN MID MIDBs MIN MINIFS MINA MINUTE MINVERSE MIRR MMULT MOD MODE MODE.MULT MODE.SNGL MONTH MROUND MULTINOMIAL MUNIT N NA NEGBINOM.DIST NEGBINOMDIST NETWORKDAYS NETWORKDAYS.INTL NOMINAL NORM.DIST NORMDIST NORMINV NORM.INV NORM.S.DIST NORMSDIST NORM.S.INV NORMSINV NOT NOW NPER NPV NUMBERVALUE OCT2BIN OCT2DEC OCT2HEX ODD ODDFPRICE ODDFYIELD ODDLPRICE ODDLYIELD OFFSET OR PDURATION PEARSON PERCENTILE.EXC PERCENTILE.INC PERCENTILE PERCENTRANK.EXC PERCENTRANK.INC PERCENTRANK PERMUT PERMUTATIONA PHI PHONETIC PI PMT POISSON.DIST POISSON POWER PPMT PRICE PRICEDISC PRICEMAT PROB PRODUCT PROPER PV QUARTILE QUARTILE.EXC QUARTILE.INC QUOTIENT RADIANS RAND RANDBETWEEN RANK.AVG RANK.EQ RANK RATE RECEIVED REGISTER.ID REPLACE REPLACEB REPT RIGHT RIGHTB ROMAN ROUND ROUNDDOWN ROUNDUP ROW ROWS RRI RSQ RTD SEARCH SEARCHB SEC SECH SECOND SERIESSUM SHEET SHEETS SIGN SIN SINH SKEW SKEW.P SLN SLOPE SMALL SQL.REQUEST SQRT SQRTPI STANDARDIZE STDEV STDEV.P STDEV.S STDEVA STDEVP STDEVPA STEYX SUBSTITUTE SUBTOTAL SUM SUMIF SUMIFS SUMPRODUCT SUMSQ SUMX2MY2 SUMX2PY2 SUMXMY2 SWITCH SYD T TAN TANH TBILLEQ TBILLPRICE TBILLYIELD T.DIST T.DIST.2T T.DIST.RT TDIST TEXT TEXTJOIN TIME TIMEVALUE T.INV T.INV.2T TINV TODAY TRANSPOSE TREND TRIM TRIMMEAN TRUE|0 TRUNC T.TEST TTEST TYPE UNICHAR UNICODE UPPER VALUE VAR VAR.P VAR.S VARA VARP VARPA VDB VLOOKUP WEBSERVICE WEEKDAY WEEKNUM WEIBULL WEIBULL.DIST WORKDAY WORKDAY.INTL XIRR XNPV XOR YEAR YEARFRAC YIELD YIELDDISC YIELDMAT Z.TEST ZTEST'
    },
    contains: [
      {
        /* matches a beginning equal sign found in Excel formula examples */
        begin: /^=/,
        end: /[^=]/,
        returnEnd: true,
        illegal: /=/, /* only allow single equal sign at front of line */
        relevance: 10
      },
      /* technically, there can be more than 2 letters in column names, but this prevents conflict with some keywords */
      {
        /* matches a reference to a single cell */
        className: 'symbol',
        begin: /\b[A-Z]{1,2}\d+\b/,
        end: /[^\d]/,
        excludeEnd: true,
        relevance: 0
      },
      {
        /* matches a reference to a range of cells */
        className: 'symbol',
        begin: /[A-Z]{0,2}\d*:[A-Z]{0,2}\d*/,
        relevance: 0
      },
      hljs.BACKSLASH_ESCAPE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'number',
        begin: hljs.NUMBER_RE + '(%)?',
        relevance: 0
      },
      /* Excel formula comments are done by putting the comment in a function call to N() */
      hljs.COMMENT(/\bN\(/, /\)/,
        {
          excludeBegin: true,
          excludeEnd: true,
          illegal: /\n/
        })
    ]
  };
}

module.exports = excel;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/fix.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/fix.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: FIX
Author: Brent Bradbury <brent@brentium.com>
*/

/** @type LanguageFn */
function fix(hljs) {
  return {
    name: 'FIX',
    contains: [{
      begin: /[^\u2401\u0001]+/,
      end: /[\u2401\u0001]/,
      excludeEnd: true,
      returnBegin: true,
      returnEnd: false,
      contains: [
        {
          begin: /([^\u2401\u0001=]+)/,
          end: /=([^\u2401\u0001=]+)/,
          returnEnd: true,
          returnBegin: false,
          className: 'attr'
        },
        {
          begin: /=/,
          end: /([\u2401\u0001])/,
          excludeEnd: true,
          excludeBegin: true,
          className: 'string'
        }
      ]
    }],
    case_insensitive: true
  };
}

module.exports = fix;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/flix.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/flix.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 Language: Flix
 Category: functional
 Author: Magnus Madsen <mmadsen@uwaterloo.ca>
 Website: https://flix.dev/
 */

 /** @type LanguageFn */
function flix(hljs) {
  const CHAR = {
    className: 'string',
    begin: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
  };

  const STRING = {
    className: 'string',
    variants: [{
      begin: '"',
      end: '"'
    }]
  };

  const NAME = {
    className: 'title',
    begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/
  };

  const METHOD = {
    className: 'function',
    beginKeywords: 'def',
    end: /[:={\[(\n;]/,
    excludeEnd: true,
    contains: [NAME]
  };

  return {
    name: 'Flix',
    keywords: {
      literal: 'true false',
      keyword: 'case class def else enum if impl import in lat rel index let match namespace switch type yield with'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      CHAR,
      STRING,
      METHOD,
      hljs.C_NUMBER_MODE
    ]
  };
}

module.exports = flix;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/fortran.js":
/*!**********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/fortran.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Fortran
Author: Anthony Scemama <scemama@irsamc.ups-tlse.fr>
Website: https://en.wikipedia.org/wiki/Fortran
Category: scientific
*/

/** @type LanguageFn */
function fortran(hljs) {
  const PARAMS = {
    className: 'params',
    begin: '\\(',
    end: '\\)'
  };

  const COMMENT = {
    variants: [
      hljs.COMMENT('!', '$', {
        relevance: 0
      }),
      // allow FORTRAN 77 style comments
      hljs.COMMENT('^C[ ]', '$', {
        relevance: 0
      }),
      hljs.COMMENT('^C$', '$', {
        relevance: 0
      })
    ]
  };

  const NUMBER = {
    className: 'number',
    // regex in both fortran and irpf90 should match
    begin: '(?=\\b|\\+|-|\\.)(?:\\.|\\d+\\.?)\\d*([de][+-]?\\d+)?(_[a-z_\\d]+)?',
    relevance: 0
  };

  const FUNCTION_DEF = {
    className: 'function',
    beginKeywords: 'subroutine function program',
    illegal: '[${=\\n]',
    contains: [
      hljs.UNDERSCORE_TITLE_MODE,
      PARAMS
    ]
  };

  const STRING = {
    className: 'string',
    relevance: 0,
    variants: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  const KEYWORDS = {
    literal: '.False. .True.',
    keyword: 'kind do concurrent local shared while private call intrinsic where elsewhere ' +
      'type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then block endblock endassociate ' +
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
      'pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure impure ' +
      'integer real character complex logical codimension dimension allocatable|10 parameter ' +
      'external implicit|10 none double precision assign intent optional pointer ' +
      'target in out common equivalence data',
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
      'num_images parity popcnt poppar shifta shiftl shiftr this_image sync change team co_broadcast co_max co_min co_sum co_reduce'
  };
  return {
    name: 'Fortran',
    case_insensitive: true,
    aliases: [
      'f90',
      'f95'
    ],
    keywords: KEYWORDS,
    illegal: /\/\*/,
    contains: [
      STRING,
      FUNCTION_DEF,
      // allow `C = value` for assignments so they aren't misdetected
      // as Fortran 77 style comments
      {
        begin: /^C\s*=(?!=)/,
        relevance: 0
      },
      COMMENT,
      NUMBER
    ]
  };
}

module.exports = fortran;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/fsharp.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/fsharp.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: F#
Author: Jonas Follesø <jonas@follesoe.no>
Contributors: Troy Kershaw <hello@troykershaw.com>, Henrik Feldt <henrik@haf.se>
Website: https://docs.microsoft.com/en-us/dotnet/fsharp/
Category: functional
*/

/** @type LanguageFn */
function fsharp(hljs) {
  const TYPEPARAM = {
    begin: '<',
    end: '>',
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {
        begin: /'[a-zA-Z0-9_]+/
      })
    ]
  };

  return {
    name: 'F#',
    aliases: ['fs'],
    keywords:
      'abstract and as assert base begin class default delegate do done ' +
      'downcast downto elif else end exception extern false finally for ' +
      'fun function global if in inherit inline interface internal lazy let ' +
      'match member module mutable namespace new null of open or ' +
      'override private public rec return sig static struct then to ' +
      'true try type upcast use val void when while with yield',
    illegal: /\/\*/,
    contains: [
      {
        // monad builder keywords (matches before non-bang kws)
        className: 'keyword',
        begin: /\b(yield|return|let|do)!/
      },
      {
        className: 'string',
        begin: '@"',
        end: '"',
        contains: [
          {
            begin: '""'
          }
        ]
      },
      {
        className: 'string',
        begin: '"""',
        end: '"""'
      },
      hljs.COMMENT('\\(\\*(\\s)', '\\*\\)', {
        contains: ["self"]
      }),
      {
        className: 'class',
        beginKeywords: 'type',
        end: '\\(|=|$',
        excludeEnd: true,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          TYPEPARAM
        ]
      },
      {
        className: 'meta',
        begin: '\\[<',
        end: '>\\]',
        relevance: 10
      },
      {
        className: 'symbol',
        begin: '\\B(\'[A-Za-z])\\b',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        illegal: null
      }),
      hljs.C_NUMBER_MODE
    ]
  };
}

module.exports = fsharp;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/gams.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/gams.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 Language: GAMS
 Author: Stefan Bechert <stefan.bechert@gmx.net>
 Contributors: Oleg Efimov <efimovov@gmail.com>, Mikko Kouhia <mikko.kouhia@iki.fi>
 Description: The General Algebraic Modeling System language
 Website: https://www.gams.com
 Category: scientific
 */

function gams(hljs) {
  const KEYWORDS = {
    keyword:
      'abort acronym acronyms alias all and assign binary card diag display ' +
      'else eq file files for free ge gt if integer le loop lt maximizing ' +
      'minimizing model models ne negative no not option options or ord ' +
      'positive prod put putpage puttl repeat sameas semicont semiint smax ' +
      'smin solve sos1 sos2 sum system table then until using while xor yes',
    literal:
      'eps inf na',
    built_in:
      'abs arccos arcsin arctan arctan2 Beta betaReg binomial ceil centropy ' +
      'cos cosh cvPower div div0 eDist entropy errorf execSeed exp fact ' +
      'floor frac gamma gammaReg log logBeta logGamma log10 log2 mapVal max ' +
      'min mod ncpCM ncpF ncpVUpow ncpVUsin normal pi poly power ' +
      'randBinomial randLinear randTriangle round rPower sigmoid sign ' +
      'signPower sin sinh slexp sllog10 slrec sqexp sqlog10 sqr sqrec sqrt ' +
      'tan tanh trunc uniform uniformInt vcPower bool_and bool_eqv bool_imp ' +
      'bool_not bool_or bool_xor ifThen rel_eq rel_ge rel_gt rel_le rel_lt ' +
      'rel_ne gday gdow ghour gleap gmillisec gminute gmonth gsecond gyear ' +
      'jdate jnow jstart jtime errorLevel execError gamsRelease gamsVersion ' +
      'handleCollect handleDelete handleStatus handleSubmit heapFree ' +
      'heapLimit heapSize jobHandle jobKill jobStatus jobTerminate ' +
      'licenseLevel licenseStatus maxExecError sleep timeClose timeComp ' +
      'timeElapsed timeExec timeStart'
  };
  const PARAMS = {
    className: 'params',
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true
  };
  const SYMBOLS = {
    className: 'symbol',
    variants: [
      {
        begin: /=[lgenxc]=/
      },
      {
        begin: /\$/
      }
    ]
  };
  const QSTR = { // One-line quoted comment string
    className: 'comment',
    variants: [
      {
        begin: '\'',
        end: '\''
      },
      {
        begin: '"',
        end: '"'
      }
    ],
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  const ASSIGNMENT = {
    begin: '/',
    end: '/',
    keywords: KEYWORDS,
    contains: [
      QSTR,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_NUMBER_MODE
    ]
  };
  const DESCTEXT = { // Parameter/set/variable description text
    begin: /[a-z][a-z0-9_]*(\([a-z0-9_, ]*\))?[ \t]+/,
    excludeBegin: true,
    end: '$',
    endsWithParent: true,
    contains: [
      QSTR,
      ASSIGNMENT,
      {
        className: 'comment',
        begin: /([ ]*[a-z0-9&#*=?@\\><:,()$[\]_.{}!+%^-]+)+/,
        relevance: 0
      }
    ]
  };

  return {
    name: 'GAMS',
    aliases: ['gms'],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [
      hljs.COMMENT(/^\$ontext/, /^\$offtext/),
      {
        className: 'meta',
        begin: '^\\$[a-z0-9]+',
        end: '$',
        returnBegin: true,
        contains: [
          {
            className: 'meta-keyword',
            begin: '^\\$[a-z0-9]+'
          }
        ]
      },
      hljs.COMMENT('^\\*', '$'),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      // Declarations
      {
        beginKeywords:
          'set sets parameter parameters variable variables ' +
          'scalar scalars equation equations',
        end: ';',
        contains: [
          hljs.COMMENT('^\\*', '$'),
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          ASSIGNMENT,
          DESCTEXT
        ]
      },
      { // table environment
        beginKeywords: 'table',
        end: ';',
        returnBegin: true,
        contains: [
          { // table header row
            beginKeywords: 'table',
            end: '$',
            contains: [DESCTEXT]
          },
          hljs.COMMENT('^\\*', '$'),
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          hljs.C_NUMBER_MODE
          // Table does not contain DESCTEXT or ASSIGNMENT
        ]
      },
      // Function definitions
      {
        className: 'function',
        begin: /^[a-z][a-z0-9_,\-+' ()$]+\.{2}/,
        returnBegin: true,
        contains: [
          { // Function title
            className: 'title',
            begin: /^[a-z0-9_]+/
          },
          PARAMS,
          SYMBOLS
        ]
      },
      hljs.C_NUMBER_MODE,
      SYMBOLS
    ]
  };
}

module.exports = gams;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/gauss.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/gauss.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: GAUSS
Author: Matt Evans <matt@aptech.com>
Description: GAUSS Mathematical and Statistical language
Website: https://www.aptech.com
Category: scientific
*/
function gauss(hljs) {
  const KEYWORDS = {
    keyword: 'bool break call callexe checkinterrupt clear clearg closeall cls comlog compile ' +
              'continue create debug declare delete disable dlibrary dllcall do dos ed edit else ' +
              'elseif enable end endfor endif endp endo errorlog errorlogat expr external fn ' +
              'for format goto gosub graph if keyword let lib library line load loadarray loadexe ' +
              'loadf loadk loadm loadp loads loadx local locate loopnextindex lprint lpwidth lshow ' +
              'matrix msym ndpclex new open output outwidth plot plotsym pop prcsn print ' +
              'printdos proc push retp return rndcon rndmod rndmult rndseed run save saveall screen ' +
              'scroll setarray show sparse stop string struct system trace trap threadfor ' +
              'threadendfor threadbegin threadjoin threadstat threadend until use while winprint ' +
              'ne ge le gt lt and xor or not eq eqv',
    built_in: 'abs acf aconcat aeye amax amean AmericanBinomCall AmericanBinomCall_Greeks AmericanBinomCall_ImpVol ' +
              'AmericanBinomPut AmericanBinomPut_Greeks AmericanBinomPut_ImpVol AmericanBSCall AmericanBSCall_Greeks ' +
              'AmericanBSCall_ImpVol AmericanBSPut AmericanBSPut_Greeks AmericanBSPut_ImpVol amin amult annotationGetDefaults ' +
              'annotationSetBkd annotationSetFont annotationSetLineColor annotationSetLineStyle annotationSetLineThickness ' +
              'annualTradingDays arccos arcsin areshape arrayalloc arrayindex arrayinit arraytomat asciiload asclabel astd ' +
              'astds asum atan atan2 atranspose axmargin balance band bandchol bandcholsol bandltsol bandrv bandsolpd bar ' +
              'base10 begwind besselj bessely beta box boxcox cdfBeta cdfBetaInv cdfBinomial cdfBinomialInv cdfBvn cdfBvn2 ' +
              'cdfBvn2e cdfCauchy cdfCauchyInv cdfChic cdfChii cdfChinc cdfChincInv cdfExp cdfExpInv cdfFc cdfFnc cdfFncInv ' +
              'cdfGam cdfGenPareto cdfHyperGeo cdfLaplace cdfLaplaceInv cdfLogistic cdfLogisticInv cdfmControlCreate cdfMvn ' +
              'cdfMvn2e cdfMvnce cdfMvne cdfMvt2e cdfMvtce cdfMvte cdfN cdfN2 cdfNc cdfNegBinomial cdfNegBinomialInv cdfNi ' +
              'cdfPoisson cdfPoissonInv cdfRayleigh cdfRayleighInv cdfTc cdfTci cdfTnc cdfTvn cdfWeibull cdfWeibullInv cdir ' +
              'ceil ChangeDir chdir chiBarSquare chol choldn cholsol cholup chrs close code cols colsf combinate combinated ' +
              'complex con cond conj cons ConScore contour conv convertsatostr convertstrtosa corrm corrms corrvc corrx corrxs ' +
              'cos cosh counts countwts crossprd crout croutp csrcol csrlin csvReadM csvReadSA cumprodc cumsumc curve cvtos ' +
              'datacreate datacreatecomplex datalist dataload dataloop dataopen datasave date datestr datestring datestrymd ' +
              'dayinyr dayofweek dbAddDatabase dbClose dbCommit dbCreateQuery dbExecQuery dbGetConnectOptions dbGetDatabaseName ' +
              'dbGetDriverName dbGetDrivers dbGetHostName dbGetLastErrorNum dbGetLastErrorText dbGetNumericalPrecPolicy ' +
              'dbGetPassword dbGetPort dbGetTableHeaders dbGetTables dbGetUserName dbHasFeature dbIsDriverAvailable dbIsOpen ' +
              'dbIsOpenError dbOpen dbQueryBindValue dbQueryClear dbQueryCols dbQueryExecPrepared dbQueryFetchAllM dbQueryFetchAllSA ' +
              'dbQueryFetchOneM dbQueryFetchOneSA dbQueryFinish dbQueryGetBoundValue dbQueryGetBoundValues dbQueryGetField ' +
              'dbQueryGetLastErrorNum dbQueryGetLastErrorText dbQueryGetLastInsertID dbQueryGetLastQuery dbQueryGetPosition ' +
              'dbQueryIsActive dbQueryIsForwardOnly dbQueryIsNull dbQueryIsSelect dbQueryIsValid dbQueryPrepare dbQueryRows ' +
              'dbQuerySeek dbQuerySeekFirst dbQuerySeekLast dbQuerySeekNext dbQuerySeekPrevious dbQuerySetForwardOnly ' +
              'dbRemoveDatabase dbRollback dbSetConnectOptions dbSetDatabaseName dbSetHostName dbSetNumericalPrecPolicy ' +
              'dbSetPort dbSetUserName dbTransaction DeleteFile delif delrows denseToSp denseToSpRE denToZero design det detl ' +
              'dfft dffti diag diagrv digamma doswin DOSWinCloseall DOSWinOpen dotfeq dotfeqmt dotfge dotfgemt dotfgt dotfgtmt ' +
              'dotfle dotflemt dotflt dotfltmt dotfne dotfnemt draw drop dsCreate dstat dstatmt dstatmtControlCreate dtdate dtday ' +
              'dttime dttodtv dttostr dttoutc dtvnormal dtvtodt dtvtoutc dummy dummybr dummydn eig eigh eighv eigv elapsedTradingDays ' +
              'endwind envget eof eqSolve eqSolvemt eqSolvemtControlCreate eqSolvemtOutCreate eqSolveset erf erfc erfccplx erfcplx error ' +
              'etdays ethsec etstr EuropeanBinomCall EuropeanBinomCall_Greeks EuropeanBinomCall_ImpVol EuropeanBinomPut ' +
              'EuropeanBinomPut_Greeks EuropeanBinomPut_ImpVol EuropeanBSCall EuropeanBSCall_Greeks EuropeanBSCall_ImpVol ' +
              'EuropeanBSPut EuropeanBSPut_Greeks EuropeanBSPut_ImpVol exctsmpl exec execbg exp extern eye fcheckerr fclearerr feq ' +
              'feqmt fflush fft ffti fftm fftmi fftn fge fgemt fgets fgetsa fgetsat fgetst fgt fgtmt fileinfo filesa fle flemt ' +
              'floor flt fltmt fmod fne fnemt fonts fopen formatcv formatnv fputs fputst fseek fstrerror ftell ftocv ftos ftostrC ' +
              'gamma gammacplx gammaii gausset gdaAppend gdaCreate gdaDStat gdaDStatMat gdaGetIndex gdaGetName gdaGetNames gdaGetOrders ' +
              'gdaGetType gdaGetTypes gdaGetVarInfo gdaIsCplx gdaLoad gdaPack gdaRead gdaReadByIndex gdaReadSome gdaReadSparse ' +
              'gdaReadStruct gdaReportVarInfo gdaSave gdaUpdate gdaUpdateAndPack gdaVars gdaWrite gdaWrite32 gdaWriteSome getarray ' +
              'getdims getf getGAUSShome getmatrix getmatrix4D getname getnamef getNextTradingDay getNextWeekDay getnr getorders ' +
              'getpath getPreviousTradingDay getPreviousWeekDay getRow getscalar3D getscalar4D getTrRow getwind glm gradcplx gradMT ' +
              'gradMTm gradMTT gradMTTm gradp graphprt graphset hasimag header headermt hess hessMT hessMTg hessMTgw hessMTm ' +
              'hessMTmw hessMTT hessMTTg hessMTTgw hessMTTm hessMTw hessp hist histf histp hsec imag indcv indexcat indices indices2 ' +
              'indicesf indicesfn indnv indsav integrate1d integrateControlCreate intgrat2 intgrat3 inthp1 inthp2 inthp3 inthp4 ' +
              'inthpControlCreate intquad1 intquad2 intquad3 intrleav intrleavsa intrsect intsimp inv invpd invswp iscplx iscplxf ' +
              'isden isinfnanmiss ismiss key keyav keyw lag lag1 lagn lapEighb lapEighi lapEighvb lapEighvi lapgEig lapgEigh lapgEighv ' +
              'lapgEigv lapgSchur lapgSvdcst lapgSvds lapgSvdst lapSvdcusv lapSvds lapSvdusv ldlp ldlsol linSolve listwise ln lncdfbvn ' +
              'lncdfbvn2 lncdfmvn lncdfn lncdfn2 lncdfnc lnfact lngammacplx lnpdfmvn lnpdfmvt lnpdfn lnpdft loadd loadstruct loadwind ' +
              'loess loessmt loessmtControlCreate log loglog logx logy lower lowmat lowmat1 ltrisol lu lusol machEpsilon make makevars ' +
              'makewind margin matalloc matinit mattoarray maxbytes maxc maxindc maxv maxvec mbesselei mbesselei0 mbesselei1 mbesseli ' +
              'mbesseli0 mbesseli1 meanc median mergeby mergevar minc minindc minv miss missex missrv moment momentd movingave ' +
              'movingaveExpwgt movingaveWgt nextindex nextn nextnevn nextwind ntos null null1 numCombinations ols olsmt olsmtControlCreate ' +
              'olsqr olsqr2 olsqrmt ones optn optnevn orth outtyp pacf packedToSp packr parse pause pdfCauchy pdfChi pdfExp pdfGenPareto ' +
              'pdfHyperGeo pdfLaplace pdfLogistic pdfn pdfPoisson pdfRayleigh pdfWeibull pi pinv pinvmt plotAddArrow plotAddBar plotAddBox ' +
              'plotAddHist plotAddHistF plotAddHistP plotAddPolar plotAddScatter plotAddShape plotAddTextbox plotAddTS plotAddXY plotArea ' +
              'plotBar plotBox plotClearLayout plotContour plotCustomLayout plotGetDefaults plotHist plotHistF plotHistP plotLayout ' +
              'plotLogLog plotLogX plotLogY plotOpenWindow plotPolar plotSave plotScatter plotSetAxesPen plotSetBar plotSetBarFill ' +
              'plotSetBarStacked plotSetBkdColor plotSetFill plotSetGrid plotSetLegend plotSetLineColor plotSetLineStyle plotSetLineSymbol ' +
              'plotSetLineThickness plotSetNewWindow plotSetTitle plotSetWhichYAxis plotSetXAxisShow plotSetXLabel plotSetXRange ' +
              'plotSetXTicInterval plotSetXTicLabel plotSetYAxisShow plotSetYLabel plotSetYRange plotSetZAxisShow plotSetZLabel ' +
              'plotSurface plotTS plotXY polar polychar polyeval polygamma polyint polymake polymat polymroot polymult polyroot ' +
              'pqgwin previousindex princomp printfm printfmt prodc psi putarray putf putvals pvCreate pvGetIndex pvGetParNames ' +
              'pvGetParVector pvLength pvList pvPack pvPacki pvPackm pvPackmi pvPacks pvPacksi pvPacksm pvPacksmi pvPutParVector ' +
              'pvTest pvUnpack QNewton QNewtonmt QNewtonmtControlCreate QNewtonmtOutCreate QNewtonSet QProg QProgmt QProgmtInCreate ' +
              'qqr qqre qqrep qr qre qrep qrsol qrtsol qtyr qtyre qtyrep quantile quantiled qyr qyre qyrep qz rank rankindx readr ' +
              'real reclassify reclassifyCuts recode recserar recsercp recserrc rerun rescale reshape rets rev rfft rffti rfftip rfftn ' +
              'rfftnp rfftp rndBernoulli rndBeta rndBinomial rndCauchy rndChiSquare rndCon rndCreateState rndExp rndGamma rndGeo rndGumbel ' +
              'rndHyperGeo rndi rndKMbeta rndKMgam rndKMi rndKMn rndKMnb rndKMp rndKMu rndKMvm rndLaplace rndLCbeta rndLCgam rndLCi rndLCn ' +
              'rndLCnb rndLCp rndLCu rndLCvm rndLogNorm rndMTu rndMVn rndMVt rndn rndnb rndNegBinomial rndp rndPoisson rndRayleigh ' +
              'rndStateSkip rndu rndvm rndWeibull rndWishart rotater round rows rowsf rref sampleData satostrC saved saveStruct savewind ' +
              'scale scale3d scalerr scalinfnanmiss scalmiss schtoc schur searchsourcepath seekr select selif seqa seqm setdif setdifsa ' +
              'setvars setvwrmode setwind shell shiftr sin singleindex sinh sleep solpd sortc sortcc sortd sorthc sorthcc sortind ' +
              'sortindc sortmc sortr sortrc spBiconjGradSol spChol spConjGradSol spCreate spDenseSubmat spDiagRvMat spEigv spEye spLDL ' +
              'spline spLU spNumNZE spOnes spreadSheetReadM spreadSheetReadSA spreadSheetWrite spScale spSubmat spToDense spTrTDense ' +
              'spTScalar spZeros sqpSolve sqpSolveMT sqpSolveMTControlCreate sqpSolveMTlagrangeCreate sqpSolveMToutCreate sqpSolveSet ' +
              'sqrt statements stdc stdsc stocv stof strcombine strindx strlen strput strrindx strsect strsplit strsplitPad strtodt ' +
              'strtof strtofcplx strtriml strtrimr strtrunc strtruncl strtruncpad strtruncr submat subscat substute subvec sumc sumr ' +
              'surface svd svd1 svd2 svdcusv svds svdusv sysstate tab tan tanh tempname ' +
              'time timedt timestr timeutc title tkf2eps tkf2ps tocart todaydt toeplitz token topolar trapchk ' +
              'trigamma trimr trunc type typecv typef union unionsa uniqindx uniqindxsa unique uniquesa upmat upmat1 upper utctodt ' +
              'utctodtv utrisol vals varCovMS varCovXS varget vargetl varmall varmares varput varputl vartypef vcm vcms vcx vcxs ' +
              'vec vech vecr vector vget view viewxyz vlist vnamecv volume vput vread vtypecv wait waitc walkindex where window ' +
              'writer xlabel xlsGetSheetCount xlsGetSheetSize xlsGetSheetTypes xlsMakeRange xlsReadM xlsReadSA xlsWrite xlsWriteM ' +
              'xlsWriteSA xpnd xtics xy xyz ylabel ytics zeros zeta zlabel ztics cdfEmpirical dot h5create h5open h5read h5readAttribute ' +
              'h5write h5writeAttribute ldl plotAddErrorBar plotAddSurface plotCDFEmpirical plotSetColormap plotSetContourLabels ' +
              'plotSetLegendFont plotSetTextInterpreter plotSetXTicCount plotSetYTicCount plotSetZLevels powerm strjoin sylvester ' +
              'strtrim',
    literal: 'DB_AFTER_LAST_ROW DB_ALL_TABLES DB_BATCH_OPERATIONS DB_BEFORE_FIRST_ROW DB_BLOB DB_EVENT_NOTIFICATIONS ' +
             'DB_FINISH_QUERY DB_HIGH_PRECISION DB_LAST_INSERT_ID DB_LOW_PRECISION_DOUBLE DB_LOW_PRECISION_INT32 ' +
             'DB_LOW_PRECISION_INT64 DB_LOW_PRECISION_NUMBERS DB_MULTIPLE_RESULT_SETS DB_NAMED_PLACEHOLDERS ' +
             'DB_POSITIONAL_PLACEHOLDERS DB_PREPARED_QUERIES DB_QUERY_SIZE DB_SIMPLE_LOCKING DB_SYSTEM_TABLES DB_TABLES ' +
             'DB_TRANSACTIONS DB_UNICODE DB_VIEWS __STDIN __STDOUT __STDERR __FILE_DIR'
  };

  const AT_COMMENT_MODE = hljs.COMMENT('@', '@');

  const PREPROCESSOR =
  {
    className: 'meta',
    begin: '#',
    end: '$',
    keywords: {
      'meta-keyword': 'define definecs|10 undef ifdef ifndef iflight ifdllcall ifmac ifos2win ifunix else endif lineson linesoff srcfile srcline'
    },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      {
        beginKeywords: 'include',
        end: '$',
        keywords: {
          'meta-keyword': 'include'
        },
        contains: [
          {
            className: 'meta-string',
            begin: '"',
            end: '"',
            illegal: '\\n'
          }
        ]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      AT_COMMENT_MODE
    ]
  };

  const STRUCT_TYPE =
  {
    begin: /\bstruct\s+/,
    end: /\s/,
    keywords: "struct",
    contains: [
      {
        className: "type",
        begin: hljs.UNDERSCORE_IDENT_RE,
        relevance: 0
      }
    ]
  };

  // only for definitions
  const PARSE_PARAMS = [
    {
      className: 'params',
      begin: /\(/,
      end: /\)/,
      excludeBegin: true,
      excludeEnd: true,
      endsWithParent: true,
      relevance: 0,
      contains: [
        { // dots
          className: 'literal',
          begin: /\.\.\./
        },
        hljs.C_NUMBER_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        AT_COMMENT_MODE,
        STRUCT_TYPE
      ]
    }
  ];

  const FUNCTION_DEF =
  {
    className: "title",
    begin: hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
  };

  const DEFINITION = function(beginKeywords, end, inherits) {
    const mode = hljs.inherit(
      {
        className: "function",
        beginKeywords: beginKeywords,
        end: end,
        excludeEnd: true,
        contains: [].concat(PARSE_PARAMS)
      },
      inherits || {}
    );
    mode.contains.push(FUNCTION_DEF);
    mode.contains.push(hljs.C_NUMBER_MODE);
    mode.contains.push(hljs.C_BLOCK_COMMENT_MODE);
    mode.contains.push(AT_COMMENT_MODE);
    return mode;
  };

  const BUILT_IN_REF =
  { // these are explicitly named internal function calls
    className: 'built_in',
    begin: '\\b(' + KEYWORDS.built_in.split(' ').join('|') + ')\\b'
  };

  const STRING_REF =
  {
    className: 'string',
    begin: '"',
    end: '"',
    contains: [hljs.BACKSLASH_ESCAPE],
    relevance: 0
  };

  const FUNCTION_REF =
  {
    // className: "fn_ref",
    begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
    returnBegin: true,
    keywords: KEYWORDS,
    relevance: 0,
    contains: [
      {
        beginKeywords: KEYWORDS.keyword
      },
      BUILT_IN_REF,
      { // ambiguously named function calls get a relevance of 0
        className: 'built_in',
        begin: hljs.UNDERSCORE_IDENT_RE,
        relevance: 0
      }
    ]
  };

  const FUNCTION_REF_PARAMS =
  {
    // className: "fn_ref_params",
    begin: /\(/,
    end: /\)/,
    relevance: 0,
    keywords: {
      built_in: KEYWORDS.built_in,
      literal: KEYWORDS.literal
    },
    contains: [
      hljs.C_NUMBER_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      AT_COMMENT_MODE,
      BUILT_IN_REF,
      FUNCTION_REF,
      STRING_REF,
      'self'
    ]
  };

  FUNCTION_REF.contains.push(FUNCTION_REF_PARAMS);

  return {
    name: 'GAUSS',
    aliases: ['gss'],
    case_insensitive: true, // language is case-insensitive
    keywords: KEYWORDS,
    illegal: /(\{[%#]|[%#]\}| <- )/,
    contains: [
      hljs.C_NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      AT_COMMENT_MODE,
      STRING_REF,
      PREPROCESSOR,
      {
        className: 'keyword',
        begin: /\bexternal (matrix|string|array|sparse matrix|struct|proc|keyword|fn)/
      },
      DEFINITION('proc keyword', ';'),
      DEFINITION('fn', '='),
      {
        beginKeywords: 'for threadfor',
        end: /;/,
        // end: /\(/,
        relevance: 0,
        contains: [
          hljs.C_BLOCK_COMMENT_MODE,
          AT_COMMENT_MODE,
          FUNCTION_REF_PARAMS
        ]
      },
      { // custom method guard
        // excludes method names from keyword processing
        variants: [
          {
            begin: hljs.UNDERSCORE_IDENT_RE + '\\.' + hljs.UNDERSCORE_IDENT_RE
          },
          {
            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*='
          }
        ],
        relevance: 0
      },
      FUNCTION_REF,
      STRUCT_TYPE
    ]
  };
}

module.exports = gauss;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/gcode.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/gcode.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 Language: G-code (ISO 6983)
 Contributors: Adam Joseph Cook <adam.joseph.cook@gmail.com>
 Description: G-code syntax highlighter for Fanuc and other common CNC machine tool controls.
 Website: https://www.sis.se/api/document/preview/911952/
 */

function gcode(hljs) {
  const GCODE_IDENT_RE = '[A-Z_][A-Z0-9_.]*';
  const GCODE_CLOSE_RE = '%';
  const GCODE_KEYWORDS = {
    $pattern: GCODE_IDENT_RE,
    keyword: 'IF DO WHILE ENDWHILE CALL ENDIF SUB ENDSUB GOTO REPEAT ENDREPEAT ' +
      'EQ LT GT NE GE LE OR XOR'
  };
  const GCODE_START = {
    className: 'meta',
    begin: '([O])([0-9]+)'
  };
  const GCODE_CODE = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.COMMENT(/\(/, /\)/),
    hljs.inherit(hljs.C_NUMBER_MODE, {
      begin: '([-+]?([0-9]*\\.?[0-9]+\\.?))|' + hljs.C_NUMBER_RE
    }),
    hljs.inherit(hljs.APOS_STRING_MODE, {
      illegal: null
    }),
    hljs.inherit(hljs.QUOTE_STRING_MODE, {
      illegal: null
    }),
    {
      className: 'name',
      begin: '([G])([0-9]+\\.?[0-9]?)'
    },
    {
      className: 'name',
      begin: '([M])([0-9]+\\.?[0-9]?)'
    },
    {
      className: 'attr',
      begin: '(VC|VS|#)',
      end: '(\\d+)'
    },
    {
      className: 'attr',
      begin: '(VZOFX|VZOFY|VZOFZ)'
    },
    {
      className: 'built_in',
      begin: '(ATAN|ABS|ACOS|ASIN|SIN|COS|EXP|FIX|FUP|ROUND|LN|TAN)(\\[)',
      end: '([-+]?([0-9]*\\.?[0-9]+\\.?))(\\])'
    },
    {
      className: 'symbol',
      variants: [
        {
          begin: 'N',
          end: '\\d+',
          illegal: '\\W'
        }
      ]
    }
  ];

  return {
    name: 'G-code (ISO 6983)',
    aliases: ['nc'],
    // Some implementations (CNC controls) of G-code are interoperable with uppercase and lowercase letters seamlessly.
    // However, most prefer all uppercase and uppercase is customary.
    case_insensitive: true,
    keywords: GCODE_KEYWORDS,
    contains: [
      {
        className: 'meta',
        begin: GCODE_CLOSE_RE
      },
      GCODE_START
    ].concat(GCODE_CODE)
  };
}

module.exports = gcode;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/gherkin.js":
/*!**********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/gherkin.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 Language: Gherkin
 Author: Sam Pikesley (@pikesley) <sam.pikesley@theodi.org>
 Description: Gherkin is the format for cucumber specifications. It is a domain specific language which helps you to describe business behavior without the need to go into detail of implementation.
 Website: https://cucumber.io/docs/gherkin/
 */

function gherkin(hljs) {
  return {
    name: 'Gherkin',
    aliases: ['feature'],
    keywords: 'Feature Background Ability Business\ Need Scenario Scenarios Scenario\ Outline Scenario\ Template Examples Given And Then But When',
    contains: [
      {
        className: 'symbol',
        begin: '\\*',
        relevance: 0
      },
      {
        className: 'meta',
        begin: '@[^@\\s]+'
      },
      {
        begin: '\\|',
        end: '\\|\\w*$',
        contains: [
          {
            className: 'string',
            begin: '[^|]+'
          }
        ]
      },
      {
        className: 'variable',
        begin: '<',
        end: '>'
      },
      hljs.HASH_COMMENT_MODE,
      {
        className: 'string',
        begin: '"""',
        end: '"""'
      },
      hljs.QUOTE_STRING_MODE
    ]
  };
}

module.exports = gherkin;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/glsl.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/glsl.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: GLSL
Description: OpenGL Shading Language
Author: Sergey Tikhomirov <sergey@tikhomirov.io>
Website: https://en.wikipedia.org/wiki/OpenGL_Shading_Language
Category: graphics
*/

function glsl(hljs) {
  return {
    name: 'GLSL',
    keywords: {
      keyword:
        // Statements
        'break continue discard do else for if return while switch case default ' +
        // Qualifiers
        'attribute binding buffer ccw centroid centroid varying coherent column_major const cw ' +
        'depth_any depth_greater depth_less depth_unchanged early_fragment_tests equal_spacing ' +
        'flat fractional_even_spacing fractional_odd_spacing highp in index inout invariant ' +
        'invocations isolines layout line_strip lines lines_adjacency local_size_x local_size_y ' +
        'local_size_z location lowp max_vertices mediump noperspective offset origin_upper_left ' +
        'out packed patch pixel_center_integer point_mode points precise precision quads r11f_g11f_b10f ' +
        'r16 r16_snorm r16f r16i r16ui r32f r32i r32ui r8 r8_snorm r8i r8ui readonly restrict ' +
        'rg16 rg16_snorm rg16f rg16i rg16ui rg32f rg32i rg32ui rg8 rg8_snorm rg8i rg8ui rgb10_a2 ' +
        'rgb10_a2ui rgba16 rgba16_snorm rgba16f rgba16i rgba16ui rgba32f rgba32i rgba32ui rgba8 ' +
        'rgba8_snorm rgba8i rgba8ui row_major sample shared smooth std140 std430 stream triangle_strip ' +
        'triangles triangles_adjacency uniform varying vertices volatile writeonly',
      type:
        'atomic_uint bool bvec2 bvec3 bvec4 dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 ' +
        'dmat3x4 dmat4 dmat4x2 dmat4x3 dmat4x4 double dvec2 dvec3 dvec4 float iimage1D iimage1DArray ' +
        'iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBuffer ' +
        'iimageCube iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray ' +
        'image2DRect image3D imageBuffer imageCube imageCubeArray int isampler1D isampler1DArray ' +
        'isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D ' +
        'isamplerBuffer isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 mat2 mat2x2 mat2x3 ' +
        'mat2x4 mat3 mat3x2 mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 sampler1D sampler1DArray ' +
        'sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray sampler2DArrayShadow ' +
        'sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow sampler3D ' +
        'samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow ' +
        'image1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray uimage2DRect ' +
        'uimage3D uimageBuffer uimageCube uimageCubeArray uint usampler1D usampler1DArray ' +
        'usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D ' +
        'samplerBuffer usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 vec2 vec3 vec4 void',
      built_in:
        // Constants
        'gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize gl_MaxClipDistances gl_MaxClipPlanes ' +
        'gl_MaxCombinedAtomicCounterBuffers gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms ' +
        'gl_MaxCombinedImageUnitsAndFragmentOutputs gl_MaxCombinedTextureImageUnits gl_MaxComputeAtomicCounterBuffers ' +
        'gl_MaxComputeAtomicCounters gl_MaxComputeImageUniforms gl_MaxComputeTextureImageUnits ' +
        'gl_MaxComputeUniformComponents gl_MaxComputeWorkGroupCount gl_MaxComputeWorkGroupSize ' +
        'gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers gl_MaxFragmentAtomicCounters ' +
        'gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents gl_MaxFragmentInputVectors ' +
        'gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers ' +
        'gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents ' +
        'gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits ' +
        'gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents ' +
        'gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset ' +
        'gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms ' +
        'gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits ' +
        'gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents ' +
        'gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters ' +
        'gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents ' +
        'gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents ' +
        'gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits ' +
        'gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors ' +
        'gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs gl_MaxVertexImageUniforms ' +
        'gl_MaxVertexOutputComponents gl_MaxVertexOutputVectors gl_MaxVertexTextureImageUnits ' +
        'gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffset ' +
        // Variables
        'gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial ' +
        'gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color ' +
        'gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord ' +
        'gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor ' +
        'gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial ' +
        'gl_FrontSecondaryColor gl_GlobalInvocationID gl_InstanceID gl_InvocationID gl_Layer gl_LightModel ' +
        'gl_LightSource gl_LocalInvocationID gl_LocalInvocationIndex gl_ModelViewMatrix ' +
        'gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose gl_ModelViewMatrixTranspose ' +
        'gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse gl_ModelViewProjectionMatrixInverseTranspose ' +
        'gl_ModelViewProjectionMatrixTranspose gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 ' +
        'gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 ' +
        'gl_Normal gl_NormalMatrix gl_NormalScale gl_NumSamples gl_NumWorkGroups gl_ObjectPlaneQ ' +
        'gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn gl_Point gl_PointCoord ' +
        'gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn gl_ProjectionMatrix gl_ProjectionMatrixInverse ' +
        'gl_ProjectionMatrixInverseTranspose gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask ' +
        'gl_SampleMaskIn gl_SamplePosition gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter ' +
        'gl_TexCoord gl_TextureEnvColor gl_TextureMatrix gl_TextureMatrixInverse gl_TextureMatrixInverseTranspose ' +
        'gl_TextureMatrixTranspose gl_Vertex gl_VertexID gl_ViewportIndex gl_WorkGroupID gl_WorkGroupSize gl_in gl_out ' +
        // Functions
        'EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive abs acos acosh all any asin ' +
        'asinh atan atanh atomicAdd atomicAnd atomicCompSwap atomicCounter atomicCounterDecrement ' +
        'atomicCounterIncrement atomicExchange atomicMax atomicMin atomicOr atomicXor barrier ' +
        'bitCount bitfieldExtract bitfieldInsert bitfieldReverse ceil clamp cos cosh cross ' +
        'dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward findLSB findMSB ' +
        'floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan ' +
        'greaterThanEqual groupMemoryBarrier imageAtomicAdd imageAtomicAnd imageAtomicCompSwap ' +
        'imageAtomicExchange imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad ' +
        'imageSize imageStore imulExtended intBitsToFloat interpolateAtCentroid interpolateAtOffset ' +
        'interpolateAtSample inverse inversesqrt isinf isnan ldexp length lessThan lessThanEqual log ' +
        'log2 matrixCompMult max memoryBarrier memoryBarrierAtomicCounter memoryBarrierBuffer ' +
        'memoryBarrierImage memoryBarrierShared min mix mod modf noise1 noise2 noise3 noise4 ' +
        'normalize not notEqual outerProduct packDouble2x32 packHalf2x16 packSnorm2x16 packSnorm4x8 ' +
        'packUnorm2x16 packUnorm4x8 pow radians reflect refract round roundEven shadow1D shadow1DLod ' +
        'shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj shadow2DProjLod sign sin sinh ' +
        'smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture texture1D texture1DLod ' +
        'texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj texture2DProjLod ' +
        'texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod ' +
        'textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset ' +
        'textureLod textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset ' +
        'textureProjLod textureProjLodOffset textureProjOffset textureQueryLevels textureQueryLod ' +
        'textureSize transpose trunc uaddCarry uintBitsToFloat umulExtended unpackDouble2x32 ' +
        'unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 unpackUnorm2x16 unpackUnorm4x8 usubBorrow',
      literal: 'true false'
    },
    illegal: '"',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'meta',
        begin: '#',
        end: '$'
      }
    ]
  };
}

module.exports = glsl;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/gml.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/gml.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: GML
Author: Meseta <meseta@gmail.com>
Description: Game Maker Language for GameMaker Studio 2
Website: https://docs2.yoyogames.com
Category: scripting
*/

function gml(hljs) {
  const GML_KEYWORDS = {
    keyword: 'begin end if then else while do for break continue with until ' +
      'repeat exit and or xor not return mod div switch case default var ' +
      'globalvar enum #macro #region #endregion',
    built_in: 'is_real is_string is_array is_undefined is_int32 is_int64 ' +
      'is_ptr is_vec3 is_vec4 is_matrix is_bool typeof ' +
      'variable_global_exists variable_global_get variable_global_set ' +
      'variable_instance_exists variable_instance_get variable_instance_set ' +
      'variable_instance_get_names array_length_1d array_length_2d ' +
      'array_height_2d array_equals array_create array_copy random ' +
      'random_range irandom irandom_range random_set_seed random_get_seed ' +
      'randomize randomise choose abs round floor ceil sign frac sqrt sqr ' +
      'exp ln log2 log10 sin cos tan arcsin arccos arctan arctan2 dsin dcos ' +
      'dtan darcsin darccos darctan darctan2 degtorad radtodeg power logn ' +
      'min max mean median clamp lerp dot_product dot_product_3d ' +
      'dot_product_normalised dot_product_3d_normalised ' +
      'dot_product_normalized dot_product_3d_normalized math_set_epsilon ' +
      'math_get_epsilon angle_difference point_distance_3d point_distance ' +
      'point_direction lengthdir_x lengthdir_y real string int64 ptr ' +
      'string_format chr ansi_char ord string_length string_byte_length ' +
      'string_pos string_copy string_char_at string_ord_at string_byte_at ' +
      'string_set_byte_at string_delete string_insert string_lower ' +
      'string_upper string_repeat string_letters string_digits ' +
      'string_lettersdigits string_replace string_replace_all string_count ' +
      'string_hash_to_newline clipboard_has_text clipboard_set_text ' +
      'clipboard_get_text date_current_datetime date_create_datetime ' +
      'date_valid_datetime date_inc_year date_inc_month date_inc_week ' +
      'date_inc_day date_inc_hour date_inc_minute date_inc_second ' +
      'date_get_year date_get_month date_get_week date_get_day ' +
      'date_get_hour date_get_minute date_get_second date_get_weekday ' +
      'date_get_day_of_year date_get_hour_of_year date_get_minute_of_year ' +
      'date_get_second_of_year date_year_span date_month_span ' +
      'date_week_span date_day_span date_hour_span date_minute_span ' +
      'date_second_span date_compare_datetime date_compare_date ' +
      'date_compare_time date_date_of date_time_of date_datetime_string ' +
      'date_date_string date_time_string date_days_in_month ' +
      'date_days_in_year date_leap_year date_is_today date_set_timezone ' +
      'date_get_timezone game_set_speed game_get_speed motion_set ' +
      'motion_add place_free place_empty place_meeting place_snapped ' +
      'move_random move_snap move_towards_point move_contact_solid ' +
      'move_contact_all move_outside_solid move_outside_all ' +
      'move_bounce_solid move_bounce_all move_wrap distance_to_point ' +
      'distance_to_object position_empty position_meeting path_start ' +
      'path_end mp_linear_step mp_potential_step mp_linear_step_object ' +
      'mp_potential_step_object mp_potential_settings mp_linear_path ' +
      'mp_potential_path mp_linear_path_object mp_potential_path_object ' +
      'mp_grid_create mp_grid_destroy mp_grid_clear_all mp_grid_clear_cell ' +
      'mp_grid_clear_rectangle mp_grid_add_cell mp_grid_get_cell ' +
      'mp_grid_add_rectangle mp_grid_add_instances mp_grid_path ' +
      'mp_grid_draw mp_grid_to_ds_grid collision_point collision_rectangle ' +
      'collision_circle collision_ellipse collision_line ' +
      'collision_point_list collision_rectangle_list collision_circle_list ' +
      'collision_ellipse_list collision_line_list instance_position_list ' +
      'instance_place_list point_in_rectangle ' +
      'point_in_triangle point_in_circle rectangle_in_rectangle ' +
      'rectangle_in_triangle rectangle_in_circle instance_find ' +
      'instance_exists instance_number instance_position instance_nearest ' +
      'instance_furthest instance_place instance_create_depth ' +
      'instance_create_layer instance_copy instance_change instance_destroy ' +
      'position_destroy position_change instance_id_get ' +
      'instance_deactivate_all instance_deactivate_object ' +
      'instance_deactivate_region instance_activate_all ' +
      'instance_activate_object instance_activate_region room_goto ' +
      'room_goto_previous room_goto_next room_previous room_next ' +
      'room_restart game_end game_restart game_load game_save ' +
      'game_save_buffer game_load_buffer event_perform event_user ' +
      'event_perform_object event_inherited show_debug_message ' +
      'show_debug_overlay debug_event debug_get_callstack alarm_get ' +
      'alarm_set font_texture_page_size keyboard_set_map keyboard_get_map ' +
      'keyboard_unset_map keyboard_check keyboard_check_pressed ' +
      'keyboard_check_released keyboard_check_direct keyboard_get_numlock ' +
      'keyboard_set_numlock keyboard_key_press keyboard_key_release ' +
      'keyboard_clear io_clear mouse_check_button ' +
      'mouse_check_button_pressed mouse_check_button_released ' +
      'mouse_wheel_up mouse_wheel_down mouse_clear draw_self draw_sprite ' +
      'draw_sprite_pos draw_sprite_ext draw_sprite_stretched ' +
      'draw_sprite_stretched_ext draw_sprite_tiled draw_sprite_tiled_ext ' +
      'draw_sprite_part draw_sprite_part_ext draw_sprite_general draw_clear ' +
      'draw_clear_alpha draw_point draw_line draw_line_width draw_rectangle ' +
      'draw_roundrect draw_roundrect_ext draw_triangle draw_circle ' +
      'draw_ellipse draw_set_circle_precision draw_arrow draw_button ' +
      'draw_path draw_healthbar draw_getpixel draw_getpixel_ext ' +
      'draw_set_colour draw_set_color draw_set_alpha draw_get_colour ' +
      'draw_get_color draw_get_alpha merge_colour make_colour_rgb ' +
      'make_colour_hsv colour_get_red colour_get_green colour_get_blue ' +
      'colour_get_hue colour_get_saturation colour_get_value merge_color ' +
      'make_color_rgb make_color_hsv color_get_red color_get_green ' +
      'color_get_blue color_get_hue color_get_saturation color_get_value ' +
      'merge_color screen_save screen_save_part draw_set_font ' +
      'draw_set_halign draw_set_valign draw_text draw_text_ext string_width ' +
      'string_height string_width_ext string_height_ext ' +
      'draw_text_transformed draw_text_ext_transformed draw_text_colour ' +
      'draw_text_ext_colour draw_text_transformed_colour ' +
      'draw_text_ext_transformed_colour draw_text_color draw_text_ext_color ' +
      'draw_text_transformed_color draw_text_ext_transformed_color ' +
      'draw_point_colour draw_line_colour draw_line_width_colour ' +
      'draw_rectangle_colour draw_roundrect_colour ' +
      'draw_roundrect_colour_ext draw_triangle_colour draw_circle_colour ' +
      'draw_ellipse_colour draw_point_color draw_line_color ' +
      'draw_line_width_color draw_rectangle_color draw_roundrect_color ' +
      'draw_roundrect_color_ext draw_triangle_color draw_circle_color ' +
      'draw_ellipse_color draw_primitive_begin draw_vertex ' +
      'draw_vertex_colour draw_vertex_color draw_primitive_end ' +
      'sprite_get_uvs font_get_uvs sprite_get_texture font_get_texture ' +
      'texture_get_width texture_get_height texture_get_uvs ' +
      'draw_primitive_begin_texture draw_vertex_texture ' +
      'draw_vertex_texture_colour draw_vertex_texture_color ' +
      'texture_global_scale surface_create surface_create_ext ' +
      'surface_resize surface_free surface_exists surface_get_width ' +
      'surface_get_height surface_get_texture surface_set_target ' +
      'surface_set_target_ext surface_reset_target surface_depth_disable ' +
      'surface_get_depth_disable draw_surface draw_surface_stretched ' +
      'draw_surface_tiled draw_surface_part draw_surface_ext ' +
      'draw_surface_stretched_ext draw_surface_tiled_ext ' +
      'draw_surface_part_ext draw_surface_general surface_getpixel ' +
      'surface_getpixel_ext surface_save surface_save_part surface_copy ' +
      'surface_copy_part application_surface_draw_enable ' +
      'application_get_position application_surface_enable ' +
      'application_surface_is_enabled display_get_width display_get_height ' +
      'display_get_orientation display_get_gui_width display_get_gui_height ' +
      'display_reset display_mouse_get_x display_mouse_get_y ' +
      'display_mouse_set display_set_ui_visibility ' +
      'window_set_fullscreen window_get_fullscreen ' +
      'window_set_caption window_set_min_width window_set_max_width ' +
      'window_set_min_height window_set_max_height window_get_visible_rects ' +
      'window_get_caption window_set_cursor window_get_cursor ' +
      'window_set_colour window_get_colour window_set_color ' +
      'window_get_color window_set_position window_set_size ' +
      'window_set_rectangle window_center window_get_x window_get_y ' +
      'window_get_width window_get_height window_mouse_get_x ' +
      'window_mouse_get_y window_mouse_set window_view_mouse_get_x ' +
      'window_view_mouse_get_y window_views_mouse_get_x ' +
      'window_views_mouse_get_y audio_listener_position ' +
      'audio_listener_velocity audio_listener_orientation ' +
      'audio_emitter_position audio_emitter_create audio_emitter_free ' +
      'audio_emitter_exists audio_emitter_pitch audio_emitter_velocity ' +
      'audio_emitter_falloff audio_emitter_gain audio_play_sound ' +
      'audio_play_sound_on audio_play_sound_at audio_stop_sound ' +
      'audio_resume_music audio_music_is_playing audio_resume_sound ' +
      'audio_pause_sound audio_pause_music audio_channel_num ' +
      'audio_sound_length audio_get_type audio_falloff_set_model ' +
      'audio_play_music audio_stop_music audio_master_gain audio_music_gain ' +
      'audio_sound_gain audio_sound_pitch audio_stop_all audio_resume_all ' +
      'audio_pause_all audio_is_playing audio_is_paused audio_exists ' +
      'audio_sound_set_track_position audio_sound_get_track_position ' +
      'audio_emitter_get_gain audio_emitter_get_pitch audio_emitter_get_x ' +
      'audio_emitter_get_y audio_emitter_get_z audio_emitter_get_vx ' +
      'audio_emitter_get_vy audio_emitter_get_vz ' +
      'audio_listener_set_position audio_listener_set_velocity ' +
      'audio_listener_set_orientation audio_listener_get_data ' +
      'audio_set_master_gain audio_get_master_gain audio_sound_get_gain ' +
      'audio_sound_get_pitch audio_get_name audio_sound_set_track_position ' +
      'audio_sound_get_track_position audio_create_stream ' +
      'audio_destroy_stream audio_create_sync_group ' +
      'audio_destroy_sync_group audio_play_in_sync_group ' +
      'audio_start_sync_group audio_stop_sync_group audio_pause_sync_group ' +
      'audio_resume_sync_group audio_sync_group_get_track_pos ' +
      'audio_sync_group_debug audio_sync_group_is_playing audio_debug ' +
      'audio_group_load audio_group_unload audio_group_is_loaded ' +
      'audio_group_load_progress audio_group_name audio_group_stop_all ' +
      'audio_group_set_gain audio_create_buffer_sound ' +
      'audio_free_buffer_sound audio_create_play_queue ' +
      'audio_free_play_queue audio_queue_sound audio_get_recorder_count ' +
      'audio_get_recorder_info audio_start_recording audio_stop_recording ' +
      'audio_sound_get_listener_mask audio_emitter_get_listener_mask ' +
      'audio_get_listener_mask audio_sound_set_listener_mask ' +
      'audio_emitter_set_listener_mask audio_set_listener_mask ' +
      'audio_get_listener_count audio_get_listener_info audio_system ' +
      'show_message show_message_async clickable_add clickable_add_ext ' +
      'clickable_change clickable_change_ext clickable_delete ' +
      'clickable_exists clickable_set_style show_question ' +
      'show_question_async get_integer get_string get_integer_async ' +
      'get_string_async get_login_async get_open_filename get_save_filename ' +
      'get_open_filename_ext get_save_filename_ext show_error ' +
      'highscore_clear highscore_add highscore_value highscore_name ' +
      'draw_highscore sprite_exists sprite_get_name sprite_get_number ' +
      'sprite_get_width sprite_get_height sprite_get_xoffset ' +
      'sprite_get_yoffset sprite_get_bbox_left sprite_get_bbox_right ' +
      'sprite_get_bbox_top sprite_get_bbox_bottom sprite_save ' +
      'sprite_save_strip sprite_set_cache_size sprite_set_cache_size_ext ' +
      'sprite_get_tpe sprite_prefetch sprite_prefetch_multi sprite_flush ' +
      'sprite_flush_multi sprite_set_speed sprite_get_speed_type ' +
      'sprite_get_speed font_exists font_get_name font_get_fontname ' +
      'font_get_bold font_get_italic font_get_first font_get_last ' +
      'font_get_size font_set_cache_size path_exists path_get_name ' +
      'path_get_length path_get_time path_get_kind path_get_closed ' +
      'path_get_precision path_get_number path_get_point_x path_get_point_y ' +
      'path_get_point_speed path_get_x path_get_y path_get_speed ' +
      'script_exists script_get_name timeline_add timeline_delete ' +
      'timeline_clear timeline_exists timeline_get_name ' +
      'timeline_moment_clear timeline_moment_add_script timeline_size ' +
      'timeline_max_moment object_exists object_get_name object_get_sprite ' +
      'object_get_solid object_get_visible object_get_persistent ' +
      'object_get_mask object_get_parent object_get_physics ' +
      'object_is_ancestor room_exists room_get_name sprite_set_offset ' +
      'sprite_duplicate sprite_assign sprite_merge sprite_add ' +
      'sprite_replace sprite_create_from_surface sprite_add_from_surface ' +
      'sprite_delete sprite_set_alpha_from_sprite sprite_collision_mask ' +
      'font_add_enable_aa font_add_get_enable_aa font_add font_add_sprite ' +
      'font_add_sprite_ext font_replace font_replace_sprite ' +
      'font_replace_sprite_ext font_delete path_set_kind path_set_closed ' +
      'path_set_precision path_add path_assign path_duplicate path_append ' +
      'path_delete path_add_point path_insert_point path_change_point ' +
      'path_delete_point path_clear_points path_reverse path_mirror ' +
      'path_flip path_rotate path_rescale path_shift script_execute ' +
      'object_set_sprite object_set_solid object_set_visible ' +
      'object_set_persistent object_set_mask room_set_width room_set_height ' +
      'room_set_persistent room_set_background_colour ' +
      'room_set_background_color room_set_view room_set_viewport ' +
      'room_get_viewport room_set_view_enabled room_add room_duplicate ' +
      'room_assign room_instance_add room_instance_clear room_get_camera ' +
      'room_set_camera asset_get_index asset_get_type ' +
      'file_text_open_from_string file_text_open_read file_text_open_write ' +
      'file_text_open_append file_text_close file_text_write_string ' +
      'file_text_write_real file_text_writeln file_text_read_string ' +
      'file_text_read_real file_text_readln file_text_eof file_text_eoln ' +
      'file_exists file_delete file_rename file_copy directory_exists ' +
      'directory_create directory_destroy file_find_first file_find_next ' +
      'file_find_close file_attributes filename_name filename_path ' +
      'filename_dir filename_drive filename_ext filename_change_ext ' +
      'file_bin_open file_bin_rewrite file_bin_close file_bin_position ' +
      'file_bin_size file_bin_seek file_bin_write_byte file_bin_read_byte ' +
      'parameter_count parameter_string environment_get_variable ' +
      'ini_open_from_string ini_open ini_close ini_read_string ' +
      'ini_read_real ini_write_string ini_write_real ini_key_exists ' +
      'ini_section_exists ini_key_delete ini_section_delete ' +
      'ds_set_precision ds_exists ds_stack_create ds_stack_destroy ' +
      'ds_stack_clear ds_stack_copy ds_stack_size ds_stack_empty ' +
      'ds_stack_push ds_stack_pop ds_stack_top ds_stack_write ds_stack_read ' +
      'ds_queue_create ds_queue_destroy ds_queue_clear ds_queue_copy ' +
      'ds_queue_size ds_queue_empty ds_queue_enqueue ds_queue_dequeue ' +
      'ds_queue_head ds_queue_tail ds_queue_write ds_queue_read ' +
      'ds_list_create ds_list_destroy ds_list_clear ds_list_copy ' +
      'ds_list_size ds_list_empty ds_list_add ds_list_insert ' +
      'ds_list_replace ds_list_delete ds_list_find_index ds_list_find_value ' +
      'ds_list_mark_as_list ds_list_mark_as_map ds_list_sort ' +
      'ds_list_shuffle ds_list_write ds_list_read ds_list_set ds_map_create ' +
      'ds_map_destroy ds_map_clear ds_map_copy ds_map_size ds_map_empty ' +
      'ds_map_add ds_map_add_list ds_map_add_map ds_map_replace ' +
      'ds_map_replace_map ds_map_replace_list ds_map_delete ds_map_exists ' +
      'ds_map_find_value ds_map_find_previous ds_map_find_next ' +
      'ds_map_find_first ds_map_find_last ds_map_write ds_map_read ' +
      'ds_map_secure_save ds_map_secure_load ds_map_secure_load_buffer ' +
      'ds_map_secure_save_buffer ds_map_set ds_priority_create ' +
      'ds_priority_destroy ds_priority_clear ds_priority_copy ' +
      'ds_priority_size ds_priority_empty ds_priority_add ' +
      'ds_priority_change_priority ds_priority_find_priority ' +
      'ds_priority_delete_value ds_priority_delete_min ds_priority_find_min ' +
      'ds_priority_delete_max ds_priority_find_max ds_priority_write ' +
      'ds_priority_read ds_grid_create ds_grid_destroy ds_grid_copy ' +
      'ds_grid_resize ds_grid_width ds_grid_height ds_grid_clear ' +
      'ds_grid_set ds_grid_add ds_grid_multiply ds_grid_set_region ' +
      'ds_grid_add_region ds_grid_multiply_region ds_grid_set_disk ' +
      'ds_grid_add_disk ds_grid_multiply_disk ds_grid_set_grid_region ' +
      'ds_grid_add_grid_region ds_grid_multiply_grid_region ds_grid_get ' +
      'ds_grid_get_sum ds_grid_get_max ds_grid_get_min ds_grid_get_mean ' +
      'ds_grid_get_disk_sum ds_grid_get_disk_min ds_grid_get_disk_max ' +
      'ds_grid_get_disk_mean ds_grid_value_exists ds_grid_value_x ' +
      'ds_grid_value_y ds_grid_value_disk_exists ds_grid_value_disk_x ' +
      'ds_grid_value_disk_y ds_grid_shuffle ds_grid_write ds_grid_read ' +
      'ds_grid_sort ds_grid_set ds_grid_get effect_create_below ' +
      'effect_create_above effect_clear part_type_create part_type_destroy ' +
      'part_type_exists part_type_clear part_type_shape part_type_sprite ' +
      'part_type_size part_type_scale part_type_orientation part_type_life ' +
      'part_type_step part_type_death part_type_speed part_type_direction ' +
      'part_type_gravity part_type_colour1 part_type_colour2 ' +
      'part_type_colour3 part_type_colour_mix part_type_colour_rgb ' +
      'part_type_colour_hsv part_type_color1 part_type_color2 ' +
      'part_type_color3 part_type_color_mix part_type_color_rgb ' +
      'part_type_color_hsv part_type_alpha1 part_type_alpha2 ' +
      'part_type_alpha3 part_type_blend part_system_create ' +
      'part_system_create_layer part_system_destroy part_system_exists ' +
      'part_system_clear part_system_draw_order part_system_depth ' +
      'part_system_position part_system_automatic_update ' +
      'part_system_automatic_draw part_system_update part_system_drawit ' +
      'part_system_get_layer part_system_layer part_particles_create ' +
      'part_particles_create_colour part_particles_create_color ' +
      'part_particles_clear part_particles_count part_emitter_create ' +
      'part_emitter_destroy part_emitter_destroy_all part_emitter_exists ' +
      'part_emitter_clear part_emitter_region part_emitter_burst ' +
      'part_emitter_stream external_call external_define external_free ' +
      'window_handle window_device matrix_get matrix_set ' +
      'matrix_build_identity matrix_build matrix_build_lookat ' +
      'matrix_build_projection_ortho matrix_build_projection_perspective ' +
      'matrix_build_projection_perspective_fov matrix_multiply ' +
      'matrix_transform_vertex matrix_stack_push matrix_stack_pop ' +
      'matrix_stack_multiply matrix_stack_set matrix_stack_clear ' +
      'matrix_stack_top matrix_stack_is_empty browser_input_capture ' +
      'os_get_config os_get_info os_get_language os_get_region ' +
      'os_lock_orientation display_get_dpi_x display_get_dpi_y ' +
      'display_set_gui_size display_set_gui_maximise ' +
      'display_set_gui_maximize device_mouse_dbclick_enable ' +
      'display_set_timing_method display_get_timing_method ' +
      'display_set_sleep_margin display_get_sleep_margin virtual_key_add ' +
      'virtual_key_hide virtual_key_delete virtual_key_show ' +
      'draw_enable_drawevent draw_enable_swf_aa draw_set_swf_aa_level ' +
      'draw_get_swf_aa_level draw_texture_flush draw_flush ' +
      'gpu_set_blendenable gpu_set_ztestenable gpu_set_zfunc ' +
      'gpu_set_zwriteenable gpu_set_lightingenable gpu_set_fog ' +
      'gpu_set_cullmode gpu_set_blendmode gpu_set_blendmode_ext ' +
      'gpu_set_blendmode_ext_sepalpha gpu_set_colorwriteenable ' +
      'gpu_set_colourwriteenable gpu_set_alphatestenable ' +
      'gpu_set_alphatestref gpu_set_alphatestfunc gpu_set_texfilter ' +
      'gpu_set_texfilter_ext gpu_set_texrepeat gpu_set_texrepeat_ext ' +
      'gpu_set_tex_filter gpu_set_tex_filter_ext gpu_set_tex_repeat ' +
      'gpu_set_tex_repeat_ext gpu_set_tex_mip_filter ' +
      'gpu_set_tex_mip_filter_ext gpu_set_tex_mip_bias ' +
      'gpu_set_tex_mip_bias_ext gpu_set_tex_min_mip gpu_set_tex_min_mip_ext ' +
      'gpu_set_tex_max_mip gpu_set_tex_max_mip_ext gpu_set_tex_max_aniso ' +
      'gpu_set_tex_max_aniso_ext gpu_set_tex_mip_enable ' +
      'gpu_set_tex_mip_enable_ext gpu_get_blendenable gpu_get_ztestenable ' +
      'gpu_get_zfunc gpu_get_zwriteenable gpu_get_lightingenable ' +
      'gpu_get_fog gpu_get_cullmode gpu_get_blendmode gpu_get_blendmode_ext ' +
      'gpu_get_blendmode_ext_sepalpha gpu_get_blendmode_src ' +
      'gpu_get_blendmode_dest gpu_get_blendmode_srcalpha ' +
      'gpu_get_blendmode_destalpha gpu_get_colorwriteenable ' +
      'gpu_get_colourwriteenable gpu_get_alphatestenable ' +
      'gpu_get_alphatestref gpu_get_alphatestfunc gpu_get_texfilter ' +
      'gpu_get_texfilter_ext gpu_get_texrepeat gpu_get_texrepeat_ext ' +
      'gpu_get_tex_filter gpu_get_tex_filter_ext gpu_get_tex_repeat ' +
      'gpu_get_tex_repeat_ext gpu_get_tex_mip_filter ' +
      'gpu_get_tex_mip_filter_ext gpu_get_tex_mip_bias ' +
      'gpu_get_tex_mip_bias_ext gpu_get_tex_min_mip gpu_get_tex_min_mip_ext ' +
      'gpu_get_tex_max_mip gpu_get_tex_max_mip_ext gpu_get_tex_max_aniso ' +
      'gpu_get_tex_max_aniso_ext gpu_get_tex_mip_enable ' +
      'gpu_get_tex_mip_enable_ext gpu_push_state gpu_pop_state ' +
      'gpu_get_state gpu_set_state draw_light_define_ambient ' +
      'draw_light_define_direction draw_light_define_point ' +
      'draw_light_enable draw_set_lighting draw_light_get_ambient ' +
      'draw_light_get draw_get_lighting shop_leave_rating url_get_domain ' +
      'url_open url_open_ext url_open_full get_timer achievement_login ' +
      'achievement_logout achievement_post achievement_increment ' +
      'achievement_post_score achievement_available ' +
      'achievement_show_achievements achievement_show_leaderboards ' +
      'achievement_load_friends achievement_load_leaderboard ' +
      'achievement_send_challenge achievement_load_progress ' +
      'achievement_reset achievement_login_status achievement_get_pic ' +
      'achievement_show_challenge_notifications achievement_get_challenges ' +
      'achievement_event achievement_show achievement_get_info ' +
      'cloud_file_save cloud_string_save cloud_synchronise ads_enable ' +
      'ads_disable ads_setup ads_engagement_launch ads_engagement_available ' +
      'ads_engagement_active ads_event ads_event_preload ' +
      'ads_set_reward_callback ads_get_display_height ads_get_display_width ' +
      'ads_move ads_interstitial_available ads_interstitial_display ' +
      'device_get_tilt_x device_get_tilt_y device_get_tilt_z ' +
      'device_is_keypad_open device_mouse_check_button ' +
      'device_mouse_check_button_pressed device_mouse_check_button_released ' +
      'device_mouse_x device_mouse_y device_mouse_raw_x device_mouse_raw_y ' +
      'device_mouse_x_to_gui device_mouse_y_to_gui iap_activate iap_status ' +
      'iap_enumerate_products iap_restore_all iap_acquire iap_consume ' +
      'iap_product_details iap_purchase_details facebook_init ' +
      'facebook_login facebook_status facebook_graph_request ' +
      'facebook_dialog facebook_logout facebook_launch_offerwall ' +
      'facebook_post_message facebook_send_invite facebook_user_id ' +
      'facebook_accesstoken facebook_check_permission ' +
      'facebook_request_read_permissions ' +
      'facebook_request_publish_permissions gamepad_is_supported ' +
      'gamepad_get_device_count gamepad_is_connected ' +
      'gamepad_get_description gamepad_get_button_threshold ' +
      'gamepad_set_button_threshold gamepad_get_axis_deadzone ' +
      'gamepad_set_axis_deadzone gamepad_button_count gamepad_button_check ' +
      'gamepad_button_check_pressed gamepad_button_check_released ' +
      'gamepad_button_value gamepad_axis_count gamepad_axis_value ' +
      'gamepad_set_vibration gamepad_set_colour gamepad_set_color ' +
      'os_is_paused window_has_focus code_is_compiled http_get ' +
      'http_get_file http_post_string http_request json_encode json_decode ' +
      'zip_unzip load_csv base64_encode base64_decode md5_string_unicode ' +
      'md5_string_utf8 md5_file os_is_network_connected sha1_string_unicode ' +
      'sha1_string_utf8 sha1_file os_powersave_enable analytics_event ' +
      'analytics_event_ext win8_livetile_tile_notification ' +
      'win8_livetile_tile_clear win8_livetile_badge_notification ' +
      'win8_livetile_badge_clear win8_livetile_queue_enable ' +
      'win8_secondarytile_pin win8_secondarytile_badge_notification ' +
      'win8_secondarytile_delete win8_livetile_notification_begin ' +
      'win8_livetile_notification_secondary_begin ' +
      'win8_livetile_notification_expiry win8_livetile_notification_tag ' +
      'win8_livetile_notification_text_add ' +
      'win8_livetile_notification_image_add win8_livetile_notification_end ' +
      'win8_appbar_enable win8_appbar_add_element ' +
      'win8_appbar_remove_element win8_settingscharm_add_entry ' +
      'win8_settingscharm_add_html_entry win8_settingscharm_add_xaml_entry ' +
      'win8_settingscharm_set_xaml_property ' +
      'win8_settingscharm_get_xaml_property win8_settingscharm_remove_entry ' +
      'win8_share_image win8_share_screenshot win8_share_file ' +
      'win8_share_url win8_share_text win8_search_enable ' +
      'win8_search_disable win8_search_add_suggestions ' +
      'win8_device_touchscreen_available win8_license_initialize_sandbox ' +
      'win8_license_trial_version winphone_license_trial_version ' +
      'winphone_tile_title winphone_tile_count winphone_tile_back_title ' +
      'winphone_tile_back_content winphone_tile_back_content_wide ' +
      'winphone_tile_front_image winphone_tile_front_image_small ' +
      'winphone_tile_front_image_wide winphone_tile_back_image ' +
      'winphone_tile_back_image_wide winphone_tile_background_colour ' +
      'winphone_tile_background_color winphone_tile_icon_image ' +
      'winphone_tile_small_icon_image winphone_tile_wide_content ' +
      'winphone_tile_cycle_images winphone_tile_small_background_image ' +
      'physics_world_create physics_world_gravity ' +
      'physics_world_update_speed physics_world_update_iterations ' +
      'physics_world_draw_debug physics_pause_enable physics_fixture_create ' +
      'physics_fixture_set_kinematic physics_fixture_set_density ' +
      'physics_fixture_set_awake physics_fixture_set_restitution ' +
      'physics_fixture_set_friction physics_fixture_set_collision_group ' +
      'physics_fixture_set_sensor physics_fixture_set_linear_damping ' +
      'physics_fixture_set_angular_damping physics_fixture_set_circle_shape ' +
      'physics_fixture_set_box_shape physics_fixture_set_edge_shape ' +
      'physics_fixture_set_polygon_shape physics_fixture_set_chain_shape ' +
      'physics_fixture_add_point physics_fixture_bind ' +
      'physics_fixture_bind_ext physics_fixture_delete physics_apply_force ' +
      'physics_apply_impulse physics_apply_angular_impulse ' +
      'physics_apply_local_force physics_apply_local_impulse ' +
      'physics_apply_torque physics_mass_properties physics_draw_debug ' +
      'physics_test_overlap physics_remove_fixture physics_set_friction ' +
      'physics_set_density physics_set_restitution physics_get_friction ' +
      'physics_get_density physics_get_restitution ' +
      'physics_joint_distance_create physics_joint_rope_create ' +
      'physics_joint_revolute_create physics_joint_prismatic_create ' +
      'physics_joint_pulley_create physics_joint_wheel_create ' +
      'physics_joint_weld_create physics_joint_friction_create ' +
      'physics_joint_gear_create physics_joint_enable_motor ' +
      'physics_joint_get_value physics_joint_set_value physics_joint_delete ' +
      'physics_particle_create physics_particle_delete ' +
      'physics_particle_delete_region_circle ' +
      'physics_particle_delete_region_box ' +
      'physics_particle_delete_region_poly physics_particle_set_flags ' +
      'physics_particle_set_category_flags physics_particle_draw ' +
      'physics_particle_draw_ext physics_particle_count ' +
      'physics_particle_get_data physics_particle_get_data_particle ' +
      'physics_particle_group_begin physics_particle_group_circle ' +
      'physics_particle_group_box physics_particle_group_polygon ' +
      'physics_particle_group_add_point physics_particle_group_end ' +
      'physics_particle_group_join physics_particle_group_delete ' +
      'physics_particle_group_count physics_particle_group_get_data ' +
      'physics_particle_group_get_mass physics_particle_group_get_inertia ' +
      'physics_particle_group_get_centre_x ' +
      'physics_particle_group_get_centre_y physics_particle_group_get_vel_x ' +
      'physics_particle_group_get_vel_y physics_particle_group_get_ang_vel ' +
      'physics_particle_group_get_x physics_particle_group_get_y ' +
      'physics_particle_group_get_angle physics_particle_set_group_flags ' +
      'physics_particle_get_group_flags physics_particle_get_max_count ' +
      'physics_particle_get_radius physics_particle_get_density ' +
      'physics_particle_get_damping physics_particle_get_gravity_scale ' +
      'physics_particle_set_max_count physics_particle_set_radius ' +
      'physics_particle_set_density physics_particle_set_damping ' +
      'physics_particle_set_gravity_scale network_create_socket ' +
      'network_create_socket_ext network_create_server ' +
      'network_create_server_raw network_connect network_connect_raw ' +
      'network_send_packet network_send_raw network_send_broadcast ' +
      'network_send_udp network_send_udp_raw network_set_timeout ' +
      'network_set_config network_resolve network_destroy buffer_create ' +
      'buffer_write buffer_read buffer_seek buffer_get_surface ' +
      'buffer_set_surface buffer_delete buffer_exists buffer_get_type ' +
      'buffer_get_alignment buffer_poke buffer_peek buffer_save ' +
      'buffer_save_ext buffer_load buffer_load_ext buffer_load_partial ' +
      'buffer_copy buffer_fill buffer_get_size buffer_tell buffer_resize ' +
      'buffer_md5 buffer_sha1 buffer_base64_encode buffer_base64_decode ' +
      'buffer_base64_decode_ext buffer_sizeof buffer_get_address ' +
      'buffer_create_from_vertex_buffer ' +
      'buffer_create_from_vertex_buffer_ext buffer_copy_from_vertex_buffer ' +
      'buffer_async_group_begin buffer_async_group_option ' +
      'buffer_async_group_end buffer_load_async buffer_save_async ' +
      'gml_release_mode gml_pragma steam_activate_overlay ' +
      'steam_is_overlay_enabled steam_is_overlay_activated ' +
      'steam_get_persona_name steam_initialised ' +
      'steam_is_cloud_enabled_for_app steam_is_cloud_enabled_for_account ' +
      'steam_file_persisted steam_get_quota_total steam_get_quota_free ' +
      'steam_file_write steam_file_write_file steam_file_read ' +
      'steam_file_delete steam_file_exists steam_file_size steam_file_share ' +
      'steam_is_screenshot_requested steam_send_screenshot ' +
      'steam_is_user_logged_on steam_get_user_steam_id steam_user_owns_dlc ' +
      'steam_user_installed_dlc steam_set_achievement steam_get_achievement ' +
      'steam_clear_achievement steam_set_stat_int steam_set_stat_float ' +
      'steam_set_stat_avg_rate steam_get_stat_int steam_get_stat_float ' +
      'steam_get_stat_avg_rate steam_reset_all_stats ' +
      'steam_reset_all_stats_achievements steam_stats_ready ' +
      'steam_create_leaderboard steam_upload_score steam_upload_score_ext ' +
      'steam_download_scores_around_user steam_download_scores ' +
      'steam_download_friends_scores steam_upload_score_buffer ' +
      'steam_upload_score_buffer_ext steam_current_game_language ' +
      'steam_available_languages steam_activate_overlay_browser ' +
      'steam_activate_overlay_user steam_activate_overlay_store ' +
      'steam_get_user_persona_name steam_get_app_id ' +
      'steam_get_user_account_id steam_ugc_download steam_ugc_create_item ' +
      'steam_ugc_start_item_update steam_ugc_set_item_title ' +
      'steam_ugc_set_item_description steam_ugc_set_item_visibility ' +
      'steam_ugc_set_item_tags steam_ugc_set_item_content ' +
      'steam_ugc_set_item_preview steam_ugc_submit_item_update ' +
      'steam_ugc_get_item_update_progress steam_ugc_subscribe_item ' +
      'steam_ugc_unsubscribe_item steam_ugc_num_subscribed_items ' +
      'steam_ugc_get_subscribed_items steam_ugc_get_item_install_info ' +
      'steam_ugc_get_item_update_info steam_ugc_request_item_details ' +
      'steam_ugc_create_query_user steam_ugc_create_query_user_ex ' +
      'steam_ugc_create_query_all steam_ugc_create_query_all_ex ' +
      'steam_ugc_query_set_cloud_filename_filter ' +
      'steam_ugc_query_set_match_any_tag steam_ugc_query_set_search_text ' +
      'steam_ugc_query_set_ranked_by_trend_days ' +
      'steam_ugc_query_add_required_tag steam_ugc_query_add_excluded_tag ' +
      'steam_ugc_query_set_return_long_description ' +
      'steam_ugc_query_set_return_total_only ' +
      'steam_ugc_query_set_allow_cached_response steam_ugc_send_query ' +
      'shader_set shader_get_name shader_reset shader_current ' +
      'shader_is_compiled shader_get_sampler_index shader_get_uniform ' +
      'shader_set_uniform_i shader_set_uniform_i_array shader_set_uniform_f ' +
      'shader_set_uniform_f_array shader_set_uniform_matrix ' +
      'shader_set_uniform_matrix_array shader_enable_corner_id ' +
      'texture_set_stage texture_get_texel_width texture_get_texel_height ' +
      'shaders_are_supported vertex_format_begin vertex_format_end ' +
      'vertex_format_delete vertex_format_add_position ' +
      'vertex_format_add_position_3d vertex_format_add_colour ' +
      'vertex_format_add_color vertex_format_add_normal ' +
      'vertex_format_add_texcoord vertex_format_add_textcoord ' +
      'vertex_format_add_custom vertex_create_buffer ' +
      'vertex_create_buffer_ext vertex_delete_buffer vertex_begin ' +
      'vertex_end vertex_position vertex_position_3d vertex_colour ' +
      'vertex_color vertex_argb vertex_texcoord vertex_normal vertex_float1 ' +
      'vertex_float2 vertex_float3 vertex_float4 vertex_ubyte4 ' +
      'vertex_submit vertex_freeze vertex_get_number vertex_get_buffer_size ' +
      'vertex_create_buffer_from_buffer ' +
      'vertex_create_buffer_from_buffer_ext push_local_notification ' +
      'push_get_first_local_notification push_get_next_local_notification ' +
      'push_cancel_local_notification skeleton_animation_set ' +
      'skeleton_animation_get skeleton_animation_mix ' +
      'skeleton_animation_set_ext skeleton_animation_get_ext ' +
      'skeleton_animation_get_duration skeleton_animation_get_frames ' +
      'skeleton_animation_clear skeleton_skin_set skeleton_skin_get ' +
      'skeleton_attachment_set skeleton_attachment_get ' +
      'skeleton_attachment_create skeleton_collision_draw_set ' +
      'skeleton_bone_data_get skeleton_bone_data_set ' +
      'skeleton_bone_state_get skeleton_bone_state_set skeleton_get_minmax ' +
      'skeleton_get_num_bounds skeleton_get_bounds ' +
      'skeleton_animation_get_frame skeleton_animation_set_frame ' +
      'draw_skeleton draw_skeleton_time draw_skeleton_instance ' +
      'draw_skeleton_collision skeleton_animation_list skeleton_skin_list ' +
      'skeleton_slot_data layer_get_id layer_get_id_at_depth ' +
      'layer_get_depth layer_create layer_destroy layer_destroy_instances ' +
      'layer_add_instance layer_has_instance layer_set_visible ' +
      'layer_get_visible layer_exists layer_x layer_y layer_get_x ' +
      'layer_get_y layer_hspeed layer_vspeed layer_get_hspeed ' +
      'layer_get_vspeed layer_script_begin layer_script_end layer_shader ' +
      'layer_get_script_begin layer_get_script_end layer_get_shader ' +
      'layer_set_target_room layer_get_target_room layer_reset_target_room ' +
      'layer_get_all layer_get_all_elements layer_get_name layer_depth ' +
      'layer_get_element_layer layer_get_element_type layer_element_move ' +
      'layer_force_draw_depth layer_is_draw_depth_forced ' +
      'layer_get_forced_depth layer_background_get_id ' +
      'layer_background_exists layer_background_create ' +
      'layer_background_destroy layer_background_visible ' +
      'layer_background_change layer_background_sprite ' +
      'layer_background_htiled layer_background_vtiled ' +
      'layer_background_stretch layer_background_yscale ' +
      'layer_background_xscale layer_background_blend ' +
      'layer_background_alpha layer_background_index layer_background_speed ' +
      'layer_background_get_visible layer_background_get_sprite ' +
      'layer_background_get_htiled layer_background_get_vtiled ' +
      'layer_background_get_stretch layer_background_get_yscale ' +
      'layer_background_get_xscale layer_background_get_blend ' +
      'layer_background_get_alpha layer_background_get_index ' +
      'layer_background_get_speed layer_sprite_get_id layer_sprite_exists ' +
      'layer_sprite_create layer_sprite_destroy layer_sprite_change ' +
      'layer_sprite_index layer_sprite_speed layer_sprite_xscale ' +
      'layer_sprite_yscale layer_sprite_angle layer_sprite_blend ' +
      'layer_sprite_alpha layer_sprite_x layer_sprite_y ' +
      'layer_sprite_get_sprite layer_sprite_get_index ' +
      'layer_sprite_get_speed layer_sprite_get_xscale ' +
      'layer_sprite_get_yscale layer_sprite_get_angle ' +
      'layer_sprite_get_blend layer_sprite_get_alpha layer_sprite_get_x ' +
      'layer_sprite_get_y layer_tilemap_get_id layer_tilemap_exists ' +
      'layer_tilemap_create layer_tilemap_destroy tilemap_tileset tilemap_x ' +
      'tilemap_y tilemap_set tilemap_set_at_pixel tilemap_get_tileset ' +
      'tilemap_get_tile_width tilemap_get_tile_height tilemap_get_width ' +
      'tilemap_get_height tilemap_get_x tilemap_get_y tilemap_get ' +
      'tilemap_get_at_pixel tilemap_get_cell_x_at_pixel ' +
      'tilemap_get_cell_y_at_pixel tilemap_clear draw_tilemap draw_tile ' +
      'tilemap_set_global_mask tilemap_get_global_mask tilemap_set_mask ' +
      'tilemap_get_mask tilemap_get_frame tile_set_empty tile_set_index ' +
      'tile_set_flip tile_set_mirror tile_set_rotate tile_get_empty ' +
      'tile_get_index tile_get_flip tile_get_mirror tile_get_rotate ' +
      'layer_tile_exists layer_tile_create layer_tile_destroy ' +
      'layer_tile_change layer_tile_xscale layer_tile_yscale ' +
      'layer_tile_blend layer_tile_alpha layer_tile_x layer_tile_y ' +
      'layer_tile_region layer_tile_visible layer_tile_get_sprite ' +
      'layer_tile_get_xscale layer_tile_get_yscale layer_tile_get_blend ' +
      'layer_tile_get_alpha layer_tile_get_x layer_tile_get_y ' +
      'layer_tile_get_region layer_tile_get_visible ' +
      'layer_instance_get_instance instance_activate_layer ' +
      'instance_deactivate_layer camera_create camera_create_view ' +
      'camera_destroy camera_apply camera_get_active camera_get_default ' +
      'camera_set_default camera_set_view_mat camera_set_proj_mat ' +
      'camera_set_update_script camera_set_begin_script ' +
      'camera_set_end_script camera_set_view_pos camera_set_view_size ' +
      'camera_set_view_speed camera_set_view_border camera_set_view_angle ' +
      'camera_set_view_target camera_get_view_mat camera_get_proj_mat ' +
      'camera_get_update_script camera_get_begin_script ' +
      'camera_get_end_script camera_get_view_x camera_get_view_y ' +
      'camera_get_view_width camera_get_view_height camera_get_view_speed_x ' +
      'camera_get_view_speed_y camera_get_view_border_x ' +
      'camera_get_view_border_y camera_get_view_angle ' +
      'camera_get_view_target view_get_camera view_get_visible ' +
      'view_get_xport view_get_yport view_get_wport view_get_hport ' +
      'view_get_surface_id view_set_camera view_set_visible view_set_xport ' +
      'view_set_yport view_set_wport view_set_hport view_set_surface_id ' +
      'gesture_drag_time gesture_drag_distance gesture_flick_speed ' +
      'gesture_double_tap_time gesture_double_tap_distance ' +
      'gesture_pinch_distance gesture_pinch_angle_towards ' +
      'gesture_pinch_angle_away gesture_rotate_time gesture_rotate_angle ' +
      'gesture_tap_count gesture_get_drag_time gesture_get_drag_distance ' +
      'gesture_get_flick_speed gesture_get_double_tap_time ' +
      'gesture_get_double_tap_distance gesture_get_pinch_distance ' +
      'gesture_get_pinch_angle_towards gesture_get_pinch_angle_away ' +
      'gesture_get_rotate_time gesture_get_rotate_angle ' +
      'gesture_get_tap_count keyboard_virtual_show keyboard_virtual_hide ' +
      'keyboard_virtual_status keyboard_virtual_height',
    literal: 'self other all noone global local undefined pointer_invalid ' +
      'pointer_null path_action_stop path_action_restart ' +
      'path_action_continue path_action_reverse true false pi GM_build_date ' +
      'GM_version GM_runtime_version  timezone_local timezone_utc ' +
      'gamespeed_fps gamespeed_microseconds  ev_create ev_destroy ev_step ' +
      'ev_alarm ev_keyboard ev_mouse ev_collision ev_other ev_draw ' +
      'ev_draw_begin ev_draw_end ev_draw_pre ev_draw_post ev_keypress ' +
      'ev_keyrelease ev_trigger ev_left_button ev_right_button ' +
      'ev_middle_button ev_no_button ev_left_press ev_right_press ' +
      'ev_middle_press ev_left_release ev_right_release ev_middle_release ' +
      'ev_mouse_enter ev_mouse_leave ev_mouse_wheel_up ev_mouse_wheel_down ' +
      'ev_global_left_button ev_global_right_button ev_global_middle_button ' +
      'ev_global_left_press ev_global_right_press ev_global_middle_press ' +
      'ev_global_left_release ev_global_right_release ' +
      'ev_global_middle_release ev_joystick1_left ev_joystick1_right ' +
      'ev_joystick1_up ev_joystick1_down ev_joystick1_button1 ' +
      'ev_joystick1_button2 ev_joystick1_button3 ev_joystick1_button4 ' +
      'ev_joystick1_button5 ev_joystick1_button6 ev_joystick1_button7 ' +
      'ev_joystick1_button8 ev_joystick2_left ev_joystick2_right ' +
      'ev_joystick2_up ev_joystick2_down ev_joystick2_button1 ' +
      'ev_joystick2_button2 ev_joystick2_button3 ev_joystick2_button4 ' +
      'ev_joystick2_button5 ev_joystick2_button6 ev_joystick2_button7 ' +
      'ev_joystick2_button8 ev_outside ev_boundary ev_game_start ' +
      'ev_game_end ev_room_start ev_room_end ev_no_more_lives ' +
      'ev_animation_end ev_end_of_path ev_no_more_health ev_close_button ' +
      'ev_user0 ev_user1 ev_user2 ev_user3 ev_user4 ev_user5 ev_user6 ' +
      'ev_user7 ev_user8 ev_user9 ev_user10 ev_user11 ev_user12 ev_user13 ' +
      'ev_user14 ev_user15 ev_step_normal ev_step_begin ev_step_end ev_gui ' +
      'ev_gui_begin ev_gui_end ev_cleanup ev_gesture ev_gesture_tap ' +
      'ev_gesture_double_tap ev_gesture_drag_start ev_gesture_dragging ' +
      'ev_gesture_drag_end ev_gesture_flick ev_gesture_pinch_start ' +
      'ev_gesture_pinch_in ev_gesture_pinch_out ev_gesture_pinch_end ' +
      'ev_gesture_rotate_start ev_gesture_rotating ev_gesture_rotate_end ' +
      'ev_global_gesture_tap ev_global_gesture_double_tap ' +
      'ev_global_gesture_drag_start ev_global_gesture_dragging ' +
      'ev_global_gesture_drag_end ev_global_gesture_flick ' +
      'ev_global_gesture_pinch_start ev_global_gesture_pinch_in ' +
      'ev_global_gesture_pinch_out ev_global_gesture_pinch_end ' +
      'ev_global_gesture_rotate_start ev_global_gesture_rotating ' +
      'ev_global_gesture_rotate_end vk_nokey vk_anykey vk_enter vk_return ' +
      'vk_shift vk_control vk_alt vk_escape vk_space vk_backspace vk_tab ' +
      'vk_pause vk_printscreen vk_left vk_right vk_up vk_down vk_home ' +
      'vk_end vk_delete vk_insert vk_pageup vk_pagedown vk_f1 vk_f2 vk_f3 ' +
      'vk_f4 vk_f5 vk_f6 vk_f7 vk_f8 vk_f9 vk_f10 vk_f11 vk_f12 vk_numpad0 ' +
      'vk_numpad1 vk_numpad2 vk_numpad3 vk_numpad4 vk_numpad5 vk_numpad6 ' +
      'vk_numpad7 vk_numpad8 vk_numpad9 vk_divide vk_multiply vk_subtract ' +
      'vk_add vk_decimal vk_lshift vk_lcontrol vk_lalt vk_rshift ' +
      'vk_rcontrol vk_ralt  mb_any mb_none mb_left mb_right mb_middle ' +
      'c_aqua c_black c_blue c_dkgray c_fuchsia c_gray c_green c_lime ' +
      'c_ltgray c_maroon c_navy c_olive c_purple c_red c_silver c_teal ' +
      'c_white c_yellow c_orange fa_left fa_center fa_right fa_top ' +
      'fa_middle fa_bottom pr_pointlist pr_linelist pr_linestrip ' +
      'pr_trianglelist pr_trianglestrip pr_trianglefan bm_complex bm_normal ' +
      'bm_add bm_max bm_subtract bm_zero bm_one bm_src_colour ' +
      'bm_inv_src_colour bm_src_color bm_inv_src_color bm_src_alpha ' +
      'bm_inv_src_alpha bm_dest_alpha bm_inv_dest_alpha bm_dest_colour ' +
      'bm_inv_dest_colour bm_dest_color bm_inv_dest_color bm_src_alpha_sat ' +
      'tf_point tf_linear tf_anisotropic mip_off mip_on mip_markedonly ' +
      'audio_falloff_none audio_falloff_inverse_distance ' +
      'audio_falloff_inverse_distance_clamped audio_falloff_linear_distance ' +
      'audio_falloff_linear_distance_clamped ' +
      'audio_falloff_exponent_distance ' +
      'audio_falloff_exponent_distance_clamped audio_old_system ' +
      'audio_new_system audio_mono audio_stereo audio_3d cr_default cr_none ' +
      'cr_arrow cr_cross cr_beam cr_size_nesw cr_size_ns cr_size_nwse ' +
      'cr_size_we cr_uparrow cr_hourglass cr_drag cr_appstart cr_handpoint ' +
      'cr_size_all spritespeed_framespersecond ' +
      'spritespeed_framespergameframe asset_object asset_unknown ' +
      'asset_sprite asset_sound asset_room asset_path asset_script ' +
      'asset_font asset_timeline asset_tiles asset_shader fa_readonly ' +
      'fa_hidden fa_sysfile fa_volumeid fa_directory fa_archive  ' +
      'ds_type_map ds_type_list ds_type_stack ds_type_queue ds_type_grid ' +
      'ds_type_priority ef_explosion ef_ring ef_ellipse ef_firework ' +
      'ef_smoke ef_smokeup ef_star ef_spark ef_flare ef_cloud ef_rain ' +
      'ef_snow pt_shape_pixel pt_shape_disk pt_shape_square pt_shape_line ' +
      'pt_shape_star pt_shape_circle pt_shape_ring pt_shape_sphere ' +
      'pt_shape_flare pt_shape_spark pt_shape_explosion pt_shape_cloud ' +
      'pt_shape_smoke pt_shape_snow ps_distr_linear ps_distr_gaussian ' +
      'ps_distr_invgaussian ps_shape_rectangle ps_shape_ellipse ' +
      'ps_shape_diamond ps_shape_line ty_real ty_string dll_cdecl ' +
      'dll_stdcall matrix_view matrix_projection matrix_world os_win32 ' +
      'os_windows os_macosx os_ios os_android os_symbian os_linux ' +
      'os_unknown os_winphone os_tizen os_win8native ' +
      'os_wiiu os_3ds  os_psvita os_bb10 os_ps4 os_xboxone ' +
      'os_ps3 os_xbox360 os_uwp os_tvos os_switch ' +
      'browser_not_a_browser browser_unknown browser_ie browser_firefox ' +
      'browser_chrome browser_safari browser_safari_mobile browser_opera ' +
      'browser_tizen browser_edge browser_windows_store browser_ie_mobile  ' +
      'device_ios_unknown device_ios_iphone device_ios_iphone_retina ' +
      'device_ios_ipad device_ios_ipad_retina device_ios_iphone5 ' +
      'device_ios_iphone6 device_ios_iphone6plus device_emulator ' +
      'device_tablet display_landscape display_landscape_flipped ' +
      'display_portrait display_portrait_flipped tm_sleep tm_countvsyncs ' +
      'of_challenge_win of_challen ge_lose of_challenge_tie ' +
      'leaderboard_type_number leaderboard_type_time_mins_secs ' +
      'cmpfunc_never cmpfunc_less cmpfunc_equal cmpfunc_lessequal ' +
      'cmpfunc_greater cmpfunc_notequal cmpfunc_greaterequal cmpfunc_always ' +
      'cull_noculling cull_clockwise cull_counterclockwise lighttype_dir ' +
      'lighttype_point iap_ev_storeload iap_ev_product iap_ev_purchase ' +
      'iap_ev_consume iap_ev_restore iap_storeload_ok iap_storeload_failed ' +
      'iap_status_uninitialised iap_status_unavailable iap_status_loading ' +
      'iap_status_available iap_status_processing iap_status_restoring ' +
      'iap_failed iap_unavailable iap_available iap_purchased iap_canceled ' +
      'iap_refunded fb_login_default fb_login_fallback_to_webview ' +
      'fb_login_no_fallback_to_webview fb_login_forcing_webview ' +
      'fb_login_use_system_account fb_login_forcing_safari  ' +
      'phy_joint_anchor_1_x phy_joint_anchor_1_y phy_joint_anchor_2_x ' +
      'phy_joint_anchor_2_y phy_joint_reaction_force_x ' +
      'phy_joint_reaction_force_y phy_joint_reaction_torque ' +
      'phy_joint_motor_speed phy_joint_angle phy_joint_motor_torque ' +
      'phy_joint_max_motor_torque phy_joint_translation phy_joint_speed ' +
      'phy_joint_motor_force phy_joint_max_motor_force phy_joint_length_1 ' +
      'phy_joint_length_2 phy_joint_damping_ratio phy_joint_frequency ' +
      'phy_joint_lower_angle_limit phy_joint_upper_angle_limit ' +
      'phy_joint_angle_limits phy_joint_max_length phy_joint_max_torque ' +
      'phy_joint_max_force phy_debug_render_aabb ' +
      'phy_debug_render_collision_pairs phy_debug_render_coms ' +
      'phy_debug_render_core_shapes phy_debug_render_joints ' +
      'phy_debug_render_obb phy_debug_render_shapes  ' +
      'phy_particle_flag_water phy_particle_flag_zombie ' +
      'phy_particle_flag_wall phy_particle_flag_spring ' +
      'phy_particle_flag_elastic phy_particle_flag_viscous ' +
      'phy_particle_flag_powder phy_particle_flag_tensile ' +
      'phy_particle_flag_colourmixing phy_particle_flag_colormixing ' +
      'phy_particle_group_flag_solid phy_particle_group_flag_rigid ' +
      'phy_particle_data_flag_typeflags phy_particle_data_flag_position ' +
      'phy_particle_data_flag_velocity phy_particle_data_flag_colour ' +
      'phy_particle_data_flag_color phy_particle_data_flag_category  ' +
      'achievement_our_info achievement_friends_info ' +
      'achievement_leaderboard_info achievement_achievement_info ' +
      'achievement_filter_all_players achievement_filter_friends_only ' +
      'achievement_filter_favorites_only ' +
      'achievement_type_achievement_challenge ' +
      'achievement_type_score_challenge achievement_pic_loaded  ' +
      'achievement_show_ui achievement_show_profile ' +
      'achievement_show_leaderboard achievement_show_achievement ' +
      'achievement_show_bank achievement_show_friend_picker ' +
      'achievement_show_purchase_prompt network_socket_tcp ' +
      'network_socket_udp network_socket_bluetooth network_type_connect ' +
      'network_type_disconnect network_type_data ' +
      'network_type_non_blocking_connect network_config_connect_timeout ' +
      'network_config_use_non_blocking_socket ' +
      'network_config_enable_reliable_udp ' +
      'network_config_disable_reliable_udp buffer_fixed buffer_grow ' +
      'buffer_wrap buffer_fast buffer_vbuffer buffer_network buffer_u8 ' +
      'buffer_s8 buffer_u16 buffer_s16 buffer_u32 buffer_s32 buffer_u64 ' +
      'buffer_f16 buffer_f32 buffer_f64 buffer_bool buffer_text ' +
      'buffer_string buffer_surface_copy buffer_seek_start ' +
      'buffer_seek_relative buffer_seek_end ' +
      'buffer_generalerror buffer_outofspace buffer_outofbounds ' +
      'buffer_invalidtype  text_type button_type input_type ANSI_CHARSET ' +
      'DEFAULT_CHARSET EASTEUROPE_CHARSET RUSSIAN_CHARSET SYMBOL_CHARSET ' +
      'SHIFTJIS_CHARSET HANGEUL_CHARSET GB2312_CHARSET CHINESEBIG5_CHARSET ' +
      'JOHAB_CHARSET HEBREW_CHARSET ARABIC_CHARSET GREEK_CHARSET ' +
      'TURKISH_CHARSET VIETNAMESE_CHARSET THAI_CHARSET MAC_CHARSET ' +
      'BALTIC_CHARSET OEM_CHARSET  gp_face1 gp_face2 gp_face3 gp_face4 ' +
      'gp_shoulderl gp_shoulderr gp_shoulderlb gp_shoulderrb gp_select ' +
      'gp_start gp_stickl gp_stickr gp_padu gp_padd gp_padl gp_padr ' +
      'gp_axislh gp_axislv gp_axisrh gp_axisrv ov_friends ov_community ' +
      'ov_players ov_settings ov_gamegroup ov_achievements lb_sort_none ' +
      'lb_sort_ascending lb_sort_descending lb_disp_none lb_disp_numeric ' +
      'lb_disp_time_sec lb_disp_time_ms ugc_result_success ' +
      'ugc_filetype_community ugc_filetype_microtrans ugc_visibility_public ' +
      'ugc_visibility_friends_only ugc_visibility_private ' +
      'ugc_query_RankedByVote ugc_query_RankedByPublicationDate ' +
      'ugc_query_AcceptedForGameRankedByAcceptanceDate ' +
      'ugc_query_RankedByTrend ' +
      'ugc_query_FavoritedByFriendsRankedByPublicationDate ' +
      'ugc_query_CreatedByFriendsRankedByPublicationDate ' +
      'ugc_query_RankedByNumTimesReported ' +
      'ugc_query_CreatedByFollowedUsersRankedByPublicationDate ' +
      'ugc_query_NotYetRated ugc_query_RankedByTotalVotesAsc ' +
      'ugc_query_RankedByVotesUp ugc_query_RankedByTextSearch ' +
      'ugc_sortorder_CreationOrderDesc ugc_sortorder_CreationOrderAsc ' +
      'ugc_sortorder_TitleAsc ugc_sortorder_LastUpdatedDesc ' +
      'ugc_sortorder_SubscriptionDateDesc ugc_sortorder_VoteScoreDesc ' +
      'ugc_sortorder_ForModeration ugc_list_Published ugc_list_VotedOn ' +
      'ugc_list_VotedUp ugc_list_VotedDown ugc_list_WillVoteLater ' +
      'ugc_list_Favorited ugc_list_Subscribed ugc_list_UsedOrPlayed ' +
      'ugc_list_Followed ugc_match_Items ugc_match_Items_Mtx ' +
      'ugc_match_Items_ReadyToUse ugc_match_Collections ugc_match_Artwork ' +
      'ugc_match_Videos ugc_match_Screenshots ugc_match_AllGuides ' +
      'ugc_match_WebGuides ugc_match_IntegratedGuides ' +
      'ugc_match_UsableInGame ugc_match_ControllerBindings  ' +
      'vertex_usage_position vertex_usage_colour vertex_usage_color ' +
      'vertex_usage_normal vertex_usage_texcoord vertex_usage_textcoord ' +
      'vertex_usage_blendweight vertex_usage_blendindices ' +
      'vertex_usage_psize vertex_usage_tangent vertex_usage_binormal ' +
      'vertex_usage_fog vertex_usage_depth vertex_usage_sample ' +
      'vertex_type_float1 vertex_type_float2 vertex_type_float3 ' +
      'vertex_type_float4 vertex_type_colour vertex_type_color ' +
      'vertex_type_ubyte4 layerelementtype_undefined ' +
      'layerelementtype_background layerelementtype_instance ' +
      'layerelementtype_oldtilemap layerelementtype_sprite ' +
      'layerelementtype_tilemap layerelementtype_particlesystem ' +
      'layerelementtype_tile tile_rotate tile_flip tile_mirror ' +
      'tile_index_mask kbv_type_default kbv_type_ascii kbv_type_url ' +
      'kbv_type_email kbv_type_numbers kbv_type_phone kbv_type_phone_name ' +
      'kbv_returnkey_default kbv_returnkey_go kbv_returnkey_google ' +
      'kbv_returnkey_join kbv_returnkey_next kbv_returnkey_route ' +
      'kbv_returnkey_search kbv_returnkey_send kbv_returnkey_yahoo ' +
      'kbv_returnkey_done kbv_returnkey_continue kbv_returnkey_emergency ' +
      'kbv_autocapitalize_none kbv_autocapitalize_words ' +
      'kbv_autocapitalize_sentences kbv_autocapitalize_characters',
    symbol: 'argument_relative argument argument0 argument1 argument2 ' +
      'argument3 argument4 argument5 argument6 argument7 argument8 ' +
      'argument9 argument10 argument11 argument12 argument13 argument14 ' +
      'argument15 argument_count x y xprevious yprevious xstart ystart ' +
      'hspeed vspeed direction speed friction gravity gravity_direction ' +
      'path_index path_position path_positionprevious path_speed ' +
      'path_scale path_orientation path_endaction object_index id solid ' +
      'persistent mask_index instance_count instance_id room_speed fps ' +
      'fps_real current_time current_year current_month current_day ' +
      'current_weekday current_hour current_minute current_second alarm ' +
      'timeline_index timeline_position timeline_speed timeline_running ' +
      'timeline_loop room room_first room_last room_width room_height ' +
      'room_caption room_persistent score lives health show_score ' +
      'show_lives show_health caption_score caption_lives caption_health ' +
      'event_type event_number event_object event_action ' +
      'application_surface gamemaker_pro gamemaker_registered ' +
      'gamemaker_version error_occurred error_last debug_mode ' +
      'keyboard_key keyboard_lastkey keyboard_lastchar keyboard_string ' +
      'mouse_x mouse_y mouse_button mouse_lastbutton cursor_sprite ' +
      'visible sprite_index sprite_width sprite_height sprite_xoffset ' +
      'sprite_yoffset image_number image_index image_speed depth ' +
      'image_xscale image_yscale image_angle image_alpha image_blend ' +
      'bbox_left bbox_right bbox_top bbox_bottom layer background_colour  ' +
      'background_showcolour background_color background_showcolor ' +
      'view_enabled view_current view_visible view_xview view_yview ' +
      'view_wview view_hview view_xport view_yport view_wport view_hport ' +
      'view_angle view_hborder view_vborder view_hspeed view_vspeed ' +
      'view_object view_surface_id view_camera game_id game_display_name ' +
      'game_project_name game_save_id working_directory temp_directory ' +
      'program_directory browser_width browser_height os_type os_device ' +
      'os_browser os_version display_aa async_load delta_time ' +
      'webgl_enabled event_data iap_data phy_rotation phy_position_x ' +
      'phy_position_y phy_angular_velocity phy_linear_velocity_x ' +
      'phy_linear_velocity_y phy_speed_x phy_speed_y phy_speed ' +
      'phy_angular_damping phy_linear_damping phy_bullet ' +
      'phy_fixed_rotation phy_active phy_mass phy_inertia phy_com_x ' +
      'phy_com_y phy_dynamic phy_kinematic phy_sleeping ' +
      'phy_collision_points phy_collision_x phy_collision_y ' +
      'phy_col_normal_x phy_col_normal_y phy_position_xprevious ' +
      'phy_position_yprevious'
  };

  return {
    name: 'GML',
    aliases: [
      'gml',
      'GML'
    ],
    case_insensitive: false, // language is case-insensitive
    keywords: GML_KEYWORDS,

    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE
    ]
  };
}

module.exports = gml;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/go.js":
/*!*****************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/go.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Go
Author: Stephan Kountso aka StepLg <steplg@gmail.com>
Contributors: Evgeny Stepanischev <imbolk@gmail.com>
Description: Google go language (golang). For info about language
Website: http://golang.org/
Category: common, system
*/

function go(hljs) {
  const GO_KEYWORDS = {
    keyword:
      'break default func interface select case map struct chan else goto package switch ' +
      'const fallthrough if range type continue for import return var go defer ' +
      'bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 ' +
      'uint16 uint32 uint64 int uint uintptr rune',
    literal:
       'true false iota nil',
    built_in:
      'append cap close complex copy imag len make new panic print println real recover delete'
  };
  return {
    name: 'Go',
    aliases: ['golang'],
    keywords: GO_KEYWORDS,
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'string',
        variants: [
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          {
            begin: '`',
            end: '`'
          }
        ]
      },
      {
        className: 'number',
        variants: [
          {
            begin: hljs.C_NUMBER_RE + '[i]',
            relevance: 1
          },
          hljs.C_NUMBER_MODE
        ]
      },
      {
        begin: /:=/ // relevance booster
      },
      {
        className: 'function',
        beginKeywords: 'func',
        end: '\\s*(\\{|$)',
        excludeEnd: true,
        contains: [
          hljs.TITLE_MODE,
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            keywords: GO_KEYWORDS,
            illegal: /["']/
          }
        ]
      }
    ]
  };
}

module.exports = go;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/golo.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/golo.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Golo
Author: Philippe Charriere <ph.charriere@gmail.com>
Description: a lightweight dynamic language for the JVM
Website: http://golo-lang.org/
*/

function golo(hljs) {
  return {
    name: 'Golo',
    keywords: {
      keyword:
          'println readln print import module function local return let var ' +
          'while for foreach times in case when match with break continue ' +
          'augment augmentation each find filter reduce ' +
          'if then else otherwise try catch finally raise throw orIfNull ' +
          'DynamicObject|10 DynamicVariable struct Observable map set vector list array',
      literal:
          'true false null'
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'meta',
        begin: '@[A-Za-z]+'
      }
    ]
  };
}

module.exports = golo;


/***/ })

}]);
//# sourceMappingURL=593725446735afb2fcb0.chunk.js.map