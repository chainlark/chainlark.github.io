(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor~.._.._node_modules_highlight.js_lib_c"],{

/***/ "../../node_modules/highlight.js/lib/core.js":
/*!*********************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/core.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function deepFreeze(obj) {
    if (obj instanceof Map) {
        obj.clear = obj.delete = obj.set = function () {
            throw new Error('map is read-only');
        };
    } else if (obj instanceof Set) {
        obj.add = obj.clear = obj.delete = function () {
            throw new Error('set is read-only');
        };
    }

    // Freeze self
    Object.freeze(obj);

    Object.getOwnPropertyNames(obj).forEach(function (name) {
        var prop = obj[name];

        // Freeze prop if it is an object
        if (typeof prop == 'object' && !Object.isFrozen(prop)) {
            deepFreeze(prop);
        }
    });

    return obj;
}

var deepFreezeEs6 = deepFreeze;
var _default = deepFreeze;
deepFreezeEs6.default = _default;

class Response {
  /**
   * @param {CompiledMode} mode
   */
  constructor(mode) {
    // eslint-disable-next-line no-undefined
    if (mode.data === undefined) mode.data = {};

    this.data = mode.data;
  }

  ignoreMatch() {
    this.ignore = true;
  }
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeHTML(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * performs a shallow merge of multiple objects into one
 *
 * @template T
 * @param {T} original
 * @param {Record<string,any>[]} objects
 * @returns {T} a single new object
 */
function inherit(original, ...objects) {
  /** @type Record<string,any> */
  const result = Object.create(null);

  for (const key in original) {
    result[key] = original[key];
  }
  objects.forEach(function(obj) {
    for (const key in obj) {
      result[key] = obj[key];
    }
  });
  return /** @type {T} */ (result);
}

/* Stream merging */

/**
 * @typedef Event
 * @property {'start'|'stop'} event
 * @property {number} offset
 * @property {Node} node
 */

/**
 * @param {Node} node
 */
function tag(node) {
  return node.nodeName.toLowerCase();
}

/**
 * @param {Node} node
 */
function nodeStream(node) {
  /** @type Event[] */
  const result = [];
  (function _nodeStream(node, offset) {
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType === 3) {
        offset += child.nodeValue.length;
      } else if (child.nodeType === 1) {
        result.push({
          event: 'start',
          offset: offset,
          node: child
        });
        offset = _nodeStream(child, offset);
        // Prevent void elements from having an end tag that would actually
        // double them in the output. There are more void elements in HTML
        // but we list only those realistically expected in code display.
        if (!tag(child).match(/br|hr|img|input/)) {
          result.push({
            event: 'stop',
            offset: offset,
            node: child
          });
        }
      }
    }
    return offset;
  })(node, 0);
  return result;
}

/**
 * @param {any} original - the original stream
 * @param {any} highlighted - stream of the highlighted source
 * @param {string} value - the original source itself
 */
function mergeStreams(original, highlighted, value) {
  let processed = 0;
  let result = '';
  const nodeStack = [];

  function selectStream() {
    if (!original.length || !highlighted.length) {
      return original.length ? original : highlighted;
    }
    if (original[0].offset !== highlighted[0].offset) {
      return (original[0].offset < highlighted[0].offset) ? original : highlighted;
    }

    /*
    To avoid starting the stream just before it should stop the order is
    ensured that original always starts first and closes last:

    if (event1 == 'start' && event2 == 'start')
      return original;
    if (event1 == 'start' && event2 == 'stop')
      return highlighted;
    if (event1 == 'stop' && event2 == 'start')
      return original;
    if (event1 == 'stop' && event2 == 'stop')
      return highlighted;

    ... which is collapsed to:
    */
    return highlighted[0].event === 'start' ? original : highlighted;
  }

  /**
   * @param {Node} node
   */
  function open(node) {
    /** @param {Attr} attr */
    function attributeString(attr) {
      return ' ' + attr.nodeName + '="' + escapeHTML(attr.value) + '"';
    }
    // @ts-ignore
    result += '<' + tag(node) + [].map.call(node.attributes, attributeString).join('') + '>';
  }

  /**
   * @param {Node} node
   */
  function close(node) {
    result += '</' + tag(node) + '>';
  }

  /**
   * @param {Event} event
   */
  function render(event) {
    (event.event === 'start' ? open : close)(event.node);
  }

  while (original.length || highlighted.length) {
    let stream = selectStream();
    result += escapeHTML(value.substring(processed, stream[0].offset));
    processed = stream[0].offset;
    if (stream === original) {
      /*
      On any opening or closing tag of the original markup we first close
      the entire highlighted node stack, then render the original tag along
      with all the following original tags at the same offset and then
      reopen all the tags on the highlighted stack.
      */
      nodeStack.reverse().forEach(close);
      do {
        render(stream.splice(0, 1)[0]);
        stream = selectStream();
      } while (stream === original && stream.length && stream[0].offset === processed);
      nodeStack.reverse().forEach(open);
    } else {
      if (stream[0].event === 'start') {
        nodeStack.push(stream[0].node);
      } else {
        nodeStack.pop();
      }
      render(stream.splice(0, 1)[0]);
    }
  }
  return result + escapeHTML(value.substr(processed));
}

var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    escapeHTML: escapeHTML,
    inherit: inherit,
    nodeStream: nodeStream,
    mergeStreams: mergeStreams
});

/**
 * @typedef {object} Renderer
 * @property {(text: string) => void} addText
 * @property {(node: Node) => void} openNode
 * @property {(node: Node) => void} closeNode
 * @property {() => string} value
 */

/** @typedef {{kind?: string, sublanguage?: boolean}} Node */
/** @typedef {{walk: (r: Renderer) => void}} Tree */
/** */

const SPAN_CLOSE = '</span>';

/**
 * Determines if a node needs to be wrapped in <span>
 *
 * @param {Node} node */
const emitsWrappingTags = (node) => {
  return !!node.kind;
};

/** @type {Renderer} */
class HTMLRenderer {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  constructor(parseTree, options) {
    this.buffer = "";
    this.classPrefix = options.classPrefix;
    parseTree.walk(this);
  }

  /**
   * Adds texts to the output stream
   *
   * @param {string} text */
  addText(text) {
    this.buffer += escapeHTML(text);
  }

  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */
  openNode(node) {
    if (!emitsWrappingTags(node)) return;

    let className = node.kind;
    if (!node.sublanguage) {
      className = `${this.classPrefix}${className}`;
    }
    this.span(className);
  }

  /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */
  closeNode(node) {
    if (!emitsWrappingTags(node)) return;

    this.buffer += SPAN_CLOSE;
  }

  /**
   * returns the accumulated buffer
  */
  value() {
    return this.buffer;
  }

  // helpers

  /**
   * Builds a span element
   *
   * @param {string} className */
  span(className) {
    this.buffer += `<span class="${className}">`;
  }
}

/** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} | string} Node */
/** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} } DataNode */
/**  */

class TokenTree {
  constructor() {
    /** @type DataNode */
    this.rootNode = { children: [] };
    this.stack = [this.rootNode];
  }

  get top() {
    return this.stack[this.stack.length - 1];
  }

  get root() { return this.rootNode; }

  /** @param {Node} node */
  add(node) {
    this.top.children.push(node);
  }

  /** @param {string} kind */
  openNode(kind) {
    /** @type Node */
    const node = { kind, children: [] };
    this.add(node);
    this.stack.push(node);
  }

  closeNode() {
    if (this.stack.length > 1) {
      return this.stack.pop();
    }
    // eslint-disable-next-line no-undefined
    return undefined;
  }

  closeAllNodes() {
    while (this.closeNode());
  }

  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }

  /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */
  walk(builder) {
    // this does not
    return this.constructor._walk(builder, this.rootNode);
    // this works
    // return TokenTree._walk(builder, this.rootNode);
  }

  /**
   * @param {Renderer} builder
   * @param {Node} node
   */
  static _walk(builder, node) {
    if (typeof node === "string") {
      builder.addText(node);
    } else if (node.children) {
      builder.openNode(node);
      node.children.forEach((child) => this._walk(builder, child));
      builder.closeNode(node);
    }
    return builder;
  }

  /**
   * @param {Node} node
   */
  static _collapse(node) {
    if (typeof node === "string") return;
    if (!node.children) return;

    if (node.children.every(el => typeof el === "string")) {
      // node.text = node.children.join("");
      // delete node.children;
      node.children = [node.children.join("")];
    } else {
      node.children.forEach((child) => {
        TokenTree._collapse(child);
      });
    }
  }
}

/**
  Currently this is all private API, but this is the minimal API necessary
  that an Emitter must implement to fully support the parser.

  Minimal interface:

  - addKeyword(text, kind)
  - addText(text)
  - addSublanguage(emitter, subLanguageName)
  - finalize()
  - openNode(kind)
  - closeNode()
  - closeAllNodes()
  - toHTML()

*/

/**
 * @implements {Emitter}
 */
class TokenTreeEmitter extends TokenTree {
  /**
   * @param {*} options
   */
  constructor(options) {
    super();
    this.options = options;
  }

  /**
   * @param {string} text
   * @param {string} kind
   */
  addKeyword(text, kind) {
    if (text === "") { return; }

    this.openNode(kind);
    this.addText(text);
    this.closeNode();
  }

  /**
   * @param {string} text
   */
  addText(text) {
    if (text === "") { return; }

    this.add(text);
  }

  /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */
  addSublanguage(emitter, name) {
    /** @type DataNode */
    const node = emitter.root;
    node.kind = name;
    node.sublanguage = true;
    this.add(node);
  }

  toHTML() {
    const renderer = new HTMLRenderer(this, this.options);
    return renderer.value();
  }

  finalize() {
    return true;
  }
}

/**
 * @param {string} value
 * @returns {RegExp}
 * */
