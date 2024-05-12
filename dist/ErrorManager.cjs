"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/ErrorManager.ts
var ErrorManager_exports = {};
__export(ErrorManager_exports, {
  default: () => ErrorManager_default
});
module.exports = __toCommonJS(ErrorManager_exports);
function _sendError() {
  if (!this.res) {
    console.log("ErrorManager - Can not find _this.res");
  }
  const { e, title, data, httpStatus, name } = this;
  console.log("e: ", e);
  console.log("data: ", data);
  console.log("httpStatus: ", httpStatus);
  if (!e && !title) {
    throw new Error("error and title is missing");
  }
  const base = {
    name,
    environment: process.env.npm_lifecycle_event,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    title
  };
  console.log("base: ", base);
  const fullError = {
    ...base,
    ...e ? { error: e } : {},
    ...data ? { data } : {},
    stack: e?.stack
  };
  console.log("fullError: ", fullError);
  const fullErrorSanitized = {
    ...base,
    ...e ? { error: process.env.npm_lifecycle_event === "start" ? null : e.toString() } : {},
    ...data ? { data: process.env.npm_lifecycle_event === "start" ? null : data } : {},
    stack: process.env.npm_lifecycle_event === "start" ? null : e?.stack
  };
  this.res?.status(httpStatus).json(fullErrorSanitized);
  throw new Error(JSON.stringify(fullError, null, 4));
}
var ErrorManager = class _ErrorManager {
  static instance;
  req;
  res;
  sendError;
  constructor(req = {}, res = {}) {
    if (!_ErrorManager.instance) {
      _ErrorManager.instance = this;
    }
    if (req && res) {
      this.req = req;
      this.res = res;
      _ErrorManager.instance = this;
    }
    this.sendError = _sendError.bind(this);
    return _ErrorManager.instance;
  }
  static middleware = (req, res) => {
    new _ErrorManager(req, res);
  };
};
var BaseError = class extends ErrorManager {
  title;
  e;
  httpStatus;
  name;
  constructor(title, e) {
    super();
    this.title = title;
    this.e = e;
    this.httpStatus = 500;
    this.name = "BaseError";
    this.sendError(this);
  }
};
var ValidationError = class extends ErrorManager {
  title;
  e;
  data;
  httpStatus;
  name;
  constructor(title, e, data) {
    super();
    this.title = title;
    this.e = e;
    this.data = data;
    this.httpStatus = 400;
    this.name = "ValidationError";
    this.sendError(this);
  }
};
var ResourceNotFoundError = class extends ErrorManager {
  title;
  e;
  data;
  httpStatus;
  name;
  constructor(title, data, e) {
    super();
    this.title = title;
    this.e = e;
    this.data = data;
    this.httpStatus = 404;
    this.name = "ResourceNotFoundError";
    this.sendError(this);
  }
};
var RuntimeError = class extends ErrorManager {
  title;
  e;
  httpStatus;
  name;
  constructor(title, e, httpStatus = 500) {
    super();
    this.title = title;
    this.e = e;
    this.httpStatus = httpStatus;
    this.name = "RuntimeError";
    this.sendError(this);
  }
};
var ErrorManager_default = {
  ErrorManager,
  BaseError,
  ValidationError,
  RuntimeError,
  ResourceNotFoundError
};
