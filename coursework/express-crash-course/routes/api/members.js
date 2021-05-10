const express = require('express')
const uuid = require('uuid')
const router = express.Router()

const members = require('../../Members')

// Gets all members
router.get('/', (req, res) => {
  res.json(members)
})

// Get single member
router.get('/:id', (req, res) => {
  const found = members.some((m) => m.id === parseInt(req.params.id))

  if (found) {
    res.json(members.filter((m) => m.id === parseInt(req.params.id)))
  } else {
    res
      .status(400)
      .json({ message: `No member with the id of ${req.params.id}` })
  }
})

// Create member
router.post('/', (req, res) => {
  const { name, email } = req.body
  const newMember = {
    id: uuid.v4(),
    name,
    email,
    status: 'active',
  }

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ message: 'Please include name and email' })
  }

  members.push(newMember)
  // res.json(members)
  res.redirect('/')
})

// Update member
router.put('/:id', (req, res) => {
  const found = members.some((m) => m.id === parseInt(req.params.id))

  if (found) {
    const updateMember = req.body
    members.map((m) => {
      if (m.id === parseInt(req.params.id)) {
        m.name = updateMember.name ? updateMember.name : m.name
        m.email = updateMember.email ? updateMember.email : m.email
        res.json({ message: 'Member updated', member: m })
      }
    })
  } else {
    res
      .status(400)
      .json({ message: `No member with the id of ${req.params.id}` })
  }
})

// Delete member
router.delete('/:id', (req, res) => {
  const found = members.some((m) => m.id === parseInt(req.params.id))

  if (found) {
    res.json({
      message: 'Member deleted',
      members: members.filter((m) => m.id !== parseInt(req.params.id)),
    })
  } else {
    res
      .status(400)
      .json({ message: `No member with the id of ${req.params.id}` })
  }
})

module.exports = router