function escape(value) {
  return new RegExp(value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm');
}

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

/**
 * @param {RegExp} re
 * @returns {number}
 */
function countMatchGroups(re) {
  return (new RegExp(re.toString() + '|')).exec('').length - 1;
}

/**
 * Does lexeme start with a regular expression match at the beginning
 * @param {RegExp} re
 * @param {string} lexeme
 */
function startsWith(re, lexeme) {
  const match = re && re.exec(lexeme);
  return match && match.index === 0;
}

// join logically computes regexps.join(separator), but fixes the
// backreferences so they continue to match.
// it also places each individual regular expression into it's own
// match group, keeping track of the sequencing of those match groups
// is currently an exercise for the caller. :-)
/**
 * @param {(string | RegExp)[]} regexps
 * @param {string} separator
 * @returns {string}
 */
function join(regexps, separator = "|") {
  // backreferenceRe matches an open parenthesis or backreference. To avoid
  // an incorrect parse, it additionally matches the following:
  // - [...] elements, where the meaning of parentheses and escapes change
  // - other escape sequences, so we do not misparse escape sequences as
  //   interesting elements
  // - non-matching or lookahead parentheses, which do not capture. These
  //   follow the '(' with a '?'.
  const backreferenceRe = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  let numCaptures = 0;
  let ret = '';
  for (let i = 0; i < regexps.length; i++) {
    numCaptures += 1;
    const offset = numCaptures;
    let re = source(regexps[i]);
    if (i > 0) {
      ret += separator;
    }
    ret += "(";
    while (re.length > 0) {
      const match = backreferenceRe.exec(re);
      if (match == null) {
        ret += re;
        break;
      }
      ret += re.substring(0, match.index);
      re = re.substring(match.index + match[0].length);
      if (match[0][0] === '\\' && match[1]) {
        // Adjust the backreference.
        ret += '\\' + String(Number(match[1]) + offset);
      } else {
        ret += match[0];
        if (match[0] === '(') {
          numCaptures++;
        }
      }
    }
    ret += ")";
  }
  return ret;
}

// Common regexps
const IDENT_RE = '[a-zA-Z]\\w*';
const UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
const NUMBER_RE = '\\b\\d+(\\.\\d+)?';
const C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
const BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
const RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

/**
* @param { Partial<Mode> & {binary?: string | RegExp} } opts
*/
const SHEBANG = (opts = {}) => {
  const beginShebang = /^#![ ]*\//;
  if (opts.binary) {
    opts.begin = concat(
      beginShebang,
      /.*\b/,
      opts.binary,
      /\b.*/);
  }
  return inherit({
    className: 'meta',
    begin: beginShebang,
    end: /$/,
    relevance: 0,
    /** @type {ModeCallback} */
    "on:begin": (m, resp) => {
      if (m.index !== 0) resp.ignoreMatch();
    }
  }, opts);
};

// Common modes
const BACKSLASH_ESCAPE = {
  begin: '\\\\[\\s\\S]', relevance: 0
};
const APOS_STRING_MODE = {
  className: 'string',
  begin: '\'',
  end: '\'',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const QUOTE_STRING_MODE = {
  className: 'string',
  begin: '"',
  end: '"',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const PHRASAL_WORDS_MODE = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
/**
 * Creates a comment mode
 *
 * @param {string | RegExp} begin
 * @param {string | RegExp} end
 * @param {Mode | {}} [modeOptions]
 * @returns {Partial<Mode>}
 */
const COMMENT = function(begin, end, modeOptions = {}) {
  const mode = inherit(
    {
      className: 'comment',
      begin,
      end,
      contains: []
    },
    modeOptions
  );
  mode.contains.push(PHRASAL_WORDS_MODE);
  mode.contains.push({
    className: 'doctag',
    begin: '(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):',
    relevance: 0
  });
  return mode;
};
const C_LINE_COMMENT_MODE = COMMENT('//', '$');
const C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
const HASH_COMMENT_MODE = COMMENT('#', '$');
const NUMBER_MODE = {
  className: 'number',
  begin: NUMBER_RE,
  relevance: 0
};
const C_NUMBER_MODE = {
  className: 'number',
  begin: C_NUMBER_RE,
  relevance: 0
};
const BINARY_NUMBER_MODE = {
  className: 'number',
  begin: BINARY_NUMBER_RE,
  relevance: 0
};
const CSS_NUMBER_MODE = {
  className: 'number',
  begin: NUMBER_RE + '(' +
    '%|em|ex|ch|rem' +
    '|vw|vh|vmin|vmax' +
    '|cm|mm|in|pt|pc|px' +
    '|deg|grad|rad|turn' +
    '|s|ms' +
    '|Hz|kHz' +
    '|dpi|dpcm|dppx' +
    ')?',
  relevance: 0
};
const REGEXP_MODE = {
  // this outer rule makes sure we actually have a WHOLE regex and not simply
  // an expression such as:
  //
  //     3 / something
  //
  // (which will then blow up when regex's `illegal` sees the newline)
  begin: /(?=\/[^/\n]*\/)/,
  contains: [{
    className: 'regexp',
    begin: /\//,
    end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [
      BACKSLASH_ESCAPE,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [BACKSLASH_ESCAPE]
      }
    ]
  }]
};
const TITLE_MODE = {
  className: 'title',
  begin: IDENT_RE,
  relevance: 0
};
const UNDERSCORE_TITLE_MODE = {
  className: 'title',
  begin: UNDERSCORE_IDENT_RE,
  relevance: 0
};
const METHOD_GUARD = {
  // excludes method names from keyword processing
  begin: '\\.\\s*' + UNDERSCORE_IDENT_RE,
  relevance: 0
};

/**
 * Adds end same as begin mechanics to a mode
 *
 * Your mode must include at least a single () match group as that first match
 * group is what is used for comparison
 * @param {Partial<Mode>} mode
 */
const END_SAME_AS_BEGIN = function(mode) {
  return Object.assign(mode,
    {
      /** @type {ModeCallback} */
      'on:begin': (m, resp) => { resp.data._beginMatch = m[1]; },
      /** @type {ModeCallback} */
      'on:end': (m, resp) => { if (resp.data._beginMatch !== m[1]) resp.ignoreMatch(); }
    });
};

var MODES = /*#__PURE__*/Object.freeze({
    __proto__: null,
    IDENT_RE: IDENT_RE,
    UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,
    NUMBER_RE: NUMBER_RE,
    C_NUMBER_RE: C_NUMBER_RE,
    BINARY_NUMBER_RE: BINARY_NUMBER_RE,
    RE_STARTERS_RE: RE_STARTERS_RE,
    SHEBANG: SHEBANG,
    BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,
    APOS_STRING_MODE: APOS_STRING_MODE,
    QUOTE_STRING_MODE: QUOTE_STRING_MODE,
    PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,
    COMMENT: COMMENT,
    C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,
    C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,
    HASH_COMMENT_MODE: HASH_COMMENT_MODE,
    NUMBER_MODE: NUMBER_MODE,
    C_NUMBER_MODE: C_NUMBER_MODE,
    BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,
    CSS_NUMBER_MODE: CSS_NUMBER_MODE,
    REGEXP_MODE: REGEXP_MODE,
    TITLE_MODE: TITLE_MODE,
    UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE,
    METHOD_GUARD: METHOD_GUARD,
    END_SAME_AS_BEGIN: END_SAME_AS_BEGIN
});

// keywords that should have no default relevance value
const COMMON_KEYWORDS = [
  'of',
  'and',
  'for',
  'in',
  'not',
  'or',
  'if',
  'then',
  'parent', // common variable name
  'list', // common variable name
  'value' // common variable name
];

// compilation

/**
 * Compiles a language definition result
 *
 * Given the raw result of a language definition (Language), compiles this so
 * that it is ready for highlighting code.
 * @param {Language} language
 * @returns {CompiledLanguage}
 */
function compileLanguage(language) {
  /**
   * Builds a regex with the case sensativility of the current language
   *
   * @param {RegExp | string} value
   * @param {boolean} [global]
   */
  function langRe(value, global) {
    return new RegExp(
      source(value),
      'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '')
    );
  }

  /**
    Stores multiple regular expressions and allows you to quickly search for
    them all in a string simultaneously - returning the first match.  It does
    this by creating a huge (a|b|c) regex - each individual item wrapped with ()
    and joined by `|` - using match groups to track position.  When a match is
    found checking which position in the array has content allows us to figure
    out which of the original regexes / match groups triggered the match.

    The match object itself (the result of `Regex.exec`) is returned but also
    enhanced by merging in any meta-data that was registered with the regex.
    This is how we keep track of which mode matched, and what type of rule
    (`illegal`, `begin`, end, etc).
  */
  class MultiRegex {
    constructor() {
      this.matchIndexes = {};
      // @ts-ignore
      this.regexes = [];
      this.matchAt = 1;
      this.position = 0;
    }

    // @ts-ignore
    addRule(re, opts) {
      opts.position = this.position++;
      // @ts-ignore
      this.matchIndexes[this.matchAt] = opts;
      this.regexes.push([opts, re]);
      this.matchAt += countMatchGroups(re) + 1;
    }

    compile() {
      if (this.regexes.length === 0) {
        // avoids the need to check length every time exec is called
        // @ts-ignore
        this.exec = () => null;
      }
      const terminators = this.regexes.map(el => el[1]);
      this.matcherRe = langRe(join(terminators), true);
      this.lastIndex = 0;
    }

    /** @param {string} s */
    exec(s) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(s);
      if (!match) { return null; }

      // eslint-disable-next-line no-undefined
      const i = match.findIndex((el, i) => i > 0 && el !== undefined);
      // @ts-ignore
      const matchData = this.matchIndexes[i];
      // trim off any earlier non-relevant match groups (ie, the other regex
      // match groups that make up the multi-matcher)
      match.splice(0, i);

      return Object.assign(match, matchData);
    }
  }

  /*
    Created to solve the key deficiently with MultiRegex - there is no way to
    test for multiple matches at a single location.  Why would we need to do
    that?  In the future a more dynamic engine will allow certain matches to be
    ignored.  An example: if we matched say the 3rd regex in a large group but
    decided to ignore it - we'd need to started testing again at the 4th
    regex... but MultiRegex itself gives us no real way to do that.

    So what this class creates MultiRegexs on the fly for whatever search
    position they are needed.

    NOTE: These additional MultiRegex objects are created dynamically.  For most
    grammars most of the time we will never actually need anything more than the
    first MultiRegex - so this shouldn't have too much overhead.

    Say this is our search group, and we match regex3, but wish to ignore it.

      regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0

    What we need is a new MultiRegex that only includes the remaining
    possibilities:

      regex4 | regex5                               ' ie, startAt = 3

    This class wraps all that complexity up in a simple API... `startAt` decides
    where in the array of expressions to start doing the matching. It
    auto-increments, so if a match is found at position 2, then startAt will be
    set to 3.  If the end is reached startAt will return to 0.

    MOST of the time the parser will be setting startAt manually to 0.
  */
  class ResumableMultiRegex {
    constructor() {
      // @ts-ignore
      this.rules = [];
      // @ts-ignore
      this.multiRegexes = [];
      this.count = 0;

      this.lastIndex = 0;
      this.regexIndex = 0;
    }

    // @ts-ignore
    getMatcher(index) {
      if (this.multiRegexes[index]) return this.multiRegexes[index];

      const matcher = new MultiRegex();
      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
      matcher.compile();
      this.multiRegexes[index] = matcher;
      return matcher;
    }

    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }

    considerAll() {
      this.regexIndex = 0;
    }

    // @ts-ignore
    addRule(re, opts) {
      this.rules.push([re, opts]);
      if (opts.type === "begin") this.count++;
    }

    /** @param {string} s */
    exec(s) {
      const m = this.getMatcher(this.regexIndex);
      m.lastIndex = this.lastIndex;
      let result = m.exec(s);

      // The following is because we have no easy way to say "resume scanning at the
      // existing position but also skip the current rule ONLY". What happens is
      // all prior rules are also skipped which can result in matching the wrong
      // thing. Example of matching "booger":

      // our matcher is [string, "booger", number]
      //
      // ....booger....

      // if "booger" is ignored then we'd really need a regex to scan from the
      // SAME position for only: [string, number] but ignoring "booger" (if it
      // was the first match), a simple resume would scan ahead who knows how
      // far looking only for "number", ignoring potential string matches (or
      // future "booger" matches that might be valid.)

      // So what we do: We execute two matchers, one resuming at the same
      // position, but the second full matcher starting at the position after:

      //     /--- resume first regex match here (for [number])
      //     |/---- full match here for [string, "booger", number]
      //     vv
      // ....booger....

      // Which ever results in a match first is then used. So this 3-4 step
      // process essentially allows us to say "match at this position, excluding
      // a prior rule that was ignored".
      //
      // 1. Match "booger" first, ignore. Also proves that [string] does non match.
      // 2. Resume matching for [number]
      // 3. Match at index + 1 for [string, "booger", number]
      // 4. If #2 and #3 result in matches, which came first?
      if (this.resumingScanAtSamePosition()) {
        if (result && result.index === this.lastIndex) ; else { // use the second matcher result
          const m2 = this.getMatcher(0);
          m2.lastIndex = this.lastIndex + 1;
          result = m2.exec(s);
        }
      }

      if (result) {
        this.regexIndex += result.position + 1;
        if (this.regexIndex === this.count) {
          // wrap-around to considering all matches again
          this.considerAll();
        }
      }

      return result;
    }
  }

  /**
   * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
   * the content and find matches.
   *
   * @param {CompiledMode} mode
   * @returns {ResumableMultiRegex}
   */
  function buildModeRegex(mode) {
    const mm = new ResumableMultiRegex();

    mode.contains.forEach(term => mm.addRule(term.begin, { rule: term, type: "begin" }));

    if (mode.terminator_end) {
      mm.addRule(mode.terminator_end, { type: "end" });
    }
    if (mode.illegal) {
      mm.addRule(mode.illegal, { type: "illegal" });
    }

    return mm;
  }

  // TODO: We need negative look-behind support to do this properly
  /**
   * Skip a match if it has a preceding dot
   *
   * This is used for `beginKeywords` to prevent matching expressions such as
   * `bob.keyword.do()`. The mode compiler automatically wires this up as a
   * special _internal_ 'on:begin' callback for modes with `beginKeywords`
   * @param {RegExpMatchArray} match
   * @param {CallbackResponse} response
   */
  function skipIfhasPrecedingDot(match, response) {
    const before = match.input[match.index - 1];
    if (before === ".") {
      response.ignoreMatch();
    }
  }

  /** skip vs abort vs ignore
   *
   * @skip   - The mode is still entered and exited normally (and contains rules apply),
   *           but all content is held and added to the parent buffer rather than being
   *           output when the mode ends.  Mostly used with `sublanguage` to build up
   *           a single large buffer than can be parsed by sublanguage.
   *
   *             - The mode begin ands ends normally.
   *             - Content matched is added to the parent mode buffer.
   *             - The parser cursor is moved forward normally.
   *
   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
   *           never matched) but DOES NOT continue to match subsequent `contains`
   *           modes.  Abort is bad/suboptimal because it can result in modes
   *           farther down not getting applied because an earlier rule eats the
   *           content but then aborts.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is added to the mode buffer.
   *             - The parser cursor is moved forward accordingly.
   *
   * @ignore - Ignores the mode (as if it never matched) and continues to match any
   *           subsequent `contains` modes.  Ignore isn't technically possible with
   *           the current parser implementation.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is ignored.
   *             - The parser cursor is not moved forward.
   */

  /**
   * Compiles an individual mode
   *
   * This can raise an error if the mode contains certain detectable known logic
   * issues.
   * @param {Mode} mode
   * @param {CompiledMode | null} [parent]
   * @returns {CompiledMode | never}
   */
  function compileMode(mode, parent) {
    const cmode = /** @type CompiledMode */ (mode);
    if (mode.compiled) return cmode;
    mode.compiled = true;

    // __beforeBegin is considered private API, internal use only
    mode.__beforeBegin = null;

    mode.keywords = mode.keywords || mode.beginKeywords;

    let keywordPattern = null;
    if (typeof mode.keywords === "object") {
      keywordPattern = mode.keywords.$pattern;
      delete mode.keywords.$pattern;
    }

    if (mode.keywords) {
      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
    }

    // both are not allowed
    if (mode.lexemes && keywordPattern) {
      throw new Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");
    }

    // `mode.lexemes` was the old standard before we added and now recommend
    // using `keywords.$pattern` to pass the keyword pattern
    cmode.keywordPatternRe = langRe(mode.lexemes || keywordPattern || /\w+/, true);

    if (parent) {
      if (mode.beginKeywords) {
        // for languages with keywords that include non-word characters checking for
        // a word boundary is not sufficient, so instead we check for a word boundary
        // or whitespace - this does no harm in any case since our keyword engine
        // doesn't allow spaces in keywords anyways and we still check for the boundary
        // first
        mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\.)(?=\\b|\\s)';
        mode.__beforeBegin = skipIfhasPrecedingDot;
      }
      if (!mode.begin) mode.begin = /\B|\b/;
      cmode.beginRe = langRe(mode.begin);
      if (mode.endSameAsBegin) mode.end = mode.begin;
      if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
      if (mode.end) cmode.endRe = langRe(mode.end);
      cmode.terminator_end = source(mode.end) || '';
      if (mode.endsWithParent && parent.terminator_end) {
        cmode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
      }
    }
    if (mode.illegal) cmode.illegalRe = langRe(mode.illegal);
    // eslint-disable-next-line no-undefined
    if (mode.relevance === undefined) mode.relevance = 1;
    if (!mode.contains) mode.contains = [];

    mode.contains = [].concat(...mode.contains.map(function(c) {
      return expandOrCloneMode(c === 'self' ? mode : c);
    }));
    mode.contains.forEach(function(c) { compileMode(/** @type Mode */ (c), cmode); });

    if (mode.starts) {
      compileMode(mode.starts, parent);
    }

    cmode.matcher = buildModeRegex(cmode);
    return cmode;
  }

  // self is not valid at the top-level
  if (language.contains && language.contains.includes('self')) {
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  }

  // we need a null object, which inherit will guarantee
  language.classNameAliases = inherit(language.classNameAliases || {});

  return compileMode(/** @type Mode */ (language));
}

