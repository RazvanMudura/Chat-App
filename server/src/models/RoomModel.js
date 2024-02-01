const { Schema, model } = require("mongoose")


const RoomSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 4,
    },

    members: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        username: {
            type: String,
            required: true
        }
    }],

    messages: [{
        text: {
            type: String,
            trim: true,
            required: true
        },

        date: {
            type: Date,
            default: () => Date.now(),
            immutable: true
        },

        author: {
            id: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            username: {
                type: String,
                required: true
            }
        }
    }]
}, {
    timestamps: true
})


RoomSchema.methods.toJSON = function() {
    const room = this.toObject()

    delete room.__v

    return room
}

const RoomModel = model("room", RoomSchema)

module.exports = RoomModel