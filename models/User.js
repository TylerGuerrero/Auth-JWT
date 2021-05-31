const { Schema, model } = require('mongoose') 
const { genSalt, hash, compare } = require('bcryptjs')
const { isEmail } = require('validator')

const userSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Name is required'],
        minLength: [6, 'Minimum length is 6'], 
        maxLength: [255, 'Maximum length is 255']
    },
    email: {
        type: String, 
        required: [true, 'Email is required'],
        unique: true, 
        minLength: [6, 'Minimum length is 6'], 
        maxLength: [255, 'Maximum length is 255'],
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String, 
        required: [true, 'Password is required'],
        minLength: [6, 'Minimum length is 6'], 
        maxLength: [1024, 'Maximum length is 1024']
    }
}, {timestamps: true})

// this refers to document not query
userSchema.pre('save', async function(next) {
    try {
        const salt = await genSalt(12)
        this.password = await hash(this.password, salt)
        next()
    } catch (err) {
        console.log(err)
    }
})

userSchema.post('save', function(doc, next) {
    console.log(doc)
    next()
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email}).exec()

    if (!user) {
        throw new Error('User does not exist try again')   
    }

    const isMatch = await compare(password, user.password);

    if (isMatch) {
        return user
    } else {
        throw new Error('Wrong password')
    }
}

const User = model('User', userSchema)

module.exports = User