/**
 * Determines if a mode has a dependency on it's parent or not
 *
 * If a mode does have a parent dependency then often we need to clone it if
 * it's used in multiple places so that each copy points to the correct parent,
 * where-as modes without a parent can often safely be re-used at the bottom of
 * a mode chain.
 *
 * @param {Mode | null} mode
 * @returns {boolean} - is there a dependency on the parent?
 * */
function dependencyOnParent(mode) {
  if (!mode) return false;

  return mode.endsWithParent || dependencyOnParent(mode.starts);
}

/**
 * Expands a mode or clones it if necessary
 *
 * This is necessary for modes with parental dependenceis (see notes on
 * `dependencyOnParent`) and for nodes that have `variants` - which must then be
 * exploded into their own individual modes at compile time.
 *
 * @param {Mode} mode
 * @returns {Mode | Mode[]}
 * */
function expandOrCloneMode(mode) {
  if (mode.variants && !mode.cached_variants) {
    mode.cached_variants = mode.variants.map(function(variant) {
      return inherit(mode, { variants: null }, variant);
    });
  }

  // EXPAND
  // if we have variants then essentially "replace" the mode with the variants
  // this happens in compileMode, where this function is called from
  if (mode.cached_variants) {
    return mode.cached_variants;
  }

  // CLONE
  // if we have dependencies on parents then we need a unique
  // instance of ourselves, so we can be reused with many
  // different parents without issue
  if (dependencyOnParent(mode)) {
    return inherit(mode, { starts: mode.starts ? inherit(mode.starts) : null });
  }

  if (Object.isFrozen(mode)) {
    return inherit(mode);
  }

  // no special dependency issues, just return ourselves
  return mode;
}

/***********************************************
  Keywords
***********************************************/

/**
 * Given raw keywords from a language definition, compile them.
 *
 * @param {string | Record<string,string>} rawKeywords
 * @param {boolean} caseInsensitive
 */
function compileKeywords(rawKeywords, caseInsensitive) {
  /** @type KeywordDict */
  const compiledKeywords = {};

  if (typeof rawKeywords === 'string') { // string
    splitAndCompile('keyword', rawKeywords);
  } else {
    Object.keys(rawKeywords).forEach(function(className) {
      splitAndCompile(className, rawKeywords[className]);
    });
  }
  return compiledKeywords;

  // ---

  /**
   * Compiles an individual list of keywords
   *
   * Ex: "for if when while|5"
   *
   * @param {string} className
   * @param {string} keywordList
   */
  function splitAndCompile(className, keywordList) {
    if (caseInsensitive) {
      keywordList = keywordList.toLowerCase();
    }
    keywordList.split(' ').forEach(function(keyword) {
      const pair = keyword.split('|');
      compiledKeywords[pair[0]] = [className, scoreForKeyword(pair[0], pair[1])];
    });
  }
}

/**
 * Returns the proper score for a given keyword
 *
 * Also takes into account comment keywords, which will be scored 0 UNLESS
 * another score has been manually assigned.
 * @param {string} keyword
 * @param {string} [providedScore]
 */
function scoreForKeyword(keyword, providedScore) {
  // manual scores always win over common keywords
  // so you can force a score of 1 if you really insist
  if (providedScore) {
    return Number(providedScore);
  }

  return commonKeyword(keyword) ? 0 : 1;
}

/**
 * Determines if a given keyword is common or not
 *
 * @param {string} keyword */
function commonKeyword(keyword) {
  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
}

var version = "10.4.0";

// @ts-nocheck

function hasValueOrEmptyAttribute(value) {
  return Boolean(value || value === "");
}

