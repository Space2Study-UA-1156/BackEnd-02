const { Schema, model } = require('mongoose')
const { OFFER, CATEGORY } = require('~/consts/models')
const { FIELD_IS_NOT_DEFINED } = require('~/consts/errors')

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, FIELD_IS_NOT_DEFINED('name')],
      unique: true
    },
    appearance: {
      icon: {
        type: String,
        required: [true, FIELD_IS_NOT_DEFINED('appearance.icon')],
        default: 'mocked-path-to-icon'
      },
      color: {
        type: String,
        required: [true, FIELD_IS_NOT_DEFINED('appearance.color')],
        default: '#66C42C'
      }
    },
    totalOffers: {
      student: {
        type: Number,
        ref: OFFER,
        default: 0
      },
      tutor: {
        type: Number,
        ref: OFFER,
        default: 0
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model(CATEGORY, categorySchema)
