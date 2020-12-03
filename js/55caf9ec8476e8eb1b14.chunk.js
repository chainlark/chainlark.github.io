(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor~.._.._node_modules_highlight.js_lib_languages_n"],{

/***/ "../../node_modules/highlight.js/lib/languages/node-repl.js":
/*!************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/node-repl.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Node REPL
Requires: javascript.js
Author: Marat Nagayev <nagaevmt@yandex.ru>
Category: scripting
*/

/** @type LanguageFn */
function nodeRepl(hljs) {
  return {
    name: 'Node REPL',
    contains: [
      {
        className: 'meta',
        starts: {
          // a space separates the REPL prefix from the actual code
          // this is purely for cleaner HTML output
          end: / |$/,
          starts: {
            end: '$',
            subLanguage: 'javascript'
          }
        },
        variants: [
          {
            begin: /^>(?=[ ]|$)/
          },
          {
            begin: /^\.\.\.(?=[ ]|$)/
          }
        ]
      }
    ]
  };
}

module.exports = nodeRepl;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/nsis.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/nsis.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: NSIS
Description: Nullsoft Scriptable Install System
Author: Jan T. Sott <jan.sott@gmail.com>
Website: https://nsis.sourceforge.io/Main_Page
*/

function nsis(hljs) {
  const CONSTANTS = {
    className: 'variable',
    begin: /\$(ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES32|COMMONFILES64|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES32|PROGRAMFILES64|PROGRAMFILES|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)/
  };

  const DEFINES = {
    // ${defines}
    className: 'variable',
    begin: /\$+\{[\w.:-]+\}/
  };

  const VARIABLES = {
    // $variables
    className: 'variable',
    begin: /\$+\w+/,
    illegal: /\(\)\{\}/
  };

  const LANGUAGES = {
    // $(language_strings)
    className: 'variable',
    begin: /\$+\([\w^.:-]+\)/
  };

  const PARAMETERS = {
    // command parameters
    className: 'params',
    begin: '(ARCHIVE|FILE_ATTRIBUTE_ARCHIVE|FILE_ATTRIBUTE_NORMAL|FILE_ATTRIBUTE_OFFLINE|FILE_ATTRIBUTE_READONLY|FILE_ATTRIBUTE_SYSTEM|FILE_ATTRIBUTE_TEMPORARY|HKCR|HKCU|HKDD|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_DYN_DATA|HKEY_LOCAL_MACHINE|HKEY_PERFORMANCE_DATA|HKEY_USERS|HKLM|HKPD|HKU|IDABORT|IDCANCEL|IDIGNORE|IDNO|IDOK|IDRETRY|IDYES|MB_ABORTRETRYIGNORE|MB_DEFBUTTON1|MB_DEFBUTTON2|MB_DEFBUTTON3|MB_DEFBUTTON4|MB_ICONEXCLAMATION|MB_ICONINFORMATION|MB_ICONQUESTION|MB_ICONSTOP|MB_OK|MB_OKCANCEL|MB_RETRYCANCEL|MB_RIGHT|MB_RTLREADING|MB_SETFOREGROUND|MB_TOPMOST|MB_USERICON|MB_YESNO|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY)'
  };

  const COMPILER = {
    // !compiler_flags
    className: 'keyword',
    begin: /!(addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversion|gettlbversion|if|ifdef|ifmacrodef|ifmacrondef|ifndef|include|insertmacro|macro|macroend|makensis|packhdr|searchparse|searchreplace|system|tempfile|undef|verbose|warning)/
  };

  const METACHARS = {
    // $\n, $\r, $\t, $$
    className: 'meta',
    begin: /\$(\\[nrt]|\$)/
  };

  const PLUGINS = {
    // plug::ins
    className: 'class',
    begin: /\w+::\w+/
  };

  const STRING = {
    className: 'string',
    variants: [
      {
        begin: '"',
        end: '"'
      },
      {
        begin: '\'',
        end: '\''
      },
      {
        begin: '`',
        end: '`'
      }
    ],
    illegal: /\n/,
    contains: [
      METACHARS,
      CONSTANTS,
      DEFINES,
      VARIABLES,
      LANGUAGES
    ]
  };

  return {
    name: 'NSIS',
    case_insensitive: false,
    keywords: {
      keyword:
      'Abort AddBrandingImage AddSize AllowRootDirInstall AllowSkipFiles AutoCloseWindow BGFont BGGradient BrandingText BringToFront Call CallInstDLL Caption ChangeUI CheckBitmap ClearErrors CompletedText ComponentText CopyFiles CRCCheck CreateDirectory CreateFont CreateShortCut Delete DeleteINISec DeleteINIStr DeleteRegKey DeleteRegValue DetailPrint DetailsButtonText DirText DirVar DirVerify EnableWindow EnumRegKey EnumRegValue Exch Exec ExecShell ExecShellWait ExecWait ExpandEnvStrings File FileBufSize FileClose FileErrorText FileOpen FileRead FileReadByte FileReadUTF16LE FileReadWord FileWriteUTF16LE FileSeek FileWrite FileWriteByte FileWriteWord FindClose FindFirst FindNext FindWindow FlushINI GetCurInstType GetCurrentAddress GetDlgItem GetDLLVersion GetDLLVersionLocal GetErrorLevel GetFileTime GetFileTimeLocal GetFullPathName GetFunctionAddress GetInstDirError GetKnownFolderPath GetLabelAddress GetTempFileName Goto HideWindow Icon IfAbort IfErrors IfFileExists IfRebootFlag IfRtlLanguage IfShellVarContextAll IfSilent InitPluginsDir InstallButtonText InstallColors InstallDir InstallDirRegKey InstProgressFlags InstType InstTypeGetText InstTypeSetText Int64Cmp Int64CmpU Int64Fmt IntCmp IntCmpU IntFmt IntOp IntPtrCmp IntPtrCmpU IntPtrOp IsWindow LangString LicenseBkColor LicenseData LicenseForceSelection LicenseLangString LicenseText LoadAndSetImage LoadLanguageFile LockWindow LogSet LogText ManifestDPIAware ManifestLongPathAware ManifestMaxVersionTested ManifestSupportedOS MessageBox MiscButtonText Name Nop OutFile Page PageCallbacks PEAddResource PEDllCharacteristics PERemoveResource PESubsysVer Pop Push Quit ReadEnvStr ReadINIStr ReadRegDWORD ReadRegStr Reboot RegDLL Rename RequestExecutionLevel ReserveFile Return RMDir SearchPath SectionGetFlags SectionGetInstTypes SectionGetSize SectionGetText SectionIn SectionSetFlags SectionSetInstTypes SectionSetSize SectionSetText SendMessage SetAutoClose SetBrandingImage SetCompress SetCompressor SetCompressorDictSize SetCtlColors SetCurInstType SetDatablockOptimize SetDateSave SetDetailsPrint SetDetailsView SetErrorLevel SetErrors SetFileAttributes SetFont SetOutPath SetOverwrite SetRebootFlag SetRegView SetShellVarContext SetSilent ShowInstDetails ShowUninstDetails ShowWindow SilentInstall SilentUnInstall Sleep SpaceTexts StrCmp StrCmpS StrCpy StrLen SubCaption Unicode UninstallButtonText UninstallCaption UninstallIcon UninstallSubCaption UninstallText UninstPage UnRegDLL Var VIAddVersionKey VIFileVersion VIProductVersion WindowIcon WriteINIStr WriteRegBin WriteRegDWORD WriteRegExpandStr WriteRegMultiStr WriteRegNone WriteRegStr WriteUninstaller XPStyle',
      literal:
      'admin all auto both bottom bzip2 colored components current custom directory false force hide highest ifdiff ifnewer instfiles lastused leave left license listonly lzma nevershow none normal notset off on open print right show silent silentlog smooth textonly top true try un.components un.custom un.directory un.instfiles un.license uninstConfirm user Win10 Win7 Win8 WinVista zlib'
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.COMMENT(
        ';',
        '$',
        {
          relevance: 0
        }
      ),
      {
        className: 'function',
        beginKeywords: 'Function PageEx Section SectionGroup',
        end: '$'
      },
      STRING,
      COMPILER,
      DEFINES,
      VARIABLES,
      LANGUAGES,
      PARAMETERS,
      PLUGINS,
      hljs.NUMBER_MODE
    ]
  };
}

module.exports = nsis;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/objectivec.js":
/*!*************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/objectivec.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Objective-C
Author: Valerii Hiora <valerii.hiora@gmail.com>
Contributors: Angel G. Olloqui <angelgarcia.mail@gmail.com>, Matt Diephouse <matt@diephouse.com>, Andrew Farmer <ahfarmer@gmail.com>, Minh Nguyễn <mxn@1ec5.org>
Website: https://developer.apple.com/documentation/objectivec
Category: common
*/

function objectivec(hljs) {
  const API_CLASS = {
    className: 'built_in',
    begin: '\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+'
  };
  const IDENTIFIER_RE = /[a-zA-Z@][a-zA-Z0-9_]*/;
  const OBJC_KEYWORDS = {
    $pattern: IDENTIFIER_RE,
    keyword:
      'int float while char export sizeof typedef const struct for union ' +
      'unsigned long volatile static bool mutable if do return goto void ' +
      'enum else break extern asm case short default double register explicit ' +
      'signed typename this switch continue wchar_t inline readonly assign ' +
      'readwrite self @synchronized id typeof ' +
      'nonatomic super unichar IBOutlet IBAction strong weak copy ' +
      'in out inout bycopy byref oneway __strong __weak __block __autoreleasing ' +
      '@private @protected @public @try @property @end @throw @catch @finally ' +
      '@autoreleasepool @synthesize @dynamic @selector @optional @required ' +
      '@encode @package @import @defs @compatibility_alias ' +
      '__bridge __bridge_transfer __bridge_retained __bridge_retain ' +
      '__covariant __contravariant __kindof ' +
      '_Nonnull _Nullable _Null_unspecified ' +
      '__FUNCTION__ __PRETTY_FUNCTION__ __attribute__ ' +
      'getter setter retain unsafe_unretained ' +
      'nonnull nullable null_unspecified null_resettable class instancetype ' +
      'NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER ' +
      'NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED ' +
      'NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE ' +
      'NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END ' +
      'NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW ' +
      'NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN',
    literal:
      'false true FALSE TRUE nil YES NO NULL',
    built_in:
      'BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once'
  };
  const CLASS_KEYWORDS = {
    $pattern: IDENTIFIER_RE,
    keyword: '@interface @class @protocol @implementation'
  };
  return {
    name: 'Objective-C',
    aliases: [
      'mm',
      'objc',
      'obj-c',
      'obj-c++',
      'objective-c++'
    ],
    keywords: OBJC_KEYWORDS,
    illegal: '</',
    contains: [
      API_CLASS,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      {
        className: 'string',
        variants: [
          {
            begin: '@"',
            end: '"',
            illegal: '\\n',
            contains: [ hljs.BACKSLASH_ESCAPE ]
          }
        ]
      },
      {
        className: 'meta',
        begin: /#\s*[a-z]+\b/,
        end: /$/,
        keywords: {
          'meta-keyword':
            'if else elif endif define undef warning error line ' +
            'pragma ifdef ifndef include'
        },
        contains: [
          {
            begin: /\\\n/,
            relevance: 0
          },
          hljs.inherit(hljs.QUOTE_STRING_MODE, {
            className: 'meta-string'
          }),
          {
            className: 'meta-string',
            begin: /<.*?>/,
            end: /$/,
            illegal: '\\n'
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        className: 'class',
        begin: '(' + CLASS_KEYWORDS.keyword.split(' ').join('|') + ')\\b',
        end: /(\{|$)/,
        excludeEnd: true,
        keywords: CLASS_KEYWORDS,
        contains: [ hljs.UNDERSCORE_TITLE_MODE ]
      },
      {
        begin: '\\.' + hljs.UNDERSCORE_IDENT_RE,
        relevance: 0
      }
    ]
  };
}

module.exports = objectivec;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/ocaml.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/ocaml.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: OCaml
Author: Mehdi Dogguy <mehdi@dogguy.org>
Contributors: Nicolas Braud-Santoni <nicolas.braud-santoni@ens-cachan.fr>, Mickael Delahaye <mickael.delahaye@gmail.com>
Description: OCaml language definition.
Website: https://ocaml.org
Category: functional
*/

function ocaml(hljs) {
  /* missing support for heredoc-like string (OCaml 4.0.2+) */
  return {
    name: 'OCaml',
    aliases: ['ml'],
    keywords: {
      $pattern: '[a-z_]\\w*!?',
      keyword:
        'and as assert asr begin class constraint do done downto else end ' +
        'exception external for fun function functor if in include ' +
        'inherit! inherit initializer land lazy let lor lsl lsr lxor match method!|10 method ' +
        'mod module mutable new object of open! open or private rec sig struct ' +
        'then to try type val! val virtual when while with ' +
        /* camlp4 */
        'parser value',
      built_in:
        /* built-in types */
        'array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 string unit ' +
        /* (some) types in Pervasives */
        'in_channel out_channel ref',
      literal:
        'true false'
    },
    illegal: /\/\/|>>/,
    contains: [
      {
        className: 'literal',
        begin: '\\[(\\|\\|)?\\]|\\(\\)',
        relevance: 0
      },
      hljs.COMMENT(
        '\\(\\*',
        '\\*\\)',
        {
          contains: ['self']
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
      { /* don't color identifiers, but safely catch all identifiers with '*/
        begin: '[a-z_]\\w*\'[\\w\']*', relevance: 0
      },
      hljs.inherit(hljs.APOS_STRING_MODE, {className: 'string', relevance: 0}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
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
        begin: /->/ // relevance booster
      }
    ]
  }
}

module.exports = ocaml;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/openscad.js":
/*!***********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/openscad.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: OpenSCAD
Author: Dan Panzarella <alsoelp@gmail.com>
Description: OpenSCAD is a language for the 3D CAD modeling software of the same name.
Website: https://www.openscad.org
Category: scientific
*/

function openscad(hljs) {
  const SPECIAL_VARS = {
    className: 'keyword',
    begin: '\\$(f[asn]|t|vp[rtd]|children)'
  };
  const LITERALS = {
    className: 'literal',
    begin: 'false|true|PI|undef'
  };
  const NUMBERS = {
    className: 'number',
    begin: '\\b\\d+(\\.\\d+)?(e-?\\d+)?', // adds 1e5, 1e-10
    relevance: 0
  };
  const STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    illegal: null
  });
  const PREPRO = {
    className: 'meta',
    keywords: {
      'meta-keyword': 'include use'
    },
    begin: 'include|use <',
    end: '>'
  };
  const PARAMS = {
    className: 'params',
    begin: '\\(',
    end: '\\)',
    contains: [
      'self',
      NUMBERS,
      STRING,
      SPECIAL_VARS,
      LITERALS
    ]
  };
  const MODIFIERS = {
    begin: '[*!#%]',
    relevance: 0
  };
  const FUNCTIONS = {
    className: 'function',
    beginKeywords: 'module function',
    end: /=|\{/,
    contains: [
      PARAMS,
      hljs.UNDERSCORE_TITLE_MODE
    ]
  };

  return {
    name: 'OpenSCAD',
    aliases: [ 'scad' ],
    keywords: {
      keyword: 'function module include use for intersection_for if else \\%',
      literal: 'false true PI undef',
      built_in: 'circle square polygon text sphere cube cylinder polyhedron translate rotate scale resize mirror multmatrix color offset hull minkowski union difference intersection abs sign sin cos tan acos asin atan atan2 floor round ceil ln log pow sqrt exp rands min max concat lookup str chr search version version_num norm cross parent_module echo import import_dxf dxf_linear_extrude linear_extrude rotate_extrude surface projection render children dxf_cross dxf_dim let assign'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      NUMBERS,
      PREPRO,
      STRING,
      SPECIAL_VARS,
      MODIFIERS,
      FUNCTIONS
    ]
  };
}

module.exports = openscad;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/oxygene.js":
/*!**********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/oxygene.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Oxygene
Author: Carlo Kok <ck@remobjects.com>
Description: Oxygene is built on the foundation of Object Pascal, revamped and extended to be a modern language for the twenty-first century.
Website: https://www.elementscompiler.com/elements/default.aspx
*/

function oxygene(hljs) {
  const OXYGENE_KEYWORDS = {
    $pattern: /\.?\w+/,
    keyword:
      'abstract add and array as asc aspect assembly async begin break block by case class concat const copy constructor continue ' +
      'create default delegate desc distinct div do downto dynamic each else empty end ensure enum equals event except exit extension external false ' +
      'final finalize finalizer finally flags for forward from function future global group has if implementation implements implies in index inherited ' +
      'inline interface into invariants is iterator join locked locking loop matching method mod module namespace nested new nil not notify nullable of ' +
      'old on operator or order out override parallel params partial pinned private procedure property protected public queryable raise read readonly ' +
      'record reintroduce remove repeat require result reverse sealed select self sequence set shl shr skip static step soft take then to true try tuple ' +
      'type union unit unsafe until uses using var virtual raises volatile where while with write xor yield await mapped deprecated stdcall cdecl pascal ' +
      'register safecall overload library platform reference packed strict published autoreleasepool selector strong weak unretained'
  };
  const CURLY_COMMENT = hljs.COMMENT(
    /\{/,
    /\}/,
    {
      relevance: 0
    }
  );
  const PAREN_COMMENT = hljs.COMMENT(
    '\\(\\*',
    '\\*\\)',
    {
      relevance: 10
    }
  );
  const STRING = {
    className: 'string',
    begin: '\'',
    end: '\'',
    contains: [
      {
        begin: '\'\''
      }
    ]
  };
  const CHAR_STRING = {
    className: 'string',
    begin: '(#\\d+)+'
  };
  const FUNCTION = {
    className: 'function',
    beginKeywords: 'function constructor destructor procedure method',
    end: '[:;]',
    keywords: 'function constructor|10 destructor|10 procedure|10 method|10',
    contains: [
      hljs.TITLE_MODE,
      {
        className: 'params',
        begin: '\\(',
        end: '\\)',
        keywords: OXYGENE_KEYWORDS,
        contains: [
          STRING,
          CHAR_STRING
        ]
      },
      CURLY_COMMENT,
      PAREN_COMMENT
    ]
  };
  return {
    name: 'Oxygene',
    case_insensitive: true,
    keywords: OXYGENE_KEYWORDS,
    illegal: '("|\\$[G-Zg-z]|\\/\\*|</|=>|->)',
    contains: [
      CURLY_COMMENT,
      PAREN_COMMENT,
      hljs.C_LINE_COMMENT_MODE,
      STRING,
      CHAR_STRING,
      hljs.NUMBER_MODE,
      FUNCTION,
      {
        className: 'class',
        begin: '=\\bclass\\b',
        end: 'end;',
        keywords: OXYGENE_KEYWORDS,
        contains: [
          STRING,
          CHAR_STRING,
          CURLY_COMMENT,
          PAREN_COMMENT,
          hljs.C_LINE_COMMENT_MODE,
          FUNCTION
        ]
      }
    ]
  };
}

module.exports = oxygene;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/parser3.js":
/*!**********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/parser3.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Parser3
Requires: xml.js
Author: Oleg Volchkov <oleg@volchkov.net>
Website: https://www.parser.ru/en/
Category: template
*/

function parser3(hljs) {
  const CURLY_SUBCOMMENT = hljs.COMMENT(
    /\{/,
    /\}/,
    {
      contains: [ 'self' ]
    }
  );
  return {
    name: 'Parser3',
    subLanguage: 'xml',
    relevance: 0,
    contains: [
      hljs.COMMENT('^#', '$'),
      hljs.COMMENT(
        /\^rem\{/,
        /\}/,
        {
          relevance: 10,
          contains: [ CURLY_SUBCOMMENT ]
        }
      ),
      {
        className: 'meta',
        begin: '^@(?:BASE|USE|CLASS|OPTIONS)$',
        relevance: 10
      },
      {
        className: 'title',
        begin: '@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$'
      },
      {
        className: 'variable',
        begin: /\$\{?[\w\-.:]+\}?/
      },
      {
        className: 'keyword',
        begin: /\^[\w\-.:]+/
      },
      {
        className: 'number',
        begin: '\\^#[0-9a-fA-F]+'
      },
      hljs.C_NUMBER_MODE
    ]
  };
}

module.exports = parser3;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/perl.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/perl.js ***!
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
Language: Perl
Author: Peter Leonov <gojpeg@yandex.ru>
Website: https://www.perl.org
Category: common
*/

/** @type LanguageFn */
function perl(hljs) {
  var PERL_KEYWORDS = {
    $pattern: /[\w.]+/,
    keyword: 'getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ' +
    'ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime ' +
    'readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qq ' +
    'fileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent ' +
    'shutdown dump chomp connect getsockname die socketpair close flock exists index shmget ' +
    'sub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr ' +
    'unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 ' +
    'getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline ' +
    'endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand ' +
    'mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink ' +
    'getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr ' +
    'untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link ' +
    'getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller ' +
    'lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and ' +
    'sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 ' +
    'chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach ' +
    'tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedir ' +
    'ioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe ' +
    'atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when'
  };
  var SUBST = {
    className: 'subst',
    begin: '[$@]\\{', end: '\\}',
    keywords: PERL_KEYWORDS
  };
  var METHOD = {
    begin: /->\{/, end: /\}/
    // contains defined later
  };
  var VAR = {
    variants: [
      {begin: /\$\d/},
      {begin: concat(
        /[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        `(?![A-Za-z])(?![@$%])`
        )},
      {begin: /[$%@][^\s\w{]/, relevance: 0}
    ]
  };
  var STRING_CONTAINS = [hljs.BACKSLASH_ESCAPE, SUBST, VAR];
  var PERL_DEFAULT_CONTAINS = [
    VAR,
    hljs.HASH_COMMENT_MODE,
    hljs.COMMENT(
      /^=\w/,
      /=cut/,
      {
        endsWithParent: true
      }
    ),
    METHOD,
    {
      className: 'string',
      contains: STRING_CONTAINS,
      variants: [
        {
          begin: 'q[qwxr]?\\s*\\(', end: '\\)',
          relevance: 5
        },
        {
          begin: 'q[qwxr]?\\s*\\[', end: '\\]',
          relevance: 5
        },
        {
          begin: 'q[qwxr]?\\s*\\{', end: '\\}',
          relevance: 5
        },
        {
          begin: 'q[qwxr]?\\s*\\|', end: '\\|',
          relevance: 5
        },
        {
          begin: 'q[qwxr]?\\s*<', end: '>',
          relevance: 5
        },
        {
          begin: 'qw\\s+q', end: 'q',
          relevance: 5
        },
        {
          begin: '\'', end: '\'',
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: '"', end: '"'
        },
        {
          begin: '`', end: '`',
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /\{\w+\}/,
          contains: [],
          relevance: 0
        },
        {
          begin: '-?\\w+\\s*=>',
          contains: [],
          relevance: 0
        }
      ]
    },
    {
      className: 'number',
      begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
      relevance: 0
    },
    { // regexp container
      begin: '(\\/\\/|' + hljs.RE_STARTERS_RE + '|\\b(split|return|print|reverse|grep)\\b)\\s*',
      keywords: 'split return print reverse grep',
      relevance: 0,
      contains: [
        hljs.HASH_COMMENT_MODE,
        {
          className: 'regexp',
          begin: '(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*',
          relevance: 10
        },
        {
          className: 'regexp',
          begin: '(m|qr)?/', end: '/[a-z]*',
          contains: [hljs.BACKSLASH_ESCAPE],
          relevance: 0 // allows empty "//" which is a common comment delimiter in other languages
        }
      ]
    },
    {
      className: 'function',
      beginKeywords: 'sub', end: '(\\s*\\(.*?\\))?[;{]', excludeEnd: true,
      relevance: 5,
      contains: [hljs.TITLE_MODE]
    },
    {
      begin: '-\\w\\b',
      relevance: 0
    },
    {
      begin: "^__DATA__$",
      end: "^__END__$",
      subLanguage: 'mojolicious',
      contains: [
        {
            begin: "^@@.*",
            end: "$",
            className: "comment"
        }
      ]
    }
  ];
  SUBST.contains = PERL_DEFAULT_CONTAINS;
  METHOD.contains = PERL_DEFAULT_CONTAINS;

  return {
    name: 'Perl',
    aliases: ['pl', 'pm'],
    keywords: PERL_KEYWORDS,
    contains: PERL_DEFAULT_CONTAINS
  };
}

module.exports = perl;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/pf.js":
/*!*****************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/pf.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Packet Filter config
Description: pf.conf — packet filter configuration file (OpenBSD)
Author: Peter Piwowarski <oldlaptop654@aol.com>
Website: http://man.openbsd.org/pf.conf
Category: config
*/

function pf(hljs) {
  const MACRO = {
    className: 'variable',
    begin: /\$[\w\d#@][\w\d_]*/
  };
  const TABLE = {
    className: 'variable',
    begin: /<(?!\/)/,
    end: />/
  };

  return {
    name: 'Packet Filter config',
    aliases: [ 'pf.conf' ],
    keywords: {
      $pattern: /[a-z0-9_<>-]+/,
      built_in: /* block match pass are "actions" in pf.conf(5), the rest are
                 * lexically similar top-level commands.
                 */
        'block match pass load anchor|5 antispoof|10 set table',
      keyword:
        'in out log quick on rdomain inet inet6 proto from port os to route ' +
        'allow-opts divert-packet divert-reply divert-to flags group icmp-type ' +
        'icmp6-type label once probability recieved-on rtable prio queue ' +
        'tos tag tagged user keep fragment for os drop ' +
        'af-to|10 binat-to|10 nat-to|10 rdr-to|10 bitmask least-stats random round-robin ' +
        'source-hash static-port ' +
        'dup-to reply-to route-to ' +
        'parent bandwidth default min max qlimit ' +
        'block-policy debug fingerprints hostid limit loginterface optimization ' +
        'reassemble ruleset-optimization basic none profile skip state-defaults ' +
        'state-policy timeout ' +
        'const counters persist ' +
        'no modulate synproxy state|5 floating if-bound no-sync pflow|10 sloppy ' +
        'source-track global rule max-src-nodes max-src-states max-src-conn ' +
        'max-src-conn-rate overload flush ' +
        'scrub|5 max-mss min-ttl no-df|10 random-id',
      literal:
        'all any no-route self urpf-failed egress|5 unknown'
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      MACRO,
      TABLE
    ]
  };
}

module.exports = pf;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/pgsql.js":
/*!********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/pgsql.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: PostgreSQL and PL/pgSQL
Author: Egor Rogov (e.rogov@postgrespro.ru)
Website: https://www.postgresql.org/docs/11/sql.html
Description:
    This language incorporates both PostgreSQL SQL dialect and PL/pgSQL language.
    It is based on PostgreSQL version 11. Some notes:
    - Text in double-dollar-strings is _always_ interpreted as some programming code. Text
      in ordinary quotes is _never_ interpreted that way and highlighted just as a string.
    - There are quite a bit "special cases". That's because many keywords are not strictly
      they are keywords in some contexts and ordinary identifiers in others. Only some
      of such cases are handled; you still can get some of your identifiers highlighted
      wrong way.
    - Function names deliberately are not highlighted. There is no way to tell function
      call from other constructs, hence we can't highlight _all_ function names. And
      some names highlighted while others not looks ugly.
*/

function pgsql(hljs) {
  const COMMENT_MODE = hljs.COMMENT('--', '$');
  const UNQUOTED_IDENT = '[a-zA-Z_][a-zA-Z_0-9$]*';
  const DOLLAR_STRING = '\\$([a-zA-Z_]?|[a-zA-Z_][a-zA-Z_0-9]*)\\$';
  const LABEL = '<<\\s*' + UNQUOTED_IDENT + '\\s*>>';

  const SQL_KW =
    // https://www.postgresql.org/docs/11/static/sql-keywords-appendix.html
    // https://www.postgresql.org/docs/11/static/sql-commands.html
    // SQL commands (starting words)
    'ABORT ALTER ANALYZE BEGIN CALL CHECKPOINT|10 CLOSE CLUSTER COMMENT COMMIT COPY CREATE DEALLOCATE DECLARE ' +
    'DELETE DISCARD DO DROP END EXECUTE EXPLAIN FETCH GRANT IMPORT INSERT LISTEN LOAD LOCK MOVE NOTIFY ' +
    'PREPARE REASSIGN|10 REFRESH REINDEX RELEASE RESET REVOKE ROLLBACK SAVEPOINT SECURITY SELECT SET SHOW ' +
    'START TRUNCATE UNLISTEN|10 UPDATE VACUUM|10 VALUES ' +
    // SQL commands (others)
    'AGGREGATE COLLATION CONVERSION|10 DATABASE DEFAULT PRIVILEGES DOMAIN TRIGGER EXTENSION FOREIGN ' +
    'WRAPPER|10 TABLE FUNCTION GROUP LANGUAGE LARGE OBJECT MATERIALIZED VIEW OPERATOR CLASS ' +
    'FAMILY POLICY PUBLICATION|10 ROLE RULE SCHEMA SEQUENCE SERVER STATISTICS SUBSCRIPTION SYSTEM ' +
    'TABLESPACE CONFIGURATION DICTIONARY PARSER TEMPLATE TYPE USER MAPPING PREPARED ACCESS ' +
    'METHOD CAST AS TRANSFORM TRANSACTION OWNED TO INTO SESSION AUTHORIZATION ' +
    'INDEX PROCEDURE ASSERTION ' +
    // additional reserved key words
    'ALL ANALYSE AND ANY ARRAY ASC ASYMMETRIC|10 BOTH CASE CHECK ' +
    'COLLATE COLUMN CONCURRENTLY|10 CONSTRAINT CROSS ' +
    'DEFERRABLE RANGE ' +
    'DESC DISTINCT ELSE EXCEPT FOR FREEZE|10 FROM FULL HAVING ' +
    'ILIKE IN INITIALLY INNER INTERSECT IS ISNULL JOIN LATERAL LEADING LIKE LIMIT ' +
    'NATURAL NOT NOTNULL NULL OFFSET ON ONLY OR ORDER OUTER OVERLAPS PLACING PRIMARY ' +
    'REFERENCES RETURNING SIMILAR SOME SYMMETRIC TABLESAMPLE THEN ' +
    'TRAILING UNION UNIQUE USING VARIADIC|10 VERBOSE WHEN WHERE WINDOW WITH ' +
    // some of non-reserved (which are used in clauses or as PL/pgSQL keyword)
    'BY RETURNS INOUT OUT SETOF|10 IF STRICT CURRENT CONTINUE OWNER LOCATION OVER PARTITION WITHIN ' +
    'BETWEEN ESCAPE EXTERNAL INVOKER DEFINER WORK RENAME VERSION CONNECTION CONNECT ' +
    'TABLES TEMP TEMPORARY FUNCTIONS SEQUENCES TYPES SCHEMAS OPTION CASCADE RESTRICT ADD ADMIN ' +
    'EXISTS VALID VALIDATE ENABLE DISABLE REPLICA|10 ALWAYS PASSING COLUMNS PATH ' +
    'REF VALUE OVERRIDING IMMUTABLE STABLE VOLATILE BEFORE AFTER EACH ROW PROCEDURAL ' +
    'ROUTINE NO HANDLER VALIDATOR OPTIONS STORAGE OIDS|10 WITHOUT INHERIT DEPENDS CALLED ' +
    'INPUT LEAKPROOF|10 COST ROWS NOWAIT SEARCH UNTIL ENCRYPTED|10 PASSWORD CONFLICT|10 ' +
    'INSTEAD INHERITS CHARACTERISTICS WRITE CURSOR ALSO STATEMENT SHARE EXCLUSIVE INLINE ' +
    'ISOLATION REPEATABLE READ COMMITTED SERIALIZABLE UNCOMMITTED LOCAL GLOBAL SQL PROCEDURES ' +
    'RECURSIVE SNAPSHOT ROLLUP CUBE TRUSTED|10 INCLUDE FOLLOWING PRECEDING UNBOUNDED RANGE GROUPS ' +
    'UNENCRYPTED|10 SYSID FORMAT DELIMITER HEADER QUOTE ENCODING FILTER OFF ' +
    // some parameters of VACUUM/ANALYZE/EXPLAIN
    'FORCE_QUOTE FORCE_NOT_NULL FORCE_NULL COSTS BUFFERS TIMING SUMMARY DISABLE_PAGE_SKIPPING ' +
    //
    'RESTART CYCLE GENERATED IDENTITY DEFERRED IMMEDIATE LEVEL LOGGED UNLOGGED ' +
    'OF NOTHING NONE EXCLUDE ATTRIBUTE ' +
    // from GRANT (not keywords actually)
    'USAGE ROUTINES ' +
    // actually literals, but look better this way (due to IS TRUE, IS FALSE, ISNULL etc)
    'TRUE FALSE NAN INFINITY ';

  const ROLE_ATTRS = // only those not in keywrods already
    'SUPERUSER NOSUPERUSER CREATEDB NOCREATEDB CREATEROLE NOCREATEROLE INHERIT NOINHERIT ' +
    'LOGIN NOLOGIN REPLICATION NOREPLICATION BYPASSRLS NOBYPASSRLS ';

  const PLPGSQL_KW =
    'ALIAS BEGIN CONSTANT DECLARE END EXCEPTION RETURN PERFORM|10 RAISE GET DIAGNOSTICS ' +
    'STACKED|10 FOREACH LOOP ELSIF EXIT WHILE REVERSE SLICE DEBUG LOG INFO NOTICE WARNING ASSERT ' +
    'OPEN ';

  const TYPES =
    // https://www.postgresql.org/docs/11/static/datatype.html
    'BIGINT INT8 BIGSERIAL SERIAL8 BIT VARYING VARBIT BOOLEAN BOOL BOX BYTEA CHARACTER CHAR VARCHAR ' +
    'CIDR CIRCLE DATE DOUBLE PRECISION FLOAT8 FLOAT INET INTEGER INT INT4 INTERVAL JSON JSONB LINE LSEG|10 ' +
    'MACADDR MACADDR8 MONEY NUMERIC DEC DECIMAL PATH POINT POLYGON REAL FLOAT4 SMALLINT INT2 ' +
    'SMALLSERIAL|10 SERIAL2|10 SERIAL|10 SERIAL4|10 TEXT TIME ZONE TIMETZ|10 TIMESTAMP TIMESTAMPTZ|10 TSQUERY|10 TSVECTOR|10 ' +
    'TXID_SNAPSHOT|10 UUID XML NATIONAL NCHAR ' +
    'INT4RANGE|10 INT8RANGE|10 NUMRANGE|10 TSRANGE|10 TSTZRANGE|10 DATERANGE|10 ' +
    // pseudotypes
    'ANYELEMENT ANYARRAY ANYNONARRAY ANYENUM ANYRANGE CSTRING INTERNAL ' +
    'RECORD PG_DDL_COMMAND VOID UNKNOWN OPAQUE REFCURSOR ' +
    // spec. type
    'NAME ' +
    // OID-types
    'OID REGPROC|10 REGPROCEDURE|10 REGOPER|10 REGOPERATOR|10 REGCLASS|10 REGTYPE|10 REGROLE|10 ' +
    'REGNAMESPACE|10 REGCONFIG|10 REGDICTIONARY|10 ';// +

  const TYPES_RE =
    TYPES.trim()
      .split(' ')
      .map(function(val) { return val.split('|')[0]; })
      .join('|');

  const SQL_BI =
    'CURRENT_TIME CURRENT_TIMESTAMP CURRENT_USER CURRENT_CATALOG|10 CURRENT_DATE LOCALTIME LOCALTIMESTAMP ' +
    'CURRENT_ROLE|10 CURRENT_SCHEMA|10 SESSION_USER PUBLIC ';

  const PLPGSQL_BI =
    'FOUND NEW OLD TG_NAME|10 TG_WHEN|10 TG_LEVEL|10 TG_OP|10 TG_RELID|10 TG_RELNAME|10 ' +
    'TG_TABLE_NAME|10 TG_TABLE_SCHEMA|10 TG_NARGS|10 TG_ARGV|10 TG_EVENT|10 TG_TAG|10 ' +
    // get diagnostics
    'ROW_COUNT RESULT_OID|10 PG_CONTEXT|10 RETURNED_SQLSTATE COLUMN_NAME CONSTRAINT_NAME ' +
    'PG_DATATYPE_NAME|10 MESSAGE_TEXT TABLE_NAME SCHEMA_NAME PG_EXCEPTION_DETAIL|10 ' +
    'PG_EXCEPTION_HINT|10 PG_EXCEPTION_CONTEXT|10 ';

  const PLPGSQL_EXCEPTIONS =
    // exceptions https://www.postgresql.org/docs/current/static/errcodes-appendix.html
    'SQLSTATE SQLERRM|10 ' +
    'SUCCESSFUL_COMPLETION WARNING DYNAMIC_RESULT_SETS_RETURNED IMPLICIT_ZERO_BIT_PADDING ' +
    'NULL_VALUE_ELIMINATED_IN_SET_FUNCTION PRIVILEGE_NOT_GRANTED PRIVILEGE_NOT_REVOKED ' +
    'STRING_DATA_RIGHT_TRUNCATION DEPRECATED_FEATURE NO_DATA NO_ADDITIONAL_DYNAMIC_RESULT_SETS_RETURNED ' +
    'SQL_STATEMENT_NOT_YET_COMPLETE CONNECTION_EXCEPTION CONNECTION_DOES_NOT_EXIST CONNECTION_FAILURE ' +
    'SQLCLIENT_UNABLE_TO_ESTABLISH_SQLCONNECTION SQLSERVER_REJECTED_ESTABLISHMENT_OF_SQLCONNECTION ' +
    'TRANSACTION_RESOLUTION_UNKNOWN PROTOCOL_VIOLATION TRIGGERED_ACTION_EXCEPTION FEATURE_NOT_SUPPORTED ' +
    'INVALID_TRANSACTION_INITIATION LOCATOR_EXCEPTION INVALID_LOCATOR_SPECIFICATION INVALID_GRANTOR ' +
    'INVALID_GRANT_OPERATION INVALID_ROLE_SPECIFICATION DIAGNOSTICS_EXCEPTION ' +
    'STACKED_DIAGNOSTICS_ACCESSED_WITHOUT_ACTIVE_HANDLER CASE_NOT_FOUND CARDINALITY_VIOLATION ' +
    'DATA_EXCEPTION ARRAY_SUBSCRIPT_ERROR CHARACTER_NOT_IN_REPERTOIRE DATETIME_FIELD_OVERFLOW ' +
    'DIVISION_BY_ZERO ERROR_IN_ASSIGNMENT ESCAPE_CHARACTER_CONFLICT INDICATOR_OVERFLOW ' +
    'INTERVAL_FIELD_OVERFLOW INVALID_ARGUMENT_FOR_LOGARITHM INVALID_ARGUMENT_FOR_NTILE_FUNCTION ' +
    'INVALID_ARGUMENT_FOR_NTH_VALUE_FUNCTION INVALID_ARGUMENT_FOR_POWER_FUNCTION ' +
    'INVALID_ARGUMENT_FOR_WIDTH_BUCKET_FUNCTION INVALID_CHARACTER_VALUE_FOR_CAST ' +
    'INVALID_DATETIME_FORMAT INVALID_ESCAPE_CHARACTER INVALID_ESCAPE_OCTET INVALID_ESCAPE_SEQUENCE ' +
    'NONSTANDARD_USE_OF_ESCAPE_CHARACTER INVALID_INDICATOR_PARAMETER_VALUE INVALID_PARAMETER_VALUE ' +
    'INVALID_REGULAR_EXPRESSION INVALID_ROW_COUNT_IN_LIMIT_CLAUSE ' +
    'INVALID_ROW_COUNT_IN_RESULT_OFFSET_CLAUSE INVALID_TABLESAMPLE_ARGUMENT INVALID_TABLESAMPLE_REPEAT ' +
    'INVALID_TIME_ZONE_DISPLACEMENT_VALUE INVALID_USE_OF_ESCAPE_CHARACTER MOST_SPECIFIC_TYPE_MISMATCH ' +
    'NULL_VALUE_NOT_ALLOWED NULL_VALUE_NO_INDICATOR_PARAMETER NUMERIC_VALUE_OUT_OF_RANGE ' +
    'SEQUENCE_GENERATOR_LIMIT_EXCEEDED STRING_DATA_LENGTH_MISMATCH STRING_DATA_RIGHT_TRUNCATION ' +
    'SUBSTRING_ERROR TRIM_ERROR UNTERMINATED_C_STRING ZERO_LENGTH_CHARACTER_STRING ' +
    'FLOATING_POINT_EXCEPTION INVALID_TEXT_REPRESENTATION INVALID_BINARY_REPRESENTATION ' +
    'BAD_COPY_FILE_FORMAT UNTRANSLATABLE_CHARACTER NOT_AN_XML_DOCUMENT INVALID_XML_DOCUMENT ' +
    'INVALID_XML_CONTENT INVALID_XML_COMMENT INVALID_XML_PROCESSING_INSTRUCTION ' +
    'INTEGRITY_CONSTRAINT_VIOLATION RESTRICT_VIOLATION NOT_NULL_VIOLATION FOREIGN_KEY_VIOLATION ' +
    'UNIQUE_VIOLATION CHECK_VIOLATION EXCLUSION_VIOLATION INVALID_CURSOR_STATE ' +
    'INVALID_TRANSACTION_STATE ACTIVE_SQL_TRANSACTION BRANCH_TRANSACTION_ALREADY_ACTIVE ' +
    'HELD_CURSOR_REQUIRES_SAME_ISOLATION_LEVEL INAPPROPRIATE_ACCESS_MODE_FOR_BRANCH_TRANSACTION ' +
    'INAPPROPRIATE_ISOLATION_LEVEL_FOR_BRANCH_TRANSACTION ' +
    'NO_ACTIVE_SQL_TRANSACTION_FOR_BRANCH_TRANSACTION READ_ONLY_SQL_TRANSACTION ' +
    'SCHEMA_AND_DATA_STATEMENT_MIXING_NOT_SUPPORTED NO_ACTIVE_SQL_TRANSACTION ' +
    'IN_FAILED_SQL_TRANSACTION IDLE_IN_TRANSACTION_SESSION_TIMEOUT INVALID_SQL_STATEMENT_NAME ' +
    'TRIGGERED_DATA_CHANGE_VIOLATION INVALID_AUTHORIZATION_SPECIFICATION INVALID_PASSWORD ' +
    'DEPENDENT_PRIVILEGE_DESCRIPTORS_STILL_EXIST DEPENDENT_OBJECTS_STILL_EXIST ' +
    'INVALID_TRANSACTION_TERMINATION SQL_ROUTINE_EXCEPTION FUNCTION_EXECUTED_NO_RETURN_STATEMENT ' +
    'MODIFYING_SQL_DATA_NOT_PERMITTED PROHIBITED_SQL_STATEMENT_ATTEMPTED ' +
    'READING_SQL_DATA_NOT_PERMITTED INVALID_CURSOR_NAME EXTERNAL_ROUTINE_EXCEPTION ' +
    'CONTAINING_SQL_NOT_PERMITTED MODIFYING_SQL_DATA_NOT_PERMITTED ' +
    'PROHIBITED_SQL_STATEMENT_ATTEMPTED READING_SQL_DATA_NOT_PERMITTED ' +
    'EXTERNAL_ROUTINE_INVOCATION_EXCEPTION INVALID_SQLSTATE_RETURNED NULL_VALUE_NOT_ALLOWED ' +
    'TRIGGER_PROTOCOL_VIOLATED SRF_PROTOCOL_VIOLATED EVENT_TRIGGER_PROTOCOL_VIOLATED ' +
    'SAVEPOINT_EXCEPTION INVALID_SAVEPOINT_SPECIFICATION INVALID_CATALOG_NAME ' +
    'INVALID_SCHEMA_NAME TRANSACTION_ROLLBACK TRANSACTION_INTEGRITY_CONSTRAINT_VIOLATION ' +
    'SERIALIZATION_FAILURE STATEMENT_COMPLETION_UNKNOWN DEADLOCK_DETECTED ' +
    'SYNTAX_ERROR_OR_ACCESS_RULE_VIOLATION SYNTAX_ERROR INSUFFICIENT_PRIVILEGE CANNOT_COERCE ' +
    'GROUPING_ERROR WINDOWING_ERROR INVALID_RECURSION INVALID_FOREIGN_KEY INVALID_NAME ' +
    'NAME_TOO_LONG RESERVED_NAME DATATYPE_MISMATCH INDETERMINATE_DATATYPE COLLATION_MISMATCH ' +
    'INDETERMINATE_COLLATION WRONG_OBJECT_TYPE GENERATED_ALWAYS UNDEFINED_COLUMN ' +
    'UNDEFINED_FUNCTION UNDEFINED_TABLE UNDEFINED_PARAMETER UNDEFINED_OBJECT ' +
    'DUPLICATE_COLUMN DUPLICATE_CURSOR DUPLICATE_DATABASE DUPLICATE_FUNCTION ' +
    'DUPLICATE_PREPARED_STATEMENT DUPLICATE_SCHEMA DUPLICATE_TABLE DUPLICATE_ALIAS ' +
    'DUPLICATE_OBJECT AMBIGUOUS_COLUMN AMBIGUOUS_FUNCTION AMBIGUOUS_PARAMETER AMBIGUOUS_ALIAS ' +
    'INVALID_COLUMN_REFERENCE INVALID_COLUMN_DEFINITION INVALID_CURSOR_DEFINITION ' +
    'INVALID_DATABASE_DEFINITION INVALID_FUNCTION_DEFINITION ' +
    'INVALID_PREPARED_STATEMENT_DEFINITION INVALID_SCHEMA_DEFINITION INVALID_TABLE_DEFINITION ' +
    'INVALID_OBJECT_DEFINITION WITH_CHECK_OPTION_VIOLATION INSUFFICIENT_RESOURCES DISK_FULL ' +
    'OUT_OF_MEMORY TOO_MANY_CONNECTIONS CONFIGURATION_LIMIT_EXCEEDED PROGRAM_LIMIT_EXCEEDED ' +
    'STATEMENT_TOO_COMPLEX TOO_MANY_COLUMNS TOO_MANY_ARGUMENTS OBJECT_NOT_IN_PREREQUISITE_STATE ' +
    'OBJECT_IN_USE CANT_CHANGE_RUNTIME_PARAM LOCK_NOT_AVAILABLE OPERATOR_INTERVENTION ' +
    'QUERY_CANCELED ADMIN_SHUTDOWN CRASH_SHUTDOWN CANNOT_CONNECT_NOW DATABASE_DROPPED ' +
    'SYSTEM_ERROR IO_ERROR UNDEFINED_FILE DUPLICATE_FILE SNAPSHOT_TOO_OLD CONFIG_FILE_ERROR ' +
    'LOCK_FILE_EXISTS FDW_ERROR FDW_COLUMN_NAME_NOT_FOUND FDW_DYNAMIC_PARAMETER_VALUE_NEEDED ' +
    'FDW_FUNCTION_SEQUENCE_ERROR FDW_INCONSISTENT_DESCRIPTOR_INFORMATION ' +
    'FDW_INVALID_ATTRIBUTE_VALUE FDW_INVALID_COLUMN_NAME FDW_INVALID_COLUMN_NUMBER ' +
    'FDW_INVALID_DATA_TYPE FDW_INVALID_DATA_TYPE_DESCRIPTORS ' +
    'FDW_INVALID_DESCRIPTOR_FIELD_IDENTIFIER FDW_INVALID_HANDLE FDW_INVALID_OPTION_INDEX ' +
    'FDW_INVALID_OPTION_NAME FDW_INVALID_STRING_LENGTH_OR_BUFFER_LENGTH ' +
    'FDW_INVALID_STRING_FORMAT FDW_INVALID_USE_OF_NULL_POINTER FDW_TOO_MANY_HANDLES ' +
    'FDW_OUT_OF_MEMORY FDW_NO_SCHEMAS FDW_OPTION_NAME_NOT_FOUND FDW_REPLY_HANDLE ' +
    'FDW_SCHEMA_NOT_FOUND FDW_TABLE_NOT_FOUND FDW_UNABLE_TO_CREATE_EXECUTION ' +
    'FDW_UNABLE_TO_CREATE_REPLY FDW_UNABLE_TO_ESTABLISH_CONNECTION PLPGSQL_ERROR ' +
    'RAISE_EXCEPTION NO_DATA_FOUND TOO_MANY_ROWS ASSERT_FAILURE INTERNAL_ERROR DATA_CORRUPTED ' +
    'INDEX_CORRUPTED ';

  const FUNCTIONS =
    // https://www.postgresql.org/docs/11/static/functions-aggregate.html
    'ARRAY_AGG AVG BIT_AND BIT_OR BOOL_AND BOOL_OR COUNT EVERY JSON_AGG JSONB_AGG JSON_OBJECT_AGG ' +
    'JSONB_OBJECT_AGG MAX MIN MODE STRING_AGG SUM XMLAGG ' +
    'CORR COVAR_POP COVAR_SAMP REGR_AVGX REGR_AVGY REGR_COUNT REGR_INTERCEPT REGR_R2 REGR_SLOPE ' +
    'REGR_SXX REGR_SXY REGR_SYY STDDEV STDDEV_POP STDDEV_SAMP VARIANCE VAR_POP VAR_SAMP ' +
    'PERCENTILE_CONT PERCENTILE_DISC ' +
    // https://www.postgresql.org/docs/11/static/functions-window.html
    'ROW_NUMBER RANK DENSE_RANK PERCENT_RANK CUME_DIST NTILE LAG LEAD FIRST_VALUE LAST_VALUE NTH_VALUE ' +
    // https://www.postgresql.org/docs/11/static/functions-comparison.html
    'NUM_NONNULLS NUM_NULLS ' +
    // https://www.postgresql.org/docs/11/static/functions-math.html
    'ABS CBRT CEIL CEILING DEGREES DIV EXP FLOOR LN LOG MOD PI POWER RADIANS ROUND SCALE SIGN SQRT ' +
    'TRUNC WIDTH_BUCKET ' +
    'RANDOM SETSEED ' +
    'ACOS ACOSD ASIN ASIND ATAN ATAND ATAN2 ATAN2D COS COSD COT COTD SIN SIND TAN TAND ' +
    // https://www.postgresql.org/docs/11/static/functions-string.html
    'BIT_LENGTH CHAR_LENGTH CHARACTER_LENGTH LOWER OCTET_LENGTH OVERLAY POSITION SUBSTRING TREAT TRIM UPPER ' +
    'ASCII BTRIM CHR CONCAT CONCAT_WS CONVERT CONVERT_FROM CONVERT_TO DECODE ENCODE INITCAP ' +
    'LEFT LENGTH LPAD LTRIM MD5 PARSE_IDENT PG_CLIENT_ENCODING QUOTE_IDENT|10 QUOTE_LITERAL|10 ' +
    'QUOTE_NULLABLE|10 REGEXP_MATCH REGEXP_MATCHES REGEXP_REPLACE REGEXP_SPLIT_TO_ARRAY ' +
    'REGEXP_SPLIT_TO_TABLE REPEAT REPLACE REVERSE RIGHT RPAD RTRIM SPLIT_PART STRPOS SUBSTR ' +
    'TO_ASCII TO_HEX TRANSLATE ' +
    // https://www.postgresql.org/docs/11/static/functions-binarystring.html
    'OCTET_LENGTH GET_BIT GET_BYTE SET_BIT SET_BYTE ' +
    // https://www.postgresql.org/docs/11/static/functions-formatting.html
    'TO_CHAR TO_DATE TO_NUMBER TO_TIMESTAMP ' +
    // https://www.postgresql.org/docs/11/static/functions-datetime.html
    'AGE CLOCK_TIMESTAMP|10 DATE_PART DATE_TRUNC ISFINITE JUSTIFY_DAYS JUSTIFY_HOURS JUSTIFY_INTERVAL ' +
    'MAKE_DATE MAKE_INTERVAL|10 MAKE_TIME MAKE_TIMESTAMP|10 MAKE_TIMESTAMPTZ|10 NOW STATEMENT_TIMESTAMP|10 ' +
    'TIMEOFDAY TRANSACTION_TIMESTAMP|10 ' +
    // https://www.postgresql.org/docs/11/static/functions-enum.html
    'ENUM_FIRST ENUM_LAST ENUM_RANGE ' +
    // https://www.postgresql.org/docs/11/static/functions-geometry.html
    'AREA CENTER DIAMETER HEIGHT ISCLOSED ISOPEN NPOINTS PCLOSE POPEN RADIUS WIDTH ' +
    'BOX BOUND_BOX CIRCLE LINE LSEG PATH POLYGON ' +
    // https://www.postgresql.org/docs/11/static/functions-net.html
    'ABBREV BROADCAST HOST HOSTMASK MASKLEN NETMASK NETWORK SET_MASKLEN TEXT INET_SAME_FAMILY ' +
    'INET_MERGE MACADDR8_SET7BIT ' +
    // https://www.postgresql.org/docs/11/static/functions-textsearch.html
    'ARRAY_TO_TSVECTOR GET_CURRENT_TS_CONFIG NUMNODE PLAINTO_TSQUERY PHRASETO_TSQUERY WEBSEARCH_TO_TSQUERY ' +
    'QUERYTREE SETWEIGHT STRIP TO_TSQUERY TO_TSVECTOR JSON_TO_TSVECTOR JSONB_TO_TSVECTOR TS_DELETE ' +
    'TS_FILTER TS_HEADLINE TS_RANK TS_RANK_CD TS_REWRITE TSQUERY_PHRASE TSVECTOR_TO_ARRAY ' +
    'TSVECTOR_UPDATE_TRIGGER TSVECTOR_UPDATE_TRIGGER_COLUMN ' +
    // https://www.postgresql.org/docs/11/static/functions-xml.html
    'XMLCOMMENT XMLCONCAT XMLELEMENT XMLFOREST XMLPI XMLROOT ' +
    'XMLEXISTS XML_IS_WELL_FORMED XML_IS_WELL_FORMED_DOCUMENT XML_IS_WELL_FORMED_CONTENT ' +
    'XPATH XPATH_EXISTS XMLTABLE XMLNAMESPACES ' +
    'TABLE_TO_XML TABLE_TO_XMLSCHEMA TABLE_TO_XML_AND_XMLSCHEMA ' +
    'QUERY_TO_XML QUERY_TO_XMLSCHEMA QUERY_TO_XML_AND_XMLSCHEMA ' +
    'CURSOR_TO_XML CURSOR_TO_XMLSCHEMA ' +
    'SCHEMA_TO_XML SCHEMA_TO_XMLSCHEMA SCHEMA_TO_XML_AND_XMLSCHEMA ' +
    'DATABASE_TO_XML DATABASE_TO_XMLSCHEMA DATABASE_TO_XML_AND_XMLSCHEMA ' +
    'XMLATTRIBUTES ' +
    // https://www.postgresql.org/docs/11/static/functions-json.html
    'TO_JSON TO_JSONB ARRAY_TO_JSON ROW_TO_JSON JSON_BUILD_ARRAY JSONB_BUILD_ARRAY JSON_BUILD_OBJECT ' +
    'JSONB_BUILD_OBJECT JSON_OBJECT JSONB_OBJECT JSON_ARRAY_LENGTH JSONB_ARRAY_LENGTH JSON_EACH ' +
    'JSONB_EACH JSON_EACH_TEXT JSONB_EACH_TEXT JSON_EXTRACT_PATH JSONB_EXTRACT_PATH ' +
    'JSON_OBJECT_KEYS JSONB_OBJECT_KEYS JSON_POPULATE_RECORD JSONB_POPULATE_RECORD JSON_POPULATE_RECORDSET ' +
    'JSONB_POPULATE_RECORDSET JSON_ARRAY_ELEMENTS JSONB_ARRAY_ELEMENTS JSON_ARRAY_ELEMENTS_TEXT ' +
    'JSONB_ARRAY_ELEMENTS_TEXT JSON_TYPEOF JSONB_TYPEOF JSON_TO_RECORD JSONB_TO_RECORD JSON_TO_RECORDSET ' +
    'JSONB_TO_RECORDSET JSON_STRIP_NULLS JSONB_STRIP_NULLS JSONB_SET JSONB_INSERT JSONB_PRETTY ' +
    // https://www.postgresql.org/docs/11/static/functions-sequence.html
    'CURRVAL LASTVAL NEXTVAL SETVAL ' +
    // https://www.postgresql.org/docs/11/static/functions-conditional.html
    'COALESCE NULLIF GREATEST LEAST ' +
    // https://www.postgresql.org/docs/11/static/functions-array.html
    'ARRAY_APPEND ARRAY_CAT ARRAY_NDIMS ARRAY_DIMS ARRAY_FILL ARRAY_LENGTH ARRAY_LOWER ARRAY_POSITION ' +
    'ARRAY_POSITIONS ARRAY_PREPEND ARRAY_REMOVE ARRAY_REPLACE ARRAY_TO_STRING ARRAY_UPPER CARDINALITY ' +
    'STRING_TO_ARRAY UNNEST ' +
    // https://www.postgresql.org/docs/11/static/functions-range.html
    'ISEMPTY LOWER_INC UPPER_INC LOWER_INF UPPER_INF RANGE_MERGE ' +
    // https://www.postgresql.org/docs/11/static/functions-srf.html
    'GENERATE_SERIES GENERATE_SUBSCRIPTS ' +
    // https://www.postgresql.org/docs/11/static/functions-info.html
    'CURRENT_DATABASE CURRENT_QUERY CURRENT_SCHEMA|10 CURRENT_SCHEMAS|10 INET_CLIENT_ADDR INET_CLIENT_PORT ' +
    'INET_SERVER_ADDR INET_SERVER_PORT ROW_SECURITY_ACTIVE FORMAT_TYPE ' +
    'TO_REGCLASS TO_REGPROC TO_REGPROCEDURE TO_REGOPER TO_REGOPERATOR TO_REGTYPE TO_REGNAMESPACE TO_REGROLE ' +
    'COL_DESCRIPTION OBJ_DESCRIPTION SHOBJ_DESCRIPTION ' +
    'TXID_CURRENT TXID_CURRENT_IF_ASSIGNED TXID_CURRENT_SNAPSHOT TXID_SNAPSHOT_XIP TXID_SNAPSHOT_XMAX ' +
    'TXID_SNAPSHOT_XMIN TXID_VISIBLE_IN_SNAPSHOT TXID_STATUS ' +
    // https://www.postgresql.org/docs/11/static/functions-admin.html
    'CURRENT_SETTING SET_CONFIG BRIN_SUMMARIZE_NEW_VALUES BRIN_SUMMARIZE_RANGE BRIN_DESUMMARIZE_RANGE ' +
    'GIN_CLEAN_PENDING_LIST ' +
    // https://www.postgresql.org/docs/11/static/functions-trigger.html
    'SUPPRESS_REDUNDANT_UPDATES_TRIGGER ' +
    // ihttps://www.postgresql.org/docs/devel/static/lo-funcs.html
    'LO_FROM_BYTEA LO_PUT LO_GET LO_CREAT LO_CREATE LO_UNLINK LO_IMPORT LO_EXPORT LOREAD LOWRITE ' +
    //
    'GROUPING CAST ';

  const FUNCTIONS_RE =
      FUNCTIONS.trim()
        .split(' ')
        .map(function(val) { return val.split('|')[0]; })
        .join('|');

  return {
    name: 'PostgreSQL',
    aliases: [
      'postgres',
      'postgresql'
    ],
    case_insensitive: true,
    keywords: {
      keyword:
            SQL_KW + PLPGSQL_KW + ROLE_ATTRS,
      built_in:
            SQL_BI + PLPGSQL_BI + PLPGSQL_EXCEPTIONS
    },
    // Forbid some cunstructs from other languages to improve autodetect. In fact
    // "[a-z]:" is legal (as part of array slice), but improbabal.
    illegal: /:==|\W\s*\(\*|(^|\s)\$[a-z]|\{\{|[a-z]:\s*$|\.\.\.|TO:|DO:/,
    contains: [
      // special handling of some words, which are reserved only in some contexts
      {
        className: 'keyword',
        variants: [
          {
            begin: /\bTEXT\s*SEARCH\b/
          },
          {
            begin: /\b(PRIMARY|FOREIGN|FOR(\s+NO)?)\s+KEY\b/
          },
          {
            begin: /\bPARALLEL\s+(UNSAFE|RESTRICTED|SAFE)\b/
          },
          {
            begin: /\bSTORAGE\s+(PLAIN|EXTERNAL|EXTENDED|MAIN)\b/
          },
          {
            begin: /\bMATCH\s+(FULL|PARTIAL|SIMPLE)\b/
          },
          {
            begin: /\bNULLS\s+(FIRST|LAST)\b/
          },
          {
            begin: /\bEVENT\s+TRIGGER\b/
          },
          {
            begin: /\b(MAPPING|OR)\s+REPLACE\b/
          },
          {
            begin: /\b(FROM|TO)\s+(PROGRAM|STDIN|STDOUT)\b/
          },
          {
            begin: /\b(SHARE|EXCLUSIVE)\s+MODE\b/
          },
          {
            begin: /\b(LEFT|RIGHT)\s+(OUTER\s+)?JOIN\b/
          },
          {
            begin: /\b(FETCH|MOVE)\s+(NEXT|PRIOR|FIRST|LAST|ABSOLUTE|RELATIVE|FORWARD|BACKWARD)\b/
          },
          {
            begin: /\bPRESERVE\s+ROWS\b/
          },
          {
            begin: /\bDISCARD\s+PLANS\b/
          },
          {
            begin: /\bREFERENCING\s+(OLD|NEW)\b/
          },
          {
            begin: /\bSKIP\s+LOCKED\b/
          },
          {
            begin: /\bGROUPING\s+SETS\b/
          },
          {
            begin: /\b(BINARY|INSENSITIVE|SCROLL|NO\s+SCROLL)\s+(CURSOR|FOR)\b/
          },
          {
            begin: /\b(WITH|WITHOUT)\s+HOLD\b/
          },
          {
            begin: /\bWITH\s+(CASCADED|LOCAL)\s+CHECK\s+OPTION\b/
          },
          {
            begin: /\bEXCLUDE\s+(TIES|NO\s+OTHERS)\b/
          },
          {
            begin: /\bFORMAT\s+(TEXT|XML|JSON|YAML)\b/
          },
          {
            begin: /\bSET\s+((SESSION|LOCAL)\s+)?NAMES\b/
          },
          {
            begin: /\bIS\s+(NOT\s+)?UNKNOWN\b/
          },
          {
            begin: /\bSECURITY\s+LABEL\b/
          },
          {
            begin: /\bSTANDALONE\s+(YES|NO|NO\s+VALUE)\b/
          },
          {
            begin: /\bWITH\s+(NO\s+)?DATA\b/
          },
          {
            begin: /\b(FOREIGN|SET)\s+DATA\b/
          },
          {
            begin: /\bSET\s+(CATALOG|CONSTRAINTS)\b/
          },
          {
            begin: /\b(WITH|FOR)\s+ORDINALITY\b/
          },
          {
            begin: /\bIS\s+(NOT\s+)?DOCUMENT\b/
          },
          {
            begin: /\bXML\s+OPTION\s+(DOCUMENT|CONTENT)\b/
          },
          {
            begin: /\b(STRIP|PRESERVE)\s+WHITESPACE\b/
          },
          {
            begin: /\bNO\s+(ACTION|MAXVALUE|MINVALUE)\b/
          },
          {
            begin: /\bPARTITION\s+BY\s+(RANGE|LIST|HASH)\b/
          },
          {
            begin: /\bAT\s+TIME\s+ZONE\b/
          },
          {
            begin: /\bGRANTED\s+BY\b/
          },
          {
            begin: /\bRETURN\s+(QUERY|NEXT)\b/
          },
          {
            begin: /\b(ATTACH|DETACH)\s+PARTITION\b/
          },
          {
            begin: /\bFORCE\s+ROW\s+LEVEL\s+SECURITY\b/
          },
          {
            begin: /\b(INCLUDING|EXCLUDING)\s+(COMMENTS|CONSTRAINTS|DEFAULTS|IDENTITY|INDEXES|STATISTICS|STORAGE|ALL)\b/
          },
          {
            begin: /\bAS\s+(ASSIGNMENT|IMPLICIT|PERMISSIVE|RESTRICTIVE|ENUM|RANGE)\b/
          }
        ]
      },
      // functions named as keywords, followed by '('
      {
        begin: /\b(FORMAT|FAMILY|VERSION)\s*\(/
        // keywords: { built_in: 'FORMAT FAMILY VERSION' }
      },
      // INCLUDE ( ... ) in index_parameters in CREATE TABLE
      {
        begin: /\bINCLUDE\s*\(/,
        keywords: 'INCLUDE'
      },
      // not highlight RANGE if not in frame_clause (not 100% correct, but seems satisfactory)
      {
        begin: /\bRANGE(?!\s*(BETWEEN|UNBOUNDED|CURRENT|[-0-9]+))/
      },
      // disable highlighting in commands CREATE AGGREGATE/COLLATION/DATABASE/OPERTOR/TEXT SEARCH .../TYPE
      // and in PL/pgSQL RAISE ... USING
      {
        begin: /\b(VERSION|OWNER|TEMPLATE|TABLESPACE|CONNECTION\s+LIMIT|PROCEDURE|RESTRICT|JOIN|PARSER|COPY|START|END|COLLATION|INPUT|ANALYZE|STORAGE|LIKE|DEFAULT|DELIMITER|ENCODING|COLUMN|CONSTRAINT|TABLE|SCHEMA)\s*=/
      },
      // PG_smth; HAS_some_PRIVILEGE
      {
        // className: 'built_in',
        begin: /\b(PG_\w+?|HAS_[A-Z_]+_PRIVILEGE)\b/,
        relevance: 10
      },
      // extract
      {
        begin: /\bEXTRACT\s*\(/,
        end: /\bFROM\b/,
        returnEnd: true,
        keywords: {
          // built_in: 'EXTRACT',
          type: 'CENTURY DAY DECADE DOW DOY EPOCH HOUR ISODOW ISOYEAR MICROSECONDS ' +
                        'MILLENNIUM MILLISECONDS MINUTE MONTH QUARTER SECOND TIMEZONE TIMEZONE_HOUR ' +
                        'TIMEZONE_MINUTE WEEK YEAR'
        }
      },
      // xmlelement, xmlpi - special NAME
      {
        begin: /\b(XMLELEMENT|XMLPI)\s*\(\s*NAME/,
        keywords: {
          // built_in: 'XMLELEMENT XMLPI',
          keyword: 'NAME'
        }
      },
      // xmlparse, xmlserialize
      {
        begin: /\b(XMLPARSE|XMLSERIALIZE)\s*\(\s*(DOCUMENT|CONTENT)/,
        keywords: {
          // built_in: 'XMLPARSE XMLSERIALIZE',
          keyword: 'DOCUMENT CONTENT'
        }
      },
      // Sequences. We actually skip everything between CACHE|INCREMENT|MAXVALUE|MINVALUE and
      // nearest following numeric constant. Without with trick we find a lot of "keywords"
      // in 'avrasm' autodetection test...
      {
        beginKeywords: 'CACHE INCREMENT MAXVALUE MINVALUE',
        end: hljs.C_NUMBER_RE,
        returnEnd: true,
        keywords: 'BY CACHE INCREMENT MAXVALUE MINVALUE'
      },
      // WITH|WITHOUT TIME ZONE as part of datatype
      {
        className: 'type',
        begin: /\b(WITH|WITHOUT)\s+TIME\s+ZONE\b/
      },
      // INTERVAL optional fields
      {
        className: 'type',
        begin: /\bINTERVAL\s+(YEAR|MONTH|DAY|HOUR|MINUTE|SECOND)(\s+TO\s+(MONTH|HOUR|MINUTE|SECOND))?\b/
      },
      // Pseudo-types which allowed only as return type
      {
        begin: /\bRETURNS\s+(LANGUAGE_HANDLER|TRIGGER|EVENT_TRIGGER|FDW_HANDLER|INDEX_AM_HANDLER|TSM_HANDLER)\b/,
        keywords: {
          keyword: 'RETURNS',
          type: 'LANGUAGE_HANDLER TRIGGER EVENT_TRIGGER FDW_HANDLER INDEX_AM_HANDLER TSM_HANDLER'
        }
      },
      // Known functions - only when followed by '('
      {
        begin: '\\b(' + FUNCTIONS_RE + ')\\s*\\('
        // keywords: { built_in: FUNCTIONS }
      },
      // Types
      {
        begin: '\\.(' + TYPES_RE + ')\\b' // prevent highlight as type, say, 'oid' in 'pgclass.oid'
      },
      {
        begin: '\\b(' + TYPES_RE + ')\\s+PATH\\b', // in XMLTABLE
        keywords: {
          keyword: 'PATH', // hopefully no one would use PATH type in XMLTABLE...
          type: TYPES.replace('PATH ', '')
        }
      },
      {
        className: 'type',
        begin: '\\b(' + TYPES_RE + ')\\b'
      },
      // Strings, see https://www.postgresql.org/docs/11/static/sql-syntax-lexical.html#SQL-SYNTAX-CONSTANTS
      {
        className: 'string',
        begin: '\'',
        end: '\'',
        contains: [
          {
            begin: '\'\''
          }
        ]
      },
      {
        className: 'string',
        begin: '(e|E|u&|U&)\'',
        end: '\'',
        contains: [
          {
            begin: '\\\\.'
          }
        ],
        relevance: 10
      },
      hljs.END_SAME_AS_BEGIN({
        begin: DOLLAR_STRING,
        end: DOLLAR_STRING,
        contains: [
          {
            // actually we want them all except SQL; listed are those with known implementations
            // and XML + JSON just in case
            subLanguage: [
              'pgsql',
              'perl',
              'python',
              'tcl',
              'r',
              'lua',
              'java',
              'php',
              'ruby',
              'bash',
              'scheme',
              'xml',
              'json'
            ],
            endsWithParent: true
          }
        ]
      }),
      // identifiers in quotes
      {
        begin: '"',
        end: '"',
        contains: [
          {
            begin: '""'
          }
        ]
      },
      // numbers
      hljs.C_NUMBER_MODE,
      // comments
      hljs.C_BLOCK_COMMENT_MODE,
      COMMENT_MODE,
      // PL/pgSQL staff
      // %ROWTYPE, %TYPE, $n
      {
        className: 'meta',
        variants: [
          { // %TYPE, %ROWTYPE
            begin: '%(ROW)?TYPE',
            relevance: 10
          },
          { // $n
            begin: '\\$\\d+'
          },
          { // #compiler option
            begin: '^#\\w',
            end: '$'
          }
        ]
      },
      // <<labeles>>
      {
        className: 'symbol',
        begin: LABEL,
        relevance: 10
      }
    ]
  };
}

module.exports = pgsql;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/php-template.js":
/*!***************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/php-template.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: PHP Template
Requires: xml.js, php.js
Author: Josh Goebel <hello@joshgoebel.com>
Website: https://www.php.net
Category: common
*/

function phpTemplate(hljs) {
  return {
    name: "PHP template",
    subLanguage: 'xml',
    contains: [
      {
        begin: /<\?(php|=)?/,
        end: /\?>/,
        subLanguage: 'php',
        contains: [
          // We don't want the php closing tag ?> to close the PHP block when
          // inside any of the following blocks:
          {
            begin: '/\\*',
            end: '\\*/',
            skip: true
          },
          {
            begin: 'b"',
            end: '"',
            skip: true
          },
          {
            begin: 'b\'',
            end: '\'',
            skip: true
          },
          hljs.inherit(hljs.APOS_STRING_MODE, {
            illegal: null,
            className: null,
            contains: null,
            skip: true
          }),
          hljs.inherit(hljs.QUOTE_STRING_MODE, {
            illegal: null,
            className: null,
            contains: null,
            skip: true
          })
        ]
      }
    ]
  };
}

module.exports = phpTemplate;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/php.js":
/*!******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/php.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: PHP
Author: Victor Karamzin <Victor.Karamzin@enterra-inc.com>
Contributors: Evgeny Stepanischev <imbolk@gmail.com>, Ivan Sagalaev <maniac@softwaremaniacs.org>
Website: https://www.php.net
Category: common
*/

/**
 * @param {HLJSApi} hljs
 * @returns {LanguageDetail}
 * */
function php(hljs) {
  const VARIABLE = {
    className: 'variable',
    begin: '\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*' +
      // negative look-ahead tries to avoid matching patterns that are not
      // Perl at all like $ident$, @ident@, etc.
      `(?![A-Za-z0-9])(?![$])`
  };
  const PREPROCESSOR = {
    className: 'meta',
    variants: [
      { begin: /<\?php/, relevance: 10 }, // boost for obvious PHP
      { begin: /<\?[=]?/ },
      { begin: /\?>/ } // end php tag
    ]
  };
  const SUBST = {
    className: 'subst',
    variants: [
      { begin: /\$\w+/ },
      { begin: /\{\$/, end: /\}/ }
    ]
  };
  const SINGLE_QUOTED = hljs.inherit(hljs.APOS_STRING_MODE, {
    illegal: null,
  });
  const DOUBLE_QUOTED = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    illegal: null,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST),
  });
  const HEREDOC = hljs.END_SAME_AS_BEGIN({
    begin: /<<<[ \t]*(\w+)\n/,
    end: /[ \t]*(\w+)\b/,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST),
  });
  const STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, PREPROCESSOR],
    variants: [
      hljs.inherit(SINGLE_QUOTED, {
        begin: "b'", end: "'",
      }),
      hljs.inherit(DOUBLE_QUOTED, {
        begin: 'b"', end: '"',
      }),
      DOUBLE_QUOTED,
      SINGLE_QUOTED,
      HEREDOC
    ]
  };
  const NUMBER = {variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]};
  const KEYWORDS = {
    keyword:
    // Magic constants:
    // <https://www.php.net/manual/en/language.constants.predefined.php>
    '__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ ' +
    // Function that look like language construct or language construct that look like function:
    // List of keywords that may not require parenthesis
    'die echo exit include include_once print require require_once ' +
    // These are not language construct (function) but operate on the currently-executing function and can access the current symbol table
    // 'compact extract func_get_arg func_get_args func_num_args get_called_class get_parent_class ' +
    // Other keywords:
    // <https://www.php.net/manual/en/reserved.php>
    // <https://www.php.net/manual/en/language.types.type-juggling.php>
    'array abstract and as binary bool boolean break callable case catch class clone const continue declare ' +
    'default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile eval extends ' +
    'final finally float for foreach from global goto if implements instanceof insteadof int integer interface ' +
    'isset iterable list match|0 new object or private protected public real return string switch throw trait ' +
    'try unset use var void while xor yield',
    literal: 'false null true',
    built_in:
    // Standard PHP library:
    // <https://www.php.net/manual/en/book.spl.php>
    'Error|0 ' + // error is too common a name esp since PHP is case in-sensitive
    'AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException ' +
    // Reserved interfaces:
    // <https://www.php.net/manual/en/reserved.interfaces.php>
    'ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Throwable Traversable WeakReference ' +
    // Reserved classes:
    // <https://www.php.net/manual/en/reserved.classes.php>
    'Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass'
  };
  return {
    aliases: ['php', 'php3', 'php4', 'php5', 'php6', 'php7', 'php8'],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.COMMENT('//', '$', {contains: [PREPROCESSOR]}),
      hljs.COMMENT(
        '/\\*',
        '\\*/',
        {
          contains: [
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            }
          ]
        }
      ),
      hljs.COMMENT(
        '__halt_compiler.+?;',
        false,
        {
          endsWithParent: true,
          keywords: '__halt_compiler'
        }
      ),
      PREPROCESSOR,
      {
        className: 'keyword', begin: /\$this\b/
      },
      VARIABLE,
      {
        // swallow composed identifiers to avoid parsing them as keywords
        begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
      },
      {
        className: 'function',
        relevance: 0,
        beginKeywords: 'fn function', end: /[;{]/, excludeEnd: true,
        illegal: '[$%\\[]',
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            begin: '=>' // No markup, just a relevance booster
          },
          {
            className: 'params',
            begin: '\\(', end: '\\)',
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            contains: [
              'self',
              VARIABLE,
              hljs.C_BLOCK_COMMENT_MODE,
              STRING,
              NUMBER
            ]
          }
        ]
      },
      {
        className: 'class',
        beginKeywords: 'class interface',
        relevance: 0,
        end: /\{/,
        excludeEnd: true,
        illegal: /[:($"]/,
        contains: [
          {beginKeywords: 'extends implements'},
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        beginKeywords: 'namespace',
        relevance: 0,
        end: ';',
        illegal: /[.']/,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        beginKeywords: 'use',
        relevance: 0,
        end: ';',
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      STRING,
      NUMBER
    ]
  };
}

module.exports = php;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/plaintext.js":
/*!************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/plaintext.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Plain text
Author: Egor Rogov (e.rogov@postgrespro.ru)
Description: Plain text without any highlighting.
Category: common
*/

function plaintext(hljs) {
  return {
    name: 'Plain text',
    aliases: [
      'text',
      'txt'
    ],
    disableAutodetect: true
  };
}

module.exports = plaintext;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/pony.js":
/*!*******************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/pony.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Pony
Author: Joe Eli McIlvain <joe.eli.mac@gmail.com>
Description: Pony is an open-source, object-oriented, actor-model,
             capabilities-secure, high performance programming language.
Website: https://www.ponylang.io
*/

function pony(hljs) {
  const KEYWORDS = {
    keyword:
      'actor addressof and as be break class compile_error compile_intrinsic ' +
      'consume continue delegate digestof do else elseif embed end error ' +
      'for fun if ifdef in interface is isnt lambda let match new not object ' +
      'or primitive recover repeat return struct then trait try type until ' +
      'use var where while with xor',
    meta:
      'iso val tag trn box ref',
    literal:
      'this false true'
  };

  const TRIPLE_QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"""',
    end: '"""',
    relevance: 10
  };

  const QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"',
    end: '"',
    contains: [ hljs.BACKSLASH_ESCAPE ]
  };

  const SINGLE_QUOTE_CHAR_MODE = {
    className: 'string',
    begin: '\'',
    end: '\'',
    contains: [ hljs.BACKSLASH_ESCAPE ],
    relevance: 0
  };

  const TYPE_NAME = {
    className: 'type',
    begin: '\\b_?[A-Z][\\w]*',
    relevance: 0
  };

  const PRIMED_NAME = {
    begin: hljs.IDENT_RE + '\'',
    relevance: 0
  };

  const NUMBER_MODE = {
    className: 'number',
    begin: '(-?)(\\b0[xX][a-fA-F0-9]+|\\b0[bB][01]+|(\\b\\d+(_\\d+)?(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)',
    relevance: 0
  };

  /**
   * The `FUNCTION` and `CLASS` modes were intentionally removed to simplify
   * highlighting and fix cases like
   * ```
   * interface Iterator[A: A]
   *   fun has_next(): Bool
   *   fun next(): A?
   * ```
   * where it is valid to have a function head without a body
   */

  return {
    name: 'Pony',
    keywords: KEYWORDS,
    contains: [
      TYPE_NAME,
      TRIPLE_QUOTE_STRING_MODE,
      QUOTE_STRING_MODE,
      SINGLE_QUOTE_CHAR_MODE,
      PRIMED_NAME,
      NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };
}

module.exports = pony;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/powershell.js":
/*!*************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/powershell.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: PowerShell
Description: PowerShell is a task-based command-line shell and scripting language built on .NET.
Author: David Mohundro <david@mohundro.com>
Contributors: Nicholas Blumhardt <nblumhardt@nblumhardt.com>, Victor Zhou <OiCMudkips@users.noreply.github.com>, Nicolas Le Gall <contact@nlegall.fr>
Website: https://docs.microsoft.com/en-us/powershell/
*/

function powershell(hljs) {
  const TYPES = [
    "string",
    "char",
    "byte",
    "int",
    "long",
    "bool",
    "decimal",
    "single",
    "double",
    "DateTime",
    "xml",
    "array",
    "hashtable",
    "void"
  ];

  // https://msdn.microsoft.com/en-us/library/ms714428(v=vs.85).aspx
  const VALID_VERBS =
    'Add|Clear|Close|Copy|Enter|Exit|Find|Format|Get|Hide|Join|Lock|' +
    'Move|New|Open|Optimize|Pop|Push|Redo|Remove|Rename|Reset|Resize|' +
    'Search|Select|Set|Show|Skip|Split|Step|Switch|Undo|Unlock|' +
    'Watch|Backup|Checkpoint|Compare|Compress|Convert|ConvertFrom|' +
    'ConvertTo|Dismount|Edit|Expand|Export|Group|Import|Initialize|' +
    'Limit|Merge|New|Out|Publish|Restore|Save|Sync|Unpublish|Update|' +
    'Approve|Assert|Complete|Confirm|Deny|Disable|Enable|Install|Invoke|Register|' +
    'Request|Restart|Resume|Start|Stop|Submit|Suspend|Uninstall|' +
    'Unregister|Wait|Debug|Measure|Ping|Repair|Resolve|Test|Trace|Connect|' +
    'Disconnect|Read|Receive|Send|Write|Block|Grant|Protect|Revoke|Unblock|' +
    'Unprotect|Use|ForEach|Sort|Tee|Where';

  const COMPARISON_OPERATORS =
    '-and|-as|-band|-bnot|-bor|-bxor|-casesensitive|-ccontains|-ceq|-cge|-cgt|' +
    '-cle|-clike|-clt|-cmatch|-cne|-cnotcontains|-cnotlike|-cnotmatch|-contains|' +
    '-creplace|-csplit|-eq|-exact|-f|-file|-ge|-gt|-icontains|-ieq|-ige|-igt|' +
    '-ile|-ilike|-ilt|-imatch|-in|-ine|-inotcontains|-inotlike|-inotmatch|' +
    '-ireplace|-is|-isnot|-isplit|-join|-le|-like|-lt|-match|-ne|-not|' +
    '-notcontains|-notin|-notlike|-notmatch|-or|-regex|-replace|-shl|-shr|' +
    '-split|-wildcard|-xor';

  const KEYWORDS = {
    $pattern: /-?[A-z\.\-]+\b/,
    keyword:
      'if else foreach return do while until elseif begin for trap data dynamicparam ' +
      'end break throw param continue finally in switch exit filter try process catch ' +
      'hidden static parameter',
    // "echo" relevance has been set to 0 to avoid auto-detect conflicts with shell transcripts
    built_in:
      'ac asnp cat cd CFS chdir clc clear clhy cli clp cls clv cnsn compare copy cp ' +
      'cpi cpp curl cvpa dbp del diff dir dnsn ebp echo|0 epal epcsv epsn erase etsn exsn fc fhx ' +
      'fl ft fw gal gbp gc gcb gci gcm gcs gdr gerr ghy gi gin gjb gl gm gmo gp gps gpv group ' +
      'gsn gsnp gsv gtz gu gv gwmi h history icm iex ihy ii ipal ipcsv ipmo ipsn irm ise iwmi ' +
      'iwr kill lp ls man md measure mi mount move mp mv nal ndr ni nmo npssc nsn nv ogv oh ' +
      'popd ps pushd pwd r rbp rcjb rcsn rd rdr ren ri rjb rm rmdir rmo rni rnp rp rsn rsnp ' +
      'rujb rv rvpa rwmi sajb sal saps sasv sbp sc scb select set shcm si sl sleep sls sort sp ' +
      'spjb spps spsv start stz sujb sv swmi tee trcm type wget where wjb write'
    // TODO: 'validate[A-Z]+' can't work in keywords
  };

  const TITLE_NAME_RE = /\w[\w\d]*((-)[\w\d]+)*/;

  const BACKTICK_ESCAPE = {
    begin: '`[\\s\\S]',
    relevance: 0
  };

  const VAR = {
    className: 'variable',
    variants: [
      {
        begin: /\$\B/
      },
      {
        className: 'keyword',
        begin: /\$this/
      },
      {
        begin: /\$[\w\d][\w\d_:]*/
      }
    ]
  };

  const LITERAL = {
    className: 'literal',
    begin: /\$(null|true|false)\b/
  };

  const QUOTE_STRING = {
    className: "string",
    variants: [
      {
        begin: /"/,
        end: /"/
      },
      {
        begin: /@"/,
        end: /^"@/
      }
    ],
    contains: [
      BACKTICK_ESCAPE,
      VAR,
      {
        className: 'variable',
        begin: /\$[A-z]/,
        end: /[^A-z]/
      }
    ]
  };

  const APOS_STRING = {
    className: 'string',
    variants: [
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /@'/,
        end: /^'@/
      }
    ]
  };

  const PS_HELPTAGS = {
    className: "doctag",
    variants: [
      /* no paramater help tags */
      {
        begin: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/
      },
      /* one parameter help tags */
      {
        begin: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/
      }
    ]
  };

  const PS_COMMENT = hljs.inherit(
    hljs.COMMENT(null, null),
    {
      variants: [
        /* single-line comment */
        {
          begin: /#/,
          end: /$/
        },
        /* multi-line comment */
        {
          begin: /<#/,
          end: /#>/
        }
      ],
      contains: [ PS_HELPTAGS ]
    }
  );

  const CMDLETS = {
    className: 'built_in',
    variants: [
      {
        begin: '('.concat(VALID_VERBS, ')+(-)[\\w\\d]+')
      }
    ]
  };

  const PS_CLASS = {
    className: 'class',
    beginKeywords: 'class enum',
    end: /\s*[{]/,
    excludeEnd: true,
    relevance: 0,
    contains: [ hljs.TITLE_MODE ]
  };

  const PS_FUNCTION = {
    className: 'function',
    begin: /function\s+/,
    end: /\s*\{|$/,
    excludeEnd: true,
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        begin: "function",
        relevance: 0,
        className: "keyword"
      },
      {
        className: "title",
        begin: TITLE_NAME_RE,
        relevance: 0
      },
      {
        begin: /\(/,
        end: /\)/,
        className: "params",
        relevance: 0,
        contains: [ VAR ]
      }
      // CMDLETS
    ]
  };

  // Using statment, plus type, plus assembly name.
  const PS_USING = {
    begin: /using\s/,
    end: /$/,
    returnBegin: true,
    contains: [
      QUOTE_STRING,
      APOS_STRING,
      {
        className: 'keyword',
        begin: /(using|assembly|command|module|namespace|type)/
      }
    ]
  };

  // Comperison operators & function named parameters.
  const PS_ARGUMENTS = {
    variants: [
      // PS literals are pretty verbose so it's a good idea to accent them a bit.
      {
        className: 'operator',
        begin: '('.concat(COMPARISON_OPERATORS, ')\\b')
      },
      {
        className: 'literal',
        begin: /(-)[\w\d]+/,
        relevance: 0
      }
    ]
  };

  const HASH_SIGNS = {
    className: 'selector-tag',
    begin: /@\B/,
    relevance: 0
  };

  // It's a very general rule so I'll narrow it a bit with some strict boundaries
  // to avoid any possible false-positive collisions!
  const PS_METHODS = {
    className: 'function',
    begin: /\[.*\]\s*[\w]+[ ]??\(/,
    end: /$/,
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        className: 'keyword',
        begin: '('.concat(
          KEYWORDS.keyword.toString().replace(/\s/g, '|'
          ), ')\\b'),
        endsParent: true,
        relevance: 0
      },
      hljs.inherit(hljs.TITLE_MODE, {
        endsParent: true
      })
    ]
  };

  const GENTLEMANS_SET = [
    // STATIC_MEMBER,
    PS_METHODS,
    PS_COMMENT,
    BACKTICK_ESCAPE,
    hljs.NUMBER_MODE,
    QUOTE_STRING,
    APOS_STRING,
    // PS_NEW_OBJECT_TYPE,
    CMDLETS,
    VAR,
    LITERAL,
    HASH_SIGNS
  ];

  const PS_TYPE = {
    begin: /\[/,
    end: /\]/,
    excludeBegin: true,
    excludeEnd: true,
    relevance: 0,
    contains: [].concat(
      'self',
      GENTLEMANS_SET,
      {
        begin: "(" + TYPES.join("|") + ")",
        className: "built_in",
        relevance: 0
      },
      {
        className: 'type',
        begin: /[\.\w\d]+/,
        relevance: 0
      }
    )
  };

  PS_METHODS.contains.unshift(PS_TYPE);

  return {
    name: 'PowerShell',
    aliases: [
      "ps",
      "ps1"
    ],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: GENTLEMANS_SET.concat(
      PS_CLASS,
      PS_FUNCTION,
      PS_USING,
      PS_ARGUMENTS,
      PS_TYPE
    )
  };
}

module.exports = powershell;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/processing.js":
/*!*************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/processing.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Processing
Description: Processing is a flexible software sketchbook and a language for learning how to code within the context of the visual arts.
Author: Erik Paluka <erik.paluka@gmail.com>
Website: https://processing.org
Category: graphics
*/

function processing(hljs) {
  return {
    name: 'Processing',
    keywords: {
      keyword: 'BufferedReader PVector PFont PImage PGraphics HashMap boolean byte char color ' +
        'double float int long String Array FloatDict FloatList IntDict IntList JSONArray JSONObject ' +
        'Object StringDict StringList Table TableRow XML ' +
        // Java keywords
        'false synchronized int abstract float private char boolean static null if const ' +
        'for true while long throw strictfp finally protected import native final return void ' +
        'enum else break transient new catch instanceof byte super volatile case assert short ' +
        'package default double public try this switch continue throws protected public private',
      literal: 'P2D P3D HALF_PI PI QUARTER_PI TAU TWO_PI',
      title: 'setup draw',
      built_in: 'displayHeight displayWidth mouseY mouseX mousePressed pmouseX pmouseY key ' +
        'keyCode pixels focused frameCount frameRate height width ' +
        'size createGraphics beginDraw createShape loadShape PShape arc ellipse line point ' +
        'quad rect triangle bezier bezierDetail bezierPoint bezierTangent curve curveDetail curvePoint ' +
        'curveTangent curveTightness shape shapeMode beginContour beginShape bezierVertex curveVertex ' +
        'endContour endShape quadraticVertex vertex ellipseMode noSmooth rectMode smooth strokeCap ' +
        'strokeJoin strokeWeight mouseClicked mouseDragged mouseMoved mousePressed mouseReleased ' +
        'mouseWheel keyPressed keyPressedkeyReleased keyTyped print println save saveFrame day hour ' +
        'millis minute month second year background clear colorMode fill noFill noStroke stroke alpha ' +
        'blue brightness color green hue lerpColor red saturation modelX modelY modelZ screenX screenY ' +
        'screenZ ambient emissive shininess specular add createImage beginCamera camera endCamera frustum ' +
        'ortho perspective printCamera printProjection cursor frameRate noCursor exit loop noLoop popStyle ' +
        'pushStyle redraw binary boolean byte char float hex int str unbinary unhex join match matchAll nf ' +
        'nfc nfp nfs split splitTokens trim append arrayCopy concat expand reverse shorten sort splice subset ' +
        'box sphere sphereDetail createInput createReader loadBytes loadJSONArray loadJSONObject loadStrings ' +
        'loadTable loadXML open parseXML saveTable selectFolder selectInput beginRaw beginRecord createOutput ' +
        'createWriter endRaw endRecord PrintWritersaveBytes saveJSONArray saveJSONObject saveStream saveStrings ' +
        'saveXML selectOutput popMatrix printMatrix pushMatrix resetMatrix rotate rotateX rotateY rotateZ scale ' +
        'shearX shearY translate ambientLight directionalLight lightFalloff lights lightSpecular noLights normal ' +
        'pointLight spotLight image imageMode loadImage noTint requestImage tint texture textureMode textureWrap ' +
        'blend copy filter get loadPixels set updatePixels blendMode loadShader PShaderresetShader shader createFont ' +
        'loadFont text textFont textAlign textLeading textMode textSize textWidth textAscent textDescent abs ceil ' +
        'constrain dist exp floor lerp log mag map max min norm pow round sq sqrt acos asin atan atan2 cos degrees ' +
        'radians sin tan noise noiseDetail noiseSeed random randomGaussian randomSeed'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE
    ]
  };
}

module.exports = processing;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/profile.js":
/*!**********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/profile.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Python profiler
Description: Python profiler results
Author: Brian Beck <exogen@gmail.com>
*/

function profile(hljs) {
  return {
    name: 'Python profiler',
    contains: [
      hljs.C_NUMBER_MODE,
      {
        begin: '[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}',
        end: ':',
        excludeEnd: true
      },
      {
        begin: '(ncalls|tottime|cumtime)',
        end: '$',
        keywords: 'ncalls tottime|10 cumtime|10 filename',
        relevance: 10
      },
      {
        begin: 'function calls',
        end: '$',
        contains: [ hljs.C_NUMBER_MODE ],
        relevance: 10
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '\\(',
        end: '\\)$',
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0
      }
    ]
  };
}

module.exports = profile;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/prolog.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/prolog.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Prolog
Description: Prolog is a general purpose logic programming language associated with artificial intelligence and computational linguistics.
Author: Raivo Laanemets <raivo@infdot.com>
Website: https://en.wikipedia.org/wiki/Prolog
*/

function prolog(hljs) {
  const ATOM = {

    begin: /[a-z][A-Za-z0-9_]*/,
    relevance: 0
  };

  const VAR = {

    className: 'symbol',
    variants: [
      {
        begin: /[A-Z][a-zA-Z0-9_]*/
      },
      {
        begin: /_[A-Za-z0-9_]*/
      }
    ],
    relevance: 0
  };

  const PARENTED = {

    begin: /\(/,
    end: /\)/,
    relevance: 0
  };

  const LIST = {

    begin: /\[/,
    end: /\]/
  };

  const LINE_COMMENT = {

    className: 'comment',
    begin: /%/,
    end: /$/,
    contains: [ hljs.PHRASAL_WORDS_MODE ]
  };

  const BACKTICK_STRING = {

    className: 'string',
    begin: /`/,
    end: /`/,
    contains: [ hljs.BACKSLASH_ESCAPE ]
  };

  const CHAR_CODE = {
    className: 'string', // 0'a etc.
    begin: /0'(\\'|.)/
  };

  const SPACE_CODE = {
    className: 'string',
    begin: /0'\\s/ // 0'\s
  };

  const PRED_OP = { // relevance booster
    begin: /:-/
  };

  const inner = [

    ATOM,
    VAR,
    PARENTED,
    PRED_OP,
    LIST,
    LINE_COMMENT,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.APOS_STRING_MODE,
    BACKTICK_STRING,
    CHAR_CODE,
    SPACE_CODE,
    hljs.C_NUMBER_MODE
  ];

  PARENTED.contains = inner;
  LIST.contains = inner;

  return {
    name: 'Prolog',
    contains: inner.concat([
      { // relevance booster
        begin: /\.$/
      }
    ])
  };
}

module.exports = prolog;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/properties.js":
/*!*************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/properties.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: .properties
Contributors: Valentin Aitken <valentin@nalisbg.com>, Egor Rogov <e.rogov@postgrespro.ru>
Website: https://en.wikipedia.org/wiki/.properties
Category: common, config
*/

function properties(hljs) {

  // whitespaces: space, tab, formfeed
  var WS0 = '[ \\t\\f]*';
  var WS1 = '[ \\t\\f]+';
  // delimiter
  var EQUAL_DELIM = WS0+'[:=]'+WS0;
  var WS_DELIM = WS1;
  var DELIM = '(' + EQUAL_DELIM + '|' + WS_DELIM + ')';
  var KEY_ALPHANUM = '([^\\\\\\W:= \\t\\f\\n]|\\\\.)+';
  var KEY_OTHER = '([^\\\\:= \\t\\f\\n]|\\\\.)+';

  var DELIM_AND_VALUE = {
          // skip DELIM
          end: DELIM,
          relevance: 0,
          starts: {
            // value: everything until end of line (again, taking into account backslashes)
            className: 'string',
            end: /$/,
            relevance: 0,
            contains: [
              { begin: '\\\\\\n' }
            ]
          }
        };

  return {
    name: '.properties',
    case_insensitive: true,
    illegal: /\S/,
    contains: [
      hljs.COMMENT('^\\s*[!#]', '$'),
      // key: everything until whitespace or = or : (taking into account backslashes)
      // case of a "normal" key
      {
        returnBegin: true,
        variants: [
          { begin: KEY_ALPHANUM + EQUAL_DELIM, relevance: 1 },
          { begin: KEY_ALPHANUM + WS_DELIM, relevance: 0 }
        ],
        contains: [
          {
            className: 'attr',
            begin: KEY_ALPHANUM,
            endsParent: true,
            relevance: 0
          }
        ],
        starts: DELIM_AND_VALUE
      },
      // case of key containing non-alphanumeric chars => relevance = 0
      {
        begin: KEY_OTHER + DELIM,
        returnBegin: true,
        relevance: 0,
        contains: [
          {
            className: 'meta',
            begin: KEY_OTHER,
            endsParent: true,
            relevance: 0
          }
        ],
        starts: DELIM_AND_VALUE
      },
      // case of an empty key
      {
        className: 'attr',
        relevance: 0,
        begin: KEY_OTHER + WS0 + '$'
      }
    ]
  };
}

module.exports = properties;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/protobuf.js":
/*!***********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/protobuf.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Protocol Buffers
Author: Dan Tao <daniel.tao@gmail.com>
Description: Protocol buffer message definition format
Website: https://developers.google.com/protocol-buffers/docs/proto3
Category: protocols
*/

function protobuf(hljs) {
  return {
    name: 'Protocol Buffers',
    keywords: {
      keyword: 'package import option optional required repeated group oneof',
      built_in: 'double float int32 int64 uint32 uint64 sint32 sint64 ' +
        'fixed32 fixed64 sfixed32 sfixed64 bool string bytes',
      literal: 'true false'
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'class',
        beginKeywords: 'message enum service', end: /\{/,
        illegal: /\n/,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            starts: {endsWithParent: true, excludeEnd: true} // hack: eating everything after the first title
          })
        ]
      },
      {
        className: 'function',
        beginKeywords: 'rpc',
        end: /[{;]/, excludeEnd: true,
        keywords: 'rpc returns'
      },
      { // match enum items (relevance)
        // BLAH = ...;
        begin: /^\s*[A-Z_]+(?=\s*=[^\n]+;$)/
      }
    ]
  };
}

module.exports = protobuf;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/puppet.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/puppet.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Puppet
Author: Jose Molina Colmenero <gaudy41@gmail.com>
Website: https://puppet.com/docs
Category: config
*/

function puppet(hljs) {
  const PUPPET_KEYWORDS = {
    keyword:
    /* language keywords */
      'and case default else elsif false if in import enherits node or true undef unless main settings $string ',
    literal:
    /* metaparameters */
      'alias audit before loglevel noop require subscribe tag ' +
      /* normal attributes */
      'owner ensure group mode name|0 changes context force incl lens load_path onlyif provider returns root show_diff type_check ' +
      'en_address ip_address realname command environment hour monute month monthday special target weekday ' +
      'creates cwd ogoutput refresh refreshonly tries try_sleep umask backup checksum content ctime force ignore ' +
      'links mtime purge recurse recurselimit replace selinux_ignore_defaults selrange selrole seltype seluser source ' +
      'souirce_permissions sourceselect validate_cmd validate_replacement allowdupe attribute_membership auth_membership forcelocal gid ' +
      'ia_load_module members system host_aliases ip allowed_trunk_vlans description device_url duplex encapsulation etherchannel ' +
      'native_vlan speed principals allow_root auth_class auth_type authenticate_user k_of_n mechanisms rule session_owner shared options ' +
      'device fstype enable hasrestart directory present absent link atboot blockdevice device dump pass remounts poller_tag use ' +
      'message withpath adminfile allow_virtual allowcdrom category configfiles flavor install_options instance package_settings platform ' +
      'responsefile status uninstall_options vendor unless_system_user unless_uid binary control flags hasstatus manifest pattern restart running ' +
      'start stop allowdupe auths expiry gid groups home iterations key_membership keys managehome membership password password_max_age ' +
      'password_min_age profile_membership profiles project purge_ssh_keys role_membership roles salt shell uid baseurl cost descr enabled ' +
      'enablegroups exclude failovermethod gpgcheck gpgkey http_caching include includepkgs keepalive metadata_expire metalink mirrorlist ' +
      'priority protect proxy proxy_password proxy_username repo_gpgcheck s3_enabled skip_if_unavailable sslcacert sslclientcert sslclientkey ' +
      'sslverify mounted',
    built_in:
    /* core facts */
      'architecture augeasversion blockdevices boardmanufacturer boardproductname boardserialnumber cfkey dhcp_servers ' +
      'domain ec2_ ec2_userdata facterversion filesystems ldom fqdn gid hardwareisa hardwaremodel hostname id|0 interfaces ' +
      'ipaddress ipaddress_ ipaddress6 ipaddress6_ iphostnumber is_virtual kernel kernelmajversion kernelrelease kernelversion ' +
      'kernelrelease kernelversion lsbdistcodename lsbdistdescription lsbdistid lsbdistrelease lsbmajdistrelease lsbminordistrelease ' +
      'lsbrelease macaddress macaddress_ macosx_buildversion macosx_productname macosx_productversion macosx_productverson_major ' +
      'macosx_productversion_minor manufacturer memoryfree memorysize netmask metmask_ network_ operatingsystem operatingsystemmajrelease ' +
      'operatingsystemrelease osfamily partitions path physicalprocessorcount processor processorcount productname ps puppetversion ' +
      'rubysitedir rubyversion selinux selinux_config_mode selinux_config_policy selinux_current_mode selinux_current_mode selinux_enforced ' +
      'selinux_policyversion serialnumber sp_ sshdsakey sshecdsakey sshrsakey swapencrypted swapfree swapsize timezone type uniqueid uptime ' +
      'uptime_days uptime_hours uptime_seconds uuid virtual vlans xendomains zfs_version zonenae zones zpool_version'
  };

  const COMMENT = hljs.COMMENT('#', '$');

  const IDENT_RE = '([A-Za-z_]|::)(\\w|::)*';

  const TITLE = hljs.inherit(hljs.TITLE_MODE, {
    begin: IDENT_RE
  });

  const VARIABLE = {
    className: 'variable',
    begin: '\\$' + IDENT_RE
  };

  const STRING = {
    className: 'string',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      VARIABLE
    ],
    variants: [
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

  return {
    name: 'Puppet',
    aliases: [ 'pp' ],
    contains: [
      COMMENT,
      VARIABLE,
      STRING,
      {
        beginKeywords: 'class',
        end: '\\{|;',
        illegal: /=/,
        contains: [
          TITLE,
          COMMENT
        ]
      },
      {
        beginKeywords: 'define',
        end: /\{/,
        contains: [
          {
            className: 'section',
            begin: hljs.IDENT_RE,
            endsParent: true
          }
        ]
      },
      {
        begin: hljs.IDENT_RE + '\\s+\\{',
        returnBegin: true,
        end: /\S/,
        contains: [
          {
            className: 'keyword',
            begin: hljs.IDENT_RE
          },
          {
            begin: /\{/,
            end: /\}/,
            keywords: PUPPET_KEYWORDS,
            relevance: 0,
            contains: [
              STRING,
              COMMENT,
              {
                begin: '[a-zA-Z_]+\\s*=>',
                returnBegin: true,
                end: '=>',
                contains: [
                  {
                    className: 'attr',
                    begin: hljs.IDENT_RE
                  }
                ]
              },
              {
                className: 'number',
                begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
                relevance: 0
              },
              VARIABLE
            ]
          }
        ],
        relevance: 0
      }
    ]
  };
}

module.exports = puppet;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/purebasic.js":
/*!************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/purebasic.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: PureBASIC
Author: Tristano Ajmone <tajmone@gmail.com>
Description: Syntax highlighting for PureBASIC (v.5.00-5.60). No inline ASM highlighting. (v.1.2, May 2017)
Credits: I've taken inspiration from the PureBasic language file for GeSHi, created by Gustavo Julio Fiorenza (GuShH).
Website: https://www.purebasic.com
*/

// Base deafult colors in PB IDE: background: #FFFFDF; foreground: #000000;

function purebasic(hljs) {
  const STRINGS = { // PB IDE color: #0080FF (Azure Radiance)
    className: 'string',
    begin: '(~)?"',
    end: '"',
    illegal: '\\n'
  };
  const CONSTANTS = { // PB IDE color: #924B72 (Cannon Pink)
    //  "#" + a letter or underscore + letters, digits or underscores + (optional) "$"
    className: 'symbol',
    begin: '#[a-zA-Z_]\\w*\\$?'
  };

  return {
    name: 'PureBASIC',
    aliases: [
      'pb',
      'pbi'
    ],
    keywords: // PB IDE color: #006666 (Blue Stone) + Bold
      // Keywords from all version of PureBASIC 5.00 upward ...
      'Align And Array As Break CallDebugger Case CompilerCase CompilerDefault ' +
      'CompilerElse CompilerElseIf CompilerEndIf CompilerEndSelect CompilerError ' +
      'CompilerIf CompilerSelect CompilerWarning Continue Data DataSection Debug ' +
      'DebugLevel Declare DeclareC DeclareCDLL DeclareDLL DeclareModule Default ' +
      'Define Dim DisableASM DisableDebugger DisableExplicit Else ElseIf EnableASM ' +
      'EnableDebugger EnableExplicit End EndDataSection EndDeclareModule EndEnumeration ' +
      'EndIf EndImport EndInterface EndMacro EndModule EndProcedure EndSelect ' +
      'EndStructure EndStructureUnion EndWith Enumeration EnumerationBinary Extends ' +
      'FakeReturn For ForEach ForEver Global Gosub Goto If Import ImportC ' +
      'IncludeBinary IncludeFile IncludePath Interface List Macro MacroExpandedCount ' +
      'Map Module NewList NewMap Next Not Or Procedure ProcedureC ' +
      'ProcedureCDLL ProcedureDLL ProcedureReturn Protected Prototype PrototypeC ReDim ' +
      'Read Repeat Restore Return Runtime Select Shared Static Step Structure ' +
      'StructureUnion Swap Threaded To UndefineMacro Until Until  UnuseModule ' +
      'UseModule Wend While With XIncludeFile XOr',
    contains: [
      // COMMENTS | PB IDE color: #00AAAA (Persian Green)
      hljs.COMMENT(';', '$', {
        relevance: 0
      }),

      { // PROCEDURES DEFINITIONS
        className: 'function',
        begin: '\\b(Procedure|Declare)(C|CDLL|DLL)?\\b',
        end: '\\(',
        excludeEnd: true,
        returnBegin: true,
        contains: [
          { // PROCEDURE KEYWORDS | PB IDE color: #006666 (Blue Stone) + Bold
            className: 'keyword',
            begin: '(Procedure|Declare)(C|CDLL|DLL)?',
            excludeEnd: true
          },
          { // PROCEDURE RETURN TYPE SETTING | PB IDE color: #000000 (Black)
            className: 'type',
            begin: '\\.\\w*'
            // end: ' ',
          },
          hljs.UNDERSCORE_TITLE_MODE // PROCEDURE NAME | PB IDE color: #006666 (Blue Stone)
        ]
      },
      STRINGS,
      CONSTANTS
    ]
  };
}

/*  ==============================================================================
                                      CHANGELOG
    ==============================================================================
    - v.1.2 (2017-05-12)
        -- BUG-FIX: Some keywords were accidentally joyned together. Now fixed.
    - v.1.1 (2017-04-30)
        -- Updated to PureBASIC 5.60.
        -- Keywords list now built by extracting them from the PureBASIC SDK's
           "SyntaxHilighting.dll" (from each PureBASIC version). Tokens from each
           version are added to the list, and renamed or removed tokens are kept
           for the sake of covering all versions of the language from PureBASIC
           v5.00 upward. (NOTE: currently, there are no renamed or deprecated
           tokens in the keywords list). For more info, see:
           -- http://www.purebasic.fr/english/viewtopic.php?&p=506269
           -- https://github.com/tajmone/purebasic-archives/tree/master/syntax-highlighting/guidelines
    - v.1.0 (April 2016)
        -- First release
        -- Keywords list taken and adapted from GuShH's (Gustavo Julio Fiorenza)
           PureBasic language file for GeSHi:
           -- https://github.com/easybook/geshi/blob/master/geshi/purebasic.php
*/

module.exports = purebasic;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/python-repl.js":
/*!**************************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/python-repl.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Python REPL
Requires: python.js
Author: Josh Goebel <hello@joshgoebel.com>
Category: common
*/

function pythonRepl(hljs) {
  return {
    aliases: [ 'pycon' ],
    contains: [
      {
        className: 'meta',
        starts: {
          // a space separates the REPL prefix from the actual code
          // this is purely for cleaner HTML output
          end: / |$/,
          starts: {
            end: '$',
            subLanguage: 'python'
          }
        },
        variants: [
          {
            begin: /^>>>(?=[ ]|$)/
          },
          {
            begin: /^\.\.\.(?=[ ]|$)/
          }
        ]
      }
    ]
  };
}

module.exports = pythonRepl;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/languages/python.js":
/*!*********************************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/languages/python.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Language: Python
Description: Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.
Website: https://www.python.org
Category: common
*/

function python(hljs) {
  const RESERVED_WORDS = [
    'and',
    'as',
    'assert',
    'async',
    'await',
    'break',
    'class',
    'continue',
    'def',
    'del',
    'elif',
    'else',
    'except',
    'finally',
    'for',
    '',
    'from',
    'global',
    'if',
    'import',
    'in',
    'is',
    'lambda',
    'nonlocal|10',
    'not',
    'or',
    'pass',
    'raise',
    'return',
    'try',
    'while',
    'with',
    'yield',
  ];

  const BUILT_INS = [
    '__import__',
    'abs',
    'all',
    'any',
    'ascii',
    'bin',
    'bool',
    'breakpoint',
    'bytearray',
    'bytes',
    'callable',
    'chr',
    'classmethod',
    'compile',
    'complex',
    'delattr',
    'dict',
    'dir',
    'divmod',
    'enumerate',
    'eval',
    'exec',
    'filter',
    'float',
    'format',
    'frozenset',
    'getattr',
    'globals',
    'hasattr',
    'hash',
    'help',
    'hex',
    'id',
    'input',
    'int',
    'isinstance',
    'issubclass',
    'iter',
    'len',
    'list',
    'locals',
    'map',
    'max',
    'memoryview',
    'min',
    'next',
    'object',
    'oct',
    'open',
    'ord',
    'pow',
    'print',
    'property',
    'range',
    'repr',
    'reversed',
    'round',
    'set',
    'setattr',
    'slice',
    'sorted',
    'staticmethod',
    'str',
    'sum',
    'super',
    'tuple',
    'type',
    'vars',
    'zip',
  ];

  const LITERALS = [
    '__debug__',
    'Ellipsis',
    'False',
    'None',
    'NotImplemented',
    'True',
  ];

  const KEYWORDS = {
    keyword: RESERVED_WORDS.join(' '),
    built_in: BUILT_INS.join(' '),
    literal: LITERALS.join(' ')
  };

  const PROMPT = {
    className: 'meta',  begin: /^(>>>|\.\.\.) /
  };

  const SUBST = {
    className: 'subst',
    begin: /\{/, end: /\}/,
    keywords: KEYWORDS,
    illegal: /#/
  };

  const LITERAL_BRACKET = {
    begin: /\{\{/,
    relevance: 0
  };

  const STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/, end: /'''/,
        contains: [hljs.BACKSLASH_ESCAPE, PROMPT],
        relevance: 10
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/, end: /"""/,
        contains: [hljs.BACKSLASH_ESCAPE, PROMPT],
        relevance: 10
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/, end: /'''/,
        contains: [hljs.BACKSLASH_ESCAPE, PROMPT, LITERAL_BRACKET, SUBST]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/, end: /"""/,
        contains: [hljs.BACKSLASH_ESCAPE, PROMPT, LITERAL_BRACKET, SUBST]
      },
      {
        begin: /([uU]|[rR])'/, end: /'/,
        relevance: 10
      },
      {
        begin: /([uU]|[rR])"/, end: /"/,
        relevance: 10
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/, end: /'/
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/, end: /"/
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/, end: /'/,
        contains: [hljs.BACKSLASH_ESCAPE, LITERAL_BRACKET, SUBST]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/, end: /"/,
        contains: [hljs.BACKSLASH_ESCAPE, LITERAL_BRACKET, SUBST]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  // https://docs.python.org/3.9/reference/lexical_analysis.html#numeric-literals
  const digitpart = '[0-9](_?[0-9])*';
  const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
  const NUMBER = {
    className: 'number', relevance: 0,
    variants: [
      // exponentfloat, pointfloat
      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
      // optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      // Note: no leading \b because floats can start with a decimal point
      // and we don't want to mishandle e.g. `fn(.5)`,
      // no trailing \b for pointfloat because it can end with a decimal point
      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
      // because both MUST contain a decimal point and so cannot be confused with
      // the interior part of an identifier
      { begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?\\b` },
      { begin: `(${pointfloat})[jJ]?` },

      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      { begin: '\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b' },
      { begin: '\\b0[bB](_?[01])+[lL]?\\b' },
      { begin: '\\b0[oO](_?[0-7])+[lL]?\\b' },
      { begin: '\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b' },

      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      { begin: `\\b(${digitpart})[jJ]\\b` },
    ]
  };

  const PARAMS = {
    className: 'params',
    variants: [
      // Exclude params at functions without params
      {begin: /\(\s*\)/, skip: true, className: null },
      {
        begin: /\(/, end: /\)/, excludeBegin: true, excludeEnd: true,
        keywords: KEYWORDS,
        contains: ['self', PROMPT, NUMBER, STRING, hljs.HASH_COMMENT_MODE],
      },
    ],
  };
  SUBST.contains = [STRING, NUMBER, PROMPT];

  return {
    name: 'Python',
    aliases: ['py', 'gyp', 'ipython'],
    keywords: KEYWORDS,
    illegal: /(<\/|->|\?)|=>/,
    contains: [
      PROMPT,
      NUMBER,
      // eat "if" prior to string so that it won't accidentally be
      // labeled as an f-string as in:
      { begin: /\bself\b/, }, // very common convention
      { beginKeywords: "if", relevance: 0 },
      STRING,
      hljs.HASH_COMMENT_MODE,
      {
        variants: [
          {className: 'function', beginKeywords: 'def'},
          {className: 'class', beginKeywords: 'class'}
        ],
        end: /:/,
        illegal: /[${=;\n,]/,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          PARAMS,
          {
            begin: /->/, endsWithParent: true,
            keywords: 'None'
          }
        ]
      },
      {
        className: 'meta',
        begin: /^[\t ]*@/, end: /(?=#)|$/,
        contains: [NUMBER, PARAMS, STRING]
      },
      {
        begin: /\b(print|exec)\(/ // don’t highlight keywords-turned-functions in Python 3
      }
    ]
  };
}

module.exports = python;


/***/ })

}]);
//# sourceMappingURL=55caf9ec8476e8eb1b14.chunk.js.map