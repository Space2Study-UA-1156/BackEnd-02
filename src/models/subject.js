const { Schema, model } = require('mongoose')
const errors = require('~/consts/errors')
const { CATEGORY, SUBJECT } = require('~/consts/models')

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, errors.FIELD_CANNOT_BE_EMPTY('name')],
      trim: true,
      unique: true
    },
    category: {
      type: Schema.Types.ObjectId,
      required: [true, errors.FIELD_CANNOT_BE_EMPTY('category')],
      ref: CATEGORY
    },
    totalOffers: {
      student: {
        type: Number,
        default: 0
      },
      tutor: {
        type: Number,
        default: 0
      }
    }
  },
  { timestamps: true, versionKey: false }
)

subjectSchema.index({ name: 1 }, { unique: true })

module.exports = model(SUBJECT, subjectSchema)
