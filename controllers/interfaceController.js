const mongoose = require('mongoose')
const Interface = mongoose.model('Interface')

exports.testInterfaceModel = async (req, res) => {
  const testInterface = new Interface({
    author: 'Sonny',
    name: 'test interface',
    for: 'some game',
    layout: [
      [
        { kind: 'String', label: 'field1', startValue: 'blank' },
        { kind: 'Number', label: 'field2', startValue: 0 }
      ],
      [{ kind: 'Number', label: 'field3', startValue: 200 }]
    ]
  })
  await testInterface.save()
  res.send('It worked!')
}

exports.getInterfaces = async (req, res) => {
  const interfaces = await Interface.find()
  res.json(interfaces)
}
