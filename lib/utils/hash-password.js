// Utility script to generate hashed passwords for initial setup
// Run this with Node.js to generate hashed passwords for your database

const bcrypt = require("bcryptjs")

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 12)
  console.log(`Password: ${password}`)
  console.log(`Hashed: ${hashedPassword}`)
  return hashedPassword
}

// Example usage
hashPassword("password").then(() => {
  console.log("You can use this hash in your database setup")
})

