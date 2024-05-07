const { Schema, model } = require('mongoose')
const { OFFER, CATEGORY } = require('~/consts/models')

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    appearance: {
      icon: {
        type: String,
        required: [true, errors.FIELD_IS_NOT_DEFINED('appearance.icon').message],
        default: 'mocked-path-to-icon'
      },
      color: {
        type: String,
        required: [true, errors.FIELD_IS_NOT_DEFINED('appearance.color').message],
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
