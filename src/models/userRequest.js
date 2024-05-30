const { Schema, model } = require('mongoose')
const { USER, CATEGORY, USER_REQUEST } = require('~/consts/models')

const { FIELD_CANNOT_BE_EMPTY, FIELD_CANNOT_BE_SHORTER, FIELD_CANNOT_BE_LONGER } = require('~/consts/errors')

const userRequestSchema = new Schema(
  {
    new_subject: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY('new_subject')],
      trim: true
    },
    category: {
      name: {
        type: String,
        required: [true, FIELD_CANNOT_BE_EMPTY('category')],
        trim: true
      },
      id: {
        type: Schema.Types.ObjectId,
        ref: CATEGORY,
        default: null
      }
    },
    additionalInfo: {
      type: String,
      minLength: [1, FIELD_CANNOT_BE_SHORTER('additionalInfo', 1)],
      maxLength: [1000, FIELD_CANNOT_BE_LONGER('additionalInfo', 1000)],
      trim: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: USER
    },
    isModerated: {
      type: Boolean,
      default: false,
      select: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model(USER_REQUEST, userRequestSchema)