function BuildVuePlugin(hljs) {
  const Component = {
    props: ["language", "code", "autodetect"],
    data: function() {
      return {
        detectedLanguage: "",
        unknownLanguage: false
      };
    },
    computed: {
      className() {
        if (this.unknownLanguage) return "";
  
        return "hljs " + this.detectedLanguage;
      },
      highlighted() {
        // no idea what language to use, return raw code
        if (!this.autoDetect && !hljs.getLanguage(this.language)) {
          console.warn(`The language "${this.language}" you specified could not be found.`);
          this.unknownLanguage = true;
          return escapeHTML(this.code);
        }
  
        let result;
        if (this.autoDetect) {
          result = hljs.highlightAuto(this.code);
          this.detectedLanguage = result.language;
        } else {
          result = hljs.highlight(this.language, this.code, this.ignoreIllegals);
          this.detectedLanguage = this.language;
        }
        return result.value;
      },
      autoDetect() {
        return !this.language || hasValueOrEmptyAttribute(this.autodetect);
      },
      ignoreIllegals() {
        return true;
      }
    },
    // this avoids needing to use a whole Vue compilation pipeline just
    // to build Highlight.js
    render(createElement) {
      return createElement("pre", {}, [
        createElement("code", {
          class: this.className,
          domProps: { innerHTML: this.highlighted }})
      ]);
    }
    // template: `<pre><code :class="className" v-html="highlighted"></code></pre>`
  };
  
  const VuePlugin = {
    install(Vue) {
      Vue.component('highlightjs', Component);
    }
  };

  return { Component, VuePlugin };
}

/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/

const escape$1 = escapeHTML;
const inherit$1 = inherit;

const { nodeStream: nodeStream$1, mergeStreams: mergeStreams$1 } = utils;
const NO_MATCH = Symbol("nomatch");

/**
 * @param {any} hljs - object that is extended (legacy)
 * @returns {HLJSApi}
 */
