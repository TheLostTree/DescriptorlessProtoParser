import * as pbjs from "protobufjs";
import Long from "long";

function parseProto(buf: Buffer): object{
    const reader = new pbjs.BufferReader(buf);
    let obj: object = {};
    // console.log(buf.toString("base64"));
    while (reader.pos < reader.len) {
        let fieldNo = reader.int32();
        let wireType = fieldNo & 0x7;
        let fieldId = fieldNo >> 3;
        switch (wireType) {
            case 0:
                //varint
                let val = reader.uint64();

                obj["field " + fieldId] = BigInt(new Long(val.low, val.high, val.unsigned).toString());
                break;
            case 1:
                //64 bit
                let val64 = reader.double();
                obj["field " + fieldId] = val64;

                break;
            case 2:
                //length delimited
                // let len = reader.uint32();
                let subBuf = Buffer.from(reader.bytes());
                // obj["field" + fieldId] = parseProtoIsh(subBuf);
                obj["field " + fieldId] = subBuf.toString("utf-8");

                break;
            case 5:
                //32 bit
                let val32 = reader.float();
                obj["field " + fieldId] = val32;
                break;
            default:
                break;
        }

        // console.log(reader.pos, reader.len)
    }
    return obj;
}

export default parseProto;