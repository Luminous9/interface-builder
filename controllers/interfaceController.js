const mongoose = require('mongoose')
const Interface = mongoose.model('Interface')

exports.testInterfaceModel = async (req, res) => {
  const testInterface = new Interface({
    name: 'test interface',
    for: 'some game',
    layout: [
      [{ kind: 'String', label: 'field1', value: 'blank' }, { kind: 'Number', label: 'field2', value: 0 }],
      [{ kind: 'Number', label: 'field3', value: 123 }]
    ]
  })
  await testInterface.save()
  res.send('It worked!')
}
