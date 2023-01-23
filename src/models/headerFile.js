const mongoose = require("mongoose");

var Schema = mongoose.Schema;

//File format for a header file
const HeaderFileSchema = new Schema({
    //Magnetometer ID
    user_id: String,
    //Magnetometer name
    user_name: String,
    datetime: Date,
    duration: Number,
    lat: Number,
    long: Number,
    //Foreign Key
    pniFilename: [{ type: Schema.Types.ObjectId, ref: 'PniFile' }],
    //Foreign Key
    gpsFilename: [{ type: Schema.Types.ObjectId, ref: 'GpsFile' }],
    file_url: String
});

const PniFileSchema = new Schema({
    //Model for a pni file
    //Talk to Lauro about this file format
})

const GpsFileSchema = new Schema({
    //Model for a pni file
    //Talk to Lauro about this file format
})

var HeaderFile = mongoose.model('HeaderFile', HeaderFileSchema);
var PniFile = mongoose.model('PniFile', PniFileSchema);
var GpsFile = mongoose.model('GpsFile', GpsFileSchema);

module.exports = HeaderFile;
module.exports = PniFile;
module.exports = GpsFile;