const HLJS = function(hljs) {
  // Convenience variables for build-in objects
  /** @type {unknown[]} */
  const ArrayProto = [];

  // Global internal variables used within the highlight.js library.
  /** @type {Record<string, Language>} */
  const languages = Object.create(null);
  /** @type {Record<string, string>} */
  const aliases = Object.create(null);
  /** @type {HLJSPlugin[]} */
  const plugins = [];

  // safe/production mode - swallows more errors, tries to keep running
  // even if a single syntax or parse hits a fatal error
  let SAFE_MODE = true;
  const fixMarkupRe = /(^(<[^>]+>|\t|)+|\n)/gm;
  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
  /** @type {Language} */
  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: 'Plain text', contains: [] };

  // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.
  /** @type HLJSOptions */
  let options = {
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: 'hljs-',
    tabReplace: null,
    useBR: false,
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: TokenTreeEmitter
  };

  /* Utility functions */

  /**
   * Tests a language name to see if highlighting should be skipped
   * @param {string} languageName
   */
  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName);
  }

  /**
   * @param {HighlightedHTMLElement} block - the HTML element to determine language for
   */
  function blockLanguage(block) {
    let classes = block.className + ' ';

    classes += block.parentNode ? block.parentNode.className : '';

    // language-* takes precedence over non-prefixed class names.
    const match = options.languageDetectRe.exec(classes);
    if (match) {
      const language = getLanguage(match[1]);
      if (!language) {
        console.warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        console.warn("Falling back to no-highlight mode for this block.", block);
      }
      return language ? match[1] : 'no-highlight';
    }

    return classes
      .split(/\s+/)
      .find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
  }

  /**
   * Core highlighting function.
   *
   * @param {string} languageName - the language to use for highlighting
   * @param {string} code - the code to highlight
   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode} [continuation] - current continuation mode, if any
   *
   * @returns {HighlightResult} Result - an object that represents the result
   * @property {string} language - the language name
   * @property {number} relevance - the relevance score
   * @property {string} value - the highlighted HTML code
   * @property {string} code - the original raw code
   * @property {CompiledMode} top - top of the current mode stack
   * @property {boolean} illegal - indicates whether any illegal matches were found
  */
  function highlight(languageName, code, ignoreIllegals, continuation) {
    /** @type {{ code: string, language: string, result?: any }} */
    const context = {
      code,
      language: languageName
    };
    // the plugin can change the desired language or the code to be highlighted
    // just be changing the object it was passed
    fire("before:highlight", context);

    // a before plugin can usurp the result completely by providing it's own
    // in which case we don't even need to call highlight
    const result = context.result ?
      context.result :
      _highlight(context.language, context.code, ignoreIllegals, continuation);

    result.code = context.code;
    // the plugin can change anything in result to suite it
    fire("after:highlight", result);

    return result;
  }

  /**
   * private highlight that's used internally and does not fire callbacks
   *
   * @param {string} languageName - the language to use for highlighting
   * @param {string} code - the code to highlight
   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode} [continuation] - current continuation mode, if any
   * @returns {HighlightResult} - result of the highlight operation
  */
  function _highlight(languageName, code, ignoreIllegals, continuation) {
    const codeToHighlight = code;

    /**
     * Return keyword data if a match is a keyword
     * @param {CompiledMode} mode - current mode
     * @param {RegExpMatchArray} match - regexp match data
     * @returns {KeywordData | false}
     */
    function keywordData(mode, match) {
      const matchText = language.case_insensitive ? match[0].toLowerCase() : match[0];
      return Object.prototype.hasOwnProperty.call(mode.keywords, matchText) && mode.keywords[matchText];
    }

    function processKeywords() {
      if (!top.keywords) {
        emitter.addText(modeBuffer);
        return;
      }

      let lastIndex = 0;
      top.keywordPatternRe.lastIndex = 0;
      let match = top.keywordPatternRe.exec(modeBuffer);
      let buf = "";

      while (match) {
        buf += modeBuffer.substring(lastIndex, match.index);
        const data = keywordData(top, match);
        if (data) {
          const [kind, keywordRelevance] = data;
          emitter.addText(buf);
          buf = "";

          relevance += keywordRelevance;
          const cssClass = language.classNameAliases[kind] || kind;
          emitter.addKeyword(match[0], cssClass);
        } else {
          buf += match[0];
        }
        lastIndex = top.keywordPatternRe.lastIndex;
        match = top.keywordPatternRe.exec(modeBuffer);
      }
      buf += modeBuffer.substr(lastIndex);
      emitter.addText(buf);
    }

    function processSubLanguage() {
      if (modeBuffer === "") return;
      /** @type HighlightResult */
      let result = null;

      if (typeof top.subLanguage === 'string') {
        if (!languages[top.subLanguage]) {
          emitter.addText(modeBuffer);
          return;
        }
        result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
        continuations[top.subLanguage] = /** @type {CompiledMode} */ (result.top);
      } else {
        result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
      }

      // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Use case in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      emitter.addSublanguage(result.emitter, result.language);
    }

    function processBuffer() {
      if (top.subLanguage != null) {
        processSubLanguage();
      } else {
        processKeywords();
      }
      modeBuffer = '';
    }

    /**
     * @param {Mode} mode - new mode to start
     */
    function startNewMode(mode) {
      if (mode.className) {
        emitter.openNode(language.classNameAliases[mode.className] || mode.className);
      }
      top = Object.create(mode, { parent: { value: top } });
      return top;
    }

    /**
     * @param {CompiledMode } mode - the mode to potentially end
     * @param {RegExpMatchArray} match - the latest match
     * @param {string} matchPlusRemainder - match plus remainder of content
     * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
     */
    function endOfMode(mode, match, matchPlusRemainder) {
      let matched = startsWith(mode.endRe, matchPlusRemainder);

      if (matched) {
        if (mode["on:end"]) {
          const resp = new Response(mode);
          mode["on:end"](match, resp);
          if (resp.ignore) matched = false;
        }

        if (matched) {
          while (mode.endsParent && mode.parent) {
            mode = mode.parent;
          }
          return mode;
        }
      }
      // even if on:end fires an `ignore` it's still possible
      // that we might trigger the end node because of a parent mode
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, match, matchPlusRemainder);
      }
    }

    /**
     * Handle matching but then ignoring a sequence of text
     *
     * @param {string} lexeme - string containing full match text
     */
    function doIgnore(lexeme) {
      if (top.matcher.regexIndex === 0) {
        // no more regexs to potentially match here, so we move the cursor forward one
        // space
        modeBuffer += lexeme[0];
        return 1;
      } else {
        // no need to move the cursor, we still have additional regexes to try and
        // match at this very spot
        resumeScanAtSamePosition = true;
        return 0;
      }
    }

    /**
     * Handle the start of a new potential mode match
     *
     * @param {EnhancedMatch} match - the current match
     * @returns {number} how far to advance the parse cursor
     */
    function doBeginMatch(match) {
      const lexeme = match[0];
      const newMode = match.rule;

      const resp = new Response(newMode);
      // first internal before callbacks, then the public ones
      const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
      for (const cb of beforeCallbacks) {
        if (!cb) continue;
        cb(match, resp);
        if (resp.ignore) return doIgnore(lexeme);
      }

      if (newMode && newMode.endSameAsBegin) {
        newMode.endRe = escape(lexeme);
      }

      if (newMode.skip) {
        modeBuffer += lexeme;
      } else {
        if (newMode.excludeBegin) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (!newMode.returnBegin && !newMode.excludeBegin) {
          modeBuffer = lexeme;
        }
      }
      startNewMode(newMode);
      // if (mode["after:begin"]) {
      //   let resp = new Response(mode);
      //   mode["after:begin"](match, resp);
      // }
      return newMode.returnBegin ? 0 : lexeme.length;
    }

    /**
     * Handle the potential end of mode
     *
     * @param {RegExpMatchArray} match - the current match
     */
    function doEndMatch(match) {
      const lexeme = match[0];
      const matchPlusRemainder = codeToHighlight.substr(match.index);

      const endMode = endOfMode(top, match, matchPlusRemainder);
      if (!endMode) { return NO_MATCH; }

      const origin = top;
      if (origin.skip) {
        modeBuffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (origin.excludeEnd) {
          modeBuffer = lexeme;
        }
      }
      do {
        if (top.className) {
          emitter.closeNode();
        }
        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }
        top = top.parent;
      } while (top !== endMode.parent);
      if (endMode.starts) {
        if (endMode.endSameAsBegin) {
          endMode.starts.endRe = endMode.endRe;
        }
        startNewMode(endMode.starts);
      }
      return origin.returnEnd ? 0 : lexeme.length;
    }

    function processContinuations() {
      const list = [];
      for (let current = top; current !== language; current = current.parent) {
        if (current.className) {
          list.unshift(current.className);
        }
      }
      list.forEach(item => emitter.openNode(item));
    }

    /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */
    let lastMatch = {};

    /**
     *  Process an individual match
     *
     * @param {string} textBeforeMatch - text preceeding the match (since the last match)
     * @param {EnhancedMatch} [match] - the match itself
     */
    function processLexeme(textBeforeMatch, match) {
      const lexeme = match && match[0];

      // add non-matched text to the current mode buffer
      modeBuffer += textBeforeMatch;

      if (lexeme == null) {
        processBuffer();
        return 0;
      }

      // we've found a 0 width match and we're stuck, so we need to advance
      // this happens when we have badly behaved rules that have optional matchers to the degree that
      // sometimes they can end up matching nothing at all
      // Ref: https://github.com/highlightjs/highlight.js/issues/2140
      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
        // spit the "skipped" character that our regex choked on back into the output sequence
        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
        if (!SAFE_MODE) {
          /** @type {AnnotatedError} */
          const err = new Error('0 width match regex');
          err.languageName = languageName;
          err.badRule = lastMatch.rule;
          throw err;
        }
        return 1;
      }
      lastMatch = match;

      if (match.type === "begin") {
        return doBeginMatch(match);
      } else if (match.type === "illegal" && !ignoreIllegals) {
        // illegal match, we do not continue processing
        /** @type {AnnotatedError} */
        const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
        err.mode = top;
        throw err;
      } else if (match.type === "end") {
        const processed = doEndMatch(match);
        if (processed !== NO_MATCH) {
          return processed;
        }
      }

      // edge case for when illegal matches $ (end of line) which is technically
      // a 0 width match but not a begin/end match so it's not caught by the
      // first handler (when ignoreIllegals is true)
      if (match.type === "illegal" && lexeme === "") {
        // advance so we aren't stuck in an infinite loop
        return 1;
      }

      // infinite loops are BAD, this is a last ditch catch all. if we have a
      // decent number of iterations yet our index (cursor position in our
      // parsing) still 3x behind our index then something is very wrong
      // so we bail
      if (iterations > 100000 && iterations > match.index * 3) {
        const err = new Error('potential infinite loop, way more iterations than matches');
        throw err;
      }

      /*
      Why might be find ourselves here?  Only one occasion now.  An end match that was
      triggered but could not be completed.  When might this happen?  When an `endSameasBegin`
      rule sets the end rule to a specific match.  Since the overall mode termination rule that's
      being used to scan the text isn't recompiled that means that any match that LOOKS like
      the end (but is not, because it is not an exact match to the beginning) will
      end up here.  A definite end match, but when `doEndMatch` tries to "reapply"
      the end rule and fails to match, we wind up here, and just silently ignore the end.

      This causes no real harm other than stopping a few times too many.
      */

      modeBuffer += lexeme;
      return lexeme.length;
    }

    const language = getLanguage(languageName);
    if (!language) {
      console.error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }

    const md = compileLanguage(language);
    let result = '';
    /** @type {CompiledMode} */
    let top = continuation || md;
    /** @type Record<string,CompiledMode> */
    const continuations = {}; // keep continuations for sub-languages
    const emitter = new options.__emitter(options);
    processContinuations();
    let modeBuffer = '';
    let relevance = 0;
    let index = 0;
    let iterations = 0;
    let resumeScanAtSamePosition = false;

    try {
      top.matcher.considerAll();

      for (;;) {
        iterations++;
        if (resumeScanAtSamePosition) {
          // only regexes not matched previously will now be
          // considered for a potential match
          resumeScanAtSamePosition = false;
        } else {
          top.matcher.considerAll();
        }
        top.matcher.lastIndex = index;

        const match = top.matcher.exec(codeToHighlight);
        // console.log("match", match[0], match.rule && match.rule.begin)

        if (!match) break;

        const beforeMatch = codeToHighlight.substring(index, match.index);
        const processedCount = processLexeme(beforeMatch, match);
        index = match.index + processedCount;
      }
      processLexeme(codeToHighlight.substr(index));
      emitter.closeAllNodes();
      emitter.finalize();
      result = emitter.toHTML();

      return {
        relevance: relevance,
        value: result,
        language: languageName,
        illegal: false,
        emitter: emitter,
        top: top
      };
    } catch (err) {
      if (err.message && err.message.includes('Illegal')) {
        return {
          illegal: true,
          illegalBy: {
            msg: err.message,
            context: codeToHighlight.slice(index - 100, index + 100),
            mode: err.mode
          },
          sofar: result,
          relevance: 0,
          value: escape$1(codeToHighlight),
          emitter: emitter
        };
      } else if (SAFE_MODE) {
        return {
          illegal: false,
          relevance: 0,
          value: escape$1(codeToHighlight),
          emitter: emitter,
          language: languageName,
          top: top,
          errorRaised: err
        };
      } else {
        throw err;
      }
    }
  }

  /**
   * returns a valid highlight result, without actually doing any actual work,
   * auto highlight starts with this and it's possible for small snippets that
   * auto-detection may not find a better match
   * @param {string} code
   * @returns {HighlightResult}
   */
  function justTextHighlightResult(code) {
    const result = {
      relevance: 0,
      emitter: new options.__emitter(options),
      value: escape$1(code),
      illegal: false,
      top: PLAINTEXT_LANGUAGE
    };
    result.emitter.addText(code);
    return result;
  }

  /**
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - second_best (object with the same structure for second-best heuristically
    detected language, may be absent)

    @param {string} code
    @param {Array<string>} [languageSubset]
    @returns {AutoHighlightResult}
  */
  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    const plaintext = justTextHighlightResult(code);

    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(name =>
      _highlight(name, code, false)
    );
    results.unshift(plaintext); // plaintext is always an option

    const sorted = results.sort((a, b) => {
      // sort base on relevance
      if (a.relevance !== b.relevance) return b.relevance - a.relevance;

      // always award the tie to the base language
      // ie if C++ and Arduino are tied, it's more likely to be C++
      if (a.language && b.language) {
        if (getLanguage(a.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a.language) {
          return -1;
        }
      }

      // otherwise say they are equal, which has the effect of sorting on
      // relevance while preserving the original ordering - which is how ties
      // have historically been settled, ie the language that comes first always
      // wins in the case of a tie
      return 0;
    });

    const [best, secondBest] = sorted;

    /** @type {AutoHighlightResult} */
    const result = best;
    result.second_best = secondBest;

    return result;
  }

  /**
  Post-processing of the highlighted markup:

  - replace TABs with something more useful
  - replace real line-breaks with '<br>' for non-pre containers

    @param {string} html
    @returns {string}
  */
  function fixMarkup(html) {
    if (!(options.tabReplace || options.useBR)) {
      return html;
    }

    return html.replace(fixMarkupRe, match => {
      if (match === '\n') {
        return options.useBR ? '<br>' : match;
      } else if (options.tabReplace) {
        return match.replace(/\t/g, options.tabReplace);
      }
      return match;
    });
  }

  /**
   * Builds new class name for block given the language name
   *
   * @param {string} prevClassName
   * @param {string} [currentLang]
   * @param {string} [resultLang]
   */
  function buildClassName(prevClassName, currentLang, resultLang) {
    const language = currentLang ? aliases[currentLang] : resultLang;
    const result = [prevClassName.trim()];

    if (!prevClassName.match(/\bhljs\b/)) {
      result.push('hljs');
    }

    if (!prevClassName.includes(language)) {
      result.push(language);
    }

    return result.join(' ').trim();
  }

  /**
   * Applies highlighting to a DOM node containing code. Accepts a DOM node and
   * two optional parameters for fixMarkup.
   *
   * @param {HighlightedHTMLElement} element - the HTML element to highlight
  */
  function highlightBlock(element) {
    /** @type HTMLElement */
    let node = null;
    const language = blockLanguage(element);

    if (shouldNotHighlight(language)) return;

    fire("before:highlightBlock",
      { block: element, language: language });

    if (options.useBR) {
      node = document.createElement('div');
      node.innerHTML = element.innerHTML.replace(/\n/g, '').replace(/<br[ /]*>/g, '\n');
    } else {
      node = element;
    }
    const text = node.textContent;
    const result = language ? highlight(language, text, true) : highlightAuto(text);

    const originalStream = nodeStream$1(node);
    if (originalStream.length) {
      const resultNode = document.createElement('div');
      resultNode.innerHTML = result.value;
      result.value = mergeStreams$1(originalStream, nodeStream$1(resultNode), text);
    }
    result.value = fixMarkup(result.value);

    fire("after:highlightBlock", { block: element, result: result });

    element.innerHTML = result.value;
    element.className = buildClassName(element.className, language, result.language);
    element.result = {
      language: result.language,
      // TODO: remove with version 11.0
      re: result.relevance,
      relavance: result.relevance
    };
    if (result.second_best) {
      element.second_best = {
        language: result.second_best.language,
        // TODO: remove with version 11.0
        re: result.second_best.relevance,
        relavance: result.second_best.relevance
      };
    }
  }

  /**
   * Updates highlight.js global options with the passed options
   *
   * @param {Partial<HLJSOptions>} userOptions
   */
  function configure(userOptions) {
    if (userOptions.useBR) {
      console.warn("'useBR' option is deprecated and will be removed entirely in v11.0");
      console.warn("Please see https://github.com/highlightjs/highlight.js/issues/2559");
    }
    options = inherit$1(options, userOptions);
  }

  /**
   * Highlights to all <pre><code> blocks on a page
   *
   * @type {Function & {called?: boolean}}
   */
  const initHighlighting = () => {
    if (initHighlighting.called) return;
    initHighlighting.called = true;

    const blocks = document.querySelectorAll('pre code');
    ArrayProto.forEach.call(blocks, highlightBlock);
  };

  // Higlights all when DOMContentLoaded fires
  function initHighlightingOnLoad() {
    // @ts-ignore
    window.addEventListener('DOMContentLoaded', initHighlighting, false);
  }

  /**
   * Register a language grammar module
   *
   * @param {string} languageName
   * @param {LanguageFn} languageDefinition
   */
  function registerLanguage(languageName, languageDefinition) {
    let lang = null;
    try {
      lang = languageDefinition(hljs);
    } catch (error) {
      console.error("Language definition for '{}' could not be registered.".replace("{}", languageName));
      // hard or soft error
      if (!SAFE_MODE) { throw error; } else { console.error(error); }
      // languages that have serious errors are replaced with essentially a
      // "plaintext" stand-in so that the code blocks will still get normal
      // css classes applied to them - and one bad language won't break the
      // entire highlighter
      lang = PLAINTEXT_LANGUAGE;
    }
    // give it a temporary name if it doesn't have one in the meta-data
    if (!lang.name) lang.name = languageName;
    languages[languageName] = lang;
    lang.rawDefinition = languageDefinition.bind(null, hljs);

    if (lang.aliases) {
      registerAliases(lang.aliases, { languageName });
    }
  }

  /**
   * @returns {string[]} List of language internal names
   */
  function listLanguages() {
    return Object.keys(languages);
  }

  /**
    intended usage: When one language truly requires another

    Unlike `getLanguage`, this will throw when the requested language
    is not available.

    @param {string} name - name of the language to fetch/require
    @returns {Language | never}
  */
  function requireLanguage(name) {
    console.warn("requireLanguage is deprecated and will be removed entirely in the future.");
    console.warn("Please see https://github.com/highlightjs/highlight.js/pull/2844");

    const lang = getLanguage(name);
    if (lang) { return lang; }

    const err = new Error('The \'{}\' language is required, but not loaded.'.replace('{}', name));
    throw err;
  }

  /**
   * @param {string} name - name of the language to retrieve
   * @returns {Language | undefined}
   */
  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  /**
   *
   * @param {string|string[]} aliasList - single alias or list of aliases
   * @param {{languageName: string}} opts
   */
  function registerAliases(aliasList, { languageName }) {
    if (typeof aliasList === 'string') {
      aliasList = [aliasList];
    }
    aliasList.forEach(alias => { aliases[alias] = languageName; });
  }

  /**
   * Determines if a given language has auto-detection enabled
   * @param {string} name - name of the language
   */
  function autoDetection(name) {
    const lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }

  /**
   * @param {HLJSPlugin} plugin
   */
  function addPlugin(plugin) {
    plugins.push(plugin);
  }

  /**
   *
   * @param {PluginEvent} event
   * @param {any} args
   */
  function fire(event, args) {
    const cb = event;
    plugins.forEach(function(plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }

  /**
  Note: fixMarkup is deprecated and will be removed entirely in v11

  @param {string} arg
  @returns {string}
  */
  function deprecateFixMarkup(arg) {
    console.warn("fixMarkup is deprecated and will be removed entirely in v11.0");
    console.warn("Please see https://github.com/highlightjs/highlight.js/issues/2534");

    return fixMarkup(arg);
  }

  /* Interface definition */
  Object.assign(hljs, {
    highlight,
    highlightAuto,
    fixMarkup: deprecateFixMarkup,
    highlightBlock,
    configure,
    initHighlighting,
    initHighlightingOnLoad,
    registerLanguage,
    listLanguages,
    getLanguage,
    registerAliases,
    requireLanguage,
    autoDetection,
    inherit: inherit$1,
    addPlugin,
    // plugins for frameworks
    vuePlugin: BuildVuePlugin(hljs).VuePlugin
  });

  hljs.debugMode = function() { SAFE_MODE = false; };
  hljs.safeMode = function() { SAFE_MODE = true; };
  hljs.versionString = version;

  for (const key in MODES) {
    // @ts-ignore
    if (typeof MODES[key] === "object") {
      // @ts-ignore
      deepFreezeEs6(MODES[key]);
    }
  }

  // merge all the modes/regexs into our main object
  Object.assign(hljs, MODES);

  return hljs;
};

// export an "instance" of the highlighter
var highlight = HLJS({});

module.exports = highlight;


/***/ }),

