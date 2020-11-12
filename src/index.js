import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import moment from 'moment'

export default new GraphQLScalarType({
  name: 'DateTimeUTC',
  description: 'The `DateTimeUTC` scalar represents a date and time following the ISO 8601 standard',
  serialize(value) {
    // value sent to the client
    return moment(value).utc().format()
  },
  parseValue(value) {
    // value from the client
    if (!moment(value).isValid) {
      throw new TypeError(
        `DateTime must be in a recognized RFC2822 or ISO 8601 format ${String(value)}.`
      )
    }

    return moment.utc(value).toISOString()
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        `DateTime cannot represent non string type ${String(ast.value != null ? ast.value : null)}`
      )
    }

    return moment.utc(ast.value).toISOString()
  },
})
