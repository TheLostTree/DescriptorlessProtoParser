"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pbjs = __importStar(require("protobufjs"));
var long_1 = __importDefault(require("long"));
function parseProto(buf) {
    var reader = new pbjs.BufferReader(buf);
    var obj = {};
    // console.log(buf.toString("base64"));
    while (reader.pos < reader.len) {
        var fieldNo = reader.int32();
        var wireType = fieldNo & 0x7;
        var fieldId = fieldNo >> 3;
        switch (wireType) {
            case 0:
                //varint
                var val = reader.uint64();
                obj["field " + fieldId] = BigInt(new long_1["default"](val.low, val.high, val.unsigned).toString());
                break;
            case 1:
                //64 bit
                var val64 = reader.double();
                obj["field " + fieldId] = val64;
                break;
            case 2:
                //length delimited
                // let len = reader.uint32();
                var subBuf = Buffer.from(reader.bytes());
                // obj["field" + fieldId] = parseProtoIsh(subBuf);
                obj["field " + fieldId] = subBuf.toString("base64");
                break;
            case 5:
                //32 bit
                var val32 = reader.float();
                obj["field " + fieldId] = val32;
                break;
            default:
                break;
        }
        // console.log(reader.pos, reader.len)
    }
    return obj;
}
exports["default"] = parseProto;