/***/ "../../node_modules/highlight.js/lib/index.js":
/*!**********************************************************************************************!*\
  !*** /Users/chenquan/Workspace/website/chainlark.com/node_modules/highlight.js/lib/index.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hljs = __webpack_require__(/*! ./core */ "../../node_modules/highlight.js/lib/core.js");

hljs.registerLanguage('1c', __webpack_require__(/*! ./languages/1c */ "../../node_modules/highlight.js/lib/languages/1c.js"));
hljs.registerLanguage('abnf', __webpack_require__(/*! ./languages/abnf */ "../../node_modules/highlight.js/lib/languages/abnf.js"));
hljs.registerLanguage('accesslog', __webpack_require__(/*! ./languages/accesslog */ "../../node_modules/highlight.js/lib/languages/accesslog.js"));
hljs.registerLanguage('actionscript', __webpack_require__(/*! ./languages/actionscript */ "../../node_modules/highlight.js/lib/languages/actionscript.js"));
hljs.registerLanguage('ada', __webpack_require__(/*! ./languages/ada */ "../../node_modules/highlight.js/lib/languages/ada.js"));
hljs.registerLanguage('angelscript', __webpack_require__(/*! ./languages/angelscript */ "../../node_modules/highlight.js/lib/languages/angelscript.js"));
hljs.registerLanguage('apache', __webpack_require__(/*! ./languages/apache */ "../../node_modules/highlight.js/lib/languages/apache.js"));
hljs.registerLanguage('applescript', __webpack_require__(/*! ./languages/applescript */ "../../node_modules/highlight.js/lib/languages/applescript.js"));
hljs.registerLanguage('arcade', __webpack_require__(/*! ./languages/arcade */ "../../node_modules/highlight.js/lib/languages/arcade.js"));
hljs.registerLanguage('arduino', __webpack_require__(/*! ./languages/arduino */ "../../node_modules/highlight.js/lib/languages/arduino.js"));
hljs.registerLanguage('armasm', __webpack_require__(/*! ./languages/armasm */ "../../node_modules/highlight.js/lib/languages/armasm.js"));
hljs.registerLanguage('xml', __webpack_require__(/*! ./languages/xml */ "../../node_modules/highlight.js/lib/languages/xml.js"));
hljs.registerLanguage('asciidoc', __webpack_require__(/*! ./languages/asciidoc */ "../../node_modules/highlight.js/lib/languages/asciidoc.js"));
hljs.registerLanguage('aspectj', __webpack_require__(/*! ./languages/aspectj */ "../../node_modules/highlight.js/lib/languages/aspectj.js"));
hljs.registerLanguage('autohotkey', __webpack_require__(/*! ./languages/autohotkey */ "../../node_modules/highlight.js/lib/languages/autohotkey.js"));
hljs.registerLanguage('autoit', __webpack_require__(/*! ./languages/autoit */ "../../node_modules/highlight.js/lib/languages/autoit.js"));
hljs.registerLanguage('avrasm', __webpack_require__(/*! ./languages/avrasm */ "../../node_modules/highlight.js/lib/languages/avrasm.js"));
hljs.registerLanguage('awk', __webpack_require__(/*! ./languages/awk */ "../../node_modules/highlight.js/lib/languages/awk.js"));
hljs.registerLanguage('axapta', __webpack_require__(/*! ./languages/axapta */ "../../node_modules/highlight.js/lib/languages/axapta.js"));
hljs.registerLanguage('bash', __webpack_require__(/*! ./languages/bash */ "../../node_modules/highlight.js/lib/languages/bash.js"));
hljs.registerLanguage('basic', __webpack_require__(/*! ./languages/basic */ "../../node_modules/highlight.js/lib/languages/basic.js"));
hljs.registerLanguage('bnf', __webpack_require__(/*! ./languages/bnf */ "../../node_modules/highlight.js/lib/languages/bnf.js"));
hljs.registerLanguage('brainfuck', __webpack_require__(/*! ./languages/brainfuck */ "../../node_modules/highlight.js/lib/languages/brainfuck.js"));
hljs.registerLanguage('c-like', __webpack_require__(/*! ./languages/c-like */ "../../node_modules/highlight.js/lib/languages/c-like.js"));
hljs.registerLanguage('c', __webpack_require__(/*! ./languages/c */ "../../node_modules/highlight.js/lib/languages/c.js"));
hljs.registerLanguage('cal', __webpack_require__(/*! ./languages/cal */ "../../node_modules/highlight.js/lib/languages/cal.js"));
hljs.registerLanguage('capnproto', __webpack_require__(/*! ./languages/capnproto */ "../../node_modules/highlight.js/lib/languages/capnproto.js"));
hljs.registerLanguage('ceylon', __webpack_require__(/*! ./languages/ceylon */ "../../node_modules/highlight.js/lib/languages/ceylon.js"));
hljs.registerLanguage('clean', __webpack_require__(/*! ./languages/clean */ "../../node_modules/highlight.js/lib/languages/clean.js"));
hljs.registerLanguage('clojure', __webpack_require__(/*! ./languages/clojure */ "../../node_modules/highlight.js/lib/languages/clojure.js"));
hljs.registerLanguage('clojure-repl', __webpack_require__(/*! ./languages/clojure-repl */ "../../node_modules/highlight.js/lib/languages/clojure-repl.js"));
hljs.registerLanguage('cmake', __webpack_require__(/*! ./languages/cmake */ "../../node_modules/highlight.js/lib/languages/cmake.js"));
hljs.registerLanguage('coffeescript', __webpack_require__(/*! ./languages/coffeescript */ "../../node_modules/highlight.js/lib/languages/coffeescript.js"));
hljs.registerLanguage('coq', __webpack_require__(/*! ./languages/coq */ "../../node_modules/highlight.js/lib/languages/coq.js"));
hljs.registerLanguage('cos', __webpack_require__(/*! ./languages/cos */ "../../node_modules/highlight.js/lib/languages/cos.js"));
hljs.registerLanguage('cpp', __webpack_require__(/*! ./languages/cpp */ "../../node_modules/highlight.js/lib/languages/cpp.js"));
hljs.registerLanguage('crmsh', __webpack_require__(/*! ./languages/crmsh */ "../../node_modules/highlight.js/lib/languages/crmsh.js"));
hljs.registerLanguage('crystal', __webpack_require__(/*! ./languages/crystal */ "../../node_modules/highlight.js/lib/languages/crystal.js"));
hljs.registerLanguage('csharp', __webpack_require__(/*! ./languages/csharp */ "../../node_modules/highlight.js/lib/languages/csharp.js"));
hljs.registerLanguage('csp', __webpack_require__(/*! ./languages/csp */ "../../node_modules/highlight.js/lib/languages/csp.js"));
hljs.registerLanguage('css', __webpack_require__(/*! ./languages/css */ "../../node_modules/highlight.js/lib/languages/css.js"));
hljs.registerLanguage('d', __webpack_require__(/*! ./languages/d */ "../../node_modules/highlight.js/lib/languages/d.js"));
hljs.registerLanguage('markdown', __webpack_require__(/*! ./languages/markdown */ "../../node_modules/highlight.js/lib/languages/markdown.js"));
hljs.registerLanguage('dart', __webpack_require__(/*! ./languages/dart */ "../../node_modules/highlight.js/lib/languages/dart.js"));
hljs.registerLanguage('delphi', __webpack_require__(/*! ./languages/delphi */ "../../node_modules/highlight.js/lib/languages/delphi.js"));
hljs.registerLanguage('diff', __webpack_require__(/*! ./languages/diff */ "../../node_modules/highlight.js/lib/languages/diff.js"));
hljs.registerLanguage('django', __webpack_require__(/*! ./languages/django */ "../../node_modules/highlight.js/lib/languages/django.js"));
hljs.registerLanguage('dns', __webpack_require__(/*! ./languages/dns */ "../../node_modules/highlight.js/lib/languages/dns.js"));
hljs.registerLanguage('dockerfile', __webpack_require__(/*! ./languages/dockerfile */ "../../node_modules/highlight.js/lib/languages/dockerfile.js"));
hljs.registerLanguage('dos', __webpack_require__(/*! ./languages/dos */ "../../node_modules/highlight.js/lib/languages/dos.js"));
hljs.registerLanguage('dsconfig', __webpack_require__(/*! ./languages/dsconfig */ "../../node_modules/highlight.js/lib/languages/dsconfig.js"));
hljs.registerLanguage('dts', __webpack_require__(/*! ./languages/dts */ "../../node_modules/highlight.js/lib/languages/dts.js"));
hljs.registerLanguage('dust', __webpack_require__(/*! ./languages/dust */ "../../node_modules/highlight.js/lib/languages/dust.js"));
hljs.registerLanguage('ebnf', __webpack_require__(/*! ./languages/ebnf */ "../../node_modules/highlight.js/lib/languages/ebnf.js"));
hljs.registerLanguage('elixir', __webpack_require__(/*! ./languages/elixir */ "../../node_modules/highlight.js/lib/languages/elixir.js"));
hljs.registerLanguage('elm', __webpack_require__(/*! ./languages/elm */ "../../node_modules/highlight.js/lib/languages/elm.js"));
hljs.registerLanguage('ruby', __webpack_require__(/*! ./languages/ruby */ "../../node_modules/highlight.js/lib/languages/ruby.js"));
hljs.registerLanguage('erb', __webpack_require__(/*! ./languages/erb */ "../../node_modules/highlight.js/lib/languages/erb.js"));
hljs.registerLanguage('erlang-repl', __webpack_require__(/*! ./languages/erlang-repl */ "../../node_modules/highlight.js/lib/languages/erlang-repl.js"));
hljs.registerLanguage('erlang', __webpack_require__(/*! ./languages/erlang */ "../../node_modules/highlight.js/lib/languages/erlang.js"));
hljs.registerLanguage('excel', __webpack_require__(/*! ./languages/excel */ "../../node_modules/highlight.js/lib/languages/excel.js"));
hljs.registerLanguage('fix', __webpack_require__(/*! ./languages/fix */ "../../node_modules/highlight.js/lib/languages/fix.js"));
hljs.registerLanguage('flix', __webpack_require__(/*! ./languages/flix */ "../../node_modules/highlight.js/lib/languages/flix.js"));
hljs.registerLanguage('fortran', __webpack_require__(/*! ./languages/fortran */ "../../node_modules/highlight.js/lib/languages/fortran.js"));
hljs.registerLanguage('fsharp', __webpack_require__(/*! ./languages/fsharp */ "../../node_modules/highlight.js/lib/languages/fsharp.js"));
hljs.registerLanguage('gams', __webpack_require__(/*! ./languages/gams */ "../../node_modules/highlight.js/lib/languages/gams.js"));
hljs.registerLanguage('gauss', __webpack_require__(/*! ./languages/gauss */ "../../node_modules/highlight.js/lib/languages/gauss.js"));
hljs.registerLanguage('gcode', __webpack_require__(/*! ./languages/gcode */ "../../node_modules/highlight.js/lib/languages/gcode.js"));
hljs.registerLanguage('gherkin', __webpack_require__(/*! ./languages/gherkin */ "../../node_modules/highlight.js/lib/languages/gherkin.js"));
hljs.registerLanguage('glsl', __webpack_require__(/*! ./languages/glsl */ "../../node_modules/highlight.js/lib/languages/glsl.js"));
hljs.registerLanguage('gml', __webpack_require__(/*! ./languages/gml */ "../../node_modules/highlight.js/lib/languages/gml.js"));
hljs.registerLanguage('go', __webpack_require__(/*! ./languages/go */ "../../node_modules/highlight.js/lib/languages/go.js"));
hljs.registerLanguage('golo', __webpack_require__(/*! ./languages/golo */ "../../node_modules/highlight.js/lib/languages/golo.js"));
hljs.registerLanguage('gradle', __webpack_require__(/*! ./languages/gradle */ "../../node_modules/highlight.js/lib/languages/gradle.js"));
hljs.registerLanguage('groovy', __webpack_require__(/*! ./languages/groovy */ "../../node_modules/highlight.js/lib/languages/groovy.js"));
hljs.registerLanguage('haml', __webpack_require__(/*! ./languages/haml */ "../../node_modules/highlight.js/lib/languages/haml.js"));
hljs.registerLanguage('handlebars', __webpack_require__(/*! ./languages/handlebars */ "../../node_modules/highlight.js/lib/languages/handlebars.js"));
hljs.registerLanguage('haskell', __webpack_require__(/*! ./languages/haskell */ "../../node_modules/highlight.js/lib/languages/haskell.js"));
hljs.registerLanguage('haxe', __webpack_require__(/*! ./languages/haxe */ "../../node_modules/highlight.js/lib/languages/haxe.js"));
hljs.registerLanguage('hsp', __webpack_require__(/*! ./languages/hsp */ "../../node_modules/highlight.js/lib/languages/hsp.js"));
hljs.registerLanguage('htmlbars', __webpack_require__(/*! ./languages/htmlbars */ "../../node_modules/highlight.js/lib/languages/htmlbars.js"));
hljs.registerLanguage('http', __webpack_require__(/*! ./languages/http */ "../../node_modules/highlight.js/lib/languages/http.js"));
hljs.registerLanguage('hy', __webpack_require__(/*! ./languages/hy */ "../../node_modules/highlight.js/lib/languages/hy.js"));
hljs.registerLanguage('inform7', __webpack_require__(/*! ./languages/inform7 */ "../../node_modules/highlight.js/lib/languages/inform7.js"));
hljs.registerLanguage('ini', __webpack_require__(/*! ./languages/ini */ "../../node_modules/highlight.js/lib/languages/ini.js"));
hljs.registerLanguage('irpf90', __webpack_require__(/*! ./languages/irpf90 */ "../../node_modules/highlight.js/lib/languages/irpf90.js"));
hljs.registerLanguage('isbl', __webpack_require__(/*! ./languages/isbl */ "../../node_modules/highlight.js/lib/languages/isbl.js"));
hljs.registerLanguage('java', __webpack_require__(/*! ./languages/java */ "../../node_modules/highlight.js/lib/languages/java.js"));
hljs.registerLanguage('javascript', __webpack_require__(/*! ./languages/javascript */ "../../node_modules/highlight.js/lib/languages/javascript.js"));
hljs.registerLanguage('jboss-cli', __webpack_require__(/*! ./languages/jboss-cli */ "../../node_modules/highlight.js/lib/languages/jboss-cli.js"));
hljs.registerLanguage('json', __webpack_require__(/*! ./languages/json */ "../../node_modules/highlight.js/lib/languages/json.js"));
hljs.registerLanguage('julia', __webpack_require__(/*! ./languages/julia */ "../../node_modules/highlight.js/lib/languages/julia.js"));
hljs.registerLanguage('julia-repl', __webpack_require__(/*! ./languages/julia-repl */ "../../node_modules/highlight.js/lib/languages/julia-repl.js"));
hljs.registerLanguage('kotlin', __webpack_require__(/*! ./languages/kotlin */ "../../node_modules/highlight.js/lib/languages/kotlin.js"));
hljs.registerLanguage('lasso', __webpack_require__(/*! ./languages/lasso */ "../../node_modules/highlight.js/lib/languages/lasso.js"));
hljs.registerLanguage('latex', __webpack_require__(/*! ./languages/latex */ "../../node_modules/highlight.js/lib/languages/latex.js"));
hljs.registerLanguage('ldif', __webpack_require__(/*! ./languages/ldif */ "../../node_modules/highlight.js/lib/languages/ldif.js"));
hljs.registerLanguage('leaf', __webpack_require__(/*! ./languages/leaf */ "../../node_modules/highlight.js/lib/languages/leaf.js"));
hljs.registerLanguage('less', __webpack_require__(/*! ./languages/less */ "../../node_modules/highlight.js/lib/languages/less.js"));
hljs.registerLanguage('lisp', __webpack_require__(/*! ./languages/lisp */ "../../node_modules/highlight.js/lib/languages/lisp.js"));
hljs.registerLanguage('livecodeserver', __webpack_require__(/*! ./languages/livecodeserver */ "../../node_modules/highlight.js/lib/languages/livecodeserver.js"));
hljs.registerLanguage('livescript', __webpack_require__(/*! ./languages/livescript */ "../../node_modules/highlight.js/lib/languages/livescript.js"));
hljs.registerLanguage('llvm', __webpack_require__(/*! ./languages/llvm */ "../../node_modules/highlight.js/lib/languages/llvm.js"));
hljs.registerLanguage('lsl', __webpack_require__(/*! ./languages/lsl */ "../../node_modules/highlight.js/lib/languages/lsl.js"));
hljs.registerLanguage('lua', __webpack_require__(/*! ./languages/lua */ "../../node_modules/highlight.js/lib/languages/lua.js"));
hljs.registerLanguage('makefile', __webpack_require__(/*! ./languages/makefile */ "../../node_modules/highlight.js/lib/languages/makefile.js"));
hljs.registerLanguage('mathematica', __webpack_require__(/*! ./languages/mathematica */ "../../node_modules/highlight.js/lib/languages/mathematica.js"));
hljs.registerLanguage('matlab', __webpack_require__(/*! ./languages/matlab */ "../../node_modules/highlight.js/lib/languages/matlab.js"));
hljs.registerLanguage('maxima', __webpack_require__(/*! ./languages/maxima */ "../../node_modules/highlight.js/lib/languages/maxima.js"));
hljs.registerLanguage('mel', __webpack_require__(/*! ./languages/mel */ "../../node_modules/highlight.js/lib/languages/mel.js"));
hljs.registerLanguage('mercury', __webpack_require__(/*! ./languages/mercury */ "../../node_modules/highlight.js/lib/languages/mercury.js"));
hljs.registerLanguage('mipsasm', __webpack_require__(/*! ./languages/mipsasm */ "../../node_modules/highlight.js/lib/languages/mipsasm.js"));
hljs.registerLanguage('mizar', __webpack_require__(/*! ./languages/mizar */ "../../node_modules/highlight.js/lib/languages/mizar.js"));
hljs.registerLanguage('perl', __webpack_require__(/*! ./languages/perl */ "../../node_modules/highlight.js/lib/languages/perl.js"));
hljs.registerLanguage('mojolicious', __webpack_require__(/*! ./languages/mojolicious */ "../../node_modules/highlight.js/lib/languages/mojolicious.js"));
hljs.registerLanguage('monkey', __webpack_require__(/*! ./languages/monkey */ "../../node_modules/highlight.js/lib/languages/monkey.js"));
hljs.registerLanguage('moonscript', __webpack_require__(/*! ./languages/moonscript */ "../../node_modules/highlight.js/lib/languages/moonscript.js"));
hljs.registerLanguage('n1ql', __webpack_require__(/*! ./languages/n1ql */ "../../node_modules/highlight.js/lib/languages/n1ql.js"));
hljs.registerLanguage('nginx', __webpack_require__(/*! ./languages/nginx */ "../../node_modules/highlight.js/lib/languages/nginx.js"));
hljs.registerLanguage('nim', __webpack_require__(/*! ./languages/nim */ "../../node_modules/highlight.js/lib/languages/nim.js"));
hljs.registerLanguage('nix', __webpack_require__(/*! ./languages/nix */ "../../node_modules/highlight.js/lib/languages/nix.js"));
hljs.registerLanguage('node-repl', __webpack_require__(/*! ./languages/node-repl */ "../../node_modules/highlight.js/lib/languages/node-repl.js"));
hljs.registerLanguage('nsis', __webpack_require__(/*! ./languages/nsis */ "../../node_modules/highlight.js/lib/languages/nsis.js"));
hljs.registerLanguage('objectivec', __webpack_require__(/*! ./languages/objectivec */ "../../node_modules/highlight.js/lib/languages/objectivec.js"));
hljs.registerLanguage('ocaml', __webpack_require__(/*! ./languages/ocaml */ "../../node_modules/highlight.js/lib/languages/ocaml.js"));
hljs.registerLanguage('openscad', __webpack_require__(/*! ./languages/openscad */ "../../node_modules/highlight.js/lib/languages/openscad.js"));
hljs.registerLanguage('oxygene', __webpack_require__(/*! ./languages/oxygene */ "../../node_modules/highlight.js/lib/languages/oxygene.js"));
hljs.registerLanguage('parser3', __webpack_require__(/*! ./languages/parser3 */ "../../node_modules/highlight.js/lib/languages/parser3.js"));
hljs.registerLanguage('pf', __webpack_require__(/*! ./languages/pf */ "../../node_modules/highlight.js/lib/languages/pf.js"));
hljs.registerLanguage('pgsql', __webpack_require__(/*! ./languages/pgsql */ "../../node_modules/highlight.js/lib/languages/pgsql.js"));
hljs.registerLanguage('php', __webpack_require__(/*! ./languages/php */ "../../node_modules/highlight.js/lib/languages/php.js"));
hljs.registerLanguage('php-template', __webpack_require__(/*! ./languages/php-template */ "../../node_modules/highlight.js/lib/languages/php-template.js"));
hljs.registerLanguage('plaintext', __webpack_require__(/*! ./languages/plaintext */ "../../node_modules/highlight.js/lib/languages/plaintext.js"));
hljs.registerLanguage('pony', __webpack_require__(/*! ./languages/pony */ "../../node_modules/highlight.js/lib/languages/pony.js"));
hljs.registerLanguage('powershell', __webpack_require__(/*! ./languages/powershell */ "../../node_modules/highlight.js/lib/languages/powershell.js"));
hljs.registerLanguage('processing', __webpack_require__(/*! ./languages/processing */ "../../node_modules/highlight.js/lib/languages/processing.js"));
hljs.registerLanguage('profile', __webpack_require__(/*! ./languages/profile */ "../../node_modules/highlight.js/lib/languages/profile.js"));
hljs.registerLanguage('prolog', __webpack_require__(/*! ./languages/prolog */ "../../node_modules/highlight.js/lib/languages/prolog.js"));
hljs.registerLanguage('properties', __webpack_require__(/*! ./languages/properties */ "../../node_modules/highlight.js/lib/languages/properties.js"));
hljs.registerLanguage('protobuf', __webpack_require__(/*! ./languages/protobuf */ "../../node_modules/highlight.js/lib/languages/protobuf.js"));
hljs.registerLanguage('puppet', __webpack_require__(/*! ./languages/puppet */ "../../node_modules/highlight.js/lib/languages/puppet.js"));
hljs.registerLanguage('purebasic', __webpack_require__(/*! ./languages/purebasic */ "../../node_modules/highlight.js/lib/languages/purebasic.js"));
hljs.registerLanguage('python', __webpack_require__(/*! ./languages/python */ "../../node_modules/highlight.js/lib/languages/python.js"));
hljs.registerLanguage('python-repl', __webpack_require__(/*! ./languages/python-repl */ "../../node_modules/highlight.js/lib/languages/python-repl.js"));
hljs.registerLanguage('q', __webpack_require__(/*! ./languages/q */ "../../node_modules/highlight.js/lib/languages/q.js"));
hljs.registerLanguage('qml', __webpack_require__(/*! ./languages/qml */ "../../node_modules/highlight.js/lib/languages/qml.js"));
hljs.registerLanguage('r', __webpack_require__(/*! ./languages/r */ "../../node_modules/highlight.js/lib/languages/r.js"));
hljs.registerLanguage('reasonml', __webpack_require__(/*! ./languages/reasonml */ "../../node_modules/highlight.js/lib/languages/reasonml.js"));
hljs.registerLanguage('rib', __webpack_require__(/*! ./languages/rib */ "../../node_modules/highlight.js/lib/languages/rib.js"));
hljs.registerLanguage('roboconf', __webpack_require__(/*! ./languages/roboconf */ "../../node_modules/highlight.js/lib/languages/roboconf.js"));
hljs.registerLanguage('routeros', __webpack_require__(/*! ./languages/routeros */ "../../node_modules/highlight.js/lib/languages/routeros.js"));
hljs.registerLanguage('rsl', __webpack_require__(/*! ./languages/rsl */ "../../node_modules/highlight.js/lib/languages/rsl.js"));
hljs.registerLanguage('ruleslanguage', __webpack_require__(/*! ./languages/ruleslanguage */ "../../node_modules/highlight.js/lib/languages/ruleslanguage.js"));
hljs.registerLanguage('rust', __webpack_require__(/*! ./languages/rust */ "../../node_modules/highlight.js/lib/languages/rust.js"));
hljs.registerLanguage('sas', __webpack_require__(/*! ./languages/sas */ "../../node_modules/highlight.js/lib/languages/sas.js"));
hljs.registerLanguage('scala', __webpack_require__(/*! ./languages/scala */ "../../node_modules/highlight.js/lib/languages/scala.js"));
hljs.registerLanguage('scheme', __webpack_require__(/*! ./languages/scheme */ "../../node_modules/highlight.js/lib/languages/scheme.js"));
hljs.registerLanguage('scilab', __webpack_require__(/*! ./languages/scilab */ "../../node_modules/highlight.js/lib/languages/scilab.js"));
hljs.registerLanguage('scss', __webpack_require__(/*! ./languages/scss */ "../../node_modules/highlight.js/lib/languages/scss.js"));
hljs.registerLanguage('shell', __webpack_require__(/*! ./languages/shell */ "../../node_modules/highlight.js/lib/languages/shell.js"));
hljs.registerLanguage('smali', __webpack_require__(/*! ./languages/smali */ "../../node_modules/highlight.js/lib/languages/smali.js"));
hljs.registerLanguage('smalltalk', __webpack_require__(/*! ./languages/smalltalk */ "../../node_modules/highlight.js/lib/languages/smalltalk.js"));
hljs.registerLanguage('sml', __webpack_require__(/*! ./languages/sml */ "../../node_modules/highlight.js/lib/languages/sml.js"));
hljs.registerLanguage('sqf', __webpack_require__(/*! ./languages/sqf */ "../../node_modules/highlight.js/lib/languages/sqf.js"));
hljs.registerLanguage('sql', __webpack_require__(/*! ./languages/sql */ "../../node_modules/highlight.js/lib/languages/sql.js"));
hljs.registerLanguage('stan', __webpack_require__(/*! ./languages/stan */ "../../node_modules/highlight.js/lib/languages/stan.js"));
hljs.registerLanguage('stata', __webpack_require__(/*! ./languages/stata */ "../../node_modules/highlight.js/lib/languages/stata.js"));
hljs.registerLanguage('step21', __webpack_require__(/*! ./languages/step21 */ "../../node_modules/highlight.js/lib/languages/step21.js"));
hljs.registerLanguage('stylus', __webpack_require__(/*! ./languages/stylus */ "../../node_modules/highlight.js/lib/languages/stylus.js"));
hljs.registerLanguage('subunit', __webpack_require__(/*! ./languages/subunit */ "../../node_modules/highlight.js/lib/languages/subunit.js"));
hljs.registerLanguage('swift', __webpack_require__(/*! ./languages/swift */ "../../node_modules/highlight.js/lib/languages/swift.js"));
hljs.registerLanguage('taggerscript', __webpack_require__(/*! ./languages/taggerscript */ "../../node_modules/highlight.js/lib/languages/taggerscript.js"));
hljs.registerLanguage('yaml', __webpack_require__(/*! ./languages/yaml */ "../../node_modules/highlight.js/lib/languages/yaml.js"));
hljs.registerLanguage('tap', __webpack_require__(/*! ./languages/tap */ "../../node_modules/highlight.js/lib/languages/tap.js"));
hljs.registerLanguage('tcl', __webpack_require__(/*! ./languages/tcl */ "../../node_modules/highlight.js/lib/languages/tcl.js"));
hljs.registerLanguage('thrift', __webpack_require__(/*! ./languages/thrift */ "../../node_modules/highlight.js/lib/languages/thrift.js"));
hljs.registerLanguage('tp', __webpack_require__(/*! ./languages/tp */ "../../node_modules/highlight.js/lib/languages/tp.js"));
hljs.registerLanguage('twig', __webpack_require__(/*! ./languages/twig */ "../../node_modules/highlight.js/lib/languages/twig.js"));
hljs.registerLanguage('typescript', __webpack_require__(/*! ./languages/typescript */ "../../node_modules/highlight.js/lib/languages/typescript.js"));
hljs.registerLanguage('vala', __webpack_require__(/*! ./languages/vala */ "../../node_modules/highlight.js/lib/languages/vala.js"));
hljs.registerLanguage('vbnet', __webpack_require__(/*! ./languages/vbnet */ "../../node_modules/highlight.js/lib/languages/vbnet.js"));
hljs.registerLanguage('vbscript', __webpack_require__(/*! ./languages/vbscript */ "../../node_modules/highlight.js/lib/languages/vbscript.js"));
hljs.registerLanguage('vbscript-html', __webpack_require__(/*! ./languages/vbscript-html */ "../../node_modules/highlight.js/lib/languages/vbscript-html.js"));
hljs.registerLanguage('verilog', __webpack_require__(/*! ./languages/verilog */ "../../node_modules/highlight.js/lib/languages/verilog.js"));
hljs.registerLanguage('vhdl', __webpack_require__(/*! ./languages/vhdl */ "../../node_modules/highlight.js/lib/languages/vhdl.js"));
hljs.registerLanguage('vim', __webpack_require__(/*! ./languages/vim */ "../../node_modules/highlight.js/lib/languages/vim.js"));
hljs.registerLanguage('x86asm', __webpack_require__(/*! ./languages/x86asm */ "../../node_modules/highlight.js/lib/languages/x86asm.js"));
hljs.registerLanguage('xl', __webpack_require__(/*! ./languages/xl */ "../../node_modules/highlight.js/lib/languages/xl.js"));
hljs.registerLanguage('xquery', __webpack_require__(/*! ./languages/xquery */ "../../node_modules/highlight.js/lib/languages/xquery.js"));
hljs.registerLanguage('zephir', __webpack_require__(/*! ./languages/zephir */ "../../node_modules/highlight.js/lib/languages/zephir.js"));

module.exports = hljs;

/***/ })

}]);
//# sourceMappingURL=ed188c6aa5d272a0535a.chunk.js.map