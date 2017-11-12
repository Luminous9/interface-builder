const mongoose = require('mongoose')
const Interface = mongoose.model('Interface')

exports.testInterfaceModel = async (req, res) => {
  const testInterface = new Interface({
    author: 'Sonny',
    name: 'test interface',
    for: 'some game',
    layout: [
      [{ label: 'field1', type: 'text' }, { label: 'field2', type: 'number' }],
      [{ label: 'field3', type: 'number' }]
    ]
  })
  await testInterface.save()
  res.send('It worked!')
}

exports.getInterfaces = async (req, res) => {
  const interfaces = await Interface.find()
  res.json(interfaces)
}
